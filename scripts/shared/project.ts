import type { ProjectOptions } from 'ts-morph';
import {
  ModuleKind,
  ModuleResolutionKind,
  Project,
  ScriptTarget,
} from 'ts-morph';

export function getEmptyProject(
  options: Partial<ProjectOptions> = {}
): Project {
  return new Project({
    compilerOptions: {
      target: ScriptTarget.ESNext,
      moduleResolution: ModuleResolutionKind.Bundler,
      module: ModuleKind.ESNext,
    },
    skipFileDependencyResolution: true,
    ...options,
  });
}

// The API docs are only generated from `src`, and the locale data files make up
// the vast majority of the codebase, so scanning them slows things down a lot for no benefit.
// The main entry point is excluded as well, because it imports all locales.
export const SOURCE_GLOBS_LIGHT = [
  'src/**/*.ts',
  '!src/index.ts',
  '!src/locale/**',
  '!src/locales/**',
];

export function getPartialProject(
  globs: string[],
  options: Partial<ProjectOptions> = {}
): Project {
  const project = getEmptyProject(options);

  project.addSourceFilesAtPaths(globs);

  return project;
}
