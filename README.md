# Other Lives — World Expansion (v4)

An independent text-based life simulation about circumstance, relationships, choice and chance.

## Play
**https://aidanko1.github.io/other-lives/**

iPhone: open the site in **Safari** → Share → Add to Home Screen → Open as Web App. The repository and website are public; saved simulated lives are kept locally on your device unless you export them.

## What's new
- **201 selectable countries and locations**, up from 57, including 193 UN member countries, both observer states, and selected additional locations/territories. All existing 57 configurations remain playable.
- **144 additional country/location baselines** with regional education, health, economy and urban/rural *gameplay estimates*.
- **Country-specific story context** in the life record: capital/reference centres, terrain/travel challenges, household resources, training opportunities and remembered relationships. There are individually authored local themes for over 100 locations; the rest use a regional model combined with country metadata and character context.
- **New educational and relocation decisions** for 189 newly expanded locations. The 12 previously researched story packs remain in place.
- **90 country-specific name pools**, with regional fallback for the remainder. These pools are *examples* rather than population-weighted name distributions.
- **Optional World Bank data integration**: official latest-available population, crude birth rate, life expectancy, under-five mortality, infant mortality, vaccination (DPT), urban percentage and GDP per capita PPP. Data download runs *on the device* when online; dated facts and source links appear in **Facts**. Cached results work offline where supported.
- Where both birth rate and population are available for a matching period, the next birth selection updates its approximate weights; where mortality and life expectancy are available, an approximate adult survival curve is recalibrated.
- **Original gameplay preserved:** autoplay, pause/next decision, set-aside decision, speed controls, family/money, death record and Life Archive.

## Verification completed
- 201/201 country-specific test births with valid family and mortality model values.
- 201/201 complete simulated lives finish without an engine exception (7,288 decision interruptions across the test set).
- Official-statistics API integration tested with mocked source responses: indicators, dates, display and mortality curve calibration.
- All embedded scripts and new modules pass JavaScript syntax checks.
- iPhone-sized browser test showed no horizontal overflow.

## Remaining limitations
**This is not a fully calibrated simulation of all human populations.** The World Bank integration depends on network/CORS and a country's actual data availability. The game still uses estimated household class, income, educational access, many job probabilities and a simplified shape of mortality. The World Bank figures are observed population indicators, *not* the individual character's personal odds or the probability of a specific event. Names, careers and local stories are fictional examples.

The country list is 201 playable countries/locations, **not** all 237 UN WPP areas or all ISO-designated territories. The Holy See has zero automatic birth weight (no ordinary residential birth sampling), but remains selectable in manual mode. Historical countryinfo population values are used as *rough offline weighting seeds*, not current data.

See [coverage and data methodology](WORLD_DATA_AND_COVERAGE.md) and [earlier testing notes](V3_RESEARCH_AND_TESTING.md). Do not use the simulator as medical, economic or migration advice.

## Save safety
Export a JSON backup in the Life Archive before switching website address, reinstalling or clearing browser data. Storage is local to each browser/app origin and may not transfer automatically.
