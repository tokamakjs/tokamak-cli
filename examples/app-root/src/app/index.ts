import { TokamakApp } from '@tokamakjs/react';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await TokamakApp.create(AppModule);
  app.render('#root');
}

bootstrap();
