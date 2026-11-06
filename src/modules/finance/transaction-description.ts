import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random transaction description.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeFinanceTransactionDescription(fakerCore)
 * // 'payment transaction at Emard LLC using card ending with ****9187 for HNL 506.57 in account ***2584.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceTransactionDescription(
  fakerCore: FakerCore
): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.finance.transaction_description_pattern
  );
}
