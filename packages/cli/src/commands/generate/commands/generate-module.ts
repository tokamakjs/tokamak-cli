import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';

import { createFile, logLine, removeCwd } from '../../../utils';
import { fileExists, findProjectRoot, getModuleFolder, pascalCase } from '../utils';

const MODULE_TEMPLATE = (name: string) => `import { Module } from '@tokamakjs/react';

@Module({
  providers: [],
  imports: [],
  exports: [],
})
export class ${name}Module {}
`;

export async function generateModule(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const moduleName = name.split('/').slice(-1)[0];
  const moduleFolder = path.join(pRoot, getModuleFolder(name, true));
  await fs.ensureDir(moduleFolder);
  const newModuleFile = path.join(moduleFolder, `${moduleName}.module.ts`);

  if (await fileExists(newModuleFile)) {
    logLine(chalk.red(`The new module conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(
    moduleFolder,
    `${moduleName}.module.ts`,
    MODULE_TEMPLATE(pascalCase(moduleName)),
  );

  logLine(`New module created in ${chalk.green(removeCwd(newModuleFile))}.`);
}

export const genModuleCommand = new Command('module')
  .alias('m')
  .description('Creates a new Tokamak module.')
  .arguments('<name>')
  .action(generateModule);
