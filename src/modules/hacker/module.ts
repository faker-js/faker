import { ModuleBase } from '../../internal/module-base';
import { abbreviation as hackerAbbreviation } from './abbreviation';
import { adjective as hackerAdjective } from './adjective';
import { ingverb as hackerIngverb } from './ingverb';
import { noun as hackerNoun } from './noun';
import { phrase as hackerPhrase } from './phrase';
import { verb as hackerVerb } from './verb';

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
export class HackerModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree hacker' to update the methods from their respective files.
   */

  /**
   * Returns a random hacker/IT abbreviation.
   *
   * @example
   * faker.hacker.abbreviation() // 'THX'
   *
   * @since 2.0.1
   */
  abbreviation(): string {
    return hackerAbbreviation(this.faker.fakerCore);
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
    return hackerAdjective(this.faker.fakerCore);
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
    return hackerNoun(this.faker.fakerCore);
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
    return hackerVerb(this.faker.fakerCore);
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
    return hackerIngverb(this.faker.fakerCore);
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
    return hackerPhrase(this.faker.fakerCore);
  }
}
