import { ModuleBase } from '../../internal/module-base';
import { vehicleBicycle } from './bicycle';
import { vehicleColor } from './color';
import { vehicleFuel } from './fuel';
import { vehicleManufacturer } from './manufacturer';
import { vehicleModel } from './model';
import { vehicleType } from './type';
import { vehicleVehicle } from './vehicle';
import { vehicleVin } from './vin';
import { vehicleVrm } from './vrm';

/**
 * Module to generate vehicle related entries.
 *
 * ### Overview
 *
 * Most methods are related to cars/automobiles: a [`vehicle()`](https://fakerjs.dev/api/vehicle.html#vehicle) name is comprised of a car [`manufacturer()`](https://fakerjs.dev/api/vehicle.html#manufacturer) and [`model()`](https://fakerjs.dev/api/vehicle.html#model). You can also generate [`fuel()`](https://fakerjs.dev/api/vehicle.html#fuel), [`type()`](https://fakerjs.dev/api/vehicle.html#type), and [`color()`](https://fakerjs.dev/api/vehicle.html#color), as well as typical car registration IDs [`vin()`](https://fakerjs.dev/api/vehicle.html#vin) and [`vrm()`](https://fakerjs.dev/api/vehicle.html#vrm).
 *
 * If you prefer two wheels, you can generate a [`bicycle()`](https://fakerjs.dev/api/vehicle.html#bicycle) type instead.
 */
export class VehicleModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree vehicle' to update the methods from their respective files.
   */

  /**
   * Returns a random vehicle.
   *
   * @example
   * faker.vehicle.vehicle() // 'BMW Explorer'
   *
   * @since 5.0.0
   */
  vehicle(): string {
    return vehicleVehicle(this.fakerCore);
  }

  /**
   * Returns a manufacturer name.
   *
   * @example
   * faker.vehicle.manufacturer() // 'Ford'
   *
   * @since 5.0.0
   */
  manufacturer(): string {
    return vehicleManufacturer(this.fakerCore);
  }

  /**
   * Returns a vehicle model.
   *
   * @example
   * faker.vehicle.model() // 'Explorer'
   *
   * @since 5.0.0
   */
  model(): string {
    return vehicleModel(this.fakerCore);
  }

  /**
   * Returns a vehicle type.
   *
   * @example
   * faker.vehicle.type() // 'Coupe'
   *
   * @since 5.0.0
   */
  type(): string {
    return vehicleType(this.fakerCore);
  }

  /**
   * Returns a fuel type.
   *
   * @example
   * faker.vehicle.fuel() // 'Electric'
   *
   * @since 5.0.0
   */
  fuel(): string {
    return vehicleFuel(this.fakerCore);
  }

  /**
   * Returns a vehicle identification number (VIN).
   *
   * @example
   * faker.vehicle.vin() // 'YV1MH682762184654'
   *
   * @since 5.0.0
   */
  vin(): string {
    return vehicleVin(this.fakerCore);
  }

  /**
   * Returns a vehicle color.
   *
   * @example
   * faker.vehicle.color() // 'red'
   *
   * @since 5.0.0
   */
  color(): string {
    return vehicleColor(this.fakerCore);
  }

  /**
   * Returns a vehicle registration number (Vehicle Registration Mark - VRM)
   *
   * @example
   * faker.vehicle.vrm() // 'MF56UPA'
   *
   * @since 5.4.0
   */
  vrm(): string {
    return vehicleVrm(this.fakerCore);
  }

  /**
   * Returns a type of bicycle.
   *
   * @example
   * faker.vehicle.bicycle() // 'Adventure Road Bicycle'
   *
   * @since 5.5.0
   */
  bicycle(): string {
    return vehicleBicycle(this.fakerCore);
  }
}
