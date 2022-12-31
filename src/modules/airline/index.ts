import type { Faker } from '../..';

export enum Aircraft {
  Narrowbody = 'narrowbody',
  Regional = 'regional',
  Widebody = 'widebody',
}

export type AircraftType = `${Aircraft}`;

const numerics = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const visuallySimilarCharacters = ['0', 'O', '1', 'I', 'L'];
const aircraftTypeMaxRows = {
  regional: 20,
  narrowbody: 35,
  widebody: 60,
};
const aircraftTypeSeats = {
  regional: ['A', 'B', 'C', 'D'],
  narrowbody: ['A', 'B', 'C', 'D', 'E', 'F'],
  widebody: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
};

/**
 * Module to generate airline related data.
 */
export class AirlineModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(AirlineModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Generates a random IATA airport code.
   *
   * @example
   * faker.airline.airportCode() // 'CLT'
   *
   * @since 8.0.0
   */
  airportCode(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.airline.airport
    );
  }

  /**
   * Generates a random [record locator](https://en.wikipedia.org/wiki/Record_locator). Record locators
   * are used by airlines to identify reservations. They're also known as booking reference numbers,
   * locator codes, confirmation codes, or reservation codes.
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.allowNumerics Whether to allow numeric characters. Defaults to `false`.
   * @param options.allowVisuallySimilarCharacters Whether to allow visually similar characters such as '1' and 'I'. Defaults to `false`.
   *
   * @example
   * faker.airline.recordLocator() // 'KIFRWE'
   * faker.airline.recordLocator({ allowNumerics: true }) // 'E5TYEM'
   * faker.airline.recordLocator({ allowVisuallySimilarCharacters: true }) // 'ANZNEI'
   * faker.airline.recordLocator({ allowNumerics: true, allowVisuallySimilarCharacters: true }) // '1Z2Z3E'
   *
   * @since 8.0.0
   */
  recordLocator(
    options: {
      allowNumerics?: boolean;
      allowVisuallySimilarCharacters?: boolean;
    } = {}
  ): string {
    const { allowNumerics = false, allowVisuallySimilarCharacters = false } =
      options;
    const excludedChars = [];
    if (!allowNumerics) {
      excludedChars.push(...numerics);
    }
    if (!allowVisuallySimilarCharacters) {
      excludedChars.push(...visuallySimilarCharacters);
    }
    return this.faker.string.alphanumeric({
      length: 6,
      casing: 'upper',
      exclude: excludedChars,
    });
  }

  /**
   * Generates a random seat.
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.aircraftType The aircraft type. Can be one of `narrowbody`, `regional`, `widebody`. Defaults to `narrowbody`.
   *
   * @example
   * faker.airline.seat() // '22C'
   * faker.airline.seat({ aircraftType: 'regional' }) // '7A'
   * faker.airline.seat({ aircraftType: 'widebody' }) // '42K'
   *
   * @since 8.0.0
   */
  seat(
    options: {
      aircraftType?: AircraftType;
    } = {}
  ): string {
    const { aircraftType = Aircraft.Narrowbody } = options;
    const maxRow = aircraftTypeMaxRows[aircraftType];
    const allowedSeats = aircraftTypeSeats[aircraftType];
    const row = this.faker.number.int({ min: 1, max: maxRow });
    const seat = this.faker.helpers.arrayElement(allowedSeats);
    return `${row}${seat}`;
  }

  /**
   * Returns a random aircraft type.
   *
   * @example
   * faker.airline.aircraftType() // AircraftType.Narrowbody
   *
   * @since 8.0.0
   */
  aircraftType(): AircraftType {
    return this.faker.helpers.objectValue(Aircraft);
  }
}
