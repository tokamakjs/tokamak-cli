import { Command } from 'commander';

import { newAction } from './action';

export const newCommand = new Command('new')
  .alias('n')
  .description('Creates a new Tokamak app.')
  .arguments('<name>')
  .action(newAction);
