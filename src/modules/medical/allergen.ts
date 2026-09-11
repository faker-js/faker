import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random allergen.
 *
 * These are real substances, unlike the invented values of [`drugName()`](https://fakerjs.dev/api/medical.html#drugname): an allergy field records what a person reacts to, so real names are what belongs in it. Medicines such as `Penicillin` are included for that reason, as are contact allergens such as `Nickel`.
 *
 * Membership follows what an allergy field in a real record carries rather than a strict immunological rule, so reactions that are pharmacological rather than immune — `Aspirin`, `Codeine`, `Sulfites` — sit alongside true IgE and contact allergies. What a record would file as an intolerance is left out: lactose, fructose and MSG, and gluten, whose IgE counterpart is listed here as `Wheat`.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * allergen(fakerCore) // 'Penicillin'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function allergen(fakerCore: FakerCore): string {
  return arrayElement(fakerCore, fakerCore.locale.medical.allergen);
}
