# Other Lives v5.6 — researched-country development build

A text-led fictional life simulation about people, circumstances, choices and consequences. **Independent and unaffiliated with *1 in 8 Billion*.** It does not use the reference game's proprietary code, words or art.

### Scope

For new births this branch offers **12 evidence-anchored locations**, rather than the previous 129 shallowly localised profiles: Ghana, Nigeria, Ethiopia, Bangladesh, India, United Kingdom, Iran, United States, Japan, Pakistan, Poland and Hong Kong. Previously saved lives are not deleted.

The game is still a fictional simulation. Fixed 2024 UNICEF under-five mortality benchmarks and World Bank life expectancies are source-anchored, but nearly all wages, personal risk adjustments, school admissions, cultural participation and purchasing power **are modelled and not statistically validated**.

### Improvements

- Country-specific educational pathways, with application, possible admission, multi-year study and credential completion. A separate post-secondary application stage follows documented earlier qualifications: college/degree and advanced vocational paths have costs, funding enquiries, admission decisions, and delayed results.
- Country-specific work options, occupation eligibility rules, existing interests and clear labels for illustrative pay.
- National childhood-mortality and life-expectancy benchmark checks; Hong Kong's first-year reference uses a different dated source.
- Personal memory threads based on a childhood meal and routine route that can return later in life.
- No adult financial decisions for children; no parent names in brackets in the ordinary life record.
- Conflicting legacy education and career decisions disabled for the curated locations.
- Automatic time, persistent decisions, tabs, archive and mobile UI retained.

### Deployment and quality

See [the data and testing audit](AUDIT_V56.md). Automated tests accompany the files. GitHub Pages can deploy the branch if explicitly selected; **GitHub Pages deployment should only be described as live after its Actions job succeeds.**

Save data lives in browser storage and can be exported as JSON. Back up lives before changing branches or browser domains.