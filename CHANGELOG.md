# Changelog

## Cycle2 — annual cost/read boundaries (development; final verification pending)

- Extracted one annual cost quote/settlement owner; removed the earlier living-cost wrapper chain. Pure quotes, once-per-age receipts, gift/tuition conservation and rollback; existing funding/routes/cost rates preserved.
- Current saves reload without replaying repairs. Legacy migration preserves authored journals. Missing family cash is explicitly unknown with zero opening cash, rather than inventing savings.
- Removed adapters from profile/family/spending/finance/art reads; estate/trust transfer now occurs at the existing explicit annual family phase.
- Fixed the confirmed prepaid-overseas continuing-policy crash; added all129-country coverage and retained645 working cost-composition parity cases against2aea.
- Added permanent finance/read/save/rollback regressions and actual browser reload→inspect→export immutability assertion. Existing estate conservation assertions now execute the explicit transition; no assertions removed.
- See ENGINEERING_CYCLE_2.md and RELEASE_STATUS.md for executed results and known limitations. No main merge/deployment.

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
