import type { Faker } from '../..';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate company related entries.
 */
export class CompanyModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(CompanyModule.prototype)) {
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
   *
   * @since 2.0.1
   */
  suffixes(): string[] {
    // Don't want the source array exposed to modification, so return a copy
    return this.faker.definitions.company.suffix.slice(0);
  }

  /**
   * Generates a random company name.
   *
   * @param format The optional format index used to select a format. Deprecated, do not use.
   *
   * @example
   * faker.company.name() // 'Zieme, Hauck and McClure'
   *
   * @since 7.4.0
   */
  name(format?: number): string {
    if (format != null) {
      deprecated({
        deprecated: 'faker.company.name(format)',
        proposed: 'faker.company.name() or faker.helpers.fake(format)',
        since: '7.4',
        until: '8.0',
      });
    }

    // ToDo: This `staticFormats` pattern should be removed in the future. It is only used to maintain backwards compatibility.
    const staticFormats = [
      '{{name.lastName}} {{company.companySuffix}}',
      '{{name.lastName}} - {{name.lastName}}',
      '{{name.lastName}}, {{name.lastName}} and {{name.lastName}}',
    ];
    const formats =
      this.faker.definitions.company.name_patterns ?? staticFormats;

    if (typeof format !== 'number') {
      format = this.faker.datatype.number(formats.length - 1);
    }

    return this.faker.helpers.fake(formats[format]);
  }

  /**
   * Generates a random company name.
   *
   * @param format The optional format index used to select a format.
   *
   * @see faker.company.name()
   *
   * @example
   * faker.company.companyName() // 'Zieme, Hauck and McClure'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.company.name()` instead
   */
  companyName(format?: number): string {
    deprecated({
      deprecated: 'faker.company.companyName()',
      proposed: 'faker.company.name()',
      since: '7.4',
      until: '8.0',
    });

    return this.name(format);
  }

  /**
   * Returns a random company suffix.
   *
   * @example
   * faker.company.companySuffix() // 'and Sons'
   *
   * @since 2.0.1
   */
  companySuffix(): string {
    return this.faker.helpers.arrayElement(this.suffixes());
  }

  /**
   * Generates a random business catch phrase.
   *
   * @example
   * faker.company.catchPhrase() // 'Upgradable systematic flexibility'
   *
   * @since 2.0.1
   */
  catchPhrase(): string {
    return [
      this.catchPhraseAdjective(),
      this.catchPhraseDescriptor(),
      this.catchPhraseNoun(),
    ].join(' ');
  }

  /**
   * Generates a random company bs phrase.
   *
   * @example
   * faker.company.bs() // 'cultivate synergistic e-markets'
   *
   * @since 2.0.1
   */
  bs(): string {
    return [this.bsBuzz(), this.bsAdjective(), this.bsNoun()].join(' ');
  }

  /**
   * Returns a random catch phrase adjective.
   *
   * @example
   * faker.company.catchPhraseAdjective() // 'Multi-tiered'
   *
   * @since 2.0.1
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
   *
   * @since 2.0.1
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
   *
   * @since 2.0.1
   */
  catchPhraseNoun(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.company.noun);
  }

  /**
   * Returns a random company bs adjective.
   *
   * @example
   * faker.company.bsAdjective() // 'one-to-one'
   *
   * @since 2.0.1
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
   *
   * @since 2.0.1
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
   *
   * @since 2.0.1
   */
  bsNoun(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.bs_noun
    );
  }
}
