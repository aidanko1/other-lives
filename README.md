# Other Lives v5.2 — fixed-data culturally contextual life simulator

Play at https://aidanko1.github.io/other-lives/ . On iPhone Safari, Share → Add to Home Screen. Internet access is required: offline cache support is intentionally disabled.

## Changes in v5.2

- Corrected the module loading order so **Family & Money** and **Spend & Plan** always load before the UI initializes, including for older saved lives.
- Fixed non-working spending actions. Spend now draws from household discretionary cash for children or personal cash for adults, checks affordability, logs purchases and refreshes offers on each birthday.
- Added contextual 2024 demographic notes to the *relevant life events and journal entries*, including national fertility rates alongside birth/family contexts and under-five mortality alongside early childhood health events.
- Removed the separate **Facts** tab and links that took players away from the decision they were making.
- Retained country-specific cultural settings, household expenses, family sizes and festival events for 129 curated locations. Celebration participation varies by household; an optional country-specific decision considers time, social ties and family finances. Others are currently excluded from random birth because profiles are incomplete.
- Prevented old cached World Bank API data and stale service worker caches from overriding the fixed-reference model.
- Continued preserving game progress and the user's Life Archive format.

## Important data caveats

The snapshot uses a **rounded, indicative reference around 2024**, including fertility values, not a rigorously validated year-specific statistical series for every country. Population values are descriptive, not precise odds of a particular person's fictional life. Household income, PPP spending costs, employment, cultural participation, mortality outside verified source coverage, and event frequencies are still model assumptions, and should not be presented as documented national probabilities. Festival examples are not universal across residents of a country.

## Persistence

Saves stay on your phone/browser. Export your Life Archive to JSON before reinstalling or changing hosting sites. No account sync is implemented.

## Verification completed

- 129 of 129 country starts produced a playable life; 114 simulated deaths and 15 survivors after a fixed 116-year test horizon, with 4,673 decisions and no JavaScript simulation errors. All completed deaths had fictional causes recorded (the automated test checked for the `cause` field).
- All 129 profiles exposed an annual spending catalogue and refreshed its year on age change. A second purchase of the same item in one year is rejected.
- In an iPhone-size browser test, the Spend and Family views opened and a paused decision remained unchanged after opening/closing them.
- No external network requests were made in the inline browser test.
- Live GitHub Pages and physical iPhone persistence were not tested in this environment.

**Not full scientific validation:** Festival participation choices, annual costs, family size generation and health outcomes are modelled; cultural profiles are examples, not universal practices. The fixed fertility estimates are approximate, not an audited country-by-country 2024 release. Data sources are linked for follow-up.