const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");

admin.initializeApp();

const elevenLabsApiKey = defineSecret("ELEVENLABS_API_KEY");
const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const ELEVENLABS_TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const STORAGE_BUCKET = "logosound-19293-voices";
const EDITOR_EXERCISES_COLLECTION = "editorExercises";

exports.editorExercises = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
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

exports.chatgpt = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
    response.set("Cache-Control", "no-store");

    if (request.method !== "POST") {
      response.status(405).json({ error: "method-not-allowed" });
      return;
    }

    const apiKey = String(request.body?.apiKey || "").trim();
    const model = String(request.body?.model || "gpt-5").trim();
    const systemPrompt = String(request.body?.systemPrompt || "").trim();
    const exercise = request.body?.exercise || {};

    if (!apiKey || !apiKey.startsWith("sk-")) {
      response.status(400).json({ error: "missing-openai-api-key" });
      return;
    }

    const userPrompt = buildChatGptExercisePrompt(exercise);
    if (!userPrompt) {
      response.status(400).json({ error: "missing-exercise" });
      return;
    }

    try {
      const openAiResponse = await fetch(OPENAI_RESPONSES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text:
                    systemPrompt ||
                    "Erstelle eine kurze, freundliche logopädische Voice-Instruktion auf Deutsch. Maximal drei Sätze.",
                },
              ],
            },
            {
              role: "user",
              content: [{ type: "input_text", text: userPrompt }],
            },
          ],
          max_output_tokens: 180,
        }),
      });

      const payload = await openAiResponse.json().catch(() => ({}));
      if (!openAiResponse.ok) {
        console.error("OpenAI failed", openAiResponse.status, payload?.error?.message || payload);
        response.status(502).json({ error: "openai-failed" });
        return;
      }

      const text = extractOpenAiText(payload).trim();
      if (!text) {
        response.status(502).json({ error: "openai-empty-response" });
        return;
      }

      response.status(200).json({ text: text.slice(0, 700) });
    } catch (error) {
      console.error("ChatGPT function failed", error);
      response.status(500).json({ error: "chatgpt-request-failed" });
    }
  },
);

exports.voice = onRequest(
  {
    region: "europe-west3",
    secrets: [elevenLabsApiKey],
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
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

function handleCors(request, response) {
  const origin = String(request.headers.origin || "");
  const allowedOrigins = new Set([
    "https://logosound-19293.web.app",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
  ]);

  if (allowedOrigins.has(origin)) {
    response.set("Access-Control-Allow-Origin", origin);
    response.set("Vary", "Origin");
  }

  response.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return true;
  }

  return false;
}

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

function buildChatGptExercisePrompt(exercise) {
  if (!exercise || typeof exercise !== "object") return "";

  return [
    `Übungsname: ${String(exercise.name || "Neue Übung").slice(0, 120)}`,
    `Typ: ${String(exercise.mode || "unbekannt").slice(0, 40)}`,
    `Tempo: ${String(exercise.speedLabel || "").slice(0, 40)}`,
    `Wiederholungen: ${String(exercise.repeats || 1).slice(0, 10)}`,
    `Inhalt: ${String(exercise.content || exercise.script || "").slice(0, 900)}`,
    Array.isArray(exercise.sentences) && exercise.sentences.length
      ? `Sätze: ${exercise.sentences.map((sentence) => String(sentence).trim()).filter(Boolean).join(" | ").slice(0, 900)}`
      : "",
    "Erstelle dafür den Ansagetext vor Beginn der Übung.",
  ]
    .filter(Boolean)
    .join("\n");
}

function extractOpenAiText(payload) {
  if (typeof payload?.output_text === "string") return payload.output_text;

  const chunks = [];
  for (const item of payload?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join(" ");
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
    dialogTurns: Array.isArray(exercise.dialogTurns)
      ? exercise.dialogTurns
          .map((turn) => ({
            role: String(turn?.role || "system") === "patient" ? "patient" : "system",
            text: String(turn?.text || "").trim(),
            audioUrl: String(turn?.audioUrl || ""),
            audioPath: String(turn?.audioPath || ""),
            audioVoiceId: String(turn?.audioVoiceId || ""),
            audioVoiceSettings: turn?.audioVoiceSettings || null,
            audioTextHash: String(turn?.audioTextHash || ""),
            audioSpeed: Number(turn?.audioSpeed || 0),
            audioUpdatedAt: String(turn?.audioUpdatedAt || ""),
          }))
          .filter((turn) => turn.text)
      : [],
    repeats: Math.max(1, Number(exercise.repeats || 1)),
    speed: Math.max(1, Math.min(7, Number(exercise.speed || 3))),
    voiceInstruction: String(exercise.voiceInstruction || ""),
    voiceAudioUrl: String(exercise.voiceAudioUrl || ""),
    voiceAudioPath: String(exercise.voiceAudioPath || ""),
    voiceAudioDataUrl: String(exercise.voiceAudioDataUrl || ""),
  };
}
