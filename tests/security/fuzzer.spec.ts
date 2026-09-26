/**
 * Copyright (c) 2026 FinkTech
 *
 * This file is part of MCP Verify.
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

import fs from "node:fs";
import path from "node:path";

import { runFuzzAction } from "../../apps/cli-verifier/src/commands/fuzz";

interface RecordedFinding {
  detectorId: string;
  severity: string;
  remediation?: string;
}

interface RecordedSession {
  id: string;
  payloadsExecuted: number;
  vulnerabilities: RecordedFinding[];
  feedbackStats: {
    interestingResponsesFound: number;
    mutationsInjected: number;
    mutationRoundsCompleted: number;
  };
}

function isRecordedSession(value: unknown): value is RecordedSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Record<string, unknown>;
  return (
    typeof session.id === "string" &&
    typeof session.payloadsExecuted === "number" &&
    Array.isArray(session.vulnerabilities) &&
    !!session.feedbackStats &&
    typeof session.feedbackStats === "object"
  );
}

function readRawSession(reportDirectory: string): RecordedSession {
  const date = new Date().toISOString().split("T")[0];
  const rawDirectory = path.join(
    reportDirectory,
    date,
    "validate",
    "raw",
    "en",
  );
  const reportPath = fs
    .readdirSync(rawDirectory)
    .filter(
      (entry) => entry.startsWith("fuzz-") && entry.endsWith("-session.json"),
    )
    .sort()
    .at(-1);

  expect(reportPath).toBeDefined();

  const parsed: unknown = JSON.parse(
    fs.readFileSync(path.join(rawDirectory, reportPath!), "utf8"),
  );
  if (!isRecordedSession(parsed)) {
    throw new Error("Fuzz raw session did not match the expected schema");
  }

  return parsed;
}

describe("Fuzzer prompt-injection scenario", () => {
  const reportDirectory = path.resolve(
    __dirname,
    "../__test-reports__/fuzzer-prompt-injection",
  );
  const fixturePath = path.resolve(
    __dirname,
    "../fixtures/vulnerable_servers/fuzzable-server.js",
  );

  afterAll(async () => {
    fs.rmSync(reportDirectory, { recursive: true, force: true });
  });

  it("records an inspectable prompt-injection finding and feedback statistics", async () => {
    await runFuzzAction(`node "${fixturePath}"`, {
      tool: "generate_response",
      generators: "prompt-injection",
      detectors: "prompt-leak,jailbreak",
      output: reportDirectory,
      format: "json",
      verbose: true,
      concurrency: "1",
      timeout: "1000",
      stopOnFirst: true,
    });

    const session = readRawSession(reportDirectory);
    const finding = session.vulnerabilities.find(
      (candidate) =>
        candidate.detectorId === "prompt-leak" ||
        candidate.detectorId === "jailbreak",
    );

    expect(session.id).not.toHaveLength(0);
    expect(session.payloadsExecuted).toBeGreaterThan(0);
    expect(finding).toBeDefined();
    expect(finding?.severity).toMatch(/high|critical|medium/i);
    expect(finding?.remediation).toEqual(expect.any(String));
    expect(session.feedbackStats).toMatchObject({
      interestingResponsesFound: expect.any(Number),
      mutationsInjected: expect.any(Number),
      mutationRoundsCompleted: expect.any(Number),
    });
  }, 30_000);
});
