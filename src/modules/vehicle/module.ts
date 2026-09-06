import { ModuleBase } from '../../internal/module-base';
import { bicycle as vehicleBicycle } from './bicycle';
import { color as vehicleColor } from './color';
import { fuel as vehicleFuel } from './fuel';
import { manufacturer as vehicleManufacturer } from './manufacturer';
import { model as vehicleModel } from './model';
import { type as vehicleType } from './type';
import { vehicle as vehicleVehicle } from './vehicle';
import { vin as vehicleVin } from './vin';
import { vrm as vehicleVrm } from './vrm';

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
    return vehicleVehicle(this.faker.fakerCore);
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
    return vehicleManufacturer(this.faker.fakerCore);
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
    return vehicleModel(this.faker.fakerCore);
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
    return vehicleType(this.faker.fakerCore);
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
    return vehicleFuel(this.faker.fakerCore);
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
    return vehicleVin(this.faker.fakerCore);
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
    return vehicleColor(this.faker.fakerCore);
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
    return vehicleVrm(this.faker.fakerCore);
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
    return vehicleBicycle(this.faker.fakerCore);
  }
}
