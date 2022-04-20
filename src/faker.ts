import { Address } from './address';
import { Animal } from './animal';
import { Commerce } from './commerce';
import { Company } from './company';
import { Database } from './database';
import { Datatype } from './datatype';
import { _Date } from './date';
import type { LocaleDefinition } from './definitions';
import { DEFINITIONS } from './definitions';
import { FakerError } from './errors/faker-error';
import { Fake } from './fake';
import { Finance } from './finance';
import { Git } from './git';
import { Hacker } from './hacker';
import { Helpers } from './helpers';
import { Image } from './image';
import { Internet } from './internet';
import type { KnownLocale } from './locales';
import { Lorem } from './lorem';
import { Mersenne } from './mersenne';
import { Music } from './music';
import { Name } from './name';
import { Phone } from './phone';
import { Random } from './random';
import { System } from './system';
import { Time } from './time';
import { Unique } from './unique';
import { Vehicle } from './vehicle';
import { Word } from './word';

// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & { zz_IGNORE_ME?: never });

export type UsableLocale = LiteralUnion<KnownLocale>;
export type UsedLocales = Partial<Record<UsableLocale, LocaleDefinition>>;

export interface FakerOptions {
  locales: UsedLocales;
  localeOrder?: UsableLocale[];
}

export class Faker {
  locales: UsedLocales;
  localeOrder: UsableLocale[];

  readonly definitions: LocaleDefinition = this.initDefinitions();

  seedValue?: number | number[];

  readonly fake: Fake['fake'] = new Fake(this).fake;
  readonly unique: Unique['unique'] = new Unique().unique;

  readonly mersenne: Mersenne = new Mersenne();
  readonly random: Random = new Random(this);

  readonly helpers: Helpers = new Helpers(this);

  readonly datatype: Datatype = new Datatype(this);

  readonly address: Address = new Address(this);
  readonly animal: Animal = new Animal(this);
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
  readonly system: System = new System(this);
  readonly time: Time = new Time();
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
    this.localeOrder = opts.localeOrder ?? ['en'];
  }

  /**
   * Creates a Proxy based LocaleDefinition that virtually merges the locales.
   */
  private initDefinitions(): LocaleDefinition {
    // Returns the first resolved locale data that aren't undefined
    const findFirst = <T>(
      resolver: (data: LocaleDefinition) => T | undefined
    ): T | undefined => {
      for (const locale of this.localeOrder) {
        const baseData = resolver(this.locales[locale]);
        if (baseData != null) {
          return baseData;
        }
      }
      return undefined;
    };

    // Returns the first LocaleDefinition[key] in any locale
    const resolveBaseData = (key: keyof LocaleDefinition): unknown =>
      findFirst((data) => data[key]);

    // Returns the first LocaleDefinition[module][entry] in any locale
    const resolveModuleData = (
      module: keyof LocaleDefinition,
      entry: string
    ): unknown => findFirst((data) => data[module]?.[entry]);

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
        } else if (DEFINITIONS[module] === 'metadata') {
          return resolveBaseData(module);
        } else {
          result = moduleLoader(module);
          target[module] = result;
          return result;
        }
      },
    });
  }

  seed(seed?: number | number[]): void {
    this.seedValue = seed;
    if (Array.isArray(seed) && seed.length) {
      this.mersenne.seed_array(seed);
    } else if (!Array.isArray(seed) && !isNaN(seed)) {
      this.mersenne.seed(seed);
    }
  }

  /**
   * Set Faker's locale using the default fallback strategy.
   *
   * @param locale The locale to set (e.g. `en` or `en_AU`, `en_AU_ocker`).
   * @param fallbacks The fixed fallbacks to use. Defaults to `['en']`.
   */
  setLocale(locale: UsableLocale, fallbacks: UsableLocale[] = ['en']): void {
    const localeOrder = [];
    const parts = locale.split('_');
    for (let i = parts.length; i > 0; i--) {
      const subLocale = parts.slice(0, i).join('_');
      if (this.locales[subLocale] != null) {
        localeOrder.push(subLocale);
      }
    }
    for (const fallback of fallbacks) {
      if (!localeOrder.includes(fallback) && this.locales[fallback] != null) {
        localeOrder.push(fallback);
      }
    }
    this.localeOrder = localeOrder;
  }
}
