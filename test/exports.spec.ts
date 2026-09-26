import { Node, Project } from 'ts-morph';
import type { ExportedDeclarations } from 'ts-morph';
import { beforeAll, describe, expect, it } from 'vitest';

describe('exports', () => {
  let importTree: Record<string, { types?: string[]; values?: string[] }>;

  beforeAll(() => {
    const project = new Project({
      tsConfigFilePath: 'tsconfig.json',
      skipAddingFilesFromTsConfig: true,
    });
    const indexFile = project.addSourceFileAtPath('src/index.ts');
    importTree = {};

    function addExports(
      moduleSpecifier: string,
      kind: 'types' | 'values',
      names: string[]
    ): void {
      if (names.length === 0) {
        return;
      }

      const module = moduleSpecifier.replace(/^\.\//, '');
      const exports = (importTree[module] ??= {});
      (exports[kind] ??= []).push(...names);
    }

    function isTypeDeclaration(value: ExportedDeclarations): boolean {
      return (
        Node.isInterfaceDeclaration(value) || Node.isTypeAliasDeclaration(value)
      );
    }

    for (const exportDeclaration of indexFile.getExportDeclarations()) {
      const moduleSpecifier = exportDeclaration.getModuleSpecifierValue();
      if (moduleSpecifier == null) {
        throw new Error(
          'Expected export declaration to have a module specifier'
        );
      }

      const namedExports = exportDeclaration.getNamedExports();

      if (namedExports.length > 0) {
        addExports(
          moduleSpecifier,
          exportDeclaration.isTypeOnly() ? 'types' : 'values',
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

      const exports = [...targetFile.getExportedDeclarations()];
      addExports(
        moduleSpecifier,
        'types',
        exports
          .filter(([, declarations]) => declarations.every(isTypeDeclaration))
          .map(([name]) => name)
      );
      addExports(
        moduleSpecifier,
        'values',
        exports
          .filter(([, declarations]) =>
            declarations.some((declaration) => !isTypeDeclaration(declaration))
          )
          .map(([name]) => name)
      );
    }

    for (const exports of Object.values(importTree)) {
      exports.types?.sort();
      exports.values?.sort();
    }
  });

  it('should match the expected import tree', () => {
    expect(importTree).toMatchSnapshot();
  });
});
