import { css } from '@emotion/css';
import { Outlet, useController } from '@tokamakjs/react';
import { Fragment } from 'react';

import { RootController } from './root.controller';

const styles = {
  title: css`
    color: red;
  `
};

export const RootView = () => {
  const ctrl = useController<RootController>();

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
