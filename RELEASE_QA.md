# Release verification — Other Lives v3.0

Checked 20 October 2026 with Chromium at an iPhone-sized **390×844** viewport plus scripted simulated lifetimes. Browser-based QA verifies interaction and basic stability, **not statistical validity**.

### Tested and passed
- Animated birth draw cycles both country and names; registration presented before gameplay
- Compact playback controls; no horizontal overflow in the tested mobile viewport
- Profile, Family, Spend, People and Facts accessible; opening a panel pauses the simulation
- An open decision automatically pauses; it can be set aside to inspect information, then reopened without losing the original choice
- Spending panel opens; young children cannot make direct purchases
- Adult purchase of learning materials, investment allocation, debt reduction and housing change
- Transaction history and affordability state update; repeated one-time housing purchase is blocked
- Parallel-lives section is visible in People
- Death has a separate view with age, cause, explanation and route to full archive
- 1,200 complete simulated lives across **GH, NG, BD, HK, GB, IR, US, JP, IN, ET, BR, PK** ran without uncaught JavaScript errors

### Known limitations
- 57 countries/regions, but only 12 have expanded region-specific packs
- Country and class probabilities beyond sourced under-five rates are not independently calibrated
- Adult causes of death and risk multipliers are fictional approximations
- This release has **not** been independently tested on an actual physical iPhone, only Chromium mobile emulation
- Offline caching and GitHub Pages deployment need a real HTTPS-hosted site to test end to end
- Performance on older iPhone hardware, huge saved archives and accessibility need further testing

### Sources
[World Bank under-five mortality](https://data.worldbank.org/indicator/SH.DYN.MORT) · [UNICEF data](https://data.unicef.org/) · [Original game public documentation](https://1in8b.life/en/)
