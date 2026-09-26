const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>/tests/security"],
  testTimeout: 10000,
  maxWorkers: 1,
};
