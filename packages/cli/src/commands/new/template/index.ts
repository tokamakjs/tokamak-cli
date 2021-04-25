import { TemplateConfig } from '../../../types';
import { createPublicFiles } from './create-public-files';
import { createRootFiles } from './create-root-files';
import { createSrcFiles } from './create-src-files';

export async function createFiles(outputDir: string, config: TemplateConfig): Promise<void> {
  createRootFiles(outputDir, config);
  createSrcFiles(outputDir, config);
  createPublicFiles(outputDir, config);
}
