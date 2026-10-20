# Other Lives — simulation principles and rules

Other Lives is an independent text-based life simulation. A seeded birth supplies a real country/place and unequal household circumstances. Choices, relationships, health, education and work create persistent consequences over monthly time. A person's life has no single success score. Existing reference research is in `REFERENCE_GAME_AUDIT.md`; it is not an implementation checklist marked complete.

## Core rules

- The four player-facing factors are Health, Well-being (`happiness`), Learning (`knowledge`) and Bonds (`relationships`), each 0–100. Stress/confidence are internal influences: strain affects wellbeing, concentration and health; confidence affects participation and probabilistic outcomes. Factors have diminishing gains, maintenance and consequences. Auxiliary numeric UI remains legacy work to remove carefully.
- Birth wealth is a percentile/quintile, not a guarantee of lifelong cash. Family cash, assets, debt, earnings, dependants, retirement and illness determine support. Five circles communicate the birth quintile.
- School access and enrolment differ. Before age six the player is not formally enrolled. The school-entry decision can establish attendance or learning at home. Country school labels do not confer qualifications. Academic admission, attendance, credits, assessment and qualification are different states.
- School leaving precedes a full-time career search. University subject and admission depend on preparation, interests and means. Full-time courses allow only part-time student work. A completed course opens related entry roles; it does not grant specialist status. Student employment ends or continues through an explicit choice.
- Postgraduate tuition uses the same family reserve and gift rules as undergraduate education. Financial help is a transfer from finite family resources, never free money or unrequested student debt. The current master's model charges programme tuition upfront; this is a game simplification.
- Career eligibility uses qualifications and track-specific full-time-equivalent experience. Searches require intent. Better-pay searches require a material pay improvement; interest-led searches may pay less. Promotions need eligible experience, an application and an uncertain result. Rare careers retain their own preparation routes.
- Savings, liabilities, investments, housing and business ownership are separate. Quotes must disclose prices, continuing costs and funding. Voluntary borrowing needs credit eligibility. Essential unpaid expenses become explained arrears. Prior debt with missing provenance stays labelled unknown rather than being given an invented cause.
- Contacts retain identity and role, age, health, closeness, residence, work and death. Dead people cannot reappear or continue ageing. A person remains in history after separation or death. Close-age school relationships can continue across a birthday; adult commitments cannot be assigned to underage partners.
- Children require care, household resources and a timeline. Adoption and biological parenthood preserve their distinct records. Parenthood is not guaranteed by choosing to try. Care/work commitments affect actual earnings and later costs.
- Death uses a country baseline plus modelled circumstances and chance. Estate transfers settle liabilities and split finite resources; a minor's share remains held until adulthood. These are simplified game rules, not jurisdiction-specific inheritance law.
- Queued stories and decisions are revalidated when delivered. Decisions recheck eligibility when applied. Successful choices record event ID, age, month and cooldown. Milestones are not repeatable; staged route/funding/search decisions own their own prerequisites.
- Ordinary moments should fit actual people, life stage, location, current means and history. Specific templates should not repeat under a different person's name. Significant decisions produce remembered consequences. Ongoing routines provide agency without annual repetitive clicking.

## Presentation constraints

Passport identity and meaningful work/hobby experience; current funds beside factors and in spending; clear earnings and comparisons; blue facts, green benefits, red harms; device light/dark theme; GBP default with fixed illustrative display conversions. Original crisp tile art preserves aspect ratio: home left, household/pets centre, school/work right, without labels under sprites. Follow `ART_DIRECTION.md`; do not copy proprietary characters or assets.

## Explicit limitations

129 playable profiles, illustrative wages/credit/retirement and largely fitted adult mortality. Locality and art coverage are uneven. Family care, postgraduate leave, estate allocation, course lengths and national career licensing remain simplified. Spend navigation, hidden-stat presentation, event category balance and some generated prose need further design/playtesting. No claim of full 1in8bil feature or dataset parity is justified.
