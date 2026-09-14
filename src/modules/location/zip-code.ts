import type { FakerCore } from '../../core';
import { FakerError } from '../../errors/faker-error';
import { Faker } from '../../faker';
import { arrayElement } from '../helpers/array-element';
import { replaceSymbols } from '../helpers/replace-symbols';

/**
 * Generates random zip code from specified format. If format is not specified,
 * the locale's zip format is used.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The format used to generate the zip code or an options object.
 * @param options.state The state to generate the zip code for.
 * If the current locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
 * @param options.format The optional format used to generate the zip code.
 * By default, a random format is used from the locale zip formats.
 * This won't be used if the state option is specified.
 *
 * @see helpersReplaceSymbols(fakerCore): For more information about how the pattern is used.
 *
 * @example
 * zipCode(fakerCore) // '17839'
 * zipCode(fakerCore, '####') // '6925'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function zipCode(
  fakerCore: FakerCore,
  options:
    | string
    | {
        /**
         * The state to generate the zip code for.
         *
         * If the current locale does not have a corresponding `postcode_by_state` definition, an error is thrown.
         */
        state?: string;
        /**
         * The optional format used to generate the zip code.
         *
         * This won't be used if the state option is specified.
         *
         * @default faker.definitions.location.postcode
         */
        format?: string;
      } = {}
): string {
  if (typeof options === 'string') {
    options = { format: options };
  }

  const { state } = options;

  if (state != null) {
    const zipPattern = fakerCore.locale.location.postcode_by_state[state];

    if (zipPattern == null) {
      throw new FakerError(`No zip code definition found for state "${state}"`);
    }

    return new Faker(fakerCore).helpers.fake(zipPattern);
  }

  let { format = fakerCore.locale.location.postcode } = options;
  if (typeof format === 'string') {
    format = [format];
  }

  format = arrayElement(fakerCore, format);

  return replaceSymbols(fakerCore, format);
}
