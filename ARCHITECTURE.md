# Simulation architecture

## Runtime and state
New births initialize schoolRecord version1 in core before the first snapshot or comparison generation. engine/schooling.js owns its immutable birth assumptions, attendance receipts, earned school qualifications, local-course progression and recovery. Its annual prepare phase captures attendance before legacy end-of-school adapters run; the finalizer records each period once inside the existing rollback boundary. Earlier academic/local-course adapters delegate only for these versioned lives. Saved lives without schoolRecord retain the old owner path; migration remains observational.

hasSecondaryQualification is the shared domestic/flexible/overseas admission predicate. Family-funded recovery uses the existing quote/commit owner, protecting reserves and conserving all fees. Local course withdrawal is an atomic command, keeping previous credits/qualifications and the current Spend tab. A saved exitDue flag distinguishes a delayed initial school-leaving decision from an unrelated mature worker; local-course completion can trigger the existing decision after age19 without restarting school-leaving choices throughout adulthood.

Other Lives is a buildless, browser-local JavaScript application. index.html orders the classic scripts against window.OL; ui/app.js boots last. scripts/check.cjs verifies syntax, dependencies, registries and assets. No application server or runtime npm dependency is required. scripts/build.cjs packages an explicit static allowlist into _site, excluding tests/docs/private fixtures. The service worker is online-only and clears old caches; offline caching is not promised.

One plain JSON life state retains age/month, origin/current country, household percentile/resources, people/identities, factors/health, education/work/hours/experience, assets/liabilities, persistent routes/decisions, agenda/journal, RNG and turning-point snapshots. Established history is authoritative. Some creation/structural helpers remain legacy wrappers; new rule ownership is explicit and incremental rather than a wholesale rewrite.

| System | Owner and integration |
|---|---|
| Birth/geography/background | engine/core.js and country/culture/world registries; demographic weighted draw, household/parents/siblings, optional existing overrides |
| Calendar/agenda/playback | engine/clock.js; stories consume no extra calendar months; real decisions stop time; Next also stops on new close-family death |
| Annual transaction | engine/annual.js; named preparation/finalization stages preserve original order, one atomic birthday/annual transaction and saved receipts |
| Money/tuition/household | engine/finance.js; pure cost quotes versus explicit conserved commits; family gifts/reserves, income/expenses/interest, instalment schedules and estate/trust transitions |
| Work/career | engine/employment.js plus life-careers/flow/education callers; one role/pay/hours/mode owner, real FTE experience, qualification/assessment gates, care/course/service changes and retirement |
| Property | engine/property.js; distinct dwellings/loans, residence/letting, value/rental income, fees/sales/revaluation; repay through finance so debt schedules agree |
| Education/opportunity | life-university/dynamics/flow/depth and route-education; access versus attendance, subject/funding/progress/qualification and work constraints |
| People/family | life-relationships/continuity and route-family; persistent IDs/roles, living/dead history, partner/child/care circumstances and bound conception/route participants |
| Health/mortality | factors/routines/events plus engine/demographics.js; explicit partial national inputs/proxies, personal modifiers, annual older-age risk and versioned first-year timing |
| Eligibility/state/commands | engine/rules.js,state.js,decisions.js,commands.js; shared prerequisites, invariant diagnostics, pure displayed choices and token-bound execution with rollback |
| Storytelling | life-moments/experience/memory-voice and contextual banks; eligibility/subjects/cooldowns at selection and execution, recorded effects and money; no repeated authored moment within asserted lifetime policies |
| Parallel lives | engine/parallel.js; four full production-engine lives on separate hashed seeds, compact immutable same-date projections, no player choices or RNG change |
| Ending | core terminal transition and engine/retrospective.js pure selectors; recorded education/work/family/interests/wealth, actual positive personal story and formatted stored prose |

## Transition boundaries
advanceMonth first handles due narrative/choices at the current date. An unresolved choice blocks advancement. Advancing a month is distinct from delivering an entry. Birthdays call completeBirthday/runAnnual, which prepare registered stages in the order needed to preserve existing semantics, run the core annual work and finalize stages. Exceptions restore the complete birthday, including money, people, agenda, RNG and receipts. OL.passive is the retained public name for runAnnual; modules must not replace it.

Cost/display queries use quoteAnnualCosts against a clone. Only settleAnnualCosts commits its receipt. Similar read/load boundaries must not process gifts, estates, debt, promotions or world events. Employment and property callers use their owners. Low-level legacy helpers are not all public transactions; command extraction remains incremental.

Decision views return stable options/context/token without state changes. Execution validates the displayed token, eligibility and current bound participants, then commits consequences or rolls back. Changed study/service/relationship circumstances cancel incompatible routes without losing costs, identities, earned qualifications or history. Chance remains part of outcomes; the world evolves without a player choice.

## Saves, snapshots and model versions
Current keys remain other-lives-current-v1, IndexedDB other-lives-library/lives, and the localStorage archive fallback. JSON backup/single-life formats remain supported. Schema0/1 migrations conservatively reach schema2; schema2 load is an exact clone, not a simulation transition. Unknown historical money/dates remain identified rather than fabricated. Explicit negative-asset liability repair conserves net wealth.

New births write mortalityTiming version1 before the first snapshot. Twelve conditional first-year monthly checks use the annual infant probability; constant modifiers preserve its survival product. Pending choices/story deliveries do not add risk. A survivor is not charged again at birthday1. Fatal/birthday exceptions restore state/RNG/receipt. Older saves without metadata retain their original annual continuation. Uniform infant timing is an assumption, not an empirical neonatal curve; older-age timing remains annual.120/160 are model validity bounds, not claimed biological maxima.

New UI births also create a versioned parallelWorld. Each of four independently seeded peers must finish within3000 actions, with state/transition assertions at every action. Generation is synchronous (around1.9s for a measured desktop birth; slow-device latency unverified). The current-date selector never exposes future stages/deaths. Existing saves do not acquire invented past companions.

Snapshots omit duplicate world timelines and save parallelWorldRef. replayState validates that a turning point belongs to its source and restores that exact immutable world; it never reruns the saved peers. Old saves/replay preserve their original mortality version and history. A terminal life cannot advance or receive repeated ending effects. UI can archive it and begin a new identity.

## Presentation and known limits
The UI remains text-led with four factors, simple controls, optional inspection and static pixel scenes. True modals contain focus/inert background/return to opener; visible life decisions use that focus boundary; Set aside restores inspection without resolving or advancing the choice. Reflections/questions/notes/special pauses/toggle are explicitly excluded by the user. Stored text uses the existing currency/name formatter; rendering must not mutate a save.

129 authored country profiles are enabled from a larger raw catalogue. National economics, schooling, family opportunities, licensing and adult age/sex mortality remain simplified; historical eras and complete national calibration are unfinished. Source indicators are not personal predictions. Automated balance/coverage and qualitative generated-history review do not establish user enjoyment or exact reference frequency. Current verification is in RELEASE_STATUS.md; historical decisions/failures are in ENGINEERING_CYCLE_*.md and BUGS.md.

## 6.3 presentation boundaries
ui/app.js renders one living factor group inside the existing combined sticky controls, with labelled accessible meters; finished lives retain their final values. Narrative rendering omits effect badges without deleting journal effects/money or changing simulation calculations. Optional spending previews still use effectsHTML. Routine toggles use updateRoutineControls to update summary/selection/aria-pressed on existing nodes, preserving disclosure state and focus; the clicked row anchors the viewport when summary text wraps. The annual engine still applies routine effects at its existing phase.
Promotion declares cooldown3 in life-careers.js; primary and secondary selectors in events/clock honour event.cooldown with the prior default7. rules.js remains execution eligibility owner. No schema migration or historical rewriting is needed. Existing review dates/usage are retained; future eligible review opportunities intentionally change under the corrected rule.
