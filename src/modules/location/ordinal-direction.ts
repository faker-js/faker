import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Returns a random ordinal direction (northwest, southeast, etc).
 *
 * @param fakerCore The FakerCore to use.
 * @param options Whether to use abbreviated or an options object.
 * @param options.abbreviated If true this will return abbreviated directions (NW, SE, etc).
 * Otherwise this will return the long name. Defaults to `false`.
 *
 * @example
 * ordinalDirection(fakerCore) // 'Northeast'
 * ordinalDirection(fakerCore, { abbreviated: true }) // 'SW'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function ordinalDirection(
  fakerCore: FakerCore,
  options: {
    /**
     * If true this will return abbreviated directions (NW, SE, etc).
     * Otherwise this will return the long name.
     *
     * @default false
     */
    abbreviated?: boolean;
  } = {}
): string {
  const { abbreviated = false } = options;
  const direction = fakerCore.locale.location.direction;
  const data = abbreviated ? direction.ordinal_abbr : direction.ordinal;

  return arrayElement(fakerCore, data);
}
