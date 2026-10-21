# Other Lives 6.2.0 — bounded consistency and reliability release

The user authorised publishing this update on21October2026 if no major blocker remains. The accepted scope is coherent gameplay, no known unresolved confirmed critical/high consistency defect and the existing release gates. Remaining polish/realism is batched in RELEASE_PLAN.md; full national calibration/reference parity is not claimed.

## Publication record and rollback

[PR2](https://github.com/aidanko1/other-lives/pull/2) records source review/promotion. Actual publication and deployed revision are recorded in the [v6.2.0 publication record in PR2](https://github.com/aidanko1/other-lives/pull/2) after successful deployment, with a direct workflow and live-smoke result. Until that PR description records successful deployment, publication is pending; do not infer a successful deployment from this preparation document. [Pages workflow runs](https://github.com/aidanko1/other-lives/actions/workflows/pages.yml) are authoritative for deployment status and always require the complete quality workflow.

Restorable pre-release main:4072fd4997992cb7fd6bf78d7f0c9cab41a7379f, preserved at baseline/v6.1-before-engineering-overhaul. Verified development checkpoints: checkpoint/6.2.0-dev.4-release-gates-verified and checkpoint/6.2.0-dev.4-handover-verified. Promotion is traceable and reversible; no experimental features were added for release.

## Evidence and exact-source boundary

Tested executable/tests/workflows source75b2154d4794d09410537bebea37937b9cc64ebf passed all11 jobs: https://github.com/aidanko1/other-lives/actions/runs/39540689377. Handover11dcd56 also passed all11: https://github.com/aidanko1/other-lives/actions/runs/39541605654. Later scope commit2d754b0 is documentation-only. The6.2.0 promotion changes package/index/release-version strings from6.2.0-dev.4 to6.2.0, including asset cache keys, plus release documentation. Engine/UI logic, schema, tests and workflows remain byte-identical to the verified candidate. Final-promotion CI must pass before merge; Pages repeats the complete gate before deployment. Final exact-source run IDs belong in the publication record; earlier tests are not presented as fresh runs.

## Executed acceptance
| Gate | Verified result |
|---|---|
| Static/production build | Pass;50 script dependencies;129 enabled countries,853 events,280 moments,42 routes,10 degrees,37 career tracks |
| Unit/integration/regression |107 Node-reported tests pass,0 failures; original assertions retained; includes finance/annual/property/employment/eligibility/participants/save/terminal/clock regressions |
| Background/optional-route cohort |1000 complete asserted lives;129 countries/four backgrounds;56592 decisions,age0–108,median58; aggregate distribution/repetition gate passes |
| Trajectory cohort |Additional1000 complete asserted lives;129 countries/five quintiles/four policies;45107 decisions,mean age74.539;963 lives with paid work,973 with family changes |
| Parallel cohort |Additional1000 complete per-action-asserted peers in250 worlds;129 player origins/95 peer countries;782518 checked states,34149 decisions,age0–104,max newborn save23997 bytes |
| Targeted complete rare paths |432 additional complete asserted naturally prepared lives:48 each dance/acting/esports/board-professional/vocation,192 K-pop; actual interests/practice/eligible retries/academy/professional/failure outcomes and stage reloads; no forced success/stat/fund/age/RNG injection |
| Chromium/Firefox/WebKit |All three pass full production-control lifecycle/choice/navigation/storage/export/import/archive/replay plus school/funding/property/bereavement/mobile/legacy regressions |
| Natural UI lifecycles |US951: childhood/adulthood/old-age reloads,44 choices,death95,actual archived cause and another birth. NG2: natural death0years9months,exact ending reload/archive and another birth |
| Pacing/reflection exclusion |Actual30/60/90 setup/timed years/pause/reload and legacy5-highlights/45.1-controlled-second year pass; real progression across 5/15/30/50/70 with no reflection questions/notes/toggle/special pauses |
| Comparison/ending |Four passive current-date peers/no future-death leak, unchanged player outcomes/RNG; exact saved-world replay without regeneration; factual infant/legacy recap/personal memory/formatted currency with no internal markers |
| Accessibility |Nine light/dark lifecycle/form/mobile WCAG2A/2AA/2.1AA axe surfaces,zero serious/critical violations in all engines; actual modal focus entry/wrap/Escape/return; nonmodal decisions preserve inspection |
| Large normal-save archives |198957434-byte backup;100/100 exact records after actual import/render/reload/export/detail/targeted deletion in all three engines. Each record includes24 turning points/four peer histories/229 journal entries. Copies of one complete asserted fixture, not100 new simulated lives |
| Save compatibility |Schema0/1→2 pure/idempotent migrations, exact schema2 load/eight country snapshot continuations, legacy unknowns/conserved liability repair, no invented timing/worlds.13 private records also pass local read-only history/identity/idempotence/consistency/migration audit; original bytes hash unchanged |
| Deployment/enforcement | Actual publication is recorded separately above. Pages depends on all quality jobs; protected-main remains false and connector administration is unavailable. Settings-level enforcement is not claimed |

3432 is the three release-cohort totals plus targeted432 for this revision. Repeated runs at older/newer commits are not additional unique scenarios; storage copies/private records are not simulations. CI retains logs/artifacts/reproducible failures. These are seed/policy-conditioned distributions, not measured national probabilities or proof of enjoyment.

## Corrections completed in cycles8–12
Four passive comparison lives and factual richer endings address verified reference gaps. Reflections remain intentionally excluded. Bugs OL-034–040 cover deceased teenage partner history, model age bounds, unreachable career interests, contrast/modal focus, infant timing, newborn/toddler prerequisites and ledger/raw-currency retrospective selection. Earlier audit corrections cover conserved finance/tuition/estates, atomic annual/birthday receipts/rollback, employment hours/FTE/pensions, bound participants/cancellation, distinct property/loans and debt schedules, exact load/read boundaries, seeded determinism and bereavement/calendar pacing. BUGS.md and requirements/cycle records preserve causes, states/seeds and permanent regressions.

The expanded archive fixture initially exhausted the test runner's heap through deep fixture duplication; it now streams input construction, transfers one serialized template and uses full deep equality per downloaded record. Record count/history/assertions were not reduced and memory limits were not raised. Unique download paths avoid local artifact collisions. This is not a claimed production OOM fix.

## Remaining limits and next priority
No confirmed unresolved critical/high defect is knowingly hidden; this is not a bug-free guarantee.129 authored profiles versus reference172 locations, eras, national economics/schooling/licensing and age/sex mortality remain partial. Uniform infant hazard does not model neonatal concentration; older-age timing is annual. Long junior medical titles/promotion opportunities and contextual generic repetition need further evidence before changing deliberate application/training gates. Full normal-speed subjective enjoyment, manual assistive-technology/low-end-device checks and arbitrary archive sizes are unverified. New-birth peer generation is synchronous, measured around1.9s locally; slow-device latency is unknown.

Current release task: complete the authorised gated publication and record live verification; after publication, consult that record before repeating any release operation. Remaining work is batched in RELEASE_PLAN.md, beginning with targeted gameplay polish after this release. Owner-level required-check protection needs owner administration. Keep this checkpoint playable/restorable and experimental changes separate; do not automatically merge/deploy it or call the whole project fully realistic/reference-equivalent.

Read AGENTS.md, GAME_DESIGN.md, FIDELITY_MATRIX.md, ARCHITECTURE.md, TESTING.md, REQUIREMENTS_MATRIX.md, BUGS.md and BACKLOG.md at the next session. Previous cycle failures and exact evidence remain in ENGINEERING_CYCLE_*.md. No private backup was modified or committed; no avatar/text-render audit is claimed for the latest13-record migration recheck.
