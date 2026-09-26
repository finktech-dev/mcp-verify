# @finktech/mcp-server

Deferred MCP server source for reassessment. It is not published by this
repository and is not a supported release target. See `docs/PRODUCT_STATUS.md`.

## Local development

From the repository root:

```bash
npm run build
node apps/mcp-server/dist/index.js
```

The executable package entry is `mcp-verify-server`. Connect through a local
MCP client only after building, and test against servers you own or are
authorized to assess.

## Boundaries

- Outputs are evidence for review, not a security certification.
- Optional LLM analysis requires user-managed provider credentials.
- Keep standard output reserved for MCP protocol messages; diagnostics belong
  on standard error.

See `AGENTS.md` for implementation context and `SECURITY.md` for product-wide
security limits.
