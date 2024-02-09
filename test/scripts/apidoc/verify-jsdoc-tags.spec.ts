import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ReflectionType, SomeType } from 'typedoc';
import validator from 'validator';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { initMarkdownRenderer } from '../../../scripts/apidoc/markdown';
import { analyzeSignature } from '../../../scripts/apidoc/signature';
import {
  MISSING_DESCRIPTION,
  extractDeprecated,
  extractDescription,
  extractJoinedRawExamples,
  extractModuleFieldName,
  extractRawDefault,
  extractSeeAlsos,
  extractSince,
  extractSummaryDefault,
  extractTagContent,
} from '../../../scripts/apidoc/typedoc';
import { loadProjectModules } from './utils';

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

const modules = await loadProjectModules();

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

const allowedReferences = new Set(
  Object.values(modules).flatMap(([module, methods]) => {
    const moduleFieldName = extractModuleFieldName(module);
    return Object.keys(methods).map(
      (methodName) => `faker.${moduleFieldName}.${methodName}`
    );
  })
);
const allowedLinks = new Set(
  Object.values(modules).flatMap(([module, methods]) => {
    const moduleFieldName = extractModuleFieldName(module);
    return [
      `/api/${moduleFieldName}.html`,
      ...Object.keys(methods).map(
        (methodName) =>
          `/api/${moduleFieldName}.html#${methodName.toLowerCase()}`
      ),
    ];
  })
);

function assertDescription(description: string, isHtml: boolean): void {
  const linkRegexp = isHtml ? /(href)="([^"]+)"/g : /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [...description.matchAll(linkRegexp)].map((m) => m[2]);

  for (const link of links) {
    if (!isHtml) {
      expect(link).toMatch(/^https?:\/\//);
      expect(link).toSatisfy(validator.isURL);
    }

    if (isHtml ? link.startsWith('/api/') : link.includes('fakerjs.dev/api/')) {
      expect(allowedLinks, `${link} to point to a valid target`).toContain(
        link.replace(/.*fakerjs.dev\//, '/')
      );
    }
  }
}

// keep in sync with analyzeParameterOptions
function assertNestedParameterDefault(
  name: string,
  parameterType?: SomeType
): void {
  if (!parameterType) {
    return;
  }

  switch (parameterType.type) {
    case 'array':
      return assertNestedParameterDefault(
        `${name}[]`,
        parameterType.elementType
      );

    case 'union':
      for (const type of parameterType.types) {
        assertNestedParameterDefault(name, type);
      }

      return;

    case 'reflection': {
      for (const property of parameterType.declaration.children ?? []) {
        const reflection = property.comment
          ? property
          : (property.type as ReflectionType)?.declaration?.signatures?.[0];
        const comment = reflection?.comment;
        const tagDefault = extractRawDefault({ comment }) || undefined;
        const summaryDefault = extractSummaryDefault(comment, false);

        if (summaryDefault) {
          expect(
            tagDefault,
            `Expect jsdoc summary default and @default for ${name}.${property.name} to be the same`
          ).toBe(summaryDefault);
        }
      }

      return;
    }

    case 'typeOperator':
      return assertNestedParameterDefault(name, parameterType.target);

    default:
      return;
  }
}

describe('verify JSDoc tags', () => {
  describe.each(Object.entries(modules))(
    '%s',
    (moduleName, [module, methodsByName]) => {
      describe('verify module', () => {
        it('verify description', () => {
          const description = extractDescription(module);
          assertDescription(description, false);
        });
      });

      describe.each(Object.entries(methodsByName))(
        '%s',
        (methodName, signature) => {
          beforeAll(() => {
            // Write temp files to disk

            // Extract examples and make them runnable
            const examples = extractJoinedRawExamples(signature) ?? '';

            // Save examples to a file to run them later in the specific tests
            const dir = resolveDirToModule(moduleName);
            mkdirSync(dir, { recursive: true });

            const path = resolvePathToMethodFile(moduleName, methodName);
            const imports = [
              ...new Set(examples.match(/(?<!\.)faker[^.]*(?=\.)/g)),
            ];
            writeFileSync(
              path,
              `import { ${imports.join(
                ', '
              )} } from '../../../../../src';\n\n${examples}`
            );
          });

          it('verify description', () => {
            const description = extractDescription(signature);
            assertDescription(description, false);
          });

          it('verify @example tag', async () => {
            // Extract the examples
            const examples = extractJoinedRawExamples(signature);

            expect(
              examples,
              `${moduleName}.${methodName} to have examples`
            ).not.toBe('');

            // Grab path to example file
            const path = resolvePathToMethodFile(moduleName, methodName);

            // Executing the examples should not throw
            await expect(
              import(`${path}?scope=example`)
            ).resolves.toBeDefined();
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

          it('verify @param tags', async () => {
            // This must run before analyzeSignature
            for (const param of signature.parameters ?? []) {
              const type = param.type;
              const paramDefault = param.defaultValue;
              const commentDefault = extractSummaryDefault(
                param.comment,
                false
              );
              if (paramDefault) {
                if (
                  /^{.*}$/.test(paramDefault) ||
                  paramDefault.includes('\n')
                ) {
                  expect(commentDefault).toBeUndefined();
                } else {
                  expect(
                    commentDefault,
                    `Expect '${param.name}'s js implementation default to be the same as the jsdoc summary default.`
                  ).toBe(paramDefault);
                }
              }

              assertNestedParameterDefault(param.name, type);
            }

            for (const param of (
              await analyzeSignature(signature, '', methodName)
            ).parameters) {
              const { name, description } = param;
              const plainDescription = description
                .replace(/<[^>]+>/g, '')
                .trim();
              expect(
                plainDescription,
                `Expect param ${name} to have a description`
              ).not.toBe(MISSING_DESCRIPTION);
              assertDescription(description, true);
            }
          });

          it('verify @see tags', () => {
            for (const link of extractSeeAlsos(signature)) {
              if (link.startsWith('faker.')) {
                // Expected @see faker.xxx.yyy()
                expect(link, 'Expect method reference to contain ()').toContain(
                  '('
                );
                expect(link, 'Expect method reference to contain ()').toContain(
                  ')'
                );
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
                expect(allowedReferences).toContain(link.replace(/\(.*/, ''));
              }
            }
          });

          it('verify @since tag', () => {
            const since = extractSince(signature);
            expect(since, '@since to be present').toBeTruthy();
            expect(since).not.toBe(MISSING_DESCRIPTION);
            expect(since, '@since to be a valid semver').toSatisfy(
              validator.isSemVer
            );
          });
        }
      );
    }
  );
});
