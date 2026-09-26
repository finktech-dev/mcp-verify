# Releasing MCP Verify

## Purpose

A CLI release is an explicit package publication decision. A green
local check only validates the code path it executed; it does not prove that a
product is safe, secure, or production-ready.

## Release record

For every release, record the product, version, commit, and date in the release
notes or pull request. Record each category separately:

1. **Code checks**: type check, lint, and relevant test lanes.
2. **Artifact checks**: build and package/install validation for the published
   artifact.
3. **Runtime proof**: the smallest manual workflow that exercises the shipped
   product against an authorized fixture or client.
4. **Known limits**: checks not run, platform gaps, and security boundaries.

## Minimum command sequence

Run only the lanes relevant to the product. Start with the narrowest one.

```bash
npm run type-check
npm run lint
npm test
npm run test:security
npm run test:scenario
npm run build
npm run test:release-smoke
```

The root smoke check covers the bundled CLI only. The MCP server and VS Code
extension are deferred and must not be published by the root release workflow.

## Product-specific evidence

| Product           | Artifact evidence                             | Runtime evidence                                       |
| ----------------- | --------------------------------------------- | ------------------------------------------------------ |
| CLI verifier      | `npm pack --dry-run` and an install/use check | One authorized server fixture through the packaged CLI |
| MCP server        | Deferred; no root release artifact            | Reassess before a dedicated release                    |
| VS Code extension | Deferred; no root release artifact            | Reassess before a dedicated release                    |

## Versioning and change notes

Use the manual `Release CLI` workflow only after the version in `package.json`
has been reviewed. Its `publish` input is off by default. Record the package
dry-run and a packaged install/use check in the release PR. Do not publish a
version just because a branch merged; publication requires the evidence above.
