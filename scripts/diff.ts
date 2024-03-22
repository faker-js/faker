#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { argv } from 'node:process';
import { diff } from './apidocs/diff';
import { FILE_PATH_DOCS_DIFF_INDEX } from './apidocs/output/diff-index';

const [target, source] = argv.slice(2);

if (!source && !existsSync(FILE_PATH_DOCS_DIFF_INDEX)) {
  throw new Error(
    `Unable to find local diff index file at: ${FILE_PATH_DOCS_DIFF_INDEX}\n
    You can run \`pnpm run generate:api-docs\` to generate it.`
  );
}

await diff(target, source).then((delta) => {
  if (Object.keys(delta).length === 0) {
    console.log('No documentation changes detected');
    return;
  }

  console.log('Documentation changes detected:');
  for (const [module, methods] of Object.entries(delta)) {
    console.log(`- ${module}`);
    for (const method of methods) {
      console.log(`  - ${method}`);
    }
  }
});
