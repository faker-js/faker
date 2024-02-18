import type { LocaleDefinition, MetadataDefinition } from './definitions';
import { FakerError } from './errors/faker-error';
import { deprecated } from './internal/deprecated';
import type { LocaleProxy } from './locale-proxy';
import { createLocaleProxy } from './locale-proxy';
import { AirlineModule } from './modules/airline';
import { AnimalModule } from './modules/animal';
import { ColorModule } from './modules/color';
import { CommerceModule } from './modules/commerce';
import { CompanyModule } from './modules/company';
import { DatabaseModule } from './modules/database';
import { DateModule } from './modules/date';
import { FinanceModule } from './modules/finance';
import { FoodModule } from './modules/food';
import { GitModule } from './modules/git';
import { HackerModule } from './modules/hacker';
import { HelpersModule } from './modules/helpers';
import { ImageModule } from './modules/image';
import { InternetModule } from './modules/internet';
import type { LocationModule as AddressModule } from './modules/location';
import { LocationModule } from './modules/location';
import { LoremModule } from './modules/lorem';
import { MusicModule } from './modules/music';
import type { PersonModule as NameModule } from './modules/person';
import { PersonModule } from './modules/person';
import { PhoneModule } from './modules/phone';
import { RandomModule } from './modules/random';
import { ScienceModule } from './modules/science';
import { SystemModule } from './modules/system';
import { VehicleModule } from './modules/vehicle';
import { WordModule } from './modules/word';
import type { Randomizer } from './randomizer';
import { SimpleFaker } from './simple-faker';
import { mergeLocales } from './utils/merge-locales';

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
export class Faker extends SimpleFaker {
  readonly rawDefinitions: LocaleDefinition;
  readonly definitions: LocaleProxy;

  /**
   * @deprecated Use the modules specific to the type of data you want to generate instead.
   */
  // eslint-disable-next-line deprecation/deprecation
  readonly random: RandomModule = new RandomModule(this);

  readonly airline: AirlineModule = new AirlineModule(this);
  readonly animal: AnimalModule = new AnimalModule(this);
  readonly color: ColorModule = new ColorModule(this);
  readonly commerce: CommerceModule = new CommerceModule(this);
  readonly company: CompanyModule = new CompanyModule(this);
  readonly database: DatabaseModule = new DatabaseModule(this);
  readonly date: DateModule = new DateModule(this);
  readonly finance = new FinanceModule(this);
  readonly food = new FoodModule(this);
  readonly git: GitModule = new GitModule(this);
  readonly hacker: HackerModule = new HackerModule(this);
  readonly helpers: HelpersModule = new HelpersModule(this);
  readonly image: ImageModule = new ImageModule(this);
  readonly internet: InternetModule = new InternetModule(this);
  readonly location: LocationModule = new LocationModule(this);
  readonly lorem: LoremModule = new LoremModule(this);
  readonly music: MusicModule = new MusicModule(this);
  readonly person: PersonModule = new PersonModule(this);
  readonly phone: PhoneModule = new PhoneModule(this);
  readonly science: ScienceModule = new ScienceModule(this);
  readonly system: SystemModule = new SystemModule(this);
  readonly vehicle: VehicleModule = new VehicleModule(this);
  readonly word: WordModule = new WordModule(this);

  // Aliases
  /** @deprecated Use {@link Faker#location} instead */
  get address(): AddressModule {
    deprecated({
      deprecated: 'faker.address',
      proposed: 'faker.location',
      since: '8.0',
      until: '10.0',
    });
    return this.location;
  }

  /** @deprecated Use {@link Faker#person} instead */
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
   * For more information see our [Localization Guide](https://fakerjs.dev/guide/localization.html).
   *
   * @param options The options to use.
   * @param options.locale The locale data to use.
   * @param options.randomizer The Randomizer to use.
   * Specify this only if you want to use it to achieve a specific goal,
   * such as sharing the same random generator with other instances/tools.
   * Defaults to faker's Mersenne Twister based pseudo random number generator.
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
   *
   * @since 8.0.0
   */
  constructor(options: {
    /**
     * The locale data to use for this instance.
     * If an array is provided, the first locale that has a definition for a given property will be used.
     *
     * @see mergeLocales(): For more information about how the locales are merged.
     */
    locale: LocaleDefinition | LocaleDefinition[];

    /**
     * The Randomizer to use.
     * Specify this only if you want to use it to achieve a specific goal,
     * such as sharing the same random generator with other instances/tools.
     *
     * @default generateMersenne32Randomizer()
     */
    randomizer?: Randomizer;
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
   * @example
   * import { Faker, allLocales } from '@faker-js/faker';
   * // const { Faker, allLocales } = require('@faker-js/faker');
   *
   * new Faker({ locales: allLocales });
   *
   * @since 6.0.0
   *
   * @deprecated Use `new Faker({ locale: [locale, localeFallback] })` instead.
   */
  constructor(options: {
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
  // This is somehow required for `ConstructorParameters<typeof Faker>[0]` to work
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
   * @param options.randomizer The Randomizer to use.
   * Specify this only if you want to use it to achieve a specific goal,
   * such as sharing the same random generator with other instances/tools.
   * Defaults to faker's Mersenne Twister based pseudo random number generator.
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
   *
   * @since 8.0.0
   */
  constructor(
    options:
      | {
          /**
           * The locale data to use for this instance.
           * If an array is provided, the first locale that has a definition for a given property will be used.
           *
           * @see mergeLocales(): For more information about how the locales are merged.
           */
          locale: LocaleDefinition | LocaleDefinition[];

          /**
           * The Randomizer to use.
           * Specify this only if you want to use it to achieve a specific goal,
           * such as sharing the same random generator with other instances/tools.
           *
           * @default generateMersenne32Randomizer()
           */
          randomizer?: Randomizer;
        }
      | {
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
        }
  );
  constructor(
    options:
      | {
          locale: LocaleDefinition | LocaleDefinition[];
          randomizer?: Randomizer;
        }
      | {
          locales: Record<string, LocaleDefinition>;
          locale?: string;
          localeFallback?: string;
          randomizer?: Randomizer;
        }
  ) {
    super({ randomizer: options.randomizer });

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

    this.rawDefinitions = locale as LocaleDefinition;
    this.definitions = createLocaleProxy(this.rawDefinitions);
  }

  /**
   * Returns an object with metadata about the current locale.
   *
   * @example
   * import { faker, fakerES_MX } from '@faker-js/faker';
   * // const { faker, fakerES_MX } = require("@faker-js/faker")
   * faker.getMetadata(); // { title: 'English', code: 'en', language: 'en', endonym: 'English', dir: 'ltr', script: 'Latn' }
   * fakerES_MX.getMetadata(); // { title: 'Spanish (Mexico)', code: 'es_MX', language: 'es', endonym: 'Español (México)', dir: 'ltr', script: 'Latn', country: 'MX' }
   *
   * @since 8.1.0
   */
  getMetadata(): MetadataDefinition {
    return this.rawDefinitions.metadata ?? {};
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
