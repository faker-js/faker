import type { LocaleDefinition } from './definitions';
import type { LocaleProxy } from './locale-proxy';
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
/**
 * This is Faker's main class containing all modules that can be used to generate data.
 *
 * Please have a look at the individual modules and methods for more information and examples.
 *
 * @example
 * import { faker } from '@faker-js/faker';
 * // const { faker } = require('@faker-js/faker');
 *
 * // faker.seed(1234);
 *
 * faker.person.firstName(); // 'John'
 * faker.person.lastName(); // 'Doe'
 * @example
 * import { Faker, es } from '@faker-js/faker';
 * // const { Faker, es } = require('@faker-js/faker');
 *
 * // create a Faker instance with only es data and no en fallback (=> smaller bundle size)
 * const customFaker = new Faker({ locale: [es] });
 *
 * customFaker.person.firstName(); // 'Javier'
 * customFaker.person.lastName(); // 'Ocampo Corrales'
 *
 * customFaker.music.genre(); // throws Error as this data is not available in `es`
 */
export declare class Faker {
    readonly rawDefinitions: LocaleDefinition;
    readonly definitions: LocaleProxy;
    private _defaultRefDate;
    /**
     * Gets a new reference date used to generate relative dates.
     */
    get defaultRefDate(): () => Date;
    /**
     * Sets the `refDate` source to use if no `refDate` date is passed to the date methods.
     *
     * @param dateOrSource The function or the static value used to generate the `refDate` date instance.
     * The function must return a new valid `Date` instance for every call.
     * Defaults to `() => new Date()`.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
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
    setDefaultRefDate(dateOrSource?: string | Date | number | (() => Date)): void;
    /**
     * @deprecated Use the modules specific to the type of data you want to generate instead.
     */
    readonly random: RandomModule;
    readonly helpers: HelpersModule;
    readonly datatype: DatatypeModule;
    readonly airline: AirlineModule;
    readonly animal: AnimalModule;
    readonly color: ColorModule;
    readonly commerce: CommerceModule;
    readonly company: CompanyModule;
    readonly database: DatabaseModule;
    readonly date: DateModule;
    readonly finance: FinanceModule;
    readonly git: GitModule;
    readonly hacker: HackerModule;
    readonly image: ImageModule;
    readonly internet: InternetModule;
    readonly location: LocationModule;
    readonly lorem: LoremModule;
    readonly music: MusicModule;
    readonly person: PersonModule;
    readonly number: NumberModule;
    readonly phone: PhoneModule;
    readonly science: ScienceModule;
    readonly string: StringModule;
    readonly system: SystemModule;
    readonly vehicle: VehicleModule;
    readonly word: WordModule;
    /** @deprecated Use {@link Faker#location} instead */
    get address(): AddressModule;
    /** @deprecated Use {@link Faker#person} instead */
    get name(): NameModule;
    /**
     * Creates a new instance of Faker.
     *
     * In most cases you should use one of the prebuilt Faker instances instead of the constructor, for example `fakerDE`, `fakerFR`, ...
     *
     * You only need to use the constructor if you need custom fallback logic or a custom locale.
     *
     * For more information see our [Localization Guide](https://fakerjs.dev/guide/localization.html).
     *
     * @param options The options to use.
     * @param options.locale The locale data to use.
     *
     * @example
     * import { Faker, es } from '@faker-js/faker';
     * // const { Faker, es } = require('@faker-js/faker');
     *
     * // create a Faker instance with only es data and no en fallback (=> smaller bundle size)
     * const customFaker = new Faker({ locale: [es] });
     *
     * customFaker.person.firstName(); // 'Javier'
     * customFaker.person.lastName(); // 'Ocampo Corrales'
     *
     * customFaker.music.genre(); // throws Error as this data is not available in `es`
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
     * For more information see our [Localization Guide](https://fakerjs.dev/guide/localization.html).
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
    /**
     * Creates a new instance of Faker.
     *
     * In most cases you should use one of the prebuilt Faker instances instead of the constructor, for example `fakerDE`, `fakerFR`, ...
     *
     * You only need to use the constructor if you need custom fallback logic or a custom locale.
     *
     * For more information see our [Localization Guide](https://fakerjs.dev/guide/localization.html).
     *
     * @param options The options to use.
     * @param options.locale The locale data to use or the name of the main locale.
     * @param options.locales The locale data to use.
     * @param options.localeFallback The name of the fallback locale to use.
     *
     * @example
     * import { Faker, es } from '@faker-js/faker';
     * // const { Faker, es } = require('@faker-js/faker');
     *
     * // create a Faker instance with only es data and no en fallback (=> smaller bundle size)
     * const customFaker = new Faker({ locale: [es] });
     *
     * customFaker.person.firstName(); // 'Javier'
     * customFaker.person.lastName(); // 'Ocampo Corrales'
     *
     * customFaker.music.genre(); // throws Error as this data is not available in `es`
     */
    constructor(options: {
        /**
         * The locale data to use for this instance.
         * If an array is provided, the first locale that has a definition for a given property will be used.
         *
         * @see mergeLocales
         */
        locale: LocaleDefinition | LocaleDefinition[];
    } | {
        /**
         * The locale data to use for this instance.
         *
         * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
         */
        locales: Record<string, LocaleDefinition>;
        /**
         * The name of the main locale to use.
         *
         * @default 'en'
         *
         * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
         */
        locale?: string;
        /**
         * The name of the fallback locale to use.
         *
         * @default 'en'
         *
         * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
         */
        localeFallback?: string;
    });
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
     *
     * @returns The seed that was set.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
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
     *
     * @returns The seed array that was set.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
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
     *
     * @returns The seed that was set.
     *
     * @see [Reproducible Results](https://fakerjs.dev/guide/usage.html#reproducible-results)
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
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private get locales();
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private set locales(value);
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private get locale();
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private set locale(value);
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private get localeFallback();
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private set localeFallback(value);
    /**
     * Do NOT use. This property has been removed.
     *
     * @deprecated Use the constructor instead.
     */
    private setLocale;
}
export type FakerOptions = ConstructorParameters<typeof Faker>[0];
