import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random localized street address.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Whether to use a full address or an options object.
 * @param options.useFullAddress When true this will generate a full address.
 * Otherwise it will just generate a street address.
 *
 * @example
 * streetAddress(fakerCore) // '0917 O'Conner Estates'
 * streetAddress(fakerCore, false) // '34830 Erdman Hollow'
 * streetAddress(fakerCore, true) // '3393 Ronny Way Apt. 742'
 * streetAddress(fakerCore, { useFullAddress: true }) // '7917 Miller Park Apt. 410'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function streetAddress(
  fakerCore: FakerCore,
  options:
    | boolean
    | {
        /**
         * When true this will generate a full address.
         * Otherwise it will just generate a street address.
         */
        useFullAddress?: boolean;
      } = {}
): string {
  if (typeof options === 'boolean') {
    options = { useFullAddress: options };
  }

  const { useFullAddress } = options;

  const formats = fakerCore.locale.location.street_address;
  const format = formats[useFullAddress ? 'full' : 'normal'];

  return new Faker(fakerCore).helpers.fake(format);
}
