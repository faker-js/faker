import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { MetadataDefinition } from '../../src';
import { formatTypescript } from '../apidocs/utils/format';
import { codeToHtml } from '../apidocs/utils/markdown';
import { toRefreshableCode } from '../apidocs/utils/refreshable-code';
import {
  pathDocsLocales,
  toFakerExportName,
  tryLoadMetadata,
} from './shared';

/**
 * Writes the locale docs page and data for the given locale to the correct location.
 *
 * @param locale The locale to write.
 */
export async function writeLocalePage(locale: string): Promise<void> {
  try {
    const metadata = await tryLoadMetadata(locale);
    const localizedFakerExport = toFakerExportName(locale);

    await mkdir(pathDocsLocales, { recursive: true });
    await writePageMarkdown(locale, localizedFakerExport, metadata);
    await writePageData(locale, localizedFakerExport);
  } catch (error) {
    throw new Error(`Error writing page ${locale}`, { cause: error });
  }
}

/**
 * Writes the locale docs page for the given locale to the correct location.
 *
 * @param locale The locale to write.
 * @param localizedFakerExport The name of the faker export for the locale, used in the usage examples.
 * @param metadata The metadata for the locale, used to populate the page content.
 */
async function writePageMarkdown(
  locale: string,
  localizedFakerExport: string,
  metadata: MetadataDefinition
): Promise<void> {
  const content = `<script setup>
import RefreshableCode from '../.vitepress/components/api-docs/refreshable-code.vue';
import localeData from './${locale}.ts';
</script>

# ${metadata.title}

${metadata.title} is one of the many supported [locales](/guide/localization.html#available-locales) in Faker. It uses the language code \`${metadata.code}\` and is available as \`${localizedFakerExport}\`.

## Language data

| Key | Value |
| :--- | :--- |
| Name | ${metadata.title} |
| Local Name | ${metadata.endonym} |
| Language | ${metadata.language} |
| Script | ${metadata.script} |
| Direction | ${metadata.dir} |

## Usage

A few commonly localized methods are shown below. Click the refresh button to see more random examples. Not [all methods](/api/) are localized in all locales.

<RefreshableCode :examples="localeData.examples" :refresh="localeData.refresh" refreshOnLoad />
`;

  await writeFile(resolve(pathDocsLocales, `${locale}.md`), content);
}

/**
 * Writes the locale docs data for the given locale to correct location.
 *
 * @param locale The locale to write.
 * @param localizedFakerExport The name of the faker export for the locale, used in the usage examples.
 */
async function writePageData(
  locale: string,
  localizedFakerExport: string
): Promise<void> {
  const exampleCode = `import { ${localizedFakerExport} } from '@faker-js/faker';
// const { ${localizedFakerExport} } = require('@faker-js/faker'); // CJS

// Commonly localized methods:
${localizedFakerExport}.person.fullName();
${localizedFakerExport}.location.streetAddress();
${localizedFakerExport}.location.city();
${localizedFakerExport}.location.state();
${localizedFakerExport}.location.zipCode();
${localizedFakerExport}.phone.number();
${localizedFakerExport}.commerce.productName();
${localizedFakerExport}.internet.email();
${localizedFakerExport}.internet.url();
${localizedFakerExport}.date.month();
${localizedFakerExport}.date.weekday();
${localizedFakerExport}.word.noun();
${localizedFakerExport}.word.verb();
${localizedFakerExport}.company.name();

// Non-localized methods work as normal:
${localizedFakerExport}.number.int();
`;

  const pageData = {
    examples: codeToHtml(exampleCode),
    refresh: 'refresh-placeholder',
  };
  const refreshableCode = await toRefreshableCode(locale, exampleCode);

  const content =
    `export default ${JSON.stringify(pageData, undefined, 2)}`.replace(
      '"refresh-placeholder"',
      refreshableCode
    );

  return writeFile(
    resolve(pathDocsLocales, `${locale}.ts`),
    await formatTypescript(content)
  );
}
