# Other Lives 6.1 — playtesting and continuity repairs

The supplied backup was audited as 13 separate lives. Regression tests operate on copies; the source export is neither edited nor included in this repository. Older history cannot always identify the missing subject, original debt cause, housing tenure or employment arrangement. The game does not invent those past records.

## Confirmed problems and repairs

| Reproduction | Repair |
|---|---|
| A student pauses, obtains a different full-time job, then resumes full-time study. The screen says 20 hours but keeps full pay. | Resume halves both hours and annual pay, including a new job acquired during the interruption. Repeated state checks do not halve it again. |
| Scholarship card calls a helper which refuses applications from enrolled students. | Enrolled students can apply. A successful grant reduces future tuition while keeping enrolment; it grants no qualification. |
| Calendar graduation arrives despite incomplete accumulated study. | Course credits must be completed; slower progress extends the expected completion date. |
| A complete final year fails its assessment and permanently ends the whole degree. | Recent completed credits can lead to a separately priced reassessment, with preparation, uncertain results and an explicit exit. Decades-old clinical credits do not become an instant degree. |
| A crush's title, description and option refer to different names. | The person is cached on the first card read, without advancing simulation randomness. Teenage dating starts in separate homes. |
| A partner remains a student at 65; siblings never get an adult status. | Other people progress into training/work and retirement. Existing missing statuses are established at the present age, without backfilling fictional career histories. |
| Every promotion is another 19% raise in the same role. | 37 named four-stage career ladders, shared relevant experience, actual working-hour requirements, explicit applications and a three-year review interval. Top stages do not receive unlimited generic promotions. |
| The current job affects pay, but degree and experience do not lead to a coherent next step. | Field-directed searches and degree-specific graduate roles use one offer calculation. Accountancy and medical specialty progression need additional training/assessment. Portfolio routes exist for design and computing; regulated clinical entry still requires the relevant degree. |
| Foundation training elapsed while doing unrelated work. | Actual full-time-equivalent clinical experience counts. Foundation experience permits further training; it does not award consultant status. |
| Parents die while their large family balance remains inaccessible forever. Another inheritance card can repeatedly mint money from unchanged assets. | One estate settlement: family liabilities and earlier unremoved inheritance are accounted for, surviving children receive shares, minors' shares remain held until adulthood. The generic repeatable inheritance card is disabled. This is an explicit simplified estate rule, not a national inheritance-law model. |
| Negative family assets hide an unlabelled liability. | Move the negative amount into family liabilities, conserving family net worth. |
| Pension history counts partner and investment income as the player's earnings. | New records count only earned employment income. Older mixed records are not guessed backwards. |
| The identical memory returns ten years later with a different person. | A used authored template does not repeat in that life. 38 new work-specific/working-boundary moments expand the pool to 280. |
| Some new Russian, Iranian and Indonesian households receive names from mismatched pools; full household identities collide. | Updated fictional name pools for new lives, unique household identities and stable existing-save identities. |
| An older university qualification has no recorded subject. | An explicit record-completion route asks for the old subject, without charging tuition or silently guessing it. |

The school-leaving checkpoint also respects the later Italian finishing age: at 18, a pupil who is still at school is not pushed into the university/work decision intended for 19.

## Verification scope

- All 13 source-life copies: state upgrade, financial invariants, profile/family/spending render contracts; original file checked byte-for-byte unchanged.
- Every standard career ladder: entry, experience gate, next named position, part-time preservation, top-stage cap and professional assessment restrictions.
- Every major route: forced successful and unsuccessful branch contracts, follow-ups, finite nonnegative money, persistence and exits.
- Seeded multi-country playthroughs: births, education choices, applications, relationships, household deaths, tuition, money, career progression and later life. The repeatable runner is `node tests/playthrough.test.cjs`.
- Browser interaction checks: graduation selection, promotion acceptance, resulting role/pay/hours, passport progression and play from another tab. Targeted fixtures are synthetic and excluded from the release.
- Existing checks retained for device themes, aspect ratio, birth-result concealment, pet names/history, currency, factual context and relation-based memory narration.

## Comparison with the official reference

The official public update history and About page were used as the feature inventory, not third-party clones. Education before employment, named career routes, working hours, interests, ongoing intentions, staged major choices and later-life continuity have working counterparts. The reference also has 172-country age/sex life tables, historical/future worlds, same-second companion lives, public memorial/keepsake services and broader disease/disability/legal coverage. These are still substantive differences: this release does not claim complete parity or verified national salary/registration rules.

Sources: https://1in8b.life/en/ and https://1in8b.life/en/about/ . Clinical sequencing was checked against https://foundationprogramme.nhs.uk/programmes/ . Entry pay ratios were reviewed against https://www.nhsemployers.org/articles/pay-scales-202627 ; game salary offers remain illustrative purchasing-power estimates rather than those national pay scales.
