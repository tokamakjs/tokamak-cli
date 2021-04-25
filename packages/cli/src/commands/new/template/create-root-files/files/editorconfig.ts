import { createFile } from '../../../../../utils';

const EDITOR_CONFIG_TEMPLATE = `root = true

[*]
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
indent_style = space
indent_size = 2
`;

export async function createEditorConfig(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, '.editorconfig', EDITOR_CONFIG_TEMPLATE);
}
