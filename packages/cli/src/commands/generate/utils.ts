import path from 'path';

import generate from '@babel/generator';
import { parse as babel } from '@babel/parser';
import traverse from '@babel/traverse';
import * as t from '@babel/types';
import fs from 'fs-extra';
import { camelCase } from 'lodash';
import prettier from 'prettier';

import { NoProjectFoundError } from '../../errors';

export function fileExists(filename: string): Promise<boolean> {
  return new Promise((r) => {
    fs.access(filename, fs.constants.F_OK, (err: any) => {
      return err == null ? r(true) : r(false);
    });
  });
}

export async function findProjectRoot(cwd = process.cwd(), iterations = 0): Promise<string> {
  // We assume project root contains either a tokamak.config.yml file or a
  // tokamak.config.ts one.
  const currentFiles = await fs.readdir(cwd);
  const parent = path.resolve(cwd, '../');

  if (currentFiles.includes('tokamak.config.yml') || currentFiles.includes('tokamak.config.ts')) {
    return cwd;
  } else if (iterations > 10 || parent === cwd) {
    throw new NoProjectFoundError();
  } else {
    iterations++;
    return findProjectRoot(parent, iterations);
  }
}

export function pascalCase(name: string): string {
  return name[0].toUpperCase() + camelCase(name).slice(1);
}

/**
 * Expands a module path received through the CLI:
 *
 * isModule = true -> foo/bar -> src/app/modules/foo/modules/bar
 * isModule = false -> foo/bar -> src/app/modules/foo/bar
 */
export function getModuleFolder(name: string, isModule: boolean): string {
  // is a root module
  if (!name.includes('/')) {
    return isModule ? path.join('src/app/modules', name) : path.join('src/app');
  }

  const modules = isModule ? name.split('/') : name.split('/').slice(0, -1);
  return path.join('src/app/modules', modules.join('/modules/'));
}

export function prettierFormat(code: string): string {
  // Config matches the one created with the template
  return prettier.format(code, {
    parser: 'typescript',
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    quoteProps: 'consistent',
    arrowParens: 'always',
    htmlWhitespaceSensitivity: 'strict',
  });
}

// adds to dir/index.ts
// export { ClassName } from 'modulePath';
export async function addToIndexExports(dir: string, modulePath: string): Promise<void> {
  const indexPath = path.resolve(dir, 'index.ts');
  const exports = [] as Array<string>;

  try {
    // try to read the content from index.ts to overwrite the default value
    const indexSrc = await fs.readFile(indexPath, 'utf-8');
    exports.push(...indexSrc.split('\n').slice(0, -1));
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err;
    }
    // file not found, just ignore it and continue with defaults
  }

  exports.push(`export * from './${modulePath}';`);

  const indexSrc = prettierFormat(exports.join('\n').slice(0, -1));
  await fs.writeFile(indexPath, indexSrc, 'utf-8');
}

export async function addProvider(
  moduleDir: string,
  importPath: string,
  ClassName: string,
): Promise<void> {
  const moduleName = path.basename(moduleDir);
  const modulePath = path.resolve(moduleDir, `${moduleName}.module.ts`);
  const moduleSrc = await fs.readFile(modulePath, 'utf-8');

  const ast = babel(moduleSrc, {
    sourceType: 'module',
    plugins: ['typescript', 'decorators-legacy'],
  });

  let hasImportsAlready = false;

  traverse(ast, {
    ImportDeclaration(path) {
      if (path.node.source.value === importPath) {
        hasImportsAlready = true;
        path.stop();
      }
    },
  });

  traverse(ast, {
    Program(path) {
      if (hasImportsAlready) {
        path.node.body.forEach((node) => {
          if (t.isImportDeclaration(node)) {
            if (node.source.value === importPath) {
              node.specifiers.push(
                t.importSpecifier(t.identifier(ClassName), t.identifier(ClassName)),
              );
            }
          }
        });
      } else {
        const importDeclaration = t.importDeclaration(
          [t.importSpecifier(t.identifier(ClassName), t.identifier(ClassName))],
          t.stringLiteral(importPath),
        );
        path.node.body.push(importDeclaration);
      }
    },
    Decorator(path) {
      traverse(
        path.parent,
        {
          ObjectProperty(path) {
            if (t.isIdentifier(path.node.key) && path.node.key.name === 'providers') {
              if (t.isArrayExpression(path.node.value)) {
                path.node.value.elements.push(t.identifier(ClassName));
              }
            }
          },
        },
        path.scope,
      );
    },
  });

  const { code } = generate(ast, { decoratorsBeforeExport: true, retainLines: true });
  const newModuleSrc = prettierFormat(code);

  await fs.writeFile(modulePath, newModuleSrc, 'utf-8');
}
