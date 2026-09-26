import type { FakerCore } from '../../core';
import { int } from '../number/int';
import { fromCharacters } from '../string/from-characters';

/**
 * Generates a random Litecoin address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * litecoinAddress(fakerCore) // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function litecoinAddress(fakerCore: FakerCore): string {
  const addressLength = int(fakerCore, { min: 26, max: 33 });

  const address =
    fromCharacters(fakerCore, 'LM3') +
    fromCharacters(
      fakerCore,
      '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
      addressLength - 1
    );

  return address;
}
