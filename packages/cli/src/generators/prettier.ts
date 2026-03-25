import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

export async function generatePrettierConfig(config: ProjectConfig): Promise<void> {
  const { cwd } = config;
  const filePath = path.join(cwd, '.prettierrc.js');

  if (await fs.pathExists(filePath)) {
    console.log(pc.yellow(`  ⚠ Skipping .prettierrc.js (already exists)`));
    return;
  }

  const content = `module.exports = require('@fds/prettier-config');
`;

  await fs.writeFile(filePath, content, 'utf-8');
  console.log(pc.green(`  ✔ Created .prettierrc.js`));
}
