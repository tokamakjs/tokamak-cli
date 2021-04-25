import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';
import { camelCase } from 'lodash';

import { createFile, logLine, removeCwd } from '../../../utils';
import { fileExists, findProjectRoot } from '../utils';

function _getClassName(routeName: string): string {
  return routeName[0].toUpperCase() + camelCase(routeName).slice(1);
}

const CONTROLLER_TEMPLATE = (name: string) => `import { Controller } from '@tokamakjs/react';

@Controller()
export class ${_getClassName(name)}Controller {}`;

const VIEW_TEMPLATE = (name: string) => `import { useController } from '@tokamakjs/react';

import { ${_getClassName(name)}Controller } from './${name}.controller';

export const ${_getClassName(name)}View = () => {
  const ctrl = useController(${_getClassName(name)}Controller);

  return <div></div>;
}`;

const INDEX_TEMPLATE = (name: string) =>
  `export { ${_getClassName(name)}View } from './${name}.view';`;

function _getFolderFromName(routeName: string): string {
  // is in a root module
  if (!routeName.includes('/')) {
    return path.join('src/app/modules', routeName);
  }

  // omit route name
  const modules = routeName.split('/').slice(0, -1);
  return path.join('src/app/modules', modules.join('/modules/'));
}

async function generateRouteAction(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const routeName = name.split('/').slice(-1)[0];
  const moduleFolder = path.join(pRoot, _getFolderFromName(name));
  const routeFolder = path.join(moduleFolder, '/routes', routeName);
  const routeIndexFile = path.join(routeFolder, 'index.ts');
  await fs.ensureDir(routeFolder);

  if (await fileExists(routeIndexFile)) {
    logLine(chalk.red(`The new route conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(routeFolder, `index.ts`, INDEX_TEMPLATE(routeName));
  await createFile(routeFolder, `${routeName}.controller.ts`, CONTROLLER_TEMPLATE(routeName));
  await createFile(routeFolder, `${routeName}.view.tsx`, VIEW_TEMPLATE(routeName));

  logLine(`New route created in ${chalk.green(removeCwd(routeFolder))}.`);
}

export const genRouteCommand = new Command('route')
  .alias('r')
  .description('Creates a new Tokamak route.')
  .arguments('<routeName>')
  .action(generateRouteAction);
