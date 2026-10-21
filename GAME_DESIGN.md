# Gameplay contract and reference evidence

## Current direct evidence and implementation
Explicit user requirement,21October2026: Other Lives excludes 1in8bil's reflection feature. Do not add age-milestone reflection prompts, note-entry screens, reflection pauses or a reflection toggle. Reference fidelity is subject to this deliberate exception. Noninteractive contextual memories are ordinary life storytelling, not a player reflection exercise.
Cycle6 adds the reference's30/60/90-minute birth setting (default60), independently using frozen birth-country life expectancy for approximate pacing. It changes no outcomes and preserves the original rate for saved lives lacking the new metadata. Story delivery does not spend extra calendar-time budget. Direct v0.7.90 setup/birth inspection confirms the life-expectancy target description; exact internal timing remains unknown. ENGINEERING_CYCLE_6.md records scoped tests; this does not supersede older reliability evidence for unchanged systems.
The comparison below was originally written against baseline 4072fd4 and limited research; its hands-on unknowns are superseded by FIDELITY_MATRIX.md and REFERENCE_PLAYTEST_2026-10-21.md. Direct official play now covers an infant ending/rebirth and a whole life through school/university/work/family/care/retirement at60/old age/death at91. Numerical probabilities and all variants remain unknown.
Current tested implementation is ba00e5b: full chronological text/choice loop retained; reference duration added only to birth setup. Next pauses at new close-family loss, matching observed parent loss. Existing school-entry/home-learning/funding/tabs/static-art preferences remain deliberate requirements. RELEASE_STATUS.md records scoped verification and remaining omissions/calibration goals.

## Historical baseline evidence

Research checked 21 October 2026. Official reference: https://1in8b.life/en/ and https://1in8b.life/en/about/ (v0.7.89 beta). Similar-name sites are excluded: the official About page identifies 1in8b.life as its only official address.

## Evidence levels
- **Current source/UI text verified:** pages retrieved in this cycle; later limited Chromium reference observation is recorded in FIDELITY_MATRIX.md.
- **Historical report:** REFERENCE_GAME_AUDIT.md records a previous assistant's UI/play observations and developer update notes. Those observations were not repeated in this cycle.
- **Implementation observed:** source at baseline 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f.
- **Goal:** intended behaviour, requiring implementation or further verification.

The official pages document birth/population-weighted random origins, three life-duration settings, pause/speed controls, next-decision navigation, annual focus, event decisions, Auto, family/spending inspection, four visible factors, local histories and an ending record. Four parallel lives and reflection pauses are also documented. Mortality is described as age-dependent rather than a guaranteed lifespan. These are documented behaviours, not independently measured probabilities. (Evidence: official game and About, accessed 2026-10-21.)

## Faithful design principles
Use the user's requirements as the product contract: a life unfolds chronologically through circumstances, events and occasional consequential choices. Simple interaction; deeper state and consequences beneath it. Preserve chance and external constraints. Optional inspection must not become compulsory micromanagement. Static original pixel art supports the prose; no movement, exploration or animation-heavy play.
Existing user-requested tabs, combined time/speed control, pause during inspection, setting decisions aside, archive/export, named courses/people and family finances remain intentional requirements. Do not remove them simply because the reference uses different presentation.

## Comparison at the recovered baseline
| Area | Reference evidence | Other Lives source | Decision |
|---|---|---|---|
| Beginning | Random circumstances; birth record then begin | Birth roulette/registration, weighted country; optional country/class overrides | Keep default random. Overrides are an intentional sandbox difference; do not expand setup |
| Passage of time | Automatic year progression; pause, up to 16× and next decision | Month-based engine behind continuous clock; pause/speed/next decision | Preserve loop. Verify actual pacing in browser |
| Events/choice | Life record and contextual decisions | Journal, agenda, pending choice, auto choice | Match in structure; stale eligibility and excess decisions need tests |
| Focus | Annual focus; chance still matters | Focus plus persistent routines/policies | Keep optional. Review overlapping policies before adding more |
| People | Family/life inspection and bonds | Family screen, partner stages, relatives, care and estate rules | Preserve people/history; audit timeline coherence |
| Finances | Optional spending/investment inspection | Spending screen with 42 staged routes and several budget/policy sections | Depth is permitted; density and overlap need focused playtesting |
| Life stages | School/work/love/health progression | Degree/funding, careers, relationship, retirement and care systems | Many contracts exist; completeness across combinations is unverified |
| Conclusion | Death record, local past lives | Cause, journal, archive and snapshots/replay | Preserve; terminal effects must occur once |
| Demography | 172 locations and era settings documented | 129 locations, fixed/proxy inputs and fitted adult mortality | Known fidelity/realism gap; do not claim numerical equivalence |
| Parallel lives | Four passive companion lives observed | No equivalent implemented | Remaining fidelity work |
| Reflection prompts | Optional five-age reflection questions/notes observed | Excluded by explicit user instruction | Intentional difference; never a backlog item |
| Visual presentation | Clean text interface with optional inspection | Modern coloured UI, tabs and static household illustration | Preserve restrained assets; browser comparison still required |

## Implemented versus goals
The repository contains 853 event registrations and 42 routes at baseline. Counts are inventories, not proof of usable paths. See IMPLEMENTATION_COVERAGE.md for earlier claims and ENGINEERING_AUDIT.md for current confidence/risks.
Coherent school, work, family, finance and health transitions, minimal decision burden and persistent consequences are acceptance goals. No guarantee of complete national law, taxes, clinical modelling or historically accurate country rules is made.

The measurable per-dimension comparison and current direct-browser evidence are maintained in FIDELITY_MATRIX.md. A successful limited reference observation does not verify its full lifecycle, event probabilities or undocumented mechanics.

## Cycle8 implemented candidate: passive comparisons and factual endings
New UI births generate four fictional, independently seeded lives through the same production engine. The player sees only their stages at the same calendar age, including death only after its recorded date. These are passive text rows, not extra characters to manage. No additional choices, tabs or settings are required. Existing saves retain their established histories without retrospective invented peers.
The ending now lists recorded education, work and work experience, children and survivors, known partners, practiced interests and final net worth when known. A positive moment is quoted from the player's own journal. It does not claim to identify the happiest year or infer marriage durations, grandchildren or missing legacy balances. This addresses the verified reference's broad comparison/retrospective pattern through independent code and writing. Full subjective parity and future companion outcomes beyond the player's date remain unknown. Reflections remain explicitly excluded.

Cycle9 restores access to existing Dance/Acting/Gaming/Chess interests. Childhood discovery still offers four choices, varied deterministically by birth and age; the existing optional introductory activities also offer these interests. Practice and uncertain selection still determine rare careers. No additional decision frequency or new management system. Accessibility contrast/focus work preserves layout; a life decision permits inspection, while genuine modals contain focus.

Cycle10 candidate: first-year death may occur at age0 during ordinary progression. No additional prompt or control. New births use conditional monthly checks; existing saves keep their recorded mortality-timing version. Uniform within-year infant hazard is a transparent model approximation, not a measured neonatal curve. Birth-to-first-birthday is the sourced infant indicator interval (UNICEF sources in ENGINEERING_CYCLE_10.md). Older-age mortality remains annual.
