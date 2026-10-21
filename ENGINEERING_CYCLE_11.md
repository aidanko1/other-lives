# Cycle11 — narrative age eligibility and ending presentation

Base f0f2608; cycle10 exact-source CI running separately. Follow-up playtest review read complete US951 history (natural UI95/44), natural NG2 infant ending and the two Korean professional trajectories KR453465/KR706873. This is qualitative review of real generated text and controls, not proof of user enjoyment or a normal-speed human session.

Acceptance before changes:
- Newborn stories cannot describe independent walking, word repetition, spoon use or toddler block stacking. Correct the definition owner and recheck queued legacy stories at execution, preserving recorded history.
- Retrospective positive memory prefers recorded authored personal narrative over a routine finance ledger. Missing personal history is omitted. No invented happiest year/reflection prompt.
- Render stored currency markers through the existing text/currency formatter; never show internal tokens. Read-only selectors and UI rendering remain pure.
- Keep all existing assertions and add candidate/queued-story, selector and actual UI regressions. Run complete release gates before claiming verified.

Sources: CDC's15-month/18-month milestone descriptions (https://www.cdc.gov/act-early/milestones/15-months.html; https://www.cdc.gov/act-early/milestones-in-action/18-months.html, accessed21October2026) provide a plausibility check, not hard biological cutoffs or clinical advice. The game uses conservative age-one eligibility for these toddler narratives; it does not diagnose delayed development or require the player to manage milestones.

Career observation: US951 stays in a junior supervised medical title for many years. Inspection shows deliberate application/experience gates and optional professional training; this is a pacing/design limitation to investigate, not yet a confirmed licence or qualification bug. Do not silently auto-promote, grant specialty status or invent national training rules. Existing meaningful choices/uncertainty remain.

Implemented: eight definition minimum ages now prevent newborn walking/words/spoon/stacking, pointing through a book, returning to an ant trail, hiding a mitten and asking about food. Food-question narrative starts at 2; other seven at 1. Queued stories revalidate through the existing eligible predicate; original history is unchanged. Affected definitions remain authored content, not removed mechanics. Country-wide tests preserve at least five infant candidates and cover valid later delivery.
The first positive eligibility fixture manually changed an urban birth to rural, causing the normal location initializer to update it. Replaced it with an actual rural GBseed5 birth and retained whole-state invalid-story equality; no assertions weakened. The positive ant-trail case also respects its rural requirement.
Retrospective selection now prefers an authored positive story, excludes routine money ledgers and omits a missing personal memory. UI applies cleanLogText to stored title/description, including currency markers. New real-browser keepsake disclosure asserts formattedGBP/no internal markers while retaining exact export/replay/old-world checks. Targeted eleven tests (including retained infant tests) and the actual comparison/recap UI pass locally. Full final-source gate pending.

Final exact-source verification:3c301436e5f1a4817ec847c717ee575a2d60fcba passes107 tests/build/all 11 jobs at https://github.com/aidanko1/other-lives/actions/runs/39539696089,3000 complete release-cohort lives plus 432 targeted complete rare-path cases. Three browser engines pass newborn/ending/currency and all retained gates. Restore checkpoint/6.2.0-dev.4-narratives-verified. No merge/deployment. The later archive-test stage changes no production code.
