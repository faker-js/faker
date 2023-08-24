import type { Faker } from '../..';
import { bindThisToMemberFunctions } from '../../internal/bind-this-to-member-functions';

/**
 * Module to generate hacker/IT words and phrases.
 *
 * ### Overview
 *
 * There are methods for different parts of speech, such as [`abbreviation()`](https://fakerjs.dev/api/hacker.html#abbreviation), [`adjective()`](https://fakerjs.dev/api/hacker.html#adjective), [`noun()`](https://fakerjs.dev/api/hacker.html#noun), [`verb()`](https://fakerjs.dev/api/hacker.html#verb), and [`ingverb()`](https://fakerjs.dev/api/hacker.html#ingverb). Alternatively, [`phrase()`](https://fakerjs.dev/api/hacker.html#phrase) creates a longer phrase combining these words.
 *
 * ### Related modules
 *
 * Various modules allow for generating other types of words and phrases:
 *
 * - [faker.word](https://fakerjs.dev/api/word.html) uses general vocabulary rather than hacker-specific terms.
 * - [faker.lorem](https://fakerjs.dev/api/lorem.html) uses faux-Latin "lorem ipsum" text.
 * - [faker.company](https://fakerjs.dev/api/company.html) includes corporate catchphrases and buzzwords.
 */
export class HackerModule {
  constructor(private readonly faker: Faker) {
    bindThisToMemberFunctions(this);
  }

  /**
   * Returns a random hacker/IT abbreviation.
   *
   * @example
   * faker.hacker.abbreviation() // 'THX'
   *
   * @since 2.0.1
   */
  abbreviation(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.hacker.abbreviation
    );
  }

  /**
   * Returns a random hacker/IT adjective.
   *
   * @example
   * faker.hacker.adjective() // 'cross-platform'
   *
   * @since 2.0.1
   */
  adjective(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.hacker.adjective
    );
  }

  /**
   * Returns a random hacker/IT noun.
   *
   * @example
   * faker.hacker.noun() // 'system'
   *
   * @since 2.0.1
   */
  noun(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.noun);
  }

  /**
   * Returns a random hacker/IT verb.
   *
   * @example
   * faker.hacker.verb() // 'copy'
   *
   * @since 2.0.1
   */
  verb(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.verb);
  }

  /**
   * Returns a random hacker/IT verb, past participle.
   *
   * @example
   * faker.hacker.verbed() // 'copied'
   *
   * @since 8.0.2
   */
  verbed(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.verbed);
  }

  /**
   * Returns a random hacker/IT verb for continuous actions (en: ing suffix; e.g. hacking).
   *
   * @example
   * faker.hacker.ingverb() // 'navigating'
   *
   * @since 2.0.1
   */
  ingverb(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.hacker.ingverb
    );
  }

  /**
   * Generates a random hacker/IT phrase.
   *
   * @example
   * faker.hacker.phrase()
   * // 'If we override the card, we can get to the HDD feed through the back-end HDD sensor!'
   *
   * @since 2.0.1
   */
  phrase(): string {
    const data = {
      abbreviation: this.abbreviation,
      adjective: this.adjective,
      ingverb: this.ingverb,
      noun: this.noun,
      verb: this.verb,
      verbed: this.verbed,
    };

    const phrase = this.faker.helpers.arrayElement(
      this.faker.definitions.hacker.phrase
    );
    return this.faker.helpers.mustache(phrase, data);
  }
}
