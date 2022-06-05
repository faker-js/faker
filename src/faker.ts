import type { LocaleDefinition } from './definitions';
import { FakerError } from './errors/faker-error';
import type { KnownLocale } from './locales';
import { Address } from './modules/address';
import { Animal } from './modules/animal';
import { Color } from './modules/color';
import { Commerce } from './modules/commerce';
import { Company } from './modules/company';
import { Database } from './modules/database';
import { Datatype } from './modules/datatype';
import { _Date } from './modules/date';
import { Fake } from './modules/fake';
import { Finance } from './modules/finance';
import { Git } from './modules/git';
import { Hacker } from './modules/hacker';
import { Helpers } from './modules/helpers';
import { Image } from './modules/image';
import { Internet } from './modules/internet';
import { Lorem } from './modules/lorem';
import { Mersenne } from './modules/mersenne';
import { Music } from './modules/music';
import { Name } from './modules/name';
import { Phone } from './modules/phone';
import { Random } from './modules/random';
import { Science } from './modules/science';
import { System } from './modules/system';
import { Unique } from './modules/unique';
import { Vehicle } from './modules/vehicle';
import { Word } from './modules/word';
import type { LiteralUnion } from './utils/types';

export type UsableLocale = LiteralUnion<KnownLocale>;
export type UsedLocales = Partial<Record<UsableLocale, LocaleDefinition>>;

export interface FakerOptions {
  locales: UsedLocales;
  locale?: UsableLocale;
  localeFallback?: UsableLocale;
}

const metadataKeys: ReadonlyArray<keyof LocaleDefinition> = [
  'title',
  'separator',
];

export class Faker {
  locales: UsedLocales;
  locale: UsableLocale;
  localeFallback: UsableLocale;

  readonly definitions: LocaleDefinition = this.initDefinitions();

  readonly fake: Fake['fake'] = new Fake(this).fake;
  readonly unique: Unique['unique'] = new Unique().unique;

  readonly mersenne: Mersenne = new Mersenne();
  readonly random: Random = new Random(this);

  readonly helpers: Helpers = new Helpers(this);

  readonly datatype: Datatype = new Datatype(this);

  readonly address: Address = new Address(this);
  readonly animal: Animal = new Animal(this);
  readonly color: Color = new Color(this);
  readonly commerce: Commerce = new Commerce(this);
  readonly company: Company = new Company(this);
  readonly database: Database = new Database(this);
  readonly date: _Date = new _Date(this);
  readonly finance = new Finance(this);
  readonly git: Git = new Git(this);
  readonly hacker: Hacker = new Hacker(this);
  readonly image: Image = new Image(this);
  readonly internet: Internet = new Internet(this);
  readonly lorem: Lorem = new Lorem(this);
  readonly music: Music = new Music(this);
  readonly name: Name = new Name(this);
  readonly phone: Phone = new Phone(this);
  readonly science: Science = new Science(this);
  readonly system: System = new System(this);
  readonly vehicle: Vehicle = new Vehicle(this);
  readonly word: Word = new Word(this);

  constructor(opts: FakerOptions) {
    if (!opts) {
      throw new FakerError(
        'Options with at least one entry in locales must be provided'
      );
    }

    if (Object.keys(opts.locales ?? {}).length === 0) {
      throw new FakerError(
        'At least one entry in locales must be provided in the locales parameter'
      );
    }

    this.locales = opts.locales;
    this.locale = opts.locale || 'en';
    this.localeFallback = opts.localeFallback || 'en';
  }

  /**
   * Creates a Proxy based LocaleDefinition that virtually merges the locales.
   */
  private initDefinitions(): LocaleDefinition {
    // Returns the first LocaleDefinition[key] in any locale
    const resolveBaseData = (key: keyof LocaleDefinition): unknown =>
      this.locales[this.locale][key] ?? this.locales[this.localeFallback][key];

    // Returns the first LocaleDefinition[module][entry] in any locale
    const resolveModuleData = (
      module: keyof LocaleDefinition,
      entry: string
    ): unknown =>
      this.locales[this.locale][module]?.[entry] ??
      this.locales[this.localeFallback][module]?.[entry];

    // Returns a proxy that can return the entries for a module (if it exists)
    const moduleLoader = (
      module: keyof LocaleDefinition
    ): Record<string, unknown> | undefined => {
      if (resolveBaseData(module)) {
        return new Proxy(
          {},
          {
            get(target, entry: string): unknown {
              return resolveModuleData(module, entry);
            },
          }
        );
      } else {
        return undefined;
      }
    };

    return new Proxy({} as LocaleDefinition, {
      get(target: LocaleDefinition, module: string): unknown {
        let result = target[module];
        if (result) {
          return result;
        } else if (metadataKeys.includes(module)) {
          return resolveBaseData(module);
        } else {
          result = moduleLoader(module);
          target[module] = result;
          return result;
        }
      },
    });
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
   * @example
   * // Consistent values for tests:
   * faker.seed(42)
   * faker.datatype.number(10); // 4
   * faker.datatype.number(10); // 8
   *
   * faker.seed(42)
   * faker.datatype.number(10); // 4
   * faker.datatype.number(10); // 8
   *
   * @example
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
   * @example
   * // Consistent values for tests:
   * faker.seed([42, 13, 17])
   * faker.datatype.number(10); // 4
   * faker.datatype.number(10); // 8
   *
   * faker.seed([42, 13, 17])
   * faker.datatype.number(10); // 4
   * faker.datatype.number(10); // 8
   *
   * @example
   * // Random but reproducible tests:
   * // Simply log the seed, and if you need to reproduce it, insert the seed here
   * console.log('Running test with seed:', faker.seed());
   */
  seed(seedArray: number[]): number[];
  seed(
    seed: number | number[] = Math.ceil(Math.random() * Number.MAX_SAFE_INTEGER)
  ): number | number[] {
    if (Array.isArray(seed) && seed.length) {
      this.mersenne.seed_array(seed);
    } else if (!Array.isArray(seed) && !isNaN(seed)) {
      this.mersenne.seed(seed);
    }

    return seed;
  }

  /**
   * Set Faker's locale
   *
   * @param locale The locale to set (e.g. `en` or `en_AU`, `en_AU_ocker`).
   */
  setLocale(locale: UsableLocale): void {
    this.locale = locale;
  }
}
