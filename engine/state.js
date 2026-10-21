/* Versioned load boundary and observational invariants; never overwrite the input save. */
(function (O) {
 'use strict';
 O.SAVE_VERSION = 2;
 const trackInvalid=s=>{const t=s.flags?.educationTrack;return t&&['academic','vocational','postgraduate'].includes(t.route)&&t.passed&&(t.status!=='completed'||!Number.isFinite(t.admittedAt)||t.admittedAt<t.started||t.admittedAt>s.age||t.progress<(t.required||2));};
 O.migrateLife = function (input) {
  if (!input || typeof input !== 'object' || !input.id || !input.country?.code || !Array.isArray(input.journal) || !Array.isArray(input.people)) throw Error('Invalid life record.');
  if ((input.schemaVersion || 0) > O.SAVE_VERSION) throw Error('This save requires a newer version of Other Lives.');
  if(input.storyFlow&&input.storyFlow.version!==1)throw Error('This save requires a newer story-flow model.');
  if(input.schoolRecord&&input.schoolRecord.version!==1)throw Error('This save requires a newer schooling model.');
  if(input.schoolRecord&&(!input.schoolRecord.profile||!Array.isArray(input.schoolRecord.years)||!Array.isArray(input.schoolRecord.awards)))throw Error('Invalid schooling record.');
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
  if(s.storyFlow){
   if(s.storyFlow.version!==1)issue('story.model','Unknown story-flow model.');
   for(const e of s.journal.filter(e=>e.cause)){const c=e.cause;if(!s.choiceHistory.some(x=>x.eventId===c.eventId&&x.age===c.age&&x.month===c.month&&x.index===c.index)||c.age>=e.age||c.personId&&!s.people.some(p=>p.id===c.personId))issue('story.cause','Story consequence without an earlier recorded choice or participant.');}
  }
  if(s.mortalityTiming?.version===1&&(!Number.isInteger(s.mortalityTiming.infantMonths)||s.mortalityTiming.infantMonths<0||s.mortalityTiming.infantMonths>12))issue('mortality.receipt','Invalid first-year mortality receipt.');
  if (!['alive', 'paused', 'finished'].includes(s.status)) issue('status', 'Unknown life status.');
  for (const key of ['cash', 'debt', 'income', 'investments', 'property', 'familyCash', 'familyAssets', 'familyDebts']) if (!Number.isFinite(s[key]) || s[key] < 0) issue('money.' + key, 'Invalid ' + key + '.');
  for (const key of ['health', 'happiness', 'knowledge', 'relationships', 'stress', 'confidence']) if (!Number.isFinite(s[key]) || s[key] < 0 || s[key] > 100) issue('factor.' + key, 'Invalid ' + key + '.');
  if (s.age < 6 && s.school) issue('school.preschool', 'Formal school enrolment before school-entry age.');
  if(s.schoolRecord){
   const r=s.schoolRecord,p=r.profile,years=Array.isArray(r.years)?r.years:[],awards=Array.isArray(r.awards)?r.awards:[];
   if(!Array.isArray(r.years)||!Array.isArray(r.awards)||!Number.isInteger(s.schooling)||s.schooling!==years.filter(y=>y.attended).length)issue('school.periods','Completed school periods disagree with attendance.');
   if(r.version!==1||!p||p.startAge!==6||p.primaryYears!==6||![6,7].includes(p.secondaryYears)||!O.COUNTRIES.some(c=>c.code===p.countryCode))issue('school.profile','Unknown or invalid schooling profile.');
   if(!Number.isInteger(r.lastAge)||r.lastAge<0||r.lastAge>s.age||years.some((y,i)=>!Number.isInteger(y.age)||y.age<=6||y.age>s.age||i>0&&y.age<=years[i-1].age||typeof y.attended!=='boolean'||typeof y.formal!=='boolean'))issue('school.timeline','Invalid or duplicated attendance period.');
   const formal=years.filter(y=>y.attended&&y.formal).length;
   if(awards.some(a=>!Number.isInteger(a.age)||a.age<6||a.age>s.age||!Number.isInteger(a.level)||a.level<1||a.level>5||!Number.isFinite(a.credits)||!Number.isFinite(a.required)||a.required<1||a.credits<a.required))issue('school.award','Qualification without completed required study.');
   if(p&&awards.some(a=>a.source==='school'&&formal<p.primaryYears||a.level===2&&['school-assessment','local-course'].includes(a.source)&&formal<p.primaryYears+p.secondaryYears))issue('school.credits','School qualification without sufficient recorded attendance.');
   if(awards.some((a,i)=>awards.slice(0,i).some(b=>b.level===a.level&&b.name===a.name)))issue('school.duplicate-award','Qualification awarded twice.');
   if(trackInvalid(s))issue('school.course','School course completed without attendance or a valid timeline.');
  }
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
