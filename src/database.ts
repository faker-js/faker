import type { Faker } from '.';

export class Database {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Database.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    // TODO @Shinigami92 2022-01-11: We should find a better strategy as assigning this property to a function
    // @ts-expect-error
    this.column.schema = {
      description: 'Generates a column name.',
      sampleResults: ['id', 'title', 'createdAt'],
    };
    // @ts-expect-error
    this.type.schema = {
      description: 'Generates a column type.',
      sampleResults: ['byte', 'int', 'varchar', 'timestamp'],
    };
    // @ts-expect-error
    this.collation.schema = {
      description: 'Generates a collation.',
      sampleResults: ['utf8_unicode_ci', 'utf8_bin'],
    };
    // @ts-expect-error
    this.engine.schema = {
      description: 'Generates a storage engine.',
      sampleResults: ['MyISAM', 'InnoDB'],
    };
  }

  /**
   * column
   *
   * @method faker.database.column
   */
  column() {
    return this.faker.random.arrayElement(
      this.faker.definitions.database.column
    );
  }

  /**
   * type
   *
   * @method faker.database.type
   */
  type() {
    return this.faker.random.arrayElement(this.faker.definitions.database.type);
  }

  /**
   * collation
   *
   * @method faker.database.collation
   */
  collation() {
    return this.faker.random.arrayElement(
      this.faker.definitions.database.collation
    );
  }

  /**
   * engine
   *
   * @method faker.database.engine
   */
  engine() {
    return this.faker.random.arrayElement(
      this.faker.definitions.database.engine
    );
  }
}
