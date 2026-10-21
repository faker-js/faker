import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';

/**
 * Returns a department inside a shop.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCommerceDepartment(fakerCore) // 'Garden'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCommerceDepartment(fakerCore: FakerCore): string {
  return fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.commerce.department
  );
}
