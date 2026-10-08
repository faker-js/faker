/**
 * Tests for verifying the exports of the `src/index.ts` file.
 */
import { Node, Project } from 'ts-morph';
import type { ExportedDeclarations, SourceFile } from 'ts-morph';
import { beforeAll, describe, expect, it } from 'vitest';

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
    const project = new Project({
      tsConfigFilePath: 'tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });
    const indexFile = project.addSourceFileAtPath('src/index.ts');

    function isTypeDeclaration(value: ExportedDeclarations): boolean {
      return (
        Node.isInterfaceDeclaration(value) || Node.isTypeAliasDeclaration(value)
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
      const localExports = [...sourceFile.getExportedDeclarations()]
        .filter(([, declarations]) =>
          declarations.some(
            (declaration) => declaration.getSourceFile() === sourceFile
          )
        )
        .map(
          ([name, declarations]) =>
            [name, declarations.every(isTypeDeclaration)] as const
        );

      addToKind(
        entry,
        'types',
        localExports.filter(([, isType]) => isType).map(([name]) => name)
      );
      addToKind(
        entry,
        forceTypeOnly ? 'types' : 'values',
        localExports.filter(([, isType]) => !isType).map(([name]) => name)
      );
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
        const namedExports = exportDeclaration.getNamedExports();

        if (namedExports.length > 0) {
          addToKind(
            entry,
            isTypeOnly ? 'types' : 'values',
            namedExports.map(
              (exportSpecifier) =>
                exportSpecifier.getAliasNode()?.getText() ??
                exportSpecifier.getName()
            )
          );
          continue;
        }

        const targetFile = exportDeclaration.getModuleSpecifierSourceFile();
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
        const namedExports = exportDeclaration.getNamedExports();

        if (namedExports.length > 0) {
          addToKind(
            entry,
            isTypeOnly ? 'types' : 'values',
            namedExports.map(
              (exportSpecifier) =>
                exportSpecifier.getAliasNode()?.getText() ??
                exportSpecifier.getName()
            )
          );
          continue;
        }

        const targetFile = exportDeclaration.getModuleSpecifierSourceFile();
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
