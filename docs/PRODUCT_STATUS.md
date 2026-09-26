# Product status

This is the operational status of the repository's product surfaces. It records
what exists in this checkout, not a support or security certification.

| Product           | Repository evidence                                         | Current state                                                       | Before a release                                                                                               |
| ----------------- | ----------------------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| CLI verifier      | `apps/cli-verifier/` workspace and root bundle              | Active product: `validate`, `scan-config`, `doctor`, `mock`, `init` | Build, unit/security/scenario checks, packed-install check, and a manual command against an authorized fixture |
| MCP server        | `apps/mcp-server/` workspace with an executable entry point | Deferred; source retained and not published                         | Reassess its package, protocol smoke test, configuration instructions, and manual client connection            |
| VS Code extension | `apps/vscode-extension/` workspace                          | Deferred; source retained and not published                         | Reassess extension packaging, activation smoke test, and a manual editor workflow                              |

The former documentation-only dashboard, local API bridge, and Deno sandbox
proof of concept were removed because they were not executable products in this
checkout. Their removal does not remove any maintained release surface.

## Status vocabulary

- **Reassessment candidate**: source exists, but compatibility and release proof
  are incomplete.
- **Active product**: current maintenance priority. This is not a support,
  security, or production-readiness certification.
- **Deferred; source retained**: source remains available but is not a current
  release target.
- **Documentation-only**: a document exists, but no executable product source
  is present in this checkout.
- **Supported**: explicitly declared after the release evidence in
  `docs/RELEASING.md` exists for that product.
- **Archived**: intentionally retained for history and excluded from normal
  release, support, and public product claims.

Update this table whenever a product's source, support level, or release
evidence changes.

The source retained for deferred CLI commands is listed in
`docs/DEFERRED_CLI_COMMANDS.md`; it is not part of the current public surface.
