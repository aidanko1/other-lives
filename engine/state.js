/* Versioned load boundary and observational invariants; never overwrite the input save. */
(function (O) {
 'use strict';
 O.SAVE_VERSION = 1;
 O.migrateLife = function (input) {
  if (!input || typeof input !== 'object' || !input.id || !input.country?.code || !Array.isArray(input.journal) || !Array.isArray(input.people)) throw Error('Invalid life record.');
  if ((input.schemaVersion || 0) > O.SAVE_VERSION) throw Error('This save requires a newer version of Other Lives.');
  const s = JSON.parse(JSON.stringify(input));
  if (!s.schemaVersion) {
   s.schoolAccess ??= !!s.school;
   if (s.age < O.rules.schoolStartAge) s.school = false;
   s.flags ??= {}; s.used ??= {}; s.choiceHistory ??= [];
   if(s.pending&&s.used[s.pending]===s.age&&!s.journal.some(e=>e.eventId===s.pending))s.flags.legacyPendingUsage=s.pending;
   // New journals identify their event; old prose is not evidence of a particular command.
   for (const entry of s.journal) if (entry.eventId) s.used[entry.eventId] = Math.max(s.used[entry.eventId] ?? -1, entry.age);
   s.schemaVersion = 1;
  }
  O.ensureTimeline(s); O.ensureClarity(s);
  return s;
 };
 O.consistencyIssues = function (s) {
  const issues = [];
  const issue = (code, message) => issues.push({code, message});
  if (!Number.isInteger(s.age) || s.age < 0 || s.age > 120) issue('age', 'Invalid player age.');
  if (!Number.isInteger(s.month) || s.month < 0 || s.month > 11) issue('month', 'Invalid month.');
  if (!['alive', 'paused', 'finished'].includes(s.status)) issue('status', 'Unknown life status.');
  for (const key of ['cash', 'debt', 'income', 'investments', 'property', 'familyCash', 'familyAssets']) if (!Number.isFinite(s[key]) || s[key] < 0) issue('money.' + key, 'Invalid ' + key + '.');
  for (const key of ['health', 'happiness', 'knowledge', 'relationships', 'stress', 'confidence']) if (!Number.isFinite(s[key]) || s[key] < 0 || s[key] > 100) issue('factor.' + key, 'Invalid ' + key + '.');
  if (s.age < 6 && s.school) issue('school.preschool', 'Formal school enrolment before school-entry age.');
  if (s.age < 16 && s.job && s.job !== 'Retired') issue('work.child', 'Adult employment assigned to a child.');
  if (O.rules.fullTimeStudy(s) && s.job && s.employment?.mode === 'full-time') issue('commitment.work-study', 'Full-time employment during full-time study.');
  if (s.study?.status === 'completed' && s.school) issue('study.completed-enrolment', 'Completed degree still enrolled.');
  if (s.study?.status === 'completed' && Number.isFinite(s.study.progress) && s.study.progress < s.study.duration) issue('study.credits', 'Qualification awarded before credits completed.');
  if (s.housing?.mortgage?.balance > s.debt + 1) issue('debt.mortgage', 'Secured balance exceeds total debt.');
  if (s.people.filter(p => p.alive && p.role === 'Partner').length > 1) issue('family.partners', 'Multiple current partnerships.');
  const ids = new Set();
  for (const p of s.people) {
   if (!p.id || ids.has(p.id)) issue('person.id', 'Missing or duplicate person identity.'); ids.add(p.id);
   if (!Number.isInteger(p.age) || p.age < 0 || p.age > 160) issue('person.age', 'Invalid family/contact age.');
   if (!p.alive && p.diedAt !== undefined && p.age !== p.diedAt) issue('person.death-age', 'A deceased person continued ageing.');
   if (p.role === 'Partner' && p.age < 18 && ((p.knownSince ?? 0) >= 18 || ['cohabiting','married'].includes(p.relationshipStage) || s.age - p.age > 2)) issue('family.partner-age', 'Adult partnership with a child.');
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
