# CLI command reference

This is the current public command surface for MCP Verify 1.0.x. Run
`mcp-verify <command> --help` for the options implemented by the installed
version.

## `validate <target>`

Runs the configured validation checks against an MCP target. It can produce
reports and return a non-zero exit code when findings or execution errors
require review. It does not certify a target as secure or ready for production.

```bash
mcp-verify validate "node server.js"
```

## `scan-config <path>`

Scans one MCP-related configuration file before execution. Use `--all` to
scan the supported project-local configuration locations.

```bash
mcp-verify scan-config .mcp.json
mcp-verify scan-config --all
```

## `doctor [target]`

Prints environment and optional target diagnostics.

```bash
mcp-verify doctor
mcp-verify doctor "node server.js"
```

## `mock`

Starts a local mock MCP server for development and testing.

```bash
mcp-verify mock --port 3000
```

## `init`

Creates the project configuration scaffold.

```bash
mcp-verify init
```

## Interactive shell

Run `mcp-verify` with no command. The shell provides the same validation
actions plus local session helpers such as `target`, `history`, `config`, and
`lang`.

## Deferred commands

Some historical command implementations remain in source but are not exposed
by the executable or interactive shell. See
[Deferred CLI commands](docs/DEFERRED_CLI_COMMANDS.md) for what each one did,
why it is hidden, and the criteria for restoring it.
