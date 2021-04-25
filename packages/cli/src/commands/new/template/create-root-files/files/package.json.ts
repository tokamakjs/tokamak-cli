import { TemplateConfig } from '../../../../../types';
import { createFile } from '../../../../../utils';

const PACKAGE_JSON_TEMPLATE = (config: TemplateConfig) => `{
  "name": "${config.name}",
  "version": "1.0.0",
  "description": "A Tokamak app.",
  "license": "UNLICENSED",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "clean": "rimraf dist",
    "start": "tok start",
    "build": "tok build"
  },
  "devDependencies": {},
  "dependencies": {}
}`;

export async function createPackageJson(outputDir: string, config: TemplateConfig): Promise<void> {
  await createFile(outputDir, 'package.json', PACKAGE_JSON_TEMPLATE(config));
}
