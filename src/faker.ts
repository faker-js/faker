import type { FakerOptions } from './core';
import type { LocaleDefinition, MetadataDefinition } from './definitions';
import { FakerError } from './errors/faker-error';
import type { LocaleProxy } from './internal/locale-proxy';
import { AirlineModule } from './modules/airline';
import { AnimalModule } from './modules/animal';
import { BookModule } from './modules/book';
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
import { LocationModule } from './modules/location';
import { LoremModule } from './modules/lorem';
import { MedicalModule } from './modules/medical';
import { MusicModule } from './modules/music';
import { PersonModule } from './modules/person';
import { PhoneModule } from './modules/phone';
import { ScienceModule } from './modules/science';
import { SystemModule } from './modules/system';
import { VehicleModule } from './modules/vehicle';
import { WordModule } from './modules/word';
import { SimpleFaker } from './simple-faker';

/**
 * This is Faker's main class containing all modules that can be used to generate data.
 *
 * Please have a look at the individual modules and methods for more information and examples.
 *
 * @example
 * // Default Faker instance
 * import { faker } from '@faker-js/faker';
 * // const { faker } = require('@faker-js/faker');
 *
 * // faker.seed(1234);
 *
 * faker.person.firstName(); // 'John'
 * faker.person.lastName(); // 'Doe'
 * @example
 * // Custom locale without en fallback
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
  readonly airline: AirlineModule;
  readonly animal: AnimalModule;
  readonly book: BookModule;
  readonly color: ColorModule;
  readonly commerce: CommerceModule;
  readonly company: CompanyModule;
  readonly database: DatabaseModule;
  readonly date: DateModule;
  readonly finance: FinanceModule;
  readonly food: FoodModule;
  readonly git: GitModule;
  readonly hacker: HackerModule;
  readonly helpers: HelpersModule;
  readonly image: ImageModule;
  readonly internet: InternetModule;
  readonly location: LocationModule;
  readonly lorem: LoremModule;
  readonly medical: MedicalModule;
  readonly music: MusicModule;
  readonly person: PersonModule;
  readonly phone: PhoneModule;
  readonly science: ScienceModule;
  readonly system: SystemModule;
  readonly vehicle: VehicleModule;
  readonly word: WordModule;

  get rawDefinitions(): LocaleDefinition {
    return this.fakerCore.locale.raw;
  }

  get definitions(): LocaleProxy {
    return this.fakerCore.locale;
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
   * @param options.locale The locale data to use for this instance.
   * If an array is provided, the first locale that has a definition for a given property will be used.
   * Please make sure that all required locales and their parent locales are present, e.g. `[de_AT, de, en, base]`.
   * @param options.randomizer The Randomizer to use.
   * Specify this only if you want to use it to achieve a specific goal,
   * such as sharing the same random generator with other instances/tools.
   * Defaults to faker's Mersenne Twister based pseudo random number generator.
   * @param options.seed The initial seed to use.
   * The seed can be used to generate reproducible values.
   * Refer to the `seed()` method for more information.
   * Defaults to a random seed.
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
  constructor(options: FakerOptions) {
    super(options);

    const { locale } = options;

    // TODO @ST-DDT 2026-03-08: We should either not throw or throw consistently when locale data are empty.
    // And likely refer to simpleFaker as alternative
    if (Array.isArray(locale) && locale.length === 0) {
      throw new FakerError(
        'The locale option must contain at least one locale definition.'
      );
    }

    this.airline = new AirlineModule(this.fakerCore);
    this.animal = new AnimalModule(this.fakerCore);
    this.book = new BookModule(this.fakerCore);
    this.color = new ColorModule(this.fakerCore);
    this.commerce = new CommerceModule(this.fakerCore);
    this.company = new CompanyModule(this.fakerCore);
    this.database = new DatabaseModule(this.fakerCore);
    this.date = new DateModule(this.fakerCore);
    this.finance = new FinanceModule(this.fakerCore);
    this.food = new FoodModule(this.fakerCore);
    this.git = new GitModule(this.fakerCore);
    this.hacker = new HackerModule(this.fakerCore);
    this.helpers = new HelpersModule(this.fakerCore, this);
    this.image = new ImageModule(this.fakerCore);
    this.internet = new InternetModule(this.fakerCore);
    this.location = new LocationModule(this.fakerCore);
    this.lorem = new LoremModule(this.fakerCore);
    this.medical = new MedicalModule(this.fakerCore);
    this.music = new MusicModule(this.fakerCore);
    this.person = new PersonModule(this.fakerCore);
    this.phone = new PhoneModule(this.fakerCore);
    this.science = new ScienceModule(this.fakerCore);
    this.system = new SystemModule(this.fakerCore);
    this.vehicle = new VehicleModule(this.fakerCore);
    this.word = new WordModule(this.fakerCore);
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
    return this.fakerCore.locale.raw.metadata ?? {};
  }
}
