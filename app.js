import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const cameraPreview = document.querySelector("#cameraPreview");
const cameraStartOverlay = document.querySelector("#cameraStartOverlay");
const cameraStartButton = document.querySelector("#cameraStartButton");
const avatarButton = document.querySelector("#avatarButton");
const menuButton = document.querySelector("#menuButton");
const appMenu = document.querySelector("#appMenu");
const topBarTitle = document.querySelector("#topBarTitle");
const toggleVideoButton = document.querySelector("#toggleVideoButton");
const permissionState = document.querySelector("#permissionState");
const patientName = document.querySelector("#patientName");
const savePatientButton = document.querySelector("#savePatientButton");
const patientSuggestions = document.querySelector("#patientSuggestions");
const exerciseName = document.querySelector("#exerciseName");
const recordingExerciseShortcuts = document.querySelector("#recordingExerciseShortcuts");
const editorSavedExercises = document.querySelector("#editorSavedExercises");
const newEditorExerciseButton = document.querySelector("#newEditorExerciseButton");
const exerciseEditor = document.querySelector("#exerciseEditor");
const editorExerciseName = document.querySelector("#editorExerciseName");
const editorMode = document.querySelector("#editorMode");
const editorContent = document.querySelector("#editorContent");
const editorSentenceBuilder = document.querySelector("#editorSentenceBuilder");
const editorSentenceInput = document.querySelector("#editorSentenceInput");
const addEditorSentenceButton = document.querySelector("#addEditorSentenceButton");
const editorSentenceList = document.querySelector("#editorSentenceList");
const editorVoiceInstruction = document.querySelector("#editorVoiceInstruction");
const suggestVoiceButton = document.querySelector("#suggestVoiceButton");
const generateVoiceAudioButton = document.querySelector("#generateVoiceAudioButton");
const editorVoicePreview = document.querySelector("#editorVoicePreview");
const editorVoiceState = document.querySelector("#editorVoiceState");
const editorUseRepeats = document.querySelector("#editorUseRepeats");
const repeatControl = document.querySelector("#repeatControl");
const editorRepeats = document.querySelector("#editorRepeats");
const editorSpeed = document.querySelector("#editorSpeed");
const editorSpeedValue = document.querySelector("#editorSpeedValue");
const editorPreview = document.querySelector("#editorPreview");
const saveEditorExerciseButton = document.querySelector("#saveEditorExerciseButton");
const recordingTime = document.querySelector("#recordingTime");
const volumeValue = document.querySelector("#volumeValue");
const frequencyValue = document.querySelector("#frequencyValue");
const voiceFrequencyOverlay = document.querySelector("#voiceFrequencyOverlay");
const voiceFrequencyText = document.querySelector("#voiceFrequencyText");
const voiceFrequencyMarker = document.querySelector("#voiceFrequencyMarker");
const sensitivitySlider = document.querySelector("#sensitivitySlider");
const sensitivityValue = document.querySelector("#sensitivityValue");
const playbackVolumeSlider = document.querySelector("#playbackVolumeSlider");
const playbackVolumeValue = document.querySelector("#playbackVolumeValue");
const liveWaveform = document.querySelector("#liveWaveform");
const frequencyTimeline = document.querySelector("#frequencyTimeline");
const countdownOverlay = document.querySelector("#countdownOverlay");
const karaokeOverlay = document.querySelector("#karaokeOverlay");
const playbackWaveform = document.querySelector("#playbackWaveform");
const recordButton = document.querySelector("#recordButton");
const message = document.querySelector("#message");
const playbackEmptyState = document.querySelector("#playbackEmptyState");
const emptyRecordButton = document.querySelector("#emptyRecordButton");
const emptyHistoryButton = document.querySelector("#emptyHistoryButton");
const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const durationBadge = document.querySelector("#durationBadge");
const recordingPlayer = document.querySelector("#recordingPlayer");
const playbackKaraokeOverlay = document.querySelector("#playbackKaraokeOverlay");
const playPauseButton = document.querySelector("#playPauseButton");
const playbackSeek = document.querySelector("#playbackSeek");
const playbackTimeLabel = document.querySelector("#playbackTimeLabel");
const calibrationButton = document.querySelector("#calibrationButton");
const averageVolume = document.querySelector("#averageVolume");
const maxVolume = document.querySelector("#maxVolume");
const sampleCount = document.querySelector("#sampleCount");
const downloadAudioButton = document.querySelector("#downloadAudioButton");
const downloadJsonButton = document.querySelector("#downloadJsonButton");
const retakeButton = document.querySelector("#retakeButton");
const deleteButton = document.querySelector("#deleteButton");
const firebaseState = document.querySelector("#firebaseState");
const libraryTitle = document.querySelector("#libraryTitle");
const recordingCountBadge = document.querySelector("#recordingCountBadge");
const patientRecordingCount = document.querySelector("#patientRecordingCount");
const patientAverageDuration = document.querySelector("#patientAverageDuration");
const patientAverageVolume = document.querySelector("#patientAverageVolume");
const statisticsRecordingSelect = document.querySelector("#statisticsRecordingSelect");
const statisticsPositionSlider = document.querySelector("#statisticsPositionSlider");
const statisticsPositionValue = document.querySelector("#statisticsPositionValue");
const audioAnalysisTitle = document.querySelector("#audioAnalysisTitle");
const audioAnalysisGrid = document.querySelector("#audioAnalysisGrid");
const audioAnalysisNote = document.querySelector("#audioAnalysisNote");
const settingsVoiceId = document.querySelector("#settingsVoiceId");
const settingsVoiceStability = document.querySelector("#settingsVoiceStability");
const settingsVoiceStabilityValue = document.querySelector("#settingsVoiceStabilityValue");
const settingsVoiceSimilarity = document.querySelector("#settingsVoiceSimilarity");
const settingsVoiceSimilarityValue = document.querySelector("#settingsVoiceSimilarityValue");
const settingsVoiceStyle = document.querySelector("#settingsVoiceStyle");
const settingsVoiceStyleValue = document.querySelector("#settingsVoiceStyleValue");
const settingsSpeakerBoost = document.querySelector("#settingsSpeakerBoost");
const settingsSensitivity = document.querySelector("#settingsSensitivity");
const settingsSensitivityValue = document.querySelector("#settingsSensitivityValue");
const settingsCalibrationButton = document.querySelector("#settingsCalibrationButton");
const settingsPlaybackVolume = document.querySelector("#settingsPlaybackVolume");
const settingsPlaybackVolumeValue = document.querySelector("#settingsPlaybackVolumeValue");
const settingsState = document.querySelector("#settingsState");
const recordingsList = document.querySelector("#recordingsList");
const navButtons = document.querySelectorAll(".nav-button");
const appSections = document.querySelectorAll(".app-section");
const instructionAudio = new Audio();
instructionAudio.preload = "auto";
instructionAudio.crossOrigin = "anonymous";

const DB_NAME = "logosound-local";
const STORE_NAME = "recordings";
const SELECTED_PATIENT_KEY = "logosound-selected-patient";
const SENSITIVITY_KEY = "logosound-sensitivity";
const PLAYBACK_GAIN_KEY = "logosound-playback-gain";
const ELEVENLABS_SETTINGS_KEY = "logosound-elevenlabs-settings";
const EDITOR_DRAFT_KEY = "logosound-editor-draft";
const SAVED_EDITOR_EXERCISE_KEY = "logosound-saved-editor-exercise";
const SAVED_EDITOR_EXERCISES_KEY = "logosound-saved-editor-exercises";
const MAX_VISIBLE_SAMPLES = 240;
const AMPLITUDE_SAMPLE_INTERVAL = 40;
const NOISE_FLOOR = 0.35;
const RMS_SENSITIVITY = 30;
const PEAK_SENSITIVITY = 2.2;
const VOLUME_NOISE_GATE = 1.8;
const VOLUME_SOFT_LIMIT = 62;
const WAVEFORM_VISUAL_CEILING = 82;
const WAVEFORM_DYNAMIC_RANGE = 1.35;
const VOICE_LOW_HZ = 160;
const VOICE_HIGH_HZ = 2800;
const PITCH_LOW_HZ = 70;
const PITCH_HIGH_HZ = 320;
const NOISE_LOW_HZ = 20;
const NOISE_HIGH_HZ = 120;
const SAVE_TIMEOUT_MS = 3500;
const INSTRUCTION_TIMEOUT_MS = 12000;
const RECORDING_WIDTH = 720;
const RECORDING_HEIGHT = 1280;
const COUNTDOWN_STEPS = ["3", "2", "1"];
const DEFAULT_KARAOKE_WORD_SECONDS = 1.05;
const DEFAULT_KARAOKE_PAUSE_SECONDS = 0.45;
const RECORDING_TAIL_SECONDS = 1.2;
const SENTENCE_SILENCE_MS = 1000;
const SENTENCE_SPEECH_THRESHOLD = 8;
const SENTENCE_SILENCE_THRESHOLD = 7;
const SENTENCE_MAX_SECONDS = 75;
const EDITOR_SPEEDS = {
  1: { label: "Sehr langsam", wordSeconds: 1.35, pauseSeconds: 0.7 },
  2: { label: "Langsam", wordSeconds: 1.18, pauseSeconds: 0.56 },
  3: { label: "Normal", wordSeconds: 0.98, pauseSeconds: 0.42 },
  4: { label: "Schnell", wordSeconds: 0.78, pauseSeconds: 0.3 },
  5: { label: "Sehr schnell", wordSeconds: 0.62, pauseSeconds: 0.22 },
};
const EXERCISE_INSTRUCTIONS = {
  "Vokal A halten":
    "Bitte halten Sie den Vokal A gleichmäßig. Achten Sie auf eine ruhige Stimme und eine stabile Lautstärke.",
  "A E I O U":
    "Bitte sprechen Sie die Vokale nacheinander deutlich aus. A, E, I, O, U. Achten Sie auf klare Mundbewegungen.",
  "Pa Ta Ka":
    "Bitte sprechen Sie nur die Einzelsilben Pa, Ta und Ka. Wiederholen Sie diese zehnmal mit kurzer Pause zwischen den Durchgängen.",
  "Text lesen":
    "Bitte lesen Sie den eingeblendeten Text ruhig und deutlich vor. Achten Sie auf gleichmäßiges Tempo, klare Wörter und sichtbare Mundbewegungen.",
};
const STANDARD_EDITOR_EXERCISES = [
  {
    id: "vokal-a-halten",
    name: "Vokal A halten",
    mode: "vowels",
    content: "A halten",
    repeats: 1,
    speed: 3,
    voiceInstruction: EXERCISE_INSTRUCTIONS["Vokal A halten"],
  },
  {
    id: "vokale-nacheinander",
    name: "Vokale nacheinander",
    mode: "vowels",
    content: "A E I O U",
    repeats: 1,
    speed: 3,
    voiceInstruction: EXERCISE_INSTRUCTIONS["A E I O U"],
  },
  {
    id: "pa-ta-ka-10x",
    name: "Pa Ta Ka 10x",
    mode: "syllables",
    content: "Pa Ta Ka",
    repeats: 10,
    speed: 4,
    voiceInstruction: EXERCISE_INSTRUCTIONS["Pa Ta Ka"],
  },
  {
    id: "text-lesen",
    name: "Text lesen",
    mode: "text",
    content:
      "Heute üben wir eine ruhige Stimme. Ich lese langsam, spreche deutlich und achte darauf, dass jeder Satz klar klingt und mein Mund beim Sprechen locker bleibt und die Lippen gut arbeiten.",
    repeats: 1,
    speed: 4,
    voiceInstruction: EXERCISE_INSTRUCTIONS["Text lesen"],
  },
];
const MIME_TYPES = [
  { type: "video/webm;codecs=vp8,opus", extension: "webm" },
  { type: "video/webm", extension: "webm" },
  { type: "video/mp4", extension: "mp4" },
];
const firebaseConfig = {
  apiKey: "AIzaSyDC0nyziSViujzJqSTeVO9tv6x7e-cDkus",
  authDomain: "logosound-19293.firebaseapp.com",
  projectId: "logosound-19293",
  storageBucket: "logosound-19293.firebasestorage.app",
  messagingSenderId: "29006924401",
  appId: "1:29006924401:web:c4f49f09b70c32eaa3a9d0",
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);
const appSplash = document.querySelector("#appSplash");

let mediaStream;
let mediaRecorder;
let audioContext;
let playbackAudioContext;
let analyser;
let audioSource;
let audioOnlyStream;
let audioOnlyStreamOwnsTracks = false;
let silentGain;
let audioProcessor;
let playbackSource;
let playbackGain;
let composedRecordingStream;
let composedRecordingAudioTrack;
let recordingCanvas;
let recordingCanvasContext;
let recordingDrawFrame;
let animationFrame;
let timerId;
let startedAt = 0;
let mediaChunks = [];
let amplitudes = [];
let rawAmplitudes = [];
let volumeValues = [];
let rawVolumeValues = [];
let frequencyValues = [];
let pitchHzValues = [];
let currentVideoBlob;
let currentMetadata;
let currentVideoUrl;
let selectedAnalysisRecordingId = "";
let selectedAnalysisPosition = 0;
let lastAmplitudeAt = 0;
let isRecording = false;
let isCalibrating = false;
let allRecordings = [];
let saveTimeoutId;
let adaptiveNoiseFloor = 0;
let lastSilentSignalNoticeAt = 0;
let silentSignalStartedAt = 0;
let analyserRestartInProgress = false;
let processorRms = 0;
let processorPeak = 0;
let lastProcessorSignalAt = 0;
let karaokeWords = [];
let karaokeTimeline = [];
let playbackKaraokeTimeline = [];
let activeKaraokeIndex = 0;
let sentenceSilenceStartedAt = 0;
let sentenceHasSpeechSinceAdvance = false;
let sentenceStopScheduled = false;
let sentencePeakVolumeSinceAdvance = 0;
let playbackAnimationFrame;
let autoStopTimeoutId;
let hardStopTimeoutId;
let responsiveRefreshId;
let cameraStartRetryId;
let savedEditorExercise;
let savedEditorExercises = [];
let activeEditorExerciseName = "";
let editorVoiceAudioDataUrl = "";
let editorVoiceAudioUrl = "";
let editorVoiceAudioPath = "";
let isVideoPreviewHidden = false;
let instructionPlaybackActive = false;

document.body.classList.add("camera-not-ready");
recordButton.disabled = true;
patientName.value = localStorage.getItem(SELECTED_PATIENT_KEY) || patientName.value;
sensitivitySlider.value = clampSensitivity(localStorage.getItem(SENSITIVITY_KEY) || sensitivitySlider.value);
sensitivityValue.textContent = formatSensitivityLabel(sensitivitySlider.value);
playbackVolumeSlider.value = localStorage.getItem(PLAYBACK_GAIN_KEY) || playbackVolumeSlider.value;
playbackVolumeValue.textContent = `${playbackVolumeSlider.value}%`;
loadSettingsControls();
loadSavedEditorExercise();
loadEditorDraft();
setActiveView("record");
hideSplashAfterStartup();

init();

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.targetView);
  });
});

menuButton?.addEventListener("click", () => {
  appMenu?.classList.toggle("is-hidden");
});

avatarButton?.addEventListener("click", () => {
  setActiveView("stats");
  appMenu?.classList.add("is-hidden");
});

appMenu?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-menu-view]");
  if (!button) return;
  setActiveView(button.dataset.menuView);
  appMenu.classList.add("is-hidden");
});

emptyRecordButton?.addEventListener("click", () => {
  setActiveView("record");
});

emptyHistoryButton?.addEventListener("click", () => {
  setActiveView("history");
});

document.addEventListener("click", (event) => {
  if (appMenu?.classList.contains("is-hidden")) return;
  if (event.target.closest("#appMenu, #menuButton")) return;
  appMenu.classList.add("is-hidden");
});

window.addEventListener("pageshow", () => {
  if (mediaStream) ensureCameraPreviewPlaying();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && mediaStream) ensureCameraPreviewPlaying();
});

cameraStartButton.addEventListener("click", async () => {
  await ensureMediaStream();
});

function hideSplashAfterStartup() {
  window.setTimeout(() => {
    appSplash?.classList.add("is-hidden");

    window.setTimeout(() => {
      appSplash?.remove();
    }, 450);
  }, 3000);
}

async function init() {
  drawWaveform(liveWaveform, [], {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    currentLevel: 0,
  });
  updateVoiceFrequencyDisplay(0, 0);
  drawFrequencyTimeline(frequencyTimeline, [], []);
  drawWaveform(playbackWaveform, [], { mode: "playback" });
  updateEditorForm();
  setupKaraokeText();
  permissionState.textContent = "Bereit";
  message.textContent = "Kamera und Mikrofon vor der ersten Übung aktivieren.";
  recordButton.disabled = false;
  loadCloudEditorExercises().then(() => {
    updateEditorForm();
    setupKaraokeText();
  });
  await refreshRecordings();
}
recordButton.addEventListener("click", async () => {
  if (isRecording || mediaRecorder?.state === "recording") {
    stopRecording();
  } else {
    const hadActiveStream = hasActiveMediaStream();
    const streamReady = await ensureMediaStream();
    if (!streamReady) return;
    if (!hadActiveStream) {
      message.textContent = "Kamera aktiv. Jetzt noch einmal Übung starten tippen.";
      return;
    }
    const audioPreparation = prepareRecordingAudio();
    await runCountdownAndStart(audioPreparation);
  }
});

savePatientButton.addEventListener("click", () => {
  selectPatient(patientName.value);
});

patientName.addEventListener("change", () => {
  selectPatient(patientName.value);
});

exerciseName.addEventListener("change", () => {
  setupKaraokeText();
  renderRecordingExerciseShortcuts();
  message.textContent = `Übung ausgewählt: ${getExerciseLabel()}`;
});

[editorExerciseName, editorMode, editorContent, editorVoiceInstruction, editorUseRepeats, editorRepeats, editorSpeed].forEach((input) => {
  input.addEventListener("input", () => {
    saveEditorDraft();
    updateEditorForm();
    if (input === editorContent) renderEditorSentenceList();
    if (exerciseName.value === "custom-editor") setupKaraokeText();
  });
});

editorMode.addEventListener("change", () => {
  applyEditorModeDefaults();
  saveEditorDraft();
  updateEditorForm();
});

addEditorSentenceButton?.addEventListener("click", () => {
  addEditorSentence();
});

editorSentenceInput?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  addEditorSentence();
});

saveEditorExerciseButton.addEventListener("click", () => {
  saveEditorExercise();
});

editorSavedExercises.addEventListener("change", () => {
  loadEditorExerciseIntoForm(editorSavedExercises.value);
});

newEditorExerciseButton.addEventListener("click", () => {
  activeEditorExerciseName = "";
  editorSavedExercises.value = "";
  resetEditorForm();
  saveEditorDraft();
});

suggestVoiceButton.addEventListener("click", () => {
  editorVoiceInstruction.value = buildVoiceInstructionSuggestion();
  saveEditorDraft();
  editorVoiceState.textContent = "Voice-Text vorgeschlagen.";
});

generateVoiceAudioButton.addEventListener("click", async () => {
  await generateVoiceAudio();
});

calibrationButton.addEventListener("click", async () => {
  if (isCalibrating) {
    stopCalibration();
  } else {
    await startCalibration();
  }
});

settingsCalibrationButton?.addEventListener("click", async () => {
  setActiveView("record");
  if (isCalibrating) {
    stopCalibration();
  } else {
    await startCalibration();
  }
});

sensitivitySlider.addEventListener("input", () => {
  updateSensitivitySetting(sensitivitySlider.value);
});

playbackVolumeSlider.addEventListener("input", () => {
  updatePlaybackVolumeSetting(playbackVolumeSlider.value);
});

settingsSensitivity?.addEventListener("input", () => {
  updateSensitivitySetting(settingsSensitivity.value);
});

settingsPlaybackVolume?.addEventListener("input", () => {
  updatePlaybackVolumeSetting(settingsPlaybackVolume.value);
});

[
  settingsVoiceId,
  settingsVoiceStability,
  settingsVoiceSimilarity,
  settingsVoiceStyle,
  settingsSpeakerBoost,
].forEach((input) => {
  input?.addEventListener("input", () => {
    saveElevenLabsSettings();
    renderSettingsControls();
  });
  input?.addEventListener("change", () => {
    saveElevenLabsSettings();
    renderSettingsControls();
  });
});

statisticsRecordingSelect?.addEventListener("change", () => {
  selectedAnalysisRecordingId = statisticsRecordingSelect.value;
  selectedAnalysisPosition = 0;
  if (statisticsPositionSlider) statisticsPositionSlider.value = "0";
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

statisticsPositionSlider?.addEventListener("input", () => {
  selectedAnalysisPosition = Number(statisticsPositionSlider.value) / 1000;
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

document.addEventListener("pointerup", (event) => {
  if (!isRecording) return;

  const interactiveElement = event.target.closest("button, input, a, #recordingPlayer");
  if (interactiveElement) return;

  toggleRecordingView();
});

toggleVideoButton.addEventListener("click", () => {
  toggleVideoPreview();
});

recordingPlayer.addEventListener("timeupdate", () => {
  updatePlaybackVisuals();
});

recordingPlayer.addEventListener("ended", () => {
  if (currentMetadata) {
    stopPlaybackAnimation();
    updatePlaybackVisuals(1);
    playPauseButton.textContent = "Play";
  }
});

recordingPlayer.addEventListener("loadedmetadata", () => {
  applyVideoAspectRatio(recordingPlayer);
  refreshPlaybackReadyState();
});

recordingPlayer.addEventListener("canplay", () => {
  refreshPlaybackReadyState();
});

window.addEventListener("orientationchange", scheduleResponsiveMediaRefresh);
window.addEventListener("resize", scheduleResponsiveMediaRefresh);

recordingPlayer.addEventListener("play", () => {
  recordingPlayer.muted = false;
  recordingPlayer.volume = 1;
  ensurePlaybackAudioBoost();
  playPauseButton.textContent = "Pause";
  startPlaybackAnimation();
});

recordingPlayer.addEventListener("pause", () => {
  playPauseButton.textContent = "Play";
  stopPlaybackAnimation();
  updatePlaybackVisuals();
});

recordingPlayer.addEventListener("click", () => {
  togglePlayback();
});

playPauseButton.addEventListener("click", () => {
  togglePlayback();
});

playbackSeek.addEventListener("input", () => {
  const measuredDuration = currentMetadata?.dauerSekunden || 0;
  const mediaDuration = Number.isFinite(recordingPlayer.duration) ? recordingPlayer.duration : 0;
  const targetDuration = measuredDuration || mediaDuration || 0;
  if (!targetDuration) return;

  const targetTime = (Number(playbackSeek.value) / 1000) * targetDuration;
  recordingPlayer.currentTime =
    mediaDuration && measuredDuration && Math.abs(mediaDuration - measuredDuration) >= 0.2
      ? (targetTime / measuredDuration) * mediaDuration
      : targetTime;
  updatePlaybackVisuals();
});

retakeButton.addEventListener("click", () => {
  recordingPlayer.pause();
  resetRecordingUi();
  message.textContent = "Bereit für eine neue Aufnahme.";
});

deleteButton.addEventListener("click", async () => {
  if (currentMetadata?.id) {
    await deleteRecording(currentMetadata.id);
    await refreshRecordings();
    deleteCloudRecording(currentMetadata).catch(() => {
      firebaseState.textContent = "Lokal gelöscht. Firebase-Löschen fehlgeschlagen.";
    });
  }
  clearCurrentRecording();
  message.textContent = "Aufnahme gelöscht.";
});

downloadAudioButton.addEventListener("click", () => {
  if (currentVideoBlob && currentMetadata) {
    downloadBlob(currentVideoBlob, currentMetadata.aufnahme);
  }
});

downloadJsonButton.addEventListener("click", () => {
  if (currentMetadata) {
    const jsonBlob = new Blob([JSON.stringify(cleanMetadata(currentMetadata), null, 2)], {
      type: "application/json",
    });
    downloadBlob(jsonBlob, currentMetadata.aufnahme.replace(/\.[^.]+$/, ".json"));
  }
});

async function runCountdownAndStart(audioPreparation = Promise.resolve()) {
  try {
    recordButton.disabled = true;
    recordButton.textContent = "Instruktion läuft";
    const instructionPlayback = speakExerciseInstruction();
    await withTimeout(instructionPlayback, INSTRUCTION_TIMEOUT_MS);
    instructionPlaybackActive = false;
    await withTimeout(audioPreparation, 1800);
    await ensureRecordingAnalyserReady();
    setExerciseVisualsVisible(true);

    for (const step of COUNTDOWN_STEPS) {
      countdownOverlay.textContent = step;
      countdownOverlay.classList.remove("is-hidden");
      await wait(850);
    }

    countdownOverlay.classList.add("is-hidden");
    recordButton.disabled = false;
    await startRecording();
  } catch (error) {
    instructionPlaybackActive = false;
    setExerciseVisualsVisible(false);
    countdownOverlay.classList.add("is-hidden");
    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
    message.textContent = "Start wurde unterbrochen. Bitte erneut versuchen.";
  }
}

async function speakExerciseInstruction() {
  instructionPlaybackActive = true;
  const activeExercise = getActiveRecordingExercise();
  const editorAudio = activeExercise?.voiceAudioUrl || activeExercise?.voiceAudioDataUrl || "";
  const instruction =
    getExerciseInstruction() ||
    EXERCISE_INSTRUCTIONS[exerciseName.value] ||
    `Bitte lesen Sie die eingeblendeten Wörter deutlich und ruhig vor.`;

  if (editorAudio) {
    message.textContent = "Voice-Begleitung läuft.";
    const played = await playVoiceAudio(editorAudio);
    if (played) return;
  }

  const generatedAudio = await createTemporaryVoiceAudio(instruction);
  if (generatedAudio) {
    message.textContent = "ElevenLabs-Instruktion läuft.";
    const played = await playVoiceAudio(generatedAudio);
    URL.revokeObjectURL(generatedAudio);
    if (played) return;
  }

  message.textContent = "ElevenLabs stumm, Browser-Stimme läuft.";
  return speakWithBrowserVoice(instruction);
}

async function createTemporaryVoiceAudio(text) {
  try {
    const response = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        store: false,
        exerciseName: getExerciseLabel(),
        ...getElevenLabsRequestSettings(),
      }),
    });

    if (!response.ok) return "";
    const audioBlob = await response.blob();
    if (!audioBlob.size) return "";
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    return "";
  }
}
function speakWithBrowserVoice(instruction) {
  return new Promise((resolve) => {
    const fallbackId = window.setTimeout(resolve, INSTRUCTION_TIMEOUT_MS);
    const finish = () => {
      window.clearTimeout(fallbackId);
      resolve();
    };

    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      message.textContent = instruction;
      window.setTimeout(finish, 1800);
      return;
    }

    window.speechSynthesis.cancel();
    message.textContent = instruction;
    const utterance = new SpeechSynthesisUtterance(instruction);
    utterance.lang = "de-DE";
    utterance.rate = 0.92;
    utterance.pitch = 1;
    utterance.onend = finish;
    utterance.onerror = finish;
    window.speechSynthesis.speak(utterance);
    window.setTimeout(() => window.speechSynthesis.resume(), 80);
  });
}

function playVoiceAudio(audioUrl) {
  return new Promise((resolve) => {
    let started = false;
    const fallbackId = window.setTimeout(() => finish(started), INSTRUCTION_TIMEOUT_MS);
    const cleanup = () => {
      instructionAudio.removeEventListener("playing", handleStarted);
      instructionAudio.removeEventListener("timeupdate", handleStarted);
      instructionAudio.removeEventListener("ended", handleEnded);
      instructionAudio.removeEventListener("error", handleError);
      instructionAudio.removeEventListener("abort", handleError);
      instructionAudio.removeEventListener("stalled", handleError);
    };
    const finish = (played = started) => {
      window.clearTimeout(fallbackId);
      cleanup();
      instructionAudio.pause();
      resolve(Boolean(played));
    };
    const handleStarted = () => {
      started = true;
      message.textContent = "Instruktion wird abgespielt.";
    };
    const handleEnded = () => finish(true);
    const handleError = () => finish(false);

    cleanup();
    instructionAudio.addEventListener("playing", handleStarted);
    instructionAudio.addEventListener("timeupdate", handleStarted);
    instructionAudio.addEventListener("ended", handleEnded, { once: true });
    instructionAudio.addEventListener("error", handleError, { once: true });
    instructionAudio.addEventListener("abort", handleError, { once: true });
    instructionAudio.addEventListener("stalled", handleError, { once: true });
    instructionAudio.muted = false;
    instructionAudio.defaultMuted = false;
    instructionAudio.volume = 1;
    instructionAudio.src = audioUrl;
    instructionAudio.load();
    instructionAudio.play().catch((error) => {
      message.textContent = `ElevenLabs konnte nicht starten: ${error?.name || "Audio blockiert"}.`;
      finish(false);
    });
  });
}
async function startRecording() {
  if (!mediaStream) return;
  if (isRecording) return;
  if (isCalibrating) stopCalibration();

  mediaChunks = [];
  amplitudes = [];
  rawAmplitudes = [];
  volumeValues = [];
  rawVolumeValues = [];
  frequencyValues = [];
  pitchHzValues = [];
  adaptiveNoiseFloor = 0;
  lastSilentSignalNoticeAt = 0;
  silentSignalStartedAt = 0;
  analyserRestartInProgress = false;
  activeKaraokeIndex = 0;
  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentenceStopScheduled = false;
  sentencePeakVolumeSinceAdvance = 0;
  lastAmplitudeAt = 0;
  window.cancelAnimationFrame(animationFrame);
  recordingPlayer.pause();
  resultPanel.classList.add("is-hidden");
  drawWaveform(liveWaveform, amplitudes, {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    currentLevel: 0,
  });
  drawFrequencyTimeline(frequencyTimeline, [], []);
  updateVoiceFrequencyDisplay(0, 0);

  await ensureRecordingAnalyserReady();
  await waitForCameraFrame();
  const recordingStream = startComposedVideoStream();

  const recordingFormat = getSupportedRecordingFormat();
  const recorderOptions = recordingFormat?.type ? { mimeType: recordingFormat.type } : undefined;

  try {
    mediaRecorder = new MediaRecorder(recordingStream, recorderOptions);
  } catch (error) {
    message.textContent = "Die Videoaufnahme konnte in diesem Browser nicht gestartet werden.";
    stopComposedVideoStream();
    return;
  }

  mediaRecorder.recordingExtension =
    recordingFormat?.extension || extensionFromMimeType(mediaRecorder.mimeType || "");

  mediaRecorder.addEventListener("dataavailable", (event) => {
    if (event.data.size > 0) mediaChunks.push(event.data);
  });

  mediaRecorder.addEventListener("stop", finishRecording);
  mediaRecorder.start(250);
  startedAt = performance.now();
  isRecording = true;
  enterRecordingFocus();

  recordButton.textContent = "Übung stoppen";
  recordButton.classList.add("is-recording");
  recordButton.disabled = false;
  resultPanel.classList.add("is-hidden");
  message.textContent =
    mediaRecorder.recordingExtension === "webm"
      ? "Videoaufnahme läuft."
      : `Aufnahme läuft. Dieser Browser speichert als ${mediaRecorder.recordingExtension.toUpperCase()}.`;

  window.setTimeout(() => {
    if (isRecording) {
      message.textContent = `Aufnahme aktiv. Recorder ${mediaRecorder?.state || "?"}, Pegel ${audioContext?.state || "?"}.`;
    }
  }, 650);
  timerId = window.setInterval(updateRecordingTime, 250);
  scheduleAutoStop();
  updateKaraokeHighlight();
  measureAudio();
}

function stopRecording() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  const recorderWasActive = mediaRecorder?.state === "recording";
  isRecording = false;
  setExerciseVisualsVisible(false);
  window.clearTimeout(autoStopTimeoutId);
  window.clearTimeout(hardStopTimeoutId);
  exitRecordingFocus();

  if (recorderWasActive) {
    try {
      mediaRecorder.requestData();
    } catch (error) {
      // Some Safari builds throw if data is already being flushed.
    }
    mediaRecorder.stop();
  } else {
    restoreRecorderControls("Aufnahme wurde beendet.");
    return;
  }

  window.clearInterval(timerId);
  window.cancelAnimationFrame(animationFrame);
  disconnectAudioAnalyser();
  recordButton.disabled = true;
  recordButton.textContent = "Aufnahme wird gespeichert";

  window.clearTimeout(saveTimeoutId);
  saveTimeoutId = window.setTimeout(() => {
    if (recordButton.disabled) {
      restoreRecorderControls("Speichern dauert länger als erwartet. Bitte erneut versuchen.");
    }
  }, SAVE_TIMEOUT_MS);
}

async function finishRecording() {
  window.clearTimeout(saveTimeoutId);
  try {
    const stoppedRecorder = mediaRecorder;
    const durationSeconds = Math.max(0.1, (performance.now() - startedAt) / 1000);
    const mimeType = stoppedRecorder?.mimeType || "video/webm";
    if (!mediaChunks.length) {
      stopComposedVideoStream();
      restoreRecorderControls("Keine Videodaten empfangen. Bitte Aufnahme erneut starten.");
      return;
    }

    const videoBlob = new Blob(mediaChunks, { type: mimeType });
    stopComposedVideoStream();
    if (!videoBlob.size) {
      restoreRecorderControls("Die Aufnahme ist leer. Bitte erneut starten.");
      return;
    }
    const timestamp = new Date();
    const fileStem = `aufnahme_${timestamp.toISOString().replace(/[:.]/g, "-")}`;
    const fileExtension = stoppedRecorder?.recordingExtension || extensionFromMimeType(mimeType);
    const roundedAmplitudes = amplitudes.map((value) => Math.round(value));
    const roundedRawAmplitudes = rawAmplitudes.map((value) => Number(value.toFixed(2)));
    const roundedVolumeLevels = volumeValues.map((value) => Math.round(value));
    const roundedRawVolumeLevels = rawVolumeValues.map((value) => Number(value.toFixed(2)));
    const roundedPitchHz = pitchHzValues.map((value) => Math.round(value));
    const stats = calculateAmplitudeStats(roundedAmplitudes);
    const volumeStats = calculateAmplitudeStats(roundedVolumeLevels);
    const pitchStats = calculatePitchStats(roundedPitchHz);
    const sourceAudioTracks = mediaStream?.getAudioTracks?.().length || 0;
    const sourceVideoTracks = mediaStream?.getVideoTracks?.().length || 0;

    currentMetadata = {
      id: fileStem,
      datum: timestamp.toISOString(),
      uebung: getExerciseLabel(),
      uebungText: getExerciseScript(),
      uebungKonfiguration: getExerciseConfiguration(),
      dauerSekunden: Number(durationSeconds.toFixed(1)),
      patientName: getCurrentPatientName(),
      empfindlichkeit: Number(sensitivitySlider.value),
      durchschnittlicheLautstaerke: stats.average,
      maximaleLautstaerke: stats.maximum,
      durchschnittlicherLautstaerkePegel: volumeStats.average,
      maximalerLautstaerkePegel: volumeStats.maximum,
      durchschnittlicheStimmfrequenzHz: pitchStats.average,
      minimaleStimmfrequenzHz: pitchStats.minimum,
      maximaleStimmfrequenzHz: pitchStats.maximum,
      amplituden: roundedAmplitudes,
      rawAmplituden: roundedRawAmplitudes,
      lautstaerken: roundedVolumeLevels,
      lautstaerkePegel: roundedVolumeLevels,
      rawLautstaerkePegel: roundedRawVolumeLevels,
      frequenzAmplituden: frequencyValues.map((value) => Math.round(value)),
      stimmfrequenzenHz: roundedPitchHz,
      audioSpuren: sourceAudioTracks,
      videoSpuren: sourceVideoTracks,
      dateityp: mimeType,
      aufnahme: `${fileStem}.${fileExtension}`,
    };
    currentMetadata.audioAnalyse = buildAudioAnalysis(currentMetadata);
    selectedAnalysisRecordingId = currentMetadata.id;
    currentVideoBlob = videoBlob;

    await saveRecording(currentMetadata, videoBlob);
    await refreshRecordings(currentMetadata.id);
    showResult(currentMetadata, videoBlob);

    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
    recordButton.classList.remove("is-recording");
    if (mediaRecorder === stoppedRecorder) {
      mediaRecorder = null;
    }
    message.textContent = "Aufnahme gespeichert.";
    firebaseState.textContent = "Lokal gespeichert. Firebase-Upload läuft.";

    uploadCurrentRecording(currentMetadata, videoBlob);
  } catch (error) {
    stopComposedVideoStream();
    restoreRecorderControls("Speichern fehlgeschlagen. Bitte Aufnahme erneut versuchen.");
  }
}

async function prepareRecordingAudio() {
  try {
    await setupAudioAnalyser({ reuseExisting: true });
    if (audioContext?.state === "running" && !instructionPlaybackActive) {
      message.textContent = "Mikrofon-Pegel bereit.";
    }
  } catch (error) {
    if (!instructionPlaybackActive) {
      message.textContent = "Mikrofon-Pegel konnte noch nicht vorbereitet werden.";
    }
  }
}

async function setupAudioAnalyser({ reuseExisting = false } = {}) {
  await ensureAudioContext();

  if (reuseExisting && analyser && audioSource) {
    await ensureAudioContext();
    return;
  }

  disconnectAudioAnalyser();

  const existingAudioTrack = mediaStream?.getAudioTracks?.()[0];

  audioOnlyStreamOwnsTracks = false;

  if (existingAudioTrack && existingAudioTrack.readyState === "live") {
    audioOnlyStream = new MediaStream([existingAudioTrack]);
  } else {
    try {
      audioOnlyStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
        },
        video: false,
      });
      audioOnlyStreamOwnsTracks = true;
    } catch (error) {
      const fallbackTrack = mediaStream.getAudioTracks()[0];
      if (!fallbackTrack) {
        if (!instructionPlaybackActive) {
          message.textContent = "Kein Mikrofonsignal gefunden.";
        }
        return;
      }
      audioOnlyStream = new MediaStream([fallbackTrack]);
    }
  }

  const audioTrack = audioOnlyStream.getAudioTracks()[0];
  if (!audioTrack) {
    if (!instructionPlaybackActive) {
      message.textContent = "Kein Mikrofonsignal gefunden.";
    }
    return;
  }

  if (!audioTrack.enabled || audioTrack.muted) {
    if (!instructionPlaybackActive) {
      message.textContent = "Mikrofon ist vorhanden, liefert aber gerade kein Signal.";
    }
  }

  audioSource = audioContext.createMediaStreamSource(audioOnlyStream);
  analyser = audioContext.createAnalyser();
  silentGain = audioContext.createGain();
  audioProcessor = audioContext.createScriptProcessor(1024, 1, 1);
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.08;
  silentGain.gain.value = 0.00001;
  processorRms = 0;
  processorPeak = 0;
  lastProcessorSignalAt = 0;

  audioProcessor.onaudioprocess = (event) => {
    const input = event.inputBuffer.getChannelData(0);
    let sumSquares = 0;
    let peak = 0;

    for (let index = 0; index < input.length; index += 1) {
      const value = input[index];
      sumSquares += value * value;
      peak = Math.max(peak, Math.abs(value));
    }

    processorRms = Math.sqrt(sumSquares / Math.max(1, input.length));
    processorPeak = peak;
    lastProcessorSignalAt = performance.now();
  };

  audioSource.connect(analyser);
  audioSource.connect(audioProcessor);
  audioProcessor.connect(silentGain);
  analyser.connect(silentGain);
  silentGain.connect(audioContext.destination);
  if (!instructionPlaybackActive) {
    message.textContent = `Pegel bereit: ${audioContext.state}, Mikrofon ${audioTrack.readyState}.`;
  }
}

async function ensureRecordingAnalyserReady() {
  await ensureAudioContext();

  if (!analyser || !audioSource) {
    await setupAudioAnalyser({ reuseExisting: false });
  } else {
    await setupAudioAnalyser({ reuseExisting: true });
  }

  const hasFreshFrames = await waitForAudioProcessorFrames(650);
  if (!hasFreshFrames) {
    await setupAudioAnalyser({ reuseExisting: false });
    await waitForAudioProcessorFrames(650);
  }
}

function waitForAudioProcessorFrames(timeoutMs = 650) {
  const start = performance.now();

  return new Promise((resolve) => {
    const check = () => {
      if (lastProcessorSignalAt >= start) {
        resolve(true);
        return;
      }

      if (performance.now() - start >= timeoutMs) {
        resolve(false);
        return;
      }

      window.setTimeout(check, 40);
    };

    check();
  });
}

async function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextConstructor();
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }
}

async function ensurePlaybackAudioBoost() {
  recordingPlayer.muted = false;
  recordingPlayer.volume = 1;
  applyPlaybackGain();
}

function applyPlaybackGain() {
  playbackVolumeValue.textContent = `${playbackVolumeSlider.value}%`;
  recordingPlayer.volume = 1;
}

function disconnectAudioAnalyser() {
  if (audioSource) {
    audioSource.disconnect();
  }

  if (analyser) {
    analyser.disconnect();
  }

  if (silentGain) {
    silentGain.disconnect();
  }

  if (audioProcessor) {
    audioProcessor.disconnect();
    audioProcessor.onaudioprocess = null;
  }

  if (audioOnlyStream && audioOnlyStreamOwnsTracks) {
    audioOnlyStream.getTracks().forEach((track) => track.stop());
  }

  audioSource = null;
  analyser = null;
  silentGain = null;
  audioProcessor = null;
  audioOnlyStream = null;
  audioOnlyStreamOwnsTracks = false;
}

async function restartAudioAnalyser() {
  if (analyserRestartInProgress || !isRecording) return;

  analyserRestartInProgress = true;
  silentSignalStartedAt = 0;

  try {
    await setupAudioAnalyser({ reuseExisting: false });
    message.textContent = "Pegel neu verbunden.";
  } catch (error) {
    message.textContent = "Pegel konnte nicht neu verbunden werden.";
  } finally {
    analyserRestartInProgress = false;
  }
}

function measureAudio() {
  if ((!isRecording && !isCalibrating) || !analyser) {
    if (isRecording || isCalibrating) {
      message.textContent = "Pegel nicht verbunden. Bitte Aufnahme neu starten.";
    }
    return;
  }

  if (audioContext?.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  const samples = new Uint8Array(analyser.fftSize);
  const frequencySamples = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteTimeDomainData(samples);
  analyser.getByteFrequencyData(frequencySamples);

  let sumSquares = 0;
  let peak = 0;
  for (const sample of samples) {
    const centered = sample - 128;
    sumSquares += centered * centered;
    peak = Math.max(peak, Math.abs(centered));
  }

  const sampleRate = audioContext?.sampleRate || 44100;
  const binHz = sampleRate / analyser.fftSize;
  const voiceStartBin = Math.max(1, Math.floor(VOICE_LOW_HZ / binHz));
  const voiceEndBin = Math.min(frequencySamples.length - 1, Math.ceil(VOICE_HIGH_HZ / binHz));
  const noiseStartBin = Math.max(1, Math.floor(NOISE_LOW_HZ / binHz));
  const noiseEndBin = Math.min(frequencySamples.length - 1, Math.ceil(NOISE_HIGH_HZ / binHz));
  let voiceEnergy = 0;
  let voicePeak = 0;
  let voiceBins = 0;
  let noiseEnergy = 0;
  let noiseBins = 0;

  for (let index = voiceStartBin; index <= voiceEndBin; index += 1) {
    const value = frequencySamples[index];
    voiceEnergy += value;
    voicePeak = Math.max(voicePeak, value);
    voiceBins += 1;
  }

  for (let index = noiseStartBin; index <= noiseEndBin; index += 1) {
    noiseEnergy += frequencySamples[index];
    noiseBins += 1;
  }

  const voiceAverage = voiceEnergy / Math.max(1, voiceBins);
  const backgroundAverage = noiseEnergy / Math.max(1, noiseBins);
  adaptiveNoiseFloor = adaptiveNoiseFloor
    ? adaptiveNoiseFloor * 0.94 + Math.min(voiceAverage, backgroundAverage * 1.8) * 0.06
    : Math.min(voiceAverage, backgroundAverage * 1.8);
  const voiceContrast = Math.max(0, voiceAverage - adaptiveNoiseFloor * 0.45 - backgroundAverage * 0.12);
  const voicePeakContrast = Math.max(0, voicePeak - adaptiveNoiseFloor * 0.55);
  const pitchHz = estimateVoicePitchHz(frequencySamples, binHz, voicePeakContrast);

  const analyserRms = Math.sqrt(sumSquares / samples.length);
  const now = performance.now();
  const processorIsFresh = now - lastProcessorSignalAt < 350;
  const rms = Math.max(analyserRms, processorIsFresh ? processorRms * 128 : 0);
  const effectivePeak = Math.max(peak, processorIsFresh ? processorPeak * 128 : 0);
  const isSilentSignal = rms < 0.02 && effectivePeak === 0 && voicePeak === 0;

  if (isSilentSignal) {
    silentSignalStartedAt ||= now;
  } else {
    silentSignalStartedAt = 0;
  }

  if (isSilentSignal && now - lastSilentSignalNoticeAt > 1200) {
    lastSilentSignalNoticeAt = performance.now();
    message.textContent = "Mikrofon aktiv, Pegel wird neu verbunden.";
  }

  if (isSilentSignal && silentSignalStartedAt && now - silentSignalStartedAt > 1500) {
    restartAudioAnalyser();
  }

  const volumeSignal = Math.max(rms * 28, effectivePeak * 1.15);
  const gatedVolumeSignal = Math.max(0, volumeSignal - VOLUME_NOISE_GATE);
  const calibratedVolume = scaleVolumeLevel(gatedVolumeSignal);
  const frequencySignal = Math.max(voiceAverage * 0.95, voiceContrast * 2.1, voicePeakContrast * 0.72);
  const rawSignal = Math.max(gatedVolumeSignal * 1.35, frequencySignal * 0.72);
  const volume = scaleAmplitude(rawSignal);
  const displayVolume = calibratedVolume;
  const displayFrequency = scaleAmplitude(frequencySignal);
  const amplitude = Math.max(displayVolume > 0 || displayFrequency > 0 ? 2 : 0, volume);

  if (now - lastAmplitudeAt >= AMPLITUDE_SAMPLE_INTERVAL) {
    rawAmplitudes.push(rawSignal);
    amplitudes.push(amplitude);
    volumeValues.push(displayVolume);
    rawVolumeValues.push(gatedVolumeSignal);
    frequencyValues.push(displayFrequency);
    pitchHzValues.push(pitchHz);
    lastAmplitudeAt = now;
  }

  volumeValue.textContent = String(displayVolume);
  updateVoiceFrequencyDisplay(pitchHz, displayFrequency);
  if (isRecording) updateExercisePromptProgress(displayVolume);
  drawWaveform(liveWaveform, amplitudes.slice(-MAX_VISIBLE_SAMPLES), {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    currentLevel: displayVolume,
    levelValues: volumeValues.slice(-MAX_VISIBLE_SAMPLES),
  });
  drawFrequencyTimeline(
    frequencyTimeline,
    pitchHzValues.slice(-MAX_VISIBLE_SAMPLES),
    frequencyValues.slice(-MAX_VISIBLE_SAMPLES),
  );

  if (isRecording || isCalibrating) {
    animationFrame = window.requestAnimationFrame(measureAudio);
  }
}

function setupKaraokeText() {
  const activeExercise = getActiveRecordingExercise();
  const sentences =
    activeExercise?.mode === "sentences"
      ? getExerciseSentences(activeExercise)
      : [];

  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentenceStopScheduled = false;
  sentencePeakVolumeSinceAdvance = 0;
  activeKaraokeIndex = 0;

  if (sentences.length) {
    karaokeWords = sentences;
    karaokeTimeline = buildSentenceTimeline(sentences);
  } else {
    karaokeWords = getExerciseScript().split(/\s+/).filter(Boolean);
    karaokeTimeline = buildKaraokeTimeline(karaokeWords, getCurrentKaraokeTiming());
  }

  renderKaraokeOverlay(karaokeOverlay, karaokeTimeline);
  updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, 0);
}

function getExerciseSentences(exercise = getActiveRecordingExercise()) {
  if (!exercise || exercise.mode !== "sentences") return [];

  const configuredSentences = Array.isArray(exercise.sentences)
    ? exercise.sentences
    : [];
  const sentences = configuredSentences.length
    ? configuredSentences
    : String(exercise.content || exercise.script || "")
        .split(/\s*\|\s*|\n+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);

  return sentences.map((sentence) => sentence.trim()).filter(Boolean);
}

function buildSentenceTimeline(sentences, secondsPerSentence = SENTENCE_MAX_SECONDS) {
  return sentences.map((sentence, index) => ({
    label: sentence,
    isPause: false,
    isSentence: true,
    start: index * secondsPerSentence,
    end: (index + 1) * secondsPerSentence,
  }));
}

function updateExercisePromptProgress(displayVolume) {
  if (karaokeTimeline.some((item) => item.isSentence)) {
    updateSentencePromptBySilence(displayVolume);
    return;
  }

  updateKaraokeHighlight();
}

function updateSentencePromptBySilence(displayVolume) {
  if (!karaokeTimeline.length || sentenceStopScheduled) return;

  updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);

  const now = performance.now();
  const hasSpeech = displayVolume >= SENTENCE_SPEECH_THRESHOLD;
  sentencePeakVolumeSinceAdvance = Math.max(sentencePeakVolumeSinceAdvance, displayVolume);
  const dynamicSilenceThreshold = Math.max(
    SENTENCE_SILENCE_THRESHOLD,
    Math.min(16, Math.round(sentencePeakVolumeSinceAdvance * 0.38)),
  );
  const hasSilence = displayVolume <= dynamicSilenceThreshold;

  if (hasSpeech) {
    sentenceHasSpeechSinceAdvance = true;
    sentenceSilenceStartedAt = 0;
    return;
  }

  if (!sentenceHasSpeechSinceAdvance) return;
  if (!hasSilence) {
    sentenceSilenceStartedAt = 0;
    return;
  }

  sentenceSilenceStartedAt ||= now;
  if (now - sentenceSilenceStartedAt < SENTENCE_SILENCE_MS) return;

  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentencePeakVolumeSinceAdvance = 0;

  if (activeKaraokeIndex < karaokeTimeline.length - 1) {
    activeKaraokeIndex += 1;
    updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
    message.textContent = `Nächster Satz ${activeKaraokeIndex + 1} von ${karaokeTimeline.length}.`;
    return;
  }

  sentenceStopScheduled = true;
  message.textContent = "Letzter Satz beendet. Aufnahme stoppt gleich.";
  window.setTimeout(() => {
    if (isRecording || mediaRecorder?.state === "recording") stopRecording();
  }, RECORDING_TAIL_SECONDS * 1000);
}

function setExerciseVisualsVisible(isVisible) {
  document.body.classList.toggle("exercise-visuals-visible", Boolean(isVisible));
}

async function startCalibration() {
  if (isRecording) return;

  const streamReady = await ensureMediaStream();
  if (!streamReady) return;

  isCalibrating = true;
  amplitudes = [];
  rawAmplitudes = [];
  volumeValues = [];
  rawVolumeValues = [];
  frequencyValues = [];
  pitchHzValues = [];
  lastAmplitudeAt = 0;
  adaptiveNoiseFloor = 0;
  silentSignalStartedAt = 0;
  document.body.classList.add("calibration-mode");
  setExerciseVisualsVisible(true);
  calibrationButton.textContent = "Kalibrierung stoppen";
  message.textContent = "Kalibrierung läuft. Stimme sprechen und Empfindlichkeit einstellen.";
  drawWaveform(liveWaveform, [], {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    currentLevel: 0,
  });
  drawFrequencyTimeline(frequencyTimeline, [], []);
  updateVoiceFrequencyDisplay(0, 0);
  await setupAudioAnalyser({ reuseExisting: false });
  measureAudio();
}

function stopCalibration() {
  isCalibrating = false;
  document.body.classList.remove("calibration-mode");
  setExerciseVisualsVisible(false);
  window.cancelAnimationFrame(animationFrame);
  disconnectAudioAnalyser();
  calibrationButton.textContent = "Kalibrieren";
  message.textContent = `Kalibrierung gespeichert: Empfindlichkeit ${formatSensitivityLabel(sensitivitySlider.value)}.`;
}

function getExerciseLabel() {
  const activeExercise = getActiveRecordingExercise();
  if (activeExercise) return activeExercise.name;

  return exerciseName.selectedOptions?.[0]?.textContent || exerciseName.value || "Übung";
}

function getExerciseScript() {
  const activeExercise = getActiveRecordingExercise();
  if (activeExercise) return activeExercise.script;

  const selectedOption = exerciseName.selectedOptions?.[0];
  return selectedOption?.dataset.script || exerciseName.value || "Vokal A halten";
}

function getCurrentKaraokeTiming() {
  const activeExercise = getActiveRecordingExercise();
  if (activeExercise) return activeExercise.timing;

  return {
    wordSeconds: DEFAULT_KARAOKE_WORD_SECONDS,
    pauseSeconds: DEFAULT_KARAOKE_PAUSE_SECONDS,
  };
}
function getEditorTokens() {
  return editorContent.value
    .split(/[\s,;]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .slice(0, 80);
}

function getEditorSentences() {
  return editorContent.value
    .split(/\s*\|\s*|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function syncEditorSentences(sentences) {
  editorContent.value = sentences.map((sentence) => sentence.trim()).filter(Boolean).join(" | ");
  saveEditorDraft();
  updateEditorForm();
  renderEditorSentenceList();
  if (exerciseName.value === "custom-editor") setupKaraokeText();
}

function addEditorSentence() {
  const sentence = editorSentenceInput?.value.trim();
  if (!sentence) return;

  syncEditorSentences([...getEditorSentences(), sentence]);
  editorSentenceInput.value = "";
  editorSentenceInput.focus();
}

function renderEditorSentenceList() {
  if (!editorSentenceList) return;

  const sentences = getEditorSentences();
  editorSentenceList.innerHTML = "";

  if (!sentences.length) {
    const empty = document.createElement("p");
    empty.className = "editor-sentence-empty";
    empty.textContent = "Noch keine Sätze hinzugefügt.";
    editorSentenceList.append(empty);
    return;
  }

  sentences.forEach((sentence, index) => {
    const wordCount = sentence.split(/\s+/).filter(Boolean).length;
    const item = document.createElement("div");
    item.className = "editor-sentence-item";

    const label = document.createElement("span");
    label.textContent = `${index + 1}. ${sentence} (${wordCount} ${wordCount === 1 ? "Wort" : "Wörter"})`;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Satz ${index + 1} entfernen`);
    removeButton.addEventListener("click", () => {
      const nextSentences = getEditorSentences();
      nextSentences.splice(index, 1);
      syncEditorSentences(nextSentences);
    });

    item.append(label, removeButton);
    editorSentenceList.append(item);
  });
}

function getEditorRepeats() {
  const parsedValue = Number.parseInt(editorRepeats.value, 10);
  return Math.max(1, Math.min(30, Number.isFinite(parsedValue) ? parsedValue : 10));
}

function getExerciseInstruction() {
  const exercise = getActiveRecordingExercise();
  if (!exercise) return "";
  if (exercise.voiceInstruction) return exercise.voiceInstruction;

  if (exercise.mode === "sentences") {
    return `Bereiten Sie sich auf die kurzen Sätze vor. Lesen Sie jeden Satz im Tempo ${exercise.timing.label}. Machen Sie nach jedem Satz eine kurze Pause.`;
  }

  if (exercise.mode === "text") {
    return `Bitte lesen Sie den eingeblendeten Karaoke-Text ruhig und deutlich vor. Das Tempo ist ${exercise.timing.label}.`;
  }

  return `Bitte sprechen Sie ${exercise.contentLabel}. Wiederholen Sie die Folge ${exercise.repeats} mal im Tempo ${exercise.timing.label}, mit kurzer Pause zwischen den Durchgängen.`;
}

function getExerciseConfiguration() {
  const exercise = getActiveRecordingExercise();
  if (!exercise) return null;

  return {
    typ: exercise.mode,
    name: exercise.name,
    inhalt: exercise.content,
    saetze: exercise.sentences || [],
    wiederholungen: exercise.repeats,
    geschwindigkeit: exercise.speed,
    voiceBegleitung: exercise.voiceInstruction,
    voiceAudioVorhanden: Boolean(exercise.voiceAudioUrl || exercise.voiceAudioDataUrl),
    voiceAudioUrl: exercise.voiceAudioUrl || "",
    voiceAudioPath: exercise.voiceAudioPath || "",
    sekundenProEinheit: exercise.timing.wordSeconds,
    pauseSekunden: exercise.timing.pauseSeconds,
  };
}

function getActiveEditorExercise() {
  return hydrateEditorExercise(savedEditorExercise || buildEditorExerciseFromForm());
}

function getActiveRecordingExercise() {
  if (exerciseName.value === "custom-editor") return getActiveEditorExercise();

  const selectedOption = exerciseName.selectedOptions?.[0];
  const selectedLabel = selectedOption?.textContent?.trim() || "";
  const candidates = [selectedLabel, exerciseName.value];
  const savedOverride = savedEditorExercises.find((exercise) =>
    candidates.some(
      (candidate) => normalizeEditorExerciseName(candidate) === normalizeEditorExerciseName(exercise.name),
    ),
  );

  return savedOverride ? hydrateEditorExercise(savedOverride) : null;
}

function hydrateEditorExercise(exercise) {
  if (!exercise) return null;

  const mode = exercise.mode || "syllables";
  const speed = Number(exercise.speed || 3);
  const timing = exercise.timing || EDITOR_SPEEDS[speed] || EDITOR_SPEEDS[3];
  const content = exercise.content || getDefaultEditorContent(mode);
  const repeats = Math.max(1, Number(exercise.repeats || 1));
  const script = exercise.script || (mode !== "text" && repeats > 1 ? buildRepeatedScript(content, repeats) : content);
  const sentences = exercise.sentences || (mode === "sentences" ? content.split("|").map((sentence) => sentence.trim()).filter(Boolean) : []);
  const contentLabel =
    exercise.contentLabel ||
    (mode === "sentences"
      ? `${sentences.length || 1} Satz${sentences.length === 1 ? "" : "e"}`
      : content.split(/\s+/).filter(Boolean).join(", ")) ||
    content;

  return {
    ...exercise,
    mode,
    speed,
    timing,
    content,
    contentLabel,
    sentences,
    repeats,
    script,
  };
}
function buildEditorExerciseFromForm() {
  const name = editorExerciseName.value.trim() || "Neue Übung";
  const mode = editorMode.value;
  const speed = Number(editorSpeed.value);
  const timing = EDITOR_SPEEDS[speed] || EDITOR_SPEEDS[3];
  const sentences = mode === "sentences" ? getEditorSentences() : [];
  const tokens =
    mode === "text"
      ? editorContent.value.split(/\s+/).map((token) => token.trim()).filter(Boolean)
      : mode === "sentences"
        ? []
        : getEditorTokens();
  const content =
    mode === "sentences"
      ? sentences.join(" | ") || getDefaultEditorContent(mode)
      : tokens.length
        ? tokens.join(" ")
        : getDefaultEditorContent(mode);
  const voiceInstruction =
    editorVoiceInstruction.value.trim() || getDefaultEditorVoiceInstruction(mode);
  const useRepeats = editorUseRepeats.checked && mode !== "text" && mode !== "sentences";
  const repeats = useRepeats ? getEditorRepeats() : 1;
  const script = useRepeats ? buildRepeatedScript(content, repeats) : content;

  return {
    name,
    mode,
    speed,
    timing,
    content,
    contentLabel:
      mode === "sentences"
        ? `${sentences.length || 1} Satz${sentences.length === 1 ? "" : "e"}`
        : tokens.join(", ") || getDefaultEditorContent(mode),
    sentences,
    voiceInstruction,
    voiceAudioUrl: editorVoiceAudioUrl,
    voiceAudioPath: editorVoiceAudioPath,
    voiceAudioDataUrl: editorVoiceAudioDataUrl,
    repeats,
    script,
  };
}

function buildRepeatedScript(content, repeats) {
  const rows = [];

  for (let index = 1; index <= repeats; index += 1) {
    rows.push(`${index} ${content}`);
  }

  return rows.join(" | ");
}

function getDefaultEditorContent(mode) {
  if (mode === "sentences") return "";
  if (mode === "text") return "Heute lese ich langsam und deutlich.";
  if (mode === "vowels") return "A E I O U";
  return "Pa Ta Ka";
}

function getDefaultEditorVoiceInstruction(mode) {
  if (mode === "sentences") return "Bitte lesen Sie die kurzen Sätze nacheinander ruhig und deutlich vor. Machen Sie nach jedem Satz eine kurze Pause.";
  if (mode === "text") return "Bitte lesen Sie den eingeblendeten Text ruhig und deutlich vor.";
  if (mode === "vowels") return "Bitte sprechen Sie die Vokale nacheinander deutlich aus.";
  return "Bitte sprechen Sie die einzelnen Silben ruhig und deutlich.";
}

function buildVoiceInstructionSuggestion() {
  const exercise = buildEditorExerciseFromForm();
  const speedText = exercise.timing.label.toLowerCase();

  if (exercise.mode === "sentences") {
    return `Bereiten Sie sich auf die kurzen Sätze vor. Lesen Sie jeden Satz im Tempo ${speedText}. Machen Sie nach jedem Satz eine kurze Pause.`;
  }

  if (exercise.mode === "text") {
    return `Bereiten Sie sich auf den Text vor. Lesen Sie gleich Wort für Wort im Tempo ${speedText}. Sprechen Sie ruhig, deutlich und ohne Druck.`;
  }

  if (exercise.mode === "vowels") {
    return `Bereiten Sie sich auf die Vokalübung vor. Sprechen Sie ${exercise.contentLabel} nacheinander im Tempo ${speedText}. Achten Sie auf klare Mundöffnung und gleichmäßige Stimme.`;
  }

  return `Bereiten Sie sich auf die Silbenübung vor. Sprechen Sie ${exercise.contentLabel} einzeln und deutlich. Wiederholen Sie die Folge ${exercise.repeats} mal im Tempo ${speedText}.`;
}

async function generateVoiceAudio() {
  const text = editorVoiceInstruction.value.trim();
  if (!text) {
    editorVoiceState.textContent = "Bitte zuerst einen Voice-Text eintragen.";
    return;
  }

  generateVoiceAudioButton.disabled = true;
  editorVoiceState.textContent = "ElevenLabs-Audio wird erstellt...";

  try {
    const response = await fetch("/api/voice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        store: true,
        ...getElevenLabsRequestSettings(),
        exerciseName: editorExerciseName.value.trim() || "Neue Übung",
      }),
    });

    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("application/json")) {
      const details = await response.text().catch(() => "");
      throw new Error(`Audio-Fehler ${response.status}: ${details.slice(0, 80) || contentType || "keine Antwort"}`);
    }

    const cloudVoice = await response.json();
    if (!cloudVoice.downloadUrl || !cloudVoice.path) {
      throw new Error("Audio gespeichert, aber URL fehlt.");
    }
    editorVoiceAudioDataUrl = "";
    editorVoiceAudioUrl = cloudVoice.downloadUrl;
    editorVoiceAudioPath = cloudVoice.path;
    editorVoicePreview.src = editorVoiceAudioUrl;
    editorVoiceState.textContent = "ElevenLabs-Audio erstellt und in Firebase gespeichert.";
    saveEditorDraft();
    saveEditorExercise();
    editorVoiceState.textContent = "ElevenLabs-Audio erstellt und in der Übung gespeichert.";
  } catch (error) {
    editorVoiceAudioDataUrl = "";
    editorVoiceAudioUrl = "";
    editorVoiceAudioPath = "";
    editorVoicePreview.removeAttribute("src");
    editorVoicePreview.load();
    editorVoiceState.textContent = error?.message || "Audio konnte nicht erstellt werden.";
  } finally {
    generateVoiceAudioButton.disabled = false;
  }
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function updateEditorForm() {
  const isTextMode = editorMode.value === "text";
  const isSentenceMode = editorMode.value === "sentences";
  exerciseEditor?.classList.toggle("sentence-mode", isSentenceMode);
  if (isTextMode || isSentenceMode) editorUseRepeats.checked = false;
  repeatControl.classList.toggle("is-hidden", isTextMode || isSentenceMode || !editorUseRepeats.checked);
  editorUseRepeats.disabled = isTextMode || isSentenceMode;
  editorSentenceBuilder?.classList.toggle("is-hidden", !isSentenceMode);
  editorSpeedValue.textContent = EDITOR_SPEEDS[editorSpeed.value]?.label || "Normal";
  const previewParts = buildEditorExerciseFromForm().script.split("|").map((part) => part.trim());
  editorPreview.textContent = previewParts.slice(0, 3).join("  |  ");
  renderEditorSentenceList();
}

function applyEditorModeDefaults() {
  editorContent.value = getDefaultEditorContent(editorMode.value);
  editorVoiceInstruction.value = getDefaultEditorVoiceInstruction(editorMode.value);
  editorUseRepeats.checked = editorMode.value !== "text" && editorMode.value !== "sentences";
  if (editorMode.value === "sentences") {
    editorExerciseName.value = "Kurze Sätze";
  } else if (editorMode.value === "text") {
    editorExerciseName.value = "Karaoke-Text";
  } else if (editorMode.value === "vowels") {
    editorExerciseName.value = "Vokale nacheinander";
  } else {
    editorExerciseName.value = "Neue Silbenübung";
  }
}

function saveEditorExercise() {
  const exercise = buildEditorExerciseFromForm();
  savedEditorExercises = upsertEditorExercise(savedEditorExercises, exercise);
  savedEditorExercise = exercise;
  activeEditorExerciseName = exercise.name;
  persistEditorExercises();
  saveCloudEditorExercise(exercise).catch(() => {
    firebaseState.textContent = "Übung lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
  });
  renderSavedEditorExercises();
  editorSavedExercises.value = exercise.name;
  saveEditorDraft();
  exerciseName.value = exercise.name;
  renderRecordingExerciseOptions(exercise.name);
  exerciseName.value = exercise.name;
  setupKaraokeText();
  updateEditorForm();
  message.textContent = `Gespeichert: ${exercise.name}`;
  editorVoiceState.textContent = `Gespeichert: ${exercise.name}`;
  showEditorSaveFeedback(exercise.name);
  showAppNotice(`Gespeichert: ${exercise.name}`, "success");
}

function upsertEditorExercise(exercises, exercise) {
  const normalizedName = normalizeEditorExerciseName(exercise.name);
  const existingIndex = exercises.findIndex(
    (item) => normalizeEditorExerciseName(item.name) === normalizedName,
  );
  const nextExercises = [...exercises];

  if (existingIndex >= 0) {
    nextExercises[existingIndex] = exercise;
  } else {
    nextExercises.push(exercise);
  }

  return nextExercises.sort((a, b) => a.name.localeCompare(b.name, "de"));
}

function persistEditorExercises() {
  localStorage.setItem(SAVED_EDITOR_EXERCISES_KEY, JSON.stringify(savedEditorExercises));
  localStorage.setItem(SAVED_EDITOR_EXERCISE_KEY, JSON.stringify(savedEditorExercise));
}

function showEditorSaveFeedback(exerciseLabel) {
  const originalText = saveEditorExerciseButton.textContent;
  saveEditorExerciseButton.textContent = "Gespeichert ✓";
  saveEditorExerciseButton.classList.add("is-saved");
  firebaseState.textContent = `Übung gespeichert und in Aufnahme auswählbar: ${exerciseLabel}`;

  window.setTimeout(() => {
    saveEditorExerciseButton.textContent = originalText;
    saveEditorExerciseButton.classList.remove("is-saved");
  }, 1600);
}

function showAppNotice(text, type = "success") {
  const existingNotice = document.querySelector(".app-notice");
  existingNotice?.remove();

  const notice = document.createElement("div");
  notice.className = `app-notice ${type === "error" ? "is-error" : "is-success"}`;
  notice.textContent = text;
  document.body.append(notice);

  window.setTimeout(() => {
    notice.classList.add("is-visible");
  }, 20);

  window.setTimeout(() => {
    notice.classList.remove("is-visible");
    window.setTimeout(() => notice.remove(), 260);
  }, 2600);
}

function normalizeEditorExerciseName(name) {
  return String(name || "").trim().toLowerCase();
}

function resetEditorForm() {
  editorExerciseName.value = "Kurze Sätze";
  editorMode.value = "sentences";
  editorContent.value = "";
  if (editorSentenceInput) editorSentenceInput.value = "";
  editorVoiceInstruction.value = getDefaultEditorVoiceInstruction("sentences");
  editorVoiceAudioDataUrl = "";
  editorVoiceAudioUrl = "";
  editorVoiceAudioPath = "";
  editorVoicePreview.removeAttribute("src");
  editorVoicePreview.load();
  editorVoiceState.textContent = "Voice-Audio optional.";
  editorUseRepeats.checked = false;
  editorRepeats.value = "1";
  editorSpeed.value = "3";
  updateEditorForm();
}

function renderSavedEditorExercises() {
  const currentValue =
    editorSavedExercises.value || getEditorSelectValueForExerciseName(activeEditorExerciseName);
  editorSavedExercises.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "Neue Übung erstellen";
  editorSavedExercises.append(emptyOption);

  const templateGroup = document.createElement("optgroup");
  templateGroup.label = "Vorlagen bearbeiten";
  STANDARD_EDITOR_EXERCISES.forEach((exercise) => {
    const option = document.createElement("option");
    option.value = `standard:${exercise.id}`;
    option.textContent = `Vorlage: ${exercise.name}`;
    templateGroup.append(option);
  });
  editorSavedExercises.append(templateGroup);

  if (savedEditorExercises.length) {
    const savedGroup = document.createElement("optgroup");
    savedGroup.label = "Gespeicherte Editor-Übungen";
    savedEditorExercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise.name;
      option.textContent = exercise.name;
      savedGroup.append(option);
    });
    editorSavedExercises.append(savedGroup);
  }

  editorSavedExercises.value = Array.from(editorSavedExercises.options).some(
    (option) => option.value === currentValue,
  )
    ? currentValue
    : "";

  renderRecordingExerciseOptions();
}

function renderRecordingExerciseOptions(preferredValue = exerciseName.value) {
  const currentValue = preferredValue;
  const fixedOptions = Array.from(exerciseName.querySelectorAll("option:not([data-editor-exercise])"));
  exerciseName.innerHTML = "";
  fixedOptions.forEach((option) => exerciseName.append(option));
  renderRecordingExerciseShortcuts();

  if (savedEditorExercises.length) {
    savedEditorExercises.forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise.name;
      option.textContent = exercise.name;
      option.dataset.editorExercise = "true";
      exerciseName.append(option);
    });
  }

  const optionValues = Array.from(exerciseName.options).map((option) => option.value);
  exerciseName.value = optionValues.includes(currentValue) ? currentValue : "custom-editor";
}

function renderRecordingExerciseShortcuts() {
  if (!recordingExerciseShortcuts) return;

  recordingExerciseShortcuts.innerHTML = "";
  recordingExerciseShortcuts.classList.add("is-empty");
  return;

  if (!savedEditorExercises.length) {
    recordingExerciseShortcuts.classList.add("is-empty");
    recordingExerciseShortcuts.textContent = "Noch keine gespeicherte Editor-Übung.";
    return;
  }

  recordingExerciseShortcuts.classList.remove("is-empty");
  const label = document.createElement("span");
  label.className = "shortcut-label";
  label.textContent = "Gespeichert:";
  recordingExerciseShortcuts.append(label);

  savedEditorExercises.forEach((exercise) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = exercise.name;
    button.className = "exercise-shortcut";
    button.addEventListener("click", () => {
      exerciseName.value = exercise.name;
      setupKaraokeText();
      message.textContent = `Übung ausgewählt: ${exercise.name}`;
      renderRecordingExerciseShortcuts();
    });
    button.classList.toggle("is-active", exerciseName.value === exercise.name);
    recordingExerciseShortcuts.append(button);
  });
}

function loadEditorExerciseIntoForm(name) {
  if (name.startsWith("standard:")) {
    const template = STANDARD_EDITOR_EXERCISES.find(
      (exercise) => `standard:${exercise.id}` === name,
    );
    if (!template) return;

    activeEditorExerciseName = "";
    savedEditorExercise = null;
    editorSavedExercises.value = name;
    applyEditorExerciseToForm(template);
    saveEditorDraft();
    updateEditorForm();
    editorVoiceState.textContent = `Vorlage geladen: ${template.name}`;
    return;
  }

  const exercise = savedEditorExercises.find((item) => item.name === name);
  if (!exercise) {
    activeEditorExerciseName = "";
    savedEditorExercise = null;
    resetEditorForm();
    saveEditorDraft();
    return;
  }

  activeEditorExerciseName = exercise.name;
  savedEditorExercise = exercise;
  editorSavedExercises.value = exercise.name;
  applyEditorExerciseToForm(exercise);
  saveEditorDraft();
  updateEditorForm();
  editorVoiceState.textContent = exercise.voiceAudioUrl
    ? "Geladen. Voice-Audio in Firebase vorhanden."
    : `Geladen: ${exercise.name}`;
}

function getEditorSelectValueForExerciseName(name) {
  if (!name) return "";
  if (savedEditorExercises.some((exercise) => exercise.name === name)) return name;

  const template = STANDARD_EDITOR_EXERCISES.find((exercise) => exercise.name === name);
  return template ? `standard:${template.id}` : "";
}

function applyEditorExerciseToForm(exercise) {
  editorExerciseName.value = exercise.name || "Neue Übung";
  editorMode.value = exercise.mode || "syllables";
  editorContent.value = exercise.content || getDefaultEditorContent(editorMode.value);
  editorVoiceInstruction.value =
    exercise.voiceInstruction || getDefaultEditorVoiceInstruction(editorMode.value);
  editorVoiceAudioDataUrl = exercise.voiceAudioDataUrl || "";
  editorVoiceAudioUrl = exercise.voiceAudioUrl || "";
  editorVoiceAudioPath = exercise.voiceAudioPath || "";

  if (editorVoiceAudioUrl || editorVoiceAudioDataUrl) {
    editorVoicePreview.src = editorVoiceAudioUrl || editorVoiceAudioDataUrl;
    editorVoiceState.textContent = editorVoiceAudioUrl
      ? "Voice-Audio in Firebase gespeichert."
      : "Voice-Audio im Entwurf vorhanden.";
  } else {
    editorVoicePreview.removeAttribute("src");
    editorVoicePreview.load();
    editorVoiceState.textContent = "Voice-Audio optional.";
  }

  editorUseRepeats.checked = (exercise.repeats || 1) > 1 && exercise.mode !== "text";
  editorRepeats.value = String(exercise.repeats || 1);
  editorSpeed.value = String(exercise.speed || 3);
}

function saveEditorDraft() {
  const draft = {
    name: editorExerciseName.value,
    activeExerciseName: activeEditorExerciseName,
    mode: editorMode.value,
    content: editorContent.value,
    voiceInstruction: editorVoiceInstruction.value,
    voiceAudioUrl: editorVoiceAudioUrl,
    voiceAudioPath: editorVoiceAudioPath,
    voiceAudioDataUrl: editorVoiceAudioDataUrl,
    useRepeats: editorUseRepeats.checked,
    repeats: editorRepeats.value,
    speed: editorSpeed.value,
  };
  localStorage.setItem(EDITOR_DRAFT_KEY, JSON.stringify(draft));
}

function loadSavedEditorExercise() {
  try {
    savedEditorExercises = JSON.parse(localStorage.getItem(SAVED_EDITOR_EXERCISES_KEY) || "[]");
    if (!Array.isArray(savedEditorExercises)) savedEditorExercises = [];

    const legacyExercise = JSON.parse(localStorage.getItem(SAVED_EDITOR_EXERCISE_KEY) || "null");
    if (legacyExercise?.name) {
      savedEditorExercises = upsertEditorExercise(savedEditorExercises, legacyExercise);
    }

    savedEditorExercise = savedEditorExercises[0] || legacyExercise || null;
    activeEditorExerciseName = savedEditorExercise?.name || "";
    persistEditorExercises();
  } catch (error) {
    savedEditorExercise = null;
    savedEditorExercises = [];
    activeEditorExerciseName = "";
  }
  renderSavedEditorExercises();
}

async function loadCloudEditorExercises() {
  try {
    const exercises = await fetchEditorExercisesFromCloud();
    exercises.forEach((exercise) => {
      if (exercise?.name) {
        savedEditorExercises = upsertEditorExercise(savedEditorExercises, exercise);
      }
    });

    if (activeEditorExerciseName) {
      const activeExercise = findSavedEditorExerciseByName(activeEditorExerciseName);
      if (activeExercise) savedEditorExercise = activeExercise;
    } else if (!savedEditorExercise && savedEditorExercises.length) {
      savedEditorExercise = savedEditorExercises[0];
      activeEditorExerciseName = savedEditorExercise.name;
    }

    persistEditorExercises();
    renderSavedEditorExercises();
    firebaseState.textContent = "Firebase bereit. Editor-Übungen geladen.";
  } catch (error) {
    firebaseState.textContent = "Firebase bereit. Editor-Übungen nur lokal geladen.";
  }
}

async function saveCloudEditorExercise(exercise) {
  const hydratedExercise = hydrateEditorExercise(exercise);
  if (!hydratedExercise?.name) return;

  const response = await fetch("/api/editor-exercises", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ exercise: hydratedExercise }),
  });

  if (!response.ok) {
    throw new Error("editor-exercise-api-save-failed");
  }

  await setDoc(doc(firestore, "editorExercises", slugify(hydratedExercise.name)), {
    ...hydratedExercise,
    updatedAt: new Date().toISOString(),
  }).catch(() => {});
  firebaseState.textContent = "Editor-Übung in Firebase gespeichert.";
}

async function fetchEditorExercisesFromCloud() {
  try {
    const response = await fetch("/api/editor-exercises", { cache: "no-store" });
    if (response.ok) {
      const payload = await response.json();
      return Array.isArray(payload.exercises) ? payload.exercises : [];
    }
  } catch (error) {}

  const snapshot = await getDocs(collection(firestore, "editorExercises"));
  return snapshot.docs.map((exerciseDoc) => exerciseDoc.data());
}
function findSavedEditorExerciseByName(name) {
  const normalizedName = normalizeEditorExerciseName(name);
  return savedEditorExercises.find(
    (exercise) => normalizeEditorExerciseName(exercise.name) === normalizedName,
  );
}

function loadEditorDraft() {
  try {
    const draft = JSON.parse(localStorage.getItem(EDITOR_DRAFT_KEY) || "{}");
    activeEditorExerciseName = draft.activeExerciseName || activeEditorExerciseName;

    const savedDraftExercise = findSavedEditorExerciseByName(activeEditorExerciseName);
    if (savedDraftExercise) {
      savedEditorExercise = savedDraftExercise;
      applyEditorExerciseToForm(savedDraftExercise);
    } else {
      editorExerciseName.value = draft.name || editorExerciseName.value;
      editorMode.value = draft.mode || editorMode.value;
      editorContent.value = draft.content || editorContent.value;
      editorVoiceInstruction.value = draft.voiceInstruction || editorVoiceInstruction.value;
      editorVoiceAudioUrl = draft.voiceAudioUrl || "";
      editorVoiceAudioPath = draft.voiceAudioPath || "";
      editorVoiceAudioDataUrl = draft.voiceAudioDataUrl || "";
      if (editorVoiceAudioUrl || editorVoiceAudioDataUrl) {
        editorVoicePreview.src = editorVoiceAudioUrl || editorVoiceAudioDataUrl;
        editorVoiceState.textContent = editorVoiceAudioUrl
          ? "Voice-Audio in Firebase gespeichert."
          : "Voice-Audio im Entwurf vorhanden.";
      }
      editorUseRepeats.checked = draft.useRepeats ?? editorUseRepeats.checked;
      editorRepeats.value = draft.repeats || editorRepeats.value;
      editorSpeed.value = draft.speed || editorSpeed.value;
    }
  } catch (error) {
    resetEditorForm();
  }
  renderSavedEditorExercises();
  updateEditorForm();
}

function buildKaraokeTimeline(words, timing = getCurrentKaraokeTiming()) {
  let cursorSeconds = 0;

  return words.map((word) => {
    const isPause = word === "|";
    const duration = isPause ? timing.pauseSeconds : timing.wordSeconds;
    const item = {
      label: isPause ? "" : word,
      isPause,
      start: cursorSeconds,
      end: cursorSeconds + duration,
    };
    cursorSeconds += duration;
    return item;
  });
}

function updateKaraokeHighlight() {
  if (!karaokeTimeline.length || !startedAt) return;

  const elapsedSeconds = Math.max(0, (performance.now() - startedAt) / 1000);
  activeKaraokeIndex = karaokeTimeline.findIndex(
    (item) => elapsedSeconds >= item.start && elapsedSeconds < item.end,
  );
  if (activeKaraokeIndex < 0) activeKaraokeIndex = karaokeTimeline.length - 1;

  updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
}

function renderKaraokeOverlay(overlay, timeline) {
  overlay.innerHTML = "";
  overlay.classList.toggle("is-sentence-mode", timeline.some((item) => item.isSentence));

  timeline.forEach((item, index) => {
    const span = document.createElement("span");
    span.className = item.isPause
      ? "karaoke-word karaoke-pause"
      : item.isSentence
        ? "karaoke-word karaoke-sentence"
        : "karaoke-word";
    span.dataset.index = String(index);
    span.textContent = item.label;
    overlay.append(span);
  });
}

function updateKaraokeDisplay(overlay, timeline, activeIndex) {
  if (timeline.some((item) => item.isSentence)) {
    const boundedIndex = Math.max(0, Math.min(activeIndex, timeline.length - 1));
    overlay.querySelectorAll(".karaoke-word").forEach((word) => {
      const index = Number(word.dataset.index);
      word.classList.toggle("is-active", index === boundedIndex);
      word.classList.toggle("is-next", false);
      word.classList.toggle("is-visible", index === boundedIndex);
    });
    return;
  }

  const activeWordIndex = timeline[activeIndex]?.isPause
    ? getPreviousSpokenIndex(timeline, activeIndex) ?? getNextSpokenIndex(timeline, activeIndex) ?? activeIndex
    : activeIndex;
  const nextWordIndex = getNextSpokenIndex(timeline, activeWordIndex);

  overlay.querySelectorAll(".karaoke-word").forEach((word) => {
    const index = Number(word.dataset.index);
    const isActive = index === activeWordIndex && !timeline[index]?.isPause;
    const isNext = index === nextWordIndex && !timeline[index]?.isPause;

    word.classList.toggle("is-active", isActive);
    word.classList.toggle("is-next", isNext);
    word.classList.toggle("is-visible", isActive || isNext);
  });
}

function getNextSpokenIndex(timeline, fromIndex) {
  for (let index = fromIndex + 1; index < timeline.length; index += 1) {
    if (!timeline[index].isPause) return index;
  }
  return null;
}

function getPreviousSpokenIndex(timeline, fromIndex) {
  for (let index = fromIndex - 1; index >= 0; index -= 1) {
    if (!timeline[index].isPause) return index;
  }
  return null;
}

function updateKaraokeDisplayAtTime(overlay, timeline, seconds) {
  if (!timeline.length) return;
  let activeIndex = timeline.findIndex((item) => seconds >= item.start && seconds < item.end);
  if (activeIndex < 0) activeIndex = timeline.length - 1;
  updateKaraokeDisplay(overlay, timeline, activeIndex);
}

function scheduleAutoStop() {
  window.clearTimeout(autoStopTimeoutId);
  window.clearTimeout(hardStopTimeoutId);

  if (karaokeTimeline.some((item) => item.isSentence)) {
    const hardLimitSeconds = Math.max(30, karaokeTimeline.length * SENTENCE_MAX_SECONDS);
    hardStopTimeoutId = window.setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        message.textContent = "Sicherheitsstopp erreicht. Aufnahme wird beendet.";
        stopRecording();
      }
    }, hardLimitSeconds * 1000);
    return;
  }

  const lastTimelineItem = karaokeTimeline[karaokeTimeline.length - 1];
  const durationSeconds =
    lastTimelineItem?.end || Math.max(1, karaokeWords.length) * DEFAULT_KARAOKE_WORD_SECONDS;
  const durationMs = durationSeconds * 1000;
  const tailMs = RECORDING_TAIL_SECONDS * 1000;

  autoStopTimeoutId = window.setTimeout(() => {
    if (isRecording || mediaRecorder?.state === "recording") {
      stopRecording();
    } else if (startedAt) {
      restoreRecorderControls("Übung beendet.");
    }
  }, durationMs + tailMs);

  hardStopTimeoutId = window.setTimeout(() => {
    if (mediaRecorder?.state === "recording") {
      stopRecording();
    }
  }, durationMs + tailMs + 1200);
}

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function withTimeout(promise, ms) {
  return Promise.race([promise, wait(ms)]);
}

async function waitForCameraFrame() {
  await ensureCameraPreviewPlaying();

  if (cameraPreview.videoWidth && cameraPreview.videoHeight && cameraPreview.readyState >= 2) {
    return;
  }

  await withTimeout(
    new Promise((resolve) => {
      const finish = () => {
        cameraPreview.removeEventListener("loadedmetadata", finish);
        cameraPreview.removeEventListener("canplay", finish);
        resolve();
      };
      cameraPreview.addEventListener("loadedmetadata", finish, { once: true });
      cameraPreview.addEventListener("canplay", finish, { once: true });
    }),
    900,
  );
}

async function attachCameraPreview(stream) {
  cameraPreview.muted = true;
  cameraPreview.defaultMuted = true;
  cameraPreview.autoplay = true;
  cameraPreview.playsInline = true;
  cameraPreview.setAttribute("playsinline", "");
  cameraPreview.srcObject = stream;
  await ensureCameraPreviewPlaying();
}

async function ensureMediaStream() {
  if (hasActiveMediaStream()) {
    await attachCameraPreview(mediaStream);
    setCameraReadyUi();
    return true;
  }

  permissionState.textContent = "Zugriff wird angefragt";
  message.textContent = "Kamera und Mikrofon werden aktiviert.";
  cameraStartButton.disabled = true;

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 720 },
        height: { ideal: 1280 },
        aspectRatio: { ideal: 9 / 16 },
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: false,
      },
    });

    await attachCameraPreview(mediaStream);
    setCameraReadyUi();
    return true;
  } catch (error) {
    document.body.classList.add("camera-not-ready");
    document.body.classList.remove("camera-ready");
    cameraStartOverlay.classList.remove("is-hidden");
    permissionState.textContent = "Zugriff fehlt";
    message.textContent =
      "Bitte Kamera und Mikrofon erlauben. Danach erneut auf Kamera aktivieren tippen.";
    return false;
  } finally {
    cameraStartButton.disabled = false;
  }
}

function hasActiveMediaStream() {
  return Boolean(mediaStream?.getTracks?.().some((track) => track.readyState === "live"));
}

function setCameraReadyUi() {
  document.body.classList.remove("camera-not-ready");
  document.body.classList.add("camera-ready");
  cameraStartOverlay.classList.add("is-hidden");
  permissionState.textContent = "Kamera und Mikrofon aktiv";
  message.textContent = "Bereit für die Aufnahme.";
}

async function ensureCameraPreviewPlaying() {
  if (!mediaStream) return false;

  if (cameraPreview.srcObject !== mediaStream) {
    cameraPreview.srcObject = mediaStream;
  }

  try {
    await cameraPreview.play();
    window.clearTimeout(cameraStartRetryId);
    cameraStartRetryId = null;
    permissionState.textContent = "Kamera und Mikrofon aktiv";
    return true;
  } catch (error) {
    scheduleCameraPreviewRetry();
    if (!isRecording) {
      message.textContent = "Kamera bereit. Zum Aktivieren einmal auf den Bildschirm tippen.";
    }
    return false;
  }
}

function scheduleCameraPreviewRetry() {
  window.clearTimeout(cameraStartRetryId);
  cameraStartRetryId = window.setTimeout(() => {
    ensureCameraPreviewPlaying();
  }, 450);
}

function shouldUseDirectRecordingStream() {
  const userAgent = navigator.userAgent || "";
  const isAppleTouch =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  return isAppleTouch;
}

function startComposedVideoStream() {
  if (shouldUseDirectRecordingStream()) {
    composedRecordingStream = null;
    composedRecordingAudioTrack = null;
    recordingCanvas = null;
    recordingCanvasContext = null;
    return mediaStream;
  }

  recordingCanvas = document.createElement("canvas");
  recordingCanvas.width = RECORDING_WIDTH;
  recordingCanvas.height = RECORDING_HEIGHT;
  recordingCanvasContext = recordingCanvas.getContext("2d");

  if (!recordingCanvas.captureStream) {
    recordingCanvas = null;
    recordingCanvasContext = null;
    return mediaStream;
  }

  drawComposedVideoFrame();

  composedRecordingStream = recordingCanvas.captureStream(30);
  const audioTrack = mediaStream.getAudioTracks()[0];
  if (audioTrack) {
    composedRecordingAudioTrack = audioTrack.clone();
    composedRecordingStream.addTrack(composedRecordingAudioTrack);
  }

  return composedRecordingStream;
}

function drawComposedVideoFrame() {
  if (!recordingCanvasContext || !cameraPreview.videoWidth || !cameraPreview.videoHeight) {
    recordingDrawFrame = window.requestAnimationFrame(drawComposedVideoFrame);
    return;
  }

  const sourceWidth = cameraPreview.videoWidth;
  const sourceHeight = cameraPreview.videoHeight;
  const targetWidth = RECORDING_WIDTH;
  const targetHeight = RECORDING_HEIGHT;
  const scale = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight) * 1.1;
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const drawX = (targetWidth - drawWidth) / 2;
  const drawY = (targetHeight - drawHeight) / 2;

  recordingCanvasContext.save();
  recordingCanvasContext.clearRect(0, 0, targetWidth, targetHeight);
  recordingCanvasContext.fillStyle = "#101820";
  recordingCanvasContext.fillRect(0, 0, targetWidth, targetHeight);
  recordingCanvasContext.translate(targetWidth, 0);
  recordingCanvasContext.scale(-1, 1);
  recordingCanvasContext.drawImage(cameraPreview, drawX, drawY, drawWidth, drawHeight);
  recordingCanvasContext.restore();
  recordingDrawFrame = window.requestAnimationFrame(drawComposedVideoFrame);
}

function stopComposedVideoStream() {
  window.cancelAnimationFrame(recordingDrawFrame);
  recordingDrawFrame = null;

  if (composedRecordingStream) {
    composedRecordingStream.getVideoTracks().forEach((track) => track.stop());
  }

  if (composedRecordingAudioTrack) {
    composedRecordingAudioTrack.stop();
  }

  composedRecordingStream = null;
  composedRecordingAudioTrack = null;
  recordingCanvas = null;
  recordingCanvasContext = null;
}

function drawWaveform(canvas, values, options = {}) {
  const context = canvas.getContext("2d");
  resizeCanvasToDisplay(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const middle = height / 2;
  const progress = options.progress ?? null;
  const pixelRatio = window.devicePixelRatio || 1;
  const levelMeterWidth = options.levelMeter ? Math.max(10 * pixelRatio, 10) : 0;
  const levelMeterGap = options.levelMeter ? Math.max(6 * pixelRatio, 6) : 0;
  const waveformWidth = Math.max(1, width - levelMeterWidth - levelMeterGap);

  context.clearRect(0, 0, width, height);
  context.fillStyle = options.overlay ? "rgba(16, 24, 32, 0.58)" : "#101820";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.13)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, middle);
  context.lineTo(width, middle);
  context.stroke();

  if (!values.length) {
    context.fillStyle = "rgba(255,255,255,0.54)";
    context.font = "700 30px system-ui, sans-serif";
    context.textAlign = "center";
    context.fillText("Noch keine Wellenform", width / 2, middle + 10);
    if (options.levelMeter) {
      drawLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options.currentLevel || 0);
    }
    return;
  }

  const displayValues = normalizeWaveformValues(
    options.mode === "playback" ? resamplePlaybackValues(values, waveformWidth, options) : values,
    options,
  );
  const displayLevels = getWaveformColorLevels(values, displayValues, waveformWidth, options);
  const barCount = displayValues.length;
  const gap = options.mode === "live" ? 4 : 3;
  const barWidth = Math.max(3, (waveformWidth - gap * (barCount - 1)) / barCount);
  const activeX = progress === null ? waveformWidth : waveformWidth * Math.max(0, Math.min(1, progress));

  const usedWidth = barCount * barWidth + (barCount - 1) * gap;
  const startX = options.align === "right" ? waveformWidth - usedWidth : 0;

  displayValues.forEach((value, index) => {
    const x = startX + index * (barWidth + gap);
    const normalized = Math.max(0, Math.min(1, value / 100));
    const barHeight = normalized <= 0 ? 0 : Math.max(2, normalized * (height - 38));
    const isPlayed = x <= activeX;

    context.fillStyle = getWaveformBarColor(displayLevels[index] ?? value, {
      dim: Boolean(options.dim),
      played: options.mode !== "playback" || isPlayed,
    });
    if (barHeight > 0) {
      roundRect(context, x, middle - barHeight / 2, barWidth, barHeight, Math.min(7, barWidth / 2));
      context.fill();
    }
  });

  if (progress !== null) {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(activeX, 16);
    context.lineTo(activeX, height - 16);
    context.stroke();
  }

  if (options.levelMeter) {
    drawLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options.currentLevel || 0);
  }
}

function getWaveformColorLevels(values, displayValues, waveformWidth, options = {}) {
  const levelValues = Array.isArray(options.levelValues) && options.levelValues.length
    ? options.levelValues
    : values;

  if (options.mode === "playback") {
    return normalizeWaveformValues(resamplePlaybackValues(levelValues, waveformWidth, options), {
      ...options,
      compress: 1,
    });
  }

  return normalizeWaveformValues(levelValues.slice(-displayValues.length), {
    ...options,
    compress: 1,
  });
}

function getWaveformBarColor(level, options = {}) {
  const isPause = Number(level || 0) <= SENTENCE_SILENCE_THRESHOLD;

  if (!options.played) {
    return isPause ? "rgba(56, 193, 114, 0.34)" : "rgba(246, 180, 75, 0.34)";
  }

  if (options.dim) {
    return isPause ? "rgba(56, 193, 114, 0.62)" : "rgba(246, 180, 75, 0.74)";
  }

  return isPause ? "#38c172" : "#f6b44b";
}

function drawLevelMeter(context, x, y, width, height, level) {
  const padding = Math.max(5, width * 0.35);
  const meterX = x;
  const meterY = y + padding;
  const meterHeight = Math.max(1, height - padding * 2);
  const normalizedLevel = Math.max(0, Math.min(1, level / 100));
  const fillHeight = meterHeight * normalizedLevel;
  const radius = Math.min(width / 2, 9);

  context.save();
  context.fillStyle = "rgba(255,255,255,0.16)";
  roundRect(context, meterX, meterY, width, meterHeight, radius);
  context.fill();

  context.save();
  roundRect(context, meterX, meterY, width, meterHeight, radius);
  context.clip();
  const gradient = context.createLinearGradient(0, meterY + meterHeight, 0, meterY);
  gradient.addColorStop(0, "#38c172");
  gradient.addColorStop(0.58, "#f6b44b");
  gradient.addColorStop(1, "#e1495b");
  context.fillStyle = gradient;
  context.fillRect(meterX, meterY + meterHeight - fillHeight, width, fillHeight);
  context.restore();

  context.strokeStyle = "rgba(255,255,255,0.22)";
  context.lineWidth = 1;
  roundRect(context, meterX, meterY, width, meterHeight, radius);
  context.stroke();
  context.restore();
}

function normalizeWaveformValues(values, options = {}) {
  const validValues = values.map((value) => Math.max(0, Number(value) || 0));
  if (!validValues.length) return validValues;

  const sortedValues = [...validValues].sort((a, b) => a - b);
  const percentileIndex = Math.max(0, Math.floor((sortedValues.length - 1) * 0.88));
  const localPeak = Math.max(18, sortedValues[percentileIndex], Math.max(...validValues) * 0.62);
  const visualCeiling = options.visualCeiling || WAVEFORM_VISUAL_CEILING;
  const dynamicRange = options.dynamicRange || WAVEFORM_DYNAMIC_RANGE;
  const externalCompress = options.compress || 1;

  return validValues.map((value) => {
    const relative = Math.min(value, localPeak * dynamicRange) / (localPeak * dynamicRange);
    const shaped = Math.pow(relative, 0.72);
    return Math.min(visualCeiling, shaped * visualCeiling * externalCompress);
  });
}

function resamplePlaybackValues(values, waveformWidth, options = {}) {
  if (!values.length || !options.durationSeconds) return values;

  const targetCount = Math.max(40, Math.min(values.length, Math.round(waveformWidth / 5)));
  if (targetCount >= values.length) return values;

  const bucketSize = values.length / targetCount;
  const resampled = [];

  for (let bucket = 0; bucket < targetCount; bucket += 1) {
    const start = Math.floor(bucket * bucketSize);
    const end = Math.max(start + 1, Math.ceil((bucket + 1) * bucketSize));
    let maxValue = 0;

    for (let index = start; index < end && index < values.length; index += 1) {
      maxValue = Math.max(maxValue, Number(values[index]) || 0);
    }

    resampled.push(maxValue);
  }

  return resampled;
}

function resizeCanvasToDisplay(canvas) {
  const pixelRatio = window.devicePixelRatio || 1;
  const displayWidth = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
  const displayHeight = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
}

function drawFrequencyTimeline(canvas, pitchValues, strengthValues = []) {
  const context = canvas.getContext("2d");
  resizeCanvasToDisplay(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const padding = 12 * pixelRatio;
  const values = pitchValues.slice(-MAX_VISIBLE_SAMPLES);
  const strengths = strengthValues.slice(-values.length);
  const lowHz = PITCH_LOW_HZ;
  const highHz = PITCH_HIGH_HZ;
  const graphHeight = Math.max(1, height - padding * 2);
  const step = values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;

  context.clearRect(0, 0, width, height);
  context.fillStyle = "rgba(16, 24, 32, 0.62)";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.12)";
  context.lineWidth = 1 * pixelRatio;
  [0.25, 0.5, 0.75].forEach((ratio) => {
    const y = padding + graphHeight * ratio;
    context.beginPath();
    context.moveTo(padding, y);
    context.lineTo(width - padding, y);
    context.stroke();
  });

  context.fillStyle = "rgba(255,255,255,0.68)";
  context.font = `${10 * pixelRatio}px system-ui, sans-serif`;
  context.fillText(`${highHz} Hz`, padding, padding + 10 * pixelRatio);
  context.fillText(`${lowHz} Hz`, padding, height - padding);

  context.beginPath();
  let hasLine = false;
  values.forEach((pitch, index) => {
    if (!pitch) return;
    const clampedPitch = Math.max(lowHz, Math.min(highHz, pitch));
    const x = padding + index * step;
    const y = padding + graphHeight - ((clampedPitch - lowHz) / (highHz - lowHz)) * graphHeight;
    if (!hasLine) {
      context.moveTo(x, y);
      hasLine = true;
    } else {
      context.lineTo(x, y);
    }
  });

  context.strokeStyle = "#36b6d9";
  context.lineWidth = 2.5 * pixelRatio;
  context.stroke();

  values.forEach((pitch, index) => {
    if (!pitch) return;
    const strength = Math.max(0.2, Math.min(1, (strengths[index] || 0) / 100));
    const clampedPitch = Math.max(lowHz, Math.min(highHz, pitch));
    const x = padding + index * step;
    const y = padding + graphHeight - ((clampedPitch - lowHz) / (highHz - lowHz)) * graphHeight;
    context.fillStyle = `rgba(246, 180, 75, ${0.25 + strength * 0.55})`;
    context.beginPath();
    context.arc(x, y, Math.max(1.7 * pixelRatio, strength * 4 * pixelRatio), 0, Math.PI * 2);
    context.fill();
  });
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

function showResult(metadata, videoBlob) {
  stopPlaybackAnimation();
  if (currentVideoUrl) URL.revokeObjectURL(currentVideoUrl);
  currentVideoUrl = URL.createObjectURL(videoBlob);
  recordingPlayer.pause();
  recordingPlayer.removeAttribute("src");
  recordingPlayer.load();
  recordingPlayer.src = currentVideoUrl;
  recordingPlayer.muted = false;
  recordingPlayer.defaultMuted = false;
  recordingPlayer.volume = 1;
  applyPlaybackGain();
  recordingPlayer.load();
  applyVideoAspectRatio(recordingPlayer);

  resultTitle.textContent = metadata.uebung;
  durationBadge.textContent = formatTime(metadata.dauerSekunden);
  updateResultStats(metadata);
  setupPlaybackKaraoke(metadata);
  playPauseButton.textContent = "Play";
  playbackSeek.value = "0";
  playbackTimeLabel.textContent = `00:00 / ${formatTime(metadata.dauerSekunden || 0)}`;

  drawWaveform(playbackWaveform, metadata.amplituden, {
    mode: "playback",
    progress: 0,
    durationSeconds: metadata.dauerSekunden,
    compress: 0.55,
    dim: true,
    levelValues: metadata.lautstaerkePegel || metadata.lautstaerken || metadata.amplituden,
  });
  playbackEmptyState?.classList.add("is-hidden");
  resultPanel.classList.remove("is-hidden");
  setActiveView("playback");
  window.scrollTo({ top: 0, behavior: "smooth" });
  message.textContent = "Video ist bereit. Zum Abspielen Play tippen.";
  window.setTimeout(refreshPlaybackReadyState, 120);
}

function setupPlaybackKaraoke(metadata) {
  const script = metadata.uebungText || metadata.uebung || "";
  const sentences =
    metadata.uebungKonfiguration?.typ === "sentences"
      ? (metadata.uebungKonfiguration.saetze?.length
          ? metadata.uebungKonfiguration.saetze
          : script.split(/\s*\|\s*|\n+/))
          .map((sentence) => String(sentence).trim())
          .filter(Boolean)
      : [];

  const playbackSentenceSeconds = sentences.length
    ? Math.max(1.4, (Number(metadata.dauerSekunden) || sentences.length * 3) / sentences.length)
    : SENTENCE_MAX_SECONDS;

  playbackKaraokeTimeline = sentences.length
    ? buildSentenceTimeline(sentences, playbackSentenceSeconds)
    : buildKaraokeTimeline(
        script.split(/\s+/).filter(Boolean),
        getPlaybackKaraokeTiming(metadata),
      );
  renderKaraokeOverlay(playbackKaraokeOverlay, playbackKaraokeTimeline);
  updateKaraokeDisplay(playbackKaraokeOverlay, playbackKaraokeTimeline, 0);
}

function getPlaybackKaraokeTiming(metadata) {
  const config = metadata.uebungKonfiguration;
  if (config?.sekundenProEinheit) {
    return {
      wordSeconds: Number(config.sekundenProEinheit) || DEFAULT_KARAOKE_WORD_SECONDS,
      pauseSeconds: Number(config.pauseSekunden) || DEFAULT_KARAOKE_PAUSE_SECONDS,
    };
  }

  if (config?.typ === "text") {
    return {
      wordSeconds: Number(config.sekundenProWort) || DEFAULT_KARAOKE_WORD_SECONDS,
      pauseSeconds: Number(config.pauseSekunden) || DEFAULT_KARAOKE_PAUSE_SECONDS,
    };
  }

  if (config?.typ === "silben") {
    return {
      wordSeconds: Number(config.sekundenProSilbe) || DEFAULT_KARAOKE_WORD_SECONDS,
      pauseSeconds: Number(config.pauseSekunden) || DEFAULT_KARAOKE_PAUSE_SECONDS,
    };
  }

  return {
    wordSeconds: DEFAULT_KARAOKE_WORD_SECONDS,
    pauseSeconds: DEFAULT_KARAOKE_PAUSE_SECONDS,
  };
}

function startPlaybackAnimation() {
  stopPlaybackAnimation();

  const tick = () => {
    updatePlaybackVisuals();
    if (!recordingPlayer.paused && !recordingPlayer.ended) {
      playbackAnimationFrame = window.requestAnimationFrame(tick);
    }
  };

  playbackAnimationFrame = window.requestAnimationFrame(tick);
}

function stopPlaybackAnimation() {
  window.cancelAnimationFrame(playbackAnimationFrame);
  playbackAnimationFrame = null;
}

async function togglePlayback() {
  if (!recordingPlayer.src && currentVideoUrl) {
    recordingPlayer.src = currentVideoUrl;
    recordingPlayer.load();
  }

  if (!recordingPlayer.src) {
    message.textContent = "Kein Video zum Abspielen geladen.";
    return;
  }

  if (recordingPlayer.paused) {
    playPauseButton.disabled = true;
    playPauseButton.textContent = "Lädt";
    recordingPlayer.muted = false;
    recordingPlayer.defaultMuted = false;
    recordingPlayer.volume = 1;
    applyPlaybackGain();
    if (recordingPlayer.ended) recordingPlayer.currentTime = 0;

    await waitForPlaybackReady(recordingPlayer, 1600);

    recordingPlayer.play().catch(() => {
      message.textContent = "Zum Abspielen bitte noch einmal tippen.";
    }).finally(() => {
      playPauseButton.disabled = false;
      playPauseButton.textContent = recordingPlayer.paused ? "Play" : "Pause";
    });
  } else {
    recordingPlayer.pause();
  }
}

function waitForPlaybackReady(videoElement, timeoutMs = 1600) {
  if (videoElement.readyState >= 2) return Promise.resolve(true);

  return new Promise((resolve) => {
    const timeoutId = window.setTimeout(() => finish(false), timeoutMs);
    const finish = (ready) => {
      window.clearTimeout(timeoutId);
      videoElement.removeEventListener("canplay", handleReady);
      videoElement.removeEventListener("loadeddata", handleReady);
      videoElement.removeEventListener("loadedmetadata", handleReady);
      resolve(ready);
    };
    const handleReady = () => finish(true);

    videoElement.addEventListener("canplay", handleReady, { once: true });
    videoElement.addEventListener("loadeddata", handleReady, { once: true });
    videoElement.addEventListener("loadedmetadata", handleReady, { once: true });
    videoElement.load();
  });
}

function updatePlaybackVisuals(forcedProgress = null) {
  if (!currentMetadata) return;
  const playbackValues = currentMetadata.amplituden || [];
  const measuredDuration = currentMetadata.dauerSekunden || 0;
  const mediaDuration = Number.isFinite(recordingPlayer.duration) ? recordingPlayer.duration : 0;
  const duration = measuredDuration || mediaDuration || 0;
  const syncedCurrentTime = getSyncedPlaybackTime(duration, mediaDuration);
  const progress =
    forcedProgress ?? (duration ? Math.max(0, Math.min(1, syncedCurrentTime / duration)) : 0);

  drawWaveform(playbackWaveform, playbackValues, {
    mode: "playback",
    progress,
    durationSeconds: duration,
    compress: 0.55,
    dim: true,
    levelValues: currentMetadata.lautstaerkePegel || currentMetadata.lautstaerken || playbackValues,
  });

  playbackSeek.value = String(Math.round(progress * 1000));
  playbackTimeLabel.textContent = `${formatTime(syncedCurrentTime || 0)} / ${formatTime(duration || 0)}`;
  updateKaraokeDisplayAtTime(playbackKaraokeOverlay, playbackKaraokeTimeline, syncedCurrentTime || 0);
}

function refreshPlaybackReadyState() {
  applyVideoAspectRatio(recordingPlayer);
  recordingPlayer.muted = false;
  recordingPlayer.defaultMuted = false;
  recordingPlayer.volume = 1;
  updatePlaybackVisuals(0);
  window.setTimeout(() => updatePlaybackVisuals(), 80);
}

function getSyncedPlaybackTime(targetDuration, mediaDuration) {
  const currentTime = recordingPlayer.currentTime || 0;
  if (!targetDuration || !mediaDuration || Math.abs(targetDuration - mediaDuration) < 0.2) {
    return currentTime;
  }

  return Math.max(0, Math.min(targetDuration, (currentTime / mediaDuration) * targetDuration));
}

function applyVideoAspectRatio(videoElement) {
  if (!videoElement.videoWidth || !videoElement.videoHeight) return;

  videoElement.style.aspectRatio = `${videoElement.videoWidth} / ${videoElement.videoHeight}`;
  videoElement.style.objectPosition = "center center";
}

function scheduleResponsiveMediaRefresh() {
  window.clearTimeout(responsiveRefreshId);
  responsiveRefreshId = window.setTimeout(refreshResponsiveMedia, 180);
}

function refreshResponsiveMedia() {
  applyVideoAspectRatio(recordingPlayer);

  if (currentMetadata?.amplituden?.length) {
    updatePlaybackVisuals();
  } else {
    drawWaveform(playbackWaveform, [], { mode: "playback" });
  }

  if (isRecording) {
    drawWaveform(liveWaveform, amplitudes, {
      mode: "live",
      align: "right",
      overlay: true,
      levelMeter: true,
      currentLevel: volumeValues.at(-1) || 0,
    });
    drawFrequencyTimeline(
      frequencyTimeline,
      pitchHzValues.slice(-MAX_VISIBLE_SAMPLES),
      frequencyValues.slice(-MAX_VISIBLE_SAMPLES),
    );
  }
}

function updateResultStats(metadata) {
  const stats = calculateAmplitudeStats(metadata.amplituden || []);
  metadata.durchschnittlicheLautstaerke = stats.average;
  metadata.maximaleLautstaerke = stats.maximum;
  metadata.audioAnalyse = metadata.audioAnalyse || buildAudioAnalysis(metadata);
  averageVolume.textContent = String(stats.average);
  maxVolume.textContent = String(stats.maximum);
  sampleCount.textContent = String((metadata.amplituden || []).length);
  renderAudioAnalysis(metadata);
}

function calculateAmplitudeStats(values) {
  const roundedValues = values.map((value) => Math.round(value));
  return {
    average: roundedValues.length
      ? Math.round(roundedValues.reduce((sum, value) => sum + value, 0) / roundedValues.length)
      : 0,
    maximum: roundedValues.length ? Math.max(...roundedValues) : 0,
  };
}

function calculatePitchStats(values) {
  const spokenValues = values.filter((value) => value > 0);
  return {
    average: spokenValues.length
      ? Math.round(spokenValues.reduce((sum, value) => sum + value, 0) / spokenValues.length)
      : 0,
    minimum: spokenValues.length ? Math.min(...spokenValues) : 0,
    maximum: spokenValues.length ? Math.max(...spokenValues) : 0,
  };
}

function clampSensitivity(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 30;
  return Math.max(1, Math.min(200, Math.round(numericValue)));
}

function getSensitivityFactor() {
  const value = clampSensitivity(sensitivitySlider.value);
  return value / 100;
}

function formatSensitivityLabel(value) {
  return `${clampSensitivity(value)}%`;
}

function getDefaultElevenLabsSettings() {
  return {
    voiceId: "21m00Tcm4TlvDq8ikWAM",
    stability: 58,
    similarity: 82,
    style: 12,
    speakerBoost: true,
  };
}

function getElevenLabsSettings() {
  try {
    return {
      ...getDefaultElevenLabsSettings(),
      ...JSON.parse(localStorage.getItem(ELEVENLABS_SETTINGS_KEY) || "{}"),
    };
  } catch (error) {
    return getDefaultElevenLabsSettings();
  }
}

function getElevenLabsRequestSettings() {
  const settings = getElevenLabsSettings();
  return {
    voiceId: String(settings.voiceId || "").trim() || getDefaultElevenLabsSettings().voiceId,
    voiceSettings: {
      stability: clampPercent(settings.stability) / 100,
      similarity_boost: clampPercent(settings.similarity) / 100,
      style: clampPercent(settings.style) / 100,
      use_speaker_boost: Boolean(settings.speakerBoost),
    },
  };
}

function clampPercent(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.max(0, Math.min(100, Math.round(numericValue)));
}

function loadSettingsControls() {
  const elevenSettings = getElevenLabsSettings();
  if (settingsVoiceId) settingsVoiceId.value = elevenSettings.voiceId;
  if (settingsVoiceStability) settingsVoiceStability.value = String(clampPercent(elevenSettings.stability));
  if (settingsVoiceSimilarity) settingsVoiceSimilarity.value = String(clampPercent(elevenSettings.similarity));
  if (settingsVoiceStyle) settingsVoiceStyle.value = String(clampPercent(elevenSettings.style));
  if (settingsSpeakerBoost) settingsSpeakerBoost.checked = Boolean(elevenSettings.speakerBoost);
  if (settingsSensitivity) settingsSensitivity.value = sensitivitySlider.value;
  if (settingsPlaybackVolume) settingsPlaybackVolume.value = playbackVolumeSlider.value;
  renderSettingsControls();
}

function renderSettingsControls() {
  if (settingsVoiceStabilityValue) settingsVoiceStabilityValue.textContent = `${settingsVoiceStability?.value || 0}%`;
  if (settingsVoiceSimilarityValue) settingsVoiceSimilarityValue.textContent = `${settingsVoiceSimilarity?.value || 0}%`;
  if (settingsVoiceStyleValue) settingsVoiceStyleValue.textContent = `${settingsVoiceStyle?.value || 0}%`;
  if (settingsSensitivityValue) settingsSensitivityValue.textContent = formatSensitivityLabel(sensitivitySlider.value);
  if (settingsPlaybackVolumeValue) settingsPlaybackVolumeValue.textContent = `${playbackVolumeSlider.value}%`;
  if (settingsState) settingsState.textContent = "Einstellungen lokal gespeichert.";
}

function saveElevenLabsSettings() {
  const settings = {
    voiceId: settingsVoiceId?.value.trim() || getDefaultElevenLabsSettings().voiceId,
    stability: clampPercent(settingsVoiceStability?.value),
    similarity: clampPercent(settingsVoiceSimilarity?.value),
    style: clampPercent(settingsVoiceStyle?.value),
    speakerBoost: Boolean(settingsSpeakerBoost?.checked),
  };
  localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(settings));
}

function updateSensitivitySetting(value) {
  const nextValue = clampSensitivity(value);
  sensitivitySlider.value = String(nextValue);
  if (settingsSensitivity) settingsSensitivity.value = String(nextValue);
  sensitivityValue.textContent = formatSensitivityLabel(nextValue);
  if (settingsSensitivityValue) settingsSensitivityValue.textContent = formatSensitivityLabel(nextValue);
  localStorage.setItem(SENSITIVITY_KEY, String(nextValue));
  rescaleCurrentAmplitudes();
}

function updatePlaybackVolumeSetting(value) {
  const nextValue = Math.max(100, Math.min(400, Math.round(Number(value) || 200)));
  playbackVolumeSlider.value = String(nextValue);
  if (settingsPlaybackVolume) settingsPlaybackVolume.value = String(nextValue);
  playbackVolumeValue.textContent = `${nextValue}%`;
  if (settingsPlaybackVolumeValue) settingsPlaybackVolumeValue.textContent = `${nextValue}%`;
  localStorage.setItem(PLAYBACK_GAIN_KEY, String(nextValue));
  ensurePlaybackAudioBoost();
}

function calculateStandardDeviation(values) {
  const numericValues = values.filter((value) => Number.isFinite(value));
  if (!numericValues.length) return 0;
  const average = numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
  const variance =
    numericValues.reduce((sum, value) => sum + (value - average) ** 2, 0) / numericValues.length;
  return Math.round(Math.sqrt(variance));
}

function countPauses(values, durationSeconds, threshold = 6) {
  if (!values.length || !durationSeconds) return 0;
  const secondsPerSample = durationSeconds / values.length;
  const minPauseSamples = Math.max(2, Math.round(0.25 / secondsPerSample));
  let pauseCount = 0;
  let silentRun = 0;

  values.forEach((value) => {
    if (value <= threshold) {
      silentRun += 1;
      return;
    }

    if (silentRun >= minPauseSamples) pauseCount += 1;
    silentRun = 0;
  });

  if (silentRun >= minPauseSamples) pauseCount += 1;
  return pauseCount;
}

function detectReadingSegments(values, durationSeconds, threshold = 6, minPauseSeconds = 1) {
  if (!values.length || !durationSeconds) return [];

  const secondsPerSample = durationSeconds / values.length;
  const minPauseSamples = Math.max(1, Math.round(minPauseSeconds / secondsPerSample));
  const segments = [];
  let segmentStartIndex = null;
  let silentRun = 0;

  values.forEach((value, index) => {
    const isSilent = value <= threshold;

    if (!isSilent && segmentStartIndex === null) {
      segmentStartIndex = Math.max(0, index - silentRun);
    }

    if (isSilent) {
      silentRun += 1;
      if (segmentStartIndex !== null && silentRun >= minPauseSamples) {
        const segmentEndIndex = Math.max(segmentStartIndex, index - silentRun);
        segments.push(buildReadingSegment(segments.length, segmentStartIndex, segmentEndIndex, secondsPerSample));
        segmentStartIndex = null;
      }
      return;
    }

    silentRun = 0;
  });

  if (segmentStartIndex !== null) {
    segments.push(buildReadingSegment(segments.length, segmentStartIndex, values.length - 1, secondsPerSample));
  }

  return segments.filter((segment) => segment.dauerSekunden >= 0.2);
}

function buildReadingSegment(index, startIndex, endIndex, secondsPerSample) {
  const startSeconds = startIndex * secondsPerSample;
  const endSeconds = Math.max(startSeconds, (endIndex + 1) * secondsPerSample);
  return {
    index: index + 1,
    startSekunden: Number(startSeconds.toFixed(2)),
    endeSekunden: Number(endSeconds.toFixed(2)),
    dauerSekunden: Number((endSeconds - startSeconds).toFixed(2)),
  };
}

function countSpeechImpulses(values, durationSeconds) {
  if (values.length < 3 || !durationSeconds) return 0;
  const stats = calculateAmplitudeStats(values);
  const threshold = Math.max(18, stats.average + Math.max(8, calculateStandardDeviation(values) * 0.45));
  const minGapSamples = Math.max(2, Math.round((0.14 / durationSeconds) * values.length));
  let impulses = 0;
  let lastImpulseIndex = -minGapSamples;

  for (let index = 1; index < values.length - 1; index += 1) {
    const previous = values[index - 1];
    const current = values[index];
    const next = values[index + 1];
    const isPeak = current >= threshold && current >= previous && current > next;

    if (isPeak && index - lastImpulseIndex >= minGapSamples) {
      impulses += 1;
      lastImpulseIndex = index;
    }
  }

  return impulses;
}

function buildAudioAnalysis(metadata) {
  const durationSeconds = Number(metadata.dauerSekunden || 0);
  const amplitudesForAnalysis = (metadata.amplituden || []).map(Number).filter(Number.isFinite);
  const volumeLevels = (metadata.lautstaerkePegel || metadata.lautstaerken || []).map(Number).filter(Number.isFinite);
  const pitchValues = (metadata.stimmfrequenzenHz || []).map(Number).filter(Number.isFinite);
  const frequencyAmplitudes = (metadata.frequenzAmplituden || []).map(Number).filter(Number.isFinite);
  const spokenPitchValues = pitchValues.filter((value) => value > 0);
  const amplitudeStats = calculateAmplitudeStats(amplitudesForAnalysis);
  const volumeStats = calculateAmplitudeStats(volumeLevels);
  const pitchStats = calculatePitchStats(pitchValues);
  const impulseCount = countSpeechImpulses(amplitudesForAnalysis, durationSeconds);
  const readingSegments = detectReadingSegments(
    volumeLevels.length ? volumeLevels : amplitudesForAnalysis,
    durationSeconds,
    6,
    1,
  );
  const exerciseSentences =
    metadata.uebungKonfiguration?.typ === "sentences"
      ? String(metadata.uebungText || "")
          .split("|")
          .map((sentence) => sentence.trim())
          .filter(Boolean)
      : [];
  const sentenceReadingTimes = readingSegments.map((segment, index) => ({
    ...segment,
    satz: exerciseSentences[index] || "",
  }));
  const voicedPercent = pitchValues.length
    ? Math.round((spokenPitchValues.length / pitchValues.length) * 100)
    : 0;

  return {
    dauerSekunden: Number(durationSeconds.toFixed(1)),
    samples: amplitudesForAnalysis.length,
    samplesProSekunde:
      durationSeconds && amplitudesForAnalysis.length
        ? Number((amplitudesForAnalysis.length / durationSeconds).toFixed(1))
        : 0,
    lautstaerke: {
      durchschnitt: volumeStats.average || amplitudeStats.average,
      maximum: volumeStats.maximum || amplitudeStats.maximum,
      stabilitaet: Math.max(0, 100 - calculateStandardDeviation(volumeLevels.length ? volumeLevels : amplitudesForAnalysis)),
      verlauf: volumeLevels,
    },
    amplitude: {
      durchschnitt: amplitudeStats.average,
      maximum: amplitudeStats.maximum,
      stabilitaet: Math.max(0, 100 - calculateStandardDeviation(amplitudesForAnalysis)),
      uebersteuerungen: amplitudesForAnalysis.filter((value) => value >= 98).length,
    },
    frequenz: {
      durchschnittHz: pitchStats.average,
      minimumHz: pitchStats.minimum,
      maximumHz: pitchStats.maximum,
      stabilitaetHz: calculateStandardDeviation(spokenPitchValues),
      stimmanteilProzent: voicedPercent,
      frequenzAmplitudenDurchschnitt: calculateAmplitudeStats(frequencyAmplitudes).average,
      verlaufHz: pitchValues,
      amplituden: frequencyAmplitudes,
    },
    timing: {
      pausen: countPauses(volumeLevels.length ? volumeLevels : amplitudesForAnalysis, durationSeconds),
      pausenUeberEineSekunde: Math.max(0, readingSegments.length - 1),
      impulse: impulseCount,
      impulseProMinute: durationSeconds ? Math.round((impulseCount / durationSeconds) * 60) : 0,
      leseAbschnitte: readingSegments,
      satzLesezeiten: sentenceReadingTimes,
    },
    qualitaet: {
      signalVorhanden: amplitudeStats.maximum > 8 || volumeStats.maximum > 8,
      zuLeise: (volumeStats.maximum || amplitudeStats.maximum) < 18,
      uebersteuert: amplitudesForAnalysis.some((value) => value >= 98),
    },
  };
}

function renderAudioAnalysis(metadata = currentMetadata) {
  if (!audioAnalysisGrid || !audioAnalysisTitle || !audioAnalysisNote) return;

  if (!metadata) {
    audioAnalysisTitle.textContent = "Keine Aufnahme geöffnet";
    audioAnalysisGrid.innerHTML = "";
    audioAnalysisNote.textContent = "Öffne eine Aufnahme aus dem Verlauf oder erstelle eine neue Aufnahme.";
    if (statisticsPositionSlider) statisticsPositionSlider.disabled = true;
    if (statisticsPositionValue) statisticsPositionValue.textContent = "00:00";
    return;
  }

  const analysis = metadata.audioAnalyse || buildAudioAnalysis(metadata);
  const positionAnalysis = buildPositionAudioAnalysis(metadata, selectedAnalysisPosition);
  metadata.audioAnalyse = analysis;
  audioAnalysisTitle.textContent = `${metadata.uebung || "Aufnahme"} · ${formatTime(positionAnalysis.zeitSekunden)}`;
  audioAnalysisGrid.innerHTML = "";
  if (statisticsPositionSlider) {
    statisticsPositionSlider.disabled = false;
    statisticsPositionSlider.value = String(Math.round(selectedAnalysisPosition * 1000));
  }
  if (statisticsPositionValue) {
    statisticsPositionValue.textContent = formatTime(positionAnalysis.zeitSekunden);
  }

  const items = [
    ["Zeit", formatTime(positionAnalysis.zeitSekunden)],
    ["Lautstärke dort", positionAnalysis.lautstaerke],
    ["Ø Lautstärke dort", positionAnalysis.durchschnittlicheLautstaerke],
    ["Amplitude dort", positionAnalysis.amplitude],
    ["Frequenz dort", positionAnalysis.stimmfrequenzHz ? `${positionAnalysis.stimmfrequenzHz} Hz` : "0 Hz"],
    ["Ø Frequenz dort", positionAnalysis.durchschnittlicheStimmfrequenzHz ? `${positionAnalysis.durchschnittlicheStimmfrequenzHz} Hz` : "0 Hz"],
    ["Frequenzenergie", positionAnalysis.frequenzAmplitude],
    ["Impulse im Fenster", positionAnalysis.impulse],
    ["Leseabschnitte", analysis.timing.leseAbschnitte?.length || 0],
    ["Pausen > 1s", analysis.timing.pausenUeberEineSekunde || 0],
    ["Dauer gesamt", formatTime(analysis.dauerSekunden || metadata.dauerSekunden || 0)],
    ["Ø gesamt", analysis.lautstaerke.durchschnitt],
    ["Ø Frequenz gesamt", analysis.frequenz.durchschnittHz ? `${analysis.frequenz.durchschnittHz} Hz` : "0 Hz"],
    ["Stimmanteil gesamt", `${analysis.frequenz.stimmanteilProzent}%`],
  ];

  items.forEach(([label, value]) => {
    const item = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = label;
    description.textContent = String(value);
    item.append(term, description);
    audioAnalysisGrid.append(item);
  });

  audioAnalysisNote.textContent = analysis.qualitaet.zuLeise
    ? "Hinweis: Die Aufnahme wirkt sehr leise. Empfindlichkeit oder Abstand zum Mikrofon prüfen."
    : "Schieberegler bewegt die Analyseposition. Die Werte werden aus einem kurzen Fenster um diese Stelle berechnet.";
}

function buildPositionAudioAnalysis(metadata, positionPercent = 0) {
  const durationSeconds = Number(metadata.dauerSekunden || 0);
  const safePosition = Math.max(0, Math.min(1, Number(positionPercent) || 0));
  const timeSeconds = durationSeconds * safePosition;
  const amplitudesForAnalysis = (metadata.amplituden || []).map(Number).filter(Number.isFinite);
  const volumeLevels = (metadata.lautstaerkePegel || metadata.lautstaerken || []).map(Number).filter(Number.isFinite);
  const pitchValues = (metadata.stimmfrequenzenHz || []).map(Number).filter(Number.isFinite);
  const frequencyAmplitudes = (metadata.frequenzAmplituden || []).map(Number).filter(Number.isFinite);
  const windowSeconds = 0.7;
  const amplitudeWindow = getTimelineWindow(amplitudesForAnalysis, safePosition, durationSeconds, windowSeconds);
  const volumeWindow = getTimelineWindow(volumeLevels, safePosition, durationSeconds, windowSeconds);
  const pitchWindow = getTimelineWindow(pitchValues, safePosition, durationSeconds, windowSeconds);
  const frequencyIndexValue = getTimelineValue(frequencyAmplitudes, safePosition);
  const spokenPitchWindow = pitchWindow.filter((value) => value > 0);
  const amplitudeIndexValue = getTimelineValue(amplitudesForAnalysis, safePosition);
  const volumeIndexValue = getTimelineValue(volumeLevels, safePosition);
  const pitchIndexValue = getTimelineValue(pitchValues, safePosition);

  return {
    zeitSekunden: Number(timeSeconds.toFixed(2)),
    lautstaerke: Math.round(volumeIndexValue || amplitudeIndexValue || 0),
    durchschnittlicheLautstaerke: calculateAmplitudeStats(volumeWindow.length ? volumeWindow : amplitudeWindow).average,
    amplitude: Math.round(amplitudeIndexValue || 0),
    stimmfrequenzHz: Math.round(pitchIndexValue || 0),
    durchschnittlicheStimmfrequenzHz: calculatePitchStats(spokenPitchWindow).average,
    frequenzAmplitude: Math.round(frequencyIndexValue || 0),
    impulse: countSpeechImpulses(amplitudeWindow, windowSeconds),
  };
}

function getTimelineValue(values, positionPercent) {
  if (!values.length) return 0;
  const index = Math.max(0, Math.min(values.length - 1, Math.round(positionPercent * (values.length - 1))));
  return values[index] || 0;
}

function getTimelineWindow(values, positionPercent, durationSeconds, windowSeconds) {
  if (!values.length) return [];
  const centerIndex = Math.max(0, Math.min(values.length - 1, Math.round(positionPercent * (values.length - 1))));
  const samplesPerSecond = durationSeconds > 0 ? values.length / durationSeconds : values.length;
  const radius = Math.max(1, Math.round((samplesPerSecond * windowSeconds) / 2));
  return values.slice(Math.max(0, centerIndex - radius), Math.min(values.length, centerIndex + radius + 1));
}

function scaleAmplitude(rawValue) {
  const sensitivityFactor = getSensitivityFactor();
  const scaledValue = Math.max(0, rawValue * sensitivityFactor);
  const softLimitedValue = 100 * (1 - Math.exp(-scaledValue / 72));
  return Math.min(100, Math.round(softLimitedValue));
}

function scaleVolumeLevel(rawValue) {
  const sensitivityFactor = getSensitivityFactor();
  const scaledValue = Math.max(0, rawValue * sensitivityFactor);
  if (scaledValue <= 0.05) return 0;

  const softLimitedValue = 100 * (1 - Math.exp(-scaledValue / VOLUME_SOFT_LIMIT));
  return Math.min(96, Math.round(softLimitedValue));
}

function estimateVoicePitchHz(frequencySamples, binHz, confidenceSignal) {
  if (confidenceSignal < 3) return 0;

  const startBin = Math.max(1, Math.floor(PITCH_LOW_HZ / binHz));
  const endBin = Math.min(frequencySamples.length - 1, Math.ceil(PITCH_HIGH_HZ / binHz));
  let strongestBin = 0;
  let strongestValue = 0;

  for (let index = startBin; index <= endBin; index += 1) {
    const previous = frequencySamples[index - 1] || 0;
    const current = frequencySamples[index] || 0;
    const next = frequencySamples[index + 1] || 0;
    const smoothed = previous * 0.25 + current * 0.5 + next * 0.25;

    if (smoothed > strongestValue) {
      strongestValue = smoothed;
      strongestBin = index;
    }
  }

  if (!strongestBin || strongestValue < 8) return 0;
  return Math.round(strongestBin * binHz);
}

function updateVoiceFrequencyDisplay(pitchHz, confidence) {
  const visiblePitch = confidence > 2 ? pitchHz : 0;
  frequencyValue.textContent = visiblePitch ? `${visiblePitch} Hz` : "0 Hz";
  voiceFrequencyText.textContent = visiblePitch ? `${visiblePitch} Hz` : "0 Hz";

  const percent = visiblePitch
    ? ((Math.max(PITCH_LOW_HZ, Math.min(PITCH_HIGH_HZ, visiblePitch)) - PITCH_LOW_HZ) /
        (PITCH_HIGH_HZ - PITCH_LOW_HZ)) *
      100
    : 0;
  if (window.matchMedia("(orientation: landscape)").matches) {
    voiceFrequencyMarker.style.left = "50%";
    voiceFrequencyMarker.style.bottom = `${percent}%`;
  } else {
    voiceFrequencyMarker.style.left = `${percent}%`;
    voiceFrequencyMarker.style.bottom = "";
  }
  voiceFrequencyOverlay.classList.toggle("has-signal", Boolean(visiblePitch));
}

function rescaleCurrentAmplitudes() {
  if (rawAmplitudes.length) {
    amplitudes = rawAmplitudes.map(scaleAmplitude);
    volumeValues = rawVolumeValues.length
      ? rawVolumeValues.map(scaleVolumeLevel)
      : volumeValues.map((value) => Math.min(96, Math.round(value)));
    frequencyValues = frequencyValues.map((value) => Math.min(100, Math.round(value)));
    volumeValue.textContent = String(volumeValues.at(-1) || 0);
    updateVoiceFrequencyDisplay(pitchHzValues.at(-1) || 0, frequencyValues.at(-1) || 0);
    drawWaveform(liveWaveform, amplitudes.slice(-MAX_VISIBLE_SAMPLES), {
      mode: "live",
      align: "right",
      overlay: true,
      levelMeter: true,
      currentLevel: volumeValues.at(-1) || 0,
      levelValues: volumeValues.slice(-MAX_VISIBLE_SAMPLES),
    });
    drawFrequencyTimeline(
      frequencyTimeline,
      pitchHzValues.slice(-MAX_VISIBLE_SAMPLES),
      frequencyValues.slice(-MAX_VISIBLE_SAMPLES),
    );
  }

  if (currentMetadata?.rawAmplituden?.length) {
    currentMetadata.amplituden = currentMetadata.rawAmplituden.map(scaleAmplitude);
  } else if (currentMetadata?.amplituden?.length) {
    const originalSensitivity = currentMetadata.empfindlichkeit || 50;
    const factor = Number(sensitivitySlider.value) / originalSensitivity;
    currentMetadata.amplituden = currentMetadata.amplituden.map((value) =>
      Math.min(100, Math.round(value * factor)),
    );
    currentMetadata.empfindlichkeit = Number(sensitivitySlider.value);
  }

  if (currentMetadata?.amplituden?.length) {
    updateResultStats(currentMetadata);
    drawWaveform(playbackWaveform, currentMetadata.amplituden, {
      mode: "playback",
      progress: recordingPlayer.duration ? recordingPlayer.currentTime / recordingPlayer.duration : 0,
      compress: 0.55,
      dim: true,
      levelValues: currentMetadata.lautstaerkePegel || currentMetadata.lautstaerken || currentMetadata.amplituden,
    });
  }
}

function updateRecordingTime() {
  const seconds = (performance.now() - startedAt) / 1000;
  recordingTime.textContent = formatTime(seconds);
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getSupportedRecordingFormat() {
  if (!window.MediaRecorder) return null;
  return MIME_TYPES.find((format) => MediaRecorder.isTypeSupported(format.type)) || null;
}

function extensionFromMimeType(mimeType) {
  if (mimeType.includes("mp4")) return "mp4";
  return "webm";
}

function cleanMetadata(metadata) {
  const { id, videoBlob, ...json } = metadata;
  return json;
}

async function uploadCurrentRecording(metadata, videoBlob) {
  try {
    const cloudMetadata = await saveCloudRecording(metadata, videoBlob);

    if (currentMetadata?.id === metadata.id) {
      currentMetadata = cloudMetadata;
      updatePlaybackVisuals();
    }

    await saveRecording(cloudMetadata, videoBlob);
    await refreshRecordings(cloudMetadata.id);
    firebaseState.textContent = "Auch in Firebase gespeichert.";
  } catch (error) {
    firebaseState.textContent =
      "Lokal gespeichert. Firebase-Upload fehlgeschlagen, bitte Storage/Firestore-Regeln prüfen.";
  }
}

async function saveCloudRecording(metadata, videoBlob) {
  const patientSlug = slugify(metadata.patientName || "ohne-patient");
  const videoPath = `patients/${patientSlug}/videos/${metadata.id}/${metadata.aufnahme}`;
  const jsonFilename = metadata.aufnahme.replace(/\.[^.]+$/, ".json");
  const jsonPath = `patients/${patientSlug}/videos/${metadata.id}/${jsonFilename}`;
  const baseMetadata = {
    ...cleanMetadata(metadata),
    firebaseVideoPath: videoPath,
    firebaseJsonPath: jsonPath,
  };
  const videoReference = ref(storage, videoPath);
  const jsonReference = ref(storage, jsonPath);

  await uploadBytes(videoReference, videoBlob, {
    contentType: videoBlob.type || "video/webm",
  });

  const videoUrl = await getDownloadURL(videoReference);
  const jsonPayload = {
    ...baseMetadata,
    videoDownloadUrl: videoUrl,
  };
  const jsonBlob = new Blob([JSON.stringify(jsonPayload, null, 2)], {
    type: "application/json",
  });

  await uploadBytes(jsonReference, jsonBlob, {
    contentType: "application/json",
  });

  const jsonUrl = await getDownloadURL(jsonReference);
  const cloudMetadata = {
    ...metadata,
    firebaseVideoPath: videoPath,
    firebaseJsonPath: jsonPath,
    videoDownloadUrl: videoUrl,
    jsonDownloadUrl: jsonUrl,
  };

  await setDoc(doc(firestore, "recordings", metadata.id), cleanMetadata(cloudMetadata));
  return cloudMetadata;
}

async function deleteCloudRecording(metadata) {
  const deleteTasks = [];

  if (metadata.firebaseVideoPath) {
    deleteTasks.push(deleteObject(ref(storage, metadata.firebaseVideoPath)));
  }

  if (metadata.firebaseJsonPath) {
    deleteTasks.push(deleteObject(ref(storage, metadata.firebaseJsonPath)));
  }

  deleteTasks.push(deleteDoc(doc(firestore, "recordings", metadata.id)));
  await Promise.all(deleteTasks);
}

function selectPatient(name) {
  const cleanedName = name.trim() || "Ohne Name";
  patientName.value = cleanedName;
  localStorage.setItem(SELECTED_PATIENT_KEY, cleanedName);
  refreshRecordings();
  message.textContent = `Patient ausgewählt: ${cleanedName}`;
}

async function refreshRecordings(preferredId = null) {
  allRecordings = await getAllRecordings();
  renderPatientOptions(allRecordings);
  renderLibrary(preferredId);
}

function renderPatientOptions(recordings) {
  const names = new Set(recordings.map((recording) => recording.patientName).filter(Boolean));
  names.add(getCurrentPatientName());

  patientSuggestions.innerHTML = "";
  [...names].sort((a, b) => a.localeCompare(b, "de")).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    patientSuggestions.append(option);
  });
}

function renderLibrary(preferredId = null) {
  const selectedPatient = getCurrentPatientName();
  const patientRecordings = allRecordings
    .filter((recording) => (recording.patientName || "Demo Patient") === selectedPatient)
    .sort((a, b) => b.datum.localeCompare(a.datum));

  libraryTitle.textContent = selectedPatient;
  recordingCountBadge.textContent = String(patientRecordings.length);
  patientRecordingCount.textContent = String(patientRecordings.length);

  const totalDuration = patientRecordings.reduce((sum, recording) => sum + Number(recording.dauerSekunden || 0), 0);
  const totalVolume = patientRecordings.reduce(
    (sum, recording) => sum + Number(recording.durchschnittlicheLautstaerke || 0),
    0,
  );
  patientAverageDuration.textContent = patientRecordings.length
    ? formatTime(totalDuration / patientRecordings.length)
    : "00:00";
  patientAverageVolume.textContent = patientRecordings.length
    ? String(Math.round(totalVolume / patientRecordings.length))
    : "0";

  recordingsList.innerHTML = "";
  updateStatisticsRecordingSelect(patientRecordings, preferredId);
  renderAudioAnalysis(getSelectedAnalysisRecording());

  if (!patientRecordings.length) {
    const empty = document.createElement("p");
    empty.className = "message";
    empty.textContent = "Noch keine Aufnahme für diesen Patienten.";
    recordingsList.append(empty);
    return;
  }

  patientRecordings.forEach((recording) => {
    const item = document.createElement("article");
    item.className = "recording-item";

    const summary = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = recording.uebung || "Unbenannte Übung";
    const details = document.createElement("span");
    const analysis = recording.audioAnalyse || buildAudioAnalysis(recording);
    details.textContent = `${formatDateTime(recording.datum)} · ${formatTime(recording.dauerSekunden)} · Ø ${analysis.lautstaerke.durchschnitt || recording.durchschnittlicheLautstaerke || 0} · ${analysis.frequenz.durchschnittHz || 0} Hz`;
    summary.append(title, details);

    const openButton = document.createElement("button");
    openButton.type = "button";
    openButton.textContent = recording.id === preferredId ? "Offen" : "Öffnen";
    openButton.addEventListener("click", () => openStoredRecording(recording.id));

    item.append(summary, openButton);
    recordingsList.append(item);
  });
}

function updateStatisticsRecordingSelect(patientRecordings, preferredId = null) {
  if (!statisticsRecordingSelect) return;

  const availableIds = new Set(patientRecordings.map((recording) => recording.id));
  const currentPatientHasCurrentRecording =
    currentMetadata?.id && availableIds.has(currentMetadata.id);
  const nextSelectedId =
    preferredId ||
    (selectedAnalysisRecordingId && availableIds.has(selectedAnalysisRecordingId)
      ? selectedAnalysisRecordingId
      : "") ||
    (currentPatientHasCurrentRecording ? currentMetadata.id : "") ||
    patientRecordings[0]?.id ||
    "";

  selectedAnalysisRecordingId = nextSelectedId;
  statisticsRecordingSelect.innerHTML = "";

  if (!patientRecordings.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Keine Aufnahme ausgewählt";
    statisticsRecordingSelect.append(option);
    statisticsRecordingSelect.value = "";
    selectedAnalysisRecordingId = "";
    selectedAnalysisPosition = 0;
    return;
  }

  patientRecordings.forEach((recording) => {
    const option = document.createElement("option");
    option.value = recording.id;
    option.textContent = `${formatDateTime(recording.datum)} · ${recording.uebung || "Aufnahme"}`;
    statisticsRecordingSelect.append(option);
  });

  statisticsRecordingSelect.value = selectedAnalysisRecordingId;
}

function getSelectedAnalysisRecording() {
  if (selectedAnalysisRecordingId) {
    const selectedRecording = allRecordings.find((recording) => recording.id === selectedAnalysisRecordingId);
    if (selectedRecording) return selectedRecording;
  }

  return null;
}

async function openStoredRecording(id) {
  const storedRecording = await getRecording(id);
  if (!storedRecording) return;

  const { videoBlob, audioBlob, ...metadata } = storedRecording;
  const storedBlob = videoBlob || audioBlob;
  if (!storedBlob) return;

  currentMetadata = metadata;
  selectedAnalysisRecordingId = metadata.id;
  rawAmplitudes = metadata.rawAmplituden || [];
  currentVideoBlob = storedBlob;
  showResult(metadata, storedBlob);
  renderAudioAnalysis(metadata);
  message.textContent = "Aufnahme aus dem Verlauf geöffnet.";
}

function getCurrentPatientName() {
  return patientName.value.trim() || "Ohne Name";
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "ohne-name";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clearCurrentRecording() {
  setExerciseVisualsVisible(false);
  recordingPlayer.removeAttribute("src");
  recordingPlayer.load();
  playPauseButton.textContent = "Play";
  playbackSeek.value = "0";
  playbackTimeLabel.textContent = "00:00 / 00:00";
  resultPanel.classList.add("is-hidden");
  playbackEmptyState?.classList.remove("is-hidden");
  currentVideoBlob = null;
  currentMetadata = null;
  if (currentVideoUrl) URL.revokeObjectURL(currentVideoUrl);
  currentVideoUrl = null;
  drawWaveform(playbackWaveform, [], { mode: "playback" });
}

function resetLiveAnalysisUi() {
  amplitudes = [];
  rawAmplitudes = [];
  volumeValues = [];
  rawVolumeValues = [];
  frequencyValues = [];
  pitchHzValues = [];
  lastAmplitudeAt = 0;
  adaptiveNoiseFloor = 0;
  silentSignalStartedAt = 0;
  recordingTime.textContent = "00:00";
  volumeValue.textContent = "0";
  updateVoiceFrequencyDisplay(0, 0);
  drawWaveform(liveWaveform, [], {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    currentLevel: 0,
  });
  drawFrequencyTimeline(frequencyTimeline, [], []);
}

function resetRecordingUi() {
  setExerciseVisualsVisible(false);
  resultPanel.classList.add("is-hidden");
  exitRecordingFocus();
  resetLiveAnalysisUi();
  mediaChunks = [];
}

function restoreRecorderControls(statusText) {
  setExerciseVisualsVisible(false);
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  isRecording = false;
  window.clearTimeout(autoStopTimeoutId);
  window.clearTimeout(hardStopTimeoutId);
  window.clearInterval(timerId);
  window.cancelAnimationFrame(animationFrame);
  disconnectAudioAnalyser();
  exitRecordingFocus();
  recordButton.disabled = false;
  recordButton.textContent = "Übung starten";
  recordButton.classList.remove("is-recording");
  mediaRecorder = null;
  message.textContent = statusText;
}

function enterRecordingFocus() {
  document.body.classList.add("recording-focus");
  document.body.classList.remove("recording-overview");
}

function exitRecordingFocus() {
  document.body.classList.remove("recording-focus", "recording-overview");
  setVideoPreviewHidden(false);
}

function toggleRecordingView() {
  document.body.classList.toggle("recording-overview");
}

function toggleVideoPreview() {
  setVideoPreviewHidden(!isVideoPreviewHidden);
}

function setVideoPreviewHidden(hidden) {
  isVideoPreviewHidden = hidden;
  document.body.classList.toggle("video-preview-hidden", hidden);
  toggleVideoButton.textContent = hidden ? "Video ein" : "Video aus";
}

function prepareRecordViewFromNavigation() {
  if (isRecording || mediaRecorder?.state === "recording") return;

  if (isCalibrating) {
    stopCalibration();
  }

  recordingPlayer.pause();
  stopPlaybackAnimation();
  exitRecordingFocus();
  setExerciseVisualsVisible(false);
  resetLiveAnalysisUi();
  recordButton.disabled = false;
  recordButton.textContent = "Übung starten";
  recordButton.classList.remove("is-recording");

  if (hasActiveMediaStream()) {
    attachCameraPreview(mediaStream).catch(() => {
      message.textContent = "Kamera bereit. Zum Aktivieren einmal auf den Bildschirm tippen.";
    });
    setCameraReadyUi();
  } else {
    document.body.classList.add("camera-not-ready");
    document.body.classList.remove("camera-ready");
    cameraStartOverlay.classList.remove("is-hidden");
    permissionState.textContent = "Bereit";
  }
}

function setActiveView(viewName) {
  document.body.dataset.activeView = viewName;
  updateTopBarTitle(viewName);
  appMenu?.classList.add("is-hidden");

  navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.targetView === viewName);
  });

  appSections.forEach((section) => {
    const sectionViews = (section.dataset.view || "").split(/\s+/);
    section.classList.toggle("is-view-hidden", !sectionViews.includes(viewName));
  });

  if (viewName === "playback") {
    updatePlaybackVisibility();
  }

  if (viewName === "record") {
    prepareRecordViewFromNavigation();
  }

  if (viewName === "stats") {
    renderAudioAnalysis(getSelectedAnalysisRecording());
  }
}

function hasPlaybackRecording() {
  return Boolean(currentMetadata && (currentVideoBlob || currentVideoUrl || recordingPlayer.currentSrc));
}

function updatePlaybackVisibility() {
  const hasPlayback = hasPlaybackRecording();
  playbackEmptyState?.classList.toggle("is-hidden", hasPlayback);
  resultPanel.classList.toggle("is-hidden", !hasPlayback);
}

function updateTopBarTitle(viewName) {
  const titles = {
    record: "Aufnahme",
    editor: "Editor",
    playback: "Playback",
    history: "Verlauf",
    stats: "Statistik",
    settings: "Einstellungen",
  };
  if (topBarTitle) topBarTitle.textContent = titles[viewName] || "LogoSound";
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveRecording(metadata, videoBlob) {
  const database = await openDatabase();
  const transaction = database.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.put({ ...metadata, videoBlob });
  return transactionDone(transaction);
}

async function getRecording(id) {
  const database = await openDatabase();
  const transaction = database.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(id);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAllRecordings() {
  const database = await openDatabase();
  const transaction = database.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();

  return new Promise((resolve, reject) => {
    request.onsuccess = () =>
      resolve(
        request.result.map((recording) => {
          const { videoBlob, audioBlob, ...metadata } = recording;
          return {
            ...metadata,
            patientName: metadata.patientName || "Demo Patient",
          };
        }),
      );
    request.onerror = () => reject(request.error);
  });
}

async function deleteRecording(id) {
  const database = await openDatabase();
  const transaction = database.transaction(STORE_NAME, "readwrite");
  transaction.objectStore(STORE_NAME).delete(id);
  return transactionDone(transaction);
}

async function loadLatestRecording() {
  await refreshRecordings();
  const selectedPatient = getCurrentPatientName();
  const latest = allRecordings
    .filter((recording) => recording.patientName === selectedPatient)
    .sort((a, b) => b.datum.localeCompare(a.datum))[0];

  if (latest) {
    await openStoredRecording(latest.id);
    message.textContent = "Letzte Patientenaufnahme geladen.";
  }
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
