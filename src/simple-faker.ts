import { generateMersenne32Randomizer } from './internal/mersenne';
import { DatatypeModule } from './modules/datatype';
import { SimpleDateModule } from './modules/date';
import { SimpleHelpersModule } from './modules/helpers';
import { NumberModule } from './modules/number';
import { StringModule } from './modules/string';
import type { Randomizer } from './randomizer';

/**
 * This is a simplified Faker class that doesn't need any localized data to generate its output.
 *
 * It only includes methods from:
 * - `datatype`
 * - `date` (without `month` and `weekday`)
 * - `helpers` (without `fake`)
 * - `number`
 * - `string`
 *
 * @example
 * import { simpleFaker } from '@faker-js/faker';
 * // const { simpleFaker } = require('@faker-js/faker');
 *
 * // simpleFaker.seed(1234);
 *
 * simpleFaker.number.int(10); // 4
 * simpleFaker.string.uuid(); // 'c50e1f5c-86e8-4aa9-888e-168e0a182519'
 */
export class SimpleFaker {
  protected _defaultRefDate: () => Date = () => new Date();

  /**
   * Gets a new reference date used to generate relative dates.
   */
  get defaultRefDate(): () => Date {
    return this._defaultRefDate;
  }

  /**
   * Sets the `refDate` source to use if no `refDate` date is passed to the date methods.
   *
   * @param dateOrSource The function or the static value used to generate the `refDate` date instance.
   * The function must return a new valid `Date` instance for every call.
   * Defaults to `() => new Date()`.
   *
   * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.seed(): For generating reproducible values.
   *
   * @example
   * faker.seed(1234);
   *
   * // Default behavior
   * // faker.setDefaultRefDate();
   * faker.date.past(); // Changes based on the current date/time
   *
   * // Use a static ref date
   * faker.setDefaultRefDate(new Date('2020-01-01'));
   * faker.date.past(); // Reproducible '2019-07-03T08:27:58.118Z'
   *
   * // Use a ref date that changes every time it is used
   * let clock = new Date("2020-01-01").getTime();
   * faker.setDefaultRefDate(() => {
   *   clock += 1000; // +1s
   *   return new Date(clock);
   * });
   *
   * faker.defaultRefDate() // 2020-01-01T00:00:01Z
   * faker.defaultRefDate() // 2020-01-01T00:00:02Z
   *
   * @since 8.0.0
   */
  setDefaultRefDate(
    dateOrSource: string | Date | number | (() => Date) = () => new Date()
  ): void {
    if (typeof dateOrSource === 'function') {
      this._defaultRefDate = dateOrSource;
    } else {
      this._defaultRefDate = () => new Date(dateOrSource);
    }
  }

  /** @internal */
  protected readonly _randomizer: Randomizer;

  readonly datatype: DatatypeModule = new DatatypeModule(this);
  readonly date: SimpleDateModule = new SimpleDateModule(this);
  readonly helpers: SimpleHelpersModule = new SimpleHelpersModule(this);
  readonly number: NumberModule = new NumberModule(this);
  readonly string: StringModule = new StringModule(this);

  /**
   * Creates a new instance of SimpleFaker.
   *
   * In nearly any case you should use the prebuilt `simpleFaker` instances instead of the constructor.
   *
   * @param options The options to use.
   * @param options.randomizer The Randomizer to use.
   * Specify this only if you want to use it to achieve a specific goal,
   * such as sharing the same random generator with other instances/tools.
   * Defaults to faker's Mersenne Twister based pseudo random number generator.
   *
   * @example
   * import { SimpleFaker } from '@faker-js/faker';
   * // const { SimpleFaker } = require('@faker-js/faker');
   *
   * // create a SimpleFaker without any locale data
   * const customSimpleFaker = new SimpleFaker();
   *
   * customSimpleFaker.helpers.arrayElement(['red', 'green', 'blue']); // 'green'
   * customSimpleFaker.number.int(10); // 4
   *
   * @since 8.1.0
   */
  constructor(
    options: {
      /**
       * The Randomizer to use.
       * Specify this only if you want to use it to achieve a specific goal,
       * such as sharing the same random generator with other instances/tools.
       *
       * @default generateMersenne32Randomizer()
       */
      randomizer?: Randomizer;
    } = {}
  ) {
    const { randomizer = generateMersenne32Randomizer() } = options;

    this._randomizer = randomizer;
  }

  /**
   * Sets the seed or generates a new one.
   *
   * Please note that generated values are dependent on both the seed and the
   * number of calls that have been made since it was set.
   *
   * This method is intended to allow for consistent values in tests, so you
   * might want to use hardcoded values as the seed.
   *
   * In addition to that it can be used for creating truly random tests
   * (by passing no arguments), that still can be reproduced if needed,
   * by logging the result and explicitly setting it if needed.
   *
   * @param seed The seed to use. Defaults to a random number.
   *
   * @returns The seed that was set.
   *
   * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.setDefaultRefDate(): For generating reproducible relative dates.
   *
   * @example
   * // Consistent values for tests:
   * faker.seed(42)
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * faker.seed(42)
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * // Random but reproducible tests:
   * // Simply log the seed, and if you need to reproduce it, insert the seed here
   * console.log('Running test with seed:', faker.seed());
   *
   * @since 6.0.0
   */
  seed(seed?: number): number;
  /**
   * Sets the seed array.
   *
   * Please note that generated values are dependent on both the seed and the
   * number of calls that have been made since it was set.
   *
   * This method is intended to allow for consistent values in a tests, so you
   * might want to use hardcoded values as the seed.
   *
   * In addition to that it can be used for creating truly random tests
   * (by passing no arguments), that still can be reproduced if needed,
   * by logging the result and explicitly setting it if needed.
   *
   * @param seedArray The seed array to use.
   *
   * @returns The seed array that was set.
   *
   * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.setDefaultRefDate(): For generating reproducible relative dates.
   *
   * @example
   * // Consistent values for tests:
   * faker.seed([42, 13, 17])
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * faker.seed([42, 13, 17])
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * // Random but reproducible tests:
   * // Simply log the seed, and if you need to reproduce it, insert the seed here
   * console.log('Running test with seed:', faker.seed());
   *
   * @since 6.0.0
   */
  seed(seedArray: number[]): number[];
  /**
   * Sets the seed or generates a new one.
   *
   * Please note that generated values are dependent on both the seed and the
   * number of calls that have been made since it was set.
   *
   * This method is intended to allow for consistent values in a tests, so you
   * might want to use hardcoded values as the seed.
   *
   * In addition to that it can be used for creating truly random tests
   * (by passing no arguments), that still can be reproduced if needed,
   * by logging the result and explicitly setting it if needed.
   *
   * @param seed The seed or seed array to use.
   *
   * @returns The seed that was set.
   *
   * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.setDefaultRefDate(): For generating reproducible dates.
   *
   * @example
   * // Consistent values for tests (using a number):
   * faker.seed(42)
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * faker.seed(42)
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * // Consistent values for tests (using an array):
   * faker.seed([42, 13, 17])
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * faker.seed([42, 13, 17])
   * faker.number.int(10); // 4
   * faker.number.int(10); // 8
   *
   * // Random but reproducible tests:
   * // Simply log the seed, and if you need to reproduce it, insert the seed here
   * console.log('Running test with seed:', faker.seed());
   *
   * @since 6.0.0
   */
  seed(seed?: number | number[]): number | number[];
  seed(
    seed: number | number[] = Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)
  ): number | number[] {
    this._randomizer.seed(seed);

    return seed;
  }

  /**
   * Clones this instance, preserving the current state.
   * This method is idempotent and does not consume any seed values.
   * The cloned instance will produce the same values as the original, given that the methods are called in the same order.
   * This is useful for creating identical complex objects:
   * - One to be mutated by the method under test
   * - and the other one serves as a comparison.
   *
   * @see faker.derive If you want to generate deterministic but different values.
   *
   * @example
   * faker.seed(42);
   * faker.number.int(10); // 4 (1st call)
   * faker.number.int(10); // 8 (2nd call)
   *
   * faker.seed(42);
   * // Creates a new instance with the same state as the current instance
   * const clonedFaker = faker.clone();
   * // The cloned instance will produce the same values as the original
   * clonedFaker.number.int(10); // 4 (cloned 1st call)
   * clonedFaker.number.int(10); // 8 (cloned 2nd call)
   *
   * // The original instance is not affected
   * faker.number.int(10); // 4 (1st call)
   * faker.number.int(10); // 8 (2nd call)
   */
  clone(): SimpleFaker {
    const instance = new SimpleFaker({
      randomizer: this._randomizer.clone(),
    });
    instance.setDefaultRefDate(this._defaultRefDate);
    return instance;
  }

  /**
   * Derives a new instance from this one.
   * This consumes a single value from the original instance to initialize the seed of the derived instance, and thus has a one-time effect on subsequent calls.
   * The derived instance can be used to generate deterministic values based on the current seed without consuming a dynamic amount of seed values.
   * This is useful, if you wish to generate a complex object (e.g. a Person) and might want to add a property to it later.
   * If the Person is created from a derived instance, then adding or removing properties from the Person doesn't have any impact on the following data, generated using the original instance (except from the derive call itself).
   *
   * @see simpleFaker.clone If you want to create an exact clone of this SimpleFaker instance without consuming a seed value.
   *
   * @example
   * simpleFaker.seed(42);
   * simpleFaker.number.int(10); // 4 (1st call)
   * simpleFaker.number.int(10); // 8 (2nd call)
   *
   * simpleFaker.seed(42);
   * // Creates a new instance with a seed generated from the current instance
   * const derivedFaker = simpleFaker.derive(); // (1st call)
   * // The derived instance will produce values dependent on the state of the original instance at the time of the derive call
   * derivedFaker.number.int(10); // 7 (derived 1st call)
   * derivedFaker.number.int(10); // 0 (derived 2nd call)
   *
   * // It doesn't matter how many calls to derived are executed
   * simpleFaker.number.int(10); // 8 (2nd call) <- This is same as before
   */
  derive(): SimpleFaker {
    const instance = this.clone();
    instance.seed(this.number.int());
    return instance;
  }
}

export const simpleFaker = new SimpleFaker();
