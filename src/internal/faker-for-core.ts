import type { FakerCore } from '../core';
import { Faker } from '../faker';

const fakers = new WeakMap<FakerCore, Faker>();

/**
 * Returns a `Faker` instance that uses the given `FakerCore`.
 *
 * The instance is cached per `FakerCore`, because creating a new `Faker` is expensive
 * and all state (locale, randomizer, config) lives in the `FakerCore` anyway.
 *
 * @internal
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * getFakerForCore(fakerCore).helpers.fake('{{person.lastName}}');
 */
export function getFakerForCore(fakerCore: FakerCore): Faker {
  let faker = fakers.get(fakerCore);
  if (faker == null) {
    faker = new Faker(fakerCore);
    fakers.set(fakerCore, faker);
  }

  return faker;
}
