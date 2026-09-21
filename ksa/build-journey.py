#!/usr/bin/env python3
"""Assemble the KSA journey.

The stylesheet and the portraits are lifted from the GCC journey at build time
rather than copied by hand, so the two links stay visually identical and a fix
in one lands in both. Only the content and the data differ.
"""
import pathlib, re, json

ROOT = pathlib.Path(__file__).resolve().parent
GCC  = ROOT.parent / "journey"

style  = re.search(r"<style>.*?</style>", (GCC / "index.html").read_text(encoding="utf-8"), re.S).group(0)
faces  = {n: (GCC / "people" / f"{n}.svg").read_text(encoding="utf-8").strip()
          for n in ["rashid", "noura", "aisha", "khalid", "yousef", "fatima", "omar"]}
jmap   = (ROOT / "diagrams" / "journeymap.svg").read_text(encoding="utf-8")
arch   = (ROOT / "diagrams" / "architecture.svg").read_text(encoding="utf-8")
body   = (ROOT / "content.html").read_text(encoding="utf-8")
script = (ROOT / "content.js").read_text(encoding="utf-8")

html = ("<title>Iqama Runway</title>\n\n"
        '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
        '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800'
        '&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap">\n\n'
        + style + "\n"
        + body.replace("<!--JOURNEYMAP-->", jmap).replace("<!--ARCHITECTURE-->", arch)
        + "\n<script>\n(function(){\n\"use strict\";\n\nvar FACES=" + json.dumps(faces, ensure_ascii=False) + ";\n\n"
        + script + "\n})();\n</script>\n")

(ROOT / "index.html").write_text(html, encoding="utf-8")
print(f"wrote ksa/index.html ({len(html)//1024} KB)")
