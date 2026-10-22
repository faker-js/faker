import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random domain suffix.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeInternetDomainSuffix(fakerCore) // 'com'
 * fakeInternetDomainSuffix(fakerCore) // 'name'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetDomainSuffix(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.internet.domain_suffix
  );
}
