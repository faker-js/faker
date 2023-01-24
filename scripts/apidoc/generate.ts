import { resolve } from 'path';
import { faker } from '../../src';
import { writeApiPagesIndex, writeApiSearchIndex } from './apiDocsWriter';
import { processModuleMethods } from './moduleMethods';
import { initMarkdownRenderer } from './signature';
import { newTypeDocApp, patchProject } from './typedoc';
import { pathOutputDir } from './utils';

const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

export async function generate(): Promise<void> {
  await initMarkdownRenderer();
  faker.setDefaultRefDate(Date.UTC(2023, 0, 1));

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

  const modules = processModuleMethods(project);
  writeApiPagesIndex(modules);

  writeApiSearchIndex(project);
}
