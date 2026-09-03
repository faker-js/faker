import type { FakerCore } from '../../core';
import { float } from '../number/float';

/**
 * Generates a random longitude.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
 * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
 * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
 *
 * @example
 * longitude(fakerCore) // -30.9501
 * longitude(fakerCore, { max: 10 }) // 5.7225
 * longitude(fakerCore, { max: 10, min: -10 }) // -9.6273
 * longitude(fakerCore, { max: 10, min: -10, precision: 5 }) // 2.68452
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function longitude(
  fakerCore: FakerCore,
  options: {
    /**
     * The upper bound for the longitude to generate.
     *
     * @default 180
     */
    max?: number;
    /**
     * The lower bound for the longitude to generate.
     *
     * @default -180
     */
    min?: number;
    /**
     * The number of decimal points of precision for the longitude.
     *
     * @default 4
     */
    precision?: number;
  } = {}
): number {
  const { max = 180, min = -180, precision = 4 } = options;

  return float(fakerCore, { max, min, fractionDigits: precision });
}
