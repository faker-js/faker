import type { ProjectOptions } from 'ts-morph';
import { Project } from 'ts-morph';

export function getProject(options: Partial<ProjectOptions> = {}): Project {
  return new Project({
    ...options,
    tsConfigFilePath: options.tsConfigFilePath ?? 'tsconfig.json',
  });
}
