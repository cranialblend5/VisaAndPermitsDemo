const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';            // 13.3 x 7.5
p.author = 'INK IT Business Solutions';
p.company = 'INK IT Business Solutions';
p.title = 'Visa & Permits Management — Saudi Arabia';

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
function footer(s, n, dark){
  s.addText('INK IT Business Solutions  ·  Visa & Permits Management  ·  Kingdom of Saudi Arabia',
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
    x:0.72, y:1.85, w:8.6, h:1.9, isTextBox:true, margin:0,
    fontFace:H, fontSize:46, bold:true, color:WHITE, lineSpacing:50 });
  s.addText('Kingdom of Saudi Arabia', {
    x:0.72, y:3.72, w:8.6, h:0.5, isTextBox:true, margin:0,
    fontFace:H, fontSize:28, bold:true, color:TEAL });
  s.addText('Built on SAP BTP  ·  Qiwa, Muqeem and Absher in step', {
    x:0.72, y:4.26, w:8.6, h:0.34, isTextBox:true, margin:0,
    fontFace:B, fontSize:16, color:'A9C2DA', bold:true });
  s.addText('Iqama lifecycle, exit and re-entry tracked to the day, and a live Nitaqat band position, so you know what you can do before Qiwa tells you what you cannot.', {
    x:0.72, y:4.72, w:8.3, h:0.9, isTextBox:true, margin:0,
    fontFace:B, fontSize:14, color:'A9C2DA', lineSpacing:21 });

  const flags = ['Qiwa','Muqeem','Absher','GOSI','Mudad','SCFHS','Enjaz'];
  let fx = 0.72;
  flags.forEach(f => {
    const w = 0.2 + f.length*0.115;
    s.addShape(p.ShapeType.roundRect, { x:fx, y:5.76, w, h:0.36, rectRadius:0.17,
      fill:{color:INK2}, line:{color:'2C4A6A', width:0.75} });
    s.addText(f, { x:fx, y:5.76, w, h:0.36, isTextBox:true, margin:0,
      fontFace:B, fontSize:11.5, bold:true, color:'BFD6EC', align:'center', valign:'middle' });
    fx += w + 0.14;
  });
  s.addText('Saudization  ·  Healthcare licensing  ·  SAP SuccessFactors integrated', {
    x:0.72, y:6.34, w:9.0, h:0.3, isTextBox:true, margin:0, fontFace:B, fontSize:12, color:'7E99B4' });
  s.addText('An overview for SAP account teams and enterprise customers in the Kingdom', {
    x:0.72, y:6.82, w:9.0, h:0.3, isTextBox:true, margin:0,
    fontFace:B, fontSize:10.5, italic:true, color:'6C87A2' });
  s.addNotes('Open on the band. Saudi Arabia is the one GCC market where a compliance score decides whether you can hire at all, and that is the hook for both the HR buyer and the SAP account team. Everything else in the deck hangs off it.');
}

/* ========== SLIDE 2 — THE PROBLEM ========== */
{
  const s = S(); lightBg(s);
  title(s, 'The problem', 'Three systems, one employee, nobody joining them up.');
  s.addText('Saudi Arabia is the hardest GCC market to govern, and not because the rules are unclear. The rules live in three places, each with its own clock, and one of them can switch the others off.', {
    x:0.6, y:1.36, w:11.4, h:0.5, isTextBox:true, margin:0, fontFace:B, fontSize:13.5, color:GREY, lineSpacing:19 });

  const probs = [
    ['01','The band gates everything','Drop a Nitaqat band and block visas stop, Iqama renewals stop, transfers stop. Most companies find out after it happens, from a rejection in Qiwa.'],
    ['02','The 90-day clock starts on arrival','An employee lands and a statutory window opens to issue the Iqama. Nobody is counting it for you, and the penalty is not a warning letter.'],
    ['03','Exit re-entry is a trap','Someone travels, the visa expires while they are away, the Iqama is cancelled. They cannot come back. The most expensive admin mistake in the Kingdom.'],
    ['04','The levy is a real number','The expat levy per employee per year gets budgeted once and forgotten, then lands as a cost nobody forecast in a month nobody planned for.'],
    ['05','Renewals cluster','Iqamas bunch around hiring dates. One quarter is quiet, the next carries three hundred renewals and the fees that come with them.'],
    ['06','SuccessFactors does not know','Your HR system holds the employee. Qiwa and Muqeem hold the truth about whether they may legally work. Nothing keeps the two in agreement.']
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
    { text:'a hiring freeze you did not choose, employees stranded outside the Kingdom, levy costs that arrive unplanned, and a compliance position nobody can prove to an inspector.', options:{ color:INK } }
  ], { x:0.85, y:6.36, w:10.9, h:0.52, isTextBox:true, margin:0, fontFace:B, fontSize:11.5, valign:'middle' });
  footer(s, 2);
  s.addNotes('Ask the room which of the six they recognise. In Saudi engagements the answer is usually all of them, and number one is the one that gets a CHRO leaning forward.');
}

/* ========== SLIDE 3 — THE SOLUTION ========== */
{
  const s = S(); lightBg(s);
  title(s, 'The solution', 'Five Saudi lifecycles on one track.');
  s.addText('Pre-built, configured for the Kingdom, and running the authorities as one process instead of three.', {
    x:0.6, y:1.36, w:11.4, h:0.34, isTextBox:true, margin:0, fontFace:B, fontSize:13.5, color:GREY });

  const lifes = [
    ['New Work Visa & Iqama','12 steps','Block visa through Qiwa contract, arrival, medical, Iqama on Muqeem, GOSI and Mudad.', TEAL],
    ['Iqama Renewal','8 steps','Alert six weeks out, band gate check, levy and fees, Muqeem renewal, write-back.', TEAL_D],
    ['Exit & Re-entry','9 steps','Request, approval, Muqeem visa, and return-by tracked from actual departure.', 'C9821A'],
    ['Sponsorship Transfer','6 steps','Qiwa status check, Nitaqat impact, transfer, new contract, Iqama moved.', TEAL],
    ['Final Exit','6 steps','End of service settled, dues cleared, contract terminated, Iqama cancelled.', INK2]
  ];
  lifes.forEach((l, i) => {
    const y = 1.94 + i*0.96;
    card(s, 0.6, y, 5.6, 0.84, i%2 ? WHITE : BG);
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:0.075, h:0.84, rectRadius:0.03, fill:{color:l[3]} });
    s.addText(l[0], { x:0.92, y:y+0.10, w:3.5, h:0.26, isTextBox:true, margin:0,
      fontFace:H, fontSize:13.5, bold:true, color:INK });
    s.addText(l[1], { x:4.42, y:y+0.12, w:1.6, h:0.24, isTextBox:true, margin:0,
      fontFace:B, fontSize:10.5, bold:true, color:l[3], align:'right' });
    s.addText(l[2], { x:0.92, y:y+0.38, w:5.1, h:0.40, isTextBox:true, margin:0,
      fontFace:B, fontSize:10.2, color:GREY, lineSpacing:14 });
  });

  shot(s, 'home.jpg', 6.5, 1.94, 6.2);
  s.addText('The Saudi home dashboard. Four lifecycles with live counts, over a queue where the overdue exit re-entry sits at the top with a name against it.', {
    x:6.5, y:5.94, w:6.2, h:0.5, isTextBox:true, margin:0,
    fontFace:B, fontSize:10, italic:true, color:GREY, lineSpacing:14 });
  footer(s, 3);
  s.addNotes('Screens in this deck are the application configured for Saudi Arabia. Say plainly that they are representative KSA screens rather than captures of a live Saudi tenant, and that the engine underneath is the one running in the UAE today.');
}

/* ========== SLIDE 4 — JOURNEY MAP ========== */
{
  const s = S(); lightBg(s);
  title(s, 'The journey map', 'One Iqama, five people, seven stages.');
  s.addText('Stages run left to right in the order they happen. Each lane is a person. Every arrow is a hand-off, and every hand-off is where the process stalls today.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0, fontFace:B, fontSize:13, color:GREY });
  s.addImage({ path:`${IMG}/journeymap.png`, x:0.6, y:1.86, w:12.13, h:4.40 });
  s.addShape(p.ShapeType.roundRect, { x:0.6, y:6.42, w:12.13, h:0.5, rectRadius:0.08,
    fill:{color:'FCF6E4'}, line:{color:SAND, width:0.9} });
  s.addText([
    { text:'Look at stage one.  ', options:{ bold:true, color:'7A6410' } },
    { text:'In the UAE a permit starts with a quota check. In Saudi Arabia it starts with a Nitaqat check, because the band decides whether a block visa can be requested at all. That is why a KSA rollout is not a UAE rollout with the names changed.', options:{ color:INK } }
  ], { x:0.85, y:6.42, w:11.6, h:0.5, isTextBox:true, margin:0, fontFace:B, fontSize:11, valign:'middle' });
  footer(s, 4);
  s.addNotes('This is the slide to slow down on with a mixed audience. Business people read the lanes, technical people read the arrows, and both end up at the same conclusion about where the risk sits.');
}

/* ========== SLIDE 5 — EXIT & RE-ENTRY ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Exit & re-entry', 'The process that costs the most when it goes wrong.');
  s.addText('Every expatriate leaving the Kingdom and intending to return needs an exit re-entry visa. Miss the return date and the Iqama is cancelled, and they cannot come back.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0, fontFace:B, fontSize:13, color:GREY });

  const steps = [
    ['1','Employee requests','Travel dates come from the person travelling, in self-service, not second hand.'],
    ['2','Manager and HR approve','Absence against the leave calendar, then Iqama validity, dues, loans and notice.'],
    ['3','Muqeem visa issued','Single or multiple, duration recorded, SADAD fee captured with the receipt.'],
    ['4','Departure recorded','The return-by clock is calculated from the actual departure, not the application.'],
    ['5','Return monitored','Alerts at 14, 7 and 2 days to employee, line manager and HRBP.'],
    ['6','Re-entry confirmed','Arrival recorded, Iqama remains valid, case closes.']
  ];
  steps.forEach((t, i) => {
    const y = 1.98 + i*0.79;
    card(s, 0.6, y, 5.9, 0.68, i%2 ? WHITE : BG);
    circle(s, 0.78, y+0.15, 0.38, t[0], i>3 ? 'C9821A' : TEAL, WHITE, 11);
    s.addText(t[1], { x:1.3, y:y+0.07, w:4.9, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:12, bold:true, color:INK });
    s.addText(t[2], { x:1.3, y:y+0.31, w:5.0, h:0.32, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, color:GREY, lineSpacing:12.5 });
  });

  shot(s, 'exit-tracker.jpg', 6.75, 1.98, 5.95);
  s.addShape(p.ShapeType.roundRect, { x:6.75, y:5.72, w:5.95, h:1.16, rectRadius:0.08,
    fill:{color:'FDECE9'}, line:{color:'E0A79D', width:0.9} });
  s.addText('Forty-seven outside the Kingdom. Two already overdue.', {
    x:6.95, y:5.84, w:5.55, h:0.28, isTextBox:true, margin:0,
    fontFace:H, fontSize:11.5, bold:true, color:'8E3428' });
  s.addText('Twelve more return inside a fortnight. That is a question your HR director cannot answer today. Here it is one screen, and the overdue rows have already escalated to their line managers.', {
    x:6.95, y:6.14, w:5.55, h:0.64, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.6, color:GREY, lineSpacing:13 });
  footer(s, 5);
  s.addNotes('If you only land one slide with a Saudi customer, land this one. Every HR leader in the Kingdom has a story about someone who could not get back, and this is the slide where they tell it to you.');
}

/* ========== SLIDE 6 — SAUDIZATION (dark) ========== */
{
  const s = S(); darkBg(s);
  s.addShape(p.ShapeType.ellipse, { x:10.6, y:-2.6, w:6.4, h:6.4, fill:{color:TEAL, transparency:90} });
  titleDark(s, 'Saudization & Nitaqat', 'The number that decides whether you can hire at all.');
  s.addText('Nitaqat scores every establishment on the share of Saudi nationals it employs and puts it in a band. The band is not a report card, it is a switch.', {
    x:0.6, y:1.36, w:11.4, h:0.36, isTextBox:true, margin:0, fontFace:B, fontSize:12.5, color:'A9C2DA' });

  const bands = [
    ['PLATINUM','All services open','Block visas, renewals and transfers all available', GOOD],
    ['GREEN','Open, with headroom','Services available while the ratio holds', GOOD],
    ['YELLOW','Restricted','Renewals limited, transfers constrained', WARN],
    ['RED','Suspended','No block visas, no renewals, no transfers in', BAD]
  ];
  bands.forEach((bd, i) => {
    const y = 1.94 + i*0.82;
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:5.9, h:0.70, rectRadius:0.07,
      fill:{color:INK2}, line:{color:'27415C', width:0.8} });
    s.addShape(p.ShapeType.roundRect, { x:0.78, y:y+0.22, w:1.08, h:0.26, rectRadius:0.13, fill:{color:bd[3]} });
    s.addText(bd[0], { x:0.78, y:y+0.22, w:1.08, h:0.26, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.5, bold:true, color:WHITE, align:'center', valign:'middle' });
    s.addText(bd[1], { x:2.02, y:y+0.09, w:4.3, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:12, bold:true, color:WHITE });
    s.addText(bd[2], { x:2.02, y:y+0.34, w:4.3, h:0.26, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, color:'A9C2DA' });
  });

  s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.26, w:5.9, h:1.62, rectRadius:0.08,
    fill:{color:'123A4E'}, line:{color:TEAL_D, width:1} });
  s.addText('What we do that Qiwa does not', { x:0.82, y:5.38, w:5.5, h:0.24, isTextBox:true, margin:0,
    fontFace:H, fontSize:12, bold:true, color:TEAL });
  const edge = ['Calculate the band continuously, not at the next Qiwa cycle',
                'Show the headroom: how many leavers would drop you',
                'Simulate a restructure or a bulk hire before you commit',
                'Alert before the band moves, with the cause named'];
  s.addText(edge.map((t,i)=>({ text:t, options:{ bullet:true, breakLine: i<edge.length-1 } })), {
    x:0.82, y:5.66, w:5.5, h:1.1, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.8, color:'A9C2DA', lineSpacing:13.5, paraSpaceAfter:3 });

  shot(s, 'nitaqat.jpg', 6.75, 1.94, 5.95);
  s.addText('The right-hand panel is the point. Not a compliance score, but the four things you cannot do this week because one establishment fell into the red band.', {
    x:6.75, y:5.68, w:5.95, h:0.52, isTextBox:true, margin:0,
    fontFace:B, fontSize:10, italic:true, color:'A9C2DA', lineSpacing:13.5 });
  footer(s, 6, true);
  s.addNotes('This is where the deal widens. Visa tracking is a PRO-desk purchase; Nitaqat forecasting is a CHRO and CFO purchase, and it ties straight to Vision 2030 localisation commitments. For an SAP account team this is the slide that justifies the platform conversation.');
}

/* ========== SLIDE 7 — GOVERNMENT PORTALS ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Government portals', 'Seven portals. One queue.');
  s.addText('Every Saudi step lands on one of these. Your PRO should not have to remember which.', {
    x:0.6, y:1.36, w:11.4, h:0.34, isTextBox:true, margin:0, fontFace:B, fontSize:13, color:GREY });

  const portals = [
    ['Qiwa','MHRSD','The job','Work permits, the authenticated contract, Nitaqat band, transfers', 1, 'Connector ready', WARN],
    ['Muqeem','Elm','The residence','Iqama issue and renewal, exit and re-entry, final exit, dependants', 1, 'Connector ready', WARN],
    ['Absher','Ministry of Interior','What the employee sees','Mirrors every Muqeem action, same day. Where disputes start', 1, 'Connector ready', WARN],
    ['Enjaz','MoFA','The visa, stamped abroad','Application and embassy stamping, tracked to the entry window', 0, 'Connector ready', WARN],
    ['GOSI','Social Insurance','Who counts as Saudi','Registration and contributory wage. Feeds the Nitaqat headcount', 0, 'Live lookup', GOOD],
    ['Mudad','Wage protection','Does pay match the contract','Payroll enrolment, salary checked against Qiwa', 0, 'Live lookup', GOOD],
    ['CCHI','Health insurance council','No cover, no Iqama','Policy validity per employee. Blocks issue and renewal', 0, 'Live lookup', GOOD]
  ];
  const cw = 2.92, ch = 1.60;
  portals.slice(0,4).forEach((pt, i) => {
    const x = 0.6 + i*(cw+0.17);
    card(s, x, 1.94, cw, ch, pt[4] ? 'EAF2FD' : BG);
    s.addText(pt[0], { x:x+0.17, y:2.06, w:1.22, h:0.28, isTextBox:true, margin:0,
      fontFace:H, fontSize:15, bold:true, color:INK });
    s.addText(pt[1], { x:x+1.45, y:2.07, w:cw-1.62, h:0.34, isTextBox:true, margin:0,
      fontFace:B, fontSize:8, color:GREY, align:'right', lineSpacing:10 });
    s.addText(pt[2], { x:x+0.17, y:2.36, w:cw-0.34, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:TEAL_D });
    s.addText(pt[3], { x:x+0.17, y:2.62, w:cw-0.34, h:0.62, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.2, color:GREY, lineSpacing:12.4 });
    s.addShape(p.ShapeType.roundRect, { x:x+0.17, y:3.28, w:1.45, h:0.22, rectRadius:0.11, fill:{color:pt[6]} });
    s.addText(pt[5], { x:x+0.17, y:3.28, w:1.45, h:0.22, isTextBox:true, margin:0,
      fontFace:B, fontSize:7.8, bold:true, color:WHITE, align:'center', valign:'middle' });
  });
  portals.slice(4).forEach((pt, i) => {
    const x = 0.6 + i*(cw+0.17);
    card(s, x, 3.72, cw, ch, BG);
    s.addText(pt[0], { x:x+0.17, y:3.84, w:1.22, h:0.28, isTextBox:true, margin:0,
      fontFace:H, fontSize:15, bold:true, color:INK });
    s.addText(pt[1], { x:x+1.45, y:3.85, w:cw-1.62, h:0.34, isTextBox:true, margin:0,
      fontFace:B, fontSize:8, color:GREY, align:'right', lineSpacing:10 });
    s.addText(pt[2], { x:x+0.17, y:4.14, w:cw-0.34, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:TEAL_D });
    s.addText(pt[3], { x:x+0.17, y:4.40, w:cw-0.34, h:0.62, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.2, color:GREY, lineSpacing:12.4 });
    s.addShape(p.ShapeType.roundRect, { x:x+0.17, y:5.06, w:1.45, h:0.22, rectRadius:0.11, fill:{color:pt[6]} });
    s.addText(pt[5], { x:x+0.17, y:5.06, w:1.45, h:0.22, isTextBox:true, margin:0,
      fontFace:B, fontSize:7.8, bold:true, color:WHITE, align:'center', valign:'middle' });
  });

  s.addShape(p.ShapeType.roundRect, { x:9.89, y:3.72, w:2.84, h:1.60, rectRadius:0.08,
    fill:{color:'FCF6E4'}, line:{color:SAND, width:1} });
  s.addText('How amber goes green', { x:10.06, y:3.84, w:2.5, h:0.24, isTextBox:true, margin:0,
    fontFace:H, fontSize:12, bold:true, color:'7A6410' });
  s.addText('Qiwa and Muqeem grant API access to the employer, under your own establishment registration. Never to a vendor. You request credentials, we plug them into connectors already built.', {
    x:10.06, y:4.12, w:2.52, h:1.08, isTextBox:true, margin:0,
    fontFace:B, fontSize:8.8, color:GREY, lineSpacing:11.8 });

  s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.50, w:12.13, h:1.38, rectRadius:0.08,
    fill:{color:TEAL_L}, line:{color:TEAL, width:0.9} });
  s.addText('Three live today. Four await your credentials.', {
    x:0.85, y:5.64, w:5.6, h:0.26, isTextBox:true, margin:0,
    fontFace:H, fontSize:13, bold:true, color:TEAL_D });
  s.addText('Until a connector goes live the step is manual, but it is still tracked. The reference number, the receipt and the status are captured exactly as they would be automatically, so nothing about the process changes on the day the switch is flipped. That is the difference between being API-ready and being API-dependent.', {
    x:0.85, y:5.94, w:6.0, h:0.82, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.6, color:INK, lineSpacing:13 });
  shot(s, 'integrations.jpg', 7.1, 5.58, 5.5);
  footer(s, 7);
  s.addNotes('The integration slide a Saudi CIO is waiting for. Be precise: access is granted to the employer under their establishment registration, not to a software vendor, so the credentials have to come from the customer. Saying that plainly earns more trust than promising automation you cannot deliver.');
}

/* ========== SLIDE 8 — PERSONAS ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Persona view', 'Everyone gets their own to-do list.');
  s.addText('Each role only sees what is actually theirs, with a due date on it, and the system already knows which Saudi authority each step belongs to.', {
    x:0.6, y:1.36, w:11.4, h:0.46, isTextBox:true, margin:0, fontFace:B, fontSize:13, color:GREY });

  const rows = [
    ['GRO','Government Relations','PRO desk · Riyadh','Requests block visas once the band allows it; authenticates Qiwa contracts; issues Iqamas on Muqeem inside the statutory window; applies for exit re-entry and watches every return-by date.','One queue that already knows which authority each step belongs to.', TEAL],
    ['TA','Recruiter','Talent acquisition','Checks block visa availability before making an offer; releases candidates from SF Recruiting; agrees the Qiwa profession code with the PRO before submission.','Offers made against visas that actually exist.', TEAL_D],
    ['OB','Onboarding','Employee relations','Records the arrival date that starts the statutory Iqama clock; chases medicals and biometrics; registers Saudi hires with GOSI and Mudad.','Nobody works without the paperwork that makes it legal.', TEAL],
    ['BP','HR Business Partner','Employee relations','Approves exit re-entry against dues and notice; reviews the Nitaqat impact of a resignation before it is actioned; starts final exit once settlement is agreed.','Told before a resignation moves the band, not after.', TEAL_D],
    ['EM','Employee','Self-service','Requests exit re-entry with travel dates; confirms medical and biometrics; signs the Qiwa contract; confirms receipt of the renewed Iqama.','Sees their own Iqama expiry and their return-by date.', TEAL],
    ['FI','Finance Controller','Payments and GL','Reconciles SADAD payments against receipts; posts to GL; forecasts expat levy against the renewal calendar.','The levy stops being a surprise.', TEAL_D],
    ['HR','Head of HR','Governance and risk','Watches band position per establishment; reviews Saudization against Vision 2030 commitments; signs off the localisation hiring plan.','Nitaqat exposure answerable from one screen.', INK2]
  ];
  const rh = 0.60, gap = 0.04;
  rows.forEach((r, i) => {
    const y = 2.00 + i*(rh+gap);
    s.addShape(p.ShapeType.roundRect, { x:0.6, y, w:11.4, h:rh, rectRadius:0.06,
      fill:{color: i%2 ? WHITE : BG}, line:{color:GREY_L, width:0.6} });
    circle(s, 0.76, y+0.11, 0.38, r[0], r[5], WHITE, 10.5);
    s.addText(r[1], { x:1.26, y:y+0.06, w:2.15, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11, bold:true, color:INK });
    s.addText(r[2], { x:1.26, y:y+0.30, w:2.15, h:0.20, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color:TEAL_D });
    s.addText(r[3], { x:3.55, y:y+0.06, w:5.30, h:0.48, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.3, color:GREY, lineSpacing:12.4 });
    s.addText(r[4], { x:9.0, y:y+0.06, w:2.86, h:0.48, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.3, italic:true, bold:true, color:GOOD, lineSpacing:12.4 });
  });
  s.addText('ROLE', { x:1.26, y:1.76, w:2.1, h:0.2, isTextBox:true, margin:0, fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4 });
  s.addText('WHAT THEY DO IN THE SYSTEM', { x:3.55, y:1.76, w:5.3, h:0.2, isTextBox:true, margin:0, fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4 });
  s.addText('WHAT THEY GET', { x:9.0, y:1.76, w:2.86, h:0.2, isTextBox:true, margin:0, fontFace:B, fontSize:8.5, bold:true, color:'96A3AE', charSpacing:1.4 });
  footer(s, 8);
  s.addNotes('With a mixed audience, let people find their own row. The GRO row is the operational win; the Head of HR row is the one an SAP account executive should point at when the conversation turns to platform value.');
}

/* ========== SLIDE 9 — TASKS & MONEY ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Accountability & cost control', 'Every step owned. Every riyal accounted for.');
  s.addText('Statutory deadlines need named owners, and Saudi permit costs are large enough that finance has to see them coming.', {
    x:0.6, y:1.36, w:11.4, h:0.34, isTextBox:true, margin:0, fontFace:B, fontSize:13, color:GREY });

  const ladder = [
    ['1','Assign','Routed to a role, claimed by a named officer. Due dates come from the statutory deadline, not a guess.', TEAL],
    ['2','Nudge','Every 2 days while open. Iqama expiries six weeks out, exit re-entry returns at 14, 7 and 2 days.', WARN],
    ['3','Escalate','Past the due date it reaches the line manager and HRBP on its own, while something can still be done.', BAD],
    ['4','Prove','Who had it, when they were reminded, what they uploaded. A Qiwa or GOSI inspection becomes a report.', GOOD]
  ];
  ladder.forEach((l, i) => {
    const y = 1.96 + i*0.85;
    card(s, 0.6, y, 5.9, 0.74, i%2 ? WHITE : BG);
    circle(s, 0.8, y+0.18, 0.4, l[0], l[3], WHITE, 12);
    s.addText(l[1], { x:1.34, y:y+0.09, w:4.9, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:12.5, bold:true, color:INK });
    s.addText(l[2], { x:1.34, y:y+0.34, w:4.95, h:0.34, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.4, color:GREY, lineSpacing:12.5 });
  });

  s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.42, w:5.9, h:1.46, rectRadius:0.08,
    fill:{color:TEAL_L}, line:{color:TEAL, width:0.9} });
  s.addText('The Saudi cost line finance actually worries about', { x:0.82, y:5.54, w:5.5, h:0.24, isTextBox:true, margin:0,
    fontFace:H, fontSize:11.5, bold:true, color:TEAL_D });
  s.addText('The expat levy is charged per employee per year and renewals cluster around hiring dates. We forecast levy and fees against the renewal calendar, so a heavy quarter is budgeted rather than absorbed. Every payment carries a SADAD reference, a receipt and a GL account.', {
    x:0.82, y:5.82, w:5.5, h:0.94, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.6, color:INK, lineSpacing:13 });

  shot(s, 'report-payment.jpg', 6.75, 1.96, 5.95);
  s.addText('Qiwa contract fee, expat levy, Iqama issue fee, exit re-entry, transfer fee, medical insurance. Each with its own GL account and its own receipt, one click away.', {
    x:6.75, y:5.72, w:5.95, h:0.5, isTextBox:true, margin:0,
    fontFace:B, fontSize:10, italic:true, color:GREY, lineSpacing:13.5 });
  footer(s, 9);
  s.addNotes('Two buyers on one slide. The ladder is for the HR operations lead, the levy box is for the CFO. The levy is usually the number that turns this from a nice-to-have into a budgeted project.');
}

/* ========== SLIDE 10 — ARCHITECTURE ========== */
{
  const s = S(); lightBg(s);
  title(s, 'Solution architecture', 'Every system, and what moves between them.');
  s.addImage({ path:`${IMG}/architecture.png`, x:0.6, y:1.26, w:8.25, h:5.60 });
  const notes = [
    ['What flows in','Candidates who accepted an offer, the employee master, separations and the Iqama expiry dates that start a renewal. All through SAP Integration Suite, monitored and retried like any other SAP integration.', TEAL],
    ['What flows back','Iqama number, expiry, profession as registered in Qiwa and work permit status, straight into Employee Central. Nobody re-types anything.', TEAL_D],
    ['What flows down','Every payment with its amount, VAT, SADAD reference, receipt and GL account, posted to S/4HANA as a journal. Levy accruals included.', TEAL],
    ['The dashed arrows','Qiwa and Muqeem grant API access to the employer under their own establishment registration, never to a software vendor. Those credentials come from you. The connectors are already built.', SAND]
  ];
  notes.forEach((n, i) => {
    const y = 1.26 + i*1.42;
    s.addShape(p.ShapeType.roundRect, { x:9.05, y, w:3.68, h:1.30, rectRadius:0.07,
      fill:{color: n[2]===SAND ? 'FCF6E4' : BG}, line:{color: n[2]===SAND ? SAND : GREY_L, width:0.9} });
    s.addText(n[0], { x:9.24, y:y+0.11, w:3.3, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color: n[2]===SAND ? '7A6410' : INK });
    s.addText(n[1], { x:9.24, y:y+0.36, w:3.32, h:0.86, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.5, color:GREY, lineSpacing:11.4 });
  });
  footer(s, 10);
  s.addNotes('The technical slide. Walk the four sides, then land the dashed arrows. Being straight that government API access belongs to the employer is what earns credibility with a Saudi CIO, and it is the question they will ask.');
}

/* ========== SLIDE 11 — BTP + DELIVERY (dark) ========== */
{
  const s = S(); darkBg(s);
  s.addShape(p.ShapeType.ellipse, { x:-2.4, y:4.2, w:6.6, h:6.6, fill:{color:TEAL, transparency:91} });
  titleDark(s, 'What it runs on', 'SAP BTP services, and what it takes to deploy.');

  const core = [
    ['Cloud Foundry Runtime','Hosts the application, workflow engine and APIs'],
    ['SAP HANA Cloud','Iqama records, Nitaqat headcount, payments, audit trail'],
    ['SAP Build Work Zone','Role-based portal for PRO, HR, finance and employees'],
    ['SAP Build Process Automation','Steps, statutory due dates, reminders, escalation'],
    ['SAP Identity Authentication','Single sign-on and directory federation'],
    ['Destination & Connectivity','Secure outbound to SF, S/4HANA and Saudi endpoints']
  ];
  const opt = [
    ['SAP Integration Suite (CPI)','Flows to SF Recruiting, Onboarding, EC and S/4HANA'],
    ['Document Management','Qiwa contracts, SADAD receipts, SCFHS certificates'],
    ['Alert Notification / Email','Iqama expiry, return-by alerts, escalation mail'],
    ['Job Scheduling','Nightly expiry and return-by scans, Nitaqat recalculation'],
    ['SAP Analytics Cloud','Nitaqat forecasting, levy budgeting, exec dashboards'],
    ['Business Application Studio','Localisation, Arabic package, change requests']
  ];
  function col(items, x, heading, tone){
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
  col(core, 0.6, 'CORE — REQUIRED FOR ANY DEPLOYMENT', TEAL);
  col(opt, 6.4, 'INTEGRATION & SCALE — AS REQUIRED', SAND);

  s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.30, w:11.42, h:0.88, rectRadius:0.07,
    fill:{color:'123A4E'}, line:{color:TEAL_D, width:1} });
  const asks = [
    ['Data residency','Deployable in an SAP BTP region that meets Saudi data residency expectations, which is usually the first question a Saudi CIO asks.'],
    ['Arabic when you need it','The interface ships in English. Arabic and right-to-left layout are a defined localisation package, not a rebuild.'],
    ['Weeks, not quarters','Pre-built and configured rather than written from scratch. Environment and configuration, then integration, then localisation.']
  ];
  asks.forEach((a, i) => {
    const x = 0.82 + i*3.76;
    s.addText(a[0], { x, y:5.42, w:3.5, h:0.22, isTextBox:true, margin:0,
      fontFace:H, fontSize:10.5, bold:true, color:TEAL });
    s.addText(a[1], { x, y:5.64, w:3.5, h:0.46, isTextBox:true, margin:0,
      fontFace:B, fontSize:8.4, color:'A9C2DA', lineSpacing:11.5 });
  });

  footer(s, 11, true);
  s.addNotes('Close on provisioning and the three questions a Saudi buyer always asks: where does the data sit, is there Arabic, and how long does it take. Have answers ready rather than promises.');
}


/* ========== SLIDE 12 — ALSO GCC-READY (dark) ========== */
{
  const s = S(); darkBg(s);
  s.addShape(p.ShapeType.ellipse, { x:9.8, y:-2.4, w:6.8, h:6.8, fill:{color:TEAL, transparency:89} });
  titleDark(s, 'Beyond the Kingdom', 'Saudi Arabia is one pack. There are seven.');
  s.addText('The engine underneath runs six more markets, so your second country is a configuration, not another project.', {
    x:0.6, y:1.36, w:11.4, h:0.34, isTextBox:true, margin:0, fontFace:B, fontSize:12.5, color:'A9C2DA' });

  const packs = [
    ['Saudi Arabia','Qiwa / Muqeem / Absher','Nitaqat gates everything. Exit and re-entry is the trap.', 1],
    ['United Arab Emirates','MOHRE / ICP / GDRFA','Golden Visa splits residence from work permit. Two clocks.', 0],
    ['Qatar','ADLSA / MOI / QVC','Most of the work happens before the employee travels.', 0],
    ['Kuwait','PAM / MOI / PACI','Permit and residency on two clocks, two authorities.', 0],
    ['Oman','Ministry of Labour / ROP','Omanisation gates clearance, as Nitaqat does here.', 0],
    ['Bahrain','LMRA / NPRA / GOSI','One authority runs the whole permit. Cleanest API candidate.', 0],
    ['Libya','Ministry of Labour / PNA','Rotating crews. Proof matters more than volume.', 0]
  ];
  const cw = 2.92, ch = 1.32;
  packs.forEach((pk, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.6 + col*(cw+0.17), y = 1.94 + row*(ch+0.20);
    s.addShape(p.ShapeType.roundRect, { x, y, w:cw, h:ch, rectRadius:0.08,
      fill:{color: pk[3] ? '123A4E' : INK2}, line:{color: pk[3] ? TEAL : '27415C', width: pk[3] ? 1.6 : 0.8} });
    s.addText(pk[0], { x:x+0.17, y:y+0.12, w: pk[3] ? cw-1.32 : cw-0.34, h:0.26, isTextBox:true, margin:0,
      fontFace:H, fontSize:12.5, bold:true, color:WHITE });
    s.addText(pk[1], { x:x+0.17, y:y+0.42, w:cw-0.34, h:0.22, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color:TEAL });
    s.addText(pk[2], { x:x+0.17, y:y+0.66, w:cw-0.34, h:0.54, isTextBox:true, margin:0,
      fontFace:B, fontSize:9.2, color:'A9C2DA', lineSpacing:12.2 });
    if (pk[3]) {
      s.addShape(p.ShapeType.roundRect, { x:x+cw-1.10, y:y+0.13, w:0.93, h:0.22, rectRadius:0.11, fill:{color:TEAL} });
      s.addText('You are here', { x:x+cw-1.10, y:y+0.13, w:0.93, h:0.22, isTextBox:true, margin:0,
        fontFace:B, fontSize:7.4, bold:true, color:INK, align:'center', valign:'middle' });
    }
  });

  s.addShape(p.ShapeType.roundRect, { x:9.89, y:3.46, w:2.84, h:1.32, rectRadius:0.08,
    fill:{color:TEAL_D}, line:{color:TEAL, width:1.2} });
  s.addText('36 permit types', { x:10.06, y:3.60, w:2.5, h:0.26, isTextBox:true, margin:0,
    fontFace:H, fontSize:14, bold:true, color:WHITE });
  s.addText('across seven country packs, on one engine, in one BTP subscription.', {
    x:10.06, y:3.90, w:2.52, h:0.76, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.4, color:'CFEFEB', lineSpacing:12.4 });

  const why = [
    ['One engine','Workflow, tasks, payment capture and reporting are identical everywhere. Only the steps, authorities and thresholds change.'],
    ['One training course','A PRO who learns the Saudi screens already knows the Emirati ones. Same queue, same inbox, same escalation.'],
    ['One line in your BTP account','Adding a country does not add a platform, a contract or a separate support model. It adds a pack.']
  ];
  why.forEach((w, i) => {
    const x = 0.6 + i*4.09;
    s.addShape(p.ShapeType.roundRect, { x, y:4.98, w:3.95, h:1.06, rectRadius:0.08,
      fill:{color:INK2}, line:{color:'27415C', width:0.8} });
    s.addText(w[0], { x:x+0.18, y:5.10, w:3.6, h:0.24, isTextBox:true, margin:0,
      fontFace:H, fontSize:11.5, bold:true, color:TEAL });
    s.addText(w[1], { x:x+0.18, y:5.36, w:3.6, h:0.58, isTextBox:true, margin:0,
      fontFace:B, fontSize:9, color:'A9C2DA', lineSpacing:12 });
  });

  s.addText('Built for the Kingdom. Ready for the Gulf.', { x:0.6, y:6.28, w:7.4, h:0.38, isTextBox:true, margin:0,
    fontFace:H, fontSize:21, bold:true, color:WHITE });
  s.addText('Qiwa, Muqeem and Absher in step   ·   Nitaqat calculated before it bites   ·   Exit and re-entry tracked to the day', {
    x:0.6, y:6.72, w:9.0, h:0.3, isTextBox:true, margin:0, fontFace:B, fontSize:10, color:'A9C2DA' });
  s.addImage({ path:`${IMG}/logo-white.png`, x:10.35, y:6.30, w:2.0, h:0.49 });
  s.addText('info@inkitsolutions.com', { x:9.6, y:6.88, w:2.75, h:0.22, isTextBox:true, margin:0,
    fontFace:B, fontSize:9, color:'7E99B4', align:'right' });
  s.addNotes('Close by widening. The Saudi deal is the entry point; the platform argument is that the second and third country cost configuration rather than another project. For an SAP account executive this is the slide that turns one country into a regional account plan.');
}

p.writeFile({ fileName: 'INK_IT_Visa_and_Permits_KSA.pptx' }).then(f => console.log('WROTE', f));
