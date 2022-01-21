import fs from 'fs';
import { format } from 'prettier';
import options from '../.prettierrc.cjs';

const pathLocale = 'src/locale/';
const pathLocales = 'src/locales/';

const locales = fs.readdirSync(pathLocales);
locales.splice(locales.indexOf('index.ts'), 1);

let localeIndexImports = "import type { LocaleDefinition } from '..';\n";
let localeIndexType = 'export type KnownLocale =\n';
let localeIndexLocales = 'const locales: KnownLocales = {\n';

for (let locale of locales) {
  localeIndexImports += `import ${locale} from './${locale}';`;
  localeIndexType += `  | '${locale}'`;
  localeIndexLocales += `  ${locale},`;

  if (locale !== 'en') {
    let content: string = `import { Faker } from '..';
    import ${locale} from '../locales/${locale}';
    import en from '../locales/en';

    const faker = new Faker({
      locale: '${locale}',
      localeFallback: 'en',
      locales: {
        ${locale},
        en,
      },
    });

    export default faker;`;
    content = format(content, { ...options, parser: 'typescript' });
    fs.writeFileSync(pathLocale + locale + '.ts', content);
  }
}

let indexContent = `${localeIndexImports}

${localeIndexType};

export type KnownLocales = Record<KnownLocale, LocaleDefinition>;

${localeIndexLocales}};

export default locales;
`;

indexContent = format(indexContent, { ...options, parser: 'typescript' });

fs.writeFileSync(pathLocales + 'index.ts', indexContent);
