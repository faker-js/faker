import { resolve } from 'node:path';

const FILE_PATH_THIS = import.meta.dirname;

/**
 * The path to the project directory.
 */
// Required for converting the source file paths to relative paths
export const FILE_PATH_PROJECT = resolve(FILE_PATH_THIS, '..', '..');
/**
 * The path to the docs directory.
 */
// Required for writing the api page vitepress config and locale pages
export const FILE_PATH_DOCS = resolve(FILE_PATH_PROJECT, 'docs');
/**
 * The path to the api docs directory.
 */
// Required for writing various api docs files
export const FILE_PATH_API_DOCS = resolve(FILE_PATH_DOCS, 'api');
/**
 * The path to the locale docs directory.
 */
// Required for writing the locale docs files
export const FILE_PATH_DOCS_LOCALES = resolve(FILE_PATH_DOCS, 'locales');
/**
 * The path to the src directory.
 */
const FILE_PATH_SRC = resolve(FILE_PATH_PROJECT, 'src');
/**
 * The path to the locale source files.
 */
// Required for re-writing the generated locale source files
export const FILE_PATH_SRC_LOCALE = resolve(FILE_PATH_SRC, 'locale');
/**
 * The path to the locales source directory.
 */
// Required for writing the generated locales index file
export const FILE_PATH_SRC_LOCALES = resolve(FILE_PATH_SRC, 'locales');
