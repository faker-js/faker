import { describe, expect, it } from 'vitest';
import { createFakerCore } from '../../src/core';
import { toBase64 } from '../../src/internal/base64';
import { fakeHelpersMultiple } from '../../src/modules/helpers/multiple';
import { fakeStringAlphanumeric } from '../../src/modules/string/alphanumeric';

// This test is kind of useless, because during testing the Buffer object is always available.
describe('toBase64', () => {
  const fakerCore = createFakerCore();

  it.each(
    fakeHelpersMultiple(
      fakerCore,
      (fakerCore) =>
        fakeStringAlphanumeric(fakerCore, { length: { min: 0, max: 100 } }),
      { count: 5 }
    )
  )(
    "should behave the same as `Buffer.from(value).toString('base64')`",
    (value) => {
      expect(toBase64(value)).toBe(Buffer.from(value).toString('base64'));
    }
  );
});
