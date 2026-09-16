#!/usr/bin/env python3
"""Solution architecture diagram: one source, two outputs.

The journey inlines the SVG (themed through CSS classes so it works on both
grounds). The deck needs a raster, so render_png.py screenshots the same file.

Hub layout rather than a layer cake: the claim is that VPM sits *between*
SuccessFactors, the government and finance, so those three sit on three sides
of it and the arrows carry what actually moves.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent / "diagrams"
W, H = 1120, 760


def box(x, y, w, h, cls, title, sub=None, items=None, rx=10):
    s = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" class="{cls}"/>']
    ty = y + 25
    s.append(f'<text x="{x+16}" y="{ty}" class="t-box">{title}</text>')
    if sub:
        s.append(f'<text x="{x+16}" y="{ty+16}" class="t-sub">{sub}</text>')
    if items:
        iy = ty + (34 if sub else 20)
        for row in items:
            ix = x + 16
            for label in row:
                bw = 11 + len(label) * 6.7
                s.append(f'<rect x="{ix}" y="{iy}" width="{bw}" height="25" rx="6" class="chip"/>')
                s.append(f'<text x="{ix+bw/2}" y="{iy+17}" class="t-chip" text-anchor="middle">{label}</text>')
                ix += bw + 7
            iy += 32
    return "".join(s)


def arrow(x1, y1, x2, y2, label, cls="flow", dash=False, ly=None, lx=None):
    """ly/lx override the label position, so two arrows running between the same
    pair of boxes can carry long labels without printing over each other."""
    d = ' stroke-dasharray="7 5"' if dash else ""
    s = [f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="{cls}"{d} marker-end="url(#ah)"/>']
    mx = lx if lx is not None else (x1 + x2) / 2
    my = ly if ly is not None else (y1 + y2) / 2
    w = len(label) * 6.4 + 18
    s.append(f'<rect x="{mx-w/2}" y="{my-12}" width="{w}" height="23" rx="6" class="lbl-bg"/>')
    s.append(f'<text x="{mx}" y="{my+4}" class="t-flow" text-anchor="middle">{label}</text>')
    return "".join(s)


def build():
    p = []
    p.append(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" '
             f'aria-label="Solution architecture: SAP SuccessFactors sends candidates and employee '
             f'master data through SAP Integration Suite into the Visa and Permits application on '
             f'SAP BTP, which writes permit details back, posts payments to S and 4 HANA Finance, '
             f'serves the PRO desk and employees, and exchanges submissions with government portals '
             f'manually today with API connectors ready.">')
    p.append('''<defs>
      <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" class="ahead"/></marker>
    </defs>''')

    # ---- SAP SuccessFactors, top ----
    p.append(box(300, 20, 520, 108, "b-sap", "SAP SuccessFactors HXM",
                 "System of record for people",
                 [["SF Recruiting", "Onboarding 2.0", "Employee Central"]]))

    # ---- Integration Suite band ----
    p.append(box(300, 200, 520, 56, "b-cpi", "SAP Integration Suite (CPI)",
                 "iFlows, mapping, retry and monitoring"))

    p.append(arrow(420, 128, 420, 200, "candidates, employee master, expiry dates", ly=146, lx=436))
    p.append(arrow(700, 200, 700, 128, "permit, labour card, EID, visa dates back", ly=184, lx=684))

    # ---- the application, centre ----
    p.append(box(300, 300, 520, 196, "b-vpm", "Visa &amp; Permits Management",
                 "Running on SAP BTP",
                 [["Build Work Zone", "Process Automation"],
                  ["Cloud Foundry runtime", "HANA Cloud"],
                  ["Document Management", "Identity Auth (SSO)"]]))
    p.append(arrow(560, 256, 560, 300, "both directions, through CPI", ly=280))

    # ---- finance, bottom ----
    p.append(box(300, 610, 520, 108, "b-fin", "SAP S/4HANA Finance &amp; Payroll",
                 "Where the money lands",
                 [["Journal posting to GL", "Fine deductions"]]))
    p.append(arrow(560, 496, 560, 610, "payment, VAT, reference, GL account"))

    # ---- government portals, right ----
    p.append(box(880, 262, 228, 272, "b-gov", "Government portals",
                 "Qiwa · Muqeem · Absher",
                 [["MOHRE"], ["ICP · GDRFA"], ["LMRA · PAM · ADLSA"], ["SCFHS · DHA · DOH"]]))
    p.append(f'<line x1="820" y1="372" x2="880" y2="372" class="flow-manual" stroke-dasharray="7 5" marker-end="url(#ah)"/>')
    p.append(f'<line x1="880" y1="428" x2="820" y2="428" class="flow-manual" stroke-dasharray="7 5" marker-end="url(#ah)"/>')
    p.append('<text x="850" y="350" class="t-flow" text-anchor="middle">submit</text>')
    p.append('<text x="850" y="452" class="t-flow" text-anchor="middle">status, docs</text>')
    p.append('<rect x="848" y="556" width="260" height="62" rx="8" class="note"/>')
    p.append('<text x="862" y="577" class="t-note">Manual PRO activity today.</text>')
    p.append('<text x="862" y="595" class="t-note">Connectors are built and waiting</text>')
    p.append('<text x="862" y="611" class="t-note">for credentials you obtain.</text>')

    # ---- people, left ----
    p.append(box(12, 262, 228, 272, "b-ppl", "The people",
                 "Role-based, on any device",
                 [["PRO desk"], ["Recruitment"], ["Onboarding · HRBP"], ["Employee self-service"], ["Finance"]]))
    p.append(f'<line x1="240" y1="372" x2="300" y2="372" class="flow" marker-end="url(#ah)"/>')
    p.append(f'<line x1="300" y1="424" x2="240" y2="424" class="flow" marker-end="url(#ah)"/>')
    p.append('<text x="270" y="350" class="t-flow" text-anchor="middle">tasks</text>')
    p.append('<text x="270" y="448" class="t-flow" text-anchor="middle">alerts</text>')

    # ---- notifications ----
    p.append(box(12, 566, 228, 100, "b-ntf", "Email &amp; SMS",
                 "Reminders and escalations",
                 [["2-day nudges"], ["6-week expiry alerts"]]))
    p.append('<polyline points="300,478 272,478 272,616 244,616" class="flow" fill="none" marker-end="url(#ah)"/>')

    p.append('</svg>')
    return "".join(p)


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    (OUT / "architecture.svg").write_text(build(), encoding="utf-8")
    print(f"wrote {OUT/'architecture.svg'}")
