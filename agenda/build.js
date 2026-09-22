/* The agenda slide for each deck. Customer and SAP facing: it shows how long
   each section takes, not a presenter's running clock. The precise per-slide
   run sheet still lives in the speaker notes of the KSA deck.
   Minutes are asserted against 20 at build time.            node build.js */
const pptxgen = require('pptxgenjs');

const INK='0C1E33', TEAL='20A098', TEAL_D='12756F', SAND='C9A227';
const WHITE='FFFFFF', BG='F4F6F7', GREY='5A6C82', GREY_L='E3E7EA';
const H='Arial', B='Calibri';

/* [minutes, section, what it covers] */
const GCC = [
  [1, 'Who we are',                        'The four people you will be dealing with.'],
  [2, 'The problem',                       'One permit, six teams, no shared clock.'],
  [2, 'Every permit on one track',         'The application on screen, running a real lifecycle.'],
  [4, 'Who does what',                     'Every role has its own queue, with owners and due dates.'],
  [2, 'The money trail',                   'No payment without a receipt and a GL code. No duplicates.'],
  [3, 'Seven countries, and healthcare',   'Country packs, permit types, and the second licence a clinician needs.'],
  [4, 'Architecture and the API question', 'Where we sit between the government portals and SuccessFactors.'],
  [2, 'What it runs on, and next steps',   'The SAP BTP services you provision, and what happens after today.'],
];

const KSA = [
  [1, 'Who we are',                        'The four people you will be dealing with.'],
  [1, 'The problem',                       'Three systems, one employee, nobody joining them up.'],
  [3, 'Five Saudi lifecycles',             'What it is, and which door each worker actually needs.'],
  [4, 'Walk a permit, end to end',         'The journey map, then exit and re-entry: the one that costs most.'],
  [2, 'Nitaqat and the hiring switch',     'The number that decides whether you can hire at all.'],
  [4, 'Seven portals, one queue',          'Qiwa, Muqeem, Absher and the rest. Then the eight obligations.'],
  [2, 'Who does what, and what it costs',  'Every step owned. Every riyal accounted for.'],
  [2, 'Architecture and what it runs on',  'Every system, what moves between them, and the SAP BTP services.'],
  [1, 'Beyond the Kingdom',                'Saudi Arabia is one pack. There are seven.'],
];

function agenda(plan, opts) {
  const total = plan.reduce((a, r) => a + r[0], 0);
  if (total !== 20) throw new Error(`${opts.file}: plan is ${total} min, needs 20`);

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

  [[0.74,'MINS',0.82,'center'],[1.72,'SECTION',3.60,'left'],[5.55,'WHAT WE COVER',7.24,'left']]
    .forEach(c => s.addText(c[1], { x:c[0], y:1.74, w:c[2], h:0.20, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4, align:c[3] }));

  /* rows stretch to fill the same block whether the plan has 8 sections or 9 */
  const TOP = 1.98, BOTTOM = 6.84, gap = 0.04;
  const rh = (BOTTOM - TOP - (plan.length-1)*gap) / plan.length;
  plan.forEach((r, i) => {
    const y = TOP + i*(rh+gap);
    const last = i === plan.length - 1;
    const mid = (rh - 0.32) / 2;
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:12.19, h:rh, rectRadius:0.06,
      fill:{color: i%2 ? WHITE : BG}, line:{color:GREY_L, width:0.6} });
    s.addShape(p.ShapeType.roundRect, { x:0.74, y:y+mid, w:0.82, h:0.32, rectRadius:0.07,
      fill:{color: last ? SAND : (i%2 ? TEAL_D : TEAL)} });
    s.addText(String(r[0]), { x:0.74, y:y+mid, w:0.82, h:0.32, isTextBox:true, margin:0,
      fontFace:B, fontSize:11.5, bold:true, color:WHITE, align:'center', valign:'middle' });
    s.addText(r[1], { x:1.72, y:y+(rh-0.26)/2, w:3.60, h:0.26, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:INK, valign:'middle' });
    s.addText(r[2], { x:5.55, y:y+(rh-0.24)/2, w:7.24, h:0.24, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, color:GREY, valign:'middle' });
  });

  s.addText(opts.footer, { x:0.6, y:7.02, w:9.4, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, color:'96A3AE' });
  s.addText('20 MINUTES', { x:11.0, y:7.02, w:1.79, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, bold:true, color:SAND, align:'right', charSpacing:1.2 });
  s.addNotes(opts.notes);

  return p.writeFile({ fileName: opts.file })
    .then(f => console.log('WROTE', f, '|', plan.length, 'sections |', total, 'min'));
}

Promise.all([
  agenda(GCC, {
    file:'INK_IT_GCC_Agenda_Slide.pptx', title:'Visa & Permits GCC - agenda',
    sub:'What we will walk through, and roughly how long we will spend on each part. Questions are welcome as we go.',
    footer:'INK IT Business Solutions  ·  Visa & Permits Management  ·  GCC',
    notes:'Twenty seconds on this slide. Say the three things they are getting: the problem, the application '
      + 'running, and what it costs to stand up. Tell them the API question gets answered before they have to ask it. '
      + 'Your own timings: 0:40, 2:00, 2:20, 3:40, 2:20, 3:30, 3:30, 2:00. If you are running late, compress '
      + 'healthcare and BTP services. Never compress the walkthrough.' }),
  agenda(KSA, {
    file:'INK_IT_KSA_Agenda_Slide.pptx', title:'Visa & Permits KSA - agenda',
    sub:'What we will walk through, and roughly how long we will spend on each part. Questions are welcome as we go.',
    footer:'INK IT Business Solutions  ·  Visa & Permits Management  ·  Kingdom of Saudi Arabia',
    notes:'Twenty seconds on this slide. For a mixed room, say who each part is for: the walkthrough is for the '
      + 'PRO desk, Nitaqat is for the CHRO and the CFO, and the architecture section is for the SAP account team. '
      + 'Your own timings are stamped on each slide in this deck. If you are running late, compress compliance '
      + 'and BTP services. Never compress the permit walkthrough.' }),
]).catch(e => { console.error(e.message); process.exit(1); });
