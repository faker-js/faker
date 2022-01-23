import * as TypeDoc from 'typedoc';

async function main() {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    plugin: ['typedoc-plugin-missing-exports', 'typedoc-plugin-markdown'],
    entryPoints: ['src/index.ts'],
    pretty: true,
  });

  const project = app.convert();

  if (project) {
    // Project may not have converted correctly
    const outputDir = 'docs/api';

    // Rendered docs
    await app.generateDocs(project, outputDir + '/typedoc');
    // Alternatively generate JSON output
    await app.generateJson(project, outputDir + '/typedoc.json');

    // Render the Markdown file
  }
}

main().catch(console.error);
