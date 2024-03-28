import { describe, expect, it } from 'vitest';
import { processMethodLike } from '../../../scripts/apidocs/processing/method';
import { SignatureTest } from './method.example';
import { loadExampleMethods } from './utils';

const methods = loadExampleMethods();

describe('method', () => {
  it('dummy dependency to rerun the test if the example changes', () => {
    expect(new SignatureTest()).toBeTruthy();
  });

  it('expected and actual methods are equal', () => {
    expect(Object.keys(methods)).toMatchSnapshot();
  });

  it.each(Object.entries(methods))(
    'processMethodLike(%s)',
    (name, signature) => {
      const actual = processMethodLike(name, signature);
      actual.source = {
        filePath: actual.source.filePath,
        line: -1,
        column: -1,
      };

      expect(actual).toMatchSnapshot();
    }
  );
});
