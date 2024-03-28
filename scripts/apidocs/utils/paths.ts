import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE_PATH_THIS = dirname(fileURLToPath(import.meta.url));
/**
 * The path to the project directory.
 */
// Required for converting the source file paths to relative paths
export const FILE_PATH_PROJECT = resolve(FILE_PATH_THIS, '..', '..', '..');
/**
 * The path to the docs directory.
 */
// Required for writing the api page vitepress config
export const FILE_PATH_DOCS = resolve(FILE_PATH_PROJECT, 'docs');
/**
 * The path to the website's public directory.
 */
// Required for publishing the diff index
export const FILE_PATH_PUBLIC = resolve(FILE_PATH_DOCS, 'public');
/**
 * The path to the api docs directory.
 */
// Required for writing various api docs files
export const FILE_PATH_API_DOCS = resolve(FILE_PATH_DOCS, 'api');
