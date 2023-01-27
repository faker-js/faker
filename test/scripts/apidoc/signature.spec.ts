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
      expect(Object.keys(methods)).toMatchSnapshot();
    });

    it.each(Object.entries(methods))('%s', (name, signature) => {
      const actual = analyzeSignature(signature, null, name);

      expect(actual).toMatchSnapshot();
    });
  });
});
