import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random transaction description.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * financeTransactionDescription(fakerCore)
 * // 'payment transaction at Emard LLC using card ending with ****9187 for HNL 506.57 in account ***2584.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeTransactionDescription(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.finance.transaction_description_pattern
  );
}
