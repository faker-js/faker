import type { Faker } from '../..';

/**
 * Module to generate movie related entries.
 */
export class MovieModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(MovieModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random movie title.
   *
   * @example
   * faker.movie.movieTitle() // 'The Shawshank Redemption'
   *
   * @since 8.0.0
   */
  movieTitle(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.movie.title);
  }

  /**
   * Returns a random movie director.
   *
   * @example
   * faker.movie.movieDirector() // 'Frank Darabont'
   *
   * @since 8.0.0
   */
  movieDirector(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.movie.director
    );
  }

  /**
   * Returns a random movie writers.
   *
   * @example
   * faker.movie.movieWriters() // 'Stephen King, Frank Darabont'
   *
   * @since 8.0.0
   */
  movieWriters(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.movie.writers
    );
  }

  /**
   * Returns a random movie cast.
   *
   * @example
   * faker.movie.movieCast() // 'Pierfrancesco Favino, Kasia Smutniak, Berenice Bejo, Laura Morante, Sergio Albelli, Alessandro Tedeschi, Benedetta Porcaroli, Massimo Ceccherini'
   *
   * @since 8.0.0
   */
  movieCast(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.movie.cast);
  }

  /**
   * Returns a random movie year.
   *
   * @example
   * faker.movie.movieYear() // 2014
   *
   * @since 8.0.0
   */
  movieYear(): number {
    return this.faker.datatype.number({ min: 1980, max: 2023 });
  }

  /**
   * Returns a random movie release data.
   *
   * @example
   * faker.movie.movieReleaseDate() // 2021-09-12T07:13:00.255Z
   *
   * @since 8.0.0
   */
  movieReleaseDate(): Date {
    return this.faker.datatype.datetime();
  }

  /**
   * Returns a random movie description.
   *
   * @example
   * faker.movie.movieDescription() // 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency'
   *
   * @since 8.0.0
   */
  movieDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.movie.description
    );
  }

  /**
   * Returns a random movie duration.
   *
   * @example
   * faker.movie.movieDuration() // '2h 22m'
   *
   * @since 8.0.0
   */
  movieDuration(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.movie.duration
    );
  }

  /**
   * Returns a random movie genre.
   *
   * @example
   * faker.movie.movieGenre() // 'Drama'
   *
   * @since 8.0.0
   */
  movieGenre(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.movie.genre);
  }

  /**
   * Returns a random movie origin.
   *
   * @example
   * faker.movie.movieOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  movieOrigin(): string {
    return this.faker.location.country();
  }
}
