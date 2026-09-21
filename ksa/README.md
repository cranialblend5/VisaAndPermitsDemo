# Visa & Permits Management — Saudi Arabia

The KSA configuration of the INK IT Visa & Permits Management application on SAP BTP,
built as a separate journey and deck from the GCC set.

**Live link:** https://cranialblend5.github.io/VisaAndPermitsDemo/ksa/

## What is here

| Path | What it is |
|---|---|
| `index.html` | The KSA journey, assembled by `build-journey.py` |
| `content.html` / `content.js` | The KSA copy and data. Edit these, then re-run the assembler |
| `build-journey.py` | Pulls the stylesheet, portraits and shared logic from `../journey` so both links stay identical |
| `build-screens.py` | Generates the KSA application screens as HTML |
| `screens/` | Generated screen templates |
| `shots/` `web/` `deckimg/` | Rasterised screens: full size, WebP for the journey, JPEG for the deck |
| `build-journeymap.py` `build-architecture.py` | The two diagrams, KSA variants |
| `build-standalone.py` | Wraps the journey for static hosting into `../site/ksa/` |

## The screens

The screens are the application configured for Saudi Arabia. They are representative
of that configuration, not captures of a live Saudi tenant, and the journey says so in
chapter 4. The engine underneath — workflow, tasks, payment capture, reporting — is the
one running in production in the UAE.

## Processes covered

New Work Visa & Iqama · Iqama Renewal · Exit & Re-entry · Sponsorship Transfer · Final Exit,
plus Nitaqat band tracking and the SCFHS healthcare licensing lane.

## Rebuilding

```bash
python3 ksa/build-screens.py          # screen templates
node /tmp/shoot.mjs                   # rasterise (see repo history for the script)
python3 ksa/build-journeymap.py
python3 ksa/build-architecture.py
python3 ksa/build-journey.py          # assemble index.html
python3 ksa/build-standalone.py       # emit site/ksa/
cd ksadeck && node build.js           # the KSA deck
```
