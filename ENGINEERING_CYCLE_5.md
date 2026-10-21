# Reference pacing correction: a bereavement stops fast-forward

Base08bc385 passed all eight quality jobs (73 tests, build, two1,000-life cohorts and browser): https://github.com/aidanko1/other-lives/actions/runs/39514292709. This stage adds a narrowly observed reference interaction, not another gameplay system.

## Evidence and acceptance
During direct play of the official https://1in8b.life/en/ v0.7.89 beta, an India life reached adulthood; a father's death interrupted Next decision with a message, despite no pending choice. The player could read the record and continue with the existing controls. Baseline Other Lives skipToDecision continued through family deaths until another card or the player's death.

Next must stop at a newly deceased family member, retain the actual committed annual history and remain paused. It must not create a new decision, replay an old death, change ordinary clock behaviour or require a new control. Extending the observed parent stop to the existing close-family roles is an explicit design judgment. Distant-contact deaths and ordinary highlights keep their existing pacing.

## Implementation and regressions
engine/clock.js keeps its numerical skip return API and accepts an optional notification callback. It compares living family IDs at the start of that skip with the actual committed state after each transition. ui/app.js uses the existing pause and toast. No extra saved state, mandatory dialog or new event text.
Two pacing.test regressions use the actual annual/clock pipeline: new parent death stops at the birthday before the later card; continuing reaches that card without another stop. A friend death does not introduce the family pause. The first test failed red (month1 rather than month0) before the correction, then both passed. The initial synthetic no-agenda/no-mortality fixture was replaced with a real later decision to bound the reproduction; the stop-at-death assertions were retained.
Browser smoke now asserts the actual birthday death and unchanged paused save after 4.1 seconds. Its initial generic Next flow continues through verified bereavements until a real choice or ending, retaining its decision-consequence assertion. This updates the test contract to the verified reference interaction; it does not accept arbitrary early stops.

Exact final-source regression/build/browser and full simulation gates are pending at this commit; see RELEASE_STATUS.md for final evidence. No merge or deployment.

## Final integrated verification
Source b87e519fd04fceb489a39c68a67719e0159d8324 passes all eight quality jobs: https://github.com/aidanko1/other-lives/actions/runs/39515340262. 75 reported tests, production build, two complete 1,000-life asserted cohorts and actual Chromium lifecycle/storage/property/pacing checks passed. Earlier pending/failed statuses above are historical and remain visible. RELEASE_STATUS.md records exact limits. No deployment.
