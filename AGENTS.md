# MCP Verify agent instructions

## Scope and loading order

These instructions apply to the repository. Before editing a package, read its
nearest `AGENTS.md`; nested instructions add to this file. Load only the
context needed for the paths you will change.

`AGENTS.md` is for coding agents and AI-assisted work. User-facing product
documentation belongs in `README.md`, package READMEs, or `docs/`.

## Required engineering rules

- Keep TypeScript strict. Do not introduce `any`; accept `unknown` at
  boundaries and narrow it with type guards or schemas.
- Route every user-facing string through the i18n layer.
- Read a file before editing it. Preserve unrelated local changes.
- Use atomic writes for persistent files: write a sibling temporary file, then
  rename it.
- Bound asynchronous work with an explicit timeout and cleanup path.
- Use package names for cross-workspace imports, relative imports inside a
  package, and `import type` for type-only imports.
- Do not claim that a check, score, or local test proves security or production
  readiness.

## Repository map

| Area                                    | Read before changing it                           |
| --------------------------------------- | ------------------------------------------------- |
| Applications                            | `apps/AGENTS.md`, then the application-level file |
| Libraries                               | `libs/AGENTS.md`, then the library-level file     |
| Test fixtures and scenarios             | `TESTING.md` and the closest test conventions     |
| Release, PR, branch, or commit workflow | `docs/GOVERNANCE.md` and `docs/RELEASING.md`      |
| Product scope and support state         | `docs/PRODUCT_STATUS.md`                          |

## Commands

Run the narrowest relevant command first. The default test command is the
serial unit lane; it is not a release check.

```bash
npm run type-check
npm run lint
npm test
npm run test:security
npm run test:scenario
npm run test:release-smoke # after npm run build
```

Before committing, run the checks appropriate to the changed surface and state
what was not run. See `TESTING.md` for lane definitions.

## Working conventions

- Branch from `main` using `<type>/<short-description>`.
- Keep a PR focused. Describe scope, risk, validation performed, and validation
  not performed.
- Add a regression test when fixing an observable defect, using the narrowest
  test tier that can express it.
- Update the canonical document when behavior, commands, compatibility, or
  release requirements change.
