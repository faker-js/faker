import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import validator from 'validator';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import {
  analyzeSignature,
  initMarkdownRenderer,
  MISSING_DESCRIPTION,
} from '../../../scripts/apidoc/signature';
import {
  extractDeprecated,
  extractRawExamples,
  extractSeeAlsos,
  extractSince,
  extractTagContent,
} from '../../../scripts/apidoc/typedoc';
import { loadProjectModules } from './utils';

// This test ensures, that every method
// - has working examples
// - running these do not log anything, unless the method is deprecated

beforeAll(initMarkdownRenderer);

const tempDir = resolve(__dirname, 'temp');

afterAll(() => {
  // Remove temp folder
  rmSync(tempDir, { recursive: true });
});

describe('verify JSDoc tags', () => {
  const modules = loadProjectModules();

  function resolveDirToModule(moduleName: string): string {
    return resolve(tempDir, moduleName);
  }

  function resolvePathToMethodFile(
    moduleName: string,
    methodName: string
  ): string {
    const dir = resolveDirToModule(moduleName);
    return resolve(dir, `${methodName}.ts`);
  }

  describe.each(Object.entries(modules))('%s', (moduleName, methodsByName) => {
    describe.each(Object.entries(methodsByName))(
      '%s',
      (methodName, signature) => {
        beforeAll(() => {
          // Write temp files to disk

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
        });

        it('verify @example tag', async () => {
          // Extract the examples
          const examples = extractRawExamples(signature).join('').trim();

          expect(
            examples,
            `${moduleName}.${methodName} to have examples`
          ).not.toBe('');

          // Grab path to example file
          const path = resolvePathToMethodFile(moduleName, methodName);

          // Executing the examples should not throw
          await expect(import(`${path}?scope=example`)).resolves.toBeDefined();
        });

        // This only checks whether the whole method is deprecated or not
        // It does not check whether the method is deprecated for a specific set of arguments
        it('verify @deprecated tag', async () => {
          // Grab path to example file
          const path = resolvePathToMethodFile(moduleName, methodName);

          const consoleWarnSpy = vi.spyOn(console, 'warn');

          // Run the examples
          await import(`${path}?scope=deprecated`);

          // Verify that deprecated methods log a warning
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
        });

        it('verify @param tags', () => {
          analyzeSignature(
            signature,
            moduleName,
            methodName
          ).parameters.forEach((param) => {
            const { name, description } = param;
            const plainDescription = description.replace(/<[^>]+>/g, '').trim();
            expect(
              plainDescription,
              `Expect param ${name} to have a description`
            ).not.toBe(MISSING_DESCRIPTION);
          });
        });

        it('verify @see tags', () => {
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

        it('verify @since tag', () => {
          const since = extractSince(signature);
          expect(since, '@since to be present').toBeTruthy();
          expect(since, '@since to be a valid semver').toSatisfy(
            validator.isSemVer
          );
        });
      }
    );
  });
});
