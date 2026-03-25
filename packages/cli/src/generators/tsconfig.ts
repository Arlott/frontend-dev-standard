import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

export async function generateTsConfig(config: ProjectConfig): Promise<void> {
  const { template, cwd } = config;

  const extendsMap: Record<string, string> = {
    react: '@fds/tsconfig/react.json',
    vue: '@fds/tsconfig/vue.json',
    node: '@fds/tsconfig/node.json',
  };

  const tsExtends = extendsMap[template] ?? '@fds/tsconfig/browser.json';

  const content =
    JSON.stringify(
      {
        extends: tsExtends,
        include: ['src'],
        exclude: ['node_modules', 'dist'],
      },
      null,
      2,
    ) + '\n';

  const filePath = path.join(cwd, 'tsconfig.json');

  if (await fs.pathExists(filePath)) {
    console.log(pc.yellow(`  ⚠ Skipping tsconfig.json (already exists)`));
    return;
  }

  await fs.writeFile(filePath, content, 'utf-8');
  console.log(pc.green(`  ✔ Created tsconfig.json`));
}
