import { existsSync } from 'fs';
import { diff } from './apidoc/diff';
import { nameDocsDiffIndexFile, pathDocsDiffIndexFile } from './apidoc/utils';

if (!existsSync(pathDocsDiffIndexFile)) {
  throw new Error(
    `Unable to find local diff index file at: ${pathDocsDiffIndexFile}\n
    You can run \`pnpm run generate:api-docs\` to generate it.`
  );
}

// TODO @ST-DDT 2023-01-20: Remove this line when the diff index is available on next.fakerjs.dev
diff(`https://next--serene-sprite-f3ef50.netlify.app/${nameDocsDiffIndexFile}`)
  .then(console.log)
  .catch(console.error);
