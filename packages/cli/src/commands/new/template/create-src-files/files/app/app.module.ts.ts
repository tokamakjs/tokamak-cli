import { createFile } from '../../../../../../utils';

const APP_MODULE_TS_TEMPLATE = `import { RouterModule, SubApp, createRoute } from '@tokamakjs/react';

import { RootView } from './routes/root';

@SubApp({
  routing: [createRoute('/', RootView, [])],
  providers: [],
  imports: [RouterModule],
})
export class AppModule {}
`;

export async function createAppModuleTs(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'app/app.module.ts', APP_MODULE_TS_TEMPLATE);
}
