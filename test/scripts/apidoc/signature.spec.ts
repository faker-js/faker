import { beforeAll, describe, expect, it } from 'vitest';
import { analyzeSignature } from '../../../scripts/apidoc/processing/signature';
import { initMarkdownRenderer } from '../../../scripts/apidoc/utils/markdown';
import { SignatureTest } from './signature.example';
import { loadExampleMethods } from './utils';

beforeAll(initMarkdownRenderer);
const methods = await loadExampleMethods();

describe('signature', () => {
  describe('analyzeSignature()', () => {
    it('dummy dependency to rerun the test if the example changes', () => {
      expect(new SignatureTest()).toBeTruthy();
    });

    it('expected and actual methods are equal', () => {
      expect(Object.keys(methods)).toMatchSnapshot();
    });

    it.each(Object.entries(methods))('%s', async (name, signature) => {
      const actual = await analyzeSignature(signature, '', name);

      expect(actual).toMatchSnapshot();
    });
  });
});
