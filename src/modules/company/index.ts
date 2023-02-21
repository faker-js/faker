import type { Faker } from '../..';
import { deprecated } from '../../internal/deprecated';

/**
 * Module to generate company related entries.
 */
export class CompanyModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      CompanyModule.prototype
    ) as Array<keyof CompanyModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns an array with possible company name suffixes.
   *
   * @see faker.company.name()
   *
   * @example
   * faker.company.suffixes() // [ 'Inc', 'and Sons', 'LLC', 'Group' ]
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.company.name` instead.
   */
  suffixes(): string[] {
    deprecated({
      deprecated: 'faker.company.suffixes',
      proposed: 'faker.company.name',
      since: '8.0',
      until: '9.0',
    });
    // Don't want the source array exposed to modification, so return a copy
    return this.faker.definitions.company.suffix.slice(0);
  }

  /**
   * Generates a random company name.
   *
   * @example
   * faker.company.name() // 'Zieme, Hauck and McClure'
   *
   * @since 7.4.0
   */
  name(): string {
    return this.faker.helpers.fake(
      this.faker.definitions.company.name_patterns
    );
  }

  /**
   * Returns a random company suffix.
   *
   * @see faker.company.name()
   *
   * @example
   * faker.company.companySuffix() // 'and Sons'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.company.name` instead.
   */
  companySuffix(): string {
    deprecated({
      deprecated: 'faker.company.companySuffix',
      proposed: 'faker.company.name',
      since: '8.0',
      until: '9.0',
    });
    return this.faker.helpers.arrayElement(this.suffixes());
  }

  /**
   * Generates a random catch phrase that can be displayed to an end user.
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
    return [this.buzzVerb(), this.buzzAdjective(), this.buzzNoun()].join(' ');
  }

  /**
   * Returns a random catch phrase adjective that can be displayed to an end user..
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
   * Returns a random catch phrase descriptor that can be displayed to an end user..
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
   * Returns a random catch phrase noun that can be displayed to an end user..
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
   *
   * @deprecated Use `faker.company.buzzAdjective` instead.
   */
  bsAdjective(): string {
    deprecated({
      deprecated: 'faker.company.bsAdjective',
      proposed: 'faker.company.buzzAdjective',
      since: '8.0',
      until: '9.0',
    });
    return this.buzzAdjective();
  }

  /**
   * Returns a random buzz adjective that can be used to demonstrate data being viewed by a manager.
   *
   * @example
   * faker.company.buzzAdjective() // 'one-to-one'
   *
   * @since 8.0.0
   */
  buzzAdjective(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.buzz_adjective
    );
  }

  /**
   * Returns a random company bs buzz word.
   *
   * @example
   * faker.company.bsBuzz() // 'empower'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.company.buzzVerb` instead.
   */
  bsBuzz(): string {
    deprecated({
      deprecated: 'faker.company.bsBuzz',
      proposed: 'faker.company.buzzVerb',
      since: '8.0',
      until: '9.0',
    });
    return this.buzzVerb();
  }

  /**
   * Returns a random buzz verb that can be used to demonstrate data being viewed by a manager.
   *
   * @example
   * faker.company.buzzVerb() // 'empower'
   *
   * @since 8.0.0
   */
  buzzVerb(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.buzz_verb
    );
  }

  /**
   * Returns a random company bs noun.
   *
   * @example
   * faker.company.bsNoun() // 'paradigms'
   *
   * @since 2.0.1
   *
   * @deprecated Use `faker.company.buzzNoun` instead.
   */
  bsNoun(): string {
    deprecated({
      deprecated: 'faker.company.bsNoun',
      proposed: 'faker.company.buzzNoun',
      since: '8.0',
      until: '9.0',
    });
    return this.buzzNoun();
  }

  /**
   * Returns a random buzz noun that can be used to demonstrate data being viewed by a manager.
   *
   * @example
   * faker.company.buzzNoun() // 'paradigms'
   *
   * @since 8.0.0
   */
  buzzNoun(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.company.buzz_noun
    );
  }
}
