const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();

const DEFAULT_VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
const ELEVENLABS_TTS_URL = "https://api.elevenlabs.io/v1/text-to-speech";
const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const STORAGE_BUCKET = "logosound-19293-voices";
const EDITOR_EXERCISES_COLLECTION = "editorExercises";
const PATIENT_PROFILES_COLLECTION = "patientProfiles";
const MEDIA_LIBRARY_COLLECTION = "mediaLibrary";
const SETTINGS_COLLECTION = "settings";
const ELEVENLABS_SETTINGS_DOC = "elevenLabsVoices";
const CHATGPT_SETTINGS_DOC = "chatGptSettings";
const ACTIVE_PATIENT_DOC = "activePatient";
const COURSE_DATA_COLLECTIONS = new Set([
  "dailyPlans",
  "courses",
  "courseSessions",
  "courseAssignments",
  "relaxMusic",
]);

exports.courseData = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
    response.set("Cache-Control", "no-store");
    const authenticatedUser = await requireFirebaseUser(request, response);
    if (!authenticatedUser) return;

    if (request.method === "GET") {
      try {
        const requestedPatientId = String(request.query?.patientId || "").trim();
        const requestedPatientName = String(request.query?.patientName || "").trim();
        const entries = await Promise.all(
          [...COURSE_DATA_COLLECTIONS].map(async (collectionName) => {
            const collectionRef = admin.firestore().collection(collectionName);
            const patientScoped = collectionName === "courseAssignments" || collectionName === "courseSessions";
            if (!patientScoped) {
              const snapshot = await collectionRef.get();
              return [
                collectionName,
                snapshot.docs.map((itemDoc) => ({ id: itemDoc.id, ...itemDoc.data() })),
              ];
            }

            // Older versions created different IDs for the same patient on
            // different devices. Query both exact identifiers, then merge the
            // matching documents without exposing other patients' data.
            const queries = [];
            if (requestedPatientId) queries.push(collectionRef.where("patientId", "==", requestedPatientId).get());
            if (requestedPatientName) queries.push(collectionRef.where("patientName", "==", requestedPatientName).get());
            const snapshots = await Promise.all(queries);
            const matchingDocs = new Map();
            snapshots.forEach((snapshot) => snapshot.docs.forEach((itemDoc) => {
              matchingDocs.set(itemDoc.id, { id: itemDoc.id, ...itemDoc.data() });
            }));
            return [
              collectionName,
              [...matchingDocs.values()],
            ];
          }),
        );
        response.status(200).json({ collections: Object.fromEntries(entries) });
      } catch (error) {
        console.error("Course data load failed", error);
        response.status(500).json({ error: "course-data-load-failed" });
      }
      return;
    }

    if (request.method === "POST") {
      const updates = Array.isArray(request.body?.updates)
        ? request.body.updates
        : [{ collection: request.body?.collection, item: request.body?.item }];
      const validUpdates = updates.filter((update) => (
        COURSE_DATA_COLLECTIONS.has(String(update?.collection || ""))
        && String(update?.item?.id || "").trim()
      ));
      if (!validUpdates.length || validUpdates.length !== updates.length) {
        response.status(400).json({ error: "invalid-course-data" });
        return;
      }
      try {
        for (let offset = 0; offset < validUpdates.length; offset += 400) {
          const batch = admin.firestore().batch();
          validUpdates.slice(offset, offset + 400).forEach((update) => {
            const collectionName = String(update.collection);
            const item = JSON.parse(JSON.stringify(update.item));
            const id = String(item.id).trim();
            batch.set(admin.firestore().collection(collectionName).doc(id), item, { merge: true });
          });
          await batch.commit();
        }
        response.status(200).json({ ok: true, saved: validUpdates.length });
      } catch (error) {
        console.error("Course data save failed", error);
        response.status(500).json({ error: "course-data-save-failed" });
      }
      return;
    }

    if (request.method === "DELETE") {
      const collectionName = String(request.body?.collection || "");
      const id = String(request.body?.id || "").trim();
      if (!COURSE_DATA_COLLECTIONS.has(collectionName) || !id) {
        response.status(400).json({ error: "invalid-course-data" });
        return;
      }
      try {
        await admin.firestore().collection(collectionName).doc(id).delete();
        response.status(200).json({ ok: true });
      } catch (error) {
        console.error("Course data delete failed", error);
        response.status(500).json({ error: "course-data-delete-failed" });
      }
      return;
    }

    response.status(405).json({ error: "method-not-allowed" });
  },
);

exports.patientProfiles = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
    response.set("Cache-Control", "no-store");

    if (request.method === "GET") {
      try {
        const [profilesSnapshot, activeSnapshot] = await Promise.all([
          admin.firestore().collection(PATIENT_PROFILES_COLLECTION).get(),
          admin.firestore().collection(SETTINGS_COLLECTION).doc(ACTIVE_PATIENT_DOC).get(),
        ]);
        const allProfiles = profilesSnapshot.docs
          .map((profileDoc) => normalizePatientProfile(profileDoc.data(), profileDoc.id))
          .filter((profile) => profile.name);
        const activePatient = activeSnapshot.exists ? activeSnapshot.data() : null;
        const profilesByName = new Map();
        allProfiles.forEach((profile) => {
          const key = slugify(profile.name);
          const existing = profilesByName.get(key);
          const profileIsActive = profile.id === activePatient?.patientId;
          const existingIsActive = existing?.id === activePatient?.patientId;
          if (
            !existing
            || (profileIsActive && !existingIsActive)
            || (!existingIsActive && String(profile.updatedAt || "") > String(existing.updatedAt || ""))
          ) {
            profilesByName.set(key, profile);
          }
        });
        const profiles = [...profilesByName.values()]
          .sort((a, b) => a.name.localeCompare(b.name, "de"));
        response.status(200).json({
          profiles,
          activePatient,
        });
      } catch (error) {
        console.error("Patient profiles load failed", error);
        response.status(500).json({ error: "patient-profiles-load-failed" });
      }
      return;
    }

    if (request.method === "POST") {
      const action = String(request.body?.action || "save").trim();
      const requestedProfile = request.body?.profile || request.body;
      const profile = normalizePatientProfile(requestedProfile);

      if (action === "activate") {
        const name = String(request.body?.name || profile.name || "").trim();
        const patientId = String(request.body?.patientId || profile.id || slugify(name)).trim();
        if (!name) {
          response.status(400).json({ error: "missing-patient-name" });
          return;
        }
        try {
          await saveActivePatient(name, patientId);
          response.status(200).json({ ok: true, activePatient: { name, patientId } });
        } catch (error) {
          console.error("Active patient save failed", error);
          response.status(500).json({ error: "active-patient-save-failed" });
        }
        return;
      }

      if (!profile.name) {
        response.status(400).json({ error: "missing-patient-name" });
        return;
      }

      try {
        await admin.firestore().collection(PATIENT_PROFILES_COLLECTION).doc(profile.id).set(profile, { merge: true });
        if (request.body?.setActive === true) await saveActivePatient(profile.name, profile.id);
        response.status(200).json({ ok: true, profile });
      } catch (error) {
        console.error("Patient profile save failed", error);
        response.status(500).json({ error: "patient-profile-save-failed" });
      }
      return;
    }

    response.status(405).json({ error: "method-not-allowed" });
  },
);

exports.mediaLibrary = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
    response.set("Cache-Control", "no-store");
    const collectionRef = admin.firestore().collection(MEDIA_LIBRARY_COLLECTION);

    if (request.method === "GET" || request.method === "HEAD") {
      const fileId = String(request.query?.file || "").trim();
      if (fileId) {
        try {
          const itemSnapshot = await collectionRef.doc(fileId).get();
          if (!itemSnapshot.exists) {
            response.status(404).json({ error: "media-not-found" });
            return;
          }
          const item = itemSnapshot.data();
          const storagePath = String(item.storagePath || "");
          if (!storagePath) {
            response.status(404).json({ error: "media-file-not-found" });
            return;
          }
          const storageFile = admin.storage().bucket(STORAGE_BUCKET).file(storagePath);
          const [fileMetadata] = await storageFile.getMetadata();
          const fileSize = Math.max(0, Number(fileMetadata.size || 0));
          const rangeHeader = String(request.get("range") || "").trim();
          let start = 0;
          let end = Math.max(0, fileSize - 1);
          let partialContent = false;

          if (rangeHeader && fileSize > 0) {
            const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader);
            if (!match) {
              response.set("Content-Range", `bytes */${fileSize}`);
              response.status(416).end();
              return;
            }
            if (match[1]) {
              start = Number(match[1]);
              end = match[2] ? Math.min(Number(match[2]), fileSize - 1) : fileSize - 1;
            } else if (match[2]) {
              const suffixLength = Math.min(Number(match[2]), fileSize);
              start = Math.max(0, fileSize - suffixLength);
              end = fileSize - 1;
            }
            if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start > end || start >= fileSize) {
              response.set("Content-Range", `bytes */${fileSize}`);
              response.status(416).end();
              return;
            }
            partialContent = true;
          }

          const contentLength = fileSize > 0 ? end - start + 1 : 0;
          const responseMimeType = inferMediaMimeType(
            item.mimeType || fileMetadata.contentType,
            item.fileName || storagePath,
          );
          response.set("Content-Type", responseMimeType);
          response.set("Content-Disposition", `inline; filename="${safeStorageFileName(item.fileName || "medium")}"`);
          response.set("Cache-Control", "public, max-age=3600");
          response.set("X-Content-Type-Options", "nosniff");
          response.set("Accept-Ranges", "bytes");
          if (fileSize > 0) response.set("Content-Length", String(contentLength));
          if (partialContent) {
            response.set("Content-Range", `bytes ${start}-${end}/${fileSize}`);
            response.status(206);
          } else {
            response.status(200);
          }
          if (request.method === "HEAD") {
            response.end();
            return;
          }
          storageFile.createReadStream(fileSize > 0 ? { start, end } : {})
            .on("error", (error) => {
              console.error("Media stream failed", error);
              if (!response.headersSent) response.status(404).json({ error: "media-file-not-found" });
              else response.end();
            })
            .pipe(response);
        } catch (error) {
          console.error("Media download failed", error);
          response.status(500).json({ error: "media-download-failed" });
        }
        return;
      }
      if (request.method === "HEAD") {
        response.status(400).end();
        return;
      }
      try {
        const snapshot = await collectionRef.get();
        const items = snapshot.docs
          .map((itemDoc) => ({ id: itemDoc.id, ...itemDoc.data() }))
          .filter((item) => item.title)
          .sort((left, right) => String(right.updatedAt || "").localeCompare(String(left.updatedAt || "")));
        response.status(200).json({ items });
      } catch (error) {
        console.error("Media library load failed", error);
        response.status(500).json({ error: "media-library-load-failed" });
      }
      return;
    }

    if (request.method === "POST") {
      if (String(request.query?.upload || "") === "1") {
        try {
          const encodedMetadata = String(request.get("X-Media-Metadata") || "");
          const metadata = JSON.parse(decodeURIComponent(encodedMetadata));
          const id = String(metadata.id || "").trim();
          const title = String(metadata.title || "").trim();
          const rawBody = Buffer.isBuffer(request.rawBody) ? request.rawBody : Buffer.from(request.rawBody || "");
          if (!id || !title || !rawBody.length) {
            response.status(400).json({ error: "missing-media-upload-data" });
            return;
          }
          if (rawBody.length > 28 * 1024 * 1024) {
            response.status(413).json({ error: "media-file-too-large", maxMegabytes: 28 });
            return;
          }
          const fileName = safeStorageFileName(metadata.fileName || "medium");
          const storagePath = `media-library/${id}/${fileName}`;
           const mimeType = inferMediaMimeType(
             metadata.mimeType || request.get("Content-Type"),
             metadata.fileName || fileName,
           );
          await admin.storage().bucket(STORAGE_BUCKET).file(storagePath).save(rawBody, {
            resumable: false,
            metadata: { contentType: mimeType },
          });
          const now = new Date().toISOString();
          const item = {
            ...metadata,
            id,
            title,
            kind: metadata.kind === "pause" ? "pause" : (metadata.kind === "loop" ? "loop" : "exercise"),
            mimeType,
            storagePath,
            downloadUrl: `/api/media-library?file=${encodeURIComponent(id)}`,
            active: metadata.active !== false,
            createdAt: metadata.createdAt || now,
            updatedAt: now,
          };
          await collectionRef.doc(id).set(item, { merge: true });
          response.status(200).json({ ok: true, item });
        } catch (error) {
          console.error("Media upload failed", error);
          response.status(500).json({ error: "media-upload-failed" });
        }
        return;
      }
      const item = request.body?.item || request.body;
      const id = String(item?.id || "").trim();
      const title = String(item?.title || "").trim();
      if (!id || !title) {
        response.status(400).json({ error: "missing-media-data" });
        return;
      }
      const normalized = {
        ...item,
        id,
        title,
        kind: item.kind === "pause" ? "pause" : (item.kind === "loop" ? "loop" : "exercise"),
        updatedAt: new Date().toISOString(),
      };
      try {
        await collectionRef.doc(id).set(normalized, { merge: true });
        response.status(200).json({ ok: true, item: normalized });
      } catch (error) {
        console.error("Media library save failed", error);
        response.status(500).json({ error: "media-library-save-failed" });
      }
      return;
    }

    if (request.method === "DELETE") {
      const id = String(request.body?.id || request.query?.id || "").trim();
      if (!id) {
        response.status(400).json({ error: "missing-media-id" });
        return;
      }
      try {
        const itemSnapshot = await collectionRef.doc(id).get();
        const storagePath = itemSnapshot.exists ? String(itemSnapshot.data()?.storagePath || "") : "";
        await collectionRef.doc(id).delete();
        if (storagePath) await admin.storage().bucket(STORAGE_BUCKET).file(storagePath).delete({ ignoreNotFound: true });
        response.status(200).json({ ok: true, deleted: id });
      } catch (error) {
        console.error("Media library delete failed", error);
        response.status(500).json({ error: "media-library-delete-failed" });
      }
      return;
    }

    response.status(405).json({ error: "method-not-allowed" });
  },
);

exports.settings = onRequest(
  {
    region: "europe-west3",
    maxInstances: 5,
  },
  async (request, response) => {
    if (handleCors(request, response)) return;
    response.set("Cache-Control", "no-store");

    if (request.method === "GET") {
      try {
        const [elevenSnapshot, chatGptSnapshot] = await Promise.all([
          admin.firestore().collection(SETTINGS_COLLECTION).doc(ELEVENLABS_SETTINGS_DOC).get(),
          admin.firestore().collection(SETTINGS_COLLECTION).doc(CHATGPT_SETTINGS_DOC).get(),
        ]);
        const rawChatGptSettings = chatGptSnapshot.exists ? normalizeChatGptSettings(chatGptSnapshot.data()) : null;
        response.status(200).json({
          settings: elevenSnapshot.exists ? normalizeElevenLabsSettings(elevenSnapshot.data()) : null,
          chatGptSettings: rawChatGptSettings
            ? {
                ...rawChatGptSettings,
                apiKey: "",
                hasApiKey: Boolean(rawChatGptSettings.apiKey),
              }
            : null,
        });
      } catch (error) {
        console.error("Settings load failed", error);
        response.status(500).json({ error: "settings-load-failed" });
      }
      return;
    }

    if (request.method === "POST") {
      try {
        const updates = [];
        const now = new Date().toISOString();
        let settings = null;
        let chatGptSettings = null;

        if (request.body?.settings || request.body?.voiceId || request.body?.voices) {
          settings = normalizeElevenLabsSettings(request.body?.settings || request.body);
          updates.push(
            admin.firestore().collection(SETTINGS_COLLECTION).doc(ELEVENLABS_SETTINGS_DOC).set({
              ...settings,
              updatedAt: now,
            }),
          );
        }

        if (request.body?.chatGptSettings || Object.prototype.hasOwnProperty.call(request.body || {}, "apiKey")) {
          const existingSnapshot = await admin.firestore().collection(SETTINGS_COLLECTION).doc(CHATGPT_SETTINGS_DOC).get();
          const existingSettings = existingSnapshot.exists ? normalizeChatGptSettings(existingSnapshot.data()) : normalizeChatGptSettings({});
          const incomingSettings = normalizeChatGptSettings(request.body?.chatGptSettings || request.body);
          chatGptSettings = {
            ...existingSettings,
            ...incomingSettings,
            apiKey: incomingSettings.apiKey || existingSettings.apiKey || "",
          };
          updates.push(
            admin.firestore().collection(SETTINGS_COLLECTION).doc(CHATGPT_SETTINGS_DOC).set({
              ...chatGptSettings,
              updatedAt: now,
            }),
          );
        }

        if (!updates.length) {
          response.status(400).json({ error: "invalid-settings-payload" });
          return;
        }

        await Promise.all(updates);
        response.status(200).json({ ok: true, settings, chatGptSettings });
      } catch (error) {
        console.error("Settings save failed", error);
        response.status(500).json({ error: "settings-save-failed" });
      }
      return;
    }

    response.status(405).json({ error: "method-not-allowed" });
  },
);

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

    if (request.method === "DELETE") {
      const name = String(request.body?.name || request.query?.name || "").trim();

      if (!name) {
        response.status(400).json({ error: "missing-exercise-name" });
        return;
      }

      try {
        const documentRef = admin
          .firestore()
          .collection(EDITOR_EXERCISES_COLLECTION)
          .doc(slugify(name));
        const documentSnapshot = await documentRef.get();
        const exercise = documentSnapshot.exists ? documentSnapshot.data() : { name };
        const audioPaths = collectEditorExerciseAudioPaths(exercise);

        await Promise.all([
          documentRef.delete(),
          ...audioPaths.map((path) =>
            admin.storage().bucket(STORAGE_BUCKET).file(path).delete({ ignoreNotFound: true }),
          ),
        ]);

        response.status(200).json({ ok: true, deleted: name, audioFiles: audioPaths.length });
      } catch (error) {
        console.error("Editor exercise delete failed", error);
        response.status(500).json({ error: "editor-exercise-delete-failed" });
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

    const requestApiKey = String(request.body?.apiKey || "").trim();
    const model = String(request.body?.model || "gpt-5").trim();
    const systemPrompt = String(request.body?.systemPrompt || "").trim();
    const exercise = request.body?.exercise || {};
    const editorPrompt = String(request.body?.editorPrompt || "").trim();
    let apiKey = requestApiKey;
    if (!apiKey || !apiKey.startsWith("sk-")) {
      const snapshot = await admin.firestore().collection(SETTINGS_COLLECTION).doc(CHATGPT_SETTINGS_DOC).get().catch(() => null);
      const storedSettings = snapshot?.exists ? normalizeChatGptSettings(snapshot.data()) : null;
      apiKey = String(storedSettings?.apiKey || process.env.OPENAI_API_KEY || "").trim();
    }

    if (!apiKey || !apiKey.startsWith("sk-")) {
      response.status(400).json({ error: "missing-openai-api-key" });
      return;
    }

    if (editorPrompt) {
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
                      "Du erstellst logopädische Übungen auf Deutsch. Antworte ausschließlich als JSON ohne Markdown. Erkenne aus der freien Eingabe selbst, ob eine Liste, ein Gedicht, ein Dialog, ein kurzer Text oder ein längerer Text gewünscht ist. Verwende als kind nur: sentences, text, long_text, dialog. Falls nach Wörtern gefragt wird, gib sie als items-Liste zurück und setze kind trotzdem auf sentences. Achte darauf, dass gewünschte Laute oder Buchstaben in jedem Eintrag vorkommen, sofern das verlangt wurde. Die Ausgabe soll kurz, natürlich, verständlich und für Sprachübungen geeignet sein.",
                  },
                ],
              },
              {
                role: "user",
                content: [
                  {
                    type: "input_text",
                    text: buildChatGptEditorPrompt(editorPrompt),
                  },
                ],
              },
            ],
            max_output_tokens: 2200,
          }),
        });

        const payload = await openAiResponse.json().catch(() => ({}));
        if (!openAiResponse.ok) {
          console.error("OpenAI editor generation failed", openAiResponse.status, payload?.error?.message || payload);
          response.status(502).json({ error: "openai-editor-failed" });
          return;
        }

        const text = extractOpenAiText(payload).trim();
        const parsedExercise = parseEditorExerciseAiResponse(text);
        if (!parsedExercise) {
          response.status(502).json({ error: "openai-editor-invalid-json" });
          return;
        }

        response.status(200).json({ exercise: parsedExercise });
      } catch (error) {
        console.error("ChatGPT editor function failed", error);
        response.status(500).json({ error: "chatgpt-editor-request-failed" });
      }
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
        // Safari requests MP3s in byte ranges. Serving the whole buffer works
        // in many browsers, but can make an audio element stop after its start
        // on iPhone. Mirror the media endpoint's range-capable stream here.
        const storageFile = admin.storage().bucket(STORAGE_BUCKET).file(path);
        const [fileMetadata] = await storageFile.getMetadata();
        const fileSize = Math.max(0, Number(fileMetadata.size || 0));
        const rangeHeader = String(request.get("range") || "").trim();
        let start = 0;
        let end = Math.max(0, fileSize - 1);
        let partialContent = false;

        if (rangeHeader && fileSize > 0) {
          const match = /^bytes=(\d*)-(\d*)$/i.exec(rangeHeader);
          if (!match) {
            response.set("Content-Range", `bytes */${fileSize}`);
            response.status(416).end();
            return;
          }
          if (match[1]) {
            start = Number(match[1]);
            end = match[2] ? Math.min(Number(match[2]), fileSize - 1) : fileSize - 1;
          } else if (match[2]) {
            const suffixLength = Math.min(Number(match[2]), fileSize);
            start = Math.max(0, fileSize - suffixLength);
            end = fileSize - 1;
          }
          if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start > end || start >= fileSize) {
            response.set("Content-Range", `bytes */${fileSize}`);
            response.status(416).end();
            return;
          }
          partialContent = true;
        }

        const contentLength = fileSize > 0 ? end - start + 1 : 0;
        response.set("Content-Type", "audio/mpeg");
        response.set("Cache-Control", "private, max-age=3600");
        response.set("X-Content-Type-Options", "nosniff");
        response.set("Accept-Ranges", "bytes");
        if (fileSize > 0) response.set("Content-Length", String(contentLength));
        if (partialContent) {
          response.set("Content-Range", `bytes ${start}-${end}/${fileSize}`);
          response.status(206);
        } else {
          response.status(200);
        }
        storageFile.createReadStream(fileSize > 0 ? { start, end } : {})
          .on("error", (error) => {
            console.error("Voice stream failed", error);
            if (!response.headersSent) response.status(404).json({ error: "voice-not-found" });
            else response.end();
          })
          .pipe(response);
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
    const exerciseName = String(request.body?.exerciseName || "Neue Uebung").trim();
    const voiceSettings = {
      stability: clampVoiceSetting(requestedVoiceSettings.stability, 0.58),
      similarity_boost: clampVoiceSetting(requestedVoiceSettings.similarity_boost, 0.82),
      style: clampVoiceSetting(requestedVoiceSettings.style, 0.12),
      use_speaker_boost: requestedVoiceSettings.use_speaker_boost !== false,
    };
    const textHash = hashClientText(text);
    const cacheHash = hashVoiceCache(
      JSON.stringify({
        text: normalizeVoiceText(text),
        voiceId,
        voiceSettings,
        model: "eleven_multilingual_v2",
      }),
    );
    const safeName = slugify(exerciseName);
    const cachedPath = `editor-voices/${safeName}/voice_${cacheHash}.mp3`;

    if (!text) {
      response.status(400).json({ error: "missing-text" });
      return;
    }

    if (text.length > 900) {
      response.status(400).json({ error: "text-too-long" });
      return;
    }

    try {
      let apiKey = String(request.body?.apiKey || "").trim();
      if (!apiKey || !apiKey.startsWith("sk-")) {
        const settingsSnapshot = await admin.firestore().collection(SETTINGS_COLLECTION).doc(ELEVENLABS_SETTINGS_DOC).get().catch(() => null);
        const storedSettings = settingsSnapshot?.exists ? normalizeElevenLabsSettings(settingsSnapshot.data()) : null;
        apiKey = String(storedSettings?.apiKey || process.env.ELEVENLABS_API_KEY || "").trim();
      }

      if (!apiKey) {
        response.status(400).json({ error: "missing-elevenlabs-api-key" });
        return;
      }

      if (shouldStore) {
        const cachedFile = admin.storage().bucket(STORAGE_BUCKET).file(cachedPath);
        const [exists] = await cachedFile.exists();
        if (exists) {
          response.set("Cache-Control", "no-store");
          response.status(200).json({
            path: cachedPath,
            downloadUrl: getStoredVoiceDownloadUrl(cachedPath),
            voiceId,
            voiceSettings,
            textHash,
            cached: true,
          });
          return;
        }
      }

      const ttsResponse = await fetch(`${ELEVENLABS_TTS_URL}/${voiceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: voiceSettings,
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
        const path = cachedPath;
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
              textHash,
              cacheHash,
            },
          },
        });

        response.set("Cache-Control", "no-store");
        response.status(200).json({
          path,
          downloadUrl: getStoredVoiceDownloadUrl(path),
          voiceId,
          voiceSettings,
          textHash,
          cached: false,
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

  response.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  response.set("Access-Control-Allow-Headers", "Authorization, Content-Type, X-Media-Metadata");

  if (request.method === "OPTIONS") {
    response.status(204).send("");
    return true;
  }

  return false;
}

async function requireFirebaseUser(request, response) {
  const authorization = String(request.get("Authorization") || "");
  const idToken = authorization.startsWith("Bearer ") ? authorization.slice(7).trim() : "";
  if (!idToken) {
    response.status(401).json({ error: "authentication-required" });
    return null;
  }
  try {
    return await admin.auth().verifyIdToken(idToken);
  } catch (error) {
    console.warn("Firebase authentication failed", error?.message || error);
    response.status(401).json({ error: "invalid-authentication" });
    return null;
  }
}

function normalizePatientProfile(profile = {}, fallbackId = "") {
  const name = String(profile?.name || "").trim();
  const id = String(profile?.id || fallbackId || slugify(name) || "patient").trim();
  const settings = profile?.settings && typeof profile.settings === "object"
    ? JSON.parse(JSON.stringify(profile.settings))
    : {};
  return {
    id,
    name,
    settings,
    updatedAt: profile?.updatedAt || new Date().toISOString(),
  };
}

async function saveActivePatient(name, patientId) {
  await admin.firestore().collection(SETTINGS_COLLECTION).doc(ACTIVE_PATIENT_DOC).set({
    name: String(name || "").trim(),
    patientId: String(patientId || "").trim(),
    updatedAt: new Date().toISOString(),
  });
}

function safeStorageFileName(fileName = "medium") {
  const parts = String(fileName).split(".");
  const extension = parts.length > 1 ? `.${parts.pop().replace(/[^a-z0-9]/gi, "").toLowerCase()}` : "";
  const base = parts.join(".").normalize("NFKD").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "") || "medium";
  return `${base}${extension}`;
}

function inferMediaMimeType(mimeType = "", fileName = "") {
  const normalizedMimeType = String(mimeType || "").trim().toLowerCase();
  if (normalizedMimeType && normalizedMimeType !== "application/octet-stream") return normalizedMimeType;
  const extension = String(fileName || "").split(".").pop()?.toLowerCase() || "";
  const byExtension = {
    mp4: "video/mp4",
    m4v: "video/x-m4v",
    mov: "video/quicktime",
    webm: "video/webm",
    mp3: "audio/mpeg",
    m4a: "audio/mp4",
    wav: "audio/wav",
    ogg: "audio/ogg",
    aac: "audio/aac",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
  };
  return byExtension[extension] || "application/octet-stream";
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

function getStoredVoiceDownloadUrl(path) {
  const cleanPath = String(path || "").trim();
  return cleanPath ? `/api/voice?path=${encodeURIComponent(cleanPath)}` : "";
}

function getGlobalVoiceAudioUrl(url = "", path = "") {
  const storedPath = String(path || "").trim();
  if (storedPath) return getStoredVoiceDownloadUrl(storedPath);

  const audioUrl = String(url || "").trim();
  if (!audioUrl) return "";
  if (/^(blob:|data:)/i.test(audioUrl)) return audioUrl;

  try {
    const parsedUrl = new URL(audioUrl, "https://logosound-19293.web.app");
    if (parsedUrl.pathname === "/api/voice") {
      const voicePath = parsedUrl.searchParams.get("path") || "";
      return voicePath ? getStoredVoiceDownloadUrl(voicePath) : audioUrl;
    }
  } catch (error) {}

  return audioUrl;
}

function normalizeVoiceText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

function hashVoiceCache(text) {
  return crypto.createHash("sha1").update(normalizeVoiceText(text)).digest("hex").slice(0, 16);
}

function hashClientText(text) {
  const normalizedText = normalizeVoiceText(text);
  let hash = 0;
  for (let index = 0; index < normalizedText.length; index += 1) {
    hash = (hash * 31 + normalizedText.charCodeAt(index)) | 0;
  }
  return String(hash >>> 0);
}

function clampVoiceSetting(value, fallback) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.max(0, Math.min(1, numericValue));
}

function normalizeElevenLabsSettings(settings = {}) {
  const defaultVoiceId = DEFAULT_VOICE_ID;
  const fallbackVoice = {
    key: "standard",
    name: "Standard",
    gender: "female",
    voiceId: defaultVoiceId,
  };
  const voices = Array.isArray(settings.voices)
    ? settings.voices
        .map((voice) => ({
          key: String(voice?.key || voice?.name || voice?.voiceId || "").trim(),
          name: String(voice?.name || "Stimme").trim(),
          gender: ["male", "female", "neutral"].includes(voice?.gender) ? voice.gender : "neutral",
          voiceId: String(voice?.voiceId || "").trim(),
        }))
        .filter((voice) => voice.voiceId)
    : [];

  if (!voices.length) {
    voices.push({
      ...fallbackVoice,
      voiceId: String(settings.voiceId || defaultVoiceId).trim(),
    });
  }

  const activeVoiceKey = voices.some((voice) => voice.key === settings.activeVoiceKey)
    ? settings.activeVoiceKey
    : voices[0].key;
  const activeVoice = voices.find((voice) => voice.key === activeVoiceKey) || voices[0];

  return {
    activeVoiceKey,
    voiceId: activeVoice.voiceId || defaultVoiceId,
    voices,
    stability: Math.round(clampVoiceSetting(Number(settings.stability) / 100, 0.58) * 100),
    similarity: Math.round(clampVoiceSetting(Number(settings.similarity) / 100, 0.82) * 100),
    style: Math.round(clampVoiceSetting(Number(settings.style) / 100, 0.12) * 100),
    speakerBoost: settings.speakerBoost !== false,
    apiKey: String(settings.apiKey || "").trim(),
    hasApiKey: Boolean(String(settings.apiKey || "").trim()) || Boolean(settings.hasApiKey),
  };
}

function normalizeChatGptSettings(settings = {}) {
  return {
    enabled: Boolean(settings.enabled),
    apiKey: String(settings.apiKey || "").trim(),
    model: String(settings.model || "gpt-5").trim() || "gpt-5",
    systemPrompt: String(
      settings.systemPrompt
        || "Erstelle eine kurze, freundliche logopädische Voice-Instruktion auf Deutsch. Sprich den Patienten direkt an. Maximal drei kurze Sätze. Keine Markdown-Zeichen.",
    ).trim(),
  };
}

function collectEditorExerciseAudioPaths(exercise) {
  const paths = new Set();
  [
    exercise?.voiceAudioPath,
    exercise?.demoAudioPath,
    ...(Array.isArray(exercise?.demoAudioSegments)
      ? exercise.demoAudioSegments.map((segment) => segment?.path)
      : []),
    ...(Array.isArray(exercise?.dialogTurns)
      ? exercise.dialogTurns.map((turn) => turn?.audioPath)
      : []),
  ].forEach((path) => {
    const cleanPath = String(path || "").trim();
    if (cleanPath) paths.add(cleanPath);
  });
  return [...paths];
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

function buildChatGptEditorPrompt(prompt) {
  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) return "";

  return [
    "Du bist ein KI-Assistent fuer eine logopaedische Trainings-App.",
    "Erstelle auf Grundlage der Benutzereingabe passende sprachliche Uebungsinhalte.",
    "Die KI-Eingabe ist frei und darf nicht auf einzelne Woerter oder Uebungssaetze beschraenkt werden.",
    "Der Benutzer kann auch komplette Texte erzeugen lassen, zum Beispiel Gedichte, Dialoge oder Alltagstexte.",
    "",
    "REGELN:",
    "Befolge die Benutzereingabe moeglichst genau.",
    "Erkenne selbststaendig, ob Woerter, Saetze, ein Text, Gedicht, Dialog oder eine andere Uebungsform gewuenscht wird.",
    "Wenn ein bestimmter Laut oder Buchstabe verlangt wird, soll dieser deutlich und sinnvoll vorkommen.",
    "Achte darauf, dass Inhalte fuer den deutschsprachigen logopaedischen Einsatz geeignet sind.",
    "Pruefe bei Lautuebungen vor der Ausgabe, dass der gewuenschte Laut in jeder erzeugten Einheit tatsaechlich vorkommt.",
    "Verwende natuerlich klingende und grammatikalisch korrekte Sprache.",
    "Texte sollen gut lesbar und gut sprechbar sein.",
    "Vermeide unnoetig komplizierte Woerter, ausser der Benutzer verlangt ausdruecklich einen hoeheren Schwierigkeitsgrad.",
    "Vermeide Wiederholungen und moeglichst identische Satzstrukturen.",
    "Bei logopaedischen Uebungen steht die gute Sprechbarkeit im Vordergrund.",
    "Wenn eine Anzahl genannt wird, liefere genau diese Anzahl.",
    "Wenn keine Anzahl genannt wird, entscheide eine angemessene Laenge entsprechend der Aufgabe.",
    "Gib ausschliesslich den erzeugten Inhalt zurueck. Keine Erklaerung, keine Einleitung und keine Hinweise zur Erstellung.",
    "",
    "RUECKGABEFORMAT FUER DIE APP:",
    "Antworte ausschliesslich als JSON ohne Markdown.",
    "Verwende als kind nur: sentences, text, long_text, dialog.",
    "Wenn eine Uebungsserie mit Woertern oder Saetzen gewuenscht ist, verwende items als Liste und kind sentences.",
    "Wenn ein kurzer zusammenhaengender Text gewuenscht ist, verwende content und kind text.",
    "Wenn ein Gedicht, laengerer Lesetext oder Abschnittstext gewuenscht ist, verwende content und kind long_text.",
    "Wenn ein Dialog gewuenscht ist, verwende dialogTurns mit role system oder patient und kind dialog.",
    "Fuelle zusaetzlich einen kurzen title und eine knappe summary passend zum Ergebnis.",
    '{"title":"...","kind":"sentences|text|long_text|dialog","summary":"...","items":["..."],"content":"...","dialogTurns":[{"role":"system","text":"..."},{"role":"patient","text":"..."}]}',
    `BENUTZERWUNSCH: ${cleanPrompt}`,
  ].join("\n");
}
function parseEditorExerciseAiResponse(text) {
  const raw = String(text || "").trim();
  if (!raw) return null;

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  const jsonText = jsonMatch ? jsonMatch[0] : raw;

  try {
    const parsed = JSON.parse(jsonText);
    return normalizeGeneratedEditorExercise(parsed);
  } catch (error) {
    console.error("Editor AI JSON parse failed", error, raw.slice(0, 400));
    return null;
  }
}

function normalizeGeneratedEditorExercise(exercise = {}) {
  const kind = String(exercise?.kind || exercise?.mode || "sentences").trim().toLowerCase();
  const title = String(exercise?.title || exercise?.name || "Neue Übung").trim();
  const summary = String(exercise?.summary || exercise?.description || "").trim();
  const items = Array.isArray(exercise?.items)
    ? exercise.items.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  const content = String(exercise?.content || "").trim();
  const dialogTurns = Array.isArray(exercise?.dialogTurns)
    ? exercise.dialogTurns
        .map((turn) => ({
          role: String(turn?.role || "").trim().toLowerCase() === "patient" ? "patient" : "system",
          text: String(turn?.text || "").trim(),
        }))
        .filter((turn) => turn.text)
    : [];

  return {
    title,
    kind: ["dialog", "text", "long_text", "sentences"].includes(kind) ? kind : "sentences",
    summary,
    items,
    content,
    dialogTurns,
  };
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
            audioUrl: getGlobalVoiceAudioUrl(turn?.audioUrl, turn?.audioPath),
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
    voiceAudioUrl: getGlobalVoiceAudioUrl(exercise.voiceAudioUrl, exercise.voiceAudioPath),
    voiceAudioPath: String(exercise.voiceAudioPath || ""),
    voiceAudioDataUrl: String(exercise.voiceAudioDataUrl || ""),
    demoAudioUrl: getGlobalVoiceAudioUrl(exercise.demoAudioUrl, exercise.demoAudioPath),
    demoAudioPath: String(exercise.demoAudioPath || ""),
    demoAudioSegments: Array.isArray(exercise.demoAudioSegments)
      ? exercise.demoAudioSegments.map((segment, index) => ({
          index: Number.isFinite(Number(segment?.index)) ? Number(segment.index) : index,
          url: getGlobalVoiceAudioUrl(segment?.url, segment?.path),
          path: String(segment?.path || ""),
          voiceId: String(segment?.voiceId || ""),
          voiceSettings: segment?.voiceSettings || null,
          textHash: String(segment?.textHash || ""),
          speed: Number(segment?.speed || 0),
          updatedAt: String(segment?.updatedAt || ""),
        }))
      : [],
  };
}
