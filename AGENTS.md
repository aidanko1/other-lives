# Other Lives — permanent development contract

## Product
Preserve the independently implemented, text-driven chronological life/choice experience of the official reference https://1in8b.life/en/. Priority: fidelity; consistency/realism; persistent causal storytelling; reliability/maintainability; additional content. Use FIDELITY_MATRIX.md to distinguish direct observations, documentation, assumptions and unknowns. Never copy proprietary source, art or substantial prose.

**Explicit user exception: no reflections.** No milestone reflection questions, player note-entry screen, special reflection pause or toggle. Keep fidelity-exclusions.test.cjs and browser-no-reflections.cjs. Ordinary noninteractive memories and the existing Rest focus remain. Do not remove unrelated meaningful decisions merely because they concern a life milestone.

Keep the automatic clock/pause/speed/Next controls, occasional meaningful choices, optional inspection and restrained static pixel art. No movement/exploration, management dashboard, extra compulsory menus or micromanagement. Deeper simulation does not require more controls.

## Start every session
Read this file, RELEASE_STATUS.md and the latest relevant changes; consult other project documentation and implementation/tests only as needed for the affected systems. Inspect git status/recent commits before editing. Do not repeat a whole-game audit for routine work or overwrite other worktrees/uncommitted changes.

## Efficient development protocol — supersedes disproportionate earlier requirements
The user's latest streamlined protocol governs routine updates. Identify expected behaviour, inspect the relevant owner/dependencies, check for the same root cause within that category, and fix all confirmed related instances. Search unrelated systems only when evidence points there. Prefer the smallest maintainable shared correction; no unrelated refactors, new dependencies, redesigns or features.

Preserve meaningful distinctions: related career stages share appropriate experience and skill while retaining seniority, pay, eligibility and responsibilities. Preserve the playable baseline, saved histories and established gameplay; reflections remain excluded.

Scale verification to risk: minor interface/data changes need targeted checks and affected gameplay verification; moderate changes need relevant integration/regression checks; major simulation/state/migration changes need broader tests, complete-life simulations and appropriate end-to-end checks. Do not manually run thousands of lives for an isolated interface/data change, repeat completed checks without a new reason, or demand exhaustive unrelated coverage. Existing automated publication safeguards remain; adjust their scope deliberately when needed rather than bypassing failures. Never weaken correct assertions or call unexecuted checks passed.

Use the existing safe branch/release workflow, with a restorable checkpoint for higher-risk work. Build when code changes warrant it; check affected edge cases and actual gameplay. Preserve working functionality and distinguish unverified checks from failures. Do not deploy incomplete or failing work as stable.

Keep continuity concise: record meaningful changes/known issues and update permanent instructions only for material rule changes. No new cycle report, multi-document rewrite, requirements matrix or broad fidelity audit is required for each minor fix. Report briefly: Fixed; Also checked/fixed; Verified; Remaining. Act without repeated confirmation when intent is clear.

Last published playable release:6.3.0, main952db710e43948d223b69405c0559de5d186d7ca; restore release/6.3.0. PR3 records passing source/production gates and actual live save/choice/reload verification. Current6.4 update combines the reported Spend/presentation fixes with the authorised next bounded data batch; consult RELEASE_STATUS.md and its publication PR.

**21 October UI requirements:** living characters' four factor bars belong in the existing sticky focus/playback strip, without duplicate story-card bars. Life log/current narrative show prose and context, without numerical stat/money-change chips; preserve saved effects, actual outcomes and optional spending previews. All Spend actions must retain disclosures, focus and reading position; restore native menu state before focus/scroll when rendering. Keep the current Spend tab through purchases and choices. Present persistent preferences once in Spend; no separate ongoing-routines panel or two-selection cap. Bind route decisions to the clicked route, preserving older queued plans. Use neutral narrative text with restrained, outcome-based headline colours; introduce named people with verified relationship context without rewriting saves. Spend menu sections use consistent native disclosures, with the money overview visible. Hide unavailable actions/choices without reindexing decision options or bypassing engine eligibility. Work & skills groups related career stages; preserve each title in the underlying experience/history ledger.

## Work in verifiable stages
The user's 21 October release-scope decision is in RELEASE_PLAN.md: the current consistency/reliability candidate is sufficient once existing release gates pass and no confirmed critical/high defect remains. Batch remaining polish, targeted realism and device/maintenance work into later updates. Comprehensive country/era calibration and indefinite enjoyment review do not block this release. Do not reopen accepted scope merely because further sophistication is possible.

Before edits, identify fidelity implications, dependencies/owners, root cause, acceptance criteria, save implications and edge cases. Implement/integrate the complete scoped behavior. Preserve existing functionality and assertions; no placeholders, hidden errors, reduced coverage or expected-result changes to manufacture a pass. Investigate failures. Explain any genuinely invalid fixture correction with evidence.

Use isolated development branches/restorable SHAs and small traceable commits. Do not merge/deploy experimental or failing work. Pre-release main4072fd4 is preserved at baseline/v6.1-before-engineering-overhaul. The user has authorised gated v6.2.0 publication; consult RELEASE_STATUS.md and the linked PR publication record for actual publication status before repeating it. All11 quality jobs gate Pages; protected-main settings are not enabled and available connector access cannot administer them. Never claim settings-level enforcement or a deployment that did not occur.

## Rule ownership
| Boundary | Owner / rule |
|---|---|
| Annual/birthday | engine/annual.js: named stages, atomic rollback and saved once-per-age receipts; never replace OL.passive |
| Costs/cash/debt | engine/finance.js: quoteAnnualCosts is pure; settleAnnualCosts only at explicit commit; preserve conserved gifts, reserves, unknown legacy cash and scheduled prepayment |
| Employment | engine/employment.js: role/pay/hours/FTE/retirement; preserve course/care/service restoration |
| Property | engine/property.js: separate dwellings, residence/letting, values and secured loans; repayment through finance |
| Eligibility/choices | engine/rules.js, decisions.js, commands.js: pure display, execution checks, displayed token, participant identity and rollback |
| State/load | engine/state.js: invariants and conservative schema0/1→2 migration; current-schema exact clone, no simulation during load |
| Calendar/playback | engine/clock.js: stories do not charge calendar months; pending choices/bereavement stop appropriately; saved30/60/90 targets, old3750ms/month fallback |
| Mortality | demographics.js probabilities, clock.js first-year atomic timing; preserve saved model versions/receipts, no extra infant rolls for stories or first birthday |
| Comparisons | engine/parallel.js: four complete independent seeded production lives, per-action assertions, immutable compact histories/current-date views |
| Ending | engine/retrospective.js pure recorded facts; never fabricate marriage lengths, descendants or happiest year; UI formats stored text/currency |
| Narrative | life-moments.js definition prerequisites apply at selection and queued execution; preserve existing recorded history |

Prefer the existing owner over another monkey-patch layer. Legacy helper/wrapper simplification must be incremental behind concrete regressions, not a wholesale rewrite. Do not use livingCost or mutating ensure helpers as display previews.

Use OL.rand/int/chance and seeded shuffle for simulation randomness. No random sort comparators. Given established state/seed/choices, continuation must reproduce. Metadata IDs/timestamps may vary between different births; isolate those explicitly, never discard gameplay/appearance/history merely to pass a comparison.

## Save/data safeguards
Keep storage keys and old fixtures. Add idempotent migrations when semantics require them. Preserve unknown historical balances/dates instead of inventing facts. Never modify or commit a user's private backup; read-only audits verify original bytes and disclose stubs/limits.

Do not add mortalityTiming to older saves, regenerate saved comparison worlds or invent past companions for existing lives. New timing/world data is written before birth snapshots. Snapshots share a world reference; replayState validates membership and restores the exact saved world. Current-schema loading is not a repair/transition.

Sources/national averages are not individual predictions. Label proxy economics, licensing, country/era assumptions and mortality approximations. Uniform infant hazard is not an empirical neonatal curve;120/160 are engine bounds, not claimed biological maxima. Do not invent national rules or remove chance/independent world developments.

## Completion evidence
Use proportionate verification above. For major simulation releases retain seeded complete-life assertions, reproducibility and failure traces; counts require validated outcomes and an alive age-bound exit is a failure. Existing release CI currently contains three1000-life cohorts and432 targeted complete rare paths. Routine UI changes do not independently justify rerunning those manually. The current6.4 batch changes route identity/selection rules and a bounded birth-weight dataset, so the established automatic release gates remain applicable.

Record exact source/check results and deployment only when executed. A green check does not prove national calibration, subjective enjoyment or complete reference parity. Do not declare the entire project complete from a bounded update.
