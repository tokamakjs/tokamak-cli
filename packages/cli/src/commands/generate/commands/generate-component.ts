import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';

import { createFile, logLine, removeCwd } from '../../../utils';
import {
  addToIndexExports,
  fileExists,
  findProjectRoot,
  getModuleFolder,
  pascalCase,
} from '../utils';
import { generateModule } from './generate-module';

const COMPONENT_TEMPLATE = (ComponentName: string) => `interface ${ComponentName}Props {}

export const ${ComponentName} = ({}: ${ComponentName}Props) => {
  return <div></div>;
};
`;

async function action(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const moduleDir = path.join(pRoot, getModuleFolder(name, false));
  const moduleName = path.basename(moduleDir);
  const moduleFile = path.join(moduleDir, `${moduleName}.module.ts`);

  if (!(await fileExists(moduleFile))) {
    await generateModule(moduleName);
  }

  const ComponentName = `${pascalCase(name.split('/').slice(-1)[0])}`;

  const newFileDir = path.join(moduleDir, 'components');
  const newFilePath = path.join(newFileDir, `${ComponentName}.tsx`);

  if (await fileExists(newFilePath)) {
    logLine(chalk.red(`The new component conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(newFilePath, '', COMPONENT_TEMPLATE(ComponentName));
  await addToIndexExports(newFileDir, ComponentName);

  logLine(`New component created in ${chalk.green(removeCwd(newFilePath))}.`);
}

export const genComponentCommand = new Command('component')
  .alias('c')
  .description('Creates a new React component without styling.')
  .arguments('<name>')
  .action(action);
