import type { Faker } from '.';

export class Vehicle {
  fake;

  constructor(private readonly faker: Faker) {
    this.fake = faker.fake;

    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Vehicle.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    // TODO @Shinigami92 2022-01-13: Find better strategy
    // @ts-expect-error
    this.vehicle.schema = {
      description: 'Generates a random vehicle.',
      sampleResults: ['BMW Explorer', 'Ford Camry', 'Lamborghini Ranchero'],
    };
    // @ts-expect-error
    this.manufacturer.schema = {
      description: 'Generates a manufacturer name.',
      sampleResults: ['Ford', 'Jeep', 'Tesla'],
    };
    // @ts-expect-error
    this.model.schema = {
      description: 'Generates a vehicle model.',
      sampleResults: ['Explorer', 'Camry', 'Ranchero'],
    };
    // @ts-expect-error
    this.type.schema = {
      description: 'Generates a vehicle type.',
      sampleResults: ['Coupe', 'Convertable', 'Sedan', 'SUV'],
    };
    // @ts-expect-error
    this.fuel.schema = {
      description: 'Generates a fuel type.',
      sampleResults: ['Electric', 'Gasoline', 'Diesel'],
    };
    // @ts-expect-error
    this.vin.schema = {
      description: 'Generates a valid VIN number.',
      sampleResults: ['YV1MH682762184654', '3C7WRMBJ2EG208836'],
    };
    // @ts-expect-error
    this.color.schema = {
      description: 'Generates a color',
      sampleResults: ['red', 'white', 'black'],
    };
    // @ts-expect-error
    this.vrm.schema = {
      description: 'Generates a vehicle vrm',
      sampleResults: ['MF56UPA', 'GL19AAQ', 'SF20TTA'],
    };
    // @ts-expect-error
    this.bicycle.schema = {
      description: 'Generates a type of bicycle',
      sampleResults: [
        'Adventure Road Bicycle',
        'City Bicycle',
        'Recumbent Bicycle',
      ],
    };
  }

  /**
   * vehicle
   *
   * @method faker.vehicle.vehicle
   */
  vehicle() {
    return this.fake('{{vehicle.manufacturer}} {{vehicle.model}}');
  }

  /**
   * manufacturer
   *
   * @method faker.vehicle.manufacturer
   */
  manufacturer() {
    return this.faker.random.arrayElement(
      this.faker.definitions.vehicle.manufacturer
    );
  }

  /**
   * model
   *
   * @method faker.vehicle.model
   */
  model() {
    return this.faker.random.arrayElement(this.faker.definitions.vehicle.model);
  }

  /**
   * type
   *
   * @method faker.vehicle.type
   */
  type() {
    return this.faker.random.arrayElement(this.faker.definitions.vehicle.type);
  }

  /**
   * fuel
   *
   * @method faker.vehicle.fuel
   */
  fuel() {
    return this.faker.random.arrayElement(this.faker.definitions.vehicle.fuel);
  }

  /**
   * vin
   *
   * @method faker.vehicle.vin
   */
  vin() {
    const bannedChars = ['o', 'i', 'q'];
    return (
      this.faker.random.alphaNumeric(10, { bannedChars: bannedChars }) +
      this.faker.random.alpha({
        count: 1,
        upcase: true,
        bannedChars: bannedChars,
      }) +
      this.faker.random.alphaNumeric(1, { bannedChars: bannedChars }) +
      this.faker.datatype.number({ min: 10000, max: 100000 })
    ) // return five digit #
      .toUpperCase();
  }

  /**
   * color
   *
   * @method faker.vehicle.color
   */
  color() {
    return this.fake('{{commerce.color}}');
  }

  /**
   * vrm
   *
   * @method faker.vehicle.vrm
   */
  vrm() {
    return (
      this.faker.random.alpha({ count: 2, upcase: true }) +
      this.faker.datatype.number({ min: 0, max: 9 }) +
      this.faker.datatype.number({ min: 0, max: 9 }) +
      this.faker.random.alpha({ count: 3, upcase: true })
    ).toUpperCase();
  }

  /**
   * bicycle
   *
   * @method faker.vehicle.bicycle
   */
  bicycle() {
    return this.faker.random.arrayElement(
      this.faker.definitions.vehicle.bicycle_type
    );
  }
}
