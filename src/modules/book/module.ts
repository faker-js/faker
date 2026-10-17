import { ModuleBase } from '../../internal/module-base';
import { fakeBookAuthor } from './author';
import { fakeBookFormat } from './format';
import { fakeBookGenre } from './genre';
import { fakeBookPublisher } from './publisher';
import { fakeBookSeries } from './series';
import { fakeBookTitle } from './title';

/**
 * Module to generate book related entries.
 *
 * ### Overview
 *
 * - For a random title, use [`title()`](https://fakerjs.dev/api/book.html#title).
 * - For a random existing author name, use [`author()`](https://fakerjs.dev/api/book.html#author).
 * - For a random non-existing author name, use [`faker.person.fullName()`](https://fakerjs.dev/api/person.html#fullname).
 * - For a random genre, use [`genre()`](https://fakerjs.dev/api/book.html#genre).
 * - For a random series, use [`series()`](https://fakerjs.dev/api/book.html#series).
 * - For a random publisher, use [`publisher()`](https://fakerjs.dev/api/book.html#publisher).
 * - For a random book format, use [`format()`](https://fakerjs.dev/api/book.html#format).
 * - For a random isbn, use [`faker.commerce.isbn()`](https://fakerjs.dev/api/commerce.html#isbn)
 *
 * All values may be localized.
 */
export class BookModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree book' to update the methods from their respective files.
   */

  /**
   * Returns a random author name.
   *
   * @example
   * faker.book.author() // 'William Shakespeare'
   *
   * @since 9.1.0
   */
  author(): string {
    return fakeBookAuthor(this.fakerCore);
  }

  /**
   * Returns a random book format.
   *
   * @example
   * faker.book.format() // 'Hardcover'
   *
   * @since 9.1.0
   */
  format(): string {
    return fakeBookFormat(this.fakerCore);
  }

  /**
   * Returns a random genre.
   *
   * @example
   * faker.book.genre() // 'Fantasy'
   *
   * @since 9.1.0
   */
  genre(): string {
    return fakeBookGenre(this.fakerCore);
  }

  /**
   * Returns a random publisher.
   *
   * @example
   * faker.book.publisher() // 'Addison-Wesley'
   *
   * @since 9.1.0
   */
  publisher(): string {
    return fakeBookPublisher(this.fakerCore);
  }

  /**
   * Returns a random series.
   *
   * @example
   * faker.book.series() // 'Harry Potter'
   *
   * @since 9.1.0
   */
  series(): string {
    return fakeBookSeries(this.fakerCore);
  }

  /**
   * Returns a random title.
   *
   * @example
   * faker.book.title() // 'Romeo and Juliet'
   *
   * @since 9.1.0
   */
  title(): string {
    return fakeBookTitle(this.fakerCore);
  }
}
