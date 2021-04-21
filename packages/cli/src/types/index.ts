export interface BabelConfig {
  presets?: Array<string | [string, Record<string, string>]>;
  plugins?: Array<string | [string, Record<string, string>]>;
}

export interface WebpackConfigParams {
  entry: string;
  appName: string;
  babelConfig: BabelConfig;
  env: Array<string>;
  port: number;
}
