import { resolve } from 'node:path';

// Types

export type Page = { text: string; link: string };
export type PageIndex = Page[];

// Paths

const pathRoot = resolve(__dirname, '..', '..');
export const pathDocsDir = resolve(pathRoot, 'docs');
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
