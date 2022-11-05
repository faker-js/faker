import type { Faker } from '../..';

/**
 * Module to generate phone-related data.
 */
export class PhoneModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(PhoneModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random phone brand.
   *
   * @example
   * faker.phone.phoneBrand() // 'Apple'
   *
   * @since 8.0.0
   */
  phoneBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.phone.brand);
  }

  /**
   * Returns a random phone model.
   *
   * @example
   * faker.phone.phoneModel() // 'Iphone X'
   *
   * @since 8.0.0
   */
  phoneModel(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.phone.model);
  }

  /**
   * Returns a random phone color.
   *
   * @example
   * faker.phone.phoneColor() // 'Silver'
   *
   * @since 8.0.0
   */
  phoneColor(): string {
    return this.faker.color.human();
  }

  /**
   * Returns a random phone camera.
   *
   * @example
   * faker.phone.phoneCamera() // '50 MP'
   *
   * @since 8.0.0
   */
  phoneCamera(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.phone.camera);
  }

  /**
   * Returns a random phone os.
   *
   * @example
   * faker.phone.phoneOs() // 'Ios 15'
   *
   * @since 8.0.0
   */
  phoneOs(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.phone.os);
  }

  /**
   * Returns a random phone connectivity technologies.
   *
   * @example
   * faker.phone.phoneConnectivityTechnologies() // 'Bluetooth, Wi-Fi'
   *
   * @since 8.0.0
   */
  phoneConnectivityTechnologies(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.phone.connectivityTechnologies
    );
  }

  /**
   * Returns a random phone connectivity technologies.
   *
   * @example
   * faker.phone.phoneCellularTechnologies() // '5G'
   *
   * @since 8.0.0
   */
  phoneCellularTechnologies(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.phone.cellularTechnologies
    );
  }

  /**
   * Returns a random phone dimensions.
   *
   * @example
   * faker.phone.phoneProductDimensions() // '157.4 x 75.8 x 7.6mm'
   *
   * @since 8.0.0
   */
  phoneProductDimensions(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.phone.productDimensions
    );
  }

  /**
   * Returns a random phone memory storage capacity.
   *
   * @example
   * faker.phone.phoneMemoryStorageCapacity() // '128 GB'
   *
   * @since 8.0.0
   */
  phoneMemoryStorageCapacity(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.phone.memoryStorageCapacity
    );
  }

  /**
   * Returns a random phone screen size.
   *
   * @example
   * faker.phone.phoneScreenSize() // '6 inches'
   *
   * @since 8.0.0
   */
  phoneScreenSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.phone.screenSize
    );
  }

  /**
   * Generates a random phone number.
   *
   * @param format Format of the phone number. Defaults to a random phone number format.
   *
   * @example
   * faker.phone.phoneNumber() // '961-770-7727'
   * faker.phone.phoneNumber('501-###-###') // '501-039-841'
   * faker.phone.phoneNumber('+48 91 ### ## ##') // '+48 91 463 61 70'
   *
   * @since 7.3.0
   */
  phoneNumber(format?: string): string {
    format =
      format ??
      this.faker.helpers.arrayElement(
        this.faker.definitions.phone.numberFormats
      );
    return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  /**
   * Generates IMEI number.
   *
   * @example
   * faker.phone.imei() // '13-850175-913761-7'
   *
   * @since 6.2.0
   */
  imei(): string {
    return this.faker.helpers.replaceCreditCardSymbols(
      '##-######-######-L',
      '#'
    );
  }
}
