import type { Faker } from '../..';

/**
 * Module to generate watch related entries.
 */
export class WatchModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(WatchModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random watch brand.
   *
   * @example
   * faker.watch.watchBrand() // 'Rolex'
   *
   * @since 8.0.0
   */
  watchBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.watch.brand);
  }

  /**
   * Returns a random watch model.
   *
   * @example
   * faker.watch.watchModel() // 'GMT-Master II'
   *
   * @since 8.0.0
   */
  watchModel(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.watch.model);
  }

  /**
   * Returns a random watch caliber.
   *
   * @example
   * faker.watch.watchCaliber() // '3135'
   *
   * @since 8.0.0
   */
  watchCaliber(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.caliber
    );
  }

  /**
   * Returns a random watch style.
   *
   * @example
   * faker.watch.watchMovement() // 'Automatic'
   *
   * @since 8.0.0
   */
  watchMovement(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.movement
    );
  }

  /**
   * Returns a random watch bracelet type.
   *
   * @example
   * faker.watch.watchBraceletType() // 'Oyster'
   *
   * @since 8.0.0
   */
  watchBraceletType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.braceletType
    );
  }

  /**
   * Returns a random watch bezel material.
   *
   * @example
   * faker.watch.watchBezelMaterial() // 'Ceramic'
   *
   * @since 8.0.0
   */
  watchBezelMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.bezelMaterial
    );
  }

  /**
   * Returns a random watch bezel material.
   *
   * @example
   * faker.watch.watchBraceletMaterial() // 'Steel'
   *
   * @since 8.0.0
   */
  watchBraceletMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.braceletMaterial
    );
  }

  /**
   * Returns a random watch case material.
   *
   * @example
   * faker.watch.watchCaseMaterial() // 'Steel'
   *
   * @since 8.0.0
   */
  watchCaseMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.caseMaterial
    );
  }

  /**
   * Returns a random watch diameter.
   *
   * @example
   * faker.watch.watchDiameter() // '40 mm'
   *
   * @since 8.0.0
   */
  watchDiameter(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.diameter
    );
  }

  /**
   * Returns a random watch item number.
   *
   * @example
   * faker.watch.watchItemNumber() // '0CV940ZI2Z'
   *
   * @since 8.0.0
   */
  watchItemNumber(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.watch.itemNumber
    );
  }

  /**
   * Returns a random watch color.
   *
   * @example
   * faker.watch.watchColor() // 'Blue'
   *
   * @since 8.0.0
   */
  watchColor(): string {
    return this.faker.color.human();
  }

  /**
   * Returns a random watch year.
   *
   * @example
   * faker.watch.watchYear() // '2018'
   *
   * @since 8.0.0
   */
  watchYear(): number {
    return this.faker.datatype.number({ min: 1900, max: 2023 });
  }

  /**
   * Returns a random watch gender.
   *
   * @example
   * faker.watch.watchGender() // 'Men'
   *
   * @since 8.0.0
   */
  watchGender(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.watch.gender);
  }
}
