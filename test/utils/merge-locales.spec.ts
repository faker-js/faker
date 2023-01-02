import { describe, expect, it } from 'vitest';
import type { LocaleDefinition } from '../../src';
import { mergeLocales } from '../../src/utils/merge-locales';

describe('mergeLocales', () => {
  it('should overwrite locales', () => {
    const locale1: LocaleDefinition = {
      title: 'a',
      person: { firstName: ['a'] },
      finance: { credit_card: { visa: ['a'] } },
    };
    const locale2: LocaleDefinition = {
      title: 'b',
      person: { firstName: ['b'] },
      finance: { credit_card: { mastercard: ['b'] } },
    };
    const locale3: LocaleDefinition = {
      title: 'c',
      person: { firstName: ['c'] },
      finance: { credit_card: {} },
    };

    const merged = mergeLocales([locale1, locale2, locale3]);

    expect(merged).toEqual({
      title: 'a',
      person: { firstName: ['a'] },
      finance: { credit_card: { visa: ['a'] } },
    });
  });

  it('should extend locales', () => {
    const locale1: LocaleDefinition = {
      title: 'a',
      location: { city: ['a'] },
      person: { first_name: ['a'] },
    };
    const locale2: LocaleDefinition = {
      title: 'b',
      animal: { cat: ['b'] },
      person: { last_name: ['b'] },
    };
    const locale3: LocaleDefinition = {
      title: 'c',
      color: { human: ['c'] },
      person: {},
    };

    const merged = mergeLocales([locale1, locale2, locale3]);

    expect(merged).toEqual({
      title: 'a',
      animal: { cat: ['b'] },
      color: { human: ['c'] },
      location: { city: ['a'] },
      person: { first_name: ['a'], last_name: ['b'] },
    });
  });
});
