import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import { camelCase } from 'lodash';

import { createFile, logLine, removeCwd } from '../../../utils';
import { fileExists, findProjectRoot } from '../utils';

const MODULE_TEMPLATE = (name: string) => `import { Module } from '@tokamakjs/react';

@Module({
  providers: [],
  imports: [],
  exports: [],
})
export class ${name}Module {}
`;

function _getClassName(moduleName: string): string {
  return moduleName[0].toUpperCase() + camelCase(moduleName).slice(1);
}

function _getFolderFromName(moduleName: string): string {
  // is a root module
  if (!moduleName.includes('/')) {
    return path.join('src/app/modules', moduleName);
  }

  const modules = moduleName.split('/');
  return path.join('src/app/modules', modules.join('/modules/'));
}

async function generateModuleAction(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const moduleName = name.split('/').slice(-1)[0];
  const moduleFolder = path.join(pRoot, _getFolderFromName(name));
  await fs.ensureDir(moduleFolder);
  const newModuleFile = path.join(moduleFolder, `${moduleName}.module.ts`);

  if (await fileExists(newModuleFile)) {
    logLine(chalk.red(`The new module conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(
    moduleFolder,
    `${moduleName}.module.ts`,
    MODULE_TEMPLATE(_getClassName(moduleName)),
  );

  logLine(`New module created in ${chalk.green(removeCwd(newModuleFile))}.`);
}

export const genModuleCommand = new Command('module')
  .alias('m')
  .description('Creates a new Tokamak module.')
  .arguments('<moduleName>')
  .action(generateModuleAction);
