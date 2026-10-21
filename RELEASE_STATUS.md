# Current candidate —6.2.0-dev.2, not released

Cycle8 continues from8c549dd on engineering/completion-cycle8, targeting the existing draft PR#2. The new production code is not represented by earlier CI results. No main merge or deployment.

Executed locally:90 Node tests pass,0 failures; Chromium complete lifecycle/storage/property/timer/exclusion suite plus new comparison/export/import/replay/ending checks passes. A1000-peer run passes:250 worlds,129 player origins,95 peer countries,760051 checked states,33125 decisions,ages1–104,max newborn save22982 bytes. That run preceded the final120/160 mortality-boundary fix; final exact-source CI must rerun all cohorts. Newborn GB2218 generated four complete peer histories in approximately1.9 seconds locally; performance on slower devices is unverified.

New release gate:11 jobs (regression/build,four background shards,balance,trajectory,parallel,three browser engines). CI pending. Firefox local test running; WebKit local launch blocked by missing host libraries. No passed status is inferred from downloaded binaries. Reflections remain excluded. ENGINEERING_CYCLE_8.md records acceptance, failed fixture investigation and bug reproductions. The historical verified checkpoint below remains restorable until this candidate's gates pass.

---

# Release status — verified reliability baseline

Verified 21 October 2026 UTC/Hong Kong. Version 6.2.0-dev.1 is unreleased. The audited reliability and playback stages are implemented and verified; complete reference parity and national calibration remain incomplete. No experimental merge/deployment. ENGINEERING_CYCLE_6.md records the latest acceptance and evidence.

Development branch: engineering/fidelity-reliability-baseline. Draft PR: https://github.com/aidanko1/other-lives/pull/2.
Tested source/tests/workflows: **6c8763ad3750747b5abbbd0e2b26d651a8bfde73**. Production engine/UI/index are byte-identical to ba00e5bd8cfc50cf54c92bbecd23ee954024934f; cycle7 adds the explicit user exclusion and permanent guards, not reflection gameplay.
All eight jobs pass: https://github.com/aidanko1/other-lives/actions/runs/39532142864.
Restore branch: **checkpoint/6.2.0-dev.1-fidelity-exclusions-verified** points at that source. Earlier **checkpoint/6.2.0-dev.1-pacing-verified** preserves ba00e5b and **checkpoint/6.2.0-dev.1-reliability-verified** preserves b87e519. Final documentation is a separate descendant and changes no runtime/tests/workflows.

## Executed gates
| Gate | Verified result |
|---|---|
| Build/syntax/assets/registries | Pass locally and CI;48 script dependencies;129 countries,853 events,280 moments,42 routes,10 degrees,37 careers retained |
| Unit/integration/regression |82 Node-reported tests pass,0 fail; no relaxed/removed gameplay assertion; floating-point test correction documented as TEST-006 |
| Registry contracts |2,838 country/age/wealth contexts,15,863 eligible card contracts,523 definitions |
| Annual/decision/route | Atomic ordered annual/birthday, receipts/reload/rollback/retry; pure display/tokens; participant/conception identity and cancellation checks pass |
| Finance/property | Conserved quotes/commit/budget and debt schedules; separate holdings/loans/sale fees/revaluation;129-country two-loan annual/reload checks |
| Save/replay | Eight country continuations with real snapshots; schema0/1→2 pure/idempotent migration, future-version rejection, unknown aggregate history and explicit net-wealth repair |
| Background/optional-route cohort |1,000 complete asserted lives,0 failures;129 countries/four backgrounds;56,747 decisions,547 definitions,34/42 route types initiated |
| Trajectory cohort | Additional 1,000 complete asserted lives,0 failures;129 countries/five quintiles/four policies;44,699 decisions;965 lives with paid work,973 with family change |
| Balance/repetition | Four-shard aggregate gate passed; ages1–109,median59,decisions0–178; authored moment repetition asserted. Trajectory mean age 74.034. Policy-conditioned outputs, not demographic estimates |
| Browser | Chromium desktop/mobile; birth/choice, inspect pause, saving/reload, export/import, archive deletion/resume, family funding/school; full-state read/export equality |
| Natural actual UI lifecycle | US seed951: birth/childhood/adulthood/old-age reloads,47 choices,death at 105,archived cause and another birth; production controls, not synthetic ending |
| New browser cases | Let→move→buy→save/reload retains rental loan. Actual annual family death stops Next without a new choice and stays paused after 4.1 seconds |
| Playback/duration | Five actual authored stories plus12calendar months in45.1controlled seconds at legacy1×; actual birth setup/timed year/highlights/pause/exact reload pass for30/60/90min. All129 birth references, fixed origin and whole complete-life outcome equality pass. Mobile form visually inspected locally |
| Reflection exclusion | User-requested difference: no milestone questions/notes/pauses/toggle. Next and actual automatic playback continue across5/15/30/50/70. No prototype module in source/build; no prototype was published |
| Private legacy compatibility | Prior13/13 read-only migration/history/finance/consistency/text-render audit; not rerun in cycle6, whose migration code is unchanged. Node avatar rasterization was stubbed. Three unknown opening family-cash fields and one conserved negative-asset liability repair remain explicit. Original bytes unchanged; never committed |
| Reference play | Prior official v0.7.89 infant death/rebirth plus full India life to91/retirement60; current v0.7.90 setup/birth/five-year optional reflection inspected. Country-life-expectancy duration target and four companion lives verified in UI. No sharing/purchases |
| Deployment | Not performed; main 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f unchanged. No new live-build verification claimed |

Both1,000-life cohorts retain explicit per-state assertions and reproducible cases; cycle7 reruns both in CI. Prior local cycle6 cohorts use the identical production engine; they are not fresh cycle7 runs or additional unique scenarios.82 is the Node runner count, not number of assertions.34 route starts do not establish every rare stage/combination. CI retains logs/artifacts. The private13 records are historical compatibility checks, not additional simulated lives.

## Failure investigation
Source 85deb8d passed 62 tests/build/browser but failed both full cohorts: debt prepayment left scheduled instalments charging and created negative debt. OL-028 records seeds/root cause/correction/regression. Source 08bc385 passed 73 tests and all eight gates (run39514292709). Pacing correction b87e519 adds two tests and passes 75/all eight gates. Failed intermediate checks remain recorded, not relabelled successful.

## Restore points and enforcement
Production v6.1.0 main4072fd4 is preserved by baseline/v6.1-before-engineering-overhaul; historical Pages success is not a new correctness certification. Earlier verified07f81f2/a248549/b87e519 remain ancestors.6c8763a is the latest tested engineering checkpoint; ba00e5b has identical production code and pacing-only b751cb3 also passed all gates (run39529422834).
Pages depends on reusable quality; experimental branches do not trigger production deployment. Main branch protection was read and is **not enabled**. Available access cannot administer it; an owner must enable protected-main required checks for merge-level enforcement. Workflow deployment gates and repository instructions exist; settings-level enforcement is not claimed.

## Remaining work and release decision
No known confirmed critical/high audit defect remains without its corrective regression. This is not a bug-free guarantee. Remaining legacy structural/command helpers, rare combinations, other engines, accessibility and large-archive performance are incomplete/unverified.
Reference gaps:129 versus172 locations, eras, passive parallel lives and richer retrospective summaries. Reflection prompts/notes/pauses are intentionally excluded by explicit user instruction, not missing work. Duration settings are implemented; the exact reference timer remains unknown and Other Lives uses its existing combined-country expectancy rather than verified sex-specific expectancy. National economic/education/health/legal inputs are simplified; adult mortality is not calibrated against complete age/sex tables. Enjoyment and full normal-speed sessions are not established by CI.
Keep this verified engineering baseline separate from production. The scoped pacing/menu review is recorded in ENGINEERING_CYCLE_6.md; next priority is the passive parallel-life experience, followed by sourced data calibration and rare-combination coverage. No stable-production label, automatic merge or deployment.

## Handover persistence
Cycle5's local connection failed during documentation publication; that handover was preserved on GitHub. Cycle6 recovered a fresh worktree from0f3645f, leaving older uncommitted documentation untouched. Tested checkpoints and this evidence are permanent in GitHub. Fetch the latest remote branch and read current documents before editing; do not overwrite newer evidence with old drafts.
