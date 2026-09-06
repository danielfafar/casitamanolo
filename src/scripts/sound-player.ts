import { moods, type MoodId } from '../data/listening';

/** One audible voice, cancellable loading and a short crossfade between moods. */
export class SoundPlayer {
  private context?: AudioContext;
  private master?: GainNode;
  private active?: { source: AudioBufferSourceNode; gain: GainNode };
  private voices = new Set<AudioBufferSourceNode>();
  private buffers = new Map<MoodId, Promise<AudioBuffer>>();
  private request = 0;
  private disposed = false;
  private volume = 0.5;
  private abort = new AbortController();

  async play(id: MoodId, position: () => number = () => 0, rate = 1) {
    if (this.disposed) return false;
    const request = ++this.request;
    if (!this.context) {
      this.context = new AudioContext();
      this.master = this.context.createGain();
      this.master.gain.value = this.volume;
      this.master.connect(this.context.destination);
    }
    const context = this.context;
    await context.resume();
    if (!this.buffers.has(id)) {
      const source = moods.find(mood => mood.id === id)!.source;
      const pending = fetch(source, { signal: this.abort.signal })
        .then(response => {
          if (!response.ok) throw new Error('No se pudo cargar la música.');
          return response.arrayBuffer();
        })
        .then(bytes => context.decodeAudioData(bytes));
      this.buffers.set(id, pending);
      pending.catch(() => this.buffers.delete(id));
    }
    const buffer = await this.buffers.get(id)!;
    if (request !== this.request || this.disposed) return false;

    const source = context.createBufferSource();
    const gain = context.createGain();
    source.buffer = buffer;
    source.loop = true;
    source.playbackRate.value = rate;
    source.connect(gain);
    gain.connect(this.master!);
    const now = context.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(1, now + 0.18);
    if (this.active) {
      this.active.gain.gain.cancelAndHoldAtTime(now);
      this.active.gain.gain.linearRampToValueAtTime(0, now + 0.18);
      this.active.source.stop(now + 0.2);
    }
    this.voices.add(source);
    source.onended = () => {
      this.voices.delete(source);
      source.disconnect();
      gain.disconnect();
    };
    source.start(now, Math.max(0, position()) % buffer.duration);
    this.active = { source, gain };
    return true;
  }

  setVolume(value: number) {
    this.volume = Math.min(1, Math.max(0, value));
    if (this.context && this.master) {
      this.master.gain.setTargetAtTime(this.volume, this.context.currentTime, 0.02);
    }
  }

  stop() {
    ++this.request;
    for (const voice of this.voices) {
      try { voice.stop(); } catch { /* Already ended during a crossfade. */ }
    }
    this.voices.clear();
    this.active = undefined;
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.abort.abort();
    void this.context?.close();
  }
}
