# Engineering and gameplay audit — cycle 1

Date: 2026-10-21. Pinned source: 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f.
Recovery used connected GitHub (complete recursive tree; all text source/test/docs/config retrieved). Repository has 129 locations, 853 registered events and 42 routes. No AGENTS.md or package manifest existed. Image assets were inventoried; no visual inspection of the binary PNG was possible in this environment.
Latest original main Pages workflow: https://github.com/aidanko1/other-lives/actions/runs/39457407780 — success. This verifies that baseline's workflow, not this cycle's changes.

## Scope and confidence
Source audit covers the accessible HTML, JS, CSS, tests, documentation and workflows. Static inspection cannot verify every random branch or visual design. The local shell/browser was unavailable; a JavaScript tool runtime can execute extracted engine scripts, and GitHub Actions is available for Node/browser execution.
Personal Context recovered past requests and reported bugs. Previous assistant claims about 13 uploaded lives and interactive reference play are historical evidence, not tests repeated here. No private backup was accessed or committed in this cycle.
Official reference page/FAQ checked directly via web retrieval. Similar-name sites were excluded after checking the official-address statement. Browser play of the reference is unverified this cycle.

## Prioritised findings
| Priority | Finding and evidence | Root cause | Classification / treatment |
|---|---|---|---|
| P0 | Changing a rented-out home back into the owned dwelling reconstructs housing without its mortgage (life-route-assets.js) | Ownership and secured liability are stored in several loosely related fields | Confirmed financial transition bug. Preserve the mortgage, test value conservation and next payment |
| P0 | finish wrapper can pay insurance and journal wishes before checking whether a life already ended (life-route-assets.js) | Terminal transition has effects outside an idempotent owner | Repeated-call bug. Guard the transition and assert no repeated payment/history |
| P1 | Seed zero falls back to fresh randomness; agenda uses sort with a random comparator (index.html) | Incomplete RNG contract and engine-dependent random ordering | Reproducibility defects. Accept uint32 zero and use seeded Fisher–Yates |
| P1 | No pull-request validation workflow; deployment runs a quick six-life playthrough after pushing main | Validation coupled to deployment, narrow scenarios | Add branch/PR CI, full existing suite, 1,000 asserted seeded lives and browser smoke |
| P1 | advanceMonth, passive, ensureClarity, applyChoice and money/render helpers are repeatedly replaced | Incremental patches without explicit system boundaries | Architectural debt; keep behaviour under tests then extract one owner at a time |
| P1 | ensureClarity and local ensure helpers run from rendering and perform repairs, career/estate/study changes | Migration, selectors and simulation are mixed | Requires idempotence/render-purity audit; move to explicit migration/action boundary in next cycle |
| P1 | lifeIssues covers only a small set of contradictions | No complete state/history contract | Extend assertions gradually with reproductions; never assert away real rare outcomes |
| P1 | Broad routes can be tested in isolation without combinations, actual clock or storage | Forced success/failure route tests do not establish end-to-end completion | Add browser and integration checks; trace full routes before declaring complete |
| P2 | Dense route planner, overlapping focus/routines/policies | New depth repeatedly surfaced as interface controls | Fidelity risk, not proof of a bug. Measure decision burden and play before removing requested controls |
| P2 | Births/sex/means and many wages, causes, risks and legal gates are approximate | Source-context facts coexist with modelled parameters | Realism gap, explicitly disclose; calibration needs dedicated sourced data work |
| P2 | 129-country model versus reference's documented 172; parallel lives/reflections not verified | Incomplete scope, not a broken button | Known differences, deferred behind reliability |
| P2 | Repeated country/context template replacements and multi-stage name updates | Multiple representation owners | Country/identity consistency needs systematic coverage |
| P2 | New Intl.NumberFormat per money call (life-clarity.js) | Formatting setup repeated during every story/choice/finance calculation | Cache the four fixed formatters; preserve exact displayed values |

## Existing systems: honest status
- Central life loop, ageing, choices, archive/export, household art and local save implementation exist. Actual browser flow must still be exercised.
- Degree/funding/graduation, careers and partner/estate corrections have regression tests. Prior reports that partners remained students are not assumed still broken after v6.1.
- Staged routes implement prerequisites, costs, follow-ups and exits. Several are simplified models; existence of 42 entries does not make all scenarios complete.
- Health lacks a full longitudinal condition registry; legal/national professional gates and historical world changes are incomplete. See IMPLEMENTATION_COVERAGE.md.
- Permanent tests already exist. The required improvement is broader independently asserted coverage, reproducibility and pre-merge execution.
- No runtime external dependencies. Browser tooling added for testing must stay outside delivered gameplay files.

## Acceptance for this stage
Restore point and branch recorded; permanent engineering/design/backlog docs committed.
Known home-use and repeated-ending bugs have reproductions and fixes at their existing owners.
Seed zero and unbiased seeded ordering have regression tests. Currency rendering remains compatible.
CI executes existing regression suite, syntax/asset checks, save continuation checks, at least 1,000 complete asserted lives across all locations/backgrounds, and Chromium gameplay/storage smoke. Every failure remains a release blocker or explicitly reported unresolved issue.
No wholesale UI redesign, new gameplay feature or save-key change.
This stage alone is not a certification that the entire game is complete or statistically realistic.

## Newer unmerged work recovered during this cycle
A second branch, quality/simulation-foundation, appeared after the initial pinned inventory. Inspected commit b31a7afb317cb38a942eef5e50ee549c16399ccb and every changed text file. It extracts engine/UI and addresses additional P0 defects: monthly cooldown history, preschool access versus attendance, stale command eligibility and inconsistent load/import/replay boundaries. It also adds guarded commands, family-assisted master's funding, candidate ageing, archive ID/delete repairs and a richer registry/simulation sweep. Its CI had green unit/simulation jobs but a failed browser job (run 39490698064); it was not a stable release.
The engineering branch integrates this work with a two-parent checkpoint, preserving provenance and all existing test assertions. See its retained AUDIT.md for baseline reproductions. All new integrated code requires a fresh complete CI run; prior branch passes do not count for this revision.

Initial new regression run a5b4ed4: confirmed failures for seed zero, missing seeded shuffle, missing reoccupied mortgage and repeated ending payout. A save test also failed on VM-versus-host object prototypes; the assertion now checks exact serialized state and source immutability, matching the actual JSON persistence contract rather than JavaScript realm identity. No simulation field was excluded. Initial browser smoke passed against the old architecture; the integrated boot must be tested again.
