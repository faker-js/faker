import { resolve } from 'node:path';
import {
  writeApiDiffIndex,
  writeApiPagesIndex,
  writeApiSearchIndex,
  writeSourceBaseUrl,
} from './apiDocsWriter';
import { processFakerClasses } from './fakerClass';
import { processFakerUtilities } from './fakerUtilities';
import { processModules } from './moduleMethods';
import { loadProject } from './typedoc';
import { pathOutputDir } from './utils';

const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

/**
 * Generates the API documentation.
 */
export async function generate(): Promise<void> {
  const [app, project] = loadProject();

  // Useful for manually analyzing the content
  await app.generateJson(project, pathOutputJson);

  const pages = await Promise.all([
    ...(await processFakerClasses(project)),
    ...(await processModules(project)).sort((a, b) =>
      a.text.localeCompare(b.text)
    ),
    processFakerUtilities(project),
  ]);
  await writeApiPagesIndex(pages.map(({ text, link }) => ({ text, link })));
  writeApiDiffIndex(
    pages.reduce((data, { text, diff }) => ({ ...data, [text]: diff }), {})
  );
  writeApiSearchIndex(pages);

  await writeSourceBaseUrl(project);
}
