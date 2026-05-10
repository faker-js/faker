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
      /\b(?<!\.)(\w+)\((faker\.)?fakerCore,?/g,
      (_, methodName) => {
        // We only have access to the main index imports, so we call the functions on the main faker object instead.
        // e.g.: firstName(fakerCore) -> faker.person.firstName()
        const hint = moduleHints[methodName];
        if (hint != null) {
          return `faker.${hint}(`;
        }

        throw new Error(
          `Unable to find module hint for ${methodName} in example code for ${name}`
        );
      }
    )
    .replaceAll(
      // Record results of relevant calls
      // Keep in sync with docs/.vitepress/components/api-docs/refreshable-code.vue
      /^((?<callBase>\w*faker\w*\.|distributor\()(?<consumeToEOL>.+)(?<multiline>(?<consumeIndented>\n +.*)+(?<finalLine>\n[^ \n]+))?\)(?<nestedProperty>\.\w+)?);?$/gim,
      `try { result.push($1); } catch (error: unknown) { result.push(error instanceof Error ? error.name : 'Error'); console.log('Error in example for ${name}:', error); }\n`
    );

  if (!exampleLines.includes('try { result.push(')) {
    // No recordable calls in examples
    return 'undefined';
  }

  const fullMethod = `async (): Promise<unknown[]> => {
await enableFaker();
const result: unknown[] = [];
${/(?<!\.)fakerCore/.test(exampleCode) ? 'const { fakerCore } = faker;' : ''}

${exampleLines}

${exampleCode.includes('setDefaultRefDate(') ? 'faker.setDefaultRefDate(); // Reset' : ''}

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
