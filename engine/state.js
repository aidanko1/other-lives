/* Versioned load boundary and observational invariants; never overwrite the input save. */
(function (O) {
 'use strict';
 O.SAVE_VERSION = 2;
 O.migrateLife = function (input) {
  if (!input || typeof input !== 'object' || !input.id || !input.country?.code || !Array.isArray(input.journal) || !Array.isArray(input.people)) throw Error('Invalid life record.');
  if ((input.schemaVersion || 0) > O.SAVE_VERSION) throw Error('This save requires a newer version of Other Lives.');
  const s = JSON.parse(JSON.stringify(input));
  if((s.schemaVersion||0)<2&&Number.isFinite(s.familyAssets)&&s.familyAssets<0){
   const deficit=-s.familyAssets;s.flags??={};(s.flags.legacyRepairs??=[]).push({field:'familyAssets',from:s.familyAssets,to:0,householdDebtAdded:deficit,reason:'Negative legacy assets retained as household liability'});
   s.familyAssets=0;s.familyDebts=(s.familyDebts||0)+deficit;
  }
  if (!s.schemaVersion) {
   s.schoolAccess ??= !!s.school;
   if (s.age < O.rules.schoolStartAge) s.school = false;
   s.flags ??= {}; s.used ??= {}; s.choiceHistory ??= [];
   // Early saves did not track liquid family savings. Do not invent a balance from income.
   if(s.familyCash===undefined){s.familyCash=0;s.flags.legacyFamilyCashUnknown=true;}
   if(s.pending&&s.used[s.pending]===s.age&&!s.journal.some(e=>e.eventId===s.pending))s.flags.legacyPendingUsage=s.pending;
   // New journals identify their event; old prose is not evidence of a particular command.
   for (const entry of s.journal) if (entry.eventId) s.used[entry.eventId] = Math.max(s.used[entry.eventId] ?? -1, entry.age);
   // Unversioned records need structural adapters once. Preserve their authored history.
   const history=JSON.parse(JSON.stringify(s.journal));
   s.month??=0;s.storyUsed??={};O.upgradeLife(s);O.ensureClarity(s);s.journal=history;
   s.schemaVersion = 1;
  }
  if(s.schemaVersion===1){O.initializePropertyLedger(s);s.schemaVersion=2;}
  return s;
 };
 O.consistencyIssues = function (s) {
  const issues = [];
  const issue = (code, message) => issues.push({code, message});
  if (!Number.isInteger(s.age) || s.age < 0 || s.age > 120) issue('age', 'Invalid player age.');
  if (!Number.isInteger(s.month) || s.month < 0 || s.month > 11) issue('month', 'Invalid month.');
  if(s.mortalityTiming?.version===1&&(!Number.isInteger(s.mortalityTiming.infantMonths)||s.mortalityTiming.infantMonths<0||s.mortalityTiming.infantMonths>12))issue('mortality.receipt','Invalid first-year mortality receipt.');
  if (!['alive', 'paused', 'finished'].includes(s.status)) issue('status', 'Unknown life status.');
  for (const key of ['cash', 'debt', 'income', 'investments', 'property', 'familyCash', 'familyAssets', 'familyDebts']) if (!Number.isFinite(s[key]) || s[key] < 0) issue('money.' + key, 'Invalid ' + key + '.');
  for (const key of ['health', 'happiness', 'knowledge', 'relationships', 'stress', 'confidence']) if (!Number.isFinite(s[key]) || s[key] < 0 || s[key] > 100) issue('factor.' + key, 'Invalid ' + key + '.');
  if (s.age < 6 && s.school) issue('school.preschool', 'Formal school enrolment before school-entry age.');
  if (s.age < 16 && s.job && s.job !== 'Retired') issue('work.child', 'Adult employment assigned to a child.');
  if (O.rules.fullTimeStudy(s) && s.job && s.employment?.mode === 'full-time') issue('commitment.work-study', 'Full-time employment during full-time study.');
  if (s.study?.status === 'completed' && s.school) issue('study.completed-enrolment', 'Completed degree still enrolled.');
  if (s.study?.status === 'completed' && Number.isFinite(s.study.progress) && s.study.progress < s.study.duration) issue('study.credits', 'Qualification awarded before credits completed.');
  const secured=O.securedBalance(s),plans=s.flags?.billPlans||[];
  if (secured > s.debt + .001) issue('debt.mortgage', 'Secured balances exceed total debt.');
  if(plans.some(p=>!Number.isFinite(p.balance)||p.balance<0||!Number.isInteger(p.monthsLeft)||p.monthsLeft<0))issue('debt.plan','Invalid scheduled bill balance or term.');
  if(secured+plans.reduce((n,p)=>n+p.balance,0)>s.debt+.001)issue('debt.components','Scheduled and secured liabilities exceed recorded debt.');
  const properties=s.propertyLedger?.properties;
  if(properties?.length){
   if(new Set(properties.map(p=>p.id)).size!==properties.length||properties.some(p=>!p.id))issue('property.identity','Missing or duplicate property identity.');
   if(properties.some(p=>!Number.isFinite(p.value)||p.value<0||!['home','rental','unclassified'].includes(p.kind)))issue('property.value','Invalid dwelling value or use.');
   if(properties.filter(p=>p.kind==='home').length>1)issue('property.home','More than one current owned home.');
   if(properties.some(p=>p.acquiredAge!==null&&(!Number.isInteger(p.acquiredAge)||p.acquiredAge>s.age||p.acquiredAge<18)))issue('property.timeline','Property purchase outside the recorded adult timeline.');
   if(Math.abs(properties.reduce((n,p)=>n+p.value,0)-s.property)>.001)issue('property.total','Dwelling values disagree with total property.');
   if(Math.abs(properties.filter(p=>p.kind==='rental').reduce((n,p)=>n+p.value,0)-(s.flags.rentalPropertyValue||0))>.001)issue('property.rentals','Rental values disagree with rental income assets.');
   const home=properties.find(p=>p.kind==='home');if(home&&(s.housing?.kind!=='owned'||home.value!==s.housing.value))issue('property.residence','Owned dwelling disagrees with current housing.');
  }
  if (s.people.filter(p => p.alive && p.role === 'Partner').length > 1) issue('family.partners', 'Multiple current partnerships.');
  const ids = new Set();
  for (const p of s.people) {
   if (!p.id || ids.has(p.id)) issue('person.id', 'Missing or duplicate person identity.'); ids.add(p.id);
   if (!Number.isInteger(p.age) || p.age < 0 || p.age > 160) issue('person.age', 'Invalid family/contact age.');
   if (!p.alive && p.diedAt !== undefined && p.age !== p.diedAt) issue('person.death-age', 'A deceased person continued ageing.');
   if(p.alive&&['Mother','Father'].includes(O.parentRole(p))&&p.age-s.age<14)issue('family.parent-timeline','Living parent age contradicts the player’s birth.');
   if(p.role==='Child'&&p.age>s.age-14)issue('family.child-timeline','Child age contradicts the parent’s age.');
   if (p.role === 'Partner' && p.age < 18 && ((p.knownSince ?? 0) >= 18 || ['cohabiting','married'].includes(p.relationshipStage) || p.alive && s.age - p.age > 2)) issue('family.partner-age', 'Adult partnership with a child.');
  }
  if (s.pending && !O.EVENTS.some(e => e.id === s.pending)) issue('decision.unknown', 'Unknown pending decision.');
  for (const r of Object.values(s.routes?.active || {})) {
   if (!O.ROUTES.some(d => d.id === r.id)) issue('route.unknown', 'Unknown active route.');
   if (r.started > s.age || r.due < r.started || !Number.isFinite(r.due)) issue('route.timeline', 'Broken route timeline.');
  }
  for (const e of s.journal) if (!Number.isInteger(e.age) || e.age < 0 || e.age > s.age) issue('journal.timeline', 'Journal entry outside this life timeline.');
  if (s.status === 'finished' && s.pending) issue('ending.pending', 'Finished life has an unresolved decision.');
  return issues;
 };
 O.assertConsistent = function (s) { const issues = O.consistencyIssues(s); if (issues.length) throw Error(issues.map(x => x.code + ': ' + x.message).join('; ')); };
 O.transitionIssues = function (before, after) {
  const issues = [];
  if (after.age < before.age || after.age * 12 + after.month < before.age * 12 + before.month) issues.push('Time moved backwards.');
  if (after.age - before.age > 1) issues.push('Clock skipped more than one year.');
  for (const p of before.people) {
   const q = after.people.find(q => q.id === p.id);
   if (!q) issues.push('A person disappeared from history: ' + p.id);
   else if (!p.alive && (q.alive || q.age !== p.age)) issues.push('A deceased person revived or aged: ' + p.id);
   else if (q.age < p.age || q.age - p.age > after.age - before.age) issues.push('Person age contradicts elapsed time: ' + p.id);
  }
  return issues;
 };
 O.archiveRecord = (records, current, id) => records.find(s => s.id === id) || (current?.id === id || id === 'current' ? current : null);
})(window.OL);
