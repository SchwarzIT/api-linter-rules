/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    // https://github.com/stoplightio/spectral/issues/2002
    "^nimma/fallbacks$": "<rootDir>/node_modules/nimma/dist/cjs/fallbacks/index.js",
    "^nimma/legacy$": "<rootDir>/node_modules/nimma/dist/legacy/cjs/index.js",
  },
};

module.exports = config;
