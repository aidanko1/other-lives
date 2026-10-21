# Annual transaction, employment and decision continuity

Base:155bc7a. Development branch remains isolated from production main 4072fd4. This stage adds no player controls or event content.

## Acceptance
One ordered, atomic, reproducible and once-per-age annual transition. A failed birthday also restores the clock and can retry. Paused/finished lives receive no annual effects. Preserve existing stage order and authored content. Income/cost/interest/valuation changes must conserve personal value; unsecured repayment must not forgive a protected instalment. Retirement cannot grant work experience; quoted hours/pay persist through education and care. Reading a decision must preserve the live record, and UI clicks must identify the displayed options/route stage. Family intentions must retain their actual participants, and leaving a course must end its enrolment or stipend without awarding a qualification.

## Implementation
engine/annual.js owns runAnnual/completeBirthday and the saved annual receipt. Twelve old passive wrappers become explicit registered preparation/finalization stages; engine/core.js owns the core stage. Before accounting changes,3360 transitions across eight seeded country lives exactly matched base155bc7a, excluding only the new annual receipt metadata.
engine/finance.js owns annual budget conservation, protected/unsecured debt allocation, mortgage principal and monthly instalments. engine/employment.js owns job records, hours changes, restoration and full-time-equivalent experience; course/care/migration/retirement and route callers reuse it.
engine/decisions.js produces a pure serialized decision view with a token; engine/commands.js checks tokens inside rollback and UI submits the displayed token. Route preparation records partner and residence identity. Shared subject checks and cancellation clean up abandoned study/research; conception records the other parent's identity.

## Red regressions and corrections
OL-021: repeated same-age annual calls paid income, aged people and advanced routines again; saved receipt now prevents repetition across reload.
OL-022: late annual/agenda exceptions left finances/history or clock partly advanced; annual and birthday transactions restore complete state.
OL-023: unsecured annual repayment also reduced unrelated active bill balances. Debt classification and allocation now have one owner.
OL-024: pension income incremented yearsWorked/workYears. Employment-year accounting excludes retirement and owns FTE increments.
OL-025: UI index alone could select a different option after state/route changes. Display tokens now reject stale clicks without mutation.
OL-026: child-planning followed whichever current partner existed. Prepared partnership/conception identities now survive separation, death and later relationships.
OL-027: course/research cancellation could leave indefinite overseas enrolment or a doctoral stipend. Explicit cleanup retains history/fees and removes the ended commitment.

New tests first reproduced all six annual failures, two stale-choice failures, and four family/study continuity failures. The existing routine test simulated two years at one age; its progress assertions are retained with a real age increment, and a new exact-state assertion requires the duplicate call to do nothing. No failing gameplay assertion was removed to pass.

## Verification
Local reported62 tests passed before the final small continuation guard refinement; CI at85deb8d passed 62 reported tests, production build and Chromium lifecycle/storage gates, but both full cohorts failed on scheduled-debt prepayment (OL-028). It is not a verified release. The129-country intermediate batch passed; it did not expose this later/background-dependent failure. See ENGINEERING_CYCLE_4.md for correction and new regression. Intermediate batches are not the release gate.

## Remaining work
Property/mortgage identity and transitions are next. Keep aggregate legacy assets explicit; never invent old dwelling or loan history. Complete the live reference comparison and release gates before any stable claim. No merge/deployment in this stage.

## Final integrated verification
Source b87e519fd04fceb489a39c68a67719e0159d8324 passes all eight quality jobs: https://github.com/aidanko1/other-lives/actions/runs/39515340262. 75 reported tests, production build, two complete 1,000-life asserted cohorts and actual Chromium lifecycle/storage/property/pacing checks passed. Earlier pending/failed statuses above are historical and remain visible. RELEASE_STATUS.md records exact limits. No deployment.
