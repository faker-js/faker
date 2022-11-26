import type { Faker } from '../..';

/**
 * Module to generate monument related entries.
 */
export class MonumentModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(MonumentModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random monument name.
   *
   * @example
   * faker.monument.monumentName() // 'The Royal Palace of Caserta '
   *
   * @since 8.0.0
   */
  monumentName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.monument.name
    );
  }

  /**
   * Returns a random monument description.
   *
   * @example
   * faker.monument.monumentDescription() // 'Al quinto posto abbiamo la Reggia di Caserta: una maestosa reggia con annesso un immenso parco. È la residenza reale più grande del mondo per volume, dichiarata Patrimonio dell'Umanità dall'UNESCO nel 1997.'
   *
   * @since 8.0.0
   */
  monumentDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.monument.description
    );
  }

  /**
   * Returns a random monument city.
   *
   * @example
   * faker.monument.monumentLocation() // 'Milan'
   *
   * @since 8.0.0
   */
  monumentLocation(): string {
    return this.faker.location.city();
  }

  /**
   * Returns a random monument country.
   *
   * @example
   * faker.monument.monumentCountry() // 'Italy'
   *
   * @since 8.0.0
   */
  monumentCountry(): string {
    return this.faker.location.country();
  }

  /**
   * Returns a random monument year.
   *
   * @example
   * faker.monument.monumentYear() // '1940'
   *
   * @since 8.0.0
   */
  monumentYear(): number {
    return this.faker.datatype.number({ min: 1800, max: 1950 });
  }

  /**
   * Returns a random monument date estabilished.
   *
   * @example
   * faker.monument.monumentDateEstabilished() // '1800-03-28T07:00:56.876Z'
   *
   * @since 8.0.0
   */
  monumentDateEstabilished(): Date {
    return this.faker.datatype.datetime({
      min: -5336183526000,
      max: -602673126000,
    });
  }
}
