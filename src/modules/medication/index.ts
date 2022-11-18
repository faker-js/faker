import type { Faker } from '../..';

/**
 * Module to generate medication related entries.
 */
export class MedicationModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(MedicationModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random medication name.
   *
   * @example
   * faker.medication.medicationName() // 'Carexidil 5%'
   *
   * @since 8.0.0
   */
  medicationName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medication.name
    );
  }

  /**
   * Returns a random medication description.
   *
   * @example
   * faker.medication.medicationDescription() // 'Carexidil is indicated for the treatment of certain types of baldness (androgenic alopecia), a condition characterized by excessive hair loss, due to the action of some hormones present in the body(androgen hormones).'
   *
   * @since 8.0.0
   */
  medicationDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medication.description
    );
  }

  /**
   * Returns a random medication format.
   *
   * @example
   * faker.medication.medicationFormat() // 'Tablets'
   *
   * @since 8.0.0
   */
  medicationFormat(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medication.format
    );
  }

  /**
   * Returns a random medication category.
   *
   * @example
   * faker.medication.medicationCategory() // 'Fever'
   *
   * @since 8.0.0
   */
  medicationCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medication.category
    );
  }

  /**
   * Returns a random medication manufacturer.
   *
   * @example
   * faker.medication.medicationManufacturer() // 'Upsa SAS'
   *
   * @since 8.0.0
   */
  medicationManufacturer(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medication.manufacturer
    );
  }

  /**
   * Returns a random medication pot size.
   *
   * @example
   * faker.medication.medicationHowToUse() // 'Apply a dose of 1 ml of Carexidil twice a day, preferably in the morning and in the evening, on the affected areas of the scalp. The dose is independent of the size of the area from to deal. The total daily dose should not exceed 2 ml.'
   *
   * @since 8.0.0
   */
  medicationHowToUse(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.medication.howToUse
    );
  }
}
