import type { Faker } from '../..';

/**
 * Module to generate hacker/IT words and phrases.
 */
export class Hacker {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Hacker.prototype)) {
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
   */
  noun(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.noun);
  }

  /**
   * Returns a random hacker/IT verb.
   *
   * @example
   * faker.hacker.verb() // 'copy'
   */
  verb(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.hacker.verb);
  }

  /**
   * Returns a random hacker/IT verb for continuous actions (en: ing suffix; e.g. hacking).
   *
   * @example
   * faker.hacker.ingverb() // 'navigating'
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
