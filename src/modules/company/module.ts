import { ModuleBase } from '../../internal/module-base';
import { buzzAdjective as companyBuzzAdjective } from './buzz-adjective';
import { buzzNoun as companyBuzzNoun } from './buzz-noun';
import { buzzPhrase as companyBuzzPhrase } from './buzz-phrase';
import { buzzVerb as companyBuzzVerb } from './buzz-verb';
import { catchPhrase as companyCatchPhrase } from './catch-phrase';
import { catchPhraseAdjective as companyCatchPhraseAdjective } from './catch-phrase-adjective';
import { catchPhraseDescriptor as companyCatchPhraseDescriptor } from './catch-phrase-descriptor';
import { catchPhraseNoun as companyCatchPhraseNoun } from './catch-phrase-noun';
import { name as companyName } from './name';

/**
 * Module to generate company related entries.
 *
 * ### Overview
 *
 * To generate a random company name, use [`name()`](https://fakerjs.dev/api/company.html#name). This is localized in many locales.
 *
 * To generate jargon-filled company catchphrases and buzzwords, use [`catchPhrase()`](https://fakerjs.dev/api/company.html#catchphrase) or [`buzzPhrase()`](https://fakerjs.dev/api/company.html#buzzphrase).
 *
 * ### Related Modules
 *
 * - For products and commerce, use [`faker.commerce`](https://fakerjs.dev/api/commerce.html).
 * - For finance-related entries, use [`faker.finance`](https://fakerjs.dev/api/finance.html).
 */
export class CompanyModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree company' to update the methods from their respective files.
   */

  /**
   * Generates a random company name.
   *
   * @example
   * faker.company.name() // 'Zieme, Hauck and McClure'
   *
   * @since 7.4.0
   */
  name(): string {
    return companyName(this.faker.fakerCore);
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
    return companyCatchPhrase(this.faker.fakerCore);
  }

  /**
   * Generates a random buzz phrase that can be used to demonstrate data being viewed by a manager.
   *
   * @example
   * faker.company.buzzPhrase() // 'cultivate synergistic e-markets'
   *
   * @since 8.0.0
   */
  buzzPhrase(): string {
    return companyBuzzPhrase(this.faker.fakerCore);
  }

  /**
   * Returns a random catch phrase adjective that can be displayed to an end user.
   *
   * @example
   * faker.company.catchPhraseAdjective() // 'Multi-tiered'
   *
   * @since 2.0.1
   */
  catchPhraseAdjective(): string {
    return companyCatchPhraseAdjective(this.faker.fakerCore);
  }

  /**
   * Returns a random catch phrase descriptor that can be displayed to an end user.
   *
   * @example
   * faker.company.catchPhraseDescriptor() // 'composite'
   *
   * @since 2.0.1
   */
  catchPhraseDescriptor(): string {
    return companyCatchPhraseDescriptor(this.faker.fakerCore);
  }

  /**
   * Returns a random catch phrase noun that can be displayed to an end user.
   *
   * @example
   * faker.company.catchPhraseNoun() // 'leverage'
   *
   * @since 2.0.1
   */
  catchPhraseNoun(): string {
    return companyCatchPhraseNoun(this.faker.fakerCore);
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
    return companyBuzzAdjective(this.faker.fakerCore);
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
    return companyBuzzVerb(this.faker.fakerCore);
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
    return companyBuzzNoun(this.faker.fakerCore);
  }
}
