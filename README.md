# Visa & Permits Management — Value Journey & Pitch Deck

Sales and solution assets for the INK IT **Visa & Permits Management** application
built on **SAP Business Technology Platform**, positioned for the GCC and Libya.

## Deliverables

| Asset | Path | What it is |
|---|---|---|
| Interactive Value Journey | `journey/index.html` | Self-contained interactive web journey — 10 chapters, persona explorer, milestone walkthrough, GCC country packs. Published as a shareable link. |
| Pitch deck | `deck/INK_IT_Visa_and_Permits_GCC.pptx` | 10-slide INK IT-branded deck, persona-wise, for SAP and customer conversations. |
| Deck generator | `deck/build.js` | `pptxgenjs` source for the deck — edit and re-run `node build.js` to regenerate. |
| Screenshots (journey) | `journey/shots/*.webp` | Application screenshots, resized and WebP-compressed (6.2 MB → 0.89 MB) so the journey loads fast. |
| Screenshots (deck) | `deck/img/*.jpg` | Same screenshots as JPEG, for PowerPoint compatibility. |
| Brand asset | `assets/inkit-logo.png` | INK IT Solutions logo. Brand teal is `#20A098`. |

## Journey structure

1. The problem — why permit management breaks
2. Who does the work — 7 personas (GRO/PRO, Recruiter, Onboarding, HRBP, Employee, Finance, Head of HR)
3. The runway — New / Renew / Cancel milestone explorer, built from the live process boards
4. Task management & accountability — assignment, reminder cycle, escalation ladder, audit trail
5. The money trail — payment capture, receipts, GL posting, duplicate prevention
6. Country packs — UAE, KSA, Qatar, Kuwait, Oman, Bahrain, Libya
7. Healthcare & professional permits — practitioner licensing lane and regulators
8. Integration & API readiness — SuccessFactors, S/4HANA, government portals
9. SAP BTP services required
10. The value — before / after

## Source material

Built from the supplied BRD (`Visa and Permits BRD v03`), the VPM application
screenshots, the INK IT process-flow deck and the Azizi VPM proposal. Government
portal and health-regulator names were verified against current public sources.

### Honesty markers used throughout

- **Live** — running in production today (UAE).
- **Country pack** — designed against that country's statutory flow and configured
  from the same engine; a localisation workshop confirms document names, fees and
  thresholds before go-live.
- **Government API integration** — the application is API-ready by design, but GCC
  authorities do not publish open APIs and grant access to the *employer*, not the
  vendor. The customer obtains credentials, specification and sandbox from each
  authority; INK IT then builds the connector. Until then the government step
  remains a tracked manual PRO activity.

## Regenerating

```bash
cd deck && npm install pptxgenjs && node build.js
```
