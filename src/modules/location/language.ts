import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random spoken language.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @see [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1)
 * @see [ISO 639-2](https://en.wikipedia.org/wiki/ISO_639-2)
 * @see [ISO 639-2 Language Code List](https://www.loc.gov/standards/iso639-2/php/code_list.php)
 *
 * @example
 * language(fakerCore) // { alpha2: 'de', alpha3: 'deu', name: 'German' }
 * language(fakerCore).name // German
 * language(fakerCore).alpha2 // de
 * language(fakerCore).alpha3 // deu
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function language(fakerCore: FakerCore): Language {
  return arrayElement(fakerCore, fakerCore.locale.location.language);
}
