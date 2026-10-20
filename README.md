# Other Lives v5.5 — Narrative and life-path overhaul

Other Lives is an **independent** fictional life simulator. It is not affiliated with *1 in 8 Billion* and does not use its proprietary game code, artwork, text or database.

## What changed

- **Age-sensitive gameplay and logs**: early childhood focuses on care, play, family, first learning, food and surroundings rather than adult decisions. Under-12s have no personal spending menu; teenagers only have limited allowance and age-appropriate options.
- **129 retained playable country/location profiles** with locally contextualised meals, transport, cultural events, everyday routines and family variation. A country does not imply that every household celebrates the same occasion or eats the same food.
- **Education threads**: country-named schools, examination and vocational routes where reasonably known; other locations use honest regional fallbacks. An enquiry, admission, attendance and completing a qualification are distinct states.
- **Employment**: named local and regional occupations, illustrative PPP-equivalent annual earnings, qualifications/availability constraints, choice of offers, and memories linked to employment. Unavailable roles remain visible but cannot be selected.
- **Postgraduate crossroads**: graduate work, local postgraduate study and studying abroad; costs can make options unavailable. Admission and completion take time and are not guaranteed.
- **Family and relationship continuity**: caregivers, sibling relationships, teachers' encouragement, childhood memories, food memories, and work memories can affect later entries. Parent names are not repeated in brackets in the Life Log; full names are still in People profiles.
- **Relevant context** appears alongside decisions and life memories, where a credible source supports it. The separate Facts tab is gone.
- **iPhone-friendly layout**: combined sticky Life Focus, speed and age controls; Life Log/Profile/Family/People/Spend tabs are situated with the story, not floating over the page. Other tabs pause progression; unanswered decision cards can be set aside and reopened unchanged.
- **Online-only GitHub Pages**, with no background World Bank API queries and no offline caching. Local browser saves and JSON archive exports remain supported.

## Verification completed before publishing

- Simulated childhoods across all 129 retained locations: no early childhood coaching/finance events or parent-name brackets in generated logs.
- Complete-life regression cases across nine geographically varied locations with decision resolution and no simulation exceptions.
- Five additional reference playthroughs through early adulthood, including examples of job-card earnings and unavailable postgraduate options.
- A browser-based iPhone-size check: birth reveal, set-aside decision, visiting the Family tab, returning to precisely the same decision, and choosing an option; no JavaScript errors or horizontal overflow.
- Full country-level demographic calibration, all school admissions, national wages and local cultural frequencies are **not** validated. Prices and income are explicitly game estimates.

## Known limitations

Only some countries have named national education institutions, qualification pathways and occupations; others have region-specific paths and locally contextualised stories. Although every supported country receives recurring local narrative texture, this is not equivalent to a verified, representative biography of every culture, language, class or region.

Life expectancy and under-five mortality figures use an approximate frozen 2024-era reference when available; the adult mortality distribution and many risk modifiers remain model assumptions. Food examples are optional household possibilities, not statements about what all people eat.

The game is stored locally in each device/browser. **Export the Life Archive backup before changing browsers, reinstalling or clearing site data.**

### Play

https://aidanko1.github.io/other-lives/