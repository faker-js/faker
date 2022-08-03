import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import type { Method } from '../../../docs/.vitepress/components/api-docs/method';
import {
  analyzeSignature,
  initMarkdownRenderer,
} from '../../../scripts/apidoc/signature';
import { SignatureTest } from './signature.example';
import expected_ from './signature.expected.json';
import { loadExampleMethods } from './utils';

const expected: Record<string, Method> = expected_;

function prettyJson(object): string {
  return JSON.stringify(object, null, 2);
}

describe('signature', () => {
  describe('analyzeSignature()', () => {
    const actuals = {};
    const methods = loadExampleMethods();

    beforeAll(async () => {
      await initMarkdownRenderer();
    });

    it('dummy dependency to rerun the test if the example changes', () => {
      expect(new SignatureTest()).toBeTruthy();
    });

    it('expected and actual methods are equal', () => {
      expect(Object.keys(methods).sort()).toEqual(Object.keys(expected).sort());
    });

    it.each(Object.keys(expected).sort())('%s', (name) => {
      const method = methods[name];
      expect(method, `Method ${name} to be defined`).toBeDefined();
      const actual = analyzeSignature(
        method.signatures[0],
        '' /* null */,
        method.name
      );
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
