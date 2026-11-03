import json
import re
from pathlib import Path

import numpy as np
import soundfile as sf
from faster_whisper import WhisperModel
from kokoro_onnx import Kokoro

root = Path(__file__).resolve().parents[1]
model = root / "tools" / "models" / "kokoro-v1.0.onnx"
voices = root / "tools" / "models" / "voices-v1.0.bin"
speech_path = root / "remotion" / "public" / "issue-speech.wav"
voice_path = root / "remotion" / "public" / "issue-voice.wav"
props_path = root / "web" / "data" / "renders" / "claude-issues.props.json"

tint = {
    "what", "do", "i", "the", "a", "an", "is", "in", "on", "it", "of", "and",
    "to", "before", "you", "my", "that", "went", "keep", "just", "it's", "its",
}
scenes = [
    {"text": "What do I study today?", "keys": ["study", "today"], "object": "cards", "shape": "circle", "enter": "wipe"},
    {"text": "The next session is already there.", "keys": ["already", "there"], "object": "none", "shape": "none", "enter": "bars"},
    {"text": "My week is already full.", "keys": ["full"], "object": "calendar", "shape": "panel", "enter": "wipe"},
    {"text": "Study goes in the free time.", "keys": ["free"], "object": "none", "shape": "none", "enter": "bars"},
    {"text": "I missed a day.", "keys": ["missed"], "object": "calendar", "shape": "triangle", "enter": "whip"},
    {"text": "The plan stays.", "keys": ["stays"], "object": "none", "shape": "none", "enter": "bars"},
    {"text": "Now it's gone.", "keys": ["gone"], "object": "curve", "shape": "circle", "enter": "wipe"},
    {"text": "The card comes back before you forget.", "keys": ["card", "forget"], "object": "cards", "shape": "panel", "enter": "whip"},
    {"text": "That test went badly.", "keys": ["badly"], "object": "pages", "shape": "triangle", "enter": "wipe"},
    {"text": "The topic comes back sooner.", "keys": ["sooner"], "object": "none", "shape": "none", "enter": "bars"},
    {"text": "New notes keep landing.", "keys": ["notes"], "object": "notes", "shape": "circle", "enter": "wipe"},
    {"text": "Finished work stays.", "keys": ["finished", "stays"], "object": "none", "shape": "none", "enter": "bars"},
    {"text": "No planning. Just studying.", "keys": ["planning", "studying"], "object": "none", "shape": "none", "enter": "whip", "endCard": True},
]

kokoro = Kokoro(str(model), str(voices))
pieces = []
rate = 24000
cursor = 0.25
pieces.append(np.zeros(int(cursor * rate), dtype=np.float32))
timed = []
for scene in scenes:
    audio, spoken = kokoro.create(scene["text"], voice="bf_emma", speed=1.02, lang="en-gb")
    rate = spoken
    audio = np.asarray(audio, dtype=np.float32)
    start = cursor
    pieces.append(audio)
    cursor += len(audio) / rate
    timed.append({**scene, "start": round(start, 3), "end": round(cursor, 3)})
    gap = 0.42
    pieces.append(np.zeros(int(gap * rate), dtype=np.float32))
    cursor += gap

speech = np.concatenate(pieces)
peak = float(np.max(np.abs(speech))) or 1
speech = speech / peak * 0.85
sf.write(speech_path, speech, rate)

whisper = WhisperModel("tiny", device="cpu", compute_type="int8")
heard_audio = speech
if rate != 16000:
    heard_audio = np.interp(
        np.linspace(0, len(speech) - 1, int(len(speech) * 16000 / rate)),
        np.arange(len(speech)),
        speech,
    ).astype(np.float32)
segments, _info = whisper.transcribe(heard_audio, word_timestamps=True, vad_filter=False, language="en")
heard = []
for segment in segments:
    for word in segment.words or []:
        heard.append({"text": word.word.strip(), "start": float(word.start), "end": float(word.end)})


def bare(token):
    return re.sub(r"[^a-z']", "", token.lower())


def role_for(token, keys):
    word = bare(token)
    if word in keys:
        return "key"
    if word in tint:
        return "tint"
    return "plain"


def align(scene):
    planned = re.findall(r"[A-Za-z']+[?.!]*", scene["text"])
    inside = [word for word in heard if scene["start"] - 0.08 <= word["start"] < scene["end"] + 0.05]
    rows = []
    for index, token in enumerate(planned):
        if index < len(inside):
            start = inside[index]["start"]
            end = inside[index]["end"]
        elif inside:
            start = inside[-1]["end"] + 0.12 * (index - len(inside) + 1)
            end = start + 0.18
        else:
            span = max(0.2, scene["end"] - scene["start"])
            start = scene["start"] + span * index / max(len(planned), 1)
            end = start + span / max(len(planned), 1)
        rows.append({"text": token, "start": round(start, 3), "end": round(end, 3), "role": role_for(token, scene["keys"])})
    return rows


film_scenes = []
for scene in timed:
    film_scenes.append({
        "object": scene["object"],
        "shape": scene["shape"],
        "enter": scene["enter"],
        "endCard": bool(scene.get("endCard")),
        "start": scene["start"],
        "until": scene["end"],
        "words": align(scene),
    })

ticks = np.zeros_like(speech)
for scene in film_scenes:
    for word in scene["words"]:
        start = int(word["start"] * rate)
        length = int(0.035 * rate)
        for i in range(length):
            at = start + i
            if 0 <= at < len(ticks):
                u = i / rate
                ticks[at] += np.sin(2 * np.pi * 1800 * u) * np.exp(-u * 90) * 0.22

mixed = speech + ticks
mixed_peak = float(np.max(np.abs(mixed))) or 1
if mixed_peak > 0.9:
    mixed = mixed / mixed_peak * 0.9
sf.write(voice_path, mixed, rate)

fps = 30
duration = int(np.ceil((cursor + 0.4) * fps))
props = {
    "composition": "FastIssues",
    "hold": 60,
    "endBold": "No planning.",
    "endItalic": "Just studying.",
    "voice": "issue-voice.wav",
    "durationFrames": duration,
    "beats": [],
    "scenes": film_scenes,
}
props_path.write_text(json.dumps(props, indent=2))
print(f"seconds {cursor:.2f} frames {duration} scenes {len(film_scenes)} words {sum(len(scene['words']) for scene in film_scenes)}")
for scene in film_scenes:
    spoken = " ".join(word["text"] for word in scene["words"])
    print(f"{scene['start']:.2f} {spoken}")
