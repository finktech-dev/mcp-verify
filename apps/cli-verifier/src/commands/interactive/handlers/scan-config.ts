/**
 * Copyright (c) 2026 FinkTech
 *
 * This file is part of MCP Verify.
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import chalk from "chalk";
import { t } from "@finktech/shared";
import { runScanConfigAction } from "../../scan-config";
import { ShellParser } from "../parser";

export async function handleScanConfig(args: string[]): Promise<void> {
  const flags = ShellParser.extractFlags(args);
  const positionals = ShellParser.extractPositionals(args);
  const configPath = positionals[0];
  const scanAll = flags.all === true;

  if (!scanAll && !configPath) {
    console.log(chalk.yellow(t("scan_config_usage")));
    return;
  }

  await runScanConfigAction(configPath ?? "", {
    all: scanAll,
    quiet: flags.quiet === true,
  });
}
