/**
 * Copyright (c) 2026 FinkTech
 *
 * This file is part of MCP Verify.
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { SmartLauncher } from "./smart-launcher";

describe("SmartLauncher", () => {
  const temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "mcp-verify-launcher-"),
  );

  afterAll(() => {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it("runs TypeScript targets without workspace-wide type checking", () => {
    const target = path.join(temporaryDirectory, "server.ts");
    fs.writeFileSync(target, "export {};\n");

    expect(SmartLauncher.detect(target)).toEqual({
      command: "npx",
      args: ["ts-node", "--transpile-only", target],
    });
  });
});
