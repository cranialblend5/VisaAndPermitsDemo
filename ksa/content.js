var CHAPTERS=[
  {id:"ch1",n:"01",t:"The problem"},
  {id:"ch2",n:"02",t:"Who does the work"},
  {id:"ch3",n:"03",t:"The journey map"},
  {id:"ch4",n:"04",t:"Walk a permit"},
  {id:"ch5",n:"05",t:"Exit & re-entry"},
  {id:"ch6",n:"06",t:"Saudization"},
  {id:"ch7",n:"07",t:"Tasks & accountability"},
  {id:"ch8",n:"08",t:"The money trail"},
  {id:"ch9",n:"09",t:"Healthcare permits"},
  {id:"ch10",n:"10",t:"Architecture"},
  {id:"ch11",n:"11",t:"SAP BTP services"},
  {id:"ch12",n:"12",t:"The value"}
];

var PERSONAS=[
{face:"rashid",nm:"Rashid Al Mutairi",ro:"Government Relations Officer",loc:"Riyadh",
 q:"Qiwa, Muqeem and Absher used to be three tabs and a notebook. Now it is one queue, and I can show you exactly what I did and when.",
 does:["Picks up cases from the queue, or takes them when a supervisor assigns them",
  "Requests block visas once the Nitaqat band allows it",
  "Assigns visas to named candidates and tracks Enjaz stamping",
  "Authenticates the employment contract in Qiwa before entry",
  "Issues the Iqama through Muqeem inside the 90-day window from arrival",
  "Applies for exit and re-entry visas, single or multiple, and records the fee",
  "Watches the return-by dates for everyone currently outside the Kingdom",
  "Runs Iqama renewals, levy payments and medical insurance",
  "Handles sponsorship transfers and profession changes in Qiwa",
  "Logs every SADAD payment with its reference and receipt as he makes it"],
 sees:["One queue sorted by priority and by what is due first",
  "Which authority each step belongs to, without having to remember",
  "Everyone outside the Kingdom and how many days until they must return",
  "Whether the band permits a renewal before he pays a fee",
  "Every payment on a case with the receipts attached"],
 wins:["No more reconstructing what happened from three portals and a notebook",
  "The 90-day clock is counted for him",
  "Return-by dates are calculated from the recorded departure, not guessed",
  "His work is on the record, with his name and a timestamp"]},
{face:"noura",nm:"Noura Al Shehri",ro:"Recruiter",loc:"Talent acquisition",
 q:"I can see whether we even have a visa before I make someone an offer. That used to be a phone call and a hope.",
 does:["Checks block visa availability before committing to a candidate",
  "Completes the candidate file and document checklist at offer",
  "Releases accepted candidates into the visa process from SF Recruiting",
  "Agrees the Qiwa profession code with the PRO before submission",
  "Keeps the candidate informed through Enjaz stamping and travel"],
 sees:["Which of her candidates have a visa in flight and where it has reached",
  "Whether the band allows a new block visa this cycle",
  "How long the last few cases actually took, by establishment"],
 wins:["Offers are made against visas that exist",
  "Candidates stop dropping out during an unexplained silence",
  "Joining dates are based on real progress instead of hope"]},
{face:"aisha",nm:"Aisha Al Harbi",ro:"Onboarding Coordinator",loc:"Riyadh",
 q:"The day someone lands, a clock starts. I used to find out about it late. Now it is a task with a date on it.",
 does:["Records the arrival date, which starts the statutory Iqama window",
  "Chases medical appointments and biometric bookings",
  "Confirms the Qiwa contract is authenticated before anything else moves",
  "Registers Saudi national hires with GOSI and enrols them in Mudad",
  "Collects the documents SCFHS needs for clinical staff, early"],
 sees:["Every new joiner with their days-remaining on the Iqama clock",
  "Which documents are still outstanding and from whom",
  "When the Iqama lands, so day-one logistics can start"],
 wins:["Nobody works without the paperwork that makes it legal",
  "Reminders go to candidates every two days without her writing them",
  "The onboarding clock and the statutory clock are the same clock"]},
{face:"khalid",nm:"Khalid Al Dosari",ro:"HR Business Partner",loc:"Employee relations",
 q:"I get told before a resignation moves our band, not after Qiwa refuses the next visa.",
 does:["Approves exit and re-entry requests against dues, loans and notice",
  "Reviews the Nitaqat impact of a resignation or a restructure before it is actioned",
  "Verifies renewal contracts before they go to the employee",
  "Starts the final exit once end of service is settled",
  "Picks up escalations when an employee has not acted"],
 sees:["The band headroom for his business unit, and what would erode it",
  "Which employees are outside the Kingdom and due back",
  "Iqama expiry horizon across his population"],
 wins:["Escalations arrive before the consequence, not after",
  "Resignation conversations include the compliance impact",
  "Final exit cannot start until dues are properly cleared"]},
{face:"yousef",nm:"Yousef Al Amri",ro:"Employee",loc:"Maintenance technician",
 q:"I know when my Iqama expires and when I have to be back. I can see it, and I can see they received my documents.",
 does:["Requests exit and re-entry with his travel dates in self-service",
  "Confirms his medical and biometric appointments",
  "Signs the Qiwa employment contract",
  "Uploads documents when they are asked for",
  "Confirms he has received his renewed Iqama"],
 sees:["His own Iqama expiry, six weeks ahead",
  "His return-by date while he is outside the Kingdom",
  "What is waiting on him, and confirmation that uploads arrived"],
 wins:["No wondering whether HR got the document",
  "A reminder before his Iqama expires, not after",
  "A clear record when a delay was never his fault"]},
{face:"fatima",nm:"Fatima Al Ghamdi",ro:"Finance Controller",loc:"Payments and GL",
 q:"The expat levy stopped being a surprise. I can see the renewal calendar and the cost that comes with it.",
 does:["Reconciles SADAD payments against receipts from the payment report",
  "Posts permit costs to the right GL accounts as journals",
  "Forecasts expat levy against the Iqama renewal calendar",
  "Reviews fee spend by establishment and by fee type"],
 sees:["Every payment filtered by establishment, process, fee type or date",
  "The SADAD reference and receipt against each line",
  "Levy exposure for the coming quarters"],
 wins:["Duplicate payments are stopped at entry instead of found at audit",
  "The levy is budgeted rather than absorbed",
  "Cost of compliance per establishment is a number, not an estimate"]},
{face:"omar",nm:"Omar Al Rasheed",ro:"Head of HR",loc:"Governance and risk",
 q:"I can answer a board question about our Nitaqat position and our exposure from one screen.",
 does:["Watches band position across every establishment",
  "Reviews Saudization strategy against Vision 2030 commitments",
  "Signs off the localisation hiring plan and its visa consequences",
  "Approves policy changes to workflows and thresholds"],
 sees:["Band and headroom per establishment, not just for the group",
  "What the band is currently blocking, in plain terms",
  "Iqama expiry and levy cost across the whole workforce",
  "How much work each officer is carrying"],
 wins:["Compliance risk becomes a dashboard instead of a fire drill",
  "Localisation planning has numbers behind it",
  "Adding an establishment does not mean rebuilding governance"]}
];

var PROCESSES=[
{id:"new",nm:"New Work Visa & Iqama",sub:"Candidate to legally working",shot:"web/process-new.webp",
 shotcap:"Work Visa · New · process board for a live case",
 shotalt:"The process board for a new Saudi work visa and Iqama, showing twelve steps from block visa allocation through Qiwa contract authentication and Iqama issuance to handover.",
 steps:[
  {t:"Block Visa Allocation",o:"PRO · gated by Nitaqat",d:"Before anything else, the band is checked. If the establishment is in the wrong band, Qiwa will not issue a block visa and there is no point starting. Where visas are available, one is allocated against the establishment file.",m:[["Gate","Nitaqat band must allow it"],["Authority","Qiwa (MHRSD)"],["If blocked","Case held, HR notified"]],tags:[["","Establishment file"],["pay","Block visa fee"]]},
  {t:"Visa Authorisation",o:"PRO / GRO",d:"The block visa is assigned to a named candidate and the authorisation number is issued, ready for the embassy.",m:[["Authority","Qiwa"],["Captured","Visa authorisation number"],["Next","Enjaz in country of origin"]],tags:[["","Candidate passport"],["att","Authorisation document"]]},
  {t:"Enjaz & Embassy Stamping",o:"Candidate · tracked by PRO",d:"The candidate applies through Enjaz and has the visa stamped at the Saudi mission in their country. Sent and received dates are both captured, so any wait is attributable.",m:[["Waiting on","The candidate"],["Captured","Stamped date, entry validity"],["If it stalls","Reminder every 2 days"]],tags:[["att","Stamped visa page"],["pay","Enjaz fee"]]},
  {t:"Qiwa Employment Contract",o:"PRO / GRO",d:"The digital employment contract is created and authenticated in Qiwa. This has to be right before entry, because the contract terms are what the Iqama and every later service hang off.",m:[["Authority","Qiwa"],["Captured","Contract number, salary, profession"],["Blocking","Receipt required to submit"]],tags:[["pay","Contract fee, VAT"],["pay","SADAD reference"],["att","Authenticated contract"]],shot:"web/form-qiwa.webp",shotcap:"Milestone form · Qiwa Employment Contract Authentication",shotalt:"A milestone form capturing Qiwa contract number, start date, duration, profession, salary and allowances, with mandatory SADAD payment fields and an upload for the authenticated contract."},
  {t:"Arrival & Entry Record",o:"Onboarding",d:"The arrival date is recorded, and that is what starts the statutory window to issue the Iqama. The countdown is visible from this moment on every screen that shows the case.",m:[["Starts","The statutory Iqama window"],["Owner","Onboarding"],["Visible","Days remaining on the case"]],tags:[["","Entry stamp"],["","Arrival date"]]},
  {t:"Medical Examination",o:"Employee · tracked by PRO",d:"The medical is booked at an approved centre and the result recorded. A fit result releases the next step; anything else routes to the HRBP rather than drifting.",m:[["Outcome","Fit or unfit"],["Reminder","Every 2 days until attended"],["If unfit","Routed to HRBP"]],tags:[["pay","Medical fee"],["att","Medical report"]]},
  {t:"Biometrics & Absher",o:"Employee · tracked by PRO",d:"Fingerprints are captured and the employee's Absher account is activated, which is how they will see everything you do on Muqeem from here on.",m:[["Authority","MoI / Absher"],["Owner","Employee, chased by PRO"],["Result","Absher account active"]],tags:[["","Biometric appointment"],["att","Confirmation"]]},
  {t:"Iqama Issuance (Muqeem)",o:"PRO / GRO",d:"The Iqama is issued through Muqeem. Number, issue date, expiry and profession are recorded and written back to Employee Central, so your HR system and the government agree.",m:[["Authority","Muqeem"],["Captured","Iqama number and expiry"],["Writes back","Employee Central"]],tags:[["pay","Iqama issue fee"],["pay","Expat levy"],["att","Iqama copy"]]},
  {t:"GOSI Registration",o:"Onboarding",d:"The employee is registered with the General Organization for Social Insurance. For Saudi nationals this is the step that makes them count towards your Nitaqat ratio.",m:[["Authority","GOSI"],["Nitaqat","Saudi hires count from here"],["Owner","Onboarding"]],tags:[["","GOSI number"],["att","Registration confirmation"]]},
  {t:"Mudad Wage Protection",o:"Finance · with HR",d:"Payroll enrolment confirmed so salary payments are visible to the wage protection system, which is itself a compliance check the authorities run against you.",m:[["Authority","Mudad"],["Owner","Finance"],["Checked","Salary matches the Qiwa contract"]],tags:[["","Payroll enrolment"]]},
  {t:"Nitaqat Recount",o:"System · reviewed by HR",d:"Headcount is updated and the band position recalculated, so you see the effect of this hire on your ratio immediately rather than at the next Qiwa cycle.",m:[["Recalculated","On every hire and leaver"],["Shows","New ratio and headroom"],["Alerts","If the band is close to moving"]],tags:[["","Weighted headcount"]]},
  {t:"Handover & Confirmation",o:"PRO · employee confirms",d:"The Iqama is handed over, the employee confirms receipt, and the case closes. Expiry is now tracked automatically and the renewal will be raised six weeks before it matters.",m:[["Closes with","Employee confirmation"],["Starts","Renewal tracking"],["Recorded","Handover date"]],tags:[["att","Signed handover"],["","Iqama expiry"]]}]},
{id:"renew",nm:"Iqama Renewal",sub:"Annual, and it clusters",shot:"web/process-renew.webp",
 shotcap:"Iqama · Renewal · process board for a live case",
 shotalt:"The process board for an Iqama renewal, showing eight steps from expiry alert and Nitaqat gate check through levy and fee payment to Employee Central update.",
 steps:[
  {t:"Expiry Alert",o:"System",d:"Raised six weeks ahead to the employee, the PRO and the HRBP together. Renewals cluster around hiring dates, so the calendar view matters as much as the individual alert.",m:[["Raised","6 weeks before expiry"],["Notified","Employee, PRO, HRBP"],["Escalates","At 2 weeks"]],tags:[["","Renewal calendar"]]},
  {t:"Nitaqat Gate Check",o:"System · reviewed by HR",d:"The band is checked before any money is spent. If the establishment has fallen into a band that blocks renewals, paying the levy first would simply waste it.",m:[["Gate","Band must permit renewal"],["Prevents","Paying fees that cannot be used"],["If blocked","Escalated to HR immediately"]],tags:[["","Band position"]]},
  {t:"Qiwa Contract Validity",o:"PRO / GRO",d:"The employment contract has to be current and authenticated in Qiwa. An expired or unauthenticated contract will stop the renewal at Muqeem.",m:[["Authority","Qiwa"],["Checked","Contract still valid"],["If expired","Contract renewed first"]],tags:[["att","Contract copy"]]},
  {t:"Levy & Iqama Fees",o:"PRO · finance visibility",d:"The expat levy and the Iqama fee are paid through SADAD. This is the largest recurring cost in the Saudi permit lifecycle and it is forecast against the renewal calendar rather than discovered.",m:[["Paid via","SADAD"],["Forecast","Against renewal calendar"],["Blocking","Receipt required"]],tags:[["pay","Expat levy"],["pay","Iqama renewal fee"],["att","SADAD receipt"]]},
  {t:"Medical Insurance",o:"HR · with PRO",d:"Cover is renewed and the certificate attached. Without valid insurance the Iqama renewal will not complete.",m:[["Required for","Iqama renewal"],["Captured","Policy number, validity"],["Owner","HR with the PRO"]],tags:[["pay","Insurance premium"],["att","Insurance certificate"]]},
  {t:"Muqeem Renewal",o:"PRO / GRO",d:"The Iqama is renewed on Muqeem and the new expiry recorded. The employee sees it in Absher on the same day.",m:[["Authority","Muqeem"],["Captured","New expiry date"],["Employee sees","Absher updated"]],tags:[["att","Renewed Iqama"]]},
  {t:"Employee Central Update",o:"System",d:"The new expiry is written back to SuccessFactors so your HR system and the government record agree, and the next renewal alert is scheduled from the correct date.",m:[["Writes back","Employee Central"],["Schedules","Next renewal alert"],["Prevents","Records drifting apart"]],tags:[["","Iqama expiry"]]},
  {t:"Employee Confirmation",o:"Employee",d:"The employee confirms they have the renewed Iqama, and the case closes.",m:[["Closes with","Employee confirmation"],["Reminder","Every 2 days if not confirmed"],["Recorded","Confirmation date"]],tags:[["","Confirmation"]]}]},
{id:"exit",nm:"Exit & Re-entry",sub:"The one that bites",shot:"web/process-exit.webp",
 shotcap:"Work Visa · Exit & Re-entry · process board with the return-by date",
 shotalt:"The process board for exit and re-entry, showing nine steps from employee request and manager approval through the Muqeem application and fee payment to return monitoring and re-entry confirmation.",
 steps:[
  {t:"Employee Request",o:"Employee · self-service",d:"The employee raises the request with their travel dates and reason. Getting the dates from the person travelling, rather than second hand, is what makes the return-by calculation trustworthy.",m:[["Raised by","The employee"],["Captured","Departure and return dates"],["Channel","Self-service"]],tags:[["","Travel dates"]]},
  {t:"Line Manager Approval",o:"Line manager",d:"The absence is approved against the leave calendar, so an exit re-entry cannot be issued for time the business has not agreed to.",m:[["Approver","Line manager"],["Checked","Against leave calendar"],["Reminder","Every 2 days"]],tags:[["","Approval"]]},
  {t:"HR Eligibility Check",o:"HRBP",d:"Iqama validity, outstanding dues, loans and notice period are all checked. An employee whose Iqama expires while they are abroad cannot re-enter on it, whatever the exit visa says.",m:[["Checked","Iqama validity vs travel"],["Checked","Dues and loans"],["Blocks","If Iqama expires abroad"]],tags:[["","Eligibility"]]},
  {t:"Muqeem Application",o:"PRO / GRO",d:"The PRO applies on Muqeem, choosing single or multiple and the duration. The choice is recorded because the cost and the risk differ, and the wrong one is expensive either way.",m:[["Authority","Muqeem"],["Choice","Single or multiple"],["Captured","Duration requested"]],tags:[["","Visa type"],["att","Application"]]},
  {t:"Fee Payment",o:"PRO / GRO",d:"The SADAD fee is paid and the receipt captured in the step, like every other government payment.",m:[["Paid via","SADAD"],["Blocking","Receipt required to submit"],["Posted","To GL"]],tags:[["pay","Exit re-entry fee"],["pay","SADAD reference"],["att","Receipt"]]},
  {t:"Visa Issued",o:"PRO / GRO",d:"The visa number and its validity window are recorded against the employee, and the employee can see it in Absher.",m:[["Captured","Visa number"],["Captured","Validity window"],["Employee sees","Absher"]],tags:[["att","Visa copy"]]},
  {t:"Departure Recorded",o:"PRO · confirmed by employee",d:"This is the step everything hinges on. The actual departure date is recorded, and the return-by clock is calculated from that, not from the application date. Getting this wrong by a week is how people get stranded.",m:[["Starts","The return-by clock"],["Calculated from","Actual departure"],["Visible","Days remaining"]],tags:[["","Departure date"]]},
  {t:"Return Monitoring",o:"System · escalates to HR",d:"Alerts fire at 14, 7 and 2 days before the visa expires, to the employee, the line manager and the HRBP. If the date passes, the case escalates while the employee is still abroad and something can still be done.",m:[["Alerts","14, 7 and 2 days"],["Notified","Employee, manager, HRBP"],["If overdue","Escalated immediately"]],tags:[["","Return-by date"]]},
  {t:"Re-entry Confirmed",o:"PRO",d:"Arrival is recorded, the Iqama remains valid, and the case closes cleanly.",m:[["Recorded","Actual return date"],["Result","Iqama remains valid"],["Closes","The case"]],tags:[["","Return date"]]}]},
{id:"transfer",nm:"Sponsorship Transfer",sub:"Hiring someone already here",shot:"web/queue-new.webp",
 shotcap:"Work Visa · queue · cases claimed and in progress",
 shotalt:"The work visa queue showing case cards for candidates with visa type, establishment, profession and nationality, a running status pill and an assign to yourself action.",
 steps:[
  {t:"Candidate Status Check",o:"PRO / GRO",d:"The candidate's current employer, contract and Iqama status are checked in Qiwa before anything is promised. Transfers fail on details that are visible up front.",m:[["Authority","Qiwa"],["Checked","Current contract and status"],["No","Block visa or entry visa needed"]],tags:[["","Qiwa status"]]},
  {t:"Nitaqat Impact Check",o:"System · reviewed by HR",d:"A transfer in consumes a slot in your ratio the moment it completes. The band impact is shown before the request is raised, not after it lands.",m:[["Shows","Band impact before commit"],["Consumes","A Nitaqat slot"],["Alerts","If it moves the band"]],tags:[["","Band forecast"]]},
  {t:"Transfer Request",o:"PRO / GRO",d:"The transfer is raised in Qiwa under the current rules, and the fee is paid through SADAD.",m:[["Authority","Qiwa"],["Paid via","SADAD"],["Tracked","To approval or rejection"]],tags:[["pay","Transfer fee"],["att","Receipt"]]},
  {t:"New Qiwa Contract",o:"PRO / GRO",d:"A new employment contract is created and authenticated under your establishment, with the agreed salary and profession.",m:[["Authority","Qiwa"],["Captured","Contract number, salary"],["Signed by","The employee"]],tags:[["att","Authenticated contract"]]},
  {t:"Iqama Updated (Muqeem)",o:"PRO / GRO",d:"The Iqama is moved to your establishment on Muqeem and the details written back to Employee Central.",m:[["Authority","Muqeem"],["Updated","Sponsor and profession"],["Writes back","Employee Central"]],tags:[["att","Updated Iqama"]]},
  {t:"GOSI & Mudad Update",o:"Onboarding · with finance",d:"Social insurance and wage protection records move across, and the transfer is complete.",m:[["Authorities","GOSI and Mudad"],["Owner","Onboarding"],["Closes","The case"]],tags:[["","Registration update"]]}]},
{id:"final",nm:"Final Exit",sub:"Clean departure",shot:"web/report-iqama.webp",
 shotcap:"Report · Iqama renewal and expiry tracking",
 shotalt:"The Iqama renewal report with filters, listing employees with their establishment, profession, Iqama expiry, days to expiry, levy due, assigned agent and status.",
 steps:[
  {t:"End of Service Settled",o:"HRBP · with finance",d:"Final exit cannot start until end-of-service benefits are calculated and agreed. If the employee has not accepted the settlement, the case is held rather than pushed through.",m:[["Gate","Settlement agreed first"],["If not agreed","Case held"],["Owner","HRBP with finance"]],tags:[["","Settlement"]]},
  {t:"Dues & Loans Clearance",o:"Finance",d:"Outstanding loans, advances and company property are cleared. Anything unresolved here becomes unrecoverable the moment the employee leaves.",m:[["Checked","Loans, advances, assets"],["Owner","Finance"],["Blocks","Until cleared"]],tags:[["","Clearance"]]},
  {t:"Qiwa Contract Termination",o:"PRO / GRO",d:"The employment contract is terminated in Qiwa with the correct reason code, which matters for both the employee's record and your own.",m:[["Authority","Qiwa"],["Captured","Termination reason"],["Affects","Employee's future transfers"]],tags:[["att","Termination record"]]},
  {t:"Final Exit Visa (Muqeem)",o:"PRO / GRO",d:"The final exit visa is issued on Muqeem with its validity window, and the fee is captured.",m:[["Authority","Muqeem"],["Captured","Visa validity window"],["Paid via","SADAD"]],tags:[["pay","Final exit fee"],["att","Receipt"]]},
  {t:"Departure & Iqama Cancellation",o:"PRO / GRO",d:"Departure is confirmed and the Iqama is cancelled. Leaving it live after someone has gone is a liability that sits on your establishment file.",m:[["Recorded","Departure date"],["Result","Iqama cancelled"],["Removes","Liability from the file"]],tags:[["","Departure"]]},
  {t:"Nitaqat & Records Update",o:"System · notified to HR",d:"Headcount and band position are recalculated, GOSI is updated, and Employee Central is notified so the separation is complete everywhere at once.",m:[["Recalculated","Band position"],["Updated","GOSI, Employee Central"],["Notified","HR and finance"]],tags:[["","Headcount update"]]}]}
];
/* ================= HELPERS ================= */
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function shotBlock(src,cap,alt,note){
  var h='<div class="shot"><div class="shot-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span>'
       +'<span class="shot-cap">'+esc(cap)+'</span></div>'
       +'<img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy">';
  if(note)h+='<div class="shot-note">'+note+'</div>';
  return h+'</div>';
}

/* ================= CHAPTER NAV ================= */
var nav=document.getElementById("chapnav");
CHAPTERS.forEach(function(c){
  var b=el("button","chip",'<b>'+c.n+'</b>'+esc(c.t));
  b.type="button";b.dataset.target=c.id;
  b.addEventListener("click",function(){
    var t=document.getElementById(c.id);
    if(t)t.scrollIntoView({block:"start"});
  });
  nav.appendChild(b);
});

/* ================= PERSONAS ================= */
var pTabs=document.getElementById("personaTabs"),pBody=document.getElementById("personaBody");
function renderPersona(i){
  var p=PERSONAS[i];
  pBody.innerHTML=
    '<div class="persona-head">'
   +'<span class="persona-face">'+FACES[p.face]+'</span>'
   +'<span class="persona-id"><h3>'+esc(p.nm)+'</h3>'
   +'<span class="persona-role">'+esc(p.ro)+' <b>\u00b7 '+esc(p.loc)+'</b></span>'
   +'<p class="persona-quote">&ldquo;'+esc(p.q)+'&rdquo;</p></span></div>'
   +'<div class="persona-cols">'
   +'<div class="pcol"><h4>What they do</h4><ul class="plist">'+p.does.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>'
   +'<div class="pcol"><h4>What they can finally see</h4><ul class="plist">'+p.sees.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>'
   +'<div class="pcol"><h4>What stops being their problem</h4><ul class="plist win">'+p.wins.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>'
   +'</div>';
  Array.prototype.forEach.call(pTabs.children,function(b,j){b.setAttribute("aria-selected",j===i?"true":"false");});
}
PERSONAS.forEach(function(p,i){
  var b=el("button","ptab",'<span class="ptab-ini">'+FACES[p.face]+'</span><span><span class="ptab-nm">'+esc(p.nm)+'</span><span class="ptab-ro">'+esc(p.ro)+'</span></span>');
  b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",i===0?"true":"false");
  b.addEventListener("click",function(){renderPersona(i);});
  pTabs.appendChild(b);
});
renderPersona(0);

/* ================= PROCESS EXPLORER ================= */
var pexTabs=document.getElementById("pexTabs"),
    pexTrack=document.getElementById("pexTrack"),
    pexDetail=document.getElementById("pexDetail"),
    curProc=0,curStep=0;

function renderDetail(){
  var pr=PROCESSES[curProc],s=pr.steps[curStep];
  var src=s.shot||pr.shot, cap=s.shotcap||pr.shotcap, alt=s.shotalt||pr.shotalt;
  pexDetail.innerHTML=
    '<span class="pd-owner">'
   +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>'
   +esc(s.o)+'</span>'
   +'<h3 class="pd-h">'+esc(s.t)+'</h3>'
   +'<p class="pd-desc">'+esc(s.d)+'</p>'
   +'<div class="pd-meta">'+s.m.map(function(m){
       return '<div class="pd-m"><span>'+esc(m[0])+'</span><b>'+esc(m[1])+'</b></div>';}).join("")
   +'</div>'
   +(s.tags&&s.tags.length?'<div class="pd-capt">'+s.tags.map(function(t){
       return '<span class="tagx '+t[0]+'">'+esc(t[1])+'</span>';}).join("")+'</div>':"")
   +shotBlock(src,cap,alt,null);
  Array.prototype.forEach.call(pexTrack.children,function(b,j){
    b.setAttribute("aria-current",j===curStep?"true":"false");});
}
function renderTrack(){
  var pr=PROCESSES[curProc];
  pexTrack.innerHTML="";
  pr.steps.forEach(function(s,i){
    var b=el("button","mstep",'<span class="mstep-n">'+(i+1)+'</span>'
      +'<span><span class="mstep-t">'+esc(s.t)+'</span><span class="mstep-o">'+esc(s.o)+'</span></span>');
    b.type="button";b.setAttribute("role","tab");
    b.addEventListener("click",function(){curStep=i;renderDetail();});
    pexTrack.appendChild(b);
  });
  renderDetail();
}
PROCESSES.forEach(function(pr,i){
  var b=el("button","pex-tab",esc(pr.nm)+'<small>'+esc(pr.sub)+' · '+pr.steps.length+' milestones</small>');
  b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",i===0?"true":"false");
  b.addEventListener("click",function(){
    curProc=i;curStep=0;
    Array.prototype.forEach.call(pexTabs.children,function(x,j){x.setAttribute("aria-selected",j===i?"true":"false");});
    renderTrack();
  });
  pexTabs.appendChild(b);
});
renderTrack();


/* ================= LIGHTBOX ================= */
var lb=document.getElementById("lightbox"),lbImg=document.getElementById("lbImg"),lbClose=document.getElementById("lbClose");
document.addEventListener("click",function(e){
  var t=e.target;
  if(t&&t.tagName==="IMG"&&t.closest(".shot")){
    lbImg.src=t.currentSrc||t.src;lbImg.alt=t.alt||"";lb.hidden=false;
    document.body.style.overflow="hidden";
  }
});
function closeLb(){lb.hidden=true;lbImg.src="";document.body.style.overflow="";}
lb.addEventListener("click",closeLb);
lbClose.addEventListener("click",function(e){e.stopPropagation();closeLb();});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!lb.hidden)closeLb();});

/* ================= SCROLL PROGRESS + ACTIVE CHAPTER ================= */
var prog=document.getElementById("prog"),chips=nav.children,
    secs=CHAPTERS.map(function(c){return document.getElementById(c.id);}),
    ticking=false;
function onScroll(){
  var h=document.documentElement,
      max=h.scrollHeight-h.clientHeight,
      pct=max>0?(h.scrollTop/max)*100:0;
  prog.style.width=pct.toFixed(2)+"%";
  var mark=h.scrollTop+h.clientHeight*0.32,active=-1;
  secs.forEach(function(s,i){if(s&&s.offsetTop<=mark)active=i;});
  for(var i=0;i<chips.length;i++)chips[i].setAttribute("aria-current",i===active?"true":"false");
  if(active>-1){
    var c=chips[active],box=nav.getBoundingClientRect(),cb=c.getBoundingClientRect();
    if(cb.left<box.left+8||cb.right>box.right-8)
      nav.scrollTo({left:c.offsetLeft-box.width/2+cb.width/2,behavior:"smooth"});
  }
  ticking=false;
}
window.addEventListener("scroll",function(){
  if(!ticking){ticking=true;window.requestAnimationFrame(onScroll);}
},{passive:true});
window.addEventListener("resize",onScroll,{passive:true});
window.addEventListener("load",onScroll);
onScroll();

/* ================= THEME TOGGLE ================= */
var root=document.documentElement,tBtn=document.getElementById("themeBtn");
try{var saved=localStorage.getItem("vpm-theme");if(saved)root.setAttribute("data-theme",saved);}catch(e){}
tBtn.addEventListener("click",function(){
  var cur=root.getAttribute("data-theme"),next;
  if(cur)next=cur==="dark"?"light":"dark";
  else next=window.matchMedia("(prefers-color-scheme: dark)").matches?"light":"dark";
  root.setAttribute("data-theme",next);
  try{localStorage.setItem("vpm-theme",next);}catch(e){}
});