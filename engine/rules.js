/* Shared simulation contracts. Queries do not consume simulation randomness. */
(function (O) {
 'use strict';
 O.VERSION='6.2.0-dev.1';
 const repeatable = new Set(['career-search-results', 'choose-degree-subject', 'university-funding-review', 'degree-assessment-review', 'life-route-decision', 'graduate-next-step']);
 O.rules = {
  schoolStartAge: 6,
  attendingSchool: s => s.age >= 6 && !!s.school,
  fullTimeStudy: s => s.study?.mode === 'full-time' && ['enrolled', 'overseas-route'].includes(s.study.status),
  routeConflict(s,d) {
   if(s.institution&&d.exclusive!=='institution'&&!d.institution)return 'This plan must wait until your institutional commitment ends.';
   const research=Object.values(s.routes?.active||{}).find(r=>r.id==='masters'&&r.stage==='studying'||r.id==='phd'&&r.stage==='research');
   if(research&&['overseas-work','military','seafaring','politics','vocation','business','family-enterprise'].includes(d.id))return 'Resolve the current postgraduate commitment first.';
   if(this.fullTimeStudy(s)&&(d.exclusive==='rare-career'||['seafaring','politics','vocation','business','family-enterprise','masters','phd','faculty'].includes(d.id)))return 'Complete or pause your full-time course before committing to this work route.';
   if(s.business&&['overseas-study','masters','phd'].includes(d.id))return 'Resolve your business responsibilities before this study commitment.';
   return null;
  },
  eventBlock(s, e, {resolving = false} = {}) {
   if (!e) return 'Unknown decision.';
   if (s.status !== 'alive') return 'This life is not active.';
   if (s.age < e.min || s.age > e.max) return 'This decision does not fit your current age.';
   if (!e.when(s)) return 'The circumstances for this decision have changed.';
   // Staged decisions own their stage/serial/funding prerequisites, not a global cooldown.
   if (!repeatable.has(e.id) && s.used[e.id] !== undefined && !(resolving && s.flags.legacyPendingUsage === e.id)) {
    if (e.milestone) return 'This milestone is already recorded.';
    if (s.age - s.used[e.id] < (e.cooldown ?? 7)) return 'This decision needs time before recurring.';
   }
   return null;
  }
 };
 O.eventEligible = (s, e, options) => !O.rules.eventBlock(s, e, options);
 O.shuffle = (s, values) => {
  const result = values.slice();
  for (let i = result.length - 1; i > 0; i--) { const j = O.int(s, 0, i); [result[i], result[j]] = [result[j], result[i]]; }
  return result;
 };
 O.familyFundingQuote = function (s, gross, {grantRate = 0, familyShare = 1, allowFamily = true} = {}) {
  const budget = O.parentStudyBudget(s);
  gross = Math.max(0, Math.round(gross));
  const grant = Math.round(gross * Math.max(0, Math.min(1, grantRate)));
  const fee = gross - grant;
  const family = allowFamily ? Math.min(fee, Math.floor((budget.cash + budget.assets) * Math.max(0, Math.min(1, familyShare)))) : 0;
  const cashPart = Math.min(family, budget.cash), assetPart = family - cashPart;
  return {gross, grant, fee, family, cashPart, assetPart, personal: fee - family, budget};
 };
 O.commitFamilyGift = function (s, quote) {
  if (![quote.cashPart, quote.assetPart].every(n => Number.isFinite(n) && n >= 0) || quote.cashPart > s.familyCash || quote.assetPart > s.familyAssets) throw Error('Family contribution exceeds available funds.');
  s.familyCash -= quote.cashPart; s.familyAssets -= quote.assetPart;
 };
 O.payStudyFunding = function (s, gross, options) {
  const quote = O.familyFundingQuote(s, gross, options);
  if (s.cash < quote.personal) return {ok: false, message: 'Your share exceeds available savings.', quote};
  O.commitFamilyGift(s, quote); s.cash -= quote.personal;
  return {ok: true, quote};
 };
})(window.OL);
