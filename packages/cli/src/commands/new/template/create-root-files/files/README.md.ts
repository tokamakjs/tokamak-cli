import { createFile } from '../../../../../utils';

const README_MD_TEMPLATE = `# Tokamak App`;

export async function createReadmeMd(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'README.md', README_MD_TEMPLATE);
}
