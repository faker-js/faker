import { resolve } from 'path';
import {
  writeApiDiffIndex,
  writeApiPagesIndex,
  writeApiSearchIndex,
  writeSourceBaseUrl,
} from './apiDocsWriter';
import { processModuleMethods } from './moduleMethods';
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

  const modules = processModuleMethods(project);
  writeApiPagesIndex(modules.map(({ text, link }) => ({ text, link })));
  writeApiDiffIndex(
    modules.reduce((data, { text, diff }) => ({ ...data, [text]: diff }), {})
  );

  writeApiSearchIndex(project);
  writeSourceBaseUrl(project);
}
