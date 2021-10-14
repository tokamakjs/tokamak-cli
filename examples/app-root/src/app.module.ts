import { RouterModule, SubApp, createRoute } from '@tokamakjs/react';

import RootRoute from './routes/root';

@SubApp({
  routing: [createRoute('/', RootRoute, [])],
  providers: [],
  imports: [RouterModule],
})
export class AppModule {}
