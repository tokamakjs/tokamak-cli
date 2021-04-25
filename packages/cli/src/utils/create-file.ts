import path from 'path';

import fs from 'fs-extra';

export async function createFile(dir: string, name: string, content: string): Promise<void> {
  await fs.ensureDir(path.dirname(path.join(dir, name)));
  await fs.writeFile(path.resolve(dir, name), content, 'utf-8');
}
