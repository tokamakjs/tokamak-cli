import fs from 'fs';

import YAML from 'yaml';

import { TokamakConfig } from '../types';

const DEFAULT_CONFIG: Required<TokamakConfig> = {
  name: 'TOKAMAK APP',
  port: 4200,
  env: ['NODE_ENV'],
};

export function readAppConfig(cwd: string): Required<TokamakConfig> {
  require('ts-node').register({
    lazy: true,
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs',
    },
  });

  let appConfig = DEFAULT_CONFIG;

  // try requiring tokamak.config.yml so it can overwrite the default config
  try {
    appConfig = YAML.parse(fs.readFileSync(`${cwd}/tokamak.config.yml`, 'utf-8'));
  } catch {}

  // try requiring tokamak.config.js so it can overwrite the default and yml configs
  try {
    appConfig = require(`${cwd}/tokamak.config.ts`).default();
  } catch {}

  return appConfig;
}
