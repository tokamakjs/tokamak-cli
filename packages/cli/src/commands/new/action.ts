import path from 'path';

import chalk from 'chalk';
import execa from 'execa';
import figures from 'figures';
import fs from 'fs-extra';

import { logLine } from '../../utils';
import { createFiles } from './template';

const DEPENDENCIES = [
  '@babel/runtime',
  '@emotion/css',
  '@tokamakjs/cli',
  '@tokamakjs/common',
  '@tokamakjs/react',
  'class-transformer',
  'graphql',
  'modern-normalize',
  'react-dom@17',
  'react@17',
  'zod@next',
];

const DEV_DEPENDENCIES = [
  '@babel/core',
  '@babel/preset-env@7',
  '@babel/preset-react@7',
  '@emotion/babel-plugin',
  '@types/react-dom@17',
  '@types/react@17',
  'import-sort-style-local',
  'prettier-plugin-import-sort',
  'prettier',
  'prettier',
  'rimraf',
  'typescript',
];

const CONFLICTING_FILES = ['package.json'];

async function _checkCanCreate(cwd: string): Promise<boolean> {
  await fs.ensureDir(cwd);
  const files = await fs.readdir(cwd);
  return files.every((f) => !CONFLICTING_FILES.includes(f));
}

async function _install(cwd: string, deps: Array<string>, dev: boolean): Promise<void> {
  await execa(
    'npm',
    ['install', dev ? '--save-dev' : '--save', '--save-exact', '--loglevel', 'error', ...deps],
    { stdio: 'inherit', cwd },
  );
}

export async function newAction(name: string) {
  const outputDir = path.resolve(process.cwd(), name);

  if (!(await _checkCanCreate(outputDir))) {
    logLine(
      chalk.red(
        'The target directory seems to contain a project already. Try using a different name or removing the folder first.',
      ),
    );
    process.exit(1);
  }

  const tick = chalk.green(figures.tick);
  const pointer = chalk.green(figures.pointer);

  logLine(
    pointer,
    chalk.bold(`Creating a new ${chalk.blue('Tokamak')} app in ${chalk.cyan(outputDir)}...`),
  );

  logLine(pointer, chalk.bold('Copying files into destination...'));
  await createFiles(outputDir, { name });

  logLine(pointer, chalk.bold('Installing dependencies...'));
  await _install(outputDir, DEPENDENCIES, false);

  logLine(pointer, chalk.bold('Installing devDependencies...'));
  await _install(outputDir, DEV_DEPENDENCIES, true);

  logLine();
  logLine(
    tick,
    chalk.bold(`App created ${chalk.green('succesfully')} in ${chalk.cyan(outputDir)}`),
  );
  logLine();
  logLine(`Inside the newly created directory, you can run:`);
  logLine();
  logLine(`  - ${chalk.yellow('npm start')}`);
  logLine(chalk.grey(`    Starts the app in development mode.`));
  logLine(`  - ${chalk.yellow('npm run build')}`);
  logLine(chalk.grey(`    Builds the app for deployment.`));
  logLine();
  logLine('Example:');
  logLine();
  logLine(chalk.yellow(`  $ cd ${name}`));
  logLine(chalk.yellow('  $ npm start'));
  logLine();
}
