import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const thisDir = dirname(fileURLToPath(import.meta.url));
/**
 * The path to the project directory.
 */
// Required for converting the source file paths to relative paths
export const pathProjectDir = resolve(thisDir, '..', '..', '..');
/**
 * The path to the docs directory.
 */
// Required for writing the api page vitepress config
export const pathDocsDir = resolve(pathProjectDir, 'docs');
/**
 * The path to the website's public directory.
 */
// Required for publishing the diff index
export const pathPublicDir = resolve(pathDocsDir, 'public');
/**
 * The path to the api docs directory.
 */
// Required for writing various api docs files
export const pathApiDocsDir = resolve(pathDocsDir, 'api');
