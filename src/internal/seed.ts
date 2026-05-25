/**
 * Generates a random seed.
 *
 * @internal
 */
export function randomSeed(): number {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
}
