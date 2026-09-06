"""Reproducible synthetic demos, not studio work. Requires numpy and ffmpeg."""
from pathlib import Path
import subprocess
import tempfile
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
RATE, SECONDS = 32000, 16
rng = np.random.default_rng(42)

def note(track, start, duration, midi, gain=0.14, soft=False):
    count = int(duration * RATE)
    t = np.arange(count) / RATE
    frequency = 440 * 2 ** ((midi - 69) / 12)
    signal = np.sin(2 * np.pi * frequency * t)
    signal += 0.22 * np.sin(2 * np.pi * frequency * 2 * t)
    envelope = np.minimum(t / (0.2 if soft else 0.012), 1)
    envelope *= np.exp(-t * (0.55 if soft else 2.3))
    envelope *= np.minimum((duration - t) / 0.08, 1)
    offset = int(start * RATE)
    end = min(len(track), offset + count)
    track[offset:end] += signal[:end-offset] * envelope[:end-offset] * gain

for mood in ('calma', 'nostalgia', 'tension', 'energia'):
    track = np.zeros(RATE * SECONDS)
    chords = {
        'calma': [[48, 55, 64, 71], [45, 52, 60, 67], [41, 48, 57, 64], [43, 50, 59, 67]],
        'nostalgia': [[45, 52, 60, 64], [41, 48, 57, 60], [48, 55, 64, 67], [43, 50, 59, 62]],
        'tension': [[45, 52, 58, 64], [45, 53, 58, 65], [41, 48, 56, 59], [40, 47, 53, 58]],
        'energia': [[48, 55, 60, 64], [43, 50, 59, 62], [45, 52, 60, 64], [41, 48, 57, 60]],
    }[mood]
    for bar, chord in enumerate(chords):
        start = bar * 4
        for midi in chord:
            note(track, start, 3.95, midi, gain=0.055, soft=True)
        if mood == 'calma':
            for step, degree in enumerate((2, 3, 1)):
                note(track, start + step * 1.25 + 0.15, 1.5, chord[degree] + 12, gain=0.09)
        else:
            spacing = 0.25 if mood == 'tension' else 0.5
            for step in range(int(4 / spacing)):
                note(track, start + step * spacing, 0.8, chord[step % 4] + 12, gain=0.07)
        if mood in ('energia', 'tension'):
            for beat in range(8):
                note(track, start + beat * 0.5, 0.42, chord[0] - 12, gain=0.2)
                t = np.arange(int(RATE * 0.18)) / RATE
                kick = np.sin(2 * np.pi * (52 * t + 4 * (1 - np.exp(-30 * t)))) * np.exp(-24 * t)
                offset = int((start + beat * 0.5) * RATE)
                track[offset:offset+len(kick)] += kick * (0.2 if mood == 'energia' else 0.07)
                if mood == 'energia':
                    hat = rng.normal(size=int(RATE * 0.07))
                    hat = np.diff(hat, prepend=0) * np.exp(-np.arange(len(hat)) / (RATE * 0.015)) * 0.035
                    track[offset:offset+len(hat)] += hat
    track /= max(1, np.max(np.abs(track)) / 0.7)
    fade = np.linspace(0, 1, int(RATE * 0.02))
    track[:len(fade)] *= fade
    track[-len(fade):] *= fade[::-1]
    with tempfile.TemporaryDirectory() as temporary:
        wav = Path(temporary) / 'demo.wav'
        with wave.open(str(wav), 'wb') as output:
            output.setnchannels(1)
            output.setsampwidth(2)
            output.setframerate(RATE)
            output.writeframes((track * 32767).astype('<i2').tobytes())
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(wav), '-af', 'loudnorm=I=-20:TP=-3:LRA=8', '-ar', '32000', '-b:a', '96k', str(ROOT / 'public/sounds' / f'demo-{mood}.mp3')], check=True)
    print(f'Generated {mood}: {SECONDS}s')
