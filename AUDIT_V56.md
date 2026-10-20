# Other Lives v5.6 — evidence and acceptance audit

**Status: limited, source-anchored research build (NOT a globally validated life simulator).** This version restricts **new random births to twelve curated country/region profiles**. It retains old archives without deleting historical saves from previously playable locations.

## Fixed, dated population reference data

2024 **under-five mortality per 1,000 live births** is taken from UNICEF's country profiles (UN IGME), not a player's personal mortality probability. 2024 life-expectancy anchors are rounded from World Bank indicator `SP.DYN.LE00.IN` (years). All indicators are fixed in source code; the app does not contact the World Bank while playing.

| Location | 2024 UNICEF U5 deaths per 1,000 births | 2024 life expectancy (rounded, World Bank) | Education systems represented (limited illustration) |
|---|---:|---:|---|
| Ghana | 35.9 | 66 | BECE; senior high/WASSCE; vocational training |
| Nigeria | 115.6 | 55 | Junior secondary BECE; WAEC; technical colleges |
| Ethiopia | 44.5 | 68 | Upper-secondary; technical/vocational routes |
| Bangladesh | 30.5 | 75 | SSC/HSC; BTEB technical routes |
| India | 26.6 | 72 | Board examinations; ITI and polytechnics |
| United Kingdom | 4.7 | 81 | GCSE, A-level/further-ed or devolved equivalents; apprenticeships; T Levels only in England |
| Iran | 11.3 | 78 | Upper-secondary diploma; university entrance; vocational study |
| United States | 6.5 | 79 | High school; community college; registered apprenticeships |
| Japan | 2.4 | 84 | Upper secondary; senmon-gakko; kosen |
| Pakistan | 56.0 | 68 | SSC/HSSC and TVET routes |
| Poland | 4.2 | 78 | Matura; technical/vocational secondary |
| Hong Kong | not used — source not verified | 85 | HKDSE; JUPAS/E-APP; VTC/IVE |

**Additional Hong Kong reference:** 2024 Department of Health *Health Facts of Hong Kong* reports **2023 infant mortality = 1.6 deaths per 1,000 live births**. The game anchors first-year risk to this dated infant statistic, but its ages 1–4 risk is still modelled, not a verified Hong Kong under-five figure.

UNICEF sources:
- Ghana https://data.unicef.org/country/gha/
- Nigeria https://data.unicef.org/country/nga/
- Ethiopia https://data.unicef.org/country/eth/
- Bangladesh https://data.unicef.org/country/bgd/
- India https://data.unicef.org/country/ind/
- UK https://data.unicef.org/country/gbr/
- Iran https://data.unicef.org/country/irn/
- USA https://data.unicef.org/country/usa/
- Japan https://data.unicef.org/country/jpn/
- Pakistan https://data.unicef.org/country/pak/
- Poland https://data.unicef.org/country/pol/

Life expectancy source: https://data.worldbank.org/indicator/SP.DYN.LE00.IN
Hong Kong infant mortality source: https://www.dh.gov.hk/english/statistics/statistics_hs/files/2024.pdf
Education comparisons: https://www.uis.unesco.org/en/methods-and-tools/isced/mapping-and-diagrams ; https://www.uis.unesco.org/en/data/sdg4-country-profiles ; https://www.eapp.gov.hk/en/ ; https://www.mext.go.jp/en/policy/education/overview/ ; https://www.gov.uk/government/publications/introduction-of-t-levels/introduction-of-t-levels ; https://neco.gov.ng/exams/bece ; https://btebadmission.gov.bd/ ; https://www.apprenticeship.gov/educators/apprenticeship-for-young-people
Labour indicator source for future calibration: https://ilostat.ilo.org/data/

## Implemented rules

- Removed duplicate older education/job cards in these 12 locations that could bypass multi-year schooling or direct job selection.
- Age-limited meaningful decisions and spending. Under-12s have no purchasing menu; early childhood healthcare decisions remain with caregivers.
- Education: **enquire/apply → possible admission → multi-year attendance → possible completion**, never an immediate degree for clicking an enquiry. Rejection permits applying in a later eligible year.
- Work: three named locally plausible categories, credential screening, qualitative eligibility and explicitly **illustrative** annual game pay. Refusing preserves the current situation; jobs can depend on prior training and interests.
- Journals: no redundant `Mom (Name)` / `Dad (Name)` labels; fixed childhood meal/transport anchors can recur as memories decades later.
- Separate ordinary-life events, life decisions, and summaries. Ageing remains continuous with set-aside decisions, a mobile-friendly log and a life archive.

## What is and is not validated

**Passed deterministic reference audit:** national baseline under-five hazard products match UNICEF's 2024 figures to numerical tolerance for all 11 locations where q5 is available. Country baseline life-expectancy curves are within around half a year of the fixed World Bank reference anchors. **This validates the formula's fit to those aggregate anchors only.**

**Not empirically validated:** real individual mortality, cause-specific deaths, national vaccination and medical access, schooling admission/pass rates, exact occupational pay, household size, wealth and expenses, cultural participation or migration odds. These remain fictional mechanisms/assumptions. Local examples are possibilities, not facts about every family.

Birth weights within the 12-country selection are inherited from illustrative original weights, **not validated UN global birth counts**. The resulting new-life randomisation is *not* representative of the whole world's births. None of the individual life outcomes should be treated as a prediction.

## Browser and simulation tests

- 12/12 curated profiles produce complete tested life records; 0 simulation exceptions in the fixed-seed full-life test (see `audit-all-output.json`).
- 12/12 pass school/job/reference scenario tests (see `audit-targeted-output.json`).
- At 390px viewport, no horizontal overflow or JavaScript exceptions in the embedded-source smoke test.
- Decision opens, sets aside, Family panel opens, returning restores same pending decision, and selecting an option closes the card.
- Physical iPhone installation, local persistent storage and GitHub Pages publication have **not** been independently confirmed by those tests. A test browser's local-navigation policy blocks hosted/localhost verification.

## Release criterion

This is a **research-preview branch**, not a declaration of full, equally evidence-based international coverage. Future work requires verified current births, within-country income/wealth and housing distributions, survey-supported family structure, labour earnings and jobs, age/sex mortality tables, provenance per fact, peer review of cultural narratives and real-device testing. A feature matrix is more honest than calling 129 generic country profiles validated.