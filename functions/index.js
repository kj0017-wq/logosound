const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

const elevenLabsApiKey = defineSecret("ELEVENLABS_API_KEY");
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const ELEVENLABS_TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const STORAGE_BUCKET = "logosound-19293-voices";
const EDITOR_EXERCISES_COLLECTION = "editorExercises";

exports.editorExercises = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    response.set("Cache-Control", "no-store");

    if (request.method === "GET") {
      try {
        const snapshot = await admin.firestore().collection(EDITOR_EXERCISES_COLLECTION).get();
        const exercises = snapshot.docs
          .map((doc) => doc.data())
          .filter((exercise) => exercise?.name)
          .sort((a, b) => String(a.name).localeCompare(String(b.name), "de"));

        response.status(200).json({ exercises });
      } catch (error) {
        console.error("Editor exercises load failed", error);
        response.status(500).json({ error: "editor-exercises-load-failed" });
      }
      return;
    }

    if (request.method === "POST") {
      const exercise = request.body?.exercise || request.body;
      const hydratedExercise = normalizeEditorExercise(exercise);

      if (!hydratedExercise?.name) {
        response.status(400).json({ error: "missing-exercise-name" });
        return;
      }

      try {
        await admin
          .firestore()
          .collection(EDITOR_EXERCISES_COLLECTION)
          .doc(slugify(hydratedExercise.name))
          .set({
            ...hydratedExercise,
            updatedAt: new Date().toISOString(),
          });

        response.status(200).json({ ok: true, exercise: hydratedExercise });
      } catch (error) {
        console.error("Editor exercise save failed", error);
        response.status(500).json({ error: "editor-exercise-save-failed" });
      }
      return;
    }

    response.status(405).json({ error: "method-not-allowed" });
  },
);

exports.voice = onRequest(
  {
    region: "europe-west3",
    secrets: [elevenLabsApiKey],
    maxInstances: 5,
  },
  async (request, response) => {
    if (request.method === "GET") {
      const url = new URL(request.url, `https://${request.headers.host || "localhost"}`);
      const path = String(url.searchParams.get("path") || "");

      if (!path.startsWith("editor-voices/") || path.includes("..")) {
        response.status(400).json({ error: "invalid-path" });
        return;
      }

      try {
        const [audioBuffer] = await admin.storage().bucket(STORAGE_BUCKET).file(path).download();
        response.set("Content-Type", "audio/mpeg");
        response.set("Cache-Control", "private, max-age=3600");
        response.status(200).send(audioBuffer);
      } catch (error) {
        console.error("Voice download failed", error);
        response.status(404).json({ error: "voice-not-found" });
      }
      return;
    }

    if (request.method !== "POST") {
      response.status(405).json({ error: "method-not-allowed" });
      return;
    }

    const text = String(request.body?.text || "").trim();
    const voiceId = String(request.body?.voiceId || DEFAULT_VOICE_ID).trim();
    const requestedVoiceSettings = request.body?.voiceSettings || {};
    const shouldStore = Boolean(request.body?.store);
    const exerciseName = String(request.body?.exerciseName || "Neue Übung").trim();

    if (!text) {
      response.status(400).json({ error: "missing-text" });
      return;
    }

    if (text.length > 900) {
      response.status(400).json({ error: "text-too-long" });
      return;
    }

    try {
      const ttsResponse = await fetch(`${ELEVENLABS_TTS_URL}/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
          "xi-api-key": elevenLabsApiKey.value(),
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: clampVoiceSetting(requestedVoiceSettings.stability, 0.58),
            similarity_boost: clampVoiceSetting(requestedVoiceSettings.similarity_boost, 0.82),
            style: clampVoiceSetting(requestedVoiceSettings.style, 0.12),
            use_speaker_boost: requestedVoiceSettings.use_speaker_boost !== false,
          },
        }),
      });

      if (!ttsResponse.ok) {
        const details = await ttsResponse.text();
        console.error("ElevenLabs failed", ttsResponse.status, details.slice(0, 300));
        response.status(502).json({ error: "elevenlabs-failed" });
        return;
      }

      const audioBuffer = Buffer.from(await ttsResponse.arrayBuffer());
      if (shouldStore) {
        const safeName = slugify(exerciseName);
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const path = `editor-voices/${safeName}/voice_${timestamp}.mp3`;
        const file = admin.storage().bucket(STORAGE_BUCKET).file(path);

        await file.save(audioBuffer, {
          resumable: false,
          contentType: "audio/mpeg",
          metadata: {
            cacheControl: "private, max-age=31536000",
            metadata: {
              exerciseName,
              voiceText: text.slice(0, 500),
              voiceId,
            },
          },
        });

        response.set("Cache-Control", "no-store");
        response.status(200).json({
          path,
          downloadUrl: `/api/voice?path=${encodeURIComponent(path)}`,
        });
        return;
      }

      response.set("Content-Type", "audio/mpeg");
      response.set("Cache-Control", "no-store");
      response.status(200).send(audioBuffer);
    } catch (error) {
      console.error("Voice function failed", error);
      response.status(500).json({ error: "voice-generation-failed" });
    }
  },
);

function slugify(value) {
  return String(value || "neue-uebung")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "neue-uebung";
}

function clampVoiceSetting(value, fallback) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.max(0, Math.min(1, numericValue));
}

function normalizeEditorExercise(exercise) {
  if (!exercise || typeof exercise !== "object") return null;

  const name = String(exercise.name || "").trim();
  if (!name) return null;

  return {
    ...exercise,
    name,
    mode: String(exercise.mode || "sentences"),
    content: String(exercise.content || exercise.script || ""),
    script: String(exercise.script || exercise.content || ""),
    sentences: Array.isArray(exercise.sentences)
      ? exercise.sentences.map((sentence) => String(sentence).trim()).filter(Boolean)
      : [],
    repeats: Math.max(1, Number(exercise.repeats || 1)),
    speed: Math.max(1, Math.min(5, Number(exercise.speed || 3))),
    voiceInstruction: String(exercise.voiceInstruction || ""),
    voiceAudioUrl: String(exercise.voiceAudioUrl || ""),
    voiceAudioPath: String(exercise.voiceAudioPath || ""),
    voiceAudioDataUrl: String(exercise.voiceAudioDataUrl || ""),
  };
}
