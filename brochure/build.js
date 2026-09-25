/* One page, A4 portrait: the marketing brochure for circulation inside SAP.
   Single slide so it edits in PowerPoint and exports straight to PDF. */
const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.defineLayout({ name:'A4P', width:8.27, height:11.69 });
p.layout  = 'A4P';
p.author  = 'INK IT Business Solutions';
p.company = 'INK IT Business Solutions';
p.title   = 'Visa and Permits Management on SAP Business Technology Platform';

const INK='0C1E33', INK2='16304C', TEAL='20A098', TEAL_D='12756F', TEAL_L='E4F5F3';
const SAND='C9A227', WHITE='FFFFFF', BG='F4F6F7', GREY='5A6C82', GREY_L='E3E7EA';
const SAPB='0A6ED1', SAPB_L='EAF2FC';
const H='Arial', B='Calibri', IMG='./img';
const W = 8.27, M = 0.52, CW = W - 2*M;      // content width 7.23

const s = p.addSlide();
s.background = { color: WHITE };
const box = (x,y,w,h,fill,line,r) => s.addShape(p.ShapeType.roundRect,
  { x, y, w, h, rectRadius:r ?? 0.06, fill:{ color:fill }, line:{ color:line ?? GREY_L, width:0.75 } });

/* ---------- masthead ---------- */
s.addShape(p.ShapeType.rect, { x:0, y:0, w:W, h:3.02, fill:{ color:INK } });
s.addShape(p.ShapeType.ellipse, { x:5.6, y:-1.7, w:4.6, h:4.6, fill:{ color:INK2 } });
s.addImage({ path:`${IMG}/logo-white.png`, x:M, y:0.40, w:1.52, h:0.51 });
s.addText('KINGDOM OF SAUDI ARABIA', { x:M, y:1.14, w:CW, h:0.20, isTextBox:true, margin:0,
  fontFace:B, fontSize:9, bold:true, color:SAND, charSpacing:2.2 });
s.addText('Visa and Permits\nManagement', { x:M, y:1.38, w:5.6, h:0.96, isTextBox:true, margin:0,
  fontFace:H, fontSize:29, bold:true, color:WHITE, lineSpacing:31 });
s.addText('Built on SAP Business Technology Platform', { x:M, y:2.38, w:5.6, h:0.28, isTextBox:true,
  margin:0, fontFace:H, fontSize:14, bold:true, color:TEAL });
s.addText('Every work permit, Iqama, exit and re-entry and final exit on one track, between the Saudi government portals and SAP SuccessFactors.',
  { x:M, y:2.66, w:6.4, h:0.30, isTextBox:true, margin:0, fontFace:B, fontSize:10, color:'B7CDE2' });

/* ---------- the problem, in one line ---------- */
s.addShape(p.ShapeType.roundRect, { x:M, y:3.20, w:CW, h:0.56, rectRadius:0.06, fill:{ color:TEAL_L },
  line:{ color:'9FD8D3', width:0.75 } });
s.addText([
  { text:'The problem. ', options:{ bold:true, color:INK } },
  { text:'The Saudi permit lifecycle runs across three government systems and one human resources system, and nothing joins them up. Work sits in inboxes, fees go unreconciled, and a missed date costs a fine.',
    options:{ color:TEAL_D } },
], { x:M+0.16, y:3.20, w:CW-0.32, h:0.56, isTextBox:true, margin:0, fontFace:B, fontSize:9.6,
     valign:'middle', lineSpacing:11.5 });

/* ---------- four capabilities ---------- */
s.addText('WHAT IT DOES', { x:M, y:3.94, w:CW, h:0.20, isTextBox:true, margin:0,
  fontFace:B, fontSize:8.5, bold:true, color:TEAL, charSpacing:1.8 });
const caps = [
  ['Five lifecycles, one queue','New work visa, Iqama renewal, exit and re-entry, final exit and transfer. Each step has an owner and a due date.'],
  ['Seven authorities, one screen','Qiwa, Muqeem, Absher, Enjaz, GOSI, Mudad and CCHI, with the right one already attached to each step.'],
  ['Nitaqat before you hire','Band position per establishment, so a hire is approved against headroom that actually exists.'],
  ['Every riyal accounted for','Each fee carries a receipt, a payment reference and a General Ledger code. No duplicate, no unexplained payment.'],
];
caps.forEach((c, i) => {
  const x = M + (i%2)*(CW/2 + 0.06);
  const y = 4.18 + Math.floor(i/2)*0.95;
  box(x, y, CW/2 - 0.06, 0.86, BG);
  s.addShape(p.ShapeType.roundRect, { x:x+0.14, y:y+0.15, w:0.055, h:0.56, rectRadius:0.02, fill:{ color:TEAL } });
  s.addText(c[0], { x:x+0.30, y:y+0.12, w:CW/2-0.48, h:0.22, isTextBox:true, margin:0,
    fontFace:H, fontSize:10.5, bold:true, color:INK });
  s.addText(c[1], { x:x+0.30, y:y+0.34, w:CW/2-0.48, h:0.46, isTextBox:true, margin:0,
    fontFace:B, fontSize:8.4, color:GREY, lineSpacing:10 });
});

/* ---------- the product, on screen ---------- */
s.addImage({ path:`${IMG}/home.jpg`,    x:M,        y:6.12, w:3.55, h:2.00 });
s.addImage({ path:`${IMG}/nitaqat.jpg`, x:M+3.68,   y:6.12, w:3.55, h:2.00 });
s.addText('The officer dashboard and the Nitaqat band position. Representative of the Saudi configuration.',
  { x:M, y:8.15, w:CW, h:0.18, isTextBox:true, margin:0, fontFace:B, fontSize:7.4, color:'96A3AE' });

/* ---------- proof strip ---------- */
s.addShape(p.ShapeType.roundRect, { x:M, y:8.45, w:CW, h:0.78, rectRadius:0.06, fill:{ color:INK } });
[['1,930','permit cases a year at 1,000 employees'],['23,160','tracked tasks, each with an owner'],
 ['7','Saudi authorities covered'],['6','more Gulf countries ready']]
 .forEach((t, i) => {
   const x = M + 0.22 + i*1.78;
   s.addText(t[0], { x, y:8.56, w:1.66, h:0.28, isTextBox:true, margin:0,
     fontFace:H, fontSize:15, bold:true, color:TEAL });
   s.addText(t[1], { x, y:8.84, w:1.66, h:0.30, isTextBox:true, margin:0,
     fontFace:B, fontSize:7.2, color:'9FB6CC', lineSpacing:8.6 });
 });

/* ---------- platform ---------- */
s.addText('WHAT IT RUNS ON', { x:M, y:9.40, w:CW, h:0.20, isTextBox:true, margin:0,
  fontFace:B, fontSize:8.5, bold:true, color:SAPB, charSpacing:1.8 });
s.addShape(p.ShapeType.roundRect, { x:M, y:9.62, w:CW, h:0.72, rectRadius:0.06,
  fill:{ color:SAPB_L }, line:{ color:'BBD6F2', width:0.75 } });
s.addText('SAP BTP, Cloud Foundry runtime   ·   SAP HANA Cloud   ·   SAP Build Work Zone   ·   SAP Build Process Automation\nSAP Integration Suite   ·   SAP Document Management service   ·   SAP Alert Notification service   ·   SAP Cloud Identity Services',
  { x:M+0.16, y:9.62, w:CW-0.32, h:0.72, isTextBox:true, margin:0, fontFace:B, fontSize:8.6,
    bold:true, color:INK, align:'center', valign:'middle', lineSpacing:13 });

/* ---------- honest note + contact ---------- */
s.addText([
  { text:'On government access. ', options:{ bold:true, color:INK } },
  { text:'Portal access is granted to the employer under its own establishment registration, never to a software vendor. Every connector is built and waits on the credential the customer obtains.',
    options:{ color:GREY } },
], { x:M, y:10.44, w:CW, h:0.30, isTextBox:true, margin:0, fontFace:B, fontSize:8, lineSpacing:9.8 });

s.addShape(p.ShapeType.roundRect, { x:M, y:10.80, w:CW, h:0.60, rectRadius:0.06, fill:{ color:BG } });
s.addText('INK IT Business Solutions', { x:M+0.20, y:10.88, w:2.5, h:0.22, isTextBox:true, margin:0,
  fontFace:H, fontSize:11, bold:true, color:INK });
s.addText('Riyadh · Dubai · inkitsolutions.com', { x:M+0.20, y:11.10, w:2.55, h:0.20, isTextBox:true,
  margin:0, fontFace:B, fontSize:8.2, color:GREY });
s.addText('adeel.ashraf@inkitsolutions.com   ·   +966 54 617 7071', { x:M+2.75, y:10.88, w:3.01, h:0.22,
  isTextBox:true, margin:0, fontFace:B, fontSize:8.2, bold:true, color:INK, align:'right', valign:'middle' });
s.addText('rabab.alomani@inkitsolutions.com · info@inkitsolutions.com', { x:M+2.75, y:11.10, w:3.01, h:0.22,
  isTextBox:true, margin:0, fontFace:B, fontSize:7.2, color:GREY, align:'right', valign:'middle' });
s.addShape(p.ShapeType.roundRect, { x:M+CW-1.42, y:10.88, w:1.26, h:0.44, rectRadius:0.05,
  fill:{ color:WHITE }, line:{ color:'BBD6F2', width:0.9 } });
s.addText('[ SAP partner\nbadge ]', { x:M+CW-1.42, y:10.88, w:1.26, h:0.44, isTextBox:true, margin:0,
  fontFace:B, fontSize:6.6, bold:true, color:SAPB, align:'center', valign:'middle', lineSpacing:7.6 });

p.writeFile({ fileName: 'INK_IT_VisaPermits_KSA_Brochure.pptx' }).then(f => console.log('WROTE', f));
