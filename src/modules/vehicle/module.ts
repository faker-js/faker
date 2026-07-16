import { ModuleBase } from '../../internal/module-base';

const vinWeights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

const vinTransliteration: Record<string, number> = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  P: 7,
  R: 9,
  S: 2,
  T: 3,
  U: 4,
  V: 5,
  W: 6,
  X: 7,
  Y: 8,
  Z: 9,
};

/**
 * Calculates a Vehicle Identification Number (VIN) check digit.
 *
 * @param vin The VIN to calculate the check digit for.
 */
function vinCheckDigit(vin: string): string {
  let checksum = 0;
  for (const [index, character] of vin.split('').entries()) {
    const value = vinTransliteration[character] ?? Number(character);
    checksum += value * vinWeights[index];
  }

  return checksum % 11 === 10 ? 'X' : String(checksum % 11);
}

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
  /**
   * Returns a random vehicle.
   *
   * @example
   * faker.vehicle.vehicle() // 'BMW Explorer'
   *
   * @since 5.0.0
   */
  vehicle(): string {
    return `${this.manufacturer()} ${this.model()}`;
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
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.manufacturer
    );
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
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.model
    );
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
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.type);
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
    return this.faker.helpers.arrayElement(this.faker.definitions.vehicle.fuel);
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
    const exclude = ['o', 'i', 'q', 'O', 'I', 'Q'];
    const vin = `${this.faker.string.alphanumeric({
      length: 10,
      casing: 'upper',
      exclude,
    })}${this.faker.string.alpha({
      length: 1,
      casing: 'upper',
      exclude,
    })}${this.faker.string.alphanumeric({
      length: 1,
      casing: 'upper',
      exclude,
    })}${this.faker.string.numeric({ length: 5, allowLeadingZeros: true })}`;

    return `${vin.slice(0, 8)}${vinCheckDigit(vin)}${vin.slice(9)}`;
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
    return this.faker.color.human();
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
    return `${this.faker.string.alpha({
      length: 2,
      casing: 'upper',
    })}${this.faker.string.numeric({
      length: 2,
      allowLeadingZeros: true,
    })}${this.faker.string.alpha({
      length: 3,
      casing: 'upper',
    })}`;
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
    return this.faker.helpers.arrayElement(
      this.faker.definitions.vehicle.bicycle_type
    );
  }
}
