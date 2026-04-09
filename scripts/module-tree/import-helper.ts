export class ImportHelper {
  private readonly _importMap: Record<string, Set<string>> = {};
  private readonly _importTypeSet = new Set<string>();

  public addImports(filePath: string, ...importNames: string[]): void {
    const set = (this._importMap[filePath] ??= new Set<string>());
    for (const importName of importNames) {
      set.add(importName);
    }
  }

  public flagAsValueImports(...importNames: string[]): void {
    for (const importName of importNames) {
      this._importTypeSet.delete(importName);
    }
  }

  public addTypeImports(filePath: string, ...importNames: string[]): void {
    const set = (this._importMap[filePath] ??= new Set<string>());
    for (const importName of importNames) {
      set.add(importName);
      this._importTypeSet.add(importName);
    }
  }

  public addImportFromLines(lines: string): void {
    for (const line of lines.split(';')) {
      const match = /import( type)?\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/.exec(
        line
      );
      if (match) {
        const isTypeImport = !!match[1];
        const importedItems = match[2]
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean);
        const importPath = match[3];
        if (isTypeImport) {
          this.addTypeImports(importPath, ...importedItems);
        } else {
          this.addImports(importPath, ...importedItems);
        }
      }
    }
  }

  public removeImports(filePath: string, ...importNames: string[]): void {
    const set = this._importMap[filePath];
    if (set) {
      for (const importName of importNames) {
        set.delete(importName);
      }
    }
  }

  public removeUnusedImports(fileBody: string): void {
    for (const [filePath, importNames] of Object.entries(this._importMap)) {
      const usedImports = [...importNames].filter((importName) =>
        new RegExp(
          `\\b${importName.includes(' as ') ? importName.split(' as ')[1] : importName}\\b`
        ).test(fileBody)
      );

      this._importMap[filePath] = new Set(usedImports);
    }
  }

  public generateImportStatements(
    pathSimplifier: (filePath: string) => string = (filePath) => filePath
  ): string {
    const importStatements: string[] = [];
    const sortedEntries = Object.entries(this._importMap).toSorted(([a], [b]) =>
      a.localeCompare(b)
    );

    for (const [filePath, importNames] of sortedEntries) {
      const sortedImportNames = [...importNames].toSorted();
      const typeImports = sortedImportNames.filter((importName) =>
        this._importTypeSet.has(importName)
      );
      const valueImports = sortedImportNames.filter(
        (importName) => !this._importTypeSet.has(importName)
      );

      const simplifiedFilePath = pathSimplifier(filePath);

      if (typeImports.length > 0) {
        importStatements.push(
          `import type { ${typeImports.join(', ')} } from '${simplifiedFilePath}';`
        );
      }

      if (valueImports.length > 0) {
        importStatements.push(
          `import { ${valueImports.join(', ')} } from '${simplifiedFilePath}';`
        );
      }
    }

    return importStatements.join('\n');
  }
}
