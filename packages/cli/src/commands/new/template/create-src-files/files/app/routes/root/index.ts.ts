import { createFile } from '../../../../../../../../utils';

const INDEX_TS_TEMPLATE = `import { RootController } from './root.controller';
export default RootController;`;

export async function createIndexTs(outputDir: string, _config: unknown): Promise<void> {
  createFile(outputDir, 'app/routes/root/index.ts', INDEX_TS_TEMPLATE);
}
