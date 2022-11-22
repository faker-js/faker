import type { Faker } from '../..';

/**
 * Module to generate bookcase related entries.
 */
export class BookcaseModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(BookcaseModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random bookcase name.
   *
   * @example
   * faker.bookcase.bookcaseName() // 'Airport'
   *
   * @since 8.0.0
   */
  bookcaseName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bookcase.name
    );
  }

  /**
   * Returns a random bookcase category.
   *
   * @example
   * faker.bookcase.bookcaseCategory() // 'On the wall'
   *
   * @since 8.0.0
   */
  bookcaseCategory(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bookcase.category
    );
  }

  /**
   * Returns a random bookcase style.
   *
   * @example
   * faker.bookcase.bookcaseStyle() // 'Design'
   *
   * @since 8.0.0
   */
  bookcaseStyle(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bookcase.style
    );
  }

  /**
   * Returns a random bookcase material.
   *
   * @example
   * faker.bookcase.bookcaseMaterial() // 'Wood'
   *
   * @since 8.0.0
   */
  bookcaseMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.bookcase.material
    );
  }

  /**
   * Returns a random bookcase color.
   *
   * @example
   * faker.bookcase.bookcaseColor() // 'Grey'
   *
   * @since 8.0.0
   */
  bookcaseColor(): string {
    return this.faker.color.human();
  }
}
