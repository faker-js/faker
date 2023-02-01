import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

// Types

export type Page = { text: string; link: string };
export type PageIndex = Page[];

export type PageAndDiff = Page & {
  diff: DocsApiDiff;
};
export type PageAndDiffIndex = Array<PageAndDiff>;

export interface DocsApiDiffIndex {
  /**
   * The methods in the module by name.
   */
  [module: string]: DocsApiDiff;
}

export interface DocsApiDiff {
  /**
   * The checksum of the entire module.
   */
  moduleHash: string;
  /**
   * The checksum of the method by name.
   */
  [method: string]: string;
}

// Paths

const pathRoot = resolve(__dirname, '..', '..');
export const pathDocsDir = resolve(pathRoot, 'docs');
const pathPublicDir = resolve(pathDocsDir, 'public');
export const nameDocsDiffIndexFile = 'api-diff-index.json';
export const pathDocsDiffIndexFile = resolve(
  pathPublicDir,
  nameDocsDiffIndexFile
);
export const pathOutputDir = resolve(pathDocsDir, 'api');

// Functions

export function mapByName<T extends { name: string }, V>(
  input: T[],
  valueExtractor: (item: T) => V
): Record<string, V> {
  return input.reduce(
    (acc, item) => ({ ...acc, [item.name]: valueExtractor(item) }),
    {}
  );
}

/**
 * Creates a diff hash for the given object.
 *
 * @param object The object to create a hash for.
 */
export function diffHash(object: unknown): string {
  return createHash('md5').update(JSON.stringify(object)).digest('hex');
}
