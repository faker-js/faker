import { formatTypescript } from '../shared/format';

export async function toRefreshableCode(
  name: string,
  exampleCode: string
): Promise<string> {
  const exampleLines = exampleCode
    .replaceAll(/ ?\/\/.*$/gm, '') // Remove comments
    .replaceAll(/^import .*$/gm, '') // Remove imports
    .replaceAll(
      // record results of relevant calls
      // Keep in sync with docs/.vitepress/components/api-docs/refreshable-code.vue
      /^(\w*faker\w*\..+(?:(?:.|\n..)*\n[^ ])?\)(?:\.\w+)?|distributor\(.+\));?$/gim,
      `try { result.push($1); } catch (error: unknown) { result.push(error instanceof Error ? error.name : 'Error'); }\n`
    );

  if (!exampleLines.includes('try { result.push(')) {
    // No recordable calls in examples
    return 'undefined';
  }

  const fullMethod = `async (): Promise<unknown[]> => {
await enableFaker();
const result: unknown[] = [];

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
