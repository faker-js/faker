import type { ProjectOptions, SourceFile } from 'ts-morph';
import { Project } from 'ts-morph';

try {
  await import('../../src'); // Make watch mode work on the source files
} catch {
  // Ignore
}

export function getProject(options: Partial<ProjectOptions> = {}): Project {
  return new Project({
    ...options,
    tsConfigFilePath: options.tsConfigFilePath ?? 'tsconfig.build.json',
  });
}

export function getAll<T>(
  project: Project,
  extractor: (sourceFile: SourceFile) => T[],
  nameResolver: (value: T) => string,
  filter: (name: string, value: T) => boolean = () => true
): Record<string, T> {
  return Object.fromEntries(
    project
      .getSourceFiles()
      .flatMap(extractor)
      .map((value) => [nameResolver(value), value] as const)
      .filter(([name, value]) => filter(name, value))
  );
}
