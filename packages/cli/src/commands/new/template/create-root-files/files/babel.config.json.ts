import { createFile } from '../../../../../utils';

export const BABEL_CONFIG_JSON_TEMPLATE = `{
  "presets": ["@babel/preset-react", "@babel/preset-env"],
  "plugins": [
    ["@babel/plugin-transform-runtime"],
    [
      "@emotion/babel-plugin",
      { "sourceMap": true, "autoLabel": "always", "labelFormat": "[filename]__[local]" }
    ]
  ]
}
`;

export async function createBabelConfigJson(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'babel.config.json', BABEL_CONFIG_JSON_TEMPLATE);
}
