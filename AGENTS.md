# Other Lives — permanent development contract

## Product
Preserve the independently implemented, text-driven chronological life/choice experience of the official reference https://1in8b.life/en/. Priority: fidelity; consistency/realism; persistent causal storytelling; reliability/maintainability; additional content. Use FIDELITY_MATRIX.md to distinguish direct observations, documentation, assumptions and unknowns. Never copy proprietary source, art or substantial prose.

**Explicit user exception: no reflections.** No milestone reflection questions, player note-entry screen, special reflection pause or toggle. Keep fidelity-exclusions.test.cjs and browser-no-reflections.cjs. Ordinary noninteractive memories and the existing Rest focus remain. Do not remove unrelated meaningful decisions merely because they concern a life milestone.

Keep the automatic clock/pause/speed/Next controls, occasional meaningful choices, optional inspection and restrained static pixel art. No movement/exploration, management dashboard, extra compulsory menus or micromanagement. Deeper simulation does not require more controls.

## Start every session
Read this file, RELEASE_STATUS.md and the latest relevant changes; consult other project documentation and implementation/tests only as needed for the affected systems. Inspect git status/recent commits before editing. Do not repeat a whole-game audit for routine work or overwrite other worktrees/uncommitted changes.

## Proportionate, feature-complete development — consolidated policy
For a minor bug/correction, inspect the affected owner/dependencies, reproduce the expected/actual behaviour, check the same root cause within that system, and fix confirmed related cases. Use targeted verification and affected gameplay checks. Do not expand a small fix into an unrelated feature overhaul or whole-game audit.

For a major feature, define a coherent scope and measurable acceptance criteria; inspect the whole relevant system and consequential dependencies. Implement the essential connected mechanics and main player scenarios together. Small-update preferences must not artificially restrict meaningful feature development. Completion means integrated, functional gameplay, not every rare scenario, perfect data, extra variables or a rewrite of all neighbouring systems. Preserve meaningful distinctions (for example career stages share skills/experience while retaining seniority/pay/eligibility).

Country-specific features should use shared structures/general calculations across all supported locations, reliable national inputs where available, and explicitly labelled defensible fallbacks elsewhere. Do not leave the same mechanical gap unresolved in most countries or spend disproportionate research on marginal differences. Existing bounded work must reach a safe checkpoint before its coverage/gaps are reviewed; do not restart verified work or silently widen an active release. Distinguish implemented/verified mechanics, material gaps and optional refinements when choosing the next coherent scope.

Prioritise serious bugs/contradictions, incomplete core mechanics affecting many lives, missing features with material player impact, improvements connecting related mechanics, then minor balance/visual details. Prefer one coherent substantial improvement over disconnected additions; do not combine unrelated systems merely to fill a release. Make only necessary changes; no unrelated abstractions, dependencies or refactors. Preserve the simple reference-game loop and keep complexity underneath the interface.

Scale tests to actual risk. Minor changes need targeted regressions/checks; moderate changes need relevant integration/regression coverage; core generation/progression/interconnected feature changes need broad seeded simulations and appropriate end-to-end gameplay checks. Reuse existing infrastructure and avoid duplicate manual research/testing or thousands of lives for a small display fix. Do not weaken correct assertions, hide errors or claim unexecuted checks passed. Explain invalid fixture corrections transparently. Existing automated publication safeguards remain; adjust scope deliberately rather than bypassing failures.

Keep the published game playable, isolate substantial work with restorable checkpoints, preserve saved lives/history where feasible, and publish only completed verified features. Build when warranted, check affected edge cases and distinguish unverified work from failures. Do not deploy unfinished features. Keep continuity concise; update permanent instructions for material rule changes, without duplicate cycle reports, matrices or broad fidelity audits for routine fixes. Report Fixed; Also checked/fixed; Verified; Remaining. Act without repeated confirmation when intent is clear.

Last published playable release:6.3.0, main952db710e43948d223b69405c0559de5d186d7ca; restore release/6.3.0. PR3 records passing source/production gates and actual live save/choice/reload verification. Current6.4 update combines the reported Spend/presentation fixes with the authorised next bounded data batch; consult RELEASE_STATUS.md and [PR4](https://github.com/aidanko1/other-lives/pull/4).

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
