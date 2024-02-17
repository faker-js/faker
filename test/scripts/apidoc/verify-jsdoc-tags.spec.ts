import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import validator from 'validator';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { processComponents } from '../../../scripts/apidoc/generate';
import { extractSummaryDefault } from '../../../scripts/apidoc/output/page';
import { getProject } from '../../../scripts/apidoc/project';
import { initMarkdownRenderer } from '../../../scripts/apidoc/utils/markdown';

// This test ensures, that every method
// - has working examples
// - running these do not log anything, unless the method is deprecated

beforeAll(initMarkdownRenderer);

const tempDir = resolve(dirname(fileURLToPath(import.meta.url)), 'temp');

afterAll(() => {
  // Remove temp folder
  if (existsSync(tempDir)) {
    rmSync(tempDir, { recursive: true });
  }
});

const modules = processComponents(getProject());

function resolveDirToModule(moduleName: string): string {
  return resolve(tempDir, moduleName);
}

function resolvePathToMethodFile(
  moduleName: string,
  methodName: string,
  signature: number
): string {
  const dir = resolveDirToModule(moduleName);
  return resolve(dir, `${methodName}_${signature}.ts`);
}

const allowedReferences = new Set(
  modules.flatMap(({ camelTitle, methods, category }) => {
    return methods.map(({ name }) =>
      category ? `faker.${camelTitle}.${name}` : `${camelTitle}.${name}`
    );
  })
);
const allowedLinks = new Set(
  modules.flatMap(({ camelTitle, methods }) => {
    return [
      `/api/${camelTitle}.html`,
      ...methods.map(
        ({ name }) => `/api/${camelTitle}.html#${name.toLowerCase()}`
      ),
    ];
  })
);

function assertDescription(description: string): void {
  const linkRegexp = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [...description.matchAll(linkRegexp)].map((m) => m[2]);

  for (const link of links) {
    expect(link).toMatch(/^https?:\/\//);
    expect(link).toSatisfy(validator.isURL);

    if (link.includes('fakerjs.dev/api/')) {
      expect(allowedLinks, `${link} to point to a valid target`).toContain(
        link.replace(/.*fakerjs.dev\//, '/')
      );
    }
  }
}

describe('verify JSDoc tags', () => {
  describe.each(modules.map((m) => [m.camelTitle, m]))(
    '%s',
    (moduleName, module) => {
      describe('verify module', () => {
        it('verify description', () => {
          assertDescription(module.description);
        });
      });

      describe.each(module.methods.map((m) => [m.name, m]))(
        '%s',
        (methodName, method) => {
          describe.each(method.signatures.map((s, i) => [i, s]))(
            '%i',
            (signatureIndex, signature) => {
              beforeAll(() => {
                // Write temp files to disk

                // Extract examples and make them runnable
                const examples = signature.examples.join('\n');

                // Save examples to a file to run them later in the specific tests
                const dir = resolveDirToModule(moduleName);
                mkdirSync(dir, { recursive: true });

                const path = resolvePathToMethodFile(
                  moduleName,
                  methodName,
                  signatureIndex
                );
                const imports = examples.includes('import ')
                  ? []
                  : [
                      'faker',
                      ...new Set(examples.match(/(?<!\.)faker[^.]*(?=\.)/g)),
                    ];
                writeFileSync(
                  path,
                  `import { ${imports.join(
                    ', '
                  )} } from '../../../../../src';\n\n${examples.replaceAll(" from '@faker-js/faker'", " from '../../../../../src'")}`
                );
              });

              it('verify description', () => {
                assertDescription(signature.description);
              });

              it('verify @example tag', async () => {
                const examples = signature.examples.join('\n');

                expect(
                  examples,
                  `${moduleName}.${methodName} to have examples`
                ).not.toBe('');

                // Grab path to example file
                const path = resolvePathToMethodFile(
                  moduleName,
                  methodName,
                  signatureIndex
                );

                // Executing the examples should not throw
                await expect(
                  import(`${path}?scope=example`),
                  examples
                ).resolves.toBeDefined();
              });

              // This only checks whether the whole method is deprecated or not
              // It does not check whether the method is deprecated for a specific set of arguments
              it('verify @deprecated tag', async () => {
                // Grab path to example file
                const path = resolvePathToMethodFile(
                  moduleName,
                  methodName,
                  signatureIndex
                );

                const consoleWarnSpy = vi.spyOn(console, 'warn');

                // Run the examples
                await import(`${path}?scope=deprecated`);

                // Verify that deprecated methods log a warning
                const { deprecated } = signature;
                if (deprecated == null) {
                  expect(consoleWarnSpy).not.toHaveBeenCalled();
                } else {
                  expect(consoleWarnSpy).toHaveBeenCalled();
                  expect(deprecated).not.toBe('');
                }
              });

              describe('verify parameters', () => {
                describe.each(signature.parameters.map((p) => [p.name, p]))(
                  '%s',
                  (_, parameter) => {
                    it('verify default value', () => {
                      const {
                        name,
                        default: paramDefault,
                        description,
                      } = parameter;

                      const commentDefault = extractSummaryDefault(description);
                      if (paramDefault) {
                        if (
                          /^{.*}$/.test(paramDefault) ||
                          paramDefault.includes('\n')
                        ) {
                          expect(commentDefault).toBeUndefined();
                        } else if (!name.includes('.')) {
                          expect(
                            commentDefault,
                            `Expect '${name}'s js implementation default to be the same as the jsdoc summary default.`
                          ).toBe(paramDefault);
                        }
                      }
                    });

                    it('verify description', () => {
                      assertDescription(parameter.description);
                    });
                  }
                );
              });

              it('verify @see tags', () => {
                for (const link of signature.seeAlsos) {
                  if (link.startsWith('faker.')) {
                    // Expected @see faker.xxx.yyy()
                    expect(
                      link,
                      'Expect method reference to contain ()'
                    ).toContain('(');
                    expect(
                      link,
                      'Expect method reference to contain ()'
                    ).toContain(')');
                    expect(
                      link,
                      "Expect method reference to have a ': ' after the parenthesis"
                    ).toContain('): ');
                    expect(
                      link,
                      'Expect method reference to have a description starting with a capital letter'
                    ).toMatch(/\): [A-Z]/);
                    expect(
                      link,
                      'Expect method reference to start with a standard description phrase'
                    ).toMatch(
                      /\): (?:For generating |For more information about |For using |For the replacement method)/
                    );
                    expect(
                      link,
                      'Expect method reference to have a description ending with a dot'
                    ).toMatch(/\.$/);
                    expect(allowedReferences).toContain(
                      link.replace(/\(.*/, '')
                    );
                  }
                }
              });

              it('verify @since tag', () => {
                const { since } = signature;
                expect(since, '@since to be present').toBeTruthy();
                expect(since).not.toBe('');
                expect(since, '@since to be a valid semver').toSatisfy(
                  validator.isSemVer
                );
              });
            }
          );
        }
      );
    }
  );
});
