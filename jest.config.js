// jest.config.js
export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.cjs"],
  collectCoverageFrom: ["src/**/*.js", "!src/**/index.js"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  transform: {},
  moduleFileExtensions: ["js", "cjs", "mjs"],
};
