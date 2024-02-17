import { describe, expect, it } from 'vitest';
import { processMethodLike } from '../../../scripts/apidoc/processing/method';
import { SignatureTest } from './signature.example';
import { loadExampleFunctions } from './utils';

const methods = Object.fromEntries(
  loadExampleFunctions().map((fn) => [fn.getName(), fn])
);

describe('signature', () => {
  describe('analyzeSignature()', () => {
    it('dummy dependency to rerun the test if the example changes', () => {
      expect(new SignatureTest()).toBeTruthy();
    });

    it('expected and actual methods are equal', () => {
      expect(Object.keys(methods)).toMatchSnapshot();
    });

    it.each(Object.entries(methods))('%s', (name, signature) => {
      const actual = processMethodLike(name, signature);

      expect(actual).toMatchSnapshot();
    });
  });
});
