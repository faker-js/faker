import type { FakerCore } from '../../core';
import { float } from '../number/float';
import { latitude } from './latitude';
import { longitude } from './longitude';

/**
 * Generates a random GPS coordinate within the specified radius from the given coordinate.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options for generating a GPS coordinate.
 * @param options.origin The original coordinate to get a new coordinate close to.
 * If no coordinate is given, a random one will be chosen.
 * @param options.radius The maximum distance from the given coordinate to the new coordinate. Defaults to `10`.
 * @param options.isMetric If `true` assume the radius to be in kilometers. If `false` for miles. Defaults to `false`.
 *
 * @example
 * nearbyGPSCoordinate(fakerCore) // [ 33.8475, -170.5953 ]
 * nearbyGPSCoordinate(fakerCore, { origin: [33, -170] }) // [ 33.0165, -170.0636 ]
 * nearbyGPSCoordinate(fakerCore, { origin: [33, -170], radius: 1000, isMetric: true }) // [ 37.9163, -179.2408 ]
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function nearbyGPSCoordinate(
  fakerCore: FakerCore,
  options: {
    /**
     * The original coordinate to get a new coordinate close to.
     */
    origin?: [latitude: number, longitude: number];
    /**
     * The maximum distance from the given coordinate to the new coordinate.
     *
     * @default 10
     */
    radius?: number;
    /**
     * If `true` assume the radius to be in kilometers. If `false` for miles.
     *
     * @default false
     */
    isMetric?: boolean;
  } = {}
): [latitude: number, longitude: number] {
  const { origin, radius = 10, isMetric = false } = options;

  // If there is no origin, the best we can do is return a random GPS coordinate.
  if (origin == null) {
    return [latitude(fakerCore), longitude(fakerCore)];
  }

  const angleRadians = float(fakerCore, {
    max: 2 * Math.PI,
    fractionDigits: 5,
  }); // in ° radians

  const radiusMetric = isMetric ? radius : radius * 1.60934; // in km
  const errorCorrection = 0.995; // avoid float issues
  const distanceInKm =
    float(fakerCore, {
      max: radiusMetric,
      fractionDigits: 3,
    }) * errorCorrection; // in km

  /**
   * The distance in km per degree for earth.
   */
  const kmPerDegree = 40_000 / 360; // in km/°

  const distanceInDegree = distanceInKm / kmPerDegree; // in °

  const coordinate: [latitude: number, longitude: number] = [
    origin[0] + Math.sin(angleRadians) * distanceInDegree,
    origin[1] + Math.cos(angleRadians) * distanceInDegree,
  ];

  // Box latitude [-90°, 90°]
  coordinate[0] %= 180;
  if (Math.abs(coordinate[0]) > 90) {
    coordinate[0] = Math.sign(coordinate[0]) * 180 - coordinate[0];
    coordinate[1] += 180;
  }

  // Box longitude [-180°, 180°]
  coordinate[1] = (((coordinate[1] % 360) + 540) % 360) - 180;

  return [coordinate[0], coordinate[1]];
}
