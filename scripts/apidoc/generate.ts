import { resolve } from 'path';
import type { Application, ProjectReflection, TypeDocOptions } from 'typedoc';
import { writeApiPagesIndex, writeApiSearchIndex } from './apiDocsWriter';
import { processModuleMethods } from './moduleMethods';
import { newTypeDocApp, patchProject } from './typedoc';
import { pathOutputDir } from './utils';

const pathOutputJson = resolve(pathOutputDir, 'typedoc.json');

export function loadProject(
  options: Partial<TypeDocOptions> = {
    entryPoints: ['src/index.ts'],
    pretty: true,
    cleanOutputDir: true,
  }
): [Application, ProjectReflection] {
  const app = newTypeDocApp();

  app.bootstrap(options);

  const project = app.convert();

  if (!project) {
    throw new Error('Failed to convert project');
  }

  patchProject(project);

  return [app, project];
}

export async function generate(): Promise<void> {
  const [app, project] = loadProject();

  // Useful for manually analyzing the content
  await app.generateJson(project, pathOutputJson);

  const modules = processModuleMethods(project);
  writeApiPagesIndex(modules);

  writeApiSearchIndex(project);
}
