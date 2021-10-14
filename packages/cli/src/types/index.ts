export interface BabelConfig {
  presets?: Array<string | [string, Record<string, string>]>;
  plugins?: Array<string | [string, Record<string, string>]>;
}

export interface WebpackConfigParams {
  entry: string;
  appName: string;
  env: Array<string>;
  port: number;
  publicFolder: string;
}

export interface TokamakConfig {
  name: string;
  port: number;
  entry: string;
  env: Array<string>;
  appModule: string;
  publicFolder: string;
}

export interface TemplateConfig {
  name: string;
}
