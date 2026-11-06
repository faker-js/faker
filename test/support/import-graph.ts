import { relative, resolve } from 'node:path';
import type { SourceFile } from 'ts-morph';
import { expect } from 'vitest';
import { FILE_PATH_PROJECT } from '../../scripts/shared/paths';
import { getEmptyProject } from '../../scripts/shared/project';

function projectRelative(filePath: SourceFile): string {
  return relative(FILE_PATH_PROJECT, filePath.getFilePath()).replaceAll(
    '\\',
    '/'
  );
}

/**
 * Builds an import graph for the given source file.
 *
 * @param paths The path(s) to the source file(s).
 *
 * @returns A record mapping each source file -> imported files.
 */
export function buildImportGraph(
  paths: string | string[]
): Record<string, string[]> {
  const project = getEmptyProject();
  const entryFiles = project.addSourceFilesAtPaths(paths);

  function resolveModuleFile(
    sourceFile: SourceFile,
    moduleSpecifier: string
  ): SourceFile {
    const base = resolve(sourceFile.getDirectoryPath(), moduleSpecifier);
    try {
      return (
        project.addSourceFileAtPathIfExists(`${base}.ts`) ??
        project.addSourceFileAtPath(`${base}/index.ts`)
      );
    } catch (error: unknown) {
      throw new Error(
        `Could not resolve '${moduleSpecifier}' from ${sourceFile.getFilePath()}`,
        { cause: error }
      );
    }
  }

  const visited: Record<string, string[]> = {};
  const queue: SourceFile[] = [...entryFiles];
  let sourceFile: SourceFile | undefined;
  while ((sourceFile = queue.shift()) != null) {
    const sourcePath = projectRelative(sourceFile);
    const declarations = [
      ...sourceFile.getImportDeclarations(),
      ...sourceFile.getExportDeclarations(),
    ].filter((declaration) => !declaration.isTypeOnly());

    for (const declaration of declarations) {
      const moduleSpecifier = declaration.getModuleSpecifierValue();

      if (moduleSpecifier == null) {
        expect(moduleSpecifier).not.toBeNull();
        continue;
      }

      expect(moduleSpecifier).toStartWith('.');

      const target = resolveModuleFile(sourceFile, moduleSpecifier);
      const targetPath = projectRelative(target);

      const chain = (visited[sourcePath] ??= []);
      chain.push(targetPath);

      if (visited[targetPath] != null) {
        continue;
      }

      queue.push(target);
    }
  }

  return Object.fromEntries(
    Object.entries(visited)
      .map(([k, v]) => [k, [...new Set(v)].toSorted()] as const)
      .toSorted()
  );
}

export function detectCycles(graph: Record<string, string[]>): string[][] {
  const visited: Record<string, boolean> = {};
  const stack: Record<string, boolean> = {};
  const cycles: string[][] = [];

  function visit(node: string, path: string[]) {
    if (stack[node]) {
      cycles.push([...path, node]);
      return;
    }
    if (visited[node]) {
      return;
    }
    visited[node] = true;
    stack[node] = true;
    for (const neighbor of graph[node] ?? []) {
      visit(neighbor, [...path, node]);
    }
    stack[node] = false;
  }

  for (const node of Object.keys(graph)) {
    visit(node, []);
  }

  return cycles;
}
