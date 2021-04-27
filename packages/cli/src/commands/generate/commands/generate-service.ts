import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';

import { createFile, logLine, removeCwd } from '../../../utils';
import {
  addProvider,
  addToIndexExports,
  fileExists,
  findProjectRoot,
  getModuleFolder,
  pascalCase,
} from '../utils';
import { generateModule } from './generate-module';

const MODULE_TEMPLATE = (ClassName: string) => `import { Injectable } from '@tokamakjs/react';

@Injectable()
export class ${ClassName} {}
`;

async function action(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const moduleDir = path.join(pRoot, getModuleFolder(name, false));
  const moduleName = path.basename(moduleDir);
  const moduleFile = path.join(moduleDir, `${moduleName}.module.ts`);

  if (!(await fileExists(moduleFile))) {
    await generateModule(moduleName);
  }

  const serviceName = name.split('/').slice(-1)[0];

  await fs.ensureDir(moduleDir);

  const newFileDir = path.join(moduleDir, 'services');
  const newFilePath = path.join(newFileDir, `${serviceName}.service.ts`);
  const ClassName = `${pascalCase(serviceName)}Service`;

  if (await fileExists(newFilePath)) {
    logLine(chalk.red(`The new service conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(newFilePath, '', MODULE_TEMPLATE(ClassName));
  await addToIndexExports(newFileDir, `${serviceName}.service`);
  await addProvider(moduleDir, './services', ClassName);

  logLine(`New service created in ${chalk.green(removeCwd(newFilePath))}.`);
}

export const genServiceCommand = new Command('service')
  .alias('s')
  .description('Creates a new Tokamak service.')
  .arguments('<name>')
  .action(action);
