import { TokamakConfig } from '@tokamakjs/cli';

export default function (): TokamakConfig {
  return {
    name: 'SIMPLE EXAMPLE',
    port: 4200,
    env: ['NODE_ENV'],
  };
}
