import path from 'path';

import chalk from 'chalk';
import { Command } from 'commander';
import fs from 'fs-extra';

import { createFile, logLine, removeCwd } from '../../../utils';
import { fileExists, findProjectRoot, getModuleFolder, pascalCase } from '../utils';
import { generateSubApp } from './generate-subapp';

// CONTROLLER_TEMPLATE ---
const CONTROLLER_TEMPLATE = (name: string) => `import { Controller } from '@tokamakjs/react';

import { ${pascalCase(name)}View } from './${name}.view';

@Controller({ view: ${pascalCase(name)}View })
export class ${pascalCase(name)}Controller {}`;
// --- CONTROLLER_TEMPLATE

// VIEW_TEMPLATE ---
const VIEW_TEMPLATE = (name: string) => `import { useController } from '@tokamakjs/react';

import { ${pascalCase(name)}Controller } from './${name}.controller';

export const ${pascalCase(name)}View = () => {
  const ctrl = useController<${pascalCase(name)}Controller>();

  return <div></div>;
}`;
// --- VIEW_TEMPLATE

// INDEX_TEMPLATE ---
const INDEX_TEMPLATE = (name: string) => `import { ${pascalCase(
  name,
)}Controller } from './${name}.controller';
export { ${pascalCase(name)}Controller as ${pascalCase(name)}Route };`;
// --- INDEX_TEMPLATE

async function action(name: string): Promise<void> {
  const pRoot = await findProjectRoot();
  const moduleDir = path.join(pRoot, await getModuleFolder(name, false));
  const moduleName = path.basename(moduleDir);
  const moduleFile = path.join(moduleDir, `${moduleName}.module.ts`);

  if (!(await fileExists(moduleFile))) {
    await generateSubApp(moduleName);
  }

  const routeName = name.split('/').slice(-1)[0];
  const routeDir = path.join(moduleDir, '/routes', routeName);
  const routeIndexFile = path.join(routeDir, 'index.ts');

  await fs.ensureDir(routeDir);

  if (await fileExists(routeIndexFile)) {
    logLine(chalk.red(`The new route conflicts with an existing file.`));
    process.exit(1);
  }

  await createFile(routeDir, `index.ts`, INDEX_TEMPLATE(routeName));
  await createFile(routeDir, `${routeName}.controller.ts`, CONTROLLER_TEMPLATE(routeName));
  await createFile(routeDir, `${routeName}.view.tsx`, VIEW_TEMPLATE(routeName));

  logLine(`New route created in ${chalk.green(removeCwd(routeDir))}.`);
}

export const genRouteCommand = new Command('route')
  .alias('r')
  .description('Creates a new Tokamak route.')
  .arguments('<name>')
  .action(action);
