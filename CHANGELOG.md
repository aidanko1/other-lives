# Changelog

## Cycle7 — user-requested fidelity exception
Reflection prompts, note-entry screens and reflection-specific pauses/toggle are explicitly excluded from Other Lives. The unfinished local prototype was removed before any commit/publication; production engine/UI/index files are byte-identical to the verified cycle6 source. Permanent instructions, design/comparison/requirements and backlog reflect the exception. Added Next and actual automatic-browser continuation guards at 5/15/30/50/70. Guard-source 6c8763ad3750747b5abbbd0e2b26d651a8bfde73 passes82 tests/build/full actual Chromium/all eight CI gates and both1000-life asserted cohorts: https://github.com/aidanko1/other-lives/actions/runs/39532142864. No save migration, production merge or deployment.

## Cycle6 — playback correction, development only
Added the verified30/60/90-minute birth duration/default60 with frozen birth-country playback reference; old saves retain their original rate. Duration affects presentation only, with identical complete seeded histories tested. Actual setup/timed year/highlights/inspection/reload checks pass at all three values. Corrected misleading birth selector labels without changing draws. Stories at the current date no longer spend another month's playback delay; every story and simulation transition is preserved.
Final source ba00e5bd8cfc50cf54c92bbecd23ee954024934f passes81 tests, production build, both1000-life asserted cohorts and actual Chromium suite locally and CI: https://github.com/aidanko1/other-lives/actions/runs/39530111698. Earlier pacing-only b751cb3 also passes its77-test/eight-job checkpoint. Measured optional-menu/stress-policy density and six asserted high-count replay traces; full enjoyment/reference parity remains unverified. Reproduction, TEST-006 arithmetic correction, seeds and limits: ENGINEERING_CYCLE_6.md. No production merge/deployment.

## Verified cycles3–5 — unreleased reliability baseline
Tested b87e519fd04fceb489a39c68a67719e0159d8324; all eight quality jobs pass: https://github.com/aidanko1/other-lives/actions/runs/39515340262. 75 tests, production build, 2,000 complete asserted lives across 129 countries and actual Chromium lifecycle/storage/read/property/bereavement checks.
Completed explicit annual/birthday, employment, displayed-decision and property/debt ownership; schema2 compatibility, participant/conception identity and cancellation cleanup. Direct official-reference play covers a complete91-year life plus infant death/rebirth. Corrected Next skipping close-family loss using existing controls, with no new choice/menu.
Source 85deb8d failed both full cohorts on debt prepayment; OL-028 is corrected without weakening cohorts. Source 08bc385 was the prior 73-test passing property checkpoint. Older pending entries below are preserved chronology, superseded by this final evidence. No production merge/deployment; see RELEASE_STATUS.md for remaining fidelity/calibration work.

## Cycle4 — property and debt identity (verification pending)

Added per-holding property/loan ownership behind existing housing choices, schema2 conservative migrations, multi-loan budgeting/principal and asset/debt invariants. Fixed a full-cohort failure where prepaying a scheduled bill left future instalments charging. Added housing UI save/reload coverage and ten targeted property regressions, including 129-country combinations. See ENGINEERING_CYCLE_4.md; final exact-revision gates pending.

## Cycle3 — annual/employment/decision continuity (verification pending)

Replaced passive wrapper composition with one ordered annual/birthday transaction, saved once-per-age receipts and complete rollback. Centralized budget/debt allocation and employment/hour/FTE updates. Added read-only decision views, stale-click tokens, participant-bound family intentions and course/stipend cancellation cleanup. Retained all content and existing assertions; see ENGINEERING_CYCLE_3.md for red reproductions and exact verification status. No production change.

## Cycle2 — verified annual cost/read boundaries (unreleased)

- Extracted one annual cost quote/settlement owner; removed the earlier living-cost wrapper chain. Pure quotes, once-per-age receipts, gift/tuition conservation and rollback; existing funding/routes/cost rates preserved.
- Current saves reload without replaying repairs. Legacy migration preserves authored journals. Missing family cash is explicitly unknown with zero opening cash, rather than inventing savings.
- Removed adapters from profile/family/spending/finance/art reads; estate/trust transfer now occurs at the existing explicit annual family phase.
- Preserved known-zero family liabilities: migration/monthly adapters no longer recreate debts already cleared.
- Fixed the confirmed prepaid-overseas continuing-policy crash; added all 129-country coverage and retained 645 working cost-composition parity cases against2aea.
- Added permanent finance/read/save/rollback regressions and actual browser reload→inspect→export immutability assertion. Existing estate conservation assertions now execute the explicit transition; no assertions removed.
- Final code a248549:49/49 Node-reported tests, production build, two 1,000-life cohorts with assertions/balance (zero failures), Chromium lifecycle/storage/read-identity checks; all eight CI jobs passed: https://github.com/aidanko1/other-lives/actions/runs/39509582008. Private 13-record audit passed without altering source/history. See ENGINEERING_CYCLE_2.md and RELEASE_STATUS.md for scope and limits. No main merge/deployment.

## 2026-10-21 — verified engineering checkpoint, 6.2.0-dev.1 (unreleased)

Tested source: 07f81f2516c7209e3932bc4a3952832339cf6bc4. Final CI evidence: https://github.com/aidanko1/other-lives/actions/runs/39494233610. Read RELEASE_STATUS.md for exact gates and limits. No production merge/deployment; the complete overhaul is unfinished.

- Preserved playable v6.1 at 4072fd4 and a named restore branch. Created draft PR2 and permanent AGENTS, design/fidelity, architecture, audit, requirements-to-tests, bug, testing, release and backlog records.
- Integrated b31a7af engine/UI extraction and its existing eligibility, cooldown, school access/enrolment, migrations, guarded commands, archive and family-funded master's safeguards. Selectively ported later 3d6b306 fixes for late-life follow-ups, family timelines and atomic eligibility validation; retained their regression assertions.
- Fixed zero-seed reproducibility; cached fixed-currency formatters; preserved mortgage/payment metadata on home reoccupation; made all ending effects idempotent.
- Fixed immediate adult-contact status, absent GB/foreign destinations, overseas study workload/pay, stale prepared work/study/professional routes and institution conflicts. Shared continuation checks preserve earlier costs/history and provide a valid exit.
- Full Node suite: 40 reported tests passed, including registry sweep 2,838 contexts/15,863 eligible card checks; existing route/career/funding/memory tests and eight real-snapshot save/replay round trips retained.
- Two complementary 1,000-life harnesses, assertions and balance/coverage artifacts retained. Actual Chromium browser checks cover storage, choices, navigation, funding, school, archive and a natural birth-to-death life (US 951, age 105, 47 choices), reload at several stages and another birth.
- Test defects were diagnosed openly: VM prototype versus persisted-content comparison, missing mortgage fields, fixture age/status setup, outgoing-frame save race and obsolete literal school heading. No failing invariant or gameplay assertion was removed to obtain a pass.
- Reference browser research was read-only and separate from release CI. Observed only the interactions recorded in FIDELITY_MATRIX.md; complete reference life, frequencies and subjective equivalence remain unknown.

Next: isolate migrations/read-only display from annual money settlement behind conservation and legacy-save regressions. Legacy wrappers, rare combinations, national/historical realism and subjective gameplay review remain incomplete.


## Engineering cycle 1 — 2026-10-21 (in progress)
Recovered main v6.1.0 at 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f.
Preserved baseline/v6.1-before-engineering-overhaul and began engineering/fidelity-reliability-baseline.
Added permanent development, reference comparison, architecture, audit, testing and backlog documents.
These documents distinguish source observations, previous assistant reports, current executed tests and future goals.
Initial extracted-engine probe: five complete seeded lives validated (AF/AL/DZ/AO/AR, seeds 317–1585); not the required 1,000-life release gate.
Current cycle fixes and CI results are pending. Main/deployment unchanged in this checkpoint.

## Prior release — v6.1.0
See PLAYTEST_AUDIT.md, IMPLEMENTATION_COVERAGE.md, README.md and commit 4072fd4 for prior changes and reported verification.
Original main Pages deployment succeeded: https://github.com/aidanko1/other-lives/actions/runs/39457407780.
This is historical CI evidence, not evidence for the engineering branch.

## Integration checkpoint — validation pending
Recovered and integrated b31a7af from quality/simulation-foundation with provenance. Retains engine/UI extraction, shared eligibility/cooldown history, preschool access/attendance, versioned migrations/atomic commands, archive repairs and family-assisted postgraduate funding. These were existing unmerged changes; this integration does not claim authorship or new verification of their earlier tests.
Added Phase 11 requirements matrix, bug reproductions and explicit release status. Applied zero-seed, mortgage preservation, terminal idempotence and currency-formatter fixes. Preserved existing tests and browser assertions. Corrected one new test's VM/host prototype comparison to compare persisted JSON content and source immutability. No production merge/deployment.

## 6.2.0-dev.2 — candidate, unreleased
- Four passive same-age comparison lives, simulated through the production engine with independent seeds and checked states. Compact saved timelines and shared snapshot references preserve exact replay without altering player outcomes.
- Factual ending recap for education/work, children/survivors, partners, interests and wealth; no invented missing history or reflection feature.
- OL-034: deceased teenage partners no longer trigger a false living age-gap violation later in life; historical minor marriage/adult-start safeguards retained.
- OL-035: player/relative mortality honors the declared120/160 model validity ceilings even if stochastic death rolls miss.
- New permanent regressions and1000-peer cohort; quality workflow expands from eight to11 jobs with Firefox/WebKit alongside Chromium. Local90-test suite passes; exact-source CI and final release decision pending. No production merge/deployment.

## Cycle9 candidate — unreleased
- OL-036: connected existing dance/acting/esports/chess careers to reachable childhood/optional interests; stable four-choice presentation, no extra compulsory decisions.
- Corrected light-theme text contrast and dark ending/tab/log contrast; modal focus entry, Tab wrapping, Escape and return to opener. Life decisions remain nonmodal to preserve inspection.
- Permanent axe9-surface/keyboard and100-record archive import/reload/exact-export/detail/delete gates; targeted six-route complete-life tests.
- Cycle8 bc74cde verified all 11 jobs,90 tests/build/3000 complete asserted lives and Chromium/Firefox/WebKit. Cycle9 final-source gates pending; no deployment.

## 6.2.0-dev.3 — candidate, unreleased
- OL-038: first-year mortality for new births occurs during age0 rather than being deferred to the first birthday.12 conditional monthly risks preserve the prior annual survival product under constant circumstances; no extra roll on story/choice delivery or at the surviving first birthday.
- Additive saved timing version/receipt; legacy saves retain their original model. Atomic rollback includes mortality RNG and terminal/birthday state. Six local regressions and natural NG2 age0 UI lifecycle checks pass; full final-source gates pending.
- Corrected companion text line layout after screenshot review. No new gameplay control, reflection feature, merge or deployment.

## 6.2.0-dev.4 — candidate, unreleased
- OL-039: correct eight infant/toddler story age prerequisites at their definition owner; legacy queued stories revalidate, existing history remains intact. No new prompts/tracking.
- OL-040: retrospective chooses a recorded personal memory ahead of finance ledgers, formats stored currency correctly and omits missing memories.
- Two permanent eligibility tests, extended retrospective/browser regressions; targeted checks/build pass locally, final107-test/all 11-job gate pending.
- Prior f0f2608 verified104 tests/build/all 11 jobs/3000 release-cohort plus 432 targeted lives, all three browser engines; no merge/deployment.

## 6.2.0-dev.4 verified development checkpoint
Executable/tests/workflows source 75b2154d4794d09410537bebea37937b9cc64ebf passes107 tests/build/all 11 jobs: https://github.com/aidanko1/other-lives/actions/runs/39540689377.3000 release-cohort lives plus 432 targeted complete rare-path cases; all three engines pass natural infant/adult lifecycle, nine accessibility surfaces/keyboard and198957434-byte100-record normal-save archives (24 snapshots/four peers each). Restore checkpoint/6.2.0-dev.4-release-gates-verified. OL-034–040 corrections are implemented/verified. Final documentation consolidates current state/owners/requirements/results and preserves historical failures/limitations. No production merge/deployment; full national/era calibration, normal-speed enjoyment, manual AT/slow devices and owner protection remain open.
