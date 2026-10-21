import type { FakerCore } from '../../core';
import { fakeDatatypeBoolean } from '../datatype/boolean';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeStringAlpha } from '../string/alpha';
import { fakeStringAlphanumeric } from '../string/alphanumeric';
import { ibanLib } from './_iban-lib';

/**
 * Generates a random SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.includeBranchCode Whether to include a three-digit branch code at the end of the generated code. Defaults to a random boolean value.
 *
 * @example
 * fakeFinanceBic(fakerCore) // 'WYAUPGX1'
 * fakeFinanceBic(fakerCore, { includeBranchCode: true }) // 'KCAUPGR1432'
 * fakeFinanceBic(fakerCore, { includeBranchCode: false }) // 'XDAFQGT7'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeFinanceBic(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to include a three-digit branch code at the end of the generated code.
     *
     * @default fakeDatatypeBoolean(fakerCore)
     */
    includeBranchCode?: boolean;
  } = {}
): string {
  const { includeBranchCode = fakeDatatypeBoolean(fakerCore) } = options;

  const bankIdentifier = fakeStringAlpha(fakerCore, {
    length: 4,
    casing: 'upper',
  });
  const countryCode = fakeHelpersArrayElement(fakerCore, ibanLib.iso3166);
  const locationCode = fakeStringAlphanumeric(fakerCore, {
    length: 2,
    casing: 'upper',
  });
  const branchCode = includeBranchCode
    ? fakeDatatypeBoolean(fakerCore)
      ? fakeStringAlphanumeric(fakerCore, { length: 3, casing: 'upper' })
      : 'XXX'
    : '';

  return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
}
