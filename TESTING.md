# Testing and release requirements

Use Node >=22 (CI pins Node 24). The suite has no external packages. `npm ci` is optional for the dependency-free stack. Never substitute syntax checks or generated logs for behavioural assertions.

## Required commands

| Command | Scope |
| --- | --- |
| `npm test` | All script dependencies/syntax, registry integrity, shared contracts/properties, retained regressions, every route's stage/exit contracts, country/age/wealth queries, save/replay determinism |
| `npm run test:smoke` | 40 complete seeded lives; useful while iterating, not a release gate |
| `npm run test:simulation` | At least 1,000 complete lives; rejects missing results, invariant/timeline failures, absent country/quintile/policy coverage, missing child/later-life outcomes, missing decision categories, inadequate work-policy outcomes and factor saturation |
| `npm run build` | Production allowlist packaging into `_site` |
| Open `tests/browser.html` through the normal preview; Run browser checks | Actual browser and actual app: phone-width navigation, decisions, save/load, export/import, paused deletion/resume, family-funded postgraduate study and school entry |

`npm run test:release` runs the fast checks plus 1,000 lives. Browser QA and build are additional requirements. A release is blocked by any critical failure, unexplained new statistical pattern, broken save or unverified affected interface.

## Test layers

- `tests/contracts.test.cjs`: Node unit/regression/integration tests for school access, prerequisite revalidation, cooldown recording, rejected commands, atomic rollback, pure/idempotent/future-safe migration, pure cost quotes, conserved family gifts, postgraduate tuition/living support, parent death, candidate ageing, archive exact ID and impossible timelines. Two hundred generated funding states explore resource combinations without an external property-test dependency.
- Retained tests: bill/instalment/credit/housing/currency/theme/art, birth reveal, memory voice, conditional subjects, university admission/progression/funding, factor balance, career prerequisites/FTE experience, estate/trust accounting and all 42 route contracts. Route tests include forced success/failure synthetic conditions; they do not prove all realistic combinations.
- `registry-sweep.test.cjs`: 129 countries × eleven ages × two wealth backgrounds = 2,838 contexts. Checks eligible event text/options, exits and query RNG purity. Disabled legacy definitions remain inventoried, not falsely counted as executed decisions.
- `save-replay.test.cjs`: eight countries; compare uninterrupted advancement with JSON export/migration/reload and fresh seeded replay. Keep real milestone snapshots and assert replay leaves source snapshots unchanged.
- `tests/simulation`: workers execute the production engine. Countries cover all 129 profiles, five birth quintiles, four explicit education/work/deferral policies, baseline/fragile-health/isolated starts and varying lifespans. Choice policy uses a separate deterministic calculation; it never consumes the character RNG to decide how to test it. Work-seeking agents initiate searches through the same public command; vocational agents use an existing route. This models player agency without granting jobs or qualifications.
- At every decision/year boundary: assert finite bounded factors, nonnegative money, valid months/ages/status, school/work/study compatibility, credits before qualifications, mortgage within total debt, consistent people identities/ages/deaths/partnerships, valid route/journal timelines, no disappearing/reviving people, eligible pending decisions and successful-choice history. Every run must reach death within a safety bound. Authored moment IDs may not repeat. Annual ceiling rates are measured, not inferred only from final factors.
- Snapshots are disabled only in the high-volume simulation harness to avoid repeatedly copying entire histories. Real snapshot/replay and save compatibility have separate tests. Do not present simulation-only results as browser/storage coverage.

## Reproducing failures and reading reports

`node tests/simulation/run.cjs --lives 1 --start INDEX --workers 1` reproduces a report case from its stable index. Each report records country, unsigned seed, birth quintile, choice policy, initial condition, final outcomes, decision categories/frequencies, occupations and qualification subjects. Failure output includes the last twelve decisions, age/month/pending card and consistency diagnostics.

The current report is generated at `tests/reports/simulation-latest.json` and ignored by Git. GitHub preserves it as a workflow artifact even on failure. Record reviewed summaries in this document; do not commit users' archives. A passing run is a structural check, not a measured-national-population validation. Policies and country/quintile sampling deliberately oversample specific circumstances.

## Browser runner and CI

`tests/browser.html` loads the actual engine and `index.html` in a 390px iframe. It uses synthetic records, temporarily preserves the current-save value, deletes only its own records and restores the previous current save. Do not point destructive tests at real user data. Manual critical playtesting remains necessary for narrative sense, missing choices, readability and menu complexity.

`.github/workflows/quality.yml` runs fast checks, 1,000 complete lives and the actual browser runner in Chrome on PRs and the quality branch. Browser DOM results and simulation outcomes are uploaded as artifacts. Pages deployment depends on the reusable quality workflow. Local browser automation uses the supported browser tool; CI's headless Chrome job must be separately verified on GitHub.

Required GitHub merge checks should be `Required checks`, `1000 complete seeded lives`, and `Browser interactions` (confirm exact check contexts after their first run). **Repository branch-protection API access returns 403 for this integration. Required-check settings cannot currently be verified or enforced.** A passing deployment dependency is not equivalent to branch protection.

## Evidence for this engineering cycle

Baseline `4072fd4`: eight retained test commands passed; six legacy quick lives completed, 3,676 clock calls / 196 decisions. Published v6.1.0 is preserved.

Local foundation verification: dependency/registry integrity; 13 initial contract tests; 2,838 registry contexts / 15,863 eligible decision queries / 523 definitions, zero failures; eight seeded save/replay round trips; 13 copies of the supplied archive migrated idempotently with zero current-state consistency issues. The original archive bytes were unchanged. This does not certify every historical journal statement.

An initial 1,000-case run found three failing lives caused by candidates not ageing while cached; that bug is fixed and retained as a regression. A subsequent 1,000 complete lives passed with 776,707 clock calls and 35,736 decisions, all 129 countries, all five quintiles, all ten degree subjects and 86 role titles. Its mean age was 53.724 under the deliberately mixed test policies; this is not a real-world estimate. Policy inspection then identified ambiguous test label matching, so policies were made explicit and another full run was requested. Final results and GitHub check execution are recorded below after completion.

The first actual browser run passed 14 assertions covering four factors, bill payment/cooldown saving, passport/Spend navigation, Play-to-log, 390px overflow, reload, paused delete controls, exact individual JSON export, confirmed delete, import and resume. Expanded postgraduate/school-entry browser checks are being rerun. No release is declared complete here.

## Remaining verification and design limits

Legacy annual wrapper consolidation, full causal coverage of every rare route, large-save performance, broader manual lifetimes and demographic/economic calibration remain. Master's work leave/return and fine-grained family-care timelines need more targeted review. Spend complexity and hidden auxiliary-stat presentation remain product work. Passing structural invariants is necessary but insufficient to call the overall overhaul complete.

### Updated local evidence (release candidate 6.2.0-rc.1)

The strengthened explicit-policy run completed **1,000/1,000 lives**, zero assertion failures, **1,051,779 clock calls and 44,683 decisions**. All 129 countries, five quintiles, four policies, three initial-condition groups, ten degree subjects and 108 role titles were exercised. 965 lives entered paid work; 973 had family developments; annual time at 99+ was below the ceiling limit for every factor (zero in this sample). Lifespans ranged across child, adult and later-life bands; mean age 74.008 is a test-policy outcome, not demographic validation.

Additional late-life edge review found and repaired age-expiring career/funding/graduation/reassessment follow-ups. Existing commitments can be resolved beyond the new-application ages. Family parent/child chronology diagnostics and regressions were added. The current contract suite has 17 passing tests, including 200 generated funding states. Re-run final CI after these additions; do not reuse a previous green revision as evidence for a changed engine.

The first GitHub PR check passed fast checks/build, but its virtual-time Chrome runner failed waiting for the application. The runner now waits for actual page loads and uses real-time Chrome in CI. Local browser review also exposed cached release assets; the candidate now has consistent versioned asset references with an automated mixed-version guard. These infrastructure failures are recorded rather than counted as gameplay passes. Expanded browser and final GitHub statuses will follow.

Eight additional synthetic bill commands were staged on migrated copies with real archived history sizes; all passed current-state consistency checks. Atomic-command time on this Node host ranged 6–50 ms. This was not a naturally occurring pending-choice playthrough or a mobile benchmark. Original archive files were not modified.

Expanded local browser verification now passes **19 assertions**, including actual reloads, isolated fixture installation, family-assisted postgraduate tuition (no debt), and the age-six home-learning path remaining unenrolled. Earlier failures exposed outgoing-page save writes overwriting the next test fixture and an obsolete school-card title assertion; both test assumptions are corrected. They are not counted as game defects or successful test runs. Final CI verification remains pending on the corrected browser runner.

Final review extended the command transaction to include eligibility validation itself. A deliberately mutating or throwing predicate now rolls back as well; the contract suite contains **18 passing tests**. The release-candidate asset label is `6.2.0-rc.2`. GitHub has now executed and passed the actual Chrome browser job and fast checks/build on `b2421fea`; the final transaction refinement must receive its own checks before merge. Required-branch-check administration remains unavailable (403).
