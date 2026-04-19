import { formatTypescript } from '../shared/format';

export async function toRefreshableCode(
  name: string,
  exampleCode: string,
  moduleHints: Record<string, string> = {}
): Promise<string> {
  const exampleLines = exampleCode
    .replaceAll(/ ?\/\/.*$/gm, '') // Remove comments
    .replaceAll(/^import .*$/gm, '') // Remove imports
    .replaceAll(
      // Keep in sync with docs/.vitepress/components/api-docs/refreshable-code.vue
      /\b(?<!\.)(\w+)\((faker\.)?fakerCore/g,
      (match, p1) => {
        // Access SMF via module registry if possible
        // firstName(fakerCore) -> fakerRegistry.person.firstName(fakerCore)
        if (moduleHints[p1]) {
          return `fakerRegistry.${moduleHints[p1]}.${match}`;
        }

        throw new Error(
          `Unable to find module hint for ${p1} in example code for ${name}`
        );
      }
    )
    .replaceAll(
      // Record results of relevant calls
      // Keep in sync with docs/.vitepress/components/api-docs/refreshable-code.vue
      /^((?<callBase>\w*faker\w*\.|distributor\()(?<consumeToEOL>.+)(?<multiline>(?<consumeIndented>\n +.*)+(?<finalLine>\n[^ \n]+))?\)(?<nestedProperty>\.\w+)?);?$/gim,
      `try { result.push($1); } catch (error: unknown) { result.push(error instanceof Error ? error.name : 'Error'); }\n`
    );

  if (!exampleLines.includes('try { result.push(')) {
    // No recordable calls in examples
    return 'undefined';
  }

  const fullMethod = `async (): Promise<unknown[]> => {
await enableFaker();
const result: unknown[] = [];
${/(?<!\.)fakerCore/.test(exampleCode) ? 'const fakerCore = faker.fakerCore;' : ''}

${exampleLines}

return result;
}`;
  try {
    const formattedMethod = await formatTypescript(fullMethod);
    return formattedMethod.replace(/;\s+$/, ''); // Remove trailing semicolon
  } catch (error: unknown) {
    console.error(
      'Failed to format refresh function for',
      name,
      fullMethod,
      error
    );
    return 'undefined';
  }
}
