import type { Faker } from '../..';

/**
 * Module to generate book related entries.
 */
export class BookModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(BookModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random book title.
   *
   * @example
   * faker.book.bookTitle() // 'Harry Potter and the Philosopher's Stone'
   *
   * @since 8.0.0
   */
  bookTitle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.title);
  }

  /**
   * Returns a random book author.
   *
   * @example
   * faker.book.bookAuthor() // 'J.K. Rowling'
   *
   * @since 8.0.0
   */
  bookAuthor(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.book.author);
  }

  /**
   * Returns a random book publisher.
   *
   * @example
   * faker.book.bookPublisher() // 'Bloomsbury Publishing PLC'
   *
   * @since 8.0.0
   */
  bookPublisher(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.book.publisher
    );
  }

  /**
   * Returns a random book year.
   *
   * @example
   * faker.book.bookYear() // 2014
   *
   * @since 8.0.0
   */
  bookYear(): number {
    return this.faker.datatype.number({ min: 1900, max: 2023 });
  }

  /**
   * Returns a random book description.
   *
   * @example
   * faker.book.bookDescription() // 'Escape to Hogwarts with the unmissable series that has sparked a lifelong reading journey for children and families all over the world. The magic starts here. Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry. The magic starts here! These editions of the classic and internationally bestselling Harry Potter series feature thrilling jacket artwork by award-winning illustrator Jonny Duddle. They are the perfect starting point for anyone who's ready to lose themselves in the greatest children's story of all time.'
   *
   * @since 8.0.0
   */
  bookDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.book.description
    );
  }
}
