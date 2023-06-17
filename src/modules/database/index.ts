import type { Faker } from '../..';

/**
 * Module to generate database related entries.
 *
 * ### Overview
 *
 * Traditional relational database tables have data organized in columns with specific types - [`column()`](https://fakerjs.dev/api/database.html#column), [`type()`](https://fakerjs.dev/api/database.html#type). The database usually has an [`engine()`](https://fakerjs.dev/api/database.html#engine) and a default [`collation()`](https://fakerjs.dev/api/database.html#collation) for sorting.
 *
 * For the NoSQL database MongoDB, [`mongodbObjectId()`](https://fakerjs.dev/api/database.html#mongodbobjectid) provides a random ID.
 */
export class DatabaseModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(
      DatabaseModule.prototype
    ) as Array<keyof DatabaseModule | 'constructor'>) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random database column name.
   *
   * @example
   * faker.database.column() // 'createdAt'
   *
   * @since 4.0.0
   */
  column(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.database.column
    );
  }

  /**
   * Returns a random database column type.
   *
   * @example
   * faker.database.type() // 'timestamp'
   *
   * @since 4.0.0
   */
  type(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.database.type
    );
  }

  /**
   * Returns a random database collation.
   *
   * @example
   * faker.database.collation() // 'utf8_unicode_ci'
   *
   * @since 4.0.0
   */
  collation(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.database.collation
    );
  }

  /**
   * Returns a random database engine.
   *
   * @example
   * faker.database.engine() // 'ARCHIVE'
   *
   * @since 4.0.0
   */
  engine(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.database.engine
    );
  }

  /**
   * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
   *
   * @example
   * faker.database.mongodbObjectId() // 'e175cac316a79afdd0ad3afb'
   *
   * @since 6.2.0
   */
  mongodbObjectId(): string {
    return this.faker.string.hexadecimal({
      length: 24,
      casing: 'lower',
      prefix: '',
    });
  }
}
