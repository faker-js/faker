import { describe, expect, it } from 'vitest';
import { allLocales } from '../src';
import './vitest-extensions';

function checkLocaleData(data: unknown) {
  if (Array.isArray(data)) {
    it('should not have duplicate entries', () => {
      expect(data).not.toContainDuplicates();
    });
  } else if (typeof data === 'object' && data != null) {
    for (const [nestedKey, nestedData] of Object.entries(data)) {
      describe(nestedKey, () => {
        checkLocaleData(nestedData);
      });
    }
  } else {
    it.skip(`primitives cannot be tested`);
  }
}

describe('locale-data', () => {
  checkLocaleData(allLocales);
});
