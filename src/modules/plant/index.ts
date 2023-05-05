import type { Faker } from '../..';

/**
 * Module to generate plant related entries.
 *
 */
export class PlantModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      PlantModule.prototype
    ) as Array<keyof PlantModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random tree species.
   *
   * @example
   * faker.plant.tree() //'Willow'
   *
   * @since 8.0.0
   */
  tree(): string {
    const definition = this.faker.helpers.arrayElement(
      this.faker.definitions.plant.tree
    );
    return this.faker.helpers.fake(definition);
  }

  /**
   * Returns a random flower species.
   *
   * @example
   * faker.plant.flower() //'Poppy'
   *
   * @since 8.0.0
   */
  flower(): string {
    const definition = this.faker.helpers.arrayElement(
      this.faker.definitions.plant.flower
    );
    return this.faker.helpers.fake(definition);
  }
}
