import pc from 'picocolors';
import type { ProjectConfig } from '../commands/init';

interface DepMap {
  deps: string[];
  devDeps: string[];
}

function getDependencies(config: ProjectConfig): DepMap {
  const { template, features } = config;
  const devDeps: string[] = [];
  const deps: string[] = [];

  if (features.includes('eslint')) {
    devDeps.push('eslint');
    devDeps.push('@typescript-eslint/eslint-plugin');
    devDeps.push('@typescript-eslint/parser');
    if (template === 'react') {
      devDeps.push('@fds/eslint-config-react');
      devDeps.push('eslint-plugin-react');
      devDeps.push('eslint-plugin-react-hooks');
    } else if (template === 'vue') {
      devDeps.push('@fds/eslint-config-vue');
      devDeps.push('eslint-plugin-vue');
      devDeps.push('vue-eslint-parser');
    } else {
      devDeps.push('@fds/eslint-config-base');
    }
  }

  if (features.includes('prettier')) {
    devDeps.push('prettier');
    devDeps.push('@fds/prettier-config');
  }

  if (features.includes('stylelint') && template !== 'node') {
    devDeps.push('stylelint');
    devDeps.push('stylelint-config-standard');
    devDeps.push('@fds/stylelint-config');
  }

  if (features.includes('commitlint')) {
    devDeps.push('@commitlint/cli');
    devDeps.push('@commitlint/config-conventional');
    devDeps.push('@fds/commitlint-config');
  }

  if (features.includes('tsconfig')) {
    devDeps.push('typescript');
    devDeps.push('@fds/tsconfig');
  }

  if (features.includes('husky')) {
    devDeps.push('husky');
    devDeps.push('lint-staged');
  }

  return { deps, devDeps };
}

export async function installDependencies(config: ProjectConfig): Promise<void> {
  const { devDeps } = getDependencies(config);

  if (devDeps.length === 0) return;

  console.log(pc.cyan('\n📋 Dependencies to install:\n'));
  devDeps.forEach((dep) => console.log(pc.gray(`  - ${dep}`)));

  console.log(pc.gray('\nRun the following command to install:'));
  console.log(pc.cyan(`  pnpm add -D ${devDeps.join(' ')}`));
}
