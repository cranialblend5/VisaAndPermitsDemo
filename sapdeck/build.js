/* Five slides for SAP: the value case, the architecture, the SAP BTP services
   required, and a worked sizing for one Saudi customer of 1,000 employees.
   The architecture on slide 3 is drawn with native PowerPoint shapes and
   connectors, not an image, so every box and every label can be edited.
   Terminology is deliberate: full product names, "Onboarding" not a version
   number, "Human Capital Management" not a marketing acronym.       node build.js */
const pptxgen = require('pptxgenjs');
const SZ = require('./sizing');

const p = new pptxgen();
p.layout  = 'LAYOUT_WIDE';                        // 13.333 x 7.5
p.author  = 'INK IT Business Solutions';
p.company = 'INK IT Business Solutions';
p.title   = 'Visa and Permits Management on SAP Business Technology Platform';

const INK='0C1E33', INK2='16304C', TEAL='20A098', TEAL_D='12756F', TEAL_L='E4F5F3';
const SAND='C9A227', WHITE='FFFFFF', BG='F4F6F7', GREY='5A6C82', GREY_L='E3E7EA';
const SAPB='0A6ED1', SAPB_L='EAF2FC', GOOD='17795E';
const H='Arial', B='Calibri', IMG='./img';

const S = () => p.addSlide();
const light = s => { s.background = { color: WHITE }; };
const dark  = s => { s.background = { color: INK }; };

function title(s, kicker, text) {
  s.addText(kicker.toUpperCase(), { x:0.6, y:0.40, w:12.1, h:0.24, isTextBox:true, margin:0,
    fontFace:B, fontSize:10.5, bold:true, color:TEAL, charSpacing:2.2 });
  s.addText(text, { x:0.6, y:0.66, w:12.1, h:0.56, isTextBox:true, margin:0,
    fontFace:H, fontSize:27, bold:true, color:INK });
}
function foot(s, n, isDark) {
  s.addText('INK IT Business Solutions   ·   Visa and Permits Management on SAP Business Technology Platform   ·   Kingdom of Saudi Arabia',
    { x:0.6, y:7.04, w:11.3, h:0.24, isTextBox:true, margin:0, fontFace:B, fontSize:8,
      color: isDark ? '7E99B4' : '96A3AE' });
  s.addText(String(n), { x:12.1, y:7.04, w:0.69, h:0.24, isTextBox:true, margin:0,
    fontFace:B, fontSize:8, color: isDark ? '7E99B4' : '96A3AE', align:'right' });
}
function box(s, x, y, w, h, fill, line, r) {
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius: r ?? 0.06,
    fill:{ color: fill }, line:{ color: line ?? GREY_L, width: 0.85 } });
}
/* a straight connector with an arrow head; native shape, editable */
function arrow(s, x1, y1, x2, y2, col, dash, both) {
  s.addShape(p.ShapeType.line, { x: x1, y: y1, w: x2-x1, h: y2-y1,
    line: { color: col ?? SAPB, width: 1.5, dashType: dash ? 'dash' : 'solid',
            endArrowType: 'triangle', beginArrowType: both ? 'triangle' : 'none' } });
}
function lbl(s, x, y, w, text, col, size) {
  s.addText(text, { x, y, w, h:0.20, isTextBox:true, margin:0, fontFace:B,
    fontSize: size ?? 7.4, color: col ?? GREY, align:'center', valign:'middle' });
}

/* ================= SLIDE 1 — TITLE ================= */
{
  const s = S(); dark(s);
  s.addShape(p.ShapeType.ellipse, { x:9.6, y:-2.3, w:7.4, h:7.4, fill:{ color:INK2 } });
  s.addShape(p.ShapeType.ellipse, { x:11.2, y:3.6, w:5.0, h:5.0, fill:{ color:'123A5E' } });
  s.addImage({ path:`${IMG}/logo-white.png`, x:0.6, y:0.5, w:1.62, h:0.54 });

  s.addText('FOR SAP REVIEW   ·   SEPTEMBER 2026', { x:0.6, y:2.05, w:9.0, h:0.24, isTextBox:true,
    margin:0, fontFace:B, fontSize:10.5, bold:true, color:SAND, charSpacing:2.2 });
  s.addText('Visa and Permits Management', { x:0.6, y:2.40, w:9.6, h:0.72, isTextBox:true,
    margin:0, fontFace:H, fontSize:40, bold:true, color:WHITE });
  s.addText('Built on SAP Business Technology Platform', { x:0.6, y:3.16, w:9.6, h:0.50, isTextBox:true,
    margin:0, fontFace:H, fontSize:23, bold:true, color:TEAL });
  s.addText('A packaged application for the Kingdom of Saudi Arabia. It runs the work permit, Iqama, exit and re-entry and final exit lifecycles end to end, between the Saudi government portals and SAP SuccessFactors, with every fee posted to the General Ledger.',
    { x:0.6, y:3.86, w:8.5, h:0.90, isTextBox:true, margin:0, fontFace:B, fontSize:13.5,
      color:'B7CDE2', lineSpacing:19 });

  const facts = [['1,000', 'employee reference sizing'], ['7', 'Saudi authorities covered'],
                 ['5', 'permit lifecycles'], ['30,540', 'capacity units a year']];
  facts.forEach((f, i) => {
    const x = 0.6 + i*2.3;
    s.addText(f[0], { x, y:5.10, w:2.15, h:0.44, isTextBox:true, margin:0,
      fontFace:H, fontSize:23, bold:true, color:WHITE });
    s.addText(f[1], { x, y:5.56, w:2.15, h:0.40, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.5, color:'8FA9C2' });
  });
  s.addShape(p.ShapeType.roundRect, { x:0.6, y:6.25, w:4.6, h:0.46, rectRadius:0.08,
    fill:{ color:'FFFFFF' }, line:{ color:'FFFFFF', width:0 } });
  s.addText('[ place the official SAP partner badge here ]', { x:0.6, y:6.25, w:4.6, h:0.46,
    isTextBox:true, margin:0, fontFace:B, fontSize:9.5, bold:true, color:SAPB,
    align:'center', valign:'middle' });
  foot(s, 1, true);
  s.addNotes('Leave-behind for the SAP account team. The four numbers are the ones they will be asked '
    + 'internally: how big is the customer, how much of the country is covered, how much of the lifecycle, '
    + 'and what does it consume. Replace the white box with the approved SAP partner badge from the partner portal.');
}

/* ================= SLIDE 2 — VALUE PROPOSITION ================= */
{
  const s = S(); light(s);
  title(s, 'Value proposition', 'Why this belongs on SAP Business Technology Platform.');
  s.addText('The Saudi permit lifecycle already starts and ends inside SAP SuccessFactors. What it has never had is a governed middle.',
    { x:0.6, y:1.28, w:11.4, h:0.28, isTextBox:true, margin:0, fontFace:B, fontSize:12.5, color:GREY });

  const cards = [
    ['For the customer', TEAL, [
      'One queue for every permit, with an owner and a due date on each step',
      'Iqama, exit and re-entry and final exit tracked against the statutory clock',
      'Every government fee posted to the General Ledger with a receipt attached',
      'Nitaqat band position visible before a hire is approved, not after']],
    ['For SAP', SAPB, [
      'Extends SAP SuccessFactors rather than replacing any part of it',
      'Pulls SAP Integration Suite and SAP HANA Cloud into a Human Capital Management account',
      'A repeatable Kingdom of Saudi Arabia package, not a one-off development',
      'Opens the same conversation in six more Gulf Cooperation Council countries']],
    ['For INK IT Business Solutions', SAND, [
      'Built, running and demonstrable today, not a concept',
      'Delivery team already resident in Riyadh',
      'Country content maintained as configuration, so regulation changes are absorbed',
      'Fixed scope for the first country, configuration for the next']],
  ];
  const cw = 3.85, gap = 0.25;
  cards.forEach((c, i) => {
    const x = 0.6 + i*(cw+gap);
    box(s, x, 1.72, cw, 3.05, i===1 ? SAPB_L : BG);
    s.addShape(p.ShapeType.roundRect, { x, y:1.72, w:cw, h:0.07, rectRadius:0.03, fill:{ color:c[1] } });
    s.addText(c[0], { x:x+0.22, y:1.92, w:cw-0.44, h:0.28, isTextBox:true, margin:0,
      fontFace:H, fontSize:13.5, bold:true, color:INK });
    s.addText(c[2].map(t => ({ text:t, options:{ bullet:{ code:'2022' }, breakLine:true } })),
      { x:x+0.22, y:2.26, w:cw-0.42, h:2.38, isTextBox:true, margin:0,
        fontFace:B, fontSize:10, color:GREY, lineSpacing:13.5, paraSpaceAfter:6 });
  });

  /* the business case strip */
  s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.00, w:12.19, h:1.72, rectRadius:0.08, fill:{ color:INK } });
  s.addText('What it is worth to a customer of 1,000 employees', { x:0.95, y:5.20, w:6.0, h:0.26,
    isTextBox:true, margin:0, fontFace:B, fontSize:9.5, bold:true, color:SAND, charSpacing:1.6 });
  const val = [
    ['1,930', 'permit cases a year', 'renewals, new visas, exit and re-entry, final exits'],
    ['23,160', 'tracked tasks a year', 'each with an owner, a due date and an audit trail'],
    ['Zero', 'unaccounted payments', 'every fee carries a receipt and a General Ledger code'],
    ['Days', 'not weeks of reconciliation', 'one export replaces the monthly finance chase'],
  ];
  val.forEach((v, i) => {
    const x = 0.95 + i*2.95;
    s.addText(v[0], { x, y:5.54, w:2.8, h:0.38, isTextBox:true, margin:0,
      fontFace:H, fontSize:20, bold:true, color:WHITE });
    s.addText(v[1], { x, y:5.94, w:2.8, h:0.22, isTextBox:true, margin:0,
      fontFace:B, fontSize:10, bold:true, color:TEAL });
    s.addText(v[2], { x, y:6.16, w:2.75, h:0.42, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.6, color:'9FB6CC', lineSpacing:10.5 });
  });
  foot(s, 2);
  s.addNotes('Three audiences, three columns. For an account executive the middle column is the one that '
    + 'matters: this is net new Integration Suite and HANA Cloud consumption inside an account they already hold, '
    + 'and it is repeatable across the Gulf.');
}

/* ================= SLIDE 3 — TECHNICAL ARCHITECTURE =================
   Every element below is a native PowerPoint shape, connector or text box.
   Nothing on this slide is an image, so the customer name, any service and
   any flow label can be edited in place.                                   */
{
  const s = S(); light(s);
  title(s, 'Technical architecture', 'Every system, and what actually moves between them.');

  const ROW_Y = 2.62, ROW_H = 2.86, ROW_B = ROW_Y + ROW_H;   // 5.48
  const BTP_X = 2.95, BTP_W = 6.35, BTP_R = BTP_X + BTP_W;   // 9.30
  const MID_Y = 4.05;                                        // horizontal arrow line

  /* ---------- SAP SuccessFactors band ---------- */
  box(s, BTP_X, 1.32, BTP_W, 0.88, SAPB_L, 'BBD6F2');
  s.addText('SAP SUCCESSFACTORS   ·   SYSTEM OF RECORD FOR PEOPLE', { x:BTP_X+0.14, y:1.39, w:BTP_W-0.28,
    h:0.20, isTextBox:true, margin:0, fontFace:B, fontSize:7.6, bold:true, color:SAPB, charSpacing:1.3 });
  [['SAP SuccessFactors Recruiting','Candidate released to permit'],
   ['SAP SuccessFactors Onboarding','Arrival date starts the clock'],
   ['SAP SuccessFactors Employee Central','Employee, job and organisation']]
    .forEach((t, i) => {
      const x = BTP_X + 0.12 + i*2.07;
      box(s, x, 1.63, 1.95, 0.54, WHITE, 'BBD6F2', 0.05);
      s.addText(t[0], { x:x+0.07, y:1.655, w:1.81, h:0.30, isTextBox:true, margin:0,
        fontFace:B, fontSize:8.2, bold:true, color:INK, lineSpacing:9.6 });
      s.addText(t[1], { x:x+0.07, y:1.955, w:1.81, h:0.20, isTextBox:true, margin:0,
        fontFace:B, fontSize:7, color:GREY });
    });

  /* ---------- people ---------- */
  box(s, 0.55, ROW_Y, 2.10, ROW_H, BG);
  s.addText('WHO USES IT', { x:0.67, y:ROW_Y+0.10, w:1.86, h:0.20, isTextBox:true, margin:0,
    fontFace:B, fontSize:7.6, bold:true, color:GREY, charSpacing:1.3 });
  [['Government Relations Officer','Files with the authorities'],
   ['Human Resources operations','Initiates and chases'],
   ['Finance','Reconciles and posts'],
   ['Employee','Requests and confirms']]
    .forEach((t, i) => {
      const y = 3.02 + i*0.59;
      box(s, 0.67, y, 1.86, 0.52, WHITE, GREY_L, 0.05);
      s.addText(t[0], { x:0.74, y:y+0.06, w:1.72, h:0.20, isTextBox:true, margin:0,
        fontFace:B, fontSize:8, bold:true, color:INK });
      s.addText(t[1], { x:0.74, y:y+0.26, w:1.72, h:0.20, isTextBox:true, margin:0,
        fontFace:B, fontSize:6.9, color:GREY });
    });

  /* ---------- the platform ---------- */
  s.addShape(p.ShapeType.roundRect, { x:BTP_X, y:ROW_Y, w:BTP_W, h:ROW_H, rectRadius:0.07,
    fill:{ color:TEAL_L }, line:{ color:TEAL, width:1.4 } });
  s.addText('VISA AND PERMITS MANAGEMENT   ·   SAP BUSINESS TECHNOLOGY PLATFORM', { x:BTP_X+0.14,
    y:ROW_Y+0.10, w:BTP_W-0.28, h:0.20, isTextBox:true, margin:0, fontFace:B, fontSize:7.6,
    bold:true, color:TEAL_D, charSpacing:1.2 });
  [['SAP Build Work Zone','The launchpad and the officer inbox. One place to start every case.'],
   ['SAP BTP, Cloud Foundry runtime','The application itself: cases, milestones, country rules, fees.'],
   ['SAP Build Process Automation','Workflow, approvals, escalation and unattended automation.'],
   ['SAP HANA Cloud','Case data, the block visa quota register and the audit trail.'],
   ['SAP Document Management service','Contracts, receipts, medical certificates, Iqama copies.'],
   ['SAP Alert Notification service','Expiry, return-by and due-date alerts before they bite.']]
    .forEach((t, i) => {
      const x = BTP_X + 0.12 + (i%3)*2.07;
      const y = 3.02 + Math.floor(i/3)*1.08;
      box(s, x, y, 1.95, 1.00, WHITE, '9FD8D3', 0.05);
      s.addText(t[0], { x:x+0.09, y:y+0.09, w:1.77, h:0.32, isTextBox:true, margin:0,
        fontFace:B, fontSize:8.4, bold:true, color:TEAL_D, lineSpacing:10 });
      s.addText(t[1], { x:x+0.09, y:y+0.42, w:1.77, h:0.52, isTextBox:true, margin:0,
        fontFace:B, fontSize:6.9, color:GREY, lineSpacing:8.4 });
    });
  box(s, BTP_X+0.12, 5.18, BTP_W-0.24, 0.24, WHITE, '9FD8D3', 0.04);
  s.addText('SAP Cloud Identity Services for single sign-on and roles   ·   Destination and Connectivity services for every outbound call',
    { x:BTP_X+0.18, y:5.18, w:BTP_W-0.36, h:0.24, isTextBox:true, margin:0,
      fontFace:B, fontSize:7, color:GREY, valign:'middle' });

  /* ---------- integration layer ---------- */
  box(s, 9.60, ROW_Y, 1.30, ROW_H, SAPB_L, 'BBD6F2');
  s.addText('INTEGRATION', { x:9.70, y:ROW_Y+0.10, w:1.10, h:0.20, isTextBox:true, margin:0,
    fontFace:B, fontSize:7.6, bold:true, color:SAPB, charSpacing:1.1 });
  [['SAP Integration Suite','Cloud Integration'],['API Management','Throttling and keys'],
   ['Open Connectors','Portal adapters']]
    .forEach((t, i) => {
      const y = 3.02 + i*0.72;
      box(s, 9.70, y, 1.10, 0.62, WHITE, 'BBD6F2', 0.05);
      s.addText(t[0], { x:9.75, y:y+0.07, w:1.00, h:0.30, isTextBox:true, margin:0,
        fontFace:B, fontSize:7.6, bold:true, color:INK, lineSpacing:9 });
      s.addText(t[1], { x:9.75, y:y+0.36, w:1.00, h:0.22, isTextBox:true, margin:0,
        fontFace:B, fontSize:6.6, color:GREY });
    });

  /* ---------- government ---------- */
  box(s, 11.20, ROW_Y, 1.60, ROW_H, 'FBF4DF', 'E2CE85');
  s.addText('SAUDI AUTHORITIES', { x:11.30, y:ROW_Y+0.10, w:1.40, h:0.20, isTextBox:true, margin:0,
    fontFace:B, fontSize:7.6, bold:true, color:'8A6D10', charSpacing:1.0 });
  [['Qiwa','Work permit, contract'],['Muqeem','Iqama, exit re-entry'],['Absher','Employee mirror'],
   ['Enjaz','Visa stamping'],['GOSI','Social insurance'],['Mudad','Wage Protection System'],
   ['CCHI','Medical insurance']]
    .forEach((t, i) => {
      const y = 3.00 + i*0.35;
      box(s, 11.30, y, 1.40, 0.335, WHITE, 'E2CE85', 0.04);
      s.addText(t[0], { x:11.36, y:y, w:0.50, h:0.335, isTextBox:true, margin:0,
        fontFace:B, fontSize:7.8, bold:true, color:INK, valign:'middle' });
      s.addText(t[1], { x:11.82, y:y, w:0.84, h:0.335, isTextBox:true, margin:0,
        fontFace:B, fontSize:6.3, color:GREY, valign:'middle', align:'right', lineSpacing:7.4 });
    });

  /* ---------- downstream ---------- */
  [['SAP S/4HANA Finance','Fee postings, vendor invoices and the General Ledger account per fee type', 4.47],
   ['SAP Analytics Cloud','Nitaqat band position, compliance exposure and permit cost by entity', 7.77]]
    .forEach((t, i) => {
      const x = BTP_X + i*3.30;
      box(s, x, 5.72, 3.05, 0.92, BG);
      s.addText(t[0], { x:x+0.14, y:5.82, w:2.77, h:0.24, isTextBox:true, margin:0,
        fontFace:B, fontSize:9.4, bold:true, color:INK });
      s.addText(t[1], { x:x+0.14, y:6.06, w:2.77, h:0.46, isTextBox:true, margin:0,
        fontFace:B, fontSize:7.4, color:GREY, lineSpacing:9 });
    });

  /* ---------- connectors ---------- */
  arrow(s, 4.60, 2.20, 4.60, ROW_Y, SAPB);                       // SuccessFactors -> platform
  lbl(s, 3.15, 2.26, 2.90, 'employee, job and organisation data', SAPB, 6.8);
  arrow(s, 7.70, ROW_Y, 7.70, 2.20, SAPB);                       // platform -> SuccessFactors
  lbl(s, 6.55, 2.26, 2.60, 'permit status and Iqama number', SAPB, 6.8);

  arrow(s, 2.65, MID_Y, BTP_X, MID_Y, TEAL_D, false, true);      // people <-> platform
  arrow(s, BTP_R, MID_Y, 9.60, MID_Y, SAPB, false, true);        // platform <-> integration
  arrow(s, 10.90, MID_Y, 11.20, MID_Y, SAND, false, true);       // integration <-> government

  arrow(s, 4.47, ROW_B, 4.47, 5.72, TEAL_D);                     // platform -> finance
  lbl(s, 3.20, ROW_B+0.02, 2.55, 'fee, receipt and cost centre', TEAL_D, 6.8);
  arrow(s, 7.77, ROW_B, 7.77, 5.72, TEAL_D);                     // platform -> analytics
  lbl(s, 6.55, ROW_B+0.02, 2.55, 'case, task and compliance data', TEAL_D, 6.8);

  /* ---------- how to read it ---------- */
  s.addText([
    { text:'Submission ', options:{ bold:true, color:INK } },
    { text:'to Qiwa, Muqeem and Enjaz is outbound and acknowledged. ', options:{ color:GREY } },
    { text:'Lookup ', options:{ bold:true, color:INK } },
    { text:'from Absher, GOSI, Mudad and CCHI is read only. Government access is granted to the employer under its own establishment registration, never to a software vendor, so each connector is built and waits on the customer credential.',
      options:{ color:GREY } },
  ], { x:0.55, y:6.72, w:12.25, h:0.28, isTextBox:true, margin:0, fontFace:B, fontSize:7.8, lineSpacing:10 });

  foot(s, 3);
  s.addNotes('Walk the four sides. SAP SuccessFactors stays the system of record at the top. The people are on '
    + 'the left, the Kingdom is on the right, finance and analytics are underneath. Everything in the teal box is '
    + 'what we built, and every one of those is an SAP Business Technology Platform service. '
    + 'Every shape on this slide is editable: change a customer name or a service and nothing needs redrawing.');
}

/* ================= SLIDE 4 — SAP BTP SERVICES REQUIRED ================= */
{
  const s = S(); light(s);
  title(s, 'What it runs on', 'The SAP Business Technology Platform services required.');
  s.addText('Six services are required for any deployment. The rest scale with how far the customer wants to take it.',
    { x:0.6, y:1.28, w:11.4, h:0.26, isTextBox:true, margin:0, fontFace:B, fontSize:12.5, color:GREY });

  const rows = [
    ['SAP BTP, Cloud Foundry runtime',        'Runs the application itself',                  'Consumption', 'Core'],
    ['SAP HANA Cloud',                        'Case data, quota register, audit trail',       'Consumption', 'Core'],
    ['SAP Build Work Zone, standard edition', 'Launchpad and the officer inbox',              'Subscription','Core'],
    ['SAP Build Process Automation',          'Workflow, approvals, escalation, automation',  'Both',        'Core'],
    ['SAP Cloud Identity Services',           'Single sign-on and role assignment',           'Included',    'Core'],
    ['Destination and Connectivity services', 'Every outbound call to a portal or system',    'Included',    'Core'],
    ['SAP Integration Suite',                 'Government portal and SAP SuccessFactors integration', 'Subscription','Integration'],
    ['SAP Document Management service',       'Contracts, receipts, certificates',            'Consumption', 'Integration'],
    ['SAP Alert Notification service',        'Expiry and due-date alerts',                   'Consumption', 'Integration'],
    ['SAP Cloud Transport Management',        'Moves releases across the three tiers',        'Consumption', 'Delivery'],
    ['SAP Continuous Integration and Delivery','Build and deploy pipeline',                   'Consumption', 'Delivery'],
    ['SAP Business Application Studio',       'Where the application is developed',           'Included',    'Delivery'],
    ['SAP Analytics Cloud',                   'Nitaqat and compliance dashboards',            'Subscription','Optional'],
  ];
  const COL = { core:TEAL, integration:SAPB, delivery:'7A6096', optional:GREY };
  const tint = { Core:TEAL_L, Integration:SAPB_L, Delivery:'F0ECF6', Optional:BG };

  s.addText('SERVICE',      { x:1.30, y:1.66, w:4.10, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'96A3AE', charSpacing:1.3 });
  s.addText('WHAT IT DOES', { x:5.50, y:1.66, w:4.35, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'96A3AE', charSpacing:1.3 });
  s.addText('HOW IT IS LICENSED', { x:9.95, y:1.66, w:2.85, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'96A3AE', charSpacing:1.3 });

  const rh = 0.34, gap = 0.025;
  rows.forEach((r, i) => {
    const y = 1.90 + i*(rh+gap);
    box(s, 0.6, y, 12.19, rh, i%2 ? WHITE : BG, GREY_L, 0.04);
    s.addShape(p.ShapeType.roundRect, { x:0.72, y:y+0.075, w:0.50, h:0.205, rectRadius:0.04,
      fill:{ color: COL[r[3].toLowerCase()] } });
    s.addText(r[3].slice(0,4).toUpperCase(), { x:0.72, y:y+0.075, w:0.50, h:0.205, isTextBox:true,
      margin:0, fontFace:B, fontSize:6.2, bold:true, color:WHITE, align:'center', valign:'middle' });
    s.addText(r[0], { x:1.30, y:y, w:4.10, h:rh, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, bold:true, color:INK, valign:'middle' });
    s.addText(r[1], { x:5.50, y:y, w:4.35, h:rh, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color:GREY, valign:'middle' });
    s.addShape(p.ShapeType.roundRect, { x:9.95, y:y+0.065, w:1.30, h:0.225, rectRadius:0.04,
      fill:{ color: tint[r[3]] || BG } });
    s.addText(r[2], { x:9.95, y:y+0.065, w:1.30, h:0.225, isTextBox:true, margin:0,
      fontFace:B, fontSize:7.6, bold:true, color:INK, align:'center', valign:'middle' });
  });

  s.addText([
    { text:'Consumption ', options:{ bold:true, color:INK } },
    { text:'is drawn from the cloud credit pool. ', options:{ color:GREY } },
    { text:'Subscription ', options:{ bold:true, color:INK } },
    { text:'is licensed separately from credits. ', options:{ color:GREY } },
    { text:'Included ', options:{ bold:true, color:INK } },
    { text:'comes with the platform at no separate charge.', options:{ color:GREY } },
  ], { x:0.6, y:6.72, w:12.19, h:0.22, isTextBox:true, margin:0, fontFace:B, fontSize:8.4 });
  foot(s, 4);
  s.addNotes('The six Core rows are non-negotiable. Everything else scales with ambition. The right-hand column '
    + 'is the one a licensing desk will go to first, because it separates what draws on credits from what needs '
    + 'its own subscription line.');
}

/* ================= SLIDE 5 — SIZING ================= */
{
  const s = S(); light(s);
  title(s, 'Sample sizing', 'One Saudi customer, 1,000 employees.');
  s.addText('Demand is derived from the workload, not guessed. Seven hundred of the thousand are expatriates, so seven hundred Iqamas renew every year.',
    { x:0.6, y:1.28, w:11.4, h:0.26, isTextBox:true, margin:0, fontFace:B, fontSize:12.5, color:GREY });

  /* demand strip */
  const dem = [['1,930','permit cases a year'],['23,160','tracked tasks a year'],
               ['15,440','documents a year'],['700','Iqama renewals a year']];
  dem.forEach((d, i) => {
    const x = 0.6 + i*3.07;
    box(s, x, 1.66, 2.90, 0.62, BG);
    s.addText(d[0], { x:x+0.16, y:1.73, w:2.60, h:0.28, isTextBox:true, margin:0,
      fontFace:H, fontSize:15, bold:true, color:INK });
    s.addText(d[1], { x:x+0.16, y:2.01, w:2.60, h:0.20, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.6, color:GREY });
  });

  /* the capacity unit table */
  s.addText('SERVICE',          { x:0.72, y:2.46, w:3.85, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'96A3AE', charSpacing:1.3 });
  s.addText('SIZED ON',         { x:4.65, y:2.46, w:4.55, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'96A3AE', charSpacing:1.3 });
  s.addText('CAPACITY UNITS A MONTH', { x:9.30, y:2.46, w:3.35, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'96A3AE', charSpacing:1.3, align:'right' });

  const rh = 0.40, gap = 0.03;
  SZ.LINES.forEach((l, i) => {
    const y = 2.70 + i*(rh+gap);
    box(s, 0.6, y, 12.19, rh, i%2 ? WHITE : BG, GREY_L, 0.04);
    s.addText(l[0], { x:0.72, y, w:3.85, h:rh, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, bold:true, color:INK, valign:'middle' });
    s.addText(l[1], { x:4.65, y, w:4.55, h:rh, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.8, color:GREY, valign:'middle' });
    s.addText(l[2].toLocaleString(), { x:9.30, y, w:2.15, h:rh, isTextBox:true, margin:0,
      fontFace:B, fontSize:11, bold:true, color:INK, align:'right', valign:'middle' });
    s.addText(l[3], { x:11.60, y, w:1.07, h:rh, isTextBox:true, margin:0, fontFace:B, fontSize:6.8,
      color: l[3] === 'SAP rate card' ? GOOD : SAND, align:'right', valign:'middle' });
  });

  /* the total */
  const ty = 2.70 + SZ.LINES.length*(rh+gap) + 0.06;
  s.addShape(p.ShapeType.roundRect, { x:0.6, y:ty, w:12.19, h:0.92, rectRadius:0.07, fill:{ color:INK } });
  s.addText('Total platform consumption', { x:0.85, y:ty+0.14, w:4.2, h:0.26, isTextBox:true, margin:0,
    fontFace:H, fontSize:13, bold:true, color:WHITE });
  s.addText('Subscription services are licensed separately and are not in this figure.',
    { x:0.85, y:ty+0.42, w:5.4, h:0.34, isTextBox:true, margin:0, fontFace:B, fontSize:8.6, color:'9FB6CC' });
  [[SZ.monthly.toLocaleString(), 'capacity units a month', 6.55, 2.15],
   [SZ.annual.toLocaleString(),  'capacity units a year',  8.85, 1.90],
   ['EUR ' + SZ.annual.toLocaleString(), 'a year at list, before discount', 10.85, 1.90]]
   .forEach(t => {
     s.addText(t[0], { x:t[2], y:ty+0.16, w:t[3], h:0.34, isTextBox:true, margin:0,
       fontFace:H, fontSize:16, bold:true, color: t[2] === 10.85 ? SAND : TEAL });
     s.addText(t[1], { x:t[2], y:ty+0.52, w:t[3], h:0.24, isTextBox:true, margin:0,
       fontFace:B, fontSize:8.2, color:'9FB6CC' });
   });

  s.addText([
    { text:'Where the rates come from. ', options:{ bold:true, color:INK } },
    { text:'Rates marked in green are SAP published rates, read from the SAP Build Runtime Capacity Unit Calculator in September 2026, and SAP Discovery Center lists one capacity unit at 1.00 EUR. The SAP HANA Cloud line is an estimate for the stated configuration and is the one to reconfirm in the SAP HANA Cloud Capacity Unit Estimator before quoting. Final pricing depends on the customer agreement.',
      options:{ color:GREY } },
  ], { x:0.6, y:ty+1.00, w:12.19, h:0.24, isTextBox:true, margin:0, fontFace:B, fontSize:7.8, lineSpacing:9.6 });

  foot(s, 5);
  s.addNotes('This is the slide the account executive takes away. The demand is derived, not guessed: 700 '
    + 'expatriates means 700 Iqama renewals a year, and everything else follows. Be straight about the HANA '
    + 'Cloud line, it is the one to confirm in the estimator. Roughly thirty thousand capacity units a year of '
    + 'net new platform consumption, in an account that already owns SAP SuccessFactors.');
}

p.writeFile({ fileName: 'INK_IT_VisaPermits_KSA_SAP_BTP.pptx' })
  .then(f => console.log('WROTE', f));
