/**
 * Interface for a pseudo-random number generator.
 * This interface can be used to implement a custom randomizer using third party libraries.
 *
 * <p>Created instances are expected to be seeded on creation.</p>
 *
 * @example
 * import { FakerError, Randomizer } from '@faker-js/faker';
 *
 * function generateMathRandomRandomizer(): Randomizer {
 *   return {
 *     next: () => Math.random(), // values aren't reproducible
 *     seed: () => {
 *       throw new FakerError('Math.random() Randomizer cannot be seeded');
 *     },
 *   };
 * }
 *
 * function generateSimpleRandomizer(
 *   seed: number | number[] = Date.now() ^ (Math.random() * 0x100000000)
 * ): Randomizer {
 *   const self = {
 *     next: () => {
 *       self.state += self.step;
 *       return (self.state %= 1);
 *     },
 *     seed: (seed) => {
 *       const value = typeof seed === 'number' ? seed : seed[0];
 *       const cleaned = value.toString().replace(/[^\d]+/g, '');
 *       self.step = +('1.' + clean) / 2 + 0.26183095653171535;
 *       self.state = 0.8683615301373573 * self.step + 0.24476001502354827;
 *     },
 *   } as Randomizer & { state: number; step: number };
 *   self.seed(seed);
 *   return self;
 * }
 */
export interface Randomizer {
  /**
   * Generates a random float between `[0, 1)`.
   * This method is called `next` so that it could be used as an [iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol).
   *
   * @example
   * randomizer.next() // 0.3404027920160495
   * randomizer.next() // 0.929890375900335
   * randomizer.next() // 0.5866362918861691
   */
  next(): number;

  /**
   * Sets the seed to use.
   *
   * @param seed The seed to use.
   *
   * @example
   * // Random seeds
   * randomizer.seed(Date.now() ^ (Math.random() * 0x100000000));
   * // Fixed seeds (for reproducibility)
   * randomizer.seed(42);
   * randomizer.seed([42, 1337]);
   */
  seed(seed: number | number[]): void;
}
