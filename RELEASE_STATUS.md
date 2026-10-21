# Other Lives — current release state

## Last published and verified: 6.4.0
Runtime release6e0f730a63a6db1b170191830cd2b60f4699fdc9 is restorable at release/6.4.0. Main subsequently received documentation-only policy consolidation c6179596b83e5a620e5549d20132ed75c16358eb. [PR4](https://github.com/aidanko1/other-lives/pull/4) records the exact tested/merged/deployed revisions:128 Node tests, production build, all11 source gates,3432 asserted complete lives and Chromium/Firefox/WebKit. [Production39570552572](https://github.com/aidanko1/other-lives/actions/runs/39570552572) passed validation and deployment; the later documentation workflow39576958270 also succeeded. Actual live upgrade/save/Spend-toggle/reload checks passed. Earlier release/6.3.0 remains available.

## Current candidate: 6.4.1
Branch fix/decision-inspection-flow fixes OL-052: keyboard focus escaped behind a visible decision overlay. Reuse the existing modal focus boundary; Set aside/Escape focuses Open decision. Preserve inspection, exact pending choice/history and save compatibility. No simulation/schema/content changes or reflections.

Executed locally:13 affected Node tests, static checks, production build and whitespace checks. The live6.4.0 defect was directly reproduced with Shift+Tab. The extended browser-accessibility regression covers mobile/desktop wrapping, Set aside, tab inspection, exact pending reload and consequence recording. Browser/source gates, merge and deployment remain pending; do not label this candidate stable before they pass. Existing11-job CI gates remain unchanged.

## Remaining limitations and next work
Follow BACKLOG.md's priority order. School opportunities remain a proposed coherent priority3 feature, not implemented work. BIRTH_DATA.md documents the bounded HK/US birthplace inputs;127 weights and broader country/era/licensing/age-sex calibration remain approximate. Subjective enjoyment, manual assistive-technology/slow-phone review and arbitrary archive sizes remain unverified. Main-protection administration remains unavailable; workflow safeguards remain active. Private archives stay untouched.
