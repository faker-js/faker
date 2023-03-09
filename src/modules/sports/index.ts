import type { Faker } from '../..';
/**
 * Module to generate sports related entries.
 */
export class SportsModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      SportsModule.prototype
    ) as Array<keyof SportsModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }
  /**
   * Generates a random sports team name.
   *
   * @example
   * faker.sports.team() // Concord Frogs
   *
   * @since 8.0.0
   */
  team(): string {
    const definition = this.faker.helpers.arrayElement(
      this.faker.definitions.sports.team_patterns
    );
    return this.faker.helpers.fake(definition);
  }
}
