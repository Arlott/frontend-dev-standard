import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

export async function generateCommitlintConfig(config: ProjectConfig): Promise<void> {
  const { cwd } = config;
  const filePath = path.join(cwd, 'commitlint.config.js');

  if (await fs.pathExists(filePath)) {
    console.log(pc.yellow(`  ⚠ Skipping commitlint.config.js (already exists)`));
    return;
  }

  const content = `module.exports = {
  extends: ['@fds/commitlint-config'],
};
`;

  await fs.writeFile(filePath, content, 'utf-8');
  console.log(pc.green(`  ✔ Created commitlint.config.js`));
}
