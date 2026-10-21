# Other Lives — authoritative development policy

This policy supersedes older overlapping development protocols. Explicit user instructions take precedence. Detailed specifications, architecture and procedures belong in the linked documents below.

## Permanent priorities
1. **User experience and reference fidelity:** preserve the flow, pacing, decisions, intuitiveness and simplicity of 1 in 8 Billion.
2. **Simulation coherence:** circumstances, people, opportunities, choices and consequences must interact logically and persist throughout a life.
3. **Complete features:** major updates deliver coherent improvements to a relevant gameplay system, with its essential mechanics and main scenarios integrated.
4. **Systemic bug fixing:** investigate the reported root cause within the affected system and fix confirmed related instances.
5. **Efficient development:** preserve working functionality; avoid unnecessary rewrites, audits, research, dependencies and repeated checks.

## Product requirements
Keep chronological, text-driven life progression, meaningful occasional choices, automatic playback and simple optional inspection. Chance and circumstances outside the player's control must continue to matter. Simulation depth belongs beneath the interface; preserve the established modern UI and restrained static pixel art, without RPG exploration, compulsory micromanagement or unrelated mechanics.

**Exclude reflection prompts, note-entry screens, reflection toggles and special reflection pauses.** Ordinary memories and the existing Rest focus remain. Independently implement the reference experience; distinguish verified behaviour from assumptions and never copy proprietary code, artwork or substantial prose.

## Scope and implementation
Choose work for a noticeable player benefit: natural flow, engaging and varied events, meaningful choices, intuitive interactions or a believable life history. Deeper realism and data precision are optional unless a gap harms that experience or causes a confirmed inconsistency. Do not turn possible refinements into a mandatory multi-release programme. Feature completeness means the essential behaviour of the selected scope works together; it does not require modelling every aspect of life. Prefer focused playtesting and reported friction to speculative expansion.

For a bug, inspect the affected implementation and dependencies, reproduce the problem, correct its shared cause where practical, and check affected regressions. Do not turn routine fixes into feature overhauls.

For a major feature, define an achievable scope and measurable acceptance criteria, examine consequential interactions, and complete the essential connected behaviour. Preserve meaningful distinctions between related concepts. Completeness does not require every rare case, perfect data or unrelated rewrites. Use shared country rules with reliable inputs and transparent, defensible fallbacks across supported locations.

Follow BACKLOG.md's priority order. Do not silently expand, restart or interrupt an active release; apply policy changes at a safe checkpoint.

## Reliability and release safeguards
Preserve save compatibility, storage formats and established history; use conservative, idempotent migrations when needed. Loading or inspecting a life must not advance or rewrite it. Never invent missing historical facts or commit private backups. Given the same established state, seed and choices, simulation results must reproduce.

Use testing proportionate to risk: targeted checks for small fixes, relevant integration/regression checks for connected changes, and asserted seeded simulations plus critical browser lifecycles for core simulation changes. Reuse existing tests; investigate failures, retain valid assertions and never claim unexecuted checks passed.

Maintain a playable stable release and restorable checkpoints; isolate substantial changes on branches. Release only completed, integrated changes with required build, relevant tests, save compatibility and applicable release gates verified, with no unresolved critical/high defect. Preserve existing CI safeguards. Record limitations and unverified checks honestly.

## Continuity and documentation
At session start, read this policy, release status and relevant recent changes; inspect the working tree and preserve unrelated work. Read other documentation only as needed. Keep change records and completion reports brief; do not recreate audits, matrices or cycle reports for routine updates.

- [GAME_DESIGN.md](GAME_DESIGN.md) and [FIDELITY_MATRIX.md](FIDELITY_MATRIX.md): product requirements and reference evidence.
- [ARCHITECTURE.md](ARCHITECTURE.md): state, system ownership and invariants.
- [TESTING.md](TESTING.md): commands, coverage and release procedures.
- [BUGS.md](BUGS.md): reproducible defects; [BACKLOG.md](BACKLOG.md): ordered development work.
- [RELEASE_STATUS.md](RELEASE_STATUS.md), its linked publication records and [CHANGELOG.md](CHANGELOG.md): verified state, checkpoints, changes and limitations.
