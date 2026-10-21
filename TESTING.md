# Testing and release criteria

Explicit fidelity exclusion (cycle7): `fidelity-exclusions.test.cjs` verifies Next reaches a real choice after each of5/15/30/50/70 without another stop. `browser-no-reflections.cjs` drives actual automatic playback through all five birthdays and asserts continued calendar movement, no reflection UI/save metadata and retained inspection. Included in npm fast checks/Node glob and the existing Chromium suite respectively. No new gameplay feature or production-code change.

Cycle6 adds `tests/browser-pacing.cjs` and `tests/browser-duration.cjs` to the existing real Chromium suite. Playwright's installed/paused clock plus `runFor` delivers every production timer callback; these are real UI assertions under controlled elapsed time, not a simplified engine or subjective full-session playtest. Keep the legacy45.1s/five-highlight regression even as new births receive duration metadata. `pacing.test.cjs` also compares entire complete seeded histories across30/60/90, ignoring only playback metadata. Latest final-source results belong in ENGINEERING_CYCLE_6.md and RELEASE_STATUS.md.

Latest tested source6c8763a:82 tests, build,2,000 complete asserted lives, actual Chromium lifecycle/read/property/bereavement, legacy/30/60/90-duration and excluded-reflection milestone gates; all eight jobs passed: https://github.com/aidanko1/other-lives/actions/runs/39532142864. Regression/build/full browser also passed locally. Prior local full cohorts at cycle6 have identical production code; cycle7 full cohorts reran in CI. Earlier counts below are historical; RELEASE_STATUS.md defines current limits.

This document defines required verification. See CHANGELOG.md / CI for what actually ran; test-file presence alone is not a pass.

## Commands
Node 22 is the CI runtime. Runtime gameplay has no npm dependencies.
- `node --test --test-concurrency=2 tests/*.test.cjs`: existing and new unit/integration/regression scripts.
- `node tests/static-check.cjs`: syntax-check all delivered scripts (including inline engine/UI), local asset references and uniqueness of registry IDs.
- `node tests/simulation.cjs --count=1000`: complete deterministic lives with assertions and JSON summary. CI uses four disjoint 250-life shards, together 1,000.
- `node tests/browser-smoke.cjs`: Chromium served from repository root; requires Playwright installed for tests and a local server (see CI workflow).

## Simulation contract
Use the actual production script order through tests/engine.cjs. No alternative simplified engine. Disable only snapshots during large batches, and test real snapshot/save continuation separately.
Each scenario has explicit seed, country and background. Cover every supported country and random/hardship/comfortable/top1 backgrounds. Vary enabled decision selection reproducibly. Validate after every action: finite nonnegative finances, factor bounds, known pending decisions with an enabled choice, existing lifeIssues checks, chronological time and termination with a cause.
Track attempts versus completed/validated; any rejected/exception/stalled/unfinished/contradictory run fails the command. Never count an early termination as a complete life.
Store failing country, seed, background, age, month, pending event and assertion. Balance summary includes age bands, decision counts, countries/backgrounds, family composition and final occupations. Broad distribution assertions detect gross engine collapse; they do not validate national epidemiology or prove parity with the reference.
Wall-clock safety is provided by CI timeout. Same seed/choices are compared in deterministic continuation tests after removing only metadata timestamps/IDs, not meaningful history.

## Browser contract
Exercise production HTML with browser scripts, assert no uncaught errors/missing local assets, create/reveal/begin a life, next-decision and choice, inspection/navigation pausing, local save/reload, export/import where covered, and ending/archive display where covered. Name unsupported flows explicitly. A VM render contract is not an end-to-end browser test.
Keep browser test fixtures synthetic; never commit the user's private exports.

## Release gate
All regression/static/browser/sharded simulation jobs green for the exact proposed revision. At least 1,000 validated complete lives for a major release. Review distribution outputs and uncovered routes; inspect mobile/desktop actual gameplay for fidelity. Migration compatibility where state semantics change.
Use a branch/PR and preserve a baseline SHA. Repository instructions require successful checks before merge; GitHub branch-protection enforcement is a separate repository setting and must not be claimed enabled without verification.
Deploy only after acceptance; verify the Pages workflow and actual page. CI green alone does not verify deployment.

## Integrated extraction and additional trajectory coverage
The code now lives in engine/*.js and ui/app.js; tests/engine.cjs loads production order with deterministic test metadata. Retain the original npm run test:simulation harness (tests/simulation/run.cjs and worker.cjs) as an additional CI job. Its 1,000 lives explicitly span five quintiles, four choice policies and fragile/isolated/baseline conditions, with employment and factor-distribution assertions. This complements, rather than replaces, the 1,000-life optional-route/background harness. A single successful batch must not be reported as success for both.
Reference browser observation has a separate research-only workflow so a changing external site does not become a dependency of production gameplay checks. Artifact screenshots are research evidence, not deliverable game assets. Natural Other Lives UI lifecycle uses US seed951, preserving real clock/choice/ageing/death logic and asserting reload at childhood/adulthood/old age.

## Executed checkpoint — 2026-10-21
Source 07f81f2: https://github.com/aidanko1/other-lives/actions/runs/39494233610. Check the run's exact jobs and retained artifacts; RELEASE_STATUS.md records their final status. The Node runner reports40 tests, not the number of individual assertions. Registry sweep exercises2838 country/age/wealth contexts and 15,863 eligible decision render contracts (523 definitions). Two full 1,000-life cohorts are complementary. Browser natural lifecycle reaches 105 with 47 real UI choices and stage reloads; the actual normal-speed duration remains unmeasured. No fresh production deployment was performed.


## Cost/read boundary regressions
`node --test tests/finance-boundary.test.cjs` checks complete-state quote/display/load immutability, tuition and family-gift conservation, repeat/reload receipts, affordability/funding holds, transactional rollback, missing legacy cash and129-country prepaid/institution budgets. It is included in npm test and the existing CI glob. Browser smoke exports the actual inspected paused life and compares every serialized field. Private backups may be audited read-only; never commit them or report them as complete new simulated lives.

Cycle2 executed source a24854966d67901fa1bc82306349623e520b23f3:49 tests, production build, two 1,000-life cohorts, balance and Chromium browser gates passed. Evidence: https://github.com/aidanko1/other-lives/actions/runs/39509582008. Private 13-record migration/render/consistency audit also passed read-only. See RELEASE_STATUS.md for limits; this is not a deployment.

## Annual, decision, property and pacing contracts
annual-pipeline.test.cjs checks full annual/clock rollback, retry, receipts, debt schedules and pension exclusion. decision-boundary.test.cjs checks full-state preview purity and stale displayed option/route tokens. route-continuity.test.cjs checks participants, conception parentage and ended study/stipend cleanup.
property-ledger.test.cjs contains ten tests, including schema0/1→2, separate holdings/loans, fees/sale/reoccupation, exact valuation, explicit legacy liability repair and 129-country two-mortgage annual/reload assertions. Browser smoke exercises real let/move/buy buttons and saved/reloaded ownership.
pacing.test.cjs checks newly deceased close-family stops, unchanged history, continuation past old loss and unchanged ordinary/friend pacing. Browser smoke checks the actual annual death and an unchanged paused save after 4.1 seconds.
Source 85deb8d passed regression/build/browser but failed both full cohorts on bill prepayment; the unchanged cohorts must remain in release gates. Final b87e519 passes them. A targeted test or short batch is not a replacement. Reference play is research, not a substitute for own-game lifecycle assertions.

## Cycle8 candidate verification and additional gates
Run node --test --test-concurrency=2 tests/*.test.cjs, node tests/static-check.cjs and npm run build. New permanent tests cover comparison independence/current-date privacy/save/replay, factual/infant/legacy retrospectives, the exact deceased-teen-partner seed and mortality boundaries. Existing assertions remain.
Run node tests/parallel-simulation.cjs --lives=1000:250 worlds/four peers each. Each complete production-engine life checks invariants at every action and must finish before3000 actions. Report test-results/parallel-summary.json includes reproducible failures, origin diversity, ages, save size, state and decision counts. Fresh deterministic VMs compare the same player identity with/without companions, preserving appearance/memory IDs and all outcomes.
Quality CI retains both prior1000-life cohorts and adds this1000-peer gate. Browser smoke now runs Chromium, Firefox and WebKit in separate jobs with official Playwright1.56.1 binaries. browser-parallel.cjs exercises actual new-birth rows, exact reload/download/import, infant recap and turning-point replay without regeneration. Local missing WebKit libraries are unverified, never a pass; CI installs the required dependencies. See RELEASE_STATUS.md for actual executed results. A release requires all11 jobs, not an earlier eight-job run.

Cycle9 adds axe-core4.10.3 as a test-only pinned dependency (no runtime package). browser-accessibility.cjs audits nine settled light/dark surfaces and actual Tab/Shift+Tab/Escape/opener return; zero serious/critical violations required. browser-large-archive.cjs imports100 full records, waits for IndexedDB rendering, compares every exported field after reload and checks targeted deletion. Copies are storage stress, not independent simulations. rare-trajectories.test.cjs runs48 deterministic naturally prepared full lives for five specialised routes and192 for K-pop (including extra South Korean births) through actual choices, interest purchases, practice, route selection and stage reloads; all cases and outcomes are asserted. No age/skill/funds/RNG injection or forced success. It supplements rather than replaces the3000 release-cohort lives. Exact-source results in RELEASE_STATUS.md.
