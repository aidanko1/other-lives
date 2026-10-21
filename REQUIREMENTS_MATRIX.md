# Requirements → implementation → tests

RF16 / explicit exclusion is PASS-SCOPED: no milestone reflection prompts, player note-entry feature or reflection-specific pauses/toggle. User instruction21October2026 supersedes general reference parity. Unfinished local reflection code was removed before any commit/publication; runtime equals the tested cycle6 source. `fidelity-exclusions.test.cjs` and actual `browser-no-reflections.cjs` prove continuation across5/15/30/50/70. Guard-source6c8763a passes82 tests/build/all eight CI jobs/two1000-life cohorts: https://github.com/aidanko1/other-lives/actions/runs/39532142864. ENGINEERING_CYCLE_7.md records scope and exact runtime identity.

Cycle6 F02/RF08 is PASS-SCOPED at ba00e5b: calendar-only playback budget and30/60/90-minute birth duration/default60, frozen origin and legacy3750ms/month fallback. Owners: engine/clock.js, core.js, ui/app.js. Tests: pacing.test.cjs (eight tests, including full seeded-life outcome equality), browser-pacing.cjs (legacy5highlights/45.1s), browser-duration.cjs (actual UI setup/timed year/pause/reload at all three values). Local checks and all eight exact-source CI jobs pass: https://github.com/aidanko1/other-lives/actions/runs/39530111698. Approximate targets do not guarantee actual wall time or a lifespan. UX02 now includes descriptive policy-stratified counts and six asserted complete replay traces; enjoyment remains unverified.

Current source ba00e5b passes all eight gates: https://github.com/aidanko1/other-lives/actions/runs/39530111698.81 tests/build and2,000 complete asserted lives. PASS-SCOPED means executed acceptance, not entire-system completeness. The original matrix below is historical; current cycle supplements and RELEASE_STATUS.md supersede old counts/unknowns.

| ID | Requirement / acceptance | Implementation | Tests / evidence | Status and limits |
|---|---|---|---|---|
| F01 | Random birth → chronological text life → meaningful choices → ending | engine/core.js, clock.js, ui/app.js | playthrough, simulation, browser-smoke | PASS-SCOPED; interactive reference comparison unknown |
| F02 | Pause/speed/next-decision; inspect without advancing | ui/app.js | browser-smoke; GAME_DESIGN comparison | PASS-SCOPED; pacing not quantitatively matched |
| F03 | Clean UI and static illustration; no movement/exploration | index.html, life-*.css, pixel-household.js | browser screenshots, life-clarity | PASS-SCOPED; full visual/accessibility review pending |
| F04 | Reference feature comparison and explicit unknowns | GAME_DESIGN.md, REFERENCE_GAME_AUDIT.md | source links and evidence labels | Documented; detailed hands-on measurements unknown |
| S01 | Age-appropriate enrolment and events | engine/rules.js, core.js, events.js, age-culture-audit.js | contracts, registry-sweep, simulation assertions | PASS-SCOPED; national school ages simplified |
| S02 | Context checked at execution; failed choice unchanged | engine/commands.js, rules.js | contracts stale/rollback/replay tests | PASS-SCOPED; lower-level mutators not all transactional |
| S03 | Choices persist and cooldowns work | engine/core.js, clock.js | contracts cooldown/replay, simulation | PASS-SCOPED |
| S04 | Consistent identity, ages, death, partnership | engine/state.js, life-relationships.js, life-continuity.js | contracts transition/candidate tests; invariants every action | PARTIAL; parent/child age assertions present; full historical causality incomplete |
| S05 | Education, workload, qualification and careers connect | life-university.js, flow.js, careers.js, route-education.js | university, career-continuity, flow-balance-routes | PARTIAL; professional laws and all cross-route combinations incomplete |
| S06 | Finite conserved finance; assets distinct from liabilities | life-clarity.js, dynamics.js, route-assets.js | financial-property contracts, mortgage regression, invariants | PARTIAL; aggregate rental assets and annual ledger debt remain |
| S07 | Ending is terminal and occurs once | engine/core.js, life-route-assets.js | reliability ending regression, browser ending | PASS-SCOPED |
| S08 | Same seed/state/choices → same continuation | engine/core.js, rules.js, state.js | reliability zero/shuffle; save-replay eight countries | PASS-SCOPED; metadata isolated by deterministic test loader |
| S09 | Save load preserves established history | engine/state.js, ui/app.js | contracts migration/future version, save-replay, browser export/import | PARTIAL; private 13-life export not rechecked this cycle |
| T01 | Unit/integration/regression checks permanent | tests/*.test.cjs, registry-sweep | quality regression job | PASS-SCOPED |
| T02 | 1,000 complete lives with assertions and retained failures | tests/simulation.cjs, invariants.cjs, simulation-summary.cjs | four disjoint shards; summary gate | PASS-SCOPED; forced national/background coverage, not real-world population estimate |
| T03 | Distribution/repetition/route coverage reviewed | both simulation harnesses; summary JSON | age bands, decisions, country/backgrounds, repeated template assertion | PARTIAL; balance calibration and qualitative variety remain |
| T04 | Browser lifecycle including next life and storage | browser-smoke.cjs and retained browser.cjs.js | Chromium desktop/mobile, export/import, ending and archive | PARTIAL; full naturally timed life and other browser engines pending |
| E01 | Reversible baseline and isolated development | baseline/v6.1-before-engineering-overhaul, engineering branch | recorded commit ancestry | Implemented; main untouched |
| E02 | Build + CI before deployment, no experimental deployment | workflows/quality.yml, pages.yml, scripts/build.cjs | regression/build/browser/simulation/balance jobs | PARTIAL; quality/build verified, new deployment and branch protection unverified |
| E03 | Exact bug reproductions and continuity docs | BUGS.md, RELEASE_STATUS.md, CHANGELOG.md, BACKLOG.md | repository review | In progress; update after executed checks |
| UX01 | Events respond to personal history, not generic repetition | moments, memory-voice, routes, subject checks | moment/route tests, no-repeat assertion | PARTIAL; novelty/engagement cannot be established from exit code |
| UX02 | Simulation depth does not add mandatory micromanagement | existing focus/route/policy UI | fidelity playtest checklist in GAME_DESIGN.md | Unknown; density review needed before new UI |


## Cycle2 scoped evidence
Code a24854966d67901fa1bc82306349623e520b23f3, all eight quality jobs passed: https://github.com/aidanko1/other-lives/actions/runs/39509582008.
| Requirement | Implementing boundary | Permanent tests | Status/limits |
|---|---|---|---|
| S06: cost quotes do not mutate; tuition/gifts conserve funds; repeat/reload cannot repay | engine/finance.js; core explicit settlement | finance-boundary; contracts; university; both simulation cohorts | PASS-SCOPED; remaining income/debt/asset annual pipeline separate |
| S09: load retains history, versioned record identity and legacy unknowns | engine/state.js; engine/context.js | finance-boundary; contracts; eight save-replay countries;13 private records audited read-only | PASS-SCOPED; early missing liquid cash explicitly unknown with zero opening funds |
| S04/S06: estate/trust transfer at a simulation transition, never display | life-continuity.js; read helper owners; pixel-household.js | retained career-continuity conservation/trust assertions; finance-boundary read identity | PASS-SCOPED; other structural repair chains remain |
| T04: actual reload/inspect/export leaves every state field unchanged | ui/app.js; browser-smoke.cjs | Chromium paused-life full-state equality; existing lifecycle/storage suite retained | PASS-SCOPED; other browser engines unverified |

Historical cycle2 totals:49 reported Node tests,2,000 complete asserted seeded lives across 129 countries, full browser life to 105. Counts do not establish subjective reference fidelity or demographic calibration.

## Current cycles3–5 traceability
| Requirement | Implementing boundary | Permanent tests/evidence | Status/limits |
|---|---|---|---|
| S02/S03: pure displayed choices; stale click unchanged | decisions.js,commands.js,app.js | decision-boundary; retained eligibility/cooldown; actual UI choices | PASS-SCOPED; internal low-level helpers not all public transactions |
| S04: family subjects/history retain identity | rules.js,routes.js,route-family.js,state.js | route-continuity participants/conception; parent/child/death checks each step | PASS-SCOPED; complete multi-generation causality not claimed |
| S05: role/pay/hours/qualification/retirement | employment.js and education/care/service/migration callers | annual-pipeline pension/FTE; retained university/flow/career tests; both cohorts | PASS-SCOPED; national licensing simplified |
| S06/S08: one reproducible atomic annual transaction | annual.js,core.js,finance.js | rollback/clock/retry/receipts, conservation;3360 pre-accounting differential transitions; save-replay | PASS-SCOPED; huge archive performance unprofiled |
| S06: secured/property/scheduled liabilities reconcile | finance.js,property.js,state.js | CI-red prepayment regression; ten property tests incl129 countries; actual UI housing | PASS-SCOPED; legacy dwelling counts/dates explicitly unknown |
| S09: history-preserving conservative load | state.js,property.js | schema0/1→2,explicit net-wealth repair,eight snapshot countries,13 private read-only records | PASS-SCOPED; private bytes unchanged, avatar stubbed in Node |
| F02/RF14: Next stops at new close-family loss | clock.js,app.js | pacing.test red→green; actual annual death and 4.1s browser pause; ordinary/friend flow preserved | PASS-SCOPED; other close-family generalization is judgment |
| F04/UX02: measured reference comparison | REFERENCE_PLAYTEST_2026-10-21.md,FIDELITY_MATRIX.md | infant ending/rebirth and full India life to 91/retirement at 60; controls/choices/inspection/ending | PARTIAL; enjoyment/all variants/timed normal play unknown |
| T01–T04/E02: exact-revision quality | quality.yml/pages.yml,both harnesses,browser-smoke |75 tests/build,2,000 validated lives,all eight gates at b87e519 | PASS-SCOPED; no deployment; main protection false |

No significant requirement is whole-game complete merely because a control exists or one fixture passes. Remaining work and owner-level enforcement are in BACKLOG.md.

## Cycle8 current acceptance supplement
| Requirement | Implementation | Permanent checks | Current status |
|---|---|---|---|
| RF12 passive four companions, current-date information only | engine/parallel.js; core snapshot/create; ui/app.js | parallel.test.cjs; browser-parallel.cjs; parallel-simulation.cjs | Implemented;3unit tests and Chromium UI pass locally;1000 peers pass before final boundary fix; exact-source CI pending |
| RF10 factual richer ending, including infants/unknown legacy history | engine/retrospective.js; ui/app.js | retrospective.test.cjs; browser-parallel.cjs | Two unit tests and actual Chromium ending pass locally; exact-source CI pending |
| S04 dead partner history and bounded terminal ages | state.js; core.js; annual.js | bereaved-teen-partner.test.cjs; age-ceilings.test.cjs; all cohorts | Three regressions pass;90-test full suite passes locally |
| S08/S09 immutable companion world/save/replay with unchanged player outcomes | parallel.js; core.js; ui/app.js | full-state independent VM comparison; exact export/import/replay; old-save fixtures | Local unit/Chromium pass; all browser-engine CI pending |
| T02/T04/E02 expanded release gates | quality.yml; parallel harness; browser smoke | Four background shards, balance, trajectory, parallel, regression/build, three browser engines | Authored11-job gate; no claim of CI pass until run completes |
All earlier scoped evidence is historical. These additions do not establish national calibration, enjoyment or complete reference parity.

## Cycle9 current candidate (supersedes older status/counts)
| Requirement | Owner | Permanent acceptance | Evidence/status |
|---|---|---|---|
| RF10/RF12 endings/comparison worlds | parallel.js,retrospective.js,core.js,app.js |90-test source,1000-peer cohort,exact save/replay,three-engine UI |PASS-SCOPED at bc74cde,all11 jobs |
| S05 usable rare-career prerequisites | life-experience.js,life-route-special.js | interest-access plus432 natural prepared full trajectories |Interest tests pass locally; full trajectory/final CI pending |
| F03/T04 accessibility | index.html,life-clarity.css,app.js | nine axe light/dark surfaces,real keyboard modal entry/wrap/escape/return |Local Chromium pass; final all-engine CI pending; manual AT unknown |
| S09/T04 large archives | app.js existing IndexedDB path |100-record actual import/reload/whole export/detail/delete |Local11744934-byte fixture pass;100 copies not100 simulations; final CI pending |
| E02 release gates | quality.yml/pages.yml |all11 exact-source jobs;test-only Playwright/axe pins |bc74cde passes; candidate9 pending; no deployment/admin protection |

Cycle10 S01/S07/S08/S09 candidate: infant timing owners core/clock/demographics/state, six executed local regressions plus natural NG2 browser ending/save/archive/new birth pass. Exact-source full suite/three1000-life cohorts/three browser-engine gates pending. Existing saves without model metadata retain legacy continuation; no migration invents a past risk. Probability-product assertion is a calculation contract, not demographic validation.
