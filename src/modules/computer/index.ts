import type { Faker } from '../..';

/**
 * Module to generate computer data.
 */
export class ComputerModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(ComputerModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random computer brand.
   *
   * @example
   * faker.computer.computerBrand() // 'Apple'
   *
   * @since 8.0.0
   */
  computerBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.computer.brand
    );
  }

  /**
   * Returns a random computer model.
   *
   * @example
   * faker.computer.computerModel() // 'Mac Book Pro'
   *
   * @since 8.0.0
   */
  computerModel(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.computer.model
    );
  }

  /**
   * Returns a random computer color.
   *
   * @example
   * faker.computer.computerColor() // 'Silver'
   *
   * @since 8.0.0
   */
  computerColor(): string {
    return this.faker.color.human();
  }

  /**
   * Returns a random computer cpu.
   *
   * @example
   * faker.computer.computerCPU() // 'Intel core i5'
   *
   * @since 8.0.0
   */
  computerCPU(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.computer.cpu);
  }

  /**
   * Returns a random computer ram.
   *
   * @example
   * faker.computer.computerRam() // '8 GB'
   *
   * @since 8.0.0
   */
  computerRam(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.computer.ram);
  }

  /**
   * Returns a random computer os.
   *
   * @example
   * faker.computer.computerOs() // 'Ios 15'
   *
   * @since 8.0.0
   */
  computerOs(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.computer.os);
  }

  /**
   * Returns a random computer graphic card.
   *
   * @example
   * faker.computer.computerGraphicCard() // 'Integrated'
   *
   * @since 8.0.0
   */
  computerGraphicCard(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.computer.graphicCard
    );
  }

  /**
   * Returns a random computer memory storage capacity.
   *
   * @example
   * faker.computer.computerMemoryStorageCapacity() // '500 GB'
   *
   * @since 8.0.0
   */
  computerMemoryStorageCapacity(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.computer.memoryStorageCapacity
    );
  }

  /**
   * Returns a random computer dimensions.
   *
   * @example
   * faker.computer.computerProductDimensions() // '157.4 x 75.8 x 7.6mm'
   *
   * @since 8.0.0
   */
  computerProductDimensions(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.computer.productDimensions
    );
  }

  /**
   * Returns a random computer screen size.
   *
   * @example
   * faker.computer.computerScreenSize() // '14 inches'
   *
   * @since 8.0.0
   */
  computerScreenSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.computer.screenSize
    );
  }
}
