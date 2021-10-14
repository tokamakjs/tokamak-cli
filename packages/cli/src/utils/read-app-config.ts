import fs from 'fs';
import path from 'path';

import { camelCase, merge } from 'lodash';
import { PackageJson } from 'type-fest';
import YAML from 'yaml';

import { TokamakConfig } from '../types';

function _camelize(yamlConfig: any): any {
  return Object.fromEntries(Object.entries(yamlConfig).map(([k, v]) => [camelCase(k), v]));
}

function _getDefaults(cwd: string): TokamakConfig {
  const appPackageJson: PackageJson = require(`${cwd}/package.json`);

  return {
    name: 'TOKAMAK APP',
    port: 4200,
    env: ['NODE_ENV'],
    appModule: path.join(cwd, path.dirname(appPackageJson.main ?? '')),
    publicFolder: path.join(cwd, 'public'),
  };
}

export function readAppConfig(cwd: string): TokamakConfig {
  require('ts-node').register({
    lazy: true,
    transpileOnly: true,
    compilerOptions: {
      module: 'commonjs',
    },
  });

  const appConfig = _getDefaults(cwd);

  // try requiring tokamak.config.yml so it can overwrite the default config
  try {
    merge(appConfig, _camelize(YAML.parse(fs.readFileSync(`${cwd}/tokamak.config.yml`, 'utf-8'))));
  } catch {}

  // try requiring tokamak.config.js so it can overwrite the default and yml configs
  try {
    merge(appConfig, require(`${cwd}/tokamak.config.ts`).default());
  } catch {}

  return appConfig;
}
