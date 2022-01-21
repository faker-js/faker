import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import options from '../.prettierrc.cjs';

const pathRoot = resolve(__dirname, '..');
const pathLocale = resolve(pathRoot, 'src', 'locale');
const pathLocales = resolve(pathRoot, 'src', 'locales');
const pathLocalesIndex = resolve(pathLocales, 'index.ts');
const pathDocsApiLocalization = resolve(
  pathRoot,
  'docs',
  'api',
  'localization.md'
);

const locales = readdirSync(pathLocales);
locales.splice(locales.indexOf('index.ts'), 1);

let localeIndexImports = "import type { LocaleDefinition } from '..';\n";
let localeIndexType = 'export type KnownLocale =\n';
let localeIndexLocales = 'const locales: KnownLocales = {\n';

let localizationLocales = '';

for (let locale of locales) {
  localeIndexImports += `import ${locale} from './${locale}';\n`;
  localeIndexType += `  | '${locale}'\n`;
  localeIndexLocales += `  ${locale},\n`;
  localizationLocales += `- ${locale}\n`;

  // src/locale/<locale>.ts
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
    writeFileSync(resolve(pathLocale, locale + '.ts'), content);
  }
}

// src/locales/index.ts

let indexContent = `${localeIndexImports}

${localeIndexType};

export type KnownLocales = Record<KnownLocale, LocaleDefinition>;

${localeIndexLocales}};

export default locales;
`;

indexContent = format(indexContent, { ...options, parser: 'typescript' });

writeFileSync(pathLocalesIndex, indexContent);

// docs/api/localization.md

let localizationContent = readFileSync(pathDocsApiLocalization, 'utf-8');
localizationContent = localizationContent.replace(
  /(^<!-- LOCALES-AUTO-GENERATED-START -->$).*(^<!-- LOCALES-AUTO-GENERATED-END -->$)/gms,
  `$1\n\n${localizationLocales}\n$2`
);
writeFileSync(pathDocsApiLocalization, localizationContent);
