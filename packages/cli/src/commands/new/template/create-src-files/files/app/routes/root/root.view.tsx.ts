import { createFile } from '../../../../../../../../utils';

const ROOT_VIEW_TS_TEMPLATE = `import { css } from '@emotion/css';
import { Outlet, useController } from '@tokamakjs/react';
import React, { Fragment } from 'react';

import { RootController } from './root.controller';

const styles = {
  title: css\`
    color: red;
  \`
};

export const RootView = () => {
  const ctrl = useController(RootController);

  return (
    <Fragment>
      <h1 className={styles.title}>Hello from Tokamak</h1>
      <h2>Counter: {ctrl.counter}</h2>
      <button onClick={() => ctrl.increase()}> +1 </button>
      <br /><br />
      <button onClick={() => ctrl.decrease()}> -1 </button>
      <br /><br />
      <Outlet />
    </Fragment>
  );
};
`;

export async function createRootViewTsx(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'app/routes/root/root.view.tsx', ROOT_VIEW_TS_TEMPLATE);
}
