import { createFile } from '../../../../../utils';

const GITIGNORE_TEMPLATE = `# Dependencies
node_modules

# Compiled source
dist
lib

# Misc
.env
*.log
*.tsbuildinfo
`;

export async function createGitignore(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, '.gitignore', GITIGNORE_TEMPLATE);
}
