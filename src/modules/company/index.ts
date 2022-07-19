import type { Faker } from '../..';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate company related entries.
 */
export class Company {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Company.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns an array with possible company name suffixes.
   *
   * @example
   * faker.company.suffixes() // [ 'Inc', 'and Sons', 'LLC', 'Group' ]
   */
  suffixes(): string[] {
    // Don't want the source array exposed to modification, so return a copy
    return this.faker.definitions.company.suffix.slice(0);
  }

  /**
   * Generates a random company name.
   *
   * @param format The optional format index used to select a format.
   *
   *
   * @example
   * faker.company.name() // 'Zieme, Hauck and McClure'
   *
   */
  name(format?: number): string {
    const formats = [
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
    ];

    if (typeof format !== 'number') {
      format = this.faker.datatype.number(formats.length - 1);
    }

    return this.faker.fake(formats[format]);
  }

  /**
   * Generates a random company name.
   *
   * @param format The optional format index used to select a format.
   *
   * @see faker.company.name
   *
   * @example
   * faker.company.companyName() // 'Zieme, Hauck and McClure'
   *
   * @deprecated Use `faker.company.name()` instead
   */
  companyName(format?: number): string {
    deprecated({
      deprecated: 'faker.company.companyName()',
      proposed: 'faker.company.name()',
    });

    const formats = [
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
    ];

    if (typeof format !== 'number') {
      format = this.faker.datatype.number(formats.length - 1);
    }

    return this.faker.fake(formats[format]);
  }

  /**
   * Returns a random company suffix.
   *
   * @example
   * faker.company.companySuffix() // 'and Sons'
   */
  companySuffix(): string {
    return this.faker.helpers.arrayElement(this.suffixes());
  }

  /**
   * Generates a random business catch phrase.
   *
   * @example
   * faker.company.catchPhrase() // 'Upgradable systematic flexibility'
   */
  catchPhrase(): string {
    return this.faker.fake(
      '{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}'
    );
  }

  /**
   * Generates a random company bs phrase.
   *
   * @example
   * faker.company.bs() // 'cultivate synergistic e-markets'
   */
  bs(): string {
    return this.faker.fake(
      '{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}'
    );
  }

  /**
   * Returns a random catch phrase adjective.
   *
   * @example
   * faker.company.catchPhraseAdjective() // 'Multi-tiered'
   */
  catchPhraseAdjective(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.adjective
    );
  }

  /**
   * Returns a random catch phrase descriptor.
   *
   * @example
   * faker.company.catchPhraseDescriptor() // 'composite'
   */
  catchPhraseDescriptor(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.descriptor
    );
  }

  /**
   * Returns a random catch phrase noun.
   *
   * @example
   * faker.company.catchPhraseNoun() // 'leverage'
   */
  catchPhraseNoun(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.noun);
  }

  /**
   * Returns a random company bs adjective.
   *
   * @example
   * faker.company.bsAdjective() // 'one-to-one'
   */
  bsAdjective(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.bs_adjective
    );
  }

  /**
   * Returns a random company bs buzz word.
   *
   * @example
   * faker.company.bsBuzz() // 'empower'
   */
  bsBuzz(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.bs_verb
    );
  }

  /**
   * Returns a random company bs noun.
   *
   * @example
   * faker.company.bsNoun() // 'paradigms'
   */
  bsNoun(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.bs_noun
    );
  }
}
