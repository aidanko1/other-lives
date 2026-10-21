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
Published6.4.1 is verified at461105639de083663e2be4c2186325e9e7b96ceb and restorable at release/6.4.1; [PR5](https://github.com/aidanko1/other-lives/pull/5) records128 tests, all11 source gates,3432 asserted complete release lives, three browsers and successful production/live save verification. Earlier release branches remain. The current6.5 candidate on updates/6.5-school-opportunities delivers school progression/qualification coherence; local school/finance/admission/legacy regressions pass, final browser/cohort gates and publication remain pending.

## Country realism assessment at that checkpoint
This is a focused inspection of the actual current owners/registries, not a repeated whole-game audit or proof of empirical calibration. Counts were queried from the loaded production engine after the runtime gates passed.

| Area | Implemented and evidence | Material gap / priority |
|---|---|---|
| Birthplace selection | Shared seeded weighted sampler across129 playable profiles; equal/fixed modes; two frozen2024 HK/US birth-count weights with provenance/version. New exact-weight/distribution/save tests pass. | Other127 weights remain illustrative. This completed data slice is **not** a completed country-realism feature; further tiny count revisions have lower gameplay impact than opportunity mechanics. |
| Mortality | Valid shared survival/timing rules and full-life assertions across countries;12 national under-five anchors,9 infant anchors,12 life-expectancy anchors at runtime; explicit proxies elsewhere. Adult curves are fitted everywhere. | Adult age/sex and proxy calibration are incomplete. Existing consistency checks verify valid simulation, not population accuracy; broad life-table expansion is separate work. |
| Household and circumstances |129 cultural profiles, percentile/PPP-derived resources, family composition, fertility prior/fallback and ongoing household/estate budgets; finance/family regressions pass. | Percentile-to-income/assets/cash and fertility-to-siblings formulas are game assumptions, not validated joint demographic distributions. No comprehensive tax/benefit/era model. |
| School opportunities |6.5 candidate adds versioned attendance/completion, persistent support, delayed/withdrawn courses and funded equivalency, with shared admission gates;65 national pathway labels plus regional fallback remain. Targeted school/legacy tests pass; final gates pending. | Shared entry age6/period lengths and country-school/household probability formulas remain illustrative. Sourced national calendars, access/completion inputs and qualification recognition belong to deferred calibration; labels alone are not mechanical country coverage. |
| Employment and progression |37 ladders, related skill/experience transfer, qualification/application gates, hours/pay and family-care/study interactions; retained career and integration tests pass. | National recognition/licensing/salary distributions are approximate; do not rewrite all careers merely to improve school opportunities. |
| Country context and saves | Country/place/cultural context,129 supported profiles, exact saved snapshots and existing comparison worlds; save/export/replay and browser continuity pass. | Historical eras and authored variety remain incomplete. New facts must not overwrite established life history or silently regenerate comparison lives. |

## Current6.5 scope: school progression and qualification coherence
Implemented the shared pipeline across all129 countries: contextual access/continuation, attendance receipts, completed primary/secondary/practical qualifications, delayed/withdrawn courses, protected family funding for adult recovery, and qualification-to-admission/work boundaries. Existing saves keep their original model; ordinary chronological choices and optional inspection remain. See GAME_DESIGN.md for the explicit period/probability assumptions and TESTING.md for scope. Final source/browser/release gates remain pending; no whole-country calibration claim is made.

## Deferred priority4: national school-opportunity calibration
Replace the retained shared calendar/illustrative rates with sourced national opportunity inputs where available, covering all129 profiles with explicit fallbacks. Use a compact reliable source family where available, documented regional/income-group approximations otherwise; select fields/units/coverage before implementation. This remains a proposed coherent feature, subject to the priority order above; national labels alone do not complete its mechanics.

Acceptance: every supported profile has finite valid values and explicit source/fallback status; entry, attendance/continuation, leaving/completion and resulting qualifications agree; resource/geographic barriers affect opportunity probabilistically without guaranteed success; qualifications continue to gate existing study/job routes. Test poor/wealthy and urban/rural paths, interrupted schooling and valid later recovery, shared calculations, seed replay and old-save continuation, relevant full cohorts and actual unchanged-simple gameplay. Main scenarios must work together; no extra mandatory menus/micromanagement. Preserve existing saved circumstances/model versions rather than inventing past schooling.

Not part of that scope: a complete tax system, all professional licensing laws, household reimplementation, disease registry, every historical era, perfect population matching or unrelated interface redesign. Define/calibrate only necessary dependencies. This national calibration is a future proposal, distinct from the implemented6.5 coherence work.

## Other deferred work
Confirmed serious bugs take precedence. Contextual narrative repetition and measured slow-device/accessibility improvements remain later independent batches. Adult life-table and broader socioeconomic calibration remain separate, explicit limitations. Manual assistive-technology, actual slow phones and arbitrary archive sizes are unverified. Main-protection administration remains unavailable; existing workflow gates continue. Private archives stay untouched. No reflections.
