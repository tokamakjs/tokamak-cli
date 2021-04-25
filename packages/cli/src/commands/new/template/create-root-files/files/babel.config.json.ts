import { createFile } from '../../../../../utils';

export const BABEL_CONFIG_JSON_TEMPLATE = `{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-transform-runtime"]
}`;

export async function createBabelConfigJson(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'babel.config.json', BABEL_CONFIG_JSON_TEMPLATE);
}
