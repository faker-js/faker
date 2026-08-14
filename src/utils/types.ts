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

/**
 * Either an exact number or a range of numbers with an inclusive minimum and maximum.
 */
export type NumberOrRange = number | NumberRange;

/**
 * The strategy to apply when no words with a matching length are found.
 */
export enum LengthStrategy {
  /**
   * Throws an error if no words with the given length are found.
   */
  Fail = 'fail',
  /**
   * Returns any of the words closest to the given length.
   */
  Closest = 'closest',
  /**
   * Returns any of the shortest words.
   */
  Shortest = 'shortest',
  /**
   * Returns any of the longest words.
   */
  Longest = 'longest',
  /**
   * Returns a word with any length.
   */
  AnyLength = 'any-length',
}

/**
 * The strategy to apply when no words with a matching length are found.
 */
export type LengthStrategyType = `${LengthStrategy}`;
