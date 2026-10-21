# Gameplay contract and reference evidence

## 6.5 school progression scope
New births use one connected school progression model: access is separate from attendance; attended years and assessments determine primary/secondary or practical-course completion; delayed entry, interrupted courses, family-funded equivalency and later admissions retain their consequences. Enrolling, choosing a pathway, reaching an age or reading Profile cannot grant a qualification. Practical training does not automatically substitute for secondary admission eligibility. Qualifications are never downgraded when another route is completed. Existing university, funding, work and professional gates remain.

The chronological event/choice loop is unchanged. Existing school and school-leaving decisions carry the improvements. A single possible return-to-school event and an optional withdrawal control for a current course support recovery and changing circumstances; no annual booking requirement or new permanent management screen is added. Reflections remain excluded.

These mechanics are independent simulation improvements. Verified reference play establishes school/university/work transitions and uncertain admission, not its internal completion rules or dropout rates. [UNESCO educational attainment](https://uis.unesco.org/en/glossary-term/educational-attainment) and [ISCED](https://www.uis.unesco.org/en/methods-and-tools/isced) support distinguishing completed qualifications from participation and programme type; the game's enum is not an ISCED implementation.

All129 countries use shared finite opportunity calculations from the existing illustrative school/infrastructure profiles, household resources, geography, health and support. Version1 retains the existing entry age6, six primary years and six secondary years (seven for the existing Italy leaving age19). A credited year represents an attended game school period, not a precise twelve-month transcript; national calendars, population completion rates and qualification recognition remain uncalibrated. Adult recovery uses one year with primary completed, otherwise two years with foundation and secondary assessments. No empirical probability claim is made. Existing lives without this birth metadata keep their established progression and history; no missing school years are invented.

## Current direct evidence and implementation
Explicit user requirement,21October2026: Other Lives excludes 1in8bil's reflection feature. Do not add age-milestone reflection prompts, note-entry screens, reflection pauses or a reflection toggle. Reference fidelity is subject to this deliberate exception. Noninteractive contextual memories are ordinary life storytelling, not a player reflection exercise.
Cycle6 adds the reference's30/60/90-minute birth setting (default60), independently using frozen birth-country life expectancy for approximate pacing. It changes no outcomes and preserves the original rate for saved lives lacking the new metadata. Story delivery does not spend extra calendar-time budget. Direct v0.7.90 setup/birth inspection confirms the life-expectancy target description; exact internal timing remains unknown. ENGINEERING_CYCLE_6.md records scoped tests; this does not supersede older reliability evidence for unchanged systems.
The comparison below was originally written against baseline 4072fd4 and limited research; its hands-on unknowns are superseded by FIDELITY_MATRIX.md and REFERENCE_PLAYTEST_2026-10-21.md. Direct official play now covers an infant ending/rebirth and a whole life through school/university/work/family/care/retirement at 60/old age/death at 91. Numerical probabilities and all variants remain unknown.
Historical cycle12 executable/test source is75b2154 (all 107 tests/build/all 11 jobs; RELEASE_STATUS.md): full chronological text/choice loop retained; reference duration added only to birth setup. Next pauses at new close-family loss, matching observed parent loss. Existing school-entry/home-learning/funding/tabs/static-art preferences remain deliberate requirements. RELEASE_STATUS.md records scoped verification and remaining omissions/calibration goals.

## Historical baseline evidence

Research checked 21 October 2026. Official reference: https://1in8b.life/en/ and https://1in8b.life/en/about/ (v0.7.89 beta). Similar-name sites are excluded: the official About page identifies 1in8b.life as its only official address.

## Evidence levels
- **Current source/UI text verified:** pages retrieved in this cycle; later limited Chromium reference observation is recorded in FIDELITY_MATRIX.md.
- **Historical report:** REFERENCE_GAME_AUDIT.md records a previous assistant's UI/play observations and developer update notes. Those observations were not repeated in this cycle.
- **Implementation observed:** source at baseline 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f.
- **Goal:** intended behaviour, requiring implementation or further verification.

The official pages document birth/population-weighted random origins, three life-duration settings, pause/speed controls, next-decision navigation, annual focus, event decisions, Auto, family/spending inspection, four visible factors, local histories and an ending record. Four parallel lives and reflection pauses are also documented. Mortality is described as age-dependent rather than a guaranteed lifespan. These are documented behaviours, not independently measured probabilities. (Evidence: official game and About, accessed 2026-10-21.)

## Faithful design principles
Release scope follows RELEASE_PLAN.md and the user's 21 October decision: a coherent, reliable version with no known major consistency errors is sufficient for the current release. Further narrative/career polish, targeted country inputs and device/maintenance refinements belong to separate updates. Preserve the wider design goals without treating them as one unfinished mega-release.

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

## Implemented and verified: passive comparisons and factual endings
New UI births generate four fictional, independently seeded lives through the same production engine. The player sees only their stages at the same calendar age, including death only after its recorded date. These are passive text rows, not extra characters to manage. No additional choices, tabs or settings are required. Existing saves retain their established histories without retrospective invented peers.
The ending now lists recorded education, work and work experience, children and survivors, known partners, practiced interests and final net worth when known. A positive moment is quoted from the player's own journal. It does not claim to identify the happiest year or infer marriage durations, grandchildren or missing legacy balances. This addresses the verified reference's broad comparison/retrospective pattern through independent code and writing. Full subjective parity and future companion outcomes beyond the player's date remain unknown. Reflections remain explicitly excluded.

Cycle9 restores access to existing Dance/Acting/Gaming/Chess interests. Childhood discovery still offers four choices, varied deterministically by birth and age; the existing optional introductory activities also offer these interests. Practice and uncertain selection still determine rare careers. No additional decision frequency or new management system. Accessibility contrast/focus work preserves layout; a life decision permits inspection, while genuine modals contain focus.

Implemented first-year timing: first-year death may occur at age0 during ordinary progression. No additional prompt or control. New births use conditional monthly checks; existing saves keep their recorded mortality-timing version. Uniform within-year infant hazard is a transparent model approximation, not a measured neonatal curve. Birth-to-first-birthday is the sourced infant indicator interval (UNICEF sources in ENGINEERING_CYCLE_10.md). Older-age mortality remains annual.

Verified cycle11 repairs newborn/toddler narrative prerequisites without adding developmental management, prompts or milestone tracking. Existing eligible stories remain; inappropriate future queued stories are skipped, past history is preserved. Endings show an actual positive personal story ahead of routine finance ledgers and use the existing currency display. These are consistency/presentation corrections, not new gameplay.

Current source 75b2154 passes all 11 jobs including all three browser engines: https://github.com/aidanko1/other-lives/actions/runs/39540689377.3000 release-cohort lives plus 432 targeted complete lives. Cycle8 through cycle12 reports record feature acceptance and exact-source evidence; this is a verified development baseline, not a claim of full national calibration/subjective parity or a production deployment.

## 6.3 gameplay polish — explicit user direction
Living factor bars move into the existing floating focus/playback strip. Narrative and chronological log omit numerical effect chips, while the same consequences, prose, context, finance records and optional activity previews remain. This is a requested presentation preference, not a newly verified reference feature. Completed lives retain their final factor summary. Spend routine toggles preserve open menus, focus and the visible row. No additional mandatory decision, tab or management mechanic is introduced.
Career review wording promises three years; event eligibility and both selectors now honour that declared interval. Reviews remain occasional, uncertain applications; qualifications, experience, hours and professional assessments still apply. This corrects a specific pacing contradiction, not every long junior-career outcome. Generic narrative repetition and broad promotion calibration remain future polish, rather than an expanded release blocker. Implementation/verification state: ENGINEERING_CYCLE_14.md and RELEASE_STATUS.md.

First6.3 implementation acceptance is verified at3b29944 (110 tests/all11 jobs/3432 complete asserted lives/all three browser suites). Final harness/publication status is maintained in PR3 and RELEASE_STATUS.md; scoped acceptance does not establish complete subjective parity.

## Established Spend and narrative requirements —6.4
Keep the four living factor bars in the existing sticky focus/playback strip, with no duplicate story-card bars. Life log and current narrative use prose and context without numerical factor-change chips or embedded technical factor readouts; preserve actual consequences, saved effects/history and optional spending previews.

Spend actions retain open/closed disclosures, focus, reading position and the current Spend tab through toggles, purchases and decisions. Use consistent collapsible sections with the money overview visible. Present continuing activities once as persistent on/off preferences in Spend, without a separate ongoing-routines panel or an arbitrary two-selection cap. Preserve meaningful distinctions between ongoing preferences and one-off activities. Hide unavailable actions without changing original choice indices or bypassing execution eligibility.

Opening a route must show the selected intention's decision, preserving other queued plans and preparation times. Use neutral ordinary/mixed narratives and restrained accents for clear outcomes. Introduce named people with their established relationship rather than inventing identities. Work & skills groups related career stages while preserving seniority, salaries, responsibilities and the original role history. These are established user requirements, independently implemented; they are not claims of exact reference-game behaviour.
