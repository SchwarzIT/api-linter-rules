/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  resolver: "./custom-resolver.ts",
  transform: {
    "\\.(yml|yaml)$": ["<rootDir>/transforms/spectral-rule-transformer.js"],
  },
  //moduleFileExtensions: ["yml", "yaml", "js", "ts"],
  extensionsToTreatAsEsm: [".yml", ".ts"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

module.exports = config;
//export default config;
