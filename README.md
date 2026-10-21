# Other Lives —6.2.0 consistency and reliability release

An independent text-driven life simulation guided by the verified experience of [1 in 8 Billion](https://1in8b.life/en/), with no proprietary source/art/substantial prose copied. **Reflections are explicitly excluded:** no questions, notes, special pauses or toggle.

The user authorised publication of the bounded consistency/reliability update on 21 October 2026. [PR2](https://github.com/aidanko1/other-lives/pull/2) records the reviewed changes; the [v6.2.0 publication record in PR2](https://github.com/aidanko1/other-lives/pull/2) and [Pages workflow](https://github.com/aidanko1/other-lives/actions/workflows/pages.yml) record actual publication status. Final promotion changes only version labels/cache keys plus documentation; gameplay and saves are unchanged. Tested source 75b2154 passes107 tests, production build and all 11 [quality jobs](https://github.com/aidanko1/other-lives/actions/runs/39540689377):3000 complete release-cohort lives plus 432 targeted complete rare-path cases, Chromium/Firefox/WebKit, natural infant/adult lifecycles, save/replay, accessibility and100 normal-save archives/24 snapshots/four companion histories each (198957434-byte backup). Restore checkpoint/6.2.0-dev.4-release-gates-verified. Documentation-only descendants do not change that executable source.

Start every session with [RELEASE_STATUS.md](RELEASE_STATUS.md), [AGENTS.md](AGENTS.md), [GAME_DESIGN.md](GAME_DESIGN.md), [FIDELITY_MATRIX.md](FIDELITY_MATRIX.md), [ARCHITECTURE.md](ARCHITECTURE.md), [TESTING.md](TESTING.md), [REQUIREMENTS_MATRIX.md](REQUIREMENTS_MATRIX.md) and [BACKLOG.md](BACKLOG.md). These supersede historical release claims below. National/era calibration, normal-speed enjoyment and manual AT/slow-device review remain partial/unverified; protected-main administration requires owner access.

Local development: Node 22+, `npm test`, `npm run build`; serve with `python3 -m http.server 8000`. Browser gates need pinned test-only Playwright/axe and browser binaries. Full commands/release criteria are in TESTING.md; the old `test:release` convenience command is not the complete11-job gate.

## Historical release notes

# Other Lives v5.9.2 — Connected education and family memories

## v6.0 — connected routes and timeline repairs

- School-leaving choices precede full-time job searches. Graduation opens subject-specific roles, with supervised medical entry and a later training review. Old saves receive the missing graduation decision; accepted unrelated careers are not silently replaced. Student jobs end or continue full-time by an explicit choice.
- Diminishing gains, ongoing maintenance and contextual annual pressures reduce full-bar inflation. Stress and confidence now affect the four visible factors. Spending previews and recorded effects show adjusted changes.
- Thirty-nine persistent major-choice routes cover further education, business, family planning, care, migration, specialist work, treatment, retirement, property and investments. Stages retain costs, preparation, uncertainty and outcomes. Ongoing preferences replace repetitive annual clicks.
- Global memory-template cooldowns, named subject revalidation, better relationship wording, varied default pet names and archived pet identities prevent several repeated or contradictory memories.
- Budgets distinguish earned pay, a partner’s household contribution and asset income. Tuition gifts have explicit labels; unknown legacy labels remain identified as unlabelled rather than inventing a cause. Versioned assets prevent mixed script releases.
- [Research audit](REFERENCE_GAME_AUDIT.md) covers official update notes through 0.7.89. [Implementation coverage](IMPLEMENTATION_COVERAGE.md) identifies simplified and missing systems. This release does **not** reproduce every feature, national dataset or legal rule from the reference game.
- `node tests/flow-balance-routes.test.cjs` checks reported Medicine/save transitions, factors, memory cooldowns and all route success/failure stage contracts. `node tests/archive-audit.cjs backup.json` performs a read-only first pass over exported archives.


Other Lives is an **independent** fictional life simulator. It is not affiliated with *1 in 8 Billion* and does not use its proprietary game code, artwork, text or database.


## v5.9.2 update

- Memories refer to people by their relationship: your mum, dad, sister, friend or partner. Existing journal text is formatted too, without changing names in identity records. Pet names remain personal.
- Parents can cover all university tuition and essential student living costs if their available savings and assets allow it. Contributions protect household reserves, are recorded as gifts, and are reassessed annually against current means, dependants, retirement and care needs.
- A funding shortfall opens a concrete course decision: confirm affordable funding, apply for a grant, consider a part-time route or take a year away to work. No tuition loan is silently created. Payments, study progress and work hours persist across the thread.
- Nineteen additional course/funding moments and a supervised placement connect study to family relationships, pressure, skills and later relevant job offers. All probabilities/prices are illustrative game assumptions.
- The [reference-game audit](REFERENCE_GAME_AUDIT.md) records verified major routes, eligibility and anti-repetition mechanisms from the official 1in8b.life UI and update history. It is a development reference, not a claim that all those routes are implemented here.
- Verified full/partial parental support, cash/asset conservation, reserves, annual renewal, funding holds, grants, pause/resume, part-time progression and graduation fees. Preserves v5.9.1 artwork aspect ratio.

## v5.9 update

- **223 original conditional life moments** replace the small generic story rotation. Eligibility checks age, schooling or degree, work and experience, wealth/debt/housing, stress and all four factors, actual named relatives, friends, partners and living pets. Each moment changes stats, and some also change closeness, practice, health, costs or earnings. Queued subjects are revalidated; cooldowns and lifetime-use limits reduce repetition. These templates are fictional, not measured national event frequencies.
- **51 precise source-linked explanations** define cultural practices, foods, exams and other terms, including Diwali, Homowo, Class 10/12, gaokao and HKDSE. The same note and actual stat changes appear in Life unfolding and the log. Existing mortality provenance remains distinct from cultural definitions.
- **Real locality seeds in 21 country sets**, with city/village/town and region labels. Remaining countries use a named capital or its surrounding countryside. This is illustrative locality assignment, not a population-weighted settlement database. Current and birth places are separate. The scene uses urban paving, dry countryside or grass palettes, retaining home left, household/pet centre, school/work right.
- Name a cat or dog on adoption and rename it in Family. Family background uses five circles for the birth income quintile, with accessible text.
- Replace repetitive yearly rest/contact clicks with **up to two ongoing routines**, available beside the log as well as in Spend. Time limits force a choice. Free and paid routines continue automatically, develop skills or bonds, and apply annual consequences. Unaffordable paid routines pause without new debt.
- **Ten university subjects** offer visible interest fit, preparation requirements, duration, first-year funding and modelled admission probability. Fees require funds, admission is uncertain and course progress can succeed or be interrupted. Passport records the current school stage or named course, year, completed degree, and explicit work hours. Full-time study limits paid work to part-time; the first tuition year is not charged twice.
- Specific relationship decisions cover a school-age crush, meeting a named adult, dating, planning to share a home, marriage and strained relationships. Mutual interest, trust, confidence, wellbeing, time and finances matter. A declined advance is respected. Friendships can develop without romance; named children receive their own support outcomes.
- Work and hobby **levels 1–20 derive from actual years**, with diminishing returns. Practice affects appropriate moment eligibility, admissions, salary offers and promotions. Unsearched career changes and obsolete generic crossroads are disabled; empty searches continue quietly without an empty offer card.
- Outstanding debt retains **itemised origins and remaining balances**, with repayments allocated against them. Annual shortfalls identify essentials, housing, tuition, care, pets, routines and interest after savings. Historical saves without provenance are labelled as unknown earlier balances. Parents support the dependent school-leaving year rather than unexplained personal living-cost borrowing.

### v5.9 verification

`node tests/life-dynamics.test.cjs` checks event-bank integrity, age/state/person/pet revalidation, repeat suppression, named places, five-circle quintiles, pet-name escaping, debt provenance, school-leaving costs, persistent routines, skill progression, tuition and graduation, relationship candidates and job filters. `node tests/life-clarity.test.cjs` retains finance/theme/art regressions and simulates twelve countries; `node tests/birth-reveal.test.cjs` protects the spoiler-free randomiser. Browser review checks 390px light/dark layouts, pet naming, facts with effects and university choices. Locality coverage, art templates, programme durations, admissions, prices and relationships remain a game model rather than comprehensive national datasets.

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
