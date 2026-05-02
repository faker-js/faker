/**
 * The casing applied to generated characters.
 *
 * - `'upper'`: All generated characters are uppercase.
 * - `'lower'`: All generated characters are lowercase.
 * - `'mixed'`: Generated characters keep their original casing.
 */
export type Casing = 'upper' | 'lower' | 'mixed';

/**
 * A range of numbers with an inclusive minimum and maximum.
 */
export interface NumberRange {
  /**
   * The minimum value (inclusive).
   */
  min: number;
  /**
   * The maximum value (inclusive).
   */
  max: number;
}
