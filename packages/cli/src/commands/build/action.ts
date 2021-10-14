import { PackageJson } from 'type-fest';
import { webpack } from 'webpack';

import { readAppConfig } from '../../utils/read-app-config';
import { createWebpackConfig } from './configs/webpack.config';

export async function buildAction(): Promise<void> {
  const cwd = process.cwd();
  const appPackageJson: PackageJson = require(`${cwd}/package.json`);
  const appConfig = readAppConfig(cwd);

  const webpackConfig = createWebpackConfig({
    entry: appPackageJson.main ?? '',
    appName: appConfig.name,
    env: appConfig.env,
    port: appConfig.port,
    publicFolder: appConfig.publicFolder,
  });

  const compiler = webpack(webpackConfig);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      } else if (stats?.hasErrors()) {
        console.error(stats.compilation.errors);
        reject();
      } else {
        resolve();
      }
    });
  });
}
