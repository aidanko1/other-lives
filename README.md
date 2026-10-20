# Other Lives v5.8 — Personal lives, budgets and consequences

Other Lives is an **independent** fictional life simulator. It is not affiliated with *1 in 8 Billion* and does not use its proprietary game code, artwork, text or database.


## v5.8 update

- Infants and preschoolers have separate story banks; an additional guard rejects inappropriate stories already queued in older saves. Memory templates have an eight-year cooldown, with original named household moments replacing repetitive generic entries.
- Passport profile with identity, actual interests, education and role/hobby experience. Learning and Community are removed as interests. Family includes the starting income quintile and current household income.
- Spending separates savings from earnings, debt and assets. More than thirty contextual choices span wellbeing, relationships, hobbies, education, transport, housing and investments. Unaffordable choices sit under a closed “Not available yet” disclosure. Purchases recheck funds before applying.
- Renting, moving, buying outright, mortgages, selling and investment property have explicit prices and continuing costs. Mortgage rules use a 20% deposit, 3% fees, modelled 5% interest and a twenty-year term; these are game assumptions, not national lending rules. Income, history, debt service and missed payments gate borrowing, including legacy voluntary loan choices and emergency instalments. Unpaid essentials become explicit arrears with consequences rather than silently approved loans.
- Health and wellbeing affect earned income; low knowledge affects qualified role availability, salaries and study applications; isolation strains closeness and wellbeing. Health at zero ends the life as a critical health crisis. Free rest and reconnection actions and paid care provide recovery routes before that point. The factor disclosure explains thresholds in the UI.
- Legacy direct-hire choices now initiate a search so actual offers can be compared before acceptance. Interest fit is shown alongside annual/monthly salary and percentage difference.
- New original 16-pixel tile household art: overhead ground, compact sprites, persistent complexion and hair variants, family resemblance, age changes, no labels beneath sprites. See [ART_DIRECTION.md](ART_DIRECTION.md). The current small code-drawn tile catalogue is a first pass, not a complete country/era-specific art library.
- All new surfaces use theme variables; device appearance remains automatic.

### v5.8 verification

The Node suite checks reported infant/toddler cases, queued-story rejection, repeated-memory suppression, insufficient funds and denied credit, mortgage equity/principal accounting, selling a home while retaining investment property, four-factor consequences, real interests, quintile boundaries, integer sprite coordinates, appearance persistence and prior v5.7 regressions. Full-life simulations cover twelve countries. Phone-width browser review covers both themes, profile, spending, locked housing, and playback from other tabs.

## v5.7 update

- Automatic light/dark appearance follows the device, including changes while playing.
- Persistent original pixel household scene: home on the left, living household and pet in the middle, current school/university/workplace on the right. Children are smaller; older people have grey hair.
- Income (annual and monthly), cash, debt and net worth appear beneath the status bars. GBP is the default display, with USD/HKD/EUR choices. These are fixed **game purchasing-power display scales**, not live FX or verified local wages. Canonical story money can be reformatted when the display changes.
- An unexpected bill is quoted once before choosing. Cash payment, a 12-month fixed-charge plan, and uncertain negotiation refer to the same bill. Instalments are tracked without charging ordinary debt interest twice on the active plan.
- Career changes require an explicit job search (except the first search on leaving education). Higher-pay searches only show qualified roles with higher earnings. Interest-led searches can offer lower-paid work. Contracts show current pay, offered annual/monthly pay and percentage change.
- Spending shows actual available stat changes before purchase. Vehicle upkeep and investment fees are shown and applied. Profile records work and practice experience. Existing saves begin detailed practice tracking from their migration age.
- Pressing Play from another tab returns to the log; an unanswered decision reopens before time continues.
- Family ages, deaths, pet ages, retirement and leaving-home transitions persist. Family mortality uses the same country baseline as the player, with modelled personal adjustments.
- Relevant source context is shown both beside the current unfolding event and in the log. Facts are blue, positive outcomes green, negative outcomes red. Survival milestones and a baseline curve are explicitly identified as model outputs; Kenya adds a 2024 UNICEF under-five anchor of 38.8/1,000.

### Verification

`node tests/life-clarity.test.cjs --quick` checks bill persistence/affordability and instalments, search gating and salary filters, retirement and household membership, spending effects, currency reformatting, device-theme change callbacks, narrative/survival rendering and the Kenya under-five hazard product. The full suite simulates 12 countries. Browser QA covered phone-width light/dark layouts, Profile-to-log playback, spending effects and visible financial summaries.

### Limits

The new statistical UI does **not** turn the existing 129-country model into a measured age/sex life-table dataset. Childhood mortality is source-anchored for selected locations; other childhood baselines, adult age shapes, cause-of-death labels, personal modifiers, wages, retirement timing and most transitions are still assumptions. Source links and distinctions remain visible. New fictional text and sprite art are authored for this project; reference-game code and assets are not included.

## Earlier improvements

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