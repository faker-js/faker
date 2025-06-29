import { resolve } from 'node:path';

const FILE_PATH_THIS = import.meta.dirname;
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
