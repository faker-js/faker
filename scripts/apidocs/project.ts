import type { ProjectOptions } from 'ts-morph';
import { Project } from 'ts-morph';

export function getProject(options: Partial<ProjectOptions> = {}): Project {
  return new Project({
    ...options,
    tsConfigFilePath: options.tsConfigFilePath ?? 'tsconfig.json',
  });
}

/**
 * Creates a project that contains only the source files relevant for the api docs.
 *
 * The locale data, the pre-built locale instances and the main entry point are excluded,
 * as they are not documented and make up most of the files in the project.
 */
export function getApiDocsProject(): Project {
  const project = getProject({ skipAddingFilesFromTsConfig: true });
  project.addSourceFilesAtPaths([
    'src/**/*.ts',
    '!src/index.ts',
    '!src/locale/**',
    '!src/locales/**',
  ]);
  project.resolveSourceFileDependencies();
  return project;
}
