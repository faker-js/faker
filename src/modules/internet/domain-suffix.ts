import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random domain suffix.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * internetDomainSuffix(fakerCore) // 'com'
 * internetDomainSuffix(fakerCore) // 'name'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetDomainSuffix(fakerCore: FakerCore): string {
  return helpersArrayElement(fakerCore, fakerCore.locale.internet.domain_suffix);
}
