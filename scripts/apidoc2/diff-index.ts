import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathPublicDir } from './file';
import type { ApiDocMethod, ApiDocPage } from './types';

const nameDocsDiffIndexFile = 'api-diff-index2.json';
const pathDocsDiffIndexFile = resolve(pathPublicDir, nameDocsDiffIndexFile);

export interface ApiDiffHashs {
  /**
   * The module names with their diff hashs.
   */
  [module: string]: ModuleDiffHashs;
}

export interface ModuleDiffHashs {
  /**
   * The checksum of the entire module.
   */
  moduleHash: string;
  /**
   * The checksum of the method by name.
   */
  [method: string]: string;
}

/**
 * Writes the api diff index to the correct location.
 *
 * @param pages The pages to write into the index.
 */
export function writeDiffIndex(pages: ApiDocPage[]): void {
  const diffIndex: ApiDiffHashs = Object.fromEntries(
    pages.map((page) => [page.title, moduleDiffHashs(page)])
  );
  writeFileSync(pathDocsDiffIndexFile, JSON.stringify(diffIndex));
}

function moduleDiffHashs(module: ApiDocPage): ModuleDiffHashs {
  return {
    moduleHash: diffHash({
      name: module.title,
      deprecated: module.deprecated,
      description: module.description,
    }),
    ...Object.fromEntries(
      module.methods.map((method) => [method.name, methodDiffHash(method)])
    ),
  };
}

/**
 * Creates a diff hash for the given method by removing the line number from the source path.
 *
 * @param method The method to create a hash for.
 */
function methodDiffHash(method: ApiDocMethod): string {
  return diffHash({
    ...method,
    sourcePath: method.sourcePath.replace(/:.*/g, ''),
  });
}

/**
 * Creates a diff hash for the given object.
 *
 * @param object The object to create a hash for.
 */
function diffHash(object: unknown): string {
  return createHash('md5').update(JSON.stringify(object)).digest('hex');
}
