import type { Faker } from '.';
import type { Fake } from './fake';

export class Company {
  readonly f: Fake['fake'];

  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Company.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    this.f = this.faker.fake;
  }

  /**
   * suffixes
   *
   * @method faker.company.suffixes
   */
  suffixes(): string[] {
    // Don't want the source array exposed to modification, so return a copy
    return this.faker.definitions.company.suffix.slice(0);
  }

  /**
   * companyName
   *
   * @method faker.company.companyName
   * @param format
   */
  companyName(format?: number): string {
    const formats = [
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
    ];

    if (typeof format !== 'number') {
      format = this.faker.datatype.number(formats.length - 1);
    }

    return this.f(formats[format]);
  }

  /**
   * companySuffix
   *
   * @method faker.company.companySuffix
   */
  companySuffix(): string {
    return this.faker.random.arrayElement(this.faker.company.suffixes());
  }

  /**
   * catchPhrase
   *
   * @method faker.company.catchPhrase
   */
  catchPhrase(): string {
    return this.f(
      '{{company.catchPhraseAdjective}} {{company.catchPhraseDescriptor}} {{company.catchPhraseNoun}}'
    );
  }

  /**
   * bs
   *
   * @method faker.company.bs
   */
  bs(): string {
    return this.f(
      '{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}'
    );
  }

  /**
   * catchPhraseAdjective
   *
   * @method faker.company.catchPhraseAdjective
   */
  catchPhraseAdjective(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.company.adjective
    );
  }

  /**
   * catchPhraseDescriptor
   *
   * @method faker.company.catchPhraseDescriptor
   */
  catchPhraseDescriptor(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.company.descriptor
    );
  }

  /**
   * catchPhraseNoun
   *
   * @method faker.company.catchPhraseNoun
   */
  catchPhraseNoun(): string {
    return this.faker.random.arrayElement(this.faker.definitions.company.noun);
  }

  /**
   * bsAdjective
   *
   * @method faker.company.bsAdjective
   */
  bsAdjective(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.company.bs_adjective
    );
  }

  /**
   * bsBuzz
   *
   * @method faker.company.bsBuzz
   */
  bsBuzz(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.company.bs_verb
    );
  }

  /**
   * bsNoun
   *
   * @method faker.company.bsNoun
   */
  bsNoun(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.company.bs_noun
    );
  }
}
