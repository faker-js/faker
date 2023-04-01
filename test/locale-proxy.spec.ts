import { describe, expect, it } from 'vitest';
import type { AirlineDefinitions, MetadataDefinitions } from '../src';
import { en, FakerError } from '../src';
import { createLocaleAccess } from '../src/locale-proxy';

describe('LocaleAccess', () => {
  const locale = createLocaleAccess(en);
  const unavailable = createLocaleAccess({
    metadata: {} as MetadataDefinitions,
    airline: { airline: [] } as AirlineDefinitions,
  });

  it('should be possible to access the title', () => {
    expect(locale.metadata.title).toBe('English');
  });

  it('should be possible to access a missing category', () => {
    expect(locale.category).toBeDefined();
  });

  it('should not be possible to add a new category', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      locale.category = {};
    }).toThrowError(new FakerError('LocaleAccess is read-only.'));
  });

  it('should not be possible to replace a category', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      locale.airline = {};
    }).toThrowError(new FakerError('LocaleAccess is read-only.'));
  });

  it('should not be possible to access a missing entry in a missing category', () => {
    expect(() => locale.category.missing).toThrowError(
      new FakerError(
        `The locale data for 'category.missing' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://next.fakerjs.dev/guide/localization.html`
      )
    );
  });

  it('should not be possible to access a missing entry in a present category', () => {
    expect(() => locale.airline.missing).toThrowError(
      new FakerError(
        `The locale data for 'airline.missing' are missing in this locale.
  Please contribute the missing data to the project or use a locale/Faker instance that has these data.
  For more information see https://next.fakerjs.dev/guide/localization.html`
      )
    );
  });

  it('should be possible to access a present entry', () => {
    expect(locale.airline.airline).toBeDefined();
  });

  it('should not be possible to access an unavailable entry in a present category', () => {
    expect(() => unavailable.airline.airline).toThrowError(
      new FakerError(
        `The locale data for 'airline.airline' aren't applicable to this locale.
  If you think this is a bug, please report it at: https://github.com/faker-js/faker`
      )
    );
  });

  it('should not be possible to add a new entry in a missing category', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      locale.category.missing = {};
    }).toThrowError(new FakerError('LocaleAccess is read-only.'));
  });

  it('should not be possible to add a new entry in an existing category', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      locale.airline.missing = {};
    }).toThrowError(new FakerError('LocaleAccess is read-only.'));
  });

  it('should not be possible to replace an entry in an existing category', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      locale.airline.airline = [];
    }).toThrowError(new FakerError('LocaleAccess is read-only.'));
  });
});
