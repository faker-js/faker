/**
 * IATA stands for [International Air Transport Association](https://iata.org).
 * It's the trade association for the world's airlines and it is
 * responsible for setting standards relating to many aspects of airline
 * operations.
 */
import type { Faker } from '../..';

export enum Aircraft {
  Narrowbody = 'narrowbody',
  Regional = 'regional',
  Widebody = 'widebody',
}

export type AircraftType = `${Aircraft}`;

export interface Airline {
  /**
   * The name of the airline (e.g. `'American Airlines'`).
   */
  name: string;
  /**
   * The 2 character IATA code of the airline (e.g. `'AA'`).
   */
  iataCode: string;
}

export interface Airplane {
  /**
   * The name of the airplane (e.g. `'Airbus A321'`).
   */
  name: string;
  /**
   * The IATA code of the airplane (e.g. `'321'`).
   */
  iataTypeCode: string;
}

export interface Airport {
  /**
   * The name of the airport (e.g. `'Dallas Fort Worth International Airport'`).
   */
  name: string;
  /**
   * The IATA code of the airport (e.g. `'DFW'`).
   */
  iataCode: string;
}

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
   * Generates a random airport.
   *
   * @example
   * faker.airline.airport() // { name: 'Dallas Fort Worth International Airport', iataCode: 'DFW' }
   *
   * @since 8.0.0
   */
  airport(): Airport {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.airline.airport
    );
  }

  /**
   * Generates a random airline.
   *
   * @example
   * faker.airline.airline() // { name: 'American Airlines', iataCode: 'AA' }
   *
   * @since 8.0.0
   */
  airline(): Airline {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.airline.airlines
    );
  }

  /**
   * Generates a random airplane.
   *
   * @example
   * faker.airline.airplane() // { name: 'Airbus A321', iataCode: '321' }
   *
   * @since 8.0.0
   */
  airplane(): Airplane {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.airline.airplane
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
   * faker.airline.aircraftType() // 'narrowbody'
   *
   * @since 8.0.0
   */
  aircraftType(): AircraftType {
    return this.faker.helpers.objectValue(Aircraft);
  }

  /**
   * Returns a random flight number. Flight numbers are always 1 to 4 digits long. Sometimes they are
   * used without leading zeros (e.g.: American Airlines flight 425) and sometimes with leading
   * zeros, often with the airline code prepended (e.g.: AA0425).
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.length The number or range of digits to generate. Defaults to `{ min: 1, max: 4 }`.
   * @param options.addLeadingZeros Whether to pad the flight number up to 4 digits with leading zeros. Defaults to `false`.
   *
   * @example
   * faker.airline.flightNumber() // '2405'
   * faker.airline.flightNumber({ addLeadingZeros: true }) // '0249'
   * faker.airline.flightNumber({ addLeadingZeros: true, length: 2 }) // '0042'
   * faker.airline.flightNumber({ addLeadingZeros: true, length: { min: 2, max: 3} }) // '0624'
   * faker.airline.flightNumber({ length: 3 }) // '425'
   * faker.airline.flightNumber({ length: { min: 2, max: 3 } }) // '84'
   *
   * @since 8.0.0
   */
  flightNumber(
    options: {
      length?: number | { min: number; max: number };
      addLeadingZeros?: boolean;
    } = {}
  ): string {
    const { length = { min: 1, max: 4 } } = options;
    const { addLeadingZeros = false } = options;
    const flightNumber = this.faker.string.numeric({
      length,
      allowLeadingZeros: false,
    });
    return addLeadingZeros ? flightNumber.padStart(4, '0') : flightNumber;
  }
}
