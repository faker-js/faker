import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { RawApiDocsPage } from '../processing/class';
import type { RawApiDocsMethod } from '../processing/method';
import { FILE_PATH_PUBLIC } from '../utils/paths';

export const FILE_NAME_DOCS_DIFF_INDEX = 'api-diff-index.json';
export const FILE_PATH_DOCS_DIFF_INDEX = resolve(
  FILE_PATH_PUBLIC,
  FILE_NAME_DOCS_DIFF_INDEX
);

/**
 * The diff hashes for the entire api.
 */
export interface ApiDiffHashes {
  /**
   * The pages with their diff hashes.
   */
  [pages: string]: ApiPageDiffHashes;
}

/**
 * The diff hashes for a single api doc page.
 */
export interface ApiPageDiffHashes {
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
  const diffIndex: ApiDiffHashes = Object.fromEntries(
    pages.map((page) => [page.title, pageDiffHashes(page)])
  );
  writeFileSync(FILE_PATH_DOCS_DIFF_INDEX, JSON.stringify(diffIndex));
}

function pageDiffHashes(page: RawApiDocsPage): ApiPageDiffHashes {
  return {
    pageHash: diffHash({
      ...page,
      methods: undefined,
    } satisfies Partial<RawApiDocsPage>),
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
    source: method.source.filePath,
  } satisfies Record<keyof RawApiDocsMethod, unknown>);
}

/**
 * Creates a diff hash for the given object.
 *
 * @param object The object to create a hash for.
 */
function diffHash(object: unknown): string {
  return createHash('md5').update(JSON.stringify(object)).digest('hex');
}
