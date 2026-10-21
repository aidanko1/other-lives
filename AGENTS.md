# Other Lives — permanent development contract

## Product
Preserve the independently implemented, text-driven chronological life/choice experience of the official reference https://1in8b.life/en/. Priority: fidelity; consistency/realism; persistent causal storytelling; reliability/maintainability; additional content. Use FIDELITY_MATRIX.md to distinguish direct observations, documentation, assumptions and unknowns. Never copy proprietary source, art or substantial prose.

**Explicit user exception: no reflections.** No milestone reflection questions, player note-entry screen, special reflection pause or toggle. Keep fidelity-exclusions.test.cjs and browser-no-reflections.cjs. Ordinary noninteractive memories and the existing Rest focus remain. Do not remove unrelated meaningful decisions merely because they concern a life milestone.

Keep the automatic clock/pause/speed/Next controls, occasional meaningful choices, optional inspection and restrained static pixel art. No movement/exploration, management dashboard, extra compulsory menus or micromanagement. Deeper simulation does not require more controls.

## Start every session
Read RELEASE_STATUS.md, GAME_DESIGN.md, FIDELITY_MATRIX.md, ARCHITECTURE.md, TESTING.md, REQUIREMENTS_MATRIX.md, BUGS.md and BACKLOG.md, plus the latest engineering cycle. Inspect git status/log/remote and affected implementation/callers/tests. Do not overwrite other worktrees or uncommitted work. Older cycle reports are historical exact-revision evidence; do not present them as new tests or rely on conversation history alone.

Latest verified executable/tests/workflows source: 75b2154 (cycle12),107 tests/build/all 11 jobs/3000 release-cohort lives plus 432 targeted complete lives; restore checkpoint/6.2.0-dev.4-release-gates-verified. Three engines also pass100 normal-save archives with 24 turning points/four peer histories each (198957434 bytes). Documentation-only descendants do not change that executable source. RELEASE_STATUS.md records current evidence.

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
Execute relevant unit/integration/regression checks, production build, actual browser lifecycle/storage/choices/replay and all release cohorts. A major release requires at least1000 complete asserted reproducible lives; current CI retains three1000-life cohorts plus 432 targeted complete rare-path cases. Bounds reached alive are failures; counts require outcome/state assertions. Retain seeds/traces, explicit invariants and failure reports. Repeated runs are not additional unique scenarios.

Update requirements-to-tests status, CHANGELOG, BACKLOG and current release evidence. Significant bugs need expected/actual state, reproduction/seed, cause, correction and permanent regression. Record exact source SHA/CI URL, actual tests/counts, build/deployment status and limits. A green gate does not establish national calibration, subjective enjoyment or complete reference parity. Never label unexecuted checks passed or the whole project finished from scoped results.
