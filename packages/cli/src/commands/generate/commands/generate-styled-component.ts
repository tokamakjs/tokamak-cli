import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import { camelCase } from 'lodash';

import { createFile, logLine, removeCwd } from '../../../utils';
import {
  addToIndexExports,
  fileExists,
  findProjectRoot,
  getModuleFolder,
  pascalCase,
} from '../utils';
import { generateModule } from './generate-module';

const COMPONENT_TEMPLATE = (ComponentName: string) => `import { css } from '@emotion/css';

const styles = {
  ${camelCase(ComponentName)}: css\`\`,
};

interface ${ComponentName}Props {}

export const ${ComponentName} = ({}: ${ComponentName}Props) => {
  return <div className={styles.${camelCase(ComponentName)}}></div>;
};
`;

async function action(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const moduleDir = path.join(pRoot, await getModuleFolder(name, false));
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

export const genStyledComponentCommand = new Command('styled-component')
  .alias('sc')
  .description('Creates a new React component with styling.')
  .arguments('<name>')
  .action(action);
