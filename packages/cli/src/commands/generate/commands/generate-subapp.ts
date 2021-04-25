import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import { camelCase } from 'lodash';

import { createFile, logLine, removeCwd } from '../../../utils';
import { fileExists, findProjectRoot } from '../utils';

const SUB_APP_TEMPLATE = (name: string) => `import { SubApp } from '@tokamakjs/react';

@SubApp({
  routing: [],
  providers: [],
  imports: [],
  exports: [],
})
export class ${name}Module {}
`;

function _getClassName(subAppName: string): string {
  return subAppName[0].toUpperCase() + camelCase(subAppName).slice(1);
}

function _getFolderFromName(subAppName: string): string {
  // is a root module
  if (!subAppName.includes('/')) {
    return path.join('src/app/modules', subAppName);
  }

  const modules = subAppName.split('/');
  return path.join('src/app/modules', modules.join('/modules/'));
}

async function generateSubAppAction(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const subAppName = name.split('/').slice(-1)[0];
  const moduleFolder = path.join(pRoot, _getFolderFromName(name));
  await fs.ensureDir(moduleFolder);
  const newSubAppFile = path.join(moduleFolder, `${subAppName}.module.ts`);

  if (await fileExists(newSubAppFile)) {
    logLine(chalk.red(`The new sub app conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(
    moduleFolder,
    `${subAppName}.module.ts`,
    SUB_APP_TEMPLATE(_getClassName(subAppName)),
  );

  logLine(`New sub app created in ${chalk.green(removeCwd(newSubAppFile))}.`);
}

export const genSubAppCommand = new Command('subapp')
  .alias('s')
  .description('Creates a new Tokamak sub app.')
  .arguments('<subAppName>')
  .action(generateSubAppAction);
