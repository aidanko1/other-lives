# Reproducible testing and release gates

Routine updates follow the proportional protocol in AGENTS.md: targeted checks for minor changes, related integration/regression for moderate changes, broad cohorts for major simulation/state work. Do not manually repeat full-life cohorts for isolated UI/data fixes. Existing automated release gates remain active; any scope adjustment must preserve required correctness and cannot hide failures.

Current exact-source evidence: RELEASE_STATUS.md. Node 22+; local executed runs also used Node 24. Tests are permanent repository files, not conversation-only claims. Node-reported test counts are not assertion counts. Never weaken/delete a failing assertion, hide an error or count an unfinished life as a completed simulation. Correct an invalid fixture transparently and retain the original failure investigation.

## Local commands
No npm packages are needed for normal static gameplay/building.

```sh
node tests/static-check.cjs
npm run build
node --test --test-concurrency=2 tests/*.test.cjs
npm test
```

npm test is the retained convenience runner with an explicit test list. Its longer rare-trajectory subprocess has a600-second bound; individual scenarios remain bounded. npm run test:release predates the expanded CI and runs only that runner plus the trajectory cohort; it is **not** the complete release gate. Use all commands below or the authoritative quality workflow.

```sh
node tests/simulation.cjs --count=1000 --shards=4 --shard=0
node tests/simulation.cjs --count=1000 --shards=4 --shard=1
node tests/simulation.cjs --count=1000 --shards=4 --shard=2
node tests/simulation.cjs --count=1000 --shards=4 --shard=3
node tests/simulation-summary.cjs
npm run test:simulation
node tests/parallel-simulation.cjs --lives=1000
```

The four disjoint background shards together constitute1000 complete lives, not4000. The trajectory and peer cohorts add1000 each. All use reproducible seeds, completion/action bounds and explicit state/outcome assertions. Reports retain country/background/policy coverage, decisions, routes, ages, failures and traces. No-pass conditions include invalid states, unresolved decisions, uncompleted lives and collapsed diversity/saturation checks. Policy-conditioned results are not national estimates.

rare-trajectories.test.cjs additionally completes432 cases:48 each for dance/acting/esports/board-professional/vocation and192 for K-pop, including extra South Korean births. Real interests/practice/purchases/routines/eligible attempts/retries are used; no ages/skills/funds/RNG or successful outcomes are injected. Professional/academy/failure assertions remain. Stage save/load is exact. These supplement rather than replace the release cohorts; repeated reruns are not additional unique scenarios.

## Actual browser checks
Install pinned test-only dependencies and official browser binaries:

```sh
npm install --no-save --package-lock=false --ignore-scripts playwright@1.56.1 axe-core@4.10.3
npx playwright install --with-deps chromium firefox webkit
python3 -m http.server 8000 --bind 127.0.0.1
```

With that server running, use a separate terminal:

```sh
PLAYWRIGHT_BROWSER=chromium node tests/browser-smoke.cjs
PLAYWRIGHT_BROWSER=firefox node tests/browser-smoke.cjs
PLAYWRIGHT_BROWSER=webkit node tests/browser-smoke.cjs
```

Do not run concurrent browser invocations against shared output files. The normal-save stress download has a UUID path, but legacy helpers still use some common artifact paths. Managed environments that lack browser libraries must report unverified, not bypass restrictions or count an installed binary as a passed browser. CI installs dependencies on Ubuntu in isolated jobs.

The suite uses production controls for birth/choices, childhood/adulthood/old-age reload, natural death/archive/another birth; exact save/export/import/replay and read immutability; school/family funding, housing/loans, bereavement stop, storage failure, mobile navigation and retained legacy iframe checks. Controlled browser clocks verify legacy story/calendar accounting and actual30/60/90 setup/pause/reload; they are not a claimed hour-long human session. NGseed2 naturally ends at 0years9months; USseed951's complete UI life varies with model revision and is recorded by exact source.

Additional gates:
- browser-parallel: four current-date peers/no future deaths, exact backup/import, saved-world replay without regeneration, factual infant recap and formatted personal-memory currency without internal tokens.
- browser-no-reflections: real automatic progression across 5/15/30/50/70 without reflection prompts/notes/toggle/special pauses, preserving ordinary choices/inspection.
- browser-accessibility: nine settled light/dark lifecycle/form/mobile WCAG2A/2AA/2.1AA axe surfaces, zero serious/critical violations; actual modal focus entry/Tab/Shift+Tab/Escape/opener return. Manual AT and all WCAG2.2/device cases are not certified.
- browser-large-archive:100 storage copies of one complete asserted normal save with 24 turning points and four comparison histories. Actual import/render/reload/export/detail/targeted delete; every downloaded record checked by full deep equality. Input is written incrementally and one expected template retained, avoiding artificial runner heap duplication. Retain digest/count summary on success and failure data on error. These copies are not100 new simulated lives. The198957434-byte normal-save fixture passes Chromium/Firefox/WebKit at 75b2154; exact-source evidence is in RELEASE_STATUS.md.

## Unit/integration/invariants
contracts/reliability/registry sweeps cover eligibility, invalid choices, milestones/cooldowns, zero seed/shuffle, qualification/work access and terminal behavior. Annual/finance/property tests cover conservation, pure quotes, once-only receipts, rollback/retry, gifts/reserves, pensions/FTE, distinct loans/sales/revaluation and scheduled prepayment across 129 countries. Decision/route tests cover pure token views, bound participants/conception and changed-circumstance cancellation.

Save/replay tests preserve actual snapshots, eight seeded country continuations, schema0/1→2 idempotence/current exact load/future-version rejection, explicit legacy unknowns and conserved repairs. Parallel tests compare complete player outcomes in fresh deterministic VMs, retaining IDs/appearance/memory keys rather than normalizing away failures. Mortality tests assert twelve-month survival-product identity across countries/modifiers, no extra story rolls/first-birthday charge, terminal age0, full rollback and natural saved NG2 continuation. Narrative tests reject inappropriate newborn/toddler candidates and legacy queues without altering history; ending tests prohibit invented facts and ledger substitution.

State/transition assertions check finite nonnegative finances, bounded factors/ages/months, household/work/study/loan consistency, existing identities/relationships/timelines, dead people not ageing/resurrecting, chronological nonfuture history, valid choices and terminal causes. Bugs OL-001–040 have permanent repro/correction records in BUGS.md. Tests do not establish complete multi-generation realism or measured demographic causality.

## Release policy and evidence
quality.yml has11 jobs: regression/static/build; four background shards; balance aggregate; trajectory; parallel; Chromium/Firefox/WebKit. All must pass for the exact executable source. pages.yml depends on that reusable workflow and deploys main deliberately; experimental branches do not deploy. Main protection is false/admin unavailable, so settings-level enforcement is not claimed.

Do not call stable/promote production with unresolved critical/high defects, failing/missing relevant checks, unverified save compatibility or absent changes/limitations. Preserve a restore branch and trace requirements to files/tests. Documentation-only descendants must be distinguished from tested executable revisions; never rebrand an older run as new testing. No new deployment is verified unless its workflow actually succeeds.

Private backups never belong in git/test fixtures. Read-only audits hash original bytes and report only scoped checks; a13-record migration audit is not13 simulated lives. Latest evidence and stubs/limits are in RELEASE_STATUS.md. Long-session enjoyment, slow hardware, arbitrary archives and full national/era calibration remain separate work.

## 6.3 additions
career-review.test.cjs has three red-to-green regressions for the promised review interval, exact load/read purity, primary/secondary selection pools and retained specialist training gates. browser-polish.cjs checks all four accessible meters inside the sticky strip, no duplicate living bars, eight320/390/768/1280 light/dark layouts, scrolling/fit, prose without effect badges, rounded bonds, real choice consequences and exact full-state reload. browser-routines.cjs checks natural childhood-to18 partial fixtures, mobile/desktop pointer/keyboard routine changes, rejected third selection, open Spend disclosures, row anchoring, focus and unchanged calendar/RNG/cash/journal before annual effects. Partial fixtures are not extra complete simulated lives. Both browser helpers run in every existing engine job. Existing assertions/cohorts remain; final exact-source results are in the cycle/PR record.
