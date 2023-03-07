import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { SpyInstance } from 'vitest';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import {
  analyzeSignature,
  initMarkdownRenderer,
} from '../../../scripts/apidoc/signature';
import {
  extractDeprecated,
  extractRawExamples,
  extractSeeAlsos,
  extractSince,
  extractTagContent,
} from '../../../scripts/apidoc/typedoc';
import { loadProjectModules } from './utils';

/*
 * This test ensures, that every method
 * - has working examples
 * - and running these do not log anything, unless the method is deprecated
 */

beforeAll(initMarkdownRenderer);

describe('examples and deprecations', () => {
  const modules = loadProjectModules();

  const consoleSpies: SpyInstance[] = Object.keys(console)
    .filter((key) => typeof console[key] === 'function')
    .map((methodName) => vi.spyOn(console, methodName as keyof typeof console));

  afterAll(() => {
    for (const spy of consoleSpies) {
      spy.mockRestore();
    }
  });

  describe.each(Object.entries(modules))('%s', (moduleName, methodsByName) => {
    beforeEach(() => {
      for (const spy of consoleSpies) {
        spy.mockReset();
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    it.each(Object.entries(methodsByName))(
      '%s',
      async (methodName, signature) => {
        // Extract examples and make them runnable
        const examples = extractRawExamples(signature).join('').trim();

        expect(
          examples,
          `${moduleName}.${methodName} to have examples`
        ).not.toBe('');

        // Save examples to a file to run it
        const dir = resolve(__dirname, 'temp', moduleName);
        mkdirSync(dir, { recursive: true });
        const path = resolve(dir, `${methodName}.ts`);
        const imports = [...new Set(examples.match(/faker[^\.]*(?=\.)/g))];
        writeFileSync(
          path,
          `import { ${imports.join(
            ', '
          )} } from '../../../../../src';\n\n${examples}`
        );

        // Run the examples
        await import(path);

        // Verify logging
        const deprecatedFlag = extractDeprecated(signature) !== undefined;
        if (deprecatedFlag) {
          expect(consoleSpies[1]).toHaveBeenCalled();
          expect(
            extractTagContent('@deprecated', signature).join(''),
            '@deprecated tag without message'
          ).not.toBe('');
        } else {
          for (const spy of consoleSpies) {
            expect(spy).not.toHaveBeenCalled();
          }
        }

        // Verify @param tags
        analyzeSignature(signature, moduleName, methodName).parameters.forEach(
          (param) => {
            const { name, description } = param;
            const plainDescription = description.replace(/<[^>]+>/g, '').trim();
            expect(
              plainDescription,
              `Expect param ${name} to have a description`
            ).not.toBe('Missing');
          }
        );

        // Verify @see tag
        extractSeeAlsos(signature).forEach((link) => {
          if (link.startsWith('faker.')) {
            // Expected @see faker.xxx.yyy()
            expect(link, 'Expect method reference to contain ()').toContain(
              '('
            );
            expect(link, 'Expect method reference to contain ()').toContain(
              ')'
            );
          }
        });

        expect(extractSince(signature), '@since to be present').toBeTruthy();
      }
    );
  });
});
