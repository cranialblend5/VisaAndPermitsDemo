#!/usr/bin/env python3
"""Wrap the artifact-authored journey into a standalone HTML document for static hosting.

The Artifact platform injects a <!doctype>/<head>/<body> skeleton at publish time,
so journey/index.html is authored without one. Any ordinary web host needs the
full document, so this script supplies the same skeleton plus share metadata.
"""
import pathlib, re, shutil, sys

ROOT = pathlib.Path(__file__).resolve().parent
SRC  = ROOT / "index.html"
OUT  = ROOT.parent / "site"
BASE = "https://cranialblend5.github.io/VisaAndPermitsDemo"

TITLE = "Visa &amp; Permits Management — Interactive Value Journey"
DESC  = ("An interactive walkthrough of the INK IT Visa & Permits Management application "
         "on SAP BTP: permit lifecycles, task governance, payment control and country "
         "packs for the UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain and Libya.")

HEAD = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="{DESC}">
<meta name="author" content="INK IT Business Solutions">
<meta name="theme-color" content="#0C1E33">

<meta property="og:type" content="website">
<meta property="og:site_name" content="INK IT Business Solutions">
<meta property="og:title" content="Visa &amp; Permits Management on SAP BTP">
<meta property="og:description" content="{DESC}">
<meta property="og:url" content="{BASE}/">
<meta property="og:image" content="{BASE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Visa &amp; Permits Management on SAP BTP">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{BASE}/og.png">

<link rel="icon" href="favicon.svg" type="image/svg+xml">

<style>
/* skeleton the Artifact host normally supplies */
:root{{
  color-scheme: light dark;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}}
body{{ margin:0; }}
img{{ max-width:100%; }}
[hidden]{{ display:none !important; }}
</style>
</head>
<body>
"""

TAIL = "\n</body>\n</html>\n"


def main() -> int:
    if not SRC.exists():
        print(f"missing {SRC}", file=sys.stderr)
        return 1
    html = SRC.read_text(encoding="utf-8")
    if re.search(r"<!doctype", html, re.I):
        print("source already has a doctype — refusing to double-wrap", file=sys.stderr)
        return 1

    OUT.mkdir(exist_ok=True)
    (OUT / "index.html").write_text(HEAD + html + TAIL, encoding="utf-8")

    shots_src, shots_out = ROOT / "shots", OUT / "shots"
    if shots_out.exists():
        shutil.rmtree(shots_out)
    shutil.copytree(shots_src, shots_out)

    (OUT / ".nojekyll").write_text("", encoding="utf-8")
    (OUT / "favicon.svg").write_text(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
        '<rect width="64" height="64" rx="13" fill="#0C1E33"/>'
        '<text x="32" y="43" font-family="Helvetica,Arial,sans-serif" font-size="27" '
        'font-weight="bold" fill="#20A098" text-anchor="middle">IK</text></svg>',
        encoding="utf-8")

    n = len(list(shots_out.glob("*")))
    kb = (OUT / "index.html").stat().st_size / 1024
    print(f"wrote site/index.html ({kb:.0f} KB) + {n} screenshots + favicon")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
