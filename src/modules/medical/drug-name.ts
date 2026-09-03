import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a fictitious, brand-style drug name.
 *
 * All values are invented: they were generated from neutral morphemes, then screened by hand against real medicinal products — human brands, including ones marketed only outside the US and EU, veterinary products, and WHO INN generic names and class stems (e.g. `-statin`, `-pril`).
 *
 * That screen is a manual step rather than something the test suite re-runs. The tests lock in the collisions it has already caught and reject any name that ends in an INN stem, so a name added later has to be screened by hand.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * drugName(fakerCore) // 'Zolpraxen'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function drugName(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.drug_name);
}
