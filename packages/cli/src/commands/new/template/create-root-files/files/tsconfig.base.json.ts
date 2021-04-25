import { createFile } from '../../../../../utils';

const TSCONFIG_BASE_JSON_TEMPLATE = `{
  "compilerOptions": {
    "declaration": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "incremental": true,
    "jsx": "preserve",
    "module": "CommonJS",
    "moduleResolution": "node",
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "removeComments": true,
    "resolveJsonModule": true,
    "sourceMap": true,
    "strict": true,
    "target": "ESNext"
  }
}`;

export async function createTsConfigBaseJson(outputDir: string, config: unknown): Promise<void> {
  await createFile(outputDir, 'tsconfig.base.json', TSCONFIG_BASE_JSON_TEMPLATE);
}
