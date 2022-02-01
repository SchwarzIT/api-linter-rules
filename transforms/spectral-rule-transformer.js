const fs = require('fs');
const { migrateRuleset } = require("@stoplight/spectral-ruleset-migrator");

/**
 * @type {import('@jest/transform').AsyncTransformer<string>}
 */
const transformer = {
  processAsync: async (sourceText, sourcePath, options) => {
    console.log(options);
    return migrateRuleset(sourcePath, { fs, format: "esm" });
  },
};

module.exports = transformer;
