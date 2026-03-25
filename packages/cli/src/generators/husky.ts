import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

export async function generateHuskyConfig(config: ProjectConfig): Promise<void> {
  const { cwd, template } = config;

  // Update or create package.json to add lint-staged config
  const pkgPath = path.join(cwd, 'package.json');
  let pkg: Record<string, unknown> = {};

  if (await fs.pathExists(pkgPath)) {
    pkg = await fs.readJson(pkgPath);
  }

  // Add prepare script for husky
  const scripts = (pkg['scripts'] as Record<string, string>) || {};
  if (!scripts['prepare']) {
    scripts['prepare'] = 'husky install';
    pkg['scripts'] = scripts;
  }

  // Add lint-staged config
  if (!pkg['lint-staged']) {
    const lintStagedConfig: Record<string, string[]> = {
      '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
      '*.{json,md,yaml,yml}': ['prettier --write'],
    };

    if (template !== 'node') {
      lintStagedConfig['*.{css,scss,less}'] = ['stylelint --fix', 'prettier --write'];
    }

    pkg['lint-staged'] = lintStagedConfig;
  }

  await fs.writeJson(pkgPath, pkg, { spaces: 2 });
  console.log(pc.green(`  ✔ Updated package.json (husky + lint-staged config)`));

  // Create .husky/pre-commit
  const huskyDir = path.join(cwd, '.husky');
  await fs.ensureDir(huskyDir);

  const preCommitPath = path.join(huskyDir, 'pre-commit');
  if (!(await fs.pathExists(preCommitPath))) {
    await fs.writeFile(
      preCommitPath,
      `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`,
      'utf-8',
    );
    await fs.chmod(preCommitPath, '755');
    console.log(pc.green(`  ✔ Created .husky/pre-commit`));
  }

  // Create .husky/commit-msg
  const commitMsgPath = path.join(huskyDir, 'commit-msg');
  if (!(await fs.pathExists(commitMsgPath))) {
    await fs.writeFile(
      commitMsgPath,
      `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit \${1}
`,
      'utf-8',
    );
    await fs.chmod(commitMsgPath, '755');
    console.log(pc.green(`  ✔ Created .husky/commit-msg`));
  }
}
