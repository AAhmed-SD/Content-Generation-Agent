import sys

from faster_whisper import WhisperModel

model = WhisperModel("tiny", device="cpu", compute_type="int8")
segments, _info = model.transcribe(sys.argv[1], vad_filter=True)
print(" ".join(segment.text.strip() for segment in segments if segment.text.strip()))
