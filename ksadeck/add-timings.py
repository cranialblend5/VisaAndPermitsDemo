#!/usr/bin/env python3
"""Stamp a run-sheet timing onto each slide's speaker notes.

The deck is built to be delivered in twenty minutes. These add up to 1200
seconds exactly, so a presenter can see at a glance whether they are ahead or
behind. Run after `node build.js`.
"""
from pptx import Presentation
import pathlib, sys

DECK = pathlib.Path(__file__).parent / "INK_IT_Visa_and_Permits_KSA.pptx"

PLAN = [
    (1,  40,  "Open"),
    (2,  80,  "Set the problem"),
    (3,  70,  "What it is"),
    (4,  85,  "Permit types"),
    (5,  95,  "The map"),
    (6,  140, "Demo the walkthrough"),
    (7,  115, "The story they recognise"),
    (8,  145, "Where the deal widens"),
    (9,  80,  "Integration answer"),
    (10, 70,  "Risk reframe"),
    (11, 65,  "Who uses it"),
    (12, 70,  "Accountability and cost"),
    (13, 85,  "Technical credibility"),
    (14, 60,  "Close wide"),
]


def main() -> int:
    total = sum(sec for _, sec, _ in PLAN)
    if total != 1200:
        print(f"plan totals {total}s, not 1200", file=sys.stderr)
        return 1

    prs = Presentation(DECK)
    if len(prs.slides._sldIdLst) != len(PLAN):
        print(f"deck has {len(prs.slides._sldIdLst)} slides, plan has {len(PLAN)}", file=sys.stderr)
        return 1

    elapsed = 0
    for slide, (n, sec, label) in zip(prs.slides, PLAN):
        elapsed += sec
        stamp = (f"[{sec}s · {label} · cumulative {elapsed//60}:{elapsed%60:02d} of 20:00]\n\n")
        tf = slide.notes_slide.notes_text_frame
        body = tf.text
        if body.startswith("["):                      # already stamped, replace it
            body = body.split("]\n\n", 1)[-1]
        tf.text = stamp + body

    prs.save(DECK)
    print(f"stamped {len(PLAN)} slides · {total}s total · 20:00")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
