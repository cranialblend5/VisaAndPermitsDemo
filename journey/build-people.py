#!/usr/bin/env python3
"""Generate the persona portraits used in chapter 2.

One parametric template, so the seven read as a single set: same canvas, same
head geometry, same feature weights. What varies is colouring, head covering,
hair, facial hair and eyewear.

Every gradient id is namespaced with the person's key. All seven portraits are
inlined into one HTML page, and bare ids like "skin" would collide there, with
later definitions silently winning.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent / "people"

SKIN = {
    "deep":  ("#8A5A32", "#6E4425", "#A87244"),   # base, shadow, light
    "warm":  ("#A9743F", "#8A5A30", "#C08F5A"),
    "tan":   ("#C08A58", "#9E6C41", "#D6A87A"),
    "light": ("#D6A87A", "#B4855A", "#E7C39B"),
}
HAIR = {"black": "#1E1714", "dark": "#2B211A", "grey": "#7C7873", "salt": "#9A958F"}


def portrait(key, bg, skin, garment, *, cover=None, band=None, hair=None,
             beard=None, glasses=False, bun=False, moustache=False, brow="#2A1F18"):
    base, shade, light = SKIN[skin]
    i = lambda n: f"{key}-{n}"                       # namespaced gradient ids

    d = [f'''<defs>
<linearGradient id="{i('sk')}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="{light}"/><stop offset=".55" stop-color="{base}"/>
  <stop offset="1" stop-color="{shade}"/></linearGradient>
<radialGradient id="{i('ch')}" cx=".5" cy=".5" r=".5">
  <stop offset="0" stop-color="{shade}" stop-opacity=".30"/>
  <stop offset="1" stop-color="{shade}" stop-opacity="0"/></radialGradient>
<linearGradient id="{i('bg')}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="{bg[0]}"/><stop offset="1" stop-color="{bg[1]}"/></linearGradient>
<linearGradient id="{i('gm')}" x1="0" y1="0" x2="0" y2="1">
  <stop offset="0" stop-color="{garment[1]}"/><stop offset="1" stop-color="{garment[0]}"/></linearGradient>''']
    if cover:
        d.append(f'''<linearGradient id="{i('cv')}" x1=".15" y1="0" x2=".9" y2="1">
  <stop offset="0" stop-color="{cover[1]}"/><stop offset=".6" stop-color="{cover[0]}"/>
  <stop offset="1" stop-color="{cover[2]}"/></linearGradient>''')
    if hair:
        d.append(f'''<linearGradient id="{i('hr')}" x1=".2" y1="0" x2=".8" y2="1">
  <stop offset="0" stop-color="{hair[1]}"/><stop offset="1" stop-color="{hair[0]}"/></linearGradient>''')
    d.append('</defs>')
    s = d + [f'<circle cx="50" cy="50" r="50" fill="url(#{i("bg")})"/>']

    s.append(f'<path d="M50 64c-15 0-28 9-32 21 l0 15 64 0 0-15c-4-12-17-21-32-21z" fill="url(#{i("gm")})"/>')
    s.append(f'<path d="M43.5 55h13v14a6.5 6.5 0 0 1-13 0z" fill="{base}"/>')
    s.append(f'<path d="M43.5 55h13v7c-4 3-9 3-13 0z" fill="{shade}" opacity=".55"/>')   # under-chin shadow

    if cover:
        s.append(f'<path d="M50 16c-18.5 0-27.5 13.5-27.5 29.5 0 9 1 16.5 0 22.5 -1.2 7.5-4.5 12.5-8.5 15.5 '
                 f'l0 16.5 72 0 0-16.5c-4-3-7.3-8-8.5-15.5 -1-6 0-13.5 0-22.5 0-16-9-29.5-27.5-29.5z" '
                 f'fill="url(#{i("cv")})"/>')
        s.append(f'<path d="M27 46c0 10 .5 17-.5 23 -1 6-3 10-6 13" stroke="{cover[2]}" stroke-width="1.1" '
                 f'fill="none" opacity=".55"/>')                                          # fold
        s.append(f'<path d="M73 46c0 10-.5 17 .5 23 1 6 3 10 6 13" stroke="{cover[1]}" stroke-width="1.1" '
                 f'fill="none" opacity=".45"/>')
    else:
        s.append(f'<ellipse cx="28.8" cy="48.5" rx="3.6" ry="4.9" fill="{base}"/>')
        s.append(f'<ellipse cx="71.2" cy="48.5" rx="3.6" ry="4.9" fill="{base}"/>')
        if hair:
            # a solid cap, not an outline: an open crescent lets the background
            # show through as a pale band across the forehead
            s.append(f'<path d="M50 18.5c-13.5 0-22.5 9.5-22.5 24 0 7 1 13 2 18 '
                     f'-1-15-1-27 1.5-33 2.8-6.8 10.5-10.5 19-10.5s16.2 3.7 19 10.5 '
                     f'c2.5 6 2.5 18 1.5 33 1-5 2-11 2-18 0-14.5-9-24-22.5-24z" '
                     f'fill="url(#{i("hr")})"/>')
            s.append(f'<ellipse cx="50" cy="40" rx="21.5" ry="21" fill="url(#{i("hr")})"/>')
            if bun:
                s.append(f'<ellipse cx="50" cy="18.5" rx="9" ry="7.5" fill="url(#{i("hr")})"/>')

    s.append(f'<ellipse cx="50" cy="45" rx="18.2" ry="21.8" fill="url(#{i("sk")})"/>')
    s.append(f'<ellipse cx="38" cy="50" rx="6" ry="5" fill="url(#{i("ch")})"/>')           # cheeks
    s.append(f'<ellipse cx="62" cy="50" rx="6" ry="5" fill="url(#{i("ch")})"/>')

    if not cover and hair:
        s.append(f'<path d="M31.5 41.5c2.5-10.5 9.5-15.5 18.5-15.5s16 5 18.5 15.5c-4-7.5-10.5-10.5-18.5-10.5'
                 f's-14.5 3-18.5 10.5z" fill="url(#{i("hr")})"/>')

    if beard:
        s.append(f'<path d="M31.8 44.5c.2 5 1.2 10.5 3 14.5 3 6.6 8.8 11 15.2 11s12.2-4.4 15.2-11 '
                 f'c1.8-4 2.8-9.5 3-14.5 -1.6 6.6-4.8 9-8.8 10.2 -3.902 1.1-6.4 1.4-9.4 1.4s-5.5-.3-9.4-1.4 '
                 f'c-4-1.2-7.2-3.6-8.8-10.2z" fill="{beard}"/>')
        s.append(f'<path d="M50 70c-4.4 0-8.6-2.4-11.6-6.6 3.4 2.4 7.4 3.6 11.6 3.6s8.2-1.2 11.6-3.6 '
                 f'c-3 4.2-7.2 6.6-11.6 6.6z" fill="{beard}" opacity=".6"/>')
    if moustache:
        s.append(f'<path d="M42.6 54.4c2.4-2.2 5.4-2.2 7.4 .2 2-2.4 5-2.4 7.4-.2 -2 3-5 3.4-7.4 1.4 '
                 f'-2.4 2-5.4 1.6-7.4-1.4z" fill="{beard or HAIR["black"]}"/>')

    if cover and band:                                                                     # agal
        s.append(f'<path d="M26 24.5c8-3 40-3 48 0" stroke="{band}" stroke-width="3.4" fill="none" stroke-linecap="round"/>')
        s.append(f'<path d="M26 30c8-3 40-3 48 0" stroke="{band}" stroke-width="3.4" fill="none" stroke-linecap="round"/>')
        s.append(f'<path d="M26 24.5c8-3 40-3 48 0" stroke="#fff" stroke-width=".7" fill="none" opacity=".18"/>')

    # brows
    s.append(f'<path d="M39.2 39.4c2-1.9 5.4-2.1 7.6-.5" stroke="{brow}" stroke-width="2.1" fill="none" stroke-linecap="round"/>')
    s.append(f'<path d="M60.8 39.4c-2-1.9-5.4-2.1-7.6-.5" stroke="{brow}" stroke-width="2.1" fill="none" stroke-linecap="round"/>')

    # eyes: white, iris, pupil, catchlight, lid line
    for cx in (43.2, 56.8):
        s.append(f'<ellipse cx="{cx}" cy="46" rx="4.4" ry="3.1" fill="#F7F2EC"/>')
        s.append(f'<circle cx="{cx}" cy="46.1" r="2.5" fill="#4A3524"/>')
        s.append(f'<circle cx="{cx}" cy="46.1" r="1.2" fill="#140E0A"/>')
        s.append(f'<circle cx="{cx-1}" cy="45.1" r=".8" fill="#fff" opacity=".9"/>')
        s.append(f'<path d="M{cx-4.5} 45.2c1.6-2.2 7.4-2.2 9 0" stroke="{brow}" stroke-width="1.3" fill="none" stroke-linecap="round"/>')

    # nose
    s.append(f'<path d="M50 47.5c-.6 3-1.4 4.6-2.6 5.6 1.6 .9 3.6 .9 5.2 0 -1.2-1-2-2.6-2.6-5.6z" fill="{shade}" opacity=".35"/>')
    s.append(f'<path d="M47.4 53.2c1.6 .9 3.6 .9 5.2 0" stroke="{shade}" stroke-width="1" fill="none" stroke-linecap="round" opacity=".7"/>')

    # mouth
    s.append(f'<path d="M45.4 58.4c1.8-1.2 3.2-1.4 4.6-1.4s2.8 .2 4.6 1.4c-1.6 2.6-3 3.4-4.6 3.4s-3-.8-4.6-3.4z" fill="#8C4634"/>')
    s.append(f'<path d="M45.4 58.4c2.6-.9 6.6-.9 9.2 0" stroke="#6E3527" stroke-width=".8" fill="none" opacity=".75"/>')

    if glasses:
        s.append('<g fill="none" stroke="#3B4754" stroke-width="1.6" opacity=".92">'
                 '<rect x="36.4" y="41.4" width="13.6" height="9.4" rx="4.2"/>'
                 '<rect x="50" y="41.4" width="13.6" height="9.4" rx="4.2"/>'
                 '<path d="M49.8 45.4h.4M36.4 45.4c-2 0-3 .4-3.6 1M63.6 45.4c2 0 3 .4 3.6 1"/></g>')

    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            'role="img" aria-hidden="true">' + "".join(s) + "</svg>")


PEOPLE = {
    "rashid": dict(bg=("#E6F4F1", "#CFE8E3"), skin="warm",  garment=("#EDEFF2", "#FCFDFE"),
                   cover=("#F6F6F2", "#FFFFFF", "#DFE0DA"), band="#23282E", beard=HAIR["black"]),
    "noura":  dict(bg=("#F6EAF0", "#E9D6E1"), skin="tan",   garment=("#1E6FD9", "#3A88EC"),
                   cover=("#7E4A63", "#96607D", "#6A3D53")),
    "aisha":  dict(bg=("#F0ECE6", "#E2DCD2"), skin="tan",   garment=("#EDEFF2", "#FCFDFE"),
                   cover=("#8B7565", "#A08B7B", "#6F5C4E")),
    "khalid": dict(bg=("#E6EEF8", "#D2E0F0"), skin="warm",  garment=("#16304C", "#254666"),
                   hair=("#2B211A", "#3E3128"), beard=HAIR["dark"]),
    "yousef": dict(bg=("#FBF0E2", "#F2E0CA"), skin="deep",  garment=("#D9701F", "#EE8B39"),
                   hair=("#1E1714", "#2E241E"), moustache=True, beard=HAIR["black"]),
    "fatima": dict(bg=("#E4F1ED", "#D0E6DF"), skin="light", garment=("#2F3C4F", "#43546C"),
                   cover=("#1D2530", "#2C3744", "#141A22")),
    "omar":   dict(bg=("#EAEEF3", "#D8DFE8"), skin="light", garment=("#EDEFF2", "#FCFDFE"),
                   cover=("#F6F6F2", "#FFFFFF", "#DFE0DA"), band="#23282E",
                   beard=HAIR["salt"], glasses=True, brow="#6E6A64"),
}

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for f in OUT.glob("*.svg"):
        f.unlink()
    for name, kw in PEOPLE.items():
        (OUT / f"{name}.svg").write_text(portrait(name, **kw), encoding="utf-8")
    print(f"wrote {len(PEOPLE)} portraits to {OUT}")
