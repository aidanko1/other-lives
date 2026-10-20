# Changelog

## Unreleased — engineering foundation (branch quality/simulation-foundation)

Baseline: published 6.1.0, commit `4072fd4997992cb7fd6bf78d7f0c9cab41a7379f`. No published release is claimed by this entry.

- Recorded repository-wide inventory, baseline test results, prior-requirement gaps and prioritized causes in `AUDIT.md`.
- Extracted embedded engine, narrative and browser UI scripts. The UI now boots once after all mechanics load. Existing registries/content retained: 129 countries, 853 events, 280 moments, 42 routes, 37 career tracks, ten degrees.
- Separated school access from enrolment; preschool characters do not attend primary school. Learning at home explicitly leaves formal enrolment false.
- Added common eligibility checks at delivery/application, successful-choice history/cooldowns, deterministic Fisher–Yates agenda shuffle, atomic guarded commands and expanded temporal/state diagnostics.
- Added pure versioned save migrations, future-version rejection and exact-ID archive export. All load/import/resume/replay entry points use migration. Paused lives can be deleted; failed deletion no longer reports success; deleting the current record clears its pointer.
- Shared finite family-funding quotes, reserve protection and transfers across undergraduate and master's study. Family-assisted master's tuition and essential living support now work without creating unrequested debt.
- Fixed cached romantic candidates failing to age while an encounter waited. Found through a reproducible seed in the new release harness; retained a regression.
- Removed repeated whole-journal age cleanup from every monthly tick; existing journal migration runs once and new entries retain the existing cleaning boundary.
- Added dependency/syntax/registry checks, generated financial properties, command/migration/age regressions, eight deterministic save/replay round trips, all-country age/wealth registry sweep, real browser runner, and assertion-driven worker-based full-life simulations with reproducible seeds and balance/coverage reports.
- Fixed age-expiring late-life career/funding/graduation/reassessment cards. Added parent/child birth-chronology diagnostics.
- Versioned every release-candidate script/CSS reference consistently and added a mixed-version guard.
- Added separate PR quality workflow and deployment dependencies. Added permanent engineering/design/architecture/testing documentation.

### Release blockers / limitations

This is the first engineering pass, not the completed overhaul. Legacy wrapper consolidation and an explicit annual transaction ledger remain. Master's leave/return employment, several national career/course assumptions, fine-grained family care/estates, auxiliary-stat presentation, Spend usability and narrative balance need further review. The random-life policies do not exercise every rare route; targeted route checks are complementary, not exhaustive.

GitHub integration returns 403 for branch-protection administration. Required-check settings cannot be verified or enforced by this connection. CI job execution and browser portability must be verified on GitHub before merge. Exact local and CI evidence belongs in `TESTING.md`; do not declare the release complete from this changelog.
