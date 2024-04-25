import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { APIGroup } from '../../../docs/api/api-types';
import type { RawApiDocsPage } from '../processing/class';
import { FILE_PATH_API_DOCS } from '../utils/paths';

const pathDocsApiSearchIndex = resolve(
  FILE_PATH_API_DOCS,
  'api-search-index.json'
);

/**
 * Writes the api search index to the correct location.
 *
 * @param pages The pages to write into the index.
 */
export function writeSearchIndex(pages: RawApiDocsPage[]): void {
  const apiIndex: APIGroup[] = [
    {
      text: 'Module API',
      items: pages.map((page) => ({
        text: page.title,
        link: `/api/${page.camelTitle}.html`,
        headers: page.methods.map((method) => ({
          anchor: method.name,
          text: method.name,
          deprecated: method.signatures.every((s) => !!s.deprecated),
        })),
      })),
    },
  ];

  writeFileSync(pathDocsApiSearchIndex, JSON.stringify(apiIndex));
}
