/* One slide: the INK IT team behind the Visa & Permits build, with contacts.
   Built on its own so it can be copied straight into either deck.
   Names, roles, emails and offices are taken from inkitsolutions.com/leadership
   and inkitsolutions.com/contact-us. */
const pptxgen = require('pptxgenjs');
const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';            // 13.33 x 7.5, same as both decks
p.author  = 'INK IT Business Solutions';
p.company = 'INK IT Business Solutions';
p.title   = 'INK IT — the team';

const INK='0C1E33', TEAL='20A098', TEAL_D='12756F', SAND='C9A227';
const WHITE='FFFFFF', BG='F4F6F7', GREY='5A6C82', GREY_L='E3E7EA';
const H='Arial', B='Calibri', IMG='.';

const s = p.addSlide();
s.background = { color: WHITE };

s.addText('WHO YOU ARE WORKING WITH', { x:0.6, y:0.44, w:12.1, h:0.26, isTextBox:true,
  margin:0, fontFace:B, fontSize:11, bold:true, color:TEAL, charSpacing:2.2 });
s.addText('The people behind this build.', { x:0.6, y:0.72, w:12.1, h:0.62, isTextBox:true,
  margin:0, fontFace:H, fontSize:30, bold:true, color:INK });
s.addText('Four names and one number to call. These are the people you deal with from the first workshop to the day it goes live.', {
  x:0.6, y:1.36, w:11.4, h:0.30, isTextBox:true, margin:0, fontFace:B, fontSize:13, color:GREY });

const team = [
  ['sekhar-round.png','Sekhar Dash','Senior VP, Sales EMEA',
   'Owns the commercial relationship across the region.','sekhar.dash@inkitsolutions.com'],
  ['adeel-round.png','Adeel Ashraf','SVP, KSA Country Head & CTO',
   'Runs the Saudi business and signs off the architecture.','adeel.ashraf@inkitsolutions.com'],
  ['rabab-round.png','Rabab Alomani','Director, Sales KSA',
   'Your day-to-day contact on the ground in Riyadh.','rabab.alomani@inkitsolutions.com'],
  ['sendil-round.png','Sendil Balasubramanian','Principal Consultant',
   'Built this application and leads the delivery.','sendil.balasubramanian@inkitsolutions.com']
];
const tw = 2.92, gap = 0.17;
team.forEach((t, i) => {
  const x = 0.6 + i*(tw+gap);
  s.addShape(p.ShapeType.roundRect, { x, y:1.86, w:tw, h:3.42, rectRadius:0.08,
    fill:{color:WHITE}, line:{color:GREY_L, width:0.9} });
  s.addImage({ path:`${IMG}/${t[0]}`, x:x+0.73, y:2.06, w:1.46, h:1.46 });
  s.addText(t[1], { x:x+0.06, y:3.68, w:tw-0.12, h:0.30, isTextBox:true, margin:0,
    fontFace:H, fontSize:12.5, bold:true, color:INK, align:'center' });
  s.addText(t[2], { x:x+0.06, y:3.99, w:tw-0.12, h:0.24, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.6, bold:true, color:TEAL_D, align:'center' });
  s.addText(t[3], { x:x+0.16, y:4.29, w:tw-0.32, h:0.50, isTextBox:true, margin:0,
    fontFace:B, fontSize:9.4, color:GREY, align:'center', lineSpacing:12.2 });
  s.addShape(p.ShapeType.line, { x:x+0.70, y:4.84, w:tw-1.40, h:0, line:{color:GREY_L, width:1} });
  s.addText(t[4], { x:x+0.04, y:4.90, w:tw-0.08, h:0.24, isTextBox:true, margin:0,
    fontFace:B, fontSize:8, color:INK, align:'center' });
});

/* the contact strip */
s.addShape(p.ShapeType.roundRect, { x:0.6, y:5.60, w:12.19, h:1.06, rectRadius:0.08, fill:{color:INK} });
[[0.95,'TALK TO US','info@inkitsolutions.com','inkitsolutions.com'],
 [5.05,'RIYADH','Al Malqa D, Anas Bin Malik, 13521','+966 54 617 7071'],
 [9.05,'DUBAI','502 Bank Street Building, Bur Dubai','+971 50 705 2350']].forEach(c => {
  s.addText(c[1], { x:c[0], y:5.78, w:3.5, h:0.20, isTextBox:true, margin:0,
    fontFace:B, fontSize:8.5, bold:true, color:SAND, charSpacing:1.8 });
  s.addText(c[2], { x:c[0], y:6.00, w:3.55, h:0.24, isTextBox:true, margin:0,
    fontFace:B, fontSize:10.5, bold:true, color:WHITE });
  s.addText(c[3], { x:c[0], y:6.24, w:3.55, h:0.24, isTextBox:true, margin:0,
    fontFace:B, fontSize:10, color:'9FB6CC' });
});

s.addText('INK IT Business Solutions  ·  Visa & Permits Management on SAP BTP',
  { x:0.6, y:7.02, w:9.4, h:0.26, isTextBox:true, margin:0, fontFace:B, fontSize:9, color:'96A3AE' });

s.addNotes('Forty seconds, no more. Name the four people and say which one they will be calling. '
  + 'Adeel is the Saudi country head, so for a Riyadh customer he is the name that matters, and Rabab is on the ground with them. '
  + 'Sendil built the application, which is worth saying out loud in a technical room. Then move on.');

p.writeFile({ fileName: 'INK_IT_Team_Slide.pptx' }).then(f => console.log('WROTE', f));
