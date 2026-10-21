# Cycle 6 — playback pacing and duration fidelity

Base: 0f3645ff1de489a53a26626797aa565f4a71be33 (documentation descendant of tested b87e519). Development only; main remains the v6.1 restore point. No deployment.

## Acceptance criteria

Preserve every existing story, calendar date, decision, RNG transition and pause. Charge playback time only for calendar movement. Verify the real UI at 1× using controlled browser timers, alongside retained lifecycle checks. Duration selection must use the verified reference options (30/60/90 minutes, default60), remain a birth setting and preserve the rate of existing saves. The exact reference duration formula is unknown; an independent approximation must be labelled as such.

## OL-033 — story deliveries incorrectly consumed calendar time

Medium severity: event-heavy years ran more slowly than quiet years. Reproduction: GB seed2218 at birth, five real authored highlights scheduled at months1/3/5/7/9, existing45-second annual rate. After45.1seconds at1×, actual Chromium reached only month8 instead of the expected first birthday. `tickClock` deducted a monthly budget for every `advanceMonth` call, including narrative delivery at the same calendar date.

Correction: `engine/clock.js` exposes `playbackStep`, reporting the actual zero-or-one calendar-month change; `ui/app.js` deducts that amount. It does not alter the engine transition, event selection, story delivery or speed controls. Existing bounded work per timer pulse remains.

Regression: `tests/pacing.test.cjs` compares the complete state after each playback/manual call, including RNG, and checks five free story deliveries plus twelve calendar months. Paused/finished/pending records remain unchanged. `tests/browser-pacing.cjs`, called by the permanent browser suite, exercises the production UI and all five authored highlights. The browser assertion failed on the original UI (8 !=12), then passed with the correction (12months in45.1 controlled seconds). This timer test is not a claim of subjective normal-speed playtesting.

Pacing-only stage executed locally: `npm test` (67 Node tests plus retained standalone contracts), complete CI Node glob (77 reported tests), static checks/production build and actual Chromium suite, all passing. Natural UI lifecycle remains US seed951/death105/47choices with stage reloads; retained funding, storage, read-purity, housing and bereavement checks also pass. Pacing-only CI subsequently passed at b751cb3, as recorded below. No stable-production designation.

## Duration selection — acceptance and implementation

Verified reference UI offers30/60/90 minutes, default60. Direct v0.7.90 setup/birth inspection on21October also explicitly describes the target as time to country life expectancy. New-life setup now offers those same values, with an explanation that lifespan and pauses change actual duration. The independent formula divides the chosen time by the birth country's modelled life expectancy in calendar months. It matches that visible target description; the precise reference timer/rounding remains unknown. It is an approximation, not a guarantee of lifespan. Saved `playback` version1 freezes that birth reference; moving country, loading and replaying cannot rescale it. No simulation probabilities, decisions or RNG are changed.

This is additive schema2 presentation metadata. Existing saves without it retain3750ms per calendar month; malformed/future playback descriptors safely use that legacy rate without being rewritten. No migration or historical-data change is required. Birth snapshots include the setting. Default new births use60; existing controls and optional inspection remain.

Acceptance tests: all129 origins and all three values; invalid birth inputs; pure save/load and frozen origin; old/malformed save fallback; whole seeded complete-life equality across the three values excluding only the presentation metadata; actual setup/reveal/timed year/highlights/pause/reload in Chromium for each value. Local Node glob81/81, npm fast checks, production build, full actual Chromium suite and both complete1000-life cohorts pass. The first duration browser attempt correctly failed because the setup control was absent; the form and start command are now connected, with the assertion unchanged. Final source ba00e5b passes all eight CI jobs below.

Pacing-only checkpoint b751cb3598eb0d5c762e6f419b223507ab20ceaf has successful quality CI: https://github.com/aidanko1/other-lives/actions/runs/39529422834. That result must not be represented as duration-source CI.

TEST-006 (test arithmetic correction): the initial duration test required exact double-precision equality after division then multiplication, returning1799999.9999999998 instead of1800000ms. It now asserts the monthly formula exactly and the reconstructed duration within1e-6ms (one nanosecond). No gameplay timing, story-retention, full-state identity or compatibility assertion was removed or relaxed.

## Final executed evidence

Runtime/tests/workflows: **ba00e5bd8cfc50cf54c92bbecd23ee954024934f**. All eight quality jobs succeeded: https://github.com/aidanko1/other-lives/actions/runs/39530111698. Restore: `checkpoint/6.2.0-dev.1-pacing-verified`. Earlier pacing-only correction is separately restorable at b751cb3. Main4072fd4 is unchanged, protection is still false, and deployment was not performed.

Commands actually executed locally: `npm test`; `node --test --test-concurrency=2 tests/*.test.cjs` (81/81); `npm run build`; `node tests/static-check.cjs`; `node tests/browser-smoke.cjs` with the same-process local server; `node tests/simulation.cjs --count=1000`; `npm run test:simulation`; `git diff --check`. Actual mobile setup labels/default/action/no-overflow check and screenshot inspection also passed. CI repeats build/regression, Chromium, four background shards/aggregate balance and the additional1000-life trajectory cohort.

Background cohort:1000 complete asserted lives,129 countries/four backgrounds,56,747 choices,547 definitions,34/42 route types; ages1–109,median59. Trajectory cohort: another1000,129 countries/five quintiles/four policies,44,699 choices,mean age74.034,965 paid-work lives/973 family-change lives. No assertion failures or unfinished lives. Local and CI repeat the same seeds; do not double-count them as4000 unique scenarios.

## Decision burden and menu review

Of the background cohort,666 lives do not use the harness's annual voluntary-intention policy: mean37.37 decisions,median39,p90=54,max68.334 stress-policy lives automatically start available voluntary plans each adult birthday: mean95.39,median99,p90=150,max178. These differently assigned seeds/backgrounds are descriptive groups, not a causal or demographic comparison.

Replayed the three highest-count cases twice, with per-action invariants and asserted complete endings. Stress replays exactly reproduce cohort ages/counts:

Reproduction policy is the existing `tests/simulation.cjs` algorithm: enabled choice index `(seed + decisionCount) % enabledCount`; optional annual plan index `(seed + age) % availableCount`, once per adult birthday. Use the table's birth country/seed/background. The comparison changes only whether those annual optional starts run; normal choices may still initiate their own route. Snapshots are omitted only for these batches, and invariants run after every action. This explains the one route follow-up in two no-annual-start traces.

| Country / seed / background | Annual voluntary starts | Route follow-ups | Total choices / ending age | Same birth without annual voluntary starts |
|---|---:|---:|---|---|
| ES /238067 /hardship |77|114|178 /95|40 /69; at most3 choices in a year |
| GE /135359 /top1 |77|109|169 /95|43 /62; at most2 choices in a year |
| SV /133457 /top1 |80|105|165 /98|35 /73; at most2 choices in a year |

The stress traces have at most5 choices/year. Actual choices change RNG use, life paths and survival; counterfactuals cannot be interpreted as effects on lifespan. Most repeated stress ID is the shared route-follow-up card, not the same authored moment. ES's non-stress trace repeats housing hardship five times over a69-year life; contextual generic repetition is still a writing/playtesting limitation, not erased by the one-use authored-moment invariant.

Existing six focus settings and seven persistent routines (max two active), policy controls and grouped route menus are voluntary; no yearly re-entry is required. Retain these established options instead of cutting the global decision rate based on the stress maximum. Scoped conclusion: playback bug fixed and optional-plan contribution measured; full enjoyment/long-session review remains unverified.

## Remaining scope

No new confirmed critical/high defect. Verified optional reflections at5/15/30/50/70 and four parallel lives remain absent, as do richer ending details,43 additional locations and eras. New reference inspection at v0.7.90 confirms private note/skip/disable controls at5 and companion stages at the same age. No proprietary source, assets or prose were copied. Other Lives duration uses existing combined-country expectancy; the reference displays sex-specific expectancy. Exact timer internals, complete national calibration, other browser engines/accessibility and large archives remain unverified. Next: a separate tested implementation of the verified optional reflection/parallel-life experience; no automatic production promotion.
