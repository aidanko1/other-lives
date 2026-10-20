# Release status — verified engineering checkpoint

Updated 2026-10-21. **6.2.0-dev.1 is unreleased. The complete overhaul is unfinished.**
Engineering branch: engineering/fidelity-reliability-baseline. Review: https://github.com/aidanko1/other-lives/pull/2 (draft).
Tested code: 07f81f2516c7209e3932bc4a3952832339cf6bc4.
All eight quality jobs passed: https://github.com/aidanko1/other-lives/actions/runs/39494233610. This documentation checkpoint changes no runtime or test code.

## Last published restore point
Production remains v6.1.0, 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f.
Restore branch: baseline/v6.1-before-engineering-overhaul.
Historical deployment: https://github.com/aidanko1/other-lives/actions/runs/39457407780.
Known baseline defects mean historical deployment success is not a new certification of correctness. No production merge or deployment occurred in this cycle.

## Executed checks
| Gate | Verified result at 07f81f2 |
|---|---|
| Syntax, registries, assets and production packaging | Pass; actual static site assembled |
| Unit/integration/regression | All 40 Node-reported tests pass; no assertions removed to conceal failures |
| Registry contexts | 2,838 country/age/wealth contexts; 15,863 eligible decision render contracts; 523 definitions |
| Save/replay | Eight country round trips with real snapshots; migration purity/idempotence/future-version rejection; stage-specific browser reload |
| Optional-route/background simulation | 1,000 complete lives, zero failures; 129 countries, four backgrounds; 547 decision definitions reached; 34/42 route types initiated |
| Original trajectory simulation | Additional 1,000 complete lives, zero failures; 129 countries, five quintiles, four policies; baseline/fragile/isolated conditions |
| Browser lifecycle and persistence | Chromium desktop/mobile; birth/choices, tab pause, export/import, archive delete/restore/resume, family-assisted postgraduate funding, school-entry/home learning |
| Natural UI lifecycle | US seed 951: birth through childhood, adulthood and old age; 47 choices; death at 105; stage reloads, archive cause and another birth |
| Deployment | Not performed; main unchanged |

The background harness produced ages 1–109 (median 59), 56,548 choices and 34 initiated route types. The other harness had 965 lives with paid work, 973 with family change and mean ending age 74.008. These are policy-conditioned model outputs, not validated demographic estimates. Coverage counts do not establish all route stages or combinations.
CI artifacts preserve detailed outcomes, failing reproduction format, balance/coverage summaries and browser evidence.

## Reference and remaining limitations
Read-only reference browser research: https://github.com/aidanko1/other-lives/actions/runs/39493052211.
Observed random birth, registration, begin-life, pause/speed and invocation of next-decision. The complete reference lifecycle, event frequencies and subjective equivalence remain unverified. See FIDELITY_MATRIX.md.

Legacy closure/wrapper chains, render-time adapters and financial settlement side effects remain. Invariants cover defined contracts, not every causal implication. Rare combinations, complete national/historical/legal data and qualitative narrative/pacing review are incomplete. The private 13-life backup was not re-audited. Other browser engines and a full accessibility review remain unverified.

## Next highest-priority task
Separate versioned migration and read-only display from annual financial settlement, with one explicit transaction owner, conservation assertions and legacy-save regressions. Preserve the existing gameplay and all working routes.
A passing engineering checkpoint is not a stable release. Stable promotion also requires resolving remaining high-severity behaviour issues and completing fidelity/player review. Branch protection/hosting enforcement has not been verified.
