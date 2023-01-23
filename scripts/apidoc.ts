import { resolve } from 'path';
import {
  writeApiDiffIndex,
  writeApiPagesIndex,
  writeApiSearchIndex,
} from './apidoc/apiDocsWriter';
import { processModuleMethods } from './apidoc/moduleMethods';
import { initMarkdownRenderer } from './apidoc/signature';
import { newTypeDocApp, patchProject } from './apidoc/typedoc';
import { pathOutputDir } from './apidoc/utils';

const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

async function build(): Promise<void> {
  await initMarkdownRenderer();

  const app = newTypeDocApp();

  app.bootstrap({
    entryPoints: ['src/index.ts'],
    pretty: true,
    cleanOutputDir: true,
  });

  const project = app.convert();

  if (!project) {
    throw new Error('Failed to convert project');
  }

  // Useful for manually analyzing the content
  await app.generateJson(project, pathOutputJson);

  patchProject(project);

  const modulesPagesAndDiffs = processModuleMethods(project);
  writeApiPagesIndex(
    modulesPagesAndDiffs.map(({ text, link }) => ({ text, link }))
  );
  writeApiDiffIndex(
    modulesPagesAndDiffs.reduce((data, { text, diff }) => {
      data[text] = diff;
      return data;
    }, {})
  );

  writeApiSearchIndex(project);
}

build().catch(console.error);
