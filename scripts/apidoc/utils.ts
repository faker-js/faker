import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';

// Types

export type Page = { text: string; link: string };

export type ModuleSummary = Page & {
  methods: Method[];
  diff: DocsApiDiff;
};

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

export function adjustUrls(description: string): string {
  return description.replace(/https:\/\/(next.)?fakerjs.dev\//g, '/');
}

export function mapByName<TInput extends { name: string }, TValue>(
  input: TInput[],
  valueExtractor: (item: TInput) => TValue
): Record<string, TValue> {
  return input.reduce(
    (acc, item) => ({ ...acc, [item.name]: valueExtractor(item) }),
    {}
  );
}

/**
 * Creates a diff hash for the given method by removing the line number from the source path.
 *
 * @param method The method to create a hash for.
 */
export function methodDiffHash(method: Method): string {
  return diffHash({
    ...method,
    sourcePath: method.sourcePath.replace(/#.*/g, ''),
  });
}

/**
 * Creates a diff hash for the given object.
 *
 * @param object The object to create a hash for.
 */
export function diffHash(object: unknown): string {
  return createHash('md5').update(JSON.stringify(object)).digest('hex');
}
