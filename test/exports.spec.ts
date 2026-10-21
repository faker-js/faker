/**
 * Tests for verifying the exports of the `src/index.ts` file.
 */
import { resolve } from 'node:path';
import { Node } from 'ts-morph';
import type { ExportDeclaration, SourceFile } from 'ts-morph';
import { beforeAll, describe, expect, it } from 'vitest';
import { getEmptyProject } from '../scripts/shared/project';

//#region Config

/**
 * Pattern to avoid resolving exports into individual files for certain directories.
 */
const terminalFilePattern =
  /\/src\/(?:locale|locales|modules\/[^/]+)\/index\.ts$/;

function shouldNotDigDeeper(sourceFile: SourceFile): boolean {
  return terminalFilePattern.test(sourceFile.getFilePath());
}

//#endregion
//#region Helpers

interface ExportEntry {
  types?: string[];
  values?: string[];
  stars?: ExportRecord;
}

type ExportRecord = Record<string, ExportEntry>;

//#endregion
//#region Test (Describe)

describe('src/index.ts exports', () => {
  let importTree: ExportRecord;

  //#region Setup
  beforeAll(() => {
    const project = getEmptyProject();
    const indexFile = project.addSourceFileAtPath('src/index.ts');

    function resolveModuleFile(
      sourceFile: SourceFile,
      moduleSpecifier: string
    ): SourceFile | undefined {
      const base = resolve(sourceFile.getDirectoryPath(), moduleSpecifier);
      return (
        project.addSourceFileAtPathIfExists(`${base}.ts`) ??
        project.addSourceFileAtPathIfExists(`${base}/index.ts`)
      );
    }

    function addToKind(
      entry: ExportEntry,
      kind: 'types' | 'values',
      names: string[]
    ): void {
      if (names.length > 0) {
        (entry[kind] ??= []).push(...names);
      }
    }

    function addLocalExports(
      entry: ExportEntry,
      sourceFile: SourceFile,
      forceTypeOnly: boolean
    ): void {
      for (const statement of sourceFile.getStatements()) {
        if (!Node.isExportable(statement) || !statement.isExported()) {
          continue;
        }

        if (
          Node.isClassDeclaration(statement) ||
          Node.isFunctionDeclaration(statement)
        ) {
          addToKind(entry, forceTypeOnly ? 'types' : 'values', [
            statement.getName() ?? '<anonymous>',
          ]);
        } else if (Node.isVariableStatement(statement)) {
          addToKind(
            entry,
            forceTypeOnly ? 'types' : 'values',
            statement.getDeclarations().map((d) => d.getName())
          );
        } else if (
          Node.isInterfaceDeclaration(statement) ||
          Node.isTypeAliasDeclaration(statement)
        ) {
          addToKind(entry, 'types', [statement.getName()]);
        }
      }
    }

    function addNamedImportedExports(
      entry: ExportEntry,
      exportDeclaration: ExportDeclaration,
      kind: 'types' | 'values'
    ): boolean {
      const namedExports = exportDeclaration.getNamedExports();
      addToKind(
        entry,
        kind,
        namedExports.map(
          (exportSpecifier) =>
            exportSpecifier.getAliasNode()?.getText() ??
            exportSpecifier.getName()
        )
      );

      return namedExports.length > 0;
    }

    // Recursively adds every name reachable from `sourceFile` into `entry` to avoid digging into individual files.
    function addFlattenedExports(
      entry: ExportEntry,
      sourceFile: SourceFile,
      forceTypeOnly = false
    ): void {
      addLocalExports(entry, sourceFile, forceTypeOnly);

      for (const exportDeclaration of sourceFile.getExportDeclarations()) {
        const moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
        if (moduleSpecifier == null) {
          throw new Error(
            'Expected export declaration to have a module specifier'
          );
        }

        const isTypeOnly = forceTypeOnly || exportDeclaration.isTypeOnly();
        if (
          addNamedImportedExports(
            entry,
            exportDeclaration,
            isTypeOnly ? 'types' : 'values'
          )
        ) {
          continue;
        }

        const targetFile = resolveModuleFile(sourceFile, moduleSpecifier);
        if (targetFile == null) {
          throw new Error(
            `Could not resolve wildcard export '${moduleSpecifier}'`
          );
        }

        addFlattenedExports(entry, targetFile, isTypeOnly);
      }
    }

    // Recursively collects the export declarations of `sourceFile`.
    function collectExportsRecursively(
      sourceFile: SourceFile,
      forceTypeOnly = false
    ): ExportRecord {
      const exportRecord: ExportRecord = {};

      for (const exportDeclaration of sourceFile.getExportDeclarations()) {
        const moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
        if (moduleSpecifier == null) {
          throw new Error(
            'Expected export declaration to have a module specifier'
          );
        }

        const module = moduleSpecifier.replace(/^\.\//, '');
        const entry = (exportRecord[module] ??= {});
        const isTypeOnly = forceTypeOnly || exportDeclaration.isTypeOnly();

        if (
          addNamedImportedExports(
            entry,
            exportDeclaration,
            isTypeOnly ? 'types' : 'values'
          )
        ) {
          continue;
        }

        const targetFile = resolveModuleFile(sourceFile, moduleSpecifier);
        if (targetFile == null) {
          throw new Error(
            `Could not resolve wildcard export '${moduleSpecifier}'`
          );
        }

        if (shouldNotDigDeeper(targetFile)) {
          addFlattenedExports(entry, targetFile, isTypeOnly);
          continue;
        }

        addLocalExports(entry, targetFile, isTypeOnly);
        const stars = collectExportsRecursively(targetFile, isTypeOnly);
        if (Object.keys(stars).length > 0) {
          entry.stars = stars;
        }
      }

      return exportRecord;
    }

    function sortExportRecord(exportRecord: ExportRecord): void {
      for (const entry of Object.values(exportRecord)) {
        entry.types?.sort();
        entry.values?.sort();
        if (entry.stars) {
          sortExportRecord(entry.stars);
        }
      }
    }

    importTree = collectExportsRecursively(indexFile);
    sortExportRecord(importTree);
  });

  //#endregion
  //#region Test (Snapshot)

  it('should match the expected import tree', () => {
    expect(importTree).toMatchSnapshot();
  });

  //#endregion
});

//#endregion
