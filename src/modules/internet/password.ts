import type { FakerCore } from '../../core';
import { int } from '../number/int';

/**
 * Generates a random password-like string. Do not use this method for generating actual passwords for users.
 * Since the source of the randomness is not cryptographically secure, neither is this generator.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.length The length of the password to generate. Defaults to `15`.
 * @param options.memorable Whether the generated password should be memorable. Defaults to `false`.
 * @param options.pattern The pattern that all chars should match.
 * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
 * @param options.prefix The prefix to use. Defaults to `''`.
 *
 * @example
 * password(fakerCore) // '89G1wJuBLbGziIs'
 * password(fakerCore, { length: 20 }) // 'aF55c_8O9kZaPOrysFB_'
 * password(fakerCore, { length: 20, memorable: true }) // 'lawetimufozujosodedi'
 * password(fakerCore, { length: 20, memorable: true, pattern: /[A-Z]/ }) // 'HMAQDFFYLDDUTBKVNFVS'
 * password(fakerCore, { length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' }) // 'Hello IREOXTDWPERQSB'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function password(
  fakerCore: FakerCore,
  options: {
    /**
     * The length of the password to generate.
     *
     * @default 15
     */
    length?: number;
    /**
     * Whether the generated password should be memorable.
     *
     * @default false
     */
    memorable?: boolean;
    /**
     * The pattern that all chars should match.
     * This option will be ignored, if `memorable` is `true`.
     *
     * @default /\w/
     */
    pattern?: RegExp;
    /**
     * The prefix to use.
     *
     * @default ''
     */
    prefix?: string;
  } = {}
): string {
  /*
   * password-generator ( function )
   * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
   * MIT Licensed
   */
  const vowel = /[aeiouAEIOU]$/;
  const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;

  const {
    length = 15,
    memorable = false,
    pattern = /\w/,
    prefix = '',
  } = options;

  let currentPattern = pattern;
  let result = prefix;
  // TODO @Shinigami92 2026-07-09: This loop never terminates if the pattern can never match a generated char (e.g. `/°/`), blocking the event loop. To be resolved by the password rewrite in https://github.com/faker-js/faker/issues/768.
  while (result.length < length) {
    if (memorable) {
      currentPattern = consonant.test(result) ? vowel : consonant;
    }

    const n = int(fakerCore, 94) + 33;
    let char = String.fromCodePoint(n);
    if (memorable) {
      char = char.toLowerCase();
    }

    if (currentPattern.test(char)) {
      result += char;
    }
  }

  return result;
}
