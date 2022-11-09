import { beforeAll, describe, expect, it } from 'vitest';
import {
  analyzeSignature,
  initMarkdownRenderer,
} from '../../../scripts/apidoc/signature';
import { SignatureTest } from './signature.example';
import { loadExampleMethods } from './utils';

describe('signature', () => {
  describe('analyzeSignature()', () => {
    const methods = loadExampleMethods();

    beforeAll(async () => {
      await initMarkdownRenderer();
    });

    it('dummy dependency to rerun the test if the example changes', () => {
      expect(new SignatureTest()).toBeTruthy();
    });

    it('expected and actual methods are equal', () => {
      expect(Object.keys(methods).sort()).toMatchSnapshot();
    });

    it.each(Object.keys(methods).sort())('%s', (name) => {
      const method = methods[name];
      expect(method, `Method ${name} to be defined`).toBeDefined();
      const actual = analyzeSignature(method.signatures[0], null, method.name);

      expect(actual).toMatchSnapshot();
    });
  });
});
