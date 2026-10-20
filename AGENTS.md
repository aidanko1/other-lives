# Other Lives — permanent development contract

## Product priority
Preserve the experience of **1 in 8 Billion**, official reference https://1in8b.life/en/.
Priority: gameplay fidelity; logical consistency and realism; causal storytelling and lasting consequences; reliability/completeness/maintainability; then content.
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
