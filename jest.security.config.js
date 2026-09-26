const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  roots: ["<rootDir>/libs/core/domain/security/rules"],
  testTimeout: 10000,
  maxWorkers: 1,
};
