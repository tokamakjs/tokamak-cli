import { TemplateConfig } from '../../../../types';
import { createBabelConfigJson } from './files/babel.config.json';
import { createBrowsersListRc } from './files/browserslistrc';
import { createEditorConfig } from './files/editorconfig';
import { createGitignore } from './files/gitignore';
import { createImportSortRc } from './files/importsortrc';
import { createPackageJson } from './files/package.json';
import { createPrettierRc } from './files/prettierrc';
import { createReadmeMd } from './files/README.md';
import { createTokamakConfigYml } from './files/tokamak.config.yml';
import { createTsConfigBaseJson } from './files/tsconfig.base.json';
import { createTsConfigJson } from './files/tsconfig.json';

export async function createRootFiles(outputDir: string, config: TemplateConfig): Promise<void> {
  createPackageJson(outputDir, config);
  createTsConfigBaseJson(outputDir, config);
  createTsConfigJson(outputDir, config);
  createReadmeMd(outputDir, config);
  createPrettierRc(outputDir, config);
  createImportSortRc(outputDir, config);
  createGitignore(outputDir, config);
  createEditorConfig(outputDir, config);
  createBrowsersListRc(outputDir, config);
  createBabelConfigJson(outputDir, config);
  createTokamakConfigYml(outputDir, config);
}
