import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

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
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.location.city_pattern
  );
}
