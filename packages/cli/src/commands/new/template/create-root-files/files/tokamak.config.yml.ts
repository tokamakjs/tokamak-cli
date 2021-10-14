import { TemplateConfig } from '../../../../../types';
import { createFile } from '../../../../../utils';

const TOKAMAK_CONFIG_YML_TEMPLATE = (config: TemplateConfig) => `name: ${config.name}
port: 4200
app_module: app
public_folder: public
env:
  - NODE_ENV
`;

export async function createTokamakConfigYml(
  outputDir: string,
  config: TemplateConfig,
): Promise<void> {
  await createFile(outputDir, 'tokamak.config.yml', TOKAMAK_CONFIG_YML_TEMPLATE(config));
}
