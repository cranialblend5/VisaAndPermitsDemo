/* Sizing model: one Saudi customer, 1,000 employees.
   Capacity-unit rates marked [SAP] are taken from SAP's own Build Runtime
   Capacity Unit Calculator (ap-capacityestimator-live.cfapps.eu10.hana.ondemand.com,
   read September 2026). SAP Discovery Center lists 1.00 EUR per capacity unit.
   The SAP HANA Cloud line comes from the HANA Cloud Capacity Unit Estimator and
   is the one figure to re-confirm with the account team before quoting. */

const RATE = {            // capacity units
  cfRuntimePerGB:   85,        // [SAP] per GB of runtime memory, per month
  transportMgmt:    18,        // [SAP] per month
  cicd:             2.7,       // [SAP] per month
  docStorage:       123,       // [SAP] per storage block, per month
  docApiCall:       0.54,      // [SAP] per API call block
  alertApiCall:     0.00125,   // [SAP] per notification
  unattendedBot:    16,        // [SAP] per unattended automation, per month
};

/* --- demand, derived from 1,000 employees in the Kingdom --- */
const EMP          = 1000;
const EXPAT_SHARE  = 0.70;                      // typical Saudi private-sector mix
const expats       = EMP * EXPAT_SHARE;         // 700
const D = {
  iqamaRenewals:   expats,                      // 700/yr, one per expat
  newWorkVisas:    Math.round(EMP * 0.15),      // 150/yr at 15% turnover
  exitReentry:     Math.round(expats * 1.4),    // 980/yr
  finalExits:      Math.round(EMP * 0.10),      // 100/yr
};
D.casesPerYear  = D.iqamaRenewals + D.newWorkVisas + D.exitReentry + D.finalExits;
D.tasksPerYear  = D.casesPerYear * 12;          // ~12 tracked steps per case
D.docsPerYear   = D.casesPerYear * 8;           // ~8 documents per case
D.alertsPerMonth= Math.round(D.casesPerYear * 4 / 12);  // expiry + due-date alerts

/* --- what that means technically --- */
const SIZE = {
  cfProdGB:     6,     // 2 x 2 GB application, 2 x 0.5 GB router, 1 GB job worker
  cfNonProdGB:  4,     // development and test
  docStorageGB: 25,    // 3 years of case documents at ~400 KB each
  botCount:     6,     // unattended automations against the portals
};

const LINES = [
  ['SAP BTP, Cloud Foundry runtime', `${SIZE.cfProdGB + SIZE.cfNonProdGB} GB memory (production and non-production)`,
   (SIZE.cfProdGB + SIZE.cfNonProdGB) * RATE.cfRuntimePerGB, 'SAP rate card'],
  ['SAP HANA Cloud', '32 GB memory, 2 vCPU, 120 GB storage', 1400, 'Confirm in estimator'],
  ['SAP Document Management service', `${SIZE.docStorageGB} GB plus ${Math.round(D.docsPerYear/12)} documents a month`,
   Math.round(RATE.docStorage + 100 * RATE.docApiCall), 'SAP rate card'],
  ['SAP Build Process Automation', `${SIZE.botCount} unattended automations`,
   SIZE.botCount * RATE.unattendedBot, 'SAP rate card'],
  ['SAP Alert Notification service', `${D.alertsPerMonth.toLocaleString()} notifications a month`,
   Math.round(D.alertsPerMonth * RATE.alertApiCall), 'SAP rate card'],
  ['SAP Cloud Transport Management', 'One landscape, three tiers', RATE.transportMgmt, 'SAP rate card'],
  ['SAP Continuous Integration and Delivery', 'One pipeline', Math.round(RATE.cicd), 'SAP rate card'],
];

const monthly = LINES.reduce((a, l) => a + l[2], 0);
const annual  = monthly * 12;

module.exports = { RATE, D, SIZE, LINES, monthly, annual, EMP, expats };

if (require.main === module) {
  console.log(`Demand from ${EMP} employees (${expats} expatriates):`);
  console.log(`  ${D.casesPerYear} permit cases a year · ${D.tasksPerYear.toLocaleString()} tracked tasks · ${D.docsPerYear.toLocaleString()} documents`);
  console.log(`  renewals ${D.iqamaRenewals} · new visas ${D.newWorkVisas} · exit and re-entry ${D.exitReentry} · final exits ${D.finalExits}\n`);
  for (const [n, b, cu] of LINES) console.log(`  ${String(cu).padStart(5)} CU  ${n}  (${b})`);
  console.log(`\n  ${String(monthly).padStart(5)} CU per month`);
  console.log(`  ${annual.toLocaleString()} CU per year  =  EUR ${annual.toLocaleString()} at list, before any discount`);
}
