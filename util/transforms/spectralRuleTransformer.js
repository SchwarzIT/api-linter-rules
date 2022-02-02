const fs = require('fs');
const { migrateRuleset } = require("@stoplight/spectral-ruleset-migrator");

/**
 * @type {import('@jest/transform').AsyncTransformer<string>}
 * 
 * A custom transformer migrating all imported .yml | .yaml files to spectral rulesets.
 * That way the yaml rules can easily be imported and used in tests.
 */
const transformer = {
  processAsync: async (sourceText, sourcePath, options) => {
    return migrateRuleset(sourcePath, { fs, format: "esm" });
  },
};

module.exports = transformer;
