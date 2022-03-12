import type { Faker } from '.';

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
    return this.faker.random.arrayElement(
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
    return this.faker.random.arrayElement(this.faker.definitions.database.type);
  }

  /**
   * Returns a random database collation.
   *
   * @example
   * faker.database.collation() // 'utf8_unicode_ci'
   */
  collation(): string {
    return this.faker.random.arrayElement(
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
    return this.faker.random.arrayElement(
      this.faker.definitions.database.engine
    );
  }

  /**
   * Returns an [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string
   *
   * @example
   * faker.database.objectId() // e175cac316a79afdd0ad3afb
   */
  objectId(): string {
    const length = 24;

    // a-z0-9
    const charCodeOptions = [
      {
        min: 'a'.charCodeAt(0),
        max: 'f'.charCodeAt(0),
      },
      {
        min: '0'.charCodeAt(0),
        max: '9'.charCodeAt(0),
      },
    ];

    let returnString = '';

    for (let i = 0; i < length; i++) {
      // randomly chose if a number or letter should be selected
      const charCodeOption =
        charCodeOptions[
          this.faker.datatype.number({
            min: 0,
            max: charCodeOptions.length - 1,
          })
        ];

      // converts the randomly selected UTF-16 number to the corresponding character
      returnString += String.fromCharCode(
        this.faker.datatype.number(charCodeOption)
      );
    }

    return returnString;
  }
}
