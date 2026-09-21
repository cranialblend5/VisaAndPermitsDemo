#!/usr/bin/env python3
"""One screen per process step.

Thirty-three of the forty-one steps were falling back to the same process board
image, so clicking through a process showed the same picture over and over.
Each step now gets its own screen, built from a compact spec so they stay
consistent with the eight detailed forms in build-screens.py.
"""
import importlib.util, pathlib, sys

spec = importlib.util.spec_from_file_location("bs", pathlib.Path(__file__).parent / "build-screens.py")
bs = importlib.util.module_from_spec(spec)
sys.modules["bs"] = bs
spec.loader.exec_module(bs)

OUT = bs.OUT
QIWA, MUQ, ABS, GOSI = bs.QIWA, bs.MUQ, bs.ABS, bs.GOSI
ENJ  = '<span class="badge2">Reads from Enjaz</span>'
MUD  = '<span class="badge2 go">Writes to Mudad</span>'
CCHI = '<span class="badge2 go">Checks CCHI</span>'
SFB  = '<span class="badge2">Writes to Employee Central</span>'
NIT  = '<span class="badge2 mu">Updates Nitaqat</span>'


def F(label, value, flags="", hint=""):
    """flags: r required · o read-only · p placeholder · g/a/d state colour"""
    state = {"g": "ok", "a": "warn", "d": "warn"}.get(next((c for c in flags if c in "gad"), ""), "")
    hcls  = {"g": "g", "a": "a", "d": "r"}.get(next((c for c in flags if c in "gad"), ""), "")
    return bs.fld(label, value, req="r" in flags, ro="o" in flags, ph="p" in flags,
                  hint=hint or None, hcls=hcls, state=state)


def step(key, proc, n, of, title, owner, badges, fields, note, tab="Work Visa"):
    bs.form(key, title, f"Step {n} of {of} &#183; {proc} &#183; {owner}", badges,
            [("Details", fields)],
            notes=f'<div class="note2">{note}</div>', navtab=tab)


# ============================================================ NEW WORK VISA
P, N = "New Work Visa &amp; Iqama", 12
step("s-new-02", P, 2, N, "Visa Authorisation", "Rashid Al Mutairi", [QIWA], [
  F("Block visa reference", "BV-2026-JED-0417", "o"),
  F("Candidate", "Mohammed Ahmed Al Otaibi", "o"),
  F("Nationality", "Egypt", "o", "Subject to any nationality hold in force this season"),
  F("Profession (MHRSD)", "Warehouse Supervisor &#183; 5-31.20", "o"),
  F("Visa authorisation number", "", "r", "Issued by MHRSD against the block visa"),
  F("Authorisation date", "e.g. 12/09/2026", "rp"),
  F("Valid for entry until", "11/03/2027", "oa", "The candidate must enter before this date or the visa lapses"),
  F("Passed to", "Enjaz &#183; Cairo &nbsp;&#9662;", "r")],
  "<b>The clock nobody watches.</b> A visa authorisation expires whether or not the candidate travels. "
  "We track it from issue so recruitment knows how long they really have.")

step("s-new-03", P, 3, N, "Enjaz &amp; Embassy Stamping", "Candidate, tracked by Rashid", [ENJ], [
  F("Enjaz application number", "ENJ-4471209833", "r"),
  F("Saudi mission", "Embassy of Saudi Arabia &#183; Cairo &nbsp;&#9662;", "r"),
  F("Wafid medical certificate", "Passed &#183; 28/09/2026 &nbsp;&#10003;", "og",
    "Approved centre only. A certificate from anywhere else is rejected"),
  F("Submitted to mission", "01/10/2026", "r"),
  F("Visa stamped", "09/10/2026", "r"),
  F("Visa sticker number", "6041227893", "r"),
  F("Entry valid until", "11/03/2027", "o"),
  F("Stamped passport page", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp")],
  "<b>Eight days of somebody else's process.</b> This step sits outside your control, which is exactly why "
  "it needs a date on both ends. Submitted and stamped are captured separately so the wait is visible.")

step("s-new-06", P, 6, N, "Medical Examination", "Employee, tracked by Rashid", [MUQ], [
  F("Approved centre", "Al Borg Medical &#183; Jeddah &nbsp;&#9662;", "r"),
  F("Appointment date", "05/11/2026", "r"),
  F("Attended", "Yes &nbsp;&#9662;", "r", "Reminder every 2 days until confirmed"),
  F("Result", "Fit &nbsp;&#9662;", "rg", "An unfit result routes the case to the HRBP, it does not stall"),
  F("Medical report", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp"),
  F("Fee (SAR)", "320", "r"),
  F("VAT (SAR)", "48", "r"),
  F("SADAD reference", "", "r")],
  "<b>Fit or offboard, not limbo.</b> An unfit result has a defined path of its own. What it never does "
  "is leave a case sitting open while somebody decides what to do.")

step("s-new-07", P, 7, N, "Biometrics &amp; Absher", "Employee, tracked by Rashid", [ABS], [
  F("Biometric appointment", "09/11/2026 &#183; 10:30", "r"),
  F("Location", "Jawazat Office &#183; Jeddah &nbsp;&#9662;", "r"),
  F("Fingerprints captured", "Yes &nbsp;&#9662;", "r"),
  F("Absher account created", "Yes &nbsp;&#10003;", "og", "This is where the employee sees everything from now on"),
  F("Mobile verified in Absher", "+966 55 240 1188 &nbsp;&#10003;", "og",
    "An unverified mobile blocks every later Absher notification"),
  F("National address registered", "Jeddah &#183; 23442 &nbsp;&#10003;", "og"),
  F("Appointment confirmation", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp"),
  F("Employee notified", "Yes &nbsp;&#9662;", "r")],
  "<b>Absher is not optional plumbing.</b> Everything you do on Muqeem appears in the employee's Absher "
  "account the same day. If their mobile is not verified, they see none of it and you hear about it later.")

step("s-new-10", P, 10, N, "Mudad Wage Protection", "Fatima Al Ghamdi", [MUD, QIWA], [
  F("Bank", "Al Rajhi Bank &nbsp;&#9662;", "r"),
  F("IBAN", "SA03 8000 0000 6080 1016 7519", "r"),
  F("Declared monthly wage (SAR)", "8,775", "r"),
  F("Matches Qiwa contract", "Yes &nbsp;&#10003;", "og",
    "A mismatch between Mudad and Qiwa is one of the most common inspection findings"),
  F("Payroll enrolment date", "01/12/2026", "r"),
  F("First WPS file", "December 2026 &nbsp;&#9662;", "r"),
  F("Payment channel", "Approved bank transfer", "o"),
  F("Mudad reference", "", "r")],
  "<b>Late pay is a fine, not a conversation.</b> Salaries must run through approved channels and match "
  "the authenticated contract. We check the two figures against each other before the first payroll runs.", tab="Report")

step("s-new-11", P, 11, N, "Nitaqat Recount", "System, reviewed by Omar Al Rasheed", [NIT, GOSI], [
  F("Establishment", "JED-OPS &#183; 7001234567", "o"),
  F("Weighted headcount before", "760", "o"),
  F("Weighted headcount after", "761", "o"),
  F("Saudization ratio before", "19.5%", "o"),
  F("Saudization ratio after", "19.4%", "oa", "A non-Saudi hire moves the ratio down"),
  F("Band before", "Green &#183; Mid", "og"),
  F("Band after", "Green &#183; Mid", "og", "Band holds. Headroom narrows from 1.9% to 1.8%"),
  F("Next Qiwa recalculation", "Fri 25 Sep 2026", "o")],
  "<b>Every hire moves the number.</b> Most companies see the effect at the next Qiwa cycle. Here it is "
  "visible the moment the person is registered, which is when you can still do something about it.", tab="Nitaqat")

step("s-new-12", P, 12, N, "Handover &amp; Confirmation", "Rashid, confirmed by employee", [SFB, ABS], [
  F("Iqama handed to employee", "Yes &nbsp;&#9662;", "r"),
  F("Handover date", "25/11/2026", "r"),
  F("Employee confirmation", "Confirmed in self-service &nbsp;&#10003;", "og"),
  F("Copy retained on file", "Yes &nbsp;&#10003;", "og"),
  F("Written back to Employee Central", "Iqama number, expiry, profession &nbsp;&#10003;", "og"),
  F("Renewal alert scheduled", "01/10/2027", "o", "Six weeks before the Hijri expiry"),
  F("Case closed", "Yes &nbsp;&#9662;", "r"),
  F("Total elapsed", "89 days", "o", "From block visa request to Iqama in hand")],
  "<b>Eighty-nine days, on the record.</b> Closing the case is also how the next one gets scheduled. The "
  "renewal alert is set from the real expiry date, not from a spreadsheet somebody has to remember.")

# ============================================================ IQAMA RENEWAL
P, N = "Iqama Renewal", 8
step("s-ren-01", P, 1, N, "Expiry Alert", "System", [SFB], [
  F("Employee", "Ibrahim Haddad &#183; 30011236", "o"),
  F("Iqama expiry (Hijri)", "1448-04-01", "o"),
  F("Iqama expiry (Gregorian)", "12/10/2026", "o"),
  F("Days remaining", "42", "oa"),
  F("Alert sent to", "Employee, PRO desk, HRBP", "o", "All three at once, not in sequence"),
  F("Escalation date", "28/09/2026", "oa", "Two weeks out, to the line manager and HR manager"),
  F("Renewal window opens", "Now &nbsp;&#10003;", "og"),
  F("Others expiring this month", "18", "o", "Iqamas cluster around hiring dates")],
  "<b>Eighteen in the same month.</b> Renewals bunch because hiring bunched. Seeing the cluster six weeks "
  "out is what lets finance fund it and the PRO desk sequence it.", tab="Iqama")

step("s-ren-02", P, 2, N, "Nitaqat Gate Check", "System, reviewed by HR", [NIT, QIWA], [
  F("Establishment", "RIY-HO &#183; 7001234567", "o"),
  F("Current band", "Green &#183; Mid", "og"),
  F("Saudization ratio", "28.4%", "o"),
  F("Renewal permitted", "Yes &nbsp;&#10003;", "og", "Checked before any fee is paid"),
  F("Transfers permitted", "Yes &nbsp;&#10003;", "og"),
  F("New block visas permitted", "Yes &nbsp;&#10003;", "og"),
  F("Headroom to next band", "1.9%", "oa"),
  F("If band drops", "Renewal blocked, levy already paid is not refunded", "od")],
  "<b>Check first, pay second.</b> A renewal paid for while the band blocks it is money gone. This gate "
  "costs nothing and runs automatically before the fee screen opens.", tab="Nitaqat")

step("s-ren-03", P, 3, N, "Qiwa Contract Validity", "Rashid Al Mutairi", [QIWA], [
  F("Qiwa contract number", "QC-7741-2025-118", "o"),
  F("Status", "Authenticated &nbsp;&#10003;", "og"),
  F("Contract expiry", "31/10/2027", "og", "Runs beyond the new Iqama period"),
  F("Profession on contract", "Maintenance Technician", "o"),
  F("Profession on Iqama", "Maintenance Technician &nbsp;&#10003;", "og", "The two must agree or Muqeem rejects the renewal"),
  F("Salary on contract (SAR)", "5,400", "o"),
  F("Matches Mudad", "Yes &nbsp;&#10003;", "og"),
  F("Action required", "None", "og")],
  "<b>Two words, one rejection.</b> If the profession on the contract and the profession on the Iqama do "
  "not match character for character, the renewal fails at Muqeem. We compare them before you get there.", tab="Iqama")

step("s-ren-05", P, 5, N, "Medical Insurance", "HR with the PRO desk", [CCHI], [
  F("Insurer", "Bupa Arabia &nbsp;&#9662;", "r"),
  F("Policy number", "BA-2026-441907", "r"),
  F("Insurance class", "Class C &nbsp;&#9662;", "r"),
  F("Cover from", "12/10/2026", "r"),
  F("Cover until", "11/10/2027", "rg", "Must cover the full new Iqama period or renewal is refused"),
  F("CCHI verification", "Verified &nbsp;&#10003;", "og", "Checked against the CCHI platform, no manual submission"),
  F("Premium (SAR)", "1,840", "r"),
  F("Dependants covered", "3 &nbsp;&#9662;", "r")],
  "<b>No cover, no Iqama.</b> CCHI verification is automatic now, which means a lapsed policy stops the "
  "renewal silently. We surface it here rather than at the Muqeem counter.", tab="Iqama")

step("s-ren-06", P, 6, N, "Muqeem Renewal", "Rashid Al Mutairi", [MUQ, ABS], [
  F("Muqeem transaction reference", "", "r"),
  F("Renewal period", "1 year &nbsp;&#9662;", "r"),
  F("New expiry (Hijri)", "1449-04-01", "o"),
  F("New expiry (Gregorian)", "01/10/2027", "o", "Both are written back to Employee Central"),
  F("Iqama print required", "No &#183; digital only &nbsp;&#9662;", "r"),
  F("Visible in Absher", "Same day &nbsp;&#10003;", "og"),
  F("Renewed Iqama copy", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp"),
  F("Confirmation to employee", "Sent &nbsp;&#10003;", "og")],
  "<b>Hijri in, Gregorian out.</b> Muqeem works in Hijri, your HR system does not. Both dates are stored "
  "so the next alert fires on the right day rather than eleven days late.", tab="Iqama")

step("s-ren-07", P, 7, N, "Employee Central Update", "System", [SFB], [
  F("Iqama number", "2445119087 &nbsp;&#10003;", "og"),
  F("New expiry (Gregorian)", "01/10/2027 &nbsp;&#10003;", "og"),
  F("New expiry (Hijri)", "1449-04-01 &nbsp;&#10003;", "og"),
  F("Profession", "Maintenance Technician &nbsp;&#10003;", "og"),
  F("Work permit status", "Valid &nbsp;&#10003;", "og"),
  F("Written at", "01/10/2026 14:22", "o"),
  F("Integration", "SAP Integration Suite &#183; monitored and retried", "o"),
  F("Next renewal alert", "20/08/2027", "o", "Scheduled from the new expiry automatically")],
  "<b>Nobody retypes anything.</b> Five fields go back into Employee Central through the same integration "
  "layer as everything else in your SAP landscape, so it is monitored and retried like any other flow.", tab="Report")

step("s-ren-08", P, 8, N, "Employee Confirmation", "Ibrahim Haddad", [ABS], [
  F("Notified", "01/10/2026 &#183; email and Absher", "o"),
  F("Collection required", "No &#183; digital Iqama &nbsp;&#9662;", "r"),
  F("Employee confirmed", "Confirmed &#183; 02/10/2026 &nbsp;&#10003;", "og"),
  F("Reminders sent", "0", "o", "Confirmed inside a day"),
  F("Queries raised", "None", "o"),
  F("Case status", "Closed &nbsp;&#10003;", "og"),
  F("Elapsed", "31 days", "o", "From alert to confirmed"),
  F("Cost recorded (SAR)", "12,090", "o", "Posted to GL 0000180206")],
  "<b>Thirty-one days, closed.</b> The employee confirms in self-service, the case closes itself, and the "
  "cost is already sitting against the right GL account.", tab="Iqama")

# ============================================================ EXIT & RE-ENTRY
P, N = "Exit &amp; Re-entry", 9
step("s-exit-01", P, 1, N, "Employee Request", "Abdulrahman Al Zahrani", [ABS], [
  F("Requested departure", "06/09/2026", "r"),
  F("Requested return", "28/10/2026", "r"),
  F("Days requested", "52", "o"),
  F("Destination", "Egypt &nbsp;&#9662;", "r"),
  F("Reason", "Annual leave &nbsp;&#9662;", "r"),
  F("Leave balance", "24 days", "oa", "Requesting 52 against a 24-day balance"),
  F("Unpaid days requested", "28 &nbsp;&#9662;", "r"),
  F("Emergency contact abroad", "+20 100 441 9082", "r")],
  "<b>Dates from the traveller, not from a rumour.</b> The person going is the one who knows when. Taking "
  "the dates here, in their own words, is what makes every later calculation trustworthy."),

step("s-exit-02", P, 2, N, "Line Manager Approval", "Khalid Al Dosari", [], [
  F("Requested by", "Abdulrahman Al Zahrani &#183; 30014782", "o"),
  F("Absence window", "06/09/2026 to 28/10/2026", "o"),
  F("Team cover arranged", "Yes &#183; Samir Haddad &nbsp;&#9662;", "r"),
  F("Clashes in team calendar", "None &nbsp;&#10003;", "og"),
  F("Leave balance check", "24 paid, 28 unpaid &nbsp;&#9662;", "r"),
  F("Decision", "Approved &nbsp;&#9662;", "rg"),
  F("Approved on", "28/08/2026", "o"),
  F("Comment", "Cover confirmed with the Riyadh team", "")],
  "<b>The business agrees before the government does.</b> An exit visa issued for time nobody approved is "
  "how a two-week trip becomes a three-month absence."),

step("s-exit-03", P, 3, N, "HR Eligibility Check", "Khalid Al Dosari", [MUQ, QIWA], [
  F("Iqama expiry (Gregorian)", "18/03/2027", "og", "Valid well past the intended return"),
  F("Iqama valid on return date", "Yes &nbsp;&#10003;", "og", "An Iqama that expires abroad makes the re-entry useless"),
  F("Outstanding traffic fines", "None &nbsp;&#10003;", "og"),
  F("Outstanding labour fines", "None &nbsp;&#10003;", "og"),
  F("Company loans outstanding", "SAR 0 &nbsp;&#10003;", "og"),
  F("Notice period served", "Not applicable", "o"),
  F("Exit history", "3 previous, all returned on time", "og"),
  F("Verdict", "Eligible &nbsp;&#10003;", "og")],
  "<b>Five checks, one of which is the whole point.</b> If the Iqama expires while they are outside the "
  "Kingdom, the re-entry visa in their passport is worth nothing."),

step("s-exit-05", P, 5, N, "Fee Payment", "Rashid Al Mutairi", [MUQ], [
  F("Visa type", "Single &#183; 2 months", "o"),
  F("Base fee (SAR)", "200", "o", "Single, up to two months"),
  F("Additional months", "0", "o", "SAR 100 each while inside the Kingdom"),
  F("Total (SAR)", "200", "o"),
  F("SADAD bill number", "", "r"),
  F("Paid on", "02/09/2026", "r"),
  F("GL account", "0000180211", "o"),
  F("SADAD receipt", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp")],
  "<b>Cheap now, expensive later.</b> Two hundred riyals today. Extending the same visa from outside the "
  "Kingdom costs double per month, and once it has expired it cannot be extended at all."),

step("s-exit-06", P, 6, N, "Visa Issued", "Rashid Al Mutairi", [MUQ, ABS], [
  F("Exit re-entry visa number", "ER-4471-2026-88104", "r"),
  F("Type", "Single entry", "o"),
  F("Valid from", "02/09/2026", "o"),
  F("Valid until", "02/11/2026", "oa", "Sixty days from issue"),
  F("Visible in Absher", "Yes &nbsp;&#10003;", "og", "The employee can show it at the border from their phone"),
  F("Printed copy issued", "No &nbsp;&#9662;", "r"),
  F("Employee notified", "02/09/2026 &nbsp;&#10003;", "og"),
  F("Return-by date", "Set on departure, not now", "oa", "Calculated when the actual departure is recorded")],
  "<b>Issued is not departed.</b> The visa window starts today, but the return-by date the employee "
  "actually has to meet is calculated from the day they leave, which may not be the day they planned."),

step("s-exit-07", P, 7, N, "Departure Recorded", "Rashid, confirmed by employee", [MUQ], [
  F("Planned departure", "06/09/2026", "o"),
  F("Actual departure", "09/09/2026", "rd", "Three days later than planned"),
  F("Port of exit", "King Khalid Intl &#183; Riyadh &nbsp;&#9662;", "r"),
  F("Confirmed by", "Employee in self-service &nbsp;&#10003;", "og"),
  F("Visa expiry", "02/11/2026", "o", "Unchanged. The visa window did not move with the traveller"),
  F("Days now available", "54", "oa", "Three fewer than planned"),
  F("Return-by date", "02/11/2026", "od"),
  F("Alerts scheduled", "19 Oct, 26 Oct, 31 Oct", "o", "Fourteen, seven and two days out")],
  "<b>This is the field that strands people.</b> The employee left three days late. The visa did not move. "
  "Anyone still counting from the planned date now has a return-by that is three days wrong."),

step("s-exit-08", P, 8, N, "Return Monitoring", "System, escalating to HR", [MUQ], [
  F("Return-by date", "02/11/2026", "od"),
  F("Days remaining", "-3", "od", "Overdue"),
  F("Alert at 14 days", "Sent 19/10 &#183; no response", "oa"),
  F("Alert at 7 days", "Sent 26/10 &#183; no response", "oa"),
  F("Alert at 2 days", "Sent 31/10 &#183; no response", "od"),
  F("Escalated to", "Line manager and HRBP &#183; 03/11", "od"),
  F("Contact attempts logged", "4 &#183; email, SMS, Absher, phone", "o",
    "The log matters if this becomes an absence case"),
  F("Current status", "Overdue &#183; Iqama at risk", "od")],
  "<b>Four contact attempts, all logged.</b> If this becomes a formal absence case, the employer has to "
  "show they tried to reach the worker through the registered channels. That evidence is being built here, "
  "automatically, while the case is still recoverable."),

step("s-exit-09", P, 9, N, "Re-entry Confirmed", "Rashid Al Mutairi", [MUQ, SFB], [
  F("Actual return", "31/10/2026", "rg", "Two days inside the window"),
  F("Port of entry", "King Khalid Intl &#183; Riyadh &nbsp;&#9662;", "r"),
  F("Iqama status", "Valid &nbsp;&#10003;", "og"),
  F("Visa consumed", "Yes &#183; single entry used", "o"),
  F("Days used", "52 of 54", "o"),
  F("Employee confirmed", "31/10/2026 &nbsp;&#10003;", "og"),
  F("Written to Employee Central", "Absence closed &nbsp;&#10003;", "og"),
  F("Case status", "Closed &nbsp;&#10003;", "og")],
  "<b>Closed, with two days to spare.</b> The Iqama survives, the absence record closes itself in "
  "Employee Central, and the next exit request for this employee starts with a clean history."),

# ============================================================ TRANSFER
P, N = "Sponsorship Transfer", 6
step("s-trf-01", P, 1, N, "Candidate Status Check", "Rashid Al Mutairi", [QIWA], [
  F("Candidate", "Faisal Ur Rahman &#183; Iqama 2398115604", "o"),
  F("Current sponsor", "Al Waha Trading &#183; 7004411982", "o"),
  F("Contract status", "Active &#183; ends 14/12/2026", "o"),
  F("Service with current employer", "2 years 4 months", "og"),
  F("Transfer eligibility", "Eligible &nbsp;&#10003;", "og", "Subject to the transfer rules in force"),
  F("Current employer objection", "None recorded", "og"),
  F("Profession on Iqama", "Storekeeper", "oa", "Changing it is a separate Qiwa process, not part of this one"),
  F("Previous transfers", "1", "o")],
  "<b>Check before you promise.</b> Transfers fail on facts that are visible in Qiwa from the start. "
  "Reading them first is the difference between an offer you can honour and one you cannot."),

step("s-trf-02", P, 2, N, "Nitaqat Impact Check", "System, reviewed by HR", [NIT], [
  F("Receiving establishment", "RIY-HO &#183; 7001234567", "o"),
  F("Band now", "Platinum", "og"),
  F("Saudization ratio now", "34.7%", "o"),
  F("Ratio after transfer", "34.6%", "og"),
  F("Band after transfer", "Platinum &nbsp;&#10003;", "og", "Band holds"),
  F("Slots consumed", "1", "o", "A transfer in counts the moment it completes"),
  F("Headroom after", "+6.1% clear", "og"),
  F("Verdict", "Proceed &nbsp;&#10003;", "og")],
  "<b>A transfer is a hire, as far as the ratio is concerned.</b> It consumes a slot the moment it "
  "completes. On a Platinum establishment that is fine. On one at the edge of its band it is not.", tab="Nitaqat"),

step("s-trf-04", P, 4, N, "New Qiwa Contract", "Rashid Al Mutairi", [QIWA, ABS], [
  F("New contract number", "", "r"),
  F("Job title (Arabic)", "&#1571;&#1605;&#1610;&#1606; &#1605;&#1587;&#1578;&#1608;&#1583;&#1593;", "r"),
  F("Job title (English)", "Storekeeper", "r", "Matching the profession already on the Iqama"),
  F("Contract type", "Indefinite &nbsp;&#9662;", "r"),
  F("Start date", "01/12/2026", "r"),
  F("Basic salary (SAR)", "4,800", "r"),
  F("Housing allowance (SAR)", "1,200", "r"),
  F("Employee acceptance", "Pending in Absher", "a", "The employee accepts it on their own account")],
  "<b>They have to agree, in Absher.</b> The contract is not authenticated until the employee accepts it "
  "on their own account. That is a feature, not friction."),

step("s-trf-05", P, 5, N, "Iqama Updated (Muqeem)", "Rashid Al Mutairi", [MUQ, ABS], [
  F("Previous sponsor", "Al Waha Trading &#183; 7004411982", "o"),
  F("New sponsor", "RIY-HO &#183; 7001234567 &nbsp;&#10003;", "og"),
  F("Iqama number", "2398115604", "o", "Unchanged. The person keeps their number"),
  F("Profession", "Storekeeper", "o"),
  F("Expiry (Hijri)", "1449-02-28", "o", "Unchanged. The transfer does not reset the clock"),
  F("Muqeem transaction reference", "", "r"),
  F("Updated in Absher", "Same day &nbsp;&#10003;", "og"),
  F("Updated Iqama copy", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp")],
  "<b>Same number, same expiry, new employer.</b> A transfer moves the sponsorship without restarting the "
  "residence, which is exactly why it is faster than a fresh hire."),

step("s-trf-06", P, 6, N, "GOSI &amp; Mudad Update", "Aisha Al Harbi with finance", [GOSI, MUD], [
  F("GOSI deregistration, old employer", "Complete &nbsp;&#10003;", "og"),
  F("GOSI registration, new employer", "", "r"),
  F("Contributory wage (SAR)", "6,000", "r", "Basic plus housing, agreeing with the new Qiwa contract"),
  F("Effective from", "01/12/2026", "r"),
  F("Mudad enrolment", "Added to December payroll &nbsp;&#10003;", "og"),
  F("Bank details verified", "Yes &nbsp;&#10003;", "og"),
  F("Service continuity", "Preserved for end-of-service", "og"),
  F("Case status", "Closed &nbsp;&#10003;", "og")],
  "<b>The quiet one that bites later.</b> If GOSI and Mudad do not follow the transfer, the first payroll "
  "run is a wage protection exception and the employee's service history has a hole in it.", tab="Report"),

# ============================================================ FINAL EXIT
P, N = "Final Exit", 6
step("s-fin-01", P, 1, N, "End of Service Settled", "Khalid Al Dosari with finance", [QIWA], [
  F("Employee", "Tariq Mansour &#183; 30009915", "o"),
  F("Service length", "6 years 3 months", "o"),
  F("Reason for leaving", "Resignation &nbsp;&#9662;", "r"),
  F("End-of-service award (SAR)", "42,750", "o", "Calculated on the Labour Law formula"),
  F("Accrued leave (SAR)", "8,400", "o"),
  F("Total settlement (SAR)", "51,150", "o"),
  F("Leaver acceptance", "Accepted &#183; 14/08/2026 &nbsp;&#10003;", "og",
    "Final exit is held until the leaver accepts. It is not optional"),
  F("Status", "Settled &nbsp;&#10003;", "og")],
  "<b>No settlement, no exit.</b> The case is held at pending acceptance until the leaver agrees the "
  "number. Pushing a final exit through before that is how a clean departure becomes a labour case."),

step("s-fin-02", P, 2, N, "Dues &amp; Loans Clearance", "Fatima Al Ghamdi", [], [
  F("Outstanding company loan (SAR)", "0 &nbsp;&#10003;", "og"),
  F("Salary advances (SAR)", "0 &nbsp;&#10003;", "og"),
  F("Company assets returned", "Laptop, phone, access card &nbsp;&#10003;", "og"),
  F("Company vehicle", "Not applicable", "o"),
  F("Housing handover", "Cleared &#183; 12/08/2026 &nbsp;&#10003;", "og"),
  F("Traffic fines in employee name", "SAR 0 &nbsp;&#10003;", "og", "Unpaid fines block the exit visa"),
  F("Final payroll", "August 2026 &nbsp;&#9662;", "r"),
  F("Clearance", "Complete &nbsp;&#10003;", "og")],
  "<b>Everything unrecovered becomes unrecoverable.</b> Once the employee has left the Kingdom, a loan "
  "balance or an unreturned asset is a write-off. This is the last point at which it is not.", tab="Report"),

step("s-fin-03", P, 3, N, "Qiwa Contract Termination", "Rashid Al Mutairi", [QIWA], [
  F("Contract number", "QC-5510-2020-441", "o"),
  F("Termination reason code", "Resignation &#183; Article 81 not invoked &nbsp;&#9662;", "r",
    "The code follows the employee and affects their future transfers"),
  F("Notice period served", "60 days &nbsp;&#10003;", "og"),
  F("Last working day", "31/08/2026", "r"),
  F("Termination date in Qiwa", "31/08/2026", "r"),
  F("Employee acknowledgement", "Acknowledged in Absher &nbsp;&#10003;", "og"),
  F("Work permit cancelled", "Yes &nbsp;&#10003;", "og"),
  F("Qiwa reference", "", "r")],
  "<b>The reason code outlives the employment.</b> It follows the person into their next job and shapes "
  "what they can do next. Choosing it carelessly is unfair to them and disputable by them."),

step("s-fin-04", P, 4, N, "Final Exit Visa (Muqeem)", "Rashid Al Mutairi", [MUQ, ABS], [
  F("Final exit visa number", "", "r"),
  F("Issued on", "01/09/2026", "r"),
  F("Must depart by", "01/10/2026", "ra", "The visa expires. Overstaying it is a fine and a ban"),
  F("Dependants included", "2 &nbsp;&#9662;", "r", "Dependants must leave on the same visa"),
  F("Fee (SAR)", "70", "r"),
  F("SADAD bill number", "", "r"),
  F("Visible in Absher", "Yes &nbsp;&#10003;", "og"),
  F("Flight booked", "28/09/2026 &nbsp;&#9662;", "r")],
  "<b>Thirty days, and the dependants travel too.</b> A final exit covers the family on the same visa. "
  "Forgetting a dependant is how one departure turns into two problems."),

step("s-fin-05", P, 5, N, "Departure &amp; Iqama Cancellation", "Rashid Al Mutairi", [MUQ], [
  F("Actual departure", "28/09/2026 &nbsp;&#10003;", "og", "Three days inside the window"),
  F("Port of exit", "King Abdulaziz Intl &#183; Jeddah &nbsp;&#9662;", "r"),
  F("Dependants departed", "2 of 2 &nbsp;&#10003;", "og"),
  F("Iqama cancelled", "Yes &#183; 28/09/2026 &nbsp;&#10003;", "og"),
  F("Removed from establishment file", "Yes &nbsp;&#10003;", "og",
    "A live Iqama for someone who has gone is a liability on your file"),
  F("Levy liability ends", "28/09/2026", "og", "Stops the monthly charge"),
  F("Exit confirmation", 'Upload file&hellip; &nbsp;<span style="color:#0B5FD9;font-weight:700">Browse</span>', "rp"),
  F("Status", "Departed &nbsp;&#10003;", "og")],
  "<b>Cancel it or keep paying for it.</b> An Iqama left live after someone has gone keeps accruing levy "
  "and keeps sitting on your establishment file as a person you are responsible for."),

step("s-fin-06", P, 6, N, "Nitaqat &amp; Records Update", "System, notified to HR", [NIT, GOSI, SFB], [
  F("Weighted headcount before", "761", "o"),
  F("Weighted headcount after", "760", "o"),
  F("Saudization ratio before", "19.4%", "o"),
  F("Saudization ratio after", "19.5%", "og", "A non-Saudi leaver moves the ratio up"),
  F("Band", "Green &#183; Mid &nbsp;&#10003;", "og", "Headroom improves from 1.8% to 1.9%"),
  F("GOSI deregistration", "Complete &nbsp;&#10003;", "og"),
  F("Employee Central", "Separation completed &nbsp;&#10003;", "og"),
  F("Total cost of departure (SAR)", "51,220", "o", "Settlement plus exit visa, posted to GL")],
  "<b>Even leaving moves the number.</b> A non-Saudi departure nudges your ratio up and your headroom "
  "with it. Knowing that before a redundancy round is worth more than knowing it after.", tab="Nitaqat"),
