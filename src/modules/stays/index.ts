import type { Faker } from '../..';

/**
 * Module to generate stays related entries.
 */
export class StaysModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(StaysModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random stays destination.
   *
   * @example
   * faker.stays.staysDestination() // 'Milan'
   *
   * @since 8.0.0
   */
  staysDestination(): string {
    return this.faker.location.city();
  }

  /**
   * Returns a random stays check in date.
   *
   * @example
   * faker.stays.staysCheckInDate() // '2020-09-12T07:13:00.255Z'
   *
   * @since 8.0.0
   */
  staysCheckInDate(): Date {
    return this.faker.datatype.datetime({
      min: 1577836800000,
      max: 1638936800000,
    });
  }

  /**
   * Returns a random stays check out date.
   *
   * @example
   * faker.stays.staysCheckOutDate() // '2022-09-12T07:13:00.255Z'
   *
   * @since 8.0.0
   */
  staysCheckOutDate(): Date {
    return this.faker.datatype.datetime({
      min: 1638936800001,
      max: 1658936800000,
    });
  }

  /**
   * Returns a random number of adults.
   *
   * @example
   * faker.stays.staysAdults() // '5'
   *
   * @since 8.0.0
   */
  staysAdults(): number {
    return this.faker.datatype.number({ min: 1, max: 10 });
  }

  /**
   * Returns a random number of children.
   *
   * @example
   * faker.stays.staysChildren() // '5'
   *
   * @since 8.0.0
   */
  staysChildren(): number {
    return this.faker.datatype.number({ min: 1, max: 10 });
  }

  /**
   * Returns a random number of rooms.
   *
   * @example
   * faker.stays.staysRooms() // '5'
   *
   * @since 8.0.0
   */
  staysRooms(): number {
    return this.faker.datatype.number({ min: 1, max: 10 });
  }

  /**
   * Returns a random stays property name.
   *
   * @example
   * faker.stays.staysPropertyName() // 'Milhouse Suites Duomo'
   *
   * @since 8.0.0
   */
  staysPropertyName(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.stays.propertyName
    );
  }

  /**
   * Returns a random stays property type.
   *
   * @example
   * faker.stays.staysPropertyType() // 'Hotel'
   *
   * @since 8.0.0
   */
  staysPropertyType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.stays.propertyType
    );
  }

  /**
   * Returns a random stays description.
   *
   * @example
   * faker.stays.staysDescription() // 'Boasting a bar, Imperiale Suites Milano is situated in the centre of Milan, close to Sforzesco Castle, San Maurizio al Monastero Maggiore and La Scala.'
   *
   * @since 8.0.0
   */
  staysDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.stays.description
    );
  }

  /**
   * Returns a random star rating.
   *
   * @example
   * faker.stays.staysStarRating() // '2 stars'
   *
   * @since 8.0.0
   */
  staysStarRating(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.stays.starRating
    );
  }

  /**
   * Returns a random facilities.
   *
   * @example
   * faker.stays.staysFacilities() // 'Parking'
   *
   * @since 8.0.0
   */
  staysFacilities(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.stays.facilities
    );
  }

  /**
   * Returns a random review score.
   *
   * @example
   * faker.stays.staysReviewScore() // 'Superb: 9+'
   *
   * @since 8.0.0
   */
  staysReviewScore(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.stays.reviewScore
    );
  }

  /**
   * Returns a random brand.
   *
   * @example
   * faker.stays.staysBrands() // 'ibis'
   *
   * @since 8.0.0
   */
  staysBrands(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.stays.brands);
  }
}
