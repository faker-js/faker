import type { FakerCore } from '../../core';
import { fakeNumberInt } from '../number/int';
import { fakeStringFromCharacters } from '../string/from-characters';

/**
 * Generates a random Litecoin address.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceLitecoinAddress(fakerCore) // 'MoQaSTGWBRXkWfyxKbNKuPrAWGELzcW'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceLitecoinAddress(fakerCore: FakerCore): string {
  const addressLength = fakeNumberInt(fakerCore, { min: 26, max: 33 });

  const address =
    fakeStringFromCharacters(fakerCore, 'LM3') +
    fakeStringFromCharacters(
      fakerCore,
      '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
      addressLength - 1
    );

  return address;
}
