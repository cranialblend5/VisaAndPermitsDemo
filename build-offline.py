#!/usr/bin/env python3
"""Bundle a journey into one self-contained HTML file.

Everything the page needs goes inside it: the webfonts as base64 woff2, every
screenshot as a data URI, the logo, the favicon. The result opens by
double-click with no network at all, which is what you want on a customer site
with guest wifi you do not trust.

    python3 build-offline.py ksa   -> offline/INK_IT_Visa_Permits_KSA.html
    python3 build-offline.py gcc   -> offline/INK_IT_Visa_Permits_GCC.html
"""
import base64, mimetypes, pathlib, re, sys, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent
OUT  = ROOT / "offline"
UA   = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
KEEP_SUBSETS = ("latin", "latin-ext")          # drop cyrillic/greek/vietnamese

# the "open the other journey" button, rewritten to the sibling offline file
PAGES = "https://cranialblend5.github.io/VisaAndPermitsDemo/"
SIBLING = {
    "ksa": (f'href="{PAGES}"',      'href="INK_IT_Visa_Permits_GCC.html"'),
    "gcc": (f'href="{PAGES}ksa/"',  'href="INK_IT_Visa_Permits_KSA.html"'),
}


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def inline_fonts(css_url: str) -> str:
    """Fetch the Google Fonts CSS and fold each woff2 into it as a data URI."""
    css = get(css_url).decode("utf-8")
    blocks, keep = css.split("/*"), []
    for blk in blocks:
        if not blk.strip():
            continue
        subset = blk.split("*/")[0].strip()
        if subset not in KEEP_SUBSETS:
            continue
        keep.append("/*" + blk)
    css = "".join(keep)

    seen: dict[str, str] = {}
    for url in sorted(set(re.findall(r"https://fonts\.gstatic\.com/[^)]+", css))):
        data = get(url)
        seen[url] = "data:font/woff2;base64," + base64.b64encode(data).decode()
        print(f"    font {url.rsplit('/',1)[-1][:34]:36s} {len(data)/1024:6.1f} KB")
    for url, uri in seen.items():
        css = css.replace(url, uri)
    return css


def main() -> int:
    which = (sys.argv[1] if len(sys.argv) > 1 else "ksa").lower()
    if which == "ksa":
        src, assets, name = ROOT/"site"/"ksa"/"index.html", ROOT/"site"/"ksa", "INK_IT_Visa_Permits_KSA.html"
    elif which == "gcc":
        src, assets, name = ROOT/"site"/"index.html", ROOT/"site", "INK_IT_Visa_Permits_GCC.html"
    else:
        print("usage: build-offline.py [ksa|gcc]", file=sys.stderr)
        return 1
    if not src.exists():
        print(f"missing {src} — run the standalone build first", file=sys.stderr)
        return 1

    html = src.read_text(encoding="utf-8")

    # 1. fonts
    m = re.search(r'<link rel="stylesheet" href="(https://fonts\.googleapis\.com/[^"]+)">', html)
    if m:
        print("  fonts:")
        css = inline_fonts(m.group(1).replace("&amp;", "&"))
        html = html.replace(m.group(0), f"<style>\n{css}\n</style>")
    html = re.sub(r'<link rel="preconnect"[^>]*>\s*', "", html)

    # 2. every local asset the page or its data references
    paths = sorted(set(re.findall(r'(?:src|href)="((?:web|shots|brand)/[^"]+)"', html))
                   | set(re.findall(r'shot:"((?:web|shots)/[^"]+)"', html))
                   | set(re.findall(r'href="(favicon\.svg)"', html)))
    total = 0
    for rel in paths:
        f = assets / rel
        if not f.exists():
            print(f"    MISSING {rel}", file=sys.stderr)
            continue
        mime = mimetypes.guess_type(f.name)[0] or "application/octet-stream"
        blob = f.read_bytes()
        total += len(blob)
        html = html.replace(rel, f"data:{mime};base64," + base64.b64encode(blob).decode())
    print(f"  inlined {len(paths)} assets ({total/1024/1024:.2f} MB raw)")

    # 3. an offline page should not advertise a share image it cannot serve
    html = re.sub(r'\s*<meta property="og:image[^>]*>', "", html)
    html = re.sub(r'\s*<meta name="twitter:image[^>]*>', "", html)

    # 4. the link between the two journeys has to point at the sibling file,
    #    not at Pages, or it dies the moment the wifi does. Both files live in
    #    the same folder, so a bare filename is all it takes.
    sibling = SIBLING[which]
    n = html.count(sibling[0])
    if n:
        html = html.replace(sibling[0], sibling[1])
        print(f"  cross-link -> {sibling[1]} ({n})")

    leftover = re.findall(r'(?:src|href)="(?!data:|#|mailto:)[^"]+"', html)
    leftover = [x for x in leftover
                if "'+esc(" not in x and sibling[1] not in x]
    if leftover:
        print(f"    WARNING still referencing: {leftover[:4]}", file=sys.stderr)

    OUT.mkdir(exist_ok=True)
    dest = OUT / name
    dest.write_text(html, encoding="utf-8")
    print(f"  wrote {dest.relative_to(ROOT)} ({dest.stat().st_size/1024/1024:.2f} MB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
