import { createFile } from '../../../../../../../../utils';

const INDEX_TS_TEMPLATE = `export { RootView } from './root.view'`;

export async function createIndexTs(outputDir: string, _config: unknown): Promise<void> {
  createFile(outputDir, 'app/routes/root/index.ts', INDEX_TS_TEMPLATE);
}
