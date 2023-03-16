import type { Faker } from '../..';
import { FakerError } from '../../errors/faker-error';
import { deprecated } from '../../internal/deprecated';
import type { LiteralUnion } from '../../utils/types';
import type {
  AlphaChar,
  AlphaNumericChar,
  Casing,
  NumericChar,
} from '../string';

/**
 * Generates random values of different kinds.
 *
 * @deprecated Use the modules specific to the type of data you want to generate instead.
 */
export class RandomModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      // eslint-disable-next-line deprecation/deprecation
      RandomModule.prototype
      // eslint-disable-next-line deprecation/deprecation
    ) as Array<keyof RandomModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random word.
   *
   * @see faker.lorem.word()
   * @see faker.word.sample()
   *
   * @example
   * faker.random.word() // 'Seamless'
   *
   * @since 3.1.0
   *
   * @deprecated Use `faker.lorem.word()` or `faker.word.sample()` instead.
   */
  word(): string {
    deprecated({
      deprecated: 'faker.random.word()',
      proposed: 'faker.lorem.word() or faker.word.sample()',
      since: '8.0',
      until: '9.0',
    });

    const wordMethods = [
      this.faker.location.cardinalDirection,
      this.faker.location.cityName,
      this.faker.location.country,
      this.faker.location.county,
      this.faker.location.direction,
      this.faker.location.ordinalDirection,
      this.faker.location.state,
      this.faker.location.street,

      this.faker.color.human,

      this.faker.commerce.department,
      this.faker.commerce.product,
      this.faker.commerce.productAdjective,
      this.faker.commerce.productMaterial,
      this.faker.commerce.productName,

      this.faker.company.buzzAdjective,
      this.faker.company.buzzNoun,
      this.faker.company.buzzVerb,
      this.faker.company.catchPhraseAdjective,
      this.faker.company.catchPhraseDescriptor,
      this.faker.company.catchPhraseNoun,

      this.faker.finance.accountName,
      this.faker.finance.currencyName,
      this.faker.finance.transactionType,

      this.faker.hacker.abbreviation,
      this.faker.hacker.adjective,
      this.faker.hacker.ingverb,
      this.faker.hacker.noun,
      this.faker.hacker.verb,

      this.faker.lorem.word,

      this.faker.music.genre,

      this.faker.person.gender,
      this.faker.person.jobArea,
      this.faker.person.jobDescriptor,
      this.faker.person.jobTitle,
      this.faker.person.jobType,
      this.faker.person.sex,

      () => this.faker.science.chemicalElement().name,
      () => this.faker.science.unit().name,

      this.faker.vehicle.bicycle,
      this.faker.vehicle.color,
      this.faker.vehicle.fuel,
      this.faker.vehicle.manufacturer,
      this.faker.vehicle.type,

      this.faker.word.adjective,
      this.faker.word.adverb,
      this.faker.word.conjunction,
      this.faker.word.interjection,
      this.faker.word.noun,
      this.faker.word.preposition,
      this.faker.word.verb,
    ];

    const bannedChars = [
      '!',
      '#',
      '%',
      '&',
      '*',
      ')',
      '(',
      '+',
      '=',
      '.',
      '<',
      '>',
      '{',
      '}',
      '[',
      ']',
      ':',
      ';',
      "'",
      '"',
      '_',
      '-',
    ];
    let result: string;

    do {
      // randomly pick from the many faker methods that can generate words
      const randomWordMethod = this.faker.helpers.arrayElement(wordMethods);

      try {
        result = randomWordMethod();
      } catch {
        // catch missing locale data potentially required by randomWordMethod
        continue;
      }
    } while (!result || bannedChars.some((char) => result.includes(char)));

    return this.faker.helpers.arrayElement(result.split(' '));
  }

  /**
   * Returns a string with a given number of random words.
   *
   * @param count The number or range of words. Defaults to a random value between `1` and `3`.
   * @param count.min The minimum number of words. Defaults to `1`.
   * @param count.max The maximum number of words. Defaults to `3`.
   *
   * @see faker.lorem.words()
   * @see faker.word.words()
   *
   * @example
   * faker.random.words() // 'neural'
   * faker.random.words(5) // 'copy Handcrafted bus client-server Point'
   * faker.random.words({ min: 3, max: 5 }) // 'cool sticky Borders'
   *
   * @since 3.1.0
   *
   * @deprecated Use `faker.lorem.words()` or `faker.word.words()` instead.
   */
  words(
    count:
      | number
      | {
          /**
           * The minimum number of words.
           */
          min: number;
          /**
           * The maximum number of words.
           */
          max: number;
        } = { min: 1, max: 3 }
  ): string {
    deprecated({
      deprecated: 'faker.random.words()',
      proposed: 'faker.lorem.words() or faker.word.words()',
      since: '8.0',
      until: '9.0',
    });

    // eslint-disable-next-line deprecation/deprecation
    return this.faker.helpers.multiple(this.word, { count }).join(' ');
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @example
   * faker.helpers.objectKey(allLocales)
   * faker.helpers.objectValue(allFakers)
   *
   * @since 3.1.0
   *
   * @deprecated Use `faker.helpers.objectKey(allLocales/allFakers)` instead.
   */
  private locale(): never {
    // We cannot invoke this ourselves, because this would link to all locale data and increase the bundle size by a lot.
    throw new FakerError(
      'This method has been removed. Please use `faker.helpers.objectKey(allLocales/allFakers)` instead.'
    );
  }

  /**
   * Generating a string consisting of letters in the English alphabet.
   *
   * @param options Either the number of characters or an options instance. Defaults to `{ count: 1, casing: 'mixed', bannedChars: [] }`.
   * @param options.count The number of characters to generate. Defaults to `1`.
   * @param options.casing The casing of the characters. Defaults to `'mixed'`.
   * @param options.bannedChars An array with characters to exclude. Defaults to `[]`.
   *
   * @see faker.string.alpha()
   *
   * @example
   * faker.random.alpha() // 'b'
   * faker.random.alpha(10) // 'qccrabobaf'
   * faker.random.alpha({ count: 5, casing: 'upper', bannedChars: ['A'] }) // 'DTCIC'
   *
   * @since 5.0.0
   *
   * @deprecated Use faker.string.alpha() instead.
   */
  alpha(
    options:
      | number
      | {
          /**
           * The number of characters to generate.
           *
           * @default 1
           */
          count?: number;
          /**
           * The casing of the characters.
           *
           * @default 'mixed'
           */
          casing?: Casing;
          /**
           * An array with characters to exclude.
           *
           * @default []
           */
          bannedChars?: ReadonlyArray<LiteralUnion<AlphaChar>> | string;
        } = {}
  ): string {
    deprecated({
      deprecated: 'faker.random.alpha()',
      proposed: 'faker.string.alpha()',
      since: '8.0',
      until: '9.0',
    });
    if (typeof options === 'number') {
      return this.faker.string.alpha(options);
    }

    return this.faker.string.alpha({
      length: options.count,
      casing: options.casing,
      exclude: options.bannedChars,
    });
  }

  /**
   * Generating a string consisting of alpha characters and digits.
   *
   * @param count The number of characters and digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{ bannedChars: [] }`.
   * @param options.casing The casing of the characters. Defaults to `'lower'`.
   * @param options.bannedChars An array of characters and digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @see faker.string.alphanumeric()
   *
   * @example
   * faker.random.alphaNumeric() // '2'
   * faker.random.alphaNumeric(5) // '3e5v7'
   * faker.random.alphaNumeric(5, { bannedChars: ["a"] }) // 'xszlm'
   *
   * @since 3.1.0
   *
   * @deprecated Use faker.string.alphanumeric() instead.
   */
  alphaNumeric(
    count: number = 1,
    options: {
      /**
       * The casing of the characters.
       *
       * @default 'lower'
       */
      casing?: Casing;
      /**
       * An array of characters and digits which should be banned in the generated string.
       *
       * @default []
       */
      bannedChars?: ReadonlyArray<LiteralUnion<AlphaNumericChar>> | string;
    } = {}
  ): string {
    deprecated({
      deprecated: 'faker.random.alphaNumeric()',
      proposed: 'faker.string.alphanumeric()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.alphanumeric({
      length: count,
      exclude: options.bannedChars,
      casing: options.casing,
    });
  }

  /**
   * Generates a given length string of digits.
   *
   * @param length The number of digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{}`.
   * @param options.allowLeadingZeros Whether leading zeros are allowed or not. Defaults to `true`.
   * @param options.bannedDigits An array of digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @see faker.string.numeric()
   *
   * @example
   * faker.random.numeric() // '2'
   * faker.random.numeric(5) // '31507'
   * faker.random.numeric(42) // '00434563150765416546479875435481513188548'
   * faker.random.numeric(42, { allowLeadingZeros: true }) // '00564846278453876543517840713421451546115'
   * faker.random.numeric(6, { bannedDigits: ['0'] }) // '943228'
   *
   * @since 6.3.0
   *
   * @deprecated Use faker.string.numeric() instead.
   */
  numeric(
    length: number = 1,
    options: {
      /**
       * Whether leading zeros are allowed or not.
       *
       * @default true
       */
      allowLeadingZeros?: boolean;
      /**
       * An array of digits which should be banned in the generated string.
       *
       * @default []
       */
      bannedDigits?: ReadonlyArray<LiteralUnion<NumericChar>> | string;
    } = {}
  ): string {
    deprecated({
      deprecated: 'faker.random.numeric()',
      proposed: 'faker.string.numeric()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.numeric({
      length,
      allowLeadingZeros: options.allowLeadingZeros,
      exclude: options.bannedDigits,
    });
  }
}
