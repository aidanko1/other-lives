# Worldwide Country Coverage and Statistical Evidence

## Countries included
201 selectable places, built from the ISO-3166 country-name reference with most uninhabited and non-self-governing territories excluded. Extra selectable places include Hong Kong, Taiwan, Kosovo, Cook Islands and Niue, in addition to UN member states and the two UN observer states.

The primary name, location, geographic setting and indicative capital are sourced from ISO country code metadata and the historical CountryInfo reference dataset. They are not a globally validated dataset of educational systems, cultural expectations or wage levels.

## Source data from the World Bank
The game queries the [World Bank Indicators API (v2)](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api) from the player's browser, requiring network access. Indicator pages are directly linked from Facts. Data are published under a [CC BY 4.0 licence](https://datacatalog.worldbank.org/public-licenses).

The eight indicators are:
| Indicator | Code | Units |
|---|---|---|
| Population | SP.POP.TOTL | Persons |
| Crude birth rate | SP.DYN.CBRT.IN | Births per 1,000 population |
| Life expectancy | SP.DYN.LE00.IN | Years at birth |
| Under-five mortality | SH.DYN.MORT | Deaths per 1,000 live births |
| Infant mortality | SP.DYN.IMRT.IN | Deaths per 1,000 live births |
| DPT vaccination coverage | SH.IMM.IDPT | % children ages 12–23 months |
| Urban population | SP.URB.TOTL.IN.ZS | % total |
| GDP per capita (PPP) | NY.GDP.PCAP.PP.CD | Current international dollars |

The API request uses the most recent non-empty observation; **years differ by country and indicator**. Per-capita GDP is not household income. DPT coverage is not an individual's probability of vaccination.

## Mortality and birth weights
Where available, under-five and infant mortality are translated into a stylised yearly under-five curve, then a Gompertz-like adult curve is calibrated to official life expectancy at birth. This **is not a country-age-sex life table**. Sex, class and other personal adjustment multipliers remain fictional gameplay parameters.

Where both population and birth rate are available within four calendar years, approximate annual births = population × crude birth rate / 1,000. Missing countries use offline model proxies derived partly from an older country information snapshot. Global birthplace draws therefore remain only **partially** population-weighted.

## Fictional narratives
- 12 earlier detailed packs remain.
- 119 locations have authored local themes, selected as plausible topics rather than stereotyped outcomes.
- Every location can generate childhood, adolescence, young-adult, midlife and elderly stories referencing their own geographic setting, finances, friends and family.
- 189 locales receive additional decision arcs for training/work and relocation.
- 90 country-aware example naming pools, with regional fallback for all other places.
These are **not estimates of how often an event happens** and not substitutes for ethnographic or country-level research.

## Technical verification and known unverified tasks
- Tested 201 complete lives without simulation exceptions.
- Mock World Bank responses yielded correct indicator values, years, source links, estimated births and calibrated mean survival.
- Verified mobile viewport without horizontal overflow.
- JavaScript parsed successfully after GitHub upload.
- **Not independently verified:** live World Bank API availability/CORS on a physical iPhone, GitHub Pages build success, iOS PWA offline service worker, and real device storage migration.

## Authoritative reference sources
- [UN World Population Prospects 2024](https://population.un.org/wpp/) — covers 237 countries or areas and distinguishes country/area definitions.
- [World Bank country API](https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-country-api-queries) — ISO, region and metadata.
- [World Bank indicator API](https://datahelpdesk.worldbank.org/knowledgebase/articles/1886674-new-features-and-enhancements-in-the-v2-api) — API usage.
- [UN observer states](https://www.un.org/en/about-us/non-member-states) — Holy See and State of Palestine.

This game is not affiliated with the creator of *1 in 8 Billion* and does not reuse that game's proprietary materials.
