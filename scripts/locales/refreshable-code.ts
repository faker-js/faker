import { formatTypescript } from '../shared/format';

export async function toRefreshableCode(
  name: string,
  exampleCode: string
): Promise<string> {
  if (!/^\w*faker\w*\./im.test(exampleCode)) {
    // No recordable faker calls in examples
    return 'undefined';
  }

  const exampleLines = exampleCode
    .replaceAll(/ ?\/\/.*$/gm, '') // Remove comments
    .replaceAll(/^import .*$/gm, '') // Remove imports
    .replaceAll(
      // record results of faker calls
      /^(\w*faker\w*\..+(?:(?:.|\n..)*\n[^ ])?\)(?:\.\w+)?);?$/gim,
      `try { result.push($1); } catch (error: unknown) { result.push(error instanceof Error ? error.name : 'Error'); }\n`
    );

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
