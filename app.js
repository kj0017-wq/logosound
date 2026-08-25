import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import {
  collection,
  deleteField,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const cameraPreview = document.querySelector("#cameraPreview");
const cameraStartOverlay = document.querySelector("#cameraStartOverlay");
const cameraStartButton = document.querySelector("#cameraStartButton");
const avatarButton = document.querySelector("#avatarButton");
const menuButton = document.querySelector("#menuButton");
const appMenu = document.querySelector("#appMenu");
const copyAppLinkButton = document.querySelector("#copyAppLinkButton");
const topBarTitle = document.querySelector("#topBarTitle");
const toggleVideoButton = document.querySelector("#toggleVideoButton");
const permissionState = document.querySelector("#permissionState");
const patientName = document.querySelector("#patientName");
const savePatientButton = document.querySelector("#savePatientButton");
const patientSuggestions = document.querySelector("#patientSuggestions");
const patientManagerName = document.querySelector("#patientManagerName");
const patientManagerSaveButton = document.querySelector("#patientManagerSaveButton");
const patientManagerState = document.querySelector("#patientManagerState");
const patientManagerList = document.querySelector("#patientManagerList");
const patientCourseAssignSelect = document.querySelector("#patientCourseAssignSelect");
const patientCourseAssignStartDate = document.querySelector("#patientCourseAssignStartDate");
const assignCourseToPatientButton = document.querySelector("#assignCourseToPatientButton");
const patientCourseAssignState = document.querySelector("#patientCourseAssignState");
const patientAssignedCourseList = document.querySelector("#patientAssignedCourseList");
const newDailyPlanButton = document.querySelector("#newDailyPlanButton");
const openDailyPlanButton = document.querySelector("#openDailyPlanButton");
const openDailyPlanControl = document.querySelector("#openDailyPlanControl");
const openDailyPlanSelect = document.querySelector("#openDailyPlanSelect");
const dailyPlanName = document.querySelector("#dailyPlanName");
const dailyPlanDescription = document.querySelector("#dailyPlanDescription");
const dailyPlanIntroImageSelect = document.querySelector("#dailyPlanIntroImageSelect");
const dailyPlanVoiceSelect = document.querySelector("#dailyPlanVoiceSelect");
const dailyPlanVoiceHint = document.querySelector("#dailyPlanVoiceHint");
const dailyPlanIntroAudioButton = document.querySelector("#dailyPlanIntroAudioButton");
const dailyPlanIntroPreview = document.querySelector("#dailyPlanIntroPreview");
const dailyPlanExerciseFilter = document.querySelector("#dailyPlanExerciseFilter");
const dailyPlanExerciseSearch = document.querySelector("#dailyPlanExerciseSearch");
const dailyPlanMediaFilter = document.querySelector("#dailyPlanMediaFilter");
const dailyPlanTopicFilter = document.querySelector("#dailyPlanTopicFilter");
const dailyPlanExerciseLibrary = document.querySelector("#dailyPlanExerciseLibrary");
const openDailyPlanLibraryButton = document.querySelector("#openDailyPlanLibraryButton");
const closeDailyPlanLibraryButton = document.querySelector("#closeDailyPlanLibraryButton");
const dailyPlanWorkspace = document.querySelector(".daily-plan-workspace");
const dailyPlanLibrary = document.querySelector(".daily-plan-library");
const dailyPlanSelectedExercises = document.querySelector("#dailyPlanSelectedExercises");
const dailyPlanSelectionSummary = document.querySelector("#dailyPlanSelectionSummary");
const dailyPlanLibrarySummary = document.querySelector("#dailyPlanLibrarySummary");
const saveDailyPlanButton = document.querySelector("#saveDailyPlanButton");
const dailyPlanEditorState = document.querySelector("#dailyPlanEditorState");
const dailyPlanList = document.querySelector("#dailyPlanList");
const userRoleSelect = document.querySelector("#userRoleSelect");
const newCourseButton = document.querySelector("#newCourseButton");
const editCourseButton = document.querySelector("#editCourseButton");
const courseNameInputGroup = document.querySelector("#courseNameInputGroup");
const courseNameSelectGroup = document.querySelector("#courseNameSelectGroup");
const courseNameSelect = document.querySelector("#courseNameSelect");
const courseName = document.querySelector("#courseName");
const courseDescription = document.querySelector("#courseDescription");
const coursePeriod = document.querySelector("#coursePeriod");
const courseSymbol = document.querySelector("#courseSymbol");
const courseMusic = document.querySelector("#courseMusic");
const coursePauseDuration = document.querySelector("#coursePauseDuration");
const courseExerciseLibrary = document.querySelector("#courseExerciseLibrary");
const courseSelectedExercises = document.querySelector("#courseSelectedExercises");
const saveCourseDraftButton = document.querySelector("#saveCourseDraftButton");
const courseEditorState = document.querySelector("#courseEditorState");
const courseList = document.querySelector("#courseList");
const musicTitle = document.querySelector("#musicTitle");
const musicCategory = document.querySelector("#musicCategory");
const musicFile = document.querySelector("#musicFile");
const musicDefaultVolume = document.querySelector("#musicDefaultVolume");
const musicDefaultVolumeValue = document.querySelector("#musicDefaultVolumeValue");
const musicIsDefault = document.querySelector("#musicIsDefault");
const saveMusicButton = document.querySelector("#saveMusicButton");
const musicPreview = document.querySelector("#musicPreview");
const musicList = document.querySelector("#musicList");
const mediaLibraryTitle = document.querySelector("#mediaLibraryTitle");
const mediaLibraryKind = document.querySelector("#mediaLibraryKind");
const mediaLibraryDescription = document.querySelector("#mediaLibraryDescription");
const mediaLibraryDuration = document.querySelector("#mediaLibraryDuration");
const mediaLibraryFile = document.querySelector("#mediaLibraryFile");
const saveMediaLibraryButton = document.querySelector("#saveMediaLibraryButton");
const backfillMediaLibraryThumbnailsButton = document.querySelector("#backfillMediaLibraryThumbnailsButton");
const mediaLibraryState = document.querySelector("#mediaLibraryState");
const mediaLibraryList = document.querySelector("#mediaLibraryList");
const mediaLibraryPlayer = document.querySelector("#mediaLibraryPlayer");
const closeMediaLibraryPlayerOverlayButton = document.querySelector("#closeMediaLibraryPlayerOverlayButton");
const mediaLibraryPlayerTitle = document.querySelector("#mediaLibraryPlayerTitle");
const mediaLibraryPlayerEmpty = document.querySelector("#mediaLibraryPlayerEmpty");
const mediaLibraryPlayerVideo = document.querySelector("#mediaLibraryPlayerVideo");
const mediaLibraryPlayerAudio = document.querySelector("#mediaLibraryPlayerAudio");
const mediaLibraryPlayerImage = document.querySelector("#mediaLibraryPlayerImage");
const myCourseList = document.querySelector("#myCourseList");
const coursePatientSwitcher = document.querySelector("#coursePatientSwitcher");
const coursePlayer = document.querySelector("#coursePlayer");
const myCoursesPanel = document.querySelector(".my-courses-panel");
const courseRecordingContext = document.querySelector("#courseRecordingContext");
const courseRecordingActions = document.querySelector("#courseRecordingActions");
const courseRecordingCourse = document.querySelector("#courseRecordingCourse");
const courseRecordingExercise = document.querySelector("#courseRecordingExercise");
const courseRecordingPlan = document.querySelector("#courseRecordingPlan");
const courseRecordingProgress = document.querySelector("#courseRecordingProgress");
const recordingModeFilter = document.querySelector("#recordingModeFilter");
const exerciseName = document.querySelector("#exerciseName");
const recordingExerciseShortcuts = document.querySelector("#recordingExerciseShortcuts");
const previewExerciseButton = document.querySelector("#previewExerciseButton");
const previewSessionBar = document.querySelector("#previewSessionBar");
const previewSessionLabel = document.querySelector("#previewSessionLabel");
const previewStopButton = document.querySelector("#previewStopButton");
const editorSavedExercises = document.querySelector("#editorSavedExercises");
const editorSavedModeFilter = document.querySelector("#editorSavedModeFilter");
const editorSavedExerciseList = document.querySelector("#editorSavedExerciseList");
const editorSavedListToggle = document.querySelector("#editorSavedListToggle");
const newEditorExerciseButton = document.querySelector("#newEditorExerciseButton");
const exerciseEditor = document.querySelector("#exerciseEditor");
const editorModeState = document.querySelector("#editorModeState");
const editorExerciseName = document.querySelector("#editorExerciseName");
const editorMode = document.querySelector("#editorMode");
const editorPatientScope = document.querySelector("#editorPatientScope");
const editorContent = document.querySelector("#editorContent");
const editorSentenceBuilder = document.querySelector("#editorSentenceBuilder");
const editorSentenceInput = document.querySelector("#editorSentenceInput");
const addEditorSentenceButton = document.querySelector("#addEditorSentenceButton");
const editorSentenceList = document.querySelector("#editorSentenceList");
const editorDialogBuilder = document.querySelector("#editorDialogBuilder");
const editorDialogList = document.querySelector("#editorDialogList");
const addEditorDialogTurnButton = document.querySelector("#addEditorDialogTurnButton");
const editorVoiceSelect = document.querySelector("#editorVoiceSelect");
const editorVoiceSelectHint = document.querySelector("#editorVoiceSelectHint");
const editorVoiceInstruction = document.querySelector("#editorVoiceInstruction");
const suggestVoiceButton = document.querySelector("#suggestVoiceButton");
const generateVoiceAudioButton = document.querySelector("#generateVoiceAudioButton");
const editorVoicePreview = document.querySelector("#editorVoicePreview");
const editorVoiceState = document.querySelector("#editorVoiceState");
const editorUseRepeats = document.querySelector("#editorUseRepeats");
const repeatControl = document.querySelector("#repeatControl");
const editorRepeatGroup = document.querySelector("#editorRepeatGroup");
const editorRepeats = document.querySelector("#editorRepeats");
const editorSpeed = document.querySelector("#editorSpeed");
const editorSpeedValue = document.querySelector("#editorSpeedValue");
const editorKaraokeTimingHint = document.querySelector("#editorKaraokeTimingHint");
const editorPreview = document.querySelector("#editorPreview");
const testEditorKaraokeButton = document.querySelector("#testEditorKaraokeButton");
const saveEditorExerciseButton = document.querySelector("#saveEditorExerciseButton");
const openEditorAiButton = document.querySelector("#openEditorAiButton");
const editorAiModal = document.querySelector("#editorAiModal");
const editorAiInputView = document.querySelector("#editorAiInputView");
const editorAiPreviewView = document.querySelector("#editorAiPreviewView");
const editorAiPrompt = document.querySelector("#editorAiPrompt");
const generateEditorAiExercisesButton = document.querySelector("#generateEditorAiExercisesButton");
const editorAiSummary = document.querySelector("#editorAiSummary");
const editorAiPreviewList = document.querySelector("#editorAiPreviewList");
const applyEditorAiExercisesButton = document.querySelector("#applyEditorAiExercisesButton");
const resetEditorAiButton = document.querySelector("#resetEditorAiButton");
const editorAiState = document.querySelector("#editorAiState");
const closeEditorAiButton = document.querySelector("#closeEditorAiButton");
const courseTodayOverlay = document.querySelector("#courseTodayOverlay");
const closeCourseTodayOverlayButton = document.querySelector("#closeCourseTodayOverlayButton");
const courseTodayOverlayTitle = document.querySelector("#courseTodayOverlayTitle");
const courseTodayOverlayMeta = document.querySelector("#courseTodayOverlayMeta");
const courseTodayOverlayList = document.querySelector("#courseTodayOverlayList");
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
const exerciseIntroOverlay = document.querySelector("#exerciseIntroOverlay");
const exerciseIntroCourse = document.querySelector("#exerciseIntroCourse");
const exerciseIntroTitle = document.querySelector("#exerciseIntroTitle");
const exerciseIntroText = document.querySelector("#exerciseIntroText");
const exerciseIntroState = document.querySelector("#exerciseIntroState");
const karaokeOverlay = document.querySelector("#karaokeOverlay");
const breathingOverlay = document.querySelector("#breathingOverlay");
const breathingBall = document.querySelector("#breathingBall");
const breathingPhase = document.querySelector("#breathingPhase");
const breathingRound = document.querySelector("#breathingRound");
const breathingCountdown = document.querySelector("#breathingCountdown");
const breathingStopButton = document.querySelector("#breathingStopButton");
const breathingCourseContext = document.querySelector("#breathingCourseContext");
const breathingCourseActions = document.querySelector("#breathingCourseActions");
const breathingSettings = document.querySelector("#breathingSettings");
const breathingInhale = document.querySelector("#breathingInhale");
const breathingHold = document.querySelector("#breathingHold");
const breathingExhale = document.querySelector("#breathingExhale");
const breathingPause = document.querySelector("#breathingPause");
const breathingRepeats = document.querySelector("#breathingRepeats");
const breathingUseVoice = document.querySelector("#breathingUseVoice");
const breathingExtraSteps = document.querySelector("#breathingExtraSteps");
const addBreathingStepButton = document.querySelector("#addBreathingStepButton");
const editorTimingOptions = document.querySelector("#editorTimingOptions");
const playbackWaveform = document.querySelector("#playbackWaveform");
const recordButton = document.querySelector("#recordButton");
const message = document.querySelector("#message");
const playbackEmptyState = document.querySelector("#playbackEmptyState");
const emptyRecordButton = document.querySelector("#emptyRecordButton");
const emptyHistoryButton = document.querySelector("#emptyHistoryButton");
const resultPanel = document.querySelector("#resultPanel");
const resultTitle = document.querySelector("#resultTitle");
const resultCourseContext = document.querySelector("#resultCourseContext");
const durationBadge = document.querySelector("#durationBadge");
const resultEvaluationPanel = document.querySelector("#resultEvaluationPanel");
const resultEvaluationTitle = document.querySelector("#resultEvaluationTitle");
const resultEvaluationScore = document.querySelector("#resultEvaluationScore");
const resultEvaluationSummary = document.querySelector("#resultEvaluationSummary");
const resultEvaluationHints = document.querySelector("#resultEvaluationHints");
const resultEvaluationScores = document.querySelector("#resultEvaluationScores");
const recordingPlayer = document.querySelector("#recordingPlayer");
const playbackVideoCanvas = document.querySelector("#playbackVideoCanvas");
const playbackKaraokeOverlay = document.querySelector("#playbackKaraokeOverlay");
const playPauseButton = document.querySelector("#playPauseButton");
const playbackTextToggleButton = document.querySelector("#playbackTextToggleButton");
const playbackSeek = document.querySelector("#playbackSeek");
const playbackTimeLabel = document.querySelector("#playbackTimeLabel");
const playbackLibrary = document.querySelector(".playback-library");
const playbackExerciseSelect = document.querySelector("#playbackExerciseSelect");
const playbackOpenExerciseButton = document.querySelector("#playbackOpenExerciseButton");
const playbackRecordingSelect = document.querySelector("#playbackRecordingSelect");
const playbackOpenRecordingButton = document.querySelector("#playbackOpenRecordingButton");
const playbackSavedRecordingsList = document.querySelector("#playbackSavedRecordingsList");
const calibrationButton = document.querySelector("#calibrationButton");
const calibrationTestAudioButton = document.querySelector("#calibrationTestAudioButton");
const calibrationBackButton = document.querySelector("#calibrationBackButton");
const averageVolume = document.querySelector("#averageVolume");
const maxVolume = document.querySelector("#maxVolume");
const sampleCount = document.querySelector("#sampleCount");
const downloadAudioButton = document.querySelector("#downloadAudioButton");
const downloadJsonButton = document.querySelector("#downloadJsonButton");
const courseResultActions = document.querySelector("#courseResultActions");
const courseResultTitle = document.querySelector("#courseResultTitle");
const courseResultText = document.querySelector("#courseResultText");
const courseResultBackButton = document.querySelector("#courseResultBackButton");
const courseResultNextButton = document.querySelector("#courseResultNextButton");
const retakeButton = document.querySelector("#retakeButton");
const deleteButton = document.querySelector("#deleteButton");
const firebaseState = document.querySelector("#firebaseState");
const libraryTitle = document.querySelector("#libraryTitle");
const recordingCountBadge = document.querySelector("#recordingCountBadge");
const patientRecordingCount = document.querySelector("#patientRecordingCount");
const patientAverageDuration = document.querySelector("#patientAverageDuration");
const patientAverageVolume = document.querySelector("#patientAverageVolume");
const voiceProgressPanel = document.querySelector("#voiceProgressPanel");
const voiceProgressTitle = document.querySelector("#voiceProgressTitle");
const voiceProgressScore = document.querySelector("#voiceProgressScore");
const voiceProgressSummary = document.querySelector("#voiceProgressSummary");
const voiceProgressHints = document.querySelector("#voiceProgressHints");
const voiceProgressScores = document.querySelector("#voiceProgressScores");
const voiceProgressChart = document.querySelector("#voiceProgressChart");
const voiceProgressList = document.querySelector("#voiceProgressList");
const resetEvaluationButton = document.querySelector("#resetEvaluationButton");
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
const settingsCalibrationTestAudioButton = document.querySelector("#settingsCalibrationTestAudioButton");
const settingsCalibrationBackButton = document.querySelector("#settingsCalibrationBackButton");
const settingsCalibrationStatus = document.querySelector("#settingsCalibrationStatus");
const settingsEqSliders = document.querySelectorAll("[data-eq-band]");
const settingsEqSummary = document.querySelector("#settingsEqSummary");
const settingsEqTestButton = document.querySelector("#settingsEqTestButton");
const settingsEqStopButton = document.querySelector("#settingsEqStopButton");
const settingsEqResetButton = document.querySelector("#settingsEqResetButton");
const settingsEqAmplitudeCanvas = document.querySelector("#settingsEqAmplitudeCanvas");
const settingsEqFrequencyCanvas = document.querySelector("#settingsEqFrequencyCanvas");
const settingsEqAmplitudeValue = document.querySelector("#settingsEqAmplitudeValue");
const settingsEqFrequencyValue = document.querySelector("#settingsEqFrequencyValue");
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
const coursePlaylistAudio = new Audio();
coursePlaylistAudio.preload = "auto";
coursePlaylistAudio.playsInline = true;
const breathingVoiceAudio = new Audio();
breathingVoiceAudio.preload = "auto";
breathingVoiceAudio.playsInline = true;
const coursePlaylistVideo = document.createElement("video");
coursePlaylistVideo.preload = "auto";
coursePlaylistVideo.controls = true;
coursePlaylistVideo.playsInline = true;
coursePlaylistVideo.setAttribute("playsinline", "");
coursePlaylistVideo.setAttribute("webkit-playsinline", "");
let courseVisibleVideo = null;

const DB_NAME = "logosound-local";
const STORE_NAME = "recordings";
const SELECTED_PATIENT_KEY = "logosound-selected-patient";
const SELECTED_PATIENT_ID_KEY = "logosound-selected-patient-id";
const PATIENT_PROFILES_KEY = "logosound-patient-profiles";
const PATIENT_PROFILES_COLLECTION = "patientProfiles";
const ACTIVE_PATIENT_DOC = "activePatient";
const SENSITIVITY_KEY = "logosound-sensitivity";
const RECORDING_KARAOKE_SPEED_KEY = "logosound-recording-karaoke-speed";
const RECORDING_KARAOKE_SPEEDS_KEY = "logosound-recording-karaoke-speeds-by-exercise";
const TEXT_OVERLAY_VISIBLE_KEY = "logosound-text-overlay-visible";
const PLAYBACK_GAIN_KEY = "logosound-playback-gain";
const STATISTICS_WAVEFORM_HEIGHT_KEY = "logosound-statistics-waveform-height";
const ANALYSIS_CALIBRATION_KEY = "logosound-analysis-calibration";
const CALIBRATION_NOISE_KEY = "logosound-calibration-noise-floor";
const CALIBRATION_NOISE_DOC = "noiseCalibration";
const SETTINGS_EQ_KEY = "logosound-settings-eq";
const SETTINGS_EQ_DOC = "equalizer";
const ELEVENLABS_SETTINGS_KEY = "logosound-elevenlabs-settings";
const ELEVENLABS_SETTINGS_DOC = "elevenLabsVoices";
const CHATGPT_SETTINGS_DOC = "chatGptSettings";
const CHATGPT_SETTINGS_KEY = "logosound-chatgpt-settings";
const USER_ROLE_KEY = "logosound-user-role";
const COURSES_KEY = "logosound-courses";
const DAILY_PLANS_KEY = "logosound-daily-plans";
const COURSE_SESSIONS_KEY = "logosound-course-sessions";
const COURSE_ASSIGNMENTS_KEY = "logosound-course-assignments";
const RELAX_MUSIC_KEY = "logosound-relax-music";
const MEDIA_LIBRARY_KEY = "logosound-media-library";
const MEDIA_LIBRARY_TOPICS = ["Kein Thema", "Gesicht und Mimik", "Stimme", "Artikulation", "Atmung", "Kiefer und Lippen", "Zunge", "Mobilisation", "Koordination", "Balance", "Beintraining", "Gymnastik", "Entspannung"];
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
const CALIBRATION_SILENCE_MS = 2000;
const CALIBRATION_NOISE_GATE_MULTIPLIER = 1.85;
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
  11: { label: "Extrem", wordSeconds: 0.12, pauseSeconds: 0.03 },
  12: { label: "Ultra", wordSeconds: 0.09, pauseSeconds: 0.02 },
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
const firebaseAuth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);
const appSplash = document.querySelector("#appSplash");

let mediaStream;
let mediaRecorder;
let audioContext;
let instructionAudioContext;
let instructionAudioSource;
let playbackAudioContext;
let settingsEqAudioContext;
let settingsEqAudioSource;
let settingsEqFilters = [];
let settingsEqGain;
let settingsEqAnalyser;
let settingsEqAnimationFrame;
let settingsEqAmplitudes = [];
let settingsEqPitches = [];
let settingsEqStrengths = [];
let settingsEqCloudSaveTimerId;
let hasCloudChatGptApiKey = false;
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
let breathingSessionId = 0;
let breathingCountdownTimerId = null;
let breathingBallAnimation = null;
let breathingSpeechUtterance = null;
let breathingPhaseAudioCache = new Map();
let courseBreathingAutoStartTimerId = 0;
let isBreathingExerciseRunning = false;
let isCalibrating = false;
let calibrationReturnView = "record";
let allRecordings = [];
let saveTimeoutId;
let adaptiveNoiseFloor = 0;
let lastSilentSignalNoticeAt = 0;
let silentSignalStartedAt = 0;
let analyserRestartInProgress = false;
let adaptiveVolumeNoiseFloor = 0;
let calibrationNoiseFloor = loadCalibrationNoiseFloor();
let calibrationNoiseState = null;
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
let previewSegmentTimings = [];
let previewFallbackStartedAt = 0;
let previewFallbackDurationSeconds = 0;
let playbackKaraokeTimeline = [];
let activeKaraokeIndex = 0;
let sentenceSilenceStartedAt = 0;
let sentenceHasSpeechSinceAdvance = false;
let sentenceStopScheduled = false;
let sentencePeakVolumeSinceAdvance = 0;
let sentenceActiveStartedAt = 0;
let recordingKaraokeEvents = [];
let activeRecordingKaraokeEvent = null;
let dialogVoiceInProgress = false;
let dialogVoiceTurnIndex = -1;
let dialogAdvanceLock = false;
let dialogVoiceMeterUntil = 0;
let dialogVoiceMeterStartedAt = 0;
let playbackAnimationFrame;
let playbackVideoCanvasContext = playbackVideoCanvas?.getContext?.("2d") || null;
let autoStopTimeoutId;
let hardStopTimeoutId;
let responsiveRefreshId;
let cameraStartRetryId;
let savedEditorExercise;
let savedEditorExercises = [];
let patientProfiles = [];
let userRole = localStorage.getItem(USER_ROLE_KEY) || "therapist";
let courses = [];
let dailyPlans = [];
let openDailyPlanRefreshToken = 0;
let courseSessions = [];
let courseAssignments = [];
let relaxMusicItems = [];
let mediaLibraryItems = [];
let selectedMediaLibraryItemId = "";
const pendingMediaThumbnailIds = new Set();
let expandedMyCourseAssignmentId = "";
let editingMediaLibraryItemId = "";
let editingDailyPlanPauseKey = "";
let editingDailyPlanId = "";
let editingCourseId = "";
let dailyPlanDraftExercises = [];
let dailyPlanIntroDraftAudio = null;
let courseDraftPlans = [];
let activeCourseRun = null;
let coursePauseTimerId = 0;
let courseAutoAdvanceTimerId = 0;
let courseMusicAudio = null;
let coursePlaylistAudioUnlocked = false;
let coursePlaylistAudioEndHandler = null;
let coursePlaylistAudioErrorHandler = null;
let coursePlaylistAudioContext = null;
let coursePlaylistAudioSource = null;
let coursePlaylistAudioGain = null;
let coursePlaylistAudioLoadToken = 0;
let coursePlaylistPrimedUrl = "";
let coursePlaylistPrimedVideoUrl = "";
let coursePlaylistVideoAudioUnlocked = false;
let courseIntroPlaybackPromise = null;
let mediaLibraryRefreshPromise = null;
let firebaseAuthReadyPromise = null;
let patientProfileSaveTimerId = 0;
let isApplyingPatientProfile = false;
let editorDialogTurnsState = [];
let breathingExtraStepsState = [];
let activeEditorExerciseName = "";
let editorSavedListExpanded = false;
let editingEditorSentenceIndex = -1;
let editorVoiceAudioDataUrl = "";
let editorVoiceAudioUrl = "";
let editorVoiceAudioPath = "";
let editorVoiceAudioVoiceId = "";
let editorVoiceAudioVoiceSettings = null;
let editorVoiceAudioTextHash = "";
let editorVoiceAudioUpdatedAt = "";
let editorSaveFeedbackTimerId = 0;
let editorAiGeneratedPayload = null;
let settingsVoiceTestUrl = "";
let isVideoPreviewHidden = false;
let instructionPlaybackActive = false;
let isTextOverlayVisible = localStorage.getItem(TEXT_OVERLAY_VISIBLE_KEY) !== "0";
let activeCaptureRotationDegrees = 0;
let activeCaptureSourceWidth = 0;
let activeCaptureSourceHeight = 0;

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
applyTextOverlayVisibility();
setActiveView("record");
hideSplashAfterStartup();

init().catch((error) => {
  console.error("LogoSound konnte nicht vollständig starten", error);
  recordButton.disabled = false;
  permissionState.textContent = "Bereit";
  message.textContent = "Ein Bereich konnte nicht geladen werden. Die App ist trotzdem bereit.";
  hideSplashAfterStartup();
});

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

document.querySelector(".help-panel")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-help-target]");
  if (!button) return;
  setActiveView(button.dataset.helpTarget);
});

copyAppLinkButton?.addEventListener("click", async () => {
  const appLink = `${PRODUCTION_ORIGIN}/`;
  try {
    await navigator.clipboard?.writeText(appLink);
    copyAppLinkButton.textContent = "Link kopiert";
  } catch (error) {
    copyAppLinkButton.textContent = "Link sichtbar";
  }

  window.setTimeout(() => {
    copyAppLinkButton.textContent = "Link kopieren";
  }, 1800);
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
  schedulePatientProfileRefresh(150);
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    if (mediaStream) ensureCameraPreviewPlaying();
    schedulePatientProfileRefresh(150);
  }
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
  if (analysisPlayRow && statisticsRecordingSelect) {
    statisticsRecordingSelect.after(analysisPlayRow);
  }

  if (statisticsRangeControl && analysisMiniGrid) {
    analysisMiniGrid.after(statisticsRangeControl);
  }

  if (analysisCalibrationPanel && statisticsRangeControl) {
    statisticsRangeControl.after(analysisCalibrationPanel);
  }

  if (audioAnalysisTitle && analysisCalibrationPanel) {
    analysisCalibrationPanel.after(audioAnalysisTitle);
  }

  if (audioAnalysisGrid && audioAnalysisTitle) {
    audioAnalysisTitle.after(audioAnalysisGrid);
  }
}

function positionPlaybackLibrary() {
  if (!playbackLibrary || !resultPanel) return;
  resultPanel.after(playbackLibrary);
  playbackLibrary.querySelector('label[for="playbackExerciseSelect"]')?.remove();
  playbackExerciseSelect?.closest(".playback-library-row")?.remove();
}

async function init() {
  repairStaticUiLabels();
  positionAnalysisCalibrationPanel();
  positionPlaybackLibrary();
  drawWaveform(liveWaveform, [], {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    stereoLevelMeter: true,
    currentLevel: 0,
    currentLeftLevel: 0,
    currentRightLevel: 0,
  });
  updateVoiceFrequencyDisplay(0, 0);
  drawFrequencyTimeline(frequencyTimeline, [], []);
  drawWaveform(playbackWaveform, [], { mode: "playback" });
  updateEditorForm();
  setupKaraokeText();
  syncBreathingRecordPreview();
  permissionState.textContent = "Bereit";
  message.textContent = "Kamera und Mikrofon vor der ersten Übung aktivieren.";
  recordButton.disabled = false;
  loadCloudEditorExercises().then(() => {
    updateEditorForm();
    setupKaraokeText();
  });
  const cloudTasks = [
    loadCloudElevenLabsSettings,
    loadCloudChatGptSettings,
    loadCloudEqualizerSettings,
    loadCloudNoiseCalibration,
    loadCloudPatientProfiles,
    loadCourseModuleData,
    refreshRecordings,
  ];
  const results = await Promise.allSettled(cloudTasks.map((task) => task()));
  results.forEach((result) => {
    if (result.status === "rejected") console.warn("Cloud-Daten konnten nicht geladen werden", result.reason);
  });
  schedulePatientProfileRefresh(1200);
}

function repairStaticUiLabels() {
  const savedModeLabels = {
    "": "Alle Funktionsarten",
    syllables: "Silben / Laute",
    sentences: "Kurze S\u00e4tze",
    text: "Karaoke-Text",
    long_text: "Langer Text",
    vowels: "Vokale",
    dialog: "Dialog",
  };

  Array.from(editorSavedModeFilter?.options || []).forEach((option) => {
    if (Object.prototype.hasOwnProperty.call(savedModeLabels, option.value)) {
      option.textContent = savedModeLabels[option.value];
    }
  });

  Array.from(recordingModeFilter?.options || []).forEach((option) => {
    if (Object.prototype.hasOwnProperty.call(savedModeLabels, option.value)) {
      option.textContent = savedModeLabels[option.value];
    }
  });

  calibrationBackButton && (calibrationBackButton.textContent = "Zur\u00fcck");
}

recordButton.addEventListener("click", async (event) => {
  event.stopImmediatePropagation();
  try {
    clearCourseAutoAdvanceTimer();

    if (isCourseMediaLocked() && exerciseName.value !== getActiveCourseExercise()?.exerciseId) {
      clearActiveCourseRun();
    }

    if (isRecording || mediaRecorder?.state === "recording") {
      stopRecording();
      return;
    }

    stopExercisePreview();
    const selectedBreathingExercise = getActiveRecordingExercise();
    if (!selectedBreathingExercise) {
      message.textContent = "Übung konnte nicht geladen werden. Bitte Auswahl erneut öffnen.";
      recordButton.disabled = false;
      recordButton.textContent = "Übung starten";
      return;
    }
    if (isBreathingExercise(selectedBreathingExercise)) {
      await startBreathingExercise(selectedBreathingExercise);
      return;
    }
    await withTimeout(unlockInstructionAudio(), 900).catch(() => false);
    recordButton.disabled = true;
    recordButton.textContent = "Start wird vorbereitet";
    message.textContent = "Kamera und Mikrofon werden geprüft.";
    const streamReady = await withTimeout(ensureMediaStream(), 6500).catch(() => hasActiveMediaStream());
    if (!streamReady && !hasActiveMediaStream()) {
      recordButton.disabled = false;
      recordButton.textContent = "\u00dcbung starten";
      message.textContent = "Kamera/Mikrofon konnten nicht aktiviert werden.";
      return;
    }

    await withTimeout(ensureCameraPreviewPlaying(), 1200).catch(() => false);
    const activeExercise = getActiveRecordingExercise();
    const audioPreparation = prepareRecordingAudio({
      preferExistingStream: activeExercise?.mode === "dialog",
    });
    await runCountdownAndStart(audioPreparation);
  } catch (error) {
    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
    hideExerciseIntroScreen();
    countdownOverlay.classList.add("is-hidden");
    message.textContent = `Startfehler: ${error?.message || error?.name || "Bitte erneut versuchen."}`;
  }
}, true);

previewExerciseButton?.addEventListener("click", async () => {
  if (isCourseMediaLocked()) {
    showCourseMediaLockMessage();
    return;
  }
  if (isPreviewingExercise) {
    stopExercisePreview();
    return;
  }

  await startExercisePreview();
});

previewStopButton?.addEventListener("click", () => {
  stopExercisePreview();
});

breathingStopButton?.addEventListener("click", () => {
  stopBreathingExercise("Atemübung beendet.");
});
breathingCourseActions?.addEventListener("click", (event) => {
  const action = event.target.closest("button")?.dataset.action;
  if (!action) return;
  finishCourseBreathingAction(action);
});
courseRecordingActions?.addEventListener("click", (event) => {
  const action = event.target.closest("button")?.dataset.action;
  if (!action) return;
  finishCourseRecordingAction(action);
});

savePatientButton.addEventListener("click", async () => {
  await selectPatient(patientName.value);
});

patientName.addEventListener("change", async () => {
  await selectPatient(patientName.value);
});

patientManagerSaveButton?.addEventListener("click", async () => {
  await selectPatient(patientManagerName?.value || patientName.value);
});

patientManagerName?.addEventListener("change", async () => {
  await selectPatient(patientManagerName.value);
});

coursePatientSwitcher?.addEventListener("change", async () => {
  if (!coursePatientSwitcher.value) return;
  await selectPatient(coursePatientSwitcher.value);
  setActiveView("myCourses");
});

assignCourseToPatientButton?.addEventListener("click", async () => {
  await assignSelectedCourseToPatients();
});

userRoleSelect?.addEventListener("change", () => {
  userRole = userRoleSelect.value || "therapist";
  localStorage.setItem(USER_ROLE_KEY, userRole);
  updateRoleMenuVisibility();
  renderCourseViews();
});

newCourseButton?.addEventListener("click", () => resetCourseEditor());
editCourseButton?.addEventListener("click", () => openCourseEditorForEditing());
courseNameSelect?.addEventListener("change", () => openCourseEditorForEditing(courseNameSelect.value));
newDailyPlanButton?.addEventListener("click", () => {
  setDailyPlanEditorMode("new");
  resetDailyPlanEditor();
});
openDailyPlanButton?.addEventListener("click", () => {
  setDailyPlanEditorMode("open");
});
openDailyPlanSelect?.addEventListener("change", () => {
  const plan = getDailyPlanSelectItems().find((item) => item.id === openDailyPlanSelect.value);
  if (!plan) return;
  resetDailyPlanEditor(plan);
  openDailyPlanControl?.classList.add("is-hidden");
  openDailyPlanButton?.classList.remove("is-active");
});
dailyPlanDescription?.addEventListener("input", () => invalidateDailyPlanIntroAudio());
dailyPlanVoiceSelect?.addEventListener("change", () => {
  invalidateDailyPlanIntroAudio();
  updateDailyPlanVoiceHint();
});
dailyPlanIntroAudioButton?.addEventListener("click", async () => {
  await generateDailyPlanIntroAudio({ play: true });
});
dailyPlanExerciseFilter?.addEventListener("change", () => renderDailyPlanExerciseLibrary());
dailyPlanExerciseSearch?.addEventListener("input", () => renderDailyPlanExerciseLibrary());
dailyPlanMediaFilter?.addEventListener("change", () => renderDailyPlanExerciseLibrary());
dailyPlanTopicFilter?.addEventListener("change", () => renderDailyPlanExerciseLibrary());
openDailyPlanLibraryButton?.addEventListener("click", () => setDailyPlanLibraryOpen(true));
closeDailyPlanLibraryButton?.addEventListener("click", () => setDailyPlanLibraryOpen(false));
saveDailyPlanButton?.addEventListener("click", async () => saveDailyPlanFromForm());
saveCourseDraftButton?.addEventListener("click", async () => saveCourseFromForm("active"));
musicDefaultVolume?.addEventListener("input", () => {
  if (musicDefaultVolumeValue) musicDefaultVolumeValue.textContent = `${musicDefaultVolume.value}%`;
});
musicFile?.addEventListener("change", () => {
  const file = musicFile.files?.[0];
  if (file && musicPreview) {
    musicPreview.src = URL.createObjectURL(file);
    musicPreview.load();
  }
});
saveMusicButton?.addEventListener("click", async () => saveRelaxMusicFromForm());
saveMediaLibraryButton?.addEventListener("click", async () => saveMediaLibraryFromForm());
backfillMediaLibraryThumbnailsButton?.addEventListener("click", async () => backfillMediaLibraryThumbnails());
closeMediaLibraryPlayerOverlayButton?.addEventListener("click", closeMediaLibraryPlayerOverlay);
mediaLibraryFile?.addEventListener("change", () => {
  const file = mediaLibraryFile.files?.[0];
  if (!file) {
    setMediaLibraryState("Audio, Video oder Bild auswählen.");
    return;
  }
  const mediaType = getMediaFileType(file.type, file.name);
  setMediaLibraryState(`${file.name} ausgewählt · ${mediaType === "audio" ? "Sound" : mediaType === "video" ? "Video" : "Bild"}`, "success");
});

exerciseName.addEventListener("change", () => {
  stopExercisePreview();
  loadRecordingKaraokeSpeedForCurrentExercise();
  setupKaraokeText();
  renderRecordingExerciseShortcuts();
  syncBreathingRecordPreview();
  message.textContent = `Übung ausgewählt: ${getExerciseLabel()}`;
});

recordingModeFilter?.addEventListener("change", () => {
  stopExercisePreview();
  renderRecordingExerciseOptions(exerciseName.value);
  loadRecordingKaraokeSpeedForCurrentExercise();
  setupKaraokeText();
  syncBreathingRecordPreview();
  message.textContent = recordingModeFilter.value
    ? `Funktionsart gefiltert: ${getEditorModeLabel(recordingModeFilter.value)}`
    : "Alle Funktionsarten sichtbar.";
});

[editorExerciseName, editorMode, editorPatientScope, editorContent, editorVoiceInstruction, editorUseRepeats, editorRepeats, editorSpeed, editorVoiceSelect, breathingInhale, breathingHold, breathingExhale, breathingPause, breathingRepeats, breathingUseVoice].forEach((input) => {
  input?.addEventListener("input", () => {
    if (input === editorVoiceSelect) handleEditorVoiceSelectionChange();
    if (input === editorContent && editorMode.value === "dialog") {
      editorDialogTurnsState = parseDialogTurns(editorContent.value);
    }
    saveEditorDraft();
    updateEditorForm();
    if (input === editorContent) renderEditorSentenceList();
    if (exerciseName.value === "custom-editor") setupKaraokeText();
  });
});

addBreathingStepButton?.addEventListener("click", () => {
  breathingExtraStepsState.push(normalizeBreathingExtraStep({ key: "hold", seconds: 2 }, breathingExtraStepsState.length));
  renderBreathingExtraSteps();
  saveEditorDraft();
  updateEditorForm();
});

editorVoiceSelect?.addEventListener("change", () => {
  handleEditorVoiceSelectionChange();
  saveEditorDraft();
  updateEditorForm();
});

editorMode.addEventListener("change", () => {
  editingEditorSentenceIndex = -1;
  updateEditorSentenceEditState();
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

saveEditorExerciseButton.addEventListener("click", async () => {
  await saveEditorExercise();
});

editorSavedExercises.addEventListener("change", () => {
  loadEditorExerciseIntoForm(editorSavedExercises.value);
});

editorSavedModeFilter?.addEventListener("change", () => {
  renderSavedEditorExercises();
});

newEditorExerciseButton.addEventListener("click", () => {
  activeEditorExerciseName = "";
  editorSavedExercises.value = "";
  editingEditorSentenceIndex = -1;
  updateEditorSentenceEditState();
  editorSavedListExpanded = false;
  updateEditorSavedListVisibility();
  resetEditorForm({ blank: true });
  saveEditorDraft();
});

editorSavedListToggle?.addEventListener("click", () => {
  editorSavedListExpanded = !editorSavedListExpanded;
  updateEditorSavedListVisibility();
});

suggestVoiceButton.addEventListener("click", async () => {
  await suggestVoiceInstruction();
});

generateVoiceAudioButton.addEventListener("click", async () => {
  await generateVoiceAudio();
});

openEditorAiButton?.addEventListener("click", () => {
  openEditorAiModal();
});

closeEditorAiButton?.addEventListener("click", () => {
  closeEditorAiModal();
});

closeCourseTodayOverlayButton?.addEventListener("click", () => {
  closeCourseTodayOverlay();
});

courseTodayOverlay?.addEventListener("click", (event) => {
  if (event.target === courseTodayOverlay) closeCourseTodayOverlay();
});
editorAiModal?.addEventListener("click", (event) => {
  if (event.target === editorAiModal) closeEditorAiModal();
});

generateEditorAiExercisesButton?.addEventListener("click", async () => {
  await generateEditorAiPreview();
});

resetEditorAiButton?.addEventListener("click", () => {
  resetEditorAiModal({ keepPrompt: true });
});

applyEditorAiExercisesButton?.addEventListener("click", async () => {
  await applyEditorAiPreview();
});

settingsTestVoiceButton?.addEventListener("click", async () => {
  await testElevenLabsSettingsVoice();
});

settingsVoicePreview?.addEventListener("play", () => {
  if (settingsEqStopButton) settingsEqStopButton.disabled = false;
  updateCalibrationTestAudioButton();
  startSettingsEqVisuals();
});

settingsVoicePreview?.addEventListener("pause", () => {
  if (settingsEqStopButton) settingsEqStopButton.disabled = true;
  updateCalibrationTestAudioButton();
  stopSettingsEqVisuals();
});

settingsVoicePreview?.addEventListener("ended", () => {
  if (settingsEqStopButton) settingsEqStopButton.disabled = true;
  updateCalibrationTestAudioButton();
  stopSettingsEqVisuals();
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
    stopCalibration({ restoreView: true });
  } else {
    await startCalibration({ returnView: "record" });
  }
});

calibrationBackButton?.addEventListener("click", () => {
  if (isCalibrating) stopCalibration({ restoreView: true });
});

calibrationTestAudioButton?.addEventListener("click", async () => {
  await handleCalibrationTestAudioClick();
});

settingsCalibrationTestAudioButton?.addEventListener("click", async () => {
  await handleCalibrationTestAudioClick();
});

async function handleCalibrationTestAudioClick() {
  if (settingsVoicePreview && !settingsVoicePreview.paused && !settingsVoicePreview.ended) {
    stopSettingsEqualizerTestAudio();
    updateCalibrationTestAudioButton();
    return;
  }

  if (calibrationNoiseState && !calibrationNoiseState.completed) {
    message.textContent = "Bitte erst die 2 Sekunden Stille abwarten, dann Testaudio starten.";
    return;
  }

  await playSettingsEqualizerTestAudio();
  updateCalibrationTestAudioButton();
}

settingsCalibrationButton?.addEventListener("click", async () => {
  if (isCalibrating) {
    stopCalibration({ restoreView: true });
  } else {
    const started = await startCalibration({ returnView: "settings", embedded: true });
    if (!started && settingsCalibrationStatus) {
      settingsCalibrationStatus.textContent = "Kalibrierung konnte nicht gestartet werden. Bitte Kamera und Mikrofon erlauben.";
    }
  }
});

settingsCalibrationBackButton?.addEventListener("click", () => {
  if (isCalibrating) stopCalibration({ restoreView: true });
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

settingsEqSliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    saveEqualizerSettingsFromControls({ syncCloud: true });
    renderEqualizerControls();
    applySettingsEqualizer();
  });
  slider.addEventListener("change", () => {
    saveEqualizerSettingsFromControls({ syncCloud: true, immediate: true });
    renderEqualizerControls();
    applySettingsEqualizer();
  });
});

settingsEqTestButton?.addEventListener("click", async () => {
  await playSettingsEqualizerTestAudio();
});

settingsEqStopButton?.addEventListener("click", () => {
  stopSettingsEqualizerTestAudio();
});

settingsEqResetButton?.addEventListener("click", () => {
  resetEqualizerSettings();
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

resetEvaluationButton?.addEventListener("click", () => {
  resetCurrentPatientEvaluationData();
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

playbackTextToggleButton?.addEventListener("click", () => {
  setTextOverlayVisible(!isTextOverlayVisible);
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
  if (isCourseMediaLocked()) {
    showCourseMediaLockMessage();
    return;
  }
  togglePlayback();
});

document.addEventListener("play", (event) => {
  if (!isCourseMediaLocked()) return;
  const mediaElement = event.target;
  if (!(mediaElement instanceof HTMLMediaElement)) return;
  if (mediaElement === cameraPreview || coursePlayer?.contains(mediaElement)) return;
  mediaElement.pause();
  showCourseMediaLockMessage();
}, true);

playbackSeek.addEventListener("input", () => {
  const measuredDuration = currentMetadata?.dauerSekunden || 0;
  const mediaDuration = Number.isFinite(recordingPlayer.duration) ? recordingPlayer.duration : 0;
  const targetDuration = measuredDuration || mediaDuration || 0;
  if (!targetDuration) return;

  const targetProgress = Number(playbackSeek.value) / 1000;
  const targetTime = analysisProgressToMediaTime(targetProgress, currentMetadata);
  recordingPlayer.currentTime = targetTime;
  updatePlaybackVisuals(targetProgress);
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

courseResultBackButton?.addEventListener("click", () => {
  if (!activeCourseRun) {
    setActiveView("myCourses");
    return;
  }
  coursePlayer?.classList.remove("is-hidden");
  renderCoursePlayer();
  setActiveView("myCourses");
});

courseResultNextButton?.addEventListener("click", () => {
  if (!activeCourseRun) {
    setActiveView("myCourses");
    return;
  }
  const nextExercise = (activeCourseRun.plan?.exercises || [])[activeCourseRun.index];
  if (!nextExercise) {
    coursePlayer?.classList.remove("is-hidden");
    renderCoursePlayer();
    setActiveView("myCourses");
    return;
  }
  openNextCourseExercise(nextExercise);
});

function clampBreathingSeconds(value, fallback, minimum = 0) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.max(minimum, Math.min(30, Math.round(number)));
}

const BREATHING_PHASE_OPTIONS = [
  { key: "inhale", label: "Einatmen", minimum: 1 },
  { key: "hold", label: "Halten", minimum: 0 },
  { key: "exhale", label: "Ausatmen", minimum: 1 },
  { key: "pause", label: "Pause", minimum: 0 },
];

function normalizeBreathingExtraStep(step = {}, index = 0) {
  const option = BREATHING_PHASE_OPTIONS.find((item) => item.key === step.key) || BREATHING_PHASE_OPTIONS[1];
  return {
    id: String(step.id || `breath-step-${Date.now()}-${index}`),
    key: option.key,
    seconds: clampBreathingSeconds(step.seconds, 2, option.minimum),
  };
}

function getBreathingExtraSteps(exercise = null) {
  const source = exercise?.breathing || exercise?.breathingSettings || {};
  const steps = Array.isArray(source.extraSteps)
    ? source.extraSteps
    : (exercise ? [] : breathingExtraStepsState);
  return steps.map((step, index) => normalizeBreathingExtraStep(step, index));
}

function renderBreathingExtraSteps() {
  if (!breathingExtraSteps) return;
  breathingExtraSteps.innerHTML = "";
  breathingExtraStepsState.forEach((step, index) => {
    const row = document.createElement("div");
    row.className = "breathing-extra-row";
    const phase = document.createElement("select");
    phase.setAttribute("aria-label", `Atemphase ${index + 1}`);
    BREATHING_PHASE_OPTIONS.forEach((option) => {
      const item = document.createElement("option");
      item.value = option.key;
      item.textContent = option.label;
      item.selected = option.key === step.key;
      phase.append(item);
    });
    const seconds = document.createElement("input");
    seconds.type = "number";
    seconds.min = String(BREATHING_PHASE_OPTIONS.find((item) => item.key === step.key)?.minimum || 0);
    seconds.max = "30";
    seconds.inputMode = "numeric";
    seconds.value = String(step.seconds);
    seconds.setAttribute("aria-label", `Dauer fuer Atemschritt ${index + 1}`);
    const suffix = document.createElement("span");
    suffix.textContent = "Sek.";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "compact-action breathing-extra-remove";
    remove.textContent = "x";
    remove.setAttribute("aria-label", `Atemschritt ${index + 1} entfernen`);
    phase.addEventListener("change", () => {
      const option = BREATHING_PHASE_OPTIONS.find((item) => item.key === phase.value) || BREATHING_PHASE_OPTIONS[1];
      breathingExtraStepsState[index] = normalizeBreathingExtraStep({ ...step, key: option.key, seconds: Math.max(option.minimum, Number(seconds.value) || 0) }, index);
      renderBreathingExtraSteps();
      saveEditorDraft();
      updateEditorForm();
    });
    seconds.addEventListener("input", () => {
      breathingExtraStepsState[index] = normalizeBreathingExtraStep({ ...step, seconds: seconds.value }, index);
      saveEditorDraft();
      updateEditorForm();
    });
    remove.addEventListener("click", () => {
      breathingExtraStepsState.splice(index, 1);
      renderBreathingExtraSteps();
      saveEditorDraft();
      updateEditorForm();
    });
    row.append(phase, seconds, suffix, remove);
    breathingExtraSteps.append(row);
  });
  breathingExtraSteps.classList.toggle("is-empty", breathingExtraStepsState.length === 0);
}

function getBreathingSettings(exercise = null) {
  const source = exercise?.breathing || exercise?.breathingSettings || {};
  const useVoice = true;
  return {
    inhale: clampBreathingSeconds(source.inhale ?? breathingInhale?.value, 4, 1),
    hold: clampBreathingSeconds(source.hold ?? breathingHold?.value, 2),
    exhale: clampBreathingSeconds(source.exhale ?? breathingExhale?.value, 6, 1),
    pause: clampBreathingSeconds(source.pause ?? breathingPause?.value, 2),
    repeats: Math.max(1, Math.min(30, Math.round(Number(source.repeats ?? breathingRepeats?.value) || 5))),
    useVoice,
    extraSteps: getBreathingExtraSteps(exercise),
  };
}

function getBreathingExerciseDuration(exercise) {
  const settings = getBreathingSettings(exercise);
  const extraSeconds = settings.extraSteps.reduce((total, step) => total + step.seconds, 0);
  return (settings.inhale + settings.hold + settings.exhale + settings.pause + extraSeconds) * settings.repeats;
}

function getBreathingPhaseScale(phaseKey) {
  if (phaseKey === "inhale" || phaseKey === "hold") return 1;
  return 0.64;
}

function updateBreathingOverlay(phase, round, settings, remaining, startAnimation = true, previousPhase = null) {
  if (!breathingOverlay) return;
  breathingOverlay.classList.remove("is-hidden");
  breathingOverlay.dataset.phase = phase.key;
  breathingOverlay.style.setProperty("--breathing-phase-duration", `${Math.max(400, phase.seconds * 1000)}ms`);
  if (startAnimation && breathingBall) {
    breathingBallAnimation?.cancel?.();
    const fromScale = previousPhase ? getBreathingPhaseScale(previousPhase.key) : (phase.key === "inhale" ? 0.64 : getBreathingPhaseScale(phase.key));
    const toScale = getBreathingPhaseScale(phase.key);
    const duration = Math.max(400, phase.seconds * 1000);
    breathingBall.style.animation = "none";
    breathingBall.style.transition = "none";
    breathingBall.style.transform = `scale(${fromScale})`;
    void breathingBall.offsetWidth;
    window.requestAnimationFrame(() => {
      breathingBall.style.animation = `breathing-phase-${phase.key} ${duration}ms ease-in-out both`;
      breathingBall.style.transform = `scale(${toScale})`;
    });
    let cancelled = false;
    const animationTimeoutId = window.setTimeout(() => {
      if (cancelled) return;
      breathingBall.style.transition = "";
      breathingBall.style.transform = `scale(${toScale})`;
      breathingBallAnimation = null;
    }, duration + 80);
    breathingBallAnimation = {
      cancel() {
        cancelled = true;
        window.clearTimeout(animationTimeoutId);
        breathingBall.style.animation = "none";
        breathingBall.style.transition = "none";
      },
    };
  }
  if (breathingPhase) breathingPhase.textContent = phase.label;
  if (breathingRound) breathingRound.textContent = `Runde ${round} von ${settings.repeats}`;
  if (breathingCountdown) breathingCountdown.textContent = `${Math.max(0, remaining)} s`;
}

function waitForBreathingPhase(seconds, sessionId, onTick) {
  return new Promise((resolve) => {
    window.clearTimeout(breathingCountdownTimerId);
    let settled = false;
    let timerId = null;
    const endAt = Date.now() + seconds * 1000;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      if (timerId) window.clearTimeout(timerId);
      if (breathingCountdownTimerId === timerId) breathingCountdownTimerId = null;
      resolve(value);
    };
    const tick = () => {
      if (sessionId !== breathingSessionId || !isBreathingExerciseRunning) {
        finish(false);
        return;
      }
      const remaining = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      onTick(remaining);
      if (remaining <= 0) finish(true);
      else {
        timerId = window.setTimeout(tick, 180);
        breathingCountdownTimerId = timerId;
      }
    };
    tick();
  });
}

async function completeCourseBreathingExercise(exercise) {
  if (!activeCourseRun || getActiveCourseExercise()?.exerciseId !== exercise?.name && getActiveCourseExercise()?.exerciseId !== exercise?.exerciseId) return;
  const session = activeCourseRun.session;
  if (!session) return;
  session.completedExerciseIds = Array.isArray(session.completedExerciseIds) ? session.completedExerciseIds : [];
  const courseExercise = getActiveCourseExercise();
  if (courseExercise?.exerciseId && !session.completedExerciseIds.includes(courseExercise.exerciseId)) {
    session.completedExerciseIds.push(courseExercise.exerciseId);
  }
  activeCourseRun.index += 1;
  session.currentExerciseIndex = activeCourseRun.index;
  session.updatedAt = new Date().toISOString();
  session.status = activeCourseRun.index >= (activeCourseRun.plan?.exercises?.length || 0)
    ? "completed"
    : (activeCourseRun.playlistMode ? "in_progress" : "paused");
  courseSessions = mergeById(courseSessions, [session]);
  persistCourseModuleData();
  await saveCourseSessionToCloud(session).catch(() => {});
  renderCourseViews();
  if (session.status !== "completed" && activeCourseRun.playlistMode) {
    window.setTimeout(() => continueCoursePlaylist(), 350);
  }
}

function clearBreathingPhaseAudioCache() {
  breathingPhaseAudioCache.forEach((url) => {
    if (String(url || "").startsWith("blob:")) URL.revokeObjectURL(url);
  });
  breathingPhaseAudioCache = new Map();
}

function stopBreathingVoice() {
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (error) {}
  }
  try {
    breathingVoiceAudio.pause();
    breathingVoiceAudio.removeAttribute("src");
    breathingVoiceAudio.load();
  } catch (error) {}
  breathingSpeechUtterance = null;
}

async function unlockBreathingVoice() {
  await unlockInstructionAudio().catch(() => false);
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return false;
  try {
    window.speechSynthesis.getVoices?.();
    window.speechSynthesis.resume?.();
    return true;
  } catch (error) {
    return false;
  }
}

function getBreathingPhaseVoiceText(phase) {
  if (!phase) return "";
  if (phase.key === "exhale") return "Langsam ausatmen";
  return String(phase.label || "").trim();
}

function getGermanSpeechVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return voices.find((voice) => String(voice.lang || "").toLowerCase().startsWith("de")) || null;
}

function createBreathingUtterance(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const germanVoice = getGermanSpeechVoice();
  if (germanVoice) utterance.voice = germanVoice;
  utterance.lang = "de-DE";
  utterance.rate = 0.82;
  utterance.pitch = 1;
  utterance.volume = 1;
  return utterance;
}

function speakBreathingPhase(phase) {
  if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return false;
  const text = getBreathingPhaseVoiceText(phase);
  if (!text) return false;
  stopBreathingVoice();

  const speak = (retry = false) => {
    try {
      window.speechSynthesis.resume?.();
      const utterance = createBreathingUtterance(text);
      utterance.onend = () => {
        if (breathingSpeechUtterance === utterance) breathingSpeechUtterance = null;
      };
      utterance.onerror = () => {
        if (breathingSpeechUtterance === utterance) breathingSpeechUtterance = null;
        if (!retry) window.setTimeout(() => speak(true), 180);
      };
      breathingSpeechUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (error) {
      if (breathingSpeechUtterance) breathingSpeechUtterance = null;
      return false;
    }
  };

  const started = speak(false);
  window.setTimeout(() => window.speechSynthesis.resume?.(), 80);
  window.setTimeout(() => {
    if (breathingSpeechUtterance && !window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
      speak(true);
    }
  }, 320);
  return started;
}
async function prepareBreathingPhaseAudio(phases) {
  clearBreathingPhaseAudioCache();
  const texts = [...new Set(phases.map((phase) => getBreathingPhaseVoiceText(phase)).filter(Boolean))];
  const entries = await Promise.all(texts.map(async (text) => {
    const url = await createTemporaryVoiceAudio(text).catch(() => "");
    return url ? [text, url] : null;
  }));
  breathingPhaseAudioCache = new Map(entries.filter(Boolean));
}

function playBreathingPhaseVoice(phase) {
  const text = getBreathingPhaseVoiceText(phase);
  const audioUrl = text ? breathingPhaseAudioCache.get(text) : "";
  if (!audioUrl) return speakBreathingPhase(phase);
  stopBreathingVoice();
  try {
    breathingVoiceAudio.src = audioUrl;
    breathingVoiceAudio.currentTime = 0;
    breathingVoiceAudio.muted = false;
    breathingVoiceAudio.volume = 1;
    breathingVoiceAudio.play().catch(() => speakBreathingPhase(phase));
    return true;
  } catch (error) {
    return speakBreathingPhase(phase);
  }
}

function getCourseBreathingMode() {
  return Boolean(activeCourseRun && !isPreviewingExercise && isBreathingExercise(getActiveCourseExercise()));
}

function setBreathingCourseUiVisible(visible, exerciseOverride = null) {
  document.body.classList.toggle("course-breathing-active", Boolean(visible));
  breathingCourseContext?.classList.toggle("is-hidden", !visible);
  breathingCourseActions?.classList.toggle("is-hidden", !visible);
  breathingStopButton?.classList.toggle("is-hidden", Boolean(visible));
  if (!visible) {
    if (breathingCourseContext) breathingCourseContext.innerHTML = "";
    return;
  }
  const run = activeCourseRun || {};
  const exercise = exerciseOverride || getActiveCourseExercise();
  const index = Number(run?.index || 0);
  const total = run?.plan?.exercises?.length || (exercise ? 1 : 0);
  const courseName = run?.course?.name || "Kurs";
  const planName = run?.plan?.title || run?.plan?.name || "Tagesplan";
  const exerciseTitle = exercise?.title || exercise?.name || "Atemübung";
  if (breathingCourseContext) {
    breathingCourseContext.innerHTML = `
      <span>Kurs</span>
      <strong>${escapeHtml(courseName)}</strong>
      <small>${escapeHtml(planName)} · ${escapeHtml(exerciseTitle)} · Übung ${index + 1} von ${total || 1}</small>
    `;
  }
}

async function finishCourseBreathingAction(action) {
  const exercise = getActiveCourseExercise();
  if (!activeCourseRun || !isBreathingExercise(exercise)) {
    stopBreathingExercise("Atemübung beendet.");
    return;
  }
  if (action === "cancel") {
    stopBreathingExercise("Atemübung beendet.");
    return;
  }
  const session = activeCourseRun.session;
  session.completedExerciseIds = Array.isArray(session.completedExerciseIds) ? session.completedExerciseIds : [];
  session.skippedExerciseIds = Array.isArray(session.skippedExerciseIds) ? session.skippedExerciseIds : [];
  if (action === "skip" && exercise.exerciseId && !session.skippedExerciseIds.includes(exercise.exerciseId)) {
    session.skippedExerciseIds.push(exercise.exerciseId);
  }
  stopBreathingExercise(action === "skip" ? "Atemübung übersprungen." : "Atemübung beendet.", { keepCourseRun: true });
  if (action === "done") {
    await completeCourseBreathingExercise(exercise);
    return;
  }
  activeCourseRun.index += 1;
  session.currentExerciseIndex = activeCourseRun.index;
  session.status = activeCourseRun.index >= (activeCourseRun.plan?.exercises?.length || 0)
    ? "completed"
    : (activeCourseRun.playlistMode ? "in_progress" : "paused");
  session.updatedAt = new Date().toISOString();
  courseSessions = mergeById(courseSessions, [session]);
  persistCourseModuleData();
  await saveCourseSessionToCloud(session).catch(() => {});
  if (session.status !== "completed" && activeCourseRun.playlistMode) {
    runCourseTransition(exercise, () => continueCoursePlaylist());
  } else {
    renderCourseViews();
  }
}
function stopBreathingExercise(statusText = "Atemübung beendet.", options = {}) {
  const shouldCancelCourseRun = Boolean(
    activeCourseRun
    && !isPreviewingExercise
    && isBreathingExercise(getActiveCourseExercise())
    && !options.keepCourseRun
  );
  breathingSessionId += 1;
  isBreathingExerciseRunning = false;
  window.clearTimeout(courseBreathingAutoStartTimerId);
  courseBreathingAutoStartTimerId = 0;
  window.clearTimeout(breathingCountdownTimerId);
  breathingCountdownTimerId = null;
  breathingBallAnimation?.cancel();
  breathingBallAnimation = null;
  stopBreathingVoice();
  clearBreathingPhaseAudioCache();
  hideExerciseIntroScreen();
  breathingOverlay?.classList.add("is-hidden");
  setBreathingCourseUiVisible(false);
  document.body.classList.remove("breathing-exercise-active", "course-breathing-active", "breathing-preview-idle");
  recordButton.disabled = false;
  recordButton.textContent = "Übung starten";
  if (isPreviewingExercise) {
    isPreviewingExercise = false;
    setPreviewSessionState(false);
    previewExerciseButton.disabled = false;
    previewExerciseButton.textContent = "Vorführung";
  }
  message.textContent = statusText;
  if (shouldCancelCourseRun) {
    cancelActiveCourseRunFromBreathing();
  } else {
    window.setTimeout(syncBreathingRecordPreview, 0);
  }
}

async function startBreathingExercise(exercise, options = {}) {
  if (!exercise) return;
  if (isBreathingExerciseRunning) {
    stopBreathingExercise("Atemübung wird neu gestartet.", { keepCourseRun: true });
  }
  clearCourseTransitionOverlay();
  window.clearTimeout(courseBreathingAutoStartTimerId);
  courseBreathingAutoStartTimerId = 0;
  clearCourseAutoAdvanceTimer();
  setCourseVideoFullscreen(false);
  stopCourseUnitMedia();
  stopCoursePauseMusic();
  stopInstructionAudio();
  stopBreathingVoice();
  clearBreathingPhaseAudioCache();

  // Atemübungen haben keinen Aufnahme-Countdown, brauchen aber denselben
  // aktiven Kamera-/Mikrofonstream wie die übrigen Übungen.
  const streamReady = await withTimeout(ensureMediaStream(), 6500).catch(() => hasActiveMediaStream());
  if (!streamReady && !hasActiveMediaStream()) {
    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
    message.textContent = "Kamera und Mikrofon konnten nicht aktiviert werden.";
    hideExerciseIntroScreen();
    breathingOverlay?.classList.add("is-hidden");
    return false;
  }
  await withTimeout(ensureCameraPreviewPlaying(), 1400).catch(() => false);

  const settings = getBreathingSettings(exercise);
  unlockBreathingVoice().catch(() => false);
  const phases = [
    { key: "inhale", label: "Einatmen", seconds: settings.inhale },
    { key: "hold", label: "Halten", seconds: settings.hold },
    { key: "exhale", label: "Ausatmen", seconds: settings.exhale },
    { key: "pause", label: "Pause", seconds: settings.pause },
    ...settings.extraSteps.map((step) => ({
      key: step.key,
      label: BREATHING_PHASE_OPTIONS.find((item) => item.key === step.key)?.label || "Pause",
      seconds: step.seconds,
    })),
  ].filter((phase) => phase.seconds > 0);

  const sessionId = ++breathingSessionId;
  isBreathingExerciseRunning = true;
  document.body.classList.remove("breathing-preview-idle");
  document.body.classList.add("breathing-exercise-active");
  const courseBreathingMode = Boolean(activeCourseRun && !options.preview && (isBreathingExercise(getActiveCourseExercise()) || options.fromCourse));
  if (courseBreathingMode) clearCourseRecordingContext();
  setBreathingCourseUiVisible(courseBreathingMode, exercise);
  recordButton.disabled = true;
  recordButton.textContent = options.preview ? "Vorführung läuft" : "Atemübung läuft";
  if (options.preview) {
    isPreviewingExercise = true;
    setPreviewSessionState(true, "Vorführung aktiv");
  }
  if (options.skipInstruction && phases[0]) {
    updateBreathingOverlay(phases[0], 1, settings, phases[0].seconds, false, null);
  }

  if (!options.skipInstruction) {
    message.textContent = "Atemübung wird vorbereitet.";
    recordButton.textContent = "Intro läuft";
    breathingOverlay?.classList.remove("is-hidden");
    if (phases[0]) {
      updateBreathingOverlay(phases[0], 1, settings, phases[0].seconds, false, null);
      if (breathingPhase) breathingPhase.textContent = "Bereit";
      if (breathingRound) breathingRound.textContent = `${settings.repeats} Runden`;
      if (breathingCountdown) breathingCountdown.textContent = "Start gleich";
    }
    const breathingInstruction =
      String(exercise?.voiceInstruction || "").trim() ||
      "Bereiten Sie sich auf die Atemübung vor. Folgen Sie gleich ruhig der Atemkugel.";
    window.speechSynthesis?.cancel?.();
    showExerciseIntroScreen(exercise, breathingInstruction);
    await playBreathingExerciseInstruction(exercise).catch(() => {});
    if (sessionId !== breathingSessionId || !isBreathingExerciseRunning) return;
    instructionPlaybackActive = false;
    for (const step of COUNTDOWN_STEPS) {
      if (breathingCountdown) breathingCountdown.textContent = `Start in ${step}`;
      await wait(320);
    }
    hideExerciseIntroScreen();
    if (courseBreathingMode) setBreathingCourseUiVisible(true, exercise);
  }

  if (sessionId !== breathingSessionId || !isBreathingExerciseRunning) return;
  await unlockBreathingVoice().catch(() => false);
  try {
    window.speechSynthesis?.resume?.();
  } catch (error) {}
  breathingOverlay?.classList.remove("is-hidden");

  if (phases[0]) {
    updateBreathingOverlay(phases[0], 1, settings, phases[0].seconds, true, null);
  }

  try {
    let previousPhase = null;
    for (let round = 1; round <= settings.repeats; round += 1) {
      for (const phase of phases) {
        if (sessionId !== breathingSessionId || !isBreathingExerciseRunning) return;
        updateBreathingOverlay(phase, round, settings, phase.seconds, true, previousPhase);
        if (settings.useVoice) {
          speakBreathingPhase(phase);
        }
        const completed = await waitForBreathingPhase(phase.seconds, sessionId, (remaining) => {
          if (sessionId === breathingSessionId) updateBreathingOverlay(phase, round, settings, remaining, false, previousPhase);
        });
        if (!completed) return;
        previousPhase = phase;
      }
    }
    if (sessionId !== breathingSessionId) return;
    stopBreathingExercise("Sehr gut. Die Atemübung ist beendet.", { keepCourseRun: !options.preview });
    if (!options.preview) await completeCourseBreathingExercise(exercise);
  } catch (error) {
    stopBreathingExercise("Atemübung wurde unterbrochen.");
  }
}

function getCurrentExerciseInstructionText() {
  return (
    getExerciseInstruction() ||
    EXERCISE_INSTRUCTIONS[exerciseName.value] ||
    "Bitte lesen Sie die eingeblendeten Wörter deutlich und ruhig vor."
  );
}

function showExerciseIntroScreen(exercise = getActiveRecordingExercise(), instruction = getCurrentExerciseInstructionText()) {
  if (!exerciseIntroOverlay) return;
  document.body.classList.add("exercise-intro-active");
  exerciseIntroOverlay.classList.remove("is-hidden");
  if (exerciseIntroTitle) exerciseIntroTitle.textContent = exercise?.name || exercise?.title || "Übung";
  if (exerciseIntroText) exerciseIntroText.textContent = instruction;
  if (exerciseIntroState) exerciseIntroState.textContent = "Ansage läuft...";

  if (!exerciseIntroCourse) return;
  if (activeCourseRun) {
    const courseExercise = getActiveCourseExercise() || exercise;
    const current = Math.min(activeCourseRun.plan?.exercises?.length || 0, Number(activeCourseRun.index || 0) + 1);
    const total = activeCourseRun.plan?.exercises?.length || 0;
    exerciseIntroCourse.innerHTML = `
      <span>Kurs</span>
      <strong>${escapeHtml(activeCourseRun.course?.name || "Kurs")}</strong>
      <small>${escapeHtml(activeCourseRun.plan?.title || "Tagesplan")} · ${escapeHtml(courseExercise?.title || exercise?.name || "Übung")} · Übung ${current} von ${total}</small>
    `;
  } else {
    exerciseIntroCourse.innerHTML = `
      <span>Übung</span>
      <strong>${escapeHtml(exercise?.name || exercise?.title || "LogoSound")}</strong>
      <small>Ansage vor dem Start</small>
    `;
  }
}

function hideExerciseIntroScreen() {
  document.body.classList.remove("exercise-intro-active");
  exerciseIntroOverlay?.classList.add("is-hidden");
}

async function runCountdownAndStart(audioPreparation = Promise.resolve()) {
  try {
    recordButton.disabled = true;
    const activeExercise = getActiveRecordingExercise();
    hideExerciseIntroScreen();
    recordButton.textContent = "Startet";
    message.textContent = activeExercise?.mode === "dialog"
      ? "Dialogaufnahme startet."
      : "Aufnahme startet.";
    instructionPlaybackActive = false;
    Promise.resolve(audioPreparation).catch(() => false);
    setExerciseVisualsVisible(true);

    for (const step of COUNTDOWN_STEPS) {
      countdownOverlay.textContent = step;
      countdownOverlay.classList.remove("is-hidden");
      await wait(520);
    }

    countdownOverlay.classList.add("is-hidden");
    hideExerciseIntroScreen();
    stopInstructionAudio();
    recordButton.disabled = false;
    const started = await withTimeout(startRecording(), 4000).catch(() => false);
    if (!started) {
      recordButton.textContent = "Übung starten";
      message.textContent = "Aufnahme konnte nicht starten. Bitte Kamera/Mikrofon erneut aktivieren.";
    }
  } catch (error) {
    instructionPlaybackActive = false;
    stopInstructionAudio();
    setExerciseVisualsVisible(false);
    hideExerciseIntroScreen();
    countdownOverlay.classList.add("is-hidden");
    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
    message.textContent = `Start wurde unterbrochen: ${error?.message || error?.name || "Bitte erneut versuchen."}`;
  }
}

async function speakExerciseInstruction() {
  instructionPlaybackActive = true;
  const activeExercise = getActiveRecordingExercise();
  const instruction = getCurrentExerciseInstructionText();

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

async function playBreathingExerciseInstruction(exercise) {
  instructionPlaybackActive = true;
  const activeExercise = hydrateEditorExercise(exercise) || getActiveRecordingExercise();
  const instruction =
    String(activeExercise?.voiceInstruction || "").trim() ||
    "Bereiten Sie sich auf die Atemübung vor. Folgen Sie gleich ruhig der Atemkugel.";
  const savedAudio = activeExercise?.voiceAudioUrl || activeExercise?.voiceAudioDataUrl || "";

  if (savedAudio && isInstructionVoiceAudioCurrent(activeExercise, instruction)) {
    message.textContent = "Atem-Intro läuft.";
    const played = await playVoiceAudio(savedAudio);
    if (played) return;
  }

  const generatedAudio = await withTimeout(createTemporaryVoiceAudio(instruction), 6000);
  if (generatedAudio) {
    message.textContent = "Atem-Intro läuft.";
    const played = await playVoiceAudio(generatedAudio);
    URL.revokeObjectURL(generatedAudio);
    if (played) return;
  }

  message.textContent = instruction;
  await speakWithBrowserVoice(instruction);
}

async function getCurrentInstructionAudio(exercise, instruction) {
  const savedAudio = exercise?.voiceAudioUrl || exercise?.voiceAudioDataUrl || "";
  if (savedAudio && isInstructionVoiceAudioCurrent(exercise, instruction)) return savedAudio;
  if (isStandardEditorExerciseName(exercise?.name)) return "";
  if (!exercise?.name) return "";

  const requestSettings = getExerciseVoiceRequestSettings(exercise);
  const storedAudio = await createStoredVoiceAudio(instruction, `${exercise.name} Intro`, requestSettings).catch(() => null);
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

  await saveEditorExerciseObject(updatedExercise, { refreshUi: false });
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
  const requestSettings = getExerciseVoiceRequestSettings(exercise);
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

async function createStoredVoiceAudio(text, exerciseLabel, requestSettings = getElevenLabsRequestSettings()) {
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
  const breathingExercise = getActiveRecordingExercise();
  if (isBreathingExercise(breathingExercise)) {
    await unlockInstructionAudio();
    await startBreathingExercise(breathingExercise, { preview: true });
    return;
  }

  await unlockInstructionAudio();
  if (!hasActiveMediaStream()) {
    await ensureMediaStream().catch(() => false);
  }
  setupKaraokeText();
  const activeExercise = getActiveRecordingExercise();
  const previewText = getExercisePreviewText();
  if (!previewText) {
    message.textContent = "Keine Vorführung möglich: Übung hat keinen Text.";
    return;
  }

  isPreviewingExercise = true;
  previewSegmentTimings = buildPreviewSegmentTimings(activeExercise, previewText);
  setPreviewSessionState(true, "Vorführung aktiv");
  previewExerciseButton.disabled = true;
  previewExerciseButton.textContent = "Vorführung lädt";
  recordButton.disabled = true;

  try {
    const audioUrls = await getExercisePreviewAudioSegments(previewText);
    await playExercisePreviewAudio(audioUrls, previewText);
  } catch (error) {
    await playExercisePreviewFallback(previewText, error);
  } finally {
    if (isPreviewingExercise && previewExerciseButton) {
      previewExerciseButton.disabled = false;
      previewExerciseButton.textContent = "Vorführung stoppen";
    }
  }
}

function getExercisePreviewText() {
  const exercise = getActiveRecordingExercise();
  return getExercisePreviewTextForExercise(exercise);
}

function getPreviewChunkTimelineDuration(chunk, exercise, timing = getCurrentKaraokeTiming()) {
  const text = String(chunk || "").trim();
  if (!text) return Math.max(0.4, Number(timing.pauseSeconds) || DEFAULT_KARAOKE_PAUSE_SECONDS);

  if (
    exercise?.mode === "dialog" ||
    exercise?.mode === "sentences" ||
    exercise?.mode === "text" ||
    isLongTextMode(exercise?.mode)
  ) {
    return getTextPassageSeconds(text, timing.wordSeconds, timing.pauseSeconds);
  }

  const words = text
    .split(/\s+/)
    .map((word) => word.trim())
    .filter((word) => word && word !== "|");
  const timeline = buildKaraokeTimeline(words, timing);
  return getKaraokeTimelineDuration(timeline) || getTextPassageSeconds(text, timing.wordSeconds, timing.pauseSeconds);
}

function buildPreviewSegmentTimings(exercise, previewText) {
  const syncedTimings = buildPreviewSegmentTimingsFromExerciseTimeline(exercise);
  if (syncedTimings.length) return syncedTimings;

  const chunks = getExercisePreviewChunks(exercise, previewText);
  if (!chunks.length) return [];

  const fullDuration = getKaraokeTimelineDuration(karaokeTimeline);
  const timing = getCurrentKaraokeTiming();
  const rawDurations = chunks.map((chunk) => getPreviewChunkTimelineDuration(chunk, exercise, timing));
  const rawTotal = rawDurations.reduce((sum, value) => sum + value, 0) || 1;
  const scale = fullDuration > 0 ? fullDuration / rawTotal : 1;

  let cursor = 0;
  return rawDurations.map((duration, index) => {
    const scaledDuration = Math.max(0.12, duration * scale);
    const start = cursor;
    const end = index === rawDurations.length - 1 && fullDuration > 0 ? fullDuration : cursor + scaledDuration;
    cursor = end;
    return { start, end };
  });
}

function buildPreviewSegmentTimingsFromExerciseTimeline(exercise) {
  if (!Array.isArray(karaokeTimeline) || !karaokeTimeline.length) return [];

  if (exercise?.mode === "dialog") {
    const systemEntries = karaokeTimeline.filter((item) => item.isSystemTurn);
    const systemTexts = getExerciseDialogTurns(exercise)
      .filter((turn) => turn.role !== "patient" && turn.text)
      .map((turn) => turn.text);
    return buildPreviewSegmentsFromTextEntries(systemEntries, systemTexts);
  }

  if (exercise?.mode === "sentences") {
    const sentenceEntries = karaokeTimeline.filter((item) => item.isSentence);
    return buildPreviewSegmentsFromTextEntries(sentenceEntries, getExerciseSentences(exercise));
  }

  if (isLongTextMode(exercise?.mode)) {
    const passageEntries = karaokeTimeline.filter((item) => item.isTextPassage);
    return buildPreviewSegmentsFromTextEntries(passageEntries, getExerciseTextPassages(exercise), 620);
  }

  return [];
}

function buildPreviewSegmentsFromTextEntries(entries, texts, maxLength = 840) {
  const timing = getCurrentKaraokeTiming();
  const segments = [];

  entries.forEach((entry, index) => {
    const sourceText = String(texts[index] || entry?.text || "").trim();
    if (!sourceText) return;

    const chunks = splitVoicePreviewText(sourceText, maxLength);
    const entryStart = Number(entry?.start || 0);
    const entryEnd = Number(entry?.end || entryStart);
    const entryDuration = Math.max(0.12, entryEnd - entryStart);

    if (chunks.length <= 1) {
      segments.push({ start: entryStart, end: entryEnd });
      return;
    }

    const rawDurations = chunks.map((chunk) =>
      getTextPassageSeconds(chunk, timing.wordSeconds, timing.pauseSeconds)
    );
    const rawTotal = rawDurations.reduce((sum, value) => sum + value, 0) || 1;
    let cursor = entryStart;

    rawDurations.forEach((duration, chunkIndex) => {
      const scaledDuration = Math.max(0.12, (duration / rawTotal) * entryDuration);
      const start = cursor;
      const end = chunkIndex === rawDurations.length - 1 ? entryEnd : cursor + scaledDuration;
      segments.push({ start, end });
      cursor = end;
    });
  });

  return segments;
}

function getExercisePreviewTextForExercise(exercise) {
  if (exercise?.mode === "dialog") {
    return getExerciseDialogTurns(exercise)
      .filter((turn) => turn.role !== "patient")
      .map((turn) => turn.text)
      .join(". ");
  }
  if (exercise?.mode === "sentences") return getExerciseSentences(exercise).join(". ");
  return String(exercise?.script || getExerciseScript() || "").replace(/\s*\|\s*/g, ". ").trim();
}

async function prepareExerciseAudioForEditorSave(exercise) {
  let updatedExercise = hydrateEditorExercise(exercise);
  if (!updatedExercise?.name) return exercise;

  const requestSettings = getExerciseVoiceRequestSettings(updatedExercise);
  const instruction = String(updatedExercise.voiceInstruction || "").trim();
  let changed = false;

  if (instruction && !isInstructionVoiceAudioCurrent(updatedExercise, instruction)) {
    editorVoiceState.textContent = "Intro-Audio wird erstellt und gespeichert...";
    const storedIntro = await createStoredVoiceAudio(instruction, `${updatedExercise.name} Intro`, requestSettings);
    updatedExercise = hydrateEditorExercise({
      ...updatedExercise,
      voiceAudioUrl: storedIntro.url,
      voiceAudioPath: storedIntro.path,
      voiceAudioDataUrl: "",
      voiceAudioVoiceId: storedIntro.voiceId,
      voiceAudioVoiceSettings: storedIntro.voiceSettings,
      voiceAudioTextHash: storedIntro.textHash,
      voiceAudioSpeed: storedIntro.speed,
      voiceAudioUpdatedAt: new Date().toISOString(),
    });
    changed = true;
  }

  if (updatedExercise.mode === "dialog") {
    const dialogResult = await prepareDialogAudioForExercise(updatedExercise, requestSettings);
    updatedExercise = dialogResult.exercise;
    changed = changed || dialogResult.changed;
  } else {
    const demoResult = await prepareDemoAudioForExercise(updatedExercise, requestSettings);
    updatedExercise = demoResult.exercise;
    changed = changed || demoResult.changed;
  }

  if (changed) {
    editorVoiceAudioDataUrl = updatedExercise.voiceAudioDataUrl || "";
    editorVoiceAudioUrl = getGlobalVoiceAudioUrl(updatedExercise.voiceAudioUrl, updatedExercise.voiceAudioPath);
    editorVoiceAudioPath = updatedExercise.voiceAudioPath || "";
    editorVoiceAudioVoiceId = updatedExercise.voiceAudioVoiceId || "";
    editorVoiceAudioVoiceSettings = updatedExercise.voiceAudioVoiceSettings || null;
    editorVoiceAudioTextHash = updatedExercise.voiceAudioTextHash || "";
    editorVoiceAudioUpdatedAt = updatedExercise.voiceAudioUpdatedAt || "";
    if (editorVoicePreview && editorVoiceAudioUrl) {
      editorVoicePreview.src = resolveAppUrl(editorVoiceAudioUrl);
    }
  }

  return updatedExercise;
}

async function prepareDemoAudioForExercise(exercise, requestSettings) {
  const previewText = getExercisePreviewTextForExercise(exercise);
  if (!previewText) return { exercise, changed: false };

  const chunks = getExercisePreviewChunks(exercise, previewText);
  if (!chunks.length) return { exercise, changed: false };

  if (chunks.length <= 1) {
    if (isStoredDemoAudioCurrent(exercise, previewText, requestSettings)) {
      return { exercise, changed: false };
    }

    editorVoiceState.textContent = "Vorführ-Audio wird erstellt und gespeichert...";
    const storedDemo = await createStoredVoiceAudio(previewText, `${exercise.name} Vorführung`, requestSettings);
    return {
      changed: true,
      exercise: hydrateEditorExercise({
        ...exercise,
        demoAudioUrl: storedDemo.url,
        demoAudioPath: storedDemo.path,
        demoVoiceId: storedDemo.voiceId,
        demoVoiceSettings: storedDemo.voiceSettings,
        demoTextHash: storedDemo.textHash,
        demoSpeed: storedDemo.speed,
        demoCreatedAt: new Date().toISOString(),
        demoAudioSegments: [],
      }),
    };
  }

  if (isStoredDemoAudioSegmentsCurrent(exercise, previewText, chunks, requestSettings)) {
    return { exercise, changed: false };
  }

  const segments = [];
  for (let index = 0; index < chunks.length; index += 1) {
    editorVoiceState.textContent = `Vorführ-Audio wird erstellt: ${index + 1}/${chunks.length}`;
    const storedAudio = await createStoredVoiceAudio(
      chunks[index],
      `${exercise.name} Vorführung ${index + 1}`,
      requestSettings,
    );
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
  }

  return {
    changed: true,
    exercise: hydrateEditorExercise({
      ...exercise,
      demoAudioSegments: segments,
      demoSegmentsCreatedAt: new Date().toISOString(),
    }),
  };
}

async function prepareDialogAudioForExercise(exercise, requestSettings) {
  const turns = getExerciseDialogTurns(exercise);
  const systemTurns = turns.filter((turn) => turn.role !== "patient" && turn.text);
  if (!systemTurns.length) return { exercise, changed: false };

  let changed = false;
  let systemIndex = 0;
  const updatedTurns = [];

  for (const turn of turns) {
    if (turn.role === "patient" || !turn.text) {
      updatedTurns.push(normalizeDialogTurn(turn));
      continue;
    }

    systemIndex += 1;
    if (isDialogTurnAudioCurrent(turn, "", requestSettings)) {
      updatedTurns.push(normalizeDialogTurn(turn));
      continue;
    }

    editorVoiceState.textContent = `Dialog-Audio wird erstellt: ${systemIndex}/${systemTurns.length}`;
    const storedAudio = await createStoredVoiceAudio(
      turn.text,
      `${exercise.name} Dialog ${systemIndex}`,
      requestSettings,
    );
    changed = true;
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

  if (!changed) return { exercise, changed: false };

  return {
    changed: true,
    exercise: hydrateEditorExercise({
      ...exercise,
      dialogTurns: updatedTurns,
      content: serializeDialogTurns(updatedTurns, getDialogSystemSpeakerLabel(exercise)),
      script: serializeDialogTurns(updatedTurns, getDialogSystemSpeakerLabel(exercise)),
      dialogAudioUpdatedAt: new Date().toISOString(),
    }),
  };
}

async function getExercisePreviewAudio(text) {
  const activeExercise = getActiveRecordingExercise();
  const requestSettings = getExerciseVoiceRequestSettings(activeExercise);
  if (isStoredDemoAudioCurrent(activeExercise, text, requestSettings)) {
    return getGlobalVoiceAudioUrl(activeExercise.demoAudioUrl, activeExercise.demoAudioPath);
  }

  const storedAudio = await createStoredVoiceAudio(text, `${getExerciseLabel()} Vorführung`, requestSettings);
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

  const requestSettings = getExerciseVoiceRequestSettings(activeExercise);
  const chunks = getExercisePreviewChunks(activeExercise, text);

  if (isStoredDemoAudioCurrent(activeExercise, text, requestSettings) && chunks.length <= 1) {
    return [getGlobalVoiceAudioUrl(activeExercise.demoAudioUrl, activeExercise.demoAudioPath)];
  }
  if (chunks.length <= 1) return [await getExercisePreviewAudio(text)];

  if (isStoredDemoAudioSegmentsCurrent(activeExercise, text, chunks, requestSettings)) {
    return activeExercise.demoAudioSegments.map((segment) =>
      getGlobalVoiceAudioUrl(segment.url, segment.path),
    );
  }

  const urls = [];
  const segments = [];
  for (let index = 0; index < chunks.length; index += 1) {
    if (!isPreviewingExercise) break;
    previewExerciseButton.textContent = `Vorführung lädt ${index + 1}/${chunks.length}`;
    const storedAudio = await createStoredVoiceAudio(chunks[index], `${getExerciseLabel()} Vorführung ${index + 1}`, requestSettings);
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

  const requestSettings = getExerciseVoiceRequestSettings(exercise);
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
    if (isDialogTurnAudioCurrent(turn, "", requestSettings)) {
      updatedTurns.push(turn);
      urls.push(getGlobalVoiceAudioUrl(turn.audioUrl, turn.audioPath));
      continue;
    }

    previewExerciseButton.textContent = `Dialog-Audio lädt ${systemIndex}/${systemTurns.length}`;
    const storedAudio = await createStoredVoiceAudio(turn.text, `${exercise.name} Dialog ${systemIndex}`, requestSettings);
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
      content: serializeDialogTurns(updatedTurns, getDialogSystemSpeakerLabel(exercise)),
      script: serializeDialogTurns(updatedTurns, getDialogSystemSpeakerLabel(exercise)),
      dialogAudioUpdatedAt: new Date().toISOString(),
    });
    await saveEditorExerciseObject(updatedExercise);
  }

  return urls;
}

function isStoredDemoAudioCurrent(exercise, text, requestSettings = getExerciseVoiceRequestSettings(exercise)) {
  if (!exercise?.demoAudioUrl && !exercise?.demoAudioPath) return false;
  return (
    exercise.demoVoiceId === requestSettings.voiceId &&
    JSON.stringify(exercise.demoVoiceSettings || {}) === JSON.stringify(requestSettings.voiceSettings || {}) &&
    exercise.demoTextHash === hashText(text)
  );
}

function isStoredDemoAudioSegmentsCurrent(exercise, text, chunks = splitVoicePreviewText(text), requestSettings = getExerciseVoiceRequestSettings(exercise)) {
  if (!exercise?.demoAudioSegments?.length) return false;
  if (exercise.demoAudioSegments.length !== chunks.length) return false;

  return chunks.every((chunk, index) => {
    const segment = exercise.demoAudioSegments[index];
    return (
      (segment?.url || segment?.path) &&
      segment.voiceId === requestSettings.voiceId &&
      JSON.stringify(segment.voiceSettings || {}) === JSON.stringify(requestSettings.voiceSettings || {}) &&
      segment.textHash === hashText(chunk)
    );
  });
}

function getExercisePreviewChunks(exercise, text) {
  if (exercise && isLongTextMode(exercise.mode)) {
    const passages = getExerciseTextPassages(exercise);
    const chunks = passages.flatMap((passage) => splitVoicePreviewText(passage, 620));
    if (chunks.length) return chunks;
  }

  return splitVoicePreviewText(text);
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

async function playExercisePreviewAudio(audioUrls, fallbackText = "") {
  const urls = Array.isArray(audioUrls) ? audioUrls.filter(Boolean) : [audioUrls].filter(Boolean);
  if (!urls.length) throw new Error("Keine Vorführ-Audiodatei vorhanden.");

  setExerciseVisualsVisible(true);
  message.textContent = "Vorführung läuft.";
  previewAudioUrls = urls;
  previewPlaybackOffsetSeconds = 0;
  for (let index = 0; index < previewAudioUrls.length; index += 1) {
    if (!isPreviewingExercise) return;
    const played = await playExercisePreviewSegment(index, fallbackText);
    if (!played && fallbackText) {
      await playExercisePreviewFallback(fallbackText, new Error("Vorführung-Audio konnte nicht abgespielt werden."));
      return;
    }
  }
  if (isPreviewingExercise) stopExercisePreview();
}

function getPreviewSegmentWindow(index) {
  const fallbackEnd = getKaraokeTimelineDuration(karaokeTimeline) || 0;
  return previewSegmentTimings[index] || { start: 0, end: fallbackEnd };
}

async function playExercisePreviewSegment(index, fallbackText = "") {
  if (!isPreviewingExercise || index >= previewAudioUrls.length) {
    return false;
  }

  previewExerciseButton.disabled = false;
  previewExerciseButton.textContent = previewAudioUrls.length > 1
    ? `Vorführung stoppen ${index + 1}/${previewAudioUrls.length}`
    : "Vorführung stoppen";
  message.textContent = "Vorführung läuft.";

  const segmentWindow = getPreviewSegmentWindow(index);
  animateExercisePreviewKaraoke(index, segmentWindow);

  try {
    const played = await playVoiceAudio(previewAudioUrls[index]);
    if (!played) return false;
    previewPlaybackOffsetSeconds = segmentWindow.end;
    if (isPreviewingExercise) {
      updateKaraokeDisplayAtTime(karaokeOverlay, karaokeTimeline, segmentWindow.end);
    }
    return true;
  } catch (error) {
    if (index === 0 && fallbackText) {
      await playExercisePreviewFallback(fallbackText, error);
      return true;
    }
    return false;
  } finally {
    window.cancelAnimationFrame(previewAnimationFrameId);
    previewAnimationFrameId = 0;
  }
}

function animateExercisePreviewKaraoke(index, segmentWindow = getPreviewSegmentWindow(index)) {
  const startedAt = performance.now();
  const segmentDuration = Math.max(0.12, segmentWindow.end - segmentWindow.start);
  const animate = () => {
    if (!isPreviewingExercise) return;
    const elapsedSeconds = Math.max(0, (performance.now() - startedAt) / 1000);
    const segmentProgress = Math.max(0, Math.min(1, elapsedSeconds / segmentDuration));
    updateKaraokeDisplayAtTime(
      karaokeOverlay,
      karaokeTimeline,
      segmentWindow.start + segmentDuration * segmentProgress,
    );
    previewAnimationFrameId = window.requestAnimationFrame(animate);
  };
  window.cancelAnimationFrame(previewAnimationFrameId);
  previewAnimationFrameId = window.requestAnimationFrame(animate);
}

async function playExercisePreviewFallback(previewText, error) {
  if (!isPreviewingExercise) return;

  if (previewAudioElement) {
    previewAudioElement.pause();
    previewAudioElement.removeAttribute("src");
    previewAudioElement.load();
    previewAudioElement = null;
  }
  setExerciseVisualsVisible(true);
  previewAudioUrls = [];
  previewPlaybackOffsetSeconds = 0;
  previewSegmentTimings = [];
  previewFallbackDurationSeconds = Math.max(
    getKaraokeTimelineDuration(karaokeTimeline),
    Math.min(60, Math.max(3, String(previewText || "").length * 0.055)),
  );
  previewFallbackStartedAt = performance.now();
  previewExerciseButton.disabled = false;
  previewExerciseButton.textContent = "Vorführung stoppen";
  message.textContent = error?.message
    ? `${error.message} Browser-Stimme läuft als Ersatz.`
    : "Browser-Stimme läuft als Ersatz.";
  animateExercisePreviewFallback();
  await speakWithBrowserVoice(previewText);
  if (isPreviewingExercise) stopExercisePreview();
}

function animateExercisePreviewFallback() {
  if (!isPreviewingExercise || !previewFallbackStartedAt) return;
  const elapsedSeconds = (performance.now() - previewFallbackStartedAt) / 1000;
  const displaySeconds = previewFallbackDurationSeconds
    ? Math.min(previewFallbackDurationSeconds, elapsedSeconds)
    : elapsedSeconds;
  updateKaraokeDisplayAtTime(karaokeOverlay, karaokeTimeline, displaySeconds);
  previewAnimationFrameId = window.requestAnimationFrame(animateExercisePreviewFallback);
}

function stopExercisePreview() {
  const wasPreviewing = isPreviewingExercise || Boolean(previewAudioElement) || Boolean(previewFallbackStartedAt);
  if (!wasPreviewing) return;

  isPreviewingExercise = false;
  window.cancelAnimationFrame(previewAnimationFrameId);
  previewAnimationFrameId = 0;
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  try {
    instructionAudioSource?.stop?.();
  } catch (error) {}
  instructionAudioSource = null;

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
  previewSegmentTimings = [];
  previewFallbackStartedAt = 0;
  previewFallbackDurationSeconds = 0;

  setPreviewSessionState(false);
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
      Math.min(120000, String(instruction || "").length * 95 + 1800),
    );
    let settled = false;
    let retryTimerId = 0;
    let attempts = 0;
    let fallbackId = 0;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(fallbackId);
      window.clearTimeout(retryTimerId);
      resolve();
    };
    fallbackId = window.setTimeout(finish, fallbackMs);

    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      message.textContent = instruction;
      window.setTimeout(finish, 1800);
      return;
    }

    window.speechSynthesis.cancel();
    message.textContent = instruction;
    const speak = () => {
      if (settled) return;
      try {
        window.speechSynthesis.resume?.();
        const utterance = new SpeechSynthesisUtterance(instruction);
        utterance.lang = "de-DE";
        utterance.rate = 0.92;
        utterance.pitch = 1;
        utterance.onend = finish;
        utterance.onerror = () => {
          if (settled || attempts >= 2) {
            finish();
            return;
          }
          attempts += 1;
          retryTimerId = window.setTimeout(speak, 180);
        };
        window.speechSynthesis.speak(utterance);
        window.setTimeout(() => window.speechSynthesis.resume?.(), 80);
      } catch (error) {
        if (attempts >= 2) finish();
        else {
          attempts += 1;
          retryTimerId = window.setTimeout(speak, 180);
        }
      }
    };
    speak();
  });
}

function estimateSpeechDurationSeconds(text = "") {
  const cleaned = String(text || "").trim();
  if (!cleaned) return 0;
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const byWords = wordCount / 2.35;
  const byChars = cleaned.length / 16;
  return Math.max(2.5, Math.min(90, Math.max(byWords, byChars) + 1.2));
}

async function playVoiceAudio(audioUrl, options = {}) {
  const webAudioPlayed = await playVoiceAudioBuffer(audioUrl, options);
  if (webAudioPlayed) return true;
  return playVoiceAudioElement(audioUrl, options);
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

async function playVoiceAudioBuffer(audioUrl, options = {}) {
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
    const minDurationSeconds = Number(options.minDurationSeconds || 0);
    if (minDurationSeconds > 0 && audioBuffer.duration > 0 && audioBuffer.duration < minDurationSeconds * 0.45) {
      return false;
    }

    return await new Promise((resolve) => {
      const source = instructionAudioContext.createBufferSource();
      const gain = instructionAudioContext.createGain();
      // Do not stop a valid ElevenLabs introduction after a short fixed timeout.
      const fallbackMs = Math.max(120000, Math.ceil((audioBuffer.duration || 0) * 1000) + 8000);
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
        stopDialogVoiceMeter();
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
      startDialogVoiceMeter(audioBuffer.duration || 0);
      source.start(0);
    });
  } catch (error) {
    return false;
  }
}

function shouldMixVoiceAudioIntoRecording() {
  return Boolean(isRecording && getActiveRecordingExercise()?.mode === "dialog");
}

function startDialogVoiceMeter(durationSeconds = 0) {
  if (!shouldMixVoiceAudioIntoRecording()) return;
  const durationMs = Math.max(500, Number(durationSeconds || 0) * 1000);
  dialogVoiceMeterStartedAt = performance.now();
  dialogVoiceMeterUntil = dialogVoiceMeterStartedAt + durationMs + 120;
}

function stopDialogVoiceMeter() {
  dialogVoiceMeterUntil = 0;
  dialogVoiceMeterStartedAt = 0;
}

function getDialogVoiceMeterSignal(now = performance.now()) {
  if (!shouldMixVoiceAudioIntoRecording() || now > dialogVoiceMeterUntil) return null;
  const elapsed = Math.max(0, now - dialogVoiceMeterStartedAt);
  const pulse = 0.72 + Math.sin(elapsed / 78) * 0.12 + Math.sin(elapsed / 31) * 0.05;
  return {
    rawSignal: 22 * pulse,
    volume: Math.round(38 * pulse),
    frequency: Math.round(24 * pulse),
    pitchHz: 175,
  };
}

function playVoiceAudioElement(audioUrl, options = {}) {
  return new Promise((resolve) => {
    let started = false;
    let lastProgressAt = performance.now();
    let lastCurrentTime = 0;
    let stallIntervalId = 0;
    let fallbackId = window.setTimeout(() => finish(false), Math.max(INSTRUCTION_TIMEOUT_MS, 15000));
    const stopStallWatchdog = () => {
      if (stallIntervalId) window.clearInterval(stallIntervalId);
      stallIntervalId = 0;
    };
    const startStallWatchdog = () => {
      if (stallIntervalId) return;
      stallIntervalId = window.setInterval(() => {
        if (!started || instructionAudio.paused || instructionAudio.ended) return;
        const currentTime = Number(instructionAudio.currentTime || 0);
        if (currentTime > lastCurrentTime + 0.05) {
          lastCurrentTime = currentTime;
          lastProgressAt = performance.now();
          return;
        }
        if (performance.now() - lastProgressAt > 3200) {
          message.textContent = "Gespeichertes Audio stockt. Browser-Stimme wird genutzt.";
          finish(false);
        }
      }, 700);
    };
    const refreshFallback = () => {
      if (!Number.isFinite(instructionAudio.duration) || instructionAudio.duration <= 0) return;
      window.clearTimeout(fallbackId);
      fallbackId = window.setTimeout(
        () => finish(true),
        Math.max(15000, Math.ceil(instructionAudio.duration * 1000) + 4000),
      );
    };
    const cleanup = () => {
      instructionAudio.removeEventListener("playing", handleStarted);
      instructionAudio.removeEventListener("timeupdate", handleStarted);
      instructionAudio.removeEventListener("loadedmetadata", refreshFallback);
      instructionAudio.removeEventListener("ended", handleEnded);
      instructionAudio.removeEventListener("error", handleError);

    };
    const finish = (played = started) => {
      window.clearTimeout(fallbackId);
      stopStallWatchdog();
      cleanup();
      instructionAudio.pause();
      stopDialogVoiceMeter();
      resolve(Boolean(played));
    };
    const handleStarted = () => {
      started = true;
      lastCurrentTime = Number(instructionAudio.currentTime || 0);
      lastProgressAt = performance.now();
      startStallWatchdog();
      message.textContent = "Instruktion wird abgespielt.";
      if (Number.isFinite(instructionAudio.duration) && instructionAudio.duration > 0) {
        startDialogVoiceMeter(Math.max(0, instructionAudio.duration - instructionAudio.currentTime));
      }
      window.clearTimeout(fallbackId);
      fallbackId = window.setTimeout(() => finish(true), 120000);
    };
    const handleEnded = () => {
      const minDurationSeconds = Number(options.minDurationSeconds || 0);
      const playedSeconds = Number(instructionAudio.currentTime || 0);
      const tooShort = minDurationSeconds > 0 && playedSeconds < minDurationSeconds * 0.45;
      finish(!tooShort);
    };
    const handleError = () => finish(false);

    cleanup();
    instructionAudio.addEventListener("playing", handleStarted);
    instructionAudio.addEventListener("timeupdate", handleStarted);
    instructionAudio.addEventListener("loadedmetadata", refreshFallback);
    instructionAudio.addEventListener("ended", handleEnded, { once: true });
    instructionAudio.addEventListener("error", handleError, { once: true });

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
  stopDialogVoiceMeter();
  stopBreathingVoice();
}
async function startRecording() {
  if (!mediaStream) return false;
  if (isRecording) return true;
  if (isCalibrating) stopCalibration();
  const activeExercise = getActiveRecordingExercise();
  const isDialogRecording = activeExercise?.mode === "dialog";
  setVideoPreviewHidden(false);

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
  stopDialogVoiceMeter();
  stopBreathingVoice();
  activeKaraokeIndex = 0;
  recordingKaraokeEvents = [];
  activeRecordingKaraokeEvent = null;
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
    stereoLevelMeter: true,
    currentLevel: 0,
    currentLeftLevel: 0,
    currentRightLevel: 0,
  });
  drawFrequencyTimeline(frequencyTimeline, [], []);
  updateVoiceFrequencyDisplay(0, 0);

  if (isDialogRecording) {
    await attachCameraPreview(mediaStream).catch(() => {});
    await withTimeout(ensureCameraPreviewPlaying(), 800).catch(() => false);
    await withTimeout(waitForCameraFrame(1600), 900).catch(() => {});
  }
  await withTimeout(ensureRecordingAnalyserReady({ preferExistingStream: isDialogRecording }), 1000).catch(() => {});
  await withTimeout(waitForCameraFrame(isDialogRecording ? 1600 : 900), 900).catch(() => {});
  const recordingStream = startComposedVideoStream();

  const recordingFormat = getSupportedRecordingFormat();
  const recorderOptions = recordingFormat?.type ? { mimeType: recordingFormat.type } : undefined;

  try {
    mediaRecorder = new MediaRecorder(recordingStream, recorderOptions);
  } catch (error) {
    message.textContent = "Die Videoaufnahme konnte in diesem Browser nicht gestartet werden.";
    stopComposedVideoStream();
    return false;
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
  startRecordingKaraokeEventIfPatient(activeKaraokeIndex);
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
  return true;
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
    closeRecordingKaraokeEvent(durationSeconds);
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
      testId: fileStem,
      datum: timestamp.toISOString(),
      uebung: getExerciseLabel(),
      uebungText: getExerciseScript(),
      uebungKonfiguration: getExerciseConfiguration(),
      karaokeEreignisse: recordingKaraokeEvents
        .filter((event) => Number.isFinite(event.start))
        .map((event) => ({
          ...event,
          end: Number.isFinite(event.end) ? event.end : Number(durationSeconds.toFixed(3)),
        })),
      dauerSekunden: Number(durationSeconds.toFixed(1)),
      patientName: getCurrentPatientName(),
      patientId: getCurrentPatientId(),
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
      quellVideoBreite: activeCaptureSourceWidth,
      quellVideoHoehe: activeCaptureSourceHeight,
      captureRotationGrad: activeCaptureRotationDegrees,
      capturePipelineVersion: 3,
      dateityp: mimeType,
      aufnahme: `${fileStem}.${fileExtension}`,
    };
    if (activeCourseRun?.session && activeCourseRun?.plan) {
      const activeCourseExercise = getActiveCourseExercise();
      currentMetadata.courseSessionId = activeCourseRun.session.id;
      currentMetadata.courseId = activeCourseRun.course?.id || "";
      currentMetadata.courseName = activeCourseRun.course?.name || "";
      currentMetadata.coursePlanId = activeCourseRun.plan.id || "";
      currentMetadata.coursePlanTitle = activeCourseRun.plan.title || "";
      currentMetadata.courseExerciseId = activeCourseExercise?.exerciseId || "";
      currentMetadata.courseExerciseTitle = activeCourseExercise?.title || currentMetadata.uebung;
      currentMetadata.courseDayIndex = Number(activeCourseRun.dayIndex || 0);
      currentMetadata.courseExerciseIndex = Number(activeCourseRun.index || 0);
    }
    currentMetadata.audioAnalyse = buildAudioAnalysis(currentMetadata);
    currentMetadata.werte = getVoiceAnalysisValues(currentMetadata);
    currentMetadata.bewertung = calculateVoiceEvaluation(currentMetadata, allRecordings);
    selectedAnalysisRecordingId = currentMetadata.id;
    currentVideoBlob = videoBlob;

    const completedCourseExercise = activeCourseRun?.playlistMode
      ? getActiveCourseExercise()
      : null;
    const completedCourseSessionId = activeCourseRun?.session?.id || "";
    const coursePlaylistWasActive = Boolean(activeCourseRun?.playlistMode && completedCourseSessionId);
    await saveRecording(currentMetadata, videoBlob);
    await completeCourseExerciseFromRecording(currentMetadata);
    await refreshRecordings(currentMetadata.id);
    const continuePlaylist = Boolean(
      completedCourseExercise
      && coursePlaylistWasActive
      && currentMetadata.courseSessionId === completedCourseSessionId
      && activeCourseRun?.session?.id === completedCourseSessionId
    );
    if (continuePlaylist) {
      courseResultActions?.classList.add("is-hidden");
      resultPanel.classList.add("is-hidden");
    } else {
      showResult(currentMetadata, videoBlob);
    }

    recordButton.disabled = false;
    recordButton.textContent = "Übung starten";
    recordButton.classList.remove("is-recording");
    if (mediaRecorder === stoppedRecorder) {
      mediaRecorder = null;
    }
    message.textContent = "Aufnahme gespeichert.";
    firebaseState.textContent = "Lokal gespeichert. Firebase-Upload läuft.";

    uploadCurrentRecording(currentMetadata, videoBlob);
    if (continuePlaylist) {
      coursePlayer?.classList.remove("is-hidden");
      setActiveView("myCourses");
      continueCoursePlaylist();
    }
  } catch (error) {
    stopComposedVideoStream();
    restoreRecorderControls("Speichern fehlgeschlagen. Bitte Aufnahme erneut versuchen.");
  }
}

async function prepareRecordingAudio(options = {}) {
  try {
    await setupAudioAnalyser({
      reuseExisting: true,
      preferExistingStream: Boolean(options.preferExistingStream),
    });
    if (audioContext?.state === "running" && !instructionPlaybackActive) {
      message.textContent = "Mikrofon-Pegel bereit.";
    }
  } catch (error) {
    if (!instructionPlaybackActive) {
      message.textContent = "Mikrofon-Pegel konnte noch nicht vorbereitet werden.";
    }
  }
}

async function setupAudioAnalyser({ reuseExisting = false, forceDedicatedStream = false, preferExistingStream = false } = {}) {
  await ensureAudioContext();

  if (reuseExisting && analyser && audioSource) {
    await ensureAudioContext();
    return;
  }

  disconnectAudioAnalyser();

  const existingAudioTrack = mediaStream?.getAudioTracks?.()[0];
  const preferDedicatedAudioStream = !preferExistingStream && (forceDedicatedStream || !isIosMediaDevice());

  audioOnlyStreamOwnsTracks = false;

  if (preferDedicatedAudioStream) {
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
      const fallbackTrack = existingAudioTrack;
      if (!fallbackTrack) {
        if (!instructionPlaybackActive) {
          message.textContent = "Kein Mikrofonsignal gefunden.";
        }
        return;
      }
      audioOnlyStream = new MediaStream([fallbackTrack]);
    }
  } else if (existingAudioTrack && existingAudioTrack.readyState === "live") {
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
      const fallbackTrack = existingAudioTrack;
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

async function ensureRecordingAnalyserReady(options = {}) {
  await ensureAudioContext();

  if (!analyser || !audioSource) {
    await setupAudioAnalyser({
      reuseExisting: false,
      preferExistingStream: Boolean(options.preferExistingStream),
    });
  } else {
    await setupAudioAnalyser({
      reuseExisting: true,
      preferExistingStream: Boolean(options.preferExistingStream),
    });
  }

  const hasFreshFrames = await waitForAudioProcessorFrames(650);
  if (!hasFreshFrames) {
    await setupAudioAnalyser({
      reuseExisting: false,
      forceDedicatedStream: !options.preferExistingStream && !isIosMediaDevice(),
      preferExistingStream: Boolean(options.preferExistingStream),
    });
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
  applySettingsEqPlaybackGain(gainValue);
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

function getDefaultCalibrationNoiseFloor() {
  return {
    volumeGate: VOLUME_NOISE_GATE,
    voiceFloor: 0,
    frequencyGate: 0,
    measuredSamples: 0,
    updatedAt: "",
  };
}

function normalizeCalibrationNoiseFloor(settings = {}) {
  const defaults = getDefaultCalibrationNoiseFloor();
  return {
    volumeGate: Math.max(VOLUME_NOISE_GATE, Math.min(80, Number(settings.volumeGate) || defaults.volumeGate)),
    voiceFloor: Math.max(0, Math.min(160, Number(settings.voiceFloor) || defaults.voiceFloor)),
    frequencyGate: Math.max(0, Math.min(160, Number(settings.frequencyGate) || defaults.frequencyGate)),
    measuredSamples: Math.max(0, Math.round(Number(settings.measuredSamples) || defaults.measuredSamples)),
    updatedAt: settings.updatedAt || defaults.updatedAt,
  };
}

function loadCalibrationNoiseFloor() {
  try {
    return normalizeCalibrationNoiseFloor(JSON.parse(localStorage.getItem(CALIBRATION_NOISE_KEY) || "null") || {});
  } catch (error) {
    return getDefaultCalibrationNoiseFloor();
  }
}

function persistCalibrationNoiseFloor(settings) {
  calibrationNoiseFloor = normalizeCalibrationNoiseFloor(settings);
  localStorage.setItem(CALIBRATION_NOISE_KEY, JSON.stringify(calibrationNoiseFloor));
  saveCloudNoiseCalibration(calibrationNoiseFloor).catch(() => {
    if (settingsState) settingsState.textContent = "Kalibrierung lokal gespeichert. Firebase nicht erreichbar.";
  });
}

async function saveCloudNoiseCalibration(settings = calibrationNoiseFloor) {
  await setDoc(doc(firestore, "settings", CALIBRATION_NOISE_DOC), {
    ...normalizeCalibrationNoiseFloor(settings),
    updatedAt: settings.updatedAt || new Date().toISOString(),
  });
}

async function loadCloudNoiseCalibration() {
  try {
    const snapshot = await getDoc(doc(firestore, "settings", CALIBRATION_NOISE_DOC));
    if (!snapshot.exists()) {
      await saveCloudNoiseCalibration(calibrationNoiseFloor);
      return;
    }

    calibrationNoiseFloor = normalizeCalibrationNoiseFloor(snapshot.data());
    localStorage.setItem(CALIBRATION_NOISE_KEY, JSON.stringify(calibrationNoiseFloor));
  } catch (error) {
    calibrationNoiseFloor = loadCalibrationNoiseFloor();
  }
}

function startSilenceNoiseCalibration() {
  calibrationNoiseState = {
    startedAt: performance.now(),
    samples: [],
    completed: false,
  };
}

function getPercentile(values, percentile) {
  const sortedValues = values
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => a - b);
  if (!sortedValues.length) return 0;
  const index = Math.min(sortedValues.length - 1, Math.max(0, Math.floor((sortedValues.length - 1) * percentile)));
  return sortedValues[index];
}

function updateSilenceNoiseCalibration(sample, now) {
  if (!isCalibrating || !calibrationNoiseState || calibrationNoiseState.completed) return false;

  calibrationNoiseState.samples.push(sample);
  const elapsed = now - calibrationNoiseState.startedAt;
  const remainingMs = Math.max(0, CALIBRATION_SILENCE_MS - elapsed);
  message.textContent = remainingMs
    ? `Bitte still bleiben: ${Math.ceil(remainingMs / 1000)} s. Grundrauschen wird gemessen.`
    : "Grundrauschen wird gespeichert.";

  if (elapsed < CALIBRATION_SILENCE_MS) return true;

  const volumeSamples = calibrationNoiseState.samples.map((entry) => entry.volumeSignal);
  const voiceSamples = calibrationNoiseState.samples.map((entry) => Math.min(entry.voiceAverage, entry.backgroundAverage * 1.8));
  const frequencySamples = calibrationNoiseState.samples.map((entry) => entry.frequencySignal);
  const volumeNoise = getPercentile(volumeSamples, 0.86);
  const voiceNoise = getPercentile(voiceSamples, 0.86);
  const frequencyNoise = getPercentile(frequencySamples, 0.8);

  calibrationNoiseState.completed = true;
  persistCalibrationNoiseFloor({
    volumeGate: Math.max(VOLUME_NOISE_GATE, volumeNoise * CALIBRATION_NOISE_GATE_MULTIPLIER + 0.8),
    voiceFloor: voiceNoise,
    frequencyGate: frequencyNoise * 1.25,
    measuredSamples: calibrationNoiseState.samples.length,
    updatedAt: new Date().toISOString(),
  });
  adaptiveNoiseFloor = Math.max(adaptiveNoiseFloor, calibrationNoiseFloor.voiceFloor);
  adaptiveVolumeNoiseFloor = Math.max(adaptiveVolumeNoiseFloor, calibrationNoiseFloor.volumeGate / VOLUME_NOISE_GATE_MULTIPLIER);
  message.textContent = "Grundrauschen gemessen. Jetzt sprechen und bei Bedarf Empfindlichkeit einstellen.";
  if (settingsCalibrationStatus) {
    settingsCalibrationStatus.textContent =
      "Grundrauschen gemessen. Jetzt sprechen, Testaudio starten oder Empfindlichkeit anpassen.";
  }
  updateCalibrationTestAudioButton();
  return false;
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
  const rawNoiseFloor = Math.min(voiceAverage, backgroundAverage * 1.8);
  adaptiveNoiseFloor = adaptiveNoiseFloor
    ? adaptiveNoiseFloor * 0.94 + rawNoiseFloor * 0.06
    : rawNoiseFloor;
  const combinedNoiseFloor = Math.max(adaptiveNoiseFloor, calibrationNoiseFloor.voiceFloor || 0);
  const voiceContrast = Math.max(0, voiceAverage - combinedNoiseFloor * 0.45 - backgroundAverage * 0.12);
  const voicePeakContrast = Math.max(0, voicePeak - combinedNoiseFloor * 0.55);
  let pitchHz = estimateVoicePitchHz(frequencySamples, binHz, voicePeakContrast);
  const rawFrequencySignal = Math.max(voiceAverage * 0.95, voiceContrast * 2.1, voicePeakContrast * 0.72);
  const isMeasuringSilence = updateSilenceNoiseCalibration(
    {
      volumeSignal,
      voiceAverage,
      backgroundAverage,
      frequencySignal: rawFrequencySignal,
    },
    now,
  );
  adaptiveVolumeNoiseFloor = updateAdaptiveVolumeNoiseFloor(volumeSignal, adaptiveVolumeNoiseFloor);
  let dynamicVolumeGate = Math.max(
    VOLUME_NOISE_GATE,
    calibrationNoiseFloor.volumeGate || 0,
    adaptiveVolumeNoiseFloor * VOLUME_NOISE_GATE_MULTIPLIER,
  );
  const likelyVoiceActivity =
    !isMeasuringSilence &&
    (
      voiceAverage > backgroundAverage * 1.08 + 1.5 ||
      voicePeak > backgroundAverage * 1.1 + 6 ||
      voiceContrast > 1.15 ||
      voicePeakContrast > 3.5
    );
  if (likelyVoiceActivity && volumeSignal > 0) {
    dynamicVolumeGate = Math.min(
      dynamicVolumeGate,
      Math.max(VOLUME_NOISE_GATE, volumeSignal * 0.72),
    );
  }
  const gatedVolumeSignal = Math.max(0, volumeSignal - dynamicVolumeGate);
  const calibrationMeterBoost = isCalibrating ? 1.8 : 1;
  let calibratedVolume = isMeasuringSilence ? 0 : scaleVolumeLevel(gatedVolumeSignal * calibrationMeterBoost);
  const frequencySignal = isMeasuringSilence
    ? 0
    : Math.max(0, rawFrequencySignal - (calibrationNoiseFloor.frequencyGate || 0)) * calibrationMeterBoost;
  const hasVoicePresence = likelyVoiceActivity;
  const recoveredVolumeSignal =
    hasVoicePresence && gatedVolumeSignal <= 0
      ? Math.max(0, volumeSignal - Math.min(dynamicVolumeGate * 0.58, Math.max(0.9, volumeSignal * 0.48)))
      : gatedVolumeSignal;
  if (hasVoicePresence && calibratedVolume <= 0 && recoveredVolumeSignal > 0) {
    calibratedVolume = scaleVolumeLevel(recoveredVolumeSignal * calibrationMeterBoost);
  }
  const desktopMeterFallback =
    !isIosMediaDevice()
    && !isMeasuringSilence
    && (
      voicePeak > backgroundAverage + 3
      || volumeSignal > Math.max(2.2, dynamicVolumeGate * 0.62)
      || analyserRms > 1.2
    );
  if (desktopMeterFallback && calibratedVolume <= 0) {
    calibratedVolume = scaleVolumeLevel(Math.max(volumeSignal * 0.92, recoveredVolumeSignal * 1.18));
  }
  let rawSignal = isMeasuringSilence
    ? 0
    : Math.max(recoveredVolumeSignal * calibrationMeterBoost * 1.35, frequencySignal * 0.72);
  if (desktopMeterFallback && rawSignal <= 0) {
    rawSignal = Math.max(rawSignal, volumeSignal * calibrationMeterBoost * 1.08);
  }
  let volume = scaleAmplitude(rawSignal);
  let displayVolume = calibratedVolume;
  let displayFrequency = scaleAmplitude(frequencySignal);
  let amplitude = Math.max(displayVolume > 0 || displayFrequency > 0 ? 2 : 0, volume);
  const dialogVoiceSignal = getDialogVoiceMeterSignal(now);
  if (dialogVoiceSignal) {
    rawSignal = Math.max(rawSignal, dialogVoiceSignal.rawSignal);
    displayVolume = Math.max(displayVolume, dialogVoiceSignal.volume);
    displayFrequency = Math.max(displayFrequency, dialogVoiceSignal.frequency);
    volume = Math.max(volume, scaleAmplitude(dialogVoiceSignal.rawSignal));
    amplitude = Math.max(amplitude, volume, displayVolume);
    pitchHz = pitchHz || dialogVoiceSignal.pitchHz;
  }

  if (now - lastAmplitudeAt >= AMPLITUDE_SAMPLE_INTERVAL) {
    rawAmplitudes.push(rawSignal);
    amplitudes.push(amplitude);
    volumeValues.push(displayVolume);
    rawVolumeValues.push(recoveredVolumeSignal);
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
    stereoLevelMeter: isCalibrating,
    currentLevel: displayVolume,
    currentLeftLevel: displayVolume,
    currentRightLevel: displayVolume,
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
    karaokeTimeline = buildDialogTimeline(dialogTurns, SENTENCE_MAX_SECONDS, activeExercise);
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
  const hasExplicitMode = Object.prototype.hasOwnProperty.call(exercise || {}, "mode");
  const mode = normalizeEditorExerciseModeValue(exercise?.mode || "text");
  if (mode !== "text") return mode;
  if (hasExplicitMode) return "text";

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

  const matches = normalizedText.match(/[^.!?&]+(?:[.!?&]+["\u201c\u201d']?)?/g) || [normalizedText];
  const sentences = matches
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length > 1 ? sentences : [normalizedText];
}

function getEditorDialogTurns() {
  if (editorMode?.value === "dialog" && editorDialogTurnsState.length) {
    return editorDialogTurnsState.map((turn) => normalizeDialogTurn(turn)).filter((turn) => turn.text);
  }
  const parsedTurns = parseDialogTurns(editorContent.value);
  if (editorMode?.value === "dialog") editorDialogTurnsState = parsedTurns;
  return parsedTurns;
}

function syncEditorDialogTurns(turns, options = {}) {
  editorDialogTurnsState = turns.map((turn) => normalizeDialogTurn(turn)).filter((turn) => turn.text);
  editorContent.value = serializeDialogTurns(editorDialogTurnsState, getEditorVoiceLabel());
  saveEditorDraft();
  renderEditorPreview(buildEditorExerciseFromForm());
  if (!options.skipListRender) renderEditorDialogList();
  if (exerciseName.value === "custom-editor") setupKaraokeText();
}

function serializeDialogTurns(turns, systemLabel = getActiveVoiceLabel()) {
  return turns
    .map((turn) => {
      const normalizedTurn = normalizeDialogTurn(turn);
      if (!normalizedTurn.text) return "";
      const speakerLabel = normalizedTurn.role === "patient" ? getCurrentPatientName() : systemLabel;
      return `${speakerLabel}: ${normalizedTurn.text}`;
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
    editorDialogTurnsState = turns.map((turn) => normalizeDialogTurn(turn));
    editorContent.value = serializeDialogTurns(editorDialogTurnsState, getEditorVoiceLabel());
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
      ["system", getEditorVoiceLabel()],
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
      : isDialogTurnAudioCurrent(turn, "", getEditorVoiceRequestSettings())
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
    removeButton.addEventListener("click", async () => {
      const previousExercise = getCurrentSavedEditorExerciseForDeletion();
      const nextTurns = getEditorDialogTurns();
      nextTurns.splice(index, 1);
      syncEditorDialogTurns(nextTurns);
      await persistEditorInlineDeletion(previousExercise, "Dialogzeile gelöscht");
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

function getEditorVoiceLabel() {
  return getEditorSelectedVoice(getElevenLabsSettings())?.name || getActiveVoiceLabel();
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
  const requestSettings = baseExercise ? getExerciseVoiceRequestSettings(baseExercise) : getElevenLabsRequestSettings();
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
              isDialogTurnAudioCurrent(candidate, "", requestSettings),
          );

    if (!matchingPrevious || !isDialogTurnAudioCurrent(matchingPrevious, normalizedTurn.text, requestSettings)) {
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

function isDialogTurnAudioCurrent(turn, textOverride = "", requestSettings = getElevenLabsRequestSettings()) {
  if (!turn?.audioUrl && !turn?.audioPath) return false;
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
      role: isPatientDialogRole(roleName) ? "patient" : "system",
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
  const patientNameParts = normalizedPatient.split(/\s+/).filter(Boolean);
  return (
    /^(patient|patientin|nutzer|sprecher|sprecherin|speaker|ich)$/i.test(String(role || "").trim()) ||
    Boolean(normalizedPatient && normalizedRole === normalizedPatient) ||
    Boolean(patientNameParts.length && normalizedRole === patientNameParts[0]) ||
    Boolean(normalizedRole && normalizedPatient.startsWith(`${normalizedRole} `))
  );
}

function isSystemDialogRole(role) {
  const normalizedRole = normalizeEditorExerciseName(role);
  const settings = getElevenLabsSettings();
  const activeVoice = getActiveElevenLabsVoice(settings);
  return (
    /^(system|therapeut|therapeutin|app|ki|elevenlabs)$/i.test(String(role || "").trim()) ||
    Boolean(normalizedRole && normalizedRole === normalizeEditorExerciseName(getActiveVoiceLabel())) ||
    Boolean(activeVoice?.name && normalizedRole === normalizeEditorExerciseName(activeVoice.name)) ||
    settings.voices.some((voice) => normalizedRole === normalizeEditorExerciseName(voice.name))
  );
}

function getDialogSpeakerLabel(role) {
  return role === "patient" ? getCurrentPatientName() : getActiveVoiceLabel();
}

function getDialogSystemSpeakerLabel(exercise = getActiveRecordingExercise()) {
  return getExerciseSelectedVoice(exercise)?.name || getActiveVoiceLabel();
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

function buildDialogTimeline(turns, secondsPerTurn = SENTENCE_MAX_SECONDS, exercise = getActiveRecordingExercise()) {
  const systemSpeakerLabel = getDialogSystemSpeakerLabel(exercise);
  return turns.map((turn, index) => ({
    label: `${turn.role === "patient" ? getCurrentPatientName() : systemSpeakerLabel}: ${turn.text}`,
    text: turn.text,
    role: turn.role,
    roleLabel: turn.role === "patient" ? getCurrentPatientName() : systemSpeakerLabel,
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

function buildPlaybackDialogTimeline(turns, totalSeconds, timing = getPlaybackKaraokeTiming({}), exercise = null) {
  const normalizedTurns = turns.map((turn) => normalizeDialogTurn(turn)).filter((turn) => turn.text);
  if (!normalizedTurns.length) return [];

  const fallbackTotal = normalizedTurns.length * 2.4;
  const targetTotal = Math.max(1, Number(totalSeconds) || fallbackTotal);
  const wordSeconds = Number(timing.wordSeconds) || DEFAULT_KARAOKE_WORD_SECONDS;
  const pauseSeconds = Number(timing.pauseSeconds) || DEFAULT_KARAOKE_PAUSE_SECONDS;
  const rawDurations = normalizedTurns.map((turn) => {
    const base = getTextPassageSeconds(turn.text, wordSeconds, pauseSeconds);
    const roleFactor = turn.role === "patient" ? 1.06 : 0.82;
    return Math.max(0.65, base * roleFactor);
  });
  const rawTotal = rawDurations.reduce((sum, value) => sum + value, 0) || fallbackTotal;
  const scale = targetTotal / rawTotal;
  let cursor = 0;

  return buildDialogTimeline(normalizedTurns, 1, exercise).map((item, index) => {
    const duration = Math.max(0.55, rawDurations[index] * scale);
    const nextItem = {
      ...item,
      start: cursor,
      end: cursor + duration,
    };
    cursor += duration;
    return nextItem;
  });
}

function buildPlaybackDialogTimelineFromEvents(events, turns, totalSeconds, exercise = null) {
  const normalizedEvents = (Array.isArray(events) ? events : [])
    .map((event) => ({
      ...event,
      index: Number(event.index),
      start: Number(event.start),
      end: Number(event.end),
      text: String(event.text || ""),
    }))
    .filter((event) => Number.isFinite(event.start) && event.text);
  if (!normalizedEvents.length) return [];

  const normalizedTurns = turns.map((turn) => normalizeDialogTurn(turn)).filter((turn) => turn.text);
  const baseItems = buildDialogTimeline(normalizedTurns.length ? normalizedTurns : normalizedEvents, 1, exercise);
  const naturalEnd = Math.max(
    ...normalizedEvents.map((event) => Number.isFinite(event.end) && event.end > event.start ? event.end : event.start + 0.8),
    1,
  );
  const targetTotal = Math.max(1, Number(totalSeconds) || naturalEnd);
  const scale = Math.abs(naturalEnd - targetTotal) > 0.25 ? targetTotal / naturalEnd : 1;

  return normalizedEvents.map((event, fallbackIndex) => {
    const baseItem = baseItems[event.index] || baseItems[fallbackIndex] || {};
    const start = Math.max(0, event.start * scale);
    const endSource = Number.isFinite(event.end) && event.end > event.start ? event.end : event.start + 0.8;
    return {
      ...baseItem,
      label: event.label || baseItem.label || `${event.roleLabel || event.role || ""}: ${event.text}`.trim(),
      text: event.text || baseItem.text || "",
      role: event.role || baseItem.role || "patient",
      roleLabel: event.roleLabel || baseItem.roleLabel || getCurrentPatientName(),
      isPause: false,
      isSentence: true,
      isDialog: true,
      isPatientTurn: Boolean(event.isPatientTurn ?? baseItem.isPatientTurn),
      isSystemTurn: Boolean(event.isSystemTurn ?? baseItem.isSystemTurn),
      start,
      end: Math.max(start + 0.25, endSource * scale),
    };
  });
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

  if (currentItem?.isSystemTurn) {
    playCurrentDialogSystemTurn();
    return;
  }

  updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);

  if (currentItem?.isPatientTurn) {
    updateSentencePromptBySilence(displayVolume);
  }
}

function getRecordingElapsedSeconds(fallbackSeconds = null) {
  if (Number.isFinite(fallbackSeconds)) return Math.max(0, fallbackSeconds);
  if (!startedAt) return 0;
  return Math.max(0, (performance.now() - startedAt) / 1000);
}

function startRecordingKaraokeEvent(index) {
  const item = karaokeTimeline[index];
  if (!item?.isDialog) return;

  closeRecordingKaraokeEvent();
  const event = {
    index,
    start: Number(getRecordingElapsedSeconds().toFixed(3)),
    end: null,
    role: item.role,
    roleLabel: item.roleLabel,
    text: item.text || item.label || "",
    label: item.label || "",
    isPatientTurn: Boolean(item.isPatientTurn),
    isSystemTurn: Boolean(item.isSystemTurn),
  };
  recordingKaraokeEvents.push(event);
  activeRecordingKaraokeEvent = event;
}

function startRecordingKaraokeEventIfPatient(index) {
  if (karaokeTimeline[index]?.isPatientTurn) startRecordingKaraokeEvent(index);
}

function closeRecordingKaraokeEvent(fallbackEndSeconds = null) {
  if (!activeRecordingKaraokeEvent) return;
  const endSeconds = getRecordingElapsedSeconds(fallbackEndSeconds);
  activeRecordingKaraokeEvent.end = Number(Math.max(activeRecordingKaraokeEvent.start, endSeconds).toFixed(3));
  activeRecordingKaraokeEvent = null;
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
      updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
      startRecordingKaraokeEvent(activeKaraokeIndex);
      await playVoiceAudio(audioUrl);
      closeRecordingKaraokeEvent();
    } else {
      message.textContent = `${currentItem.roleLabel}: ${currentItem.text || currentItem.label}`;
      updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
      startRecordingKaraokeEvent(activeKaraokeIndex);
      await wait(Math.max(900, Math.min(3200, String(currentItem.text || currentItem.label || "").length * 55)));
      closeRecordingKaraokeEvent();
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

  const requestSettings = getExerciseVoiceRequestSettings(exercise);
  const storedAudio = await createStoredVoiceAudio(
    currentItem.text,
    `${exercise.name || getExerciseLabel()} Dialog ${timelineIndex + 1}`,
    requestSettings,
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
    content: serializeDialogTurns(updatedTurns, getDialogSystemSpeakerLabel(exercise)),
    script: serializeDialogTurns(updatedTurns, getDialogSystemSpeakerLabel(exercise)),
    dialogAudioUpdatedAt: new Date().toISOString(),
  });
  await saveEditorExerciseObject(updatedExercise);
  return storedAudio.url;
}

function advanceDialogPrompt() {
  if (dialogAdvanceLock || sentenceStopScheduled) return;
  dialogAdvanceLock = true;
  closeRecordingKaraokeEvent();

  window.setTimeout(() => {
    dialogAdvanceLock = false;
  }, 180);

  if (activeKaraokeIndex < karaokeTimeline.length - 1) {
    activeKaraokeIndex += 1;
    resetSentenceSilenceState();
    startRecordingKaraokeEventIfPatient(activeKaraokeIndex);
    updateKaraokeDisplay(karaokeOverlay, karaokeTimeline, activeKaraokeIndex);
    const item = karaokeTimeline[activeKaraokeIndex];
    message.textContent = item?.isPatientTurn
      ? `${item.roleLabel} spricht jetzt.`
      : `${item.roleLabel} ist dran.`;
    return;
  }

  closeRecordingKaraokeEvent();
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
    startRecordingKaraokeEventIfPatient(activeKaraokeIndex);
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

async function startCalibration(options = {}) {
  if (isRecording) return false;
  calibrationReturnView = options.returnView || document.body.dataset.activeView || "record";
  const embeddedCalibration = Boolean(options.embedded);

  const streamReady = await ensureMediaStream();
  if (!streamReady) return false;

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
  startSilenceNoiseCalibration();
  startedAt = performance.now();
  recordingTime.textContent = "00:00";
  window.clearInterval(timerId);
  timerId = window.setInterval(updateRecordingTime, 250);
  document.body.classList.toggle("calibration-mode", !embeddedCalibration);
  document.body.classList.toggle("settings-calibration-mode", embeddedCalibration);
  setExerciseVisualsVisible(!embeddedCalibration);
  calibrationButton.textContent = "Kalibrierung stoppen";
  if (settingsCalibrationButton) settingsCalibrationButton.textContent = "Kalibrierung stoppen";
  calibrationTestAudioButton?.classList.remove("is-hidden");
  settingsCalibrationTestAudioButton?.classList.remove("is-hidden");
  updateCalibrationTestAudioButton();
  calibrationBackButton?.classList.remove("is-hidden");
  settingsCalibrationBackButton?.classList.remove("is-hidden");
  message.textContent = "Bitte 2 Sekunden still sein. Grundrauschen wird gemessen.";
  if (settingsCalibrationStatus) {
    settingsCalibrationStatus.textContent = "Bitte 2 Sekunden still sein. LogoSound misst jetzt das Grundrauschen.";
  }
  drawWaveform(liveWaveform, [], {
    mode: "live",
    align: "right",
    overlay: true,
    levelMeter: true,
    stereoLevelMeter: true,
    currentLevel: 0,
    currentLeftLevel: 0,
    currentRightLevel: 0,
  });
  drawFrequencyTimeline(frequencyTimeline, [], []);
  updateVoiceFrequencyDisplay(0, 0);
  await setupAudioAnalyser({ reuseExisting: false });
  measureAudio();
  return true;
}

function stopCalibration(options = {}) {
  isCalibrating = false;
  calibrationNoiseState = null;
  document.body.classList.remove("calibration-mode");
  document.body.classList.remove("settings-calibration-mode");
  setExerciseVisualsVisible(false);
  window.cancelAnimationFrame(animationFrame);
  window.clearInterval(timerId);
  stopSettingsEqualizerTestAudio();
  disconnectAudioAnalyser();
  calibrationButton.textContent = "Kalibrieren";
  if (settingsCalibrationButton) settingsCalibrationButton.textContent = "Kalibrieren";
  calibrationTestAudioButton?.classList.add("is-hidden");
  settingsCalibrationTestAudioButton?.classList.add("is-hidden");
  updateCalibrationTestAudioButton();
  calibrationBackButton?.classList.add("is-hidden");
  settingsCalibrationBackButton?.classList.add("is-hidden");
  if (settingsCalibrationStatus) {
    settingsCalibrationStatus.textContent = `Kalibrierung gespeichert: Rauschschwelle ${Math.round(
      calibrationNoiseFloor.volumeGate || VOLUME_NOISE_GATE,
    )}, Empfindlichkeit ${formatSensitivityLabel(sensitivitySlider.value)}.`;
  }
  message.textContent = `Kalibrierung gespeichert: Rauschschwelle ${Math.round(
    calibrationNoiseFloor.volumeGate || VOLUME_NOISE_GATE,
  )}, Empfindlichkeit ${formatSensitivityLabel(sensitivitySlider.value)}.`;
  if (options.restoreView && calibrationReturnView && calibrationReturnView !== document.body.dataset.activeView) {
    setActiveView(calibrationReturnView);
  }
  calibrationReturnView = "record";
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
  return Math.max(1, Math.min(12, Math.round(numericValue)));
}

function updateRecordingKaraokeSpeed(value) {
  const nextValue = clampRecordingKaraokeSpeed(value);
  if (recordingKaraokeSpeed) recordingKaraokeSpeed.value = String(nextValue);
  saveRecordingKaraokeSpeedForCurrentExercise(nextValue);
  persistRecordingSpeedToActiveExercise(nextValue);
  updateRecordingKaraokeSpeedLabel();
  retimeKaraokeAfterSpeedChange();
}

function persistRecordingSpeedToActiveExercise(speed) {
  const activeExercise = getActiveRecordingExercise();
  if (!activeExercise?.name) return;

  const matchingExercise = findSavedEditorExerciseByName(activeExercise.name);
  if (!matchingExercise?.name) return;

  const nextSpeed = clampRecordingKaraokeSpeed(speed);
  const nextTiming = EDITOR_SPEEDS[nextSpeed] || EDITOR_SPEEDS[3];
  const updatedExercise = hydrateEditorExercise({
    ...matchingExercise,
    speed: nextSpeed,
    timing: nextTiming,
  });

  savedEditorExercises = upsertEditorExercise(savedEditorExercises, updatedExercise);
  if (normalizeEditorExerciseName(savedEditorExercise?.name) === normalizeEditorExerciseName(updatedExercise.name)) {
    savedEditorExercise = updatedExercise;
  }
  persistEditorExercises();
  saveCloudEditorExercise(updatedExercise).catch(() => {});
}

function setPreviewSessionState(active, label = "") {
  document.body.classList.toggle("previewing-exercise", Boolean(active));
  previewSessionBar?.classList.toggle("is-hidden", !active);
  previewSessionBar?.classList.toggle("is-visible", Boolean(active));
  if (previewSessionLabel) {
    previewSessionLabel.textContent = label || (active ? "Vorführung aktiv" : "Vorführung");
  }
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
  const speedLabel = timing?.label || "Normal";
  if (!exercise) {
    return `Standzeit: ca. ${formatSecondsAndMilliseconds(timing.wordSeconds)} pro Einheit (${speedLabel}).`;
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
    return `Standzeit: ${formatSecondsAndMilliseconds(minSeconds)}-${formatSecondsAndMilliseconds(maxSeconds)} pro Abschnitt, · ${formatSecondsAndMilliseconds(avgSeconds)} (${speedLabel}).`;
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

  return `Standzeit: ${formatSecondsAndMilliseconds(minSeconds)}-${formatSecondsAndMilliseconds(maxSeconds)} pro Wort/Silbe (${speedLabel}).`;
}

function formatSecondsShort(seconds) {
  const rounded = Math.max(0, Number(seconds) || 0);
  return `${rounded.toFixed(1).replace(".", ",")}s`;
}

function formatSecondsAndMilliseconds(seconds) {
  const safeSeconds = Math.max(0, Number(seconds) || 0);
  const milliseconds = Math.round(safeSeconds * 1000);
  return `${safeSeconds.toFixed(2).replace(".", ",")} s / ${milliseconds} ms`;
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

  const sentences = getEditorSentences();
  if (editingEditorSentenceIndex >= 0 && editingEditorSentenceIndex < sentences.length) {
    sentences[editingEditorSentenceIndex] = sentence;
  } else {
    sentences.push(sentence);
  }
  editingEditorSentenceIndex = -1;
  syncEditorSentences(sentences);
  editorSentenceInput.value = "";
  updateEditorSentenceEditState();
  editorSentenceInput.focus();
}

function editEditorSentence(index) {
  const sentences = getEditorSentences();
  if (!editorSentenceInput || index < 0 || index >= sentences.length) return;

  editingEditorSentenceIndex = index;
  editorSentenceInput.value = sentences[index];
  updateEditorSentenceEditState();
  renderEditorSentenceList();
  editorSentenceInput.focus();
}

function updateEditorSentenceEditState() {
  if (!addEditorSentenceButton) return;
  const isEditing = editingEditorSentenceIndex >= 0;
  addEditorSentenceButton.textContent = isEditing ? "\u2713" : "+";
  addEditorSentenceButton.title = isEditing ? "Satz speichern" : "Satz hinzuf\u00fcgen";
  addEditorSentenceButton.setAttribute("aria-label", isEditing ? "Satz speichern" : "Satz hinzuf\u00fcgen");
}

function renderEditorSentenceListLegacy() {
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
    const item = document.createElement("div");
    item.className = "editor-sentence-item";

    const label = document.createElement("span");
    label.textContent = sentence;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Satz ${index + 1} entfernen`);
    removeButton.addEventListener("click", async () => {
      const previousExercise = getCurrentSavedEditorExerciseForDeletion();
      const nextSentences = getEditorSentences();
      nextSentences.splice(index, 1);
      syncEditorSentences(nextSentences);
      await persistEditorInlineDeletion(previousExercise, "Satz gelöscht");
    });

    item.append(label, removeButton);
    editorSentenceList.append(item);
  });
}

function renderEditorSentenceList() {
  if (!editorSentenceList) return;

  const sentences = getEditorSentences();
  editorSentenceList.innerHTML = "";

  if (!sentences.length) {
    const empty = document.createElement("p");
    empty.className = "editor-sentence-empty";
    empty.textContent = "Noch keine S\u00e4tze hinzugef\u00fcgt.";
    editorSentenceList.append(empty);
    return;
  }

  sentences.forEach((sentence, index) => {
    const item = document.createElement("div");
    item.className = "editor-sentence-item";
    item.classList.toggle("is-editing", index === editingEditorSentenceIndex);

    const label = document.createElement("span");
    label.textContent = sentence;
    label.addEventListener("click", () => {
      editEditorSentence(index);
    });

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "editor-sentence-edit-button";
    editButton.textContent = "\u270e";
    editButton.setAttribute("aria-label", `Satz ${index + 1} bearbeiten`);
    editButton.title = "Satz bearbeiten";
    editButton.addEventListener("click", () => {
      editEditorSentence(index);
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "editor-sentence-remove-button";
    removeButton.textContent = "\u00d7";
    removeButton.setAttribute("aria-label", `Satz ${index + 1} entfernen`);
    removeButton.addEventListener("click", async () => {
      const previousExercise = getCurrentSavedEditorExerciseForDeletion();
      const nextSentences = getEditorSentences();
      nextSentences.splice(index, 1);
      if (editingEditorSentenceIndex === index) {
        editingEditorSentenceIndex = -1;
        editorSentenceInput.value = "";
        updateEditorSentenceEditState();
      } else if (editingEditorSentenceIndex > index) {
        editingEditorSentenceIndex -= 1;
      }
      syncEditorSentences(nextSentences);
      await persistEditorInlineDeletion(previousExercise, "Satz gelöscht");
    });

    item.append(label, editButton, removeButton);
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

  if (isBreathingExercise(exercise)) {
    return `Bereiten Sie sich auf die Atemübung vor. Folgen Sie gleich ruhig der Atemkugel.`;
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
    voiceProfil: {
      key: exercise.voiceProfileKey || "",
      name: exercise.voiceProfileName || "",
      geschlecht: exercise.voiceProfileGender || "neutral",
      voiceId: exercise.voiceProfileVoiceId || "",
      settings: exercise.voiceProfileSettings || null,
    },
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
  const courseExercise = getActiveCourseExercise();
  if (isBreathingExercise(courseExercise) && courseExercise.exerciseId === exerciseName.value) {
    return hydrateEditorExercise({
      name: courseExercise.title || courseExercise.exerciseId || "Ruhige Bauchatmung",
      mode: "breathing",
      content: courseExercise.content || courseExercise.patientHint || "Folgen Sie der Atemkugel in Ihrem eigenen ruhigen Tempo.",
      script: courseExercise.script || courseExercise.content || courseExercise.patientHint || "Folgen Sie der Atemkugel in Ihrem eigenen ruhigen Tempo.",
      voiceInstruction: courseExercise.voiceInstruction || "Bereiten Sie sich auf die Atemübung vor. Folgen Sie gleich ruhig der Atemkugel.",
      breathing: courseExercise.breathing || courseExercise.breathingSettings || getBreathingSettings(courseExercise),
      recordAudio: false,
      recordVideo: false,
      useVideo: false,
      volumeAnalysis: false,
      frequencyAnalysis: false,
    });
  }
  if (normalizeEditorExerciseModeValue(courseExercise?.mode) === "media_exercise" && courseExercise.exerciseId === exerciseName.value) {
    return hydrateEditorExercise({
      name: courseExercise.title || "Medienübung",
      mode: "long_text",
      content: courseExercise.patientHint || courseExercise.title || "Medienübung",
      script: courseExercise.patientHint || courseExercise.title || "Medienübung",
      repeats: 1,
      speed: Number(recordingKaraokeSpeed?.value || 3),
    });
  }
  if (exerciseName.value === "custom-editor") return getActiveEditorExercise();

  const selectedOption = exerciseName.selectedOptions?.[0];
  const selectedLabel = selectedOption?.textContent?.trim() || "";
  const candidates = [selectedLabel, exerciseName.value];
  const liveEditorExercise = buildEditorExerciseFromForm();
  const liveEditorMatchesSelection =
    activeEditorExerciseName &&
    candidates.some(
      (candidate) => normalizeEditorExerciseName(candidate) === normalizeEditorExerciseName(liveEditorExercise.name),
    );
  if (liveEditorMatchesSelection) return hydrateEditorExercise(liveEditorExercise);

  const savedOverride = savedEditorExercises.find((exercise) =>
    candidates.some(
      (candidate) => normalizeEditorExerciseName(candidate) === normalizeEditorExerciseName(exercise.name),
    ),
  );
  if (savedOverride) return hydrateEditorExercise(savedOverride);

  const standardExercise = STANDARD_EDITOR_EXERCISES.find((exercise) =>
    candidates.some(
      (candidate) => normalizeEditorExerciseName(candidate) === normalizeEditorExerciseName(exercise.name),
    ),
  );
  if (standardExercise) return hydrateEditorExercise(standardExercise);

  const fallbackBreathingName = candidates.find((candidate) => looksLikeBreathingExerciseName(candidate));
  if (fallbackBreathingName) {
    return hydrateEditorExercise({
      name: selectedLabel || fallbackBreathingName || "Ruhige Bauchatmung",
      mode: "breathing",
      content: "Folgen Sie der Atemkugel in Ihrem eigenen ruhigen Tempo.",
      breathing: getBreathingSettings(),
      recordAudio: false,
      recordVideo: false,
      useVideo: false,
      volumeAnalysis: false,
      frequencyAnalysis: false,
    });
  }

  const fallbackName = selectedLabel || exerciseName.value || "Übung";
  return hydrateEditorExercise({
    name: fallbackName,
    mode: "long_text",
    content: fallbackName,
    script: fallbackName,
    repeats: 1,
    speed: Number(recordingKaraokeSpeed?.value || 3),
    voiceInstruction: `Bitte sprechen Sie die Übung ${fallbackName} ruhig und deutlich.`,
  });
}

function hydrateEditorExercise(exercise) {
  if (!exercise) return null;

  const mode = normalizeEditorExerciseModeValue(exercise.mode || "syllables");
  const speed = Number(exercise.speed || 3);
  const timing = exercise.timing || EDITOR_SPEEDS[speed] || EDITOR_SPEEDS[3];
  const content = exercise.content || getDefaultEditorContent(mode);
  const breathing = mode === "breathing" ? getBreathingSettings(exercise) : null;
  const repeats = Math.max(1, Number(exercise.repeats || 1));
  const assignedPatientName = String(exercise.patientName || "").trim();
  const assignedPatientId = assignedPatientName ? slugify(assignedPatientName) : "";
  const savedDialogTurns = Array.isArray(exercise.dialogTurns)
    ? exercise.dialogTurns.map((turn) => normalizeDialogTurn(turn)).filter((turn) => turn.text)
    : [];
  const parsedDialogTurns = mode === "dialog"
    ? (savedDialogTurns.length
        ? savedDialogTurns
        : content
          ? parseDialogTurns(content)
          : getExerciseDialogTurns({ ...exercise, mode, content }))
    : [];
  const dialogTurns = mode === "dialog" ? hydrateDialogTurnsWithAudio(parsedDialogTurns, exercise) : [];
  const script = !isTextLikeMode(mode) && mode !== "dialog" && repeats > 1
    ? buildRepeatedScript(content, repeats)
    : exercise.script || content;
  const sentences = exercise.sentences || (mode === "sentences" ? content.split("|").map((sentence) => sentence.trim()).filter(Boolean) : []);
  const patientTurnCount = dialogTurns.filter((turn) => turn.role === "patient").length;
  const embeddedVoiceProfile = getEmbeddedExerciseVoiceProfile(exercise);
  const contentLabel =
    exercise.contentLabel ||
    (mode === "breathing"
      ? `${breathing.repeats} Atemrunden · ${getBreathingExerciseDuration({ breathing })} Sekunden`
      : mode === "dialog"
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
    patientName: assignedPatientName,
    patientId: assignedPatientId,
    isSharedTemplate: !assignedPatientName,
    content,
    breathing,
    contentLabel,
    sentences,
    dialogTurns,
    voiceProfileKey: exercise.voiceProfileKey || embeddedVoiceProfile?.key || "",
    voiceProfileName: exercise.voiceProfileName || embeddedVoiceProfile?.name || "",
    voiceProfileGender: exercise.voiceProfileGender || embeddedVoiceProfile?.gender || "neutral",
    voiceProfileVoiceId: String(exercise.voiceProfileVoiceId || embeddedVoiceProfile?.voiceId || ""),
    voiceProfileSettings: exercise.voiceProfileSettings || embeddedVoiceProfile?.settings || null,
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
  const breathing = mode === "breathing" ? getBreathingSettings() : null;
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
    mode === "breathing"
      ? "Ruhige Atemübung"
      : mode === "dialog"
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
  const editorVoiceSettings = getElevenLabsSettings();
  const editorVoice = getEditorSelectedVoice(editorVoiceSettings);
  const editorVoiceRequestSettings = getVoiceRequestSettingsForVoice(editorVoice, editorVoiceSettings);
  const useRepeats = editorUseRepeats.checked && supportsEditorRepeats(mode);
  const repeats = useRepeats ? getEditorRepeats() : 1;
  const script = useRepeats ? buildRepeatedScript(content, repeats) : content;
  const patientTurnCount = dialogTurns.filter((turn) => turn.role === "patient").length;
  const assignedPatientName = String(editorPatientScope?.value || "").trim();

  return {
    name,
    mode,
    patientName: assignedPatientName,
    patientId: assignedPatientName ? slugify(assignedPatientName) : "",
    isSharedTemplate: !assignedPatientName,
    speed,
    timing,
    content,
    rawContent: isTextLikeMode(mode) ? content : "",
    textPassages,
    contentLabel:
      mode === "breathing"
        ? `${breathing.repeats} Atemrunden · ${getBreathingExerciseDuration({ breathing })} Sekunden`
        : mode === "dialog"
        ? `${patientTurnCount || 1} Sprecherteil${patientTurnCount === 1 ? "" : "e"}`
        : mode === "sentences"
        ? `${sentences.length || 1} Satz${sentences.length === 1 ? "" : "e"}`
        : isLongTextMode(mode) && textPassages.length
        ? `${textPassages.length} Karaoke-Abschnitt${textPassages.length === 1 ? "" : "e"}`
        : tokens.join(", ") || getDefaultEditorContent(mode),
    sentences,
    dialogTurns,
    voiceInstruction,
    voiceProfileKey: editorVoice?.key || "",
    voiceProfileName: editorVoice?.name || "",
    voiceProfileGender: editorVoice?.gender || "neutral",
    voiceProfileVoiceId: editorVoiceRequestSettings.voiceId,
    voiceProfileSettings: editorVoiceRequestSettings.voiceSettings,
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
    breathing,
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
  if (mode === "breathing") return "Ruhige Atemübung";
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
  if (mode === "breathing") return "Folgen Sie der Atemkugel in Ihrem eigenen ruhigen Tempo.";
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

  return `Bereiten Sie sich auf die SilbenÜbung vor. Sprechen Sie ${exercise.contentLabel} einzeln und deutlich. Wiederholen Sie die Folge ${exercise.repeats} mal im Tempo ${speedText}.`;
}

function openEditorAiModal() {
  resetEditorAiModal({ keepPrompt: true, keepState: true });
  editorAiModal?.removeAttribute("hidden");
  editorAiModal?.classList.remove("is-hidden");
  editorAiModal?.setAttribute("aria-hidden", "false");
  window.setTimeout(() => editorAiPrompt?.focus(), 40);
}

function closeEditorAiModal() {
  editorAiModal?.classList.add("is-hidden");
  editorAiModal?.setAttribute("aria-hidden", "true");
  editorAiModal?.setAttribute("hidden", "");
}

function resetEditorAiModal(options = {}) {
  editorAiGeneratedPayload = null;
  editorAiInputView?.classList.remove("is-hidden");
  editorAiPreviewView?.classList.add("is-hidden");
  editorAiPreviewView?.setAttribute("hidden", "");
  if (!options.keepPrompt && editorAiPrompt) editorAiPrompt.value = "";
  if (editorAiPreviewList) editorAiPreviewList.innerHTML = "";
  if (editorAiSummary) editorAiSummary.textContent = "";
  if (!options.keepState && editorAiState) {
    editorAiState.textContent = "ChatGPT nutzt die Einstellungen aus dem Setup.";
  }
}

function setEditorAiState(text) {
  if (editorAiState) editorAiState.textContent = text;
}

async function ensureChatGptAccess() {
  let settings = getChatGptSettings();
  if (hasUsableChatGptAccess(settings)) return settings;

  await loadCloudChatGptSettings().catch(() => {});
  settings = getChatGptSettings();
  return settings;
}

function getChatGptRequestConfig() {
  const settings = getChatGptSettings();
  return {
    apiKey: String(settings.apiKey || "").trim(),
    model: String(settings.model || getDefaultChatGptSettings().model).trim() || getDefaultChatGptSettings().model,
    systemPrompt: String(settings.systemPrompt || getDefaultChatGptSettings().systemPrompt).trim() || getDefaultChatGptSettings().systemPrompt,
    hasCloudFallback: hasCloudChatGptApiKey,
    enabled: settings.enabled !== false || hasCloudChatGptApiKey,
  };
}

function extractEditorAiRequestedCount(prompt) {
  const match = String(prompt || "").match(/\b(\d{1,3})\b/);
  const parsed = Number(match?.[1] || 0);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 20;
}

function extractEditorAiTargetSound(prompt) {
  const normalized = String(prompt || "").trim();
  const directMatch = normalized.match(/\bmit\s+([A-Za-zAeOeUeaeoeuessSCHsch]{1,6})\b/);
  if (directMatch?.[1]) return directMatch[1].toUpperCase();
  const lautMatch = normalized.match(/\b([A-Za-zAeOeUeaeoeuessSCHsch]{1,6})-?lauten?\b/i);
  if (lautMatch?.[1]) return lautMatch[1].toUpperCase();
  return "";
}

function detectLocalEditorAiKind(prompt) {
  const normalized = String(prompt || "").toLowerCase();
  if (/\bdialog/.test(normalized)) return "dialog";
  if (/\bgedicht|\bpoem|\breim/.test(normalized)) return "long_text";
  if (/\btext|\balltagstext|\bgeschichte/.test(normalized)) return "long_text";
  if (/\bw[oö]rter|\bwoerter|\bwort\b/.test(normalized)) return "syllables";
  if (/\bvokal/.test(normalized)) return "vowels";
  return "sentences";
}

function extractLocalEditorAiTheme(prompt) {
  const normalized = String(prompt || "").trim();
  const themeMatch = normalized.match(/\b(?:ueber|über|auf|zum|zur|zu|von)\s+(.+)$/i);
  if (themeMatch?.[1]) return themeMatch[1].trim();
  return normalized.trim();
}

function getLocalSoundWordPool(sound) {
  const pools = {
    O: ["Otto", "Oma", "Ofen", "oben", "orange", "Oper", "Osten", "Offen"],
    W: ["Walter", "Wolke", "Wasser", "Wiese", "Winter", "Wort", "Weg", "Wunder"],
    S: ["Sonne", "Suppe", "Susi", "singen", "Sommer", "sachte", "Seife", "Sessel"],
    SCH: ["Schule", "Schaf", "Schere", "Schiff", "schauen", "Schokolade", "schlafen", "Schnee"],
    R: ["Rita", "Regen", "Rose", "rot", "Runde", "rennen", "Radio", "ruhig"],
    A: ["Anna", "Apfel", "Atem", "Abend", "Ampel", "Aal", "Auge", "April"],
    E: ["Emil", "Esel", "Ecke", "Eimer", "Eis", "Erde", "Ebbe", "Ente"],
    I: ["Ida", "Igel", "Iris", "Insel", "immer", "innen", "Info", "Iglu"],
    U: ["Ute", "Ufer", "Uhr", "unten", "Urlaub", "Uhu", "U-Bahn", "Umweg"],
  };
  return pools[sound] || ["Laut", "Wort", "Stimme", "Mund", "Sprache", "Ton", "Lippe", "Atem"];
}

function getLocalSentenceTemplatesForSound(sound) {
  const templates = {
    O: [
      "Otto oeffnet das Tor.",
      "Oma kocht heute Kohl.",
      "Oskar holt das Brot.",
      "Der Ofen ist noch warm.",
      "Otto wohnt oben.",
      "Mona ordnet bunte Dosen.",
      "Das Sofa steht vor dem Ofen.",
      "Olaf holt roten Klee.",
      "Morgen kommt Opa zu Besuch.",
      "Die Sonne scheint auf den Hof.",
    ],
    W: [
      "Walter winkt am Weg.",
      "Willi waescht das Weinglas.",
      "Wiebke wartet am Wasser.",
      "Wir wohnen nah am Wald.",
      "Die Wolke zieht weiter.",
      "Wera wirft den weichen Ball.",
      "Willi will warme Waffeln.",
      "Das Wasser wird wieder warm.",
      "Wanja wohnt an der Wiese.",
      "Willi schreibt ein Wort an die Wand.",
    ],
    S: [
      "Susi sammelt sieben Steine.",
      "Die Sonne scheint sanft.",
      "Simon schneidet die Seife.",
      "Sven sitzt auf dem Sessel.",
      "Heute essen wir Suppe.",
      "Sina singt ein leises Lied.",
      "Sebastian sucht seine Schuhe.",
      "Am See ist es still.",
      "Die Salbe riecht nach Salbei.",
      "Susi sagt alles langsam.",
    ],
    SCH: [
      "Schorsch schiebt den Schlitten.",
      "Die Schule schliesst schon.",
      "Scherben stehen im Schrank.",
      "Schafe schlafen im Schatten.",
      "Schmidt schreibt schoene Saetze.",
      "Die Schokolade schmeckt sehr gut.",
      "Schorsch schaut zum Schuppen.",
      "Schnee liegt schon im Hof.",
      "Das Schiff schaukelt leicht.",
      "Schlaue Schueler sprechen deutlich.",
    ],
    R: [
      "Rita ruft ihren Bruder.",
      "Robert raeumt ruhig auf.",
      "Der Regen rauscht am Rand.",
      "Rosa traegt einen roten Rock.",
      "Ralf riecht frisches Brot.",
      "Ruben rollt den Reifen.",
      "Rita schreibt einen Brief.",
      "Der Ritter reitet rasch vorbei.",
      "Mara hoert das Radio.",
      "Rico traegt drei rote Rosen.",
    ],
    A: [
      "Anna malt einen Ast.",
      "Am Abend backt Mama Apfelkuchen.",
      "Anton packt alle Sachen aus.",
      "Die Ampel zeigt klar Rot an.",
      "Anna atmet ruhig aus.",
      "Am Hafen ankert ein Kahn.",
      "Adam angelt am Kanal.",
      "Alma faltet ein altes Blatt.",
      "Das Bad ist angenehm warm.",
      "Anja sagt alles langsam nach.",
    ],
    E: [
      "Emil hebt den Becher.",
      "Elli lebt neben Peter.",
      "Der Esel geht ueber den Weg.",
      "Eva klebt gelbe Sterne.",
      "Emre leert den Teller.",
      "Die Ente schwimmt im See.",
      "Egon legt die Decke eben.",
      "Elke redet sehr leise.",
      "Die Erde riecht nach Regen.",
      "Erik findet den ersten Fehler.",
    ],
    I: [
      "Ida liebt ihren Igel.",
      "Im Winter ist die Wiese weiss.",
      "Iris nimmt die kleinen Kissen.",
      "Ingo spielt mit Ida im Zimmer.",
      "Die Insel liegt im Licht.",
      "Im Kino ist es immer ruhig.",
      "Ivo sieht sieben Ringe.",
      "Ina trinkt einen Ingwertee.",
      "Ein Igel sitzt im Gras.",
      "Im Bild ist ein Tiger.",
    ],
    U: [
      "Ute sucht ihre Uhr.",
      "Udo ruft den Bus.",
      "Unter dem Tisch liegt ein Tuch.",
      "Ulla kocht eine gute Suppe.",
      "Am Ufer steht ein Stuhl.",
      "Uwe holt den Kuchen.",
      "Die U-Bahn faehrt puenktlich los.",
      "Ein Uhu ruft im Dunkeln.",
      "Ute tut den Zucker in die Tasse.",
      "Der Urlaub beginnt im Juni.",
    ],
  };
  return templates[sound] || [];
}

function getLocalDialogTemplatesForSound(sound) {
  const templates = {
    W: [
      { role: "system", text: "Wie war Ihr Weg hierher?" },
      { role: "patient", text: "Mein Weg war ruhig und kurz." },
      { role: "system", text: "Wollen wir mit warmen Woertern starten?" },
      { role: "patient", text: "Ja, ich wiederhole die Woerter langsam." },
      { role: "system", text: "Welches Wort war heute am leichtesten?" },
      { role: "patient", text: "Wasser war heute fuer mich leicht." },
    ],
    SCH: [
      { role: "system", text: "Sprechen Sie heute bitte schoen langsam." },
      { role: "patient", text: "Ich spreche schon deutlich und ruhig." },
      { role: "system", text: "Welches SCH-Wort moegen Sie besonders?" },
      { role: "patient", text: "Ich mag das Wort Schokolade." },
      { role: "system", text: "Dann sprechen wir jetzt Schule und Schuhe." },
      { role: "patient", text: "Schule und Schuhe klingen heute gut." },
    ],
    default: [
      { role: "system", text: "Guten Tag, wir starten jetzt ruhig." },
      { role: "patient", text: "Guten Tag, ich bin bereit." },
      { role: "system", text: "Sprechen Sie bitte langsam und deutlich." },
      { role: "patient", text: "Ich spreche langsam und deutlich." },
      { role: "system", text: "Wie fuehlt sich die Stimme heute an?" },
      { role: "patient", text: "Die Stimme fuehlt sich heute ruhig an." },
    ],
  };
  return templates[sound] || templates.default;
}

function uniquifyGeneratedLines(lines, count, variantBuilder) {
  const source = Array.isArray(lines)
    ? lines.map((line) => String(line || "").trim()).filter(Boolean)
    : [];
  if (!source.length) return [];

  const unique = [];
  const seen = new Set();
  let sourceIndex = 0;
  let variantIndex = 0;

  while (unique.length < count) {
    const baseLine = source[sourceIndex % source.length];
    sourceIndex += 1;
    let candidate = baseLine;

    if (seen.has(candidate)) {
      variantIndex += 1;
      candidate = variantBuilder(baseLine, variantIndex, unique.length);
    }

    if (seen.has(candidate)) continue;
    seen.add(candidate);
    unique.push(candidate);
  }

  return unique;
}

function buildLocalSentenceExerciseItems(prompt, count, sound) {
  const curated = getLocalSentenceTemplatesForSound(sound);
  if (curated.length) {
    const sentenceVariants = [
      (line) => line.replace(/\.$/, " heute."),
      (line) => line.replace(/\.$/, " ganz ruhig."),
      (line) => line.replace(/\.$/, " am Morgen."),
      (line) => line.replace(/\.$/, " im Zimmer."),
      (line) => line.replace(/\.$/, " fuer die Uebung."),
    ];
    return uniquifyGeneratedLines(
      curated,
      count,
      (line, variantIndex) => sentenceVariants[(variantIndex - 1) % sentenceVariants.length](line),
    );
  }

  const theme = extractLocalEditorAiTheme(prompt) || "Alltag";
  const generic = [
    `Heute sprechen wir ruhig ueber ${theme}.`,
    `Bitte lesen Sie den Satz langsam und deutlich.`,
    `Die Stimme bleibt ruhig und klar.`,
    `Sprechen Sie jedes Wort bewusst aus.`,
    `Der kurze Satz klingt natuerlich und deutlich.`,
  ];
  return uniquifyGeneratedLines(
    generic,
    count,
    (line, variantIndex) => `${line.replace(/\.$/, "")} Variante ${variantIndex}.`,
  );
}

function buildLocalWordExerciseItems(count, sound) {
  const pool = getLocalSoundWordPool(sound);
  return Array.from({ length: count }, (_, index) => {
    const word = pool[index % pool.length];
    return String(word || "").trim();
  }).filter(Boolean);
}

function buildLocalPoemItems(prompt, count, sound) {
  const theme = extractLocalEditorAiTheme(prompt) || "Sommer";
  const lineCount = Math.min(Math.max(count, 4), 12);
  const baseLines = [
    `Ueber ${theme} liegt ein milder Wind.`,
    `Die Strassen werden leiser gegen Abend.`,
    `Ein helles Fenster schaut zum Hof hinaus.`,
    `Im warmen Licht wird alles weich und ruhig.`,
    `Ein spaeter Vogel zieht noch seine Kreise.`,
    `Die Stimmen klingen fern und freundlich nach.`,
    `Ein leichter Regen legt sich auf den Stein.`,
    `So endet still ein langer, heller Tag.`,
  ];
  const soundLines = sound
    ? baseLines.map((line) => (
      line.toUpperCase().includes(sound)
        ? line
        : `${sound} klingt heute ruhig in diesem ${theme}.`
    ))
    : baseLines;
  return uniquifyGeneratedLines(
    soundLines,
    lineCount,
    (line, variantIndex) => `${line.replace(/\.$/, "")} ${["Ganz leise.", "Noch ein wenig weiter.", "Sehr ruhig heute.", "Im weichen Abendlicht.", "Mit sanftem Nachhall."][(variantIndex - 1) % 5]}`,
  );
}

function buildLocalDialogTurns(prompt, count, sound) {
  const curated = getLocalDialogTemplatesForSound(sound);
  const turnCount = Math.min(Math.max(count, 4), 12);
  const lines = curated.map((turn) => JSON.stringify(turn));
  const uniqueLines = uniquifyGeneratedLines(
    lines,
    turnCount,
    (line, variantIndex) => {
      const turn = JSON.parse(line);
      const suffixes = [
        " heute",
        " jetzt",
        " noch einmal",
        " ganz ruhig",
        " bitte",
      ];
      return JSON.stringify({
        ...turn,
        text: `${String(turn.text || "").replace(/[.!?]$/, "")}${suffixes[(variantIndex - 1) % suffixes.length]}.`,
      });
    },
  );
  return uniqueLines.map((line) => JSON.parse(line));
}

function buildLocalLongTextItems(prompt, count, sound) {
  const theme = extractLocalEditorAiTheme(prompt) || "Alltag";
  const passageCount = Math.min(Math.max(Math.ceil(count / 4), 3), 8);
  const passages = [
    `Heute geht es um ${theme}. Bitte lesen Sie ruhig, deutlich und ohne Eile.`,
    `Achten Sie darauf, dass jedes Wort vollstaendig klingt und die Stimme gleichmaessig bleibt.`,
    `Machen Sie an passenden Stellen kurze Pausen und lassen Sie den Satz am Ende weich ausklingen.`,
    `Wenn ein Laut schwierig ist, wiederholen Sie den Abschnitt noch einmal langsam und bewusst.`,
    `So entsteht ein natuerlicher Textfluss mit klarer Artikulation und ruhiger Stimme.`,
  ];
  const normalizedPassages = sound
    ? passages.map((passage) => (
      passage.toUpperCase().includes(sound)
        ? passage
        : `${passage} Der Laut ${sound} soll dabei deutlich zu hoeren sein.`
    ))
    : passages;
  return uniquifyGeneratedLines(
    normalizedPassages,
    passageCount,
    (line, variantIndex) => `${line.replace(/\.$/, "")} ${["Bleiben Sie dabei entspannt.", "Sprechen Sie ohne Hast.", "Lesen Sie mit ruhigem Atem.", "Jeder Satz darf weich enden."][(variantIndex - 1) % 4]}`,
  );
}

function buildLocalEditorAiExercise(prompt) {
  const count = extractEditorAiRequestedCount(prompt);
  const sound = extractEditorAiTargetSound(prompt);
  const kind = detectLocalEditorAiKind(prompt);
  const theme = extractLocalEditorAiTheme(prompt);
  const titleBase = sound ? `${sound} Uebung` : theme || "Neue Uebung";

  if (kind === "dialog") {
    const dialogTurns = buildLocalDialogTurns(prompt, count, sound);
    return {
      title: `Dialog - ${titleBase}`.replace(/\s+/g, " ").trim(),
      kind: "dialog",
      summary: `${dialogTurns.length} Dialogzeilen lokal erstellt.`,
      dialogTurns,
    };
  }

  if (kind === "long_text") {
    const items = /\bgedicht|\bpoem|\breim/i.test(prompt)
      ? buildLocalPoemItems(prompt, count, sound)
      : buildLocalLongTextItems(prompt, count, sound);
    return {
      title: titleBase,
      kind: "long_text",
      summary: `${items.length} Textabschnitte lokal erstellt.`,
      items,
      content: items.join("\n"),
    };
  }

  if (kind === "syllables") {
    const items = buildLocalWordExerciseItems(count, sound);
    return {
      title: titleBase,
      kind: "syllables",
      summary: `${items.length} Woerter lokal erstellt.`,
      items,
      content: items.join(", "),
    };
  }

  if (kind === "vowels") {
    const items = sound ? [sound] : ["A", "E", "I", "O", "U"];
    return {
      title: titleBase,
      kind: "vowels",
      summary: `${items.length} Vokale lokal erstellt.`,
      items,
      content: items.join(", "),
    };
  }

  const items = buildLocalSentenceExerciseItems(prompt, count, sound);
  return {
    title: titleBase,
    kind: "sentences",
    summary: `${items.length} kurze Saetze lokal erstellt.`,
    items,
    content: items.join(" | "),
  };
}

function normalizeGeneratedEditorMode(kind) {
  const normalized = normalizeEditorExerciseModeValue(kind || "");
  if (normalized === "words") return "sentences";
  if (normalized === "poem") return "long_text";
  if (["syllables", "sentences", "text", "long_text", "vowels", "dialog"].includes(normalized)) {
    return normalized;
  }
  return "sentences";
}

function sanitizeGeneratedEditorText(value) {
  return String(value || "")
    .replace(/^\s*(?:[-*?]\s+|\d+[.)]\s+)/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function sanitizeGeneratedEditorTextList(items = []) {
  const seen = new Set();
  return items
    .map((item) => sanitizeGeneratedEditorText(item))
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLocaleLowerCase("de");
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function inferGeneratedEditorMode(mode, items, content) {
  if (mode === "dialog" || mode === "syllables" || mode === "vowels") return mode;
  const trimmedContent = String(content || "").trim();
  const joinedItems = items.join("\n").trim();
  const sourceText = trimmedContent || joinedItems;
  const passages = splitTextPassages(sourceText);
  const hasLineBreaks = /\r?\n/.test(sourceText);
  const firstItem = String(items[0] || "").trim();
  const firstItemLooksLong = firstItem.length > 120 || /\r?\n/.test(firstItem);

  if (mode === "long_text") return "long_text";
  if (mode === "text") return passages.length > 1 || hasLineBreaks ? "long_text" : "text";
  if (mode === "sentences" && (firstItemLooksLong || (passages.length > 3 && items.length <= 2))) {
    return passages.length > 1 ? "long_text" : "text";
  }
  return mode;
}

function normalizeEditorAiPayload(payload = {}) {
  const requestedMode = normalizeGeneratedEditorMode(payload.kind || payload.mode);
  const title = String(payload.title || payload.name || "").trim() || "Neue Uebung";
  const summary = String(payload.summary || payload.description || "").trim();
  const content = String(payload.content || "").trim();
  const items = Array.isArray(payload.items)
    ? sanitizeGeneratedEditorTextList(payload.items)
    : [];
  const dialogTurns = Array.isArray(payload.dialogTurns)
    ? payload.dialogTurns
        .map((turn) => ({
          role: String(turn?.role || "").trim().toLowerCase() === "patient" ? "patient" : "system",
          text: sanitizeGeneratedEditorText(turn?.text),
        }))
        .filter((turn) => turn.text)
    : [];
  const mode = inferGeneratedEditorMode(requestedMode, items, content);

  if (mode === "dialog") {
    return {
      title,
      mode,
      summary: summary || `${dialogTurns.length || 0} Dialogzeilen erstellt.`,
      dialogTurns: dialogTurns.length ? dialogTurns : [
        { role: "system", text: "Guten Tag." },
        { role: "patient", text: "Guten Tag." },
      ],
      items: [],
      content: "",
    };
  }

  const normalizedItems = items.length
    ? items
    : mode === "long_text"
      ? sanitizeGeneratedEditorTextList(splitTextPassages(content))
      : mode === "text"
        ? sanitizeGeneratedEditorTextList([content])
        : [];

  return {
    title,
    mode,
    summary:
      summary ||
      (mode === "long_text"
        ? `${normalizedItems.length || 0} Textabschnitte erstellt.`
        : `${normalizedItems.length || 0} Eintraege erstellt.`),
    items: normalizedItems.filter(Boolean),
    dialogTurns: [],
    content,
  };
}
function renderEditorAiPreview() {
  if (!editorAiPreviewList || !editorAiGeneratedPayload) return;

  editorAiPreviewList.innerHTML = "";
  const payload = editorAiGeneratedPayload;

  if (editorAiSummary) editorAiSummary.textContent = payload.summary || "Vorschau erstellt.";

  if (payload.mode === "dialog") {
    payload.dialogTurns.forEach((turn, index) => {
      const item = document.createElement("div");
      item.className = "editor-ai-preview-item";

      const header = document.createElement("div");
      header.className = "editor-ai-preview-head";

      const role = document.createElement("select");
      role.className = "select-input compact-select";
      role.innerHTML = `
        <option value="system">KI</option>
        <option value="patient">Patient</option>
      `;
      role.value = turn.role;
      role.addEventListener("change", () => {
        payload.dialogTurns[index].role = role.value === "patient" ? "patient" : "system";
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "editor-ai-preview-remove";
      removeButton.textContent = "×";
      removeButton.setAttribute("aria-label", `Eintrag ${index + 1} löschen`);
      removeButton.addEventListener("click", () => {
        payload.dialogTurns.splice(index, 1);
        renderEditorAiPreview();
      });

      header.append(role, removeButton);

      const textarea = document.createElement("textarea");
      textarea.rows = 3;
      textarea.value = turn.text;
      textarea.addEventListener("input", () => {
        payload.dialogTurns[index].text = textarea.value;
      });

      item.append(header, textarea);
      editorAiPreviewList.append(item);
    });
    return;
  }

  payload.items.forEach((text, index) => {
    const item = document.createElement("div");
    item.className = "editor-ai-preview-item";

    const header = document.createElement("div");
    header.className = "editor-ai-preview-head";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "editor-ai-preview-remove";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", `Eintrag ${index + 1} löschen`);
    removeButton.addEventListener("click", () => {
      payload.items.splice(index, 1);
      renderEditorAiPreview();
    });

    header.append(removeButton);

    const textarea = document.createElement("textarea");
    textarea.rows = payload.mode === "long_text" ? 4 : 2;
    textarea.value = text;
    textarea.addEventListener("input", () => {
      payload.items[index] = textarea.value;
    });

    item.append(header, textarea);
    editorAiPreviewList.append(item);
  });
}

async function generateEditorAiPreview() {
  const prompt = String(editorAiPrompt?.value || "").trim();
  if (!prompt) {
    setEditorAiState("Bitte zuerst beschreiben, was erstellt werden soll.");
    return;
  }

  await ensureChatGptAccess().catch(() => {});
  const chatGptConfig = getChatGptRequestConfig();

  generateEditorAiExercisesButton.disabled = true;
  setEditorAiState("ChatGPT erstellt eine Vorschau...");

  try {
    const response = await fetch(getApiUrl("/api/chatgpt"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: chatGptConfig.apiKey,
        model: chatGptConfig.model,
        editorPrompt: prompt,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.exercise) {
      if (payload.error === "missing-openai-api-key") {
        throw new Error("ChatGPT ist im Setup nicht aktiviert.");
      }
      throw new Error(payload.error || "ki-vorschau-fehlgeschlagen");
    }

    editorAiGeneratedPayload = normalizeEditorAiPayload(payload.exercise);
    editorAiInputView?.classList.add("is-hidden");
    editorAiPreviewView?.removeAttribute("hidden");
    editorAiPreviewView?.classList.remove("is-hidden");
    renderEditorAiPreview();
    setEditorAiState("Vorschau erstellt. Sie können jetzt anpassen oder übernehmen.");
  } catch (error) {
    editorAiGeneratedPayload = normalizeEditorAiPayload(buildLocalEditorAiExercise(prompt));
    editorAiInputView?.classList.add("is-hidden");
    editorAiPreviewView?.removeAttribute("hidden");
    editorAiPreviewView?.classList.remove("is-hidden");
    renderEditorAiPreview();
    setEditorAiState(
      error?.message === "ChatGPT ist im Setup nicht aktiviert."
        ? "Lokale KI-Vorschau erstellt. ChatGPT ist im Setup noch nicht serverseitig aktiv."
        : "ChatGPT nicht erreichbar. Lokale KI-Vorschau erstellt.",
    );
  } finally {
    generateEditorAiExercisesButton.disabled = false;
  }
}

function buildExerciseFromEditorAiPayload(payload) {
  if (!payload) return null;

  const mode = payload.mode;
  const baseName = payload.title || "Neue Übung";

  if (mode === "dialog") {
    const dialogTurns = payload.dialogTurns
      .map((turn) => normalizeDialogTurn(turn))
      .filter((turn) => turn.text);
    return hydrateEditorExercise({
      name: baseName,
      mode: "dialog",
      dialogTurns,
      content: serializeDialogTurns(dialogTurns, getEditorVoiceLabel()),
      script: serializeDialogTurns(dialogTurns, getEditorVoiceLabel()),
      speed: Number(editorSpeed?.value || 3),
      repeats: 1,
      voiceInstruction: getDefaultEditorVoiceInstruction("dialog"),
    });
  }

  if (mode === "long_text") {
    const sourceText = String(payload.content || "").trim();
    const items = (sourceText
      ? sanitizeGeneratedEditorTextList(splitTextPassages(sourceText))
      : sanitizeGeneratedEditorTextList(payload.items || []))
      .filter(Boolean);
    const normalizedText = items.join("\n").trim();
    return hydrateEditorExercise({
      name: baseName,
      mode: "long_text",
      content: normalizedText,
      rawContent: normalizedText,
      textPassages: items,
      script: normalizedText,
      speed: Number(editorSpeed?.value || 3),
      repeats: 1,
      voiceInstruction: getDefaultEditorVoiceInstruction("long_text"),
    });
  }

  if (mode === "text") {
    const text = sanitizeGeneratedEditorText(
      String(payload.content || "").trim() ||
      (Array.isArray(payload.items) ? payload.items.join(" ") : "")
    );
    return hydrateEditorExercise({
      name: baseName,
      mode: "text",
      content: text,
      rawContent: text,
      script: text,
      speed: Number(editorSpeed?.value || 3),
      repeats: 1,
      voiceInstruction: getDefaultEditorVoiceInstruction("text"),
    });
  }

  if (mode === "syllables") {
    const items = payload.items.map((item) => String(item || "").trim()).filter(Boolean);
    return hydrateEditorExercise({
      name: baseName,
      mode: "syllables",
      content: items.join(", "),
      rawContent: items.join(", "),
      script: items.join(" "),
      speed: Number(editorSpeed?.value || 3),
      repeats: Number(editorRepeatCount?.value || 5),
      voiceInstruction: getDefaultEditorVoiceInstruction("syllables"),
    });
  }

  if (mode === "vowels") {
    const items = payload.items.map((item) => String(item || "").trim()).filter(Boolean);
    return hydrateEditorExercise({
      name: baseName,
      mode: "vowels",
      content: items.join(", "),
      rawContent: items.join(", "),
      script: items.join(" "),
      speed: Number(editorSpeed?.value || 3),
      repeats: Number(editorRepeatCount?.value || 5),
      voiceInstruction: getDefaultEditorVoiceInstruction("vowels"),
    });
  }

  const sentences = payload.items.map((item) => String(item || "").trim()).filter(Boolean);
  return hydrateEditorExercise({
    name: baseName,
    mode: "sentences",
    content: sentences.join(" | "),
    script: sentences.join(" | "),
    sentences,
    speed: Number(editorSpeed?.value || 3),
    repeats: 1,
    voiceInstruction: getDefaultEditorVoiceInstruction("sentences"),
  });
}

async function applyEditorAiPreview() {
  if (!editorAiGeneratedPayload) {
    setEditorAiState("Es ist noch keine KI-Vorschau vorhanden.");
    return;
  }

  const exercise = buildExerciseFromEditorAiPayload(editorAiGeneratedPayload);
  if (!exercise) {
    setEditorAiState("Die Vorschau konnte nicht übernommen werden.");
    return;
  }

  applyEditorAiExercisesButton.disabled = true;
  setEditorAiState("Übung wird übernommen...");

  try {
    activeEditorExerciseName = exercise.name;
    savedEditorExercise = exercise;
    applyEditorExerciseToForm(exercise);
    updateEditorForm();
    await saveEditorExerciseObject(exercise);
    editorSavedExercises.value = getEditorSelectValueForExerciseName(exercise.name);
    closeEditorAiModal();
    resetEditorAiModal();
    editorVoiceState.textContent = `KI-Übung übernommen: ${exercise.name}`;
  } catch (error) {
    setEditorAiState(error?.message || "Übernahme fehlgeschlagen.");
  } finally {
    applyEditorAiExercisesButton.disabled = false;
  }
}

async function suggestVoiceInstruction() {
  const fallbackSuggestion = buildVoiceInstructionSuggestion();
  await ensureChatGptAccess().catch(() => {});
  const chatGptConfig = getChatGptRequestConfig();

  suggestVoiceButton.disabled = true;
  editorVoiceState.textContent = "ChatGPT erstellt einen Vorschlag...";

  try {
    const exercise = buildEditorExerciseFromForm();
    const response = await fetch(getApiUrl("/api/chatgpt"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: chatGptConfig.apiKey,
        model: chatGptConfig.model,
        systemPrompt: chatGptConfig.systemPrompt,
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
      if (payload.error === "missing-openai-api-key") {
        throw new Error("missing-openai-api-key");
      }
      throw new Error(payload.error || "chatgpt-suggestion-failed");
    }

    editorVoiceInstruction.value = String(payload.text).trim();
    saveEditorDraft();
    editorVoiceState.textContent = "ChatGPT-Vorschlag erstellt.";
  } catch (error) {
    editorVoiceInstruction.value = fallbackSuggestion;
    saveEditorDraft();
    editorVoiceState.textContent = error?.message === "missing-openai-api-key"
      ? "Lokaler KI-Vorschlag erstellt. ChatGPT ist im Setup nicht aktiv."
      : "ChatGPT nicht erreichbar. Lokaler Vorschlag eingesetzt.";
  } finally {
    suggestVoiceButton.disabled = false;
  }
}

async function generateVoiceAudio() {
  const isDialogMode = editorMode.value === "dialog";
  const isBreathingMode = editorMode.value === "breathing";
  const text = editorVoiceInstruction.value.trim();
  if (!text) {
    editorVoiceState.textContent = "Bitte zuerst einen Voice-Text eintragen.";
    return;
  }

  generateVoiceAudioButton.disabled = true;
  editorVoiceState.textContent = "ElevenLabs-Audio wird erstellt...";

  try {
    const requestSettings = getEditorVoiceRequestSettings();
    const response = await fetch(getApiUrl("/api/voice"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        store: true,
        ...requestSettings,
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
    editorVoiceAudioVoiceId = cloudVoice.voiceId || requestSettings.voiceId;
    editorVoiceAudioVoiceSettings = cloudVoice.voiceSettings || requestSettings.voiceSettings;
    editorVoiceAudioTextHash = cloudVoice.textHash || hashText(text);
    editorVoiceAudioUpdatedAt = new Date().toISOString();
    editorVoicePreview.src = resolveAppUrl(editorVoiceAudioUrl);
    editorVoiceState.textContent = "ElevenLabs-Audio erstellt und in Firebase gespeichert.";
    saveEditorDraft();
    await saveEditorExercise();
    if (isDialogMode) {
      await generateDialogVoiceAudio({ allowMissingSystemTurns: true });
    } else {
      editorVoiceState.textContent = "ElevenLabs-Audio erstellt und in der Übung gespeichert.";
    }
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
  const isBreathingMode = editorMode.value === "breathing";
  exerciseEditor?.classList.toggle("dialog-mode", isDialogMode);
  exerciseEditor?.classList.toggle("breathing-mode", isBreathingMode);
  breathingSettings?.classList.toggle("is-hidden", !isBreathingMode);
  editorTimingOptions?.classList.toggle("is-hidden", isBreathingMode);
  const canUseRepeats = supportsEditorRepeats(editorMode.value);
  if (!canUseRepeats) editorUseRepeats.checked = false;
  editorRepeatGroup?.classList.toggle("is-hidden", !canUseRepeats);
  repeatControl.classList.toggle("is-hidden", !canUseRepeats || !editorUseRepeats.checked);
  editorUseRepeats.disabled = !canUseRepeats;
  editorSentenceBuilder?.classList.toggle("is-hidden", !isSentenceMode || isBreathingMode);
  editorDialogBuilder?.classList.toggle("is-hidden", !isDialogMode);
  editorContent?.closest(".editor-section-content")?.classList.toggle("breathing-content-mode", isBreathingMode);
  editorSpeedValue.textContent = EDITOR_SPEEDS[editorSpeed.value]?.label || "Normal";
  updateEditorKaraokeTimingHint();
  renderEditorPreview(buildEditorExerciseFromForm());
  renderEditorSentenceList();
  if (isDialogMode) renderEditorDialogList();
}

function updateEditorKaraokeTimingHint() {
  if (!editorKaraokeTimingHint) return;

  const exercise = buildEditorExerciseFromForm();
  const timing = exercise.timing || EDITOR_SPEEDS[exercise.speed] || EDITOR_SPEEDS[3];
  const speedLabel = timing.label || EDITOR_SPEEDS[3].label;

  if (exercise.mode === "sentences") {
    editorKaraokeTimingHint.textContent = `Standzeit: kurze Sätze wechseln nach erkannter Pause; Tempo ${speedLabel}.`;
    return;
  }

  editorKaraokeTimingHint.textContent = getKaraokeTimingHint(exercise, timing);
}

function supportsEditorRepeats(mode) {
  return mode === "syllables" || mode === "vowels";
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
    const systemSpeakerLabel = getDialogSystemSpeakerLabel(exercise);
    return getExerciseDialogTurns(exercise).map((turn, index) => ({
      label: `${turn.role === "patient" ? getCurrentPatientName() : systemSpeakerLabel}: ${turn.text}`,
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

  if (!supportsEditorKaraokeTempoTest(exercise.mode)) {
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

function supportsEditorKaraokeTempoTest(mode) {
  return isTextLikeMode(mode) || mode === "sentences" || mode === "dialog";
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

function getCurrentEditorTextForModeChange() {
  const rawText = editorContent.value.trim();
  if (rawText) return rawText;

  const sentences = getEditorSentences();
  if (sentences.length) return sentences.join(" | ");

  const turns = getEditorDialogTurns();
  if (turns.length) return serializeDialogTurns(turns);

  return "";
}

function convertEditorContentForMode(targetMode, sourceText) {
  const cleanText = String(sourceText || "").trim();
  if (!cleanText) return getDefaultEditorContent(targetMode);

  if (targetMode === "sentences") {
    return splitTextIntoEditableSentences(cleanText).join(" | ");
  }

  if (targetMode === "long_text") {
    return splitTextPassages(cleanText).join("\n");
  }

  if (targetMode === "dialog") {
    const turns = parseDialogTurns(cleanText);
    return turns.length
      ? serializeDialogTurns(turns)
      : `System: ${cleanText}`;
  }

  return cleanText
    .split(/\s*\|\s*|\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

function splitTextIntoEditableSentences(text) {
  const explicitParts = String(text || "")
    .split(/\s*\|\s*|\r?\n+/)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (explicitParts.length > 1) return explicitParts;

  const normalized = explicitParts[0] || String(text || "").replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const sentenceParts = normalized.match(/[^.!?\u2026]+(?:[.!?\u2026]+["\u00bb\u201c\u201d']?)?/g) || [];
  return sentenceParts.length
    ? sentenceParts.map((part) => part.trim()).filter(Boolean)
    : [normalized];
}

function applyEditorModeDefaults() {
  const nextMode = editorMode.value;
  const previousText = getCurrentEditorTextForModeChange();
  editorContent.value = convertEditorContentForMode(nextMode, previousText);
  editorDialogTurnsState = nextMode === "dialog" ? parseDialogTurns(editorContent.value) : [];
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
  } else if (editorMode.value === "breathing") {
    editorExerciseName.value = "Ruhige Bauchatmung";
  } else {
    editorExerciseName.value = "Neue SilbenÜbung";
  }
}

async function generateDialogVoiceAudio(options = {}) {
  const exercise = buildEditorExerciseFromForm();
  const requestSettings = getEditorVoiceRequestSettings();
  const turns = Array.isArray(exercise.dialogTurns) ? exercise.dialogTurns : [];
  const systemTurns = turns.filter((turn) => turn.role !== "patient" && turn.text);

  if (!systemTurns.length) {
    editorVoiceState.textContent = options.allowMissingSystemTurns
      ? "Voice-Begleitung gespeichert. Für Dialog-Audio bitte eine KI-Dialogzeile eintragen."
      : "Bitte mindestens eine KI-Dialogzeile eintragen.";
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
      if (isDialogTurnAudioCurrent(turn, "", requestSettings)) {
        reusedCount += 1;
        updatedTurns.push(turn);
        editorVoiceState.textContent = `Dialog-Audio aktuell: ${systemIndex}/${systemTurns.length}`;
        continue;
      }

      editorVoiceState.textContent = `Dialog-Audio wird erstellt: ${systemIndex}/${systemTurns.length}`;
      const storedAudio = await createStoredVoiceAudio(
        turn.text,
        `${exercise.name} Dialog ${systemIndex}`,
        requestSettings,
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
      content: serializeDialogTurns(updatedTurns, getEditorVoiceLabel()),
      script: serializeDialogTurns(updatedTurns, getEditorVoiceLabel()),
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

async function saveEditorExercise() {
  const exercise = buildEditorExerciseFromForm();
  saveEditorExerciseButton.disabled = true;
  saveEditorExerciseButton.textContent = "Speichern...";
  editorVoiceState.textContent = "Übung wird vorbereitet...";

  try {
    const exerciseWithAudio = await prepareExerciseAudioForEditorSave(exercise);
    await saveEditorExerciseObject(exerciseWithAudio);
    applyEditorExerciseToForm(exerciseWithAudio);
    editorVoiceState.textContent = "Übung mit Audio in Firebase gespeichert.";
  } catch (error) {
    editorVoiceState.textContent =
      error?.message || "Audio konnte nicht erstellt werden. Übung wird lokal gespeichert.";
    await saveEditorExerciseObject(exercise);
  } finally {
    saveEditorExerciseButton.disabled = false;
  }
}

async function saveEditorExerciseObject(exercise, options = {}) {
  saveRecordingKaraokeSpeedForExerciseName(exercise.name, exercise.speed);
  savedEditorExercises = upsertEditorExercise(savedEditorExercises, exercise);
  savedEditorExercise = exercise;
  activeEditorExerciseName = exercise.name;
  persistEditorExercises();
  let cloudSaved = true;
  await saveCloudEditorExercise(exercise).catch(() => {
    cloudSaved = false;
    firebaseState.textContent = "Übung lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
  });
  if (options.refreshUi === false) return;
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
  showEditorSaveFeedback(exercise.name, { cloudSaved });
}

function upsertEditorExercise(exercises, exercise) {
  const hydratedExercise = hydrateEditorExercise(exercise);
  const normalizedName = normalizeEditorExerciseName(hydratedExercise.name);
  const existingIndex = exercises.findIndex(
    (item) => normalizeEditorExerciseName(item.name) === normalizedName,
  );
  const nextExercises = [...exercises];

  if (existingIndex >= 0) {
    nextExercises[existingIndex] = hydratedExercise;
  } else {
    nextExercises.push(hydratedExercise);
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

function showEditorSaveFeedback(exerciseLabel, options = {}) {
  window.clearTimeout(editorSaveFeedbackTimerId);
  saveEditorExerciseButton.textContent = "Gespeichert";
  saveEditorExerciseButton.classList.add("is-saved");
  saveEditorExerciseButton.disabled = true;
  editorVoiceState.textContent = "Übung gespeichert.";
  firebaseState.textContent = `Übung gespeichert und in Aufnahme auswählbar: ${exerciseLabel}`;

  if (options.cloudSaved === false) {
    firebaseState.textContent = `Übung lokal gespeichert, Firebase fehlgeschlagen: ${exerciseLabel}`;
  }

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
  updateEditorSavedListVisibility();
  if (editorModeState) {
    editorModeState.textContent = isEditingSaved
      ? `Gespeicherte Übung bearbeiten: ${activeEditorExerciseName}`
      : "Neue Übung";
  }
}

function updateEditorSavedListVisibility() {
  if (!editorSavedExerciseList) return;
  const hasSavedExercises = Boolean(savedEditorExercises.length);
  const shouldShow = hasSavedExercises && editorSavedListExpanded;
  editorSavedExerciseList.classList.toggle("is-hidden", !shouldShow);
  editorSavedModeFilter?.closest(".editor-saved-filter")?.classList.toggle("is-hidden", !hasSavedExercises);
  editorSavedListToggle?.classList.toggle("is-hidden", !hasSavedExercises);
  if (editorSavedListToggle) {
    editorSavedListToggle.textContent = shouldShow ? "Vorlagen ausblenden" : "Vorlagen verwalten";
  }
}

function resetEditorForm(options = {}) {
  editorExerciseName.value = "";
  editorMode.value = options.blank ? "syllables" : "sentences";
  renderEditorPatientScopeOptions(getCurrentPatientName());
  editorDialogTurnsState = [];
  breathingExtraStepsState = [];
  renderBreathingExtraSteps();
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
  renderEditorVoiceSelect(getElevenLabsSettings(), getElevenLabsSettings().activeVoiceKey);
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
  const visibleSavedExercises = getFilteredSavedEditorExercises();
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

  if (visibleSavedExercises.length) {
    const savedGroup = document.createElement("optgroup");
    savedGroup.label = "Gespeicherte Editor-Übungen";
    visibleSavedExercises.forEach((exercise) => {
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

function getFilteredSavedEditorExercises() {
  const selectedMode = editorSavedModeFilter?.value || "";
  if (!selectedMode) return savedEditorExercises;

  return savedEditorExercises.filter((exercise) =>
    normalizeEditorExerciseModeValue(exercise?.mode) === selectedMode,
  );
}

function normalizeEditorExerciseModeValue(mode) {
  const normalizedMode = String(mode || "syllables").trim().toLowerCase();
  if (["breathing", "breath", "breathing_exercise", "atem", "atemuebung", "atemübung"].includes(normalizedMode)) return "breathing";
  if (["media", "media_exercise", "video", "image", "bild"].includes(normalizedMode)) return "media_exercise";
  if (["media_pause", "pause", "audio_pause", "sound_pause"].includes(normalizedMode)) return "media_pause";
  return normalizedMode || "syllables";
}

function looksLikeBreathingExerciseName(value) {
  const normalizedName = normalizeEditorExerciseName(value || "");
  return /\b(atem|atmung|bauchatmung|atemuebung|atemübung|breathing)\b/.test(normalizedName);
}

function isBreathingExercise(exercise) {
  if (!exercise) return false;
  if (normalizeEditorExerciseModeValue(exercise.mode || exercise.type || exercise.kind || exercise.functionType) === "breathing") return true;
  if (exercise.breathing || exercise.breathingSettings) return true;
  return looksLikeBreathingExerciseName(exercise.name || exercise.title || exercise.exerciseName || exercise.exerciseId);
}

function getEditorModeLabel(mode) {
  if (mode === "media_exercise") return "Medienübung";
  if (mode === "media_pause") return "Pauseneinheit";
  const option = Array.from(editorMode?.options || []).find((item) => item.value === mode);
  return option?.textContent?.trim() || "Funktionsart";
}

function renderSavedEditorExerciseList() {
  if (!editorSavedExerciseList) return;

  editorSavedExerciseList.innerHTML = "";
  const visibleSavedExercises = getFilteredSavedEditorExercises();
  if (!savedEditorExercises.length) {
    editorSavedListExpanded = false;
    editorSavedExerciseList.classList.add("is-empty");
    editorSavedExerciseList.textContent = "Keine gespeicherten Editor-Übungen.";
    updateEditorSavedListVisibility();
    return;
  }

  if (!visibleSavedExercises.length) {
    editorSavedExerciseList.classList.add("is-empty");
    editorSavedExerciseList.textContent = `Keine gespeicherte \u00dcbung f\u00fcr ${getEditorModeLabel(editorSavedModeFilter?.value)}.`;
    updateEditorSavedListVisibility();
    return;
  }

  editorSavedExerciseList.classList.remove("is-empty");
  visibleSavedExercises.forEach((exercise) => {
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
  updateEditorSavedListVisibility();
}

function renderRecordingExerciseOptions(preferredValue = exerciseName.value) {
  const currentValue = preferredValue;
  const selectedMode = recordingModeFilter?.value || "";
  const fixedOptions = Array.from(exerciseName.querySelectorAll("option:not([data-editor-exercise])"));
  exerciseName.innerHTML = "";
  fixedOptions.forEach((option) => {
    const optionMode = normalizeEditorExerciseModeValue(option.dataset.mode || "");
    if (!selectedMode || option.value === "custom-editor" || optionMode === selectedMode) {
      exerciseName.append(option);
    }
  });

  if (savedEditorExercises.length) {
    getFilteredRecordingEditorExercises().forEach((exercise) => {
      const option = document.createElement("option");
      option.value = exercise.name;
      option.textContent = exercise.name;
      option.dataset.editorExercise = "true";
      option.dataset.mode = normalizeEditorExerciseModeValue(exercise.mode);
      exerciseName.append(option);
    });
  }

  const optionValues = Array.from(exerciseName.options).map((option) => option.value);
  const fallbackValue = optionValues.find((value) => value !== "custom-editor") || "custom-editor";
  exerciseName.value = optionValues.includes(currentValue) ? currentValue : fallbackValue;
  renderRecordingExerciseShortcuts();
  syncBreathingRecordPreview();
}

function getFilteredRecordingEditorExercises() {
  const selectedMode = recordingModeFilter?.value || "";
  const patientVisibleExercises = savedEditorExercises.filter((exercise) =>
    isEditorExerciseVisibleForCurrentPatient(exercise),
  );
  if (!selectedMode) return patientVisibleExercises;
  return patientVisibleExercises.filter((exercise) =>
    normalizeEditorExerciseModeValue(exercise?.mode) === selectedMode,
  );
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
  renderEditorPatientScopeOptions(exercise.patientName || "");
  if (editorMode.value === "dialog") {
    editorDialogTurnsState = getExerciseDialogTurns(exercise);
    editorContent.value = serializeDialogTurns(editorDialogTurnsState, getDialogSystemSpeakerLabel(exercise));
  } else {
    editorDialogTurnsState = [];
    editorContent.value = getEditorContentForExercise(exercise);
  }
  editorVoiceInstruction.value =
    exercise.voiceInstruction || getDefaultEditorVoiceInstruction(editorMode.value);
  const exerciseVoiceSettings = mergeExerciseVoiceIntoSettings(getElevenLabsSettings(), exercise);
  const embeddedVoice = getEmbeddedExerciseVoiceProfile(exercise);
  const exerciseVoiceKey =
    exercise.voiceProfileKey ||
    embeddedVoice?.key ||
    exerciseVoiceSettings.voices.find((voice) => voice.voiceId === exercise.voiceProfileVoiceId)?.key ||
    "";
  renderEditorVoiceSelect(exerciseVoiceSettings, exerciseVoiceKey);
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
  const breathing = getBreathingSettings(exercise);
  if (breathingInhale) breathingInhale.value = String(breathing.inhale);
  if (breathingHold) breathingHold.value = String(breathing.hold);
  if (breathingExhale) breathingExhale.value = String(breathing.exhale);
  if (breathingPause) breathingPause.value = String(breathing.pause);
  if (breathingRepeats) breathingRepeats.value = String(breathing.repeats);
  if (breathingUseVoice) breathingUseVoice.checked = true;
  breathingExtraStepsState = getBreathingExtraSteps(exercise);
  renderBreathingExtraSteps();
  editorSpeed.value = String(exercise.speed || 3);
}

function saveEditorDraft() {
  const draft = {
    name: editorExerciseName.value,
    activeExerciseName: activeEditorExerciseName,
    mode: editorMode.value,
    patientName: editorPatientScope?.value || "",
    content: editorContent.value,
    dialogTurns: editorMode.value === "dialog" ? getEditorDialogTurns() : [],
    voiceInstruction: editorVoiceInstruction.value,
    voiceProfileKey: editorVoiceSelect?.value || "",
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
    breathing: getBreathingSettings(),
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

  firebaseState.textContent = `Vorlage wird in Firebase gelöscht: ${exercise.name}`;

  try {
    await deleteCloudEditorExercise(exercise);
  } catch (error) {
    firebaseState.textContent = "Firebase-Löschen fehlgeschlagen. Vorlage bleibt erhalten.";
    return;
  }

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
  firebaseState.textContent = `Vorlage aus Firebase gelöscht: ${exercise.name}`;
}

async function deleteCloudEditorExercise(exercise) {
  if (!exercise?.name) return;
  const response = await fetch(getApiUrl("/api/editor-exercises"), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: exercise.name }),
  });

  if (response.ok) return;

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

function getCurrentSavedEditorExerciseForDeletion() {
  const formName = editorExerciseName.value.trim();
  return (
    findSavedEditorExerciseByName(formName) ||
    (normalizeEditorExerciseName(savedEditorExercise?.name) === normalizeEditorExerciseName(formName)
      ? savedEditorExercise
      : null)
  );
}

function clearEditorDemoAudio(exercise) {
  return {
    ...exercise,
    demoAudioUrl: "",
    demoAudioPath: "",
    demoAudioSegments: [],
    demoVoiceId: "",
    demoVoiceSettings: null,
    demoTextHash: "",
    demoSpeed: 0,
    demoCreatedAt: "",
  };
}

async function deleteEditorAudioPaths(paths) {
  const uniquePaths = [...new Set(paths.filter(Boolean))];
  await Promise.all(uniquePaths.map((path) => deleteObject(ref(storage, path)).catch(() => {})));
}

async function persistEditorInlineDeletion(previousExercise, successText) {
  saveEditorDraft();

  if (!previousExercise?.name) {
    editorVoiceState.textContent = `${successText}. Zum dauerhaften Übernehmen bitte speichern.`;
    return;
  }

  let updatedExercise = buildEditorExerciseFromForm();
  updatedExercise = clearEditorDemoAudio(updatedExercise);

  const nextAudioPaths = new Set(collectEditorExerciseAudioPaths(updatedExercise));
  const removedAudioPaths = collectEditorExerciseAudioPaths(previousExercise).filter(
    (path) => !nextAudioPaths.has(path),
  );

  editorVoiceState.textContent = `${successText}. Firebase wird aktualisiert...`;
  await deleteEditorAudioPaths(removedAudioPaths);
  await saveEditorExerciseObject(updatedExercise);
  applyEditorExerciseToForm(updatedExercise);
  updateEditorForm();
  editorVoiceState.textContent = `${successText} und in Firebase gespeichert. Audio bei Bedarf neu erstellen.`;
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
      renderEditorPatientScopeOptions(draft.patientName || getCurrentPatientName());
      if (editorMode.value === "dialog") {
        editorDialogTurnsState = Array.isArray(draft.dialogTurns) && draft.dialogTurns.length
          ? draft.dialogTurns.map((turn) => normalizeDialogTurn(turn)).filter((turn) => turn.text)
          : parseDialogTurns(draft.content || editorContent.value);
        editorContent.value = serializeDialogTurns(editorDialogTurnsState, getEditorVoiceLabel());
      } else {
        editorDialogTurnsState = [];
        editorContent.value = draft.content || editorContent.value;
      }
      editorVoiceInstruction.value = draft.voiceInstruction || editorVoiceInstruction.value;
      renderEditorVoiceSelect(getElevenLabsSettings(), draft.voiceProfileKey || "");
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
      const breathing = getBreathingSettings({ breathing: draft.breathing || {} });
      if (breathingInhale) breathingInhale.value = String(breathing.inhale);
      if (breathingHold) breathingHold.value = String(breathing.hold);
      if (breathingExhale) breathingExhale.value = String(breathing.exhale);
      if (breathingPause) breathingPause.value = String(breathing.pause);
      if (breathingRepeats) breathingRepeats.value = String(breathing.repeats);
      if (breathingUseVoice) breathingUseVoice.checked = true;
      breathingExtraStepsState = getBreathingExtraSteps({ breathing: draft.breathing || {} });
      renderBreathingExtraSteps();
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
  return /[.!?&:;]$/.test(String(word || "").trim());
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
  overlay.classList.toggle("is-playback-compact", overlay === playbackKaraokeOverlay);
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

async function waitForCameraFrame(timeoutMs = 900) {
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
    timeoutMs,
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

function startComposedVideoStream() {
  const hasUsableCameraFrame = Boolean(cameraPreview.videoWidth && cameraPreview.videoHeight && cameraPreview.readyState >= 2);
  if (!hasUsableCameraFrame) {
    composedRecordingStream = new MediaStream();
    mediaStream.getVideoTracks().forEach((track) => {
      if (track.readyState === "live") composedRecordingStream.addTrack(track.clone());
    });
    composedRecordingAudioTrack = createRecordingAudioTrack() || mediaStream.getAudioTracks()[0]?.clone?.();
    if (composedRecordingAudioTrack) composedRecordingStream.addTrack(composedRecordingAudioTrack);
    recordingCanvas = null;
    recordingCanvasContext = null;
    activeCaptureSourceWidth = 0;
    activeCaptureSourceHeight = 0;
    activeCaptureRotationDegrees = 0;
    return composedRecordingStream;
  }

  recordingCanvas = document.createElement("canvas");
  recordingCanvas.width = RECORDING_WIDTH;
  recordingCanvas.height = RECORDING_HEIGHT;
  recordingCanvasContext = recordingCanvas.getContext("2d");

  if (!recordingCanvas.captureStream) {
    composedRecordingStream = new MediaStream();
    mediaStream.getVideoTracks().forEach((track) => {
      composedRecordingStream.addTrack(track.clone());
    });
    composedRecordingAudioTrack = createRecordingAudioTrack() || mediaStream.getAudioTracks()[0]?.clone?.();
    if (composedRecordingAudioTrack) composedRecordingStream.addTrack(composedRecordingAudioTrack);
    recordingCanvas = null;
    recordingCanvasContext = null;
    activeCaptureSourceWidth = 0;
    activeCaptureSourceHeight = 0;
    activeCaptureRotationDegrees = 0;
    return composedRecordingStream;
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
  if (!exercise) {
    return fallback;
  }

  if (isLongTextMode(exercise.mode)) {
    const savedPassages = Array.isArray(exercise.textPassages)
      ? exercise.textPassages.map((passage) => String(passage || "").trim()).filter(Boolean)
      : [];
    if (savedPassages.length) return savedPassages.join("\n");

    const rawText = exercise.rawContent || exercise.content || exercise.script || fallback;
    return splitTextPassages(rawText).join("\n");
  }

  if (exercise.mode !== "text") {
    return exercise?.content || fallback;
  }

  const rawText = exercise.rawContent || exercise.content || exercise.script || fallback;
  return String(rawText || "").replace(/\s+/g, " ").trim();
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
  activeCaptureSourceWidth = sourceWidth;
  activeCaptureSourceHeight = sourceHeight;
  activeCaptureRotationDegrees = 0;

  // iOS reports landscape track dimensions for a portrait camera stream, but
  // drawImage already receives the visually oriented frame. Rotating from the
  // reported dimensions turns an upright face sideways in the saved video.
  const scale = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight) * 1.1;
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  const drawX = -drawWidth / 2;
  const drawY = -drawHeight / 2;

  recordingCanvasContext.save();
  recordingCanvasContext.clearRect(0, 0, targetWidth, targetHeight);
  recordingCanvasContext.fillStyle = "#101820";
  recordingCanvasContext.fillRect(0, 0, targetWidth, targetHeight);
  recordingCanvasContext.translate(targetWidth / 2, targetHeight / 2);

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
  const levelMeterWidth = options.levelMeter
    ? Math.max((options.stereoLevelMeter ? 18 : 10) * pixelRatio, options.stereoLevelMeter ? 18 : 10)
    : 0;
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
      drawWaveformLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options);
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
      drawWaveformLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options);
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
      drawWaveformLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options);
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
    drawWaveformLevelMeter(context, width - levelMeterWidth, 0, levelMeterWidth, height, options);
  }
}

function getPlaybackWaveformDisplayOptions(metadata, progress = 0, durationSeconds = null) {
  const values = getBestPlaybackAmplitudeSeries(metadata);
  const levelValues = metadata?.lautstaerkePegel || metadata?.lautstaerken || values;
  const currentLevel = getTimelineValue(levelValues, Math.max(0, Math.min(1, Number(progress) || 0)));
  return {
    mode: "playback",
    progress,
    levelMeter: true,
    stereoLevelMeter: true,
    currentLevel,
    currentLeftLevel: currentLevel,
    currentRightLevel: currentLevel,
    durationSeconds: durationSeconds ?? metadata?.dauerSekunden,
    compress: 1,
    dynamicRange: 1.28,
    minLocalPeak: 8,
    visualCeiling: 88,
    shapePower: 1.16,
    dim: true,
    levelValues,
    pixelsPerBar: 3.2,
    resampleMode: "rms",
    barGap: 2,
    minBarWidth: 1.6,
    minSpeechBarHeight: 5,
    minPauseBarHeight: 2,
  };
}

function hasUsableWaveformSignal(values = []) {
  const numericValues = values.map(Number).filter(Number.isFinite);
  if (!numericValues.length) return false;
  const maxValue = Math.max(...numericValues);
  const averageValue = numericValues.reduce((sum, value) => sum + value, 0) / numericValues.length;
  return maxValue >= 6 || averageValue >= 2.2;
}

function getBestPlaybackAmplitudeSeries(metadata = currentMetadata) {
  const amplitudes = (metadata?.amplituden || []).map((value) => Number(value) || 0);
  if (hasUsableWaveformSignal(amplitudes)) return amplitudes;

  const rawAmplitudes = (metadata?.rawAmplituden || []).map((value) => Number(value) || 0);
  if (rawAmplitudes.length) {
    const rescaledRaw = rawAmplitudes.map((value) => scaleAmplitude(value));
    if (hasUsableWaveformSignal(rescaledRaw)) return rescaledRaw;
  }

  const levelValues = (metadata?.lautstaerkePegel || metadata?.lautstaerken || []).map((value) => Number(value) || 0);
  if (levelValues.length) return levelValues;

  return amplitudes;
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

function drawWaveformLevelMeter(context, x, y, width, height, options = {}) {
  if (options.stereoLevelMeter) {
    const left = Number.isFinite(options.currentLeftLevel)
      ? options.currentLeftLevel
      : options.currentLevel || 0;
    const right = Number.isFinite(options.currentRightLevel)
      ? options.currentRightLevel
      : options.currentLevel || 0;
    drawStereoLevelMeter(context, x, y, width, height, left, right);
    return;
  }

  drawLevelMeter(context, x, y, width, height, options.currentLevel || 0);
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

function drawFrequencyEqualizerTimeline(canvas, pitchValues, strengthValues = [], options = {}) {
  const context = canvas.getContext("2d");
  resizeCanvasToDisplay(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const pixelRatio = window.devicePixelRatio || 1;
  const paddingX = 12 * pixelRatio;
  const paddingY = 10 * pixelRatio;
  const lowHz = PITCH_LOW_HZ;
  const highHz = PITCH_HIGH_HZ;
  const graphWidth = Math.max(1, width - paddingX * 2);
  const graphHeight = Math.max(1, height - paddingY * 2);
  const values = options.limit === false ? pitchValues : pitchValues.slice(-MAX_VISIBLE_SAMPLES);
  const strengths = options.limit === false ? strengthValues.slice(0, values.length) : strengthValues.slice(-values.length);
  const numericPitch = values.map((value) => Math.max(0, Number(value) || 0));
  const numericStrength = strengths.map((value) => Math.max(0, Number(value) || 0));

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#0f1820";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.12)";
  context.lineWidth = 1 * pixelRatio;
  [0.25, 0.5, 0.75].forEach((ratio) => {
    const y = paddingY + graphHeight * ratio;
    context.beginPath();
    context.moveTo(paddingX, y);
    context.lineTo(width - paddingX, y);
    context.stroke();
  });

  context.fillStyle = "rgba(255,255,255,0.68)";
  context.font = `${9 * pixelRatio}px system-ui, sans-serif`;
  context.fillText(`${highHz} Hz`, paddingX, paddingY + 9 * pixelRatio);
  context.fillText(`${lowHz} Hz`, paddingX, height - paddingY);

  if (!numericPitch.length) {
    drawTimelineRangeMarkers(context, {
      start: Number.isFinite(options.rangeStart) ? options.rangeStart : null,
      end: Number.isFinite(options.rangeEnd) ? options.rangeEnd : null,
      width,
      height,
      left: paddingX,
      right: width - paddingX,
    });
    return;
  }

  const displayPitch = resamplePlaybackValues(numericPitch, graphWidth, {
    durationSeconds: options.durationSeconds || 1,
    pixelsPerBar: 5,
    resampleMode: "average",
  });
  const displayStrength = resamplePlaybackValues(numericStrength.length ? numericStrength : numericPitch, graphWidth, {
    durationSeconds: options.durationSeconds || 1,
    pixelsPerBar: 5,
    resampleMode: "rms",
  });
  const count = Math.max(1, displayPitch.length);
  const gap = Math.min(2 * pixelRatio, (graphWidth / count) * 0.24);
  const barWidth = Math.max(1.4 * pixelRatio, (graphWidth - gap * Math.max(0, count - 1)) / count);

  displayPitch.forEach((pitch, index) => {
    const strength = Math.max(0, Math.min(100, displayStrength[index] || 0));
    const hasVoice = pitch > 0 && strength > 2;
    const clampedPitch = Math.max(lowHz, Math.min(highHz, pitch || lowHz));
    const pitchRatio = (clampedPitch - lowHz) / Math.max(1, highHz - lowHz);
    const x = paddingX + index * (barWidth + gap);
    const barHeight = hasVoice
      ? Math.max(5 * pixelRatio, (0.18 + pitchRatio * 0.72) * graphHeight)
      : 2 * pixelRatio;
    const y = paddingY + graphHeight - barHeight;
    const hue = 150 + pitchRatio * 58;
    const alpha = hasVoice ? 0.42 + Math.min(0.46, strength / 180) : 0.24;

    context.fillStyle = hasVoice
      ? `hsla(${hue}, 78%, 58%, ${alpha})`
      : "rgba(56, 193, 114, 0.26)";
    roundRect(context, x, y, barWidth, barHeight, Math.min(5 * pixelRatio, barWidth / 2));
    context.fill();

    if (hasVoice && strength >= 55) {
      context.fillStyle = "rgba(246, 180, 75, 0.72)";
      context.beginPath();
      context.arc(x + barWidth / 2, y, Math.max(2 * pixelRatio, barWidth * 0.35), 0, Math.PI * 2);
      context.fill();
    }
  });

  if (Number.isFinite(options.progress)) {
    const x = paddingX + Math.max(0, Math.min(1, options.progress)) * graphWidth;
    context.strokeStyle = "#ff7a90";
    context.lineWidth = 3 * pixelRatio;
    context.beginPath();
    context.moveTo(x, paddingY);
    context.lineTo(x, height - paddingY);
    context.stroke();
  }

  drawTimelineRangeMarkers(context, {
    start: Number.isFinite(options.rangeStart) ? options.rangeStart : null,
    end: Number.isFinite(options.rangeEnd) ? options.rangeEnd : null,
    width,
    height,
    left: paddingX,
    right: width - paddingX,
  });
}

function updateThreeLineKaraokeDisplay(overlay, timeline, activeIndex) {
  const lines = getThreeLineKaraokeLabels(timeline, activeIndex);
  const lineIndexes = getThreeLineKaraokeIndexes(timeline, activeIndex);
  overlay.classList.toggle("is-context-dense", Object.values(lines).some((line) => line.length > 18));
  overlay.classList.toggle("is-dialog-mode", timeline.some((item) => item.isDialog));
  overlay.classList.toggle("is-text-passage-mode", timeline.some((item) => item.isTextPassage));
  overlay.classList.toggle("is-forward-only", !timeline.some((item) => item.isSentence));

  [
    [".karaoke-line-before", lines.before, lineIndexes.before],
    [".karaoke-line-current", lines.current, lineIndexes.current],
    [".karaoke-line-after", lines.after, lineIndexes.after],
  ].forEach(([selector, text, itemIndex]) => {
    const line = overlay.querySelector(selector);
    if (!line) return;
    updateAnimatedKaraokeLine(line, text, timeline.some((item) => item.isDialog));
    line.classList.toggle("is-empty", !text);
    line.classList.toggle("is-system-turn", Boolean(timeline[itemIndex]?.isSystemTurn));
    line.classList.toggle("is-patient-turn", Boolean(timeline[itemIndex]?.isPatientTurn));
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
  const indexes = getThreeLineKaraokeIndexes(timeline, activeIndex);
  return {
    before: indexes.beforeGroup
      ? getSpokenGroupLabel(indexes.beforeGroup)
      : getTimelineLabelAt(timeline, indexes.before),
    current: indexes.currentGroup
      ? getSpokenGroupLabel(indexes.currentGroup)
      : getTimelineLabelAt(timeline, indexes.current),
    after: indexes.afterGroup
      ? getSpokenGroupLabel(indexes.afterGroup)
      : getTimelineLabelAt(timeline, indexes.after),
  };
}

function getThreeLineKaraokeIndexes(timeline, activeIndex) {
  if (!timeline.length) return { before: "", current: "", after: "" };

  const boundedIndex = Math.max(0, Math.min(activeIndex, timeline.length - 1));
  if (timeline.some((item) => item.isTextPassage)) {
    const currentIndex = timeline[boundedIndex]?.isPause
      ? getPreviousSpokenIndex(timeline, boundedIndex) ?? getNextSpokenIndex(timeline, boundedIndex) ?? boundedIndex
      : boundedIndex;
    const nextIndex = getNextSpokenIndex(timeline, currentIndex);
    const followingIndex = nextIndex == null ? null : getNextSpokenIndex(timeline, nextIndex);
    return {
      before: currentIndex,
      current: nextIndex,
      after: followingIndex,
    };
  }

  if (timeline.some((item) => item.isSentence)) {
    const currentIndex = timeline[boundedIndex]?.isPause
      ? getPreviousSpokenIndex(timeline, boundedIndex) ?? getNextSpokenIndex(timeline, boundedIndex) ?? boundedIndex
      : boundedIndex;
    return {
      before: getPreviousSpokenIndex(timeline, currentIndex),
      current: currentIndex,
      after: getNextSpokenIndex(timeline, currentIndex),
    };
  }

  const activeWordIndex = timeline[boundedIndex]?.isPause
    ? getPreviousSpokenIndex(timeline, boundedIndex) ?? getNextSpokenIndex(timeline, boundedIndex) ?? boundedIndex
    : boundedIndex;

  return {
    before: getPreviousSpokenIndex(timeline, activeWordIndex),
    current: activeWordIndex,
    after: getNextSpokenIndex(timeline, activeWordIndex),
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
  const isStereo = options.stereo === true;
  const centerY = padding + graphHeight / 2;
  const channelGap = 3 * pixelRatio;
  const channelHeight = Math.max(1, (graphHeight - channelGap) / 2);
  const numericValues = values.map((value) => Math.max(0, Number(value) || 0));
  const progress = Number.isFinite(options.progress) ? Math.max(0, Math.min(1, options.progress)) : null;
  const currentLevel = Math.max(0, Math.min(100, Number(options.currentLevel) || 0));

  context.clearRect(0, 0, width, height);
  context.fillStyle = "#101820";
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.12)";
  context.lineWidth = 1 * pixelRatio;
  (isStereo ? [0.5] : [0.25, 0.5, 0.75]).forEach((ratio) => {
    const y = padding + graphHeight * ratio;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(graphWidth, y);
    context.stroke();
  });

  if (!numericValues.length) {
    if (isStereo) drawStereoLevelMeter(context, width - meterWidth, 0, meterWidth, height, currentLevel, currentLevel);
    else drawLevelMeter(context, width - meterWidth, 0, meterWidth, height, currentLevel);
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
    const fillHeight = Math.max(level > 0 ? 3 * pixelRatio : 0, (level / 100) * (isStereo ? channelHeight : graphHeight));

    context.fillStyle = getVolumeHubColor(level);
    if (isStereo) {
      const topY = centerY - channelGap / 2 - fillHeight;
      const bottomY = centerY + channelGap / 2;
      roundRect(context, x, topY, barWidth, fillHeight, Math.min(5 * pixelRatio, barWidth / 2));
      context.fill();
      roundRect(context, x, bottomY, barWidth, fillHeight, Math.min(5 * pixelRatio, barWidth / 2));
      context.fill();
    } else {
      const y = padding + graphHeight - fillHeight;
      roundRect(context, x, y, barWidth, fillHeight, Math.min(5 * pixelRatio, barWidth / 2));
      context.fill();
    }
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
  if (isStereo) drawStereoLevelMeter(context, width - meterWidth, 0, meterWidth, height, currentLevel, currentLevel);
  else drawLevelMeter(context, width - meterWidth, 0, meterWidth, height, currentLevel);
}

function drawStereoLevelMeter(context, x, y, width, height, leftLevel, rightLevel) {
  const gap = Math.max(3, width * 0.18);
  const channelWidth = Math.max(2, (width - gap) / 2);
  drawLevelMeter(context, x, y, channelWidth, height, leftLevel);
  drawLevelMeter(context, x + channelWidth + gap, y, channelWidth, height, rightLevel);
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
  if (resultCourseContext) {
    const hasCourseContext = Boolean(metadata.courseName || metadata.coursePlanTitle);
    resultCourseContext.classList.toggle("is-hidden", !hasCourseContext);
    resultCourseContext.innerHTML = hasCourseContext
      ? `<span>Kurs</span><strong>${metadata.courseName || "Kurs"}</strong><small>${metadata.coursePlanTitle || "Tagesplan"}</small>`
      : "";
  }
  durationBadge.textContent = formatTime(metadata.dauerSekunden);
  updateResultStats(metadata);
  updateCourseResultActions(metadata);
  setupPlaybackKaraoke(metadata);
  setPlayPauseButtonState("play");
  playbackSeek.value = "0";
  playbackTimeLabel.textContent = `00:00 / ${formatTime(metadata.dauerSekunden || 0)}`;

  drawWaveform(
    playbackWaveform,
    getBestPlaybackAmplitudeSeries(metadata),
    getPlaybackWaveformDisplayOptions(metadata, 0),
  );
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
    metadata.uebungKonfiguration?.typ === "long_text"
      ? (Array.isArray(metadata.uebungKonfiguration.textAbschnitte) &&
          metadata.uebungKonfiguration.textAbschnitte.length
          ? metadata.uebungKonfiguration.textAbschnitte
          : splitTextPassages(metadata.uebungKonfiguration.inhalt || script))
      : [];

  const playbackSentenceSeconds = sentences.length
    ? Math.max(1.4, (Number(metadata.dauerSekunden) || sentences.length * 3) / sentences.length)
    : SENTENCE_MAX_SECONDS;
  const dialogEventTimeline =
    dialogTurns.length && Array.isArray(metadata.karaokeEreignisse) && metadata.karaokeEreignisse.length
      ? buildPlaybackDialogTimelineFromEvents(
          metadata.karaokeEreignisse,
          dialogTurns,
          Number(metadata.dauerSekunden) || 0,
        )
      : [];
  playbackKaraokeTimeline = dialogEventTimeline.length
    ? dialogEventTimeline
    : dialogTurns.length
    ? buildPlaybackDialogTimeline(
        dialogTurns,
        Number(metadata.dauerSekunden) || 0,
        getPlaybackKaraokeTiming(metadata),
      )
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
  if (isCourseMediaLocked()) {
    showCourseMediaLockMessage();
    return;
  }
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
  const playbackValues = getBestPlaybackAmplitudeSeries(currentMetadata);
  const measuredDuration = currentMetadata.dauerSekunden || 0;
  const mediaDuration = Number.isFinite(recordingPlayer.duration) ? recordingPlayer.duration : 0;
  const duration = measuredDuration || mediaDuration || 0;
  const progress =
    forcedProgress ?? mediaTimeToAnalysisProgress(recordingPlayer.currentTime || 0, currentMetadata);
  const syncedCurrentTime = duration ? progress * duration : 0;

  drawWaveform(
    playbackWaveform,
    playbackValues,
    getPlaybackWaveformDisplayOptions(currentMetadata, progress, duration),
  );

  playbackSeek.value = String(Math.round(progress * 1000));
  playbackTimeLabel.textContent = `${formatTime(syncedCurrentTime || 0)} / ${formatTime(duration || 0)}`;
  updateKaraokeDisplayAtTime(playbackKaraokeOverlay, playbackKaraokeTimeline, syncedCurrentTime || 0);
  renderPlaybackVideoCanvas();
  syncStatisticsToPlayback(progress);
}

function shouldUsePlaybackCanvasCorrection() {
  if (!isIosMediaDevice()) return false;
  if (recordingPlayer.readyState < 1) return false;

  const videoWidth = Number(recordingPlayer.videoWidth || 0);
  const videoHeight = Number(recordingPlayer.videoHeight || 0);
  if (!videoWidth || !videoHeight) return false;

  const pipelineVersion = Number(currentMetadata?.capturePipelineVersion || 0);
  const metadataRotation = Number(currentMetadata?.captureRotationGrad || 0);

  // Pipeline 2 rotated iPhone frames from their reported dimensions although
  // Safari had already oriented the pixels. Correct those saved recordings at
  // playback. Pipeline 3 stores the displayed frame without that extra turn.
  if (pipelineVersion >= 3) return false;
  if (pipelineVersion === 2) {
    const originalSourceWidth = Number(currentMetadata?.quellVideoBreite || 0);
    const originalSourceHeight = Number(currentMetadata?.quellVideoHoehe || 0);
    return videoWidth < videoHeight && originalSourceWidth > originalSourceHeight;
  }

  return videoWidth > videoHeight && Math.abs(metadataRotation) === 90;
}

function renderPlaybackVideoCanvas() {
  if (!playbackVideoCanvas || !playbackVideoCanvasContext) return;

  const stageElement = recordingPlayer.closest(".playback-stage");
  const shouldCorrect = shouldUsePlaybackCanvasCorrection();
  stageElement?.classList.toggle("is-canvas-corrected", shouldCorrect);
  playbackVideoCanvas.classList.toggle("is-hidden", !shouldCorrect);

  if (!shouldCorrect) return;
  if (!recordingPlayer.videoWidth || !recordingPlayer.videoHeight || recordingPlayer.readyState < 2) return;

  const rect = stageElement?.getBoundingClientRect?.();
  const cssWidth = Math.max(1, Math.round(rect?.width || playbackVideoCanvas.clientWidth || 1));
  const cssHeight = Math.max(1, Math.round(rect?.height || playbackVideoCanvas.clientHeight || 1));
  const pixelRatio = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  const canvasWidth = Math.round(cssWidth * pixelRatio);
  const canvasHeight = Math.round(cssHeight * pixelRatio);

  if (playbackVideoCanvas.width !== canvasWidth || playbackVideoCanvas.height !== canvasHeight) {
    playbackVideoCanvas.width = canvasWidth;
    playbackVideoCanvas.height = canvasHeight;
  }

  const context = playbackVideoCanvasContext;
  context.save();
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.fillStyle = "#101820";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.translate(canvasWidth / 2, canvasHeight / 2);
  context.rotate(-Math.PI / 2);

  const sourceWidth = recordingPlayer.videoWidth;
  const sourceHeight = recordingPlayer.videoHeight;
  const originalSourceWidth = Number(currentMetadata?.quellVideoBreite || 0);
  const originalSourceHeight = Number(currentMetadata?.quellVideoHoehe || 0);
  const usesLegacyStretchedCapture =
    Number(currentMetadata?.capturePipelineVersion || 0) < 2 &&
    originalSourceWidth > originalSourceHeight;
  const legacyAspectCorrection = usesLegacyStretchedCapture
    ? originalSourceWidth / originalSourceHeight
    : 1;
  const effectiveWidth = sourceHeight * legacyAspectCorrection;
  const effectiveHeight = sourceWidth;
  // Fill the portrait stage while preserving the source proportions. The
  // rotated iPhone track otherwise remains as a small landscape strip.
  const scale = Math.max(canvasWidth / effectiveWidth, canvasHeight / effectiveHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale * legacyAspectCorrection;

  context.drawImage(
    recordingPlayer,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight,
  );
  context.restore();
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
  renderPlaybackVideoCanvas();
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
  return Math.max(0, Math.min(mediaDuration, safeProgress * analysisDuration));
}

function mediaTimeToAnalysisProgress(mediaTime, metadata = currentMetadata) {
  const { analysisDuration, mediaDuration } = getPlaybackDurations(metadata);
  const safeMediaTime = Math.max(0, Number(mediaTime) || 0);
  if (!analysisDuration && !mediaDuration) return 0;
  if (analysisDuration) return Math.max(0, Math.min(1, safeMediaTime / analysisDuration));
  return Math.max(0, Math.min(1, safeMediaTime / mediaDuration));
}

function applyVideoAspectRatio(videoElement) {
  if (!videoElement.videoWidth || !videoElement.videoHeight) return;

  const stageElement = videoElement.closest(".playback-stage");
  const useCanvasCorrection = videoElement === recordingPlayer && shouldUsePlaybackCanvasCorrection();
  const metadataRotation = videoElement === recordingPlayer
    ? Number(currentMetadata?.captureRotationGrad || 0)
    : 0;
  const isLandscapeVideo = videoElement.videoWidth > videoElement.videoHeight;
  const shouldCorrectPortraitPlayback =
    videoElement === recordingPlayer &&
    !useCanvasCorrection &&
    window.matchMedia("(orientation: portrait)").matches &&
    isLandscapeVideo &&
    (
      metadataRotation === -90 ||
      metadataRotation === 90
    );
  const playbackRotationDegrees =
    metadataRotation === 90
      ? -90
      : (metadataRotation === -90 ? 90 : -90);

  if (stageElement) {
    const isCanvasCorrected = useCanvasCorrection;
    stageElement.classList.toggle("is-portrait-corrected", shouldCorrectPortraitPlayback);
    stageElement.classList.toggle("is-portrait-corrected-cw", shouldCorrectPortraitPlayback && playbackRotationDegrees === 90);
    stageElement.classList.toggle("is-portrait-corrected-ccw", shouldCorrectPortraitPlayback && playbackRotationDegrees !== 90);
    stageElement.style.aspectRatio = isCanvasCorrected
      ? "9 / 16"
      : shouldCorrectPortraitPlayback
      ? `${videoElement.videoHeight} / ${videoElement.videoWidth}`
      : `${videoElement.videoWidth} / ${videoElement.videoHeight}`;
  }

  videoElement.style.objectPosition = "center center";
  videoElement.style.aspectRatio = shouldCorrectPortraitPlayback
    ? `${videoElement.videoHeight} / ${videoElement.videoWidth}`
    : `${videoElement.videoWidth} / ${videoElement.videoHeight}`;
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
  metadata.werte = metadata.werte || getVoiceAnalysisValues(metadata);
  metadata.bewertung = calculateVoiceEvaluation(metadata, allRecordings);
  if (averageVolume) averageVolume.textContent = String(stats.average);
  if (maxVolume) maxVolume.textContent = String(stats.maximum);
  if (sampleCount) sampleCount.textContent = String((metadata.amplituden || []).length);
  resultEvaluationPanel?.classList.add("is-hidden");
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

function getVoiceRequestSettingsForVoice(voice, settings = getElevenLabsSettings()) {
  return {
    voiceId: String(voice?.voiceId || settings.voiceId || "").trim() || getDefaultElevenLabsSettings().voiceId,
    voiceSettings: {
      stability: clampPercent(settings.stability) / 100,
      similarity_boost: clampPercent(settings.similarity) / 100,
      style: clampPercent(settings.style) / 100,
      use_speaker_boost: Boolean(settings.speakerBoost),
    },
  };
}

function getEmbeddedExerciseVoiceProfile(exercise = {}) {
  const voiceId = String(exercise?.voiceProfileVoiceId || exercise?.voiceAudioVoiceId || "").trim();
  if (!voiceId) return null;

  return {
    key:
      String(exercise?.voiceProfileKey || "").trim() ||
      createVoiceProfileKey(exercise?.voiceProfileName || "Übungsstimme", voiceId),
    name: String(exercise?.voiceProfileName || "Übungsstimme").trim() || "Übungsstimme",
    gender: String(exercise?.voiceProfileGender || "neutral").trim() || "neutral",
    voiceId,
    settings: exercise?.voiceProfileSettings || exercise?.voiceAudioVoiceSettings || null,
  };
}

function mergeExerciseVoiceIntoSettings(settings = getElevenLabsSettings(), exercise = null) {
  const embeddedVoice = getEmbeddedExerciseVoiceProfile(exercise);
  if (!embeddedVoice) return settings;

  const voices = Array.isArray(settings?.voices) ? [...settings.voices] : [];
  const alreadyPresent = voices.some(
    (voice) =>
      (embeddedVoice.key && voice.key === embeddedVoice.key) ||
      (embeddedVoice.voiceId && voice.voiceId === embeddedVoice.voiceId),
  );

  if (alreadyPresent) return settings;

  return {
    ...settings,
    voices: [...voices, embeddedVoice],
  };
}

function getEditorSelectedVoice(settings = getElevenLabsSettings()) {
  const selectedKey = editorVoiceSelect?.value || "";
  const matchedVoice = settings.voices.find((voice) => voice.key === selectedKey);
  if (matchedVoice) return matchedVoice;

  const selectedOption = editorVoiceSelect?.selectedOptions?.[0];
  const embeddedVoiceId = String(selectedOption?.dataset?.voiceId || "").trim();
  if (selectedKey || embeddedVoiceId) {
    return {
      key: selectedKey || createVoiceProfileKey(selectedOption?.dataset?.voiceName || "Übungsstimme", embeddedVoiceId),
      name: String(selectedOption?.dataset?.voiceName || "Übungsstimme").trim() || "Übungsstimme",
      gender: String(selectedOption?.dataset?.voiceGender || "neutral").trim() || "neutral",
      voiceId: embeddedVoiceId || String(settings.voiceId || "").trim() || getDefaultElevenLabsSettings().voiceId,
      settings: null,
    };
  }

  return getActiveElevenLabsVoice(settings);
}

function getEditorVoiceRequestSettings() {
  const settings = getElevenLabsSettings();
  const voice = getEditorSelectedVoice(settings);
  return getVoiceRequestSettingsForVoice(voice, settings);
}

function getExerciseSelectedVoice(exercise, settings = getElevenLabsSettings()) {
  const voiceKey = exercise?.voiceProfileKey || exercise?.voiceKey || "";
  const voiceId = exercise?.voiceProfileVoiceId || exercise?.voiceAudioVoiceId || "";
  return (
    settings.voices.find((voice) => voice.key === voiceKey) ||
    settings.voices.find((voice) => voice.voiceId === voiceId) ||
    (voiceId
      ? {
          key: voiceKey || createVoiceProfileKey(exercise?.voiceProfileName || "Übungsstimme", voiceId),
          name: exercise?.voiceProfileName || "Übungsstimme",
          gender: exercise?.voiceProfileGender || "neutral",
          voiceId,
        }
      : null) ||
    getActiveElevenLabsVoice(settings)
  );
}

function getExerciseVoiceRequestSettings(exercise) {
  const settings = getElevenLabsSettings();
  const voice = getExerciseSelectedVoice(exercise, settings);
  if (exercise?.voiceProfileSettings) {
    return {
      voiceId: String(voice?.voiceId || exercise.voiceProfileVoiceId || settings.voiceId || "").trim() || getDefaultElevenLabsSettings().voiceId,
      voiceSettings: exercise.voiceProfileSettings,
    };
  }
  return getVoiceRequestSettingsForVoice(voice, settings);
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
    hasApiKey: false,
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
  renderEditorVoiceSelect(elevenSettings, savedEditorExercise?.voiceProfileKey || "");
  renderDailyPlanVoiceSelect(elevenSettings, dailyPlanVoiceSelect?.value || elevenSettings.activeVoiceKey);
  loadSelectedVoiceProfileIntoControls(elevenSettings.activeVoiceKey, { settings: elevenSettings, silent: true });
  if (settingsVoiceStability) settingsVoiceStability.value = String(clampPercent(elevenSettings.stability));
  if (settingsVoiceSimilarity) settingsVoiceSimilarity.value = String(clampPercent(elevenSettings.similarity));
  if (settingsVoiceStyle) settingsVoiceStyle.value = String(clampPercent(elevenSettings.style));
  if (settingsSpeakerBoost) settingsSpeakerBoost.checked = Boolean(elevenSettings.speakerBoost);
  if (settingsChatGptEnabled) settingsChatGptEnabled.checked = Boolean(chatGptSettings.enabled);
  if (settingsChatGptApiKey) {
    settingsChatGptApiKey.value = chatGptSettings.apiKey || "";
    settingsChatGptApiKey.placeholder = chatGptSettings.hasApiKey || hasCloudChatGptApiKey
      ? "API-Key ist sicher in Firebase gespeichert"
      : "sk-...";
  }
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
  renderEqualizerControls();
  if (settingsState) settingsState.textContent = "Einstellungen lokal gespeichert.";
}

function getDefaultEqualizerSettings() {
  return {
    bands: {
      160: 0,
      400: 0,
      800: 0,
      3200: 0,
      6400: 0,
      12000: 0,
    },
  };
}

function getEqualizerSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(SETTINGS_EQ_KEY) || "null");
    const defaults = getDefaultEqualizerSettings();
    return {
      bands: {
        ...defaults.bands,
        ...(stored?.bands || {}),
      },
    };
  } catch (error) {
    return getDefaultEqualizerSettings();
  }
}

function hasUsableChatGptAccess(settings = getChatGptSettings()) {
  const hasKey = (
    String(settings.apiKey || "").trim().startsWith("sk-")
    || settings.hasApiKey
    || hasCloudChatGptApiKey
  );
  return Boolean(
    hasKey && (settings.enabled !== false || hasCloudChatGptApiKey),
  );
}

function readEqualizerSettingsFromControls() {
  const settings = getDefaultEqualizerSettings();
  settingsEqSliders.forEach((slider) => {
    settings.bands[slider.dataset.eqBand] = Math.max(-12, Math.min(12, Number(slider.value) || 0));
  });
  return settings;
}

function saveEqualizerSettingsFromControls(options = {}) {
  const settings = readEqualizerSettingsFromControls();
  localStorage.setItem(SETTINGS_EQ_KEY, JSON.stringify(settings));
  if (settingsState) settingsState.textContent = "Equalizer lokal gespeichert.";
  queuePatientProfileSave();
  if (options.syncCloud) {
    queueCloudEqualizerSave(settings, options.immediate);
  }
}

function queueCloudEqualizerSave(settings = getEqualizerSettings(), immediate = false) {
  window.clearTimeout(settingsEqCloudSaveTimerId);
  const runSave = () => {
    saveCloudEqualizerSettings(settings).catch(() => {
      if (settingsState) settingsState.textContent = "Equalizer lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
    });
  };

  if (immediate) {
    runSave();
    return;
  }

  settingsEqCloudSaveTimerId = window.setTimeout(runSave, 650);
}

function renderEqualizerControls(settings = getEqualizerSettings()) {
  settingsEqSliders.forEach((slider) => {
    const value = Math.max(-12, Math.min(12, Number(settings.bands?.[slider.dataset.eqBand]) || 0));
    if (document.activeElement !== slider) slider.value = String(value);
    slider.style.setProperty("--eq-value", `${((value + 12) / 24) * 100}%`);
  });

  if (settingsEqSummary) {
    const values = Object.values(settings.bands || {}).map(Number).filter(Number.isFinite);
    const activeBands = values.filter((value) => value !== 0).length;
    const maxAbs = values.length ? Math.max(...values.map((value) => Math.abs(value))) : 0;
    settingsEqSummary.textContent = activeBands
      ? `${activeBands} Band${activeBands === 1 ? "" : "s"} · max ${maxAbs} dB`
      : "0 dB";
  }
  applySettingsEqualizer(settings);
}

function resetEqualizerSettings() {
  const settings = getDefaultEqualizerSettings();
  localStorage.setItem(SETTINGS_EQ_KEY, JSON.stringify(settings));
  renderEqualizerControls(settings);
  applySettingsEqualizer(settings);
  queuePatientProfileSave({ immediate: true });
  saveCloudEqualizerSettings(settings).catch(() => {
    if (settingsState) settingsState.textContent = "Equalizer zurückgesetzt. Firebase-Speichern fehlgeschlagen.";
  });
  if (settingsState) settingsState.textContent = "Equalizer zurückgesetzt.";
}

async function saveCloudEqualizerSettings(settings = getEqualizerSettings()) {
  await setDoc(doc(firestore, "settings", SETTINGS_EQ_DOC), {
    ...settings,
    updatedAt: new Date().toISOString(),
  });
  if (settingsState) settingsState.textContent = "Equalizer in Firebase gespeichert.";
}

async function loadCloudEqualizerSettings() {
  try {
    const snapshot = await getDoc(doc(firestore, "settings", SETTINGS_EQ_DOC));
    if (!snapshot.exists()) {
      await saveCloudEqualizerSettings(getEqualizerSettings());
      return;
    }

    const cloudSettings = normalizeEqualizerSettings(snapshot.data());
    localStorage.setItem(SETTINGS_EQ_KEY, JSON.stringify(cloudSettings));
    renderEqualizerControls(cloudSettings);
    if (settingsState) settingsState.textContent = "Equalizer aus Firebase geladen.";
  } catch (error) {
    renderEqualizerControls();
    if (settingsState) settingsState.textContent = "Equalizer lokal geladen. Firebase nicht erreichbar.";
  }
}

function normalizeEqualizerSettings(settings = {}) {
  const defaults = getDefaultEqualizerSettings();
  const bands = { ...defaults.bands };
  Object.keys(bands).forEach((frequency) => {
    bands[frequency] = Math.max(-12, Math.min(12, Number(settings.bands?.[frequency]) || 0));
  });
  return { bands };
}

async function playSettingsEqualizerTestAudio() {
  if (!settingsVoicePreview) return;
  if (settingsEqTestButton) settingsEqTestButton.disabled = true;

  try {
    const hasReusableTestAudio =
      (settingsVoicePreview.currentSrc || settingsVoicePreview.src) &&
      Number.isFinite(settingsVoicePreview.duration) &&
      settingsVoicePreview.duration >= 12;
    if (!hasReusableTestAudio) {
      const created = await testElevenLabsSettingsVoice({ autoPlay: false, repeatForEq: true });
      if (!created) return;
    }

    await ensureSettingsEqualizerAudio();
    applySettingsEqualizer();
    settingsVoicePreview.currentTime = 0;
    settingsVoicePreview.volume = 1;
    await settingsVoicePreview.play();
    if (settingsEqStopButton) settingsEqStopButton.disabled = false;
    startSettingsEqVisuals();
    if (settingsState) settingsState.textContent = "EQ-Test läuft. Regler ändern den Klang live.";
  } catch (error) {
    if (settingsState) settingsState.textContent = error?.message || "EQ-Testaudio konnte nicht gestartet werden.";
  } finally {
    if (settingsEqTestButton) settingsEqTestButton.disabled = false;
  }
}

function stopSettingsEqualizerTestAudio() {
  if (!settingsVoicePreview) return;
  settingsVoicePreview.pause();
  settingsVoicePreview.currentTime = 0;
  stopSettingsEqVisuals();
  if (settingsEqStopButton) settingsEqStopButton.disabled = true;
  updateCalibrationTestAudioButton();
  if (settingsState) settingsState.textContent = "EQ-Testaudio gestoppt.";
}

function updateCalibrationTestAudioButton() {
  const audioIsPlaying = Boolean(settingsVoicePreview && !settingsVoicePreview.paused && !settingsVoicePreview.ended);
  const silenceMeasurementRunning = Boolean(isCalibrating && calibrationNoiseState && !calibrationNoiseState.completed);
  [calibrationTestAudioButton, settingsCalibrationTestAudioButton].forEach((button) => {
    if (!button) return;
    button.disabled = !isCalibrating || silenceMeasurementRunning;
    button.textContent = audioIsPlaying ? "Testaudio stoppen" : "Testaudio";
  });
}

async function ensureSettingsEqualizerAudio() {
  if (!settingsVoicePreview) return false;
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return false;

  if (!settingsEqAudioContext || settingsEqAudioContext.state === "closed") {
    settingsEqAudioContext = new AudioContextConstructor();
  }

  if (!settingsEqAudioSource) {
    settingsEqAudioSource = settingsEqAudioContext.createMediaElementSource(settingsVoicePreview);
    settingsEqGain = settingsEqAudioContext.createGain();
    settingsEqAnalyser = settingsEqAudioContext.createAnalyser();
    settingsEqAnalyser.fftSize = 2048;
    settingsEqAnalyser.smoothingTimeConstant = 0.74;
    settingsEqFilters = Object.keys(getDefaultEqualizerSettings().bands).map((frequency) => {
      const filter = settingsEqAudioContext.createBiquadFilter();
      filter.type = "peaking";
      filter.frequency.value = Number(frequency);
      filter.Q.value = 1;
      filter.gain.value = 0;
      return filter;
    });

    let previousNode = settingsEqAudioSource;
    settingsEqFilters.forEach((filter) => {
      previousNode.connect(filter);
      previousNode = filter;
    });
    previousNode.connect(settingsEqGain);
    settingsEqGain.connect(settingsEqAnalyser);
    settingsEqAnalyser.connect(settingsEqAudioContext.destination);
  }

  if (settingsEqAudioContext.state === "suspended") {
    await settingsEqAudioContext.resume();
  }

  return true;
}

function applySettingsEqualizer(settings = getEqualizerSettings()) {
  if (!settingsEqFilters.length || !settingsEqAudioContext) return;

  const bands = settings.bands || {};
  const frequencies = Object.keys(getDefaultEqualizerSettings().bands);
  const now = settingsEqAudioContext.currentTime;
  settingsEqFilters.forEach((filter, index) => {
    const gain = Math.max(-12, Math.min(12, Number(bands[frequencies[index]]) || 0));
    filter.gain.cancelScheduledValues(now);
    filter.gain.setTargetAtTime(gain, now, 0.015);
  });
}

function applySettingsEqPlaybackGain(value = null) {
  if (!settingsEqGain) return;
  const gainValue = Math.max(1, Math.min(4, value ?? ((Number(playbackVolumeSlider.value) || 200) / 100)));
  settingsEqGain.gain.value = gainValue;
}

function startSettingsEqVisuals() {
  stopSettingsEqVisuals();
  settingsEqAmplitudes = [];
  settingsEqPitches = [];
  settingsEqStrengths = [];

  const tick = () => {
    updateSettingsEqVisuals();
    if (settingsVoicePreview && !settingsVoicePreview.paused && !settingsVoicePreview.ended) {
      settingsEqAnimationFrame = window.requestAnimationFrame(tick);
    }
  };

  settingsEqAnimationFrame = window.requestAnimationFrame(tick);
}

function stopSettingsEqVisuals() {
  window.cancelAnimationFrame(settingsEqAnimationFrame);
  settingsEqAnimationFrame = null;
}

function updateSettingsEqVisuals() {
  if (!settingsEqAnalyser) return;

  const timeSamples = new Uint8Array(settingsEqAnalyser.fftSize);
  const frequencySamples = new Uint8Array(settingsEqAnalyser.frequencyBinCount);
  settingsEqAnalyser.getByteTimeDomainData(timeSamples);
  settingsEqAnalyser.getByteFrequencyData(frequencySamples);

  let sumSquares = 0;
  let peak = 0;
  timeSamples.forEach((sample) => {
    const centered = (sample - 128) / 128;
    sumSquares += centered * centered;
    peak = Math.max(peak, Math.abs(centered));
  });

  const rms = Math.sqrt(sumSquares / Math.max(1, timeSamples.length));
  const level = Math.max(0, Math.min(100, Math.round(Math.max(rms * 260, peak * 72))));
  const binHz = (settingsEqAudioContext?.sampleRate || 44100) / settingsEqAnalyser.fftSize;
  const pitchHz = estimateVoicePitchHz(frequencySamples, binHz, level);

  settingsEqAmplitudes.push(level);
  settingsEqPitches.push(pitchHz || 0);
  settingsEqStrengths.push(level);
  if (settingsEqAmplitudes.length > MAX_VISIBLE_SAMPLES) settingsEqAmplitudes.shift();
  if (settingsEqPitches.length > MAX_VISIBLE_SAMPLES) settingsEqPitches.shift();
  if (settingsEqStrengths.length > MAX_VISIBLE_SAMPLES) settingsEqStrengths.shift();

  if (settingsEqAmplitudeValue) settingsEqAmplitudeValue.textContent = String(level);
  if (settingsEqFrequencyValue) settingsEqFrequencyValue.textContent = pitchHz ? `${pitchHz} Hz` : "0 Hz";
  if (settingsEqAmplitudeCanvas) {
    drawWaveform(settingsEqAmplitudeCanvas, settingsEqAmplitudes, {
      mode: "live",
      levelMeter: true,
      stereoLevelMeter: true,
      currentLevel: level,
      currentLeftLevel: level,
      currentRightLevel: level,
      minSpeechBarHeight: 4,
      minPauseBarHeight: 2,
      barGap: 2,
      minBarWidth: 2,
    });
  }
  if (settingsEqFrequencyCanvas) {
    drawFrequencyTimeline(settingsEqFrequencyCanvas, settingsEqPitches, settingsEqStrengths, { limit: true });
  }
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

function renderEditorVoiceSelect(settings = getElevenLabsSettings(), preferredKey = editorVoiceSelect?.value || "") {
  if (!editorVoiceSelect) return;

  const activeKey = preferredKey && settings.voices.some((voice) => voice.key === preferredKey)
    ? preferredKey
    : settings.activeVoiceKey || settings.voices[0]?.key || "";
  editorVoiceSelect.innerHTML = "";
  settings.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.key;
    option.dataset.voiceId = voice.voiceId;
    option.textContent = formatVoiceProfileOptionLabel(voice);
    editorVoiceSelect.append(option);
  });
  editorVoiceSelect.value = activeKey;
  updateEditorVoiceSelectHint();
}

function renderDailyPlanVoiceSelect(
  settings = getElevenLabsSettings(),
  preferredKey = dailyPlanVoiceSelect?.value || "",
) {
  if (!dailyPlanVoiceSelect) return;
  const activeKey = preferredKey && settings.voices.some((voice) => voice.key === preferredKey)
    ? preferredKey
    : settings.activeVoiceKey || settings.voices[0]?.key || "";
  dailyPlanVoiceSelect.innerHTML = "";
  settings.voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.key;
    option.dataset.voiceId = voice.voiceId;
    option.textContent = formatVoiceProfileOptionLabel(voice);
    dailyPlanVoiceSelect.append(option);
  });
  dailyPlanVoiceSelect.value = activeKey;
  updateDailyPlanVoiceHint();
}

function getDailyPlanSelectedVoice(settings = getElevenLabsSettings()) {
  const selectedKey = dailyPlanVoiceSelect?.value || "";
  return settings.voices.find((voice) => voice.key === selectedKey) || getActiveElevenLabsVoice(settings);
}

function getDailyPlanVoice(plan = null, settings = getElevenLabsSettings()) {
  const voiceKey = String(plan?.introVoiceProfileKey || "").trim();
  const voiceId = String(plan?.introVoiceId || plan?.introAudioVoiceId || "").trim();
  return settings.voices.find((voice) => voice.key === voiceKey)
    || settings.voices.find((voice) => voice.voiceId === voiceId)
    || (voiceId ? {
      key: voiceKey || createVoiceProfileKey(plan?.introVoiceProfileName || "Einleitungsstimme", voiceId),
      name: plan?.introVoiceProfileName || "Einleitungsstimme",
      gender: plan?.introVoiceProfileGender || "neutral",
      voiceId,
    } : null)
    || getActiveElevenLabsVoice(settings);
}

function getDailyPlanVoiceRequestSettings(plan = null) {
  const settings = getElevenLabsSettings();
  const voice = plan ? getDailyPlanVoice(plan, settings) : getDailyPlanSelectedVoice(settings);
  const requestSettings = getVoiceRequestSettingsForVoice(voice, settings);
  if (plan?.introVoiceSettings && requestSettings.voiceId === (plan.introVoiceId || plan.introAudioVoiceId)) {
    requestSettings.voiceSettings = plan.introVoiceSettings;
  }
  return requestSettings;
}

function updateDailyPlanVoiceHint() {
  if (!dailyPlanVoiceHint) return;
  const voice = getDailyPlanSelectedVoice();
  dailyPlanVoiceHint.textContent = voice
    ? `Die Beschreibung wird vor der ersten Übung einmal mit ${voice.name} vorgelesen.`
    : "Die Beschreibung wird vor der ersten Übung einmal vorgelesen.";
}

function updateEditorVoiceSelectHint() {
  if (!editorVoiceSelectHint) return;
  const voice = getEditorSelectedVoice();
  const shortId = String(voice?.voiceId || "").slice(-6) || "keine ID";
  editorVoiceSelectHint.textContent = voice
    ? `Gespeichert für diese Übung: ${voice.name} (${getVoiceGenderLabel(voice.gender)}, ${shortId}).`
    : "Diese Stimme wird für Voice-Begleitung, Vorführung und Dialog-Audio gespeichert.";
}

function handleEditorVoiceSelectionChange() {
  const voice = getEditorSelectedVoice();
  updateEditorVoiceSelectHint();
  if (editorMode?.value === "dialog") {
    const turns = getEditorDialogTurns();
    if (turns.length) {
      editorContent.value = serializeDialogTurns(turns, getEditorVoiceLabel());
      renderEditorPreview(buildEditorExerciseFromForm());
      renderEditorDialogList();
      if (exerciseName.value === "custom-editor") setupKaraokeText();
    }
  }
  if (!voice) return;
  if (editorVoiceAudioVoiceId && editorVoiceAudioVoiceId !== voice.voiceId) {
    editorVoiceState.textContent = "Andere Übungsstimme gewählt. Audio bitte neu erstellen.";
  }
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
  if (!options.skipPatientSave) {
    queuePatientProfileSave();
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
  saveCloudElevenLabsSettings(nextSettings, { replace: true }).catch(() => {
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
  const settingsToSave = options.replace
    ? normalizedSettings
    : mergeElevenLabsSettings(await loadExistingCloudElevenLabsSettings().catch(() => null), normalizedSettings);
  const response = await fetch(getApiUrl("/api/settings"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ settings: settingsToSave }),
  });

  if (!response.ok) {
    await setDoc(doc(firestore, "settings", ELEVENLABS_SETTINGS_DOC), {
      ...settingsToSave,
      updatedAt: new Date().toISOString(),
    });
  }
  localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(settingsToSave));
  renderVoiceProfileSelect(settingsToSave);
  renderEditorVoiceSelect(settingsToSave, editorVoiceSelect?.value || settingsToSave.activeVoiceKey);
  renderDailyPlanVoiceSelect(settingsToSave, dailyPlanVoiceSelect?.value || settingsToSave.activeVoiceKey);

  if (!options.silent && settingsState) settingsState.textContent = "ElevenLabs-Stimmen in Firebase gespeichert.";
}

async function loadCloudElevenLabsSettings() {
  try {
    const cloudSettings = await loadExistingCloudElevenLabsSettings();

    if (!cloudSettings) {
      const localSettings = getElevenLabsSettings();
      if ((localSettings.voices || []).length > 1) {
        await saveCloudElevenLabsSettings(localSettings, { replace: true });
      }
      return;
    }

    const localSettings = getElevenLabsSettings();
    const mergedSettings = mergeElevenLabsSettings(localSettings, cloudSettings);
    localStorage.setItem(ELEVENLABS_SETTINGS_KEY, JSON.stringify(mergedSettings));
    renderVoiceProfileSelect(mergedSettings);
    renderEditorVoiceSelect(mergedSettings, savedEditorExercise?.voiceProfileKey || mergedSettings.activeVoiceKey);
    renderDailyPlanVoiceSelect(mergedSettings, dailyPlanVoiceSelect?.value || mergedSettings.activeVoiceKey);
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

async function loadExistingCloudElevenLabsSettings() {
  const response = await fetch(getApiUrl("/api/settings"), { cache: "no-store" }).catch(() => null);
  if (response?.ok) {
    const payload = await response.json();
    if (payload.settings) return normalizeElevenLabsSettings(payload.settings);
  }

  const snapshot = await getDoc(doc(firestore, "settings", ELEVENLABS_SETTINGS_DOC));
  return snapshot.exists() ? normalizeElevenLabsSettings(snapshot.data()) : null;
}

function mergeElevenLabsSettings(localSettings, cloudSettings) {
  const normalizedLocal = normalizeElevenLabsSettings(localSettings || {});
  const normalizedCloud = cloudSettings ? normalizeElevenLabsSettings(cloudSettings) : null;
  const voicesByKey = new Map();
  const keyByVoiceId = new Map();

  [...(normalizedLocal.voices || []), ...(normalizedCloud?.voices || [])].forEach((voice) => {
    if (!voice?.voiceId) return;
    const key = voice.key || createVoiceProfileKey(voice.name, voice.voiceId);
    const existingKeyForId = keyByVoiceId.get(voice.voiceId);
    if (existingKeyForId && existingKeyForId !== key) {
      voicesByKey.delete(existingKeyForId);
    }
    voicesByKey.set(key, { ...voice, key });
    keyByVoiceId.set(voice.voiceId, key);
  });

  return normalizeElevenLabsSettings({
    ...normalizedLocal,
    ...(normalizedCloud || {}),
    voices: [...voicesByKey.values()],
    activeVoiceKey: normalizedCloud?.activeVoiceKey || normalizedLocal.activeVoiceKey,
  });
}

function saveChatGptSettings() {
  const settings = {
    enabled: Boolean(settingsChatGptEnabled?.checked),
    apiKey: settingsChatGptApiKey?.value.trim() || "",
    hasApiKey: Boolean((settingsChatGptApiKey?.value || "").trim()) || hasCloudChatGptApiKey,
    model: settingsChatGptModel?.value.trim() || getDefaultChatGptSettings().model,
    systemPrompt: settingsChatGptPrompt?.value.trim() || getDefaultChatGptSettings().systemPrompt,
  };
  localStorage.setItem(CHATGPT_SETTINGS_KEY, JSON.stringify(settings));
  saveCloudChatGptSettings(settings).catch(() => {
    if (settingsState) settingsState.textContent = "ChatGPT lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
  });
}

async function saveCloudChatGptSettings(settings = getChatGptSettings()) {
  const normalizedSettings = {
    ...getDefaultChatGptSettings(),
    ...(settings || {}),
  };
  const payload = {
    enabled: Boolean(normalizedSettings.enabled),
    model: normalizedSettings.model,
    systemPrompt: normalizedSettings.systemPrompt,
  };
  if (String(normalizedSettings.apiKey || "").trim()) {
    payload.apiKey = String(normalizedSettings.apiKey || "").trim();
  }
  const response = await fetch(getApiUrl("/api/settings"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatGptSettings: payload }),
  });

  if (!response.ok) {
    await setDoc(doc(firestore, "settings", CHATGPT_SETTINGS_DOC), {
      ...payload,
      updatedAt: new Date().toISOString(),
    });
  }

  hasCloudChatGptApiKey = hasCloudChatGptApiKey || Boolean(payload.apiKey);
  normalizedSettings.hasApiKey = hasCloudChatGptApiKey;
  localStorage.setItem(CHATGPT_SETTINGS_KEY, JSON.stringify(normalizedSettings));
  if (settingsState) settingsState.textContent = "ChatGPT in Firebase gespeichert.";
}

async function loadCloudChatGptSettings() {
  try {
    const cloudSettings = await loadExistingCloudChatGptSettings();
    if (!cloudSettings) return;

    const localSettings = getChatGptSettings();
    hasCloudChatGptApiKey = Boolean(cloudSettings?.hasApiKey);
    const mergedSettings = {
      ...getDefaultChatGptSettings(),
      ...localSettings,
      ...cloudSettings,
    };
    mergedSettings.hasApiKey = hasCloudChatGptApiKey;
    localStorage.setItem(CHATGPT_SETTINGS_KEY, JSON.stringify(mergedSettings));
    if (settingsChatGptEnabled) settingsChatGptEnabled.checked = Boolean(mergedSettings.enabled);
    if (settingsChatGptApiKey) {
      settingsChatGptApiKey.value = localSettings.apiKey || "";
      settingsChatGptApiKey.placeholder = hasCloudChatGptApiKey
        ? "API-Key ist sicher in Firebase gespeichert"
        : "sk-...";
    }
    if (settingsChatGptModel) settingsChatGptModel.value = mergedSettings.model || getDefaultChatGptSettings().model;
    if (settingsChatGptPrompt) settingsChatGptPrompt.value = mergedSettings.systemPrompt || getDefaultChatGptSettings().systemPrompt;
    if (settingsState) settingsState.textContent = "ChatGPT aus Firebase geladen.";
  } catch (error) {
    if (settingsState) settingsState.textContent = "ChatGPT lokal geladen. Firebase nicht erreichbar.";
  }
}

async function loadExistingCloudChatGptSettings() {
  const response = await fetch(getApiUrl("/api/settings"), { cache: "no-store" }).catch(() => null);
  if (response?.ok) {
    const payload = await response.json();
    if (payload.chatGptSettings) {
      return {
        ...getDefaultChatGptSettings(),
        ...payload.chatGptSettings,
      };
    }
  }

  const snapshot = await getDoc(doc(firestore, "settings", CHATGPT_SETTINGS_DOC));
  return snapshot.exists()
    ? {
        ...getDefaultChatGptSettings(),
        ...snapshot.data(),
      }
    : null;
}

function saveAllAiSettings() {
  saveElevenLabsSettings();
  saveChatGptSettings();
}

async function testElevenLabsSettingsVoice(options = {}) {
  const baseText =
    settingsVoiceDemoText?.value.trim() ||
    getDefaultSettingsDemoText();
  const text = options.repeatForEq ? buildRepeatedDemoText(baseText) : baseText;

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
      await ensureSettingsEqualizerAudio();
      applySettingsEqualizer();
      if (options.autoPlay !== false) {
        await settingsVoicePreview.play().catch(() => {});
      }
    }
    if (settingsState) {
      settingsState.textContent = `Demo-Stimme erstellt: ${settingsVoiceName?.value.trim() || "Stimme"}.`;
    }
  } catch (error) {
    if (settingsState) settingsState.textContent = error?.message || "Demo-Stimme konnte nicht erstellt werden.";
    return false;
  } finally {
    if (settingsTestVoiceButton) settingsTestVoiceButton.disabled = false;
  }
  return true;
}

function getDefaultSettingsDemoText() {
  return [
    "Das ist ein Test der LogoSound Stimme.",
    "Bitte hören Sie auf Klarheit, Wärme und Verständlichkeit.",
    "Während das Testaudio läuft, können Sie Equalizer und Wiedergabe-Verstärkung verändern.",
    "So prüfen Sie direkt, ob die Stimme im Übungsraum natürlich und deutlich klingt.",
  ].join(" ");
}

function buildRepeatedDemoText(text, minimumWords = 78) {
  const cleanText = String(text || getDefaultSettingsDemoText()).trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  if (words.length >= minimumWords) return cleanText;

  const parts = [];
  while (parts.join(" ").split(/\s+/).filter(Boolean).length < minimumWords) {
    parts.push(cleanText);
  }
  return parts.join(" ");
}

function updateSensitivitySetting(value, options = {}) {
  const nextValue = clampSensitivity(value);
  sensitivitySlider.value = String(nextValue);
  if (settingsSensitivity) settingsSensitivity.value = String(nextValue);
  sensitivityValue.textContent = formatSensitivityLabel(nextValue);
  if (settingsSensitivityValue) settingsSensitivityValue.textContent = formatSensitivityLabel(nextValue);
  localStorage.setItem(SENSITIVITY_KEY, String(nextValue));
  rescaleCurrentAmplitudes();
  if (!options.skipPatientSave) queuePatientProfileSave();
}

function updatePlaybackVolumeSetting(value, options = {}) {
  const nextValue = Math.max(100, Math.min(400, Math.round(Number(value) || 200)));
  playbackVolumeSlider.value = String(nextValue);
  if (settingsPlaybackVolume) settingsPlaybackVolume.value = String(nextValue);
  playbackVolumeValue.textContent = `${nextValue}%`;
  if (settingsPlaybackVolumeValue) settingsPlaybackVolumeValue.textContent = `${nextValue}%`;
  localStorage.setItem(PLAYBACK_GAIN_KEY, String(nextValue));
  ensurePlaybackAudioBoost();
  renderSettingsControls();
  if (!options.skipPatientSave) queuePatientProfileSave();
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

function getVoiceAnalysisValues(metadata) {
  const analysis = metadata.audioAnalyse || buildAudioAnalysis(metadata);
  const amplitudeUniformity = Math.round(
    analysis.amplitude?.stabilitaet ?? Math.max(0, 100 - calculateStandardDeviation(metadata.amplituden || [])),
  );

  return {
    lautstaerkeDurchschnitt: Math.round(Number(analysis.lautstaerke?.durchschnitt || metadata.durchschnittlicheLautstaerke || 0)),
    lautstaerkeMaximum: Math.round(Number(analysis.lautstaerke?.maximum || metadata.maximaleLautstaerke || 0)),
    frequenzDurchschnittHz: Math.round(Number(analysis.frequenz?.durchschnittHz || metadata.durchschnittlicheStimmfrequenzHz || 0)),
    frequenzSchwankung: Math.round(Number(analysis.frequenz?.stabilitaetHz || 0)),
    stimmenanteilProzent: Math.round(Number(analysis.frequenz?.stimmanteilProzent || 0)),
    pausenUeberEineSekunde: Math.round(Number(analysis.timing?.pausenUeberEineSekunde || 0)),
    sprechabschnitte: Math.round(Number(analysis.timing?.leseAbschnitte?.length || 0)),
    amplitudenGleichmaessigkeit: Math.max(0, Math.min(100, amplitudeUniformity)),
    gesamtdauer: Number(metadata.dauerSekunden || analysis.dauerSekunden || 0),
  };
}

function isCompleteVoiceTest(metadata) {
  if (metadata?.auswertungIgnoriert) return false;
  const values = getVoiceAnalysisValues(metadata);
  return values.gesamtdauer >= 2 && (metadata.amplituden || []).length >= 8;
}

function findVoiceBaseline(metadata, recordings = allRecordings) {
  const patientId = getMetadataPatientId(metadata);
  const patientName = metadata.patientName || getCurrentPatientName();
  const exerciseName = metadata.uebung || "";
  const candidates = [...recordings, metadata]
    .filter((recording) =>
      recording &&
      isRecordingForPatient(recording, patientId, patientName) &&
      (recording.uebung || "") === exerciseName &&
      isCompleteVoiceTest(recording)
    )
    .sort((a, b) => String(a.datum || "").localeCompare(String(b.datum || "")));

  return candidates[0] || metadata;
}

function findPreviousVoiceTest(metadata, recordings = allRecordings) {
  const patientId = getMetadataPatientId(metadata);
  const patientName = metadata.patientName || getCurrentPatientName();
  const exerciseName = metadata.uebung || "";
  const currentDate = String(metadata.datum || "");
  const candidates = recordings
    .filter((recording) =>
      recording &&
      recording.id !== metadata.id &&
      isRecordingForPatient(recording, patientId, patientName) &&
      (recording.uebung || "") === exerciseName &&
      String(recording.datum || "") < currentDate &&
      isCompleteVoiceTest(recording)
    )
    .sort((a, b) => String(b.datum || "").localeCompare(String(a.datum || "")));

  return candidates[0] || null;
}

function calculateVoiceEvaluation(metadata, recordings = allRecordings) {
  const values = getVoiceAnalysisValues(metadata);
  const baseline = findVoiceBaseline(metadata, recordings);
  const baselineValues = getVoiceAnalysisValues(baseline);
  const previous = findPreviousVoiceTest(metadata, recordings);
  const isBaselineTest = (baseline.id || metadata.id) === metadata.id;

  if (isBaselineTest) {
    const neutralScores = {
      lautstaerke: 70,
      stimmstabilitaet: 70,
      sprechfluss: 70,
      pausen: 70,
      stimmanteil: 70,
      gleichmaessigkeit: 70,
    };

    return {
      gesamt: 70,
      teilbewertungen: neutralScores,
      veraenderungBaselineProzent: 0,
      veraenderungVorherigerTestProzent: 0,
      entwicklung: "Ausgangsmessung",
      ampel: "is-warning",
      hinweise: [
        "Stärke: Ausgangsmessung gespeichert",
        "Auffällig: Weitere Tests zeigen erst den persönlichen Verlauf",
      ],
      baseline: {
        testId: metadata.id,
        datum: metadata.datum,
        istAusgangsmessung: true,
        werte: baselineValues,
      },
    };
  }
  const previousScore = previous ? calculateVoiceEvaluation(previous, recordings).gesamt : null;

  const teilbewertungen = {
    lautstaerke: Math.round((scoreStable(values.lautstaerkeDurchschnitt, baselineValues.lautstaerkeDurchschnitt, 1.45) + scoreStable(values.lautstaerkeMaximum, baselineValues.lautstaerkeMaximum, 1.25)) / 2),
    stimmstabilitaet: Math.round((scoreStable(values.frequenzDurchschnittHz, baselineValues.frequenzDurchschnittHz, 1.2) + scoreLowerIsBetter(values.frequenzSchwankung, baselineValues.frequenzSchwankung, 1.35)) / 2),
    sprechfluss: Math.round((scoreStable(values.sprechabschnitte, baselineValues.sprechabschnitte, 1.8) + scoreStable(values.gesamtdauer, baselineValues.gesamtdauer, 0.9)) / 2),
    pausen: scoreLowerIsBetter(values.pausenUeberEineSekunde, baselineValues.pausenUeberEineSekunde, 1.8),
    stimmanteil: scoreHigherIsBetter(values.stimmenanteilProzent, baselineValues.stimmenanteilProzent, 1.3),
    gleichmaessigkeit: scoreHigherIsBetter(values.amplitudenGleichmaessigkeit, baselineValues.amplitudenGleichmaessigkeit, 1.25),
  };

  const gesamt = Math.round(
    teilbewertungen.lautstaerke * 0.18 +
    teilbewertungen.stimmstabilitaet * 0.18 +
    teilbewertungen.sprechfluss * 0.17 +
    teilbewertungen.pausen * 0.15 +
    teilbewertungen.stimmanteil * 0.15 +
    teilbewertungen.gleichmaessigkeit * 0.17,
  );
  const baselineScore = 70;
  const veraenderungBaselineProzent = Math.round(((gesamt - baselineScore) / Math.max(1, baselineScore)) * 100);
  const veraenderungVorherigerTestProzent = previousScore == null ? 0 : Math.round(((gesamt - previousScore) / Math.max(1, previousScore)) * 100);
  const entwicklung =
    veraenderungBaselineProzent >= 5 ? "verbessert" :
    veraenderungBaselineProzent <= -5 ? "verschlechtert" :
    "stabil";

  return {
    gesamt,
    teilbewertungen,
    veraenderungBaselineProzent,
    veraenderungVorherigerTestProzent,
    entwicklung,
    ampel: getTrafficLightClass(gesamt),
    hinweise: buildVoiceEvaluationHints(values, baselineValues, teilbewertungen),
    baseline: {
      testId: baseline.id || metadata.id,
      datum: baseline.datum || metadata.datum,
      istAusgangsmessung: false,
      werte: baselineValues,
    },
  };
}

function scoreStable(current, baseline, tolerance = 1) {
  if (!Number.isFinite(Number(current)) || !Number.isFinite(Number(baseline)) || baseline <= 0) return 70;
  const deviation = Math.abs((current - baseline) / baseline) * 100;
  return Math.max(35, Math.min(100, Math.round(100 - deviation * tolerance)));
}

function scoreHigherIsBetter(current, baseline, tolerance = 1) {
  if (!Number.isFinite(Number(current)) || !Number.isFinite(Number(baseline)) || baseline <= 0) return 70;
  const change = ((current - baseline) / baseline) * 100;
  return Math.max(35, Math.min(100, Math.round(82 + change * tolerance)));
}

function scoreLowerIsBetter(current, baseline, tolerance = 1) {
  if (!Number.isFinite(Number(current)) || !Number.isFinite(Number(baseline))) return 70;
  const safeBaseline = Math.max(1, baseline);
  const change = ((safeBaseline - current) / safeBaseline) * 100;
  return Math.max(35, Math.min(100, Math.round(82 + change * tolerance)));
}

function getTrafficLightClass(score) {
  if (score >= 75) return "is-good";
  if (score >= 55) return "is-warning";
  return "is-alert";
}

function buildVoiceEvaluationHints(values, baselineValues, scores) {
  const strengths = [];
  const notices = [];
  if (values.amplitudenGleichmaessigkeit >= baselineValues.amplitudenGleichmaessigkeit + 4) strengths.push("gleichmäßigere Lautstärke");
  if (values.pausenUeberEineSekunde < baselineValues.pausenUeberEineSekunde) strengths.push("weniger lange Pausen");
  if (values.stimmenanteilProzent >= baselineValues.stimmenanteilProzent + 4) strengths.push("höherer Stimmenanteil");
  if (values.frequenzSchwankung > baselineValues.frequenzSchwankung + 8) notices.push("Grundfrequenz schwankt stärker");
  if (values.stimmenanteilProzent <= baselineValues.stimmenanteilProzent - 6) notices.push("Stimmenanteil ist geringer");
  if (scores.lautstaerke < 58) notices.push("Lautstärke weicht deutlich von der Ausgangsmessung ab");
  if (!strengths.length) strengths.push("Werte sind im persönlichen Verlauf stabil");
  if (!notices.length) notices.push("keine deutliche Verschlechterung erkennbar");
  return [...strengths.map((text) => `Stärke: ${text}`), ...notices.map((text) => `Auffällig: ${text}`)];
}

function splitVoiceEvaluationHints(hints = []) {
  const strengths = [];
  const notices = [];

  hints.forEach((hint) => {
    const text = String(hint || "").trim();
    if (!text) return;
    const separatorIndex = text.indexOf(":");
    const prefix = separatorIndex >= 0 ? text.slice(0, separatorIndex).toLowerCase() : "";
    const body = separatorIndex >= 0 ? text.slice(separatorIndex + 1).trim() : text;

    if (prefix.startsWith("st")) {
      strengths.push(body);
      return;
    }

    if (prefix.startsWith("auff")) {
      notices.push(body);
      return;
    }

    notices.push(body);
  });

  return { strengths, notices };
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
    audioAnalysisNote.textContent = "Öffne eine Aufnahme aus der Auswertung oder erstelle eine neue Aufnahme.";
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
    ["Lautstärke an der Analyseposition", positionAnalysis.lautstaerke],
    ["Ø Lautstärke an der Analyseposition", positionAnalysis.durchschnittlicheLautstaerke],
    ["Amplitude an der Analyseposition", positionAnalysis.amplitude],
    ["Frequenz an der Analyseposition", positionAnalysis.stimmfrequenzHz ? `${positionAnalysis.stimmfrequenzHz} Hz` : "0 Hz"],
    ["Ø Frequenz an der Analyseposition", positionAnalysis.durchschnittlicheStimmfrequenzHz ? `${positionAnalysis.durchschnittlicheStimmfrequenzHz} Hz` : "0 Hz"],
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
    term.textContent = getNormalizedAnalysisDisplayLabel(label);
    description.textContent = String(value);
    item.append(term, description);
    audioAnalysisGrid.append(item);
  });

  audioAnalysisNote.textContent = analysis.qualitaet.zuLeise
    ? "Hinweis: Die Aufnahme wirkt sehr leise. Empfindlichkeit oder Abstand zum Mikrofon prüfen."
    : "Schieberegler bewegt die Analyseposition. Die Werte werden aus einem kurzen Fenster um diese Stelle berechnet.";
}

function getNormalizedAnalysisDisplayLabel(label) {
  const text = String(label || "");
  const isAverageLabel = text.includes("\u00d8") || text.includes("Ø");
  if (text.includes("Lautst") && text.includes("dort") && isAverageLabel) {
    return "\u00d8 Lautst\u00e4rke an der Analyseposition";
  }
  if (text.includes("Lautst") && text.includes("dort")) {
    return "Lautst\u00e4rke an der Analyseposition";
  }
  if (text.includes("Amplitude") && text.includes("dort")) {
    return "Amplitude an der Analyseposition";
  }
  if (text.includes("Frequenz") && text.includes("dort") && isAverageLabel) {
    return "\u00d8 Frequenz an der Analyseposition";
  }
  if (text.includes("Frequenz") && text.includes("dort")) {
    return "Frequenz an der Analyseposition";
  }
  return text;
}

function normalizeAnalysisDisplayLabel(label) {
  const text = String(label || "");
  if (text.includes("Lautst") && text.includes("dort") && text.includes("Ø")) {
    return "Ø Lautstärke an der Analyseposition";
  }
  if (text.includes("Lautst") && text.includes("dort")) {
    return "Lautstärke an der Analyseposition";
  }
  if (text.includes("Amplitude") && text.includes("dort")) {
    return "Amplitude an der Analyseposition";
  }
  if (text.includes("Frequenz") && text.includes("dort") && text.includes("Ø")) {
    return "Ø Frequenz an der Analyseposition";
  }
  if (text.includes("Frequenz") && text.includes("dort")) {
    return "Frequenz an der Analyseposition";
  }
  return text;
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
    drawFrequencyEqualizerTimeline(statisticsFrequencyTimeline, [], [], { limit: false });
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
    stereo: true,
    rangeStart: statisticsRangeZoomed ? 0 : selectedAnalysisStart,
    rangeEnd: statisticsRangeZoomed ? 1 : selectedAnalysisEnd,
  });

  drawFrequencyEqualizerTimeline(statisticsFrequencyTimeline, displayPitch, displayFrequencyStrength, {
    limit: false,
    progress: displayProgress,
    durationSeconds: Number(metadata.dauerSekunden || 0),
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
    drawWaveform(
      playbackWaveform,
      currentMetadata.amplituden,
      getPlaybackWaveformDisplayOptions(
        currentMetadata,
        recordingPlayer.duration ? recordingPlayer.currentTime / recordingPlayer.duration : 0,
      ),
    );
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

function stripEvaluationData(metadata = {}) {
  const {
    audioAnalyse,
    werte,
    bewertung,
    ...rest
  } = metadata;

  return {
    ...rest,
    auswertungIgnoriert: true,
    auswertungZurueckgesetztAm: new Date().toISOString(),
  };
}

async function resetCloudEvaluationData(metadata) {
  const resetMetadata = stripEvaluationData(metadata);
  const tasks = [
    updateDoc(doc(firestore, "recordings", metadata.id), {
      audioAnalyse: deleteField(),
      werte: deleteField(),
      bewertung: deleteField(),
      auswertungIgnoriert: true,
      auswertungZurueckgesetztAm: resetMetadata.auswertungZurueckgesetztAm,
    }),
  ];

  if (metadata.firebaseJsonPath) {
    const jsonBlob = new Blob([JSON.stringify(cleanMetadata(resetMetadata), null, 2)], {
      type: "application/json",
    });
    tasks.push(uploadBytes(ref(storage, metadata.firebaseJsonPath), jsonBlob, {
      contentType: "application/json",
    }));
  }

  await Promise.all(tasks);
}

async function resetCurrentPatientEvaluationData() {
  const patient = getCurrentPatientName();
  const patientId = getCurrentPatientId();
  const patientRecordings = allRecordings.filter(
    (recording) => isRecordingForPatient(recording, patientId, patient),
  );

  if (!patientRecordings.length) {
    message.textContent = "Keine Aufnahmen für diese Auswertung vorhanden.";
    return;
  }

  const confirmed = window.confirm(
    `Auswertung für ${patient} zurücksetzen? Die Aufnahmen bleiben erhalten, aber gespeicherte Analyse- und Bewertungsdaten werden gelöscht.`,
  );
  if (!confirmed) return;

  resetEvaluationButton.disabled = true;
  resetEvaluationButton.textContent = "Auswertung wird zurückgesetzt";
  firebaseState.textContent = "Auswertung wird lokal und in Firebase zurückgesetzt.";

  let cloudFailed = false;
  const resetTimestamp = new Date().toISOString();
  for (const recording of patientRecordings) {
    const storedRecording = await getRecording(recording.id);
    const fullRecording = storedRecording || recording;
    const { videoBlob, audioBlob, ...storedMetadata } = fullRecording;
    const resetMetadata = stripEvaluationData({
      ...recording,
      ...storedMetadata,
    });

    await saveRecording(resetMetadata, videoBlob || audioBlob || new Blob([], { type: "video/webm" }));

    try {
      await resetCloudEvaluationData(resetMetadata);
    } catch (error) {
      cloudFailed = true;
      console.warn("Firebase-Auswertungsreset fehlgeschlagen", error);
    }
  }

  try {
    await setDoc(doc(firestore, "patientEvaluationResets", patientId), {
      patientId,
      patientName: patient,
      resetAt: resetTimestamp,
      recordingCount: patientRecordings.length,
    });
  } catch (error) {
    cloudFailed = true;
    console.warn("Firebase-Auswertungsreset-Protokoll fehlgeschlagen", error);
  }

  if (currentMetadata && isRecordingForPatient(currentMetadata, patientId, patient)) {
    currentMetadata = stripEvaluationData(currentMetadata);
  }
  selectedAnalysisRecordingId = "";
  selectedAnalysisPosition = 0;
  selectedAnalysisStart = 0;
  selectedAnalysisEnd = 1;
  statisticsRangeZoomed = false;

  await refreshRecordings();
  resetEvaluationButton.disabled = false;
  resetEvaluationButton.textContent = "Auswertung zurücksetzen";
  message.textContent = "Auswertung zurückgesetzt. Neue Aufnahmen bilden wieder eine neue Ausgangsmessung.";
  firebaseState.textContent = cloudFailed
    ? "Auswertung lokal zurückgesetzt. Firebase teilweise fehlgeschlagen."
    : "Auswertung lokal und in Firebase zurückgesetzt.";
}

async function selectPatient(name, options = {}) {
  const cleanedName = name.trim() || "Ohne Name";
  setPatientManagerState("Patient wird gespeichert...", "saving");
  patientName.value = cleanedName;
  if (patientManagerName) patientManagerName.value = cleanedName;
  localStorage.setItem(SELECTED_PATIENT_KEY, cleanedName);
  let cloudSaved = true;
  let profile = null;
  try {
    profile = await ensurePatientProfile(cleanedName);
    await setActiveCloudPatient(cleanedName, profile?.id || "");
  } catch (error) {
    cloudSaved = false;
    profile = findPatientProfileByName(cleanedName) || buildPatientProfile(cleanedName);
    upsertPatientProfile(profile);
    console.warn("Patient konnte nicht in Firebase gespeichert werden", error);
  }
  if (profile?.id) {
    localStorage.setItem(SELECTED_PATIENT_ID_KEY, profile.id);
  }
  if (
    activeCourseRun &&
    activeCourseRun.assignment?.patientId !== profile?.id &&
    normalizeEditorExerciseName(activeCourseRun.assignment?.patientName) !== normalizeEditorExerciseName(cleanedName)
  ) {
    window.clearTimeout(coursePauseTimerId);
    clearCourseAutoAdvanceTimer();
    stopCoursePauseMusic();
    clearActiveCourseRun();
    coursePlayer?.classList.add("is-hidden");
  }
  if (profile && options.applySettings !== false) {
    applyPatientProfileSettings(profile);
  }
  try {
    await refreshCourseDataForCurrentPatient();
  } catch (error) {
    console.warn("Kursdaten fuer den gewaehlten Patienten konnten nicht nachgeladen werden", error);
  }
  if (editorMode?.value === "dialog") {
    renderEditorDialogList();
    renderEditorPreview(buildEditorExerciseFromForm());
  }
  renderPatientManagementList();
  renderCourseViews();
  await refreshRecordings();
  setPatientManagerState(
    cloudSaved
      ? `Patient in Firebase gespeichert und aktiv: ${cleanedName}`
      : `Patient nur lokal gespeichert: ${cleanedName}. Firebase fehlgeschlagen.`,
    cloudSaved ? "success" : "warning",
  );
  message.textContent = `Patient ausgewählt: ${cleanedName}`;
}

async function refreshRecordings(preferredId = null) {
  try {
    allRecordings = await getAllRecordings();
  } catch (error) {
    console.warn("Aufnahmen konnten nicht geladen werden", error);
    allRecordings = Array.isArray(allRecordings) ? allRecordings : [];
  }
  renderPatientOptions(allRecordings);
  renderLibrary(preferredId);
}

function renderPatientOptions(recordings) {
  const names = new Set(recordings.map((recording) => recording.patientName).filter(Boolean));
  patientProfiles.forEach((profile) => {
    if (profile?.name) names.add(profile.name);
  });
  names.add(getCurrentPatientName());

  patientSuggestions.innerHTML = "";
  [...names].sort((a, b) => a.localeCompare(b, "de")).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    patientSuggestions.append(option);
  });
  if (patientManagerName) patientManagerName.value = getCurrentPatientName();
  renderPatientManagementList([...names].sort((a, b) => a.localeCompare(b, "de")));
  renderEditorPatientScopeOptions();
  renderRecordingExerciseOptions();
}

function renderPatientManagementList(names = getKnownPatientNames()) {
  if (!patientManagerList) return;

  patientManagerList.innerHTML = "";
  const selectedPatient = getCurrentPatientName();
  const visibleNames = names.length ? names : [selectedPatient];

  if (!visibleNames.length) {
    patientManagerList.innerHTML = '<div class="course-empty">Noch kein Patient vorhanden.</div>';
    return;
  }

  visibleNames.forEach((name) => {
    const recordingCount = allRecordings.filter(
      (recording) => isRecordingForPatient(recording, findPatientProfileByName(name)?.id || "", name),
    ).length;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "patient-manager-item";
    button.classList.toggle(
      "is-active",
      normalizeEditorExerciseName(name) === normalizeEditorExerciseName(selectedPatient),
    );
    button.innerHTML = `<span>${name}</span><small>${recordingCount} Aufnahme${recordingCount === 1 ? "" : "n"}</small>`;
    button.addEventListener("click", async () => {
      await selectPatient(name);
    });
    patientManagerList.append(button);
  });
}

function getKnownPatientNames() {
  const names = new Set();
  patientProfiles.forEach((profile) => {
    if (profile?.name) names.add(profile.name);
  });
  allRecordings.forEach((recording) => {
    if (recording?.patientName) names.add(recording.patientName);
  });
  names.add(getCurrentPatientName());
  return [...names].filter(Boolean).sort((a, b) => a.localeCompare(b, "de"));
}

function createId(prefix) {
  const random = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${String(random).replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
}

function getCourseTemplates() {
  return [
    {
      id: "template_morning_voice",
      name: "Morgendliche Stimmaktivierung",
      description: "Ein kurzer Kurs zur Aktivierung von Stimme und Atmung.",
      difficulty: "leicht",
      category: "stimme",
      sessionsPerWeek: 5,
      exercises: ["Vokal A halten", "A E I O U", "Pa Ta Ka"],
    },
    {
      id: "template_breath_relax",
      name: "Lockerung und Atmung",
      description: "Ruhige Übungen mit Pausen und Atemhinweisen.",
      difficulty: "leicht",
      category: "atmung",
      sessionsPerWeek: 4,
      exercises: ["Vokal A halten", "Text lesen"],
    },
    {
      id: "template_articulation",
      name: "Artikulationstraining",
      description: "Silben, Laute und kurze Sätze für deutliches Sprechen.",
      difficulty: "mittel",
      category: "artikulation",
      sessionsPerWeek: 5,
      exercises: ["Pa Ta Ka", "Pa Ta Ka 10x", "Kurze Sätze"],
    },
    {
      id: "template_evening_relax",
      name: "Abendliche Entspannung",
      description: "Sanfter Kurs mit ruhigen Texten und Musikpausen.",
      difficulty: "leicht",
      category: "entspannung",
      sessionsPerWeek: 3,
      exercises: ["Text lesen", "Langer Text"],
    },
    {
      id: "template_parkinson_voice",
      name: "Individuelles Parkinson-Stimmtraining",
      description: "Stimme, Artikulation und kurze Sprechimpulse im Verlauf.",
      difficulty: "mittel",
      category: "stimme",
      sessionsPerWeek: 5,
      exercises: ["Vokal A halten", "Pa Ta Ka", "Dialog"],
    },
  ];
}

function getExerciseCategory(exercise) {
  const mode = normalizeEditorExerciseModeValue(exercise?.mode || "");
  if (mode === "breathing") return "atmung";
  if (mode === "vowels") return "stimme";
  if (mode === "syllables") return "artikulation";
  if (mode === "sentences" || mode === "text" || mode === "long_text" || mode === "dialog") return "sprechen";
  return exercise?.category || "individuell";
}

function getExerciseLibraryItems() {
  const fixed = Array.from(exerciseName?.options || [])
    .filter((option) => option.value && option.value !== "custom-editor")
    .map((option) => ({
      id: `fixed:${slugify(option.value)}`,
      exerciseId: option.value,
      name: option.textContent.trim() || option.value,
      mode: option.dataset.mode || "syllables",
      description: "Vorhandene LogoSound-Übung",
      duration: Number(option.dataset.duration || 90),
      difficulty: "leicht",
      isCustom: false,
    }));

  const saved = savedEditorExercises.map((exercise) => ({
    id: `editor:${slugify(exercise.name)}`,
    exerciseId: exercise.name,
    name: exercise.name,
    mode: exercise.mode || "syllables",
    description: exercise.contentLabel || "Individuell erstellte Übung",
    duration: estimateExerciseDurationSeconds(exercise),
    difficulty: exercise.difficulty || "mittel",
    isCustom: true,
  }));

  const media = mediaLibraryItems
    .filter((item) => item.active !== false && item.downloadUrl)
    .map((item) => ({
      id: `media:${item.id}`,
      exerciseId: `media:${item.id}`,
      name: item.title,
      mode: item.kind === "pause" ? "media_pause" : "media_exercise",
      description: item.description || (item.kind === "pause" ? "Mediengestützte Pause" : "Mediengestützte Übung"),
      duration: Number(item.duration || 30),
      difficulty: "leicht",
      isCustom: false,
      isMedia: true,
      mediaId: item.id,
      mediaUrl: item.downloadUrl,
      mediaType: item.mediaType,
      mimeType: item.mimeType,
      thumbnailDataUrl: item.thumbnailDataUrl || "",
      thumbnailUrl: item.thumbnailUrl || item.posterUrl || "",
      topic: String(item.topic || "Kein Thema"),
    }));

  // Uploaded media are shown first so newly added audio/video modules do not
  // disappear below a long list of built-in and editor exercises.
  return [...media, ...saved, ...fixed].map((exercise) => ({
    ...exercise,
    category: exercise.isMedia ? "medien" : (exercise.isCustom ? "individuell" : getExerciseCategory(exercise)),
  }));
}

function estimateExerciseDurationSeconds(exercise) {
  if (isBreathingExercise(exercise)) return getBreathingExerciseDuration(exercise);
  const timing = exercise?.timing || EDITOR_SPEEDS[exercise?.speed || 3] || EDITOR_SPEEDS[3];
  const text = String(exercise?.script || exercise?.content || exercise?.exerciseId || "");
  const units = text.split(/\s+/).filter(Boolean).length || 1;
  return Math.max(30, Math.min(900, Math.round(units * (timing.wordSeconds || 0.75) + 30)));
}

function buildCourseExercise(libraryItem) {
  const pauseDuration = Math.max(0, Math.min(300, Number(coursePauseDuration?.value) || 30));
  const normalizedLibraryMode = normalizeEditorExerciseModeValue(libraryItem.mode || libraryItem.type || libraryItem.kind || libraryItem.functionType);
  const isMediaPause = normalizedLibraryMode === "media_pause";
  const isBreathingExerciseItem = normalizedLibraryMode === "breathing";
  return {
    exerciseId: libraryItem.exerciseId,
    title: libraryItem.name,
    position: dailyPlanDraftExercises.length + 1,
    duration: isBreathingExerciseItem ? getBreathingExerciseDuration(libraryItem) : (isMediaPause ? pauseDuration : (libraryItem.duration || 90)),
    repetitions: 1,
    category: libraryItem.category || "individuell",
    difficulty: libraryItem.difficulty || "leicht",
    unitType: isMediaPause ? "pause" : "exercise",
    mode: normalizedLibraryMode || "syllables",
    mediaId: libraryItem.mediaId || "",
    mediaUrl: libraryItem.mediaUrl || "",
    mediaType: libraryItem.mediaType || "",
    mimeType: libraryItem.mimeType || "",
    pauseDuration: isMediaPause ? pauseDuration : 0,
    backgroundImageId: "",
    backgroundImageUrl: "",
    backgroundImageTitle: "",
    backgroundImage: null,
    transitionType: "fade",
    transitionDuration: 1000,
    recordAudio: !isMediaPause && !isBreathingExerciseItem,
    recordVideo: !isMediaPause && !isBreathingExerciseItem,
    useVideo: !isBreathingExerciseItem,
    useAudioGuide: true,
    useAvatarGuide: false,
    volumeAnalysis: !isBreathingExerciseItem,
    frequencyAnalysis: !isBreathingExerciseItem,
    canSkip: true,
    autoEvaluation: true,
    patientHint: "",
    pauseAfter: {
      enabled: false,
      duration: 0,
      musicId: courseMusic?.value || "",
      volume: 0.25,
      autoContinue: true,
      canSkip: true,
      text: "Atmen Sie ruhig ein und aus.",
      breathHint: true,
    },
  };
}

function normalizeCourseExercise(exercise, index = 0) {
  const normalized = { ...exercise, position: index + 1 };
  const normalizedMode = normalizeEditorExerciseModeValue(normalized.mode || normalized.type || normalized.kind || normalized.functionType);
  normalized.mode = normalizedMode;
  if (!isCoursePauseExercise(normalized)) {
    const breathing = normalizedMode === "breathing";
    return {
      ...normalized,
      mode: normalizedMode,
      duration: breathing ? getBreathingExerciseDuration(normalized) : normalized.duration,
      recordAudio: normalized.recordAudio ?? !breathing,
      recordVideo: normalized.recordVideo ?? !breathing,
      useVideo: normalized.useVideo ?? !breathing,
      volumeAnalysis: normalized.volumeAnalysis ?? !breathing,
      frequencyAnalysis: normalized.frequencyAnalysis ?? !breathing,
      transitionType: getCourseTransitionType(normalized.transitionType),
      transitionDuration: getCourseTransitionDuration(normalized.transitionDuration),
      pauseAfter: {
        ...(normalized.pauseAfter || {}),
        enabled: false,
        duration: 0,
      },
    };
  }
  const media = resolveCourseUnitMedia(normalized);
  const sourceDuration = Number(media?.duration || 0);
  const savedDuration = Number(normalized.duration || 0);
  const legacyPauseDuration = Number(normalized.pauseAfter?.duration || 0);
  const configuredPauseDuration = Number(
    normalized.pauseDuration
      || legacyPauseDuration
      || (sourceDuration && savedDuration === sourceDuration
        ? (Number(coursePauseDuration?.value) || 30)
        : savedDuration)
      || 30
  );
  const backgroundImage = getDailyPlanIntroImageSnapshot(getDailyPlanPauseBackgroundImage(normalized));
  return {
    ...normalized,
    title: normalized.title || media?.title || "Pauseneinheit",
    unitType: "pause",
    mode: "media_pause",
    mediaId: normalized.mediaId || media?.id || "",
    mediaUrl: normalized.mediaUrl || media?.downloadUrl || "",
    mediaType: normalized.mediaType || media?.mediaType || "audio",
    mimeType: normalized.mimeType || media?.mimeType || "",
    pauseDuration: Math.max(1, Math.min(300, configuredPauseDuration)),
    duration: Math.max(1, Math.min(300, configuredPauseDuration)),
    backgroundImageId: backgroundImage?.id || "",
    backgroundImageUrl: backgroundImage?.downloadUrl || "",
    backgroundImageTitle: backgroundImage?.title || "",
    backgroundImage,
    transitionType: getCourseTransitionType(normalized.transitionType),
    transitionDuration: getCourseTransitionDuration(normalized.transitionDuration),
    recordAudio: false,
    recordVideo: false,
    pauseAfter: {
      ...(normalized.pauseAfter || {}),
      enabled: false,
      duration: 0,
    },
  };
}

function normalizeCoursePlan(plan) {
  if (!plan) return null;
  const exercises = Array.isArray(plan.exercises)
    ? plan.exercises.map((exercise, index) => normalizeCourseExercise(exercise, index))
    : [];
  return {
    ...plan,
    exercises,
    exerciseCount: exercises.length,
    estimatedDuration: getCourseEstimatedDuration({ exercises }),
  };
}

function getCourseEstimatedDuration(course) {
  return (course.exercises || []).reduce((sum, exercise) => {
    const pause = exercise.pauseAfter?.enabled ? Number(exercise.pauseAfter.duration || 0) : 0;
    return sum + Number(exercise.duration || 0) + pause;
  }, 0);
}

function getDailyPlansFromRefs(dayPlanRefs = []) {
  return dayPlanRefs
    .map((plan) => resolveCourseDayPlan(plan))
    .filter(Boolean);
}

function getTotalDurationFromDailyPlans(dayPlanRefs = []) {
  return getDailyPlansFromRefs(dayPlanRefs).reduce((sum, plan) => {
    return sum + Number(plan.estimatedDuration || getCourseEstimatedDuration(plan));
  }, 0);
}

function formatCourseDuration(seconds) {
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return minutes ? `${minutes}:${String(rest).padStart(2, "0")} Min.` : `${rest} Sek.`;
}

function formatCourseDate(dateString) {
  if (!dateString) return "heute";
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return String(dateString);
  return parsed.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function persistCourseModuleData() {
  localStorage.setItem(DAILY_PLANS_KEY, JSON.stringify(dailyPlans));
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  localStorage.setItem(COURSE_SESSIONS_KEY, JSON.stringify(courseSessions));
  localStorage.setItem(COURSE_ASSIGNMENTS_KEY, JSON.stringify(courseAssignments));
  localStorage.setItem(RELAX_MUSIC_KEY, JSON.stringify(relaxMusicItems));
  localStorage.setItem(MEDIA_LIBRARY_KEY, JSON.stringify(mediaLibraryItems));
}

async function requestCourseDataApi(method = "GET", body = null) {
  if (!firebaseAuthReadyPromise) {
    firebaseAuthReadyPromise = (async () => {
      if (!firebaseAuth.currentUser) await signInAnonymously(firebaseAuth);
      return firebaseAuth.currentUser;
    })().catch((error) => {
      firebaseAuthReadyPromise = null;
      throw error;
    });
  }
  const user = await firebaseAuthReadyPromise;
  const idToken = await user.getIdToken();
  const patientQuery = method === "GET"
    ? `?patientId=${encodeURIComponent(getCurrentPatientId())}&patientName=${encodeURIComponent(getCurrentPatientName())}`
    : "";
  const response = await fetch(`${getApiUrl("/api/course-data")}${patientQuery}`, {
    method,
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${idToken}`,
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`Kursdaten-API ${response.status}`);
  return response.json();
}

async function loadCourseCollectionsFromCloud() {
  const payload = await requestCourseDataApi("GET");
  return payload?.collections || {};
}

async function refreshCourseDataForCurrentPatient() {
  const cloud = await loadCourseCollectionsFromCloud();
  dailyPlans = Array.isArray(cloud.dailyPlans) ? cloud.dailyPlans : dailyPlans;
  courses = Array.isArray(cloud.courses) ? cloud.courses : courses;
  courseSessions = Array.isArray(cloud.courseSessions) ? cloud.courseSessions : courseSessions;
  courseAssignments = Array.isArray(cloud.courseAssignments) ? cloud.courseAssignments : courseAssignments;
  relaxMusicItems = Array.isArray(cloud.relaxMusic) ? cloud.relaxMusic : relaxMusicItems;
  courseAssignments = reconcileCourseAssignmentPatients(courseAssignments);
  persistCourseModuleData();
}

async function loadCourseModuleData() {
  try {
    dailyPlans = JSON.parse(localStorage.getItem(DAILY_PLANS_KEY) || "[]") || [];
    courses = JSON.parse(localStorage.getItem(COURSES_KEY) || "[]") || [];
    courseSessions = JSON.parse(localStorage.getItem(COURSE_SESSIONS_KEY) || "[]") || [];
    courseAssignments = JSON.parse(localStorage.getItem(COURSE_ASSIGNMENTS_KEY) || "[]") || [];
    relaxMusicItems = JSON.parse(localStorage.getItem(RELAX_MUSIC_KEY) || "[]") || [];
    mediaLibraryItems = JSON.parse(localStorage.getItem(MEDIA_LIBRARY_KEY) || "[]") || [];
  } catch (error) {
    dailyPlans = [];
    courses = [];
    courseSessions = [];
    courseAssignments = [];
    relaxMusicItems = [];
    mediaLibraryItems = [];
  }

  let loadedCourseDataFromApi = false;
  try {
    const cloud = await loadCourseCollectionsFromCloud();
    dailyPlans = Array.isArray(cloud.dailyPlans) ? cloud.dailyPlans : dailyPlans;
    courses = Array.isArray(cloud.courses) ? cloud.courses : courses;
    courseSessions = Array.isArray(cloud.courseSessions) ? cloud.courseSessions : courseSessions;
    courseAssignments = Array.isArray(cloud.courseAssignments) ? cloud.courseAssignments : courseAssignments;
    relaxMusicItems = Array.isArray(cloud.relaxMusic) ? cloud.relaxMusic : relaxMusicItems;
    loadedCourseDataFromApi = true;
  } catch (apiError) {
    await Promise.all([
      loadCloudCollection("dailyPlans").then((items) => { dailyPlans = mergeById(dailyPlans, items); }),
      loadCloudCollection("courses").then((items) => { courses = mergeById(courses, items); }),
      loadCloudCollection("courseSessions").then((items) => { courseSessions = mergeById(courseSessions, items); }),
      loadCloudCollection("courseAssignments").then((items) => { courseAssignments = mergeById(courseAssignments, items); }),
      loadCloudCollection("relaxMusic").then((items) => { relaxMusicItems = mergeById(relaxMusicItems, items); }),
    ]).catch(() => {});
  }
  await loadMediaLibraryFromCloud().catch(() => {});
  courseAssignments = reconcileCourseAssignmentPatients(courseAssignments);

  persistCourseModuleData();
  if (!loadedCourseDataFromApi) syncCourseModuleDataToCloud().catch(() => {});
  if (userRoleSelect) userRoleSelect.value = userRole;
  updateRoleMenuVisibility();
  resetDailyPlanEditor();
  resetCourseEditor();
  renderCourseViews();
}

async function syncCourseModuleDataToCloud() {
  const updates = [
    ...dailyPlans.map((item) => ({ collection: "dailyPlans", item })),
    ...courses.map((item) => ({ collection: "courses", item })),
    ...courseSessions.map((item) => ({ collection: "courseSessions", item })),
    ...courseAssignments.map((item) => ({ collection: "courseAssignments", item })),
    ...relaxMusicItems.map((item) => ({ collection: "relaxMusic", item })),
  ];
  if (!updates.length) return;
  await requestCourseDataApi("POST", { updates });
}

async function syncCourseAssignmentsForPatient(patientId) {
  const normalizedPatientId = String(patientId || "").trim();
  const items = courseAssignments.filter((assignment) => String(assignment.patientId || "").trim() === normalizedPatientId);
  let failed = false;
  await Promise.all(items.map((assignment) => (
    saveCourseAssignmentToCloud(assignment).catch((error) => {
      failed = true;
      console.warn("Firebase-Kurszuordnung fehlgeschlagen", error);
    })
  )));
  return !failed;
}

async function loadCloudCollection(collectionName) {
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((item) => item.data()).filter((item) => item?.id);
}

async function saveCourseItemToCloud(collectionName, item) {
  await requestCourseDataApi("POST", { collection: collectionName, item });
}

async function deleteCourseItemFromCloud(collectionName, id) {
  await requestCourseDataApi("DELETE", { collection: collectionName, id });
}

function mergeById(localItems, cloudItems) {
  const map = new Map(localItems.map((item) => [item.id, item]));
  cloudItems.forEach((item) => {
    const existing = map.get(item.id);
    map.set(item.id, !existing || String(item.updatedAt || "") >= String(existing.updatedAt || "") ? item : existing);
  });
  return [...map.values()];
}

async function saveCourseToCloud(course) {
  await saveCourseItemToCloud("courses", course);
}

async function saveDailyPlanToCloud(plan) {
  await saveCourseItemToCloud("dailyPlans", plan);
}

async function saveCourseSessionToCloud(session) {
  await saveCourseItemToCloud("courseSessions", session);
}

async function saveCourseAssignmentToCloud(assignment) {
  await saveCourseItemToCloud("courseAssignments", assignment);
}

async function saveRelaxMusicToCloud(item) {
  await saveCourseItemToCloud("relaxMusic", item);
}

async function requestMediaLibraryApi(method = "GET", body = null) {
  const response = await fetch(getApiUrl("/api/media-library"), {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || `Medienfehler ${response.status}`);
  return payload;
}

async function loadMediaLibraryFromCloud() {
  const payload = await requestMediaLibraryApi("GET");
  const items = Array.isArray(payload.items) ? payload.items : [];
  mediaLibraryItems = mergeById(mediaLibraryItems, items);
  localStorage.setItem(MEDIA_LIBRARY_KEY, JSON.stringify(mediaLibraryItems));
}

function refreshMediaLibraryFromCloud() {
  if (mediaLibraryRefreshPromise) return mediaLibraryRefreshPromise;
  mediaLibraryRefreshPromise = loadMediaLibraryFromCloud()
    .then(() => {
      persistCourseModuleData();
      renderDailyPlanIntroImageSelect(dailyPlans.find((plan) => plan.id === editingDailyPlanId) || null);
      renderDailyPlanExerciseLibrary();
      renderMediaLibraryList();
    })
    .catch(() => {})
    .finally(() => {
      mediaLibraryRefreshPromise = null;
    });
  return mediaLibraryRefreshPromise;
}

function getMediaFileType(mimeType = "", fileName = "") {
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("image/")) return "image";
  const extension = String(fileName).split(".").pop()?.toLowerCase() || "";
  if (["mp4", "mov", "m4v", "webm"].includes(extension)) return "video";
  if (["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(extension)) return "image";
  return "audio";
}

function isSupportedMediaFile(file) {
  if (!file) return false;
  if (/^(audio|video|image)\//i.test(file.type || "")) return true;
  return /\.(mp3|m4a|wav|ogg|aac|flac|webm|mp4|mov|m4v|jpe?g|png|webp|heic|heif)$/i.test(file.name || "");
}

function safeMediaFileName(fileName = "medium") {
  const parts = String(fileName).split(".");
  const extension = parts.length > 1 ? `.${parts.pop().replace(/[^a-z0-9]/gi, "").toLowerCase()}` : "";
  const base = parts.join(".").normalize("NFKD").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "") || "medium";
  return `${base}${extension}`;
}

function setMediaLibraryState(text, type = "info") {
  if (!mediaLibraryState) return;
  mediaLibraryState.textContent = text;
  mediaLibraryState.dataset.state = type;
}

function uploadMediaFileToCloud(file, item) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", `${getApiUrl("/api/media-library")}?upload=1`);
    request.timeout = 120000;
    request.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    request.setRequestHeader("X-Media-Metadata", encodeURIComponent(JSON.stringify(item)));
    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      const percent = Math.max(1, Math.min(99, Math.round((event.loaded / event.total) * 100)));
      setMediaLibraryState(`Datei wird hochgeladen: ${percent} %`);
    });
    request.addEventListener("load", () => {
      const payload = (() => {
        try { return JSON.parse(request.responseText || "{}"); } catch (error) { return {}; }
      })();
      if (request.status >= 200 && request.status < 300) {
        resolve(payload);
        return;
      }
      const message = payload.error === "media-file-too-large"
        ? "Die Datei ist größer als 28 MB."
        : (payload.error || `Upload-Fehler ${request.status}`);
      reject(new Error(message));
    });
    request.addEventListener("error", () => reject(new Error("Netzwerkfehler beim Upload")));
    request.addEventListener("timeout", () => reject(new Error("Der Upload hat zu lange gedauert")));
    request.send(file);
  });
}

function formatMediaAspectRatio(width, height) {
  const sourceWidth = Math.max(0, Math.round(Number(width) || 0));
  const sourceHeight = Math.max(0, Math.round(Number(height) || 0));
  if (!sourceWidth || !sourceHeight) return "";
  const divisor = (left, right) => right ? divisor(right, left % right) : left;
  const factor = divisor(sourceWidth, sourceHeight);
  return `${sourceWidth / factor}:${sourceHeight / factor}`;
}

function createVideoThumbnailDataUrl(source) {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const isBlob = source instanceof Blob;
    const objectUrl = isBlob ? URL.createObjectURL(source) : "";
    let finished = false;
    const timeout = window.setTimeout(() => finish(""), 10000);

    function finish(dataUrl = "") {
      if (finished) return;
      finished = true;
      window.clearTimeout(timeout);
      video.pause();
      video.removeAttribute("src");
      video.load();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      resolve(dataUrl);
    }

    function capture() {
      const width = Number(video.videoWidth || 0);
      const height = Number(video.videoHeight || 0);
      if (!width || !height) {
        finish();
        return;
      }
      const targetWidth = Math.min(420, width);
      const targetHeight = Math.max(1, Math.round((height / width) * targetWidth));
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const context = canvas.getContext("2d");
      if (!context) {
        finish();
        return;
      }
      try {
        context.drawImage(video, 0, 0, targetWidth, targetHeight);
        finish({ dataUrl: canvas.toDataURL("image/jpeg", 0.72), width, height });
      } catch (error) {
        finish();
      }
    }

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.addEventListener("loadeddata", capture, { once: true });
    video.addEventListener("error", () => finish(), { once: true });
    video.src = isBlob ? objectUrl : resolveAppUrl(String(source || ""));
    video.load();
  });
}

async function ensureMediaLibraryVideoThumbnail(item, source = "") {
  if (!item || item.mediaType !== "video" || item.thumbnailDataUrl || pendingMediaThumbnailIds.has(item.id)) return;
  pendingMediaThumbnailIds.add(item.id);
  try {
    const thumbnailDataUrl = await createVideoThumbnailDataUrl(source || item.downloadUrl || "");
    if (!thumbnailDataUrl) return;
    const updated = { ...item, thumbnailDataUrl, updatedAt: new Date().toISOString() };
    const payload = await requestMediaLibraryApi("POST", { item: updated });
    mediaLibraryItems = mergeById(mediaLibraryItems, [payload.item || updated]);
    persistCourseModuleData();
    renderMediaLibraryList();
    renderDailyPlanExerciseLibrary();
  } catch (error) {
    console.warn("Video thumbnail creation failed", error);
  } finally {
    pendingMediaThumbnailIds.delete(item.id);
  }
}

async function saveMediaLibraryFromForm() {
  const file = mediaLibraryFile?.files?.[0];
  const title = String(mediaLibraryTitle?.value || file?.name || "").trim();
  if (!file || !title) {
    setMediaLibraryState("Bitte Titel und Datei auswählen.", "warning");
    return;
  }
  if (!isSupportedMediaFile(file)) {
    setMediaLibraryState("Erlaubt sind Audio-, Video- und Bilddateien.", "warning");
    return;
  }
  if (file.size > 28 * 1024 * 1024) {
    setMediaLibraryState("Die Datei ist größer als 28 MB. Bitte eine kleinere Datei wählen.", "warning");
    return;
  }

  const id = createId("media");
  saveMediaLibraryButton.disabled = true;
  setMediaLibraryState("Upload wird gestartet ...");
  try {
    const now = new Date().toISOString();
    const item = {
      id,
      title,
      kind: mediaLibraryKind?.value === "pause" ? "pause" : "exercise",
      description: String(mediaLibraryDescription?.value || "").trim(),
      duration: Math.max(1, Math.min(3600, Number(mediaLibraryDuration?.value) || 30)),
      mediaType: getMediaFileType(file.type, file.name),
      mimeType: file.type || "application/octet-stream",
      fileName: file.name,
      active: true,
      topic: "Kein Thema",
      playbackMode: getMediaFileType(file.type, file.name) === "video" ? "once" : "once",
      createdAt: now,
      updatedAt: now,
    };
    const payload = await uploadMediaFileToCloud(file, item);
    let savedItem = payload.item || item;
    mediaLibraryItems = mergeById(mediaLibraryItems, [savedItem]);
    if (savedItem.mediaType === "video") {
      setMediaLibraryState("Video gespeichert. Vorschaubild wird erstellt ...");
      await ensureMediaLibraryVideoThumbnail(savedItem, file);
    }
    persistCourseModuleData();
    if (mediaLibraryTitle) mediaLibraryTitle.value = "";
    if (mediaLibraryDescription) mediaLibraryDescription.value = "";
    if (mediaLibraryFile) mediaLibraryFile.value = "";
    const mediaMode = item.kind === "pause" ? "media_pause" : "media_exercise";
    const mediaModeLabel = item.kind === "pause" ? "Pauseneinheit" : "Medienmodul";
    setMediaLibraryState(
      `Gespeichert: ${title}. Unter Tagespläne als ${mediaModeLabel} verfügbar.`,
      "success",
    );
    renderCourseViews();
    if (dailyPlanExerciseSearch) dailyPlanExerciseSearch.value = "";
    if (dailyPlanExerciseFilter) dailyPlanExerciseFilter.value = mediaMode;
    renderDailyPlanExerciseLibrary();
  } catch (error) {
    setMediaLibraryState(`Speichern fehlgeschlagen: ${error.message}`, "error");
  } finally {
    saveMediaLibraryButton.disabled = false;
  }
}

function openMediaLibraryPlayerOverlay() {
  if (!mediaLibraryPlayer) return;
  mediaLibraryPlayer.classList.add("is-overlay-open");
  document.body.classList.add("has-media-library-player-overlay");
  window.requestAnimationFrame(() => closeMediaLibraryPlayerOverlayButton?.focus());
}

function closeMediaLibraryPlayerOverlay() {
  if (!mediaLibraryPlayer?.classList.contains("is-overlay-open")) return;
  mediaLibraryPlayerVideo?.pause();
  mediaLibraryPlayerAudio?.pause();
  mediaLibraryPlayer.classList.remove("is-overlay-open");
  document.body.classList.remove("has-media-library-player-overlay");
}
function clearMediaLibraryPlayer() {
  [mediaLibraryPlayerVideo, mediaLibraryPlayerAudio].forEach((player) => {
    if (!player) return;
    player.pause();
    player.removeAttribute("src");
    player.load();
    player.classList.add("is-hidden");
  });
  if (mediaLibraryPlayerImage) {
    mediaLibraryPlayerImage.removeAttribute("src");
    mediaLibraryPlayerImage.classList.add("is-hidden");
  }
}

function showMediaLibraryItem(item, autoplay = false) {
  if (!item) return;
  const source = resolveAppUrl(String(item.downloadUrl || ""));
  if (!source) {
    setMediaLibraryState("Für dieses Medium ist keine Datei verfügbar.", "warning");
    return;
  }
  selectedMediaLibraryItemId = item.id;
  clearMediaLibraryPlayer();
  if (mediaLibraryPlayerTitle) mediaLibraryPlayerTitle.textContent = item.title || "Medium";
  mediaLibraryPlayerEmpty?.classList.add("is-hidden");
  const player = item.mediaType === "video"
    ? mediaLibraryPlayerVideo
    : (item.mediaType === "audio" ? mediaLibraryPlayerAudio : mediaLibraryPlayerImage);
  if (!player) return;
  player.src = source;
  if (player instanceof HTMLVideoElement) player.loop = item.playbackMode === "loop";
  player.classList.remove("is-hidden");
  if (player instanceof HTMLImageElement) return;
  player.load();
  if (autoplay) player.play().catch(() => {});
}

function mediaLibraryEscape(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getMediaLibraryTypeLabel(item) {
  if (item.mediaType === "video") return "Video";
  if (item.mediaType === "image") return "Bild";
  return "Sound";
}

function renderMediaLibraryThumbnail(item) {
  const source = String(item.thumbnailDataUrl || "") || resolveAppUrl(String(item.thumbnailUrl || item.posterUrl || (item.mediaType === "image" ? item.downloadUrl || "" : "")));
  const type = item.mediaType === "video" ? "video" : (item.mediaType === "image" ? "image" : "audio");
  if ((type === "image" || type === "video") && source) {
    if (type === "video") {
      return `<span class="media-library-thumbnail media-library-thumbnail-video"><img src="${mediaLibraryEscape(source)}" alt=""><span class="media-library-thumbnail-icon">&#9654;</span><small>Video</small></span>`;
    }
    return `<span class="media-library-thumbnail media-library-thumbnail-image"><img src="${mediaLibraryEscape(source)}" alt=""></span>`;
  }
  const icon = type === "video" ? "&#9654;" : (type === "image" ? "&#9635;" : "&#9835;");
  const label = type === "video" ? "Video" : (type === "image" ? "Bild" : "Sound");
  return `<span class="media-library-thumbnail media-library-thumbnail-${type}" aria-hidden="true"><span class="media-library-thumbnail-icon">${icon}</span><small>${label}</small></span>`;
}


async function backfillMediaLibraryThumbnails() {
  const videos = mediaLibraryItems.filter((item) => item.mediaType === "video" && !item.thumbnailDataUrl);
  if (!videos.length) {
    setMediaLibraryState("Alle Videos haben bereits ein Vorschaubild.", "success");
    return;
  }
  if (backfillMediaLibraryThumbnailsButton) backfillMediaLibraryThumbnailsButton.disabled = true;
  let completed = 0;
  try {
    for (const item of videos) {
      setMediaLibraryState(`Vorschaubild ${completed + 1} von ${videos.length} wird erstellt ...`);
      await ensureMediaLibraryVideoThumbnail(item);
      if (mediaLibraryItems.find((entry) => entry.id === item.id)?.thumbnailDataUrl) completed += 1;
    }
    setMediaLibraryState(`${completed} von ${videos.length} Vorschaubildern gespeichert.`, completed === videos.length ? "success" : "warning");
  } finally {
    if (backfillMediaLibraryThumbnailsButton) backfillMediaLibraryThumbnailsButton.disabled = false;
  }
}function getMediaLibraryRatioLabel(item) {
  if (item?.mediaType !== "video") return "";
  return String(item.aspectRatio || formatMediaAspectRatio(item.videoWidth, item.videoHeight) || "");
}

function getMediaLibraryTopicOptions(selected = "Kein Thema") {
  const normalized = MEDIA_LIBRARY_TOPICS.includes(selected) ? selected : "Kein Thema";
  return MEDIA_LIBRARY_TOPICS.map((topic) => `<option value="${mediaLibraryEscape(topic)}"${topic === normalized ? " selected" : ""}>${mediaLibraryEscape(topic)}</option>`).join("");
}

async function saveMediaLibraryItemEdit(item, card) {
  const titleInput = card.querySelector('[data-field="title"]');
  const topicSelect = card.querySelector('[data-field="topic"]');
  const playbackSelect = card.querySelector('[data-field="playbackMode"]');
  const title = String(titleInput?.value || "").trim();
  if (!title) {
    setMediaLibraryState("Bitte einen Titel eingeben.", "warning");
    titleInput?.focus();
    return;
  }
  const updated = {
    ...item,
    title,
    topic: String(topicSelect?.value || "Kein Thema"),
    playbackMode: item.mediaType === "video" ? String(playbackSelect?.value || item.playbackMode || "once") : "once",
    updatedAt: new Date().toISOString(),
  };
  try {
    const payload = await requestMediaLibraryApi("POST", { item: updated });
    mediaLibraryItems = mergeById(mediaLibraryItems, [payload.item || updated]);
    editingMediaLibraryItemId = "";
    persistCourseModuleData();
    setMediaLibraryState(`Gespeichert: ${title}`, "success");
    renderCourseViews();
  } catch (error) {
    setMediaLibraryState(`Speichern fehlgeschlagen: ${error.message}`, "error");
  }
}

function renderMediaLibraryList() {
  if (!mediaLibraryList) return;
  mediaLibraryList.innerHTML = "";
  const items = mediaLibraryItems
    .slice()
    .sort((left, right) => String(right.updatedAt || "").localeCompare(String(left.updatedAt || "")));
  if (!items.length) {
    clearMediaLibraryPlayer();
    if (mediaLibraryPlayerTitle) mediaLibraryPlayerTitle.textContent = "Noch keine Medien";
    mediaLibraryPlayerEmpty?.classList.remove("is-hidden");
    mediaLibraryList.innerHTML = '<div class="course-empty">Noch keine Medien gespeichert.</div>';
    return;
  }
  if (!items.some((item) => item.id === selectedMediaLibraryItemId)) selectedMediaLibraryItemId = items[0].id;
  const selectedItem = items.find((item) => item.id === selectedMediaLibraryItemId);
  if (selectedItem && !mediaLibraryPlayerVideo?.src && !mediaLibraryPlayerAudio?.src && !mediaLibraryPlayerImage?.src) showMediaLibraryItem(selectedItem);

  items.forEach((item) => {
    const editing = item.id === editingMediaLibraryItemId;
    const topic = String(item.topic || "Kein Thema");
    const ratio = getMediaLibraryRatioLabel(item);
    const card = document.createElement("article");
    card.className = `course-card media-library-card${item.active === false ? " is-inactive" : ""}${item.id === selectedMediaLibraryItemId ? " is-selected" : ""}${editing ? " is-editing" : ""}`;
    card.innerHTML = `
      <button class="media-library-select" type="button" data-action="preview" aria-label="${mediaLibraryEscape(item.title)} im Player öffnen">
        ${renderMediaLibraryThumbnail(item)}
        <span class="media-library-card-copy">
          <strong title="${mediaLibraryEscape(item.title)}">${mediaLibraryEscape(item.title)}</strong>
          <small>${getMediaLibraryTypeLabel(item)} · ${formatCourseDuration(item.duration)}${ratio ? ` · <span class="media-library-ratio">${mediaLibraryEscape(ratio)}</span>` : ""}${item.playbackMode === "loop" ? " · Loop" : ""}</small>
          <small class="media-library-topic-label">Thema: ${mediaLibraryEscape(topic)}</small>
        </span>
      </button>
      <div class="media-library-card-actions">
        <button class="icon-button" type="button" data-action="${editing ? "save" : "edit"}" title="${editing ? "Änderungen speichern" : "Titel und Thema bearbeiten"}" aria-label="${editing ? "Änderungen speichern" : "Titel und Thema bearbeiten"}">${editing ? "&#10003;" : "&#9998;"}</button>
        <button class="icon-button danger-action" type="button" data-action="delete" title="Medium löschen" aria-label="Medium löschen">&#128465;</button>
      </div>
      ${editing ? `
        <div class="media-library-edit-fields">
          <label>Titel<input type="text" data-field="title" value="${mediaLibraryEscape(item.title)}"></label>
          <label>Thema<select data-field="topic">${getMediaLibraryTopicOptions(topic)}</select></label>
          ${item.mediaType === "video" ? `<label>Wiedergabe<select data-field="playbackMode"><option value="once"${item.playbackMode !== "loop" ? " selected" : ""}>Einmal abspielen</option><option value="loop"${item.playbackMode === "loop" ? " selected" : ""}>Als Loop wiederholen</option></select></label>` : ""}
        </div>` : ""}
    `;
    card.addEventListener("click", async (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (!action) return;
      if (action === "preview") {
        showMediaLibraryItem(item, true);
        openMediaLibraryPlayerOverlay();
        renderMediaLibraryList();
        return;
      }
      if (action === "edit") {
        editingMediaLibraryItemId = item.id;
        renderMediaLibraryList();
        return;
      }
      if (action === "save") {
        await saveMediaLibraryItemEdit(item, card);
        return;
      }
      if (action === "delete") {
        if (!window.confirm(`„${item.title}“ dauerhaft aus Firebase löschen?`)) return;
        try {
          await requestMediaLibraryApi("DELETE", { id: item.id });
          mediaLibraryItems = mediaLibraryItems.filter((entry) => entry.id !== item.id);
          if (selectedMediaLibraryItemId === item.id) selectedMediaLibraryItemId = "";
          if (editingMediaLibraryItemId === item.id) editingMediaLibraryItemId = "";
          persistCourseModuleData();
          setMediaLibraryState(`Gelöscht: ${item.title}`, "success");
          renderCourseViews();
        } catch (error) {
          setMediaLibraryState(`Löschen fehlgeschlagen: ${error.message}`, "error");
        }
      }
    });
    mediaLibraryList.append(card);
  });
}
function updateRoleMenuVisibility() {
  const isPatient = userRole === "patient";
  document.querySelectorAll("[data-role-menu='staff']").forEach((button) => {
    button.classList.toggle("is-hidden", isPatient);
  });
  document.querySelectorAll("[data-role-menu='patient']").forEach((button) => {
    button.classList.toggle("is-hidden", !isPatient);
  });
}

function renderCourseViews() {
  renderCourseAssignOptions();
  renderPatientAssignedCourseList();
  renderDailyPlanExerciseLibrary();
  renderDailyPlanSelectedExercises();
  renderDailyPlanList();
  renderOpenDailyPlanSelect();
  renderCourseExerciseLibrary();
  renderCourseSelectedExercises();
  renderCourseList();
  renderRelaxMusicList();
  renderMediaLibraryList();
  renderMyCourses();
}

function renderCourseAssignOptions() {
  if (!patientCourseAssignSelect) return;
  const selected = patientCourseAssignSelect.value || "";
  patientCourseAssignSelect.innerHTML = "";
  if (!courses.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Kein Kurs verfügbar";
    patientCourseAssignSelect.append(option);
    patientCourseAssignSelect.value = "";
    if (assignCourseToPatientButton) assignCourseToPatientButton.disabled = true;
    setCourseAssignState("Noch kein Kurs angelegt.", "info");
    return;
  }
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.name;
    patientCourseAssignSelect.append(option);
  });
  patientCourseAssignSelect.value = Array.from(patientCourseAssignSelect.options).some((option) => option.value === selected)
    ? selected
    : (patientCourseAssignSelect.options[0]?.value || "");
  if (assignCourseToPatientButton) assignCourseToPatientButton.disabled = false;
}

function renderDailyPlanMediaAndTopicFilters(items) {
  if (dailyPlanMediaFilter) {
    const currentMediaValue = dailyPlanMediaFilter.value;
    const availableMediaTypes = new Set(items.filter((item) => item.isMedia).map((item) => item.mediaType));
    const pauseAvailable = items.some((item) => item.mode === "media_pause");
    [...dailyPlanMediaFilter.options].forEach((option) => {
      if (!option.value) return;
      const available = option.value === "voice"
        ? items.some((item) => !item.isMedia && normalizeEditorExerciseModeValue(item.mode) !== "breathing")
        : option.value === "breathing"
          ? items.some((item) => normalizeEditorExerciseModeValue(item.mode) === "breathing")
          : option.value === "pause"
            ? pauseAvailable
            : availableMediaTypes.has(option.value);
      option.hidden = !available;
      option.disabled = !available;
    });
    const activeOption = dailyPlanMediaFilter.querySelector(`option[value="${currentMediaValue}"]`);
    if (!activeOption || activeOption.disabled) dailyPlanMediaFilter.value = "";
  }

  if (dailyPlanTopicFilter) {
    const currentTopic = dailyPlanTopicFilter.value;
    const topics = [...new Set(items
      .filter((item) => item.isMedia && item.topic && item.topic !== "Kein Thema")
      .map((item) => item.topic))]
      .sort((left, right) => left.localeCompare(right, "de"));
    dailyPlanTopicFilter.innerHTML = '<option value="">Alle Themen</option>';
    topics.forEach((topic) => {
      const option = document.createElement("option");
      option.value = topic;
      option.textContent = topic;
      dailyPlanTopicFilter.append(option);
    });
    dailyPlanTopicFilter.value = topics.includes(currentTopic) ? currentTopic : "";
  }
}
function renderDailyPlanFunctionFilter(items) {
  if (!dailyPlanExerciseFilter) return;
  const currentValue = dailyPlanExerciseFilter.value;
  const modes = [...new Set(items.map((item) => normalizeEditorExerciseModeValue(item.mode)))];
  dailyPlanExerciseFilter.innerHTML = '<option value="">Alle Funktionsarten</option>';
  modes
    .sort((left, right) => getEditorModeLabel(left).localeCompare(getEditorModeLabel(right), "de"))
    .forEach((mode) => {
      const option = document.createElement("option");
      option.value = mode;
      option.textContent = getEditorModeLabel(mode);
      dailyPlanExerciseFilter.append(option);
    });
  dailyPlanExerciseFilter.value = modes.includes(currentValue) ? currentValue : "";
}

function closeDailyPlanLibraryActions(exceptCard = null) {
  dailyPlanExerciseLibrary?.querySelectorAll(".course-exercise-card.is-actions-open").forEach((card) => {
    if (card !== exceptCard) card.classList.remove("is-actions-open");
  });
}

function setDailyPlanLibraryActionsOpen(card, open) {
  if (!card?.classList.contains("has-swipe-actions")) return;
  if (open) closeDailyPlanLibraryActions(card);
  card.classList.toggle("is-actions-open", open);
}

function enableDailyPlanLibrarySwipe(card, foreground) {
  if (!card?.classList.contains("has-swipe-actions") || !foreground) return;
  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let tracking = false;

  foreground.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    startX = event.clientX;
    startY = event.clientY;
    deltaX = 0;
    tracking = true;
  });

  foreground.addEventListener("pointermove", (event) => {
    if (!tracking) return;
    const moveX = event.clientX - startX;
    const moveY = event.clientY - startY;
    if (Math.abs(moveY) > Math.abs(moveX) && Math.abs(moveY) > 8) {
      tracking = false;
      foreground.style.removeProperty("transform");
      return;
    }
    if (Math.abs(moveX) < 8) return;
    deltaX = Math.max(-150, Math.min(0, moveX));
    foreground.style.transform = `translateX(${deltaX}px)`;
  });

  const finishSwipe = () => {
    if (!tracking) return;
    tracking = false;
    foreground.style.removeProperty("transform");
    setDailyPlanLibraryActionsOpen(card, deltaX < -54);
  };
  foreground.addEventListener("pointerup", finishSwipe);
  foreground.addEventListener("pointercancel", finishSwipe);
  foreground.title = "Doppelklick: Bearbeiten und Löschen öffnen";
  foreground.addEventListener("dblclick", (event) => {
    if (event.target.closest("button")) return;
    event.preventDefault();
    const shouldOpen = !card.classList.contains("is-actions-open");
    setDailyPlanLibraryActionsOpen(card, shouldOpen);
  });
}

function setDailyPlanLibraryOpen(open, options = {}) {
  const isOpen = Boolean(open);
  dailyPlanWorkspace?.classList.toggle("is-library-open", isOpen);
  dailyPlanLibrary?.setAttribute("aria-hidden", String(!isOpen));
  openDailyPlanLibraryButton?.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) renderDailyPlanExerciseLibrary();
  if (options.focus === false) return;
  window.requestAnimationFrame(() => {
    const target = isOpen ? dailyPlanLibrary : dailyPlanSelectedExercises;
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (isOpen) dailyPlanExerciseSearch?.focus();
  });
}

function renderDailyPlanLibraryVisual(item, isPause = false) {
  const type = String(item?.mediaType || "");
  const source = String(item?.thumbnailDataUrl || item?.thumbnailUrl || (type === "image" ? item?.mediaUrl || "" : ""));
  if (item?.isMedia && source && (type === "video" || type === "image")) {
    const icon = type === "video" ? "&#9654;" : "&#9635;";
    const label = type === "video" ? "Video" : "Bild";
    return `<div class="course-library-visual has-thumbnail"><img src="${mediaLibraryEscape(resolveAppUrl(source))}" alt=""><span class="course-library-visual-play">${icon}</span><small>${label}</small></div>`;
  }
  if (isPause) return '<div class="course-library-visual is-pause"><span aria-hidden="true">Ⅱ</span><small>Pause</small></div>';
  if (item?.isMedia && type === "audio") return '<div class="course-library-visual is-audio"><span aria-hidden="true">♪</span><small>Sound</small></div>';
  if (item?.mode === "breathing") return '<div class="course-library-visual is-breathing"><span aria-hidden="true">○</span><small>Atem</small></div>';
  if (item?.mode === "dialog") return '<div class="course-library-visual is-dialog"><span aria-hidden="true">…</span><small>Dialog</small></div>';
  if (item?.mode === "long_text" || item?.mode === "karaoke") return '<div class="course-library-visual is-text"><span aria-hidden="true">T</span><small>Text</small></div>';
  return `<div class="course-library-visual"><span aria-hidden="true">Aa</span><small>${mediaLibraryEscape(getEditorModeLabel(item?.mode))}</small></div>`;
}
function renderDailyPlanExerciseLibrary() {
  if (!dailyPlanExerciseLibrary) return;
  const libraryItemsById = new Map();
  getExerciseLibraryItems().forEach((item) => {
    const key = String(item.exerciseId || item.name || item.id).trim().toLocaleLowerCase("de");
    const current = libraryItemsById.get(key);
    if (!current || (!current.isCustom && item.isCustom)) libraryItemsById.set(key, item);
  });
  const libraryItems = [...libraryItemsById.values()];
renderDailyPlanFunctionFilter(libraryItems);
  renderDailyPlanMediaAndTopicFilters(libraryItems);
  const filter = dailyPlanExerciseFilter?.value || "";
  const mediaFilter = dailyPlanMediaFilter?.value || "";
  const topicFilter = dailyPlanTopicFilter?.value || "";
  const search = String(dailyPlanExerciseSearch?.value || "").trim().toLowerCase();
  dailyPlanExerciseLibrary.innerHTML = "";
  const visibleItems = libraryItems
    .filter((item) => !filter || normalizeEditorExerciseModeValue(item.mode) === filter)
    .filter((item) => {
      if (!mediaFilter) return true;
      const mode = normalizeEditorExerciseModeValue(item.mode);
      if (mediaFilter === "voice") return !item.isMedia && mode !== "breathing";
      if (mediaFilter === "breathing") return mode === "breathing";
      if (mediaFilter === "pause") return item.mode === "media_pause";
      return item.isMedia && item.mediaType === mediaFilter;
    })
    .filter((item) => !topicFilter || (item.isMedia && item.topic === topicFilter))
    .filter((item) => {
      if (!search) return true;
      const haystack = [item.name, item.description, getEditorModeLabel(item.mode), item.mode].join(" ").toLowerCase();
      return haystack.includes(search);
    });
  if (dailyPlanLibrarySummary) {
    dailyPlanLibrarySummary.textContent = `${visibleItems.length} von ${libraryItems.length}`;
  }
  visibleItems.forEach((item) => {
      const alreadySelected = dailyPlanDraftExercises.some((exercise) => exercise.exerciseId === item.exerciseId);
      const isPause = item.mode === "media_pause";
      const card = document.createElement("article");
      card.className = `course-exercise-card${alreadySelected ? " is-selected" : ""}${isPause ? " is-pause" : ""}${item.isCustom ? " has-swipe-actions" : ""}`;
      card.innerHTML = `
        ${item.isCustom ? `
          <div class="course-swipe-actions" aria-label="Aktionen für ${item.name}">
            <button type="button" data-action="edit" class="course-swipe-edit">Bearbeiten</button>
            <button type="button" data-action="delete" class="course-swipe-delete">Löschen</button>
          </div>
        ` : ""}
        <div class="course-exercise-content">
          ${renderDailyPlanLibraryVisual(item, isPause)}
          <div class="course-exercise-copy">
            <strong>${item.name}</strong>
            <small>${item.description}</small>
            <div class="course-exercise-meta">
              <span>${formatCourseDuration(item.duration)}</span>
              ${alreadySelected ? "<span class=\"is-selected-label\">Im Tagesplan</span>" : ""}
            </div>
          </div>
          <div class="course-exercise-actions">
            <button type="button" class="secondary-action compact-action${alreadySelected ? " is-selected" : ""}" data-action="${alreadySelected ? "remove" : "add"}" aria-label="${alreadySelected ? "Aus Tagesplan entfernen" : "Zum Tagesplan hinzufügen"}" title="${alreadySelected ? "Aus Tagesplan entfernen" : "Hinzufügen"}">${alreadySelected ? "&#10003;" : "+"}</button>
          </div>
        </div>
      `;
      card.addEventListener("click", async (event) => {
        const action = event.target.closest("button")?.dataset.action;
        if (!action) return;
        if (action === "edit") {
          setDailyPlanLibraryActionsOpen(card, false);
          setActiveView("editor");
          loadEditorExerciseIntoForm(item.exerciseId);
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        if (action === "delete") {
          await deleteSavedEditorExercise(item.exerciseId);
          renderDailyPlanExerciseLibrary();
          return;
        }
        if (action === "remove") {
          dailyPlanDraftExercises = dailyPlanDraftExercises.filter((exercise) => exercise.exerciseId !== item.exerciseId);
          normalizeDailyPlanDraftPositions();
          setDailyPlanEditorState(`Entfernt: ${item.name}`, "info");
          renderDailyPlanSelectedExercises();
          renderDailyPlanExerciseLibrary();
          return;
        }
        if (dailyPlanDraftExercises.some((exercise) => exercise.exerciseId === item.exerciseId)) {
          setDailyPlanEditorState(`Bereits im Tagesplan: ${item.name}`, "info");
          return;
        }
        dailyPlanDraftExercises.push(buildCourseExercise(item));
        normalizeDailyPlanDraftPositions();
        setDailyPlanEditorState(`Hinzugefügt: ${item.name}`, "success");
        renderDailyPlanExerciseLibrary();
        renderDailyPlanSelectedExercises();
      });
      enableDailyPlanLibrarySwipe(card, card.querySelector(".course-exercise-content"));
      dailyPlanExerciseLibrary.append(card);
    });
  if (!dailyPlanExerciseLibrary.children.length) {
    dailyPlanExerciseLibrary.innerHTML = '<div class="course-empty">Keine passende Übung für den aktuellen Filter.</div>';
  }
}

function normalizeDailyPlanDraftPositions() {
  dailyPlanDraftExercises = dailyPlanDraftExercises.map((exercise, index) => normalizeCourseExercise(exercise, index));
}

function getCourseTransitionType(value = "") {
  const type = String(value || "fade").trim();
  return ["none", "fade", "fadeThrough"].includes(type) ? type : "fade";
}

function getCourseTransitionDuration(value = 1000) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds)) return 1000;
  const ms = seconds > 20 ? seconds : seconds * 1000;
  return Math.max(150, Math.min(5000, Math.round(ms)));
}

function renderCourseTransitionOptions(selected = "fade") {
  const current = getCourseTransitionType(selected);
  return [["fade", "Fade"], ["fadeThrough", "Fade out / Fade in"], ["none", "Kein Übergang"]]
    .map(([value, label]) => "<option value=\"" + value + "\"" + (value === current ? " selected" : "") + ">" + label + "</option>")
    .join("");
}

function formatCourseTransitionDuration(value = 1000) {
  const ms = getCourseTransitionDuration(value);
  return String(Math.round(ms / 100) / 10).replace(".", ",") + " s";
}
function getDailyPlanPauseEditKey(exercise, index = 0) {
  return `${String(exercise?.exerciseId || exercise?.mediaId || exercise?.title || "pause")}-${index}`;
}

function getDailyPlanPauseBackgroundImage(exercise = null) {
  const imageId = String(exercise?.backgroundImageId || exercise?.pauseBackgroundImageId || exercise?.backgroundImage?.id || "");
  const libraryImage = mediaLibraryItems.find((item) => item.id === imageId && item.mediaType === "image" && item.downloadUrl);
  if (libraryImage) return libraryImage;
  if (exercise?.backgroundImage?.downloadUrl) return { ...exercise.backgroundImage, id: exercise.backgroundImage.id || imageId };
  if (exercise?.backgroundImageUrl) {
    return {
      id: imageId,
      title: exercise.backgroundImageTitle || "Hintergrundbild",
      mediaType: "image",
      downloadUrl: exercise.backgroundImageUrl,
    };
  }
  return null;
}

function renderDailyPlanPauseImageOptions(exercise = null) {
  const savedImage = getDailyPlanPauseBackgroundImage(exercise);
  const selectedId = String(exercise?.backgroundImageId || savedImage?.id || "");
  const images = getDailyPlanIntroImages();
  const hasSelected = images.some((item) => item.id === selectedId);
  const savedOption = savedImage?.downloadUrl && selectedId && !hasSelected ? [savedImage] : [];
  return `<option value="">Kein Hintergrundbild</option>${[...savedOption, ...images]
    .map((item) => `<option value="${mediaLibraryEscape(item.id)}"${item.id === selectedId ? " selected" : ""}>${mediaLibraryEscape(item.title || "Bild")}</option>`)
    .join("")}`;
}

function updateDailyPlanPauseBackground(exercise, imageId = "") {
  const image = imageId ? getDailyPlanIntroImage({ introImageId: imageId }) : null;
  const snapshot = getDailyPlanIntroImageSnapshot(image);
  exercise.backgroundImageId = snapshot?.id || "";
  exercise.backgroundImageUrl = snapshot?.downloadUrl || "";
  exercise.backgroundImageTitle = snapshot?.title || "";
  exercise.backgroundImage = snapshot;
}

function renderDailyPlanSelectedExercises() {
  if (!dailyPlanSelectedExercises) return;
  dailyPlanSelectedExercises.innerHTML = "";
  const totalDuration = dailyPlanDraftExercises.reduce((total, exercise) => total + Math.max(0, Number(exercise.duration) || 0), 0);
  if (dailyPlanSelectionSummary) {
    const count = dailyPlanDraftExercises.length;
    dailyPlanSelectionSummary.textContent = count
      ? `${count} ${count === 1 ? "Übung" : "Übungen"} · ${formatCourseDuration(totalDuration)}`
      : "0 Übungen";
  }
  if (!dailyPlanDraftExercises.length) {
    dailyPlanSelectedExercises.innerHTML = '<div class="daily-plan-empty"><strong>Noch keine Übung ausgewählt</strong><span>Fügen Sie unten Übungen oder Pausen hinzu.</span></div>';
    dailyPlanSelectedExercises.classList.add("is-empty");
    return;
  }
  dailyPlanSelectedExercises.classList.remove("is-empty");
  dailyPlanDraftExercises.forEach((exercise, index) => {
    const item = document.createElement("div");
    const isPause = isCoursePauseExercise(exercise);
    const editKey = getDailyPlanPauseEditKey(exercise, index);
    const isEditingItem = editingDailyPlanPauseKey === editKey;
    const backgroundImage = isPause ? getDailyPlanPauseBackgroundImage(exercise) : null;
    item.className = `course-selected-item${isPause ? " is-pause" : ""}${isEditingItem ? " is-editing" : ""}`;
    item.innerHTML = `
      <span class="course-selected-index">${index + 1}</span>
      <div class="course-selected-copy">
        <strong>${mediaLibraryEscape(exercise.title)}</strong>
        <small>${isPause ? "Pausenmusik" : getEditorModeLabel(exercise.mode)} · ${formatCourseDuration(exercise.duration)} · Übergang: ${formatCourseTransitionDuration(exercise.transitionDuration)}${backgroundImage ? ` · Bild: ${mediaLibraryEscape(backgroundImage.title || "Hintergrund")}` : ""}</small>
      </div>
      <div class="course-item-actions has-edit">
        <button type="button" data-action="editItem" aria-label="Einstellungen bearbeiten" title="Einstellungen bearbeiten">${isEditingItem ? "&#10003;" : "&#9998;"}</button>
        <button type="button" data-action="up" aria-label="Nach oben" title="Nach oben">&#8593;</button>
        <button type="button" data-action="down" aria-label="Nach unten" title="Nach unten">&#8595;</button>
        <button type="button" data-action="remove" aria-label="Entfernen" title="Entfernen">&times;</button>
      </div>
      ${isEditingItem ? `
        <div class="course-pause-inline-edit">
          <label>Übergang
            <select data-field="transitionType">${renderCourseTransitionOptions(exercise.transitionType)}</select>
          </label>
          <label>Dauer
            <input type="number" min="0.15" max="5" step="0.1" data-field="transitionDuration" value="${Math.round(getCourseTransitionDuration(exercise.transitionDuration) / 100) / 10}">
          </label>
          ${isPause ? `
            <label>Standzeit
              <input type="number" min="1" max="300" step="1" data-field="pauseDuration" value="${Math.max(1, Math.min(300, Number(exercise.duration || 30)))}">
            </label>
            <label>Hintergrundbild
              <select data-field="pauseBackgroundImage">${renderDailyPlanPauseImageOptions(exercise)}</select>
            </label>` : ""}
        </div>` : ""}
    `;
    item.querySelector("[data-action='up']").disabled = index === 0;
    item.querySelector("[data-action='down']").disabled = index === dailyPlanDraftExercises.length - 1;
    item.querySelector("[data-field='transitionType']")?.addEventListener("change", (event) => {
      exercise.transitionType = getCourseTransitionType(event.target.value);
      normalizeDailyPlanDraftPositions();
      renderDailyPlanSelectedExercises();
    });
    item.querySelector("[data-field='transitionDuration']")?.addEventListener("change", (event) => {
      exercise.transitionDuration = getCourseTransitionDuration(event.target.value);
      normalizeDailyPlanDraftPositions();
      renderDailyPlanSelectedExercises();
    });
    item.addEventListener("click", (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (!action) return;
      if (action === "editItem") {
        editingDailyPlanPauseKey = editingDailyPlanPauseKey === editKey ? "" : editKey;
        renderDailyPlanSelectedExercises();
        return;
      }
      if (action === "up" && index > 0) {
        [dailyPlanDraftExercises[index - 1], dailyPlanDraftExercises[index]] = [dailyPlanDraftExercises[index], dailyPlanDraftExercises[index - 1]];
      }
      if (action === "down" && index < dailyPlanDraftExercises.length - 1) {
        [dailyPlanDraftExercises[index + 1], dailyPlanDraftExercises[index]] = [dailyPlanDraftExercises[index], dailyPlanDraftExercises[index + 1]];
      }
      if (action === "remove") {
        dailyPlanDraftExercises.splice(index, 1);
        if (editingDailyPlanPauseKey === editKey) editingDailyPlanPauseKey = "";
      }
      normalizeDailyPlanDraftPositions();
      renderDailyPlanExerciseLibrary();
      renderDailyPlanSelectedExercises();
    });
    item.querySelector("[data-field='pauseDuration']")?.addEventListener("change", (event) => {
      const duration = Math.max(1, Math.min(300, Math.round(Number(event.target.value) || 30)));
      exercise.duration = duration;
      exercise.pauseDuration = duration;
      normalizeDailyPlanDraftPositions();
      renderDailyPlanSelectedExercises();
    });
    item.querySelector("[data-field='pauseBackgroundImage']")?.addEventListener("change", (event) => {
      updateDailyPlanPauseBackground(exercise, event.target.value);
      normalizeDailyPlanDraftPositions();
      renderDailyPlanSelectedExercises();
    });
    dailyPlanSelectedExercises.append(item);
  });
}

function setDailyPlanEditorState(message, type = "info") {
  if (!dailyPlanEditorState) return;
  dailyPlanEditorState.textContent = message;
  dailyPlanEditorState.classList.remove("is-success", "is-warning", "is-error", "is-info", "is-saving");
  if (type === "success") dailyPlanEditorState.classList.add("is-success");
  else if (type === "warning") dailyPlanEditorState.classList.add("is-warning");
  else if (type === "error") dailyPlanEditorState.classList.add("is-error");
  else if (type === "saving") dailyPlanEditorState.classList.add("is-saving");
  else dailyPlanEditorState.classList.add("is-info");
}

function setCourseEditorState(message, type = "info") {
  if (!courseEditorState) return;
  courseEditorState.textContent = message;
  courseEditorState.classList.remove("is-success", "is-warning", "is-error", "is-info", "is-saving");
  if (type === "success") courseEditorState.classList.add("is-success");
  else if (type === "warning") courseEditorState.classList.add("is-warning");
  else if (type === "error") courseEditorState.classList.add("is-error");
  else if (type === "saving") courseEditorState.classList.add("is-saving");
  else courseEditorState.classList.add("is-info");
}

function setCourseAssignState(message, type = "info") {
  if (!patientCourseAssignState) return;
  patientCourseAssignState.textContent = message;
  patientCourseAssignState.classList.remove("is-success", "is-warning", "is-error", "is-info", "is-saving");
  if (type === "success") patientCourseAssignState.classList.add("is-success");
  else if (type === "warning") patientCourseAssignState.classList.add("is-warning");
  else if (type === "error") patientCourseAssignState.classList.add("is-error");
  else if (type === "saving") patientCourseAssignState.classList.add("is-saving");
  else patientCourseAssignState.classList.add("is-info");
}

function setPatientManagerState(message, type = "info") {
  if (!patientManagerState) return;
  patientManagerState.textContent = message;
  patientManagerState.classList.remove("is-success", "is-warning", "is-error", "is-info", "is-saving");
  if (type === "success") patientManagerState.classList.add("is-success");
  else if (type === "warning") patientManagerState.classList.add("is-warning");
  else if (type === "error") patientManagerState.classList.add("is-error");
  else if (type === "saving") patientManagerState.classList.add("is-saving");
  else patientManagerState.classList.add("is-info");
}

function getDailyPlanIntroImages() {
  return mediaLibraryItems
    .filter((item) => item.active !== false && item.mediaType === "image" && item.downloadUrl)
    .sort((left, right) => String(left.title || "").localeCompare(String(right.title || ""), "de"));
}

function getDailyPlanIntroImageSnapshot(image = null) {
  if (!image?.downloadUrl) return null;
  return {
    id: image.id || "",
    title: image.title || image.name || "Hintergrundbild",
    mediaType: "image",
    downloadUrl: image.downloadUrl,
    storagePath: image.storagePath || image.path || "",
    thumbnailUrl: image.thumbnailUrl || "",
    ratio: image.ratio || "",
    updatedAt: image.updatedAt || "",
  };
}

function renderDailyPlanIntroImageSelect(plan = null) {
  if (!dailyPlanIntroImageSelect) return;
  const savedImage = getDailyPlanIntroImage(plan);
  const selectedId = String(plan?.introImageId || savedImage?.id || dailyPlanIntroImageSelect.value || "");
  const images = getDailyPlanIntroImages();
  const hasSelected = images.some((item) => item.id === selectedId);
  const savedOption = savedImage?.downloadUrl && selectedId && !hasSelected ? [savedImage] : [];
  dailyPlanIntroImageSelect.innerHTML = `<option value="">Kein Hintergrundbild</option>${[...savedOption, ...images]
    .map((item) => `<option value="${mediaLibraryEscape(item.id)}">${mediaLibraryEscape(item.title || "Bild")}</option>`)
    .join("")}`;
  dailyPlanIntroImageSelect.value = selectedId && (hasSelected || savedOption.length) ? selectedId : "";
}

function getDailyPlanIntroImage(plan = null) {
  const imageId = String(plan?.introImageId || dailyPlanIntroImageSelect?.value || "");
  const libraryImage = mediaLibraryItems.find((item) => item.id === imageId && item.mediaType === "image" && item.downloadUrl);
  if (libraryImage) return libraryImage;
  if (plan?.introImage?.downloadUrl) return { ...plan.introImage, id: plan.introImage.id || imageId };
  if (plan?.introImageUrl) return { id: imageId, title: plan.introImageTitle || "Hintergrundbild", downloadUrl: plan.introImageUrl };
  return null;
}
function setDailyPlanIntroPreview(audioUrl = "") {
  if (!dailyPlanIntroPreview) return;
  dailyPlanIntroPreview.pause();
  if (!audioUrl) {
    dailyPlanIntroPreview.removeAttribute("src");
    dailyPlanIntroPreview.load();
    return;
  }
  dailyPlanIntroPreview.src = resolveAppUrl(audioUrl);
  dailyPlanIntroPreview.load();
}

function invalidateDailyPlanIntroAudio() {
  dailyPlanIntroDraftAudio = null;
  setDailyPlanIntroPreview();
}

function getDailyPlanIntroAudioData(plan = null) {
  if (!plan?.introAudioUrl) return null;
  return {
    url: plan.introAudioUrl,
    path: plan.introAudioPath || "",
    voiceId: plan.introAudioVoiceId || plan.introVoiceId || "",
    voiceSettings: plan.introAudioVoiceSettings || plan.introVoiceSettings || null,
    textHash: plan.introAudioTextHash || "",
    updatedAt: plan.introAudioUpdatedAt || plan.updatedAt || "",
  };
}

function isDailyPlanIntroAudioCurrent(audioData, text, requestSettings) {
  return Boolean(
    audioData?.url
    && audioData.textHash === hashText(text)
    && audioData.voiceId === requestSettings.voiceId
    && JSON.stringify(audioData.voiceSettings || {}) === JSON.stringify(requestSettings.voiceSettings || {}),
  );
}

async function generateDailyPlanIntroAudio(options = {}) {
  const description = String(options.plan?.description ?? dailyPlanDescription?.value ?? "").trim();
  if (!description) {
    if (!options.silent) setDailyPlanEditorState("Bitte zuerst eine kurze Beschreibung eingeben.", "warning");
    return null;
  }
  const requestSettings = getDailyPlanVoiceRequestSettings(options.plan || null);
  const existingAudio = options.plan
    ? getDailyPlanIntroAudioData(options.plan)
    : dailyPlanIntroDraftAudio;
  if (isDailyPlanIntroAudioCurrent(existingAudio, description, requestSettings)) {
    setDailyPlanIntroPreview(existingAudio.url);
    if (options.play) await playVoiceAudio(existingAudio.url);
    return existingAudio;
  }

  const originalLabel = dailyPlanIntroAudioButton?.textContent || "Einleitung anhören";
  if (dailyPlanIntroAudioButton && !options.silent) {
    dailyPlanIntroAudioButton.disabled = true;
    dailyPlanIntroAudioButton.textContent = "Audio wird erstellt";
  }
  if (!options.silent) setDailyPlanEditorState("Einleitungs-Audio wird erstellt und gespeichert...", "saving");
  try {
    const label = options.plan?.title || options.plan?.name || dailyPlanName?.value.trim() || "Tagesplan";
    const storedAudio = await createStoredVoiceAudio(description, `${label} Einleitung`, requestSettings);
    dailyPlanIntroDraftAudio = {
      ...storedAudio,
      updatedAt: new Date().toISOString(),
    };
    setDailyPlanIntroPreview(storedAudio.url);
    if (!options.silent) setDailyPlanEditorState("Einleitungs-Audio gespeichert.", "success");
    if (options.play) await playVoiceAudio(storedAudio.url);
    return dailyPlanIntroDraftAudio;
  } catch (error) {
    if (!options.silent) setDailyPlanEditorState(`Einleitungs-Audio konnte nicht erstellt werden: ${error.message}`, "error");
    return null;
  } finally {
    if (dailyPlanIntroAudioButton && !options.silent) {
      dailyPlanIntroAudioButton.disabled = false;
      dailyPlanIntroAudioButton.textContent = originalLabel;
    }
  }
}

function getDailyPlanSelectItems() {
  const byId = new Map();
  dailyPlans.forEach((plan) => {
    if (!plan?.id) return;
    const existing = byId.get(plan.id);
    byId.set(plan.id, !existing || String(plan.updatedAt || "") >= String(existing.updatedAt || "") ? plan : existing);
  });
  return [...byId.values()].sort((left, right) => (
    String(left.name || "").localeCompare(String(right.name || ""), "de", { numeric: true, sensitivity: "base" })
  ));
}

async function refreshOpenDailyPlanSelectFromCloud() {
  const refreshToken = ++openDailyPlanRefreshToken;
  try {
    await refreshCourseDataForCurrentPatient();
  } catch (apiError) {
    try {
      const items = await loadCloudCollection("dailyPlans");
      dailyPlans = mergeById(dailyPlans, items || []);
      persistCourseModuleData();
    } catch (fallbackError) {
      console.warn("Tagesplaene konnten nicht frisch geladen werden", fallbackError || apiError);
    }
  }
  if (refreshToken !== openDailyPlanRefreshToken) return;
  renderOpenDailyPlanSelect();
}

function renderOpenDailyPlanSelect() {
  if (!openDailyPlanSelect) return;
  const selectedId = editingDailyPlanId || openDailyPlanSelect.value || "";
  const plans = getDailyPlanSelectItems();
  openDailyPlanSelect.innerHTML = '<option value="">Tagesplan auswählen</option>';
  plans.forEach((plan) => {
    const option = document.createElement("option");
    option.value = plan.id;
    option.textContent = plan.name || "Unbenannter Tagesplan";
    openDailyPlanSelect.append(option);
  });
  openDailyPlanSelect.value = plans.some((plan) => plan.id === selectedId) ? selectedId : "";
}

function setDailyPlanEditorMode(mode = "new") {
  const opening = mode === "open";
  openDailyPlanControl?.classList.toggle("is-hidden", !opening);
  newDailyPlanButton?.classList.toggle("is-active", !opening);
  openDailyPlanButton?.classList.toggle("is-active", opening);
  if (opening) {
    renderOpenDailyPlanSelect();
    refreshOpenDailyPlanSelectFromCloud().catch(() => renderOpenDailyPlanSelect());
    openDailyPlanSelect?.focus();
  }
}
function resetDailyPlanEditor(plan = null) {
  setDailyPlanLibraryOpen(false, { focus: false });
  editingDailyPlanPauseKey = "";
  editingDailyPlanId = plan?.id || "";
  if (dailyPlanName) dailyPlanName.value = plan?.name || "";
  if (dailyPlanDescription) dailyPlanDescription.value = plan?.description || "";
  renderDailyPlanIntroImageSelect(plan);
  const settings = getElevenLabsSettings();
  const savedVoice = getDailyPlanVoice(plan, settings);
  renderDailyPlanVoiceSelect(settings, savedVoice?.key || settings.activeVoiceKey);
  dailyPlanIntroDraftAudio = getDailyPlanIntroAudioData(plan);
  setDailyPlanIntroPreview(dailyPlanIntroDraftAudio?.url || "");
  dailyPlanDraftExercises = Array.isArray(plan?.exercises)
    ? plan.exercises.map((exercise, index) => normalizeCourseExercise(exercise, index))
    : [];
  normalizeDailyPlanDraftPositions();
  renderDailyPlanSelectedExercises();
  renderDailyPlanExerciseLibrary();
  setDailyPlanEditorState(plan ? `Tagesplan geladen: ${plan.name}` : "Tagesplan bereit.", plan ? "info" : "success");
}

async function saveDailyPlanFromForm() {
  if (!dailyPlanDraftExercises.length) {
    setDailyPlanEditorState("Bitte mindestens eine Uebung fuer den Tagesplan auswaehlen.", "warning");
    return;
  }
  setDailyPlanEditorState("Tagesplan wird gespeichert...", "saving");
  const now = new Date().toISOString();
  const description = dailyPlanDescription?.value.trim() || "";
  const voice = getDailyPlanSelectedVoice();
  const selectedIntroImageId = String(dailyPlanIntroImageSelect?.value || "");
  const introImage = selectedIntroImageId ? getDailyPlanIntroImage({ introImageId: selectedIntroImageId }) : null;
  const introImageSnapshot = getDailyPlanIntroImageSnapshot(introImage);
  const requestSettings = getDailyPlanVoiceRequestSettings();
  if (description && !isDailyPlanIntroAudioCurrent(dailyPlanIntroDraftAudio, description, requestSettings)) {
    dailyPlanIntroDraftAudio = await generateDailyPlanIntroAudio({ silent: true });
  }
  const plan = {
    id: editingDailyPlanId || createId("dayplan"),
    name: dailyPlanName?.value.trim() || "Neuer Tagesplan",
    description,
    introImageId: introImageSnapshot?.id || "",
    introImageUrl: introImageSnapshot?.downloadUrl || "",
    introImageTitle: introImageSnapshot?.title || "",
    introImage: introImageSnapshot,
    introVoiceProfileKey: voice?.key || "",
    introVoiceProfileName: voice?.name || "",
    introVoiceProfileGender: voice?.gender || "neutral",
    introVoiceId: requestSettings.voiceId,
    introVoiceSettings: requestSettings.voiceSettings,
    introAudioUrl: description ? dailyPlanIntroDraftAudio?.url || "" : "",
    introAudioPath: description ? dailyPlanIntroDraftAudio?.path || "" : "",
    introAudioVoiceId: description ? dailyPlanIntroDraftAudio?.voiceId || "" : "",
    introAudioVoiceSettings: description ? dailyPlanIntroDraftAudio?.voiceSettings || null : null,
    introAudioTextHash: description ? dailyPlanIntroDraftAudio?.textHash || "" : "",
    introAudioUpdatedAt: description ? dailyPlanIntroDraftAudio?.updatedAt || "" : "",
    exerciseCount: dailyPlanDraftExercises.length,
    estimatedDuration: getCourseEstimatedDuration({ exercises: dailyPlanDraftExercises }),
    exercises: dailyPlanDraftExercises.map((exercise, index) => normalizeCourseExercise(exercise, index)),
    updatedAt: now,
    createdAt: dailyPlans.find((item) => item.id === editingDailyPlanId)?.createdAt || now,
  };
  dailyPlans = mergeById(dailyPlans.filter((item) => item.id !== plan.id), [plan]);
  editingDailyPlanId = plan.id;
  persistCourseModuleData();
  let cloudSaved = true;
  await saveDailyPlanToCloud(plan).catch(() => {
    cloudSaved = false;
    setDailyPlanEditorState("Tagesplan lokal gespeichert. Firebase fehlgeschlagen.", "warning");
  });
  if (cloudSaved) {
    setDailyPlanEditorState(
      description && !plan.introAudioUrl
        ? `Tagesplan gespeichert: ${plan.name}. Einleitungs-Audio fehlt noch.`
        : `Tagesplan mit Einleitung gespeichert: ${plan.name}`,
      description && !plan.introAudioUrl ? "warning" : "success",
    );
  }
  renderCourseViews();
}

function renderDailyPlanList() {
  if (!dailyPlanList) return;
  dailyPlanList.innerHTML = "";
  if (!dailyPlans.length) {
    dailyPlanList.innerHTML = `<div class="course-empty">Noch kein Tagesplan angelegt.</div>`;
    return;
  }
  dailyPlans.forEach((plan) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-card-head">
        <span class="course-symbol">${plan.name.slice(0, 2).toUpperCase()}</span>
        <div>
          <h3>${plan.name}</h3>
          <p>${plan.exerciseCount || 0} Übungen · ${formatCourseDuration(plan.estimatedDuration)}</p>
        </div>
      </div>
      <p>${plan.description || "Keine Beschreibung."}</p>
      <div class="course-actions compact">
        <button type="button" data-action="edit">Bearbeiten</button>
        <button type="button" data-action="delete" class="danger-action">Löschen</button>
      </div>
    `;
    card.addEventListener("click", async (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (!action) return;
      if (action === "edit") resetDailyPlanEditor(plan);
      if (action === "delete") await deleteDailyPlan(plan);
    });
    dailyPlanList.append(card);
  });
}

async function deleteDailyPlan(plan) {
  if (!window.confirm(`Tagesplan "${plan.name}" wirklich löschen?`)) return;
  dailyPlans = dailyPlans.filter((item) => item.id !== plan.id);
  courses = courses.map((course) => {
    const nextDayPlans = (course.dayPlans || []).filter((item) => item.id !== plan.id);
    return {
      ...course,
      dayPlans: nextDayPlans,
      totalDays: nextDayPlans.length,
      exerciseCount: getDailyPlansFromRefs(nextDayPlans).reduce(
        (sum, currentPlan) => sum + Number(currentPlan.exerciseCount || (currentPlan.exercises || []).length || 0),
        0,
      ),
      estimatedDuration: getTotalDurationFromDailyPlans(nextDayPlans),
      updatedAt: new Date().toISOString(),
    };
  });
  persistCourseModuleData();
  await deleteCourseItemFromCloud("dailyPlans", plan.id).catch(() => {});
  await Promise.all(courses.map((course) => saveCourseToCloud(course).catch(() => {})));
  if (editingDailyPlanId === plan.id) resetDailyPlanEditor();
  renderCourseViews();
}

function renderCourseExerciseLibrary() {
  if (!courseExerciseLibrary) return;
  courseExerciseLibrary.innerHTML = "";
  if (!dailyPlans.length) {
    courseExerciseLibrary.innerHTML = `<div class="course-empty">Erst einen Tagesplan anlegen.</div>`;
    return;
  }
  dailyPlans.forEach((plan) => {
    const card = document.createElement("article");
    card.className = "course-exercise-card";
    card.innerHTML = `
      <div class="course-symbol">${plan.name.slice(0, 2).toUpperCase()}</div>
      <div>
        <strong>${plan.name}</strong>
        <span>${plan.description || "Tagesplan"}</span>
        <small>${plan.exerciseCount || 0} Übungen · ${formatCourseDuration(plan.estimatedDuration)}</small>
      </div>
      <button type="button" class="secondary-action compact-action">+</button>
    `;
    card.querySelector("button").addEventListener("click", () => {
      courseDraftPlans.push({
        id: plan.id,
        title: plan.name,
        description: plan.description || "",
        exerciseCount: plan.exerciseCount || (plan.exercises || []).length,
        estimatedDuration: plan.estimatedDuration || getCourseEstimatedDuration(plan),
      });
      normalizeCourseDraftPlanPositions();
      renderCourseSelectedExercises();
    });
    courseExerciseLibrary.append(card);
  });
}

function normalizeCourseDraftPlanPositions() {
  courseDraftPlans = courseDraftPlans.map((plan, index) => ({ ...plan, position: index + 1 }));
}

function renderCourseSelectedExercises() {
  if (!courseSelectedExercises) return;
  courseSelectedExercises.innerHTML = "";
  if (!courseDraftPlans.length) {
    courseSelectedExercises.textContent = "Noch kein Tagesplan ausgewählt.";
    courseSelectedExercises.classList.add("is-empty");
    return;
  }
  courseSelectedExercises.classList.remove("is-empty");
  courseDraftPlans.forEach((plan, index) => {
    const item = document.createElement("div");
    item.className = "course-selected-item";
    item.innerHTML = `
      <span class="course-selected-index" aria-hidden="true">${index + 1}</span>
      <div class="course-selected-content">
        <strong>${plan.title}</strong>
        <small>${plan.exerciseCount || 0} Übungen · ${formatCourseDuration(plan.estimatedDuration)}</small>
      </div>
      <div class="course-item-actions">
        <button type="button" data-action="up" aria-label="Nach oben">&uarr;</button>
        <button type="button" data-action="down" aria-label="Nach unten">&darr;</button>
        <button type="button" data-action="remove" aria-label="Entfernen">&times;</button>
      </div>
    `;
    item.querySelector("[data-action='up']").disabled = index === 0;
    item.querySelector("[data-action='down']").disabled = index === courseDraftPlans.length - 1;
    item.addEventListener("click", (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (!action) return;
      if (action === "up" && index > 0) {
        [courseDraftPlans[index - 1], courseDraftPlans[index]] = [courseDraftPlans[index], courseDraftPlans[index - 1]];
      }
      if (action === "down" && index < courseDraftPlans.length - 1) {
        [courseDraftPlans[index + 1], courseDraftPlans[index]] = [courseDraftPlans[index], courseDraftPlans[index + 1]];
      }
      if (action === "remove") courseDraftPlans.splice(index, 1);
      normalizeCourseDraftPlanPositions();
      renderCourseSelectedExercises();
    });
    courseSelectedExercises.append(item);
  });
}

function getCourseDayPlans(course) {
  if (Array.isArray(course?.dayPlans) && course.dayPlans.length) {
    return course.dayPlans.map((plan) => resolveCourseDayPlan(plan)).filter(Boolean);
  }
  if (Array.isArray(course?.exercises) && course.exercises.length) {
    return [{
      id: `${course.id}-legacy`,
      title: course.name || "Tag 1",
      description: course.description || "",
      exerciseCount: course.exercises.length,
      estimatedDuration: getCourseEstimatedDuration({ exercises: course.exercises }),
      exercises: course.exercises,
    }];
  }
  return [];
}

function resolveCourseDayPlan(planRef) {
  if (!planRef) return null;
  const storedPlan = dailyPlans.find((item) => item.id === planRef.id);
  if (storedPlan) {
    return {
      ...planRef,
      ...storedPlan,
      id: storedPlan.id,
      title: storedPlan.name || storedPlan.title || planRef.title || "Tagesplan",
      description: storedPlan.description || "",
      exerciseCount: storedPlan.exerciseCount || storedPlan.exercises?.length || 0,
      estimatedDuration: storedPlan.estimatedDuration || getCourseEstimatedDuration(storedPlan),
      exercises: Array.isArray(storedPlan.exercises) ? storedPlan.exercises : [],
    };
  }
  return {
    ...planRef,
    id: planRef.id,
    title: planRef.title || "Tagesplan",
    description: planRef.description || "",
    exerciseCount: planRef.exerciseCount || 0,
    estimatedDuration: planRef.estimatedDuration || 0,
    exercises: Array.isArray(planRef.exercises) ? planRef.exercises : [],
  };
}

function renderCourseNameControls(selectedCourseId = editingCourseId) {
  const isEditing = Boolean(selectedCourseId);
  courseNameInputGroup?.classList.toggle("is-hidden", isEditing);
  courseNameSelectGroup?.classList.toggle("is-hidden", !isEditing);
  newCourseButton?.classList.toggle("is-active", !isEditing);
  editCourseButton?.classList.toggle("is-active", isEditing);
  document.querySelector(".courses-panel")?.classList.toggle("is-editing-course", isEditing);
  if (!courseNameSelect) return;

  courseNameSelect.innerHTML = "";
  courses
    .slice()
    .sort((left, right) => String(left.name || "").localeCompare(String(right.name || ""), "de"))
    .forEach((course) => {
      const option = document.createElement("option");
      option.value = course.id;
      option.textContent = course.name || "Kurs";
      courseNameSelect.append(option);
    });
  if (!courses.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "Noch kein Kurs gespeichert";
    courseNameSelect.append(option);
  }
  courseNameSelect.value = courses.some((course) => course.id === selectedCourseId)
    ? selectedCourseId
    : courses[0]?.id || "";
}

function openCourseEditorForEditing(courseId = "") {
  if (!courses.length) {
    resetCourseEditor();
    setCourseEditorState("Noch kein gespeicherter Kurs zum Bearbeiten vorhanden.", "warning");
    return;
  }
  const selectedCourse = courses.find((course) => course.id === courseId)
    || courses.find((course) => course.id === editingCourseId)
    || courses[0];
  resetCourseEditor(selectedCourse);
}

function resetCourseEditor(course = null) {
  editingCourseId = course?.id || "";
  renderCourseNameControls(editingCourseId);
  if (courseName) courseName.value = course?.name || "";
  if (courseDescription) courseDescription.value = course?.description || "";
  if (coursePeriod) coursePeriod.value = course?.period || "";
  if (courseSymbol) courseSymbol.value = course?.symbol || "LS";
  courseDraftPlans = getCourseDayPlans(course).map((plan) => ({
    id: plan.id,
    title: plan.title || plan.name || "Tagesplan",
    description: plan.description || "",
    exerciseCount: plan.exerciseCount || (plan.exercises || []).length,
    estimatedDuration: plan.estimatedDuration || getCourseEstimatedDuration(plan),
  }));
  normalizeCourseDraftPlanPositions();
  renderCourseSelectedExercises();
  renderCourseExerciseLibrary();
  setCourseEditorState(course ? `Kurs geladen: ${course.name}` : "Kurs bereit.", course ? "info" : "success");
}

async function saveCourseFromForm() {
  if (!courseDraftPlans.length) {
    setCourseEditorState("Bitte mindestens einen Tagesplan für den Kurs auswählen.", "warning");
    return;
  }
  setCourseEditorState("Kurs wird gespeichert...", "saving");
  const now = new Date().toISOString();
  const existingCourse = courses.find((item) => item.id === editingCourseId) || null;
  const course = {
    id: editingCourseId || createId("course"),
    name: courseName?.value.trim() || "Neuer Kurs",
    description: courseDescription?.value.trim() || "",
    period: existingCourse?.period || "",
    symbol: existingCourse?.symbol || "LS",
    totalDays: courseDraftPlans.length,
    exerciseCount: courseDraftPlans.reduce((sum, plan) => sum + Number(plan.exerciseCount || 0), 0),
    estimatedDuration: getTotalDurationFromDailyPlans(courseDraftPlans),
    dayPlans: courseDraftPlans.map((plan, index) => ({ ...plan, position: index + 1 })),
    updatedAt: now,
    createdAt: courses.find((item) => item.id === editingCourseId)?.createdAt || now,
  };
  courses = mergeById(courses.filter((item) => item.id !== course.id), [course]);
  editingCourseId = course.id;
  persistCourseModuleData();
  await saveCourseToCloud(course).catch(() => {
    setCourseEditorState("Kurs lokal gespeichert. Firebase fehlgeschlagen.", "warning");
  });
  setCourseEditorState(`Kurs gespeichert: ${course.name}`, "success");
  renderCourseViews();
  renderCourseNameControls(course.id);
}

function renderCourseList() {
  if (!courseList) return;
  courseList.innerHTML = "";
  if (!courses.length) {
    courseList.innerHTML = `<div class="course-empty">Noch kein Kurs angelegt.</div>`;
    renderCourseNameControls("");
    return;
  }
  courses.forEach((course) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-card-head">
        <span class="course-symbol">${course.symbol || "LS"}</span>
        <div>
          <h3>${course.name}</h3>
          <p>${course.totalDays || getCourseDayPlans(course).length} Tagespläne · ${course.exerciseCount || 0} Übungen · ${formatCourseDuration(course.estimatedDuration)}</p>
        </div>
      </div>
      <p>${course.description || "Keine Beschreibung."}</p>
      <div class="course-actions compact">
        <button type="button" data-action="edit">Bearbeiten</button>
        <button type="button" data-action="duplicate">Duplizieren</button>
        <button type="button" data-action="delete" class="danger-action">Löschen</button>
      </div>
    `;
    card.addEventListener("click", async (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (!action) return;
      if (action === "edit") resetCourseEditor(course);
      if (action === "duplicate") duplicateCourse(course);
      if (action === "delete") await deleteCourse(course);
    });
    courseList.append(card);
  });
  renderCourseNameControls(editingCourseId);
}

function duplicateCourse(course) {
  const copy = {
    ...course,
    id: createId("course"),
    name: `${course.name} Kopie`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  courses = mergeById(courses, [copy]);
  persistCourseModuleData();
  saveCourseToCloud(copy).catch(() => {});
  resetCourseEditor(copy);
  renderCourseViews();
}

async function deleteCourse(course) {
  if (!window.confirm(`Kurs "${course.name}" wirklich löschen?`)) return;
  const removedAssignments = courseAssignments.filter((item) => item.courseId === course.id);
  courses = courses.filter((item) => item.id !== course.id);
  courseAssignments = courseAssignments.filter((item) => item.courseId !== course.id);
  persistCourseModuleData();
  await deleteCourseItemFromCloud("courses", course.id).catch(() => {});
  await Promise.all(removedAssignments.map((assignment) => (
    deleteCourseItemFromCloud("courseAssignments", assignment.id).catch(() => {})
  )));
  if (editingCourseId === course.id) resetCourseEditor();
  renderCourseViews();
}

async function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function saveRelaxMusicFromForm() {
  const file = musicFile?.files?.[0];
  const existingDefault = relaxMusicItems.find((item) => item.isDefault);
  const item = {
    id: createId("music"),
    title: musicTitle?.value.trim() || file?.name || "Entspannungsmusik",
    category: musicCategory?.value || "klavier",
    volume: Math.max(0, Math.min(1, Number(musicDefaultVolume?.value || 25) / 100)),
    active: true,
    isDefault: Boolean(musicIsDefault?.checked) || !existingDefault,
    dataUrl: file ? await fileToDataUrl(file) : "",
    fileName: file?.name || "",
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  if (item.isDefault) relaxMusicItems = relaxMusicItems.map((music) => ({ ...music, isDefault: false }));
  relaxMusicItems = mergeById(relaxMusicItems, [item]);
  persistCourseModuleData();
  await saveRelaxMusicToCloud(item).catch(() => {});
  if (musicTitle) musicTitle.value = "";
  if (musicFile) musicFile.value = "";
  if (musicIsDefault) musicIsDefault.checked = false;
  renderCourseViews();
}

function renderRelaxMusicList() {
  if (!musicList) return;
  musicList.innerHTML = "";
  if (!relaxMusicItems.length) {
    musicList.innerHTML = `<div class="course-empty">Noch keine Musik gespeichert. Pausen laufen ohne Musik.</div>`;
    return;
  }
  relaxMusicItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-card-head">
        <span class="course-symbol">j</span>
        <div>
          <h3>${item.title}</h3>
          <p>${item.category} · ${Math.round((item.volume || 0) * 100)}%${item.isDefault ? " · Standard" : ""}</p>
        </div>
        <strong class="course-status">${item.active === false ? "Inaktiv" : "Aktiv"}</strong>
      </div>
      <audio controls src="${item.dataUrl || ""}"></audio>
      <div class="course-actions compact">
        <button type="button" data-action="default">Standard</button>
        <button type="button" data-action="toggle">${item.active === false ? "Aktivieren" : "Deaktivieren"}</button>
        <button type="button" data-action="delete" class="danger-action">Löschen</button>
      </div>
    `;
    card.addEventListener("click", async (event) => {
      const action = event.target.closest("button")?.dataset.action;
      if (!action) return;
      if (action === "default") relaxMusicItems = relaxMusicItems.map((music) => ({ ...music, isDefault: music.id === item.id }));
      if (action === "toggle") item.active = item.active === false;
      if (action === "delete") relaxMusicItems = relaxMusicItems.filter((music) => music.id !== item.id);
      persistCourseModuleData();
      if (action === "delete") await deleteCourseItemFromCloud("relaxMusic", item.id).catch(() => {});
      else await saveRelaxMusicToCloud(item).catch(() => {});
      renderCourseViews();
    });
    musicList.append(card);
  });
}

function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId) || null;
}

function getCurrentPatientAssignment() {
  const patientId = getCurrentPatientId();
  return getAssignmentsForPatient(patientId, getCurrentPatientName())
    .filter((item) => item.active !== false)
    .sort((left, right) => String(right.updatedAt || "").localeCompare(String(left.updatedAt || "")))[0] || null;
}

function getLatestCourseSession(courseId, patientId, planId = "") {
  return courseSessions
    .filter((session) => session.courseId === courseId && session.patientId === patientId && (!planId || session.planId === planId))
    .sort((a, b) => String(b.startedAt || "").localeCompare(String(a.startedAt || "")))[0] || null;
}

function getCourseDayIndex(assignment, course) {
  const dayPlans = getCourseDayPlans(course);
  if (!assignment || !dayPlans.length) return 0;
  const start = new Date(assignment.startDate || assignment.updatedAt || Date.now());
  const now = new Date();
  const diffDays = Math.max(0, Math.floor((now - start) / 86400000));
  return Math.min(dayPlans.length - 1, diffDays);
}

function getCurrentCourseDayPlan(course, assignment, selectedDayIndex = null) {
  const dayPlans = getCourseDayPlans(course);
  const requestedIndex = Number(selectedDayIndex);
  const index = selectedDayIndex !== null && Number.isFinite(requestedIndex)
    ? Math.min(Math.max(0, requestedIndex), Math.max(0, dayPlans.length - 1))
    : getCourseDayIndex(assignment, course);
  return {
    index,
    total: dayPlans.length,
    plan: normalizeCoursePlan(dayPlans[index] || null),
  };
}

function prepareCourseExerciseInRecordView(exercise) {
  if (!exercise?.exerciseId) return;
  stopExercisePreview();
  if (!Array.from(exerciseName.options).some((option) => option.value === exercise.exerciseId)) {
    const option = document.createElement("option");
    option.value = exercise.exerciseId;
    option.textContent = exercise.title || "Medienübung";
    option.dataset.mode = exercise.mode || "media_exercise";
    exerciseName.append(option);
  }
  exerciseName.value = exercise.exerciseId;
  loadRecordingKaraokeSpeedForCurrentExercise();
  setupKaraokeText();
  renderRecordingExerciseShortcuts();
  renderCourseRecordingContext(exercise);
  setActiveView("record");
  message.textContent = `Kursübung bereit: ${exercise.title || exercise.exerciseId}`;
}

function renderCourseRecordingContext(exercise = getActiveCourseExercise()) {
  const run = activeCourseRun;
  if (!courseRecordingContext || !run?.playlistMode || !exercise) {
    clearCourseRecordingContext();
    return;
  }
  const exercises = run.plan?.exercises || [];
  const current = Math.min(exercises.length, Number(run.index || 0) + 1);
  const progress = Math.round((current / Math.max(1, exercises.length)) * 100);
  if (courseRecordingCourse) courseRecordingCourse.textContent = run.course?.name || "Kurs";
  if (courseRecordingExercise) courseRecordingExercise.textContent = exercise.title || "Aktuelle Übung";
  if (courseRecordingPlan) {
    courseRecordingPlan.textContent = `${run.plan?.title || "Tagesplan"} · Übung ${current} von ${exercises.length}`;
  }
  if (courseRecordingProgress) courseRecordingProgress.style.width = `${progress}%`;
  courseRecordingContext.classList.remove("is-hidden");
  courseRecordingActions?.classList.remove("is-hidden");
  document.body.classList.add("course-recording-mode");
}

function clearCourseRecordingContext() {
  courseRecordingContext?.classList.add("is-hidden");
  courseRecordingActions?.classList.add("is-hidden");
  document.body.classList.remove("course-recording-mode");
}

async function finishCourseRecordingAction(action) {
  if (!activeCourseRun) return;
  const exercise = getActiveCourseExercise();
  const session = activeCourseRun.session;
  if (!exercise || !session) return;

  if (isRecording || mediaRecorder?.state === "recording") {
    if (action === "done") {
      stopRecording();
      return;
    }
    stopRecording();
  }

  session.completedExerciseIds = Array.isArray(session.completedExerciseIds) ? session.completedExerciseIds : [];
  session.skippedExerciseIds = Array.isArray(session.skippedExerciseIds) ? session.skippedExerciseIds : [];

  if (action === "cancel") {
    clearCourseAutoAdvanceTimer();
    clearActiveCourseRun();
    setActiveView("myCourses");
    renderCourseViews();
    return;
  }

  if (action === "skip" && exercise.exerciseId && !session.skippedExerciseIds.includes(exercise.exerciseId)) {
    session.skippedExerciseIds.push(exercise.exerciseId);
  }
  if (action === "done" && exercise.exerciseId && !session.completedExerciseIds.includes(exercise.exerciseId)) {
    session.completedExerciseIds.push(exercise.exerciseId);
  }

  activeCourseRun.index += 1;
  session.currentExerciseIndex = activeCourseRun.index;
  session.status = activeCourseRun.index >= (activeCourseRun.plan?.exercises?.length || 0)
    ? "completed"
    : "in_progress";
  session.updatedAt = new Date().toISOString();
  courseSessions = mergeById(courseSessions, [session]);
  persistCourseModuleData();
  await saveCourseSessionToCloud(session).catch(() => {});
  clearCourseRecordingContext();
  if (session.status === "completed") {
    renderCoursePlayer();
    setActiveView("myCourses");
  } else {
    runCourseTransition(exercise, () => continueCoursePlaylist());
  }
}

function syncBreathingRecordPreview() {
  if (!breathingOverlay) return;
  if (isBreathingExerciseRunning || isPreviewingExercise) return;

  const shouldShow = document.body.dataset.activeView === "record" && isBreathingExercise(getActiveRecordingExercise());
  const courseExercise = getActiveCourseExercise();
  const shouldAutoStartCourseBreathing = Boolean(
    activeCourseRun
    && shouldShow
    && isBreathingExercise(courseExercise)
    && courseExercise?.exerciseId === exerciseName.value
  );

  if (shouldAutoStartCourseBreathing) {
    document.body.classList.remove("breathing-preview-idle");
    clearCourseTransitionOverlay();
    clearCourseRecordingContext();
    breathingOverlay.classList.remove("is-hidden");
    setBreathingCourseUiVisible(true, courseExercise);
    scheduleCourseBreathingStart(courseExercise, 260);
    return;
  }

  document.body.classList.toggle("breathing-preview-idle", shouldShow);

  if (!shouldShow) {
    breathingOverlay.classList.add("is-hidden");
    return;
  }

  const settings = getBreathingSettings(getActiveRecordingExercise());
  breathingOverlay.classList.remove("is-hidden");
  breathingOverlay.dataset.phase = "inhale";
  breathingBallAnimation?.cancel?.();
  if (breathingBall) {
    breathingBall.style.transition = "none";
    breathingBall.style.transform = "scale(0.64)";
  }
  if (breathingPhase) breathingPhase.textContent = "Einatmen";
  if (breathingRound) breathingRound.textContent = `Bereit - ${settings.repeats} Runden`;
  if (breathingCountdown) breathingCountdown.textContent = `${settings.inhale}s`;
}

function scheduleCourseBreathingStart(exercise, delayMs = 120) {
  if (!exercise || !isBreathingExercise(exercise)) return;
  window.clearTimeout(courseBreathingAutoStartTimerId);
  const sessionId = activeCourseRun?.session?.id || "";
  const exerciseId = exercise.exerciseId || "";
  courseBreathingAutoStartTimerId = window.setTimeout(() => {
    courseBreathingAutoStartTimerId = 0;
    if (
      document.body.dataset.activeView !== "record"
      || isBreathingExerciseRunning
      || !activeCourseRun
      || activeCourseRun.session?.id !== sessionId
      || getActiveCourseExercise()?.exerciseId !== exerciseId
    ) return;
    clearCourseTransitionOverlay();
    startBreathingExercise(exercise, { fromCourse: true, skipInstruction: false }).catch(() => {
      setCoursePlayerStatus("Atemübung konnte nicht gestartet werden.");
    });
  }, Math.max(0, Number(delayMs) || 0));
}

function clearCourseAutoAdvanceTimer() {
  window.clearTimeout(courseAutoAdvanceTimerId);
  courseAutoAdvanceTimerId = 0;
}

function scheduleCourseExerciseStart(exercise) {
  clearCourseAutoAdvanceTimer();
  const sessionId = activeCourseRun?.session?.id || "";
  const exerciseId = exercise?.exerciseId || "";
  courseAutoAdvanceTimerId = window.setTimeout(() => {
    courseAutoAdvanceTimerId = 0;
    if (
      !activeCourseRun?.playlistMode
      || activeCourseRun.session?.id !== sessionId
      || getActiveCourseExercise()?.exerciseId !== exerciseId
      || isRecording
    ) return;
    recordButton.click();
  }, 180);
}

function openNextCourseExercise(exercise, options = {}) {
  if (!exercise) return;
  const autoStart = options.autoStart ?? Boolean(activeCourseRun?.playlistMode);
  if (isBreathingExercise(exercise)) {
    if (isBreathingExerciseRunning) {
      stopBreathingExercise("Atemübung wird neu gestartet.", { keepCourseRun: true });
    }
    clearCourseTransitionOverlay();
    prepareCourseExerciseInRecordView(exercise);
    setBreathingCourseUiVisible(Boolean(activeCourseRun), exercise);
    scheduleCourseBreathingStart(exercise, 180);
    return;
  }
  if (exercise.mediaUrl || exercise.mediaId || isCoursePauseExercise(exercise)) {
    coursePlayer?.classList.remove("is-hidden");
    renderCoursePlayer();
    setActiveView("myCourses");
    return;
  }
  prepareCourseExerciseInRecordView(exercise);
  if (autoStart) scheduleCourseExerciseStart(exercise);
}

function getOrCreateCourseTransitionOverlay() {
  let overlay = document.querySelector(".course-transition-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "course-transition-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.append(overlay);
  }
  return overlay;
}

function clearCourseTransitionOverlay() {
  const overlay = document.querySelector(".course-transition-overlay");
  if (!overlay) return;
  overlay.classList.remove("is-visible", "is-leaving", "is-through");
}

function runCourseTransition(previousExercise, nextStep) {
  const type = getCourseTransitionType(previousExercise?.transitionType);
  const duration = getCourseTransitionDuration(previousExercise?.transitionDuration);
  if (type === "none" || duration <= 150) {
    nextStep?.();
    return;
  }
  const overlay = getOrCreateCourseTransitionOverlay();
  const half = Math.max(90, Math.round(duration / 2));
  overlay.style.setProperty("--course-transition-duration", `${half}ms`);
  overlay.classList.toggle("is-through", type === "fadeThrough");
  overlay.classList.remove("is-leaving");
  overlay.classList.add("is-visible");
  window.setTimeout(() => {
    nextStep?.();
    window.requestAnimationFrame(() => {
      overlay.classList.add("is-leaving");
      overlay.classList.remove("is-visible");
      window.setTimeout(() => {
        overlay.classList.remove("is-leaving", "is-through");
      }, half + 40);
    });
  }, half);
}
function continueCoursePlaylist() {
  if (!activeCourseRun) return;
  clearCourseAutoAdvanceTimer();
  const nextExercise = getActiveCourseExercise();
  if (!nextExercise) {
    coursePlayer?.classList.remove("is-hidden");
    renderCoursePlayer();
    setActiveView("myCourses");
    return;
  }
  openNextCourseExercise(nextExercise, { autoStart: true });
}

function getActiveCourseExercise() {
  if (!activeCourseRun?.plan?.exercises?.length) return null;
  return activeCourseRun.plan.exercises[activeCourseRun.index] || null;
}

function findCourseSessionById(sessionId) {
  if (!sessionId) return null;
  return courseSessions.find((session) => session.id === sessionId) || null;
}

async function completeCourseExerciseFromRecording(metadata) {
  if (!activeCourseRun || !metadata) return;

  const exercise = getActiveCourseExercise();
  const session = activeCourseRun.session;
  if (!exercise || !session) return;

  const recordedExerciseId = metadata.courseExerciseId || "";
  if (!recordedExerciseId || recordedExerciseId !== exercise.exerciseId) return;

  session.completedExerciseIds = Array.isArray(session.completedExerciseIds)
    ? session.completedExerciseIds
    : [];
  session.skippedExerciseIds = Array.isArray(session.skippedExerciseIds)
    ? session.skippedExerciseIds
    : [];
  session.recordings = Array.isArray(session.recordings)
    ? session.recordings
    : [];
  session.measurementResults = Array.isArray(session.measurementResults)
    ? session.measurementResults
    : [];

  if (!session.completedExerciseIds.includes(exercise.exerciseId)) {
    session.completedExerciseIds.push(exercise.exerciseId);
  }

  session.recordings = [
    ...session.recordings.filter((item) => item.exerciseId !== exercise.exerciseId),
    {
      exerciseId: exercise.exerciseId,
      recordingId: metadata.id,
      title: metadata.uebung || exercise.title || exercise.exerciseId,
      durationSeconds: Number(metadata.dauerSekunden || 0),
      createdAt: metadata.datum || new Date().toISOString(),
    },
  ];

  session.measurementResults = [
    ...session.measurementResults.filter((item) => item.exerciseId !== exercise.exerciseId),
    {
      exerciseId: exercise.exerciseId,
      recordingId: metadata.id,
      averageVolume: Number(metadata.durchschnittlicheLautstaerke || 0),
      maxVolume: Number(metadata.maximaleLautstaerke || 0),
      averagePitchHz: Number(metadata.durchschnittlicheStimmfrequenzHz || 0),
      voiceShare: Number(
        metadata.werte?.stimmenanteilProzent
          || metadata.audioAnalyse?.stimmenanteilProzent
          || 0
      ),
    },
  ];

  activeCourseRun.index += 1;
  session.currentExerciseIndex = activeCourseRun.index;
  session.updatedAt = new Date().toISOString();
  session.status = activeCourseRun.index >= (activeCourseRun.plan?.exercises?.length || 0)
    ? "completed"
    : (activeCourseRun.playlistMode ? "in_progress" : "paused");
  syncCourseMediaLock();

  if (session.status === "completed") {
    session.completedAt = session.updatedAt;
    session.totalDuration = Math.round(
      (new Date(session.completedAt) - new Date(session.startedAt || session.updatedAt)) / 1000
    );
  }

  courseSessions = mergeById(courseSessions, [session]);
  persistCourseModuleData();
  await saveCourseSessionToCloud(session).catch(() => {});
  renderCourseViews();
}

function updateCourseResultActions(metadata) {
  if (
    !courseResultActions
    || !courseResultTitle
    || !courseResultText
    || !courseResultBackButton
    || !courseResultNextButton
  ) return;

  const sessionId = metadata?.courseSessionId || activeCourseRun?.session?.id || "";
  const session = findCourseSessionById(sessionId);

  if (!metadata?.courseSessionId || !session || !activeCourseRun?.plan) {
    courseResultActions.classList.add("is-hidden");
    return;
  }

  const exercises = activeCourseRun.plan.exercises || [];
  const nextExercise = getActiveCourseExercise();
  const completedCount = Number(session.completedExerciseIds?.length || 0);
  const remaining = Math.max(0, exercises.length - completedCount);
  const finishedPlan = remaining === 0 || !nextExercise;

  courseResultTitle.textContent = finishedPlan ? "Tagesplan abgeschlossen" : "Übung abgeschlossen";
  courseResultText.textContent = finishedPlan
    ? `Der Tagesplan ${activeCourseRun.plan.title || ""} ist fertig. Sie können jetzt in den Kurs zurückkehren.`
    : `Noch ${remaining} Übung${remaining === 1 ? "" : "en"} offen. Als Nächstes kommt ${nextExercise.title || nextExercise.exerciseId || "die nächste Übung"}.`;
  courseResultBackButton.textContent = finishedPlan ? "Zum Kurs" : "Zum Tagesplan";
  courseResultNextButton.textContent = finishedPlan ? "Tagesplan ansehen" : "Nächste Übung";
  courseResultActions.classList.remove("is-hidden");
}

function isCourseMediaLocked() {
  if (!activeCourseRun?.session) return false;
  return !["completed", "cancelled", "stopped"].includes(activeCourseRun.session.status);
}

function syncCourseMediaLock() {
  const locked = isCourseMediaLocked();
  document.body.classList.toggle("course-media-locked", locked);
  if (playPauseButton) playPauseButton.disabled = locked;
  if (previewExerciseButton) previewExerciseButton.disabled = locked || isPreviewingExercise;
}

function showCourseMediaLockMessage() {
  message.textContent = "Ein Kurs läuft bereits. Bitte den Kurs zuerst beenden, stoppen oder abbrechen.";
  syncCourseMediaLock();
}

function cancelActiveCourseRunFromBreathing() {
  const run = activeCourseRun;
  if (!run?.session) return false;
  clearCourseAutoAdvanceTimer();
  window.clearTimeout(coursePauseTimerId);
  stopCourseUnitMedia();
  stopCoursePauseMusic();
  const session = run.session;
  session.status = "cancelled";
  session.completedAt = new Date().toISOString();
  session.updatedAt = session.completedAt;
  courseSessions = mergeById(courseSessions, [session]);
  persistCourseModuleData();
  saveCourseSessionToCloud(session).catch(() => {});
  coursePlayer?.classList.add("is-hidden");
  clearActiveCourseRun();
  renderMyCourses();
  setActiveView("myCourses");
  return true;
}
function clearActiveCourseRun() {
  setCourseVideoFullscreen(false);
  activeCourseRun = null;
  courseIntroPlaybackPromise = null;
  coursePlaylistVideoAudioUnlocked = false;
  clearCourseRecordingContext();
  myCoursesPanel?.classList.remove("has-active-course");
  syncCourseMediaLock();
}

async function resumeOrStartCourse(course, assignment, selectedDayIndex = null) {
  if (
    isCourseMediaLocked()
    && (
      activeCourseRun.assignment?.patientId !== assignment?.patientId
      || activeCourseRun.course?.id !== course?.id
    )
  ) {
    showCourseMediaLockMessage();
    coursePlayer?.classList.remove("is-hidden");
    renderCoursePlayer();
    return;
  }
  if (
    activeCourseRun
    && activeCourseRun.assignment?.patientId === assignment?.patientId
    && activeCourseRun.course?.id === course?.id
  ) {
    activeCourseRun.playlistMode = true;
    continueCoursePlaylist();
    return;
  }

  const dayState = getCurrentCourseDayPlan(course, assignment, selectedDayIndex);
  const instructionUnlock = unlockInstructionAudio();
  const contextUnlock = unlockCoursePlaylistAudioContext();
  const breathingUnlock = unlockBreathingVoice();
  const introAudio = getDailyPlanIntroAudioData(dayState.plan);
  courseIntroPlaybackPromise = dayState.plan?.description && introAudio?.url
    ? playVoiceAudioElement(introAudio.url, {
      minDurationSeconds: estimateSpeechDurationSeconds(dayState.plan.description),
    })
    : null;
  Promise.resolve(instructionUnlock).catch(() => {});
  Promise.resolve(contextUnlock).catch(() => {});
  Promise.resolve(breathingUnlock).catch(() => {});
  return startCoursePreview(course, null, assignment, selectedDayIndex);
}

function playCourseIntroductionOnVideoElement(audioUrl) {
  const mediaUrl = resolveAppUrl(audioUrl);
  return new Promise((resolve) => {
    let settled = false;
    let timeoutId = window.setTimeout(() => finish(false), INSTRUCTION_TIMEOUT_MS);
    const cleanup = () => {
      coursePlaylistVideo.removeEventListener("playing", handlePlaying);
      coursePlaylistVideo.removeEventListener("loadedmetadata", refreshTimeout);
      coursePlaylistVideo.removeEventListener("ended", handleEnded);
      coursePlaylistVideo.removeEventListener("error", handleError);
      coursePlaylistVideo.removeEventListener("abort", handleError);
    };
    const finish = (played) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      cleanup();
      coursePlaylistVideo.pause();
      coursePlaylistPrimedVideoUrl = "";
      resolve(Boolean(played));
    };
    const handlePlaying = () => {
      coursePlaylistVideoAudioUnlocked = true;
      message.textContent = "Einleitung wird abgespielt.";
    };
    const refreshTimeout = () => {
      if (!Number.isFinite(coursePlaylistVideo.duration) || coursePlaylistVideo.duration <= 0) return;
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(
        () => finish(false),
        Math.max(INSTRUCTION_TIMEOUT_MS, Math.ceil(coursePlaylistVideo.duration * 1000) + 1800),
      );
    };
    const handleEnded = () => finish(true);
    const handleError = () => finish(false);

    coursePlaylistVideo.pause();
    coursePlaylistVideo.className = "media-library-preview course-playlist-video";
    coursePlaylistVideo.style.position = "fixed";
    coursePlaylistVideo.style.width = "1px";
    coursePlaylistVideo.style.height = "1px";
    coursePlaylistVideo.style.opacity = "0";
    coursePlaylistVideo.style.pointerEvents = "none";
    coursePlaylistVideo.controls = false;
    if (!coursePlaylistVideo.isConnected) document.body.append(coursePlaylistVideo);
    coursePlaylistVideo.src = mediaUrl;
    coursePlaylistVideo.preload = "auto";
    coursePlaylistVideo.muted = false;
    coursePlaylistVideo.defaultMuted = false;
    coursePlaylistVideo.volume = 1;
    coursePlaylistVideo.currentTime = 0;
    coursePlaylistVideo.addEventListener("playing", handlePlaying);
    coursePlaylistVideo.addEventListener("loadedmetadata", refreshTimeout);
    coursePlaylistVideo.addEventListener("ended", handleEnded, { once: true });
    coursePlaylistVideo.addEventListener("error", handleError, { once: true });
    coursePlaylistVideo.addEventListener("abort", handleError, { once: true });
    coursePlaylistVideo.play().catch(handleError);
  });
}

async function primeCoursePlaylistVideo(course, assignment, selectedDayIndex = null) {
  const dayState = getCurrentCourseDayPlan(course, assignment, selectedDayIndex);
  const videoExercise = (dayState.plan?.exercises || []).find((exercise) => {
    const media = resolveCourseUnitMedia(exercise);
    return media?.downloadUrl && media.mediaType === "video";
  });
  const media = resolveCourseUnitMedia(videoExercise);
  if (!media?.downloadUrl) return false;
  const mediaUrl = resolveAppUrl(media.downloadUrl);
  try {
    coursePlaylistVideo.className = "media-library-preview course-playlist-video";
    coursePlaylistVideo.style.position = "fixed";
    coursePlaylistVideo.style.width = "1px";
    coursePlaylistVideo.style.height = "1px";
    coursePlaylistVideo.style.opacity = "0";
    coursePlaylistVideo.style.pointerEvents = "none";
    if (!coursePlaylistVideo.isConnected) document.body.append(coursePlaylistVideo);
    if (coursePlaylistVideo.src !== mediaUrl) coursePlaylistVideo.src = mediaUrl;
    // This runs directly inside the user's "Playlist starten" tap. Starting
    // the persistent element audibly once authorizes later audible playback
    // on iPhone even after the spoken course introduction has finished.
    coursePlaylistVideo.muted = false;
    coursePlaylistVideo.defaultMuted = false;
    coursePlaylistVideo.volume = 0.01;
    await coursePlaylistVideo.play();
    coursePlaylistVideo.pause();
    coursePlaylistVideo.currentTime = 0;
    coursePlaylistVideo.volume = 1;
    coursePlaylistPrimedVideoUrl = mediaUrl;
    coursePlaylistVideoAudioUnlocked = true;
    return true;
  } catch (error) {
    coursePlaylistVideoAudioUnlocked = false;
    try {
      coursePlaylistVideo.muted = true;
      coursePlaylistVideo.defaultMuted = true;
      await coursePlaylistVideo.play();
      coursePlaylistVideo.pause();
      coursePlaylistVideo.currentTime = 0;
      coursePlaylistPrimedVideoUrl = mediaUrl;
      return true;
    } catch (mutedError) {
      coursePlaylistPrimedVideoUrl = "";
      return false;
    }
  }
}

async function primeCoursePauseAudio(course, assignment, selectedDayIndex = null) {
  const dayState = getCurrentCourseDayPlan(course, assignment, selectedDayIndex);
  const pauseExercise = (dayState.plan?.exercises || []).find((exercise) => isCoursePauseExercise(exercise));
  const media = resolveCourseUnitMedia(pauseExercise);
  if (!media?.downloadUrl || media.mediaType !== "audio") return false;
  const mediaUrl = resolveAppUrl(media.downloadUrl);
  try {
    coursePlaylistAudio.pause();
    coursePlaylistAudio.src = mediaUrl;
    coursePlaylistAudio.preload = "auto";
    coursePlaylistAudio.loop = true;
    coursePlaylistAudio.muted = true;
    coursePlaylistAudio.defaultMuted = true;
    coursePlaylistAudio.playsInline = true;
    await coursePlaylistAudio.play();
    coursePlaylistAudio.pause();
    coursePlaylistAudio.currentTime = 0;
    coursePlaylistAudio.muted = false;
    coursePlaylistAudio.defaultMuted = false;
    coursePlaylistAudio.volume = 1;
    coursePlaylistPrimedUrl = mediaUrl;
    coursePlaylistAudioUnlocked = true;
    return true;
  } catch (error) {
    coursePlaylistAudio.muted = false;
    coursePlaylistAudio.defaultMuted = false;
    coursePlaylistPrimedUrl = "";
    return false;
  }
}

async function unlockCoursePlaylistAudioContext() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextConstructor) return false;
  try {
    if (!coursePlaylistAudioContext || coursePlaylistAudioContext.state === "closed") {
      coursePlaylistAudioContext = new AudioContextConstructor();
    }
    if (coursePlaylistAudioContext.state === "suspended") {
      await coursePlaylistAudioContext.resume();
    }
    const source = coursePlaylistAudioContext.createBufferSource();
    source.buffer = coursePlaylistAudioContext.createBuffer(1, 1, coursePlaylistAudioContext.sampleRate);
    source.connect(coursePlaylistAudioContext.destination);
    source.start(0);
    return coursePlaylistAudioContext.state === "running";
  } catch (error) {
    return false;
  }
}

async function unlockCoursePlaylistAudio() {
  if (coursePlaylistAudioUnlocked) return true;
  const silentWav = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAACAgICA";
  try {
    coursePlaylistAudio.muted = true;
    coursePlaylistAudio.src = silentWav;
    await coursePlaylistAudio.play();
    coursePlaylistAudio.pause();
    coursePlaylistAudioUnlocked = true;
    return true;
  } catch (error) {
    return false;
  } finally {
    coursePlaylistAudio.muted = false;
    coursePlaylistAudio.removeAttribute("src");
    coursePlaylistAudio.load();
  }
}

async function assignSelectedCourseToPatients() {
  const courseId = patientCourseAssignSelect?.value || "";
  const course = getCourseById(courseId);
  if (!course) {
    setCourseAssignState("Bitte zuerst einen Kurs auswaehlen.", "warning");
    return;
  }
  const patientNameValue = patientManagerName?.value?.trim() || getCurrentPatientName();
  const patientId = findPatientProfileByName(patientNameValue)?.id || getCurrentPatientId();
  const startDate = patientCourseAssignStartDate?.value || new Date().toISOString().slice(0, 10);
  const updatedAt = new Date().toISOString();
  setCourseAssignState("Kurszuordnung wird gespeichert...", "saving");
  const existingAssignment = getAssignmentsForPatient(patientId, patientNameValue)
    .find((item) => item.courseId === course.id);
  const assignment = {
    ...existingAssignment,
    id: existingAssignment?.id || createId("courseAssignment"),
    patientId,
    patientName: patientNameValue,
    courseId: course.id,
    courseName: course.name,
    startDate,
    active: true,
    updatedAt,
    createdAt: existingAssignment?.createdAt || updatedAt,
  };
  courseAssignments = mergeById(courseAssignments, [assignment]);
  persistCourseModuleData();
  const cloudSynced = await syncCourseAssignmentsForPatient(patientId);
  if (!cloudSynced) {
    setCourseAssignState(
      `Kurs lokal zugeordnet: ${course.name} -> ${patientNameValue}. Firebase wird erneut synchronisiert.`,
      "warning",
    );
    window.setTimeout(() => {
      syncCourseAssignmentsForPatient(patientId).then((retrySucceeded) => {
        if (!retrySucceeded) return;
        setCourseAssignState(`Kurs zugeordnet: ${course.name} -> ${patientNameValue}`, "success");
      });
    }, 2500);
  } else {
    setCourseAssignState(`Kurs zugeordnet: ${course.name} -> ${patientNameValue}`, "success");
  }
  renderCourseViews();
}

function renderPatientAssignedCourseList() {
  if (!patientAssignedCourseList) return;
  const selectedPatientName = patientManagerName?.value?.trim() || getCurrentPatientName();
  const patientId = findPatientProfileByName(selectedPatientName)?.id || getCurrentPatientId();
  const assignments = getAssignmentsForPatient(patientId, selectedPatientName)
    .sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  patientAssignedCourseList.innerHTML = "";
  if (!assignments.length) {
    patientAssignedCourseList.innerHTML = `<div class="course-empty">Diesem Patienten ist noch kein Kurs zugeordnet.</div>`;
    return;
  }
  assignments.forEach((assignment) => {
    const card = document.createElement("article");
    card.className = "course-card";
    card.innerHTML = `
      <div class="course-card-head">
        <span class="course-symbol">${assignment.courseName.slice(0, 2).toUpperCase()}</span>
        <div>
          <h3>${assignment.courseName}</h3>
          <p>Start: ${formatCourseDate(assignment.startDate)}</p>
        </div>
        <strong class="course-status ${assignment.active !== false ? "is-active" : ""}">${assignment.active !== false ? "Aktiv" : "Alt"}</strong>
      </div>
    `;
    patientAssignedCourseList.append(card);
  });
}

function renderMyCoursesLegacy() {
  if (!myCourseList) return;
  myCourseList.innerHTML = "";
  if (!activeCourseRun) coursePlayer?.classList.add("is-hidden");
  const assignment = getCurrentPatientAssignment();
  const course = assignment ? getCourseById(assignment.courseId) : null;
  if (!assignment || !course) {
    myCourseList.innerHTML = `<div class="course-empty">Für diesen Patienten ist noch kein aktiver Kurs freigegeben.</div>`;
    return;
  }
  const { index, total, plan } = getCurrentCourseDayPlan(course, assignment);
  const lastSession = plan ? getLatestCourseSession(course.id, assignment.patientId, plan.id) : null;
  const completedCount = Number(lastSession?.completedExerciseIds?.length || 0);
  const progress = plan?.exerciseCount ? Math.round((completedCount / Math.max(1, plan.exerciseCount)) * 100) : 0;
  const card = document.createElement("article");
  card.className = "course-card course-card-primary";
  const todaysExerciseCount = plan?.exerciseCount || (plan?.exercises || []).length || 0;
  const todaysDuration = formatCourseDuration(plan?.estimatedDuration || getCourseEstimatedDuration(plan || { exercises: [] }));
  const buttonLabel = activeCourseRun ? "Playlist fortsetzen" : "Playlist starten";
  card.innerHTML = `
    <div class="course-card-head">
      <span class="course-symbol">${course.symbol || "LS"}</span>
      <div>
        <p class="course-label">Aktiver Kurs für ${assignment.patientName || getCurrentPatientName()}</p>
        <h3>${course.name}</h3>
        <p>Heute: ${plan?.title || "Kein Tagesplan"} · Tag ${Math.min(index + 1, Math.max(total, 1))} von ${Math.max(total, 1)}</p>
      </div>
    </div>
    <p>${course.description || "Ihr aktueller Kurs."}</p>
    <dl class="course-overview-grid">
      <div>
        <dt>Start</dt>
        <dd>${formatCourseDate(assignment.startDate)}</dd>
      </div>
      <div>
        <dt>Übungen heute</dt>
        <dd>${todaysExerciseCount}</dd>
      </div>
      <div>
        <dt>Dauer heute</dt>
        <dd>${todaysDuration}</dd>
      </div>
    </dl>
    <div class="course-progress"><span style="width:${progress}%"></span></div>
    <small>${lastSession?.startedAt ? `Zuletzt gestartet: ${new Date(lastSession.startedAt).toLocaleString("de-DE")}` : "Noch nicht gestartet"}</small>
    <div class="course-actions course-actions-single">
      <button class="primary-action" type="button">${buttonLabel}</button>
    </div>
  `;
  card.querySelector("button").addEventListener("click", () => resumeOrStartCourse(course, assignment));
  myCourseList.append(card);
}

function renderCoursePatientSwitcher() {
  if (!coursePatientSwitcher) return;
  const currentPatient = getCurrentPatientName();
  const names = getKnownPatientNames();
  coursePatientSwitcher.innerHTML = "";
  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    coursePatientSwitcher.append(option);
  });
  if (!names.includes(currentPatient)) {
    const option = document.createElement("option");
    option.value = currentPatient;
    option.textContent = currentPatient;
    coursePatientSwitcher.append(option);
  }
  coursePatientSwitcher.value = currentPatient;
}

function closeCourseTodayOverlay() {
  if (!courseTodayOverlay) return;
  courseTodayOverlay.classList.add("is-hidden");
  courseTodayOverlay.setAttribute("aria-hidden", "true");
  courseTodayOverlay.setAttribute("hidden", "");
  document.body.classList.remove("has-course-today-overlay");
}

function getCourseTodayItemType(exercise) {
  if (isCoursePauseExercise(exercise)) return "Pauseneinheit";
  if (isBreathingExercise(exercise)) return "Atemübung";
  if (exercise?.mediaType === "video") return "Video";
  if (exercise?.mediaType === "image") return "Bild";
  if (exercise?.mediaType === "audio") return "Audio";
  if (exercise?.mode === "dialog") return "Dialog";
  if (exercise?.mode === "karaoke") return "Karaoke-Text";
  if (exercise?.mode === "long_text") return "Langer Text";
  return "Übung";
}

async function startCourseExerciseFromToday(course, assignment, selectedDayIndex, exerciseIndex) {
  if (!course || !assignment || isCourseMediaLocked()) return;
  const dayState = getCurrentCourseDayPlan(course, assignment, selectedDayIndex);
  if (!dayState.plan?.exercises?.[exerciseIndex]) return;

  const now = new Date().toISOString();
  const session = {
    id: createId("courseSession"),
    patientId: assignment.patientId,
    patientName: assignment.patientName,
    courseId: course.id,
    courseName: course.name,
    planId: dayState.plan.id,
    planTitle: dayState.plan.title,
    startedAt: now,
    introPlayedAt: now,
    currentExerciseIndex: exerciseIndex,
    status: "started",
    completedExerciseIds: [],
    skippedExerciseIds: [],
    pauseDurations: [],
    recordings: [],
    measurementResults: [],
    createdAt: now,
    updatedAt: now,
  };

  const instructionUnlock = unlockInstructionAudio();
  const contextUnlock = unlockCoursePlaylistAudioContext();
  Promise.allSettled([
    instructionUnlock,
    contextUnlock,
    unlockBreathingVoice(),
    unlockCoursePlaylistAudio(),
    primeCoursePlaylistVideo(course, assignment, selectedDayIndex),
    primeCoursePauseAudio(course, assignment, selectedDayIndex),
  ]).catch(() => {});
  closeCourseTodayOverlay();
  return startCoursePreview(course, session, assignment, selectedDayIndex);
}
function openCourseTodayOverlay(course, assignment, selectedDayIndex = null) {
  if (!courseTodayOverlay || !courseTodayOverlayList) return;
  const { index, total, plan } = getCurrentCourseDayPlan(course, assignment, selectedDayIndex);
  const exercises = Array.isArray(plan?.exercises) ? plan.exercises : [];
  courseTodayOverlayTitle.textContent = plan?.title || plan?.name || "Übungen heute";
  courseTodayOverlayMeta.textContent = `${course?.name || "Kurs"} · Tag ${index + 1} von ${Math.max(total, 1)} · ${exercises.length} Übungen`;
  courseTodayOverlayList.replaceChildren();

  if (!exercises.length) {
    const empty = document.createElement("p");
    empty.className = "course-empty";
    empty.textContent = "Für diesen Trainingstag sind noch keine Übungen hinterlegt.";
    courseTodayOverlayList.append(empty);
  } else {
    exercises.forEach((exercise, exerciseIndex) => {
      const item = document.createElement("button");
      const isPause = isCoursePauseExercise(exercise);
      item.type = "button";
      item.className = `course-today-overlay-item${isPause ? " is-pause" : ""}`;
      item.title = `${exercise?.title || exercise?.name || (isPause ? "Pause" : "Übung")} starten`;
      const order = document.createElement("span");
      order.className = "course-today-order";
      order.textContent = String(exerciseIndex + 1);
      const copy = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = exercise?.title || exercise?.name || (isPause ? "Pause" : "Übung");
      const detail = document.createElement("small");
      const seconds = Number(exercise?.estimatedDuration || exercise?.durationSeconds || exercise?.duration || 0);
      detail.textContent = `${getCourseTodayItemType(exercise)}${seconds > 0 ? ` · ${formatCourseDuration(seconds)}` : ""}`;
      copy.append(title, detail);
      item.append(order, copy);
      item.addEventListener("click", () => {
        startCourseExerciseFromToday(course, assignment, index, exerciseIndex).catch(() => {});
      });
      courseTodayOverlayList.append(item);
    });
  }

  courseTodayOverlay.removeAttribute("hidden");
  courseTodayOverlay.classList.remove("is-hidden");
  courseTodayOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-course-today-overlay");
  closeCourseTodayOverlayButton?.focus();
}
function renderMyCourses() {
  if (!myCourseList) return;
  syncCourseMediaLock();
  renderCoursePatientSwitcher();
  myCourseList.innerHTML = "";
  myCoursesPanel?.classList.toggle("has-active-course", Boolean(activeCourseRun));
  if (!activeCourseRun) {
    coursePlayer?.classList.add("is-hidden");
    clearCourseRecordingContext();
  }

  const patientId = getCurrentPatientId();
  const patientLabel = getCurrentPatientName();
  const assignments = getAssignmentsForPatient(patientId, patientLabel)
    .filter((assignment) => getCourseById(assignment.courseId))
    .sort((left, right) => String(right.updatedAt || "").localeCompare(String(left.updatedAt || "")));

  if (!assignments.length) {
    myCourseList.innerHTML = `<div class="course-empty">Für ${patientLabel} ist noch kein Kurs freigegeben.</div>`;
    return;
  }

  assignments.forEach((assignment) => {
    const course = getCourseById(assignment.courseId);
    const dayPlans = getCourseDayPlans(course).map((item) => normalizeCoursePlan(item)).filter(Boolean);
    const { index, total, plan } = getCurrentCourseDayPlan(course, assignment);
    const lastSession = plan ? getLatestCourseSession(course.id, assignment.patientId, plan.id) : null;
    const completedCount = Number(lastSession?.completedExerciseIds?.length || 0);
    const exerciseCount = plan?.exerciseCount || (plan?.exercises || []).length || 0;
    const progress = exerciseCount ? Math.round((completedCount / Math.max(1, exerciseCount)) * 100) : 0;
    const isRunning = activeCourseRun?.course?.id === course.id;
    const isExpanded = expandedMyCourseAssignmentId === assignment.id;
    const card = document.createElement("article");
    card.className = `course-card course-card-primary course-card-collapsible${isRunning ? " is-running" : ""}${isExpanded ? " is-expanded" : ""}`;
    card.innerHTML = `
      <div class="course-card-head">
        <span class="course-symbol">${course.symbol || "LS"}</span>
        <div>
          <p class="course-label">${isRunning ? "Laufender Kurs" : `Kurs für ${assignment.patientName || patientLabel}`}</p>
          <h3>${course.name}</h3>
          <p>Heute: ${plan?.title || "Kein Tagesplan"} · Tag ${Math.min(index + 1, Math.max(total, 1))} von ${Math.max(total, 1)}</p>
        </div>
        <div class="course-card-heading-actions">
          ${isRunning ? '<strong class="course-status is-active">Läuft</strong>' : ""}
          <button class="course-collapse-button" type="button" aria-expanded="${isExpanded}" title="${isExpanded ? "Kurs schließen" : "Kurs öffnen"}" aria-label="${isExpanded ? "Kurs schließen" : "Kurs öffnen"}">${isExpanded ? "&#8722;" : "+"}</button>
        </div>
      </div>
      ${isExpanded ? `
        <div class="course-card-details">
          <p>${course.description || "Ihr aktueller Kurs."}</p>
          <label class="course-day-picker">
            <span>Trainingstag auswählen</span>
            <select aria-label="Trainingstag auswählen">
              ${dayPlans.map((dayPlan, dayIndex) => `
                <option value="${dayIndex}"${dayIndex === index ? " selected" : ""}>
                  Tag ${dayIndex + 1} · ${dayPlan.title || `Tagesplan ${dayIndex + 1}`}
                </option>
              `).join("")}
            </select>
          </label>
          <dl class="course-overview-grid">
            <div><dt>Start</dt><dd>${formatCourseDate(assignment.startDate)}</dd></div>
            <div class="course-today-stat"><dt>Übungen heute</dt><dd><button class="course-today-count-button" type="button" aria-label="Übungen der gewählten Tageseinheit anzeigen">${exerciseCount}</button></dd></div>
            <div><dt>Dauer heute</dt><dd data-course-selected-duration>${formatCourseDuration(plan?.estimatedDuration || getCourseEstimatedDuration(plan || { exercises: [] }))}</dd></div>
          </dl>
          <div class="course-progress"><span data-course-selected-progress style="width:${progress}%"></span></div>
          <small data-course-selected-session>${lastSession?.startedAt ? `Zuletzt gestartet: ${new Date(lastSession.startedAt).toLocaleString("de-DE")}` : "Noch nicht gestartet"}</small>
          <div class="course-actions course-actions-single">
            <button class="primary-action" type="button">${isRunning ? "Playlist fortsetzen" : "Playlist starten"}</button>
          </div>
        </div>` : ""}
    `;
    const toggleButton = card.querySelector(".course-collapse-button");
    toggleButton.addEventListener("click", () => {
      expandedMyCourseAssignmentId = isExpanded ? "" : assignment.id;
      renderMyCourses();
    });
    if (isExpanded) {
      const startButton = card.querySelector(".primary-action");
      const daySelect = card.querySelector(".course-day-picker select");
      const anotherCourseIsRunning = isCourseMediaLocked() && !isRunning;
      startButton.disabled = anotherCourseIsRunning;
      daySelect.disabled = Boolean(isRunning || anotherCourseIsRunning || dayPlans.length < 2);
      if (anotherCourseIsRunning) {
        startButton.textContent = "Anderer Kurs läuft";
        startButton.title = "Den laufenden Kurs zuerst beenden, stoppen oder abbrechen.";
      }
      const refreshSelectedDaySummary = () => {
        const selectedDay = getCurrentCourseDayPlan(course, assignment, daySelect.value);
        const selectedPlan = selectedDay.plan || { exercises: [] };
        const selectedExerciseCount = Number(selectedPlan.exerciseCount || selectedPlan.exercises?.length || 0);
        const selectedSession = getLatestCourseSession(course.id, assignment.patientId, selectedPlan.id);
        const selectedCompleted = Number(selectedSession?.completedExerciseIds?.length || 0);
        const selectedProgress = selectedExerciseCount
          ? Math.round((selectedCompleted / Math.max(1, selectedExerciseCount)) * 100)
          : 0;
        const countButton = card.querySelector(".course-today-count-button");
        if (countButton) countButton.textContent = String(selectedExerciseCount);
        const duration = card.querySelector("[data-course-selected-duration]");
        if (duration) duration.textContent = formatCourseDuration(selectedPlan.estimatedDuration || getCourseEstimatedDuration(selectedPlan));
        const progressBar = card.querySelector("[data-course-selected-progress]");
        if (progressBar) progressBar.style.width = `${selectedProgress}%`;
        const sessionLabel = card.querySelector("[data-course-selected-session]");
        if (sessionLabel) sessionLabel.textContent = selectedSession?.startedAt
          ? `Zuletzt gestartet: ${new Date(selectedSession.startedAt).toLocaleString("de-DE")}`
          : "Noch nicht gestartet";
      };
      daySelect.addEventListener("change", refreshSelectedDaySummary);
      card.querySelector(".course-today-count-button")?.addEventListener("click", () => {
        openCourseTodayOverlay(course, assignment, daySelect.value);
      });
      startButton.addEventListener("click", () => resumeOrStartCourse(course, assignment, daySelect.value));
    }
    myCourseList.append(card);
  });
}
async function ensureDailyPlanIntroAudio(plan, options = {}) {
  const description = String(plan?.description || "").trim();
  if (!description) return "";
  const requestSettings = getDailyPlanVoiceRequestSettings(plan);
  const existingAudio = getDailyPlanIntroAudioData(plan);
  if (!options.force && isDailyPlanIntroAudioCurrent(existingAudio, description, requestSettings)) return existingAudio.url;

  try {
    const storedAudio = await createStoredVoiceAudio(
      description,
      `${plan.title || plan.name || "Tagesplan"} Einleitung`,
      requestSettings,
    );
    const voice = getDailyPlanVoice(plan);
    const updatedPlan = {
      ...plan,
      introVoiceProfileKey: voice?.key || plan.introVoiceProfileKey || "",
      introVoiceProfileName: voice?.name || plan.introVoiceProfileName || "",
      introVoiceProfileGender: voice?.gender || plan.introVoiceProfileGender || "neutral",
      introVoiceId: requestSettings.voiceId,
      introVoiceSettings: requestSettings.voiceSettings,
      introAudioUrl: storedAudio.url,
      introAudioPath: storedAudio.path || "",
      introAudioVoiceId: storedAudio.voiceId,
      introAudioVoiceSettings: storedAudio.voiceSettings,
      introAudioTextHash: storedAudio.textHash,
      introAudioUpdatedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    Object.assign(plan, updatedPlan);
    const storedIndex = dailyPlans.findIndex((item) => item.id === plan.id);
    if (storedIndex >= 0) {
      dailyPlans[storedIndex] = { ...dailyPlans[storedIndex], ...updatedPlan, name: dailyPlans[storedIndex].name || plan.title };
      persistCourseModuleData();
      await saveDailyPlanToCloud(dailyPlans[storedIndex]).catch(() => {});
    }
    return storedAudio.url;
  } catch (error) {
    return "";
  }
}

function setCourseVideoFullscreen(active) {
  document.body.classList.toggle("course-video-fullscreen", Boolean(active));
}

function renderDailyPlanIntroduction() {
  setCourseVideoFullscreen(false);
  if (!coursePlayer || !activeCourseRun) return;
  const { course, plan } = activeCourseRun;
  const introImage = getDailyPlanIntroImage(plan);
  const introImageUrl = introImage?.downloadUrl ? resolveAppUrl(introImage.downloadUrl) : "";
  myCoursesPanel?.classList.add("has-active-course");
  coursePlayer.classList.remove("is-hidden");
  coursePlayer.innerHTML = `
    <div class="course-player-card course-intro-card${introImageUrl ? " has-intro-image" : ""}">
      ${introImageUrl ? `<img class="course-intro-background" src="${mediaLibraryEscape(introImageUrl)}" alt="">` : ""}
      <div class="course-player-context">
        <span>Kurs</span>
        <strong>${course?.name || "Kurs"}</strong>
        <small>${plan?.title || plan?.name || "Tagesplan"}</small>
      </div>
      <div class="course-intro-content">
      <p class="eyebrow">Einleitung zur Tageseinheit</p>
      <h2>${plan?.title || plan?.name || "Tagesplan"}</h2>
      ${introImageUrl ? "" : '<p class="course-intro-description"></p>'}
      <p class="course-intro-state" aria-live="polite">Einleitung wird vorgelesen...</p>
      </div>
      <div class="course-actions course-actions-bd course-intro-actions">
        <button class="secondary-action" type="button" data-action="finishIntro">Erledigt</button>
        <button class="secondary-action" type="button" data-action="skipIntro">Überspringen</button>
        <button class="secondary-action danger-action" type="button" data-action="stopIntro">Stoppen</button>
      </div>
    </div>
  `;
  const introDescription = coursePlayer.querySelector(".course-intro-description");
  if (introDescription) introDescription.textContent = plan?.description || "";
  coursePlayer.querySelector("[data-action='finishIntro']")?.addEventListener("click", () => finishDailyPlanIntroductionManually());
  coursePlayer.querySelector("[data-action='skipIntro']")?.addEventListener("click", () => finishDailyPlanIntroductionManually());
  coursePlayer.querySelector("[data-action='stopIntro']")?.addEventListener("click", async () => {
    const session = activeCourseRun?.session;
    stopInstructionAudio();
    window.speechSynthesis?.cancel();
    if (session) {
      session.status = "stopped";
      session.updatedAt = new Date().toISOString();
      courseSessions = mergeById(courseSessions, [session]);
      persistCourseModuleData();
      await saveCourseSessionToCloud(session).catch(() => {});
    }
    clearActiveCourseRun();
    coursePlayer.classList.add("is-hidden");
    renderMyCourses();
  });
}

async function finishDailyPlanIntroductionManually() {
  const run = activeCourseRun;
  if (!run?.session || run.phase !== "introduction") return;
  stopInstructionAudio();
  stopCourseUnitMedia();
  window.speechSynthesis?.cancel();
  run.session.introPlayedAt = new Date().toISOString();
  run.session.updatedAt = run.session.introPlayedAt;
  run.phase = "exercise";
  run.introManualAdvance = true;
  courseSessions = mergeById(courseSessions, [run.session]);
  persistCourseModuleData();
  await saveCourseSessionToCloud(run.session).catch(() => {});
  coursePlayer?.classList.add("is-hidden");
  continueCoursePlaylist();
}
async function playDailyPlanIntroduction() {
  const run = activeCourseRun;
  if (!run?.plan?.description || run.session?.introPlayedAt) return true;
  const sessionId = run.session.id;
  setActiveView("myCourses");
  renderDailyPlanIntroduction();
  let played = false;
  if (courseIntroPlaybackPromise) {
    const playbackPromise = courseIntroPlaybackPromise;
    courseIntroPlaybackPromise = null;
    played = await playbackPromise;
  } else {
    const audioUrl = await ensureDailyPlanIntroAudio(run.plan);
    if (!activeCourseRun || activeCourseRun.session?.id !== sessionId) return false;
    if (audioUrl) played = await playVoiceAudio(audioUrl, {
      minDurationSeconds: estimateSpeechDurationSeconds(run.plan.description),
    });
  }
  if (!played && activeCourseRun?.session?.id === sessionId) {
    const replacementUrl = await ensureDailyPlanIntroAudio(run.plan, { force: true });
    if (!activeCourseRun || activeCourseRun.session?.id !== sessionId) return false;
    if (replacementUrl) {
      played = await playVoiceAudio(replacementUrl, {
        minDurationSeconds: estimateSpeechDurationSeconds(run.plan.description),
      });
    }
  }
  if (!played && activeCourseRun?.session?.id === sessionId) {
    await speakWithBrowserVoice(run.plan.description);
  }
  if (!activeCourseRun || activeCourseRun.session?.id !== sessionId) return false;
  run.session.introPlayedAt = new Date().toISOString();
  run.session.updatedAt = run.session.introPlayedAt;
  run.phase = "exercise";
  Promise.allSettled([
    unlockCoursePlaylistAudio(),
    primeCoursePlaylistVideo(run.course, run.assignment, run.dayIndex),
    primeCoursePauseAudio(run.course, run.assignment, run.dayIndex),
  ]).catch(() => {});
  courseSessions = mergeById(courseSessions, [run.session]);
  persistCourseModuleData();
  await saveCourseSessionToCloud(run.session).catch(() => {});
  return true;
}

async function startCoursePreview(
  course,
  session = null,
  assignment = getCurrentPatientAssignment(),
  selectedDayIndex = null,
) {
  if (!coursePlayer || !assignment) return;
  // Refresh the course and day plan so edits from another device are used immediately.
  try {
    await refreshCourseDataForCurrentPatient();
    course = courses.find((item) => item.id === course?.id) || course;
  } catch (error) {
    // Local data remains available while offline.
  }
  const dayState = getCurrentCourseDayPlan(course, assignment, selectedDayIndex);
  if (!dayState.plan) return;
  const currentSession = session || {
    id: createId("courseSession"),
    patientId: assignment.patientId,
    patientName: assignment.patientName,
    courseId: course.id,
    courseName: course.name,
    planId: dayState.plan.id,
    planTitle: dayState.plan.title,
    startedAt: new Date().toISOString(),
    status: "started",
    completedExerciseIds: [],
    skippedExerciseIds: [],
    pauseDurations: [],
    recordings: [],
    measurementResults: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const shouldPlayIntroduction = Boolean(dayState.plan.description && !currentSession.introPlayedAt);
  activeCourseRun = {
    course,
    assignment,
    plan: dayState.plan,
    dayIndex: dayState.index,
    session: currentSession,
    index: Number.isFinite(Number(currentSession.currentExerciseIndex))
      ? Math.max(0, Number(currentSession.currentExerciseIndex))
      : Math.max(
        0,
        Number(currentSession.completedExerciseIds?.length || 0)
          + Number(currentSession.skippedExerciseIds?.length || 0),
      ),
    phase: shouldPlayIntroduction ? "introduction" : "exercise",
    playlistMode: true,
  };
  syncCourseMediaLock();
  const nextExercise = (dayState.plan.exercises || [])[activeCourseRun.index];
  if (nextExercise) {
    currentSession.status = "in_progress";
    currentSession.updatedAt = new Date().toISOString();
  }
  courseSessions = mergeById(courseSessions, [currentSession]);
  persistCourseModuleData();
  saveCourseSessionToCloud(currentSession).catch(() => {});
  if (nextExercise) {
    if (shouldPlayIntroduction) {
      const introductionFinished = await playDailyPlanIntroduction();
      if (activeCourseRun?.introManualAdvance) return;
      if (!introductionFinished) return;
    }
    if (!activeCourseRun || activeCourseRun.session?.id !== currentSession.id) return;
    coursePlayer.classList.add("is-hidden");
    continueCoursePlaylist();
    return;
  }
  coursePlayer.classList.remove("is-hidden");
  renderCoursePlayer();
  setActiveView("myCourses");
}

function renderCourseUnitMedia(exercise) {
  const media = resolveCourseUnitMedia(exercise);
  if (!media?.downloadUrl) return "";
  if (media.mediaType === "video") {
    return '<div class="course-unit-media" data-course-video-container></div><p class="course-media-state" aria-live="polite"></p>';
  }
  return `<div class="course-unit-media">${media.mediaType === "audio" ? "" : renderMediaPreview(media)}</div><p class="course-media-state" aria-live="polite"></p>`;
}

function isIosMediaDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function resolveCourseUnitMedia(exercise) {
  const exerciseMediaId = String(exercise?.mediaId || "").trim();
  const exerciseId = String(exercise?.exerciseId || "").replace(/^media:/, "").trim();
  const exerciseMediaUrl = String(exercise?.mediaUrl || "").trim();
  const exerciseTitle = String(exercise?.title || "").trim().toLocaleLowerCase("de-DE");
  const libraryItem = mediaLibraryItems.find((item) => (
    (exerciseMediaId && String(item.id) === exerciseMediaId)
    || (exerciseId && String(item.id) === exerciseId)
    || (exerciseMediaUrl && String(item.downloadUrl || "") === exerciseMediaUrl)
    || (exerciseTitle && String(item.title || "").trim().toLocaleLowerCase("de-DE") === exerciseTitle)
  ));
  if (libraryItem?.downloadUrl) return libraryItem;
  if (!exercise?.mediaUrl) return null;
  return {
    ...exercise,
    downloadUrl: exercise.mediaUrl,
    mediaType: exercise.mediaType || "audio",
  };
}

function isCoursePauseExercise(exercise) {
  if (!exercise) return false;
  const media = resolveCourseUnitMedia(exercise);
  const explicitPause = exercise.unitType === "pause"
    || exercise.mode === "media_pause"
    || exercise.kind === "pause"
    || media?.kind === "pause";
  if (explicitPause) return true;

  const title = String(exercise.title || media?.title || "").toLocaleLowerCase("de-DE");
  const isKnownPauseTitle = /\b(pause|ruhe|stille|klaenge|klange)\b/.test(title.normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
  // A video named "Entspannung" is still a video exercise unless it was
  // explicitly inserted as a pause module. Otherwise course videos can be
  // routed through the pause countdown and appear as a black, non-progressing unit.
  return Boolean(
    isKnownPauseTitle
    && media?.mediaType === "audio"
    && (exercise.mediaUrl || exercise.mediaId || media?.downloadUrl)
  );
}

function stopCourseUnitMedia(clearSource = true) {
  coursePlaylistAudioLoadToken += 1;
  if (coursePlaylistAudioSource) {
    try {
      coursePlaylistAudioSource.stop();
    } catch (error) {
      // The source may already have ended.
    }
    coursePlaylistAudioSource.disconnect();
    coursePlaylistAudioSource = null;
  }
  if (coursePlaylistAudioGain) {
    coursePlaylistAudioGain.disconnect();
    coursePlaylistAudioGain = null;
  }
  coursePlayer?.querySelectorAll("video").forEach((videoElement) => {
    videoElement.pause();
    videoElement.loop = false;
    if (clearSource) {
      videoElement.removeAttribute("src");
      videoElement.load();
    }
  });
  if (courseVisibleVideo) {
    courseVisibleVideo.pause();
    courseVisibleVideo.loop = false;
    if (clearSource) {
      courseVisibleVideo.removeAttribute("src");
      courseVisibleVideo.load();
      courseVisibleVideo.remove();
      courseVisibleVideo = null;
    }
  }
  coursePlaylistVideo.pause();
  coursePlaylistVideo.loop = false;
  if (clearSource) {
    coursePlaylistVideo.removeAttribute("src");
    coursePlaylistVideo.load();
    coursePlaylistPrimedVideoUrl = "";
  }
  if (coursePlaylistAudioEndHandler) {
    coursePlaylistAudio.removeEventListener("ended", coursePlaylistAudioEndHandler);
    coursePlaylistAudioEndHandler = null;
  }
  if (coursePlaylistAudioErrorHandler) {
    coursePlaylistAudio.removeEventListener("error", coursePlaylistAudioErrorHandler);
    coursePlaylistAudioErrorHandler = null;
  }
  coursePlaylistAudio.pause();
  coursePlaylistAudio.loop = false;
  if (clearSource) {
    coursePlaylistAudio.removeAttribute("src");
    coursePlaylistAudio.load();
    coursePlaylistPrimedUrl = "";
  }
}

async function playCoursePauseAudio(media) {
  const contextReady = await unlockCoursePlaylistAudioContext();
  if (!contextReady || !coursePlaylistAudioContext) return false;
  const loadToken = ++coursePlaylistAudioLoadToken;
  try {
    const response = await fetch(resolveAppUrl(media.downloadUrl), { cache: "force-cache" });
    if (!response.ok) throw new Error(`Audio ${response.status}`);
    const audioData = await response.arrayBuffer();
    const audioBuffer = await coursePlaylistAudioContext.decodeAudioData(audioData.slice(0));
    if (loadToken !== coursePlaylistAudioLoadToken || !activeCourseRun) return false;

    const source = coursePlaylistAudioContext.createBufferSource();
    const gain = coursePlaylistAudioContext.createGain();
    source.buffer = audioBuffer;
    source.loop = true;
    gain.gain.value = 1;
    source.connect(gain);
    gain.connect(coursePlaylistAudioContext.destination);
    coursePlaylistAudioSource = source;
    coursePlaylistAudioGain = gain;
    source.start(0);
    return true;
  } catch (error) {
    return false;
  }
}

function fadeOutCoursePauseAudio(durationMs = 700) {
  if (!coursePlaylistAudioContext || !coursePlaylistAudioGain) {
    if (coursePlaylistAudio.paused) {
      stopCourseUnitMedia();
      return Promise.resolve();
    }
    const startedAt = performance.now();
    const startVolume = Math.max(0.01, coursePlaylistAudio.volume || 1);
    return new Promise((resolve) => {
      const fade = () => {
        const progress = Math.min(1, (performance.now() - startedAt) / durationMs);
        coursePlaylistAudio.volume = startVolume * (1 - progress);
        if (progress < 1) {
          window.requestAnimationFrame(fade);
          return;
        }
        stopCourseUnitMedia();
        coursePlaylistAudio.volume = 1;
        resolve();
      };
      fade();
    });
  }
  const gain = coursePlaylistAudioGain.gain;
  const now = coursePlaylistAudioContext.currentTime;
  gain.cancelScheduledValues(now);
  gain.setValueAtTime(Math.max(0.0001, gain.value), now);
  gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);
  return new Promise((resolve) => {
    window.setTimeout(() => {
      stopCourseUnitMedia();
      resolve();
    }, durationMs);
  });
}

function getCourseMediaPosterUrl(media) {
  return String(media?.thumbnailDataUrl || "")
    || resolveAppUrl(String(media?.thumbnailUrl || media?.posterUrl || (media?.mediaType === "image" ? media?.downloadUrl || "" : "")));
}

function waitForCourseVideoReady(videoElement, timeoutMs = 5000) {
  if (!videoElement) return Promise.reject(new Error("Videoelement fehlt."));
  if (videoElement.readyState >= 2) return Promise.resolve(true);
  return new Promise((resolve, reject) => {
    let settled = false;
    const cleanup = () => {
      videoElement.removeEventListener("loadeddata", handleReady);
      videoElement.removeEventListener("canplay", handleReady);
      videoElement.removeEventListener("error", handleError);
      videoElement.removeEventListener("abort", handleError);
      window.clearTimeout(timer);
    };
    const finish = (callback) => {
      if (settled) return;
      settled = true;
      cleanup();
      callback();
    };
    const handleReady = () => finish(() => resolve(true));
    const handleError = () => finish(() => reject(new Error("Video konnte nicht geladen werden.")));
    const timer = window.setTimeout(() => finish(() => resolve(false)), timeoutMs);
    videoElement.addEventListener("loadeddata", handleReady);
    videoElement.addEventListener("canplay", handleReady);
    videoElement.addEventListener("error", handleError);
    videoElement.addEventListener("abort", handleError);
  });
}
async function startCourseUnitMedia(exercise) {
  if (!coursePlayer || !activeCourseRun) return false;
  const media = resolveCourseUnitMedia(exercise);
  const state = coursePlayer.querySelector(".course-media-state");
  const startButton = coursePlayer.querySelector("[data-course-media-start-button]");
  const showStartButton = (visible, label = "") => {
    if (!startButton) return;
    startButton.classList.toggle("is-hidden", !visible);
    if (label) startButton.textContent = label;
  };
  if (!media?.downloadUrl) {
    if (state) state.textContent = "Sounddatei nicht verfügbar.";
    showStartButton(false);
    return false;
  }

  if (media.mediaType !== "audio") {
    const container = coursePlayer.querySelector("[data-course-video-container]")
      || coursePlayer.querySelector(".course-unit-media");
    if (!container) return false;
    const mediaUrl = resolveAppUrl(media.downloadUrl);
    const posterUrl = getCourseMediaPosterUrl(media);
    if (courseVisibleVideo) {
      courseVisibleVideo.pause();
      courseVisibleVideo.removeAttribute("src");
      courseVisibleVideo.load();
      courseVisibleVideo.remove();
    }
    const mediaElement = document.createElement("video");
    courseVisibleVideo = mediaElement;
    mediaElement.src = mediaUrl;
    mediaElement.className = "media-library-preview course-playlist-video";
    mediaElement.controls = false;
    mediaElement.preload = "auto";
    mediaElement.playsInline = true;
    mediaElement.style.position = "";
    mediaElement.style.width = "";
    mediaElement.style.height = "";
    mediaElement.style.opacity = "";
    mediaElement.style.pointerEvents = "";
    mediaElement.onended = null;
    mediaElement.onerror = null;
    mediaElement.onabort = null;
    mediaElement.onplaying = null;
    if (posterUrl) mediaElement.poster = posterUrl;
    else mediaElement.removeAttribute("poster");
    container.replaceChildren(mediaElement);
    mediaElement.load();
    mediaElement.setAttribute("playsinline", "");
    mediaElement.setAttribute("webkit-playsinline", "");
    mediaElement.muted = false;
    mediaElement.defaultMuted = false;
    mediaElement.volume = 1;
    const isTimedPause = isCoursePauseExercise(exercise);
    const shouldLoop = isTimedPause || media.playbackMode === "loop";
    mediaElement.loop = shouldLoop;
    mediaElement.onerror = () => {
      if (state) {
        state.innerHTML = '<span>Video konnte nicht geladen werden.</span> <button class="primary-action course-media-start" type="button" data-action="playMedia">Erneut versuchen</button>';
      }
    };
    mediaElement.onabort = mediaElement.onerror;
    mediaElement.onplaying = () => {
      coursePlaylistVideoAudioUnlocked = true;
      if (state) state.textContent = "";
    };
    if (!shouldLoop) {
      mediaElement.onended = () => coursePlayer.querySelector("[data-action='done']")?.click();
    }
    if (state) state.textContent = "Video wird geladen ...";
    try {
      await waitForCourseVideoReady(mediaElement, 5000);
      try {
        mediaElement.currentTime = 0;
      } catch (seekError) {
        // Some mobile browsers only allow seeking after playback starts.
      }
      await mediaElement.play();
      coursePlaylistVideoAudioUnlocked = true;
      if (state) state.textContent = "";
      showStartButton(false);
      return true;
    } catch (error) {
      if (mediaElement.error) {
        if (state) {
          state.innerHTML = '<span>Video konnte nicht geladen werden.</span> <button class="primary-action course-media-start" type="button" data-action="playMedia">Erneut versuchen</button>';
        }
        showStartButton(true, "Erneut starten");
        return false;
      }
      // Mobile Safari commonly blocks audible autoplay after an automatic
      // playlist transition. Muted playback remains permitted.
      mediaElement.muted = true;
      mediaElement.defaultMuted = true;
      try {
        await mediaElement.play();
        if (state) {
          state.innerHTML = '<button class="primary-action course-media-start" type="button" data-action="enableVideoSound">Ton einschalten</button>';
        }
        showStartButton(false);
        return true;
      } catch (mutedError) {
        if (state) {
          state.innerHTML = '<button class="primary-action course-media-start" type="button" data-action="playMedia">Video starten</button>';
        }
        showStartButton(true, "Video starten");
        return false;
      }
    }
  }

  const isTimedPause = isCoursePauseExercise(exercise);
  const mediaUrl = resolveAppUrl(media.downloadUrl);
  const isPrimedPause = isTimedPause
    && coursePlaylistPrimedUrl === mediaUrl
    && coursePlaylistAudio.src === mediaUrl;
  if (!isPrimedPause) stopCourseUnitMedia();
  const container = coursePlayer.querySelector(".course-unit-media");
  coursePlaylistAudio.className = "media-library-audio course-playlist-audio";
  coursePlaylistAudio.controls = true;
  if (!isPrimedPause) coursePlaylistAudio.src = mediaUrl;
  coursePlaylistAudio.muted = false;
  coursePlaylistAudio.defaultMuted = false;
  coursePlaylistAudio.volume = 1;
  coursePlaylistAudio.loop = isTimedPause || media.playbackMode === "loop";
  container?.replaceChildren(coursePlaylistAudio);
  coursePlaylistAudioEndHandler = isTimedPause
    ? null
    : () => coursePlayer.querySelector("[data-action='done']")?.click();
  coursePlaylistAudioErrorHandler = () => {
    if (state) state.textContent = "Sounddatei konnte nicht geladen werden.";
  };
  if (coursePlaylistAudioEndHandler) {
    coursePlaylistAudio.addEventListener("ended", coursePlaylistAudioEndHandler, { once: true });
  }
  coursePlaylistAudio.addEventListener("error", coursePlaylistAudioErrorHandler, { once: true });
  if (isTimedPause) {
    if (state) state.textContent = "Pausenmusik wird geladen ...";
    try {
      if (isPrimedPause) coursePlaylistAudio.currentTime = 0;
      await coursePlaylistAudio.play();
      if (state) state.innerHTML = 'Pausenmusik läuft. <button class="secondary-action" type="button" data-action="enablePauseSound">Ton einschalten</button>';
      showStartButton(false);
      return true;
    } catch (error) {
      coursePlaylistPrimedUrl = "";
    }
    const bufferedAudioStarted = await playCoursePauseAudio(media);
    if (bufferedAudioStarted) {
      if (state) state.innerHTML = 'Pausenmusik läuft. <button class="secondary-action" type="button" data-action="enablePauseSound">Ton einschalten</button>';
      showStartButton(false);
      return true;
    }
  }
  try {
    await coursePlaylistAudio.play();
    if (state) state.textContent = isTimedPause ? "Pausenmusik läuft." : "Sound läuft.";
    showStartButton(false);
    return true;
  } catch (error) {
    if (state) state.innerHTML = '<button class="secondary-action" type="button" data-action="playMedia">Sound starten</button>';
    showStartButton(true, "Sound starten");
    return false;
  }
}

function renderCoursePlayer() {
  if (!coursePlayer || !activeCourseRun) return;
  myCoursesPanel?.classList.add("has-active-course");
  clearCourseRecordingContext();
  if (activeCourseRun.phase === "introduction") {
    renderDailyPlanIntroduction();
    return;
  }
  window.clearTimeout(coursePauseTimerId);
  const { course, plan, session, index, phase, dayIndex } = activeCourseRun;
  const exercises = plan?.exercises || [];
  const exercise = exercises[index];
  if (!exercise) {
    setCourseVideoFullscreen(false);
    session.status = "completed";
    syncCourseMediaLock();
    session.completedAt = new Date().toISOString();
    session.updatedAt = session.completedAt;
    session.totalDuration = Math.round((new Date(session.completedAt) - new Date(session.startedAt)) / 1000);
    coursePlayer.innerHTML = `
      <div class="course-player-card">
        <div class="course-player-context">
          <span>Kurs</span>
          <strong>${course?.name || "Kurs"}</strong>
          <small>${plan?.title || "Tagesplan"}</small>
        </div>
        <p class="eyebrow">Tagesplan abgeschlossen</p>
        <h2>${plan?.title || "Tagesplan"}</h2>
        <p>${session.completedExerciseIds.length} Übungen absolviert · ${formatCourseDuration(session.totalDuration)}</p>
        <button class="secondary-action" type="button" data-action="back">Zurück</button>
      </div>
    `;
    coursePlayer.querySelector("[data-action='back']").addEventListener("click", () => {
      clearCourseAutoAdvanceTimer();
      clearActiveCourseRun();
      coursePlayer.classList.add("is-hidden");
      renderMyCourses();
    });
    persistCourseModuleData();
    saveCourseSessionToCloud(session).catch(() => {});
    return;
  }
  const progress = Math.round((index / Math.max(1, exercises.length)) * 100);
  const isMediaPause = isCoursePauseExercise(exercise);
  const media = resolveCourseUnitMedia(exercise);
  const isMediaExercise = Boolean(media?.downloadUrl) && !isMediaPause;
  const pauseBackground = isMediaPause ? getDailyPlanPauseBackgroundImage(exercise) : null;
  const pauseBackgroundUrl = pauseBackground?.downloadUrl ? resolveAppUrl(pauseBackground.downloadUrl) : "";
  const isFullscreenVideo = media?.mediaType === "video";
  const mediaStartLabel = isFullscreenVideo ? "Video starten" : (isMediaPause ? "Entspannung starten" : "Sound starten");
  const useCourseControlBar = Boolean(activeCourseRun);
  setCourseVideoFullscreen(isFullscreenVideo);
  coursePlayer.innerHTML = `
    <div class="course-player-card course-player-live${isMediaPause ? " course-player-pause-mode" : ""}${pauseBackgroundUrl ? " has-pause-background" : ""}${isFullscreenVideo ? " course-video-card" : ""}">
      ${pauseBackgroundUrl ? `<img class="course-pause-background" src="${mediaLibraryEscape(pauseBackgroundUrl)}" alt="" aria-hidden="true">` : ""}
      ${isMediaPause && !pauseBackgroundUrl ? '<div class="course-pause-ambient" aria-hidden="true"><span></span><span></span><span></span></div>' : ""}
      <div class="course-player-context">
        <span>Kurs</span>
        <strong>${course?.name || "Kurs"}</strong>
        <small>${plan?.title || "Tagesplan"} · Tag ${Number(dayIndex || 0) + 1}</small>
      </div>
      <div class="course-player-stage">
        <p class="eyebrow">${isMediaPause ? "Pauseneinheit" : "Aktuelle Übung"}</p>
        <h2>${exercise.title}</h2>
        <p>Übung ${index + 1} von ${exercises.length}</p>
        <div class="course-progress"><span style="width:${progress}%"></span></div>
        <p>${exercise.patientHint || (isMediaPause ? "Nehmen Sie sich einen ruhigen Moment." : "Bereiten Sie sich auf die nächste Übung vor.")}</p>
        ${isMediaPause ? `<p class="course-media-countdown" aria-live="polite"><strong id="courseMediaPauseCountdown">${Math.max(1, Number(exercise.duration || 30))}</strong><span>Sekunden</span></p>` : ""}
        ${renderCourseUnitMedia(exercise)}
        ${media?.downloadUrl ? `<button class="secondary-action course-inline-media-start" type="button" data-action="playMedia" data-course-media-start-button>${mediaStartLabel}</button>` : ""}
      </div>
      <div class="course-actions course-actions-bd">
        ${useCourseControlBar || isMediaPause ? "" : `<button class="primary-action" type="button" data-action="${isMediaExercise ? "record" : "open"}">${isMediaExercise ? "Aufnahme starten" : "Übung öffnen"}</button>`}
        <button class="secondary-action" type="button" data-action="done">${useCourseControlBar ? "Erledigt" : (isMediaPause ? "Pause beenden" : "Erledigt")}</button>
        ${useCourseControlBar || exercise.canSkip ? `<button class="secondary-action" type="button" data-action="skip">Überspringen</button>` : ""}
        <button class="secondary-action danger-action" type="button" data-action="cancel">Stoppen</button>
      </div>
    </div>
  `;
  coursePlayer.onclick = handleCoursePlayerClick;
  if (isMediaPause || (activeCourseRun.playlistMode && isMediaExercise)) {
    startCourseUnitMedia(exercise).then((started) => {
      if (isMediaPause && started) startCourseMediaPauseCountdown(exercise);
    });
  }
}

function startCourseMediaPauseCountdown(exercise) {
  window.clearTimeout(coursePauseTimerId);
  const sessionId = activeCourseRun?.session?.id || "";
  const exerciseId = exercise?.exerciseId || "";
  const duration = Math.max(1, Number(exercise?.duration || 30));
  const endsAt = Date.now() + duration * 1000;

  const tick = () => {
    if (
      !activeCourseRun
      || activeCourseRun.session?.id !== sessionId
      || getActiveCourseExercise()?.exerciseId !== exerciseId
    ) return;

    const remaining = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
    const label = coursePlayer?.querySelector("#courseMediaPauseCountdown");
    if (label) label.textContent = String(remaining);

    if (remaining <= 0) {
      fadeOutCoursePauseAudio().then(() => {
        coursePlayer?.querySelector("[data-action='done']")?.click();
      });
      return;
    }
    coursePauseTimerId = window.setTimeout(tick, 250);
  };

  tick();
}

function handleCoursePlayerClick(event) {
  const action = event.target.closest("button")?.dataset.action;
  if (!action || !activeCourseRun) return;
  const { session, plan, index } = activeCourseRun;
  const exercises = plan?.exercises || [];
  const exercise = exercises[index];
  session.completedExerciseIds = Array.isArray(session.completedExerciseIds) ? session.completedExerciseIds : [];
  session.skippedExerciseIds = Array.isArray(session.skippedExerciseIds) ? session.skippedExerciseIds : [];
  if (action === "playMedia") {
    window.clearTimeout(coursePauseTimerId);
    unlockCoursePlaylistAudioContext()
      .then(() => startCourseUnitMedia(exercise))
      .then((started) => {
        if (started && isCoursePauseExercise(exercise)) startCourseMediaPauseCountdown(exercise);
      });
    return;
  }
  if (action === "enableVideoSound") {
    const videoElement = coursePlayer.querySelector("video");
    if (!videoElement) return;
    videoElement.muted = false;
    videoElement.defaultMuted = false;
    videoElement.volume = 1;
    videoElement.play()
      .then(() => {
        const state = coursePlayer.querySelector(".course-media-state");
        if (state) state.textContent = "";
      })
      .catch(() => {
        const state = coursePlayer.querySelector(".course-media-state");
        if (state) state.textContent = "Bitte im Video auf Play tippen.";
      });
    return;
  }
  if (action === "enablePauseSound") {
    if (coursePlaylistAudioSource) {
      try {
        coursePlaylistAudioSource.stop();
      } catch (error) {
        // The fallback source may already have ended.
      }
      coursePlaylistAudioSource.disconnect();
      coursePlaylistAudioSource = null;
    }
    if (coursePlaylistAudioGain) {
      coursePlaylistAudioGain.disconnect();
      coursePlaylistAudioGain = null;
    }
    coursePlaylistAudio.muted = false;
    coursePlaylistAudio.defaultMuted = false;
    coursePlaylistAudio.volume = 1;
    unlockCoursePlaylistAudioContext()
      .then(() => coursePlaylistAudio.play())
      .then(() => {
        const state = coursePlayer?.querySelector(".course-media-state");
        if (state) state.textContent = "Pausenmusik läuft mit Ton.";
      })
      .catch(() => {
        const state = coursePlayer?.querySelector(".course-media-state");
        if (state) state.textContent = "Bitte im Audioplayer auf Play tippen.";
      });
    return;
  }
  if (action === "back") {
    clearCourseAutoAdvanceTimer();
    window.clearTimeout(coursePauseTimerId);
    stopCourseUnitMedia();
    stopCoursePauseMusic();
    clearActiveCourseRun();
    coursePlayer.classList.add("is-hidden");
    renderMyCourses();
    return;
  }
  if (action === "open") {
    session.status = "in_progress";
    session.updatedAt = new Date().toISOString();
    courseSessions = mergeById(courseSessions, [session]);
    persistCourseModuleData();
    saveCourseSessionToCloud(session).catch(() => {});
    openNextCourseExercise(exercise);
    return;
  }
  if (action === "record") {
    setCourseVideoFullscreen(false);
    session.status = "in_progress";
    session.updatedAt = new Date().toISOString();
    courseSessions = mergeById(courseSessions, [session]);
    persistCourseModuleData();
    saveCourseSessionToCloud(session).catch(() => {});
    coursePlayer.classList.add("is-hidden");
    if (isBreathingExercise(exercise)) {
      openNextCourseExercise(exercise, { autoStart: true });
      return;
    }
    prepareCourseExerciseInRecordView(exercise);
    return;
  }
  if (action === "skip" && !session.skippedExerciseIds.includes(exercise.exerciseId)) {
    session.skippedExerciseIds.push(exercise.exerciseId);
  }
  if (action === "done" && !session.completedExerciseIds.includes(exercise.exerciseId)) {
    session.completedExerciseIds.push(exercise.exerciseId);
  }
  if (action === "cancel") {
    clearCourseAutoAdvanceTimer();
    window.clearTimeout(coursePauseTimerId);
    stopCourseUnitMedia();
    stopCoursePauseMusic();
    session.status = "cancelled";
    session.completedAt = new Date().toISOString();
    session.updatedAt = session.completedAt;
    coursePlayer.classList.add("is-hidden");
    clearActiveCourseRun();
    saveCourseSessionToCloud(session).catch(() => {});
    renderMyCourses();
    return;
  }
  stopCourseUnitMedia();
  activeCourseRun.index += 1;
  session.currentExerciseIndex = activeCourseRun.index;
  session.status = activeCourseRun.playlistMode ? "in_progress" : "paused";
  session.updatedAt = new Date().toISOString();
  courseSessions = mergeById(courseSessions, [session]);
  persistCourseModuleData();
  saveCourseSessionToCloud(session).catch(() => {});
  if (activeCourseRun.playlistMode) {
    runCourseTransition(exercise, () => continueCoursePlaylist());
  } else {
    renderCoursePause(activeCourseRun.course, exercise);
  }
}

function renderCoursePause(course, exercise) {
  if (!coursePlayer || !activeCourseRun) return;
  const pause = exercise.pauseAfter || {};
  const duration = pause.enabled === false ? 0 : Number(pause.duration || 30);
  if (!duration) {
    continueCoursePlaylist();
    return;
  }
  const nextExercise = (activeCourseRun.plan?.exercises || [])[activeCourseRun.index];
  let remaining = duration;
  coursePlayer.innerHTML = `
    <div class="course-player-card course-pause-card">
      <div class="course-player-context">
        <span>Kurs</span>
        <strong>${activeCourseRun.course?.name || "Kurs"}</strong>
        <small>${activeCourseRun.plan?.title || "Tagesplan"}</small>
      </div>
      <p class="eyebrow">Kurze Pause</p>
      <h2><span id="coursePauseCountdown">${remaining}</span> Sekunden</h2>
      <p>${pause.text || "Atmen Sie ruhig ein und aus."}</p>
      <p>Nächste Übung: <strong>${nextExercise?.title || "Abschluss"}</strong></p>
      ${pause.canSkip ? `<button class="secondary-action" type="button" data-action="skipPause">Pause Überspringen</button>` : ""}
    </div>
  `;
  startCoursePauseMusic(pause);
  const tick = () => {
    remaining -= 1;
    const label = document.querySelector("#coursePauseCountdown");
    if (label) label.textContent = String(Math.max(0, remaining));
    if (remaining <= 0) {
      stopCoursePauseMusic();
      continueCoursePlaylist();
      return;
    }
    coursePauseTimerId = window.setTimeout(tick, 1000);
  };
  coursePlayer.querySelector("[data-action='skipPause']")?.addEventListener("click", () => {
    window.clearTimeout(coursePauseTimerId);
    stopCoursePauseMusic();
    continueCoursePlaylist();
  });
  coursePauseTimerId = window.setTimeout(tick, 1000);
}

function startCoursePauseMusic(pause) {
  stopCoursePauseMusic();
  const item = relaxMusicItems.find((music) => music.id === pause.musicId) || relaxMusicItems.find((music) => music.isDefault);
  if (!item?.dataUrl) return;
  courseMusicAudio = new Audio(item.dataUrl);
  courseMusicAudio.loop = true;
  courseMusicAudio.volume = 0;
  courseMusicAudio.play().catch(() => {});
  const target = Math.max(0, Math.min(1, Number(pause.volume ?? item.volume ?? 0.25)));
  fadeAudioVolume(courseMusicAudio, target, 2000);
}

function stopCoursePauseMusic() {
  if (!courseMusicAudio) return;
  const audio = courseMusicAudio;
  courseMusicAudio = null;
  fadeAudioVolume(audio, 0, 1800, () => {
    audio.pause();
    audio.src = "";
  });
}

function fadeAudioVolume(audio, target, durationMs, done) {
  const start = audio.volume;
  const started = performance.now();
  const step = () => {
    const progress = Math.min(1, (performance.now() - started) / durationMs);
    audio.volume = start + (target - start) * progress;
    if (progress < 1) requestAnimationFrame(step);
    else done?.();
  };
  step();
}

function renderEditorPatientScopeOptions(preferredName = editorPatientScope?.value || "") {
  if (!editorPatientScope) return;

  const currentValue = preferredName || editorPatientScope.value || getCurrentPatientName();
  editorPatientScope.innerHTML = "";

  const sharedOption = document.createElement("option");
  sharedOption.value = "";
  sharedOption.textContent = "Gemeinsam / Vorlage";
  editorPatientScope.append(sharedOption);

  const knownNames = getKnownPatientNames();
  knownNames.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = `Patient: ${name}`;
    editorPatientScope.append(option);
  });

  if (currentValue && !knownNames.some((name) => normalizeEditorExerciseName(name) === normalizeEditorExerciseName(currentValue))) {
    const missingOption = document.createElement("option");
    missingOption.value = currentValue;
    missingOption.textContent = `Patient: ${currentValue} (nicht mehr vorhanden)`;
    editorPatientScope.append(missingOption);
  }

  const optionValues = Array.from(editorPatientScope.options).map((option) => option.value);
  editorPatientScope.value = optionValues.includes(currentValue) ? currentValue : "";
}

function getEditorExercisePatientName(exercise) {
  return String(exercise?.patientName || "").trim();
}

function isKnownPatientName(name) {
  const normalizedName = normalizeEditorExerciseName(name);
  if (!normalizedName) return false;
  return getKnownPatientNames().some(
    (patientName) => normalizeEditorExerciseName(patientName) === normalizedName,
  );
}

function isEditorExerciseVisibleForCurrentPatient(exercise, patient = getCurrentPatientName()) {
  const assignedPatient = getEditorExercisePatientName(exercise);
  if (!assignedPatient) return true;
  if (!isKnownPatientName(assignedPatient)) return true;
  return normalizeEditorExerciseName(assignedPatient) === normalizeEditorExerciseName(patient);
}

function buildPatientProfile(name = getCurrentPatientName()) {
  const cleanedName = String(name || "").trim() || "Ohne Name";
  const existingProfile = findPatientProfileByName(cleanedName);
  return {
    id: existingProfile?.id || `patient-${slugify(cleanedName)}`,
    name: cleanedName,
    settings: {
      sensitivity: clampSensitivity(sensitivitySlider.value),
      playbackGain: Math.max(100, Math.min(400, Math.round(Number(playbackVolumeSlider.value) || 200))),
      equalizer: getEqualizerSettings(),
      calibrationNoiseFloor: normalizeCalibrationNoiseFloor(calibrationNoiseFloor),
      activeVoiceKey: getElevenLabsSettings().activeVoiceKey || "",
    },
    updatedAt: new Date().toISOString(),
  };
}

function upsertPatientProfile(profile) {
  const normalizedName = normalizeEditorExerciseName(profile?.name);
  if (!normalizedName) return;

  const normalizedProfile = {
    ...profile,
    id: profile.id || slugify(profile.name),
    updatedAt: profile.updatedAt || new Date().toISOString(),
  };
  const existingIndex = patientProfiles.findIndex(
    (item) => normalizeEditorExerciseName(item.name) === normalizedName,
  );
  if (existingIndex >= 0) {
    patientProfiles[existingIndex] = { ...patientProfiles[existingIndex], ...normalizedProfile };
  } else {
    patientProfiles.push(normalizedProfile);
  }
  patientProfiles.sort((a, b) => a.name.localeCompare(b.name, "de"));
  localStorage.setItem(PATIENT_PROFILES_KEY, JSON.stringify(patientProfiles));
}

function findPatientProfileByName(name) {
  const normalizedName = normalizeEditorExerciseName(name);
  return patientProfiles.find((profile) => normalizeEditorExerciseName(profile.name) === normalizedName) || null;
}

function findPatientProfileById(patientId) {
  const normalizedId = String(patientId || "").trim();
  if (!normalizedId) return null;
  return patientProfiles.find((profile) => String(profile.id || "").trim() === normalizedId) || null;
}

function getAssignmentsForPatient(patientId = getCurrentPatientId(), patientLabel = getCurrentPatientName()) {
  const normalizedId = String(patientId || "").trim();
  const normalizedName = normalizeEditorExerciseName(patientLabel || "");
  return courseAssignments.filter((item) => {
    const assignmentId = String(item.patientId || "").trim();
    const assignmentName = normalizeEditorExerciseName(item.patientName || "");
    return (
      (normalizedId && assignmentId === normalizedId) ||
      (normalizedName && assignmentName === normalizedName)
    );
  });
}

function reconcileCourseAssignmentPatients(assignments = []) {
  return assignments.map((assignment) => {
    const profile =
      findPatientProfileById(assignment.patientId)
      || findPatientProfileByName(assignment.patientName || "");
    if (!profile) return assignment;
    if (assignment.patientId === profile.id && assignment.patientName === profile.name) return assignment;
    return {
      ...assignment,
      patientId: profile.id,
      patientName: profile.name,
      updatedAt: new Date().toISOString(),
    };
  });
}

function getCurrentPatientProfile() {
  const selectedId = localStorage.getItem(SELECTED_PATIENT_ID_KEY) || "";
  return (
    findPatientProfileById(selectedId) ||
    findPatientProfileByName(patientName?.value || "") ||
    null
  );
}

function getCurrentPatientId() {
  const profile = getCurrentPatientProfile();
  return String(profile?.id || slugify(getCurrentPatientName()) || "patient-ohne-name");
}

function getMetadataPatientId(metadata = null) {
  return String(
    metadata?.patientId ||
    findPatientProfileByName(metadata?.patientName || "")?.id ||
    slugify(metadata?.patientName || "") ||
    getCurrentPatientId()
  );
}

function isRecordingForPatient(recording, patientId = getCurrentPatientId(), patientLabel = getCurrentPatientName()) {
  const recordingPatientId = getMetadataPatientId(recording);
  if (recordingPatientId && patientId) return recordingPatientId === patientId;
  return String(recording?.patientName || "Demo Patient") === String(patientLabel || "Ohne Name");
}

function applyPatientProfileSettings(profile) {
  const settings = profile?.settings || {};
  isApplyingPatientProfile = true;
  try {
    if (settings.sensitivity) updateSensitivitySetting(settings.sensitivity, { skipPatientSave: true });
    if (settings.playbackGain) updatePlaybackVolumeSetting(settings.playbackGain, { skipPatientSave: true });
    if (settings.equalizer) {
      const eqSettings = normalizeEqualizerSettings(settings.equalizer);
      localStorage.setItem(SETTINGS_EQ_KEY, JSON.stringify(eqSettings));
      renderEqualizerControls(eqSettings);
    }
    if (settings.calibrationNoiseFloor) {
      calibrationNoiseFloor = normalizeCalibrationNoiseFloor(settings.calibrationNoiseFloor);
      localStorage.setItem(CALIBRATION_NOISE_KEY, JSON.stringify(calibrationNoiseFloor));
    }
    if (settings.activeVoiceKey) {
      const voiceSettings = getElevenLabsSettings();
      if (voiceSettings.voices.some((voice) => voice.key === settings.activeVoiceKey)) {
        loadSelectedVoiceProfileIntoControls(settings.activeVoiceKey, {
          settings: voiceSettings,
          silent: true,
          skipPersist: false,
          skipCloud: true,
          skipPatientSave: true,
        });
      }
    }
  } finally {
    isApplyingPatientProfile = false;
  }
}

async function ensurePatientProfile(name = getCurrentPatientName()) {
  const cleanedName = String(name || "").trim() || "Ohne Name";
  const localProfile = findPatientProfileByName(cleanedName);
  if (localProfile) {
    await saveCloudPatientProfile(localProfile);
    return localProfile;
  }

  const cloudProfile = await loadCloudPatientProfile(cleanedName).catch(() => null);
  if (cloudProfile) {
    upsertPatientProfile(cloudProfile);
    return cloudProfile;
  }

  const createdProfile = buildPatientProfile(cleanedName);
  upsertPatientProfile(createdProfile);
  await saveCloudPatientProfile(createdProfile);
  return createdProfile;
}

async function requestPatientProfilesApi(method = "GET", body = null) {
  const requestPath = method === "GET"
    ? `/api/patients?sync=${Date.now()}`
    : "/api/patients";
  const response = await fetch(getApiUrl(requestPath), {
    method,
    cache: "no-store",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) throw new Error(`Patienten-API ${response.status}`);
  return response.json();
}

let patientProfileRefreshTimerId = 0;
let patientProfileRefreshPromise = null;

function schedulePatientProfileRefresh(delay = 0) {
  window.clearTimeout(patientProfileRefreshTimerId);
  patientProfileRefreshTimerId = window.setTimeout(() => {
    refreshPatientProfilesFromCloud().catch((error) => {
      console.warn("Patienten konnten nicht erneut aus Firebase geladen werden", error);
    });
  }, Math.max(0, Number(delay) || 0));
}

async function refreshPatientProfilesFromCloud() {
  if (patientProfileRefreshPromise) return patientProfileRefreshPromise;
  patientProfileRefreshPromise = (async () => {
    const result = await requestPatientProfilesApi("GET");
    const cloudProfiles = Array.isArray(result?.profiles) ? result.profiles : [];
    cloudProfiles
      .filter((profile) => profile?.name)
      .forEach((profile) => upsertPatientProfile(profile));

    renderPatientOptions(allRecordings);
    renderCoursePatientSwitcher();
    if (settingsState) {
      settingsState.textContent = `Patienten aus Firebase geladen: ${patientProfiles.length}.`;
    }
    return patientProfiles;
  })().finally(() => {
    patientProfileRefreshPromise = null;
  });
  return patientProfileRefreshPromise;
}

async function saveCloudPatientProfile(profile = buildPatientProfile()) {
  const normalizedProfile = {
    ...profile,
    id: profile.id || slugify(profile.name),
    updatedAt: new Date().toISOString(),
  };
  try {
    const result = await requestPatientProfilesApi("POST", { profile: normalizedProfile });
    if (result?.profile) Object.assign(normalizedProfile, result.profile);
  } catch (apiError) {
    await setDoc(doc(firestore, PATIENT_PROFILES_COLLECTION, normalizedProfile.id), normalizedProfile, { merge: true });
  }
  upsertPatientProfile(normalizedProfile);
  return normalizedProfile;
}

async function loadCloudPatientProfile(name) {
  const result = await requestPatientProfilesApi("GET");
  const normalizedName = normalizeEditorExerciseName(name);
  return (result?.profiles || []).find(
    (profile) => normalizeEditorExerciseName(profile?.name) === normalizedName,
  ) || null;
}

async function loadCloudPatientProfiles() {
  try {
    let localProfiles = [];
    try {
      localProfiles = JSON.parse(localStorage.getItem(PATIENT_PROFILES_KEY) || "[]") || [];
    } catch (parseError) {
      localProfiles = [];
    }

    let cloudProfiles = [];
    let cloudActiveName = "";
    let cloudActiveId = "";
    try {
      const result = await requestPatientProfilesApi("GET");
      cloudProfiles = Array.isArray(result?.profiles) ? result.profiles : [];
      cloudActiveName = String(result?.activePatient?.name || "").trim();
      cloudActiveId = String(result?.activePatient?.patientId || "").trim();
    } catch (apiError) {
      const snapshot = await getDocs(collection(firestore, PATIENT_PROFILES_COLLECTION));
      cloudProfiles = snapshot.docs.map((profileDoc) => profileDoc.data());
      const activeSnapshot = await getDoc(doc(firestore, "settings", ACTIVE_PATIENT_DOC)).catch(() => null);
      cloudActiveName = activeSnapshot?.exists?.() ? activeSnapshot.data()?.name : "";
      cloudActiveId = activeSnapshot?.exists?.() ? activeSnapshot.data()?.patientId : "";
    }
    patientProfiles = [];
    localProfiles.forEach((profile) => {
      if (profile?.name) upsertPatientProfile(profile);
    });
    cloudProfiles
      .filter((profile) => profile?.name)
      .forEach((profile) => {
        upsertPatientProfile(profile);
      });

    // Migrate profiles created by older app versions into Firebase once.
    if (localProfiles.length) {
      await Promise.all(
        localProfiles
          .filter((profile) => profile?.name)
          .map((profile) => saveCloudPatientProfile(profile)),
      );
    }

    const localSelected = localStorage.getItem(SELECTED_PATIENT_KEY) || "";
    const localSelectedId = localStorage.getItem(SELECTED_PATIENT_ID_KEY) || "";
    const fallbackProfile = patientProfiles[0] || null;
    const nextPatientName = localSelected || cloudActiveName || fallbackProfile?.name || patientName.value || "";
    const localPreferredProfile =
      findPatientProfileById(localSelectedId) ||
      findPatientProfileByName(localSelected);
    const cloudPreferredProfile =
      findPatientProfileById(cloudActiveId) ||
      findPatientProfileByName(cloudActiveName);
    const nextProfile =
      localPreferredProfile ||
      cloudPreferredProfile ||
      findPatientProfileByName(nextPatientName) ||
      fallbackProfile;
    patientName.value = nextProfile?.name || nextPatientName || "Ohne Name";
    localStorage.setItem(SELECTED_PATIENT_KEY, patientName.value);
    if (nextProfile?.id) {
      localStorage.setItem(SELECTED_PATIENT_ID_KEY, nextProfile.id);
    }

    const activeProfile =
      nextProfile ||
      (localSelected ? await ensurePatientProfile(localSelected).catch(() => null) : null) ||
      findPatientProfileByName(nextPatientName) ||
      (patientProfiles.length ? patientProfiles[0] : null) ||
      (await ensurePatientProfile(nextPatientName || "Ohne Name"));
    if (activeProfile?.id) {
      localStorage.setItem(SELECTED_PATIENT_ID_KEY, activeProfile.id);
    }
    if (activeProfile?.name) {
      patientName.value = activeProfile.name;
      localStorage.setItem(SELECTED_PATIENT_KEY, activeProfile.name);
    }
    if (activeProfile?.name) {
      await setActiveCloudPatient(activeProfile.name, activeProfile.id).catch((error) => {
        console.warn("Aktiver Patient konnte nicht in Firebase gespeichert werden", error);
      });
    }
    if (activeProfile) applyPatientProfileSettings(activeProfile);
    localStorage.setItem(PATIENT_PROFILES_KEY, JSON.stringify(patientProfiles));
    if (patientManagerName) patientManagerName.value = patientName.value;
    renderPatientOptions(allRecordings);
    renderCoursePatientSwitcher();
    setPatientManagerState(`Patient geladen: ${patientName.value}`, "success");
    if (settingsState) settingsState.textContent = `Patienten aus Firebase geladen: ${patientProfiles.length}.`;
  } catch (error) {
    try {
      patientProfiles = JSON.parse(localStorage.getItem(PATIENT_PROFILES_KEY) || "[]") || [];
    } catch (parseError) {
      patientProfiles = [];
    }
    await ensurePatientProfile(getCurrentPatientName()).catch(() => {});
    if (patientManagerName) patientManagerName.value = getCurrentPatientName();
    setPatientManagerState(`Patient bereit: ${getCurrentPatientName()}`, "info");
    if (settingsState) settingsState.textContent = "Patienten lokal geladen. Firebase nicht erreichbar.";
  }
}

async function setActiveCloudPatient(name = getCurrentPatientName(), patientId = getCurrentPatientId()) {
  const cleanedName = String(name || "").trim() || "Ohne Name";
  const normalizedId = patientId || slugify(cleanedName);
  try {
    await requestPatientProfilesApi("POST", {
      action: "activate",
      name: cleanedName,
      patientId: normalizedId,
    });
  } catch (apiError) {
    await setDoc(doc(firestore, "settings", ACTIVE_PATIENT_DOC), {
      name: cleanedName,
      patientId: normalizedId,
      updatedAt: new Date().toISOString(),
    });
  }
}

function queuePatientProfileSave(options = {}) {
  if (isApplyingPatientProfile) return;
  window.clearTimeout(patientProfileSaveTimerId);
  const save = () => {
    const profile = buildPatientProfile();
    upsertPatientProfile(profile);
    saveCloudPatientProfile(profile).catch(() => {
      if (settingsState) settingsState.textContent = "Patient lokal gespeichert. Firebase-Speichern fehlgeschlagen.";
    });
  };

  if (options.immediate) {
    save();
    return;
  }

  patientProfileSaveTimerId = window.setTimeout(save, 700);
}

function renderLibrary(preferredId = null) {
  const selectedPatient = getCurrentPatientName();
  const selectedPatientId = getCurrentPatientId();
  const patientRecordings = allRecordings
    .filter((recording) => isRecordingForPatient(recording, selectedPatientId, selectedPatient))
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
  renderVoiceProgress(patientRecordings, preferredId);
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

function renderVoiceHintsInto(container, hints = []) {
  if (!container) return;
  container.innerHTML = "";
  const { strengths, notices } = splitVoiceEvaluationHints(hints);

  [
    ["St\u00e4rken", strengths],
    ["Auff\u00e4llig", notices],
  ].forEach(([title, entries]) => {
    if (!entries.length) return;
    const group = document.createElement("div");
    const heading = document.createElement("strong");
    const list = document.createElement("ul");
    heading.textContent = title;
    entries.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = entry;
      list.append(item);
    });
    group.append(heading, list);
    container.append(group);
  });
}

function renderVoiceScoresInto(container, scores = {}) {
  if (!container) return;
  const labels = [
    ["lautstaerke", "Lautst\u00e4rke"],
    ["stimmstabilitaet", "Stimmstabilit\u00e4t"],
    ["sprechfluss", "Sprechfluss"],
    ["pausen", "Pausen"],
    ["stimmanteil", "Stimmanteil"],
    ["gleichmaessigkeit", "Gleichm\u00e4\u00dfigkeit"],
  ];

  container.innerHTML = "";
  labels.forEach(([key, label]) => {
    const value = Math.round(Number(scores[key] || 0));
    const item = document.createElement("div");
    item.className = getTrafficLightClass(value);
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = getNormalizedAnalysisDisplayLabel(label);
    description.textContent = String(value);
    item.append(term, description);
    container.append(item);
  });
}

function renderVoiceBaselineValuesInto(container, values = {}) {
  if (!container) return;
  const labels = [
    ["lautstaerkeDurchschnitt", "\u00d8 Lautst\u00e4rke"],
    ["lautstaerkeMaximum", "Max. Lautst\u00e4rke"],
    ["frequenzDurchschnittHz", "\u00d8 Frequenz"],
    ["frequenzSchwankung", "Frequenzschwankung"],
    ["stimmenanteilProzent", "Stimmanteil"],
    ["gesamtdauer", "Dauer"],
  ];

  container.innerHTML = "";
  labels.forEach(([key, label]) => {
    const item = document.createElement("div");
    item.className = "is-reference";
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = getNormalizedAnalysisDisplayLabel(label);
    if (key === "frequenzDurchschnittHz") {
      description.textContent = values[key] ? `${Math.round(values[key])} Hz` : "0 Hz";
    } else if (key === "frequenzSchwankung") {
      description.textContent = values[key] ? `${Math.round(values[key])} Hz` : "0 Hz";
    } else if (key === "stimmenanteilProzent") {
      description.textContent = `${Math.round(values[key] || 0)}%`;
    } else if (key === "gesamtdauer") {
      description.textContent = formatTime(values[key] || 0);
    } else {
      description.textContent = String(Math.round(values[key] || 0));
    }
    item.append(term, description);
    container.append(item);
  });
}

function renderVoiceEvaluationSummary(metadata, target) {
  if (!metadata || !target?.panel || !target.title || !target.score || !target.summary) return;
  if (!isCompleteVoiceTest(metadata)) {
    target.panel.classList.add("is-hidden");
    return;
  }

  metadata.werte = metadata.werte || getVoiceAnalysisValues(metadata);
  metadata.bewertung = calculateVoiceEvaluation(metadata, allRecordings);
  const evaluation = metadata.bewertung;
  const baselineChange = evaluation.veraenderungBaselineProzent >= 0
    ? `+${evaluation.veraenderungBaselineProzent}%`
    : `${evaluation.veraenderungBaselineProzent}%`;
  const previousChange = evaluation.veraenderungVorherigerTestProzent >= 0
    ? `+${evaluation.veraenderungVorherigerTestProzent}%`
    : `${evaluation.veraenderungVorherigerTestProzent}%`;
  const baselineText = evaluation.baseline?.istAusgangsmessung
    ? "Diese Aufnahme ist die pers\u00f6nliche Ausgangsmessung."
    : `Entwicklung: ${baselineChange} gegen\u00fcber dem ersten Test, ${previousChange} zum vorherigen Test.`;

  target.title.textContent = evaluation.baseline?.istAusgangsmessung
    ? "Ausgangsmessung gespeichert"
    : `${evaluation.gesamt} von 100 Punkten`;
  target.score.textContent = evaluation.baseline?.istAusgangsmessung ? "Ref" : String(evaluation.gesamt);
  target.score.className = evaluation.baseline?.istAusgangsmessung
    ? "voice-score-badge is-neutral"
    : `voice-score-badge ${getTrafficLightClass(evaluation.gesamt)}`;
  target.summary.textContent = baselineText;
  renderVoiceHintsInto(target.hints, evaluation.hinweise || []);
  if (evaluation.baseline?.istAusgangsmessung) {
    renderVoiceBaselineValuesInto(target.scores, metadata.werte);
  } else {
    renderVoiceScoresInto(target.scores, evaluation.teilbewertungen || {});
  }
  target.panel.classList.remove("is-hidden");
}

function renderVoiceProgress(patientRecordings, preferredId = null) {
  if (!voiceProgressPanel || !voiceProgressTitle || !voiceProgressScore || !voiceProgressSummary || !voiceProgressScores || !voiceProgressChart || !voiceProgressList) return;

  const completeRecordings = patientRecordings
    .filter(isCompleteVoiceTest)
    .sort((a, b) => String(a.datum || "").localeCompare(String(b.datum || "")))
    .map((recording) => {
      const evaluation = calculateVoiceEvaluation(recording, patientRecordings);
      return { ...recording, bewertung: evaluation, werte: recording.werte || getVoiceAnalysisValues(recording) };
    });

  if (!completeRecordings.length) {
    voiceProgressTitle.textContent = "Noch keine Bewertung";
    voiceProgressScore.textContent = "0";
  voiceProgressScore.className = "voice-score-badge is-neutral";
  voiceProgressSummary.textContent = "Nach dem ersten vollständigen Test wird eine persönliche Ausgangsmessung gespeichert.";
    if (voiceProgressHints) voiceProgressHints.innerHTML = "";
  voiceProgressScores.innerHTML = "";
    voiceProgressList.innerHTML = "";
    voiceProgressChart.classList.add("is-hidden");
    if (resetEvaluationButton) resetEvaluationButton.disabled = true;
    return;
  }

  if (resetEvaluationButton) resetEvaluationButton.disabled = false;

  const selectedRecording =
    completeRecordings.find((recording) => recording.id === preferredId || recording.id === selectedAnalysisRecordingId) ||
    completeRecordings.at(-1);
  const evaluation = calculateVoiceEvaluation(selectedRecording, patientRecordings);
  const baselineText = evaluation.veraenderungBaselineProzent >= 0
    ? `+${evaluation.veraenderungBaselineProzent}% gegenüber dem ersten Test`
    : `${evaluation.veraenderungBaselineProzent}% gegenüber dem ersten Test`;
  const previousText = evaluation.veraenderungVorherigerTestProzent >= 0
    ? `+${evaluation.veraenderungVorherigerTestProzent}% zum vorherigen Test`
    : `${evaluation.veraenderungVorherigerTestProzent}% zum vorherigen Test`;

  voiceProgressTitle.textContent = evaluation.baseline?.istAusgangsmessung
    ? "Ausgangsmessung gespeichert"
    : `${evaluation.gesamt} von 100 Punkten`;
  voiceProgressScore.textContent = evaluation.baseline?.istAusgangsmessung ? "Ref" : String(evaluation.gesamt);
  voiceProgressScore.className = evaluation.baseline?.istAusgangsmessung
    ? "voice-score-badge is-neutral"
    : `voice-score-badge ${getTrafficLightClass(evaluation.gesamt)}`;
  voiceProgressSummary.textContent = evaluation.baseline?.istAusgangsmessung
    ? "Diese Aufnahme ist die pers\u00f6nliche Ausgangsmessung. Ab der n\u00e4chsten Aufnahme wird die Entwicklung verglichen."
    : `Entwicklung: ${evaluation.entwicklung}, ${baselineText}, ${previousText}.`;
  renderVoiceHintsInto(voiceProgressHints, evaluation.hinweise || []);
  if (evaluation.baseline?.istAusgangsmessung) {
    renderVoiceBaselineValuesInto(voiceProgressScores, selectedRecording.werte || getVoiceAnalysisValues(selectedRecording));
  } else {
    renderVoiceScoresInto(voiceProgressScores, evaluation.teilbewertungen);
  }
  voiceProgressChart.classList.toggle("is-hidden", completeRecordings.length < 2);
  if (completeRecordings.length >= 2) {
    requestAnimationFrame(() => drawVoiceProgressChart(completeRecordings));
  }
  renderVoiceProgressList(completeRecordings, selectedRecording.id);
}

function renderVoiceProgressHints(hints = []) {
  if (!voiceProgressHints) return;
  voiceProgressHints.innerHTML = "";
  const strengths = hints
    .filter((hint) => String(hint).startsWith("Stärke:"))
    .map((hint) => String(hint).replace(/^Stärke:\s*/, ""));
  const notices = hints
    .filter((hint) => String(hint).startsWith("Auffällig:"))
    .map((hint) => String(hint).replace(/^Auffällig:\s*/, ""));

  [
    ["Stärken", strengths],
    ["Auffällig", notices],
  ].forEach(([title, entries]) => {
    if (!entries.length) return;
    const group = document.createElement("div");
    const heading = document.createElement("strong");
    const list = document.createElement("ul");
    heading.textContent = title;
    entries.forEach((entry) => {
      const item = document.createElement("li");
      item.textContent = entry;
      list.append(item);
    });
    group.append(heading, list);
    voiceProgressHints.append(group);
  });
}

function renderVoiceScoreGrid(scores = {}) {
  const labels = [
    ["lautstaerke", "Lautstärke"],
    ["stimmstabilitaet", "Stimmstabilität"],
    ["sprechfluss", "Sprechfluss"],
    ["pausen", "Pausen"],
    ["stimmanteil", "Stimmanteil"],
    ["gleichmaessigkeit", "Gleichmäßigkeit"],
  ];

  voiceProgressScores.innerHTML = "";
  labels.forEach(([key, label]) => {
    const value = Math.round(Number(scores[key] || 0));
    const item = document.createElement("div");
    item.className = getTrafficLightClass(value);
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    term.textContent = getNormalizedAnalysisDisplayLabel(label);
    description.textContent = String(value);
    item.append(term, description);
    voiceProgressScores.append(item);
  });
}

function renderVoiceProgressList(recordings, activeId = "") {
  voiceProgressList.innerHTML = "";
  recordings.slice(-6).forEach((recording) => {
    const evaluation = calculateVoiceEvaluation(recording, recordings);
    const row = document.createElement("button");
    row.type = "button";
    row.className = `voice-progress-row ${recording.id === activeId ? "is-active" : ""}`;
    const baselineChange = `${evaluation.veraenderungBaselineProzent >= 0 ? "+" : ""}${evaluation.veraenderungBaselineProzent}%`;
    const previousChange = `${evaluation.veraenderungVorherigerTestProzent >= 0 ? "+" : ""}${evaluation.veraenderungVorherigerTestProzent}%`;
    row.textContent = `${formatDateTime(recording.datum)}: ${evaluation.gesamt} Punkte · Baseline ${baselineChange} · Vorher ${previousChange}`;
    if (evaluation.baseline?.istAusgangsmessung) {
      row.textContent = `${formatDateTime(recording.datum)}: Ausgangsmessung`;
    }
    row.addEventListener("click", () => openStoredRecording(recording.id));
    voiceProgressList.append(row);
  });
}

function drawVoiceProgressChart(recordings) {
  const canvas = voiceProgressChart;
  if (!canvas) return;
  const scores = recordings.map((recording) => calculateVoiceEvaluation(recording, recordings).gesamt);
  if (scores.length < 2) {
    canvas.classList.add("is-hidden");
    return;
  }
  canvas.classList.remove("is-hidden");
  resizeCanvasToDisplay(canvas);
  const context = canvas.getContext("2d");
  if (!context) return;
  const width = canvas.width;
  const height = canvas.height;
  const pixelRatio = window.devicePixelRatio || 1;
  if (width <= 1 || height <= 1) return;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#f8fcfd";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#5e6b7e";
  context.font = `${10 * pixelRatio}px system-ui, sans-serif`;
  context.fillText("Entwicklung", 10 * pixelRatio, 16 * pixelRatio);
  context.strokeStyle = "rgba(15, 139, 141, 0.14)";
  context.lineWidth = pixelRatio;
  [0.25, 0.5, 0.75].forEach((ratio) => {
    const y = height * ratio;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  });

  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const scalePadding = Math.max(6, Math.round((maxScore - minScore) * 0.35));
  const lowScore = Math.max(0, minScore - scalePadding);
  const highScore = Math.min(100, maxScore + scalePadding);
  const scoreSpan = Math.max(1, highScore - lowScore);
  const padding = 18 * pixelRatio;
  const step = scores.length > 1 ? (width - padding * 2) / (scores.length - 1) : 0;
  const pointFor = (score, index) => {
    const x = padding + index * step;
    const y = padding + (1 - (Math.max(lowScore, Math.min(highScore, score)) - lowScore) / scoreSpan) * (height - padding * 2);
    return { x, y };
  };

  context.beginPath();
  scores.forEach((score, index) => {
    const { x, y } = pointFor(score, index);
    if (!index) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.strokeStyle = "#0f8b8d";
  context.lineWidth = 4 * pixelRatio;
  context.lineJoin = "round";
  context.lineCap = "round";
  context.stroke();

  scores.forEach((score, index) => {
    const { x, y } = pointFor(score, index);
    context.fillStyle = score >= 75 ? "#38c172" : score >= 55 ? "#f6b44b" : "#e1495b";
    context.beginPath();
    context.arc(x, y, 5 * pixelRatio, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "#101923";
    context.font = `${9 * pixelRatio}px system-ui, sans-serif`;
    context.textAlign = index === scores.length - 1 ? "right" : "center";
    context.fillText(String(score), x, Math.max(12 * pixelRatio, y - 8 * pixelRatio));
  });
  context.textAlign = "left";
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
  message.textContent = "Aufnahme aus der Auswertung geöffnet.";
}

function getPatientRecordings() {
  const selectedPatient = getCurrentPatientName();
  const selectedPatientId = getCurrentPatientId();
  return allRecordings
    .filter((recording) => isRecordingForPatient(recording, selectedPatientId, selectedPatient))
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
  courseResultActions?.classList.add("is-hidden");
  playbackVideoCanvas?.classList.add("is-hidden");
  recordingPlayer.closest(".playback-stage")?.classList.remove("is-canvas-corrected");
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

function setTextOverlayVisible(visible) {
  isTextOverlayVisible = Boolean(visible);
  localStorage.setItem(TEXT_OVERLAY_VISIBLE_KEY, isTextOverlayVisible ? "1" : "0");
  applyTextOverlayVisibility();
}

function applyTextOverlayVisibility() {
  karaokeOverlay?.classList.toggle("is-text-hidden", !isTextOverlayVisible);
  playbackKaraokeOverlay?.classList.toggle("is-text-hidden", !isTextOverlayVisible);

  if (playbackTextToggleButton) {
    playbackTextToggleButton.textContent = isTextOverlayVisible ? "Text aus" : "Text an";
    playbackTextToggleButton.setAttribute(
      "aria-label",
      isTextOverlayVisible ? "Texteinblendung ausschalten" : "Texteinblendung einschalten",
    );
  }
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
    const breathingExerciseSelected = isBreathingExercise(getActiveRecordingExercise());
    cameraStartOverlay.classList.toggle("is-hidden", breathingExerciseSelected);
    permissionState.textContent = "Bereit";
  }
  syncBreathingRecordPreview();
}

function setActiveView(viewName) {
  const previousView = document.body.dataset.activeView || "";
  if (viewName === "myCourses" && previousView !== "myCourses") expandedMyCourseAssignmentId = "";
  document.body.dataset.activeView = viewName;
  updateTopBarTitle(viewName);
  appMenu?.classList.add("is-hidden");

  if (viewName !== "editor") {
    closeEditorAiModal();
  }

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

  if (["dailyPlans", "courses", "relaxMusic", "mediaLibrary", "myCourses"].includes(viewName)) {
    renderCourseViews();
  }

  if (["dailyPlans", "mediaLibrary"].includes(viewName)) {
    refreshMediaLibraryFromCloud();
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
    history: "Auswertung",
    stats: "Analyse",
    patients: "Patienten",
    dailyPlans: "Tagespläne",
    courses: "Kurse",
    relaxMusic: "Musik",
    mediaLibrary: "Medien",
    myCourses: "Kurs",
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
  store.put({
    ...metadata,
    patientId: metadata.patientId || getMetadataPatientId(metadata),
    patientName: metadata.patientName || getCurrentPatientName(),
    videoBlob,
  });
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
            patientId: metadata.patientId || findPatientProfileByName(metadata.patientName || "")?.id || slugify(metadata.patientName || "Demo Patient"),
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
  const recordingLabel = metadata?.uebung || "diese Aufnahme";
  const confirmed = window.confirm(
    `${recordingLabel} wirklich löschen?\n\nDie Aufnahme wird lokal auf diesem Gerät und zusätzlich in Firebase gelöscht.`,
  );
  if (!confirmed) return;

  firebaseState.textContent = "Aufnahme wird lokal und in Firebase gelöscht...";
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
  message.textContent = "Aufnahme lokal gelöscht.";

  if (metadata) {
    try {
      await deleteCloudRecording(metadata);
      firebaseState.textContent = "Aufnahme lokal und in Firebase gelöscht.";
      message.textContent = "Aufnahme vollständig gelöscht.";
    } catch (error) {
      console.warn("Firebase-Löschen fehlgeschlagen", error);
      firebaseState.textContent = "Aufnahme lokal gelöscht. Firebase-Löschen fehlgeschlagen.";
    }
  } else {
    firebaseState.textContent = "Aufnahme lokal gelöscht.";
  }
}

async function loadLatestRecording() {
  await refreshRecordings();
  const selectedPatient = getCurrentPatientName();
  const selectedPatientId = getCurrentPatientId();
  const latest = allRecordings
    .filter((recording) => isRecordingForPatient(recording, selectedPatientId, selectedPatient))
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



