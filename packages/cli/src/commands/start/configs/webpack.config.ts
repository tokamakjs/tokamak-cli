import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BetterProgressPlugin, initialAppMessage } from '@tokamakjs/dev-utils';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration, EnvironmentPlugin } from 'webpack';

import { WebpackConfigParams } from '../../../types';

export function createWebpackConfig(params: WebpackConfigParams): Configuration {
  const initialMessage = initialAppMessage(params.appName, params.port, params.env);

  const config: Configuration = {
    mode: 'development',
    stats: 'errors-only',
    devtool: 'cheap-module-source-map',
    infrastructureLogging: {
      level: 'error',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
      plugins: [new TsconfigPathsPlugin()],
    },
    entry: {
      app: params.entry.startsWith('./') ? params.entry : `./${params.entry}`,
    },
    output: {
      publicPath: '/',
      filename: 'js/[name].js',
      sourceMapFilename: 'maps/[file].map',
    },
    optimization: {
      moduleIds: 'named',
      emitOnErrors: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(params.publicFolder, 'index.html'),
      }),
      new EnvironmentPlugin(params.env),
      new BetterProgressPlugin({
        context: webpack,
        mode: 'bar',
        summary: () => process.stdout.write(initialMessage),
      }),
      new FriendlyErrorsPlugin({ clearConsole: false }),
      new ReactRefreshWebpackPlugin({ overlay: false }),
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: require.resolve('source-map-loader'),
        },
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                env: {
                  development: {
                    plugins: [require.resolve('react-refresh/babel')],
                  },
                },
              },
            },
            {
              loader: require.resolve('ts-loader'),
              options: {
                onlyCompileBundledFiles: true,
                context: process.cwd(),
                compilerOptions: {
                  allowJs: true,
                  module: 'ESNext',
                  declaration: false,
                  noUnusedLocals: false,
                  noUnusedParameters: false,
                },
              },
            },
          ],
        },
        {
          test: /.css$/,
          type: 'asset/resource',
          generator: {
            filename: 'css/[hash][ext][query]',
          },
        },
        {
          test: /\.(jpg|png|svg|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },
  };

  config.devServer = {
    host: '0.0.0.0',
    port: params.port,
    historyApiFallback: true,
    hot: true,
    client: {
      logging: 'none',
    },
  };

  return config;
}
