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
  getDoc,
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
const previewExerciseButton = document.querySelector("#previewExerciseButton");
const editorSavedExercises = document.querySelector("#editorSavedExercises");
const editorSavedExerciseList = document.querySelector("#editorSavedExerciseList");
const newEditorExerciseButton = document.querySelector("#newEditorExerciseButton");
const exerciseEditor = document.querySelector("#exerciseEditor");
const editorModeState = document.querySelector("#editorModeState");
const editorExerciseName = document.querySelector("#editorExerciseName");
const editorMode = document.querySelector("#editorMode");
const editorContent = document.querySelector("#editorContent");
const editorSentenceBuilder = document.querySelector("#editorSentenceBuilder");
const editorSentenceInput = document.querySelector("#editorSentenceInput");
const addEditorSentenceButton = document.querySelector("#addEditorSentenceButton");
const editorSentenceList = document.querySelector("#editorSentenceList");
const editorDialogBuilder = document.querySelector("#editorDialogBuilder");
const editorDialogList = document.querySelector("#editorDialogList");
const addEditorDialogTurnButton = document.querySelector("#addEditorDialogTurnButton");
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
const testEditorKaraokeButton = document.querySelector("#testEditorKaraokeButton");
const saveEditorExerciseButton = document.querySelector("#saveEditorExerciseButton");
const recordingTime = document.querySelector("#recordingTime");
const volumeValue = document.querySelector("#volumeValue");
const frequencyValue = document.querySelector("#frequencyValue");
const voiceFrequencyOverlay = document.querySelector("#voiceFrequencyOverlay");
const voiceFrequencyText = document.querySelector("#voiceFrequencyText");
const voiceFrequencyMarker = document.querySelector("#voiceFrequencyMarker");
const repeatCounterOverlay = document.querySelector("#repeatCounterOverlay");
const sensitivitySlider = document.querySelector("#sensitivitySlider");
const sensitivityValue = document.querySelector("#sensitivityValue");
const recordingKaraokeSpeed = document.querySelector("#recordingKaraokeSpeed");
const recordingKaraokeSpeedValue = document.querySelector("#recordingKaraokeSpeedValue");
const recordingKaraokeTimingHint = document.querySelector("#recordingKaraokeTimingHint");
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
const playbackLibrary = document.querySelector(".playback-library");
const playbackExerciseSelect = document.querySelector("#playbackExerciseSelect");
const playbackOpenExerciseButton = document.querySelector("#playbackOpenExerciseButton");
const playbackRecordingSelect = document.querySelector("#playbackRecordingSelect");
const playbackOpenRecordingButton = document.querySelector("#playbackOpenRecordingButton");
const playbackSavedRecordingsList = document.querySelector("#playbackSavedRecordingsList");
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
const statisticsWaveform = document.querySelector("#statisticsWaveform");
const statisticsWaveformResizeHandle = document.querySelector("#statisticsWaveformResizeHandle");
const statisticsVolumeTimeline = document.querySelector("#statisticsVolumeTimeline");
const statisticsFrequencyTimeline = document.querySelector("#statisticsFrequencyTimeline");
const statisticsAmplitudeGain = document.querySelector("#statisticsAmplitudeGain");
const statisticsAmplitudeGainValue = document.querySelector("#statisticsAmplitudeGainValue");
const statisticsVolumeGain = document.querySelector("#statisticsVolumeGain");
const statisticsVolumeGainValue = document.querySelector("#statisticsVolumeGainValue");
const statisticsFrequencyGain = document.querySelector("#statisticsFrequencyGain");
const statisticsFrequencyGainValue = document.querySelector("#statisticsFrequencyGainValue");
const statisticsRangeControl = document.querySelector("#statisticsRangeControl");
const statisticsStartSlider = document.querySelector("#statisticsStartSlider");
const statisticsStartValue = document.querySelector("#statisticsStartValue");
const statisticsEndSlider = document.querySelector("#statisticsEndSlider");
const statisticsEndValue = document.querySelector("#statisticsEndValue");
const statisticsRangeValue = document.querySelector("#statisticsRangeValue");
const statisticsPlayRangeButton = document.querySelector("#statisticsPlayRangeButton");
const statisticsZoomRangeButton = document.querySelector("#statisticsZoomRangeButton");
const analysisCalibrationPanel = document.querySelector(".analysis-calibration-panel");
const analysisPlayRow = document.querySelector(".analysis-play-row");
const analysisMiniGrid = document.querySelector(".analysis-mini-grid");
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
const settingsVoiceDemoText = document.querySelector("#settingsVoiceDemoText");
const settingsTestVoiceButton = document.querySelector("#settingsTestVoiceButton");
const settingsVoicePreview = document.querySelector("#settingsVoicePreview");
const settingsVoiceIdHint = document.querySelector("#settingsVoiceIdHint");
const settingsChatGptEnabled = document.querySelector("#settingsChatGptEnabled");
const settingsChatGptApiKey = document.querySelector("#settingsChatGptApiKey");
const settingsChatGptModel = document.querySelector("#settingsChatGptModel");
const settingsChatGptPrompt = document.querySelector("#settingsChatGptPrompt");
const settingsSensitivity = document.querySelector("#settingsSensitivity");
const settingsSensitivityValue = document.querySelector("#settingsSensitivityValue");
const settingsCalibrationButton = document.querySelector("#settingsCalibrationButton");
const settingsPlaybackVolume = document.querySelector("#settingsPlaybackVolume");
const settingsPlaybackVolumeValue = document.querySelector("#settingsPlaybackVolumeValue");
const playbackGainPresetButtons = document.querySelectorAll("[data-playback-gain]");
const settingsState = document.querySelector("#settingsState");
const settingsVoiceSelect = document.querySelector("#settingsVoiceSelect");
const settingsVoiceName = document.querySelector("#settingsVoiceName");
const settingsVoiceGender = document.querySelector("#settingsVoiceGender");
const settingsNewVoiceButton = document.querySelector("#settingsNewVoiceButton");
const settingsSaveVoiceButton = document.querySelector("#settingsSaveVoiceButton");
const settingsDeleteVoiceButton = document.querySelector("#settingsDeleteVoiceButton");
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
const RECORDING_KARAOKE_SPEED_KEY = "logosound-recording-karaoke-speed";
const RECORDING_KARAOKE_SPEEDS_KEY = "logosound-recording-karaoke-speeds-by-exercise";
const PLAYBACK_GAIN_KEY = "logosound-playback-gain";
const STATISTICS_WAVEFORM_HEIGHT_KEY = "logosound-statistics-waveform-height";
const ANALYSIS_CALIBRATION_KEY = "logosound-analysis-calibration";
const ELEVENLABS_SETTINGS_KEY = "logosound-elevenlabs-settings";
const ELEVENLABS_SETTINGS_DOC = "elevenLabsVoices";
const CHATGPT_SETTINGS_KEY = "logosound-chatgpt-settings";
const EDITOR_DRAFT_KEY = "logosound-editor-draft";
const SAVED_EDITOR_EXERCISE_KEY = "logosound-saved-editor-exercise";
const SAVED_EDITOR_EXERCISES_KEY = "logosound-saved-editor-exercises";
const MAX_VISIBLE_SAMPLES = 240;
const AMPLITUDE_SAMPLE_INTERVAL = 40;
const NOISE_FLOOR = 0.35;
const RMS_SENSITIVITY = 30;
const PEAK_SENSITIVITY = 2.2;
const VOLUME_NOISE_GATE = 1.8;
const VOLUME_NOISE_GATE_MULTIPLIER = 1.65;
const VOLUME_NOISE_FOLLOW_SPEED = 0.08;
const VOLUME_SOFT_LIMIT = 86;
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
const KARAOKE_MIN_WORD_SECONDS = 0.12;
const KARAOKE_MAX_WORD_SECONDS = 2.15;
const KARAOKE_REFERENCE_WORD_LENGTH = 6;
const SENTENCE_END_PAUSE_SECONDS = 0.75;
const KARAOKE_CONTEXT_BEFORE = 2;
const KARAOKE_CONTEXT_AFTER = 2;
const RECORDING_TAIL_SECONDS = 1.2;
const SENTENCE_FINAL_TAIL_SECONDS = 0.35;
const END_ANALYSIS_SILENCE_SECONDS = 0.45;
const SENTENCE_SILENCE_MS = 1000;
const SENTENCE_MAX_ACTIVE_MS = 12000;
const SENTENCE_SPEECH_THRESHOLD = 8;
const SENTENCE_SILENCE_THRESHOLD = 4;
const SENTENCE_MAX_SECONDS = 75;
const PRODUCTION_ORIGIN = "https://logosound-19293.web.app";
const API_ORIGIN = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? PRODUCTION_ORIGIN
  : "";
const EDITOR_SPEEDS = {
  1: { label: "Sehr langsam", wordSeconds: 1.35, pauseSeconds: 0.7 },
  2: { label: "Langsam", wordSeconds: 1.18, pauseSeconds: 0.56 },
  3: { label: "Normal", wordSeconds: 0.98, pauseSeconds: 0.42 },
  4: { label: "Schnell", wordSeconds: 0.78, pauseSeconds: 0.3 },
  5: { label: "Sehr schnell", wordSeconds: 0.62, pauseSeconds: 0.22 },
  6: { label: "Extra schnell", wordSeconds: 0.48, pauseSeconds: 0.16 },
  7: { label: "Maximal", wordSeconds: 0.36, pauseSeconds: 0.1 },
  8: { label: "Turbo", wordSeconds: 0.28, pauseSeconds: 0.08 },
  9: { label: "Sehr turbo", wordSeconds: 0.22, pauseSeconds: 0.06 },
  10: { label: "Sprint", wordSeconds: 0.16, pauseSeconds: 0.04 },
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
  {
    id: "langer-text",
    name: "Langer Text",
    mode: "long_text",
    content:
      "Heute lesen wir den ersten Abschnitt ruhig vor.\nDanach folgt ein zweiter Abschnitt mit klarer Stimme.\nZum Schluss bleibt der Blick entspannt und die Sprache deutlich.",
    rawContent:
      "Heute lesen wir den ersten Abschnitt ruhig vor.\nDanach folgt ein zweiter Abschnitt mit klarer Stimme.\nZum Schluss bleibt der Blick entspannt und die Sprache deutlich.",
    textPassages: [
      "Heute lesen wir den ersten Abschnitt ruhig vor.",
      "Danach folgt ein zweiter Abschnitt mit klarer Stimme.",
      "Zum Schluss bleibt der Blick entspannt und die Sprache deutlich.",
    ],
    repeats: 1,
    speed: 3,
    voiceInstruction: "Bitte lesen Sie jeden eingeblendeten Textabschnitt ruhig und deutlich vor.",
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
let instructionAudioContext;
let instructionAudioSource;
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
let recordingAudioDestination;
let recordingAudioMicGain;
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
let selectedAnalysisStart = 0;
let selectedAnalysisEnd = 1;
let statisticsRangeStopTime = null;
let statisticsRangeZoomed = false;
let lastStatisticsPlaybackSyncAt = 0;
let statisticsResizeState = null;
let lastAmplitudeAt = 0;
let isRecording = false;
let isCalibrating = false;
let allRecordings = [];
let saveTimeoutId;
let adaptiveNoiseFloor = 0;
let lastSilentSignalNoticeAt = 0;
let silentSignalStartedAt = 0;
let analyserRestartInProgress = false;
let adaptiveVolumeNoiseFloor = 0;
let processorRms = 0;
let processorPeak = 0;
let lastProcessorSignalAt = 0;
let karaokeWords = [];
let karaokeTimeline = [];
let editorPreviewTimeline = [];
let editorPreviewTimerId = 0;
let isTestingEditorKaraoke = false;
let isPreviewingExercise = false;
let previewAudioElement = null;
let previewAnimationFrameId = 0;
let previewAudioUrls = [];
let previewPlaybackOffsetSeconds = 0;
let playbackKaraokeTimeline = [];
let activeKaraokeIndex = 0;
let sentenceSilenceStartedAt = 0;
let sentenceHasSpeechSinceAdvance = false;
let sentenceStopScheduled = false;
let sentencePeakVolumeSinceAdvance = 0;
let sentenceActiveStartedAt = 0;
let dialogVoiceInProgress = false;
let dialogVoiceTurnIndex = -1;
let dialogAdvanceLock = false;
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
let editorVoiceAudioVoiceId = "";
let editorVoiceAudioVoiceSettings = null;
let editorVoiceAudioTextHash = "";
let editorVoiceAudioUpdatedAt = "";
let editorSaveFeedbackTimerId = 0;
let settingsVoiceTestUrl = "";
let isVideoPreviewHidden = false;
let instructionPlaybackActive = false;

document.body.classList.add("camera-not-ready");
recordButton.disabled = true;
patientName.value = localStorage.getItem(SELECTED_PATIENT_KEY) || patientName.value;
sensitivitySlider.value = clampSensitivity(localStorage.getItem(SENSITIVITY_KEY) || sensitivitySlider.value);
sensitivityValue.textContent = formatSensitivityLabel(sensitivitySlider.value);
loadRecordingKaraokeSpeedForCurrentExercise();
playbackVolumeSlider.value = localStorage.getItem(PLAYBACK_GAIN_KEY) || playbackVolumeSlider.value;
playbackVolumeValue.textContent = `${playbackVolumeSlider.value}%`;
applySavedStatisticsWaveformHeight();
loadAnalysisCalibrationControls();
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

function getApiUrl(path) {
  return `${API_ORIGIN}${path}`;
}

function resolveAppUrl(url) {
  if (!url) return "";
  if (/^(blob:|data:|https?:)/i.test(url)) return url;
  return `${API_ORIGIN || window.location.origin}${url.startsWith("/") ? url : `/${url}`}`;
}

function getStoredVoiceDownloadUrl(path) {
  const cleanPath = String(path || "").trim();
  if (!cleanPath) return "";
  return `/api/voice?path=${encodeURIComponent(cleanPath)}`;
}

function getGlobalVoiceAudioUrl(url = "", path = "") {
  const storedPath = String(path || "").trim();
  if (storedPath) return getStoredVoiceDownloadUrl(storedPath);

  const audioUrl = String(url || "").trim();
  if (!audioUrl) return "";
  if (/^(blob:|data:)/i.test(audioUrl)) return audioUrl;

  try {
    const parsedUrl = new URL(audioUrl, window.location.origin);
    if (parsedUrl.pathname === "/api/voice") {
      const voicePath = parsedUrl.searchParams.get("path") || "";
      return voicePath ? getStoredVoiceDownloadUrl(voicePath) : audioUrl;
    }
  } catch (error) {}

  return audioUrl;
}

function positionAnalysisCalibrationPanel() {
  if (statisticsRangeControl && analysisMiniGrid) {
    analysisMiniGrid.before(statisticsRangeControl);
  }

  if (analysisPlayRow && statisticsRangeControl) {
    statisticsRangeControl.after(analysisPlayRow);
  }

  if (analysisMiniGrid && analysisPlayRow) {
    analysisPlayRow.after(analysisMiniGrid);
  }

  if (analysisCalibrationPanel && analysisMiniGrid) {
    analysisMiniGrid.after(analysisCalibrationPanel);
  }
}

function positionPlaybackLibrary() {
  if (!playbackLibrary || !resultPanel) return;
  resultPanel.after(playbackLibrary);
  playbackLibrary.querySelector('label[for="playbackExerciseSelect"]')?.remove();
  playbackExerciseSelect?.closest(".playback-library-row")?.remove();
}

async function init() {
  positionAnalysisCalibrationPanel();
  positionPlaybackLibrary();
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
  loadCloudElevenLabsSettings();
  await refreshRecordings();
}
recordButton.addEventListener("click", async () => {
  if (isRecording || mediaRecorder?.state === "recording") {
    stopRecording();
  } else {
    stopExercisePreview();
    unlockInstructionAudio();
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

previewExerciseButton?.addEventListener("click", async () => {
  if (isPreviewingExercise) {
    stopExercisePreview();
    return;
  }

  await startExercisePreview();
});

savePatientButton.addEventListener("click", () => {
  selectPatient(patientName.value);
});

patientName.addEventListener("change", () => {
  selectPatient(patientName.value);
});

exerciseName.addEventListener("change", () => {
  stopExercisePreview();
  loadRecordingKaraokeSpeedForCurrentExercise();
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

addEditorDialogTurnButton?.addEventListener("click", () => {
  addEditorDialogTurn();
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
  resetEditorForm({ blank: true });
  saveEditorDraft();
});

suggestVoiceButton.addEventListener("click", async () => {
  await suggestVoiceInstruction();
});

generateVoiceAudioButton.addEventListener("click", async () => {
  await generateVoiceAudio();
});

settingsTestVoiceButton?.addEventListener("click", async () => {
  await testElevenLabsSettingsVoice();
});

settingsVoiceSelect?.addEventListener("change", () => {
  activateSelectedVoiceProfileFromDropdown();
});

settingsNewVoiceButton?.addEventListener("click", () => {
  startNewVoiceProfile();
});

settingsSaveVoiceButton?.addEventListener("click", () => {
  saveCurrentVoiceProfileFromControls();
});

settingsDeleteVoiceButton?.addEventListener("click", () => {
  deleteSelectedVoiceProfile();
});

testEditorKaraokeButton?.addEventListener("click", () => {
  if (isTestingEditorKaraoke) {
    stopEditorKaraokeTest();
    editorVoiceState.textContent = "Karaoke-Test gestoppt.";
    return;
  }

  startEditorKaraokeTest();
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

recordingKaraokeSpeed?.addEventListener("input", () => {
  updateRecordingKaraokeSpeed(recordingKaraokeSpeed.value);
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

playbackGainPresetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updatePlaybackVolumeSetting(button.dataset.playbackGain);
  });
});

[
  settingsVoiceStability,
  settingsVoiceSimilarity,
  settingsVoiceStyle,
  settingsSpeakerBoost,
  settingsChatGptEnabled,
  settingsChatGptApiKey,
  settingsChatGptModel,
  settingsChatGptPrompt,
].forEach((input) => {
  input?.addEventListener("input", () => {
    saveAllAiSettings();
    renderSettingsControls();
  });
  input?.addEventListener("change", () => {
    saveAllAiSettings();
    renderSettingsControls();
  });
});

statisticsRecordingSelect?.addEventListener("change", () => {
  selectedAnalysisRecordingId = statisticsRecordingSelect.value;
  selectedAnalysisPosition = 0;
  selectedAnalysisStart = 0;
  selectedAnalysisEnd = 1;
  statisticsRangeZoomed = false;
  if (statisticsPositionSlider) statisticsPositionSlider.value = "0";
  if (statisticsStartSlider) statisticsStartSlider.value = "0";
  if (statisticsEndSlider) statisticsEndSlider.value = "1000";
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

statisticsPositionSlider?.addEventListener("input", () => {
  selectedAnalysisPosition = getAnalysisPositionFromSlider(statisticsPositionSlider.value);
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

statisticsStartSlider?.addEventListener("input", () => {
  selectedAnalysisStart = Number(statisticsStartSlider.value) / 1000;
  if (selectedAnalysisStart > selectedAnalysisEnd) {
    selectedAnalysisEnd = selectedAnalysisStart;
    statisticsEndSlider.value = statisticsStartSlider.value;
  }
  clampSelectedAnalysisPositionToZoomRange();
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

statisticsEndSlider?.addEventListener("input", () => {
  selectedAnalysisEnd = Number(statisticsEndSlider.value) / 1000;
  if (selectedAnalysisEnd < selectedAnalysisStart) {
    selectedAnalysisStart = selectedAnalysisEnd;
    statisticsStartSlider.value = statisticsEndSlider.value;
  }
  clampSelectedAnalysisPositionToZoomRange();
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

statisticsPlayRangeButton?.addEventListener("click", () => {
  toggleSelectedAnalysisRangePlayback();
});

statisticsZoomRangeButton?.addEventListener("click", () => {
  statisticsRangeZoomed = !statisticsRangeZoomed;
  clampSelectedAnalysisPositionToZoomRange();
  syncAnalysisPositionSlider();
  renderAudioAnalysis(getSelectedAnalysisRecording());
});

statisticsWaveformResizeHandle?.addEventListener("pointerdown", startStatisticsWaveformResize);

[statisticsAmplitudeGain, statisticsVolumeGain, statisticsFrequencyGain].forEach((slider) => {
  slider?.addEventListener("input", () => {
    saveAnalysisCalibrationFromControls();
    renderAudioAnalysis(getSelectedAnalysisRecording());
  });
});

playbackOpenExerciseButton?.addEventListener("click", () => {
  openPlaybackExerciseSelection();
});

playbackExerciseSelect?.addEventListener("change", () => {
  openPlaybackExerciseSelection();
});

playbackOpenRecordingButton?.addEventListener("click", () => {
  const selectedId = playbackRecordingSelect?.value;
  if (selectedId) openStoredRecording(selectedId);
});

playbackRecordingSelect?.addEventListener("change", () => {
  if (playbackRecordingSelect.value) openStoredRecording(playbackRecordingSelect.value);
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
  stopAtStatisticsRangeEnd();
  updatePlaybackVisuals();
});

recordingPlayer.addEventListener("ended", () => {
  if (currentMetadata) {
    stopPlaybackAnimation();
    selectedAnalysisPosition = 1;
    lastStatisticsPlaybackSyncAt = 0;
    syncAnalysisPositionSlider();
    updatePlaybackVisuals(1);
    setPlayPauseButtonState("play");
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
  setPlayPauseButtonState("pause");
  startPlaybackAnimation();
});

recordingPlayer.addEventListener("pause", () => {
  setPlayPauseButtonState("play");
  statisticsRangeStopTime = null;
  setStatisticsRangeButtonState("play");
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

retakeButton?.addEventListener("click", () => {
  recordingPlayer.pause();
  resetRecordingUi();
  message.textContent = "Bereit für eine neue Aufnahme.";
});

deleteButton?.addEventListener("click", async () => {
  if (currentMetadata?.id) {
    await deleteStoredRecordingById(currentMetadata.id);
    return;
  }
  clearCurrentRecording();
  message.textContent = "Aufnahme gelöscht.";
});

downloadAudioButton?.addEventListener("click", () => {
  if (currentVideoBlob && currentMetadata) {
    downloadBlob(currentVideoBlob, currentMetadata.aufnahme);
  }
});

downloadJsonButton?.addEventListener("click", () => {
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
    await speakExerciseInstruction();
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
    stopInstructionAudio();
    recordButton.disabled = false;
    await startRecording();
  } catch (error) {
    instructionPlaybackActive = false;
    stopInstructionAudio();
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
  const instruction =
    getExerciseInstruction() ||
    EXERCISE_INSTRUCTIONS[exerciseName.value] ||
    `Bitte lesen Sie die eingeblendeten Wörter deutlich und ruhig vor.`;

  const editorAudio = await getCurrentInstructionAudio(activeExercise, instruction);

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

async function getCurrentInstructionAudio(exercise, instruction) {
  const savedAudio = exercise?.voiceAudioUrl || exercise?.voiceAudioDataUrl || "";
  if (savedAudio && isInstructionVoiceAudioCurrent(exercise, instruction)) return savedAudio;
  if (isStandardEditorExerciseName(exercise?.name)) return "";
  if (!exercise?.name) return "";

  const storedAudio = await createStoredVoiceAudio(instruction, `${exercise.name} Intro`).catch(() => null);
  if (!storedAudio?.url) return "";

  const updatedExercise = hydrateEditorExercise({
    ...exercise,
    voiceInstruction: instruction,
    voiceAudioUrl: storedAudio.url,
    voiceAudioPath: storedAudio.path,
    voiceAudioDataUrl: "",
    voiceAudioVoiceId: storedAudio.voiceId,
    voiceAudioVoiceSettings: storedAudio.voiceSettings,
    voiceAudioTextHash: storedAudio.textHash,
    voiceAudioSpeed: storedAudio.speed,
    voiceAudioUpdatedAt: new Date().toISOString(),
  });

  await saveEditorExerciseObject(updatedExercise);
  return storedAudio.url;
}

function isStandardEditorExerciseName(name) {
  const normalizedName = normalizeEditorExerciseName(name);
  return STANDARD_EDITOR_EXERCISES.some(
    (exercise) => normalizeEditorExerciseName(exercise.name) === normalizedName,
  );
}

function isInstructionVoiceAudioCurrent(exercise, instruction) {
  if (!exercise?.voiceAudioUrl && !exercise?.voiceAudioDataUrl) return false;
  if (!exercise.voiceAudioVoiceId || !exercise.voiceAudioTextHash) return false;
  const requestSettings = getElevenLabsRequestSettings();
  return (
    exercise.voiceAudioVoiceId === requestSettings.voiceId &&
    JSON.stringify(exercise.voiceAudioVoiceSettings || {}) === JSON.stringify(requestSettings.voiceSettings || {}) &&
    exercise.voiceAudioTextHash === hashText(instruction)
  );
}

async function createTemporaryVoiceAudio(text) {
  try {
    const response = await fetch(getApiUrl("/api/voice"), {
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

async function createStoredVoiceAudio(text, exerciseLabel) {
  const requestSettings = getElevenLabsRequestSettings();
  const response = await fetch(getApiUrl("/api/voice"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      store: true,
      exerciseName: exerciseLabel || getExerciseLabel(),
      ...requestSettings,
    }),
  });

  const contentType = response.headers.get("content-type") || "";
  if (!response.ok || !contentType.includes("application/json")) {
    const details = await response.text().catch(() => "");
    throw new Error(`Vorführung-Audio Fehler ${response.status}: ${details.slice(0, 80) || contentType || "keine Antwort"}`);
  }

  const payload = await response.json();
  if (!payload.downloadUrl) throw new Error("Vorführung-Audio ohne URL.");
  return {
    url: getGlobalVoiceAudioUrl(payload.downloadUrl, payload.path),
    path: payload.path || "",
    voiceId: requestSettings.voiceId,
    voiceSettings: requestSettings.voiceSettings,
    textHash: hashText(text),
    speed: clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3),
  };
}

async function startExercisePreview() {
  if (isRecording || mediaRecorder?.state === "recording") return;

  unlockInstructionAudio();
  setupKaraokeText();
  const previewText = getExercisePreviewText();
  if (!previewText) {
    message.textContent = "Keine Vorführung möglich: Übung hat keinen Text.";
    return;
  }

  isPreviewingExercise = true;
  previewExerciseButton.disabled = true;
  previewExerciseButton.textContent = "Vorführung lädt";
  recordButton.disabled = true;

  try {
    const audioUrls = await getExercisePreviewAudioSegments(previewText);
    await playExercisePreviewAudio(audioUrls);
  } catch (error) {
    message.textContent = error?.message || "Vorführung konnte nicht gestartet werden.";
    stopExercisePreview();
  } finally {
    if (isPreviewingExercise && previewExerciseButton) {
      previewExerciseButton.disabled = false;
      previewExerciseButton.textContent = "Vorführung stoppen";
    }
  }
}

function getExercisePreviewText() {
  const exercise = getActiveRecordingExercise();
  if (exercise?.mode === "dialog") {
    return getExerciseDialogTurns(exercise)
      .filter((turn) => turn.role !== "patient")
      .map((turn) => turn.text)
      .join(". ");
  }
  if (exercise?.mode === "sentences") return getExerciseSentences(exercise).join(". ");
  return String(exercise?.script || getExerciseScript() || "").replace(/\s*\|\s*/g, ". ").trim();
}

async function getExercisePreviewAudio(text) {
  const activeExercise = getActiveRecordingExercise();
  if (isStoredDemoAudioCurrent(activeExercise, text)) {
    return getGlobalVoiceAudioUrl(activeExercise.demoAudioUrl, activeExercise.demoAudioPath);
  }

  const storedAudio = await createStoredVoiceAudio(text, `${getExerciseLabel()} Vorführung`);
  if (activeExercise?.name) {
    await saveDemoAudioForActiveExercise(storedAudio);
  }
  return storedAudio.url;
}

async function getExercisePreviewAudioSegments(text) {
  const activeExercise = getActiveRecordingExercise();
  if (activeExercise?.mode === "dialog") {
    return getDialogPreviewAudioSegments(activeExercise);
  }

  const chunks = splitVoicePreviewText(text);

  if (isStoredDemoAudioCurrent(activeExercise, text) && chunks.length <= 1) {
    return [getGlobalVoiceAudioUrl(activeExercise.demoAudioUrl, activeExercise.demoAudioPath)];
  }
  if (chunks.length <= 1) return [await getExercisePreviewAudio(text)];

  if (isStoredDemoAudioSegmentsCurrent(activeExercise, text, chunks)) {
    return activeExercise.demoAudioSegments.map((segment) =>
      getGlobalVoiceAudioUrl(segment.url, segment.path),
    );
  }

  const urls = [];
  const segments = [];
  for (let index = 0; index < chunks.length; index += 1) {
    if (!isPreviewingExercise) break;
    previewExerciseButton.textContent = `Vorführung lädt ${index + 1}/${chunks.length}`;
    const storedAudio = await createStoredVoiceAudio(chunks[index], `${getExerciseLabel()} Vorführung ${index + 1}`);
    if (!storedAudio?.url) throw new Error(`Vorführung-Teil ${index + 1} konnte nicht erzeugt werden.`);
    segments.push({
      index,
      url: storedAudio.url,
      path: storedAudio.path,
      voiceId: storedAudio.voiceId,
      voiceSettings: storedAudio.voiceSettings,
      textHash: storedAudio.textHash,
      speed: storedAudio.speed,
      updatedAt: new Date().toISOString(),
    });
    urls.push(storedAudio.url);
  }
  if (activeExercise?.name && segments.length === chunks.length) {
    await saveDemoAudioSegmentsForActiveExercise(segments).catch(() => {});
  }
  return urls;
}

async function getDialogPreviewAudioSegments(exercise) {
  const turns = getExerciseDialogTurns(exercise);
  const systemTurns = turns.filter((turn) => turn.role !== "patient" && turn.text);
  if (!systemTurns.length) return [];

  const updatedTurns = [];
  const urls = [];
  let systemIndex = 0;
  let hasUpdates = false;

  for (const turn of turns) {
    if (turn.role === "patient" || !turn.text) {
      updatedTurns.push(normalizeDialogTurn(turn));
      continue;
    }

    systemIndex += 1;
    if (isDialogTurnAudioCurrent(turn)) {
      updatedTurns.push(turn);
      urls.push(getGlobalVoiceAudioUrl(turn.audioUrl, turn.audioPath));
      continue;
    }

    previewExerciseButton.textContent = `Dialog-Audio lädt ${systemIndex}/${systemTurns.length}`;
    const storedAudio = await createStoredVoiceAudio(turn.text, `${exercise.name} Dialog ${systemIndex}`);
    const updatedTurn = {
      ...normalizeDialogTurn(turn),
      audioUrl: storedAudio.url,
      audioPath: storedAudio.path,
      audioVoiceId: storedAudio.voiceId,
      audioVoiceSettings: storedAudio.voiceSettings,
      audioTextHash: storedAudio.textHash,
      audioSpeed: storedAudio.speed,
      audioUpdatedAt: new Date().toISOString(),
    };
    updatedTurns.push(updatedTurn);
    urls.push(updatedTurn.audioUrl);
    hasUpdates = true;
  }

  if (hasUpdates) {
    const updatedExercise = hydrateEditorExercise({
      ...exercise,
      dialogTurns: updatedTurns,
      content: serializeDialogTurns(updatedTurns),
      script: serializeDialogTurns(updatedTurns),
      dialogAudioUpdatedAt: new Date().toISOString(),
    });
    await saveEditorExerciseObject(updatedExercise);
  }

  return urls;
}

function isStoredDemoAudioCurrent(exercise, text) {
  if (!exercise?.demoAudioUrl && !exercise?.demoAudioPath) return false;
  const requestSettings = getElevenLabsRequestSettings();
  return (
    exercise.demoVoiceId === requestSettings.voiceId &&
    exercise.demoTextHash === hashText(text) &&
    Number(exercise.demoSpeed || 0) === clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3)
  );
}

function isStoredDemoAudioSegmentsCurrent(exercise, text, chunks = splitVoicePreviewText(text)) {
  if (!exercise?.demoAudioSegments?.length) return false;
  const requestSettings = getElevenLabsRequestSettings();
  const speed = clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3);
  if (exercise.demoAudioSegments.length !== chunks.length) return false;

  return chunks.every((chunk, index) => {
    const segment = exercise.demoAudioSegments[index];
    return (
      (segment?.url || segment?.path) &&
      segment.voiceId === requestSettings.voiceId &&
      JSON.stringify(segment.voiceSettings || {}) === JSON.stringify(requestSettings.voiceSettings || {}) &&
      segment.textHash === hashText(chunk) &&
      Number(segment.speed || 0) === speed
    );
  });
}

function hashText(text) {
  const normalizedText = String(text || "").replace(/\s+/g, " ").trim();
  let hash = 0;
  for (let index = 0; index < normalizedText.length; index += 1) {
    hash = (hash * 31 + normalizedText.charCodeAt(index)) | 0;
  }
  return String(hash >>> 0);
}

function splitVoicePreviewText(text, maxLength = 840) {
  const normalizedText = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalizedText) return [];
  if (normalizedText.length <= maxLength) return [normalizedText];

  const sentences = normalizedText
    .split(/(?<=[.!?;:])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const chunks = [];
  let current = "";

  sentences.forEach((sentence) => {
    if (sentence.length > maxLength) {
      if (current) chunks.push(current);
      current = "";
      for (let index = 0; index < sentence.length; index += maxLength) {
        chunks.push(sentence.slice(index, index + maxLength).trim());
      }
      return;
    }

    const next = current ? `${current} ${sentence}` : sentence;
    if (next.length > maxLength) {
      if (current) chunks.push(current);
      current = sentence;
    } else {
      current = next;
    }
  });

  if (current) chunks.push(current);
  return chunks;
}

async function saveDemoAudioForActiveExercise(storedAudio) {
  const activeExercise = getActiveRecordingExercise();
  if (!activeExercise?.name) return;

  const updatedExercise = hydrateEditorExercise({
    ...activeExercise,
    demoAudioUrl: storedAudio.url,
    demoAudioPath: storedAudio.path,
    demoVoiceId: storedAudio.voiceId,
    demoVoiceSettings: storedAudio.voiceSettings,
    demoTextHash: storedAudio.textHash,
    demoSpeed: storedAudio.speed,
    demoCreatedAt: new Date().toISOString(),
  });
  savedEditorExercise = updatedExercise;
  savedEditorExercises = upsertEditorExercise(savedEditorExercises, updatedExercise);
  persistEditorExercises();
  renderRecordingExerciseOptions(updatedExercise.name);
  renderSavedEditorExercises();
  await saveCloudEditorExercise(updatedExercise).catch(() => {});
}

async function saveDemoAudioSegmentsForActiveExercise(segments) {
  const activeExercise = getActiveRecordingExercise();
  if (!activeExercise?.name || !Array.isArray(segments) || !segments.length) return;

  const normalizedSegments = segments.map((segment, index) => ({
    index,
    url: getGlobalVoiceAudioUrl(segment.url, segment.path),
    path: String(segment.path || ""),
    voiceId: String(segment.voiceId || ""),
    voiceSettings: segment.voiceSettings || null,
    textHash: String(segment.textHash || ""),
    speed: Number(segment.speed || 0),
    updatedAt: segment.updatedAt || new Date().toISOString(),
  }));
  const updatedExercise = hydrateEditorExercise({
    ...activeExercise,
    demoAudioSegments: normalizedSegments,
    demoSegmentsCreatedAt: new Date().toISOString(),
  });

  savedEditorExercise = updatedExercise;
  savedEditorExercises = upsertEditorExercise(savedEditorExercises, updatedExercise);
  persistEditorExercises();
  renderRecordingExerciseOptions(updatedExercise.name);
  renderSavedEditorExercises();
  await saveCloudEditorExercise(updatedExercise).catch(() => {});
}

async function playExercisePreviewAudio(audioUrls) {
  const urls = Array.isArray(audioUrls) ? audioUrls.filter(Boolean) : [audioUrls].filter(Boolean);
  if (!urls.length) throw new Error("Keine Vorführ-Audiodatei vorhanden.");

  setExerciseVisualsVisible(true);
  message.textContent = "Vorführung läuft.";
  previewAudioUrls = urls;
  previewPlaybackOffsetSeconds = 0;
  await playExercisePreviewSegment(0);
}

async function playExercisePreviewSegment(index) {
  if (!isPreviewingExercise || index >= previewAudioUrls.length) {
    stopExercisePreview();
    return;
  }

  previewAudioElement = new Audio(previewAudioUrls[index]);
  previewAudioElement.preload = "auto";
  previewAudioElement.volume = 1;
  previewAudioElement.addEventListener("ended", async () => {
    previewPlaybackOffsetSeconds += Number(previewAudioElement?.duration) || 0;
    previewAudioElement = null;
    await playExercisePreviewSegment(index + 1);
  }, { once: true });
  previewAudioElement.addEventListener("error", () => {
    message.textContent = "Vorführung-Audio konnte nicht abgespielt werden.";
    stopExercisePreview();
  }, { once: true });

  previewExerciseButton.disabled = false;
  previewExerciseButton.textContent = previewAudioUrls.length > 1
    ? `Vorführung stoppen ${index + 1}/${previewAudioUrls.length}`
    : "Vorführung stoppen";
  await previewAudioElement.play();
  animateExercisePreviewKaraoke();
}

function animateExercisePreviewKaraoke() {
  if (!isPreviewingExercise || !previewAudioElement) return;
  updateKaraokeDisplayAtTime(
    karaokeOverlay,
    karaokeTimeline,
    previewPlaybackOffsetSeconds + (previewAudioElement.currentTime || 0),
  );
  previewAnimationFrameId = window.requestAnimationFrame(animateExercisePreviewKaraoke);
}

function stopExercisePreview() {
  const wasPreviewing = isPreviewingExercise || Boolean(previewAudioElement);
  if (!wasPreviewing) return;

  isPreviewingExercise = false;
  window.cancelAnimationFrame(previewAnimationFrameId);
  previewAnimationFrameId = 0;

  if (previewAudioElement) {
    previewAudioElement.pause();
    previewAudioElement.removeAttribute("src");
    previewAudioElement.load();
    previewAudioElement = null;
  }
  previewAudioUrls.forEach((url) => {
    if (String(url).startsWith("blob:")) URL.revokeObjectURL(url);
  });
  previewAudioUrls = [];
  previewPlaybackOffsetSeconds = 0;

  setExerciseVisualsVisible(false);
  if (previewExerciseButton) {
    previewExerciseButton.disabled = false;
    previewExerciseButton.textContent = "Vorführung";
  }
  if (!isRecording) {
    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
  }
  message.textContent = "Vorführung beendet. Übung kann gestartet werden.";
}

function speakWithBrowserVoice(instruction) {
  return new Promise((resolve) => {
    const fallbackMs = Math.max(
      2500,
      Math.min(45000, String(instruction || "").length * 85 + 1200),
    );
    const fallbackId = window.setTimeout(resolve, fallbackMs);
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

async function playVoiceAudio(audioUrl) {
  const webAudioPlayed = await playVoiceAudioBuffer(audioUrl);
  if (webAudioPlayed) return true;
  return playVoiceAudioElement(audioUrl);
}

async function unlockInstructionAudio() {
  try {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return false;
    if (isRecording && audioContext && audioContext.state !== "closed") {
      instructionAudioContext = audioContext;
    }
    if (!instructionAudioContext) {
      instructionAudioContext = new AudioContextConstructor();
    }

    if (instructionAudioContext.state === "suspended") {
      await instructionAudioContext.resume();
    }

    const silentBuffer = instructionAudioContext.createBuffer(
      1,
      1,
      instructionAudioContext.sampleRate,
    );
    const source = instructionAudioContext.createBufferSource();
    const gain = instructionAudioContext.createGain();
    gain.gain.value = 0;
    source.buffer = silentBuffer;
    source.connect(gain);
    gain.connect(instructionAudioContext.destination);
    source.start(0);
    return true;
  } catch (error) {
    return false;
  }
}

async function playVoiceAudioBuffer(audioUrl) {
  try {
    await unlockInstructionAudio();
    if (!instructionAudioContext || instructionAudioContext.state === "closed") return false;
    if (instructionAudioContext.state === "suspended") {
      await instructionAudioContext.resume();
    }

    instructionAudioSource?.stop?.();
    instructionAudioSource = null;

    const response = await fetch(resolveAppUrl(audioUrl), { cache: "no-store" });
    if (!response.ok) return false;
    const audioData = await response.arrayBuffer();
    if (!audioData.byteLength) return false;
    const audioBuffer = await instructionAudioContext.decodeAudioData(audioData.slice(0));

    return await new Promise((resolve) => {
      const source = instructionAudioContext.createBufferSource();
      const gain = instructionAudioContext.createGain();
      const fallbackMs = Math.max(1800, Math.ceil((audioBuffer.duration || 0) * 1000) + 1800);
      const fallbackId = window.setTimeout(() => finish(true, { stopSource: true }), fallbackMs);
      const finish = (played, options = {}) => {
        window.clearTimeout(fallbackId);
        if (options.stopSource) {
          try {
            source.stop();
          } catch (error) {}
        }
        if (instructionAudioSource === source) instructionAudioSource = null;
        source.onended = null;
        resolve(Boolean(played));
      };

      gain.gain.value = 1;
      source.buffer = audioBuffer;
      source.connect(gain);
      gain.connect(instructionAudioContext.destination);
      if (shouldMixVoiceAudioIntoRecording() && instructionAudioContext === audioContext && recordingAudioDestination) {
        gain.connect(recordingAudioDestination);
      }
      source.onended = () => finish(true);
      instructionAudioSource = source;
      message.textContent = "Instruktion wird abgespielt.";
      source.start(0);
    });
  } catch (error) {
    return false;
  }
}

function shouldMixVoiceAudioIntoRecording() {
  return Boolean(isRecording && getActiveRecordingExercise()?.mode === "dialog");
}

function playVoiceAudioElement(audioUrl) {
  return new Promise((resolve) => {
    let started = false;
    let fallbackId = window.setTimeout(() => finish(started), INSTRUCTION_TIMEOUT_MS);
    const refreshFallback = () => {
      if (!Number.isFinite(instructionAudio.duration) || instructionAudio.duration <= 0) return;
      window.clearTimeout(fallbackId);
      fallbackId = window.setTimeout(
        () => finish(true),
        Math.max(1800, Math.ceil(instructionAudio.duration * 1000) + 1800),
      );
    };
    const cleanup = () => {
      instructionAudio.removeEventListener("playing", handleStarted);
      instructionAudio.removeEventListener("timeupdate", handleStarted);
      instructionAudio.removeEventListener("loadedmetadata", refreshFallback);
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
    instructionAudio.addEventListener("loadedmetadata", refreshFallback);
    instructionAudio.addEventListener("ended", handleEnded, { once: true });
    instructionAudio.addEventListener("error", handleError, { once: true });
    instructionAudio.addEventListener("abort", handleError, { once: true });
    instructionAudio.addEventListener("stalled", handleError, { once: true });
    instructionAudio.muted = false;
    instructionAudio.defaultMuted = false;
    instructionAudio.volume = 1;
    instructionAudio.src = resolveAppUrl(audioUrl);
    instructionAudio.load();
    instructionAudio.play().catch((error) => {
      message.textContent = `ElevenLabs konnte nicht starten: ${error?.name || "Audio blockiert"}.`;
      finish(false);
    });
  });
}

function stopInstructionAudio() {
  instructionAudio.pause();
  instructionAudio.removeAttribute("src");
  instructionAudio.load();
  try {
    instructionAudioSource?.stop?.();
  } catch (error) {}
  instructionAudioSource = null;
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
  adaptiveVolumeNoiseFloor = 0;
  lastSilentSignalNoticeAt = 0;
  silentSignalStartedAt = 0;
  analyserRestartInProgress = false;
  activeKaraokeIndex = 0;
  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentenceStopScheduled = false;
  sentencePeakVolumeSinceAdvance = 0;
  sentenceActiveStartedAt = performance.now();
  dialogVoiceInProgress = false;
  dialogVoiceTurnIndex = -1;
  dialogAdvanceLock = false;
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
  await ensurePlaybackAudioContext();
  applyPlaybackGain();
}

async function ensurePlaybackAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return;

  if (!playbackAudioContext || playbackAudioContext.state === "closed") {
    playbackAudioContext = new AudioContextConstructor();
  }

  if (!playbackSource) {
    try {
      playbackSource = playbackAudioContext.createMediaElementSource(recordingPlayer);
      playbackGain = playbackAudioContext.createGain();
      playbackSource.connect(playbackGain);
      playbackGain.connect(playbackAudioContext.destination);
    } catch (error) {
      playbackSource = null;
      playbackGain = null;
      return;
    }
  }

  if (playbackAudioContext.state === "suspended") {
    await playbackAudioContext.resume();
  }
}

function applyPlaybackGain() {
  const gainValue = Math.max(1, Math.min(4, (Number(playbackVolumeSlider.value) || 200) / 100));
  playbackVolumeValue.textContent = `${Math.round(gainValue * 100)}%`;
  if (playbackGain) playbackGain.gain.value = gainValue;
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
  adaptiveVolumeNoiseFloor = updateAdaptiveVolumeNoiseFloor(volumeSignal, adaptiveVolumeNoiseFloor);
  const dynamicVolumeGate = Math.max(
    VOLUME_NOISE_GATE,
    adaptiveVolumeNoiseFloor * VOLUME_NOISE_GATE_MULTIPLIER,
  );
  const gatedVolumeSignal = Math.max(0, volumeSignal - dynamicVolumeGate);
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
  const dialogTurns =
    activeExercise?.mode === "dialog"
      ? getExerciseDialogTurns(activeExercise)
      : [];
  const sentences =
    activeExercise?.mode === "sentences"
      ? getExerciseSentences(activeExercise)
      : [];

  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentenceStopScheduled = false;
  sentencePeakVolumeSinceAdvance = 0;
  sentenceActiveStartedAt = performance.now();
  activeKaraokeIndex = 0;

  if (dialogTurns.length) {
    karaokeWords = dialogTurns.map((turn) => turn.text);
    karaokeTimeline = buildDialogTimeline(dialogTurns);
  } else if (sentences.length) {
    karaokeWords = sentences;
    karaokeTimeline = buildSentenceTimeline(sentences);
  } else if (isLongTextMode(activeExercise?.mode)) {
    const passages = getExerciseTextPassages(activeExercise);
    karaokeWords = passages.length ? passages : getExerciseScript().split(/\s+/).filter(Boolean);
    karaokeTimeline = passages.length
      ? buildTextPassageTimeline(passages, getCurrentKaraokeTiming())
      : buildKaraokeTimeline(karaokeWords, getCurrentKaraokeTiming());
  } else {
    karaokeWords = getExerciseScript().split(/\s+/).filter(Boolean);
    karaokeTimeline = applyRepeatMetadata(
      buildKaraokeTimeline(karaokeWords, getCurrentKaraokeTiming()),
      activeExercise?.repeats || 1,
    );
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

function getExerciseTextPassages(exercise = getActiveRecordingExercise()) {
  if (!exercise || !isLongTextMode(exercise.mode)) return [];

  const configuredPassages = Array.isArray(exercise.textPassages)
    ? exercise.textPassages
    : [];
  const rawText = configuredPassages.length
    ? configuredPassages.join("\n")
    : exercise.rawContent || exercise.content || exercise.script || "";

  return splitTextPassages(rawText);
}

function isLongTextMode(mode) {
  return mode === "long_text";
}

function isTextLikeMode(mode) {
  return mode === "text" || isLongTextMode(mode);
}

function normalizeEditorExerciseMode(exercise = {}) {
  const mode = normalizeEditorExerciseMode(exercise);
  if (mode !== "text") return mode;

  const savedPassages = Array.isArray(exercise.textPassages)
    ? exercise.textPassages.filter((passage) => String(passage || "").trim())
    : [];
  if (savedPassages.length > 1) return "long_text";

  const rawText = String(exercise.rawContent || exercise.content || exercise.script || "").trim();
  const repairedPassages = splitTextPassages(rawText);
  return rawText.length >= 280 && repairedPassages.length > 3 ? "long_text" : "text";
}

function splitTextPassages(text) {
  const rawText = String(text || "").trim();
  const explicitPassages = rawText
    .split(/\r?\n+/)
    .map((passage) => passage.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const hasExplicitBreaks = /\r?\n/.test(rawText);

  if (hasExplicitBreaks || explicitPassages.length !== 1 || rawText.length < 140) {
    return explicitPassages;
  }

  return splitLongTextIntoSentencePassages(explicitPassages[0]);
}

function splitLongTextIntoSentencePassages(text) {
  const normalizedText = String(text || "").replace(/\s+/g, " ").trim();
  if (!normalizedText) return [];

  const matches = normalizedText.match(/[^.!?…]+(?:[.!?…]+["»“”']?)?/g) || [normalizedText];
  const sentences = matches
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length > 1 ? sentences : [normalizedText];
}

function getEditorDialogTurns() {
  return parseDialogTurns(editorContent.value);
}

function syncEditorDialogTurns(turns, options = {}) {
  editorContent.value = serializeDialogTurns(turns);
  saveEditorDraft();
  renderEditorPreview(buildEditorExerciseFromForm());
  if (!options.skipListRender) renderEditorDialogList();
  if (exerciseName.value === "custom-editor") setupKaraokeText();
}

function serializeDialogTurns(turns) {
  return turns
    .map((turn) => {
      const normalizedTurn = normalizeDialogTurn(turn);
      if (!normalizedTurn.text) return "";
      return `${getDialogSpeakerLabel(normalizedTurn.role)}: ${normalizedTurn.text}`;
    })
    .filter(Boolean)
    .join("\n");
}

function addEditorDialogTurn() {
  const turns = getEditorDialogTurns();
  const previousRole = turns.at(-1)?.role;
  const nextRole = previousRole === "patient" ? "system" : "patient";
  syncEditorDialogTurns([
    ...turns,
    {
      role: nextRole,
      text: nextRole === "patient" ? "Meine Antwort." : "Antwort der KI-Stimme.",
    },
  ]);
}

function renderEditorDialogList() {
  if (!editorDialogList) return;

  let turns = getEditorDialogTurns();
  editorDialogList.innerHTML = "";

  if (!turns.length) {
    turns = [
      { role: "system", text: "Guten Morgen, wie geht es Ihnen?" },
      { role: "patient", text: "Mir geht es heute gut." },
    ];
    editorContent.value = turns
      .map((turn) => `${getDialogSpeakerLabel(turn.role)}: ${turn.text}`)
      .join("\n");
    saveEditorDraft();
    renderEditorPreview(buildEditorExerciseFromForm());
  }

  turns.forEach((turn, index) => {
    const item = document.createElement("div");
    item.className = `editor-dialog-item is-${turn.role}`;

    const row = document.createElement("div");
    row.className = "editor-dialog-speaker-row";

    const select = document.createElement("select");
    select.className = "select-input compact-select";
    [
      ["system", getActiveVoiceLabel()],
      ["patient", getCurrentPatientName()],
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      select.append(option);
    });
    select.value = turn.role;
    select.addEventListener("change", () => {
      const nextTurns = getEditorDialogTurns();
      nextTurns[index] = { ...nextTurns[index], role: select.value };
      syncEditorDialogTurns(nextTurns);
    });

    const badge = document.createElement("span");
    badge.className = "editor-dialog-role-badge";
    badge.textContent = turn.role === "patient"
      ? "Sprecher"
      : isDialogTurnAudioCurrent(turn)
        ? "KI Audio"
        : "KI neu";

    row.append(select, badge);

    const textarea = document.createElement("textarea");
    textarea.rows = 3;
    textarea.value = turn.text;
    textarea.placeholder = turn.role === "patient" ? `${getCurrentPatientName()} spricht...` : "KI-Stimme spricht...";
    textarea.addEventListener("input", () => {
      const nextTurns = getEditorDialogTurns();
      nextTurns[index] = { ...nextTurns[index], text: textarea.value };
      syncEditorDialogTurns(nextTurns, { skipListRender: true });
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Dialogzeile ${index + 1} entfernen`);
    removeButton.addEventListener("click", () => {
      const nextTurns = getEditorDialogTurns();
      nextTurns.splice(index, 1);
      syncEditorDialogTurns(nextTurns);
    });

    item.append(row, textarea, removeButton);
    editorDialogList.append(item);
  });
}

function getActiveVoiceLabel() {
  const settings = getElevenLabsSettings();
  const voice = getActiveElevenLabsVoice(settings);
  return voice?.name || "ElevenLabs";
}

function getExerciseDialogTurns(exercise = getActiveRecordingExercise()) {
  if (!exercise || exercise.mode !== "dialog") return [];
  if (Array.isArray(exercise.dialogTurns) && exercise.dialogTurns.length) {
    return exercise.dialogTurns
      .map((turn) => normalizeDialogTurn(turn))
      .filter((turn) => turn.text);
  }
  return parseDialogTurns(exercise.content || exercise.script || "");
}

function hydrateDialogTurnsWithAudio(turns, baseExercise) {
  const previousTurns = Array.isArray(baseExercise?.dialogTurns) ? baseExercise.dialogTurns : [];
  return turns.map((turn, index) => {
    const normalizedTurn = normalizeDialogTurn(turn);
    if (normalizedTurn.role === "patient") return normalizedTurn;

    const matchingPrevious =
      previousTurns[index]?.role === "system" &&
      hashText(previousTurns[index]?.text) === hashText(normalizedTurn.text)
        ? previousTurns[index]
        : previousTurns.find(
            (candidate) =>
              candidate?.role === "system" &&
              hashText(candidate?.text) === hashText(normalizedTurn.text) &&
              isDialogTurnAudioCurrent(candidate),
          );

    if (!matchingPrevious || !isDialogTurnAudioCurrent(matchingPrevious, normalizedTurn.text)) {
      return normalizedTurn;
    }

    return {
      ...normalizedTurn,
      audioUrl: getGlobalVoiceAudioUrl(matchingPrevious.audioUrl, matchingPrevious.audioPath),
      audioPath: String(matchingPrevious.audioPath || ""),
      audioVoiceId: matchingPrevious.audioVoiceId || "",
      audioVoiceSettings: matchingPrevious.audioVoiceSettings || null,
      audioTextHash: matchingPrevious.audioTextHash || "",
      audioSpeed: matchingPrevious.audioSpeed || 0,
      audioUpdatedAt: matchingPrevious.audioUpdatedAt || "",
    };
  });
}

function isDialogTurnAudioCurrent(turn, textOverride = "") {
  if (!turn?.audioUrl && !turn?.audioPath) return false;
  const requestSettings = getElevenLabsRequestSettings();
  return (
    turn.audioVoiceId === requestSettings.voiceId &&
    JSON.stringify(turn.audioVoiceSettings || {}) === JSON.stringify(requestSettings.voiceSettings || {}) &&
    turn.audioTextHash === hashText(textOverride || turn.text)
  );
}

function parseDialogTurns(text) {
  return String(text || "")
    .split(/\n+|\s*\|\s*/)
    .map((line, index) => parseDialogLine(line, index))
    .filter((turn) => turn.text);
}

function parseDialogLine(line, index = 0) {
  const rawLine = String(line || "").trim();
  const match = rawLine.match(/^([^:\-]+)\s*[:\-]\s*(.+)$/);
  if (match) {
    const roleName = match[1].trim();
    return normalizeDialogTurn({
      role: isSystemDialogRole(roleName) ? "system" : "patient",
      text: match[2],
    });
  }

  return normalizeDialogTurn({
    role: index % 2 === 0 ? "system" : "patient",
    text: rawLine,
  });
}

function normalizeDialogTurn(turn = {}) {
  const role = isPatientDialogRole(turn.role) ? "patient" : "system";
  const audioPath = String(turn.audioPath || "");
  return {
    role,
    text: String(turn.text || turn.label || "").trim(),
    audioUrl: getGlobalVoiceAudioUrl(turn.audioUrl, audioPath),
    audioPath,
    audioVoiceId: String(turn.audioVoiceId || ""),
    audioVoiceSettings: turn.audioVoiceSettings || null,
    audioTextHash: String(turn.audioTextHash || ""),
    audioSpeed: Number(turn.audioSpeed || 0),
    audioUpdatedAt: String(turn.audioUpdatedAt || ""),
  };
}

function isPatientDialogRole(role) {
  const normalizedRole = normalizeEditorExerciseName(role);
  const normalizedPatient = normalizeEditorExerciseName(getCurrentPatientName());
  return (
    /^(patient|patientin|nutzer|ich)$/i.test(String(role || "").trim()) ||
    Boolean(normalizedPatient && normalizedRole === normalizedPatient)
  );
}

function isSystemDialogRole(role) {
  const normalizedRole = normalizeEditorExerciseName(role);
  const activeVoice = getActiveElevenLabsVoice(getElevenLabsSettings());
  return (
    /^(system|therapeut|therapeutin|app|ki|elevenlabs)$/i.test(String(role || "").trim()) ||
    Boolean(normalizedRole && normalizedRole === normalizeEditorExerciseName(getActiveVoiceLabel())) ||
    Boolean(activeVoice?.name && normalizedRole === normalizeEditorExerciseName(activeVoice.name))
  );
}

function getDialogSpeakerLabel(role) {
  return role === "patient" ? getCurrentPatientName() : getActiveVoiceLabel();
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

function buildTextPassageTimeline(passages, timing = getCurrentKaraokeTiming()) {
  let cursor = 0;
  const wordSeconds = Number(timing.wordSeconds) || DEFAULT_KARAOKE_WORD_SECONDS;
  const pauseSeconds = Number(timing.pauseSeconds) || DEFAULT_KARAOKE_PAUSE_SECONDS;

  return passages.map((passage, index) => {
    const duration = getTextPassageSeconds(passage, wordSeconds, pauseSeconds);
    const item = {
      label: passage,
      text: passage,
      isPause: false,
      isTextPassage: true,
      passageIndex: index,
      start: cursor,
      end: cursor + duration,
    };
    cursor += duration;
    return item;
  });
}

function getTextPassageSeconds(passage, wordSeconds, pauseSeconds) {
  const normalized = String(passage || "").replace(/\s+/g, " ").trim();
  if (!normalized) return Math.max(1, pauseSeconds);

  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  const charCount = normalized.replace(/\s/g, "").length;
  const wordBasedSeconds = wordCount * wordSeconds * 1.15;
  const charBasedSeconds = charCount * 0.055;
  return Math.max(1.35, Math.min(9, wordBasedSeconds + charBasedSeconds + pauseSeconds));
}

function buildDialogTimeline(turns, secondsPerTurn = SENTENCE_MAX_SECONDS) {
  return turns.map((turn, index) => ({
    label: `${getDialogSpeakerLabel(turn.role)}: ${turn.text}`,
    text: turn.text,
    role: turn.role,
    roleLabel: getDialogSpeakerLabel(turn.role),
    audioUrl: getGlobalVoiceAudioUrl(turn.audioUrl, turn.audioPath),
    audioPath: String(turn.audioPath || ""),
    audioVoiceId: turn.audioVoiceId || "",
    audioTextHash: turn.audioTextHash || "",
    isPause: false,
    isSentence: true,
    isDialog: true,
    isPatientTurn: turn.role === "patient",
    isSystemTurn: turn.role !== "patient",
    start: index * secondsPerTurn,
    end: (index + 1) * secondsPerTurn,
  }));
}

function updateExercisePromptProgress(displayVolume) {
  if (isHoldUntilSilenceExercise()) {
    updateHoldPromptBySilence(displayVolume);
    return;
  }

  if (karaokeTimeline.some((item) => item.isDialog)) {
    updateDialogPromptProgress(displayVolume);
    return;
  }

  if (karaokeTimeline.some((item) => item.isSentence)) {
    updateSentencePromptBySilence(displayVolume);
    return;
  }

  updateKaraokeHighlight();
}

function isHoldUntilSilenceExercise(exercise = getActiveRecordingExercise()) {
  const combinedText = exercise
    ? `${exercise.name || ""} ${exercise.content || ""} ${exercise.script || ""}`
    : `${getExerciseLabel()} ${getExerciseScript()} ${exerciseName.value || ""}`;
  if (exercise && exercise.mode !== "vowels") return false;
  return /\bhalten\b/i.test(combinedText);
}

function updateHoldPromptBySilence(displayVolume) {
  if (!karaokeTimeline.length || sentenceStopScheduled) return;

  updateKaraokeHighlight();

  const now = performance.now();
  sentenceActiveStartedAt ||= now;
  sentencePeakVolumeSinceAdvance = Math.max(sentencePeakVolumeSinceAdvance, displayVolume);
  const dynamicSilenceThreshold = Math.max(
    SENTENCE_SILENCE_THRESHOLD,
    Math.min(14, Math.round(sentencePeakVolumeSinceAdvance * 0.32)),
  );
  const speechThreshold = Math.max(
    dynamicSilenceThreshold + 1,
    Math.min(SENTENCE_SPEECH_THRESHOLD, Math.round(sentencePeakVolumeSinceAdvance * 0.5) || SENTENCE_SPEECH_THRESHOLD),
  );

  if (displayVolume >= speechThreshold) {
    sentenceHasSpeechSinceAdvance = true;
    sentenceSilenceStartedAt = 0;
    message.textContent = "Vokal halten. Aufnahme stoppt nach der Pause.";
    return;
  }

  if (!sentenceHasSpeechSinceAdvance) return;

  if (displayVolume > dynamicSilenceThreshold) {
    sentenceSilenceStartedAt = 0;
    return;
  }

  sentenceSilenceStartedAt ||= now;
  if (now - sentenceSilenceStartedAt < SENTENCE_SILENCE_MS) return;

  scheduleSentenceFinalStop();
}

function updateDialogPromptProgress(displayVolume) {
  if (!karaokeTimeline.length || sentenceStopScheduled) return;

  const currentItem = karaokeTimeline[activeKaraokeIndex] || karaokeTimeline[0];
  updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);

  if (currentItem?.isSystemTurn) {
    playCurrentDialogSystemTurn();
    return;
  }

  if (currentItem?.isPatientTurn) {
    updateSentencePromptBySilence(displayVolume);
  }
}

async function playCurrentDialogSystemTurn() {
  if (dialogVoiceInProgress || dialogVoiceTurnIndex === activeKaraokeIndex || dialogAdvanceLock) return;

  const currentItem = karaokeTimeline[activeKaraokeIndex];
  if (!currentItem?.isSystemTurn) return;

  dialogVoiceInProgress = true;
  dialogVoiceTurnIndex = activeKaraokeIndex;
  sentenceHasSpeechSinceAdvance = true;
  sentenceSilenceStartedAt = 0;

  try {
    const audioUrl = currentItem.audioUrl || await createAndStoreDialogTurnAudio(activeKaraokeIndex);
    if (audioUrl) {
      message.textContent = `${currentItem.roleLabel} spricht.`;
      await playVoiceAudio(audioUrl);
    } else {
      message.textContent = `${currentItem.roleLabel}: ${currentItem.text || currentItem.label}`;
      await wait(Math.max(900, Math.min(3200, String(currentItem.text || currentItem.label || "").length * 55)));
    }
  } finally {
    dialogVoiceInProgress = false;
    advanceDialogPrompt();
  }
}

async function createAndStoreDialogTurnAudio(timelineIndex) {
  const currentItem = karaokeTimeline[timelineIndex];
  if (!currentItem?.isSystemTurn || !currentItem.text) return "";

  const exercise = getActiveRecordingExercise();
  if (exercise?.mode !== "dialog") return "";

  const storedAudio = await createStoredVoiceAudio(
    currentItem.text,
    `${exercise.name || getExerciseLabel()} Dialog ${timelineIndex + 1}`,
  ).catch(() => null);
  if (!storedAudio?.url) return "";

  const updatedTurnAudio = {
    audioUrl: storedAudio.url,
    audioPath: storedAudio.path,
    audioVoiceId: storedAudio.voiceId,
    audioVoiceSettings: storedAudio.voiceSettings,
    audioTextHash: storedAudio.textHash,
    audioSpeed: storedAudio.speed,
    audioUpdatedAt: new Date().toISOString(),
  };

  Object.assign(currentItem, updatedTurnAudio);

  const updatedTurns = getExerciseDialogTurns(exercise).map((turn, index) =>
    index === timelineIndex
      ? { ...normalizeDialogTurn(turn), ...updatedTurnAudio }
      : normalizeDialogTurn(turn),
  );
  const updatedExercise = hydrateEditorExercise({
    ...exercise,
    dialogTurns: updatedTurns,
    content: serializeDialogTurns(updatedTurns),
    script: serializeDialogTurns(updatedTurns),
    dialogAudioUpdatedAt: new Date().toISOString(),
  });
  await saveEditorExerciseObject(updatedExercise);
  return storedAudio.url;
}

function advanceDialogPrompt() {
  if (dialogAdvanceLock || sentenceStopScheduled) return;
  dialogAdvanceLock = true;

  window.setTimeout(() => {
    dialogAdvanceLock = false;
  }, 180);

  if (activeKaraokeIndex < karaokeTimeline.length - 1) {
    activeKaraokeIndex += 1;
    resetSentenceSilenceState();
    updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
    const item = karaokeTimeline[activeKaraokeIndex];
    message.textContent = item?.isPatientTurn
      ? `${item.roleLabel} spricht jetzt.`
      : `${item.roleLabel} ist dran.`;
    return;
  }

  scheduleSentenceFinalStop();
}

function updateSentencePromptBySilence(displayVolume) {
  if (!karaokeTimeline.length || sentenceStopScheduled) return;

  updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);

  const now = performance.now();
  sentenceActiveStartedAt ||= now;
  sentencePeakVolumeSinceAdvance = Math.max(sentencePeakVolumeSinceAdvance, displayVolume);
  const dynamicSilenceThreshold = Math.max(
    SENTENCE_SILENCE_THRESHOLD,
    Math.min(16, Math.round(sentencePeakVolumeSinceAdvance * 0.34)),
  );
  const speechThreshold = Math.max(
    dynamicSilenceThreshold + 1,
    Math.min(SENTENCE_SPEECH_THRESHOLD, Math.round(sentencePeakVolumeSinceAdvance * 0.55) || SENTENCE_SPEECH_THRESHOLD),
  );
  const hasSpeech = displayVolume >= speechThreshold;
  const hasSilence = displayVolume <= dynamicSilenceThreshold;
  const sentenceTimedOut = now - sentenceActiveStartedAt >= SENTENCE_MAX_ACTIVE_MS;

  if (hasSpeech) {
    sentenceHasSpeechSinceAdvance = true;
    sentenceSilenceStartedAt = 0;
    return;
  }

  if (!sentenceHasSpeechSinceAdvance && !sentenceTimedOut) return;
  if (!hasSilence) {
    if (sentenceTimedOut) {
      advanceSentencePrompt();
      return;
    }
    sentenceSilenceStartedAt = 0;
    return;
  }

  sentenceSilenceStartedAt ||= now;
  if (now - sentenceSilenceStartedAt < SENTENCE_SILENCE_MS) return;

  advanceSentencePrompt();
}

function advanceSentencePrompt() {
  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentencePeakVolumeSinceAdvance = 0;
  sentenceActiveStartedAt = performance.now();

  if (karaokeTimeline[activeKaraokeIndex]?.isPatientTurn) {
    advanceDialogPrompt();
    return;
  }

  if (activeKaraokeIndex < karaokeTimeline.length - 1) {
    activeKaraokeIndex += 1;
    updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
    message.textContent = `Nächster Satz ${activeKaraokeIndex + 1} von ${karaokeTimeline.length}.`;
    return;
  }

  scheduleSentenceFinalStop();
}

function resetSentenceSilenceState() {
  sentenceSilenceStartedAt = 0;
  sentenceHasSpeechSinceAdvance = false;
  sentencePeakVolumeSinceAdvance = 0;
  sentenceActiveStartedAt = performance.now();
}

function scheduleSentenceFinalStop() {
  if (sentenceStopScheduled) return;
  sentenceStopScheduled = true;
  message.textContent = "Letzter Teil beendet. Aufnahme stoppt gleich.";
  window.setTimeout(() => {
    if (isRecording || mediaRecorder?.state === "recording") stopRecording();
  }, SENTENCE_FINAL_TAIL_SECONDS * 1000);
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
  adaptiveVolumeNoiseFloor = 0;
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
  const selectedTiming = getRecordingKaraokeTiming();
  const activeExercise = getActiveRecordingExercise();
  const baseTiming = activeExercise?.timing || {};

  return {
    ...baseTiming,
    wordSeconds: selectedTiming.wordSeconds,
    pauseSeconds: selectedTiming.pauseSeconds,
    sentencePauseSeconds: selectedTiming.sentencePauseSeconds || baseTiming.sentencePauseSeconds,
  };
}

function getRecordingKaraokeTiming() {
  const speed = clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3);
  return EDITOR_SPEEDS[speed] || EDITOR_SPEEDS[3];
}

function getCurrentExerciseSpeedKey() {
  const activeExercise = getActiveRecordingExercise();
  const label = activeExercise?.name || exerciseName.value || getExerciseLabel();
  return normalizeEditorExerciseName(label);
}

function getRecordingKaraokeSpeedMap() {
  try {
    return JSON.parse(localStorage.getItem(RECORDING_KARAOKE_SPEEDS_KEY) || "{}") || {};
  } catch (error) {
    return {};
  }
}

function getDefaultKaraokeSpeedForCurrentExercise() {
  const activeExercise = getActiveRecordingExercise();
  if (activeExercise?.speed) return clampRecordingKaraokeSpeed(activeExercise.speed);

  return clampRecordingKaraokeSpeed(
    localStorage.getItem(RECORDING_KARAOKE_SPEED_KEY) ||
      recordingKaraokeSpeed?.value ||
      3,
  );
}

function loadRecordingKaraokeSpeedForCurrentExercise() {
  const speedMap = getRecordingKaraokeSpeedMap();
  const key = getCurrentExerciseSpeedKey();
  const speed = clampRecordingKaraokeSpeed(speedMap[key] || getDefaultKaraokeSpeedForCurrentExercise());
  if (recordingKaraokeSpeed) recordingKaraokeSpeed.value = String(speed);
  updateRecordingKaraokeSpeedLabel();
}

function saveRecordingKaraokeSpeedForCurrentExercise(speed) {
  saveRecordingKaraokeSpeedForExerciseName(getCurrentExerciseSpeedKey(), speed);
}

function saveRecordingKaraokeSpeedForExerciseName(nameOrKey, speed) {
  const key = normalizeEditorExerciseName(nameOrKey);
  if (!key) return;
  const speedMap = getRecordingKaraokeSpeedMap();
  speedMap[key] = clampRecordingKaraokeSpeed(speed);
  localStorage.setItem(RECORDING_KARAOKE_SPEEDS_KEY, JSON.stringify(speedMap));
  localStorage.setItem(RECORDING_KARAOKE_SPEED_KEY, String(speedMap[key]));
}

function clampRecordingKaraokeSpeed(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 3;
  return Math.max(1, Math.min(10, Math.round(numericValue)));
}

function updateRecordingKaraokeSpeed(value) {
  const nextValue = clampRecordingKaraokeSpeed(value);
  if (recordingKaraokeSpeed) recordingKaraokeSpeed.value = String(nextValue);
  saveRecordingKaraokeSpeedForCurrentExercise(nextValue);
  updateRecordingKaraokeSpeedLabel();
  retimeKaraokeAfterSpeedChange();
}

function retimeKaraokeAfterSpeedChange() {
  if (!isRecording) {
    setupKaraokeText();
    return;
  }

  const oldDuration = getKaraokeTimelineDuration(karaokeTimeline);
  const elapsedSeconds = startedAt ? Math.max(0, (performance.now() - startedAt) / 1000) : 0;
  const progress = oldDuration > 0 ? Math.max(0, Math.min(1, elapsedSeconds / oldDuration)) : 0;

  setupKaraokeText();

  const newDuration = getKaraokeTimelineDuration(karaokeTimeline);
  if (newDuration > 0) {
    startedAt = performance.now() - progress * newDuration * 1000;
  }

  updateKaraokeHighlight();
  scheduleAutoStop();
}

function getKaraokeTimelineDuration(timeline = karaokeTimeline) {
  const lastItem = Array.isArray(timeline) ? timeline.at(-1) : null;
  return Number(lastItem?.end || 0);
}

function updateRecordingKaraokeSpeedLabel() {
  if (!recordingKaraokeSpeedValue) return;
  const speed = clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3);
  recordingKaraokeSpeedValue.textContent = EDITOR_SPEEDS[speed]?.label || "Normal";
  updateRecordingKaraokeTimingHint();
}

function updateRecordingKaraokeTimingHint() {
  if (!recordingKaraokeTimingHint) return;

  const timing = getCurrentKaraokeTiming();
  const activeExercise = getActiveRecordingExercise();
  const hint = getKaraokeTimingHint(activeExercise, timing);
  recordingKaraokeTimingHint.textContent = hint;
}

function getKaraokeTimingHint(exercise, timing) {
  const speedLabel = EDITOR_SPEEDS[clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3)]?.label || "Normal";
  if (!exercise) {
    return `Standzeit: ca. ${formatSecondsShort(timing.wordSeconds)} pro Einheit (${speedLabel}).`;
  }

  if (isLongTextMode(exercise.mode)) {
    const passages = getExerciseTextPassages(exercise);
    const durations = passages.map((passage) =>
      getTextPassageSeconds(passage, timing.wordSeconds, timing.pauseSeconds),
    );
    if (!durations.length) return `Standzeit: nach Abschnittslänge (${speedLabel}).`;

    const minSeconds = Math.min(...durations);
    const maxSeconds = Math.max(...durations);
    const avgSeconds = durations.reduce((sum, value) => sum + value, 0) / durations.length;
    return `Standzeit: ${formatSecondsShort(minSeconds)}-${formatSecondsShort(maxSeconds)} pro Abschnitt, Ø ${formatSecondsShort(avgSeconds)} (${speedLabel}).`;
  }

  const words = String(exercise.script || exercise.content || "")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word && word !== "|");
  const sampleWords = words.length ? words : ["Pa", "Ta", "Ka"];
  const durations = sampleWords.map((word) => getKaraokeWordSeconds(word, timing));
  const minSeconds = Math.min(...durations);
  const maxSeconds = Math.max(...durations);

  if (exercise.mode === "sentences") {
    return `Standzeit: kurze Sätze wechseln per Pause; Tempo ${speedLabel}.`;
  }

  return `Standzeit: ${formatSecondsShort(minSeconds)}-${formatSecondsShort(maxSeconds)} pro Wort/Silbe (${speedLabel}).`;
}

function formatSecondsShort(seconds) {
  const rounded = Math.max(0, Number(seconds) || 0);
  return `${rounded.toFixed(1).replace(".", ",")}s`;
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

  if (exercise.mode === "dialog") {
    return `Bereiten Sie sich auf den Dialog vor. Hören Sie auf die System-Antworten und sprechen Sie Ihren Teil ruhig und deutlich.`;
  }

  if (exercise.mode === "sentences") {
    return `Bereiten Sie sich auf die kurzen Sätze vor. Lesen Sie jeden Satz im Tempo ${exercise.timing.label}. Machen Sie nach jedem Satz eine kurze Pause.`;
  }

  if (exercise.mode === "long_text") {
    return `Bitte lesen Sie den langen Text abschnittweise ruhig und deutlich vor. Das Tempo ist ${exercise.timing.label}.`;
  }

  if (exercise.mode === "text") {
    return `Bitte lesen Sie den eingeblendeten Karaoke-Text ruhig und deutlich vor. Das Tempo ist ${exercise.timing.label}.`;
  }

  return `Bitte sprechen Sie ${exercise.contentLabel}. Wiederholen Sie die Folge ${exercise.repeats} mal im Tempo ${exercise.timing.label}, mit kurzer Pause zwischen den Durchgängen.`;
}

function getExerciseConfiguration() {
  const exercise = getActiveRecordingExercise();
  const recordingTiming = getCurrentKaraokeTiming();
  const recordingSpeed = clampRecordingKaraokeSpeed(recordingKaraokeSpeed?.value || 3);

  if (!exercise) {
    return {
      typ: "standard",
      name: getExerciseLabel(),
      inhalt: getExerciseScript(),
      wiederholungen: 1,
      geschwindigkeit: recordingSpeed,
      geschwindigkeitLabel: EDITOR_SPEEDS[recordingSpeed]?.label || "Normal",
      karaokeGeschwindigkeit: {
        wert: recordingSpeed,
        label: EDITOR_SPEEDS[recordingSpeed]?.label || "Normal",
        sekundenProEinheit: recordingTiming.wordSeconds,
        pauseSekunden: recordingTiming.pauseSeconds,
        individuellGespeichert: Boolean(getRecordingKaraokeSpeedMap()[getCurrentExerciseSpeedKey()]),
      },
      sekundenProEinheit: recordingTiming.wordSeconds,
      pauseSekunden: recordingTiming.pauseSeconds,
      satzPauseSekunden: recordingTiming.sentencePauseSeconds || SENTENCE_END_PAUSE_SECONDS,
    };
  }

  return {
    typ: exercise.mode,
    name: exercise.name,
    inhalt: exercise.content,
    textAbschnitte: isLongTextMode(exercise.mode) ? getExerciseTextPassages(exercise) : [],
    saetze: exercise.sentences || [],
    dialog: exercise.dialogTurns || [],
    wiederholungen: exercise.repeats,
    geschwindigkeit: recordingSpeed,
    geschwindigkeitLabel: EDITOR_SPEEDS[recordingSpeed]?.label || "Normal",
    karaokeGeschwindigkeit: {
      wert: recordingSpeed,
      label: EDITOR_SPEEDS[recordingSpeed]?.label || "Normal",
      sekundenProEinheit: recordingTiming.wordSeconds,
      pauseSekunden: recordingTiming.pauseSeconds,
      individuellGespeichert: Boolean(getRecordingKaraokeSpeedMap()[getCurrentExerciseSpeedKey()]),
    },
    voiceBegleitung: exercise.voiceInstruction,
    voiceAudioVorhanden: Boolean(exercise.voiceAudioUrl || exercise.voiceAudioDataUrl),
    voiceAudioUrl: exercise.voiceAudioUrl || "",
    voiceAudioPath: exercise.voiceAudioPath || "",
    sekundenProEinheit: recordingTiming.wordSeconds,
    pauseSekunden: recordingTiming.pauseSeconds,
    satzPauseSekunden: recordingTiming.sentencePauseSeconds || SENTENCE_END_PAUSE_SECONDS,
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
  const standardExercise = STANDARD_EDITOR_EXERCISES.find((exercise) =>
    candidates.some(
      (candidate) => normalizeEditorExerciseName(candidate) === normalizeEditorExerciseName(exercise.name),
    ),
  );
  if (standardExercise) return hydrateEditorExercise(standardExercise);

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
  const parsedDialogTurns = mode === "dialog" ? getExerciseDialogTurns({ ...exercise, mode, content }) : [];
  const dialogTurns = mode === "dialog" ? hydrateDialogTurnsWithAudio(parsedDialogTurns, exercise) : [];
  const script = !isTextLikeMode(mode) && mode !== "dialog" && repeats > 1
    ? buildRepeatedScript(content, repeats)
    : exercise.script || content;
  const sentences = exercise.sentences || (mode === "sentences" ? content.split("|").map((sentence) => sentence.trim()).filter(Boolean) : []);
  const patientTurnCount = dialogTurns.filter((turn) => turn.role === "patient").length;
  const contentLabel =
    exercise.contentLabel ||
    (mode === "dialog"
      ? `${patientTurnCount || 1} Sprecherteil${patientTurnCount === 1 ? "" : "e"}`
      : mode === "sentences"
      ? `${sentences.length || 1} Satz${sentences.length === 1 ? "" : "e"}`
      : isLongTextMode(mode)
      ? `${getExerciseTextPassages({ ...exercise, mode, content }).length || 1} Textabschnitt${getExerciseTextPassages({ ...exercise, mode, content }).length === 1 ? "" : "e"}`
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
    dialogTurns,
    voiceAudioUrl: getGlobalVoiceAudioUrl(exercise.voiceAudioUrl, exercise.voiceAudioPath),
    demoAudioUrl: getGlobalVoiceAudioUrl(exercise.demoAudioUrl, exercise.demoAudioPath),
    demoAudioSegments: Array.isArray(exercise.demoAudioSegments)
      ? exercise.demoAudioSegments.map((segment, index) => ({
          ...segment,
          index: Number.isFinite(Number(segment?.index)) ? Number(segment.index) : index,
          url: getGlobalVoiceAudioUrl(segment?.url, segment?.path),
          path: String(segment?.path || ""),
        }))
      : [],
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
  const baseExerciseForAudio =
    findSavedEditorExerciseByName(name) ||
    (savedEditorExercise?.name === name ? savedEditorExercise : null);
  const parsedDialogTurns = mode === "dialog" ? getEditorDialogTurns() : [];
  const dialogTurns = mode === "dialog" ? hydrateDialogTurnsWithAudio(parsedDialogTurns, baseExerciseForAudio) : [];
  const rawTextContent = editorContent.value.trim();
  const textPassages = isLongTextMode(mode) ? splitTextPassages(rawTextContent) : [];
  const tokens =
    isTextLikeMode(mode)
      ? rawTextContent.split(/\s+/).map((token) => token.trim()).filter(Boolean)
      : mode === "sentences" || mode === "dialog"
        ? []
        : getEditorTokens();
  const content =
    mode === "dialog"
      ? editorContent.value.trim() || getDefaultEditorContent(mode)
      : mode === "sentences"
      ? sentences.join(" | ") || getDefaultEditorContent(mode)
      : isTextLikeMode(mode)
      ? rawTextContent || getDefaultEditorContent(mode)
      : tokens.length
        ? tokens.join(" ")
        : getDefaultEditorContent(mode);
  const voiceInstruction =
    editorVoiceInstruction.value.trim() || getDefaultEditorVoiceInstruction(mode);
  const useRepeats = editorUseRepeats.checked && !isTextLikeMode(mode) && mode !== "sentences" && mode !== "dialog";
  const repeats = useRepeats ? getEditorRepeats() : 1;
  const script = useRepeats ? buildRepeatedScript(content, repeats) : content;
  const patientTurnCount = dialogTurns.filter((turn) => turn.role === "patient").length;

  return {
    name,
    mode,
    speed,
    timing,
    content,
    rawContent: isTextLikeMode(mode) ? content : "",
    textPassages,
    contentLabel:
      mode === "dialog"
        ? `${patientTurnCount || 1} Sprecherteil${patientTurnCount === 1 ? "" : "e"}`
        : mode === "sentences"
        ? `${sentences.length || 1} Satz${sentences.length === 1 ? "" : "e"}`
        : isLongTextMode(mode) && textPassages.length
        ? `${textPassages.length} Karaoke-Abschnitt${textPassages.length === 1 ? "" : "e"}`
        : tokens.join(", ") || getDefaultEditorContent(mode),
    sentences,
    dialogTurns,
    voiceInstruction,
    voiceAudioUrl: getGlobalVoiceAudioUrl(editorVoiceAudioUrl, editorVoiceAudioPath),
    voiceAudioPath: editorVoiceAudioPath,
    voiceAudioDataUrl: editorVoiceAudioDataUrl,
    voiceAudioVoiceId: editorVoiceAudioVoiceId,
    voiceAudioVoiceSettings: editorVoiceAudioVoiceSettings,
    voiceAudioTextHash: editorVoiceAudioTextHash,
    voiceAudioUpdatedAt: editorVoiceAudioUpdatedAt,
    demoAudioUrl: savedEditorExercise?.name === name
      ? getGlobalVoiceAudioUrl(savedEditorExercise.demoAudioUrl, savedEditorExercise.demoAudioPath)
      : "",
    demoAudioPath: savedEditorExercise?.name === name ? savedEditorExercise.demoAudioPath || "" : "",
    demoAudioSegments: savedEditorExercise?.name === name
      ? (savedEditorExercise.demoAudioSegments || []).map((segment, index) => ({
          ...segment,
          index: Number.isFinite(Number(segment?.index)) ? Number(segment.index) : index,
          url: getGlobalVoiceAudioUrl(segment?.url, segment?.path),
          path: String(segment?.path || ""),
        }))
      : [],
    demoVoiceId: savedEditorExercise?.name === name ? savedEditorExercise.demoVoiceId || "" : "",
    demoVoiceSettings: savedEditorExercise?.name === name ? savedEditorExercise.demoVoiceSettings || null : null,
    demoTextHash: savedEditorExercise?.name === name ? savedEditorExercise.demoTextHash || "" : "",
    demoSpeed: savedEditorExercise?.name === name ? savedEditorExercise.demoSpeed || 0 : 0,
    demoCreatedAt: savedEditorExercise?.name === name ? savedEditorExercise.demoCreatedAt || "" : "",
    repeats,
    script,
  };
}

function buildRepeatedScript(content, repeats) {
  const rows = [];

  for (let index = 1; index <= repeats; index += 1) {
    rows.push(content);
  }

  return rows.join(" | ");
}

function getDefaultEditorContent(mode) {
  if (mode === "sentences") return "";
  if (mode === "text") return "Heute lese ich langsam und deutlich.";
  if (mode === "long_text") return "Es blaut die Nacht.\nDie Sternlein blinken.\nSchneeflöcklein leise niedersinken.";
  if (mode === "vowels") return "A E I O U";
  if (mode === "dialog") {
    const speakerName = getCurrentPatientName();
    return `System: Guten Morgen, wie geht es Ihnen?\n${speakerName}: Mir geht es heute gut.\nSystem: Was haben Sie heute geübt?\n${speakerName}: Ich habe ruhig und deutlich gesprochen.`;
  }
  return "Pa Ta Ka";
}

function getDefaultEditorVoiceInstruction(mode) {
  if (mode === "dialog") return "Bitte hören Sie auf die System-Sätze und sprechen Sie Ihren Teil ruhig und deutlich.";
  if (mode === "sentences") return "Bitte lesen Sie die kurzen Sätze nacheinander ruhig und deutlich vor. Machen Sie nach jedem Satz eine kurze Pause.";
  if (mode === "text") return "Bitte lesen Sie den eingeblendeten Text ruhig und deutlich vor.";
  if (mode === "long_text") return "Bitte lesen Sie jeden eingeblendeten Textabschnitt ruhig und deutlich vor.";
  if (mode === "vowels") return "Bitte sprechen Sie die Vokale nacheinander deutlich aus.";
  return "Bitte sprechen Sie die einzelnen Silben ruhig und deutlich.";
}

function buildVoiceInstructionSuggestion() {
  const exercise = buildEditorExerciseFromForm();
  const speedText = exercise.timing.label.toLowerCase();

  if (exercise.mode === "sentences") {
    return `Bereiten Sie sich auf die kurzen Sätze vor. Lesen Sie jeden Satz im Tempo ${speedText}. Machen Sie nach jedem Satz eine kurze Pause.`;
  }

  if (exercise.mode === "dialog") {
    return `Bereiten Sie sich auf den Dialog vor. Die Systemteile werden vorgelesen, Ihren Teil sprechen Sie ruhig und deutlich. Das Tempo ist ${speedText}.`;
  }

  if (exercise.mode === "text") {
    return `Bereiten Sie sich auf den Text vor. Lesen Sie gleich Wort für Wort im Tempo ${speedText}. Sprechen Sie ruhig, deutlich und ohne Druck.`;
  }

  if (exercise.mode === "long_text") {
    return `Bereiten Sie sich auf den langen Text vor. Lesen Sie jeden eingeblendeten Abschnitt im Tempo ${speedText}. Bleiben Sie ruhig und deutlich.`;
  }

  if (exercise.mode === "vowels") {
    return `Bereiten Sie sich auf die Vokalübung vor. Sprechen Sie ${exercise.contentLabel} nacheinander im Tempo ${speedText}. Achten Sie auf klare Mundöffnung und gleichmäßige Stimme.`;
  }

  return `Bereiten Sie sich auf die Silbenübung vor. Sprechen Sie ${exercise.contentLabel} einzeln und deutlich. Wiederholen Sie die Folge ${exercise.repeats} mal im Tempo ${speedText}.`;
}

async function suggestVoiceInstruction() {
  const fallbackSuggestion = buildVoiceInstructionSuggestion();
  const chatGptSettings = getChatGptSettings();

  if (!chatGptSettings.enabled || !chatGptSettings.apiKey) {
    editorVoiceInstruction.value = fallbackSuggestion;
    saveEditorDraft();
    editorVoiceState.textContent = "Lokaler KI-Vorschlag erstellt. ChatGPT ist im Setup nicht aktiv.";
    return;
  }

  suggestVoiceButton.disabled = true;
  editorVoiceState.textContent = "ChatGPT erstellt einen Vorschlag...";

  try {
    const exercise = buildEditorExerciseFromForm();
    const response = await fetch(getApiUrl("/api/chatgpt"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: chatGptSettings.apiKey,
        model: chatGptSettings.model,
        systemPrompt: chatGptSettings.systemPrompt,
        exercise: {
          name: exercise.name,
          mode: exercise.mode,
          content: exercise.content,
          script: exercise.script,
          sentences: exercise.sentences,
          dialogTurns: exercise.dialogTurns,
          repeats: exercise.repeats,
          speedLabel: exercise.timing.label,
        },
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.text) {
      throw new Error(payload.error || "chatgpt-suggestion-failed");
    }

    editorVoiceInstruction.value = String(payload.text).trim();
    saveEditorDraft();
    editorVoiceState.textContent = "ChatGPT-Vorschlag erstellt.";
  } catch (error) {
    editorVoiceInstruction.value = fallbackSuggestion;
    saveEditorDraft();
    editorVoiceState.textContent = "ChatGPT nicht erreichbar. Lokaler Vorschlag eingesetzt.";
  } finally {
    suggestVoiceButton.disabled = false;
  }
}

async function generateVoiceAudio() {
  if (editorMode.value === "dialog") {
    await generateDialogVoiceAudio();
    return;
  }

  const text = editorVoiceInstruction.value.trim();
  if (!text) {
    editorVoiceState.textContent = "Bitte zuerst einen Voice-Text eintragen.";
    return;
  }

  generateVoiceAudioButton.disabled = true;
  editorVoiceState.textContent = "ElevenLabs-Audio wird erstellt...";

  try {
    const response = await fetch(getApiUrl("/api/voice"), {
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
    editorVoiceAudioUrl = getGlobalVoiceAudioUrl(cloudVoice.downloadUrl, cloudVoice.path);
    editorVoiceAudioPath = cloudVoice.path;
    editorVoiceAudioVoiceId = cloudVoice.voiceId || getElevenLabsRequestSettings().voiceId;
    editorVoiceAudioVoiceSettings = cloudVoice.voiceSettings || getElevenLabsRequestSettings().voiceSettings;
    editorVoiceAudioTextHash = cloudVoice.textHash || hashText(text);
    editorVoiceAudioUpdatedAt = new Date().toISOString();
    editorVoicePreview.src = resolveAppUrl(editorVoiceAudioUrl);
    editorVoiceState.textContent = "ElevenLabs-Audio erstellt und in Firebase gespeichert.";
    saveEditorDraft();
    saveEditorExercise();
    editorVoiceState.textContent = "ElevenLabs-Audio erstellt und in der Übung gespeichert.";
  } catch (error) {
    editorVoiceAudioDataUrl = "";
    editorVoiceAudioUrl = "";
    editorVoiceAudioPath = "";
    editorVoiceAudioVoiceId = "";
    editorVoiceAudioVoiceSettings = null;
    editorVoiceAudioTextHash = "";
    editorVoiceAudioUpdatedAt = "";
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
  stopEditorKaraokeTest();
  const isTextMode = isTextLikeMode(editorMode.value);
  const isLongTextModeSelected = isLongTextMode(editorMode.value);
  const isSentenceMode = editorMode.value === "sentences";
  exerciseEditor?.classList.toggle("sentence-mode", isSentenceMode);
  exerciseEditor?.classList.toggle("text-mode", isTextMode);
  exerciseEditor?.classList.toggle("long-text-mode", isLongTextModeSelected);
  const isDialogMode = editorMode.value === "dialog";
  exerciseEditor?.classList.toggle("dialog-mode", isDialogMode);
  if (isTextMode || isSentenceMode || isDialogMode) editorUseRepeats.checked = false;
  repeatControl.classList.toggle("is-hidden", isTextMode || isSentenceMode || isDialogMode || !editorUseRepeats.checked);
  editorUseRepeats.disabled = isTextMode || isSentenceMode || isDialogMode;
  editorSentenceBuilder?.classList.toggle("is-hidden", !isSentenceMode);
  editorDialogBuilder?.classList.toggle("is-hidden", !isDialogMode);
  editorSpeedValue.textContent = EDITOR_SPEEDS[editorSpeed.value]?.label || "Normal";
  renderEditorPreview(buildEditorExerciseFromForm());
  renderEditorSentenceList();
  if (isDialogMode) renderEditorDialogList();
}

function renderEditorPreview(exercise, activeIndex = -1) {
  if (!editorPreview) return;

  editorPreview.innerHTML = "";
  editorPreviewTimeline = buildEditorPreviewTimeline(exercise);

  if (!editorPreviewTimeline.length) {
    editorPreview.textContent = "Noch kein Text.";
    return;
  }

  const previewItems = isTextLikeMode(exercise.mode)
    ? editorPreviewTimeline
    : editorPreviewTimeline.slice(0, 12);

  previewItems.forEach((item, index) => {
    const span = document.createElement("span");
    span.className = item.isPause
      ? "editor-preview-word editor-preview-pause"
      : "editor-preview-word";
    span.textContent = item.label || "|";
    span.classList.toggle("is-active", index === activeIndex);
    span.classList.toggle("is-next", index === activeIndex + 1 && !item.isPause);
    editorPreview.append(span);
  });
}

function buildEditorPreviewTimeline(exercise = buildEditorExerciseFromForm()) {
  if (exercise.mode === "dialog") {
    return getExerciseDialogTurns(exercise).map((turn, index) => ({
      label: `${getDialogSpeakerLabel(turn.role)}: ${turn.text}`,
      role: turn.role,
      isPause: false,
      isSentence: true,
      isDialog: true,
      start: index * SENTENCE_MAX_SECONDS,
      end: (index + 1) * SENTENCE_MAX_SECONDS,
    }));
  }

  if (exercise.mode === "sentences") {
    return getExerciseSentences(exercise).map((sentence, index) => ({
      label: sentence,
      isPause: false,
      start: index * SENTENCE_MAX_SECONDS,
      end: (index + 1) * SENTENCE_MAX_SECONDS,
    }));
  }

  if (isLongTextMode(exercise.mode)) {
    return buildTextPassageTimeline(getExerciseTextPassages(exercise), exercise.timing);
  }

  const words = String(exercise.script || "")
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean);

  return buildKaraokeTimeline(words, exercise.timing);
}

function startEditorKaraokeTest() {
  const exercise = buildEditorExerciseFromForm();

  if (!isTextLikeMode(exercise.mode)) {
    editorVoiceState.textContent = "Der Tempo-Test ist für Karaoke-Text gedacht.";
    return;
  }

  editorPreviewTimeline = buildEditorPreviewTimeline(exercise);
  if (!editorPreviewTimeline.length) {
    editorVoiceState.textContent = "Bitte zuerst einen Karaoke-Text eingeben.";
    return;
  }

  isTestingEditorKaraoke = true;
  testEditorKaraokeButton.textContent = "Test stoppen";
  editorVoiceState.textContent = `Karaoke-Test läuft: ${exercise.timing.label}.`;
  runEditorKaraokeFrame(performance.now(), exercise);
}

function runEditorKaraokeFrame(startTime, exercise) {
  if (!isTestingEditorKaraoke) return;

  const elapsedSeconds = Math.max(0, (performance.now() - startTime) / 1000);
  let activeIndex = editorPreviewTimeline.findIndex(
    (item) => elapsedSeconds >= item.start && elapsedSeconds < item.end,
  );

  if (activeIndex < 0) {
    stopEditorKaraokeTest();
    renderEditorPreview(exercise);
    editorVoiceState.textContent = `Karaoke-Test beendet: ${exercise.timing.label}.`;
    return;
  }

  renderEditorPreview(exercise, activeIndex);
  editorPreviewTimerId = window.setTimeout(
    () => runEditorKaraokeFrame(startTime, exercise),
    60,
  );
}

function stopEditorKaraokeTest(options = {}) {
  window.clearTimeout(editorPreviewTimerId);
  editorPreviewTimerId = 0;
  isTestingEditorKaraoke = false;
  if (!options.keepButtonLabel && testEditorKaraokeButton) {
    testEditorKaraokeButton.textContent = "Karaoke-Tempo testen";
  }
}

function applyEditorModeDefaults() {
  editorContent.value = getDefaultEditorContent(editorMode.value);
  editorVoiceInstruction.value = getDefaultEditorVoiceInstruction(editorMode.value);
  editorUseRepeats.checked =
    editorMode.value !== "text" &&
    editorMode.value !== "sentences" &&
    editorMode.value !== "dialog";
  if (editorMode.value === "sentences") {
    editorExerciseName.value = "Kurze Sätze";
  } else if (editorMode.value === "text") {
    editorExerciseName.value = "Karaoke-Text";
  } else if (editorMode.value === "vowels") {
    editorExerciseName.value = "Vokale nacheinander";
  } else if (editorMode.value === "dialog") {
    editorExerciseName.value = "Dialog";
  } else {
    editorExerciseName.value = "Neue Silbenübung";
  }
}

async function generateDialogVoiceAudio() {
  const exercise = buildEditorExerciseFromForm();
  const turns = Array.isArray(exercise.dialogTurns) ? exercise.dialogTurns : [];
  const systemTurns = turns.filter((turn) => turn.role !== "patient" && turn.text);

  if (!systemTurns.length) {
    editorVoiceState.textContent = "Bitte mindestens eine KI-Dialogzeile eintragen.";
    return;
  }

  generateVoiceAudioButton.disabled = true;
  editorVoiceState.textContent = `Dialog-Audio wird erstellt: 0/${systemTurns.length}`;

  try {
    let createdCount = 0;
    let reusedCount = 0;
    let systemIndex = 0;
    const updatedTurns = [];

    for (const turn of turns) {
      if (turn.role === "patient" || !turn.text) {
        updatedTurns.push(normalizeDialogTurn(turn));
        continue;
      }

      systemIndex += 1;
      if (isDialogTurnAudioCurrent(turn)) {
        reusedCount += 1;
        updatedTurns.push(turn);
        editorVoiceState.textContent = `Dialog-Audio aktuell: ${systemIndex}/${systemTurns.length}`;
        continue;
      }

      editorVoiceState.textContent = `Dialog-Audio wird erstellt: ${systemIndex}/${systemTurns.length}`;
      const storedAudio = await createStoredVoiceAudio(
        turn.text,
        `${exercise.name} Dialog ${systemIndex}`,
      );
      createdCount += 1;
      updatedTurns.push({
        ...normalizeDialogTurn(turn),
        audioUrl: storedAudio.url,
        audioPath: storedAudio.path,
        audioVoiceId: storedAudio.voiceId,
        audioVoiceSettings: storedAudio.voiceSettings,
        audioTextHash: storedAudio.textHash,
        audioSpeed: storedAudio.speed,
        audioUpdatedAt: new Date().toISOString(),
      });
    }

    const updatedExercise = hydrateEditorExercise({
      ...exercise,
      dialogTurns: updatedTurns,
      content: serializeDialogTurns(updatedTurns),
      script: serializeDialogTurns(updatedTurns),
      dialogAudioUpdatedAt: new Date().toISOString(),
    });

    editorContent.value = updatedExercise.content;
    await saveEditorExerciseObject(updatedExercise);
    applyEditorExerciseToForm(updatedExercise);
    updateEditorForm();
    editorVoiceState.textContent =
      `Dialog-Audio gespeichert: ${createdCount} neu, ${reusedCount} bereits aktuell.`;
  } catch (error) {
    editorVoiceState.textContent = error?.message || "Dialog-Audio konnte nicht erstellt werden.";
  } finally {
    generateVoiceAudioButton.disabled = false;
  }
}

function saveEditorExercise() {
  const exercise = buildEditorExerciseFromForm();
  saveEditorExerciseObject(exercise);
}

async function saveEditorExerciseObject(exercise) {
  saveRecordingKaraokeSpeedForExerciseName(exercise.name, exercise.speed);
  savedEditorExercises = upsertEditorExercise(savedEditorExercises, exercise);
  savedEditorExercise = exercise;
  activeEditorExerciseName = exercise.name;
  persistEditorExercises();
  saveCloudEditorExercise(exercise).catch(() => {
    firebaseState.textContent = "Übung lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
  });
  renderSavedEditorExercises();
  renderPlaybackRecordingAccess(getPatientRecordings(), currentMetadata?.id || null);
  editorSavedExercises.value = exercise.name;
  saveEditorDraft();
  exerciseName.value = exercise.name;
  renderRecordingExerciseOptions(exercise.name);
  exerciseName.value = exercise.name;
  loadRecordingKaraokeSpeedForCurrentExercise();
  setupKaraokeText();
  updateEditorForm();
  updateEditorModeState();
  showEditorSaveFeedback(exercise.name);
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

function showEditorSaveFeedback(exerciseLabel) {
  window.clearTimeout(editorSaveFeedbackTimerId);
  saveEditorExerciseButton.textContent = "Gespeichert";
  saveEditorExerciseButton.classList.add("is-saved");
  saveEditorExerciseButton.disabled = true;
  editorVoiceState.textContent = "Übung gespeichert.";
  firebaseState.textContent = `Übung gespeichert und in Aufnahme auswählbar: ${exerciseLabel}`;

  editorSaveFeedbackTimerId = window.setTimeout(() => {
    saveEditorExerciseButton.textContent = "Speichern";
    saveEditorExerciseButton.classList.remove("is-saved");
    saveEditorExerciseButton.disabled = false;
  }, 1600);
}

function normalizeEditorExerciseName(name) {
  return String(name || "").trim().toLowerCase();
}

function updateEditorModeState() {
  const isEditingSaved = Boolean(activeEditorExerciseName);
  newEditorExerciseButton.classList.toggle("is-active", !isEditingSaved);
  editorSavedExercises.classList.toggle("is-editing", isEditingSaved);
  if (editorModeState) {
    editorModeState.textContent = isEditingSaved
      ? `Gespeicherte Übung bearbeiten: ${activeEditorExerciseName}`
      : "Neue Übung";
  }
}

function resetEditorForm(options = {}) {
  editorExerciseName.value = "";
  editorMode.value = options.blank ? "syllables" : "sentences";
  editorContent.value = options.blank ? "" : "";
  if (editorSentenceInput) editorSentenceInput.value = "";
  editorVoiceInstruction.value = options.blank ? "" : getDefaultEditorVoiceInstruction(editorMode.value);
  editorVoiceAudioDataUrl = "";
  editorVoiceAudioUrl = "";
  editorVoiceAudioPath = "";
  editorVoiceAudioVoiceId = "";
  editorVoiceAudioVoiceSettings = null;
  editorVoiceAudioTextHash = "";
  editorVoiceAudioUpdatedAt = "";
  editorVoicePreview.removeAttribute("src");
  editorVoicePreview.load();
  editorVoiceState.textContent = "Voice-Audio optional.";
  editorUseRepeats.checked = false;
  editorRepeats.value = "1";
  editorSpeed.value = "3";
  activeEditorExerciseName = "";
  savedEditorExercise = null;
  editorSavedExercises.value = "";
  updateEditorForm();
  updateEditorModeState();
}

function renderSavedEditorExercises() {
  const currentValue =
    editorSavedExercises.value || getEditorSelectValueForExerciseName(activeEditorExerciseName);
  editorSavedExercises.innerHTML = "";

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "Gespeicherte Übung auswählen";
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
  renderPlaybackRecordingAccess(getPatientRecordings(), currentMetadata?.id || null);
  renderSavedEditorExerciseList();
  updateEditorModeState();
}

function renderSavedEditorExerciseList() {
  if (!editorSavedExerciseList) return;

  editorSavedExerciseList.innerHTML = "";
  if (!savedEditorExercises.length) {
    editorSavedExerciseList.classList.add("is-empty");
    editorSavedExerciseList.textContent = "Keine gespeicherten Editor-Übungen.";
    return;
  }

  editorSavedExerciseList.classList.remove("is-empty");
  savedEditorExercises.forEach((exercise) => {
    const item = document.createElement("div");
    item.className = "editor-saved-exercise-item";

    const summary = document.createElement("button");
    summary.type = "button";
    summary.className = "editor-saved-exercise-open";
    summary.textContent = exercise.name || "Unbenannte Übung";
    summary.addEventListener("click", () => {
      editorSavedExercises.value = exercise.name;
      loadEditorExerciseIntoForm(exercise.name);
    });

    const deleteListButton = document.createElement("button");
    deleteListButton.type = "button";
    deleteListButton.className = "recording-delete-button editor-exercise-delete-button";
    deleteListButton.setAttribute("aria-label", `Vorlage löschen: ${exercise.name || "Übung"}`);
    deleteListButton.title = "Vorlage löschen";
    deleteListButton.addEventListener("click", async () => {
      await deleteSavedEditorExercise(exercise.name);
    });

    item.append(summary, deleteListButton);
    editorSavedExerciseList.append(item);
  });
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
    resetEditorForm({ blank: true });
    saveEditorDraft();
    return;
  }

  activeEditorExerciseName = exercise.name;
  savedEditorExercise = exercise;
  editorSavedExercises.value = exercise.name;
  applyEditorExerciseToForm(exercise);
  saveEditorDraft();
  updateEditorForm();
  updateEditorModeState();
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
  editorContent.value = getEditorContentForExercise(exercise);
  editorVoiceInstruction.value =
    exercise.voiceInstruction || getDefaultEditorVoiceInstruction(editorMode.value);
  editorVoiceAudioDataUrl = exercise.voiceAudioDataUrl || "";
  editorVoiceAudioPath = exercise.voiceAudioPath || "";
  editorVoiceAudioUrl = getGlobalVoiceAudioUrl(exercise.voiceAudioUrl, editorVoiceAudioPath);
  editorVoiceAudioVoiceId = exercise.voiceAudioVoiceId || "";
  editorVoiceAudioVoiceSettings = exercise.voiceAudioVoiceSettings || null;
  editorVoiceAudioTextHash = exercise.voiceAudioTextHash || "";
  editorVoiceAudioUpdatedAt = exercise.voiceAudioUpdatedAt || "";

  if (editorVoiceAudioUrl || editorVoiceAudioDataUrl) {
    editorVoicePreview.src = resolveAppUrl(editorVoiceAudioUrl || editorVoiceAudioDataUrl);
    editorVoiceState.textContent = editorVoiceAudioUrl
      ? "Voice-Audio in Firebase gespeichert."
      : "Voice-Audio im Entwurf vorhanden.";
  } else {
    editorVoicePreview.removeAttribute("src");
    editorVoicePreview.load();
    editorVoiceState.textContent = "Voice-Audio optional.";
  }

  editorUseRepeats.checked =
    (exercise.repeats || 1) > 1 &&
    exercise.mode !== "text" &&
    exercise.mode !== "sentences" &&
    exercise.mode !== "dialog";
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
    voiceAudioVoiceId: editorVoiceAudioVoiceId,
    voiceAudioVoiceSettings: editorVoiceAudioVoiceSettings,
    voiceAudioTextHash: editorVoiceAudioTextHash,
    voiceAudioUpdatedAt: editorVoiceAudioUpdatedAt,
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

    savedEditorExercise = legacyExercise || null;
    activeEditorExerciseName = "";
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

  const response = await fetch(getApiUrl("/api/editor-exercises"), {
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

async function deleteSavedEditorExercise(name) {
  const exercise = findSavedEditorExerciseByName(name);
  if (!exercise?.name) return;

  const confirmed = window.confirm(`Vorlage "${exercise.name}" wirklich löschen?`);
  if (!confirmed) return;

  const normalizedName = normalizeEditorExerciseName(exercise.name);
  savedEditorExercises = savedEditorExercises.filter(
    (item) => normalizeEditorExerciseName(item.name) !== normalizedName,
  );

  if (normalizeEditorExerciseName(activeEditorExerciseName) === normalizedName) {
    activeEditorExerciseName = "";
    savedEditorExercise = null;
    resetEditorForm({ blank: true });
  } else if (normalizeEditorExerciseName(savedEditorExercise?.name) === normalizedName) {
    savedEditorExercise = null;
  }

  persistEditorExercises();
  renderSavedEditorExercises();
  renderRecordingExerciseOptions();
  renderPlaybackRecordingAccess(getPatientRecordings(), currentMetadata?.id || null);
  firebaseState.textContent = `Vorlage gelöscht: ${exercise.name}`;

  deleteCloudEditorExercise(exercise).catch(() => {
    firebaseState.textContent = "Lokal gelöscht. Firebase-Löschen fehlgeschlagen.";
  });
}

async function deleteCloudEditorExercise(exercise) {
  if (!exercise?.name) return;
  const deleteTasks = [deleteDoc(doc(firestore, "editorExercises", slugify(exercise.name)))];

  collectEditorExerciseAudioPaths(exercise).forEach((path) => {
    deleteTasks.push(deleteObject(ref(storage, path)).catch(() => {}));
  });

  await Promise.all(deleteTasks);
}

function collectEditorExerciseAudioPaths(exercise) {
  const paths = new Set();
  [
    exercise.voiceAudioPath,
    exercise.demoAudioPath,
    ...(Array.isArray(exercise.demoAudioSegments)
      ? exercise.demoAudioSegments.map((segment) => segment?.path)
      : []),
    ...(Array.isArray(exercise.dialogTurns)
      ? exercise.dialogTurns.map((turn) => turn?.audioPath)
      : []),
  ].forEach((path) => {
    if (path) paths.add(path);
  });
  return [...paths];
}

async function fetchEditorExercisesFromCloud() {
  try {
    const response = await fetch(getApiUrl("/api/editor-exercises"), { cache: "no-store" });
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
    if (!Object.keys(draft).length) {
      resetEditorForm({ blank: true });
      renderSavedEditorExercises();
      updateEditorForm();
      return;
    }
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
      editorVoiceAudioPath = draft.voiceAudioPath || "";
      editorVoiceAudioUrl = getGlobalVoiceAudioUrl(draft.voiceAudioUrl, editorVoiceAudioPath);
      editorVoiceAudioDataUrl = draft.voiceAudioDataUrl || "";
      editorVoiceAudioVoiceId = draft.voiceAudioVoiceId || "";
      editorVoiceAudioVoiceSettings = draft.voiceAudioVoiceSettings || null;
      editorVoiceAudioTextHash = draft.voiceAudioTextHash || "";
      editorVoiceAudioUpdatedAt = draft.voiceAudioUpdatedAt || "";
      if (editorVoiceAudioUrl || editorVoiceAudioDataUrl) {
        editorVoicePreview.src = resolveAppUrl(editorVoiceAudioUrl || editorVoiceAudioDataUrl);
        editorVoiceState.textContent = editorVoiceAudioUrl
          ? "Voice-Audio in Firebase gespeichert."
          : "Voice-Audio im Entwurf vorhanden.";
      }
      editorUseRepeats.checked = draft.useRepeats ?? editorUseRepeats.checked;
      editorRepeats.value = draft.repeats || editorRepeats.value;
      editorSpeed.value = draft.speed || editorSpeed.value;
    }
  } catch (error) {
    resetEditorForm({ blank: true });
  }
  renderSavedEditorExercises();
  updateEditorForm();
}

function buildKaraokeTimeline(words, timing = getCurrentKaraokeTiming()) {
  let cursorSeconds = 0;
  const timeline = [];

  words.forEach((word) => {
    const isPause = word === "|";
    const isSentenceEnd = !isPause && isSentenceEndWord(word);
    const duration = isPause ? timing.pauseSeconds : getKaraokeWordSeconds(word, timing);
    const item = {
      label: isPause ? "" : word,
      isPause,
      isRepeatPause: isPause,
      start: cursorSeconds,
      end: cursorSeconds + duration,
    };
    timeline.push(item);
    cursorSeconds += duration;

    if (isSentenceEnd) {
      const pauseDuration = Math.max(
        timing.pauseSeconds,
        Number(timing.sentencePauseSeconds) || SENTENCE_END_PAUSE_SECONDS,
      );
      timeline.push({
        label: "",
        isPause: true,
        isSentenceEndPause: true,
        start: cursorSeconds,
        end: cursorSeconds + pauseDuration,
      });
      cursorSeconds += pauseDuration;
    }
  });

  return timeline;
}

function getKaraokeWordSeconds(word, timing = getCurrentKaraokeTiming()) {
  const baseSeconds = Number(timing.wordSeconds) || DEFAULT_KARAOKE_WORD_SECONDS;
  const normalizedWord = String(word || "")
    .replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "")
    .trim();
  const length = Math.max(1, normalizedWord.length);
  const lengthFactor = Math.pow(length / KARAOKE_REFERENCE_WORD_LENGTH, 0.38);
  const seconds = baseSeconds * lengthFactor;

  return Math.max(KARAOKE_MIN_WORD_SECONDS, Math.min(KARAOKE_MAX_WORD_SECONDS, seconds));
}

function isSentenceEndWord(word) {
  return /[.!?…:;]$/.test(String(word || "").trim());
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
  overlay.classList.toggle("is-text-passage-mode", timeline.some((item) => item.isTextPassage));
  overlay.classList.add("is-three-line");

  ["before", "current", "after"].forEach((lineName) => {
    const line = document.createElement("div");
    line.className = `karaoke-line karaoke-line-${lineName}`;
    overlay.append(line);
  });
}

function updateKaraokeDisplay(overlay, timeline, activeIndex) {
  if (overlay === karaokeOverlay) {
    updateRepeatCounterOverlay(timeline, activeIndex);
  }

  if (overlay.classList.contains("is-three-line")) {
    updateThreeLineKaraokeDisplay(overlay, timeline, activeIndex);
    return;
  }

  if (timeline.some((item) => item.isSentence)) {
    const boundedIndex = Math.max(0, Math.min(activeIndex, timeline.length - 1));
    overlay.classList.remove("is-context-dense");
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
  const visibleIndexes = getKaraokeContextIndexes(timeline, activeWordIndex);
  const visibleWordCount = [...visibleIndexes].filter((index) => !timeline[index]?.isPause).length;
  overlay.classList.toggle("is-context-dense", visibleWordCount >= 5);

  overlay.querySelectorAll(".karaoke-word").forEach((word) => {
    const index = Number(word.dataset.index);
    const isActive = index === activeWordIndex && !timeline[index]?.isPause;
    const isNext = index === nextWordIndex && !timeline[index]?.isPause;
    const isBefore = index < activeWordIndex && visibleIndexes.has(index);
    const isAfter = index > activeWordIndex && visibleIndexes.has(index);

    word.classList.toggle("is-active", isActive);
    word.classList.toggle("is-next", isNext);
    word.classList.toggle("is-before", isBefore);
    word.classList.toggle("is-after", isAfter);
    word.classList.toggle("is-visible", visibleIndexes.has(index));
  });
}

function getKaraokeContextIndexes(timeline, activeIndex) {
  const indexes = new Set();
  if (activeIndex == null || activeIndex < 0) return indexes;

  indexes.add(activeIndex);

  let beforeCount = 0;
  for (let index = activeIndex - 1; index >= 0 && beforeCount < KARAOKE_CONTEXT_BEFORE; index -= 1) {
    if (timeline[index]?.isPause) continue;
    indexes.add(index);
    beforeCount += 1;
  }

  let afterCount = 0;
  for (let index = activeIndex + 1; index < timeline.length && afterCount < KARAOKE_CONTEXT_AFTER; index += 1) {
    if (timeline[index]?.isPause) continue;
    indexes.add(index);
    afterCount += 1;
  }

  return indexes;
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

  if (isHoldUntilSilenceExercise()) {
    hardStopTimeoutId = window.setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        message.textContent = "Sicherheitsstopp erreicht. Aufnahme wird beendet.";
        stopRecording();
      }
    }, 90000);
    return;
  }

  if (karaokeTimeline.some((item) => item.isDialog)) {
    const hardLimitSeconds = Math.max(30, karaokeTimeline.length * SENTENCE_MAX_SECONDS);
    hardStopTimeoutId = window.setTimeout(() => {
      if (mediaRecorder?.state === "recording") {
        message.textContent = "Sicherheitsstopp erreicht. Aufnahme wird beendet.";
        stopRecording();
      }
    }, hardLimitSeconds * 1000);
    return;
  }

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
    composedRecordingStream = new MediaStream();
    mediaStream.getVideoTracks().forEach((track) => {
      composedRecordingStream.addTrack(track.clone());
    });
    composedRecordingAudioTrack = createRecordingAudioTrack() || mediaStream.getAudioTracks()[0]?.clone?.();
    if (composedRecordingAudioTrack) composedRecordingStream.addTrack(composedRecordingAudioTrack);
    recordingCanvas = null;
    recordingCanvasContext = null;
    return composedRecordingStream;
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
  composedRecordingAudioTrack = createRecordingAudioTrack() || mediaStream.getAudioTracks()[0]?.clone?.();
  if (composedRecordingAudioTrack) {
    composedRecordingStream.addTrack(composedRecordingAudioTrack);
  }

  return composedRecordingStream;
}

function createRecordingAudioTrack() {
  if (!audioContext || audioContext.state === "closed" || !audioSource) return null;

  try {
    recordingAudioDestination = audioContext.createMediaStreamDestination();
    recordingAudioMicGain = audioContext.createGain();
    recordingAudioMicGain.gain.value = 1;
    audioSource.connect(recordingAudioMicGain);
    recordingAudioMicGain.connect(recordingAudioDestination);
    return recordingAudioDestination.stream.getAudioTracks()[0] || null;
  } catch (error) {
    recordingAudioDestination = null;
    recordingAudioMicGain = null;
    return null;
  }
}

function getEditorContentForExercise(exercise) {
  const fallback = getDefaultEditorContent(exercise?.mode || editorMode.value);
  if (!exercise || exercise.mode !== "text") {
    return exercise?.content || fallback;
  }

  const savedPassages = Array.isArray(exercise.textPassages)
    ? exercise.textPassages.map((passage) => String(passage || "").trim()).filter(Boolean)
    : [];
  if (savedPassages.length) return savedPassages.join("\n");

  const rawText = exercise.rawContent || exercise.content || exercise.script || fallback;
  return splitTextPassages(rawText).join("\n");
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

  try {
    recordingAudioMicGain?.disconnect();
  } catch (error) {}

  composedRecordingStream = null;
  composedRecordingAudioTrack = null;
  recordingAudioDestination = null;
  recordingAudioMicGain = null;
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
  const gap = Number.isFinite(options.barGap) ? options.barGap : options.mode === "live" ? 4 : 3;
  const minimumBarWidth = Number.isFinite(options.minBarWidth) ? options.minBarWidth : 3;
  const barWidth = Math.max(minimumBarWidth, (waveformWidth - gap * (barCount - 1)) / barCount);
  const activeX = progress === null ? waveformWidth : waveformWidth * Math.max(0, Math.min(1, progress));

  if (options.waveformStyle === "filled") {
    drawFilledWaveformEnvelope(context, displayValues, displayLevels, {
      activeX,
      height,
      middle,
      waveformWidth,
      minVisibleHeight: options.minVisibleHeight || 7,
      mode: options.mode,
      dim: Boolean(options.dim),
    });
    if (progress !== null) {
      context.strokeStyle = "#ff7a90";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(activeX, 16);
      context.lineTo(activeX, height - 16);
      context.stroke();
    }
    if (options.levelMeter) {
      drawLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options.currentLevel || 0);
    }
    return;
  }

  if (options.waveformStyle === "line") {
    drawLineWaveformEnvelope(context, displayValues, displayLevels, {
      activeX,
      height,
      middle,
      waveformWidth,
      minVisibleHeight: options.minVisibleHeight || 8,
      lineWidth: options.lineWidth || 5,
      mode: options.mode,
      dim: Boolean(options.dim),
    });
    if (progress !== null) {
      context.strokeStyle = "#ff7a90";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(activeX, 16);
      context.lineTo(activeX, height - 16);
      context.stroke();
    }
    if (options.levelMeter) {
      drawLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options.currentLevel || 0);
    }
    return;
  }

  const usedWidth = barCount * barWidth + (barCount - 1) * gap;
  const startX = options.align === "right" ? waveformWidth - usedWidth : 0;

  displayValues.forEach((value, index) => {
    const x = startX + index * (barWidth + gap);
    const colorLevel = displayLevels[index] ?? value;
    const isPause = isWaveformPause(colorLevel);
    const normalized = Math.max(0, Math.min(1, value / 100));
    const barHeight = normalized <= 0
      ? (isPause ? options.minPauseBarHeight || 3 : 0)
      : Math.max(
          isPause ? options.minPauseBarHeight || 3 : options.minSpeechBarHeight || 2,
          normalized * (height - 38),
        );
    const isPlayed = x <= activeX;

    context.fillStyle = getWaveformBarColor(colorLevel, {
      dim: Boolean(options.dim),
      played: options.mode !== "playback" || isPlayed,
    });
    if (barHeight > 0) {
      roundRect(context, x, middle - barHeight / 2, barWidth, barHeight, Math.min(7, barWidth / 2));
      context.fill();
    }
  });

  if (progress !== null) {
    context.strokeStyle = "#ff7a90";
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

function drawFilledWaveformEnvelope(context, values, levels, options = {}) {
  const count = values.length;
  const width = options.waveformWidth || 1;
  const height = options.height || 1;
  const middle = options.middle || height / 2;
  const activeX = options.activeX ?? width;
  const step = count > 1 ? width / (count - 1) : width;

  const getHeight = (value, level) => {
    const isPause = isWaveformPause(level);
    const normalized = Math.max(0, Math.min(1, value / 100));
    if (normalized <= 0) return isPause ? 2 : 0;
    const visibleMinimum = isPause ? 3 : options.minVisibleHeight;
    return Math.max(visibleMinimum, normalized * (height - 34));
  };

  if (count === 1) {
    const barHeight = getHeight(values[0], levels[0]);
    context.fillStyle = getWaveformBarColor(levels[0], { dim: options.dim, played: true });
    roundRect(context, 0, middle - barHeight / 2, width, barHeight, 5);
    context.fill();
    return;
  }

  for (let index = 0; index < count - 1; index += 1) {
    const x1 = index * step;
    const x2 = (index + 1) * step;
    const level = levels[index] ?? values[index];
    const h1 = getHeight(values[index], level);
    const h2 = getHeight(values[index + 1], levels[index + 1] ?? values[index + 1]);
    const isPlayed = x1 <= activeX;

    context.fillStyle = getWaveformBarColor(level, {
      dim: Boolean(options.dim),
      played: options.mode !== "playback" || isPlayed,
    });
    context.beginPath();
    context.moveTo(x1, middle - h1 / 2);
    context.lineTo(x2, middle - h2 / 2);
    context.lineTo(x2, middle + h2 / 2);
    context.lineTo(x1, middle + h1 / 2);
    context.closePath();
    context.fill();
  }
}

function drawLineWaveformEnvelope(context, values, levels, options = {}) {
  const count = values.length;
  const width = options.waveformWidth || 1;
  const height = options.height || 1;
  const middle = options.middle || height / 2;
  const activeX = options.activeX ?? width;
  const step = count > 1 ? width / (count - 1) : width;
  const lineWidth = options.lineWidth || 5;

  const getHeight = (value, level) => {
    const isPause = isWaveformPause(level);
    const normalized = Math.max(0, Math.min(1, value / 100));
    if (normalized <= 0) return isPause ? 0 : 0;
    return Math.max(isPause ? 0 : options.minVisibleHeight, normalized * (height - 44));
  };

  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.lineWidth = lineWidth;

  for (let index = 0; index < count - 1; index += 1) {
    const x1 = index * step;
    const x2 = (index + 1) * step;
    const level = levels[index] ?? values[index];
    const nextLevel = levels[index + 1] ?? values[index + 1];
    const h1 = getHeight(values[index], level);
    const h2 = getHeight(values[index + 1], nextLevel);
    const isPlayed = x1 <= activeX;
    const color = getWaveformBarColor(Math.max(level, nextLevel), {
      dim: Boolean(options.dim),
      played: options.mode !== "playback" || isPlayed,
    });

    if (h1 <= 0 && h2 <= 0) continue;
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(x1, middle - h1 / 2);
    context.lineTo(x2, middle - h2 / 2);
    context.stroke();
    context.beginPath();
    context.moveTo(x1, middle + h1 / 2);
    context.lineTo(x2, middle + h2 / 2);
    context.stroke();
  }

  context.restore();
}

function getWaveformColorLevels(values, displayValues, waveformWidth, options = {}) {
  const levelValues = Array.isArray(options.levelValues) && options.levelValues.length
    ? options.levelValues
    : values;

  if (options.mode === "playback") {
    return resamplePlaybackValues(levelValues, waveformWidth, options);
  }

  return levelValues.slice(-displayValues.length);
}

function getWaveformBarColor(level, options = {}) {
  const isPause = isWaveformPause(level);

  if (!options.played) {
    return isPause ? "rgba(56, 193, 114, 0.34)" : "rgba(246, 180, 75, 0.34)";
  }

  if (options.dim) {
    return isPause ? "rgba(56, 193, 114, 0.62)" : "rgba(246, 180, 75, 0.74)";
  }

  return isPause ? "#38c172" : "#f6b44b";
}

function isWaveformPause(level) {
  return Number(level || 0) <= SENTENCE_SILENCE_THRESHOLD;
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

  const noiseFloor = options.subtractFloor ? getWaveformNoiseFloor(validValues, options) : 0;
  const adjustedValues = validValues.map((value) => Math.max(0, value - noiseFloor));
  const sortedValues = [...adjustedValues].sort((a, b) => a - b);
  const percentileIndex = Math.max(0, Math.floor((sortedValues.length - 1) * 0.88));
  const minimumPeak = Number.isFinite(options.minLocalPeak) ? options.minLocalPeak : 18;
  const localPeak = Math.max(minimumPeak, sortedValues[percentileIndex], Math.max(...adjustedValues) * 0.62);
  const visualCeiling = options.visualCeiling || WAVEFORM_VISUAL_CEILING;
  const dynamicRange = options.dynamicRange || WAVEFORM_DYNAMIC_RANGE;
  const externalCompress = options.compress || 1;
  const shapePower = Number.isFinite(options.shapePower) ? options.shapePower : 0.72;

  return adjustedValues.map((value) => {
    const relative = Math.min(value, localPeak * dynamicRange) / (localPeak * dynamicRange);
    const shaped = Math.pow(relative, shapePower);
    return Math.min(visualCeiling, shaped * visualCeiling * externalCompress);
  });
}

function getWaveformNoiseFloor(values, options = {}) {
  if (!values.length) return 0;
  const sortedValues = [...values].sort((a, b) => a - b);
  const percentile = Number.isFinite(options.floorPercentile) ? options.floorPercentile : 0.18;
  const index = Math.max(0, Math.min(sortedValues.length - 1, Math.floor((sortedValues.length - 1) * percentile)));
  return Math.max(0, sortedValues[index] || 0);
}

function resamplePlaybackValues(values, waveformWidth, options = {}) {
  if (!values.length || !options.durationSeconds) return values;

  const pixelsPerBar = Number.isFinite(options.pixelsPerBar) ? options.pixelsPerBar : 5;
  const targetCount = Math.max(40, Math.min(values.length, Math.round(waveformWidth / pixelsPerBar)));
  if (targetCount >= values.length) return values;

  const bucketSize = values.length / targetCount;
  const resampled = [];
  const useAverage = options.resampleMode === "average";
  const useRms = options.resampleMode === "rms";

  for (let bucket = 0; bucket < targetCount; bucket += 1) {
    const start = Math.floor(bucket * bucketSize);
    const end = Math.max(start + 1, Math.ceil((bucket + 1) * bucketSize));
    let maxValue = 0;
    let sum = 0;
    let sumSquares = 0;
    let count = 0;

    for (let index = start; index < end && index < values.length; index += 1) {
      const value = Number(values[index]) || 0;
      maxValue = Math.max(maxValue, value);
      sum += value;
      sumSquares += value * value;
      count += 1;
    }

    if (useRms) {
      resampled.push(Math.sqrt(sumSquares / Math.max(1, count)));
    } else {
      resampled.push(useAverage ? sum / Math.max(1, count) : maxValue);
    }
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

function drawFrequencyTimeline(canvas, pitchValues, strengthValues = [], options = {}) {
  const context = canvas.getContext("2d");
  resizeCanvasToDisplay(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const padding = 12 * pixelRatio;
  const values = options.limit === false ? pitchValues : pitchValues.slice(-MAX_VISIBLE_SAMPLES);
  const strengths = options.limit === false ? strengthValues.slice(0, values.length) : strengthValues.slice(-values.length);
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

  if (Number.isFinite(options.progress)) {
    const x = padding + Math.max(0, Math.min(1, options.progress)) * (width - padding * 2);
    context.strokeStyle = "#ff7a90";
    context.lineWidth = 3 * pixelRatio;
    context.beginPath();
    context.moveTo(x, padding);
    context.lineTo(x, height - padding);
    context.stroke();
  }

  drawTimelineRangeMarkers(context, {
    start: Number.isFinite(options.rangeStart) ? options.rangeStart : null,
    end: Number.isFinite(options.rangeEnd) ? options.rangeEnd : null,
    width,
    height,
    left: padding,
    right: width - padding,
  });
}

function updateThreeLineKaraokeDisplay(overlay, timeline, activeIndex) {
  const lines = getThreeLineKaraokeLabels(timeline, activeIndex);
  overlay.classList.toggle("is-context-dense", Object.values(lines).some((line) => line.length > 18));
  overlay.classList.toggle("is-dialog-mode", timeline.some((item) => item.isDialog));
  overlay.classList.toggle("is-text-passage-mode", timeline.some((item) => item.isTextPassage));
  overlay.classList.toggle("is-forward-only", !timeline.some((item) => item.isSentence));

  [
    [".karaoke-line-before", lines.before],
    [".karaoke-line-current", lines.current],
    [".karaoke-line-after", lines.after],
  ].forEach(([selector, text]) => {
    const line = overlay.querySelector(selector);
    if (!line) return;
    updateAnimatedKaraokeLine(line, text, timeline.some((item) => item.isDialog));
    line.classList.toggle("is-empty", !text);
  });
}

function updateAnimatedKaraokeLine(line, text, isDialog = false) {
  const nextText = String(text || "");
  if (line.dataset.text === nextText) return;

  line.dataset.text = nextText;
  line.classList.remove("is-entering");
  renderKaraokeLineContent(line, nextText, isDialog);
  if (!nextText) return;

  line.getBoundingClientRect();
  line.classList.add("is-entering");
}

function renderKaraokeLineContent(line, text, isDialog = false) {
  line.textContent = "";
  if (!text) {
    line.textContent = " ";
    return;
  }

  const dialogMatch = isDialog ? String(text).match(/^([^:]+:\s*)(.+)$/) : null;
  if (!dialogMatch) {
    line.textContent = text;
    return;
  }

  const speaker = document.createElement("span");
  speaker.className = "karaoke-speaker-label";
  speaker.textContent = dialogMatch[1];

  const spokenText = document.createElement("span");
  spokenText.className = "karaoke-spoken-text";
  spokenText.textContent = dialogMatch[2];

  line.append(speaker, spokenText);
}

function getThreeLineKaraokeLabels(timeline, activeIndex) {
  if (!timeline.length) return { before: "", current: "", after: "" };

  const boundedIndex = Math.max(0, Math.min(activeIndex, timeline.length - 1));
  if (timeline.some((item) => item.isTextPassage)) {
    const currentIndex = timeline[boundedIndex]?.isPause
      ? getPreviousSpokenIndex(timeline, boundedIndex) ?? getNextSpokenIndex(timeline, boundedIndex) ?? boundedIndex
      : boundedIndex;
    const nextIndex = getNextSpokenIndex(timeline, currentIndex);
    const followingIndex = nextIndex == null ? null : getNextSpokenIndex(timeline, nextIndex);
    return {
      before: getTimelineLabelAt(timeline, currentIndex),
      current: getTimelineLabelAt(timeline, nextIndex),
      after: getTimelineLabelAt(timeline, followingIndex),
    };
  }

  if (timeline.some((item) => item.isSentence)) {
    const currentIndex = timeline[boundedIndex]?.isPause
      ? getPreviousSpokenIndex(timeline, boundedIndex) ?? getNextSpokenIndex(timeline, boundedIndex) ?? boundedIndex
      : boundedIndex;
    return {
      before: getTimelineLabelAt(timeline, getPreviousSpokenIndex(timeline, currentIndex)),
      current: getTimelineLabelAt(timeline, currentIndex),
      after: getUpcomingKaraokeLabel(timeline, currentIndex, 2),
    };
  }

  const activeWordIndex = timeline[boundedIndex]?.isPause
    ? getPreviousSpokenIndex(timeline, boundedIndex) ?? getNextSpokenIndex(timeline, boundedIndex) ?? boundedIndex
    : boundedIndex;
  const spokenIndexes = timeline
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !item.isPause);
  const lineGroups = buildKaraokeLineGroups(spokenIndexes);
  const activeGroupIndex = Math.max(
    0,
    lineGroups.findIndex((group) =>
      group.some(({ index }) => index === activeWordIndex),
    ),
  );

  return {
    before: getSpokenGroupLabel(lineGroups[activeGroupIndex]),
    current: getSpokenGroupLabel(lineGroups[activeGroupIndex + 1]),
    after: getSpokenGroupLabel(lineGroups[activeGroupIndex + 2]),
  };
}

function getUpcomingKaraokeLabel(timeline, activeIndex, count = 2) {
  const labels = [];
  let index = activeIndex;
  while (labels.length < count) {
    index = getNextSpokenIndex(timeline, index);
    if (index == null) break;
    const label = getTimelineLabelAt(timeline, index);
    if (label) labels.push(label);
  }
  return labels.join(" ");
}

function buildKaraokeLineGroups(spokenIndexes) {
  const groups = [];
  let group = [];
  let charCount = 0;
  const maxWords = 4;
  const maxChars = 28;

  spokenIndexes.forEach((entry) => {
    const word = String(entry.item?.label || "");
    const nextCharCount = charCount + (group.length ? 1 : 0) + word.length;
    if (group.length && (nextCharCount > maxChars || group.length >= maxWords)) {
      groups.push(group);
      group = [];
      charCount = 0;
    }

    group.push(entry);
    charCount += (group.length > 1 ? 1 : 0) + word.length;

    if (isSentenceEndWord(word)) {
      groups.push(group);
      group = [];
      charCount = 0;
    }
  });

  if (group.length) groups.push(group);
  return groups;
}

function getSpokenGroupLabel(group) {
  if (!Array.isArray(group) || !group.length) return "";
  return group
    .map(({ item }) => item.label)
    .filter(Boolean)
    .join(" ");
}

function getTimelineLabelAt(timeline, index) {
  if (index == null || index < 0 || index >= timeline.length) return "";
  return timeline[index]?.label || "";
}

function applyRepeatMetadata(timeline, repeatTotal = 1) {
  const total = Math.max(1, Number(repeatTotal) || 1);
  if (total <= 1) return timeline;

  let repeatIndex = 1;
  timeline.forEach((item) => {
    item.repeatIndex = repeatIndex;
    item.repeatTotal = total;
    if (item.isRepeatPause) {
      repeatIndex = Math.min(total, repeatIndex + 1);
    }
  });
  return timeline;
}

function updateRepeatCounterOverlay(timeline, activeIndex) {
  if (!repeatCounterOverlay) return;

  const visibleItem =
    timeline[activeIndex] ||
    timeline[getPreviousSpokenIndex(timeline, activeIndex)] ||
    timeline[getNextSpokenIndex(timeline, activeIndex)];
  const total = Number(visibleItem?.repeatTotal || 1);

  repeatCounterOverlay.classList.toggle("is-hidden", total <= 1);
  if (total <= 1) return;

  const repeatIndex = Math.max(1, Math.min(total, Number(visibleItem?.repeatIndex || 1)));
  repeatCounterOverlay.textContent = `${repeatIndex} / ${total}`;
}

function drawVolumeLevelTimeline(canvas, values, options = {}) {
  const context = canvas.getContext("2d");
  resizeCanvasToDisplay(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const meterWidth = Math.max(10 * pixelRatio, 10);
  const meterGap = Math.max(6 * pixelRatio, 6);
  const graphWidth = Math.max(1, width - meterWidth - meterGap);
  const padding = 10 * pixelRatio;
  const graphHeight = Math.max(1, height - padding * 2);
  const numericValues = values.map((value) => Math.max(0, Number(value) || 0));
  const progress = Number.isFinite(options.progress) ? Math.max(0, Math.min(1, options.progress)) : null;
  const currentLevel = Math.max(0, Math.min(100, Number(options.currentLevel) || 0));

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#101820";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.12)";
  context.lineWidth = 1 * pixelRatio;
  [0.25, 0.5, 0.75].forEach((ratio) => {
    const y = padding + graphHeight * ratio;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(graphWidth, y);
    context.stroke();
  });

  if (!numericValues.length) {
    drawLevelMeter(context, width - meterWidth, 0, meterWidth, height, currentLevel);
    return;
  }

  const displayValues = resamplePlaybackValues(numericValues, graphWidth, {
    durationSeconds: options.durationSeconds || 1,
    pixelsPerBar: 4,
    resampleMode: "rms",
  });
  const noiseFloor = getWaveformNoiseFloor(displayValues, {
    subtractFloor: true,
    floorPercentile: 0.22,
  });
  const normalizedValues = displayValues.map((value) => {
    const cleaned = Math.max(0, value - noiseFloor);
    return Math.max(0, Math.min(100, Math.pow(cleaned / 100, 0.94) * 82));
  });
  const count = Math.max(1, normalizedValues.length);
  const gap = Math.min(2 * pixelRatio, (graphWidth / count) * 0.28);
  const barWidth = Math.max(1 * pixelRatio, (graphWidth - gap * Math.max(0, count - 1)) / count);
  normalizedValues.forEach((value, index) => {
    const level = Math.max(0, Math.min(100, value));
    const x = index * (barWidth + gap);
    const fillHeight = Math.max(level > 0 ? 4 * pixelRatio : 0, (level / 100) * graphHeight);
    const y = padding + graphHeight - fillHeight;

    context.fillStyle = getVolumeHubColor(level);
    roundRect(context, x, y, barWidth, fillHeight, Math.min(5 * pixelRatio, barWidth / 2));
    context.fill();
  });

  if (progress !== null) {
    const x = progress * graphWidth;
    context.strokeStyle = "#ffffff";
    context.lineWidth = 3 * pixelRatio;
    context.beginPath();
    context.moveTo(x, padding);
    context.lineTo(x, height - padding);
    context.stroke();
  }

  drawTimelineRangeMarkers(context, {
    start: Number.isFinite(options.rangeStart) ? options.rangeStart : null,
    end: Number.isFinite(options.rangeEnd) ? options.rangeEnd : null,
    width,
    height,
    left: 0,
    right: graphWidth,
  });
  drawLevelMeter(context, width - meterWidth, 0, meterWidth, height, currentLevel);
}

function drawTimelineRangeMarkers(context, options = {}) {
  const start = options.start;
  const end = options.end;
  if (start === null || end === null) return;

  const left = Number(options.left) || 0;
  const right = Number(options.right) || Number(options.width) || 1;
  const height = Number(options.height) || 1;
  const startX = left + Math.max(0, Math.min(1, start)) * (right - left);
  const endX = left + Math.max(0, Math.min(1, end)) * (right - left);

  context.save();
  context.strokeStyle = "#ffd166";
  context.lineWidth = 4;
  context.shadowColor = "rgba(255, 91, 91, 0.55)";
  context.shadowBlur = 6;
  context.beginPath();
  context.moveTo(startX, 7);
  context.lineTo(startX, height - 7);
  context.moveTo(endX, 7);
  context.lineTo(endX, height - 7);
  context.stroke();
  context.restore();
}

function getVolumeHubColor(level) {
  if (level >= 88) return "#e1495b";
  if (level >= 64) return "#f6b44b";
  return "#38c172";
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
  setPlayPauseButtonState("play");
  playbackSeek.value = "0";
  playbackTimeLabel.textContent = `00:00 / ${formatTime(metadata.dauerSekunden || 0)}`;

  drawWaveform(playbackWaveform, metadata.amplituden, {
    mode: "playback",
    progress: 0,
    durationSeconds: metadata.dauerSekunden,
    compress: 1.7,
    dynamicRange: 0.54,
    minLocalPeak: 0.9,
    visualCeiling: 100,
    shapePower: 0.42,
    dim: true,
    levelValues: metadata.lautstaerkePegel || metadata.lautstaerken || metadata.amplituden,
    pixelsPerBar: 2.4,
    barGap: 1,
    minBarWidth: 2,
    minSpeechBarHeight: 26,
    minPauseBarHeight: 2,
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
  const dialogTurns =
    metadata.uebungKonfiguration?.typ === "dialog"
      ? (Array.isArray(metadata.uebungKonfiguration.dialog)
          ? metadata.uebungKonfiguration.dialog
          : parseDialogTurns(metadata.uebungKonfiguration.inhalt || script))
      : [];
  const sentences =
    metadata.uebungKonfiguration?.typ === "sentences"
      ? (metadata.uebungKonfiguration.saetze?.length
          ? metadata.uebungKonfiguration.saetze
          : script.split(/\s*\|\s*|\n+/))
          .map((sentence) => String(sentence).trim())
          .filter(Boolean)
      : [];
  const textPassages =
    metadata.uebungKonfiguration?.typ === "long_text" ||
    (metadata.uebungKonfiguration?.typ === "text" &&
      Array.isArray(metadata.uebungKonfiguration.textAbschnitte) &&
      metadata.uebungKonfiguration.textAbschnitte.length)
      ? (Array.isArray(metadata.uebungKonfiguration.textAbschnitte) &&
          metadata.uebungKonfiguration.textAbschnitte.length
          ? metadata.uebungKonfiguration.textAbschnitte
          : splitTextPassages(metadata.uebungKonfiguration.inhalt || script))
      : [];

  const playbackSentenceSeconds = sentences.length
    ? Math.max(1.4, (Number(metadata.dauerSekunden) || sentences.length * 3) / sentences.length)
    : SENTENCE_MAX_SECONDS;
  const playbackDialogSeconds = dialogTurns.length
    ? Math.max(1.4, (Number(metadata.dauerSekunden) || dialogTurns.length * 3) / dialogTurns.length)
    : SENTENCE_MAX_SECONDS;

  playbackKaraokeTimeline = dialogTurns.length
    ? buildDialogTimeline(dialogTurns.map((turn) => normalizeDialogTurn(turn)), playbackDialogSeconds)
    : sentences.length
    ? buildSentenceTimeline(sentences, playbackSentenceSeconds)
    : textPassages.length
    ? buildTextPassageTimeline(textPassages, getPlaybackKaraokeTiming(metadata))
    : applyRepeatMetadata(
        buildKaraokeTimeline(
          script.split(/\s+/).filter(Boolean),
          getPlaybackKaraokeTiming(metadata),
        ),
        metadata.uebungKonfiguration?.wiederholungen || 1,
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
      sentencePauseSeconds: Number(config.satzPauseSekunden) || SENTENCE_END_PAUSE_SECONDS,
    };
  }

  if (config?.typ === "text") {
    return {
      wordSeconds: Number(config.sekundenProWort) || DEFAULT_KARAOKE_WORD_SECONDS,
      pauseSeconds: Number(config.pauseSekunden) || DEFAULT_KARAOKE_PAUSE_SECONDS,
      sentencePauseSeconds: Number(config.satzPauseSekunden) || SENTENCE_END_PAUSE_SECONDS,
    };
  }

  if (config?.typ === "silben") {
    return {
      wordSeconds: Number(config.sekundenProSilbe) || DEFAULT_KARAOKE_WORD_SECONDS,
      pauseSeconds: Number(config.pauseSekunden) || DEFAULT_KARAOKE_PAUSE_SECONDS,
      sentencePauseSeconds: Number(config.satzPauseSekunden) || SENTENCE_END_PAUSE_SECONDS,
    };
  }

  return {
    wordSeconds: DEFAULT_KARAOKE_WORD_SECONDS,
    pauseSeconds: DEFAULT_KARAOKE_PAUSE_SECONDS,
    sentencePauseSeconds: SENTENCE_END_PAUSE_SECONDS,
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
    setPlayPauseButtonState("loading");
    recordingPlayer.muted = false;
    recordingPlayer.defaultMuted = false;
    recordingPlayer.volume = 1;
    await ensurePlaybackAudioBoost();
    if (recordingPlayer.ended) recordingPlayer.currentTime = 0;

    await waitForPlaybackReady(recordingPlayer, 1600);

    recordingPlayer.play().catch(() => {
      message.textContent = "Zum Abspielen bitte noch einmal tippen.";
    }).finally(() => {
      playPauseButton.disabled = false;
      setPlayPauseButtonState(recordingPlayer.paused ? "play" : "pause");
    });
  } else {
    recordingPlayer.pause();
  }
}

function setPlayPauseButtonState(state) {
  if (!playPauseButton) return;
  const normalizedState = ["play", "pause", "loading"].includes(state) ? state : "play";
  playPauseButton.dataset.state = normalizedState;
  playPauseButton.setAttribute(
    "aria-label",
    normalizedState === "pause"
      ? "Pausieren"
      : normalizedState === "loading"
        ? "Wiedergabe lädt"
        : "Abspielen",
  );
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
  const progress =
    forcedProgress ?? mediaTimeToAnalysisProgress(recordingPlayer.currentTime || 0, currentMetadata);
  const syncedCurrentTime = duration ? progress * duration : 0;

  drawWaveform(playbackWaveform, playbackValues, {
    mode: "playback",
    progress,
    durationSeconds: duration,
    compress: 1.7,
    dynamicRange: 0.54,
    minLocalPeak: 0.9,
    visualCeiling: 100,
    shapePower: 0.42,
    dim: true,
    levelValues: currentMetadata.lautstaerkePegel || currentMetadata.lautstaerken || playbackValues,
    pixelsPerBar: 2.4,
    barGap: 1,
    minBarWidth: 2,
    minSpeechBarHeight: 26,
    minPauseBarHeight: 2,
  });

  playbackSeek.value = String(Math.round(progress * 1000));
  playbackTimeLabel.textContent = `${formatTime(syncedCurrentTime || 0)} / ${formatTime(duration || 0)}`;
  updateKaraokeDisplayAtTime(playbackKaraokeOverlay, playbackKaraokeTimeline, syncedCurrentTime || 0);
  syncStatisticsToPlayback(progress);
}

function syncStatisticsToPlayback(progress) {
  if (!currentMetadata || selectedAnalysisRecordingId !== currentMetadata.id) return;

  selectedAnalysisPosition = Math.max(0, Math.min(1, Number(progress) || 0));
  const now = performance.now();
  if (now - lastStatisticsPlaybackSyncAt < 160) {
    syncAnalysisPositionSlider();
    return;
  }

  lastStatisticsPlaybackSyncAt = now;
  renderAudioAnalysis(currentMetadata);
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

function getPlaybackDurations(metadata = currentMetadata) {
  const analysisDuration = Number(metadata?.dauerSekunden || 0);
  const mediaDuration = Number.isFinite(recordingPlayer.duration) && recordingPlayer.duration > 0
    ? recordingPlayer.duration
    : analysisDuration;

  return {
    analysisDuration,
    mediaDuration,
  };
}

function analysisProgressToMediaTime(progress, metadata = currentMetadata) {
  const { analysisDuration, mediaDuration } = getPlaybackDurations(metadata);
  const safeProgress = Math.max(0, Math.min(1, Number(progress) || 0));
  if (!analysisDuration || !mediaDuration) return 0;
  return Math.max(0, Math.min(mediaDuration, safeProgress * mediaDuration));
}

function mediaTimeToAnalysisProgress(mediaTime, metadata = currentMetadata) {
  const { analysisDuration, mediaDuration } = getPlaybackDurations(metadata);
  const safeMediaTime = Math.max(0, Number(mediaTime) || 0);
  if (!analysisDuration && !mediaDuration) return 0;
  if (!mediaDuration) return Math.max(0, Math.min(1, safeMediaTime / analysisDuration));
  return Math.max(0, Math.min(1, safeMediaTime / mediaDuration));
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
  if (averageVolume) averageVolume.textContent = String(stats.average);
  if (maxVolume) maxVolume.textContent = String(stats.maximum);
  if (sampleCount) sampleCount.textContent = String((metadata.amplituden || []).length);
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
  const defaultVoiceId = "21m00Tcm4TlvDq8ikWAM";
  return {
    activeVoiceKey: "standard",
    voiceId: defaultVoiceId,
    voices: [
      {
        key: "standard",
        name: "Standard",
        gender: "female",
        voiceId: defaultVoiceId,
      },
    ],
    stability: 58,
    similarity: 82,
    style: 12,
    speakerBoost: true,
  };
}

function getElevenLabsSettings() {
  try {
    const settings = {
      ...getDefaultElevenLabsSettings(),
      ...JSON.parse(localStorage.getItem(ELEVENLABS_SETTINGS_KEY) || "{}"),
    };
    return normalizeElevenLabsSettings(settings);
  } catch (error) {
    return getDefaultElevenLabsSettings();
  }
}

function normalizeElevenLabsSettings(settings) {
  const fallback = getDefaultElevenLabsSettings();
  const voices = Array.isArray(settings.voices) ? settings.voices : [];
  const normalizedVoices = voices
    .map((voice) => ({
      key: String(voice.key || voice.name || voice.voiceId || "").trim(),
      name: String(voice.name || "Stimme").trim(),
      gender: ["male", "female", "neutral"].includes(voice.gender) ? voice.gender : "neutral",
      voiceId: String(voice.voiceId || "").trim(),
    }))
    .filter((voice) => voice.voiceId);

  if (!normalizedVoices.length) {
    normalizedVoices.push({
      ...fallback.voices[0],
      voiceId: String(settings.voiceId || fallback.voiceId).trim(),
    });
  }

  const activeVoiceKey = normalizedVoices.some((voice) => voice.key === settings.activeVoiceKey)
    ? settings.activeVoiceKey
    : normalizedVoices[0].key;
  const activeVoice = normalizedVoices.find((voice) => voice.key === activeVoiceKey) || normalizedVoices[0];

  return {
    ...settings,
    activeVoiceKey,
    voices: normalizedVoices,
    voiceId: activeVoice.voiceId || settings.voiceId || fallback.voiceId,
  };
}

function getElevenLabsRequestSettings() {
  const settings = getElevenLabsSettings();
  const activeVoice = getActiveElevenLabsVoice(settings);
  return {
    voiceId: String(activeVoice?.voiceId || settings.voiceId || "").trim() || getDefaultElevenLabsSettings().voiceId,
    voiceSettings: {
      stability: clampPercent(settings.stability) / 100,
      similarity_boost: clampPercent(settings.similarity) / 100,
      style: clampPercent(settings.style) / 100,
      use_speaker_boost: Boolean(settings.speakerBoost),
    },
  };
}

function getElevenLabsRequestSettingsFromControls() {
  return {
    voiceId:
      String(settingsVoiceId?.value || "").trim() ||
      getElevenLabsRequestSettings().voiceId,
    voiceSettings: {
      stability: clampPercent(settingsVoiceStability?.value) / 100,
      similarity_boost: clampPercent(settingsVoiceSimilarity?.value) / 100,
      style: clampPercent(settingsVoiceStyle?.value) / 100,
      use_speaker_boost: Boolean(settingsSpeakerBoost?.checked),
    },
  };
}

function getDefaultChatGptSettings() {
  return {
    enabled: false,
    apiKey: "",
    model: "gpt-5",
    systemPrompt:
      "Erstelle eine kurze, freundliche logopädische Voice-Instruktion auf Deutsch. Sprich den Patienten direkt an. Maximal drei kurze Sätze. Keine Markdown-Zeichen.",
  };
}

function getChatGptSettings() {
  try {
    return {
      ...getDefaultChatGptSettings(),
      ...JSON.parse(localStorage.getItem(CHATGPT_SETTINGS_KEY) || "{}"),
    };
  } catch (error) {
    return getDefaultChatGptSettings();
  }
}

function clampPercent(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return 0;
  return Math.max(0, Math.min(100, Math.round(numericValue)));
}

function loadSettingsControls() {
  const elevenSettings = getElevenLabsSettings();
  const chatGptSettings = getChatGptSettings();
  renderVoiceProfileSelect(elevenSettings);
  loadSelectedVoiceProfileIntoControls(elevenSettings.activeVoiceKey, { settings: elevenSettings, silent: true });
  if (settingsVoiceStability) settingsVoiceStability.value = String(clampPercent(elevenSettings.stability));
  if (settingsVoiceSimilarity) settingsVoiceSimilarity.value = String(clampPercent(elevenSettings.similarity));
  if (settingsVoiceStyle) settingsVoiceStyle.value = String(clampPercent(elevenSettings.style));
  if (settingsSpeakerBoost) settingsSpeakerBoost.checked = Boolean(elevenSettings.speakerBoost);
  if (settingsChatGptEnabled) settingsChatGptEnabled.checked = Boolean(chatGptSettings.enabled);
  if (settingsChatGptApiKey) settingsChatGptApiKey.value = chatGptSettings.apiKey || "";
  if (settingsChatGptModel) settingsChatGptModel.value = chatGptSettings.model || getDefaultChatGptSettings().model;
  if (settingsChatGptPrompt) settingsChatGptPrompt.value = chatGptSettings.systemPrompt || getDefaultChatGptSettings().systemPrompt;
  if (settingsSensitivity) settingsSensitivity.value = sensitivitySlider.value;
  if (settingsPlaybackVolume) settingsPlaybackVolume.value = playbackVolumeSlider.value;
  renderSettingsControls();
}

function renderSettingsControls() {
  const elevenSettings = getElevenLabsSettings();
  const activeVoice = getActiveElevenLabsVoice(elevenSettings);
  if (settingsVoiceSelect) settingsVoiceSelect.value = elevenSettings.activeVoiceKey || "";
  const isCreatingVoice = settingsVoiceSelect?.value === "";
  if (!isCreatingVoice && settingsVoiceName && document.activeElement !== settingsVoiceName) settingsVoiceName.value = activeVoice?.name || "";
  if (!isCreatingVoice && settingsVoiceGender && document.activeElement !== settingsVoiceGender) settingsVoiceGender.value = activeVoice?.gender || "neutral";
  if (!isCreatingVoice && settingsVoiceId && document.activeElement !== settingsVoiceId) settingsVoiceId.value = activeVoice?.voiceId || elevenSettings.voiceId || "";
  updateVoiceIdHint(settingsVoiceId?.value || activeVoice?.voiceId || elevenSettings.voiceId || "");
  if (settingsDeleteVoiceButton) settingsDeleteVoiceButton.disabled = isCreatingVoice || (elevenSettings.voices || []).length <= 1;
  if (settingsVoiceStabilityValue) settingsVoiceStabilityValue.textContent = `${settingsVoiceStability?.value || 0}%`;
  if (settingsVoiceSimilarityValue) settingsVoiceSimilarityValue.textContent = `${settingsVoiceSimilarity?.value || 0}%`;
  if (settingsVoiceStyleValue) settingsVoiceStyleValue.textContent = `${settingsVoiceStyle?.value || 0}%`;
  if (settingsSensitivityValue) settingsSensitivityValue.textContent = formatSensitivityLabel(sensitivitySlider.value);
  if (settingsPlaybackVolumeValue) settingsPlaybackVolumeValue.textContent = `${playbackVolumeSlider.value}%`;
  playbackGainPresetButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.playbackGain === String(playbackVolumeSlider.value));
  });
  if (settingsState) settingsState.textContent = "Einstellungen lokal gespeichert.";
}

function renderVoiceProfileSelect(settings = getElevenLabsSettings()) {
  if (!settingsVoiceSelect) return;

  const activeKey = settings.voices.some((voice) => voice.key === settings.activeVoiceKey)
    ? settings.activeVoiceKey
    : settings.voices[0]?.key || "";
  settingsVoiceSelect.innerHTML = "";
  const newOption = document.createElement("option");
  newOption.value = "";
  newOption.textContent = "Neue Stimme anlegen";
  settingsVoiceSelect.append(newOption);

  settings.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.key;
    option.dataset.voiceId = voice.voiceId;
    option.dataset.voiceName = voice.name;
    option.dataset.voiceGender = voice.gender;
    option.textContent = formatVoiceProfileOptionLabel(voice);
    settingsVoiceSelect.append(option);
  });
  settingsVoiceSelect.value = activeKey;
}

function formatVoiceProfileOptionLabel(voice) {
  const shortId = String(voice.voiceId || "").slice(-6) || "ohne ID";
  return `${voice.name} · ${getVoiceGenderLabel(voice.gender)} · ${shortId}`;
}

function activateSelectedVoiceProfileFromDropdown() {
  const selectedOption = settingsVoiceSelect?.selectedOptions?.[0];
  const selectedKey = settingsVoiceSelect?.value || "";
  if (!selectedKey) {
    startNewVoiceProfile();
    return;
  }

  const settings = getElevenLabsSettings();
  const voice =
    settings.voices.find((item) => item.key === selectedKey) ||
    (selectedOption?.dataset.voiceId
      ? {
          key: selectedKey,
          name: selectedOption.dataset.voiceName || "Stimme",
          gender: selectedOption.dataset.voiceGender || "neutral",
          voiceId: selectedOption.dataset.voiceId,
        }
      : null);
  if (!voice?.voiceId) {
    if (settingsState) settingsState.textContent = "Stimme konnte nicht geladen werden: Voice-ID fehlt.";
    return;
  }

  if (settingsVoiceName) settingsVoiceName.value = voice.name;
  if (settingsVoiceGender) settingsVoiceGender.value = voice.gender;
  if (settingsVoiceId) settingsVoiceId.value = voice.voiceId;
  updateVoiceIdHint(voice.voiceId);
  loadSelectedVoiceProfileIntoControls(voice.key, {
    settings: {
      ...settings,
      voices: upsertVoiceProfile(settings.voices, voice),
    },
    forceControls: true,
  });
}

function getVoiceGenderLabel(gender) {
  if (gender === "male") return "männlich";
  if (gender === "female") return "weiblich";
  return "neutral";
}

function createVoiceProfileKey(name, voiceId) {
  const base = `${name || "stimme"}-${voiceId || Date.now()}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `stimme-${Date.now()}`;
}

function createUniqueVoiceProfileKey(voices, name, voiceId) {
  const baseKey = createVoiceProfileKey(name, voiceId);
  const existingKeys = new Set((Array.isArray(voices) ? voices : []).map((voice) => voice.key));
  if (!existingKeys.has(baseKey)) return baseKey;

  let index = 2;
  while (existingKeys.has(`${baseKey}-${index}`)) index += 1;
  return `${baseKey}-${index}`;
}

function loadSelectedVoiceProfileIntoControls(key, options = {}) {
  const settings = options.settings || getElevenLabsSettings();
  if (!key) {
    startNewVoiceProfile({ silent: options.silent });
    return;
  }

  const voice = settings.voices.find((item) => item.key === key) || getActiveElevenLabsVoice(settings);
  if (!voice) return;

  const nextSettings = {
    ...settings,
    activeVoiceKey: voice.key,
    voiceId: voice.voiceId,
  };
  if (!options.skipPersist) {
    localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(nextSettings));
  }

  if (settingsVoiceSelect) settingsVoiceSelect.value = voice.key;
  if (settingsVoiceName) settingsVoiceName.value = voice.name;
  if (settingsVoiceGender) settingsVoiceGender.value = voice.gender;
  if (settingsVoiceId) settingsVoiceId.value = voice.voiceId;
  updateVoiceIdHint(voice.voiceId);
  renderVoiceProfileSelect(nextSettings);
  if (!options.preserveStatus) renderSettingsControls();
  if (options.forceControls) {
    if (settingsVoiceSelect) settingsVoiceSelect.value = voice.key;
    if (settingsVoiceName) settingsVoiceName.value = voice.name;
    if (settingsVoiceGender) settingsVoiceGender.value = voice.gender;
    if (settingsVoiceId) settingsVoiceId.value = voice.voiceId;
    updateVoiceIdHint(voice.voiceId);
  }
  if (!options.skipCloud) {
    saveCloudElevenLabsSettings(nextSettings, { silent: true })
      .then(() => {
        if (!options.silent && settingsState) {
          settingsState.textContent = `Stimme aktiv und in Firebase gespeichert: ${voice.name}.`;
        }
      })
      .catch(() => {
        if (settingsState) settingsState.textContent = "Stimme lokal aktiv. Firebase-Speichern fehlgeschlagen.";
      });
  } else if (!options.silent && settingsState) {
    settingsState.textContent = `Stimme aktiv: ${voice.name}.`;
  }
}

function upsertVoiceProfile(voices, voice) {
  const nextVoices = Array.isArray(voices) ? voices.filter((item) => item.key !== voice.key) : [];
  nextVoices.push(voice);
  return nextVoices;
}

function updateVoiceIdHint(voiceId = settingsVoiceId?.value || "") {
  if (!settingsVoiceIdHint) return;
  const id = String(voiceId || "").trim();
  settingsVoiceIdHint.textContent = id ? `Aktive Voice-ID: ${id}` : "Aktive Voice-ID: keine";
}

function startNewVoiceProfile(options = {}) {
  if (settingsVoiceSelect) settingsVoiceSelect.value = "";
  if (settingsVoiceName) settingsVoiceName.value = "";
  if (settingsVoiceGender) settingsVoiceGender.value = "female";
  if (settingsVoiceId) settingsVoiceId.value = "";
  if (settingsDeleteVoiceButton) settingsDeleteVoiceButton.disabled = true;
  if (!options.silent && settingsState) {
    settingsState.textContent = "Neue Stimme eintragen und speichern.";
  }
}

function saveCurrentVoiceProfileFromControls() {
  const settings = getElevenLabsSettings();
  const name = settingsVoiceName?.value.trim() || "Neue Stimme";
  const voiceId = settingsVoiceId?.value.trim() || "";
  const gender = settingsVoiceGender?.value || "neutral";

  if (!voiceId) {
    if (settingsState) settingsState.textContent = "Bitte eine ElevenLabs Voice-ID eintragen.";
    return;
  }

  const selectedKey = settingsVoiceSelect?.value || "";
  const existingVoice = settings.voices.find((voice) => voice.key === selectedKey);
  const key = existingVoice?.key || createUniqueVoiceProfileKey(settings.voices, name, voiceId);
  const nextVoice = { key, name, gender, voiceId };
  const duplicateVoice = settings.voices.find((voice) => voice.key !== key && voice.voiceId === voiceId);
  const voices = settings.voices.filter((voice) => voice.key !== key);
  voices.push(nextVoice);

  const nextSettings = normalizeElevenLabsSettings({
    ...settings,
    activeVoiceKey: key,
    voiceId,
    voices,
  });

  localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(nextSettings));
  renderVoiceProfileSelect(nextSettings);
  loadSelectedVoiceProfileIntoControls(key, {
    settings: nextSettings,
    silent: true,
    skipCloud: true,
    preserveStatus: true,
  });
  saveCloudElevenLabsSettings(nextSettings)
    .then(() => {
      if (settingsState) {
        settingsState.textContent = duplicateVoice
          ? `Stimme gespeichert: ${name}. Hinweis: gleiche Voice-ID wie ${duplicateVoice.name}.`
          : `Stimme gespeichert: ${name}.`;
      }
    })
    .catch(() => {
      if (settingsState) settingsState.textContent = `Stimme lokal gespeichert: ${name}. Firebase fehlgeschlagen.`;
    });
}

function deleteSelectedVoiceProfile() {
  const settings = getElevenLabsSettings();
  const selectedKey = settingsVoiceSelect?.value || settings.activeVoiceKey;
  if (settings.voices.length <= 1) {
    if (settingsState) settingsState.textContent = "Mindestens eine Stimme muss gespeichert bleiben.";
    return;
  }

  const deletedVoice = settings.voices.find((voice) => voice.key === selectedKey);
  const voices = settings.voices.filter((voice) => voice.key !== selectedKey);
  const nextActiveVoice = voices[0];
  const nextSettings = normalizeElevenLabsSettings({
    ...settings,
    activeVoiceKey: nextActiveVoice.key,
    voiceId: nextActiveVoice.voiceId,
    voices,
  });

  localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(nextSettings));
  renderVoiceProfileSelect(nextSettings);
  loadSelectedVoiceProfileIntoControls(nextSettings.activeVoiceKey, { settings: nextSettings, silent: true });
  saveCloudElevenLabsSettings(nextSettings).catch(() => {
    if (settingsState) settingsState.textContent = "Stimme lokal gelöscht. Firebase konnte nicht aktualisiert werden.";
  });
  if (settingsState) settingsState.textContent = `Stimme gelöscht: ${deletedVoice?.name || "Stimme"}.`;
}

function saveElevenLabsSettings() {
  const currentSettings = getElevenLabsSettings();
  const selectedKey = settingsVoiceSelect?.value || "";
  const isNewVoiceProfile = !selectedKey;
  const currentVoice = isNewVoiceProfile
    ? null
    : currentSettings.voices.find((voice) => voice.key === selectedKey) || getActiveElevenLabsVoice(currentSettings);
  const controlVoiceId = settingsVoiceId?.value.trim() || "";
  const controlVoiceName = settingsVoiceName?.value.trim() || "";
  const inlineVoice = {
    key: currentVoice?.key || createUniqueVoiceProfileKey(currentSettings.voices, controlVoiceName, controlVoiceId),
    name: controlVoiceName || currentVoice?.name || "Stimme",
    gender: settingsVoiceGender?.value || currentVoice?.gender || "neutral",
    voiceId: controlVoiceId || currentVoice?.voiceId || getDefaultElevenLabsSettings().voiceId,
  };
  const voices = currentSettings.voices.map((voice) =>
    voice.key === inlineVoice.key ? inlineVoice : voice,
  );
  if (!voices.some((voice) => voice.key === inlineVoice.key)) voices.push(inlineVoice);

  const settings = normalizeElevenLabsSettings({
    ...currentSettings,
    activeVoiceKey: inlineVoice.key,
    voiceId: inlineVoice.voiceId,
    voices,
    stability: clampPercent(settingsVoiceStability?.value),
    similarity: clampPercent(settingsVoiceSimilarity?.value),
    style: clampPercent(settingsVoiceStyle?.value),
    speakerBoost: Boolean(settingsSpeakerBoost?.checked),
  });
  localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(settings));
  renderVoiceProfileSelect(settings);
  saveCloudElevenLabsSettings(settings).catch(() => {
    if (settingsState) settingsState.textContent = "Einstellungen lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
  });
}

async function saveCloudElevenLabsSettings(settings = getElevenLabsSettings(), options = {}) {
  const normalizedSettings = normalizeElevenLabsSettings(settings);
  const response = await fetch(getApiUrl("/api/settings"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: normalizedSettings }),
  });

  if (!response.ok) {
    await setDoc(doc(firestore, "settings", ELEVENLABS_SETTINGS_DOC), {
      ...normalizedSettings,
      updatedAt: new Date().toISOString(),
    });
  }

  if (!options.silent && settingsState) settingsState.textContent = "ElevenLabs-Stimmen in Firebase gespeichert.";
}

async function loadCloudElevenLabsSettings() {
  try {
    const response = await fetch(getApiUrl("/api/settings"), { cache: "no-store" });
    let cloudSettings = null;
    if (response.ok) {
      const payload = await response.json();
      cloudSettings = payload.settings ? normalizeElevenLabsSettings(payload.settings) : null;
    }

    if (!cloudSettings) {
      const snapshot = await getDoc(doc(firestore, "settings", ELEVENLABS_SETTINGS_DOC));
      cloudSettings = snapshot.exists() ? normalizeElevenLabsSettings(snapshot.data()) : null;
    }

    if (!cloudSettings) {
      await saveCloudElevenLabsSettings(getElevenLabsSettings());
      return;
    }

    const localSettings = getElevenLabsSettings();
    const mergedSettings = mergeElevenLabsSettings(localSettings, cloudSettings);
    localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(mergedSettings));
    renderVoiceProfileSelect(mergedSettings);
    loadSelectedVoiceProfileIntoControls(mergedSettings.activeVoiceKey, {
      settings: mergedSettings,
      silent: true,
      skipPersist: true,
      skipCloud: true,
    });
    renderSettingsControls();
    if (settingsState) {
      settingsState.textContent = `ElevenLabs-Stimmen aus Firebase geladen: ${mergedSettings.voices.length}.`;
    }
  } catch (error) {
    if (settingsState) settingsState.textContent = "ElevenLabs-Stimmen lokal geladen. Firebase nicht erreichbar.";
  }
}

function mergeElevenLabsSettings(localSettings, cloudSettings) {
  const voicesByKey = new Map();
  [...(localSettings.voices || []), ...(cloudSettings.voices || [])].forEach((voice) => {
    if (!voice?.voiceId) return;
    voicesByKey.set(voice.key || createVoiceProfileKey(voice.name, voice.voiceId), voice);
  });

  return normalizeElevenLabsSettings({
    ...localSettings,
    ...cloudSettings,
    voices: [...voicesByKey.values()],
    activeVoiceKey: cloudSettings.activeVoiceKey || localSettings.activeVoiceKey,
  });
}

function saveChatGptSettings() {
  const settings = {
    enabled: Boolean(settingsChatGptEnabled?.checked),
    apiKey: settingsChatGptApiKey?.value.trim() || "",
    model: settingsChatGptModel?.value.trim() || getDefaultChatGptSettings().model,
    systemPrompt: settingsChatGptPrompt?.value.trim() || getDefaultChatGptSettings().systemPrompt,
  };
  localStorage.setItem(CHATGPT_SETTINGS_KEY, JSON.stringify(settings));
}

function saveAllAiSettings() {
  saveElevenLabsSettings();
  saveChatGptSettings();
}

async function testElevenLabsSettingsVoice() {
  const text =
    settingsVoiceDemoText?.value.trim() ||
    "Das ist ein kurzer Test der LogoSound Stimme. Bitte sprechen Sie ruhig und deutlich.";

  saveAllAiSettings();
  if (settingsTestVoiceButton) settingsTestVoiceButton.disabled = true;
  if (settingsState) settingsState.textContent = "ElevenLabs-Demo wird erstellt...";

  try {
    const response = await fetch(getApiUrl("/api/voice"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        store: false,
        exerciseName: "Setup Demo",
        ...getElevenLabsRequestSettingsFromControls(),
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      throw new Error(`Audio-Fehler ${response.status}: ${details.slice(0, 90) || "keine Antwort"}`);
    }

    const audioBlob = await response.blob();
    if (!audioBlob.size) throw new Error("Audio ist leer.");
    if (settingsVoiceTestUrl) URL.revokeObjectURL(settingsVoiceTestUrl);
    settingsVoiceTestUrl = URL.createObjectURL(audioBlob);
    if (settingsVoicePreview) {
      settingsVoicePreview.src = settingsVoiceTestUrl;
      settingsVoicePreview.load();
      await settingsVoicePreview.play().catch(() => {});
    }
    if (settingsState) {
      settingsState.textContent = `Demo-Stimme erstellt: ${settingsVoiceName?.value.trim() || "Stimme"}.`;
    }
  } catch (error) {
    if (settingsState) settingsState.textContent = error?.message || "Demo-Stimme konnte nicht erstellt werden.";
  } finally {
    if (settingsTestVoiceButton) settingsTestVoiceButton.disabled = false;
  }
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
  renderSettingsControls();
}

function applySavedStatisticsWaveformHeight() {
  const savedHeight = Number(localStorage.getItem(STATISTICS_WAVEFORM_HEIGHT_KEY));
  const nextHeight = Number.isFinite(savedHeight) ? clampStatisticsWaveformHeight(savedHeight) : 110;
  setStatisticsWaveformHeight(nextHeight, { persist: false });
}

function startStatisticsWaveformResize(event) {
  if (!statisticsWaveform) return;
  event.preventDefault();
  statisticsResizeState = {
    pointerId: event.pointerId,
    startY: event.clientY,
    startHeight: statisticsWaveform.getBoundingClientRect().height || 110,
  };
  statisticsWaveformResizeHandle?.setPointerCapture?.(event.pointerId);
  document.body.classList.add("is-resizing-statistics-waveform");
  window.addEventListener("pointermove", resizeStatisticsWaveform);
  window.addEventListener("pointerup", stopStatisticsWaveformResize, { once: true });
  window.addEventListener("pointercancel", stopStatisticsWaveformResize, { once: true });
}

function resizeStatisticsWaveform(event) {
  if (!statisticsResizeState) return;
  const deltaY = event.clientY - statisticsResizeState.startY;
  setStatisticsWaveformHeight(statisticsResizeState.startHeight + deltaY);
}

function stopStatisticsWaveformResize(event) {
  if (statisticsResizeState && event?.pointerId != null) {
    statisticsWaveformResizeHandle?.releasePointerCapture?.(statisticsResizeState.pointerId);
  }
  statisticsResizeState = null;
  document.body.classList.remove("is-resizing-statistics-waveform");
  window.removeEventListener("pointermove", resizeStatisticsWaveform);
}

function setStatisticsWaveformHeight(height, options = {}) {
  if (!statisticsWaveform) return;
  const nextHeight = clampStatisticsWaveformHeight(height);
  statisticsWaveform.style.height = `${nextHeight}px`;
  if (options.persist !== false) {
    localStorage.setItem(STATISTICS_WAVEFORM_HEIGHT_KEY, String(Math.round(nextHeight)));
  }
  renderAudioAnalysis(getSelectedAnalysisRecording());
}

function clampStatisticsWaveformHeight(height) {
  return Math.max(88, Math.min(320, Math.round(Number(height) || 110)));
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

function getActiveElevenLabsVoice(settings = getElevenLabsSettings()) {
  return settings.voices.find((voice) => voice.key === settings.activeVoiceKey) || settings.voices[0] || null;
}

function getAnalysisCalibration() {
  const fallback = {
    amplitudeGain: 100,
    volumeGain: 70,
    frequencyGain: 100,
  };

  try {
    const stored = JSON.parse(localStorage.getItem(ANALYSIS_CALIBRATION_KEY) || "null");
    return {
      amplitudeGain: clampAnalysisGain(stored?.amplitudeGain, 5, 260, fallback.amplitudeGain),
      volumeGain: clampAnalysisGain(stored?.volumeGain, 30, 180, fallback.volumeGain),
      frequencyGain: clampAnalysisGain(stored?.frequencyGain, 40, 240, fallback.frequencyGain),
    };
  } catch (error) {
    return fallback;
  }
}

function clampAnalysisGain(value, min, max, fallback) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) return fallback;
  return Math.max(min, Math.min(max, Math.round(numericValue)));
}

function loadAnalysisCalibrationControls() {
  const calibration = getAnalysisCalibration();
  if (statisticsAmplitudeGain) statisticsAmplitudeGain.value = String(calibration.amplitudeGain);
  if (statisticsVolumeGain) statisticsVolumeGain.value = String(calibration.volumeGain);
  if (statisticsFrequencyGain) statisticsFrequencyGain.value = String(calibration.frequencyGain);
  updateAnalysisCalibrationLabels(calibration);
}

function saveAnalysisCalibrationFromControls() {
  const calibration = {
    amplitudeGain: clampAnalysisGain(statisticsAmplitudeGain?.value, 5, 260, 100),
    volumeGain: clampAnalysisGain(statisticsVolumeGain?.value, 30, 180, 70),
    frequencyGain: clampAnalysisGain(statisticsFrequencyGain?.value, 40, 240, 100),
  };
  localStorage.setItem(ANALYSIS_CALIBRATION_KEY, JSON.stringify(calibration));
  updateAnalysisCalibrationLabels(calibration);
}

function updateAnalysisCalibrationLabels(calibration = getAnalysisCalibration()) {
  if (statisticsAmplitudeGainValue) statisticsAmplitudeGainValue.textContent = `${calibration.amplitudeGain}%`;
  if (statisticsVolumeGainValue) statisticsVolumeGainValue.textContent = `${calibration.volumeGain}%`;
  if (statisticsFrequencyGainValue) statisticsFrequencyGainValue.textContent = `${calibration.frequencyGain}%`;
}

function getCalibratedAnalysisMetadata(metadata) {
  const calibration = getAnalysisCalibration();
  return {
    ...metadata,
    amplituden: scaleAnalysisSeries(metadata.amplituden, calibration.amplitudeGain),
    lautstaerken: scaleAnalysisSeries(metadata.lautstaerken, calibration.volumeGain),
    lautstaerkePegel: scaleAnalysisSeries(
      metadata.lautstaerkePegel || metadata.lautstaerken,
      calibration.volumeGain,
    ),
    frequenzAmplituden: scaleAnalysisSeries(metadata.frequenzAmplituden, calibration.frequencyGain),
    analyseKalibrierung: calibration,
  };
}

function scaleAnalysisSeries(values = [], gainPercent = 100) {
  const factor = Math.max(0.01, Number(gainPercent) / 100 || 1);
  return values.map((value) => Math.max(0, Math.min(100, Math.round((Number(value) || 0) * factor))));
}

function renderAudioAnalysis(metadata = currentMetadata) {
  if (!audioAnalysisGrid || !audioAnalysisTitle || !audioAnalysisNote) return;

  if (!metadata) {
    audioAnalysisTitle.textContent = "Keine Aufnahme geöffnet";
    audioAnalysisGrid.innerHTML = "";
    audioAnalysisNote.textContent = "Öffne eine Aufnahme aus dem Verlauf oder erstelle eine neue Aufnahme.";
    if (statisticsPositionSlider) statisticsPositionSlider.disabled = true;
    if (statisticsPositionValue) statisticsPositionValue.textContent = "00:00";
    setAnalysisRangeControlsEnabled(false);
    drawStatisticsWaveform(null);
    return;
  }

  const calibratedMetadata = getCalibratedAnalysisMetadata(metadata);
  const analysis = buildAudioAnalysis(calibratedMetadata);
  const positionAnalysis = buildPositionAudioAnalysis(calibratedMetadata, selectedAnalysisPosition);
  const rangeAnalysis = buildRangeAudioAnalysis(calibratedMetadata, selectedAnalysisStart, selectedAnalysisEnd);
  audioAnalysisTitle.textContent = `${metadata.uebung || "Aufnahme"} · ${formatTime(positionAnalysis.zeitSekunden)}`;
  audioAnalysisGrid.innerHTML = "";
  if (statisticsPositionSlider) {
    statisticsPositionSlider.disabled = false;
    syncAnalysisPositionSlider();
  }
  if (statisticsPositionValue) {
    statisticsPositionValue.textContent = formatTime(positionAnalysis.zeitSekunden);
  }
  setAnalysisRangeControlsEnabled(true);
  updateAnalysisRangeLabels(calibratedMetadata);
  drawStatisticsWaveform(calibratedMetadata);

  const items = [
    ["Zeit", formatTime(positionAnalysis.zeitSekunden)],
    ["Lautstärke dort", positionAnalysis.lautstaerke],
    ["Ø Lautstärke dort", positionAnalysis.durchschnittlicheLautstaerke],
    ["Amplitude dort", positionAnalysis.amplitude],
    ["Frequenz dort", positionAnalysis.stimmfrequenzHz ? `${positionAnalysis.stimmfrequenzHz} Hz` : "0 Hz"],
    ["Ø Frequenz dort", positionAnalysis.durchschnittlicheStimmfrequenzHz ? `${positionAnalysis.durchschnittlicheStimmfrequenzHz} Hz` : "0 Hz"],
    ["Frequenzenergie", positionAnalysis.frequenzAmplitude],
    ["Impulse im Fenster", positionAnalysis.impulse],
    ["Bereich", rangeAnalysis.label],
    ["Bereich Ø", rangeAnalysis.durchschnittlicheLautstaerke],
    ["Bereich Max", rangeAnalysis.maximaleLautstaerke],
    ["Bereich Frequenz", rangeAnalysis.durchschnittlicheStimmfrequenzHz ? `${rangeAnalysis.durchschnittlicheStimmfrequenzHz} Hz` : "0 Hz"],
    ["Bereich Impulse", rangeAnalysis.impulse],
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

function getAnalysisPositionFromSlider(value) {
  const sliderPosition = Math.max(0, Math.min(1, Number(value) / 1000 || 0));
  if (!statisticsRangeZoomed) return sliderPosition;
  const range = Math.max(0.001, selectedAnalysisEnd - selectedAnalysisStart);
  return Math.max(0, Math.min(1, selectedAnalysisStart + sliderPosition * range));
}

function getSliderPositionFromAnalysis() {
  if (!statisticsRangeZoomed) {
    return Math.round(Math.max(0, Math.min(1, selectedAnalysisPosition)) * 1000);
  }

  const range = Math.max(0.001, selectedAnalysisEnd - selectedAnalysisStart);
  const zoomedPosition = (selectedAnalysisPosition - selectedAnalysisStart) / range;
  return Math.round(Math.max(0, Math.min(1, zoomedPosition)) * 1000);
}

function syncAnalysisPositionSlider() {
  if (!statisticsPositionSlider) return;
  statisticsPositionSlider.value = String(getSliderPositionFromAnalysis());
}

function clampSelectedAnalysisPositionToZoomRange() {
  if (!statisticsRangeZoomed) return;
  selectedAnalysisPosition = Math.max(
    selectedAnalysisStart,
    Math.min(selectedAnalysisEnd, selectedAnalysisPosition),
  );
}

function buildPositionAudioAnalysis(metadata, positionPercent = 0) {
  const durationSeconds = Number(metadata.dauerSekunden || 0);
  const safePosition = Math.max(0, Math.min(1, Number(positionPercent) || 0));
  const timeSeconds = durationSeconds * safePosition;
  const isEndSilence =
    durationSeconds > 0 &&
    (safePosition >= 0.995 || durationSeconds - timeSeconds <= END_ANALYSIS_SILENCE_SECONDS);
  const amplitudesForAnalysis = (metadata.amplituden || []).map(Number).filter(Number.isFinite);
  const volumeLevels = (metadata.lautstaerkePegel || metadata.lautstaerken || []).map(Number).filter(Number.isFinite);
  const pitchValues = (metadata.stimmfrequenzenHz || []).map(Number).filter(Number.isFinite);
  const frequencyAmplitudes = (metadata.frequenzAmplituden || []).map(Number).filter(Number.isFinite);
  const windowSeconds = 0.7;
  const amplitudeWindow = isEndSilence ? [] : getTimelineWindow(amplitudesForAnalysis, safePosition, durationSeconds, windowSeconds);
  const volumeWindow = isEndSilence ? [] : getTimelineWindow(volumeLevels, safePosition, durationSeconds, windowSeconds);
  const pitchWindow = isEndSilence ? [] : getTimelineWindow(pitchValues, safePosition, durationSeconds, windowSeconds);
  const frequencyIndexValue = isEndSilence ? 0 : getTimelineValue(frequencyAmplitudes, safePosition);
  const spokenPitchWindow = pitchWindow.filter((value) => value > 0);
  const amplitudeIndexValue = isEndSilence ? 0 : getTimelineValue(amplitudesForAnalysis, safePosition);
  const volumeIndexValue = isEndSilence ? 0 : getTimelineValue(volumeLevels, safePosition);
  const pitchIndexValue = isEndSilence ? 0 : getTimelineValue(pitchValues, safePosition);

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

function buildRangeAudioAnalysis(metadata, startPercent = 0, endPercent = 1) {
  const durationSeconds = Number(metadata.dauerSekunden || 0);
  const safeStart = Math.max(0, Math.min(1, Number(startPercent) || 0));
  const safeEnd = Math.max(safeStart, Math.min(1, Number(endPercent) || 0));
  const startSeconds = durationSeconds * safeStart;
  const endSeconds = durationSeconds * safeEnd;
  const rangeSeconds = Math.max(0, endSeconds - startSeconds);
  const amplitudesForAnalysis = (metadata.amplituden || []).map(Number).filter(Number.isFinite);
  const volumeLevels = (metadata.lautstaerkePegel || metadata.lautstaerken || []).map(Number).filter(Number.isFinite);
  const pitchValues = (metadata.stimmfrequenzenHz || []).map(Number).filter(Number.isFinite);
  const amplitudeWindow = getTimelineRange(amplitudesForAnalysis, safeStart, safeEnd);
  const volumeWindow = getTimelineRange(volumeLevels, safeStart, safeEnd);
  const pitchWindow = getTimelineRange(pitchValues, safeStart, safeEnd).filter((value) => value > 0);
  const levelWindow = volumeWindow.length ? volumeWindow : amplitudeWindow;
  const levelStats = calculateAmplitudeStats(levelWindow);

  return {
    startSekunden: Number(startSeconds.toFixed(2)),
    endeSekunden: Number(endSeconds.toFixed(2)),
    dauerSekunden: Number(rangeSeconds.toFixed(2)),
    label: `${formatTime(startSeconds)} - ${formatTime(endSeconds)}`,
    durchschnittlicheLautstaerke: levelStats.average,
    maximaleLautstaerke: levelStats.maximum,
    durchschnittlicheStimmfrequenzHz: calculatePitchStats(pitchWindow).average,
    impulse: countSpeechImpulses(amplitudeWindow, rangeSeconds || 1),
  };
}

function getTimelineValue(values, positionPercent) {
  if (!values.length) return 0;
  const index = Math.max(0, Math.min(values.length - 1, Math.round(positionPercent * (values.length - 1))));
  return values[index] || 0;
}

function getTimelineRange(values, startPercent, endPercent) {
  if (!values.length) return [];
  const startIndex = Math.max(0, Math.min(values.length - 1, Math.floor(startPercent * values.length)));
  const endIndex = Math.max(startIndex + 1, Math.min(values.length, Math.ceil(endPercent * values.length)));
  return values.slice(startIndex, endIndex);
}

function getTimelineWindow(values, positionPercent, durationSeconds, windowSeconds) {
  if (!values.length) return [];
  const centerIndex = Math.max(0, Math.min(values.length - 1, Math.round(positionPercent * (values.length - 1))));
  const samplesPerSecond = durationSeconds > 0 ? values.length / durationSeconds : values.length;
  const radius = Math.max(1, Math.round((samplesPerSecond * windowSeconds) / 2));
  return values.slice(Math.max(0, centerIndex - radius), Math.min(values.length, centerIndex + radius + 1));
}

function setAnalysisRangeControlsEnabled(isEnabled) {
  [statisticsStartSlider, statisticsEndSlider, statisticsPlayRangeButton, statisticsZoomRangeButton].forEach((control) => {
    if (control) control.disabled = !isEnabled;
  });
}

function updateAnalysisRangeLabels(metadata) {
  const durationSeconds = Number(metadata?.dauerSekunden || 0);
  const startSeconds = durationSeconds * selectedAnalysisStart;
  const endSeconds = durationSeconds * selectedAnalysisEnd;
  const startPercent = `${Math.round(selectedAnalysisStart * 100)}%`;
  const endPercent = `${Math.round(selectedAnalysisEnd * 100)}%`;
  statisticsRangeControl?.style.setProperty("--range-start", startPercent);
  statisticsRangeControl?.style.setProperty("--range-end", endPercent);
  if (statisticsStartSlider) statisticsStartSlider.value = String(Math.round(selectedAnalysisStart * 1000));
  if (statisticsEndSlider) statisticsEndSlider.value = String(Math.round(selectedAnalysisEnd * 1000));
  if (statisticsStartValue) statisticsStartValue.textContent = formatTime(startSeconds);
  if (statisticsEndValue) statisticsEndValue.textContent = formatTime(endSeconds);
  if (statisticsRangeValue) {
    statisticsRangeValue.textContent = `${formatTime(startSeconds)} - ${formatTime(endSeconds)}`;
  }
  if (statisticsZoomRangeButton) {
    statisticsZoomRangeButton.textContent = statisticsRangeZoomed ? "Gesamt" : "Zoom";
  }
}

function drawStatisticsWaveform(metadata) {
  if (!statisticsWaveform) return;
  if (!metadata) {
    drawWaveform(statisticsWaveform, [], { mode: "playback" });
    drawStatisticsSignalTimelines(null);
    return;
  }

  const sourceAmplitudes = metadata.amplituden || [];
  const sourceLevels = metadata.lautstaerkePegel || metadata.lautstaerken || metadata.amplituden;
  const displayAmplitudes = statisticsRangeZoomed
    ? getTimelineRange(sourceAmplitudes, selectedAnalysisStart, selectedAnalysisEnd)
    : sourceAmplitudes;
  const displayLevels = statisticsRangeZoomed
    ? getTimelineRange(sourceLevels || [], selectedAnalysisStart, selectedAnalysisEnd)
    : sourceLevels;
  const displayProgress = statisticsRangeZoomed
    ? getZoomedAnalysisPosition()
    : selectedAnalysisPosition;

  drawWaveform(statisticsWaveform, displayAmplitudes, {
    mode: "playback",
    progress: displayProgress,
    levelValues: displayLevels,
    durationSeconds: Number(metadata.dauerSekunden || 0),
    dynamicRange: statisticsRangeZoomed ? 0.78 : undefined,
    minLocalPeak: statisticsRangeZoomed ? 2.4 : undefined,
    visualCeiling: statisticsRangeZoomed ? 92 : undefined,
    resampleMode: statisticsRangeZoomed ? "rms" : undefined,
    pixelsPerBar: statisticsRangeZoomed ? 4.2 : undefined,
    subtractFloor: statisticsRangeZoomed,
    floorPercentile: 0.18,
    compress: statisticsRangeZoomed ? 1.28 : undefined,
    shapePower: statisticsRangeZoomed ? 0.58 : undefined,
    barGap: statisticsRangeZoomed ? 2 : undefined,
    minBarWidth: statisticsRangeZoomed ? 4 : undefined,
    minSpeechBarHeight: statisticsRangeZoomed ? 12 : undefined,
    minPauseBarHeight: statisticsRangeZoomed ? 2 : undefined,
  });

  const context = statisticsWaveform.getContext("2d");
  if (!context) return;
  const width = statisticsWaveform.width;
  const height = statisticsWaveform.height;
  const startX = statisticsRangeZoomed ? 0 : width * selectedAnalysisStart;
  const endX = statisticsRangeZoomed ? width : width * selectedAnalysisEnd;
  context.save();
  context.fillStyle = "rgba(255, 122, 144, 0.12)";
  context.fillRect(startX, 0, Math.max(2, endX - startX), height);
  context.strokeStyle = "#ff7a90";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(startX, 10);
  context.lineTo(startX, height - 10);
  context.moveTo(endX, 10);
  context.lineTo(endX, height - 10);
  context.stroke();
  context.restore();
  drawStatisticsSignalTimelines(metadata);
}

function drawStatisticsSignalTimelines(metadata) {
  if (!statisticsVolumeTimeline || !statisticsFrequencyTimeline) return;

  if (!metadata) {
    drawWaveform(statisticsVolumeTimeline, [], { mode: "playback" });
    drawFrequencyTimeline(statisticsFrequencyTimeline, [], [], { limit: false });
    return;
  }

  const sourceLevels = metadata.lautstaerkePegel || metadata.lautstaerken || metadata.amplituden || [];
  const sourcePitch = metadata.stimmfrequenzenHz || [];
  const sourceFrequencyStrength = metadata.frequenzAmplituden || sourceLevels;
  const displayProgress = statisticsRangeZoomed ? getZoomedAnalysisPosition() : selectedAnalysisPosition;
  const displayLevels = statisticsRangeZoomed
    ? getTimelineRange(sourceLevels, selectedAnalysisStart, selectedAnalysisEnd)
    : sourceLevels;
  const displayPitch = statisticsRangeZoomed
    ? getTimelineRange(sourcePitch, selectedAnalysisStart, selectedAnalysisEnd)
    : sourcePitch;
  const displayFrequencyStrength = statisticsRangeZoomed
    ? getTimelineRange(sourceFrequencyStrength, selectedAnalysisStart, selectedAnalysisEnd)
    : sourceFrequencyStrength;
  const currentLevel = getTimelineValue(sourceLevels, selectedAnalysisPosition);

  drawVolumeLevelTimeline(statisticsVolumeTimeline, displayLevels, {
    progress: displayProgress,
    durationSeconds: Number(metadata.dauerSekunden || 0),
    currentLevel,
    rangeStart: statisticsRangeZoomed ? 0 : selectedAnalysisStart,
    rangeEnd: statisticsRangeZoomed ? 1 : selectedAnalysisEnd,
  });

  drawFrequencyTimeline(statisticsFrequencyTimeline, displayPitch, displayFrequencyStrength, {
    limit: false,
    progress: displayProgress,
    rangeStart: statisticsRangeZoomed ? 0 : selectedAnalysisStart,
    rangeEnd: statisticsRangeZoomed ? 1 : selectedAnalysisEnd,
  });
}

function getZoomedAnalysisPosition() {
  const range = Math.max(0.001, selectedAnalysisEnd - selectedAnalysisStart);
  return Math.max(0, Math.min(1, (selectedAnalysisPosition - selectedAnalysisStart) / range));
}

async function playSelectedAnalysisRange() {
  const metadata = getSelectedAnalysisRecording();
  if (!metadata) return;

  if (currentMetadata?.id !== metadata.id || (!currentVideoUrl && !recordingPlayer.currentSrc)) {
    await openStoredRecording(metadata.id);
    setActiveView("stats");
  }

  const durationSeconds = Number(metadata.dauerSekunden || recordingPlayer.duration || 0);
  if (!durationSeconds) return;

  selectedAnalysisPosition = selectedAnalysisStart;
  syncAnalysisPositionSlider();
  renderAudioAnalysis(metadata);

  setActiveView("stats");
  await playPlaybackFromTime(0, selectedAnalysisStart, selectedAnalysisEnd);
  setStatisticsRangeButtonState("pause");
}

function toggleSelectedAnalysisRangePlayback() {
  if (statisticsRangeStopTime != null && !recordingPlayer.paused) {
    recordingPlayer.pause();
    statisticsRangeStopTime = null;
    setStatisticsRangeButtonState("play");
    return;
  }

  playSelectedAnalysisRange();
}

async function playPlaybackFromTime(startTime, analysisProgress = null, stopProgress = null) {
  if (!recordingPlayer.src && currentVideoUrl) {
    recordingPlayer.src = currentVideoUrl;
    recordingPlayer.load();
  }

  if (!recordingPlayer.src) {
    message.textContent = "Kein Video zum Abspielen geladen.";
    return;
  }

  playPauseButton.disabled = true;
  setPlayPauseButtonState("loading");
  recordingPlayer.muted = false;
  recordingPlayer.defaultMuted = false;
  recordingPlayer.volume = 1;
  await ensurePlaybackAudioBoost();

  await waitForPlaybackReady(recordingPlayer, 1800);
  const targetTime = analysisProgress !== null
    ? analysisProgressToMediaTime(analysisProgress, currentMetadata)
    : Math.max(0, Number(startTime) || 0);
  if (stopProgress !== null) {
    statisticsRangeStopTime = analysisProgressToMediaTime(stopProgress, currentMetadata);
  }
  await setPlaybackCurrentTime(targetTime);
  if (analysisProgress !== null) {
    selectedAnalysisPosition = Math.max(0, Math.min(1, Number(analysisProgress) || 0));
    syncAnalysisPositionSlider();
  }
  updatePlaybackVisuals(analysisProgress);

  recordingPlayer.play().catch(() => {
    message.textContent = "Zum Abspielen bitte noch einmal tippen.";
  }).finally(() => {
    playPauseButton.disabled = false;
    setPlayPauseButtonState(recordingPlayer.paused ? "play" : "pause");
  });
}

function setPlaybackCurrentTime(time) {
  return new Promise((resolve) => {
    const targetTime = Math.max(0, Number(time) || 0);
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      window.clearTimeout(timeoutId);
      recordingPlayer.removeEventListener("seeked", finish);
      resolve(true);
    };
    const timeoutId = window.setTimeout(finish, 450);

    recordingPlayer.addEventListener("seeked", finish, { once: true });
    try {
      recordingPlayer.currentTime = targetTime;
      if (Math.abs((recordingPlayer.currentTime || 0) - targetTime) < 0.05) finish();
    } catch (error) {
      finish();
    }
  });
}

function stopAtStatisticsRangeEnd() {
  if (statisticsRangeStopTime == null || recordingPlayer.paused) return;
  if ((recordingPlayer.currentTime || 0) < statisticsRangeStopTime) return;
  recordingPlayer.pause();
  statisticsRangeStopTime = null;
  selectedAnalysisPosition = selectedAnalysisEnd;
  syncAnalysisPositionSlider();
  renderAudioAnalysis(getSelectedAnalysisRecording());
  setStatisticsRangeButtonState("play");
}

function setStatisticsRangeButtonState(state) {
  if (!statisticsPlayRangeButton) return;
  const normalizedState = state === "pause" ? "pause" : "play";
  statisticsPlayRangeButton.dataset.state = normalizedState;
  statisticsPlayRangeButton.setAttribute(
    "aria-label",
    normalizedState === "pause" ? "Bereich pausieren" : "Bereich abspielen",
  );
}

function scaleAmplitude(rawValue) {
  const sensitivityFactor = getSensitivityFactor();
  const scaledValue = Math.max(0, rawValue * sensitivityFactor);
  const softLimitedValue = 100 * (1 - Math.exp(-scaledValue / 72));
  return Math.min(100, Math.round(softLimitedValue));
}

function updateAdaptiveVolumeNoiseFloor(volumeSignal, currentFloor) {
  if (!Number.isFinite(volumeSignal) || volumeSignal <= 0) return currentFloor || 0;
  if (!currentFloor) return Math.min(8, volumeSignal * 0.75);

  const signalLooksLikeNoise = volumeSignal <= currentFloor * 1.5 + VOLUME_NOISE_GATE;
  const followSpeed = signalLooksLikeNoise ? VOLUME_NOISE_FOLLOW_SPEED : 0.006;
  const floorTarget = signalLooksLikeNoise
    ? volumeSignal
    : Math.min(volumeSignal, currentFloor * 1.04 + VOLUME_NOISE_GATE);

  return currentFloor * (1 - followSpeed) + floorTarget * followSpeed;
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
      compress: 1.7,
      dynamicRange: 0.54,
      minLocalPeak: 0.9,
      visualCeiling: 100,
      shapePower: 0.42,
      dim: true,
      levelValues: currentMetadata.lautstaerkePegel || currentMetadata.lautstaerken || currentMetadata.amplituden,
      pixelsPerBar: 2.4,
      barGap: 1,
      minBarWidth: 2,
      minSpeechBarHeight: 26,
      minPauseBarHeight: 2,
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
  if (editorMode?.value === "dialog") {
    renderEditorDialogList();
    renderEditorPreview(buildEditorExerciseFromForm());
  }
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
  renderPlaybackRecordingAccess(patientRecordings, preferredId);
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
    openButton.className = "recording-open-button";
    openButton.textContent = recording.id === preferredId ? "Offen" : "Öffnen";
    openButton.addEventListener("click", () => openStoredRecording(recording.id));

    const deleteListButton = document.createElement("button");
    deleteListButton.type = "button";
    deleteListButton.className = "recording-delete-button";
    deleteListButton.setAttribute("aria-label", "Aufnahme löschen");
    deleteListButton.title = "Aufnahme löschen";
    deleteListButton.addEventListener("click", async () => {
      await deleteStoredRecordingById(recording.id);
    });

    item.append(summary, openButton, deleteListButton);
    recordingsList.append(item);
  });
}

function renderPlaybackRecordingAccessLegacy(patientRecordings, preferredId = null) {
  if (!playbackRecordingSelect || !playbackSavedRecordingsList) return;

  const currentId = preferredId || currentMetadata?.id || "";
  playbackRecordingSelect.innerHTML = "";
  playbackSavedRecordingsList.innerHTML = "";

  if (!patientRecordings.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Keine gespeicherte Aufnahme";
    playbackRecordingSelect.append(option);
    playbackOpenRecordingButton && (playbackOpenRecordingButton.disabled = true);
    const empty = document.createElement("p");
    empty.className = "message";
    empty.textContent = "Noch keine gespeicherte Aufnahme für diesen Patienten.";
    playbackSavedRecordingsList.append(empty);
    return;
  }

  playbackOpenRecordingButton && (playbackOpenRecordingButton.disabled = false);

  patientRecordings.forEach((recording) => {
    const option = document.createElement("option");
    option.value = recording.id;
    option.textContent = `${formatDateTime(recording.datum)} · ${recording.uebung || "Aufnahme"}`;
    playbackRecordingSelect.append(option);
  });
  playbackRecordingSelect.value = patientRecordings.some((recording) => recording.id === currentId)
    ? currentId
    : patientRecordings[0].id;

  patientRecordings.slice(0, 4).forEach((recording) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "playback-recording-chip";
    button.classList.toggle("is-active", recording.id === currentId);
    button.textContent = `${recording.uebung || "Aufnahme"} · ${formatTime(recording.dauerSekunden || 0)}`;
    button.addEventListener("click", () => openStoredRecording(recording.id));
    playbackSavedRecordingsList.append(button);
  });
}

function createPlaybackRecordingListItem(recording, preferredId = null) {
  const item = document.createElement("article");
  item.className = "recording-item playback-recording-item";

  const summary = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = recording.uebung || "Unbenannte Übung";
  const details = document.createElement("span");
  const analysis = recording.audioAnalyse || buildAudioAnalysis(recording);
  details.textContent = `${formatDateTime(recording.datum)} · ${formatTime(recording.dauerSekunden)} · Ø ${analysis.lautstaerke.durchschnitt || recording.durchschnittlicheLautstaerke || 0} · ${analysis.frequenz.durchschnittHz || 0} Hz`;
  summary.append(title, details);

  const openButton = document.createElement("button");
  openButton.type = "button";
  openButton.className = "recording-open-button";
  openButton.textContent = recording.id === preferredId ? "Offen" : "Öffnen";
  openButton.addEventListener("click", () => openStoredRecording(recording.id));

  const deleteListButton = document.createElement("button");
  deleteListButton.type = "button";
  deleteListButton.className = "recording-delete-button";
  deleteListButton.setAttribute("aria-label", "Aufnahme löschen");
  deleteListButton.title = "Aufnahme löschen";
  deleteListButton.addEventListener("click", async () => {
    await deleteStoredRecordingById(recording.id);
  });

  item.append(summary, openButton, deleteListButton);
  return item;
}

function renderPlaybackRecordingAccess(patientRecordings, preferredId = null) {
  if (!playbackRecordingSelect || !playbackSavedRecordingsList) return;

  const currentId = preferredId || currentMetadata?.id || "";
  const visibleRecordings = patientRecordings;

  playbackRecordingSelect.innerHTML = "";
  playbackSavedRecordingsList.innerHTML = "";

  if (!visibleRecordings.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Keine gespeicherte Aufnahme";
    playbackRecordingSelect.append(option);
    if (playbackOpenRecordingButton) playbackOpenRecordingButton.disabled = true;

    const empty = document.createElement("p");
    empty.className = "message";
    empty.textContent = "Noch keine gespeicherte Aufnahme für diesen Patienten.";
    playbackSavedRecordingsList.append(empty);
    return;
  }

  if (playbackOpenRecordingButton) playbackOpenRecordingButton.disabled = false;

  visibleRecordings.forEach((recording) => {
    const option = document.createElement("option");
    option.value = recording.id;
    option.textContent = `${formatDateTime(recording.datum)} · ${recording.uebung || "Aufnahme"}`;
    playbackRecordingSelect.append(option);
  });

  playbackRecordingSelect.value = visibleRecordings.some((recording) => recording.id === currentId)
    ? currentId
    : visibleRecordings[0].id;

  visibleRecordings.forEach((recording) => {
    playbackSavedRecordingsList.append(createPlaybackRecordingListItem(recording, currentId));
    return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "playback-recording-chip";
    button.classList.toggle("is-active", recording.id === currentId);
    button.textContent = `${formatDateTime(recording.datum)} · ${formatTime(recording.dauerSekunden || 0)}`;
    button.addEventListener("click", () => openStoredRecording(recording.id));
    playbackSavedRecordingsList.append(button);
  });
}

function renderPlaybackExerciseSelect(patientRecordings, preferredExerciseName = "") {
  if (!playbackExerciseSelect) return;

  const currentValue = preferredExerciseName || playbackExerciseSelect.value || "";
  const exerciseNames = new Set();

  Array.from(exerciseName?.options || []).forEach((option) => {
    const label = option.textContent?.trim() || option.value;
    if (label && option.value !== "custom-editor") exerciseNames.add(label);
  });

  savedEditorExercises.forEach((exercise) => {
    if (exercise.name) exerciseNames.add(exercise.name);
  });

  patientRecordings.forEach((recording) => {
    if (recording.uebung) exerciseNames.add(recording.uebung);
  });

  playbackExerciseSelect.innerHTML = "";
  const allOption = document.createElement("option");
  allOption.value = "";
  allOption.textContent = "Alle Übungen";
  playbackExerciseSelect.append(allOption);

  [...exerciseNames].sort((a, b) => a.localeCompare(b, "de")).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    playbackExerciseSelect.append(option);
  });

  playbackExerciseSelect.value = Array.from(playbackExerciseSelect.options).some(
    (option) => option.value === currentValue,
  )
    ? currentValue
    : "";
}

async function openPlaybackExerciseSelection() {
  const selectedExerciseName = playbackExerciseSelect?.value || "";
  const patientRecordings = getPatientRecordings();
  const matchingRecordings = selectedExerciseName
    ? patientRecordings.filter(
        (recording) =>
          normalizeEditorExerciseName(recording.uebung) === normalizeEditorExerciseName(selectedExerciseName),
      )
    : patientRecordings;

  renderPlaybackRecordingAccess(patientRecordings, selectedExerciseName);

  if (matchingRecordings.length) {
    await openStoredRecording(matchingRecordings[0].id);
    return;
  }

  if (selectedExerciseName) {
    selectRecordingExerciseByName(selectedExerciseName);
    setActiveView("record");
    message.textContent = `Übung geladen: ${selectedExerciseName}. Noch keine Aufzeichnung vorhanden.`;
  } else {
    message.textContent = "Bitte eine Übung oder Aufzeichnung im Player auswählen.";
  }
}

function selectRecordingExerciseByName(name) {
  if (!exerciseName || !name) return false;
  renderRecordingExerciseOptions(name);
  const matchingOption = Array.from(exerciseName.options).find(
    (option) =>
      option.value === name ||
      normalizeEditorExerciseName(option.textContent) === normalizeEditorExerciseName(name),
  );

  if (!matchingOption) return false;
  exerciseName.value = matchingOption.value;
  loadRecordingKaraokeSpeedForCurrentExercise();
  setupKaraokeText();
  renderRecordingExerciseShortcuts();
  return true;
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
  renderPlaybackRecordingAccess(getPatientRecordings(), metadata.id);
  renderAudioAnalysis(metadata);
  message.textContent = "Aufnahme aus dem Verlauf geöffnet.";
}

function getPatientRecordings() {
  const selectedPatient = getCurrentPatientName();
  return allRecordings
    .filter((recording) => (recording.patientName || "Demo Patient") === selectedPatient)
    .sort((a, b) => b.datum.localeCompare(a.datum));
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
  setPlayPauseButtonState("play");
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
  adaptiveVolumeNoiseFloor = 0;
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
  stopInstructionAudio();

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
    help: "Hilfe",
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

async function deleteStoredRecordingById(id) {
  const storedRecording = await getRecording(id);
  const metadata = storedRecording ? (() => {
    const { videoBlob, audioBlob, ...recordingMetadata } = storedRecording;
    return recordingMetadata;
  })() : allRecordings.find((recording) => recording.id === id);

  await deleteRecording(id);

  if (currentMetadata?.id === id) {
    clearCurrentRecording();
  }

  if (selectedAnalysisRecordingId === id) {
    selectedAnalysisRecordingId = "";
    selectedAnalysisPosition = 0;
    selectedAnalysisStart = 0;
    selectedAnalysisEnd = 1;
    statisticsRangeZoomed = false;
  }

  await refreshRecordings();
  message.textContent = "Aufnahme gelöscht.";

  if (metadata) {
    deleteCloudRecording(metadata).catch(() => {
      firebaseState.textContent = "Lokal gelöscht. Firebase-Löschen fehlgeschlagen.";
    });
  }
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


