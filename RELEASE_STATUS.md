# Release status

Date 2026-10-21. **Unreleased / not certified stable.**
Current live restore point: v6.1.0, 4072fd4997992cb7fd6bf78d7f0c9cab41a7379f.
Its Pages workflow passed: https://github.com/aidanko1/other-lives/actions/runs/39457407780.
Newly discovered high/critical defects mean that historical deployment success is not a certification of correctness. Keep this playable restore point until a new release meets its gates.

Engineering branch: engineering/fidelity-reliability-baseline.
Integration also preserves b31a7af from quality/simulation-foundation as an ancestor.
No merge to main, production deployment or stable release is authorised by a green test alone.

| Gate | Current evidence |
|---|---|
| Production packaging | Integration pending |
| Unit/integration/regression | Red reproductions executed on a5b4ed4; integrated rerun pending |
| Save migrations/compatibility | Integrated tests pending; private backup not re-audited |
| 1,000 asserted complete lives | Integrated rerun pending; no passed count claimed yet |
| Browser E2E | Initial baseline smoke passed; extracted-engine and retained legacy checks pending |
| Fidelity/player experience | Official pages checked; hands-on reference, representative pace and decision burden unknown |
| Critical/high defects | Fixes implemented provisionally; validation pending |
| Deployment | Main unchanged; experimental branch not deployed |

Next: execute integration CI, investigate every failure, keep exact revision/run links and update this file. Then consolidate annual settlement and migration/render boundaries behind tests.
