import type { Faker } from '../..';

/**
 * Module to generate tattoo related entries.
 */
export class TattooModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(TattooModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random tattoo name.
   *
   * @example
   * faker.tattoo.tattooName() // 'Chicano Style Tattoos Bali'
   *
   * @since 8.0.0
   */
  tattooName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tattoo.name);
  }

  /**
   * Returns a random tattoo subject.
   *
   * @example
   * faker.tattoo.tattooSubject() // 'Anchor'
   *
   * @since 8.0.0
   */
  tattooSubject(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.tattoo.subject
    );
  }

  /**
   * Returns a random tattoo style.
   *
   * @example
   * faker.tattoo.tattooStyle() // 'Ambigram'
   *
   * @since 8.0.0
   */
  tattooStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.tattoo.style);
  }

  /**
   * Returns a random tattoo placement.
   *
   * @example
   * faker.tattoo.tattooPlacement() // 'Arm'
   *
   * @since 8.0.0
   */
  tattooPlacement(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.tattoo.placement
    );
  }
}
