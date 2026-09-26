const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>/tests/integration", "<rootDir>/tests/security"],
  testTimeout: 30000,
  maxWorkers: 1,
};
