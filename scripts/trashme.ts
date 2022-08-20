import { rmSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import { format } from 'prettier';

async function transfer() {
  const files: string[] = globSync('src/locales/**/*.ts');
  // console.log(files);

  for (const file of files) {
    console.log('Loading locale:', file);

    const parts = file.split('/');
    const locale = parts[2];

    const content = await import(`../${file}`);

    let path = 'src/locales/';
    path += `${locale}/`;

    if (file.endsWith('index.ts')) {
      path += 'index.json';

      // console.log(path, parts);

      if (parts.length === 4) {
        const indexContent: { title: string; separator?: string } = {
          title: content.default.title || 'Missing',
        };
        if (content.default.separator) {
          indexContent.separator = content.default.separator;
        }

        writeFileSync(
          path,
          format(JSON.stringify(indexContent), { parser: 'json' })
        );
      }
    } else {
      path += parts[3];
      for (let index = 4; ; index++) {
        if (parts[index]?.endsWith('.ts')) {
          path += `/${parts[index].replace('.ts', '.json')}`;
          break;
        }

        path += `/${parts[index]}`;
      }

      writeFileSync(
        path,
        format(JSON.stringify(content.default), { parser: 'json' })
      );
    }
  }

  for (const file of files) {
    rmSync(file);
  }
}

transfer()
  .then(() => {
    //
  })
  .catch(() => console.log('Failed to transfer'));
