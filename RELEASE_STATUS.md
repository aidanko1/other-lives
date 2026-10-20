# Release status — verified engineering checkpoint

Verified 2026-10-20UTC (21October Hong Kong). **6.2.0-dev.1 is unreleased. The complete overhaul remains unfinished.**
Branch: engineering/fidelity-reliability-baseline. Review: https://github.com/aidanko1/other-lives/pull/2 (draft).
Tested code: a24854966d67901fa1bc82306349623e520b23f3. All eight quality jobs passed: https://github.com/aidanko1/other-lives/actions/runs/39509582008.
The following documentation checkpoint changes no runtime, test or workflow code.

## Executed gates at a248549
| Gate | Verified result |
|---|---|
| Production build, syntax, assets and registries | Pass; static site assembled locally and in CI |
| Unit/integration/regression |49 Node-reported tests,49 passed,0 failed |
| Registry contexts |2,838 country/age/wealth contexts;15,863 eligible decision contracts;523 definitions |
| Save/replay | Eight country round trips with real snapshots; migration purity/idempotence/future-version rejection |
| Finance/read boundaries | Nine focused regressions: conserved tuition/gifts, once-per-age receipts/reload, affordability, rollback, read identity, old journals/missing cash/zero debt;129-country prepaid and institution cases |
| Optional-route/background simulations |1,000 complete asserted lives;0 failures;129 countries, four backgrounds,547 decision definitions,34/42 route types initiated |
| Original trajectory simulations | Additional 1,000 complete asserted lives;0 failures;129 countries, five quintiles, four policies, baseline/fragile/isolated conditions |
| Browser | Chromium desktop/mobile, choice/save/export/import/archive/funding/school flows; complete-state reload→inspect→export equality |
| Natural UI lifecycle | US seed951: birth, childhood/adulthood/old-age reloads,47 choices, death105, archived cause, another birth |
| Private legacy compatibility |13/13 records migrated and rendered; source/journals unchanged, idempotent,0 consistency issues; three absent cash balances explicitly unknown, no invented opening savings |
| Deployment | Not performed; production main unchanged |

Background cohort:56,668 choices; ages1–109, median59. Trajectory cohort:965 lives with paid work,973 with family change, mean ending age74.008. These policy-conditioned model outputs are not validated demographic estimates.34 initiated route types do not verify every stage or combination. CI retains assertions, summaries and browser artifacts. The private backup is not committed or counted among simulated lives.

## Restore points
Published production remains v6.1.0 at4072fd4997992cb7fd6bf78d7f0c9cab41a7379f, preserved by baseline/v6.1-before-engineering-overhaul. Historical deployment success is not a new correctness certification.
Previous verified engineering code 07f81f2: https://github.com/aidanko1/other-lives/actions/runs/39494233610; checkpoint/6.2.0-dev.1-verified. Current verified code a248549 remains a restorable ancestor of the documentation checkpoint.

## Remaining limitations and next task
Income, debt repayment, mortgage principal, investment returns, employment and structural repairs still use legacy annual/command wrapper chains. Decision-specific candidate/bill preparation caches remain. Annual cost settlement is now explicit, but the entire yearly simulation is not one transaction. Aggregate rental assets, rare combinations, national/legal/historical data, calibration, other browser engines and full accessibility review remain incomplete.
Reference observation remains limited: https://github.com/aidanko1/other-lives/actions/runs/39493052211. The full reference lifecycle, frequencies, normal-speed duration and subjective gameplay equivalence remain unverified; see FIDELITY_MATRIX.md. No new gameplay controls or features were introduced in this cycle.
Next priority: consolidate the remaining annual income/debt/mortgage/investment and employment transition owners behind conservation and continuation tests, preserving this verified checkpoint. No stable label, production merge/deployment or branch-protection claim is made.
