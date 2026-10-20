# Requirements → implementation → tests

Updated 2026-10-21. Status **I/U** means implemented but unverified at this integration revision. **PARTIAL** means known coverage/implementation gaps. Only an exact-revision evidence entry in RELEASE_STATUS.md permits VERIFIED. No entire game/system is declared complete from one passing fixture.

| ID | Requirement / acceptance | Implementation | Tests / evidence | Status and limits |
|---|---|---|---|---|
| F01 | Random birth → chronological text life → meaningful choices → ending | engine/core.js, clock.js, ui/app.js | playthrough, simulation, browser-smoke | I/U; interactive reference comparison unknown |
| F02 | Pause/speed/next-decision; inspect without advancing | ui/app.js | browser-smoke; GAME_DESIGN comparison | I/U; pacing not quantitatively matched |
| F03 | Clean UI and static illustration; no movement/exploration | index.html, life-*.css, pixel-household.js | browser screenshots, life-clarity | I/U; full visual/accessibility review pending |
| F04 | Reference feature comparison and explicit unknowns | GAME_DESIGN.md, REFERENCE_GAME_AUDIT.md | source links and evidence labels | Documented; detailed hands-on measurements unknown |
| S01 | Age-appropriate enrolment and events | engine/rules.js, core.js, events.js, age-culture-audit.js | contracts, registry-sweep, simulation assertions | I/U; national school ages simplified |
| S02 | Context checked at execution; failed choice unchanged | engine/commands.js, rules.js | contracts stale/rollback/replay tests | I/U; lower-level mutators not all transactional |
| S03 | Choices persist and cooldowns work | engine/core.js, clock.js | contracts cooldown/replay, simulation | I/U |
| S04 | Consistent identity, ages, death, partnership | engine/state.js, life-relationships.js, life-continuity.js | contracts transition/candidate tests; invariants every action | PARTIAL; full parent/child chronology not yet encoded |
| S05 | Education, workload, qualification and careers connect | life-university.js, flow.js, careers.js, route-education.js | university, career-continuity, flow-balance-routes | PARTIAL; professional laws and all cross-route combinations incomplete |
| S06 | Finite conserved finance; assets distinct from liabilities | life-clarity.js, dynamics.js, route-assets.js | financial-property contracts, mortgage regression, invariants | PARTIAL; aggregate rental assets and annual ledger debt remain |
| S07 | Ending is terminal and occurs once | engine/core.js, life-route-assets.js | reliability ending regression, browser ending | I/U |
| S08 | Same seed/state/choices → same continuation | engine/core.js, rules.js, state.js | reliability zero/shuffle; save-replay eight countries | I/U; metadata isolated by deterministic test loader |
| S09 | Save load preserves established history | engine/state.js, ui/app.js | contracts migration/future version, save-replay, browser export/import | PARTIAL; private 13-life export not rechecked this cycle |
| T01 | Unit/integration/regression checks permanent | tests/*.test.cjs, registry-sweep | quality regression job | I/U |
| T02 | 1,000 complete lives with assertions and retained failures | tests/simulation.cjs, invariants.cjs, simulation-summary.cjs | four disjoint shards; summary gate | I/U; forced national/background coverage, not real-world population estimate |
| T03 | Distribution/repetition/route coverage reviewed | both simulation harnesses; summary JSON | age bands, decisions, country/backgrounds, repeated template assertion | PARTIAL; balance calibration and qualitative variety remain |
| T04 | Browser lifecycle including next life and storage | browser-smoke.cjs and retained browser.cjs.js | Chromium desktop/mobile, export/import, ending and archive | PARTIAL; full naturally timed life and other browser engines pending |
| E01 | Reversible baseline and isolated development | baseline/v6.1-before-engineering-overhaul, engineering branch | recorded commit ancestry | Implemented; main untouched |
| E02 | Build + CI before deployment, no experimental deployment | workflows/quality.yml, pages.yml, scripts/build.cjs | regression/build/browser/simulation/balance jobs | I/U; hosting branch protection not verified |
| E03 | Exact bug reproductions and continuity docs | BUGS.md, RELEASE_STATUS.md, CHANGELOG.md, BACKLOG.md | repository review | In progress; update after executed checks |
| UX01 | Events respond to personal history, not generic repetition | moments, memory-voice, routes, subject checks | moment/route tests, no-repeat assertion | PARTIAL; novelty/engagement cannot be established from exit code |
| UX02 | Simulation depth does not add mandatory micromanagement | existing focus/route/policy UI | fidelity playtest checklist in GAME_DESIGN.md | Unknown; density review needed before new UI |
