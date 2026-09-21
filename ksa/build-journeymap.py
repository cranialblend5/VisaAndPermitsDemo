#!/usr/bin/env python3
"""The journey map: one permit crossing five actors and seven stages.

A real journey map, so the axes carry meaning. Stages run left to right in the
order they actually happen; actor lanes run top to bottom. A node sits where an
actor does something at a stage, and the arrows are the hand-offs, which is the
part that breaks in real life.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent / "diagrams"
W, H = 1280, 640

STAGES = ["Block visa\n& Nitaqat", "Visa issued\n& stamped", "Arrival\n& Qiwa",
          "Iqama\nissued", "Working\nlegally", "Exit &\nre-entry", "Renewal or\nfinal exit"]

LANES = [
    ("Recruitment",  "Noura"),
    ("Onboarding",   "Aisha"),
    ("PRO desk",     "Rashid"),
    ("Employee",     "Yousef"),
    ("HR & Finance", "Khalid · Fatima"),
]

# (lane index, stage index, label, emphasis)
NODES = [
    (0, 0, "Candidate file\n& documents", 0),
    (4, 0, "Nitaqat band\nchecked first", 0),
    (2, 0, "Block visa\nallocated", 1),
    (2, 1, "Visa assigned,\nEnjaz stamping", 1),
    (1, 1, "Travel & joining\ndate agreed", 0),
    (3, 2, "Arrives, signs\nQiwa contract", 0),
    (2, 2, "Qiwa contract\nauthenticated", 1),
    (3, 3, "Medical &\nbiometrics", 0),
    (2, 3, "Iqama issued\nvia Muqeem", 1),
    (4, 3, "GOSI & Mudad\nregistration", 0),
    (4, 4, "Payments posted\nto GL", 0),
    (3, 5, "Requests exit\nre-entry", 0),
    (2, 5, "Muqeem visa,\nreturn tracked", 1),
    (4, 6, "Dues cleared\nbefore exit", 0),
    (2, 6, "Renewal or\nfinal exit", 1),
]

HANDOFFS = [(0,0,4,0), (4,0,2,0), (2,0,2,1), (2,1,1,1), (1,1,3,2), (3,2,2,2),
            (2,2,3,3), (3,3,2,3), (2,3,4,3), (4,3,4,4), (3,5,2,5), (2,5,4,6), (4,6,2,6)]

LEFT, TOP = 168, 96
CW, RH = (W - LEFT - 24) / len(STAGES), 96


def cx(st): return LEFT + CW * st + CW / 2
def cy(ln): return TOP + RH * ln + RH / 2


def build():
    p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" '
         f'aria-label="Journey map: a Saudi work visa and Iqama moving left to right through seven stages, from '
         f'block visa and Nitaqat check to renewal or final exit, across five actor lanes: recruitment, onboarding, '
         f'the PRO desk, the employee, and HR and finance. Arrows show each hand-off between them.">']
    p.append('<defs><marker id="jh" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" '
             'orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" class="ahead"/></marker></defs>')

    for i, s in enumerate(STAGES):                       # stage headers
        x = LEFT + CW * i
        p.append(f'<rect x="{x+4}" y="30" width="{CW-8}" height="50" rx="8" class="jm-stage"/>')
        for k, line in enumerate(s.split("\n")):
            p.append(f'<text x="{x+CW/2}" y="{50+k*15}" class="t-stage" text-anchor="middle">{line}</text>')
        p.append(f'<text x="{x+CW/2}" y="{22}" class="t-stagen" text-anchor="middle">{i+1}</text>')

    for i, (lane, who) in enumerate(LANES):              # lane labels and bands
        y = TOP + RH * i
        if i % 2 == 0:
            p.append(f'<rect x="{LEFT}" y="{y}" width="{W-LEFT-20}" height="{RH}" class="jm-band"/>')
        p.append(f'<text x="24" y="{y+RH/2-4}" class="t-lane">{lane}</text>')
        p.append(f'<text x="24" y="{y+RH/2+14}" class="t-laneq">{who}</text>')

    for a_l, a_s, b_l, b_s in HANDOFFS:                  # hand-offs
        x1, y1, x2, y2 = cx(a_s), cy(a_l), cx(b_s), cy(b_l)
        if a_s == b_s:
            p.append(f'<line x1="{x1}" y1="{y1+30}" x2="{x2}" y2="{y2-30}" class="jm-hand" marker-end="url(#jh)"/>')
        else:
            p.append(f'<path d="M{x1+62} {y1} C{x1+110} {y1} {x2-110} {y2} {x2-62} {y2}" '
                     f'class="jm-hand" fill="none" marker-end="url(#jh)"/>')

    for ln, st, label, emph in NODES:                    # the work itself
        x, y = cx(st), cy(ln)
        lines = label.split("\n")
        h = 34 + (len(lines) - 1) * 14
        p.append(f'<rect x="{x-60}" y="{y-h/2}" width="120" height="{h}" rx="8" '
                 f'class="{"jm-node jm-hot" if emph else "jm-node"}"/>')
        for k, line in enumerate(lines):
            p.append(f'<text x="{x}" y="{y - h/2 + 20 + k*14}" class="t-node" text-anchor="middle">{line}</text>')

    p.append(f'<rect x="{LEFT}" y="{H-42}" width="{W-LEFT-20}" height="30" rx="7" class="jm-foot"/>')
    p.append(f'<text x="{LEFT+16}" y="{H-22}" class="t-foot">'
             'Highlighted cards are the PRO desk. Note where the journey starts: the Nitaqat band is checked before a block visa can even be requested.</text>')
    p.append('</svg>')
    return "".join(p)


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    (OUT / "journeymap.svg").write_text(build(), encoding="utf-8")
    print(f"wrote {OUT/'journeymap.svg'}")
