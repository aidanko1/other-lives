# Cycle 6 — playback pacing and duration fidelity

Base: 0f3645ff1de489a53a26626797aa565f4a71be33 (documentation descendant of tested b87e519). Development only; main remains the v6.1 restore point. No deployment.

## Acceptance criteria

Preserve every existing story, calendar date, decision, RNG transition and pause. Charge playback time only for calendar movement. Verify the real UI at 1× using controlled browser timers, alongside retained lifecycle checks. Duration selection must use the verified reference options (30/60/90 minutes, default60), remain a birth setting and preserve the rate of existing saves. The exact reference duration formula is unknown; an independent approximation must be labelled as such.

## OL-033 — story deliveries incorrectly consumed calendar time

Medium severity: event-heavy years ran more slowly than quiet years. Reproduction: GB seed2218 at birth, five real authored highlights scheduled at months1/3/5/7/9, existing45-second annual rate. After45.1seconds at1×, actual Chromium reached only month8 instead of the expected first birthday. `tickClock` deducted a monthly budget for every `advanceMonth` call, including narrative delivery at the same calendar date.

Correction: `engine/clock.js` exposes `playbackStep`, reporting the actual zero-or-one calendar-month change; `ui/app.js` deducts that amount. It does not alter the engine transition, event selection, story delivery or speed controls. Existing bounded work per timer pulse remains.

Regression: `tests/pacing.test.cjs` compares the complete state after each playback/manual call, including RNG, and checks five free story deliveries plus twelve calendar months. Paused/finished/pending records remain unchanged. `tests/browser-pacing.cjs`, called by the permanent browser suite, exercises the production UI and all five authored highlights. The browser assertion failed on the original UI (8 !=12), then passed with the correction (12months in45.1 controlled seconds). This timer test is not a claim of subjective normal-speed playtesting.

Executed locally: `npm test` (67 Node tests plus retained standalone contracts), complete CI Node glob (77 reported tests), static checks/production build and actual Chromium suite, all passing. Natural UI lifecycle remains US seed951/death105/47choices with stage reloads; retained funding, storage, read-purity, housing and bereavement checks also pass. Exact-commit CI remains pending. No new stable designation.
