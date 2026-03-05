const semver = require('semver');
const YAML = require('yaml');

class CompatibilityChecker {
  async isBackwardsCompatible(oldRaw, newRaw) {
    const oldSchema = this.parse(oldRaw);
    const newSchema = this.parse(newRaw);
    if (!oldSchema || !newSchema) return true;

    const oldVersion = this.getVersion(oldSchema);
    const newVersion = this.getVersion(newSchema);

    if (oldVersion && newVersion) {
      const oldParsed = semver.coerce(oldVersion);
      const newParsed = semver.coerce(newVersion);
      if (oldParsed && newParsed && semver.gt(newParsed, oldParsed)) return true;
    }

    return this.checkStructuralCompatibility(oldSchema, newSchema);
  }

  parse(raw) {
    try {
      return YAML.parse(raw);
    } catch {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  }

  getVersion(schema) {
    return schema?.info?.version || null;
  }

  checkStructuralCompatibility(oldSchema, newSchema) {
    const oldPaths = oldSchema.paths || {};
    const newPaths = newSchema.paths || {};
    for (const pathKey of Object.keys(oldPaths)) {
      if (!newPaths[pathKey]) {
        console.warn(`Breaking change: Path ${pathKey} was removed.`);
        return false;
      }
      const oldMethods = oldPaths[pathKey];
      const newMethods = newPaths[pathKey];
      const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
      for (const method of methods) {
        if (oldMethods[method] && !newMethods[method]) {
          console.warn(`Breaking change: Method ${method} was removed from path ${pathKey}.`);
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = { CompatibilityChecker };
