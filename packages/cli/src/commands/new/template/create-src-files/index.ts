import path from 'path';

import { TemplateConfig } from '../../../../types';
import { createAppModuleTs } from './files/app/app.module.ts';
import { createIndexTs as createRouteIndexTs } from './files/app/routes/root/index.ts';
import { createRootControllerTs } from './files/app/routes/root/root.controller.ts';
import { createRootViewTsx } from './files/app/routes/root/root.view.tsx';
import { createIndexTs } from './files/index.ts';

export async function createSrcFiles(outputDir: string, config: TemplateConfig): Promise<void> {
  await createIndexTs(path.join(outputDir, 'src'), config);
  await createAppModuleTs(path.join(outputDir, 'src'), config);
  await createRouteIndexTs(path.join(outputDir, 'src'), config);
  await createRootControllerTs(path.join(outputDir, 'src'), config);
  await createRootViewTsx(path.join(outputDir, 'src'), config);
}
