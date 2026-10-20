# Engineering audit — baseline 4072fd4 (6.1.0)

This is an evidence register, not a declaration that the simulation is correct. The published baseline is preserved on `main`; engineering work is isolated on `quality/simulation-foundation`. Three unfinished feature drafts in the previous checkout are deliberately excluded.

## Scope and baseline

Repository-wide inventory: all tracked HTML, JavaScript, CSS, country data, icons, manifest, service worker, five existing Markdown documents, ten test/helper files, and the Pages workflow. There is no package manager, external runtime dependency, application build, schema version, PR workflow or permanent development guide. Browser engine scripts are classic scripts with shared mutable `window.OL` state. Existing tests execute those scripts in a Node VM, excluding the UI.

Runtime registries contain **129 countries, 853 event definitions, 280 moment templates, 42 routes, 10 degree subjects and 37 career tracks**. Many event definitions are generated from shared country templates; these counts do not establish depth or independent gameplay coverage. No duplicate event IDs were found.

The eight existing test commands pass at baseline. The quick playthrough test completes six lives (GB, IN, IT; seeds 317 and 634), 3,676 clock calls and 196 decisions. Those six characters die at ages 33–46, without employment at death. This small, biased policy is inadequate evidence about population balance, careers or later life. It is not a mortality calibration test.

## Priorities and root causes

| Priority | Finding and evidence | Root cause / corrective direction |
| --- | --- | --- |
| P0 | Monthly choices do not update `used`; the annual engine does. Schedulers consult `used`, so cooldowns do not reliably work. | Two clock implementations diverged. Record successful resolution centrally; use one eligibility rule at selection, delivery and resolution. |
| P0 | `school` is randomly set at birth as access, then treated as enrolment by stories and progression. School stories may precede the age-six enrolment card. | A boolean represents two different concepts. Separate access from attendance; migrate without inventing historic attendance. |
| P0 | `applyChoice` checks only pending ID, life status and option index. It does not recheck age or event prerequisites. | UI availability is being treated as authority. Revalidate commands before mutation; assert postconditions and preserve failed state. |
| P0 | Save load/import/replay use different combinations of `ensureTimeline`, `upgradeLife` and captured private ensure functions. | No versioned load boundary. Add explicit, idempotent migrations and reject future versions without overwriting the original. |
| P1 | `passive` is defined/replaced 13 times; create 12; story selection 11; living cost 8; agenda 7; choice application 6. | Load-order-dependent extension chains. Extract embedded engine/UI, document ownership and consolidate rules incrementally behind explicit contracts. Do not add another independent rule implementation. |
| P1 | UI boots before most extensions, then rerenders on readiness events. | Engine construction and UI start are interleaved. Load all engine systems before starting the UI once. |
| P1 | Living-cost queries can renew tuition, draw family money, pause policies and create journal entries. | Query and annual settlement are mixed. Introduce a pure quote boundary; retain settlement only in annual advancement and test repeat queries and conservation. Full annual-ledger replacement remains a separate migration. |
| P1 | Master's funding only checks player savings, unlike undergraduate and overseas study. Flexible degree first-year gating uses full-time prices. | Funding rules copied into routes. Share family reserve/quote/commit mechanics; test cash + asset conservation and rejected payment immutability. |
| P1 | Paused lives lack delete control; missing export IDs fall back to current life; archive deletion errors resolve as success. | Archive UI and persistence have no common result contract. Use exact ID resolution, checked storage operations and safe current-record deletion. |
| P1 | Deployment tests run only after push to main; no PR check or release simulation gate. | Deployment workflow substitutes for CI. Separate PR validation and release validation from deployment; verify hosting protection independently. |
| P1 | Existing simulation checks cover finite money and a small `lifeIssues` list, not transition history or distribution. | Test assertions mirror a few known symptoms. Add reproducible policies, explicit invariants, temporal checks, coverage and balance reports, failure seeds and 1,000-life release runs. |
| P2 | Some decision queries cache bills/candidates; age filtering temporarily mutates global event weights. Agenda shuffles use a random comparator. | No read/write boundary and unstable shuffle semantics. Treat card preparation explicitly; use deterministic Fisher–Yates and query checks. |
| P2 | Automated route tests force success/failure with lavish synthetic resources; actual UI/storage paths are largely untested. | Artificial fixtures hide integration failures. Add constrained edge cases, real browser checks and save round trips. |
| P2 | Documentation says what was added, but lacks enforceable invariants, migration/release policies and ownership. | Conversation history functions as the design specification. Add permanent engineering/design/testing instructions. |

## Requirements checked against implementation

| Prior request | Actual state at baseline |
| --- | --- |
| Four visible factors; hidden auxiliary mechanics | Four bars exist; stress/confidence still appear as numeric chips and disclosures. Partial. |
| Education before work; degree-related roles | Shared flow and subject-specific offers exist, with regressions. Generic older education routes remain intertwined. Not proven across all paths. |
| Wealthy parents pay for education | Managed undergraduate annual gifts/reserves and overseas funding exist. Master's support missing. |
| Meaningful skills and career ladders | 37 four-stage tracks and FTE experience exist. Availability and progression need cross-route testing. |
| Specific, consequential, nonrepeating moments | 280 conditional templates, factor consequences and subject revalidation exist. Decision cooldown defect and generic generated prose remain. |
| Dynamic family, romance, ageing and inheritance | Named relationship routes, dependants, mortality, retirement and estate/trust mechanics exist. Family care and estates remain simplified game rules. |
| Clear finances, debt provenance, credit | Costs, affordability, approved borrowing, mortgages and debt ledger exist. Legacy causes remain explicitly unknown; annual settlement side effects need isolation. |
| Individual JSON export / archive delete | Export exists inside detail; paused delete missing and exact-ID/error handling flawed. |
| Spend usability / fewer controls | Long stacked disclosures and route menus remain. Needs dedicated usability review, not removal of working routes. |
| Theme, GBP, facts in both surfaces, five circles, art ratio | Implemented and covered by targeted checks; real mobile/browser review still required after restructuring. |
| Reference-game parity / entire update history | Research documents exist. Full feature, country-data and art parity do not. No parity claim is justified. |

## Review coverage and outstanding work

Engine boundaries, clock, choice application, migration chains, education/funding, employment, route lifecycle, family/estate, factors and archive operations received focused source review. All registries and script dependencies were inventoried. Existing tests were executed before edits. This does **not** mean every branch of 853 definitions or every combination of 42 routes has been manually played. The permanent registry sweep, seeded harness and targeted browser work must supply further evidence; discoveries and limitations belong in `CHANGELOG.md` and `TESTING.md`.
