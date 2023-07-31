/**
 * Interface for a pseudo-random number generator.
 */
export interface PRNG {
  /**
   * Generates a random float between `[0, 1)`.
   * This method is called `next` so that it could be used as an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol)
   */
  next(): number;

  /**
   * Sets the seed to use.
   *
   * @param seed The seed to use.
   */
  seed(seed: number | number[]): void;
}
