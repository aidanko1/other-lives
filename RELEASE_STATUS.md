# Release status — verified reliability baseline

Verified 20 October 2026 UTC / 21 October Hong Kong. Version 6.2.0-dev.1 is unreleased. The audited reliability stage is implemented and verified; complete reference parity and national calibration remain incomplete. No experimental merge/deployment.

Development branch: engineering/fidelity-reliability-baseline. Draft PR: https://github.com/aidanko1/other-lives/pull/2.
Tested runtime/tests/workflows: **b87e519fd04fceb489a39c68a67719e0159d8324**.
All eight jobs pass: https://github.com/aidanko1/other-lives/actions/runs/39515340262.
Restore branch: **checkpoint/6.2.0-dev.1-reliability-verified** points at that source. Final documentation is a separate descendant and changes no runtime/tests/workflows.

## Executed gates
| Gate | Verified result |
|---|---|
| Build/syntax/assets/registries | Pass locally and CI;48 script dependencies;129 countries,853 events,280 moments,42 routes,10 degrees,37 careers retained |
| Unit/integration/regression |75 Node-reported tests pass,0 fail; no relaxed/removed gameplay assertion |
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
| Private legacy compatibility |13/13 read-only migration/history/finance/consistency/text-render checks; Node avatar rasterization stubbed. Three absent opening family-cash fields explicit; one negative family asset converted traceably to equivalent debt. Original bytes unchanged; never committed |
| Reference play | Official v0.7.89 beta: infant death/rebirth plus full India life through school/university/work/family/care/retirement at 60/old age/death at 91; rendered record visually inspected; no sharing/purchases |
| Deployment | Not performed; main 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f unchanged. No new live-build verification claimed |

Both 1,000-life cohorts retain explicit per-state assertions and reproducible cases.75 is the Node runner count, not number of assertions.34 route starts do not establish every rare stage/combination. CI retains logs/artifacts. The private 13 records are compatibility checks, not additional simulated lives.

## Failure investigation
Source 85deb8d passed 62 tests/build/browser but failed both full cohorts: debt prepayment left scheduled instalments charging and created negative debt. OL-028 records seeds/root cause/correction/regression. Source 08bc385 passed 73 tests and all eight gates (run39514292709). Pacing correction b87e519 adds two tests and passes 75/all eight gates. Failed intermediate checks remain recorded, not relabelled successful.

## Restore points and enforcement
Production v6.1.0 main 4072fd4 is preserved by baseline/v6.1-before-engineering-overhaul; historical Pages success is not a new correctness certification. Earlier verified07f81f2/a248549 remain ancestors. b87e519 is the latest tested engineering checkpoint.
Pages depends on reusable quality; experimental branches do not trigger production deployment. Main branch protection was read and is **not enabled**. Available access cannot administer it; an owner must enable protected-main required checks for merge-level enforcement. Workflow deployment gates and repository instructions exist; settings-level enforcement is not claimed.

## Remaining work and release decision
No known confirmed critical/high audit defect remains without its corrective regression. This is not a bug-free guarantee. Remaining legacy structural/command helpers, rare combinations, other engines, accessibility and large-archive performance are incomplete/unverified.
Reference gaps:129 versus172 locations, eras, configurable duration, parallel lives/reflections and richer retrospective summaries. National economic/education/health/legal inputs are simplified; adult mortality is not calibrated against complete age/sex tables. Enjoyment and full normal-speed sessions are not established by CI.
Keep this verified engineering baseline separate from production. Next priority: documented pacing/decision-burden/menu comparison, then justified reference omissions and separately sourced data calibration. No stable-production label, automatic merge or deployment.

## Handover persistence
The local execution connection failed during final documentation publication. Tested source/checkpoint were already on GitHub; the handover was completed through connected GitHub using that immutable parent. The final commit contains Markdown only. A future local session should fetch the remote branch and reconcile any transient uncommitted documentation, rather than overwrite newer repository evidence.
