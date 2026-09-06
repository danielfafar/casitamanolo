import assert from 'node:assert/strict';
import { build } from 'esbuild';

// Test the real player outside a browser. The audio device and network are
// controlled so late responses and rapid channel changes are deterministic.
const built = await build({ entryPoints: ['src/scripts/sound-player.ts'], bundle: true, platform: 'node', format: 'esm', write: false });
const { SoundPlayer } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString('base64')}`);
const requests = new Map();
const contexts = [];
globalThis.fetch = (url, options) => new Promise((resolve, reject) => {
  requests.set(url, { resolve: () => resolve({ ok: true, arrayBuffer: async () => new ArrayBuffer(1) }), reject });
  options.signal.addEventListener('abort', () => reject(new Error('Aborted')), { once: true });
});
globalThis.AudioContext = class {
  currentTime = 20;
  destination = {};
  sources = [];
  gains = [];
  closed = false;
  constructor() { contexts.push(this); }
  async resume() {}
  async decodeAudioData() { return { duration: 16 }; }
  async close() { this.closed = true; }
  createGain() {
    const node = { gain: { value: 0, setValueAtTime(v) { this.value = v; }, linearRampToValueAtTime(v) { this.value = v; }, cancelAndHoldAtTime() {}, setTargetAtTime(v) { this.value = v; } }, connect() {}, disconnect() {} };
    this.gains.push(node); return node;
  }
  createBufferSource() {
    const node = { playbackRate: { value: 1 }, stops: [], connect() {}, disconnect() {}, start(when, offset) { this.started = { when, offset }; }, stop(when) { this.stops.push(when); if (when === undefined) this.onended?.(); } };
    this.sources.push(node); return node;
  }
};
const tick = () => new Promise(resolve => setImmediate(resolve));
const finish = mood => requests.get(`/sounds/demo-${mood}.mp3`).resolve();

const player = new SoundPlayer();
assert.equal(contexts.length, 0, 'No autoplay/audio context on page entry');
player.setVolume(.25);
const cancelled = player.play('calma');
await tick();
player.stop(); finish('calma');
assert.equal(await cancelled, false, 'Stopping during loading must cancel playback');
assert.equal(contexts[0].sources.length, 0);
assert.equal(contexts[0].gains[0].gain.value, .25, 'Volume set before play is retained');

const stale = player.play('nostalgia');
const newest = player.play('tension', () => 19.25, 1.5);
await tick(); finish('tension');
assert.equal(await newest, true);
finish('nostalgia');
assert.equal(await stale, false, 'Late channel responses cannot replace the selected channel');
assert.equal(contexts[0].sources.length, 1);
assert.equal(contexts[0].sources[0].started.offset, 3.25, 'Video clock is wrapped to audio duration');
assert.equal(contexts[0].sources[0].playbackRate.value, 1.5);

assert.equal(await player.play('calma', () => 5.5), true);
assert.equal(contexts[0].sources[1].started.offset, 5.5, 'Switching music preserves the supplied video time');
assert.equal(contexts[0].sources[0].stops[0], 20.2, 'Old voice is stopped after crossfade');
player.setVolume(10);
assert.equal(contexts[0].gains[0].gain.value, 1, 'Volume is clamped');
player.stop();
assert.ok(contexts[0].sources.every(source => source.stops.includes(undefined)), 'Pause stops every active/fading voice');

const pending = player.play('energia');
await tick(); player.dispose();
await assert.rejects(pending);
assert.equal(contexts[0].closed, true);
assert.equal(await player.play('calma'), false, 'Navigation disposal prevents restarting');
console.log('PASS: no autoplay, loading cancellation, rapid tuning, video offset/rate, crossfade, volume, pause and disposal.');
