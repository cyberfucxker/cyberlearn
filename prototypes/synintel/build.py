"""Inline screenshots, the recorded video and the console into one self-contained walkthrough HTML."""
import base64, pathlib, shutil, zipfile

ROOT = pathlib.Path(__file__).parent
SRC, DIST = ROOT / "src", ROOT / "dist"

def data_uri(path, mime):
    return f"data:{mime};base64," + base64.b64encode(path.read_bytes()).decode()

html = (SRC / "walkthrough.html").read_text()
for shot in (SRC / "shots").glob("*.png"):
    html = html.replace("{{SHOT_%s}}" % shot.stem, data_uri(shot, "image/png"))
html = html.replace("{{VIDEO}}", data_uri(SRC / "walkthrough.webm", "video/webm"))
html = html.replace("{{CONSOLE}}", data_uri(SRC / "console.html", "text/html"))
assert "{{" not in html, "unfilled placeholder"

DIST.mkdir(exist_ok=True)
out = DIST / "SynIntel_Prototype_Walkthrough.html"
out.write_text(html)
shutil.copy(SRC / "console.html", DIST / "SynIntel_Console.html")
shutil.copy(SRC / "walkthrough.webm", DIST / "SynIntel_Agent_Walkthrough.webm")
for i, name in enumerate(["overview", "ask", "graph", "governance"], 1):
    shutil.copy(SRC / "shots" / f"{name}.png", DIST / f"{i}_{name}.png")

with zipfile.ZipFile(DIST / "SynIntel_Prototype.zip", "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(DIST.iterdir()):
        if f.suffix != ".zip":
            z.write(f, f"SynIntel_Prototype/{f.name}")
print(f"{out} {out.stat().st_size/1e6:.1f} MB")
