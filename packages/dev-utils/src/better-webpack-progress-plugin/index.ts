import { clearScreen } from 'ansi-escapes';
import stripAnsi from 'strip-ansi';
import webpack, { Compiler, WebpackPluginInstance } from 'webpack';

import { barProgress } from './bar';
import { detailedProgress } from './detailed';
import { hookTo } from './utils';

interface Config {
  mode?: 'bar' | 'detailed';
  summary?: VoidFunction;
  /**
   * We need to pass the webpack instance from the CLI or is not correctly
   * registered.
   */
  context?: typeof webpack;
}

export class BetterProgressPlugin implements WebpackPluginInstance {
  private readonly _summary: VoidFunction;
  private readonly _capturedLogMessages: Array<string> = [];
  private readonly _context?: typeof webpack;
  private readonly _mode: 'bar' | 'detailed';

  constructor({ context, mode = 'bar', summary = () => {} }: Config) {
    this._context = context;
    this._summary = summary;
    this._mode = mode;
  }

  public apply(compiler: Compiler): void {
    const Plugin = this._context != null ? this._context.ProgressPlugin : webpack.ProgressPlugin;

    const instance = new Plugin(this._mode === 'bar' ? barProgress() : detailedProgress());

    instance.apply(compiler);

    // Capture stderr messages to log them after the compilation has finished.
    const _revokeStderrHook = hookTo(process.stderr, 'write', (data: Uint8Array | string) => {
      if (typeof data === 'string') {
        data = stripAnsi(data.trim());
        if (data != '') {
          // Manually exclude logs from webpack dev server
          if (!data.includes('[webpack-dev-server]')) {
            this._capturedLogMessages.push(data);
          }
        }
      }
      return true;
    });

    compiler.hooks.done.tap('BetterProgressPlugin: done', () => {
      _revokeStderrHook?.();

      process.stdout.write(clearScreen);
      this._summary();

      if (this._capturedLogMessages.length > 0) {
        this._capturedLogMessages.forEach((message) => {
          process.stderr.write(message + '\n');
        });
        process.stdout.write('\n\n');
      }
    });
  }
}
