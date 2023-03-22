import type { LocaleDefinition } from './definitions';
import { FakerError } from './errors/faker-error';
import { deprecated } from './internal/deprecated';
import type { Mersenne } from './internal/mersenne/mersenne';
import mersenne from './internal/mersenne/mersenne';
import { AirlineModule } from './modules/airline';
import { AnimalModule } from './modules/animal';
import { ColorModule } from './modules/color';
import { CommerceModule } from './modules/commerce';
import { CompanyModule } from './modules/company';
import { DatabaseModule } from './modules/database';
import { DatatypeModule } from './modules/datatype';
import { DateModule } from './modules/date';
import { FinanceModule } from './modules/finance';
import { GitModule } from './modules/git';
import { HackerModule } from './modules/hacker';
import { HelpersModule } from './modules/helpers';
import { ImageModule } from './modules/image';
import { InternetModule } from './modules/internet';
import type { LocationModule as AddressModule } from './modules/location';
import { LocationModule } from './modules/location';
import { LoremModule } from './modules/lorem';
import { MusicModule } from './modules/music';
import { NumberModule } from './modules/number';
import type { PersonModule as NameModule } from './modules/person';
import { PersonModule } from './modules/person';
import { PhoneModule } from './modules/phone';
import { RandomModule } from './modules/random';
import { ScienceModule } from './modules/science';
import { StringModule } from './modules/string';
import { SystemModule } from './modules/system';
import { VehicleModule } from './modules/vehicle';
import { WordModule } from './modules/word';
import { mergeLocales } from './utils/merge-locales';

/**
 * The main Faker class containing all modules that can be used to generate data.
 *
 * Please have a look at the individual modules and methods for more information and examples.
 *
 * @example
 * import { faker } from '@fakerjs/faker';
 * // const { faker } = require('@fakerjs/faker');
 *
 * // faker.seed(1234);
 *
 * faker.person.firstName(); // 'John'
 * faker.person.lastName(); // 'Doe'
 *
 * @example
 * import { Faker, de } from '@fakerjs/faker';
 * // const { Faker, de } = require('@fakerjs/faker');
 *
 * // create a Faker instance with only de data and no en fallback
 * const customFaker = new Faker({ locale: [de] });
 *
 * customFaker.person.firstName(); // 'Max'
 * customFaker.person.lastName(); // 'Baumeister'
 *
 * customFaker.music.genre() // throws Error as this data is not available in `de`
 */
export class Faker {
  readonly definitions: LocaleDefinition;
  private _defaultRefDate: () => Date = () => new Date();

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
   * @see [Reproducible Results](https://next.fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.seed() for reproducible results.
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
  private readonly _mersenne: Mersenne = mersenne();

  /**
   * @deprecated Use the modules specific to the type of data you want to generate instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly random: RandomModule = new RandomModule(this);

  readonly helpers: HelpersModule = new HelpersModule(this);

  readonly datatype: DatatypeModule = new DatatypeModule(this);

  readonly airline: AirlineModule = new AirlineModule(this);
  readonly animal: AnimalModule = new AnimalModule(this);
  readonly color: ColorModule = new ColorModule(this);
  readonly commerce: CommerceModule = new CommerceModule(this);
  readonly company: CompanyModule = new CompanyModule(this);
  readonly database: DatabaseModule = new DatabaseModule(this);
  readonly date: DateModule = new DateModule(this);
  readonly finance = new FinanceModule(this);
  readonly git: GitModule = new GitModule(this);
  readonly hacker: HackerModule = new HackerModule(this);
  readonly image: ImageModule = new ImageModule(this);
  readonly internet: InternetModule = new InternetModule(this);
  readonly location: LocationModule = new LocationModule(this);
  readonly lorem: LoremModule = new LoremModule(this);
  readonly music: MusicModule = new MusicModule(this);
  readonly person: PersonModule = new PersonModule(this);
  readonly number: NumberModule = new NumberModule(this);
  readonly phone: PhoneModule = new PhoneModule(this);
  readonly science: ScienceModule = new ScienceModule(this);
  readonly string: StringModule = new StringModule(this);
  readonly system: SystemModule = new SystemModule(this);
  readonly vehicle: VehicleModule = new VehicleModule(this);
  readonly word: WordModule = new WordModule(this);

  // Aliases
  /** @deprecated Use {@link location} instead */
  get address(): AddressModule {
    deprecated({
      deprecated: 'faker.address',
      proposed: 'faker.location',
      since: '8.0',
      until: '10.0',
    });
    return this.location;
  }

  /** @deprecated Use {@link person} instead */
  get name(): NameModule {
    deprecated({
      deprecated: 'faker.name',
      proposed: 'faker.person',
      since: '8.0',
      until: '10.0',
    });
    return this.person;
  }

  /**
   * Creates a new instance of Faker.
   *
   * In most cases you should use one of the prebuilt Faker instances instead of the constructor, for example `fakerDE`, `fakerFR`, ...
   *
   * You only need to use the constructor if you need custom fallback logic or a custom locale.
   *
   * For more information see our [Localization Guide](https://next.fakerjs.dev/guide/localization.html).
   *
   * @param options The options to use.
   * @param options.locale The locale data to use.
   *
   * @example
   * import { Faker, de } from '@fakerjs/faker';
   * // const { Faker, de } = require('@fakerjs/faker');
   *
   * const customFaker = new Faker({ locale: [de] });
   *
   * customFaker.person.firstName(); // 'Max'
   * customFaker.person.lastName(); // 'Baumeister'
   */
  constructor(options: {
    /**
     * The locale data to use for this instance.
     * If an array is provided, the first locale that has a definition for a given property will be used.
     *
     * @see mergeLocales
     */
    locale: LocaleDefinition | LocaleDefinition[];
  });
  /**
   * Creates a new instance of Faker.
   *
   * In most cases you should use one of the prebuilt Faker instances instead of the constructor, for example `fakerDE`, `fakerFR`, ...
   *
   * You only need to use the constructor if you need custom fallback logic or a custom locale.
   *
   * For more information see our [Localization Guide](https://next.fakerjs.dev/guide/localization.html).
   *
   * @param options The options to use.
   * @param options.locales The locale data to use.
   * @param options.locale The name of the main locale to use.
   * @param options.localeFallback The name of the fallback locale to use.
   *
   * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
   */
  constructor(options: {
    locales: Record<string, LocaleDefinition>;
    locale?: string;
    localeFallback?: string;
  });
  // This is somehow required for `ConstructorParameters<typeof Faker>[0]` to work
  /**
   * Creates a new instance of Faker.
   *
   * In most cases you should use one of the prebuilt Faker instances instead of the constructor, for example `fakerDE`, `fakerFR`, ...
   *
   * You only need to use the constructor if you need custom fallback logic or a custom locale.
   *
   * For more information see our [Localization Guide](https://next.fakerjs.dev/guide/localization.html).
   *
   * @param options The options to use.
   * @param options.locale The locale data to use or the name of the main locale.
   * @param options.locales The locale data to use.
   * @param options.localeFallback The name of the fallback locale to use.
   *
   * @example
   * import { Faker, de } from '@fakerjs/faker';
   * // const { Faker, de } = require('@fakerjs/faker');
   *
   * const customFaker = new Faker({ locale: [de] });
   *
   * customFaker.person.firstName(); // 'Max'
   * customFaker.person.lastName(); // 'Baumeister'
   */
  constructor(
    options:
      | {
          /**
           * The locale data to use for this instance.
           * If an array is provided, the first locale that has a definition for a given property will be used.
           *
           * @see mergeLocales
           */
          locale: LocaleDefinition | LocaleDefinition[];
        }
      | {
          /**
           * DEPRECATED: The locale data to use for this instance.
           *
           * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
           */
          locales: Record<string, LocaleDefinition>;
          /**
           * DEPRECATED: The name of the main locale to use.
           *
           * @default 'en'
           *
           * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
           */
          locale?: string;
          /**
           * DEPRECATED: The name of the fallback locale to use.
           *
           * @default 'en'
           *
           * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
           */
          localeFallback?: string;
        }
  );
  constructor(
    options:
      | { locale: LocaleDefinition | LocaleDefinition[] }
      | {
          locales: Record<string, LocaleDefinition>;
          locale?: string;
          localeFallback?: string;
        }
  ) {
    const { locales } = options as {
      locales: Record<string, LocaleDefinition>;
    };
    if (locales != null) {
      deprecated({
        deprecated:
          "new Faker({ locales: {a, b}, locale: 'a', localeFallback: 'b' })",
        proposed:
          'new Faker({ locale: [a, b, ...] }) or new Faker({ locale: a })',
        since: '8.0',
        until: '9.0',
      });
      const { locale = 'en', localeFallback = 'en' } = options as {
        locale: string;
        localeFallback: string;
      };
      options = {
        locale: [locales[locale], locales[localeFallback]],
      };
    }

    let { locale } = options;

    if (Array.isArray(locale)) {
      if (locale.length === 0) {
        throw new FakerError(
          'The locale option must contain at least one locale definition.'
        );
      }

      locale = mergeLocales(locale);
    }

    this.definitions = locale as LocaleDefinition;
  }

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
   * @param seed The seed to use. Defaults to a random number.
   * @returns The seed that was set.
   *
   * @see [Reproducible Results](https://next.fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.setDefaultRefDate() when generating relative dates.
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
   * @returns The seed array that was set.
   *
   * @see [Reproducible Results](https://next.fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.setDefaultRefDate() when generating relative dates.
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
   * @returns The seed that was set.
   *
   * @see [Reproducible Results](https://next.fakerjs.dev/guide/usage.html#reproducible-results)
   * @see faker.setDefaultRefDate() when generating relative dates.
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
   */
  seed(seed?: number | number[]): number | number[];
  seed(
    seed: number | number[] = Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)
  ): number | number[] {
    this._mersenne.seed(seed);

    return seed;
  }

  // Pure JS backwards compatibility

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private get locales(): never {
    throw new FakerError(
      'The locales property has been removed. Please use the constructor instead.'
    );
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private set locales(value: never) {
    throw new FakerError(
      'The locales property has been removed. Please use the constructor instead.'
    );
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private get locale(): never {
    throw new FakerError(
      'The locale property has been removed. Please use the constructor instead.'
    );
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private set locale(value: never) {
    throw new FakerError(
      'The locale property has been removed. Please use the constructor instead.'
    );
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private get localeFallback(): never {
    throw new FakerError(
      'The localeFallback property has been removed. Please use the constructor instead.'
    );
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private set localeFallback(value: never) {
    throw new FakerError(
      'The localeFallback property has been removed. Please use the constructor instead.'
    );
  }

  /**
   * Do NOT use. This property has been removed.
   *
   * @deprecated Use the constructor instead.
   */
  private setLocale(): never {
    throw new FakerError(
      'This method has been removed. Please use the constructor instead.'
    );
  }
}

export type FakerOptions = ConstructorParameters<typeof Faker>[0];
