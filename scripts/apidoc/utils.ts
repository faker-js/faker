import { resolve } from 'node:path';

export type Page = { text: string; link: string };
export type PageIndex = Array<Page>;

const pathRoot = resolve(__dirname, '..', '..');
export const pathDocsDir = resolve(pathRoot, 'docs');
export const pathOutputDir = resolve(pathDocsDir, 'api');
