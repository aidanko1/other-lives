# Prioritised continuation backlog

## Development priority order
1. User experience and gameplay fidelity.
2. Simulation coherence.
3. Education and careers.
4. Demographic and country realism.
5. Health, adversity and family.
6. Narrative depth and long-term consequences.

Choose work in this order, addressing confirmed serious defects first. The proposed education scope below does not override higher-priority user experience or coherence work. Follow AGENTS.md for development policy; the entries here describe work, not additional protocols.

## Safe checkpoint and current release
Published6.4.0 is verified at6e0f730a63a6db1b170191830cd2b60f4699fdc9 and restorable at release/6.4.0. [PR4](https://github.com/aidanko1/other-lives/pull/4) records128 tests, all11 source gates,3432 asserted complete release lives, all three browsers, successful production validation/deployment and actual live save/toggle/reload checks. Earlier6.3.0 and verified checkpoints remain restorable. Candidate6.4.1 fixes confirmed decision keyboard focus escaping behind the overlay (OL-052); source gates and publication remain pending. Next continue the priority order above; this focused accessibility correction does not complete all subjective UX work.

## Country realism assessment at that checkpoint
This is a focused inspection of the actual current owners/registries, not a repeated whole-game audit or proof of empirical calibration. Counts were queried from the loaded production engine after the runtime gates passed.

| Area | Implemented and evidence | Material gap / priority |
|---|---|---|
| Birthplace selection | Shared seeded weighted sampler across129 playable profiles; equal/fixed modes; two frozen2024 HK/US birth-count weights with provenance/version. New exact-weight/distribution/save tests pass. | Other127 weights remain illustrative. This completed data slice is **not** a completed country-realism feature; further tiny count revisions have lower gameplay impact than opportunity mechanics. |
| Mortality | Valid shared survival/timing rules and full-life assertions across countries;12 national under-five anchors,9 infant anchors,12 life-expectancy anchors at runtime; explicit proxies elsewhere. Adult curves are fitted everywhere. | Adult age/sex and proxy calibration are incomplete. Existing consistency checks verify valid simulation, not population accuracy; broad life-table expansion is separate work. |
| Household and circumstances |129 cultural profiles, percentile/PPP-derived resources, family composition, fertility prior/fallback and ongoing household/estate budgets; finance/family regressions pass. | Percentile-to-income/assets/cash and fertility-to-siblings formulas are game assumptions, not validated joint demographic distributions. No comprehensive tax/benefit/era model. |
| School opportunities | Explicit access versus enrolment, entry/leaving decisions, qualifications/funding;65 country-specific pathway text entries plus regional fallback. Existing eligibility/save/full-life tests pass. | Birth access uses an illustrative school-score/strata formula; shared starting age6 and generic progression do not establish realistic national access, duration or completion. Named pathways are text, not proof of distinct mechanical coverage. This directly affects qualifications and subsequent work across many lives. |
| Employment and progression |37 ladders, related skill/experience transfer, qualification/application gates, hours/pay and family-care/study interactions; retained career and integration tests pass. | National recognition/licensing/salary distributions are approximate; do not rewrite all careers merely to improve school opportunities. |
| Country context and saves | Country/place/cultural context,129 supported profiles, exact saved snapshots and existing comparison worlds; save/export/replay and browser continuity pass. | Historical eras and authored variety remain incomplete. New facts must not overwrite established life history or silently regenerate comparison lives. |

## Candidate scope for priority3: school opportunities across all supported countries
Improve the common school-opportunity pipeline from access/entry through secondary completion and the existing qualification-to-work boundary. Replace disconnected assumptions only where needed with one versioned country opportunity structure covering all129 profiles. Use a compact reliable source family where available, documented regional/income-group approximations otherwise; select fields/units/coverage before implementation. This remains a proposed coherent feature, subject to the priority order above; national labels alone do not complete its mechanics.

Acceptance: every supported profile has finite valid values and explicit source/fallback status; entry, attendance/continuation, leaving/completion and resulting qualifications agree; resource/geographic barriers affect opportunity probabilistically without guaranteed success; qualifications continue to gate existing study/job routes. Test poor/wealthy and urban/rural paths, interrupted schooling and valid later recovery, shared calculations, seed replay and old-save continuation, relevant full cohorts and actual unchanged-simple gameplay. Main scenarios must work together; no extra mandatory menus/micromanagement. Preserve existing saved circumstances/model versions rather than inventing past schooling.

Not part of that scope: a complete tax system, all professional licensing laws, household reimplementation, disease registry, every historical era, perfect population matching or unrelated interface redesign. Define/calibrate only necessary dependencies. This is the next scoped proposal, not implemented or deployed work.

## Other deferred work
Confirmed serious bugs take precedence. Contextual narrative repetition and measured slow-device/accessibility improvements remain later independent batches. Adult life-table and broader socioeconomic calibration remain separate, explicit limitations. Manual assistive-technology, actual slow phones and arbitrary archive sizes are unverified. Main-protection administration remains unavailable; existing workflow gates continue. Private archives stay untouched. No reflections.
