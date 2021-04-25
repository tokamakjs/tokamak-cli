import { Command } from 'commander';

import { genModuleCommand } from './commands/generate-module';
import { genRouteCommand } from './commands/generate-route';
import { genSubAppCommand } from './commands/generate-subapp';

export const generateCommand = new Command('generate')
  .alias('g')
  .description('Creates a new Tokamak component.')
  .addHelpCommand(false)
  .addCommand(genModuleCommand)
  .addCommand(genRouteCommand)
  .addCommand(genSubAppCommand);
