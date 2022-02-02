/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  resolver: "jest-node-exports-resolver", // Needed since @stoplight/spectral-core uses mapped exports which are not supported by jest v27
  transform: {
    "\\.(yml|yaml)$": ["<rootDir>/util/transforms/spectralRuleTransformer.js"],
  },
  extensionsToTreatAsEsm: [".yml", ".yaml", ".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  setupFilesAfterEnv: ["<rootDir>/util/jest.setup.ts"],
  moduleFileExtensions: ["js", "ts", "yml", "yaml"]
};

module.exports = config;
