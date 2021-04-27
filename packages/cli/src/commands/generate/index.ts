import { Command } from 'commander';

import { genApiCommand } from './commands/generate-api';
import { genHookServiceCommand } from './commands/generate-hook-service';
import { genModuleCommand } from './commands/generate-module';
import { genRouteCommand } from './commands/generate-route';
import { genServiceCommand } from './commands/generate-service';
import { genSubAppCommand } from './commands/generate-subapp';

export const generateCommand = new Command('generate')
  .alias('g')
  .description('Creates a new Tokamak component.')
  .addHelpCommand(false)
  .addCommand(genModuleCommand)
  .addCommand(genRouteCommand)
  .addCommand(genSubAppCommand)
  .addCommand(genServiceCommand)
  .addCommand(genHookServiceCommand)
  .addCommand(genApiCommand);
