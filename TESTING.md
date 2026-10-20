# Testing and release criteria

This document defines required verification. See CHANGELOG.md / CI for what actually ran; test-file presence alone is not a pass.

## Commands
Node 22 is the CI runtime. Runtime gameplay has no npm dependencies.
- `node --test --test-concurrency=2 tests/*.test.cjs`: existing and new unit/integration/regression scripts.
- `node tests/static-check.cjs`: syntax-check all delivered scripts (including inline engine/UI), local asset references and uniqueness of registry IDs.
- `node tests/simulation.cjs --count=1000`: complete deterministic lives with assertions and JSON summary. CI uses four disjoint 250-life shards, together 1,000.
- `node tests/browser-smoke.cjs`: Chromium served from repository root; requires Playwright installed for tests and a local server (see CI workflow).

## Simulation contract
Use the actual production script order through tests/engine.cjs. No alternative simplified engine. Disable only snapshots during large batches, and test real snapshot/save continuation separately.
Each scenario has explicit seed, country and background. Cover every supported country and random/hardship/comfortable/top1 backgrounds. Vary enabled decision selection reproducibly. Validate after every action: finite nonnegative finances, factor bounds, known pending decisions with an enabled choice, existing lifeIssues checks, chronological time and termination with a cause.
Track attempts versus completed/validated; any rejected/exception/stalled/unfinished/contradictory run fails the command. Never count an early termination as a complete life.
Store failing country, seed, background, age, month, pending event and assertion. Balance summary includes age bands, decision counts, countries/backgrounds, family composition and final occupations. Broad distribution assertions detect gross engine collapse; they do not validate national epidemiology or prove parity with the reference.
Wall-clock safety is provided by CI timeout. Same seed/choices are compared in deterministic continuation tests after removing only metadata timestamps/IDs, not meaningful history.

## Browser contract
Exercise production HTML with browser scripts, assert no uncaught errors/missing local assets, create/reveal/begin a life, next-decision and choice, inspection/navigation pausing, local save/reload, export/import where covered, and ending/archive display where covered. Name unsupported flows explicitly. A VM render contract is not an end-to-end browser test.
Keep browser test fixtures synthetic; never commit the user's private exports.

## Release gate
All regression/static/browser/sharded simulation jobs green for the exact proposed revision. At least 1,000 validated complete lives for a major release. Review distribution outputs and uncovered routes; inspect mobile/desktop actual gameplay for fidelity. Migration compatibility where state semantics change.
Use a branch/PR and preserve a baseline SHA. Repository instructions require successful checks before merge; GitHub branch-protection enforcement is a separate repository setting and must not be claimed enabled without verification.
Deploy only after acceptance; verify the Pages workflow and actual page. CI green alone does not verify deployment.
