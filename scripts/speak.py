import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
model = root / "tools" / "models" / "kokoro-v1.0.onnx"
voices = root / "tools" / "models" / "voices-v1.0.bin"
text = Path(sys.argv[1]).read_text().strip()
out = Path(sys.argv[2])

if not model.exists() or not voices.exists():
    raise SystemExit("Kokoro voice files are not downloaded.")

from kokoro_onnx import Kokoro
import soundfile as sf

kokoro = Kokoro(str(model), str(voices))
samples, rate = kokoro.create(text[:280], voice="bf_emma", speed=1.0, lang="en-gb")
out.parent.mkdir(parents=True, exist_ok=True)
sf.write(str(out), samples, rate)
