import type { Faker } from '../..';

/**
 * Module to generate table related entries.
 */
export class TableModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(TableModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random table brand.
   *
   * @example
   * faker.table.tableBrand() // 'Archiutti'
   *
   * @since 8.0.0
   */
  tableBrand(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.table.brand);
  }

  /**
   * Returns a random table name.
   *
   * @example
   * faker.table.tableName() // Aqua'
   *
   * @since 8.0.0
   */
  tableName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.table.name);
  }

  /**
   * Returns a random table room.
   *
   * @example
   * faker.table.tableRoom() // 'Living room'
   *
   * @since 8.0.0
   */
  tableRoom(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.table.room);
  }

  /**
   * Returns a random table shape.
   *
   * @example
   * faker.table.tableShape() // 'Round'
   *
   * @since 8.0.0
   */
  tableShape(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.table.shape);
  }

  /**
   * Returns a random table style.
   *
   * @example
   * faker.table.tableStyle() // 'Design'
   *
   * @since 8.0.0
   */
  tableStyle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.table.style);
  }

  /**
   * Returns a random table material.
   *
   * @example
   * faker.table.tableMaterial() // 'Wood'
   *
   * @since 8.0.0
   */
  tableMaterial(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.table.material
    );
  }

  /**
   * Returns a random table color.
   *
   * @example
   * faker.table.tableColor() // 'Grey'
   *
   * @since 8.0.0
   */
  tableColor(): string {
    return this.faker.color.human();
  }
}
