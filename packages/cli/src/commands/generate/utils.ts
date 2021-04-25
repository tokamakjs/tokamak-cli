import path from 'path';

import fs from 'fs-extra';

export function fileExists(filename: string): Promise<boolean> {
  return new Promise((r) => {
    fs.access(filename, fs.constants.F_OK, (err: any) => {
      return err == null ? r(true) : r(false);
    });
  });
}

export async function findProjectRoot(cwd = process.cwd()): Promise<string> {
  // We assume project root contains either a tokamak.config.yml file or a
  // tokamak.config.ts one.
  const currentFiles = await fs.readdir(cwd);
  if (currentFiles.includes('tokamak.config.yml') || currentFiles.includes('tokamak.config.ts')) {
    return cwd;
  } else {
    return findProjectRoot(path.resolve(cwd, '../'));
  }
}
