import type { FakerCore } from '../../core';
import { fakeInternetDomainSuffix } from './domain-suffix';
import { fakeInternetDomainWord } from './domain-word';

/**
 * Generates a random domain name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeInternetDomainName(fakerCore) // 'slow-timer.info'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetDomainName(fakerCore: FakerCore): string {
  return `${fakeInternetDomainWord(fakerCore)}.${fakeInternetDomainSuffix(fakerCore)}`;
}
