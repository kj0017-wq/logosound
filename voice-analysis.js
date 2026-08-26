(() => {
  "use strict";

  const HISTORY_KEY = "logosound-voice-analysis-history";
  const MAX_SAMPLES = 900;
  const PAUSE_THRESHOLD = 12;
  const PAUSE_MIN_SECONDS = 0.45;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const round = (value, digits = 1) => {
    const factor = 10 ** digits;
    return Math.round(Number(value || 0) * factor) / factor;
  };

  function estimatePitch(buffer, sampleRate) {
    const size = buffer.length;
    let rms = 0;
    for (let index = 0; index < size; index += 1) rms += buffer[index] * buffer[index];
    rms = Math.sqrt(rms / Math.max(1, size));
    if (rms < 0.012) return 0;

    let start = 0;
    let end = size - 1;
    const threshold = 0.2;
    for (let index = 1; index < size; index += 1) {
      if (Math.abs(buffer[index]) > threshold) {
        start = Math.max(0, index - 2);
        break;
      }
    }
    for (let index = size - 1; index > start; index -= 1) {
      if (Math.abs(buffer[index]) > threshold) {
        end = Math.min(size - 1, index + 2);
        break;
      }
    }

    const correlations = [];
    const minLag = Math.floor(sampleRate / 360);
    const maxLag = Math.min(Math.floor(sampleRate / 70), end - start - 1);
    for (let lag = minLag; lag <= maxLag; lag += 1) {
      let correlation = 0;
      let energy = 0;
      for (let index = start; index + lag < end; index += 1) {
        correlation += buffer[index] * buffer[index + lag];
        energy += buffer[index] * buffer[index];
      }
      correlations.push({ lag, value: energy ? correlation / energy : 0 });
    }
    if (!correlations.length) return 0;
    const best = correlations.reduce((winner, item) => item.value > winner.value ? item : winner, correlations[0]);
    if (best.value < 0.28) return 0;
    return clamp(sampleRate / best.lag, 70, 360);
  }

  function readHistory() {
    try {
      const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  }

  class VoiceAnalysisEngine {
    constructor() {
      this.audioContext = null;
      this.stream = null;
      this.source = null;
      this.analyser = null;
      this.recorder = null;
      this.recordChunks = [];
      this.animationFrameId = 0;
      this.startedAt = 0;
      this.pausedAt = 0;
      this.totalPausedMs = 0;
      this.listeners = new Set();
      this.samples = [];
      this.pitchSamples = [];
      this.volumeSamples = [];
      this.pauseStartedAt = 0;
      this.pauses = [];
      this.lastSnapshot = this.emptySnapshot();
    }

    emptySnapshot() {
      return {
        state: "idle",
        elapsedSeconds: 0,
        activeSpeechSeconds: 0,
        volume: { current: 0, average: 0, min: 0, max: 0 },
        pitch: { current: 0, average: 0, min: 0, max: 0, variation: 0 },
        pauses: { count: 0, totalDuration: 0, averageDuration: 0, longest: 0 },
        speechRate: { wordsPerMinute: 0, syllablesPerMinute: 0 },
        waveform: [],
        pitchHistory: [],
        volumeHistory: [],
        recordingBlob: null,
      };
    }

    subscribe(listener) {
      if (typeof listener !== "function") return () => {};
      this.listeners.add(listener);
      listener(this.lastSnapshot);
      return () => this.listeners.delete(listener);
    }

    emit(snapshot = this.getSnapshot()) {
      this.lastSnapshot = snapshot;
      this.listeners.forEach((listener) => listener(snapshot));
    }

    async start() {
      if (this.stream && this.audioContext && this.audioContext.state !== "closed") {
        if (this.audioContext.state === "suspended") await this.audioContext.resume();
        this.emit({ ...this.getSnapshot(), state: this.recorder?.state === "recording" ? "recording" : "live" });
        return true;
      }
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Dieser Browser unterstützt keinen Mikrofonzugriff.");
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: false },
        video: false,
      });
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) throw new Error("Audioanalyse wird von diesem Browser nicht unterstützt.");
      this.audioContext = new AudioContextConstructor();
      await this.audioContext.resume();
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.72;
      this.source.connect(this.analyser);
      this.samples = [];
      this.pitchSamples = [];
      this.volumeSamples = [];
      this.pauses = [];
      this.startedAt = performance.now();
      this.pausedAt = 0;
      this.totalPausedMs = 0;
      this.pauseStartedAt = 0;
      this.emit({ ...this.emptySnapshot(), state: "live" });
      this.monitor();
      return true;
    }

    monitor() {
      if (!this.analyser) return;
      const buffer = new Float32Array(this.analyser.fftSize);
      const sampleRate = this.audioContext?.sampleRate || 44100;
      const tick = () => {
        if (!this.analyser) return;
        this.analyser.getFloatTimeDomainData(buffer);
        let sum = 0;
        let peak = 0;
        for (let index = 0; index < buffer.length; index += 1) {
          sum += buffer[index] * buffer[index];
          peak = Math.max(peak, Math.abs(buffer[index]));
        }
        const rms = Math.sqrt(sum / Math.max(1, buffer.length));
        const volume = clamp(Math.round(20 * Math.log10(Math.max(0.0001, rms)) + 100), 0, 100);
        const pitch = estimatePitch(buffer, sampleRate);
        const now = performance.now();
        const elapsed = Math.max(0, (now - this.startedAt - this.totalPausedMs) / 1000);
        const speechActive = volume >= PAUSE_THRESHOLD;
        if (speechActive && this.pauseStartedAt) {
          const duration = (now - this.pauseStartedAt) / 1000;
          if (duration >= PAUSE_MIN_SECONDS) this.pauses.push(duration);
          this.pauseStartedAt = 0;
        } else if (!speechActive && !this.pauseStartedAt && this.volumeSamples.length) {
          this.pauseStartedAt = now;
        }
        this.samples.push({ time: elapsed, amplitude: round(peak * 100, 1) });
        this.volumeSamples.push({ time: elapsed, value: volume });
        if (pitch > 0) this.pitchSamples.push({ time: elapsed, value: pitch });
        if (this.samples.length > MAX_SAMPLES) this.samples.shift();
        if (this.volumeSamples.length > MAX_SAMPLES) this.volumeSamples.shift();
        if (this.pitchSamples.length > MAX_SAMPLES) this.pitchSamples.shift();
        this.emit(this.getSnapshot({ volume, pitch, elapsedSeconds: elapsed }));
        this.animationFrameId = window.requestAnimationFrame(tick);
      };
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = window.requestAnimationFrame(tick);
    }

    async startRecording() {
      await this.start();
      if (!window.MediaRecorder) throw new Error("Aufnahme wird von diesem Browser nicht unterstützt.");
      if (this.recorder?.state === "paused") this.recorder.resume();
      if (this.recorder?.state === "recording") return;
      const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find((type) => MediaRecorder.isTypeSupported?.(type)) || "";
      this.recordChunks = [];
      this.recorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : undefined);
      this.recorder.addEventListener("dataavailable", (event) => {
        if (event.data?.size) this.recordChunks.push(event.data);
      });
      this.recorder.addEventListener("stop", () => {
        const type = this.recorder?.mimeType || mimeType || "audio/webm";
        const blob = new Blob(this.recordChunks, { type });
        this.emit({ ...this.getSnapshot(), state: "stopped", recordingBlob: blob });
      }, { once: true });
      this.recorder.start(250);
      this.emit({ ...this.getSnapshot(), state: "recording" });
    }

    pauseRecording() {
      if (this.recorder?.state === "recording") {
        this.recorder.pause();
        this.pausedAt = performance.now();
        this.emit({ ...this.getSnapshot(), state: "paused" });
      }
    }

    resumeRecording() {
      if (this.recorder?.state === "paused") {
        this.totalPausedMs += Math.max(0, performance.now() - this.pausedAt);
        this.pausedAt = 0;
        this.recorder.resume();
        this.emit({ ...this.getSnapshot(), state: "recording" });
      }
    }

    stopRecording() {
      if (this.recorder?.state === "recording" || this.recorder?.state === "paused") this.recorder.stop();
      else this.emit({ ...this.getSnapshot(), state: "stopped" });
    }

    reset() {
      this.samples = [];
      this.pitchSamples = [];
      this.volumeSamples = [];
      this.pauses = [];
      this.startedAt = performance.now();
      this.totalPausedMs = 0;
      this.emit({ ...this.emptySnapshot(), state: this.stream ? "live" : "idle" });
    }

    async stop() {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
      if (this.recorder && this.recorder.state !== "inactive") this.recorder.stop();
      this.source?.disconnect?.();
      this.analyser?.disconnect?.();
      this.stream?.getTracks?.().forEach((track) => track.stop());
      if (this.audioContext && this.audioContext.state !== "closed") await this.audioContext.close();
      this.source = null;
      this.analyser = null;
      this.stream = null;
      this.audioContext = null;
      this.recorder = null;
      this.emit({ ...this.getSnapshot(), state: "idle" });
    }

    getSnapshot(overrides = {}) {
      const volumes = this.volumeSamples.map((item) => item.value).filter(Number.isFinite);
      const pitches = this.pitchSamples.map((item) => item.value).filter(Number.isFinite);
      const now = performance.now();
      const elapsedSeconds = overrides.elapsedSeconds ?? (this.startedAt ? Math.max(0, (now - this.startedAt - this.totalPausedMs) / 1000) : 0);
      const pauseList = this.pauses.slice();
      const currentPause = this.pauseStartedAt ? Math.max(0, (now - this.pauseStartedAt) / 1000) : 0;
      if (currentPause >= PAUSE_MIN_SECONDS) pauseList.push(currentPause);
      const activeSpeechSeconds = Math.max(0, elapsedSeconds - pauseList.reduce((sum, value) => sum + value, 0));
      return {
        state: overrides.state || (this.recorder?.state === "recording" ? "recording" : this.stream ? "live" : "idle"),
        elapsedSeconds: round(elapsedSeconds, 2),
        activeSpeechSeconds: round(activeSpeechSeconds, 2),
        volume: {
          current: round(overrides.volume ?? volumes.at(-1) ?? 0),
          average: round(average(volumes)),
          min: round(volumes.length ? Math.min(...volumes) : 0),
          max: round(volumes.length ? Math.max(...volumes) : 0),
        },
        pitch: {
          current: round(overrides.pitch ?? pitches.at(-1) ?? 0),
          average: round(average(pitches)),
          min: round(pitches.length ? Math.min(...pitches) : 0),
          max: round(pitches.length ? Math.max(...pitches) : 0),
          variation: round(pitches.length ? Math.max(...pitches) - Math.min(...pitches) : 0),
        },
        pauses: {
          count: pauseList.length,
          totalDuration: round(pauseList.reduce((sum, value) => sum + value, 0), 2),
          averageDuration: round(average(pauseList), 2),
          longest: round(pauseList.length ? Math.max(...pauseList) : 0, 2),
        },
        speechRate: { wordsPerMinute: 0, syllablesPerMinute: 0 },
        waveform: this.samples.slice(),
        pitchHistory: this.pitchSamples.slice(),
        volumeHistory: this.volumeSamples.slice(),
        recordingBlob: overrides.recordingBlob ?? this.lastSnapshot?.recordingBlob ?? null,
      };
    }

    saveSnapshot(snapshot, label = "Stimmanalyse") {
      const entry = {
        id: `voice-${Date.now()}`,
        date: new Date().toISOString(),
        label,
        duration: snapshot.elapsedSeconds,
        activeSpeechSeconds: snapshot.activeSpeechSeconds,
        volume: snapshot.volume,
        pitch: snapshot.pitch,
        pauses: snapshot.pauses,
        speechRate: snapshot.speechRate,
        pitchHistory: snapshot.pitchHistory.slice(-MAX_SAMPLES),
        volumeHistory: snapshot.volumeHistory.slice(-MAX_SAMPLES),
      };
      const history = [entry, ...readHistory()].slice(0, 200);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      return entry;
    }

    save(label = "Stimmanalyse") {
      return this.saveSnapshot(this.getSnapshot(), label);
    }

    history() {
      return readHistory();
    }
  }

  window.LogoSoundVoiceAnalysis = {
    engine: new VoiceAnalysisEngine(),
    PAUSE_THRESHOLD,
    readHistory,
  };
})();
