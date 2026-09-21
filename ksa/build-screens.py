#!/usr/bin/env python3
"""Generate the KSA configuration screens.

These are representative screens of the same application configured for Saudi
Arabia: Qiwa and Muqeem processes, Iqama lifecycle, exit and re-entry, Nitaqat.
They are built to match the shipped UI so a mixed audience sees one product,
not two. They are mock-ups, not captures of a running KSA tenant, and the
journey and deck both say so.
"""
import pathlib

OUT = pathlib.Path(__file__).resolve().parent / "screens"

SHELL = """<!doctype html><meta charset="utf-8">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font:14px/1.45 -apple-system,'Segoe UI',Arial,sans-serif;background:#F5F6F7;color:#1D2D3E;width:1440px}
.nav{background:#fff;padding:0 26px;display:flex;gap:30px;border-bottom:1px solid #E3E6E8}
.nav a{padding:15px 2px;font-size:14.5px;font-weight:600;color:#3F5265;text-decoration:none;border-bottom:2.5px solid transparent}
.nav a.on{color:#0B5FD9;border-bottom-color:#0B5FD9}
.sub{background:#F5F6F7;padding:12px 26px 0;display:flex;gap:26px;border-bottom:1px solid #E3E6E8}
.sub a{padding:7px 3px 11px;font-size:13.5px;font-weight:600;color:#3F5265;text-decoration:none;border-bottom:2.5px solid transparent}
.sub a.on{color:#0B5FD9;border-bottom-color:#0B5FD9}
.body{padding:20px 26px 26px}
.card{background:#fff;border:1px solid #E3E6E8;border-radius:9px}
.ch{padding:13px 17px;border-bottom:1px solid #EDEFF1;display:flex;align-items:center;justify-content:space-between}
.ch h2{font-size:15.5px;font-weight:700}
.acts{display:flex;gap:15px;align-items:center}
.act{font-size:13px;color:#0B5FD9;font-weight:600;display:flex;gap:5px;align-items:center}
.btn{background:#0B5FD9;color:#fff;border-radius:16px;padding:6px 15px;font-size:12.5px;font-weight:700}
table{width:100%;border-collapse:collapse}
th{font-size:12.5px;font-weight:700;color:#4A5C6E;text-align:left;padding:11px 14px;border-bottom:1px solid #E3E6E8;white-space:nowrap}
td{font-size:13px;padding:11px 14px;border-bottom:1px solid #F0F2F4;color:#243447}
tr:last-child td{border-bottom:none}
.pill{display:inline-block;padding:2px 9px;border-radius:10px;font-size:11.5px;font-weight:700}
.p-run{background:#E3EEFB;color:#0B5FD9}.p-ok{background:#E2F3E9;color:#177D48}
.p-due{background:#FDF0DC;color:#9A6512}.p-late{background:#FBE7E4;color:#B0392C}
.grn{color:#177D48;font-weight:600}.amb{color:#9A6512;font-weight:600}.red{color:#B0392C;font-weight:600}
.agent{background:#F0F2F4;border-bottom:1px dashed #B9C2CB;padding:4px 9px;border-radius:4px;font-size:12.5px;display:inline-block}
.tiles{display:flex;gap:15px}
.tile{flex:1;border-radius:10px;overflow:hidden;border:1px solid #E3E6E8;background:#fff}
.tile .th{padding:13px 15px;background:#fff}
.tile .th b{font-size:14.5px;display:block}.tile .th span{font-size:12.5px;color:#65798C}
.tile .tb{padding:15px;display:flex;gap:15px;align-items:center}
.lg{font-size:12.5px;display:flex;flex-direction:column;gap:7px}
.lg div{display:flex;align-items:center;gap:7px}
.sw{width:11px;height:11px;border-radius:2px;display:inline-block}
.lg b{margin-left:auto;font-variant-numeric:tabular-nums}
.proc{background:#fff;border:1px solid #E3E6E8;border-radius:10px;padding:20px}
.prow{display:flex;align-items:center;gap:0;margin-bottom:15px}
.pt{flex:1;background:#DCE9FB;border-radius:9px;padding:14px 15px;min-height:96px;border:1px solid #CADCF5}
.pt.cur{border:2px solid #0B5FD9;background:#EAF2FD}
.pt.done{background:#E2F3E9;border-color:#BFE3CE}
.pt b{font-size:13.5px;display:block;margin-bottom:6px;line-height:1.3}
.pt span{font-size:11.8px;color:#5A6E82;line-height:1.35;display:block}
.arw{width:40px;text-align:center;color:#8C9AA8;font-size:15px;flex-shrink:0}
.form{background:#fff;border:1px solid #E3E6E8;border-radius:9px;max-width:760px;margin:0 auto}
.fh{padding:14px 20px;border-bottom:1px solid #EDEFF1;border:2px solid #16308C;border-radius:9px 9px 0 0}
.fh b{font-size:16px}
.fb{padding:20px 26px}
.fr{display:flex;align-items:center;gap:14px;margin-bottom:15px}
.fl{width:270px;text-align:right;font-size:13.5px;color:#3F5265;flex-shrink:0}
.fl i{color:#B0392C;font-style:normal;font-weight:700}
.fi{flex:1;border:1px solid #8C9AA8;border-radius:4px;padding:7px 10px;font-size:13px;background:#fff;min-height:33px}
.fi.ro{background:#EDEFF1;border:none;border-bottom:1px dashed #A7B2BC;border-radius:0}
.fi.ph{color:#97A3AE;font-style:italic}
.ff{padding:14px 26px;border-top:1px solid #EDEFF1;display:flex;gap:11px;justify-content:center}
.bsub{background:#0B5FD9;color:#fff;border-radius:16px;padding:7px 20px;font-size:13px;font-weight:700}
.bsv{color:#0B5FD9;border-radius:16px;padding:7px 18px;font-size:13px;font-weight:700}
.bcn{background:#FBE7E4;color:#B0392C;border-radius:16px;padding:7px 18px;font-size:13px;font-weight:700}
.filt{background:#fff;border:1px solid #E3E6E8;border-radius:9px;padding:14px 16px;display:flex;gap:16px;align-items:flex-end;margin-bottom:15px;flex-wrap:wrap}
.fg{display:flex;flex-direction:column;gap:5px}
.fg label{font-size:12px;color:#4A5C6E;font-weight:600}
.fg .fi{width:172px}
.two{display:flex;gap:16px}
.kpi{background:#fff;border:1px solid #E3E6E8;border-radius:10px;padding:16px 18px;flex:1}
.kpi span{font-size:12.5px;color:#65798C;display:block;margin-bottom:5px}
.kpi b{font-size:27px;font-weight:800;letter-spacing:-.02em;font-variant-numeric:tabular-nums;display:block}
.kpi em{font-size:12px;font-style:normal;color:#65798C}
</style>"""


def donut(pct, color="#2E6FD9", track="#DCE9FB", size=92):
    r, c = 34, 2 * 3.14159 * 34
    return (f'<svg width="{size}" height="{size}" viewBox="0 0 90 90">'
            f'<circle cx="45" cy="45" r="{r}" fill="none" stroke="{track}" stroke-width="17"/>'
            f'<circle cx="45" cy="45" r="{r}" fill="none" stroke="{color}" stroke-width="17" '
            f'stroke-dasharray="{c*pct/100:.1f} {c:.1f}" transform="rotate(-90 45 45)"/></svg>')


def nav(active, subs=None, subactive=None):
    items = ["Home", "Work Visa", "Iqama", "Nitaqat", "Report", "Miscellaneous"]
    h = '<div class="nav">' + "".join(
        f'<a class="{"on" if i==active else ""}">{i}</a>' for i in items) + '</div>'
    if subs:
        h += '<div class="sub">' + "".join(
            f'<a class="{"on" if s==subactive else ""}">{s}</a>' for s in subs) + '</div>'
    return h


def page(name, inner):
    (OUT / f"{name}.html").write_text(SHELL + inner, encoding="utf-8")
    return name


def tile(title, sub, running, completed, cancelled, pct, color):
    return f'''<div class="tile"><div class="th"><b>{title}</b><span>{sub}</span></div>
    <div class="tb">{donut(pct, color)}<div class="lg">
      <div><span class="sw" style="background:{color}"></span>Running<b>{running}</b></div>
      <div><span class="sw" style="background:#7FA9E8"></span>Completed<b>{completed}</b></div>
      <div><span class="sw" style="background:#CADCF5"></span>Cancelled<b>{cancelled}</b></div>
    </div></div></div>'''


def steps(rows):
    """rows: list of lists of (title, desc, state)"""
    h = ""
    for row in rows:
        h += '<div class="prow">'
        for i, (t, d, st) in enumerate(row):
            cls = {"done": "pt done", "act": "pt cur"}.get(st, "pt")
            h += f'<div class="{cls}"><b>{t}</b><span>{d}</span></div>'
            if i < len(row) - 1:
                h += '<div class="arw">&#10095;&#10095;</div>'
        h += '</div>'
    return h


def frow(label, value, req=False, ro=False, ph=False):
    star = '<i>*</i>' if req else ''
    cls = "fi ro" if ro else ("fi ph" if ph else "fi")
    return f'<div class="fr"><div class="fl">{label}:{star}</div><div class="{cls}">{value}</div></div>'


# ---------------------------------------------------------------- 1. home
page("home", nav("Home") + f'''<div class="body">
<div class="tiles" style="margin-bottom:16px">
  {tile("New Work Visa &amp; Iqama","Process Status",31,64,3,33,"#2E6FD9")}
  {tile("Iqama Renewal","Process Status",48,212,2,18,"#2E6FD9")}
  {tile("Exit &amp; Re-entry","Process Status",22,341,5,6,"#C9821A")}
  {tile("Final Exit","Process Status",7,58,1,11,"#B0392C")}
</div>
<div class="card"><div class="ch"><h2>Process Initiated</h2><div class="acts">
  <span class="act">Filter</span><span class="act">Assign Agent</span><span class="act">Assign Task</span>
  <span class="btn">Process</span></div></div>
<table><tr><th></th><th>Process Type</th><th>Employee ID</th><th>Establishment</th><th>Start Date</th>
<th>Due Date</th><th>Priority</th><th>Status</th><th>Agent</th></tr>
{"".join(f"""<tr><td>&#9711;</td><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td>
<td>{f}</td><td><span class="pill {g}">{h}</span></td><td><span class="agent">{i}</span></td></tr>"""
 for a,b,c,d,e,f,g,h,i in [
 ("Exit &amp; Re-entry","30014782","RIY-HO (1100)","02/09/26","14/09/26","P1","p-late","OVERDUE","70001188 Rashid A."),
 ("New Work Visa &amp; Iqama","30015904","JED-OPS (1300)","28/08/26","24/09/26","P1","p-run","RUNNING","70001188 Rashid A."),
 ("Iqama Renewal","30011236","RIY-HO (1100)","01/09/26","30/09/26","P2","p-run","RUNNING","70002045 Aisha H."),
 ("Exit &amp; Re-entry","30013471","DMM-PLANT (1500)","09/09/26","19/09/26","P2","p-due","DUE IN 48H","70002045 Aisha H."),
 ("Sponsorship Transfer","30016302","RIY-HO (1100)","11/08/26","","P3","p-ok","COMPLETED","70001188 Rashid A."),
 ("Final Exit","30009915","JED-OPS (1300)","17/08/26","","P2","p-ok","COMPLETED","70002045 Aisha H."),
 ("Iqama Renewal","30014025","DMM-PLANT (1500)","03/09/26","28/09/26","P2","p-run","RUNNING",""),
 ])}
</table></div></div>''')

# ---------------------------------------------------------------- 2. nitaqat
page("nitaqat", nav("Nitaqat", ["Band Position", "Headcount", "Forecast", "Certificate"], "Band Position") + '''<div class="body">
<div class="two" style="margin-bottom:16px">
  <div class="kpi"><span>Current Nitaqat band</span><b style="color:#177D48">Green &#183; Mid</b>
    <em>Recalculated weekly in Qiwa</em></div>
  <div class="kpi"><span>Saudization ratio</span><b>28.4%</b><em>486 Saudi of 1,712 weighted</em></div>
  <div class="kpi"><span>Headroom to next band down</span><b style="color:#9A6512">1.9%</b>
    <em>33 Saudi leavers would drop us to Low</em></div>
  <div class="kpi"><span>Visas blocked if band drops</span><b style="color:#B0392C">All new</b>
    <em>Block visa and transfer suspended</em></div>
</div>
<div class="two">
<div class="card" style="flex:1.4"><div class="ch"><h2>Band position by establishment</h2>
  <span class="act">Export</span></div>
<table><tr><th>Establishment</th><th>Activity</th><th>Saudi</th><th>Non-Saudi</th><th>Ratio</th>
<th>Band</th><th>To next band</th><th>Visa issuance</th></tr>
''' + "".join(f'''<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td>
<td><span class="pill {f}">{g}</span></td><td class="{h}">{i}</td><td class="{j}">{k}</td></tr>''' for
 a,b,c,d,e,f,g,h,i,j,k in [
 ("RIY-HO (1100)","Head office","214","402","34.7%","p-ok","PLATINUM","grn","+6.2% clear","grn","Open"),
 ("JED-OPS (1300)","Distribution","148","612","19.5%","p-ok","GREEN MID","amb","1.9% headroom","grn","Open"),
 ("DMM-PLANT (1500)","Manufacturing","96","584","14.1%","p-due","GREEN LOW","amb","0.4% headroom","amb","At risk"),
 ("ARR-RETAIL (1800)","Retail","28","114","19.7%","p-late","RED","red","Below minimum","red","Suspended"),
 ]) + '''
</table></div>
<div class="card" style="flex:1"><div class="ch"><h2>What the band is blocking today</h2></div>
<table>
<tr><td><b>ARR-RETAIL</b> &#183; Red band</td><td class="red">Block visa suspended</td></tr>
<tr><td>4 Iqama renewals queued</td><td class="red">Cannot renew</td></tr>
<tr><td>2 sponsorship transfers in</td><td class="red">Cannot transfer</td></tr>
<tr><td>1 profession change</td><td class="red">Cannot change</td></tr>
<tr><td><b>DMM-PLANT</b> &#183; 0.4% headroom</td><td class="amb">3 leavers would drop band</td></tr>
<tr><td>Forecast recalculation</td><td class="amb">Fri 25 Sep</td></tr>
<tr><td><b>JED-OPS</b> &#183; 1.9% headroom</td><td class="grn">Stable this cycle</td></tr>
<tr><td><b>RIY-HO</b> &#183; Platinum</td><td class="grn">All services open</td></tr>
</table></div>
</div></div>''')

# ---------------------------------------------------------------- 3. new work visa process board
page("process-new", nav("Work Visa", ["New Work Visa", "Renew Iqama", "Exit &amp; Re-entry", "Final Exit", "Initiate New Request"], "New Work Visa") + '''<div class="body">
<div class="card" style="margin-bottom:16px;padding:15px 18px">
  <div style="display:flex;gap:44px;font-size:13px;color:#3F5265;line-height:1.9">
   <div><b style="color:#1D2D3E;font-size:16px">Mohammed Al Otaibi</b><br>Employee ID: 30015904<br>
     Email: m.alotaibi@example.com<br>Mobile: +966 55 240 1188</div>
   <div>Process: New Work Visa &amp; Iqama<br>Establishment: JED-OPS (1300)<br>
     Profession: Warehouse Supervisor<br>Nationality: Egypt</div>
   <div>Priority: P1<br>Agent: 70001188 Rashid Al Mazrouei<br>
     Initiated: 28 Aug 2026<br>Nitaqat at initiation: Green Mid</div>
  </div></div>
<div class="proc"><div style="font-size:13px;font-weight:700;color:#4A5C6E;letter-spacing:.08em;margin-bottom:14px">PROCESS</div>
''' + steps([
 [("Block Visa Allocation","Confirm visa available against the establishment file","done"),
  ("Visa Authorisation","Assign the block visa to this candidate in Qiwa","done"),
  ("Enjaz &amp; Embassy Stamping","Visa stamped in country of origin","done")],
 [("Qiwa Employment Contract","Digital contract authenticated before entry","act"),
  ("Arrival &amp; Entry Record","Record entry date, start the 90-day Iqama clock",""),
  ("Medical Examination","Fitness test at an approved centre","")],
 [("Biometrics &amp; Absher","Fingerprints captured, Absher account activated",""),
  ("Iqama Issuance (Muqeem)","Iqama issued, number and expiry recorded",""),
  ("GOSI Registration","Employee registered for social insurance","")],
 [("Mudad Wage Protection","Payroll enrolment confirmed",""),
  ("Nitaqat Recount","Headcount updated, band impact checked",""),
  ("Handover &amp; Confirmation","Iqama handed over, employee confirms","")],
]) + '</div></div>')

# ---------------------------------------------------------------- 4. exit & re-entry board
page("process-exit", nav("Work Visa", ["New Work Visa", "Renew Iqama", "Exit &amp; Re-entry", "Final Exit", "Initiate New Request"], "Exit &amp; Re-entry") + '''<div class="body">
<div class="card" style="margin-bottom:16px;padding:15px 18px">
  <div style="display:flex;gap:44px;font-size:13px;color:#3F5265;line-height:1.9">
   <div><b style="color:#1D2D3E;font-size:16px">Abdulrahman Al Zahrani</b><br>Employee ID: 30014782<br>
     Email: a.alzahrani@example.com<br>Mobile: +966 50 771 9034</div>
   <div>Process: Exit &amp; Re-entry<br>Establishment: RIY-HO (1100)<br>
     Visa type: Single &#183; 2 months<br>Iqama expiry: 18 Mar 2027</div>
   <div>Priority: P1<br>Agent: 70001188 Rashid Al Mazrouei<br>
     Travel date: 06 Sep 2026<br><b style="color:#B0392C">Return by: 05 Nov 2026</b></div>
  </div></div>
<div class="proc"><div style="font-size:13px;font-weight:700;color:#4A5C6E;letter-spacing:.08em;margin-bottom:14px">PROCESS</div>
''' + steps([
 [("Employee Request","Travel dates and reason submitted in self-service","done"),
  ("Line Manager Approval","Absence approved against the leave calendar","done"),
  ("HR Eligibility Check","Iqama validity, dues and loans cleared","done")],
 [("Muqeem Application","PRO applies for single or multiple exit re-entry","act"),
  ("Fee Payment","SADAD payment captured with receipt",""),
  ("Visa Issued","Visa number and validity window recorded","")],
 [("Departure Recorded","Exit date confirmed, return-by clock starts",""),
  ("Return Monitoring","Alerts at 14, 7 and 2 days before expiry",""),
  ("Re-entry Confirmed","Arrival recorded, Iqama remains valid","")],
]) + '''</div>
<div class="card" style="margin-top:16px;border-color:#E8C9A0;background:#FDF7EC">
 <div style="padding:14px 18px;font-size:13.2px;color:#6B4E14;line-height:1.55">
 <b style="color:#8A5F12">Why this process carries the most risk in the Kingdom.</b>
 If the employee does not re-enter before the visa expires, the Iqama is cancelled automatically and
 they cannot return on it. The return-by date is tracked from the recorded departure, not from the
 application, and the system escalates to the line manager and HRBP at 14, 7 and 2 days.
 </div></div></div>''')

# ---------------------------------------------------------------- 5. iqama renewal board
page("process-renew", nav("Iqama", ["Renew Iqama", "Dependants", "Profession Change", "Sponsorship Transfer"], "Renew Iqama") + '''<div class="body">
<div class="card" style="margin-bottom:16px;padding:15px 18px">
  <div style="display:flex;gap:44px;font-size:13px;color:#3F5265;line-height:1.9">
   <div><b style="color:#1D2D3E;font-size:16px">Ibrahim Haddad</b><br>Employee ID: 30011236<br>
     Email: i.haddad@example.com<br>Mobile: +966 53 418 2277</div>
   <div>Process: Iqama Renewal<br>Establishment: RIY-HO (1100)<br>
     Profession: Maintenance Technician<br>Current expiry: 12 Oct 2026</div>
   <div>Priority: P2<br>Agent: 70002045 Aisha Al Harbi<br>
     Alert raised: 31 Aug 2026<br>Renewal window: 6 weeks</div>
  </div></div>
<div class="proc"><div style="font-size:13px;font-weight:700;color:#4A5C6E;letter-spacing:.08em;margin-bottom:14px">PROCESS</div>
''' + steps([
 [("Expiry Alert","Raised 6 weeks out to employee, PRO and HRBP","done"),
  ("Nitaqat Gate Check","Band must permit renewal before fees are paid","done"),
  ("Qiwa Contract Validity","Employment contract current and authenticated","act")],
 [("Levy &amp; Iqama Fees","Expat levy and Iqama fee paid via SADAD",""),
  ("Medical Insurance","Cover renewed and certificate attached",""),
  ("Muqeem Renewal","Iqama renewed, new expiry recorded","")],
 [("Employee Central Update","New expiry written back to SuccessFactors",""),
  ("Employee Confirmation","Employee confirms receipt of renewed Iqama",""),
  ("",""," ")],
][:2] + [[("Employee Central Update","New expiry written back to SuccessFactors",""),
  ("Employee Confirmation","Employee confirms receipt of renewed Iqama","")]]) + '</div></div>')

# ---------------------------------------------------------------- 6. qiwa contract form
page("form-qiwa", nav("Work Visa") + '''<div class="body">
<div class="form"><div class="fh"><b>Qiwa Employment Contract Authentication</b></div>
<div class="fb">''' +
 frow("Employee ID", "30015904", ro=True) +
 frow("Employee Name", "Mohammed Al Otaibi", ro=True) +
 frow("Establishment", "JED-OPS (1300)", ro=True) +
 frow("Qiwa Contract Number", "", req=True) +
 frow("Contract Start Date", "e.g. 31/12/26", req=True, ph=True) +
 frow("Contract Duration", "1 year &nbsp;&nbsp;&nbsp;&#9662;", req=True) +
 frow("Profession (as per Qiwa)", "Warehouse Supervisor", req=True) +
 frow("Basic Salary (SAR)", "", req=True) +
 frow("Housing &amp; Allowances (SAR)", "", req=True) +
 frow("Payment Date For Contract Fee", "e.g. 31/12/26", req=True, ph=True) +
 frow("Payment Mode", "SADAD &nbsp;&nbsp;&nbsp;&#9662;", req=True) +
 frow("Payment Amount (SAR)", "", req=True) +
 frow("VAT (SAR)", "", req=True) +
 frow("SADAD Reference Number", "", req=True) +
 frow("Authenticated Contract", "Upload File... &nbsp;&nbsp; <span style=\"color:#0B5FD9;font-weight:700\">Browse</span>", req=True, ph=True) +
 frow("Remarks", "") +
'''</div><div class="ff"><span class="bsv">Save</span><span class="bsub">Submit</span><span class="bcn">Cancel</span></div>
</div></div>''')

# ---------------------------------------------------------------- 7. inbox
page("inbox", '''<div style="background:#fff;padding:16px 26px;border-bottom:1px solid #E3E6E8">
<b style="font-size:19px">INBOX</b></div><div class="body"><div class="two">
<div class="card" style="width:330px;flex:none"><div class="ch"><h2>Pending Task</h2></div>
<div style="padding:4px 0">''' + "".join(f'''
<div style="padding:13px 17px;border-bottom:1px solid #F0F2F4">
 <b style="font-size:13.5px;display:block">{a}</b>
 <span style="font-size:12.5px;color:#65798C;display:block;margin-top:3px">Task Type: {b}</span>
 <span style="font-size:12.5px;color:{d};display:block">Due Date: {c}</span></div>''' for a,b,c,d in [
 ("Exit &amp; Re-entry","returnMonitoring","14 Sep 2026 &#183; overdue","#B0392C"),
 ("New Work Visa","qiwaContractAuth","24 Sep 2026","#65798C"),
 ("Iqama Renewal","levyAndIqamaFees","28 Sep 2026","#65798C"),
 ("Exit &amp; Re-entry","muqeemApplication","19 Sep 2026","#9A6512"),
 ("Final Exit","duesClearance","30 Sep 2026","#65798C"),
]) + '''</div></div>
<div class="card" style="flex:1"><div class="ch"><h2>Task Details</h2></div>
<div style="padding:20px 26px">''' +
 frow("Process Type", "Exit &amp; Re-entry", ro=True) +
 frow("Task Type", "returnMonitoring", ro=True) +
 frow("Employee", "Abdulrahman Al Zahrani (30014782)", ro=True) +
 frow("Assigned To", "70001188 Rashid Al Mazrouei", ro=True) +
 frow("Due Date", "14 Sep 2026", ro=True) +
 frow("Note", "Return-by date passed. Escalated to line manager and HRBP.", ro=True) +
 frow("Comment", "") +
 frow("Document", "Browse or drop a file", ph=True) +
'''</div><div class="ff"><span class="bsub">Submit</span><span class="bcn">Cancel</span></div>
</div></div></div>''')

# ---------------------------------------------------------------- 8. exit tracker
page("exit-tracker", nav("Work Visa", ["New Work Visa", "Renew Iqama", "Exit &amp; Re-entry", "Final Exit", "Initiate New Request"], "Exit &amp; Re-entry") + '''<div class="body">
<div class="two" style="margin-bottom:16px">
 <div class="kpi"><span>Currently outside the Kingdom</span><b>47</b><em>On exit re-entry visas</em></div>
 <div class="kpi"><span>Returning within 14 days</span><b style="color:#9A6512">12</b><em>Alerts running</em></div>
 <div class="kpi"><span>Overdue return</span><b style="color:#B0392C">2</b><em>Iqama cancellation risk</em></div>
 <div class="kpi"><span>Avg. issue time</span><b>1.4 <em style="font-size:15px">days</em></b><em>Request to visa issued</em></div>
</div>
<div class="card"><div class="ch"><h2>Exit &amp; Re-entry Tracker</h2>
 <div class="acts"><span class="act">Filter</span><span class="act">Export</span></div></div>
<table><tr><th>Employee</th><th>ID</th><th>Establishment</th><th>Visa Type</th><th>Departed</th>
<th>Return By</th><th>Days Left</th><th>Status</th></tr>''' + "".join(f'''
<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td><td class="{g}">{f}</td>
<td class="{g}">{h}</td><td><span class="pill {i}">{j}</span></td></tr>''' for a,b,c,d,e,f,g,h,i,j in [
 ("Abdulrahman Al Zahrani","30014782","RIY-HO (1100)","Single &#183; 2 mo","06 Sep 26","05 Nov 26","red","-3","p-late","OVERDUE"),
 ("Tariq Mansour","30012840","JED-OPS (1300)","Single &#183; 2 mo","12 Aug 26","12 Oct 26","red","-1","p-late","OVERDUE"),
 ("Samir Haddad","30013471","DMM-PLANT (1500)","Multiple &#183; 3 mo","28 Aug 26","28 Nov 26","amb","7","p-due","RETURNING"),
 ("Yusuf Al Amri","30015118","RIY-HO (1100)","Single &#183; 2 mo","01 Sep 26","01 Nov 26","amb","11","p-due","RETURNING"),
 ("Bilal Othman","30010774","JED-OPS (1300)","Multiple &#183; 6 mo","15 Jul 26","15 Jan 27","grn","46","p-run","OUTSIDE"),
 ("Hamza Nasser","30014903","DMM-PLANT (1500)","Single &#183; 2 mo","09 Sep 26","09 Nov 26","grn","19","p-run","OUTSIDE"),
 ("Omar Siddiq","30011592","RIY-HO (1100)","Multiple &#183; 3 mo","22 Jun 26","22 Sep 26","grn","","p-ok","RETURNED"),
]) + '</table></div></div>')

# ---------------------------------------------------------------- 9. payment report
page("report-payment", nav("Report", ["New Work Visa", "Iqama Renewal", "Exit &amp; Re-entry", "Payment Report"], "Payment Report") + '''<div class="body">
<div class="filt">
 <div class="fg"><label>Process Type</label><div class="fi">&nbsp;&nbsp;&nbsp;&#9662;</div></div>
 <div class="fg"><label>Establishment</label><div class="fi">&nbsp;&nbsp;&nbsp;&#9662;</div></div>
 <div class="fg"><label>Employee ID</label><div class="fi"></div></div>
 <div class="fg"><label>Payment Start Date</label><div class="fi ph">e.g. 31/12/26</div></div>
 <div class="fg"><label>Payment End Date</label><div class="fi ph">e.g. 31/12/26</div></div>
 <div class="fg"><label>Payment Mode</label><div class="fi">&nbsp;&nbsp;&nbsp;&#9662;</div></div>
 <span class="btn">Go</span><span class="act">ClearFilter</span></div>
<div class="card"><div class="ch"><h2>Payment Report</h2><span class="act">Export</span></div>
<table><tr><th>Employee ID</th><th>Process</th><th>Fee Type</th><th>Amount (SAR)</th><th>VAT</th>
<th>SADAD Reference</th><th>Payment Document</th><th>GL Account</th><th>Status</th><th>Receipt</th></tr>
''' + "".join(f'''<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td><td>{f}</td>
<td>{g}</td><td>{h}</td><td class="grn">Completed</td>
<td><span style="color:#0B5FD9;font-weight:600">Download</span></td></tr>''' for a,b,c,d,e,f,g,h in [
 ("30015904","New Work Visa","Qiwa contract fee","1,150.00","172.50","SD30114552870","0200004412092026","0000180208"),
 ("30011236","Iqama Renewal","Expat levy","9,600.00","0","SD30114609931","0200004418092026","0000180206"),
 ("30011236","Iqama Renewal","Iqama issue fee","650.00","0","SD30114609948","0200004418192026","0000180206"),
 ("30014782","Exit &amp; Re-entry","Single exit re-entry","200.00","0","SD30114588104","0200004409092026","0000180211"),
 ("30013471","Exit &amp; Re-entry","Multiple exit re-entry","500.00","0","SD30114590277","0200004410092026","0000180211"),
 ("30015904","New Work Visa","Medical examination","320.00","48.00","SD30114561339","0200004413092026","0000180208"),
 ("30016302","Sponsorship Transfer","Transfer fee","2,000.00","300.00","SD30114520018","0200004401092026","0000180209"),
 ("30009915","Final Exit","Final exit visa","70.00","0","SD30114533662","0200004404092026","0000180211"),
 ("30014025","Iqama Renewal","Medical insurance","1,840.00","276.00","SD30114612205","0200004419092026","0000180207"),
 ("30015118","Exit &amp; Re-entry","Single exit re-entry","200.00","0","SD30114577450","0200004407092026","0000180211"),
]) + '</table></div></div>')

# ---------------------------------------------------------------- 10. iqama expiry report
page("report-iqama", nav("Report", ["New Work Visa", "Iqama Renewal", "Exit &amp; Re-entry", "Payment Report"], "Iqama Renewal") + '''<div class="body">
<div class="filt">
 <div class="fg"><label>Establishment</label><div class="fi">&nbsp;&nbsp;&nbsp;&#9662;</div></div>
 <div class="fg"><label>Employee ID</label><div class="fi"></div></div>
 <div class="fg"><label>Expiry From</label><div class="fi ph">e.g. 31/12/26</div></div>
 <div class="fg"><label>Expiry To</label><div class="fi ph">e.g. 31/12/26</div></div>
 <div class="fg"><label>Status</label><div class="fi">&nbsp;&nbsp;&nbsp;&#9662;</div></div>
 <span class="btn">Go</span><span class="act">ClearFilter</span></div>
<div class="card"><div class="ch"><h2>Iqama Renewal Report</h2><span class="act">Export</span></div>
<table><tr><th>Employee ID</th><th>Employee Name</th><th>Establishment</th><th>Profession</th>
<th>Iqama Expiry</th><th>Days To Expiry</th><th>Levy Due (SAR)</th><th>Agent</th><th>Status</th></tr>
''' + "".join(f'''<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td>
<td class="{g}">{f}</td><td>{h}</td><td>{i}</td><td><span class="pill {j}">{k}</span></td></tr>'''
 for a,b,c,d,e,f,g,h,i,j,k in [
 ("30011236","Ibrahim Haddad","RIY-HO (1100)","Maintenance Technician","12/10/26","21","amb","9,600","70002045","p-run","RUNNING"),
 ("30014025","Nasser Al Ghamdi","DMM-PLANT (1500)","Machine Operator","28/10/26","37","grn","9,600","70002045","p-run","RUNNING"),
 ("30012118","Faisal Rahman","JED-OPS (1300)","Storekeeper","03/11/26","43","grn","9,600","","p-due","NOT STARTED"),
 ("30010449","Adel Suleiman","RIY-HO (1100)","Accountant","19/11/26","59","grn","9,600","70001188","p-run","RUNNING"),
 ("30013902","Kareem Fathi","JED-OPS (1300)","Driver","24/09/26","3","red","9,600","70001188","p-late","ESCALATED"),
 ("30015663","Majid Al Harthy","DMM-PLANT (1500)","Electrician","08/12/26","78","grn","9,600","","p-due","NOT STARTED"),
 ("30009771","Salem Al Dossari","RIY-HO (1100)","Logistics Coordinator","15/08/27","328","grn","9,600","70002045","p-ok","COMPLETED"),
]) + '</table></div></div>')

# ---------------------------------------------------------------- 11. new work visa queue
page("queue-new", nav("Work Visa", ["New Work Visa", "Renew Iqama", "Exit &amp; Re-entry", "Final Exit", "Initiate New Request"], "New Work Visa") + '''<div class="body">
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px">''' + "".join(f'''
<div class="card" style="padding:16px 17px">
 <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px">
  <b style="font-size:14.5px;line-height:1.3">{a}<br><span style="font-weight:400;color:#65798C;font-size:12.5px">({b})</span></b>
  <span style="background:#0B5FD9;color:#fff;border-radius:5px;padding:3px 6px;font-size:11px">&#128197;</span></div>
 <div style="font-size:12.8px;color:#4A5C6E;line-height:1.9">
  Visa Type: <b style="color:#1D2D3E">{c}</b><br>Establishment: <b style="color:#1D2D3E">{d}</b><br>
  Profession: {e}<br>Nationality: {f}</div>
 <div style="display:flex;justify-content:space-between;align-items:center;margin-top:13px">
  <span class="pill {g}">{h}</span>
  <span style="border:1px solid #0B5FD9;color:#0B5FD9;border-radius:15px;padding:5px 11px;font-size:12px;font-weight:600">Assign To Yourself</span></div>
 <div style="margin-top:13px;border-top:1px solid #F0F2F4;padding-top:11px;font-size:12.5px;color:#65798C">
  <b style="color:#1D2D3E">Status</b>{i}</div></div>''' for a,b,c,d,e,f,g,h,i in [
 ("Mohammed Al Otaibi","30015904","Work Visa","JED-OPS (1300)","Warehouse Supervisor","Egypt","p-run","RUNNING",
  '<div style="margin-top:8px;line-height:1.85">Block Visa Allocation <b class="grn">DONE</b><br>Visa Authorisation <b class="grn">DONE</b><br>Enjaz Stamping <b class="grn">DONE</b><br>Qiwa Contract <b class="amb">IN PROGRESS</b><br>Iqama Issuance <span style="color:#97A3AE">NOT STARTED</span></div>'),
 ("Yara Al Mutairi","30016118","Saudi National","RIY-HO (1100)","Financial Analyst","Saudi Arabia","p-run","RUNNING",
  '<div style="margin-top:8px;line-height:1.85">Qiwa Contract <b class="grn">DONE</b><br>GOSI Registration <b class="amb">IN PROGRESS</b><br>Nitaqat Recount <span style="color:#97A3AE">NOT STARTED</span></div>'),
 ("Ravi Chandran","30016205","Work Visa","DMM-PLANT (1500)","Mechanical Fitter","India","p-run","RUNNING",
  '<div style="margin-top:8px;color:#97A3AE">&#9656; expand</div>'),
 ("Ahmed Bassiouni","30016277","Work Visa","JED-OPS (1300)","Quality Inspector","Egypt","p-due","PENDING",
  '<div style="margin-top:8px;color:#97A3AE">&#9656; expand</div>'),
]) + '</div></div>')

if __name__ == "__main__":
    print(f"wrote {len(list(OUT.glob('*.html')))} screen templates to {OUT}")


# ================================================================ form kit
FORMCSS = """<style>
.wrap2{max-width:1020px;margin:0 auto}
.fcard{background:#fff;border:1px solid #E3E6E8;border-radius:10px;overflow:hidden}
.fhd{padding:15px 22px;border-bottom:1px solid #EDEFF1;display:flex;align-items:center;justify-content:space-between;gap:16px}
.fhd b{font-size:17px}
.fhd .src{font-size:12px;color:#5A6E82}
.badge2{background:#E3EEFB;color:#0B5FD9;border:1px solid #BFD8F6;border-radius:13px;padding:4px 11px;font-size:11.5px;font-weight:700;white-space:nowrap}
.badge2.mu{background:#EAF3EC;color:#177D48;border-color:#C4E2CF}
.badge2.ab{background:#F3EDF9;color:#6B4E9E;border-color:#DCCDEE}
.badge2.go{background:#FDF2E3;color:#9A6512;border-color:#EBD5AE}
.sect{padding:6px 22px 0}
.sect h3{font-size:12.5px;font-weight:700;color:#0B5FD9;letter-spacing:.07em;text-transform:uppercase;margin:16px 0 11px;padding-bottom:7px;border-bottom:1px solid #EDEFF1}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px 26px;padding:0 22px}
.fld{display:flex;flex-direction:column;gap:5px}
.fld label{font-size:12.5px;color:#3F5265;font-weight:600}
.fld label i{color:#B0392C;font-style:normal}
.fld label em{color:#8C9AA8;font-style:normal;font-weight:400}
.inp{border:1px solid #8C9AA8;border-radius:4px;padding:8px 11px;font-size:13px;min-height:35px;background:#fff}
.inp.ro{background:#EDEFF1;border:none;border-bottom:1px dashed #A7B2BC;border-radius:0;color:#243447}
.inp.ph{color:#97A3AE;font-style:italic}
.inp.ok{border-color:#177D48;background:#F4FBF6}
.inp.warn{border-color:#C9821A;background:#FDF8EF}
.hint{font-size:11.5px;color:#65798C;line-height:1.4}
.hint b{color:#243447}
.hint.g{color:#177D48;font-weight:600}
.hint.a{color:#9A6512;font-weight:600}
.hint.r{color:#B0392C;font-weight:600}
.full{grid-column:1/-1}
.note2{margin:16px 22px 0;padding:12px 15px;border-radius:8px;background:#FDF8EF;border:1px solid #EBD5AE;font-size:12.5px;color:#6B4E14;line-height:1.55}
.note2 b{color:#8A5F12}
.note2.blue{background:#F1F7FE;border-color:#C8DDF5;color:#1F4C7A}
.note2.blue b{color:#0B5FD9}
.calc{margin:0 22px;background:#F7F9FB;border:1px solid #E3E6E8;border-radius:8px;padding:13px 16px}
.crow{display:flex;justify-content:space-between;font-size:13px;padding:5px 0;color:#3F5265}
.crow.tot{border-top:1px solid #DDE2E6;margin-top:6px;padding-top:9px;font-weight:700;color:#1D2D3E;font-size:14.5px}
.ftr{padding:16px 22px;border-top:1px solid #EDEFF1;display:flex;gap:11px;justify-content:flex-end;background:#FAFBFC}
</style>"""


def fld(label, value, req=False, ro=False, ph=False, hint=None, hcls="", state="", full=False):
    cls = "inp ro" if ro else "inp" + (" ph" if ph else "") + (f" {state}" if state else "")
    star = "<i>*</i>" if req else ""
    h = (f'<div class="fld{" full" if full else ""}"><label>{label} {star}</label>'
         f'<div class="{cls}">{value}</div>')
    if hint:
        h += f'<div class="hint {hcls}">{hint}</div>'
    return h + "</div>"


def form(name, title, source, badges, sections, notes="", calc="", navtab="Work Visa"):
    h = [SHELL, FORMCSS, nav(navtab), '<div class="body"><div class="wrap2"><div class="fcard">']
    h.append(f'<div class="fhd"><div><b>{title}</b><div class="src">{source}</div></div>'
             f'<div style="display:flex;gap:7px">{"".join(badges)}</div></div>')
    for sh, fields in sections:
        h.append(f'<div class="sect"><h3>{sh}</h3></div><div class="grid2">{"".join(fields)}</div>')
    if calc:
        h.append(calc)
    if notes:
        h.append(notes)
    h.append('<div class="ftr"><span class="bsv">Save draft</span>'
             '<span class="bsub">Submit</span><span class="bcn">Cancel</span></div>')
    h.append('</div></div></div>')
    (OUT / f"{name}.html").write_text("".join(h), encoding="utf-8")
    return name

QIWA = '<span class="badge2">Writes to Qiwa</span>'
MUQ  = '<span class="badge2 mu">Writes to Muqeem</span>'
ABS  = '<span class="badge2 ab">Visible in Absher</span>'
GOSI = '<span class="badge2 go">Writes to GOSI</span>'
SF   = '<span class="badge2">From SuccessFactors</span>'

# ---------------------------------------------------------------- f1. block visa
form("f-blockvisa", "Block Visa Request", "Step 1 of 12 · New Work Visa &amp; Iqama · Rashid Al Mutairi",
 [QIWA],
 [("Establishment", [
    fld("Establishment", "JED-OPS · Jeddah Operations", ro=True),
    fld("Unified number (700)", "7001234567", ro=True),
    fld("Labour office", "Jeddah · 21", ro=True),
    fld("Economic activity", "Wholesale distribution", ro=True)]),
  ("Nitaqat position", [
    fld("Current band", "Green · Mid", ro=True, state="ok",
        hint="Band permits block visa requests this cycle", hcls="g"),
    fld("Saudization ratio", "19.5%", ro=True,
        hint="148 Saudi of 760 weighted headcount"),
    fld("Headroom to next band down", "1.9%", ro=True, state="warn",
        hint="33 Saudi leavers would drop this establishment to Green Low", hcls="a"),
    fld("Visas available on file", "6", ro=True,
        hint="Approved and not yet assigned")]),
  ("Request", [
    fld("Profession (MHRSD classification)", "Warehouse Supervisor &nbsp;&nbsp;&#9662;", req=True,
        hint="Must match the qualification on the attested degree, or the Cultural Attach&eacute; will reject the visa later"),
    fld("Profession code", "5-31.20", ro=True),
    fld("Nationality", "Egypt &nbsp;&nbsp;&#9662;", req=True),
    fld("Number of visas requested", "2", req=True),
    fld("Justification", "Peak season cover for the Jeddah distribution centre", req=True, full=True)])],
 notes='<div class="note2"><b>Why this step comes first.</b> Qiwa will refuse a block visa outright if the '
       'establishment has fallen into a band that blocks issuance. We check the band before the request is '
       'raised, so you never pay for a request that cannot succeed.</div>')

# ---------------------------------------------------------------- f2. qiwa contract
form("f-qiwacontract", "Qiwa Employment Contract", "Step 4 of 12 · New Work Visa &amp; Iqama · Rashid Al Mutairi",
 [QIWA, ABS],
 [("Employee", [
    fld("Employee ID", "30015904", ro=True),
    fld("Name (as per passport)", "Mohammed Ahmed Al Otaibi", ro=True),
    fld("Nationality", "Egypt", ro=True),
    fld("Passport number", "A21884930", ro=True)]),
  ("Contract terms", [
    fld("Job title (Arabic)", "&#1605;&#1588;&#1585;&#1601; &#1605;&#1587;&#1578;&#1608;&#1583;&#1593;", req=True,
        hint="Qiwa contracts are authenticated in Arabic"),
    fld("Job title (English)", "Warehouse Supervisor", req=True,
        hint="Must match the attested qualification", hcls="a"),
    fld("Contract type", "Fixed term &nbsp;&nbsp;&#9662;", req=True),
    fld("Contract duration", "1 year &nbsp;&nbsp;&#9662;", req=True),
    fld("Start date (Gregorian)", "01/11/2026", req=True),
    fld("Start date (Hijri)", "1448-05-11", ro=True, hint="Derived automatically"),
    fld("Probation period", "90 days", req=True, hint="Maximum 180 days under the Labour Law"),
    fld("Notice period", "60 days", req=True),
    fld("Working hours per week", "48", req=True),
    fld("Annual leave (days)", "21", req=True)]),
  ("Remuneration", [
    fld("Basic salary (SAR)", "6,500", req=True),
    fld("Housing allowance (SAR)", "1,625", req=True, hint="Mandatory field in Qiwa"),
    fld("Transport allowance (SAR)", "650", req=True, hint="Mandatory field in Qiwa"),
    fld("Other allowances (SAR)", "0"),
    fld("Total monthly (SAR)", "8,775", ro=True, state="ok",
        hint="Must match what is declared to Mudad wage protection", hcls="g"),
    fld("Payment method", "Bank transfer &nbsp;&nbsp;&#9662;", req=True)]),
  ("Authentication &amp; payment", [
    fld("Qiwa contract number", "", req=True, ph=False),
    fld("SADAD bill number", "", req=True),
    fld("Contract fee (SAR)", "1,000", req=True),
    fld("VAT (SAR)", "150", req=True),
    fld("Payment date", "e.g. 24/09/2026", req=True, ph=True),
    fld("GL account", "0000180208", ro=True, hint="Posted to S/4HANA on submit"),
    fld("Authenticated contract (PDF)", 'Upload file&hellip; &nbsp;&nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>',
        req=True, ph=True, full=True)])],
 notes='<div class="note2 blue"><b>The employee sees this too.</b> Once authenticated, the contract appears in '
       'the employee\'s Absher account for acceptance. If what they see there does not match what you agreed, '
       'you will hear about it from the Labour Office, not from them.</div>')

# ---------------------------------------------------------------- f3. arrival / border number
form("f-arrival", "Arrival &amp; Border Number", "Step 5 of 12 · New Work Visa &amp; Iqama · Aisha Al Harbi",
 [MUQ],
 [("Entry record", [
    fld("Border number (Hudood)", "3412889075", req=True,
        hint="Ten digits, handwritten by Jawazat on the visa page at the port of entry"),
    fld("Port of entry", "King Abdulaziz Intl · Jeddah &nbsp;&nbsp;&#9662;", req=True),
    fld("Date of entry (Gregorian)", "02/11/2026", req=True),
    fld("Date of entry (Hijri)", "1448-05-12", ro=True),
    fld("Visa number", "6041227893", ro=True),
    fld("Passport expiry", "14/08/2029", ro=True, state="ok",
        hint="Valid beyond the Iqama period", hcls="g")]),
  ("Statutory clock", [
    fld("Iqama must be issued by", "31/01/2027", ro=True, state="warn",
        hint="Counted from the recorded entry date, not from the visa date", hcls="a"),
    fld("Days remaining", "90", ro=True, state="warn", hint="Visible on every screen showing this case", hcls="a"),
    fld("National address registered", "Not yet &nbsp;&nbsp;&#9662;", req=True,
        hint="Required before the Iqama can be issued"),
    fld("Employee contacted", "Yes &nbsp;&nbsp;&#9662;", req=True)])],
 notes='<div class="note2"><b>This is the field everything hangs off.</b> Until the Iqama exists, the border '
       'number is the only way to identify this person to any Saudi system. Record it wrong and every later '
       'lookup fails. Record the entry date wrong and the ninety-day clock is wrong with it.</div>')

# ---------------------------------------------------------------- f4. iqama issuance
form("f-iqama", "Iqama Issuance", "Step 8 of 12 · New Work Visa &amp; Iqama · Rashid Al Mutairi",
 [MUQ, ABS],
 [("Identification", [
    fld("Border number (Hudood)", "3412889075", ro=True),
    fld("Iqama number", "", req=True, hint="Ten digits, begins with 2 for expatriate residents"),
    fld("Profession as printed on Iqama", "Warehouse Supervisor", req=True,
        hint="Must match the Qiwa contract exactly, or transfers and renewals fail later", hcls="a"),
    fld("Sponsor (establishment)", "JED-OPS · 7001234567", ro=True)]),
  ("Validity", [
    fld("Issue date (Hijri)", "1448-06-03", req=True),
    fld("Issue date (Gregorian)", "23/11/2026", ro=True, hint="Derived automatically"),
    fld("Expiry date (Hijri)", "1449-06-02", req=True,
        hint="Iqama validity runs on the Hijri calendar", hcls="a"),
    fld("Expiry date (Gregorian)", "12/11/2027", ro=True,
        hint="Both are written back to Employee Central")]),
  ("Insurance &amp; fees", [
    fld("CCHI insurance policy", "Verified &nbsp;&#10003;", ro=True, state="ok",
        hint="Checked against the CCHI platform automatically", hcls="g"),
    fld("Insurance class", "Class C &nbsp;&nbsp;&#9662;", req=True),
    fld("Iqama issue fee (SAR)", "650", req=True),
    fld("Expat levy (SAR / year)", "9,600", req=True,
        hint="Rate depends on the establishment Saudization ratio", hcls="a"),
    fld("SADAD bill number", "", req=True),
    fld("Payment date", "e.g. 23/11/2026", req=True, ph=True),
    fld("Iqama copy (PDF)", 'Upload file&hellip; &nbsp;&nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>',
        req=True, ph=True, full=True)])],
 calc='<div class="calc"><div class="crow"><span>Iqama issue fee</span><span>SAR 650.00</span></div>'
      '<div class="crow"><span>Expat levy &#183; 12 months at SAR 800</span><span>SAR 9,600.00</span></div>'
      '<div class="crow"><span>Medical insurance &#183; Class C</span><span>SAR 1,840.00</span></div>'
      '<div class="crow tot"><span>Total due via SADAD</span><span>SAR 12,090.00</span></div></div>',
 notes='<div class="note2 blue"><b>Two calendars, one record.</b> The Iqama runs on Hijri dates, your HR system '
       'runs on Gregorian. We hold both and write both back, so the renewal alert fires on the right day rather '
       'than eleven days late.</div>', navtab="Iqama")

# ---------------------------------------------------------------- f5. exit re-entry
form("f-exitreentry", "Exit &amp; Re-entry Application", "Step 4 of 9 · Exit &amp; Re-entry · Rashid Al Mutairi",
 [MUQ, ABS],
 [("Employee", [
    fld("Employee", "Abdulrahman Al Zahrani · 30014782", ro=True),
    fld("Iqama number", "2445119087", ro=True),
    fld("Iqama expiry (Hijri)", "1449-09-14", ro=True, state="ok",
        hint="Valid well beyond the intended return", hcls="g"),
    fld("Outstanding violations", "None &nbsp;&#10003;", ro=True, state="ok",
        hint="Traffic and labour fines block issuance", hcls="g")]),
  ("Travel", [
    fld("Visa type", "Single &nbsp;&nbsp;&#9662;", req=True,
        hint="Single allows one return. Multiple allows several within the window"),
    fld("Duration requested", "2 months &nbsp;&nbsp;&#9662;", req=True),
    fld("Intended departure", "06/09/2026", req=True),
    fld("Intended return", "28/10/2026", req=True,
        hint="Eight days of margin before the visa expires", hcls="g"),
    fld("Reason", "Annual leave &nbsp;&nbsp;&#9662;", req=True),
    fld("Line manager approval", "Approved &#183; 28/08/2026", ro=True, state="ok")]),
  ("Fee &amp; payment", [
    fld("SADAD bill number", "", req=True),
    fld("Payment date", "e.g. 02/09/2026", req=True, ph=True),
    fld("GL account", "0000180211", ro=True),
    fld("SADAD receipt", 'Upload file&hellip; &nbsp;&nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>',
        req=True, ph=True)])],
 calc='<div class="calc"><div class="crow"><span>Single exit re-entry &#183; first 2 months</span><span>SAR 200.00</span></div>'
      '<div class="crow"><span>Additional months</span><span>SAR 0.00</span></div>'
      '<div class="crow" style="color:#9A6512"><span>If extended later from outside the Kingdom</span><span>SAR 200.00 / month</span></div>'
      '<div class="crow tot"><span>Total due via SADAD</span><span>SAR 200.00</span></div></div>',
 notes='<div class="note2"><b>The return-by date is not this form.</b> It is set when the actual departure is '
       'recorded, which may not be the date requested here. Extending from outside the Kingdom costs double per '
       'month, and once the visa has expired the system will not accept an extension at all.</div>')

# ---------------------------------------------------------------- f6. iqama renewal
form("f-renewal", "Iqama Renewal", "Step 4 of 8 · Iqama Renewal · Aisha Al Harbi",
 [MUQ, QIWA, ABS],
 [("Pre-flight checks", [
    fld("Nitaqat band permits renewal", "Green &#183; Mid &nbsp;&#10003;", ro=True, state="ok",
        hint="Checked before any fee is paid", hcls="g"),
    fld("Qiwa contract valid", "Authenticated &#183; expires 31/10/2027 &nbsp;&#10003;", ro=True, state="ok"),
    fld("Passport validity", "14/08/2029", ro=True, state="ok",
        hint="Must exceed the new Iqama period", hcls="g"),
    fld("Outstanding fines", "None &nbsp;&#10003;", ro=True, state="ok",
        hint="Traffic, labour and municipal fines all block renewal", hcls="g"),
    fld("CCHI insurance", "Renewed to 12/11/2027 &nbsp;&#10003;", ro=True, state="ok",
        hint="Verified automatically against the CCHI platform", hcls="g"),
    fld("Biometrics current", "Yes &nbsp;&#10003;", ro=True, state="ok")]),
  ("Renewal", [
    fld("Current expiry (Hijri)", "1449-06-02", ro=True),
    fld("Renewal period", "1 year &nbsp;&nbsp;&#9662;", req=True),
    fld("New expiry (Hijri)", "1450-06-01", ro=True, hint="Calculated on the Hijri calendar"),
    fld("New expiry (Gregorian)", "01/11/2028", ro=True, hint="Written back to Employee Central")]),
  ("Fees", [
    fld("Expat levy rate", "SAR 800 / month", ro=True, state="warn",
        hint="Rises if the Saudization ratio falls", hcls="a"),
    fld("Levy total (SAR)", "9,600", ro=True),
    fld("Iqama renewal fee (SAR)", "650", ro=True),
    fld("Medical insurance (SAR)", "1,840", ro=True),
    fld("SADAD bill number", "", req=True),
    fld("Payment date", "e.g. 30/09/2026", req=True, ph=True)])],
 calc='<div class="calc"><div class="crow"><span>Expat levy &#183; 12 months</span><span>SAR 9,600.00</span></div>'
      '<div class="crow"><span>Iqama renewal fee</span><span>SAR 650.00</span></div>'
      '<div class="crow"><span>Medical insurance &#183; Class C</span><span>SAR 1,840.00</span></div>'
      '<div class="crow tot"><span>Total due via SADAD</span><span>SAR 12,090.00</span></div></div>',
 notes='<div class="note2"><b>Six checks before a riyal moves.</b> Each one of these will stop a renewal at '
       'Muqeem. Finding out after you have paid the levy is how companies lose four figures on a single '
       'employee.</div>', navtab="Iqama")

# ---------------------------------------------------------------- f7. gosi
form("f-gosi", "GOSI Registration", "Step 9 of 12 · New Work Visa &amp; Iqama · Aisha Al Harbi",
 [GOSI, QIWA],
 [("Employee", [
    fld("Employee", "Mohammed Al Otaibi · 30015904", ro=True),
    fld("Iqama number", "2447301889", ro=True),
    fld("Nationality", "Egypt &#183; Non-Saudi", ro=True,
        hint="Non-Saudi contributions cover occupational hazards only"),
    fld("Date of joining", "02/11/2026", ro=True)]),
  ("Contribution basis", [
    fld("Establishment GOSI number", "500442189", ro=True),
    fld("Contributory wage (SAR)", "8,775", req=True,
        hint="Basic plus housing, and it must agree with the Qiwa contract", hcls="a"),
    fld("Employer contribution", "2%", ro=True, hint="Occupational hazards, non-Saudi"),
    fld("Employee contribution", "0%", ro=True),
    fld("Effective from", "01/11/2026", req=True),
    fld("GOSI reference", "", req=True)])],
 notes='<div class="note2 blue"><b>This is the step that moves your Nitaqat number.</b> For a Saudi national, '
       'GOSI registration is what makes them count towards the ratio. Register late and your band is understated '
       'for a whole cycle, which can cost you visas you were entitled to.</div>', navtab="Nitaqat")

# ---------------------------------------------------------------- f8. transfer
form("f-transfer", "Sponsorship Transfer", "Step 3 of 6 · Sponsorship Transfer · Rashid Al Mutairi",
 [QIWA, MUQ],
 [("Candidate", [
    fld("Name", "Faisal Ur Rahman", ro=True),
    fld("Iqama number", "2398115604", ro=True),
    fld("Current sponsor", "Al Waha Trading &#183; 7004411982", ro=True),
    fld("Current contract status", "Active &#183; ends 14/12/2026", ro=True,
        hint="Transfer rules depend on contract status and service length"),
    fld("Profession on Iqama", "Storekeeper", ro=True,
        hint="A change of profession is a separate Qiwa process", hcls="a"),
    fld("Iqama expiry (Hijri)", "1449-02-28", ro=True, state="ok")]),
  ("Nitaqat impact", [
    fld("Receiving establishment", "RIY-HO &#183; 7001234567", ro=True),
    fld("Current band", "Platinum", ro=True, state="ok"),
    fld("Band after transfer", "Platinum", ro=True, state="ok",
        hint="Ratio moves from 34.7% to 34.6%, band unchanged", hcls="g"),
    fld("Slots consumed", "1", ro=True,
        hint="A transfer in counts against your ratio the moment it completes")]),
  ("Request &amp; payment", [
    fld("Transfer reason", "Direct hire &nbsp;&nbsp;&#9662;", req=True),
    fld("New contract start", "01/12/2026", req=True),
    fld("Transfer fee (SAR)", "2,000", req=True),
    fld("VAT (SAR)", "300", req=True),
    fld("SADAD bill number", "", req=True),
    fld("GL account", "0000180209", ro=True)])],
 notes='<div class="note2"><b>Faster than a fresh hire, and quieter.</b> No block visa, no entry visa, no '
       'medical. But it consumes a Nitaqat slot the moment it completes, so we show the band impact before the '
       'request is raised rather than after.</div>')

# ---------------------------------------------------------------- 12. integrations
page("integrations", nav("Miscellaneous", ["Government Portals", "Notifications", "Users", "Audit Log"], "Government Portals") + '''<div class="body">
<div class="two" style="margin-bottom:16px">
 <div class="kpi"><span>Portals mapped</span><b>7</b><em>Every Saudi step routes to one of these</em></div>
 <div class="kpi"><span>Automatic today</span><b style="color:#177D48">3</b><em>CCHI, GOSI and Mudad lookups</em></div>
 <div class="kpi"><span>Connector built, awaiting credentials</span><b style="color:#9A6512">4</b><em>Qiwa, Muqeem, Absher, Enjaz</em></div>
 <div class="kpi"><span>Steps with a recorded reference</span><b>100%</b><em>Manual or automatic, it is on the record</em></div>
</div>
<div class="card"><div class="ch"><h2>Government portal map</h2>
 <div class="acts"><span class="act">Test connection</span><span class="act">Export</span></div></div>
<table><tr><th>Portal</th><th>Authority</th><th>What it holds</th><th>Steps that touch it</th>
<th>Direction</th><th>Connection</th></tr>''' + "".join(f'''
<tr><td><b>{a}</b></td><td>{b}</td><td>{c}</td><td>{d}</td><td>{e}</td>
<td><span class="pill {f}">{g}</span></td></tr>''' for a,b,c,d,e,f,g in [
 ("Qiwa","MHRSD","Work permits, employment contracts, Nitaqat band, transfers",
  "Block visa, contract, transfer, profession change","Read &amp; write","p-due","CONNECTOR READY"),
 ("Muqeem","Elm &#183; sponsor portal","Iqama issue and renewal, exit re-entry, final exit, dependants",
  "Iqama, renewal, exit re-entry, final exit","Read &amp; write","p-due","CONNECTOR READY"),
 ("Absher","Ministry of Interior","The employee-facing mirror of everything you do on Muqeem",
  "Contract acceptance, visa visibility","Read","p-due","CONNECTOR READY"),
 ("Enjaz","MoFA &#183; visa platform","Visa application and embassy stamping abroad",
  "Visa authorisation, stamping","Read","p-due","CONNECTOR READY"),
 ("GOSI","Social Insurance","Employee registration and contributory wage",
  "GOSI registration, Nitaqat headcount","Read &amp; write","p-ok","LIVE LOOKUP"),
 ("Mudad","Wage protection","Payroll enrolment and salary verification",
  "Wage protection enrolment","Read","p-ok","LIVE LOOKUP"),
 ("CCHI","Health insurance council","Medical insurance validity per employee",
  "Iqama issue, Iqama renewal","Read","p-ok","LIVE LOOKUP"),
]) + '''</table></div>
<div class="card" style="margin-top:16px;border-color:#E8C9A0;background:#FDF7EC">
 <div style="padding:15px 18px;font-size:13.2px;color:#6B4E14;line-height:1.6">
 <b style="color:#8A5F12">How the four amber rows go green.</b>
 Qiwa and Muqeem grant API access to the employer, under your own establishment registration, never to a
 software vendor. You request credentials and a sandbox; we plug them into connectors that are already
 built and tested. Until that day the step stays a tracked manual activity, with the reference number,
 the receipt and the status captured exactly as they would be automatically. Nothing about the process
 changes when the switch is flipped.
 </div></div></div>''')
