/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  resolver: "jest-node-exports-resolver",
  transform: {
    "\\.(yml|yaml)$": ["<rootDir>/transforms/spectralRuleTransformer.js"],
  },
  extensionsToTreatAsEsm: [".yml", ".yaml", ".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

module.exports = config;
