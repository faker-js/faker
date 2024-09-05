// 1. Traverse recursively all files in dist/types
// 2. Check `import` and `export` statements
// 3. Add /index.d.ts if it resolved to a directory or .d.ts if it resolved to a file

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('dist/types');

function traverse(dir: string) {
  for (const file of readdirSync(dir)) {
    const path = join(dir, file);

    if (path.endsWith('.d.ts')) {
      const fileContent = readFileSync(path, 'utf8');
      let result = '';

      for (const line of fileContent.split('\n')) {
        if (
          (line.startsWith('import') || line.startsWith('export')) &&
          line.includes('from') &&
          !line.includes('.d.ts')
        ) {
          // console.log(line);
          const match = /from ['"](.+)['"]/.exec(line);

          if (match) {
            const [, module] = match;
            const subFile = resolve(dir, `${module}.d.ts`);

            try {
              statSync(subFile);
              result += `${line.replace(
                /from ['"](.+)['"]/,
                `from '${module}.d.ts'`
              )}\n`;
            } catch {
              result += `${line.replace(
                /from ['"](.+)['"]/,
                `from '${module}/index.d.ts'`
              )}\n`;
            }
          } else {
            result += `${line}\n`;
          }
        } else {
          result += `${line}\n`;
        }
      }

      writeFileSync(path, result);
    } else {
      traverse(path);
    }
  }
}

traverse(root);
