import { Command } from 'commander';

export const buildCommand = new Command('build')
  .alias('s')
  .description('Builds a tokamak app')
  .action(() => {
    // Set environment to production by default
    process.env.NODE_ENV = process.env.NODE_ENV ?? 'production';

    // Use require() here syntax to be able to setup env above
    const { buildAction } = require('./action');
    buildAction();
  });
