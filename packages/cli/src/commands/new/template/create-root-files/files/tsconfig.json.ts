import { createFile } from '../../../../../utils';

const TSCONFIG_JSON_TEMPLATE = `{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "~/*": ["./app/*"],
    }
  },
  "exclude": ["node_modules", "dist"],
}`;

export async function createTsConfigJson(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'tsconfig.json', TSCONFIG_JSON_TEMPLATE);
}
