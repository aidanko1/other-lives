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

## Verified engineering-cycle results

Tested production candidate: **6.2.0-rc.3**, commit `e7d26a9cb6cbc08d1a9d030856cdfb144493b7b6`. [GitHub workflow 39493959138](https://github.com/aidanko1/other-lives/actions/runs/39493959138) passed all three jobs: fast checks/build, actual Chrome interactions and 1,000 complete seeded lives. Subsequent documentation-only changes do not change the tested production code; inspect PR #1 for the latest check status.

| Check | Executed result |
| --- | --- |
| `npm test` | Pass: dependency/syntax/registry checks; 18 contract tests (including 200 generated funding cases); all retained regression/route checks; registry sweep; save/replay round trips |
| Registry sweep | 2,838 country/age/wealth contexts; 15,863 eligible decision queries across 523 eligible definitions; zero failures |
| Complete-life release harness | 1,000 requested, 1,000 complete, zero assertion failures; 1,051,779 clock calls and 44,683 decisions |
| Simulation coverage | 129 countries, five quintiles, four explicit choice policies, three initial-condition groups, all ten degree subjects and 108 role titles |
| Balance checks | 965 lives entered paid work; 973 had family developments. Annual factor-ceiling rates passed for all four factors. Mean age 74.008 is a test-policy outcome, not demographic validation |
| Browser | 20 real-browser assertions pass locally and on GitHub Chrome: decisions, saving/reload, navigation/Play, phone-width overflow, exact individual export/import, paused deletion/resume, postgraduate parental funding, school entry/home learning and rounded relationship display |
| Save compatibility | Eight seeded JSON save/reload/replay comparisons with real snapshots; 13 copies of the supplied archive migrated idempotently with no current-state invariant failures; original bytes unchanged |
| Large-history command probe | Eight synthetic bill commands staged on migrated archived copies pass current-state checks; 6–50 ms on this Node host. Not a naturally occurring pending-card playthrough or a mobile performance guarantee |
| Packaging / working tree | `npm run build` and `git diff --check` pass; existing content registries preserved; original unfinished drafts remain untouched in the previous checkout |

## Findings and failed iterations

Baseline `4072fd4` (published v6.1.0) passed its eight retained test commands and six quick lives (3,676 clock calls / 196 decisions). Those shallow tests did not detect missing monthly cooldown history, school access conflated with enrolment, stale decision prerequisites, divergent load paths or postgraduate funding gaps. See `AUDIT.md` for root causes and prior-requirement coverage.

An initial 1,000-case run found three failing lives caused by cached romantic candidates retaining their earlier ages. The repair has a regression. A test incorrectly treating an established close-age school romance across an eighteenth birthday as impossible was corrected rather than changing valid gameplay.

Policy inspection exposed ambiguous test-label matching and passive unemployment. Test policies now explicitly choose university/work/deferral and initiate searches or vocational preparation through real public commands; they never grant a job or qualification. The final 1,000-life run and balance thresholds use those explicit policies.

Earlier browser/CI iterations failed through virtual-time timing, outgoing-page saves overwriting the next synthetic fixture, and an obsolete school-card title assertion. The runner now waits for real loads, unloads the prior frame before installing a fixture, restores storage after cleanup, and uses real-time Chrome in CI. Failed iterations were not counted as passes.

Manual UI review used an isolated India/fifth-quintile birth (seed 317) with natural factors. Through age ten it confirmed ageing relatives, no primary attendance before the age-six decision, supported tutoring, no personal child income/debt and conditional family/school/cultural memories with facts. It found raw floating-point relationship percentages and stale page-title version text; both are repaired. Additional late-life review repaired search/funding/graduation/reassessment cards expiring before their underlying commitment ended. Validation side effects and exceptions now belong inside the atomic command boundary.

## Remaining work and release status

**The overall overhaul is unfinished and PR #1 remains draft; published main is unchanged.** Repository-wide inventory and focused subsystem review are complete; every causal branch of 853 definitions has not been manually played.

Legacy annual wrapper consolidation, a fully explicit annual accounting ledger, removal of all read-side migrations/captured private ensures, comprehensive constrained-resource rare-route coverage, postgraduate employment leave/return, fine-grained family-care timelines, wider human playthroughs and demographic/economic calibration remain. Spend complexity and hidden auxiliary-stat presentation remain product work. Existing complex content is preserved while these migrations are staged behind tests.

Branch-protection administration returns **403** for the GitHub integration. PR/deployment checks work, but mandatory protected-branch settings cannot be verified or enforced with this connection. Passing structural tests is necessary and does not establish complete causal realism, feature parity with the reference game or completion of the full overhaul.
