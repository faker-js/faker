import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { DeclarationReflection, SignatureReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc';
import type { SpyInstance } from 'vitest';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  extractRawExamples,
  isDeprecated,
} from '../../../scripts/apidoc/utils';
import { faker } from '../../../src';
import { loadProject } from './utils';

/*
 * This test ensures, that every method
 * - has working examples
 * - and running these does not log anything, unless the method is deprecated
 */

const locales: Record<string, string> = {
  GH: 'en_GH',
  US: 'en_US',
  DE: 'de',
};

describe('examples and deprecations', () => {
  const project = loadProject();

  const directs: DeclarationReflection[] = project
    .getChildrenByKind(ReflectionKind.Class)
    .filter((ref) => ref.name === 'Faker')[0]
    .getChildrenByKind(ReflectionKind.Property)
    .filter((ref) => ['fake', 'unique'].includes(ref.name));

  const modules: Record<string, DeclarationReflection[]> = project
    .getChildrenByKind(ReflectionKind.Namespace)[0]
    .getChildrenByKind(ReflectionKind.Class)
    .filter((ref) => faker[ref.name.toLowerCase()] && ref.name !== 'Mersenne')
    .reduce(
      (a, v) => ({
        ...a,
        [v.name]: v.getChildrenByKind(ReflectionKind.Method),
      }),
      { directs }
    );

  const consoleSpies: Array<SpyInstance> = Object.keys(console)
    .filter((key) => typeof console[key] === 'function')
    .map((methodName) => vi.spyOn(console, methodName as keyof typeof console));

  afterAll(() => {
    faker.locale = 'en';
    for (const spy of consoleSpies) {
      spy.mockRestore();
    }
  });

  describe.each(Object.entries(modules))('%s', (moduleName, methods) => {
    const methodsByName: Record<string, DeclarationReflection> = methods.reduce(
      (a, v) => ({ ...a, [v.name]: v }),
      {}
    );

    beforeEach(() => {
      faker.locale = 'en';
      for (const spy of consoleSpies) {
        spy.mockReset();
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    it.each(Object.entries(methodsByName))('%s', async (methodName, method) => {
      const signatures: SignatureReflection[] =
        method.signatures || method.type?.['declaration'].signatures;
      const signature = signatures[signatures.length - 1];

      // Extract examples and make them runnable
      let examples = extractRawExamples(signature).join('').trim() ?? '';
      examples = examples.replace(
        /faker([A-Z]{2})\./g,
        (_, locale: string) => `faker.locale = '${locales[locale]}';\nfaker.`
      );

      expect(examples, `${moduleName}.${methodName} to have examples`).not.toBe(
        ''
      );

      // Save examples to a file to run it
      const dir = resolve(__dirname, 'temp', moduleName);
      mkdirSync(dir, { recursive: true });
      const path = resolve(dir, `${methodName}.ts`);
      writeFileSync(
        path,
        `import { faker } from '../../../../../src';\n${examples}`
      );

      // Run the examples
      await import(path);

      // Verify logging
      const deprecatedFlag = isDeprecated(signature);
      if (deprecatedFlag) {
        expect(consoleSpies[1]).toHaveBeenCalled();
      } else {
        for (const spy of consoleSpies) {
          expect(spy).not.toHaveBeenCalled();
        }
      }
    });
  });
});
