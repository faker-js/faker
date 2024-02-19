import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { RawApiDocsPage } from '../processing/class';
import type { RawApiDocsMethod } from '../processing/method';
import { pathPublicDir } from '../utils/paths';

export const nameDocsDiffIndexFile = 'api-diff-index.json';
export const pathDocsDiffIndexFile = resolve(
  pathPublicDir,
  nameDocsDiffIndexFile
);

/**
 * The diff hashes for the entire api.
 */
export interface ApiDiffHashs {
  /**
   * The pages with their diff hashs.
   */
  [pages: string]: ApiPageDiffHashs;
}

/**
 * The diff hashes for a single api doc page.
 */
export interface ApiPageDiffHashs {
  /**
   * The checksum of the entire page.
   */
  pageHash: string;
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
export function writeDiffIndex(pages: RawApiDocsPage[]): void {
  const diffIndex: ApiDiffHashs = Object.fromEntries(
    pages.map((page) => [page.title, pageDiffHashs(page)])
  );
  writeFileSync(pathDocsDiffIndexFile, JSON.stringify(diffIndex));
}

function pageDiffHashs(page: RawApiDocsPage): ApiPageDiffHashs {
  return {
    pageHash: diffHash({
      ...page,
      methods: undefined,
    }),
    ...Object.fromEntries(
      page.methods.map((method) => [method.name, methodDiffHash(method)])
    ),
  };
}

/**
 * Creates a diff hash for the given method by removing the line number from the source path.
 *
 * @param method The method to create a hash for.
 */
function methodDiffHash(method: RawApiDocsMethod): string {
  return diffHash({
    ...method,
    sourcePath: method.sourcePath.replaceAll(/:.*/g, ''),
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
