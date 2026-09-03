import { ModuleBase } from '../../internal/module-base';
import { collation as databaseCollation } from './collation';
import { column as databaseColumn } from './column';
import { engine as databaseEngine } from './engine';
import { mongodbObjectId as databaseMongodbObjectId } from './mongodb-object-id';
import { type as databaseType } from './type';

/**
 * Module to generate database related entries.
 *
 * ### Overview
 *
 * Traditional relational database tables have data organized in columns with specific types - [`column()`](https://fakerjs.dev/api/database.html#column), [`type()`](https://fakerjs.dev/api/database.html#type). The database usually has an [`engine()`](https://fakerjs.dev/api/database.html#engine) and a default [`collation()`](https://fakerjs.dev/api/database.html#collation) for sorting.
 *
 * For the NoSQL database MongoDB, [`mongodbObjectId()`](https://fakerjs.dev/api/database.html#mongodbobjectid) provides a random ID.
 */
export class DatabaseModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree database' to update the methods from their respective files.
   */

  /**
   * Returns a random database column name.
   *
   * @example
   * faker.database.column() // 'createdAt'
   *
   * @since 4.0.0
   */
  column(): string {
    return databaseColumn(this.faker.fakerCore);
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
    return databaseType(this.faker.fakerCore);
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
    return databaseCollation(this.faker.fakerCore);
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
    return databaseEngine(this.faker.fakerCore);
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
    return databaseMongodbObjectId(this.faker.fakerCore);
  }
}
