# Other Lives — permanent development instructions

This is a persistent life simulation, not a collection of independent cards. Read `GAME_DESIGN.md`, `ARCHITECTURE.md`, `TESTING.md`, `AUDIT.md` and the latest `CHANGELOG.md` before changing behaviour. These files take precedence over stale release claims in README. Do not depend on conversation history.

## Work contract

1. Start from the latest remote main. Record its SHA and inspect the worktree; preserve uncommitted work. Use a separate branch for substantial changes. Never reset somebody else's drafts or change the published baseline to make tests pass.
2. Reproduce a reported defect before fixing it. Trace similar entry points and underlying ownership. Add a regression for each significant fix.
3. Prefer a shared rule in `engine/rules.js`, a versioned migration in `engine/state.js`, or a change in the owning mechanic over a new wrapper. Do not add more load-order patches to `ensureClarity`, `passive`, `livingCost`, `applyChoice` or `makeAgenda`. Legacy chains are migration debt, not an extension API.
4. Keep all existing content, routes, artwork and save history unless removal is explicitly approved. Do not replace complex mechanics with placeholders or quietly repair history to fit a current rule.
5. A UI control is not implementation evidence. Follow a choice through eligibility, payment, state transition, later consequences, save/reload and rendering.
6. Read-only queries must not consume simulation RNG or transfer money. Only explicit commands / annual settlement commit changes. Never call `livingCost` to preview costs; use `quoteAnnualCosts`.
7. Game assumptions must be identified as such. Do not claim measured national salaries, mortality tables, admissions rules, legal/credit systems, or reference-game parity without evidence. Preserve source provenance.
8. Keep private exports, logs and personal test fixtures out of Git and deployment packages. Use anonymous minimal synthetic regression fixtures.

## Completion and release gate

- Run `npm test`, `npm run test:simulation` (at least 1,000 complete lives), `npm run build`, and actual browser E2E. Inspect balance and coverage reports, not just exit status.
- Fix every new consistency failure or explicitly block release. Do not weaken an assertion to conceal a defect. Correct a bad model assumption with an explanation and a regression.
- Re-run affected checks after code changes. Record exact commands, tested revision, counts, failures, findings and remaining limitations in `TESTING.md` / `CHANGELOG.md`.
- Preserve save compatibility with pure, idempotent, versioned migrations. Test old saves, current saves, pending decisions, paused/finished archives and replay snapshots. Never overwrite an unsupported future save.
- Open a reviewable PR. GitHub checks and browser evidence must pass before substantial changes merge. Pages deployment must depend on quality checks. Never claim branch protection is configured without verifying it with repository administration permissions.
- A release is complete only when integrated behaviour, UI and edge cases work, checks pass, existing features are retained and no known critical defects remain. Otherwise state what is unfinished and why. Do not use a passing 1,000-life run as proof of demographic realism or exhaustive route coverage.

No additional features during the engineering overhaul unless needed to complete an existing broken path. Keep the four-factor interface simple. Never introduce unrelated dependencies, menus or paid services to solve an engine defect.
