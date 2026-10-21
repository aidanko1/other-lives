# Cycle10 — first-year mortality timing

Base e1833ce: cycle9 checks are running separately. No merge/deployment. This stage corrects a date-boundary defect rather than adding a player mechanic. Existing saved lives must keep their original continuation model.

Evidence: https://data.unicef.org/topic/child-survival/under-five-mortality/ and https://data.unicef.org/topic/child-survival/neonatal-mortality/ (accessed21October2026) define infant mortality over birth to the first birthday, distinct from the first28 days. The existing engine applies its infant annual risk only after incrementing to age1, making infant death at age0 impossible. Official reference play also verified an age0 ending. No new national figures are asserted from this definition check; existing selected2024 inputs/proxies remain explicitly partial.

Acceptance before changes:
- New births use12 conditional monthly first-year risk checks, yielding the same annual survival product for constant circumstances. Equal monthly hazard is a documented approximation, not a sourced neonatal/month-specific curve; it does not model the true neonatal peak.
- Story deliveries and pending choices do not roll extra mortality. A fatal first-year check records age0/current month and freezes the terminal life. A survivor's first birthday does not charge infant mortality again.
- Save the model version/month receipt before the birth snapshot. Load/replay preserves it exactly. Lives lacking this metadata retain the original birthday model, including all saved worlds; never retrospectively add a mortality version.
- Monthly fatal/birthday work is atomic, including RNG and receipt rollback on failure. Repeated terminal actions are unchanged.
- Permanent probability/clock/rollback/save/legacy regressions, actual age0 UI ending/new birth and all release cohorts/gates must execute. No claim of calibrated age/sex mortality or stable production from this narrow correction.

Implementation and final-source verification pending. Prior cycle reports remain evidence for their exact revisions only.

Implemented in core.js/clock.js/demographics.js/state.js: new-birth mortalityTiming version1 and infantMonths receipt, pure probability calculation, monthly first-year roll/atomic rollback and first-birthday deduplication. Current-schema/legacy loads are unchanged; absent metadata retains the old annual model. Six focused regressions pass locally, including exact saved NG2 continuation. Actual browser NG2 naturally ends at age0/month9, reload/archive are unchanged, and another birth succeeds. No forced mortality in that UI test. A production-policy US951 engine probe reaches95 with44 choices (previous version105/47); seeded new-life outcomes legitimately change, established saved lives do not. Full exact-source release checks pending. A visual inspection also found companion circumstance/age spans running together; scoped line layout corrected without new controls.

Limit: this corrects first-year timing only. Older ages remain the engine's annual endpoint approximation; neonatal concentration, continuous age/sex mortality and national causal calibration are not claimed. No new indicator figures were imported or relabelled latest.

Executed local peer cohort1000/1000:788955 checked states,34552 decisions,95 peer countries,ages0–104,max newborn JSON24831 bytes. Full Chromium suite passes: US951 natural95/44; NG2 natural0/month9; nine accessibility surfaces/keyboard;100-record exact archive12808234 bytes.13 private legacy records pass read-only migration/idempotence/history/identity/consistency/no-new-model checks; original bytes unchanged, nothing private committed. Local full Node glob still running (it loaded five infant tests before the sixth was added; final CI must execute104).
