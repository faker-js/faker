import { resolve } from 'node:path';
import { processFakerClasses, processFakerRandomizer } from './faker-class';
import { processFakerUtilities } from './faker-utilities';
import { processModules } from './module-methods';
import { loadProject } from './typedoc';
import { pathOutputDir } from './utils';
import {
  writeApiDiffIndex,
  writeApiPagesIndex,
  writeApiSearchIndex,
  writeSourceBaseUrl,
} from './writer';

const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

/**
 * Generates the API documentation.
 */
export async function generate(): Promise<void> {
  const [app, project] = await loadProject();

  // Useful for manually analyzing the content
  await app.generateJson(project, pathOutputJson);

  const pages = [
    ...(await processFakerClasses(project)),
    await processFakerRandomizer(project),
    await processFakerUtilities(project),
    ...(await processModules(project)).sort((a, b) =>
      a.text.localeCompare(b.text)
    ),
  ];
  await writeApiPagesIndex(
    pages.map(({ text, link, category }) => ({ text, link, category }))
  );
  writeApiDiffIndex(
    Object.fromEntries(pages.map(({ text, diff }) => [text, diff]))
  );
  writeApiSearchIndex(pages);

  await writeSourceBaseUrl(project);
}
