import { RouterModule, SubApp, createRoute } from '@tokamakjs/react';

import { RootView } from './routes/root';

@SubApp({
  routing: [createRoute('/', RootView, [])],
  providers: [],
  imports: [RouterModule],
})
export class AppModule {}
