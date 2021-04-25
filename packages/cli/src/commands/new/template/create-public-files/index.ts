import path from 'path';

import { TemplateConfig } from '../../../../types';
import { createIndexHtml } from './files/index.html';

export async function createPublicFiles(outputDir: string, config: TemplateConfig): Promise<void> {
  await createIndexHtml(path.join(outputDir, 'public'), config);
}
