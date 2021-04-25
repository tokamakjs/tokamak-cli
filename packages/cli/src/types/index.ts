export interface BabelConfig {
  presets?: Array<string | [string, Record<string, string>]>;
  plugins?: Array<string | [string, Record<string, string>]>;
}

export interface WebpackConfigParams {
  entry: string;
  appName: string;
  env: Array<string>;
  port: number;
}

export interface TokamakConfig {
  name?: string;
  port?: number;
  env?: Array<string>;
}
