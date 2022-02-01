import type { Faker } from '.';

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
   * abbreviation
   *
   * @method faker.hacker.abbreviation
   */
  abbreviation(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.hacker.abbreviation
    );
  }

  /**
   * adjective
   *
   * @method faker.hacker.adjective
   */
  adjective(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.hacker.adjective
    );
  }

  /**
   * noun
   *
   * @method faker.hacker.noun
   */
  noun(): string {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.noun);
  }

  /**
   * verb
   *
   * @method faker.hacker.verb
   */
  verb(): string {
    return this.faker.random.arrayElement(this.faker.definitions.hacker.verb);
  }

  /**
   * ingverb
   *
   * @method faker.hacker.ingverb
   */
  ingverb(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.hacker.ingverb
    );
  }

  /**
   * phrase
   *
   * @method faker.hacker.phrase
   */
  phrase(): string {
    const data = {
      abbreviation: this.abbreviation,
      adjective: this.adjective,
      ingverb: this.ingverb,
      noun: this.noun,
      verb: this.verb,
    };

    const phrase = this.faker.random.arrayElement(
      this.faker.definitions.hacker.phrase
    );
    return this.faker.helpers.mustache(phrase, data);
  }
}
