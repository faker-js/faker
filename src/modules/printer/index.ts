import type { Faker } from '../..';

/**
 * Module to generate printer related entries.
 */
export class PrinterModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(PrinterModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random printer brand.
   *
   * @example
   * faker.printer.printerBrand() // 'HP'
   *
   * @since 8.0.0
   */
  printerBrand(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.printer.brand
    );
  }

  /**
   * Returns a random printer name.
   *
   * @example
   * faker.printer.printerName() // 'HP LaserJet Tank 2504dw Printer'
   *
   * @since 8.0.0
   */
  printerName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.printer.name);
  }

  /**
   * Returns a random printer type.
   *
   * @example
   * faker.printer.printerType() // 'Laser'
   *
   * @since 8.0.0
   */
  printerType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.printer.type);
  }

  /**
   * Returns a random printer functions.
   *
   * @example
   * faker.printer.printerFunctions() // 'Print only'
   *
   * @since 8.0.0
   */
  printerFunctions(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.printer.functions
    );
  }

  /**
   * Returns a random printer colorOutput.
   *
   * @example
   * faker.printer.printerColorOutput() // 'Black & White'
   *
   * @since 8.0.0
   */
  printerColorOutput(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.printer.colorOutput
    );
  }

  /**
   * Returns a random printer use.
   *
   * @example
   * faker.printer.printerUse() // 'Business'
   *
   * @since 8.0.0
   */
  printerUse(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.printer.use);
  }

  /**
   * Returns a random printer use.
   *
   * @example
   * faker.printer.printerConnectivity() // 'Bluetooth'
   *
   * @since 8.0.0
   */
  printerConnectivity(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.printer.connectivity
    );
  }

  /**
   * Returns a random printer use.
   *
   * @example
   * faker.printer.printerPaperSize() // 'A4'
   *
   * @since 8.0.0
   */
  printerPaperSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.printer.paperSize
    );
  }

  /**
   * Returns a random printer use.
   *
   * @example
   * faker.printer.printerFeatures() // 'Automatic document feeder'
   *
   * @since 8.0.0
   */
  printerFeatures(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.printer.features
    );
  }
}
