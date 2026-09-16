#!/usr/bin/env python3
"""Generate the persona portraits used in chapter 2.

One parametric template so the seven portraits read as a single set: same
circle, same head geometry, same feature weights. What varies is skin tone,
head covering, facial hair, eyewear and garment colour.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent / "people"

# skin, hair, garment tones kept warm and low-contrast so the set feels drawn
SKIN = {"deep": "#8D5524", "warm": "#A9713F", "tan": "#C68A5B", "light": "#D9A374"}
HAIR = {"black": "#221A16", "dark": "#2E231C", "grey": "#6E6A66"}


def portrait(bg, skin, garment, *, cover=None, cover2=None, hair=None,
             beard=None, glasses=False, bun=False, moustache=False):
    """cover: head-covering fill (ghutra/shayla/hijab). hair: visible hair fill.

    Draw order matters: the covering is laid over the shoulders first, then the
    face is drawn on top of it, which is what produces the framed opening a real
    head covering makes. Ears stay hidden when a covering is worn.
    """
    s = [f'<circle cx="50" cy="50" r="50" fill="{bg}"/>']

    # shoulders
    s.append(f'<path d="M50 63c-14 0-26 8-30 19 l0 18 60 0 0-18c-4-11-16-19-30-19z" fill="{garment}"/>')
    s.append(f'<path d="M43 56h14v14a7 7 0 0 1-14 0z" fill="{skin}"/>')          # neck

    if cover:
        # fabric: over the crown, down past the jaw and spilling onto the shoulders
        s.append(f'<path d="M50 16c-18 0-27 13-27 29 0 9 1 16 0 22 -1 7-4 12-8 15 l0 18 70 0 '
                 f'0-18c-4-3-7-8-8-15 -1-6 0-13 0-22 0-16-9-29-27-29z" fill="{cover}"/>')
    else:
        s.append(f'<ellipse cx="29" cy="48" rx="3.4" ry="4.6" fill="{skin}"/>')  # ears
        s.append(f'<ellipse cx="71" cy="48" rx="3.4" ry="4.6" fill="{skin}"/>')
        if hair:
            s.append(f'<ellipse cx="50" cy="44" rx="21.5" ry="23" fill="{hair}"/>')
            if bun:
                s.append(f'<circle cx="50" cy="19" r="8.5" fill="{hair}"/>')

    # face sits above the covering, so the covering frames it
    s.append(f'<ellipse cx="50" cy="45" rx="18.5" ry="22" fill="{skin}"/>')

    if not cover and hair:                                   # fringe over the forehead
        s.append(f'<path d="M31 42c1-13 8-20 19-20s18 7 19 20c-3-9-9-13-19-13s-16 4-19 13z" fill="{hair}"/>')

    if beard:                                                # filled jaw, not an outline
        s.append(f'<path d="M31.5 44c0 4 1 9 2.5 13 2.5 7 8.5 12 16 12s13.5-5 16-12 '
                 f'c1.5-4 2.5-9 2.5-13 -2 6-5 8-8.5 9 -3 .8-6.5 1.2-10 1.2s-7-.4-10-1.2 '
                 f'c-3.5-1-6.5-3-8.5-9z" fill="{beard}"/>')
    if moustache:
        s.append(f'<path d="M42.5 54.5c2.2-2 5.3-2 7.5 0 2.2-2 5.3-2 7.5 0 -2.2 3-5.3 3-7.5 1.2 '
                 f'-2.2 1.8-5.3 1.8-7.5-1.2z" fill="{beard or HAIR["black"]}"/>')

    if cover2 and cover:                                     # agal cord, sits on the crown
        s.append(f'<rect x="26.5" y="22.5" width="47" height="3.6" rx="1.8" fill="{cover2}"/>')
        s.append(f'<rect x="26.5" y="28" width="47" height="3.6" rx="1.8" fill="{cover2}"/>')

    s.append('<path d="M40 40.5c1.6-1.4 4.4-1.4 6 0" stroke="#2B211B" stroke-width="1.5" '
             'fill="none" stroke-linecap="round" opacity=".75"/>')
    s.append('<path d="M54 40.5c1.6-1.4 4.4-1.4 6 0" stroke="#2B211B" stroke-width="1.5" '
             'fill="none" stroke-linecap="round" opacity=".75"/>')
    s.append('<circle cx="43" cy="46" r="2" fill="#2B211B"/>')
    s.append('<circle cx="57" cy="46" r="2" fill="#2B211B"/>')
    s.append('<path d="M50 48v5" stroke="#8a5a36" stroke-width="1.4" fill="none" '
             'stroke-linecap="round" opacity=".45"/>')
    s.append(f'<path d="M45.5 58.5c2.6 2.2 6.4 2.2 9 0" stroke="#7A3F2E" stroke-width="1.8" '
             'fill="none" stroke-linecap="round"/>')

    if glasses:
        s.append('<g fill="none" stroke="#3A4654" stroke-width="1.7" opacity=".92">'
                 '<circle cx="43" cy="46" r="6.4"/><circle cx="57" cy="46" r="6.4"/>'
                 '<path d="M49.4 45.4h1.2M36.6 45h-3M63.4 45h3"/></g>')

    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            'role="img" aria-hidden="true">' + "".join(s) + "</svg>")


PEOPLE = {
    # Emirati government relations officer — ghutra with black agal
    "rashid":  dict(bg="#DCEFEC", skin=SKIN["warm"],  garment="#F2F4F6",
                    cover="#FAFAF8", cover2="#23282E", beard=HAIR["black"]),
    # Indian recruiter
    "priya":   dict(bg="#F3E8EF", skin=SKIN["tan"],   garment="#1E6FD9",
                    hair=HAIR["black"], bun=True),
    # Saudi onboarding coordinator — hijab
    "aisha":   dict(bg="#EDE9F7", skin=SKIN["tan"],   garment="#F2F4F6",
                    cover="#9A8577", cover2="#A89383"),
    # Egyptian HR business partner
    "ahmed":   dict(bg="#E4EEF8", skin=SKIN["warm"],  garment="#16304C",
                    hair=HAIR["dark"], beard=HAIR["dark"]),
    # Indian technician — the employee in the process
    "ramesh":  dict(bg="#FBEFE0", skin=SKIN["deep"],  garment="#E07A2F",
                    hair=HAIR["black"], moustache=True),
    # Emirati finance controller — shayla
    "fatima":  dict(bg="#E2F0EC", skin=SKIN["light"], garment="#2F3C4F",
                    cover="#1D2530", cover2="#2A3340"),
    # Emirati head of HR — senior, ghutra and glasses
    "omar":    dict(bg="#E8EDF2", skin=SKIN["light"], garment="#F2F4F6",
                    cover="#FAFAF8", cover2="#23282E", beard=HAIR["grey"], glasses=True),
}

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for name, kw in PEOPLE.items():
        (OUT / f"{name}.svg").write_text(portrait(**kw), encoding="utf-8")
    print(f"wrote {len(PEOPLE)} portraits to {OUT}")
