import type { Faker } from '../..';

const aircraftTypes = ['narrowbody', 'widebody', 'regional'] as const;

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
   * faker.airline.airportCode() // 'JFK'
   *
   * @since 7.7.0
   */
  airportCode(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.airline.airport
    );
  }

  /**
   * Generates a random record locator.
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
   * @since 7.7.0
   */
  recordLocator(
    options: {
      allowNumerics?: boolean;
      allowVisuallySimilarCharacters?: boolean;
    } = {}
  ): string {
    const numerics = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const visuallySimilarCharacters = ['0', 'O', '1', 'I', 'L'];
    const bannedChars = [];
    if (!options.allowNumerics) {
      bannedChars.push(...numerics);
    }
    if (!options.allowVisuallySimilarCharacters) {
      bannedChars.push(...visuallySimilarCharacters);
    }
    return this.faker.random.alphaNumeric(6, {
      casing: 'upper',
      bannedChars,
    });
  }

  /**
   * Generates a random seat.
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.aircraftType The aircraft type. Can be one of `narrowbody`, `regional`, `widebody`.
   *
   * @example
   * faker.airline.seat() // '22C'
   * faker.airline.seat({ aircraftType: 'regional' }) // '7A'
   * faker.airline.seat({ aircraftType: 'widebody' }) // '42K'
   *
   * @since 7.7.0
   */

  seat(
    options: {
      aircraftType?: typeof aircraftTypes[number];
    } = {}
  ): string {
    const generateRandomRow = (maxRow: number): number =>
      Math.floor(Math.random() * maxRow) + 1;

    const maxRows = {
      regional: 20,
      narrowbody: 35,
      widebody: 60,
    };

    const seats = {
      regional: ['A', 'B', 'C', 'D'],
      narrowbody: ['A', 'B', 'C', 'D', 'E', 'F'],
      widebody: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'],
    };

    const { aircraftType = 'narrowbody' } = options;

    const maxRow = maxRows[aircraftType];
    const allowedSeats = seats[aircraftType];

    const row = generateRandomRow(maxRow);
    const seat = this.faker.helpers.arrayElement(allowedSeats);
    return `${row}${seat}`;
  }
}
