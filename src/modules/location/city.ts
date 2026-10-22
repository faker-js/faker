import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random localized city name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeLocationCity(fakerCore) // 'East Jarretmouth'
 * fakeLocationCity(fakerCoreDE) // 'Bad Lilianadorf'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeLocationCity(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.location.city_pattern
  );
}
