import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random localized city name.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * locationCity(fakerCore) // 'East Jarretmouth'
 * fakerDE.location.city() // 'Bad Lilianadorf'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationCity(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.location.city_pattern
  );
}
