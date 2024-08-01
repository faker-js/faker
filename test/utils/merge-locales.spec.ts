import { describe, expect, it } from 'vitest';
import type { LocaleDefinition } from '../../src';
import { mergeLocales } from '../../src/utils/merge-locales';

describe('mergeLocales', () => {
  it('should not overwrite entries', () => {
    const locale1: LocaleDefinition = {
      metadata: { title: 'a' },
      person: { firstName: ['a'] },
      finance: { credit_card: { visa: ['a'] } },
    };
    const locale2: LocaleDefinition = {
      metadata: { title: 'b' },
      person: { firstName: ['b'] },
      finance: { credit_card: { mastercard: ['b'] } },
    };
    const locale3: LocaleDefinition = {
      metadata: { title: 'c' },
      person: { firstName: ['c'] },
      finance: { credit_card: {} },
    };

    const merged = mergeLocales([locale1, locale2, locale3]);

    expect(merged).toEqual({
      metadata: { title: 'a' },
      person: { firstName: ['a'] },
      finance: { credit_card: { visa: ['a'] } },
    });
  });

  it('should not overwrite not applicable data', () => {
    const locale1: LocaleDefinition = {
      metadata: { title: 'a' },
      location: {
        city: null,
        country: null,
      },
    };
    const locale2: LocaleDefinition = {
      metadata: { title: 'b' },
      location: {
        city: ['b'],
      },
    };
    const locale3: LocaleDefinition = {
      metadata: { title: 'c' },
      location: {
        city: ['c'],
        country: ['c'],
      },
    };
    const merged = mergeLocales([locale1, locale2, locale3]);

    expect(merged).toEqual({
      metadata: { title: 'a' },
      location: {
        city: null,
        country: null,
      },
    });
  });

  it('should extend categories', () => {
    const locale1: LocaleDefinition = {
      metadata: { title: 'a' },
      location: { city: ['a'] },
      person: { suffix: ['a'] },
    };
    const locale2: LocaleDefinition = {
      metadata: { title: 'b' },
      animal: { cat: ['b'] },
      person: { bio_pattern: ['b'] },
    };
    const locale3: LocaleDefinition = {
      metadata: { title: 'c' },
      color: { human: ['c'] },
      person: {},
    };

    const merged = mergeLocales([locale1, locale2, locale3]);

    expect(merged).toEqual({
      metadata: { title: 'a' },
      animal: { cat: ['b'] },
      color: { human: ['c'] },
      location: { city: ['a'] },
      person: { suffix: ['a'], bio_pattern: ['b'] },
    });
  });
});
