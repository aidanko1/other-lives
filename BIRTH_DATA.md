# Birthplace weights — bounded realism update

Frozen dataset `birth-counts-2024-v1`, verified21 October2026. Scope selected before implementation: one input family (annual live-birth counts), two existing locations (Hong Kong/US). Other country figures and all fertility, mortality, household, school and income rules remain as before. This does not claim comprehensive national calibration or historical-era accuracy.

| Location | Reference year | Source fact | Weight in existing unit (million births/year) | Provenance and coverage |
|---|---:|---:|---:|---|
| Hong Kong |2024|36,723|0.036723|Department of Health, Birth Statistics1981–2024, CSV updated10 February2026. Male19,231 + female17,492 known live births in Hong Kong.|
| United States |2024|3,628,934|3.628934|CDC/NCHS Data Brief535, July2025, Table1, final resident live births; territories/foreign residents excluded.|

Primary sources: [HK dataset catalogue](https://data.gov.hk/en-data/dataset/hk-dh-dh_ncddhss-ncdd-dataset-2/resource/4ddb9569-96c4-4fa9-ad13-f7e492afcffd), [HK source CSV](https://www.dh.gov.hk/datagovhk/ncdd/Number%20of%20Known%20Births%20for%20Different%20Sexes%20and%20Crude%20Birth%20Rate%201981-2024(en).csv), [CDC table/methods](https://www.cdc.gov/nchs/products/databriefs/db535.htm). Facts were read from the actual HK CSV2024 row and CDC source table, not inferred from crude rates or rounded press reports.

The jurisdictional bases differ; these are fixed contemporary birth-volume weights, not a perfectly harmonised global denominator. Existing illustrative weights remain unchanged for the other127 playable profiles. The sampler normalises across available locations; the result is conditional on the129-profile catalogue, not all world births. The game uses a frozen reference period even for fictional future years. No network/background refresh occurs.

Implementation: engine/birth-data.js applies `count / 1,000,000` once to catalogue setup after culture filtering. New selected country snapshots include the evidence version/year/basis/link; explicit-country selection and equal-country mode retain their previous semantics. The existing shared weighted sampler also supplies new comparison lives. Saved country snapshots, old comparison worlds and replay history are never reweighted or regenerated during loading. The broader fixed cultural dataset has its own unchanged version.

Acceptance/test traceability: tests/birth-data.test.cjs asserts exact unit conversion and facts; all127 fallback profiles and every non-birth field unchanged; actual production/default/equal/fixed-country selection; repeatable200,000-draw distribution with explicit six-standard-deviation bounds and nonzero HK/US observations; exact old-input load/continuation; two complete production life trajectories and their exact replays. Browser lifecycle/save and complete release cohorts remain mandatory publication gates. Draws are not complete-life simulations, and repeated seeds are not extra distinct scenarios.
