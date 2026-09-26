# Interactive shell

The interactive shell is a local interface for the public CLI commands:
`validate`, `scan-config`, `doctor`, `mock`, and `init`. It also contains local
session helpers for target selection, history, configuration, language,
profiles, and contexts.

## Key modules

| Module           | Responsibility                                         |
| ---------------- | ------------------------------------------------------ |
| `parser.ts`      | Tokenization, flags, and output redirection parsing.   |
| `persistence.ts` | Atomic history, session, and redirected-output writes. |
| `session.ts`     | In-memory workspace state and secret redaction.        |
| `completer.ts`   | Command, flag, and path completion for readline.       |
| `router.ts`      | Routes parsed input to supported handlers.             |
| `handlers/`      | Small adapters from shell input to command actions.    |
| `index.ts`       | Readline lifecycle and shell startup.                  |

## Public-surface rule

Register a new action only when it is registered in `src/bin/index.ts`, routed
here, completed by `completer.ts`, described by `help-data.ts`, documented in
`COMMANDS.md`, and covered by an appropriate regression test.

Historical handlers may remain under `handlers/` without being imported by the
router. Those commands are intentionally deferred; see
`docs/DEFERRED_CLI_COMMANDS.md` before restoring one.
