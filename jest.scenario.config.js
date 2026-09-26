const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>/tests/integration"],
  testTimeout: 30000,
  maxWorkers: 1,
};
