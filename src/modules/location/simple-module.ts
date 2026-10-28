import { ModuleBase } from '../../internal/module-base';
import { fakeLocationLatitude } from './latitude';
import { fakeLocationLongitude } from './longitude';
import { fakeLocationNearbyGPSCoordinate } from './nearby-gps-coordinate';

/**
 * Module with location functions that don't require localized data
 */
export class SimpleLocationModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree location' to update the methods from their respective files.
   */

  /**
   * Generates a random latitude.
   *
   * @param options An options object.
   * @param options.max The upper bound for the latitude to generate. Defaults to `90`.
   * @param options.min The lower bound for the latitude to generate. Defaults to `-90`.
   * @param options.precision The number of decimal points of precision for the latitude. Defaults to `4`.
   *
   * @example
   * faker.location.latitude() // -30.9501
   * faker.location.latitude({ max: 10 }) // 5.7225
   * faker.location.latitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.latitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   *
   * @since 8.0.0
   */
  latitude(
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
    return fakeLocationLatitude(this.fakerCore, options);
  }

  /**
   * Generates a random longitude.
   *
   * @param options An options object.
   * @param options.max The upper bound for the longitude to generate. Defaults to `180`.
   * @param options.min The lower bound for the longitude to generate. Defaults to `-180`.
   * @param options.precision The number of decimal points of precision for the longitude. Defaults to `4`.
   *
   * @example
   * faker.location.longitude() // -30.9501
   * faker.location.longitude({ max: 10 }) // 5.7225
   * faker.location.longitude({ max: 10, min: -10 }) // -9.6273
   * faker.location.longitude({ max: 10, min: -10, precision: 5 }) // 2.68452
   *
   * @since 8.0.0
   */
  longitude(
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
    return fakeLocationLongitude(this.fakerCore, options);
  }

  /**
   * Generates a random GPS coordinate within the specified radius from the given coordinate.
   *
   * @param options The options for generating a GPS coordinate.
   * @param options.origin The original coordinate to get a new coordinate close to.
   * If no coordinate is given, a random one will be chosen.
   * @param options.radius The maximum distance from the given coordinate to the new coordinate. Defaults to `10`.
   * @param options.isMetric If `true` assume the radius to be in kilometers. If `false` for miles. Defaults to `false`.
   *
   * @example
   * faker.location.nearbyGPSCoordinate() // [ 33.8475, -170.5953 ]
   * faker.location.nearbyGPSCoordinate({ origin: [33, -170] }) // [ 33.0165, -170.0636 ]
   * faker.location.nearbyGPSCoordinate({ origin: [33, -170], radius: 1000, isMetric: true }) // [ 37.9163, -179.2408 ]
   *
   * @since 8.0.0
   */
  nearbyGPSCoordinate(
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
    return fakeLocationNearbyGPSCoordinate(this.fakerCore, options);
  }
}
