import path from 'path';
import fs from 'fs-extra';
import pc from 'picocolors';
import prompts from 'prompts';
import { generateEslintConfig } from '../generators/eslint';
import { generatePrettierConfig } from '../generators/prettier';
import { generateStylelintConfig } from '../generators/stylelint';
import { generateCommitlintConfig } from '../generators/commitlint';
import { generateTsConfig } from '../generators/tsconfig';
import { generateEditorConfig } from '../generators/editorconfig';
import { generateHuskyConfig } from '../generators/husky';
import { installDependencies } from '../utils/install';

export interface InitOptions {
  template: 'react' | 'vue' | 'node';
  yes?: boolean;
}

export interface ProjectConfig {
  template: 'react' | 'vue' | 'node';
  features: string[];
  cwd: string;
}

export async function initCommand(options: InitOptions): Promise<void> {
  const cwd = process.cwd();

  console.log(pc.cyan('\n🚀 frontend-dev-standard init\n'));

  let config: ProjectConfig;

  if (options.yes) {
    config = {
      template: options.template,
      features: ['eslint', 'prettier', 'stylelint', 'commitlint', 'tsconfig', 'editorconfig', 'husky'],
      cwd,
    };
  } else {
    const answers = await prompts([
      {
        type: 'select',
        name: 'template',
        message: 'Select project template:',
        choices: [
          { title: 'React', value: 'react' },
          { title: 'Vue', value: 'vue' },
          { title: 'Node.js', value: 'node' },
        ],
        initial: options.template === 'react' ? 0 : options.template === 'vue' ? 1 : 2,
      },
      {
        type: 'multiselect',
        name: 'features',
        message: 'Select features to install:',
        choices: [
          { title: 'ESLint', value: 'eslint', selected: true },
          { title: 'Prettier', value: 'prettier', selected: true },
          { title: 'Stylelint', value: 'stylelint', selected: true },
          { title: 'Commitlint', value: 'commitlint', selected: true },
          { title: 'TypeScript config', value: 'tsconfig', selected: true },
          { title: 'EditorConfig', value: 'editorconfig', selected: true },
          { title: 'Husky + lint-staged', value: 'husky', selected: true },
        ],
      },
    ]);

    if (!answers.template) {
      console.log(pc.yellow('\nAborted.'));
      process.exit(0);
    }

    config = {
      template: answers.template,
      features: answers.features || [],
      cwd,
    };
  }

  console.log(pc.green(`\n📦 Setting up ${config.template} project...\n`));

  const generators: Array<() => Promise<void>> = [];

  if (config.features.includes('editorconfig')) {
    generators.push(() => generateEditorConfig(config));
  }
  if (config.features.includes('prettier')) {
    generators.push(() => generatePrettierConfig(config));
  }
  if (config.features.includes('eslint')) {
    generators.push(() => generateEslintConfig(config));
  }
  if (config.features.includes('stylelint') && config.template !== 'node') {
    generators.push(() => generateStylelintConfig(config));
  }
  if (config.features.includes('commitlint')) {
    generators.push(() => generateCommitlintConfig(config));
  }
  if (config.features.includes('tsconfig')) {
    generators.push(() => generateTsConfig(config));
  }
  if (config.features.includes('husky')) {
    generators.push(() => generateHuskyConfig(config));
  }

  for (const gen of generators) {
    await gen();
  }

  await installDependencies(config);

  console.log(pc.green('\n✅ Done! Your project is set up with frontend-dev-standard.\n'));
  console.log(pc.gray('Run the following to get started:'));
  console.log(pc.cyan('  pnpm install'));
  console.log();
}
