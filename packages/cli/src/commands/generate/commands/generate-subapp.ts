import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';

import { createFile, logLine, removeCwd } from '../../../utils';
import { fileExists, findProjectRoot, getModuleFolder, pascalCase } from '../utils';

const SUB_APP_TEMPLATE = (name: string) => `import { SubApp } from '@tokamakjs/react';

@SubApp({
  routing: [],
  providers: [],
  imports: [],
  exports: [],
})
export class ${name}Module {}
`;

export async function generateSubApp(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const subAppName = name.split('/').slice(-1)[0];
  const moduleFolder = path.join(pRoot, await getModuleFolder(name, true));
  await fs.ensureDir(moduleFolder);
  const newSubAppFile = path.join(moduleFolder, `${subAppName}.module.ts`);

  if (await fileExists(newSubAppFile)) {
    logLine(chalk.red(`The new sub app conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(
    moduleFolder,
    `${subAppName}.module.ts`,
    SUB_APP_TEMPLATE(pascalCase(subAppName)),
  );

  logLine(`New sub app created in ${chalk.green(removeCwd(newSubAppFile))}.`);
}

export const genSubAppCommand = new Command('subapp')
  .alias('sa')
  .description('Creates a new Tokamak sub app.')
  .arguments('<name>')
  .action(generateSubApp);
