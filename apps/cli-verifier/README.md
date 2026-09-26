# MCP Verify CLI

The CLI is the active MCP Verify product surface. It provides a one-shot
command interface and an interactive shell for the same validation workflows.
It does not certify a target as secure or ready for production.

## Public commands

```bash
mcp-verify validate <target>
mcp-verify scan-config <path>
mcp-verify scan-config --all
mcp-verify doctor [target]
mcp-verify mock
mcp-verify init
```

Use `mcp-verify <command> --help` to inspect the options available in the
installed version. Run `mcp-verify` without a command to open the interactive
shell.

The shell retains local session helpers such as `target`, `history`, `config`,
and `lang`; it does not expose commands outside this public product scope.

## Development

```bash
npm run type-check
npm run lint
npm run build
npm run test:release-smoke
```

See the repository [command reference](../../COMMANDS.md) and
[deferred command record](../../docs/DEFERRED_CLI_COMMANDS.md) for the public
boundary and the source retained for later reassessment.
