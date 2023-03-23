// TODO christopher 2023-03-23: Rename file to verify-jsdoc-tags.spec.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
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

describe('verify JSDoc tags', () => {
  const modules = loadProjectModules();

  const consoleWarnSpy = vi.spyOn(console, 'warn');

  afterAll(() => {
    consoleWarnSpy.mockRestore();
  });

  function resolveDirToModule(moduleName: string): string {
    return resolve(__dirname, 'temp', moduleName);
  }

  function resolvePathToMethodFile(moduleName: string, methodName: string) {
    const dir = resolveDirToModule(moduleName);
    return resolve(dir, `${methodName}.ts`);
  }

  describe.each(Object.entries(modules))('%s', (moduleName, methodsByName) => {
    beforeAll(() => {
      // Write temp files to disk

      for (const [methodName, signature] of Object.entries(methodsByName)) {
        // Extract examples and make them runnable
        const examples = extractRawExamples(signature).join('').trim();

        // Save examples to a file to run them later in the specific tests
        const dir = resolveDirToModule(moduleName);
        mkdirSync(dir, { recursive: true });

        const path = resolvePathToMethodFile(moduleName, methodName);
        const imports = [...new Set(examples.match(/faker[^\.]*(?=\.)/g))];
        writeFileSync(
          path,
          `import { ${imports.join(
            ', '
          )} } from '../../../../../src';\n\n${examples}`
        );
      }
    });

    describe('verify @example tag', () => {
      it.each(Object.entries(methodsByName))(
        '%s',
        async (methodName, signature) => {
          // Extract examples and make them runnable
          const examples = extractRawExamples(signature).join('').trim();

          expect(
            examples,
            `${moduleName}.${methodName} to have examples`
          ).not.toBe('');

          // Grab path to example file
          const path = resolvePathToMethodFile(moduleName, methodName);

          // Run the examples
          await import(path);
        }
      );
    });

    describe('verify @deprecated tag', () => {
      it.each(Object.entries(methodsByName))(
        '%s',
        async (methodName, signature) => {
          // Grab path to example file
          const path = resolvePathToMethodFile(moduleName, methodName);

          consoleWarnSpy.mockReset();

          // Run the examples
          await import(path);

          // Verify logging
          const deprecatedFlag = extractDeprecated(signature) !== undefined;
          if (deprecatedFlag) {
            expect(consoleWarnSpy).toHaveBeenCalled();
            expect(
              extractTagContent('@deprecated', signature).join(''),
              '@deprecated tag without message'
            ).not.toBe('');
          } else {
            expect(consoleWarnSpy).not.toHaveBeenCalled();
          }
        }
      );
    });

    describe('verify @param tags', () => {
      it.each(Object.entries(methodsByName))('%s', (methodName, signature) => {
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
      });
    });

    describe('verify @see tag', () => {
      it.each(Object.entries(methodsByName))('%s', (methodName, signature) => {
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
      });
    });

    describe('verify @since tag', () => {
      it.each(Object.entries(methodsByName))('%s', (methodName, signature) => {
        expect(extractSince(signature), '@since to be present').toBeTruthy();
      });
    });
  });
});
