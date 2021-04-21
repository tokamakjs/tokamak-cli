import { PackageJson } from 'type-fest';
import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { createWebpackConfig } from './configs/webpack.config';

export async function startAction(): Promise<void> {
  const cwd = process.cwd();
  const appPackageJson: PackageJson = require(`${cwd}/package.json`);

  const webpackConfig = createWebpackConfig({
    entry: appPackageJson.main ?? '',
    appName: '__APP NAME__',
    babelConfig: {},
    env: [],
  });

  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

  devServer.listen(4200);
}
