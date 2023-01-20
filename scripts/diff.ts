import { existsSync } from 'fs';
import { diff } from './apidoc/diff';
import { nameDocsDiffIndexFile, pathDocsDiffIndexFile } from './apidoc/utils';

if (!existsSync(pathDocsDiffIndexFile)) {
  throw new Error(
    `Unable to find local diff index file at: ${pathDocsDiffIndexFile}\n
    You can run \`pnpm run generate:api-docs\` to generate it.`
  );
}

// TODO @ST-DDT 2023-01-20: Remove this url when the diff index is available on next.fakerjs.dev
diff(
  `https://docs-diff-notification--serene-sprite-f3ef50.netlify.app/${nameDocsDiffIndexFile}`
)
  .then((delta) => {
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
  })
  .catch(console.error);
