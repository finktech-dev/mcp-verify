/**
 * Copyright (c) 2026 FinkTech
 *
 * This file is part of MCP Verify.
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "../..");
const distDirectory = path.join(projectRoot, "dist");

if (fs.existsSync(distDirectory)) {
  fs.rmSync(distDirectory, { recursive: true, force: true, maxRetries: 3 });
}

fs.mkdirSync(distDirectory, { recursive: true });
