# Architecture and ownership

## Boot and dependencies

Buildless HTML/CSS/classic JavaScript; Node >=22 for development checks. No production package dependencies. Chromium CI installs pinned Playwright 1.56.1 for tests; browser tooling is excluded from production packaging. `index.html` is the explicit ordered script manifest. Every engine/data extension loads synchronously before **one** `ui/app.js` startup. `scripts/check.cjs` verifies dependency existence, syntax, registry identities and boot order. `scripts/build.cjs` packages an explicit production allowlist into `_site`; tests/docs/private fixtures do not ship.

The extraction preserved the original authored content. The old extension graph still exists and must be consolidated incrementally, not replaced wholesale with a smaller game.

| Ownership | Files and responsibility |
| --- | --- |
| Base configuration/data | `engine/config.js`, `world-countries.js`: definitions, country/name pools and starting circumstances |
| Core state and clock | `engine/core.js`, `engine/clock.js`: seeded RNG, creation, contacts, annual core, journal, snapshots, monthly event delivery and choice recording |
| Retained content | `engine/events.js`, `engine/stories.js`, `engine/extra-events.js`, `engine/persistent-events.js`, `culture-economy.js`: original cards/stories and contextual generators |
| Evidence | `engine/context.js`, `engine/demographics.js`, `world-simulation.js`, `life-evidence.js`: mortality assumptions, frozen data and sourced explanatory context |
| Legacy adaptations | `engine/legacy-coherence.js`, `age-culture-audit.js`, `life-depth.js`, `life-clarity.js`, `life-experience.js`: old save adapters, ages, education tracks, money/UI helpers |
| Current education/work | `life-dynamics.js`, `life-university.js`, `life-flow.js`, `life-careers.js`: subjects, hours, fees, progress, qualified offers and experience ladders |
| Family/narrative | `life-moments.js`, `life-relationships.js`, `life-memory-voice.js`, `life-continuity.js`, `life-career-moments.js`: subjects, interpersonal development, estates and wording |
| Factors and routes | `life-balance.js`, `life-routes.js`, `life-route-{education,enterprise,family,world,special,health-money,assets}.js`, `life-integrity.js`: factor effects and persistent route stage contracts |
| Art | `pixel-household.js`, `engine/pixel-legacy.js`: original canvas tile/sprite drawing and legacy fallback |
| Shared contracts | `engine/rules.js`: eligibility, enrolment predicate, deterministic shuffle, family funding quote/commit and pure annual quote; `engine/state.js`: schema migrations and consistency/transition diagnostics; `engine/commands.js`: atomic command boundary |
| Annual execution | `engine/annual.js`: 12 explicit ordered stages around core, once-per-age receipt, complete annual/birthday rollback |
| Employment | `engine/employment.js`: role/pay/hours, restoration, FTE experience and pension exclusion |
| Finance/property | `engine/finance.js`: pure costs, conserved budget/gifts, scheduled/unsecured/secured repayment. `engine/property.js`: dwelling identity/use/value/sale/loans |
| Decisions | `engine/decisions.js`: pure serialized choice view; command boundary validates displayed tokens inside rollback |
| Browser | `ui/app.js`: rendering, navigation, playback, current-save storage, IndexedDB archive, JSON import/export and replay UI |

## State and transitions

One serializable life record contains seeded RNG, clock, country/birth/current place, household resources, four factors/latent states, people, education/study, employment/experience, routes, money/debt history, journal, pending decision, agenda and snapshots. No function or DOM node belongs in a save.

Playback (cycle6) is separate from simulated time. `clock.js` owns pure birth pacing metadata and monthly wall-time calculation; `core.js` includes it before the first snapshot. The UI uses `playbackStep` and charges only actual calendar movement, so delivery at the same date is free. New lives target30/60/90 minutes (default60) divided by frozen birth-country life expectancy; actual lifespan/pauses/speed affect duration. This is independent code consistent with the reference's visible target description; its precise internal timer remains unknown. Schema2 is unchanged: old/malformed descriptors use3750ms/month without migration or history rewriting. Duration must never change RNG or simulated outcomes.

- `create(settings)` establishes a birth. Integer seeds, including zero, are normalised to uint32; unspecified seeds are random. Identity timestamps/random IDs are separated from simulation RNG in the VM test loader.
- `advanceMonth(state)` delivers a queued highlight or increments the month. At a birthday completeBirthday atomically advances age, executes annual stages and mortality, snapshots and creates the next agenda. Failure restores clock, RNG, people, finances and history. annualReceipt prevents duplicate annual effects after repeat/reload. Route/funding/graduate follow-ups may interrupt before ordinary highlights.
- `rules.eventBlock` / `eventEligible` is the shared prerequisite check. The monthly delivery and choice application use it. Legacy per-event `when` functions still own specific prerequisites.
- `applyChoice` records `used`, `choiceHistory` and `journal.eventId` only after a successful choice. Staged events have explicit repeat exceptions; ordinary events default to seven years and milestones occur once.
- `commands.js` snapshots the state at `applyChoice`, `startRoute` and `planAction`. Rejections restore the previous record. Exceptions or newly introduced consistency issues roll back and surface an error. Nested commands participate in the outer transaction. Existing legacy issues are not silently erased. This boundary preserves successful object references; rollback replaces state fields.
- Funding quotes are pure. `payStudyFunding` re-quotes before committing. `commitFamilyGift` conserves family money. `supportStudyLiving` records annual support once. `engine/finance.js` owns annual cost quotes and settlement: pure `quoteAnnualCosts`, explicit `settleAnnualCosts`, conserved gift/tuition commits, rollback and a serializable once-per-age receipt. The core calls settlement directly. `livingCost` is only a compatibility alias for settlement. Estate and inheritance-trust release occur in `settleFamilyEstate` at the existing annual family phase.

## Persistence

`schemaVersion: 2` is current. migrateLife clones input and refuses future versions; current-schema loading is an exact clone. Schema1→2 adds explicitly unknown legacy aggregate property holdings without inventing dwelling counts, dates, country or lost loans. Negative legacy family assets become equivalent household debt with an explicit repair record, conserving net wealth. Unversioned records separate preschool access/attendance and invoke retained structural adapters once, preserving their journal. Missing early family-cash balances become an explicitly unknown zero opening balance; no money is inferred from income. Historical prose is not used to invent exact event IDs or unknowable expenses. Current load, imports, archived resume and replay use this boundary. Original exported inputs remain unchanged.

Current life: localStorage `other-lives-current-v1`. Archive: IndexedDB `other-lives-library` / `lives`, with a localStorage fallback. `other-lives-life-v1` and `other-lives-backup-v1` envelopes remain supported. Exact-ID export never substitutes another record. Deletion must report storage success; deleting the current record clears its pointer to prevent resurrection.

## Remaining architectural debt

Annual wrapper composition has been replaced by registered preparation/finalization stages, retaining their established order. Cost/budget/property/mortgage settlement and employment now have explicit owners and conservation tests. The UI decision view is pure and token-bound.
Legacy structural ensureClarity command/clock adapters and query/choice wrappers remain; simplify incrementally when a concrete contract or defect touches them. They no longer own annual transactions or execute from ordinary profile/family/spending/art reads. Pure property projections support old aggregate fixtures; a legacy aggregate is not evidence of one actual dwelling.
Invariants detect defined contradictions, not all causal narrative relationships. National legal/tax/clinical precision and very large archive performance remain unverified.

## Latest integration checkpoint
The engineering/fidelity-reliability-baseline branch incorporates b31a7af as a second parent and retains its extracted engine, existing tests and migration work. Additional ownership/ending fixes stay in life-route-assets.js. Currency formatters are cached in life-clarity.js. Refer to ENGINEERING_AUDIT.md and BUGS.md for this cycle's independently observed failures.

Cycles2–5 implementation/acceptance are recorded in the corresponding ENGINEERING_CYCLE documents. RELEASE_STATUS.md is authoritative for current source/results; older checkpoint prose is historical.

## Cycle8 comparison-world and ending ownership
engine/parallel.js owns generation, compact timeline projections, same-date views and replay restoration. New UI creation opts into comparisons; ordinary engine creation and legacy loading do not invent worlds. Each of four independent seeds runs the full command/annual/decision pipeline until a validated terminal state. Every action checks state and transition invariants. A3000-action bound throws on failure; it never supplies a placeholder life. Birth generation is synchronous and its performance is measured in ENGINEERING_CYCLE_8.md.
The schema2 additive parallelWorld record is immutable after creation. Snapshots omit its full timeline and retain parallelWorldRef; replayState checks snapshot membership/world identity and clones the saved world. Pure same-date projections do not expose future deaths. Current-schema load remains an exact clone. Unknown/malformed comparison metadata is not rewritten on read.
engine/retrospective.js owns pure facts from existing history. UI renders escaped strings and never reconstructs absent family/work history. Dead people's ages stay frozen; the living partner age-gap check excludes deceased historical partners while retaining underage marriage/adult-start safeguards. Mandatory model bounds120(player)/160(people) now terminate the corresponding living state rather than permit invalid ages.

Cycle9: life-experience.js owns interest acquisition through discovery and optional planAction transactions. Discovery ranks a10-interest pool by a stable seed/age/name hash and offers four absent interests; views consume no RNG. This makes existing rare-career prerequisites accessible without injecting skills. ui/app.js restores focus across renders; actual modal dialogs constrain focus and inert background siblings, while life decisions retain nonmodal inspection. Colours remain in their existing index/theme owners.100-record IndexedDB archive tests exercise asynchronous render/export/history rather than requiring an engine rewrite.
