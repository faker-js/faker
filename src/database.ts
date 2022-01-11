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

  readonly column = {
    schema: {
      description: 'Generates a column name.',
      sampleResults: ['id', 'title', 'createdAt'],
    },
  };

  /**
   * type
   *
   * @method faker.database.type
   */
  type() {
    return this.faker.random.arrayElement(this.faker.definitions.database.type);
  }

  readonly type = {
    schema: {
      description: 'Generates a column type.',
      sampleResults: ['byte', 'int', 'varchar', 'timestamp'],
    },
  };

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

  readonly collation = {
    schema: {
      description: 'Generates a collation.',
      sampleResults: ['utf8_unicode_ci', 'utf8_bin'],
    },
  };

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

  readonly engine = {
    schema: {
      description: 'Generates a storage engine.',
      sampleResults: ['MyISAM', 'InnoDB'],
    },
  };
}
