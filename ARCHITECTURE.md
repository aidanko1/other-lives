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
| Browser | `ui/app.js`: rendering, navigation, playback, current-save storage, IndexedDB archive, JSON import/export and replay UI |

## State and transitions

One serializable life record contains seeded RNG, clock, country/birth/current place, household resources, four factors/latent states, people, education/study, employment/experience, routes, money/debt history, journal, pending decision, agenda and snapshots. No function or DOM node belongs in a save.

- `create(settings)` establishes a birth. Integer seeds, including zero, are normalised to uint32; unspecified seeds are random. Identity timestamps/random IDs are separated from simulation RNG in the VM test loader.
- `advanceMonth(state)` delivers a queued highlight or increments the month. At a birthday it runs annual systems and mortality, then creates the next agenda. Route/funding/graduate follow-ups may interrupt before ordinary highlights.
- `rules.eventBlock` / `eventEligible` is the shared prerequisite check. The monthly delivery and choice application use it. Legacy per-event `when` functions still own specific prerequisites.
- `applyChoice` records `used`, `choiceHistory` and `journal.eventId` only after a successful choice. Staged events have explicit repeat exceptions; ordinary events default to seven years and milestones occur once.
- `commands.js` snapshots the state at `applyChoice`, `startRoute` and `planAction`. Rejections restore the previous record. Exceptions or newly introduced consistency issues roll back and surface an error. Nested commands participate in the outer transaction. Existing legacy issues are not silently erased. This boundary preserves successful object references; rollback replaces state fields.
- Funding quotes are pure. `payStudyFunding` re-quotes before committing. `commitFamilyGift` conserves family money. `supportStudyLiving` records annual support once. `livingCost` remains a **settlement** operation; use `quoteAnnualCosts` for previews.

## Persistence

`schemaVersion: 1` is the first explicit schema. `migrateLife` clones input, refuses future versions, separates preschool access/attendance and invokes retained adapters. It is tested for idempotence. Historical prose is not used to invent exact event IDs or unknowable expenses. Current load, imports, archived resume and replay use this boundary. Original exported inputs remain unchanged.

Current life: localStorage `other-lives-current-v1`. Archive: IndexedDB `other-lives-library` / `lives`, with a localStorage fallback. `other-lives-life-v1` and `other-lives-backup-v1` envelopes remain supported. Exact-ID export never substitutes another record. Deletion must report storage success; deleting the current record clears its pointer to prevent resurrection.

## Remaining architectural debt

Legacy closures still capture older ensure/annual/query implementations. The command boundary is not yet the sole mutation path: annual routines and several lower-level helpers mutate directly. `livingCost` still combines calculation with annual settlement. Legacy `ensureClarity` can migrate/journal during reads. Some bill/candidate queries cache prepared card data. Invariant validation is observational, not proof of all causal relationships. Next extraction should create an explicit annual accounting ledger and formal education/people state machines with differential tests before deleting wrapper layers. Atomic snapshots need profiling for very large archived journals.

## Latest integration checkpoint
The engineering/fidelity-reliability-baseline branch incorporates b31a7af as a second parent and retains its extracted engine, existing tests and migration work. Additional ownership/ending fixes stay in life-route-assets.js. Currency formatters are cached in life-clarity.js. Refer to ENGINEERING_AUDIT.md and BUGS.md for this cycle's independently observed failures.
