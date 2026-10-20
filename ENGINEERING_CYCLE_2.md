# Annual cost and read boundaries — development cycle 2

Base: 2aea0384c92e3c2552b46e1196fd248b7cf76b30. Work continues on draft PR 2; production main remains 4072fd4.

## Acceptance and fidelity
Preserve the existing chronological life loop, costs, family funding, optional policies, routes, controls and original art. No new player interaction. Quotes and profile/family/spending/finance/art inspection must not settle finances, retire people or rewrite history. Current-schema reload must preserve the complete serialized state. Unversioned migration must be idempotent, preserve authored journals and not pay an estate. Annual cost commitments must have one owner, conserve family withdrawals/personal tuition and survive repeated calls/reload without duplicate gifts. The rest of the annual pipeline remains incremental architectural work.

## Implementation
`engine/finance.js` replaces the living-cost implementation and seven successive wrappers. It produces a pure quote and explicitly commits tuition renewal, living support and optional-policy exits with a saved once-per-age receipt, conservation assertions and rollback. `livingCost` remains an explicitly mutating compatibility alias. `engine/core.js` calls `settleAnnualCosts` directly. Existing degree payment recording is reused, not duplicated.

Read helpers in clarity/experience/dynamics, UI render and household art no longer run adapters. Appearance calculation is pure; initialization persists appearance explicitly. Estate/trust settlement moves out of the general repair helper into `settleFamilyEstate`, called by the existing annual family handler. Versioned current loads clone without replaying legacy adapters; unversioned records run structural adapters once and preserve their original journal.

## Reproductions and test integrity
New finance-boundary regressions first failed before implementation: missing explicit settlement owner and current-load estate/history mutation (GB seed61, synthetic age19, deceased parents). The initial new JSON-content assertion also exposed the known VM/host prototype distinction; comparisons now inspect exact serialized content, with no omitted state fields.

The existing estate test expected repair itself to pay inheritance. Its financial conservation, trust amount and release assertions are retained at the new explicit transition; new assertions require repair to leave cash unchanged. This changes the intended boundary transparently rather than removing coverage.

A differential probe against base2aea checked all129 countries × six housing/commitment cases.645 working cases retain the previous annual cost and family-cash delta.129 prepaid-overseas cases reproduced the old undefined-budget crash with enabled continuing policies; the new permanent regression covers them and institutional costs. This is cost parity, not full trajectory or reference-game parity.

## Verification state
New focused checks pass. Full Node suite, two1,000-life cohorts, browser CI and exact-revision results must be recorded before calling this a verified checkpoint. A local Chromium installation failed because the browser download was truncated; use the retained real-browser GitHub Actions gate, not a substitute VM claim.

The private13-record backup was inspected read-only: migration/idempotence/input and journal preservation/render-purity assertions passed for all13. Three records omitted familyCash entirely. The explicit legacy migration now uses0 opening liquid cash, marks the historical balance unknown and explains this in the family view; it does not invent money from income. The synthetic missing-field regression and private re-audit check this correction. The backup and its contents are not committed or packaged.

## Remaining scope
The general repair/annual wrapper chains, command-specific candidate/bill caches, unified employment transitions, full asset/debt ledger, balance calibration and complete reference/player review remain unfinished. These changes do not certify a stable release or deploy production.
