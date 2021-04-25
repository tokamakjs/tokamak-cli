import { createFile } from '../../../../../utils';

const BROWSERSLISTRC_TEMPLATE = `last 1 version and > 2% and not dead`;

export async function createBrowsersListRc(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, '.browserslistrc', BROWSERSLISTRC_TEMPLATE);
}
