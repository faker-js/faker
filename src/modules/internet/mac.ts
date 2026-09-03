import type { FakerCore } from '../../core';
import { hex } from '../number/hex';

/**
 * Generates a random mac address.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
 *
 * @example
 * mac(fakerCore) // '32:8e:2e:09:c6:05'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function mac(
  fakerCore: FakerCore,
  options?: {
    /**
     * The optional separator to use. Can be either `':'`, `'-'` or `''`.
     *
     * @default ':'
     */
    separator?: string;
  }
): string;
/**
 * Generates a random mac address.
 *
 * @param fakerCore The FakerCore to use.
 * @param separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
 *
 * @example
 * mac(fakerCore) // '32:8e:2e:09:c6:05'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function mac(fakerCore: FakerCore, separator?: string): string;
/**
 * Generates a random mac address.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional separator or an options object.
 * @param options.separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
 *
 * @example
 * mac(fakerCore) // '32:8e:2e:09:c6:05'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function mac(
  fakerCore: FakerCore,
  options?:
    | string
    | {
        /**
         * The optional separator to use. Can be either `':'`, `'-'` or `''`.
         *
         * @default ':'
         */
        separator?: string;
      }
): string;

export function mac(
  fakerCore: FakerCore,
  options:
    | string
    | {
        /**
         * The optional separator to use. Can be either `':'`, `'-'` or `''`.
         *
         * @default ':'
         */
        separator?: string;
      } = {}
): string {
  if (typeof options === 'string') {
    options = { separator: options };
  }

  let { separator = ':' } = options;

  let i: number;
  let mac = '';

  const acceptableSeparators = [':', '-', ''];
  if (!acceptableSeparators.includes(separator)) {
    separator = ':';
  }

  for (i = 0; i < 12; i++) {
    mac += hex(fakerCore, 15);
    if (i !== 11 && i % 2 === 1) {
      mac += separator;
    }
  }

  return mac;
}
