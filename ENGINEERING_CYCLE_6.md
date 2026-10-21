# Cycle 6 — playback pacing and duration fidelity

Base: 0f3645ff1de489a53a26626797aa565f4a71be33 (documentation descendant of tested b87e519). Development only; main remains the v6.1 restore point. No deployment.

## Acceptance criteria

Preserve every existing story, calendar date, decision, RNG transition and pause. Charge playback time only for calendar movement. Verify the real UI at 1× using controlled browser timers, alongside retained lifecycle checks. Duration selection must use the verified reference options (30/60/90 minutes, default60), remain a birth setting and preserve the rate of existing saves. The exact reference duration formula is unknown; an independent approximation must be labelled as such.

## OL-033 — story deliveries incorrectly consumed calendar time

Medium severity: event-heavy years ran more slowly than quiet years. Reproduction: GB seed2218 at birth, five real authored highlights scheduled at months1/3/5/7/9, existing45-second annual rate. After45.1seconds at1×, actual Chromium reached only month8 instead of the expected first birthday. `tickClock` deducted a monthly budget for every `advanceMonth` call, including narrative delivery at the same calendar date.

Correction: `engine/clock.js` exposes `playbackStep`, reporting the actual zero-or-one calendar-month change; `ui/app.js` deducts that amount. It does not alter the engine transition, event selection, story delivery or speed controls. Existing bounded work per timer pulse remains.

Regression: `tests/pacing.test.cjs` compares the complete state after each playback/manual call, including RNG, and checks five free story deliveries plus twelve calendar months. Paused/finished/pending records remain unchanged. `tests/browser-pacing.cjs`, called by the permanent browser suite, exercises the production UI and all five authored highlights. The browser assertion failed on the original UI (8 !=12), then passed with the correction (12months in45.1 controlled seconds). This timer test is not a claim of subjective normal-speed playtesting.

Executed locally: `npm test` (67 Node tests plus retained standalone contracts), complete CI Node glob (77 reported tests), static checks/production build and actual Chromium suite, all passing. Natural UI lifecycle remains US seed951/death105/47choices with stage reloads; retained funding, storage, read-purity, housing and bereavement checks also pass. Exact-commit CI remains pending. No new stable designation.

## Duration selection — acceptance and implementation

Verified reference UI offers30/60/90 minutes, default60. Direct v0.7.90 setup/birth inspection on21October also explicitly describes the target as time to country life expectancy. New-life setup now offers those same values, with an explanation that lifespan and pauses change actual duration. The independent formula divides the chosen time by the birth country's modelled life expectancy in calendar months. It matches that visible target description; the precise reference timer/rounding remains unknown. It is an approximation, not a guarantee of lifespan. Saved `playback` version1 freezes that birth reference; moving country, loading and replaying cannot rescale it. No simulation probabilities, decisions or RNG are changed.

This is additive schema2 presentation metadata. Existing saves without it retain3750ms per calendar month; malformed/future playback descriptors safely use that legacy rate without being rewritten. No migration or historical-data change is required. Birth snapshots include the setting. Default new births use60; existing controls and optional inspection remain.

Acceptance tests: all129 origins and all three values; invalid birth inputs; pure save/load and frozen origin; old/malformed save fallback; whole seeded complete-life equality across the three values excluding only the presentation metadata; actual setup/reveal/timed year/highlights/pause/reload in Chromium for each value. Local Node glob81/81, npm fast checks, production build and full actual Chromium suite all pass. The first duration browser attempt correctly failed because the setup control was absent; the form and start command are now connected, with the assertion unchanged. Trajectory cohort1000/1000 complete asserted lives passes; background cohort is still running. Exact final-commit CI is pending.

Pacing-only checkpoint b751cb3598eb0d5c762e6f419b223507ab20ceaf has successful quality CI: https://github.com/aidanko1/other-lives/actions/runs/39529422834. That result must not be represented as duration-source CI.

TEST-006 (test arithmetic correction): the initial duration test required exact double-precision equality after division then multiplication, returning1799999.9999999998 instead of1800000ms. It now asserts the monthly formula exactly and the reconstructed duration within1e-6ms (one nanosecond). No gameplay timing, story-retention, full-state identity or compatibility assertion was removed or relaxed.
