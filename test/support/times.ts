/**
 * Generates a number sequence from 1 to `length`.
 *
 * @param length The length of the sequence.
 * @returns The sequence.
 */
export function times(length: number): number[] {
  return Array.from({ length }, (_, index) => index + 1);
}
