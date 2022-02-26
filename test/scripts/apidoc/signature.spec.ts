import { writeFileSync } from 'fs';
import { resolve } from 'path';
import * as TypeDoc from 'typedoc';
import { afterAll, describe, expect, it } from 'vitest';
import type { Method } from '../../../docs/.vitepress/components/api-docs/method';
import { analyzeSignature } from '../../../scripts/apidoc/signature';
import expected_ from './signature.expected.json';
const expected: Record<string, Method> = expected_;

function prettyJson(object): string {
  return JSON.stringify(object, null, 2);
}

describe('signature', () => {
  const app = new TypeDoc.Application();

  app.options.addReader(new TypeDoc.TSConfigReader());

  app.bootstrap({
    entryPoints: ['test/scripts/apidoc/signature.example.ts'],
    tsconfig: 'test/scripts/apidoc/tsconfig.json',
  });

  const methods: Record<string, TypeDoc.DeclarationReflection> = app
    .convert()
    .getChildrenByKind(TypeDoc.ReflectionKind.Class)[0]
    .getChildrenByKind(TypeDoc.ReflectionKind.Method)
    .reduce((a, v) => ({ ...a, [v.name]: v }), {});

  describe('analyzeSignature()', () => {
    const actuals = {};

    it.each(Object.keys(expected))('%s', (name) => {
      const method = methods[name];
      const actual = analyzeSignature(method.signatures[0], null, method.name);
      actuals[name] = actual;

      expect(prettyJson(actual)).toBe(prettyJson(expected[name]));
    });

    afterAll(() => {
      // Write to file for easier comparison
      writeFileSync(
        resolve('test', 'scripts', 'apidoc', 'signature.actuals.json'),
        prettyJson(actuals)
      );
    });
  });
});
