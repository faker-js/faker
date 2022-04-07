import type { Faker } from '.';

export class Color {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Color.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a human readable color name.
   *
   * @example
   * faker.color.human() // 'red'
   */
  human(): string {
    return this.faker.random.arrayElement(this.faker.definitions.color.human);
  }
}
