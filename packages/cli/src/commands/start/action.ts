import { webpack } from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { readAppConfig } from '../../utils/read-app-config';
import { createWebpackConfig } from './configs/webpack.config';

export async function startAction(): Promise<void> {
  const cwd = process.cwd();
  const appConfig = readAppConfig(cwd);

  const webpackConfig = createWebpackConfig({
    entry: appConfig.entry,
    appName: appConfig.name,
    env: appConfig.env,
    port: appConfig.port,
    publicFolder: appConfig.publicFolder,
  });

  const compiler = webpack(webpackConfig);
  const devServer = new WebpackDevServer(compiler, webpackConfig.devServer);

  devServer.listen(appConfig.port);
}
