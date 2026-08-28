(() => {
  "use strict";

  const HISTORY_KEY = "logosound-voice-analysis-history";
  const MAX_SAMPLES = 900;
  const PAUSE_THRESHOLD = 12;
  const PAUSE_MIN_SECONDS = 0.45;
  const SPECTRUM_MIN_HZ = 50;
  const SPECTRUM_MAX_HZ = 3500;
  const SPECTRUM_BUCKETS = 96;
  const SPECTRUM_MAX_LEVEL = 40;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  const round = (value, digits = 1) => {
    const factor = 10 ** digits;
    return Math.round(Number(value || 0) * factor) / factor;
  };

  function getVoiceAnalysisAudioConstraints(relaxed = false) {
    if (relaxed) {
      return { echoCancellation: false, noiseSuppression: false, autoGainControl: true };
    }
    return { echoCancellation: true, noiseSuppression: true, autoGainControl: false };
  }

  function getItemTime(item, index, length, duration, sourceDuration = duration) {
    const rawTime = Number(item?.time);
    if (Number.isFinite(rawTime)) {
      if (duration > 1 && rawTime >= 0 && rawTime <= 1.05) return rawTime * duration;
      if (duration > 0 && sourceDuration > 0 && Math.abs(sourceDuration - duration) > 0.05) {
        return clamp(rawTime / sourceDuration, 0, 1) * duration;
      }
      return rawTime;
    }
    return duration && length > 1 ? (index / (length - 1)) * duration : index / Math.max(1, length);
  }

  function getVisibleTimelineItems(items = [], positionSeconds = 0, durationSeconds = 0, sourceDurationSeconds = durationSeconds) {
    if (!Array.isArray(items) || !items.length) return [];
    const duration = Math.max(0, Number(durationSeconds) || 0);
    const sourceDuration = Math.max(0, Number(sourceDurationSeconds) || duration);
    const position = clamp(Number(positionSeconds) || 0, 0, duration || Number.MAX_SAFE_INTEGER);
    if (position <= 0) {
      return items.slice(0, Math.min(items.length, Math.max(1, Math.ceil(items.length * 0.015))));
    }
    const visible = items.filter((item, index) => getItemTime(item, index, items.length, duration, sourceDuration) <= position);
    if (visible.length) return visible;
    const ratio = duration ? clamp(position / duration, 0, 1) : 0;
    const count = Math.max(1, Math.min(items.length, Math.ceil(items.length * ratio)));
    return items.slice(0, count);
  }

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

  function emptySpectrum() {
    return {
      minHz: SPECTRUM_MIN_HZ,
      maxHz: SPECTRUM_MAX_HZ,
      maxLevel: SPECTRUM_MAX_LEVEL,
      peakHz: 0,
      peakLevel: 0,
      averageLevel: 0,
      bins: [],
    };
  }

  function buildSpectrum(frequencyData, sampleRate, fftSize) {
    if (!frequencyData?.length || !sampleRate || !fftSize) return emptySpectrum();
    const binHz = sampleRate / fftSize;
    const firstBin = Math.max(1, Math.floor(SPECTRUM_MIN_HZ / binHz));
    const lastBin = Math.min(frequencyData.length - 1, Math.ceil(SPECTRUM_MAX_HZ / binHz));
    const span = Math.max(1, lastBin - firstBin);
    const bins = [];
    let peakHz = 0;
    let peakLevel = 0;
    let levelSum = 0;
    for (let bucket = 0; bucket < SPECTRUM_BUCKETS; bucket += 1) {
      const from = Math.floor(firstBin + (bucket / SPECTRUM_BUCKETS) * span);
      const to = Math.max(from, Math.floor(firstBin + ((bucket + 1) / SPECTRUM_BUCKETS) * span));
      let max = 0;
      let sum = 0;
      let count = 0;
      for (let bin = from; bin <= to; bin += 1) {
        const value = Number(frequencyData[bin] || 0);
        max = Math.max(max, value);
        sum += value;
        count += 1;
      }
      const raw = count ? Math.max(max * 0.72, sum / count) : 0;
      const level = clamp(round((raw / 255) * SPECTRUM_MAX_LEVEL, 1), 0, SPECTRUM_MAX_LEVEL);
      const hz = Math.round((from + to) * 0.5 * binHz);
      bins.push({ hz, level });
      if (level > peakLevel) {
        peakLevel = level;
        peakHz = hz;
      }
      levelSum += level;
    }
    return {
      minHz: SPECTRUM_MIN_HZ,
      maxHz: SPECTRUM_MAX_HZ,
      maxLevel: SPECTRUM_MAX_LEVEL,
      peakHz,
      peakLevel: round(peakLevel, 1),
      averageLevel: round(levelSum / Math.max(1, bins.length), 1),
      bins,
    };
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
      this.silentGain = null;
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
      this.currentSpectrum = null;
      this.importedSnapshot = null;
      this.importedPlayback = null;
      this.playbackPositionSeconds = 0;
      this.playbackPlaying = false;
      this.playbackStartedAt = 0;
      this.pauseStartedAt = 0;
      this.pauses = [];
      this.trainingText = "";
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
        spectrum: emptySpectrum(),
        recordingBlob: null,
        trainingText: "",
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
        this.ensureSignalOrReconnect();
        return true;
      }
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Dieser Browser unterstützt keinen Mikrofonzugriff.");
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: getVoiceAnalysisAudioConstraints(false),
        video: false,
      });
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextConstructor) throw new Error("Audioanalyse wird von diesem Browser nicht unterstützt.");
      this.audioContext = new AudioContextConstructor();
      await this.audioContext.resume();
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.silentGain = this.audioContext.createGain();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.72;
      this.silentGain.gain.value = 0.00001;
      this.source.connect(this.analyser);
      this.analyser.connect(this.silentGain);
      this.silentGain.connect(this.audioContext.destination);
      this.samples = [];
      this.pitchSamples = [];
      this.volumeSamples = [];
      this.currentSpectrum = null;
      this.importedSnapshot = null;
      this.importedPlayback = null;
      this.playbackPositionSeconds = 0;
      this.playbackPlaying = false;
      this.pauses = [];
      this.currentSpectrum = null;
      this.importedSnapshot = null;
      this.startedAt = performance.now();
      this.pausedAt = 0;
      this.totalPausedMs = 0;
      this.pauseStartedAt = 0;
      this.emit({ ...this.emptySnapshot(), state: "live" });
      this.monitor();
      this.ensureSignalOrReconnect();
      return true;
    }

    ensureSignalOrReconnect() {
      window.setTimeout(async () => {
        if (!this.analyser || this.importedSnapshot || this.volumeSamples.some((item) => Number(item?.value) > 0)) return;
        try {
          await this.reconnectMicrophone(true);
        } catch (error) {
          this.emit({ ...this.getSnapshot(), state: "error", error: "Mikrofon ist aktiv, liefert aber kein messbares Signal." });
        }
      }, 900);
    }

    async reconnectMicrophone(relaxed = false) {
      window.cancelAnimationFrame(this.animationFrameId);
      try { this.source?.disconnect?.(); } catch (error) {}
      try { this.analyser?.disconnect?.(); } catch (error) {}
      try { this.silentGain?.disconnect?.(); } catch (error) {}
      this.stream?.getTracks?.().forEach((track) => track.stop());
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: getVoiceAnalysisAudioConstraints(relaxed),
        video: false,
      });
      if (!this.audioContext || this.audioContext.state === "closed") {
        const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContextConstructor();
      }
      if (this.audioContext.state === "suspended") await this.audioContext.resume();
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.silentGain = this.audioContext.createGain();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.72;
      this.silentGain.gain.value = 0.00001;
      this.source.connect(this.analyser);
      this.analyser.connect(this.silentGain);
      this.silentGain.connect(this.audioContext.destination);
      this.monitor();
    }

    monitor() {
      if (!this.analyser) return;
      const buffer = new Float32Array(this.analyser.fftSize);
      const frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      const sampleRate = this.audioContext?.sampleRate || 44100;
      const tick = () => {
        if (!this.analyser) return;
        this.analyser.getFloatTimeDomainData(buffer);
        this.analyser.getByteFrequencyData(frequencyData);
        let sum = 0;
        let peak = 0;
        for (let index = 0; index < buffer.length; index += 1) {
          sum += buffer[index] * buffer[index];
          peak = Math.max(peak, Math.abs(buffer[index]));
        }
        const rms = Math.sqrt(sum / Math.max(1, buffer.length));
        const volume = clamp(Math.round(20 * Math.log10(Math.max(0.0001, rms)) + 100), 0, 100);
        const pitch = estimatePitch(buffer, sampleRate);
        this.currentSpectrum = buildSpectrum(frequencyData, sampleRate, this.analyser.fftSize);
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
        const amplitude = clamp(Math.max(Math.sqrt(peak) * 105, peak * 360, rms * 480), 0, 100);
        this.samples.push({ time: elapsed, amplitude: round(amplitude, 1) });
        this.volumeSamples.push({ time: elapsed, value: volume });
        if (pitch > 0) this.pitchSamples.push({ time: elapsed, value: pitch });
        if (this.samples.length > MAX_SAMPLES) this.samples.shift();
        if (this.volumeSamples.length > MAX_SAMPLES) this.volumeSamples.shift();
        if (this.pitchSamples.length > MAX_SAMPLES) this.pitchSamples.shift();
        this.emit(this.getSnapshot({ volume, pitch, spectrum: this.currentSpectrum, elapsedSeconds: elapsed }));
        this.animationFrameId = window.requestAnimationFrame(tick);
      };
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = window.requestAnimationFrame(tick);
    }

    setTrainingText(text = "") {
      this.trainingText = String(text || "").trim();
      this.emit(this.getSnapshot({ trainingText: this.trainingText }));
    }

    async startRecording(trainingText = "") {
      if (trainingText) this.trainingText = String(trainingText || "").trim();
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
      this.emit({ ...this.getSnapshot({ trainingText: this.trainingText }), state: "recording" });
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
        this.emit({ ...this.getSnapshot({ trainingText: this.trainingText }), state: "recording" });
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
      this.currentSpectrum = null;
      this.pauses = [];
      this.currentSpectrum = null;
      this.importedSnapshot = null;
      this.importedPlayback = null;
      this.playbackPositionSeconds = 0;
      this.playbackPlaying = false;
      this.startedAt = performance.now();
      this.totalPausedMs = 0;
      this.trainingText = "";
      this.emit({ ...this.emptySnapshot(), state: this.stream ? "live" : "idle" });
    }

    loadSnapshot(snapshot = {}) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
      this.samples = Array.isArray(snapshot.waveform) ? snapshot.waveform.slice(-MAX_SAMPLES) : [];
      this.pitchSamples = Array.isArray(snapshot.pitchHistory) ? snapshot.pitchHistory.slice(-MAX_SAMPLES) : [];
      this.volumeSamples = Array.isArray(snapshot.volumeHistory) ? snapshot.volumeHistory.slice(-MAX_SAMPLES) : [];
      this.pauses = Array.isArray(snapshot.pauseDurations) ? snapshot.pauseDurations.slice() : [];
      this.currentSpectrum = snapshot.spectrum || emptySpectrum();
      this.importedSnapshot = { ...snapshot };
      this.importedPlayback = {
        waveform: this.samples.slice(),
        pitchHistory: this.pitchSamples.slice(),
        volumeHistory: this.volumeSamples.slice(),
        duration: Math.max(0, Number(snapshot.elapsedSeconds) || 0),
        sourceDuration: Math.max(0, Number(snapshot.elapsedSeconds) || 0),
      };
      this.playbackPositionSeconds = 0;
      this.playbackPlaying = false;
      this.startedAt = performance.now() - Math.max(0, Number(snapshot.elapsedSeconds) || 0) * 1000;
      this.totalPausedMs = 0;
      this.pauseStartedAt = 0;
      this.emit({
        ...this.getSnapshot({
          state: "playback",
          elapsedSeconds: Number(snapshot.elapsedSeconds) || 0,
          recordingBlob: snapshot.recordingBlob || null,
        }),
        label: snapshot.label || "Playback",
      });
    }

    playImportedTimeline() {
      if (!this.importedPlayback?.duration) return false;
      this.playbackPlaying = true;
      this.playbackStartedAt = performance.now() - this.playbackPositionSeconds * 1000;
      const tick = () => {
        if (!this.playbackPlaying || !this.importedPlayback) return;
        this.playbackPositionSeconds = Math.min(
          this.importedPlayback.duration,
          Math.max(0, (performance.now() - this.playbackStartedAt) / 1000),
        );
        this.emit(this.getSnapshot({ state: "playback" }));
        if (this.playbackPositionSeconds >= this.importedPlayback.duration) {
          this.playbackPlaying = false;
          return;
        }
        this.animationFrameId = window.requestAnimationFrame(tick);
      };
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = window.requestAnimationFrame(tick);
      return true;
    }

    pauseImportedTimeline() {
      if (!this.importedPlayback) return false;
      this.playbackPlaying = false;
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
      this.emit(this.getSnapshot({ state: "playback" }));
      return true;
    }

    seekImportedTimeline(positionSeconds) {
      if (!this.importedPlayback) return false;
      const duration = this.importedPlayback.duration || 0;
      this.playbackPositionSeconds = clamp(Number(positionSeconds) || 0, 0, duration);
      if (this.playbackPlaying) this.playbackStartedAt = performance.now() - this.playbackPositionSeconds * 1000;
      this.emit(this.getSnapshot({ state: "playback" }));
      return true;
    }

    setImportedDuration(durationSeconds) {
      if (!this.importedPlayback) return false;
      const duration = Math.max(0, Number(durationSeconds) || 0);
      if (!duration || duration <= this.importedPlayback.duration + 0.05) return false;
      this.importedPlayback.duration = duration;
      if (this.importedSnapshot) this.importedSnapshot.elapsedSeconds = duration;
      this.emit(this.getSnapshot({ state: "playback" }));
      return true;
    }

    async stop() {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = 0;
      if (this.recorder && this.recorder.state !== "inactive") this.recorder.stop();
      this.source?.disconnect?.();
      this.analyser?.disconnect?.();
      this.silentGain?.disconnect?.();
      this.stream?.getTracks?.().forEach((track) => track.stop());
      if (this.audioContext && this.audioContext.state !== "closed") await this.audioContext.close();
      this.source = null;
      this.analyser = null;
      this.silentGain = null;
      this.stream = null;
      this.audioContext = null;
      this.recorder = null;
      this.importedSnapshot = null;
      this.importedPlayback = null;
      this.playbackPositionSeconds = 0;
      this.playbackPlaying = false;
      this.emit({ ...this.getSnapshot(), state: "idle" });
    }

    getSnapshot(overrides = {}) {
      const durationForImported = this.importedPlayback?.duration || Number(this.importedSnapshot?.elapsedSeconds) || 0;
      const playbackPosition = this.importedPlayback
        ? clamp(this.playbackPositionSeconds, 0, durationForImported)
        : 0;
      const visibleSamples = this.importedPlayback
        ? getVisibleTimelineItems(this.importedPlayback.waveform, playbackPosition, durationForImported, this.importedPlayback.sourceDuration)
        : this.samples;
      const visiblePitchSamples = this.importedPlayback
        ? getVisibleTimelineItems(this.importedPlayback.pitchHistory, playbackPosition, durationForImported, this.importedPlayback.sourceDuration)
        : this.pitchSamples;
      const visibleVolumeSamples = this.importedPlayback
        ? getVisibleTimelineItems(this.importedPlayback.volumeHistory, playbackPosition, durationForImported, this.importedPlayback.sourceDuration)
        : this.volumeSamples;
      const volumes = visibleVolumeSamples.map((item) => item.value).filter(Number.isFinite);
      const pitches = visiblePitchSamples.map((item) => item.value).filter(Number.isFinite);
      const allVolumes = (this.importedPlayback ? this.importedPlayback.volumeHistory : this.volumeSamples)
        .map((item) => item.value)
        .filter(Number.isFinite);
      const allPitches = (this.importedPlayback ? this.importedPlayback.pitchHistory : this.pitchSamples)
        .map((item) => item.value)
        .filter(Number.isFinite);
      const now = performance.now();
      const elapsedSeconds = overrides.elapsedSeconds ?? (this.importedSnapshot ? playbackPosition : this.startedAt ? Math.max(0, (now - this.startedAt - this.totalPausedMs) / 1000) : 0);
      const pauseList = this.pauses.slice();
      const currentPause = this.pauseStartedAt ? Math.max(0, (now - this.pauseStartedAt) / 1000) : 0;
      if (currentPause >= PAUSE_MIN_SECONDS) pauseList.push(currentPause);
      const activeSpeechSeconds = Math.max(0, elapsedSeconds - pauseList.reduce((sum, value) => sum + value, 0));
      return {
        state: overrides.state || this.importedSnapshot?.state || (this.recorder?.state === "recording" ? "recording" : this.stream ? "live" : "idle"),
        elapsedSeconds: round(elapsedSeconds, 2),
        activeSpeechSeconds: round(activeSpeechSeconds, 2),
        volume: {
          current: round(overrides.volume ?? volumes.at(-1) ?? 0),
          average: round(average(allVolumes)),
          min: round(allVolumes.length ? Math.min(...allVolumes) : 0),
          max: round(allVolumes.length ? Math.max(...allVolumes) : 0),
        },
        pitch: {
          current: round(overrides.pitch ?? pitches.at(-1) ?? 0),
          average: round(average(allPitches)),
          min: round(allPitches.length ? Math.min(...allPitches) : 0),
          max: round(allPitches.length ? Math.max(...allPitches) : 0),
          variation: round(allPitches.length ? Math.max(...allPitches) - Math.min(...allPitches) : 0),
        },
        pauses: {
          count: pauseList.length,
          totalDuration: round(pauseList.reduce((sum, value) => sum + value, 0), 2),
          averageDuration: round(average(pauseList), 2),
          longest: round(pauseList.length ? Math.max(...pauseList) : 0, 2),
        },
        speechRate: this.importedSnapshot?.speechRate || { wordsPerMinute: 0, syllablesPerMinute: 0 },
        waveform: visibleSamples.slice(),
        pitchHistory: visiblePitchSamples.slice(),
        volumeHistory: visibleVolumeSamples.slice(),
        spectrum: overrides.spectrum || this.currentSpectrum || emptySpectrum(),
        recordingBlob: overrides.recordingBlob ?? this.importedSnapshot?.recordingBlob ?? this.lastSnapshot?.recordingBlob ?? null,
        trainingText: overrides.trainingText ?? this.importedSnapshot?.trainingText ?? this.trainingText ?? "",
        playback: this.importedPlayback ? {
          position: round(playbackPosition, 2),
          duration: round(durationForImported, 2),
          playing: this.playbackPlaying,
        } : null,
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





