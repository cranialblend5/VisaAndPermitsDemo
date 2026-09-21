const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';            // 13.3 x 7.5
p.author = 'INK IT Business Solutions';
p.company = 'INK IT Business Solutions';
p.title = 'Visa & Permits Management on SAP BTP';

/* ---------- palette: INK IT brand ---------- */
const INK   = '0C1E33';   // deep ink navy  (dominant dark)
const INK2  = '16304C';
const TEAL  = '20A098';   // INK IT brand teal (accent that carries the deck)
const TEAL_D= '12756F';
const TEAL_L= 'E4F5F3';
const SAND  = 'C9A227';
const WHITE = 'FFFFFF';
const BG    = 'F4F6F7';
const GREY  = '5A6C82';
const GREY_L= 'E3E7EA';
const TXT   = '132639';
const GOOD  = '17795E';
const WARN  = 'B5730F';
const BAD   = 'B23A2F';

const H = 'Arial';        // titles  (safe list)
const B = 'Calibri';      // body    (safe list)
const IMG = './img';

/* ---------- helpers ---------- */
const S = () => p.addSlide();

function darkBg(s){ s.background = { color: INK }; }
function lightBg(s){ s.background = { color: WHITE }; }

// section title block, light slides
function title(s, kicker, text, opts={}){
  const y = opts.y ?? 0.44;
  if (kicker) s.addText(kicker.toUpperCase(), {
    x:0.6, y, w:12.1, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:11, bold:true, color:TEAL, charSpacing:2.2
  });
  s.addText(text, {
    x:0.6, y:y+0.28, w:opts.w ?? 12.1, h:opts.h ?? 0.62, isTextBox:true, margin:0,
    fontFace:H, fontSize:opts.size ?? 30, bold:true, color:opts.color ?? INK
  });
}
function titleDark(s, kicker, text, opts={}){
  const y = opts.y ?? 0.44;
  s.addText(kicker.toUpperCase(), {
    x:0.6, y, w:12.1, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:11, bold:true, color:SAND, charSpacing:2.2
  });
  s.addText(text, {
    x:0.6, y:y+0.28, w:opts.w ?? 12.1, h:opts.h ?? 0.62, isTextBox:true, margin:0,
    fontFace:H, fontSize:opts.size ?? 30, bold:true, color:WHITE
  });
}
// the repeating motif: a filled circle carrying a number or initials
function circle(s, x, y, d, label, fill, txtColor, fs){
  s.addShape(p.ShapeType.ellipse, { x, y, w:d, h:d, fill:{color:fill} });
  s.addText(label, { x, y, w:d, h:d, isTextBox:true, margin:0,
    fontFace:B, fontSize:fs ?? 12, bold:true, color:txtColor ?? WHITE,
    align:'center', valign:'middle' });
}
function card(s, x, y, w, h, fill){
  s.addShape(p.ShapeType.roundRect, { x, y, w, h, rectRadius:0.08,
    fill:{color:fill ?? BG}, line:{color:GREY_L, width:0.75} });
}
// a stack of short bulleted lines inside a table cell
function bullets(s, lines, o){
  s.addText(lines.map(t => ({ text:t, options:{ bullet:{code:'2022'}, breakLine:true } })), o);
}
function footer(s, n, dark){
  s.addText('INK IT Business Solutions  ·  Visa & Permits Management on SAP BTP',
    { x:0.6, y:7.02, w:9.4, h:0.26, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color: dark ? '7E99B4' : '96A3AE' });
  s.addText(String(n), { x:12.2, y:7.02, w:0.5, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, color: dark ? '7E99B4' : '96A3AE', align:'right' });
}
function shot(s, file, x, y, w){
  s.addImage({ path:`${IMG}/${file}`, x, y, w,
    shadow:{ type:'outer', blur:14, offset:3, angle:90, color:'000000', opacity:0.20 } });
}

/* ========== SLIDE 1 — TITLE (dark) ========== */
{
  const s = S(); darkBg(s);
  s.addShape(p.ShapeType.ellipse, { x:9.5, y:-2.2, w:7.6, h:7.6, fill:{color:TEAL, transparency:88} });
  s.addShape(p.ShapeType.ellipse, { x:11.0, y:3.4, w:5.2, h:5.2, fill:{color:SAND, transparency:92} });

  s.addImage({ path:`${IMG}/logo-white.png`, x:0.72, y:0.62, w:2.45, h:0.6 });

  s.addText('Visa & Permits\nManagement', {
    x:0.72, y:1.95, w:8.6, h:1.9, isTextBox:true, margin:0,
    fontFace:H, fontSize:48, bold:true, color:WHITE, lineSpacing:52 });

  s.addText('Built on SAP BTP  ·  Ready for the GCC', {
    x:0.72, y:3.92, w:8.6, h:0.36, isTextBox:true, margin:0,
    fontFace:B, fontSize:19, color:TEAL, bold:true });

  s.addText('We govern work permits, residency and professional licences end to end. Every task has an owner, every deadline shows up early, and every government payment has a receipt and a GL code against it.', {
    x:0.72, y:4.42, w:8.3, h:1.0, isTextBox:true, margin:0,
    fontFace:B, fontSize:14.5, color:'A9C2DA', lineSpacing:22 });

  const flags = ['UAE','KSA','Qatar','Kuwait','Oman','Bahrain','Libya'];
  let fx = 0.72;
  flags.forEach((f,i) => {
    const w = 0.2 + f.length*0.115;
    s.addShape(p.ShapeType.roundRect, { x:fx, y:5.72, w, h:0.36, rectRadius:0.17,
      fill:{color:INK2}, line:{color:'2C4A6A', width:0.75} });
    s.addText(f, { x:fx, y:5.72, w, h:0.36, isTextBox:true, margin:0,
      fontFace:B, fontSize:11.5, bold:true, color:'BFD6EC', align:'center', valign:'middle' });
    fx += w + 0.14;
  });

  s.addText('Healthcare  ·  Industry-grade permits  ·  SAP SuccessFactors integrated', {
    x:0.72, y:6.30, w:9.0, h:0.3, isTextBox:true, margin:0,
    fontFace:B, fontSize:12, color:'7E99B4' });

  s.addText('An overview for SAP and enterprise customers across the GCC', {
    x:0.72, y:6.80, w:9.0, h:0.3, isTextBox:true, margin:0,
    fontFace:B, fontSize:10.5, italic:true, color:'6C87A2' });
  s.addNotes('Opening frame. The pitch: a pre-built SAP BTP application covering the work permit, renewal and cancellation lifecycles, with configured country packs across the GCC and Libya. Emphasise three words: owned, visible, reconciled.');
}

/* ========== SLIDE 2 — THE PROBLEM ========== */
{
  const s = S(); lightBg(s);
  title(s, 'The problem', 'One permit, six teams, no shared clock.');
  s.addText('One work permit crosses recruitment, onboarding, the PRO desk, the employee, HR and finance, and touches a government portal at least five times. Miss a single hand-off and it just stops. Usually nobody notices until a fine turns up.', {
    x:0.6, y:1.36, w:11.4, h:0.5, isTextBox:true, margin:0,
    fontFace:B, fontSize:13.5, color:GREY, lineSpacing:19 });

  const probs = [
    ['01','Tracking lives in a spreadsheet','Expiry dates sit in one person’s file. When they go on leave, the company is blind. And overstay fines start at the border, not in your system.'],
    ['02','The PRO has no digital desk','Your GROs run all of it from WhatsApp, email and memory. No queue, no due dates, no proof of who was asked what, or when.'],
    ['03','The money is untraceable','Typing fees, medicals, insurance and ID charges go on cards and petty cash. Receipts turn up late, or never. You find the duplicates at audit.'],
    ['04','Recruitment and PRO are unsynced','Onboarding promises a joining date. Nobody told the PRO the file exists. The candidate waits abroad for a permit that was never started.'],
    ['05','Compliance is a memory test','Quota, skill classification, profession matching, work location. Every one is a rule somebody has to remember correctly, every time, in a hurry.'],
    ['06','Nobody can answer "where is it?"','One employee query takes three calls and a day. Now multiply that across thousands of permits and several countries.']
  ];
  const cw = 3.83, ch = 1.92, gx = 0.31, gy = 0.28;
  probs.forEach((pr, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col*(cw+gx), y = 2.05 + row*(ch+gy);
    card(s, x, y, cw, ch, BG);
    circle(s, x+0.24, y+0.24, 0.42, pr[0], TEAL, WHITE, 12);
    s.addText(pr[1], { x:x+0.78, y:y+0.26, w:cw-1.02, h:0.42, isTextBox:true, margin:0,
      fontFace:H, fontSize:13, bold:true, color:INK, valign:'top' });
    s.addText(pr[2], { x:x+0.24, y:y+0.82, w:cw-0.48, h:0.96, isTextBox:true, margin:0,
      fontFace:B, fontSize:10.5, color:GREY, lineSpacing:15 });
  });

  s.addShape(p.ShapeType.roundRect, { x:0.6, y:6.36, w:11.4, h:0.52, rectRadius:0.09,
    fill:{color:TEAL_L}, line:{color:TEAL, width:0.75} });
  s.addText([
    { text:'What it costs you:  ', options:{ bold:true, color:TEAL_D } },
    { text:'overstay and labour fines, blocked quotas, employees you cannot legally roster, and a compliance position nobody can actually prove to a regulator or an auditor.', options:{ color:INK } }
  ], { x:0.85, y:6.36, w:10.9, h:0.52, isTextBox:true, margin:0, fontFace:B, fontSize:11.5, valign:'middle' });
  footer(s, 2);
  s.addNotes('Let the audience recognise themselves here. Ask which of the six they have. Almost every GCC enterprise has at least four.');
}

/* ========== SLIDE 3 — THE SOLUTION ========== */
{
  const s = S(); lightBg(s);
  title(s, 'The solution', 'Every permit on one track.');
  s.addText('Three governed lifecycles, twenty-two milestones, one task inbox.', {
    x:0.6, y:1.36, w:11.4, h:0.32, isTextBox:true, margin:0,
    fontFace:B, fontSize:13.5, color:GREY });

  const lifes = [
    ['New Work Permit','11 milestones','From candidate to legally employed: offer, labour card, entry permit or status change, medical, Emirates ID.', TEAL],
    ['Renew Work Permit','7 milestones','Starts from an expiry alert six weeks out: medical, contract, stamping, ID renewal and collection.', TEAL_D],
    ['Cancel Work Permit','4 milestones','Held until end-of-service is settled: cancellation forms, ministry submission, residence cancellation.', INK2]
  ];
  lifes.forEach((l, i) => {
    const y = 1.95 + i*1.30;
    card(s, 0.6, y, 5.5, 1.16, BG);
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:0.075, h:1.16, rectRadius:0.03, fill:{color:l[3]} });
    s.addText(l[0], { x:0.92, y:y+0.13, w:3.3, h:0.30, isTextBox:true, margin:0,
      fontFace:H, fontSize:15, bold:true, color:INK });
    s.addText(l[1], { x:4.25, y:y+0.16, w:1.72, h:0.26, isTextBox:true, margin:0,
      fontFace:B, fontSize:10.5, bold:true, color:l[3], align:'right' });
    s.addText(l[2], { x:0.92, y:y+0.45, w:5.0, h:0.62, isTextBox:true, margin:0,
      fontFace:B, fontSize:11, color:GREY, lineSpacing:15.5 });
  });

  shot(s, 'home.jpg', 6.42, 1.95, 6.28);
  s.addText('The home dashboard: running, completed and cancelled counts across all three lifecycles, over a queue of initiated cases with priority, status and assigned agent.', {
    x:6.42, y:4.95, w:6.28, h:0.5, isTextBox:true, margin:0,
    fontFace:B, fontSize:10, italic:true, color:GREY, lineSpacing:14 });

  const caps = [
    ['Workflow', 'Configurable milestones per country and permit type'],
    ['Tasks', 'Owner, due date, reminders and escalation per step'],
    ['Documents', 'Mandatory attachments before a step can close'],
    ['Payments', 'Amount, VAT, mode, reference, receipt and GL account'],
    ['Reporting', 'Filterable, exportable reports per process and payment']
  ];
  let cx = 0.6;
  caps.forEach(c => {
    const w = 2.3;
    card(s, cx, 5.98, w, 0.92, WHITE);
    s.addText(c[0].toUpperCase(), { x:cx+0.18, y:6.10, w:w-0.36, h:0.22, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.5, bold:true, color:TEAL, charSpacing:1.4 });
    s.addText(c[1], { x:cx+0.18, y:6.32, w:w-0.36, h:0.52, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.5, color:GREY, lineSpacing:13 });
    cx += w + 0.2;
  });
  footer(s, 3);
  s.addNotes('Anchor on the screenshot — this is the built application, not a mock-up. The five capability tiles are what makes it a governance tool rather than a tracker.');
}

/* ========== SLIDE 4 — PERSONAS ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Persona view', 'Everyone gets their own to-do list.');
  s.addText('Each role sees only what is theirs, with a due date on it. That is how the PRO desk, recruitment and onboarding stay in step.', {
    x:0.6, y:1.36, w:11.4, h:0.30, isTextBox:true, margin:0,
    fontFace:B, fontSize:13, color:GREY });

  const rows = [
    ['GRO','Government Relations','PRO desk \u00b7 GRO',
      ['Claims cases from the queue and files them with the authority',
       'Records every payment and receipt as it happens',
       'Books medicals and biometrics, tracks stamping to ID collection'],
      'A queue with priorities, due dates and proof of what was done.', TEAL],
    ['TA','Recruiter','Talent acquisition',
      ['Completes the candidate file and document checklist',
       'Releases accepted candidates into the permit process',
       'Aligns profession and work-location codes with the PRO'],
      'Joining dates based on real progress, not optimism.', TEAL_D],
    ['OB','Onboarding Coordinator','Employee relations',
      ['Initiates the permit and checks quota before it goes out',
       'Chases signed offers, contracts and medical receipts',
       'Sends biometric appointments and handles pension steps'],
      'No joiner arrives without the paperwork that makes them legal.', TEAL],
    ['BP','HR Business Partner','Employee relations',
      ['Verifies renewal contracts and approves senior allocations',
       'Initiates cancellation once end-of-service is agreed',
       'Reviews fines before anything reaches payroll'],
      'Escalations arrive before the fine, not after it.', TEAL_D],
    ['EM','Employee / Candidate','Self-service',
      ['Acknowledges and uploads the signed contract',
       'Confirms in-country or out-of-country status',
       'Confirms medical, insurance enrolment and ID receipt'],
      'Knows exactly what is pending from them, and by when.', TEAL],
    ['FI','Finance Controller','Payments & GL',
      ['Reconciles government fees against receipts',
       'Posts permit cost to the right GL account',
       'Reviews card-holder spend and approves fine deductions'],
      'One export instead of days of reconciliation.', TEAL_D],
    ['HR','Head of HR','Governance & risk',
      ['Monitors quota use and Saudization or Emiratisation ratios',
       'Reviews compliance exposure by entity and by country',
       'Signs off permit cost budgets for the year'],
      'Compliance risk as a dashboard, not a fire drill.', INK2]
  ];
  const rh = 0.66, gap = 0.045;
  rows.forEach((r, i) => {
    const y = 2.00 + i*(rh+gap);
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:11.4, h:rh, rectRadius:0.06,
      fill:{color: i%2 ? WHITE : BG}, line:{color:GREY_L, width:0.6} });
    circle(s, 0.76, y+0.11, 0.38, r[0], r[5], WHITE, 10.5);
    s.addText(r[1], { x:1.26, y:y+0.06, w:2.15, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11, bold:true, color:INK });
    s.addText(r[2], { x:1.26, y:y+0.30, w:2.15, h:0.20, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color:TEAL_D });
    bullets(s, r[3], { x:3.50, y:y+0.075, w:5.42, h:0.52, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.6, color:GREY, lineSpacing:11.0,
      paraSpaceBefore:0, paraSpaceAfter:0, indentLevel:0 });
    s.addText(r[4], { x:9.0, y:y+0.075, w:2.86, h:0.52, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.3, italic:true, bold:true, color:GOOD, lineSpacing:11.6,
      valign:'middle' });
  });
  s.addText('ROLE', { x:1.26, y:1.76, w:2.1, h:0.2, isTextBox:true, margin:0, fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4 });
  s.addText('WHAT THEY DO IN THE SYSTEM', { x:3.55, y:1.76, w:5.3, h:0.2, isTextBox:true, margin:0, fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4 });
  s.addText('WHAT THEY GET', { x:9.0, y:1.76, w:2.86, h:0.2, isTextBox:true, margin:0, fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4 });
  footer(s, 4);
  s.addNotes('This is the slide that wins the room — people see their own job. Pause on the GRO row: that is the persona whose working life changes most.');
}

/* ========== SLIDE 5 — TASK MANAGEMENT ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Task management & accountability', 'Put a name on a task and it behaves differently.');
  s.addText('Every step becomes a real task with a person, a due date and somewhere to escalate. Nothing sits in that grey area where everyone assumes someone else picked it up.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0,
    fontFace:B, fontSize:13, color:GREY });

  const ladder = [
    ['1','Assign','The task gets an owner','It goes to a role, then a named officer picks it up with "Assign To Yourself", or a supervisor sends it over with "Assign Agent". Priority and due date are set right then.', TEAL],
    ['2','Nudge','Reminder every 2 days','Anything still open pings the owner again every two days. Document expiries go out six weeks ahead, to the employee, the PRO and the HRBP at once.', WARN],
    ['3','Escalate','The manager is told','Two weeks before expiry, or the moment a task goes past its due date, it escalates on its own to the HR manager and the line manager.', BAD],
    ['4','Prove','The trail is permanent','Who had it, when they were reminded, what they uploaded and when they submitted. An audit turns into a report instead of a dig through old emails.', GOOD]
  ];
  ladder.forEach((l, i) => {
    const y = 1.94 + i*1.20;
    card(s, 0.6, y, 6.05, 1.06, i%2 ? WHITE : BG);
    circle(s, 0.82, y+0.22, 0.44, l[0], l[4], WHITE, 13);
    s.addText([
      { text:l[1]+'  ', options:{ bold:true, color:l[4], fontSize:12.5 } },
      { text:'· '+l[2], options:{ bold:true, color:INK, fontSize:12 } }
    ], { x:1.42, y:y+0.15, w:5.0, h:0.28, isTextBox:true, margin:0, fontFace:H });
    s.addText(l[3], { x:1.42, y:y+0.45, w:5.0, h:0.52, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.8, color:GREY, lineSpacing:13.5 });
  });

  shot(s, 'inbox.jpg', 6.95, 1.94, 5.75);
  s.addText('The officer’s inbox. Pending tasks with type and due date on the left, the task itself on the right: assignee, due date, comment thread and the document that must come back before it can be submitted.', {
    x:6.95, y:4.86, w:5.75, h:0.56, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.8, italic:true, color:GREY, lineSpacing:13.5 });

  const wins = [
    ['Delays surfaced at source','The system shows where the wait actually is: the unsigned contract, the unbooked medical, the government step pending. The bottleneck has an address.'],
    ['Workload made visible','HR admins can see how many assignments each officer has completed, so work is distributed on evidence rather than on who complains loudest.']
  ];
  wins.forEach((w, i) => {
    const y = 5.56 + i*0.66;
    s.addShape(p.ShapeType.roundRect, { x:6.95, y, w:5.75, h:0.56, rectRadius:0.06,
      fill:{color:TEAL_L}, line:{color:'BFE3DF', width:0.6} });
    s.addText([
      { text:w[0]+'  ', options:{ bold:true, color:TEAL_D } },
      { text:w[1], options:{ color:INK } }
    ], { x:7.13, y, w:5.4, h:0.56, isTextBox:true, margin:0,
        fontFace:B, fontSize:9.3, valign:'middle', lineSpacing:12.5 });
  });
  footer(s, 5);
  s.addNotes('This is the differentiating slide. Other tools track visas; this one manages the people doing the work. Stress the escalation ladder — it is what converts a tracker into accountability.');
}

/* ========== SLIDE 6 — FINANCIAL CONTROL ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Financial control', 'Nothing gets paid without a receipt and a GL code.');
  s.addText('Government fees are where the money leaks. Make the payment part of the task and it cannot move without leaving a trace.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0,
    fontFace:B, fontSize:13, color:GREY });

  const rail = [
    ['01','Captured in the step','Amount, VAT, how it was paid, the date and the reference are all compulsory on the step itself.'],
    ['02','Receipt attached','The scanned receipt has to be attached. No file, no submit, and the step stays open.'],
    ['03','Card holder recorded','Which card, whose card, and whether the company or the employee carries the cost.'],
    ['04','Posted to finance','Goes to the right GL account with a document number, ready to post.'],
    ['05','Reportable','Filter by process, company, employee, date, mode or card holder, then export it.']
  ];
  const w5 = 2.3;
  rail.forEach((r, i) => {
    const x = 0.6 + i*(w5+0.2);
    card(s, x, 1.94, w5, 1.62, BG);
    circle(s, x+0.18, 2.12, 0.38, r[0], TEAL, WHITE, 10.5);
    s.addText(r[1], { x:x+0.18, y:2.58, w:w5-0.36, h:0.3, isTextBox:true, margin:0,
      fontFace:H, fontSize:11, bold:true, color:INK });
    s.addText(r[2], { x:x+0.18, y:2.90, w:w5-0.36, h:0.58, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.3, color:GREY, lineSpacing:12.5 });
  });

  const guards = [
    ['No duplicate payments','Every reference is tied to one step of one case, so the same fee cannot be recorded twice against the same step.'],
    ['No unaccounted spend','Every payment leaves with a GL account and a document number. Finance reconciles from a report, not a shoebox of receipts.'],
    ['Fines have a workflow too','Overstay, traffic, labour and immigration fines get raised by the PRO, go through the HRBP to payroll, and sit as a deduction.']
  ];
  guards.forEach((g, i) => {
    const y = 3.82 + i*0.80;
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:6.05, h:0.70, rectRadius:0.06,
      fill:{color:WHITE}, line:{color:GREY_L, width:0.75} });
    circle(s, 0.78, y+0.15, 0.4, '✓', GOOD, WHITE, 13);
    s.addText(g[0], { x:1.32, y:y+0.07, w:5.2, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:INK });
    s.addText(g[1], { x:1.32, y:y+0.31, w:5.2, h:0.34, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color:GREY, lineSpacing:12 });
  });

  shot(s, 'payment.jpg', 6.95, 3.82, 5.75);
  s.addText('Every row is auditable: amount, VAT, payment reference, payment document number, GL account and status, with the original receipt one click away under Download.', {
    x:6.95, y:6.52, w:5.75, h:0.42, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.8, italic:true, color:GREY, lineSpacing:13.5 });
  footer(s, 6);
  s.addNotes('The CFO slide. The line that lands: a payment cannot exist in this system without a receipt and a GL code, so duplicates are prevented at entry rather than discovered at audit.');
}

/* ========== SLIDE 7 — GCC COVERAGE (dark) ========== */
{
  const s = S(); darkBg(s);
  s.addShape(p.ShapeType.ellipse, { x:10.4, y:-2.6, w:6.4, h:6.4, fill:{color:TEAL, transparency:90} });
  titleDark(s, 'GCC coverage', 'One engine, seven rulebooks.');
  s.addText('The engine stays the same everywhere. What changes per country is the steps, the authorities, the checklist and when alerts fire.', {
    x:0.6, y:1.36, w:11.4, h:0.26, isTextBox:true, margin:0,
    fontFace:B, fontSize:12.5, color:'A9C2DA' });

  const ctry = [
    ['United Arab Emirates','PACK','MOHRE  ·  ICP  ·  GDRFA  ·  Tasheel / Tawjeeh  ·  ILOE','New, renew, cancel, quota, temporary permit, Emiratisation, absconding, company documents', SAND],
    ['Kingdom of Saudi Arabia','PACK','Qiwa  ·  Muqeem  ·  Absher  ·  GOSI  ·  Mudad','Block visa & quota, work permit, Iqama issue and renewal, exit / re-entry, final exit, profession change, transfer, Nitaqat', SAND],
    ['Qatar','PACK','ADLSA  ·  MOI  ·  Metrash2  ·  Qatar Visa Centre','Work visa quota, contract attestation, entry visa, medical and biometrics, RP and Qatar ID, renewal, exit', SAND],
    ['Kuwait','PACK','PAM (Ashal)  ·  MOI  ·  Sahel  ·  PACI','Article 18 work permit, entry visa, medical and fingerprint, residency stamping, Civil ID, renewal, cancellation', SAND],
    ['Oman','PACK','Ministry of Labour  ·  ROP  ·  Invest Easy','Labour clearance, employment visa, medical, resident card, renewal, Omanisation monitoring, exit', SAND],
    ['Bahrain','PACK','LMRA (EMS)  ·  NPRA  ·  SIO / CPR  ·  GOSI','Expatriate work permit, medical, residence permit, CPR card, renewal, flexi permit tracking, cancellation', SAND],
    ['Libya','PACK','Ministry of Labour  ·  Passport & Nationality Authority','Work permit, entry visa, medical, residency, rotation tracking for expatriate crews, company operating permits', SAND]
  ];
  const rh = 0.58, gp = 0.06;
  ctry.forEach((c, i) => {
    const y = 1.90 + i*(rh+gp);
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:11.4, h:rh, rectRadius:0.05,
      fill:{color: i%2 ? INK2 : '13314C'}, line:{color:'27415C', width:0.75} });
    s.addText(c[0], { x:0.82, y:y+0.045, w:2.55, h:0.25, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:WHITE });
    s.addShape(p.ShapeType.roundRect, { x:0.82, y:y+0.31, w:0.62, h:0.19, rectRadius:0.1, fill:{color:c[4]} });
    s.addText(c[1], { x:0.82, y:y+0.31, w:0.62, h:0.19, isTextBox:true, margin:0,
      fontFace:B, fontSize:7.5, bold:true, color: c[4]===SAND ? INK : WHITE, align:'center', valign:'middle' });
    s.addText(c[2], { x:3.5, y:y+0.06, w:4.15, h:0.46, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, bold:true, color:'7FD4CC', lineSpacing:12, valign:'middle' });
    s.addText(c[3], { x:7.8, y:y+0.06, w:4.0, h:0.46, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.6, color:'A9C2DA', lineSpacing:11.5, valign:'middle' });
  });
  s.addText('COUNTRY', { x:0.82, y:1.66, w:2.4, h:0.19, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'6C87A2', charSpacing:1.4 });
  s.addText('AUTHORITIES & PORTALS', { x:3.5, y:1.66, w:4.1, h:0.19, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'6C87A2', charSpacing:1.4 });
  s.addText('PROCESSES IN THE PACK', { x:7.8, y:1.66, w:4.0, h:0.19, isTextBox:true, margin:0, fontFace:B, fontSize:8, bold:true, color:'6C87A2', charSpacing:1.4 });

  s.addText([
    { text:'PACK', options:{ bold:true, color:SAND } },
    { text:' = the country’s statutory flow expressed as configuration on the shared engine: milestones, authorities, document checklist, mandatory fields, payment types and alert thresholds. Pre-built rather than custom-developed, with a localisation workshop confirming document names, fees and thresholds before go-live.', options:{ color:'A9C2DA' } }
  ], { x:0.6, y:6.50, w:11.4, h:0.42, isTextBox:true, margin:0, fontFace:B, fontSize:9.5, lineSpacing:13 });
  footer(s, 7, true);
  s.addNotes('The GCC-ready slide. The message is breadth from one engine: each pack is configuration, not a rebuild, which is why deployment is weeks rather than quarters. For KSA note the three-authority split: Qiwa for labour, Muqeem for the Iqama, Absher as the employee-facing mirror.');
}

/* ========== SLIDE 8 — HEALTHCARE & INDUSTRY PERMITS ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Healthcare & industry permits', 'A nurse needs two permissions, not one.');
  s.addText('A clinician cannot legally treat anyone until a health regulator has checked their credentials and issued a professional licence. That runs on its own clock, with its own renewal cycle. We run it as a second lane on the same case.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0,
    fontFace:B, fontSize:13, color:GREY });

  card(s, 0.6, 1.94, 5.9, 2.72, BG);
  s.addText('The licensing lane, running alongside', { x:0.86, y:2.12, w:5.4, h:0.3, isTextBox:true, margin:0,
    fontFace:H, fontSize:14, bold:true, color:INK });
  const lane = ['Credential pack collected at recruitment','Primary-source verification (DataFlow) tracked to result','Professional classification or eligibility assessment','Licensing exam booked, sat and certificate uploaded','Licence issued, activated against the employing facility','Renewal driven by CME hours, with 90-day alerts and 15-day escalations'];
  s.addText(lane.map((t,i) => ({ text:t, options:{ bullet:true, breakLine: i < lane.length-1 } })), {
    x:0.86, y:2.48, w:5.4, h:2.02, isTextBox:true, margin:0,
    fontFace:B, fontSize:10.5, color:GREY, lineSpacing:14, paraSpaceAfter:5 });

  card(s, 6.72, 1.94, 6.0, 2.72, WHITE);
  s.addText('What goes wrong without it', { x:6.98, y:2.12, w:5.5, h:0.3, isTextBox:true, margin:0,
    fontFace:H, fontSize:14, bold:true, color:BAD });
  const fails = ['A clinician joins on a valid visa but cannot be rostered','Primary-source verification stalls with nobody watching the queue','A trainee’s 45-day dataflow deadline passes unnoticed','CME hours logged only after the renewal window has closed','Licence and visa expiry drift apart, so one lapses while the other is fine','The facility licence expires, exposing every practitioner under it'];
  s.addText(fails.map((t,i) => ({ text:t, options:{ bullet:true, breakLine: i < fails.length-1 } })), {
    x:6.98, y:2.48, w:5.5, h:2.02, isTextBox:true, margin:0,
    fontFace:B, fontSize:10.5, color:GREY, lineSpacing:14, paraSpaceAfter:5 });

  s.addText('Health regulators covered by the country packs', { x:0.6, y:4.88, w:11.4, h:0.28, isTextBox:true, margin:0,
    fontFace:H, fontSize:13, bold:true, color:INK });
  const regs = [
    ['Saudi Arabia','SCFHS','Mumaris+ · DataFlow · Prometric'],
    ['UAE — Dubai','DHA','Sheryan portal'],
    ['UAE — Abu Dhabi','DOH','TAMM / DOH portal'],
    ['UAE — Northern','MOHAP','MOHAP licensing'],
    ['Qatar','DHP (MOPH)','DHP practitioner portal'],
    ['Bahrain','NHRA','NHRA licensing'],
    ['Oman','OMSB / MOH','MOH · Prometric'],
    ['Kuwait','MOH','MOH · Kuwait Prometric']
  ];
  const rw = 2.94;
  regs.forEach((r, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.6 + col*(rw+0.187), y = 5.26 + row*0.80;
    s.addShape(p.ShapeType.roundRect, { x, y, w:rw, h:0.68, rectRadius:0.05,
      fill:{color: row ? WHITE : BG}, line:{color:GREY_L, width:0.6} });
    s.addText(r[0], { x:x+0.16, y:y+0.06, w:rw-0.32, h:0.2, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.5, color:GREY });
    s.addText(r[1], { x:x+0.16, y:y+0.25, w:rw-0.32, h:0.22, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:TEAL_D });
    s.addText(r[2], { x:x+0.16, y:y+0.46, w:rw-0.32, h:0.2, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.3, color:GREY });
  });
  footer(s, 8);
  s.addNotes('For healthcare prospects this is the slide that proves domain depth. Note that the same model handles facility permits — pharmacy and clinic licences, trade licences, civil defence — and any industry-grade permit that expires.');
}

/* ========== SLIDE 9 — SOLUTION ARCHITECTURE ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Solution architecture', 'Every system, and what moves between them.');

  s.addImage({ path:`${IMG}/architecture.png`, x:0.6, y:1.26, w:8.25, h:5.60 });

  const notes = [
    ['What flows in','Candidates who accepted an offer, the employee master, separations and the expiry dates that start a renewal. All through SAP Integration Suite, so it is monitored and retried like any other SAP integration.', TEAL],
    ['What flows back','Work permit and labour card numbers, Emirates ID, visa issue and expiry dates, straight into Employee Central. Nobody re-types anything and the two systems cannot disagree.', TEAL_D],
    ['What flows down','Every payment with its amount, VAT, reference, receipt and GL account, posted to S/4HANA as a journal. Approved fines go to payroll as deductions.', TEAL],
    ['The dashed arrows','The two government arrows are the ones a person still makes. The connectors behind them are built. The day you hand us credentials they go solid, and nothing else in this picture changes.', SAND]
  ];
  notes.forEach((n, i) => {
    const y = 1.26 + i*1.42;
    s.addShape(p.ShapeType.roundRect, { x:9.05, y, w:3.68, h:1.30, rectRadius:0.07,
      fill:{color: n[2]===SAND ? 'FCF6E4' : BG}, line:{color: n[2]===SAND ? SAND : GREY_L, width:0.9} });
    s.addText(n[0], { x:9.24, y:y+0.11, w:3.3, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color: n[2]===SAND ? '7A6410' : INK });
    s.addText(n[1], { x:9.24, y:y+0.36, w:3.32, h:0.86, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.6, color:GREY, lineSpacing:11.6 });
  });
  footer(s, 9);
  s.addNotes('Walk the four sides: SuccessFactors at the top stays the system of record, the people on the left, the government on the right, finance at the bottom. Then land the dashed arrows — that is the honest part of the picture and it is usually what a technical audience is waiting to hear.');
}

/* ========== SLIDE 10 — INTEGRATION & API ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Architecture & integration', 'We sit between government and SuccessFactors.');
  s.addText('That gap is where the problem lives. We take candidates from Recruiting, drive the government-facing work, write the permit details back into Employee Central, and send the money to finance.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0,
    fontFace:B, fontSize:13, color:GREY });

  const layers = [
    ['SAP SuccessFactors', ['SF Recruiting','SF Onboarding 2.0','Employee Central','SF Work Zone'], TEAL_L, TEAL_D, 'Candidates, employee master, separations and expiry dates flow in'],
    ['Visa & Permits on SAP BTP', ['Workflow & milestones','Task inbox & escalation','Documents','Payments','Quota register','Reporting'], TEAL, WHITE, 'The governed layer, where the work is actually managed'],
    ['SAP S/4HANA Finance', ['Payments to GL','Journal posting','Payroll deductions'], TEAL_L, TEAL_D, 'Permit costs and approved fine deductions post outward']
  ];
  let ly = 1.96;
  layers.forEach((L, i) => {
    const h = i===1 ? 1.14 : 0.94;
    s.addShape(p.ShapeType.roundRect, { x:0.6, y:ly, w:7.55, h, rectRadius:0.07,
      fill:{color: i===1 ? TEAL : BG}, line:{color: i===1 ? TEAL_D : GREY_L, width:0.9} });
    s.addText(L[0], { x:0.82, y:ly+0.10, w:5.0, h:0.26, isTextBox:true, margin:0,
      fontFace:H, fontSize:12.5, bold:true, color: i===1 ? WHITE : INK });
    s.addText(L[4], { x:0.82, y:ly+0.34, w:6.9, h:0.2, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.8, italic:true, color: i===1 ? 'CFEFEB' : GREY });
    let bx = 0.82, by = ly + 0.58;
    L[1].forEach(t => {
      const w = 0.22 + t.length*0.082;
      if (bx + w > 7.95) { bx = 0.82; by += 0.30; }
      s.addShape(p.ShapeType.roundRect, { x:bx, y:by, w, h:0.26, rectRadius:0.12,
        fill:{color: i===1 ? TEAL_D : WHITE}, line:{color: i===1 ? '0E5F5A' : GREY_L, width:0.6} });
      s.addText(t, { x:bx, y:by, w, h:0.26, isTextBox:true, margin:0,
        fontFace:B, fontSize:8.6, bold:true, color: i===1 ? WHITE : TEAL_D, align:'center', valign:'middle' });
      bx += w + 0.1;
    });
    if (i < 2) {
      s.addShape(p.ShapeType.chevron, { x:4.05, y:ly+h+0.035, w:0.62, h:0.22,
        fill:{color:'C3CDD4'}, rotate:90 });
    }
    ly += h + 0.30;
  });

  s.addShape(p.ShapeType.roundRect, { x:8.42, y:1.96, w:4.28, h:1.22, rectRadius:0.07,
    fill:{color:INK}, line:{color:INK2, width:1} });
  s.addText('Government portals', { x:8.64, y:2.10, w:3.9, h:0.26, isTextBox:true, margin:0,
    fontFace:H, fontSize:12.5, bold:true, color:WHITE });
  s.addText('Qiwa · Muqeem · Absher · MOHRE · ICP · GDRFA · LMRA · PAM · ADLSA · SCFHS · DHA · DOH', {
    x:8.64, y:2.38, w:3.84, h:0.72, isTextBox:true, margin:0,
    fontFace:B, fontSize:8.8, color:'7FD4CC', lineSpacing:12 });

  s.addShape(p.ShapeType.roundRect, { x:8.42, y:3.34, w:4.28, h:3.32, rectRadius:0.07,
    fill:{color:'FCF6E4'}, line:{color:SAND, width:1} });
  s.addText('About government APIs', { x:8.64, y:3.48, w:3.9, h:0.24, isTextBox:true, margin:0,
    fontFace:H, fontSize:12, bold:true, color:'7A6410' });
  s.addText([
    { text:'We built this ready for APIs. ', options:{ bold:true, color:INK } },
    { text:'Every government-facing step is a service call with a slot waiting behind it, so connecting a portal means plugging it in rather than rebuilding the process.\n\n', options:{ color:GREY } },
    { text:'What we will need from you. ', options:{ bold:true, color:INK } },
    { text:'GCC governments do not publish open APIs, and when they do give access they give it to the employer, not to a software vendor. So you go to each authority yourself (Qiwa and Muqeem in Saudi, MOHRE and ICP in the UAE, LMRA in Bahrain) and ask for API credentials, the specification and a sandbox under your own establishment registration. Hand those to us and we build the connector.\n\n', options:{ color:GREY } },
    { text:'Until then ', options:{ bold:true, color:INK } },
    { text:'the government step stays a tracked manual PRO activity, with reference number, receipt and status captured in the milestone. That is how the application is designed to operate from day one, with or without a portal connection.', options:{ color:GREY } }
  ], { x:8.64, y:3.78, w:3.84, h:2.76, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.4, lineSpacing:11.4 });
  footer(s, 10);
  s.addNotes('Handle the API question head-on before the customer raises it. The value is not automating the click on the government site — it is knowing the click happened, who made it, when, what it cost and what came back.');
}

/* ========== SLIDE 11 — BTP SERVICES + NEXT STEPS (dark) ========== */
{
  const s = S(); darkBg(s);
  s.addShape(p.ShapeType.ellipse, { x:-2.4, y:4.2, w:6.6, h:6.6, fill:{color:TEAL, transparency:91} });
  titleDark(s, 'What it runs on', 'What you will need on SAP BTP.');

  const core = [
    ['Cloud Foundry Runtime','Hosts the application, workflow engine and APIs'],
    ['SAP HANA Cloud','Permit records, quotas, payments, audit trail'],
    ['SAP Build Work Zone','Role-based portal and launchpad per persona'],
    ['SAP Build Process Automation','Milestones, routing, due dates, escalation'],
    ['SAP Identity Authentication','Single sign-on and directory federation'],
    ['Destination & Connectivity','Secure outbound to SF, S/4HANA and future APIs']
  ];
  const opt = [
    ['SAP Integration Suite (CPI)','Integration flows to SF and S/4HANA Finance'],
    ['Document Management Service','Passports, contracts, receipts, certificates'],
    ['Alert Notification / Email','Expiry alerts, reminders and escalation mails'],
    ['Job Scheduling Service','Nightly expiry scans and scheduled reports'],
    ['SAP Analytics Cloud','Executive dashboards and cross-country analytics'],
    ['Business Application Studio','Localisation and change-request development']
  ];
  function svcCol(items, x, heading, tone){
    s.addText(heading, { x, y:1.62, w:5.6, h:0.24, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, bold:true, color:tone, charSpacing:1.5 });
    items.forEach((it, i) => {
      const y = 1.94 + i*0.545;
      s.addShape(p.ShapeType.roundRect, { x, y, w:5.62, h:0.49, rectRadius:0.05,
        fill:{color:INK2}, line:{color:'27415C', width:0.6} });
      s.addShape(p.ShapeType.roundRect, { x:x+0.14, y:y+0.15, w:0.19, h:0.19, rectRadius:0.04, fill:{color:tone} });
      s.addText(it[0], { x:x+0.44, y:y+0.045, w:5.05, h:0.22, isTextBox:true, margin:0,
        fontFace:H, fontSize:10, bold:true, color:WHITE });
      s.addText(it[1], { x:x+0.44, y:y+0.255, w:5.05, h:0.2, isTextBox:true, margin:0,
        fontFace:B, fontSize:8.4, color:'A9C2DA' });
    });
  }
  svcCol(core, 0.6, 'CORE — REQUIRED FOR ANY DEPLOYMENT', TEAL);
  svcCol(opt, 6.4, 'INTEGRATION & SCALE — AS REQUIRED', SAND);

  s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.30, w:11.42, h:0.88, rectRadius:0.07,
    fill:{color:'123A4E'}, line:{color:TEAL_D, width:1} });
  const asks = [
    ['Two licensing routes','Either you subscribe and run the runtime and portal yourself, or we manage the whole thing, which means no separate developer licences.'],
    ['Works without SuccessFactors','If your SuccessFactors modules are not live yet, that is fine. The non-integrated version still gives you full governance from day one.'],
    ['Deployable in weeks','Pre-built and configured rather than written from scratch: environment and configuration, then integration, then localisation.']
  ];
  asks.forEach((a, i) => {
    const x = 0.82 + i*3.76;
    s.addText(a[0], { x, y:5.42, w:3.5, h:0.22, isTextBox:true, margin:0,
      fontFace:H, fontSize:10.5, bold:true, color:TEAL });
    s.addText(a[1], { x, y:5.64, w:3.5, h:0.46, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.4, color:'A9C2DA', lineSpacing:11.5 });
  });

  s.addText('Ready for the GCC.', { x:0.6, y:6.32, w:6.4, h:0.36, isTextBox:true, margin:0,
    fontFace:H, fontSize:20, bold:true, color:WHITE });
  s.addText('Country packs for the UAE, KSA, Qatar, Kuwait, Oman, Bahrain and Libya  ·  Work permits, healthcare licences and any industry-grade permit', {
    x:0.6, y:6.70, w:8.6, h:0.3, isTextBox:true, margin:0,
    fontFace:B, fontSize:10, color:'A9C2DA' });
  s.addImage({ path:`${IMG}/logo-white.png`, x:10.35, y:6.34, w:2.0, h:0.49 });
  s.addText('info@inkitsolutions.com', { x:9.6, y:6.92, w:2.75, h:0.22, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, color:'7E99B4', align:'right' });
  s.addNotes('Close on provisioning and commercials. The core six are non-negotiable; the rest scale with ambition. Two licensing routes matters — INK IT-managed operation is materially cheaper and is often the deciding factor.');
}

p.writeFile({ fileName: 'INK_IT_Visa_and_Permits_GCC.pptx' })
 .then(f => console.log('WROTE', f));
