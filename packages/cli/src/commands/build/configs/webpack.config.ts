import path from 'path';

import { BetterProgressPlugin } from '@tokamakjs/dev-utils';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration, EnvironmentPlugin } from 'webpack';

import { WebpackConfigParams } from '../../../types';

export function createWebpackConfig(params: WebpackConfigParams): Configuration {
  const config: Configuration = {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
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
      path: path.resolve(process.cwd(), 'dist'),
    },
    optimization: {
      moduleIds: 'named',
      emitOnErrors: false,
      runtimeChunk: { name: 'runtime' },
      splitChunks: { name: 'vendor', chunks: 'all' },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(params.publicFolder, 'index.html'),
      }),
      new EnvironmentPlugin(params.env),
      new BetterProgressPlugin({ mode: 'detailed', context: webpack }),
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
              options: {},
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

  return config;
}
