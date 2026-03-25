import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

export async function generateStylelintConfig(config: ProjectConfig): Promise<void> {
  const { cwd } = config;
  const filePath = path.join(cwd, '.stylelintrc.js');

  if (await fs.pathExists(filePath)) {
    console.log(pc.yellow(`  ⚠ Skipping .stylelintrc.js (already exists)`));
    return;
  }

  const content = `module.exports = {
  extends: ['@fds/stylelint-config'],
};
`;

  await fs.writeFile(filePath, content, 'utf-8');
  console.log(pc.green(`  ✔ Created .stylelintrc.js`));
}
