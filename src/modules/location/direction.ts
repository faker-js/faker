import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';

/**
 * Returns a random direction (cardinal and ordinal; northwest, east, etc).
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.abbreviated If true this will return abbreviated directions (NW, E, etc).
 * Otherwise this will return the long name. Defaults to `false`.
 *
 * @example
 * locationDirection(fakerCore) // 'Northeast'
 * locationDirection(fakerCore, { abbreviated: true }) // 'SW'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function locationDirection(
  fakerCore: FakerCore,
  options: {
    /**
     * If true this will return abbreviated directions (NW, E, etc).
     * Otherwise this will return the long name.
     *
     * @default false
     */
    abbreviated?: boolean;
  } = {}
): string {
  const { abbreviated = false } = options;
  const direction = fakerCore.locale.location.direction;
  const data = abbreviated
    ? [...direction.cardinal_abbr, ...direction.ordinal_abbr]
    : [...direction.cardinal, ...direction.ordinal];

  return helpersArrayElement(fakerCore, data);
}
