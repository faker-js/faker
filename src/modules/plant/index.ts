import type { Faker } from '../..';

/**
 * Module to generate plant related entries.
 */
export class PlantModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(PlantModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random plant name.
   *
   * @example
   * faker.plant.plantName() // 'Aloe Arborescente'
   *
   * @since 8.0.0
   */
  plantName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.plant.name);
  }

  /**
   * Returns a random plant description.
   *
   * @example
   * faker.plant.plantDescription() // 'In the open ground it tends to form large branched bushes with stems that can reach up to 2 meters in height, lanceolate leaves with serrated edges up to 50 cm long, and red flowers in clusters carried by a long conical spike.'
   *
   * @since 8.0.0
   */
  plantDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.plant.description
    );
  }

  /**
   * Returns a random plant category.
   *
   * @example
   * faker.plant.plantCategory() // 'Aromatic plants'
   *
   * @since 8.0.0
   */
  plantCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.plant.category
    );
  }

  /**
   * Returns a random plant pot size.
   *
   * @example
   * faker.plant.plantPotSize() // '19cm.'
   *
   * @since 8.0.0
   */
  plantPotSize(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.plant.potSize
    );
  }

  /**
   * Returns a random plant origin.
   *
   * @example
   * faker.plant.plantOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  plantOrigin(): string {
    return this.faker.location.country();
  }
}
