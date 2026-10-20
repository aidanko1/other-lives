# Other Lives v3 — research, calibration and limits (20 October 2026)

**Independent project.** This is an original text-based life simulator, not a licensed copy of *1 in 8 Billion*.

## Country data actually incorporated

**Under-five mortality (2024, deaths per 1,000 births):** Ghana 35.9, Nigeria 115.6, Ethiopia 44.5, Bangladesh 30.5, India 26.6, United Kingdom 4.7, Iran 11.3, United States 6.5, Japan 2.4, Pakistan 56, Poland 4.2. Source: UNICEF/UN IGME country pages, e.g. https://data.unicef.org/country/gha/, https://data.unicef.org/country/nga/, https://data.unicef.org/country/eth/, https://data.unicef.org/country/bgd/, https://data.unicef.org/country/ind/, https://data.unicef.org/country/gbr/, https://data.unicef.org/country/irn/, https://data.unicef.org/country/usa/, https://data.unicef.org/country/jpn/, https://data.unicef.org/country/pak/, https://data.unicef.org/country/pol/. These describe births in the **population**, not the character's probability given vaccines, income or health.

**Life expectancy (2024):** World Bank SP.DYN.LE00.IN is used to set an adult survival *model's* expected life span for 12 selected countries/regions (GH, NG, ET, BD, IN, GB, HK, IR, US, JP, PK, PL). Source https://data.worldbank.org/indicator/SP.DYN.LE00.IN. Several values are approximate/rounded.

### How the model works

The under-five curve is split into first-year risk plus years 1–4, using published infant mortality where available and a documented 72% infant share assumption elsewhere. Remaining age-specific mortality is an **exponential/Gompertz-like approximation** fitted to each country's life expectancy. It is NOT a directly imported life table.

Sex, household class, vaccination, chronic illness and lifestyle multipliers are **model assumptions** and can move the simulated output away from national benchmarks. The chosen *cause of death* is a plausible fictional narrative, not an epidemiologically calibrated cause-of-death distribution. Do not read simulated personal outcomes as predictions.

### Coverage and cultural context

There are **57 selectable locations**. **12 have expanded country narratives and named local-work opportunities**: Ghana, Nigeria, Ethiopia, Bangladesh, India, United Kingdom, Hong Kong, Iran, Pakistan, United States, Japan and Poland. The other **45 still use basic regional/general templates**, without a verified national event library.

Local scenes are possibilities, not stereotypes or statements about what every resident does. Full regional, income, religion and time-period heterogeneity is not implemented.

Current economic values are fictional PPP-like proxies, **not current local wages, price series, or household income distributions**. Weighted births use approximate country weights, not a freshly validated UN birth dataset.

### Tested in a browser-sized iPhone viewport

- Scripts syntax verified.
- 150 complete playthroughs per each of 12 focused countries (1,800 simulated lives), plus targeted mortality sampling.
- Distinct named parents, occupations, named work offers and local stories.
- Animated birth reveal; decision card interrupts, is set aside, and returns unchanged.
- Family inspector pauses time; action selection resumes.
- Death record provides age, a fictional cause and a source-linked population reference for appropriate countries.
- No horizontal overflow or JavaScript page errors in the interaction test.
- Offline PWA files are packaged and versioned. **Physical iPhone installation and service-worker caching could not be independently verified** in this environment; the automated browser blocks local network and file navigation.
- Browser storage persistence and cross-device syncing likewise are **not verified on a physical iPhone**; recommend exporting JSON backups.

### Known gaps before scientific validation

Verified 2024 birth weights for 190+ countries, age- and sex-specific national life tables, verified global household distributions, within-country differences in education/healthcare, multi-year economic transitions, detailed marriage and employment patterns, source-linked country event libraries across all regions, cause-specific death tables, and field testing on an actual iPhone.

This version meaningfully improves behavior and regional differences but **does not claim complete worldwide statistical accuracy or feature parity** with the reference game.
