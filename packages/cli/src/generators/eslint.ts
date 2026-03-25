import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

export async function generateEslintConfig(config: ProjectConfig): Promise<void> {
  const { template, cwd } = config;

  const configMap: Record<string, string> = {
    react: `module.exports = {
  extends: ['@fds/eslint-config-react'],
};
`,
    vue: `module.exports = {
  extends: ['@fds/eslint-config-vue'],
};
`,
    node: `module.exports = {
  extends: ['@fds/eslint-config-base'],
};
`,
  };

  const content = configMap[template];
  const filePath = path.join(cwd, '.eslintrc.js');

  if (await fs.pathExists(filePath)) {
    console.log(pc.yellow(`  ⚠ Skipping .eslintrc.js (already exists)`));
    return;
  }

  await fs.writeFile(filePath, content, 'utf-8');
  console.log(pc.green(`  ✔ Created .eslintrc.js`));
}
