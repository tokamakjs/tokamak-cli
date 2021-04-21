import { PackageJson } from 'type-fest';
import { webpack } from 'webpack';

import { createWebpackConfig } from './configs/webpack.config';

export async function buildAction(): Promise<void> {
  const cwd = process.cwd();
  const appPackageJson: PackageJson = require(`${cwd}/package.json`);

  const webpackConfig = createWebpackConfig({
    entry: appPackageJson.main ?? '',
    appName: '__APP NAME__',
    babelConfig: {},
    env: [],
    port: 0,
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
