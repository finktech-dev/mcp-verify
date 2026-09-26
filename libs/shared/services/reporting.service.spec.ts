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

import { ReportingService } from "./reporting.service";

describe("ReportingService", () => {
  const temporaryDirectory = fs.mkdtempSync(
    path.join(os.tmpdir(), "mcp-verify-reporting-"),
  );

  afterAll(() => {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it("writes the requested raw session as a separate atomic artifact", async () => {
    const rawSession = {
      id: "session-1",
      vulnerabilities: [],
    };

    const saved = await ReportingService.saveReport(
      { kind: "doctor", data: [] },
      {
        outputDir: temporaryDirectory,
        filenamePrefix: "fuzz-target",
        includeRawSession: true,
        rawSession,
      },
    );

    expect(saved.errors).toEqual([]);
    expect(saved.paths.rawSession).toBeDefined();
    expect(fs.existsSync(saved.paths.rawSession!)).toBe(true);
    expect(
      JSON.parse(fs.readFileSync(saved.paths.rawSession!, "utf8")),
    ).toEqual(rawSession);
    expect(
      fs
        .readdirSync(path.dirname(saved.paths.rawSession!))
        .some((entry) => entry.endsWith(".tmp")),
    ).toBe(false);
  });
});
