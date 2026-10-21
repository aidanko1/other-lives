# Bounded releases

## Scope decision — 21 October 2026

The user accepts the current version once it has no known major consistency errors. Remaining refinements belong in separate future updates. This supersedes earlier backlog text treating comprehensive country/era calibration or an extended enjoyment review as prerequisites for completing the current cycle.

The fidelity contract and explicit no-reflections exception remain permanent. Do not expand a release merely because further improvements are possible. A confirmed critical/high defect still blocks release and needs a reproducible fix and regression; a documented approximation or an unverified possible improvement is not automatically such a defect.

## Current batch — consistency and reliability candidate

Freeze executable scope at 75b2154d4794d09410537bebea37937b9cc64ebf (6.2.0-dev.4); handover 11dcd5643c553d990d2e378cbee714bb4090baaa changes documentation only. Annual transactions, finances, employment, family timelines, event eligibility, terminal state, exact saves and simple reference gameplay are implemented with permanent regressions. Reflections are excluded.

Acceptance: production build, relevant regression/integration tests, critical browser lifecycles, save compatibility and asserted simulation consistency pass; no known unresolved confirmed critical/high defect; limitations and restore references recorded. All 11 jobs passed at both revisions, including 107 tests, three browser engines and 3,432 complete asserted lives. The 21 October scope review rechecked the handover's 11 successful job conclusions at https://github.com/aidanko1/other-lives/actions/runs/39541605654. This is existing executed evidence, not new test runs or extra simulated lives.

**Status: scoped engineering acceptance met; candidate ready for release review.** This is not a production deployment or a claim that every possible life is contradiction-free. Draft PR2 remains separate from main; main4072fd4 and the verified checkpoints are restorable. Actual merge/deployment and its workflow result must be recorded separately. This original scope decision did not itself merge or publish the candidate. The user subsequently authorised gated publication; consult RELEASE_STATUS.md and its linked PR2 publication record for the final outcome.

Documentation-scope verification executed for this change: diff whitespace check, Markdown-only change/link assertions, static syntax/assets/registry checks and production build all pass. Runtime/tests/workflows/schema are unchanged; the full lifecycle/simulation suite was not rerun for this documentation edit.

## Future batches

| Order | Update | Bounded scope | Acceptance before closing that batch |
|---|---|---|---|
| 1 | Gameplay polish | Review representative careers and repeated generic narratives. Address supported pacing/context problems through existing events, applications and training; no extra mandatory controls. | Record representative seeds/before-and-after histories; add regressions for confirmed defects; verify affected full lives/UI and retain all release gates. National licensing assumptions stay explicit. |
| 2 | Targeted realism | Choose one existing demographic, finance or schooling input family, source/version it for a small named country set, and integrate it with current systems. Select the exact dataset/locations before coding. | Document provenance, units, coverage and fallback; assert calculations/eligibility/save continuation and distributions; run complete release cohorts. Do not promise all countries or historical eras in one update. |
| 3 | Device and maintenance polish | Measure birth generation and long-session behavior on available slower devices; manual accessibility checks where available; extract a specific legacy helper only when its dependencies/regressions are understood. | Record actual devices/tools and measurements; verify relevant keyboard/storage/gameplay behavior, exact saved history and release gates. Mark inaccessible hardware/AT unverified. Split performance and helper changes if they cannot be independently verified together. |

Each batch has its own isolated branch, complete functionality, tests, documented limitations and restorable commit. A later batch does not block an earlier accepted release. New bugs discovered during ordinary play are triaged by severity; confirmed critical/high issues get a focused patch rather than waiting for the next feature batch. Broad historical eras, comprehensive national calibration and new content remain optional longer-term goals until separately scoped.

## Release operations

Review PR2, preserve the verified restore references, and deliberately merge/publish only through the existing quality-gated Pages workflow. Confirm the deployed revision and live smoke test before claiming release success. Main protection requires owner administration unavailable through the current connector; this limitation does not erase the existing workflow gates or justify inventing a new gameplay requirement.
