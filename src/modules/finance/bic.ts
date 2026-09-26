import type { FakerCore } from '../../core';
import { datatypeBoolean } from '../datatype/boolean';
import { helpersArrayElement } from '../helpers/array-element';
import { stringAlpha } from '../string/alpha';
import { stringAlphanumeric } from '../string/alphanumeric';
import { ibanLib } from './_iban-lib';

/**
 * Generates a random SWIFT/BIC code based on the [ISO-9362](https://en.wikipedia.org/wiki/ISO_9362) format.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.includeBranchCode Whether to include a three-digit branch code at the end of the generated code. Defaults to a random boolean value.
 *
 * @example
 * financeBic(fakerCore) // 'WYAUPGX1'
 * financeBic(fakerCore, { includeBranchCode: true }) // 'KCAUPGR1432'
 * financeBic(fakerCore, { includeBranchCode: false }) // 'XDAFQGT7'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function financeBic(
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
  const { includeBranchCode = datatypeBoolean(fakerCore) } = options;

  const bankIdentifier = stringAlpha(fakerCore, {
    length: 4,
    casing: 'upper',
  });
  const countryCode = helpersArrayElement(fakerCore, ibanLib.iso3166);
  const locationCode = stringAlphanumeric(fakerCore, {
    length: 2,
    casing: 'upper',
  });
  const branchCode = includeBranchCode
    ? datatypeBoolean(fakerCore)
      ? stringAlphanumeric(fakerCore, { length: 3, casing: 'upper' })
      : 'XXX'
    : '';

  return `${bankIdentifier}${countryCode}${locationCode}${branchCode}`;
}
