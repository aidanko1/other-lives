# Reproducible bug register

These are independently reproducible engineering findings. Fix status is provisional until the integration revision passes CI.
Original baseline is 4072fd4. First red regression run: https://github.com/aidanko1/other-lives/actions/runs/39491583111 (a5b4ed4).

| ID / severity | Expected versus actual; reproduction state/steps | Cause and correction | Regression / status |
|---|---|---|---|
| OL-001 / High | Seed 0 should replay. Create GB twice with seed:0. Baseline replaces zero with random seeds | Truthiness default in create. Accept integer zero and normalise uint32 in engine/core.js | reliability: zero seed. Red confirmed; fix awaits CI |
| OL-002 / High | A let property's mortgage must survive moving back in. Seed 2218 GB synthetic age40, property100000, debt50000, rentalMortgage balance50000 annual6000. Start housing-review → Move into property currently let | Rebuilding housing dropped mortgage metadata while total debt remained. Preserve secured balance/payment, remove rental flag, test next principal payment and unchanged net worth | reliability: reoccupying home. Red confirmed; fix awaits CI |
| OL-003 / High | End-of-life effects once. Seed2218 GB age40, insurance on, will present. finish twice | Asset wrapper paid insurance before checking finished state. Second call added 46400 again and altered ending history. Guard before all side effects | reliability: finish twice. Red confirmed; fix awaits CI |
| OL-004 / Medium | Same seed must have portable agenda ordering | Random comparator passed to sort; engine-dependent comparator calls. Reuse extracted Fisher–Yates in engine/rules.js and clock.js | reliability: seeded permutation; save-replay. Old baseline lacked shuffle; integration awaits CI |
| OL-005 / Critical | Resolved decisions must update used/cooldown; restored pending ID must not replay a reward | Monthly and older annual implementations diverged. Integrated b31a7af records successful choice and rechecks shared eligibility | contracts cooldown/replay and simulation. Existing branch pass is historical, integrated CI pending |
| OL-006 / Critical | Newborn may have school access, not attendance. School-entry choice at six decides enrolment | One school boolean represented both. Integrated explicit schoolAccess and migration plus attendance checks | contracts newborn/school-entry, registry-sweep; integrated CI pending |
| OL-007 / Critical | Invalid/stale commands do not change funds/history/RNG | Baseline trusted pending ID/options. Integrated guarded eligibility and rollback | contracts stale choices/failed commands; integrated CI pending |
| OL-008 / High | Load/import/replay share a versioned boundary and reject future versions | Several inconsistent ensure chains. Integrated clone-based migrateLife and UI load paths | contracts migration + eight save-replay round trips; private export not tested |
| TEST-001 / Test defect | JSON round trip should preserve content; VM objects need not share host prototypes | New save assertion compared VM object prototypes using deepStrictEqual. Replaced with exact serialised state/source immutability assertion; no fields ignored | Documented correction; rerun required |
| CI-001 / Unknown | Earlier quality branch browser runner should report the actual failed check | Chrome dump-dom/virtual-time run failed without visible diagnostic. Retain every browser assertion and run it under Playwright with an explicit wait and captured result | browser-smoke legacy runner; investigate returned failure if any |

TEST-002: The mortgage regression's synthetic record omitted the production mortgage fields rate and years. The transition fix preserved the mortgage, but the subsequent annual payment correctly exposed NaN from that malformed fixture. Add rate:.05 and years:20, matching planOffers' real mortgage creation. Preserve every conservation and next-payment assertion. Integration run 39492106969 otherwise passed 30/31 reported Node tests; static build passed. This is a fixture correction, not a weakened balance requirement.

OL-009 / High: new contacts created after the annual update retained job '—' until a later ensure pass. Seed3487 BE age70 month7, local-group choice, new friend age62. Initialise adult career/retirement at the existing person-creation boundary; preserve identity/history. Regression: immediate adult contacts.

OL-010 / High: default overseas destination was GB only when the current country was not GB; GB starts/arrivals therefore produced undefined.ppp. Seed38357 GB age25 and additional migrated lives. Always choose a supported foreign default and reject a selected current country. Regression enumerates all 129 origins.

OL-011 / High: overseas study was omitted from several domestic-only workload predicates, and intentions were checked only when starting. Seeds61181 LA/business and103025 LT/seafaring commit full-time work after the overseas course began. Reuse fullTimeStudy for offers/settlement and shared routeConflict at preparation, delivery and choice; present a recorded exit if circumstances changed. New regressions preserve quoted part-time pay and cancel a stale prepared work route.

TEST-003: retained browser runner reused the previous iframe DOM because its load wait returned as soon as the old page still had a brand element. Await the new iframe load event before querying. Keep every original gameplay/funding assertion. The original failed funding assertion is retained and must pass against the actual new document.

OL-012 / High: seed128702 CM, school exam preparation followed by service, delivered choose-degree-subject while institutional eligibility rejected all resolution. Revalidate institutional obligations at route continuation and exit the earlier intention; keep service's own completion route available. Regression: institutional service invalidates older study preparation.

OL-013 / High: a professional-training enquiry could reach selection after the player left the eligible profession; dereferencing careerTrack(job).id then failed. Revalidate initial consider-stage prerequisites before offering its action; preserve history via a recorded changed-circumstances exit. Regression: professional preparation after job change.

CI-001 remains under investigation: awaiting an iframe load event alone did not resolve the retained browser funding check. Added actual saved ID/pending route/parent budget/choice diagnostics. No funding assertion has been removed or relaxed.
