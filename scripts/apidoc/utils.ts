import { createHash } from 'node:crypto';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Method } from '../../docs/.vitepress/components/api-docs/method';

// Types

export type Page = { text: string; link: string; category: string };

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

const pathRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
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
  return description.replaceAll(/https:\/\/(next.)?fakerjs.dev\//g, '/');
}

export function mapByName<TInput extends { name: string }, TValue>(
  input: TInput[],
  valueExtractor: (item: TInput) => TValue
): Record<string, TValue> {
  return Object.fromEntries(
    input.map((item) => [item.name, valueExtractor(item)])
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
    sourcePath: method.sourcePath.replaceAll(/#.*/g, ''),
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
