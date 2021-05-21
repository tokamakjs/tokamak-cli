import { Command } from 'commander';

import { genApiCommand } from './commands/generate-api';
import { genComponentCommand } from './commands/generate-component';
import { genHookServiceCommand } from './commands/generate-hook-service';
import { genModuleCommand } from './commands/generate-module';
import { genRouteCommand } from './commands/generate-route';
import { genServiceCommand } from './commands/generate-service';
import { genStyledComponentCommand } from './commands/generate-styled-component';
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
  .addCommand(genApiCommand)
  .addCommand(genComponentCommand)
  .addCommand(genStyledComponentCommand);
