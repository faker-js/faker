import type { FakerCore } from '../../core';
import { numberInt } from '../number/int';
import { stringFromCharacters } from '../string/from-characters';

/**
 * Generates a random Litecoin address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeLitecoinAddress(fakerCore) // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeLitecoinAddress(fakerCore: FakerCore): string {
  const addressLength = numberInt(fakerCore, { min: 26, max: 33 });

  const address =
    stringFromCharacters(fakerCore, 'LM3') +
    stringFromCharacters(
      fakerCore,
      '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
      addressLength - 1
    );

  return address;
}
