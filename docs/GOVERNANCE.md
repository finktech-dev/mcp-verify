# Repository Governance

## Purpose

This document defines the workflow for changes in MCP Verify. It applies to the CLI verifier, MCP server, VS Code extension, and shared libraries. A passing local command is evidence about code only; it is not production validation.

## Public language

- Describe observed behavior, scope, and validation evidence; avoid unqualified claims such as "enterprise-grade", "production-ready", "safe to deploy", or "complete coverage".
- A rule, score, passing test, or CI run is an input to review, not a security certification or deployment approval.
- Preserve technical category names when they identify implemented rules, but do not turn them into marketing claims.

## Branches

- `main` is the only long-lived branch and represents the reviewed integration line.
- Create short-lived branches from current `main` using `<type>/<short-description>`.
- Use one of: `feat`, `fix`, `docs`, `test`, `chore`, `refactor`, or `security` for `<type>`.
- Do not use a permanent `develop` branch. Keep unrelated work in separate branches and pull requests.

## Commits

- Keep each commit focused on one independently reviewable change.
- Do not commit generated output, credentials, local editor state, or test artifacts unless the change explicitly requires a reviewed fixture.
- Include tests with the behavior they protect; do not mix formatting churn with functional changes.

## Pull Requests

- Open a pull request against `main` only when the branch has a coherent, reviewable goal.
- Describe the affected product, risk, validation performed, and validation not performed.
- Link related issues or decisions. Call out any security-rule, protocol, packaging, or release impact.
- Require a pull request before merge. Use squash merge for one logical change;
  use rebase merge when independently reviewable commits should remain visible
  in `main`.
- Do not require an approval until there is a second maintainer able to review
  independently. A solo-maintainer ruleset should still require the PR trail
  and passing checks.
- Do not merge a PR merely because CI is green when workflow configuration can suppress failures.

## Fixes and Releases

- Reproduce and scope a defect before changing code. Add a regression test where practical.
- Treat each product as independently releasable: CLI verifier, MCP server, VS Code extension, and libraries have separate packaging and runtime proof.
- Before release, record code checks, package/install validation, and any manual or production evidence separately.
- Never label a change production-ready without the applicable runtime proof.

## Decision Records

- Record durable architecture, protocol, security, or release decisions in
  `docs/decisions/`.
- Follow `docs/decisions/README.md`. A decision record must state context,
  decision, consequences, owner, and review trigger.
