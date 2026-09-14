import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random cardinal direction (north, east, south, west).
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.abbreviated If true this will return abbreviated directions (N, E, etc).
 * Otherwise this will return the long name. Defaults to `false`.
 *
 * @example
 * cardinalDirection(fakerCore) // 'North'
 * cardinalDirection(fakerCore, { abbreviated: true }) // 'W'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function cardinalDirection(
  fakerCore: FakerCore,
  options: {
    /**
     * If true this will return abbreviated directions (N, E, etc).
     * Otherwise this will return the long name.
     *
     * @default false
     */
    abbreviated?: boolean;
  } = {}
): string {
  const { abbreviated = false } = options;
  const direction = fakerCore.locale.location.direction;
  const data = abbreviated ? direction.cardinal_abbr : direction.cardinal;

  return arrayElement(fakerCore, data);
}
