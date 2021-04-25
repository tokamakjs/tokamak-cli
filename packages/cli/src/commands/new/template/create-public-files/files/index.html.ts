import { createFile } from '../../../../../utils';

const INDEX_HTML_TEMPLATE = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tokamak App</title>
    <link rel="stylesheet" href="<%= require('modern-normalize/modern-normalize.css') %>" />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export async function createIndexHtml(outputDir: string, _config: unknown): Promise<void> {
  await createFile(outputDir, 'index.html', INDEX_HTML_TEMPLATE);
}
