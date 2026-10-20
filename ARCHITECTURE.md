# Architecture — observed baseline and intended boundaries

Baseline: 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f (v6.1.0).
This describes the current system; it does not claim the target architecture is implemented.

## Current execution
A static browser application, no bundler or runtime package dependency. index.html contains CSS, country/job/event/story definitions, core state functions, clock and UI, localStorage and IndexedDB archive handling. Classic scripts execute in HTML order and share window.OL.
External scripts extend or replace existing OL functions. tests/engine.cjs loads the same script order into a Node VM, excluding UI/theme/service-worker bootstraps. This exercises the production engine but cannot prove DOM/clock/storage behaviour.

| System | Main implementation files | Shared state |
|---|---|---|
| Initial/core world | index.html, world-countries.js, world-simulation.js | seed/rng, country, birth, people, factors, journal |
| Local context | culture-economy.js, age-culture-audit.js, life-evidence.js | location, household context, facts, spending |
| Narrative | life-depth.js, life-moments.js, life-memory-voice.js, life-career-moments.js | agenda, subject IDs, used templates/history |
| People | life-clarity.js, life-relationships.js, life-route-family.js, life-continuity.js | people, closeness, residence, care, estates |
| Education/work | life-dynamics.js, life-university.js, life-flow.js, life-careers.js, life-route-education.js | study/funding, qualifications, employment, experience |
| Finance | life-clarity.js, life-experience.js, life-dynamics.js, life-route-assets.js, life-route-health-money.js | cash/debt/property, housing/mortgage, ledger, budget |
| Staged intentions | life-routes.js and life-route-*.js | routes.active/history/policies, due stages, participants |
| Cross-system repairs | life-integrity.js, life-continuity.js | compatibility and invariant repairs |
| Presentation | index.html, life-*.css, pixel-household.js, render helpers in several JS files | UI-local tab/modal/clock flags; some helpers also mutate life state |
| Offline entry | sw.js, manifest.webmanifest, icons | service worker currently clears caches; no full offline cache |

## Current action path
create → layered initialisers → agenda; advanceMonth → pending follow-up or due story/decision → monthly position → birthday → layered passive yearly updates → mortality → next agenda.
applyChoice → layered rule/financial handlers → selected option mutation → journal/ledger → possible follow-up pending decision.
Routes share one life-route-decision event; readyRoute selects the next active due route. Route eligibility, invalidation and follow-up stage logic therefore all matter.
Saving serialises the life state; archive snapshots preserve earlier copies. Preserve storage keys other-lives-current-v1 and archive identity during this stage.

## Target boundaries (not yet implemented)
One explicit state schema/version and migration entry point. Pure eligibility and selectors. Named transitions for study, employment, household, ownership/debt and death. A documented ordered year pipeline with registered hooks rather than reassignment chains. State mutation belongs at actions/migration, not rendering.
An event contract supplies stable ID, eligibility, prerequisites, options, costs/outcomes and follow-up/invalidation. Rendering does not consume RNG or secretly change those contracts.
Refactor one boundary at a time after recording existing behaviours. Regression fixtures must protect intended outcomes and save continuity. Avoid claiming centralisation while the old wrappers still own behaviour.

## Invariants
Money stays finite; assets and liabilities stay distinct; secured debt stays traceable when home use changes; transfers conserve value apart from named costs/returns.
A completed course is not still full-time schooling; professional roles require the relevant route; work hours and pay agree.
People have stable identities, coherent ages and household presence. Dead people do not age/work; finalising a life is idempotent.
Seeds reproduce simulation outcomes. Metadata identifiers/timestamps are separate from simulation randomness. No sort comparator consumes RNG.
