import { resolve } from 'path';
import * as TypeDoc from 'typedoc';
import { writeApiPagesIndex } from './apidoc/apiDocsWriter';
import { processDirectMethods } from './apidoc/directMethods';
import { processModuleMethods } from './apidoc/moduleMethods';
import type { PageIndex } from './apidoc/utils';
import { pathOutputDir } from './apidoc/utils';

const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

async function build(): Promise<void> {
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());
  // If you want TypeDoc to load typedoc.json files
  //app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    entryPoints: ['src/index.ts'],
    pretty: true,
    cleanOutputDir: true,
  });

  const project = app.convert();

  if (!project) {
    // Project may not have converted correctly
    return;
  }
  // Useful for manually analyzing the content
  await app.generateJson(project, pathOutputJson);
  console.log(pathOutputDir);

  const modulesPages: PageIndex = [];
  modulesPages.push({ text: 'Localization', link: '/api/localization.html' });
  modulesPages.push(...processModuleMethods(project));
  modulesPages.push(...processDirectMethods(project));
  writeApiPagesIndex(modulesPages);
}

build().catch(console.error);
