export default async (input, options, paths, otherValues) => {
  const path = require('path');
  const { simpleGit } = require('simple-git');
  const semver = require('semver');
  const YAML = require('yaml');

  const document = otherValues?.document;
  const filePath = document?.source;
  if (!filePath) return [];

  // 1. Fetch previous version from Git
  let previousRaw = null;
  try {
    const git = simpleGit(process.cwd());
    const root = await git.revparse(['--show-toplevel']);
    const absoluteFilePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    const relativeFilePath = path.relative(root, absoluteFilePath);
    const log = await git.log({ file: relativeFilePath });
    if (log && log.total > 1) {
      previousRaw = await git.show([`HEAD^:${relativeFilePath}`]);
    }
  } catch (error) {
    // console.error(`Error fetching previous version of ${filePath}:`, error);
  }

  if (!previousRaw) return [];

  // 2. Parse schemas
  const parse = (raw) => {
    try {
      return YAML.parse(raw);
    } catch {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
  };

  const oldSchema = parse(previousRaw);
  const newSchema = input;

  if (!oldSchema || !newSchema) return [{ message: "DEBUG: parse failed" }];

  // 3. Check for minor version bump
  const oldVersion = oldSchema?.info?.version;
  const newVersion = newSchema?.info?.version;

  if (oldVersion && newVersion) {
    const oldParsed = semver.coerce(oldVersion);
    const newParsed = semver.coerce(newVersion);
    if (oldParsed && newParsed && semver.gt(newParsed, oldParsed)) {
      return [];
    }
  }

  // 4. Check for breaking structural changes
  const oldPaths = oldSchema.paths || {};
  const newPaths = newSchema.paths || {};
  
  return [{ message: `DEBUG: oldPaths=${Object.keys(oldPaths).join(',')} newPaths=${Object.keys(newPaths).join(',')}` }];

  for (const pathKey of Object.keys(oldPaths)) {
    if (!newPaths[pathKey]) {
      return [{ message: `Breaking change: Path ${pathKey} was removed.` }];
    }
    const oldMethods = oldPaths[pathKey];
    const newMethods = newPaths[pathKey];
    const methods = ['get', 'post', 'put', 'delete', 'patch', 'options', 'head'];
    for (const method of methods) {
      if (oldMethods[method] && !newMethods[method]) {
        return [{ message: `Breaking change: Method ${method} was removed from path ${pathKey}.` }];
      }
    }
  }

  return [];
};
