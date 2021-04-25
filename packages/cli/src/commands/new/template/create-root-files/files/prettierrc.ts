import { createFile } from '../../../../../utils';

const PRETTIERRC_TEMPLATE = `{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "jsxBracketSameLine": true,
  "quoteProps": "consistent",
  "arrowParens": "always",
  "htmlWhitespaceSensitivity": "strict"
}`;

export async function createPrettierRc(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, '.prettierrc', PRETTIERRC_TEMPLATE);
}
