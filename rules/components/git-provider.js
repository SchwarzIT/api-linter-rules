const { simpleGit } = require('simple-git');
const path = require('path');

class GitProvider {
  constructor(workingDir = '.') {
    this.git = simpleGit(workingDir);
  }

  async getPreviousVersion(filePath) {
    try {
      const root = await this.git.revparse(['--show-toplevel']);
      const absoluteFilePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
      const relativeFilePath = path.relative(root, absoluteFilePath);
      const log = await this.git.log({ file: relativeFilePath });
      if (log.total <= 1) return null;
      const content = await this.git.show([`HEAD^:${relativeFilePath}`]);
      return content;
    } catch (error) {
      console.error(`Error fetching previous version of ${filePath}:`, error);
      return null;
    }
  }
}

module.exports = { GitProvider };
