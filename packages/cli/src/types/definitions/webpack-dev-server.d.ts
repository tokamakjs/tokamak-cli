// We need to declare our own typings until the published
// typings are compatible with webpack 5.
//
// Basically, until @types/webpack-dev-server stops requiring
// @types/webpack
declare module 'webpack-dev-server' {
  import * as webpack from 'webpack';
  import * as httpProxyMiddleware from 'http-proxy-middleware';
  import * as http from 'http';

  namespace WebpackDevServer {
    interface ListeningApp {
      address(): { port?: number };
    }

    type ProxyConfigArrayItem = {
      path?: string | string[];
      context?: string | string[] | httpProxyMiddleware.Filter;
    } & httpProxyMiddleware.Options;

    type ProxyConfigArray = ProxyConfigArrayItem[];

    interface Configuration {}
  }

  module 'webpack' {
    interface Configuration {
      /**
       * Can be used to configure the behaviour of webpack-dev-server when
       * the webpack config is passed to webpack-dev-server CLI.
       */
      devServer?: WebpackDevServer.Configuration;
    }
  }

  class WebpackDevServer {
    sockets: NodeJS.EventEmitter[];

    constructor(
      webpack: webpack.Compiler | webpack.MultiCompiler,
      config?: WebpackDevServer.Configuration,
    );

    static addDevServerEntrypoints(
      webpackOptions: webpack.Configuration | webpack.Configuration[],
      config: WebpackDevServer.Configuration,
      listeningApp?: WebpackDevServer.ListeningApp,
    ): void;

    listen(port: number, hostname: string, callback?: (error?: Error) => void): http.Server;

    listen(port: number, callback?: (error?: Error) => void): http.Server;

    close(callback?: () => void): void;

    sockWrite(sockets: NodeJS.EventEmitter[], type: string, data?: any): void;
  }

  export = WebpackDevServer;
}
