/* The 20-minute run sheet, as a slide, for each deck.
   Standalone so it can be pasted straight in after the title slide.
   Durations are checked against 20:00 at build time, so the slide can
   never quietly drift out of sync with the plan.            node build.js */
const pptxgen = require('pptxgenjs');

const INK='0C1E33', TEAL='20A098', TEAL_D='12756F', SAND='C9A227';
const WHITE='FFFFFF', BG='F4F6F7', GREY='5A6C82', GREY_L='E3E7EA';
const H='Arial', B='Calibri';

const mmss = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

/* [seconds, section, what happens on it] */
const GCC = [
  [ 40, 'Who we are',                        'The four people you will be dealing with.'],
  [120, 'The problem',                       'One permit, six teams, no shared clock.'],
  [140, 'Every permit on one track',         'The application on screen, running a real lifecycle.'],
  [220, 'Who does what',                     'Every role has its own queue, with owners and due dates.'],
  [140, 'The money trail',                   'No payment without a receipt and a GL code. No duplicates.'],
  [210, 'Seven countries, and healthcare',   'Country packs, permit types, the clinician second licence.'],
  [210, 'Architecture and the API question', 'Where we sit between government and SuccessFactors.'],
  [120, 'What it runs on, and next steps',   'The BTP services you provision, and what happens after today.'],
];

const KSA = [
  [ 40, 'Who we are',                        'The four people you will be dealing with.'],
  [ 80, 'The problem',                       'Three systems, one employee, nobody joining them up.'],
  [155, 'Five Saudi lifecycles',             'What it is, and which door each worker actually needs.'],
  [235, 'Walk a permit, end to end',         'The map, then exit and re-entry: the one that costs most.'],
  [115, 'Nitaqat and the hiring switch',     'The number that decides whether you can hire at all.'],
  [225, 'Seven portals, one queue',          'Qiwa, Muqeem, Absher and the rest. Then eight obligations.'],
  [135, 'Who does what, and what it costs',  'Every step owned. Every riyal accounted for.'],
  [155, 'Architecture and what it runs on',  'Every system, what moves between them, the BTP services.'],
  [ 60, 'Beyond the Kingdom',                'Saudi Arabia is one pack. There are seven.'],
];

function agenda(plan, opts) {
  const total = plan.reduce((a, r) => a + r[0], 0);
  if (total !== 1200) throw new Error(`${opts.file}: plan is ${mmss(total)}, needs 20:00`);

  const p = new pptxgen();
  p.layout = 'LAYOUT_WIDE';
  p.author = 'INK IT Business Solutions';
  p.company = 'INK IT Business Solutions';
  p.title = opts.title;

  const s = p.addSlide();
  s.background = { color: WHITE };
  s.addText('AGENDA', { x:0.6, y:0.44, w:12.1, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:11, bold:true, color:TEAL, charSpacing:2.2 });
  s.addText('Twenty minutes, end to end.', { x:0.6, y:0.72, w:12.1, h:0.62, isTextBox:true,
    margin:0, fontFace:H, fontSize:30, bold:true, color:INK });
  s.addText(opts.sub, { x:0.6, y:1.36, w:11.4, h:0.30, isTextBox:true, margin:0,
    fontFace:B, fontSize:13, color:GREY });

  [[1.72,'SECTION',4.40,'left'],[6.35,'WHAT HAPPENS',4.95,'left'],[11.35,'BY',1.44,'right']]
    .forEach(c => s.addText(c[1], { x:c[0], y:1.74, w:c[2], h:0.20, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4, align:c[3] }));

  /* rows stretch to fill the same block whether the plan has 8 sections or 9 */
  const TOP = 1.98, BOTTOM = 6.84, gap = 0.04;
  const rh = (BOTTOM - TOP - (plan.length-1)*gap) / plan.length;
  let run = 0;
  plan.forEach((r, i) => {
    const y = TOP + i*(rh+gap);
    const mid = (rh - 0.32) / 2;          // keeps the chip centred at any row height
    const last = i === plan.length - 1;
    run += r[0];
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:12.19, h:rh, rectRadius:0.06,
      fill:{color: i%2 ? WHITE : BG}, line:{color:GREY_L, width:0.6} });
    s.addShape(p.ShapeType.roundRect, { x:0.74, y:y+mid, w:0.82, h:0.32, rectRadius:0.07,
      fill:{color: last ? SAND : (i%2 ? TEAL_D : TEAL)} });
    s.addText(mmss(r[0]), { x:0.74, y:y+mid, w:0.82, h:0.32, isTextBox:true, margin:0,
      fontFace:B, fontSize:10.5, bold:true, color:WHITE, align:'center', valign:'middle' });
    s.addText(r[1], { x:1.72, y:y+(rh-0.26)/2, w:4.40, h:0.26, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:INK, valign:'middle' });
    s.addText(r[2], { x:6.35, y:y+(rh-0.24)/2, w:4.95, h:0.24, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, color:GREY, valign:'middle' });
    s.addText(mmss(run), { x:11.35, y:y+(rh-0.26)/2, w:1.44, h:0.26, isTextBox:true, margin:0,
      fontFace:B, fontSize:12.5, bold:true, color: last ? TEAL_D : INK,
      align:'right', valign:'middle' });
  });

  s.addText(opts.footer, { x:0.6, y:7.02, w:9.4, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, color:'96A3AE' });
  s.addText('20:00', { x:11.9, y:7.02, w:0.89, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, bold:true, color:SAND, align:'right' });
  s.addNotes(opts.notes);

  return p.writeFile({ fileName: opts.file })
    .then(f => console.log('WROTE', f, '|', plan.length, 'sections |', mmss(total)));
}

Promise.all([
  agenda(GCC, {
    file:'INK_IT_GCC_Agenda_Slide.pptx', title:'Visa & Permits GCC - agenda',
    sub:'The clock on the right is where you should be by the end of each section. Protect the walkthrough, it is the part that sells.',
    footer:'INK IT Business Solutions  ·  Visa & Permits Management  ·  GCC',
    notes:'Twenty seconds on this slide. Say the three things they are getting: the problem, the application '
      + 'running, and what it costs to stand up. Tell them the API question gets answered before they have to ask it. '
      + 'If you are running late, compress healthcare and BTP services. Never compress the walkthrough.' }),
  agenda(KSA, {
    file:'INK_IT_KSA_Agenda_Slide.pptx', title:'Visa & Permits KSA - agenda',
    sub:'The clock on the right is where you should be by the end of each section. Protect the permit walkthrough, it is the part that sells.',
    footer:'INK IT Business Solutions  ·  Visa & Permits Management  ·  Kingdom of Saudi Arabia',
    notes:'Twenty seconds on this slide. For a mixed room, say who each part is for: the walkthrough is for the '
      + 'PRO desk, Nitaqat is for the CHRO and the CFO, and the architecture section is for the SAP account team. '
      + 'If you are running late, compress compliance and BTP services. Never compress the permit walkthrough.' }),
]).catch(e => { console.error(e.message); process.exit(1); });
