import { createFile } from '../../../../../utils';

const IMPORTSORTRC_TEMPLATE = `{
  ".js, .jsx": {
    "style": "local"
  },
  ".ts, .tsx": {
    "parser": "typescript",
    "style": "local"
  }
}`;

export async function createImportSortRc(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, '.importsortrc', IMPORTSORTRC_TEMPLATE);
}
