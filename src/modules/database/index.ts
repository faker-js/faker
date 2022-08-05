import type { Faker } from '../..';

/**
 * Module to generate database related entries.
 */
export class Database {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Database.prototype)) {
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
   */
  mongodbObjectId(): string {
    // strip the "0x" from the hexadecimal output
    return this.faker.datatype.hexadecimal(24).replace('0x', '').toLowerCase();
  }
}
