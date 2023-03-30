import type { Faker } from '../..';

/**
 * Module to generate hacker/IT words and phrases.
 *
 * ### Overview
 *
 * There are methods for different parts of speech, such as [`abbreviation()`](https://next.fakerjs.dev/api/hacker.html#abbreviation), [`adjective()`](https://next.fakerjs.dev/api/hacker.html#adjective), [`noun()`](https://next.fakerjs.dev/api/hacker.html#noun), [`verb()`](https://next.fakerjs.dev/api/hacker.html#verb), and [`ingverb()`](https://next.fakerjs.dev/api/hacker.html#ingverb). Alternatively, [`phrase()`](https://next.fakerjs.dev/api/hacker.html#phrase) creates a longer phrase combining these words.
 *
 * ### Related modules
 *
 * Various modules allow for generating other types of words and phrases:
 *
 * - [faker.word](https://next.fakerjs.dev/api/word.html) uses general vocabulary rather than hacker-specific terms.
 * - [faker.lorem](https://next.fakerjs.dev/api/lorem.html) uses faux-Latin "lorem ipsum" text.
 * - [faker.company](https://next.fakerjs.dev/api/company.html) includes corporate catchphrases and buzzwords.
 */
export class HackerModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      HackerModule.prototype
    ) as Array<keyof HackerModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
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
    };

    const phrase = this.faker.helpers.arrayElement(
      this.faker.definitions.hacker.phrase
    );
    return this.faker.helpers.mustache(phrase, data);
  }
}
