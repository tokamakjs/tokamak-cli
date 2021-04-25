import { createFile } from '../../../../../utils';

const INDEX_TS_TEMPLATE = `import { TokamakApp } from '@tokamakjs/react';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await TokamakApp.create(AppModule);
  app.render('#root');
}

bootstrap();`;

export async function createIndexTs(outputDir: string, _config: unknown): Promise<void> {
  createFile(outputDir, 'index.ts', INDEX_TS_TEMPLATE);
}
