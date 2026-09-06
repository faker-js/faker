import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';
import { arrayElement } from '../helpers/array-element';
import { alpha } from '../string/alpha';
import { alphanumeric } from '../string/alphanumeric';

/**
 * Generates a random SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.includeBranchCode Whether to include a three-digit branch code at the end of the generated code. Defaults to a random boolean value.
 *
 * @example
 * bic(fakerCore) // 'WYAUPGX1'
 * bic(fakerCore, { includeBranchCode: true }) // 'KCAUPGR1432'
 * bic(fakerCore, { includeBranchCode: false }) // 'XDAFQGT7'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function bic(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to include a three-digit branch code at the end of the generated code.
     *
     * @default datatypeBoolean(fakerCore)
     */
    includeBranchCode?: boolean;
  } = {}
): string {
  const { includeBranchCode = boolean(fakerCore) } = options;

  const bankIdentifier = alpha(fakerCore, {
    length: 4,
    casing: 'upper',
  });
  const countryCode = arrayElement(fakerCore, iban.iso3166);
  const locationCode = alphanumeric(fakerCore, {
    length: 2,
    casing: 'upper',
  });
  const branchCode = includeBranchCode
    ? boolean(fakerCore)
      ? alphanumeric(fakerCore, { length: 3, casing: 'upper' })
      : 'XXX'
    : '';

  return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
}
