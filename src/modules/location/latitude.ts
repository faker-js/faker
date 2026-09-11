import type { FakerCore } from '../../core';
import { float } from '../number/float';

/**
 * Generates a random latitude.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
 * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
 * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
 *
 * @example
 * latitude(fakerCore) // -30.9501
 * latitude(fakerCore, { max: 10 }) // 5.7225
 * latitude(fakerCore, { max: 10, min: -10 }) // -9.6273
 * latitude(fakerCore, { max: 10, min: -10, precision: 5 }) // 2.68452
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function latitude(
  fakerCore: FakerCore,
  options: {
    /**
     * The upper bound for the latitude to generate.
     *
     * @default 90
     */
    max?: number;
    /**
     * The lower bound for the latitude to generate.
     *
     * @default -90
     */
    min?: number;
    /**
     * The number of decimal points of precision for the latitude.
     *
     * @default 4
     */
    precision?: number;
  } = {}
): number {
  const { max = 90, min = -90, precision = 4 } = options;

  return float(fakerCore, { min, max, fractionDigits: precision });
}
