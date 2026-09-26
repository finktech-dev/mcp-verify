# ADR-0001: Use a single integration branch and scoped agent instructions

- Status: accepted
- Date: 2026-09-26
- Owner: @FinkTech
- Review trigger: more than one maintainer needs a staged release workflow that
  cannot be represented with short-lived branches and release evidence.

## Context

The repository contained conflicting branch instructions: Git Flow with a
permanent `develop` branch, and a newer single-branch workflow. It also used
large, overlapping `AGENTS.md` files as public documentation, creating stale
feature counts and inconsistent rules for coding agents.

## Decision

Use `main` as the only long-lived integration branch. Create short-lived
`<type>/<short-description>` branches and merge coherent, reviewed pull
requests into `main`. Keep `AGENTS.md` files scoped to agent-only engineering
context; keep public product documentation in READMEs and `docs/`.

## Consequences

`docs/GOVERNANCE.md` is the source of truth for branches, commits, and pull
requests. `docs/BRANCHING.md` is a compatibility redirect, not a second
workflow. Documentation must avoid unverified counts and release claims.

## Evidence and follow-up

Before enabling a different workflow, document the concrete release need and
the checks that enforce it.
