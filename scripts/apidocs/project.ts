import type { ProjectOptions } from 'ts-morph';
import { Project } from 'ts-morph';

export function getEmptyProject(
  options: Partial<ProjectOptions> = {}
): Project {
  return new Project({
    tsConfigFilePath: 'tsconfig.json',
    skipAddingFilesFromTsConfig: true,
    ...options,
  });
}

// The API docs are only generated from `src`, and the locale data files make up
// the vast majority of the codebase, so scanning them slows things down a lot for no benefit.
const SOURCE_GLOBS_LIGHT = ['src/**/*.ts', '!src/locale/**', '!src/locales/**'];

export function getLightProject(
  options: Partial<ProjectOptions> = {}
): Project {
  const project = getEmptyProject(options);

  project.addSourceFilesAtPaths(SOURCE_GLOBS_LIGHT);

  return project;
}
