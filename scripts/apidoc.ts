import { resolve } from 'path';
import { writeApiPagesIndex } from './apidoc/apiDocsWriter';
import { processDirectMethods } from './apidoc/directMethods';
import { processModuleMethods } from './apidoc/moduleMethods';
import { initMarkdownRenderer } from './apidoc/signature';
import type { PageIndex } from './apidoc/utils';
import { newTypeDocApp, patchProject, pathOutputDir } from './apidoc/utils';

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

  // Useful for manually analyzing the content
  await app.generateJson(project, pathOutputJson);

  patchProject(project);

  const modulesPages: PageIndex = [];
  modulesPages.push({ text: 'Localization', link: '/api/localization.html' });
  modulesPages.push(...processModuleMethods(project));
  modulesPages.push(...processDirectMethods(project));
  writeApiPagesIndex(modulesPages);
}

build().catch(console.error);
