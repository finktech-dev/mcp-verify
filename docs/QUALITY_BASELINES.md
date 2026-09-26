# Quality baselines

This repository has inherited lint debt. The baseline is explicit so CI can
prevent regressions while the debt is reduced in focused changes.

## ESLint

On 2026-09-26, the full repository lint run reported 922 warnings and no
errors. `npm run lint` uses that number as a ceiling:

- any lint error fails locally and in CI;
- any new warning above the ceiling fails CI;
- a touched TypeScript file is linted with zero warnings by the pre-commit
  hook;
- lower the ceiling in the same pull request whenever warnings are removed.

The ceiling is a migration control, not evidence that the codebase is clean,
secure, or ready for production.
