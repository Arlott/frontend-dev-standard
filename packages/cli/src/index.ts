#!/usr/bin/env node
import { program } from 'commander';
import { initCommand } from './commands/init';

program
  .name('fds')
  .description('Frontend Dev Standard CLI')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize frontend-dev-standard in your project')
  .option('-t, --template <template>', 'Project template (react|vue|node)', 'node')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(initCommand);

program.parse();
