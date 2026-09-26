const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testPathIgnorePatterns: [
    "<rootDir>/tests/integration/",
    "<rootDir>/tests/security/",
  ],
  testTimeout: 10000,
  maxWorkers: 1,
};
