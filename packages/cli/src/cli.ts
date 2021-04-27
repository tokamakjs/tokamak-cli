import chalk from 'chalk';
import { program } from 'commander';

// @ts-ignore
import packageJson from '../package.json';
import { buildCommand } from './commands/build';
import { generateCommand } from './commands/generate';
import { newCommand } from './commands/new';
import { startCommand } from './commands/start';
import { NoProjectFoundError } from './errors';
import { logLine } from './utils';

try {
  program
    .version(packageJson.version)
    .name('tok')
    .usage('<command> [options]')
    .addHelpCommand(false)
    .addCommand(newCommand)
    .addCommand(startCommand)
    .addCommand(buildCommand)
    .addCommand(generateCommand)
    .exitOverride()
    .parse(process.argv);
} catch (err) {
  if (err instanceof NoProjectFoundError) {
    logLine(chalk.red('Could not find a valid tokamak project.'));
  }

  throw err;
}
