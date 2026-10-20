# Measurable reference-fidelity comparison

Updated 2026-10-21. Official reference https://1in8b.life/en/ (v0.7.89 beta).
Evidence: retrieved official page/FAQ, source inspection of Other Lives, and read-only Chromium reference observation run https://github.com/aidanko1/other-lives/actions/runs/39493052211.
The observation successfully created a life, waited for birth registration, began it, paused it and invoked next-decision. It did not complete a decision or life. Family/spend interaction targets were not found by the initial selectors; they remain unknown as hands-on observations. Screenshots/control inventory are retained as research artifacts, not copied game assets. No reference code/prose/art is used in implementation.

| ID / dimension | Verified reference | Other Lives implementation | Similarity/difference and acceptance measure |
|---|---|---|---|
| RF01 Structure | Birth → registration → live text interface observed | New life → short reveal → life log | Similar structure; test those stages in browser. Country/class override is intentional user-requested sandbox |
| RF02 Progression | Continuous time with pause/resume and six speed controls observed | Month clock, same six speeds and pause | Similar controls. Other Lives source: 3750ms/month =45s/year at1×. Reference FAQ describes40–60s/year at default. Actual timed equivalence unknown |
| RF03 Birth circumstances | Random geography/family documented and random birthplace observed | Weighted country, household percentile, parents, birthplace | Similar premise; 129 versus172 locations is a known data gap |
| RF04 Event presentation | Life record and next-decision control observed | Journal, agenda, consequential choice dialog | Similar structure. Reference event density, exact dialog behaviour and consequences unknown in this observation |
| RF05 Choices/agency | Focus and event decisions documented; not independently resolved | Explicit choices, randomness, eligibility and persistent routes | Preserve uncertain outcomes. Automated save/choice and route-continuation tests protect own implementation; qualitative equivalence remains unknown |
| RF06 Interface | Compact control strip and four status meanings documented; strip observed | Four bars, log, optional profile/family/people/spend tabs | User-requested tabs are intentional; avoid new mandatory panels. Mobile/desktop navigation tests and screenshots required |
| RF07 Inspection | Family/spending UI described in official page | Optional tabs; pause during inspection | Own pause test required. Reference inspection details not interactively verified |
| RF08 Pacing | Three life-duration choices documented/observed | Fixed default45s/year plus speed/skip | Duration chooser missing. Decision rate and friction must be measured before adding controls; no numerical parity claim |
| RF09 Life stages | School/work/love/health/death documented | Country schooling, degrees, careers, family, care, retirement | Connected routes aim to deepen causality. Full-life assertion and UI stage checkpoints required; national/professional realism partial |
| RF10 Endings | Variable death age/death record/local past lives documented | Mortality cause, ending, archive/export/replay | Same broad ending structure. Reference ending hands-on unknown; own natural lifecycle/archive tests required |
| RF11 Chance versus control | Origins constrain odds; decisions can change them documented | Random birth, limited eligibility, probabilistic outcomes | Intentional deeper consistency. Never promise success from one choice or make complex engine state mandatory micromanagement |
| RF12 Extra reference systems | Four parallel lives and reflection checkpoints documented | No equivalent verified | Missing, deferred. Do not substitute an unrelated mechanic |
| RF13 Art | No assets copied | Original static pixel household strip | Intentional preference. No walkable map, movement or exploration introduced |

## Player-experience measures still required
Measure normal-speed duration and pause behaviour; decisions/year and meaningful versus trivial choices; repeated template/category rates; time spent in menus; consequences visible later; and diverse life trajectories. Automated reports record age/decision/route/memory coverage. They cannot certify enjoyment or subjective fidelity. Record representative human/interactive observations and correct unjustified divergences before calling reference fidelity complete.

## Verified Other Lives checkpoint
At code 07f81f2, Chromium completed a natural US seed 951 life through age 105 with 47 choices, reloaded established histories at childhood/adulthood/old age, inspected navigation and finances, verified archive/export/import and began another life. All eight quality jobs passed: https://github.com/aidanko1/other-lives/actions/runs/39494233610. This verifies those own-game interactions; it does not turn unknown reference behaviours into verified matches.

Cycle2 backend improvement: annual cost/read/save ownership changes add zero player controls or decisions.645 working cost scenarios preserve base 2aea totals; prepaid-overseas crash, load/display effects and recreated cleared debt are corrected. The actual US951 UI lifecycle remains47choices/death105. These are Other Lives regression measurements, not new evidence about reference-game probabilities or full parity. Final evidence: RELEASE_STATUS.md.
