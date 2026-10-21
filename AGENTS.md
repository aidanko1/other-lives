# Other Lives — permanent development contract

## Product priority
Preserve the experience of **1 in 8 Billion**, official reference https://1in8b.life/en/.
Priority: gameplay fidelity; logical consistency and realism; causal storytelling and lasting consequences; reliability/completeness/maintainability; then content.
Explicit user exception (21October2026): **do not implement the reference's reflection feature**. No milestone reflection questions, note-entry screens, reflection pauses or reflection toggle. This is an intentional product requirement, not missing fidelity work. Ordinary noninteractive memories remain part of event storytelling. Consult GAME_DESIGN.md and FIDELITY_MATRIX.md before proposing reference parity changes.
Retain `tests/fidelity-exclusions.test.cjs` and `tests/browser-no-reflections.cjs`; ENGINEERING_CYCLE_7.md records this correction. They protect uninterrupted progression at5/15/30/50/70 while preserving normal choices and bereavement stops.
Latest tested guard/source checkpoint:6c8763a,82 tests/build/two1000-life cohorts/all eight jobs (run39532142864). Production engine/UI/index remain identical to ba00e5b. Restore:`checkpoint/6.2.0-dev.1-fidelity-exclusions-verified`. Older verification paragraphs below are historical supplements.
Keep chronological, text-driven life progression, an automatic clock with pause/speed/next-decision controls, occasional meaningful decisions, and optional family/spending inspection. Keep a restrained modern interface and static pixel illustrations. Do not turn it into an RPG, management simulator or dashboard.

## Before editing
Read GAME_DESIGN.md, ARCHITECTURE.md, TESTING.md, ENGINEERING_AUDIT.md and BACKLOG.md. Inspect the real implementation and callers; UI presence and old release claims are not verification.
Inspect index.html script order and every wrapper of affected OL functions. Define acceptance criteria, affected systems, fidelity implications, save implications and regression scenarios before implementing.
Treat REFERENCE_GAME_AUDIT.md as historical research, not proof of new playtesting. Use only the official site for reference evidence. Label source-documentation observations separately from hands-on play.

## Engineering rules
Preserve a restorable SHA and use a development branch. Work in small coherent commits; do not merge or call a release stable with failing required checks.
Prefer fixing the existing owner of a rule. Do not add another layer of monkey patches to repair an earlier patch. Move toward explicit system ownership incrementally behind tests, without a wholesale rewrite.
Use OL.rand/OL.int/OL.chance for simulation randomness. No random sort comparators. Metadata IDs/timestamps may be nondeterministic; exclude them explicitly from replay comparisons.
Validate eligibility at execution as well as presentation. Preserve qualifications, identities, debts, commitments and established history across transitions.
No silent placeholders, removed functionality or invented country-specific evidence. National averages are not individual predictions. Clearly label model assumptions.
Preserve current save keys. Changes to save semantics need idempotent migrations, older-save fixtures and round-trip checks. Never commit a user's private archive or rewrite their original backup.
Do not add UI controls merely because the engine gains depth.

## Completion evidence
Implement, integrate and test the complete agreed scope. Execute appropriate unit/integration/regression tests and actual browser checks. A major release needs at least 1,000 complete seeded lives with explicit assertions, coverage/outcome summaries and retained failure reproduction data. A bounded run that stops while alive is a failure.
Record exact commands, commit SHA, CI URLs, validated life count and limitations. Never describe authored tests as executed or old CI results as results for the new revision.
Update CHANGELOG.md and BACKLOG.md; distinguish implemented, verified, incomplete and unverified work. Do not claim a live deployment until its workflow succeeds. Report the next highest-priority task.

## Phase 11: invariants and traceability
Read REQUIREMENTS_MATRIX.md, BUGS.md and RELEASE_STATUS.md at session start. Keep verified implementation status and exact-revision test evidence current. Record expected/actual state, reproduction seed, cause, correction and regression for significant bugs. Do not weaken/delete failing assertions, hide errors or reduce coverage to pass a release. Correct an invalid test transparently with evidence.
Use the extracted engine/rules.js, engine/state.js and engine/commands.js boundaries. Never use livingCost as a read-only preview: quoteAnnualCosts clones state. Keep old migration fixtures and browser assertions. Quality CI must gate production packaging/deployment; no automatic deployment from experimental branches. Do not label stable while critical/high defects remain or release checks are unverified.

Consult FIDELITY_MATRIX.md for measurable comparison and unknown reference behaviour. Preserve the original game through independent code/art/prose. A passing technical gate does not resolve documented player-experience or calibration gaps.

Annual cost ownership is engine/finance.js. Use quoteAnnualCosts for queries and settleAnnualCosts only at the explicit yearly commit; preserve saved receipts, conservation/rollback tests and legacy unknown-cash/known-zero-debt regressions. Do not reintroduce livingCost wrappers or adapter calls in UI/profile/family/spending/art reads. Current-schema loading must not execute simulation transitions. Consult ENGINEERING_CYCLE_2.md and RELEASE_STATUS.md for the latest exact-code evidence.

## Verified ownership and continuity checkpoint
Read RELEASE_STATUS.md and ENGINEERING_CYCLE_3.md through ENGINEERING_CYCLE_5.md at session start. Tested source b87e519 has 75 passing tests and all eight CI gates, including two 1,000-life cohorts. Do not confuse a documentation-only descendant with a new runtime revision.
Annual ownership is engine/annual.js: register named stages, never replace OL.passive. Preserve whole-birthday rollback and saved once-per-age receipts. Employment role/pay/hours/FTE belong to engine/employment.js. Dwelling identity, use, values and secured loans belong to engine/property.js. Repay through engine/finance.js so total debt and bill schedules change together.
Current schema2 loading is an exact clone; retain schema0/1 migrations, unknown legacy aggregates and explicit conserved liability repairs. UI uses engine/decisions.js and submits its displayed token. Next stops at a newly deceased close family member without inventing a choice.
Full reference parity/calibration remain incomplete. Main protection is currently false and owner administration is outside available access. No experimental production merge/deployment.

Cycle6 continuity: read ENGINEERING_CYCLE_6.md. Playback must charge actual calendar movement, not story delivery. New-life duration is presentation metadata frozen before the birth snapshot; preserve the3750ms/month fallback and exact load for existing saves. Never use pacing to change RNG or life outcomes. Keep all three timed UI tests plus the retained legacy five-highlight regression. These tests use controlled elapsed browser time, not a claimed full normal-speed human session.
Latest tested runtime/tests/workflows: ba00e5b,81 passing tests/build, both1000-life cohorts and all eight jobs (run39530111698). Checkpoint/6.2.0-dev.1-pacing-verified preserves that source. Cycle6's policy-stratified counts and high-count replays do not justify treating voluntary stress choices as mandatory burden or claiming enjoyment. Current docs-only descendants must be distinguished from new runtime revisions.

## Cycle8 continuation — candidate, not released
Read ENGINEERING_CYCLE_8.md before editing the comparison/ending work. Version6.2.0-dev.2 introduces engine/parallel.js and engine/retrospective.js. Four peers use the production engine, separate seeds and per-action assertions; views are restricted to the current date. Never regenerate an existing save's comparison history or attach invented past peers to old lives. Snapshot data stores a world reference; replayState restores that exact saved world. Keep comparisons out of recursive peer generation and preserve player RNG/outcomes. Ending selectors must remain pure and use recorded facts only. No reflection prompts, notes or pauses. Current verification status is in RELEASE_STATUS.md; do not mistake earlier CI for this revision.

## Current continuity (cycles8–9)
Last exact-source verified checkpoint is bc74cde:90 tests/build/all11 jobs/3000 complete asserted lives, including three browser engines. Restore checkpoint/6.2.0-dev.2-comparisons-verified. Earlier statements of82 tests/eight gates are historical. Read ENGINEERING_CYCLE_8.md, ENGINEERING_CYCLE_9.md and current RELEASE_STATUS.md. Candidate9 adds reachable interests, contrast/modal accessibility and large-archive assertions; its exact-source verification is separate.

Cycle10 mortality candidate: new births save mortalityTiming version1 before the first snapshot. Never add it to older saves or reroll saved worlds. clock.js owns atomic first-year timing; demographics.js owns probabilities/deduplication. Keep six infant regressions and natural NG2 UI check; no extra mortality on story delivery. Consult ENGINEERING_CYCLE_10.md and actual exact-source CI, not older counts. The uniform infant hazard is an assumption, not a national neonatal curve.

Cycle9 now verified at db19f9c1,98 tests/build/all11 jobs/3000 release-cohort lives plus432 targeted complete rare-path cases, including accessibility and100-record archives in Chromium/Firefox/WebKit. Restore checkpoint/6.2.0-dev.2-accessibility-routes-verified. Cycle10 has separate pending evidence.

Cycle10 verified source f0f2608:104 tests/build/all11 jobs/3000+432 complete asserted lives; restore checkpoint/6.2.0-dev.3-infant-timing-verified. Cycle11 candidate uses definition min ages (shared selection/execution) and pure ending selection/text formatting; read ENGINEERING_CYCLE_11.md. New test expectation107 is not a pass until executed.
