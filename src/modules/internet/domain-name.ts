import type { FakerCore } from '../../core';
import { internetDomainSuffix } from './domain-suffix';
import { internetDomainWord } from './domain-word';

/**
 * Generates a random domain name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetDomainName(fakerCore) // 'slow-timer.info'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetDomainName(fakerCore: FakerCore): string {
  return `${internetDomainWord(fakerCore)}.${internetDomainSuffix(fakerCore)}`;
}
