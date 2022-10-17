import type { Faker } from '../..';
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
 */
export class RandomModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(RandomModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns random word.
   *
   * @example
   * faker.random.word() // 'Seamless'
   *
   * @since 3.1.0
   */
  word(): string {
    const wordMethods = [
      this.faker.address.cardinalDirection,
      this.faker.address.cityName,
      this.faker.address.country,
      this.faker.address.county,
      this.faker.address.direction,
      this.faker.address.ordinalDirection,
      this.faker.address.state,
      this.faker.address.street,

      this.faker.color.human,

      this.faker.commerce.department,
      this.faker.commerce.product,
      this.faker.commerce.productAdjective,
      this.faker.commerce.productMaterial,
      this.faker.commerce.productName,

      this.faker.company.bsAdjective,
      this.faker.company.bsBuzz,
      this.faker.company.bsNoun,
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
   * Returns string with set of random words.
   *
   * @param count Number of words. Defaults to a random value between `1` and `3`.
   *
   * @example
   * faker.random.words() // 'neural'
   * faker.random.words(5) // 'copy Handcrafted bus client-server Point'
   *
   * @since 3.1.0
   */
  words(count?: number): string {
    const words: string[] = [];

    if (count == null) {
      count = this.faker.datatype.number({ min: 1, max: 3 });
    }

    for (let i = 0; i < count; i++) {
      words.push(this.word());
    }

    return words.join(' ');
  }

  /**
   * Returns a random locale, that is available in this faker instance.
   * You can use the returned locale with `faker.setLocale(result)`.
   *
   * @example
   * faker.random.locale() // 'el'
   *
   * @since 3.1.0
   */
  locale(): string {
    return this.faker.helpers.arrayElement(Object.keys(this.faker.locales));
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
          count?: number;
          casing?: Casing;
          bannedChars?: readonly LiteralUnion<AlphaChar>[] | string;
        } = {}
  ): string {
    deprecated({
      deprecated: 'faker.random.alpha()',
      proposed: 'faker.string.alpha()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.alpha(options);
  }

  /**
   * Generating a string consisting of alpha characters and digits.
   *
   * @param count The number of characters and digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{ bannedChars: [] }`.
   * @param options.casing The casing of the characters. Defaults to `'lower'`.
   * @param options.bannedChars An array of characters and digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @see faker.string.alphaNumeric()
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
      casing?: Casing;
      bannedChars?: readonly LiteralUnion<AlphaNumericChar>[] | string;
    } = {}
  ): string {
    deprecated({
      deprecated: 'faker.random.alphaNumeric()',
      proposed: 'faker.string.alphanumeric()',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.string.alphanumeric({
      count,
      bannedChars: options.bannedChars,
      casing: options.casing,
    });
  }

  /**
   * Generates a given length string of digits.
   *
   * @param length The number of digits to generate. Defaults to `1`.
   * @param options The options to use. Defaults to `{}`.
   * @param options.allowLeadingZeros If true, leading zeros will be allowed. Defaults to `false`.
   * @param options.bannedDigits An array of digits which should be banned in the generated string. Defaults to `[]`.
   *
   * @see faker.string.numeric()
   *
   * @example
   * faker.random.numeric() // '2'
   * faker.random.numeric(5) // '31507'
   * faker.random.numeric(42) // '56434563150765416546479875435481513188548'
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
      allowLeadingZeros?: boolean;
      bannedDigits?: readonly LiteralUnion<NumericChar>[] | string;
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
      bannedDigits: options.bannedDigits,
    });
  }
}
