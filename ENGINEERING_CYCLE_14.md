# Cycle14 —6.3 gameplay polish

## Baseline and scope
Published6.2.0 main4b799d67b3909bdd1513e1ba55b976a10af189d7, restore release/6.2.0; all107 tests/build/3432 complete asserted lives/three browsers and production validation/deployment passed (quality39552979368, Pages39553762697). PR2 records actual live upgrade/new birth/choice/reload. User asks for next bounded update: move four factors into existing floating controls, remove changing-stat presentation from the log, and preserve Spend menu/position when changing routines. Reflections remain excluded.

## Acceptance and dependencies
- Living factors: one labelled four-meter group inside existing sticky focus/playback, readable at320/390/768/1280 in light/dark; no duplicate story-card values. Finished life retains final summary. Existing pause/speed/Next/inspection work and strip leaves space to read.
- Narrative: no stat/money-delta chips in current narrative or journal; preserve original prose/context, finance records, saved metadata, actual changes and optional activity previews. Real choice updates factors and survives exact reload.
- Routine editing: keep all open Spend disclosures, focus and clicked row through pointer/keyboard toggles and rejected third selection; same selected state persists, no calendar/RNG/cash/journal or annual effects charged early. Use component updates rather than rebuilding the app.
- Career pacing: honour advertised3-year review interval at eligibility and both selection paths; default7 for other events; retain experience, qualifications, hours, uncertainty and specialist assessments. This does not guarantee a promotion or solve all junior-role pacing.
- Readable bond/person percentages are presentation only; no stored relationship values are rounded.
- Full permanent release gates and restorable exact-source checkpoint; no broad country/era/architecture rewrite.

## Root causes and changes
OL-041: life-careers.next allowed3 years but promotion had no declared cooldown; rules defaulted7 and both selectors separately hardcoded7. Three new permanent regressions first failed on baseline, then passed after declaring3 and respecting e.cooldown/default7. No odds/weight or professional gate changed.
OL-042: person views interpolated raw accumulated close/health values. UI now rounds/clamps display across current/inspector/archive/modal views; saved decimals remain.
OL-043: routine action fell through to root.innerHTML render; native details closed, height shrank and scroll restoration could not recover position. In-place summary/selection updates retain actual nodes/open/focus and anchor the row if selected-names text wraps. Other full-render actions need separate concrete reproductions.
User presentation: app stats now live in combined controls with accessible meters, responsive styles updated at their existing owner; only finished current lives retain story-card factors. Removed effectsHTML/moneyDeltaHTML calls from narrative rendering, retaining engine data/functions and spending previews. Version6.3.0 metadata/footer/cache keys stay aligned.

## Executed verification / limitations
Local three new career regressions:3 failed before correction,3 pass after. Targeted contracts/pacing29 tests and decision/finance15 tests pass (overlap is not summed as unique coverage), retained career-continuity/birth-reveal/registry sweeps, static/build/diff checks pass. Registry sweep covers2838 contexts/15863 decision queries with0 failures. Natural adult routine UI fixture reaches18 alive in270 asserted actions; this is partial setup, not another completed simulation.
Local browser launch initially lacked an executable; official Chromium download installation failed on truncated ZIPs/503. This is not a passed browser check. CI browser-polish/routines cover actual layout/scroll/effects/state/toggles; all existing browser assertions and cohorts remain required. One unexecuted helper initially used an incorrect event name early-childhood; source inspection corrected it to the actual early-bonds before CI, without changing assertions.

Final exact-source CI, complete-life counts/distributions, screenshots and publication are pending. Record them in the PR linked from RELEASE_STATUS; do not present6.2 evidence as candidate execution. Generic narrative/subjective enjoyment and national calibration remain partial future goals.
