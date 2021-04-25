import { TokamakConfig } from '../../../../../types';
import { createFile } from '../../../../../utils';

const TOKAMAK_CONFIG_YML_TEMPLATE = (config: TokamakConfig) => `name: ${config.name}
port: 4200
env:
  - NODE_ENV
`;

export async function createTokamakConfigYml(
  outputDir: string,
  config: TokamakConfig,
): Promise<void> {
  await createFile(outputDir, 'tokamak.config.yml', TOKAMAK_CONFIG_YML_TEMPLATE(config));
}
