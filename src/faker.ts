import { Address } from './address';
import { Animal } from './animal';
import { Commerce } from './commerce';
import { Company } from './company';
import { Database } from './database';
import { Datatype } from './datatype';
import { _Date } from './date';
import type { LocaleDefinition } from './definitions';
import { DEFINITIONS } from './definitions';
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
  locale?: UsableLocale;
  localeFallback?: UsableLocale;
}

export class Faker {
  locales: UsedLocales;
  locale: UsableLocale;
  localeFallback: UsableLocale;

  // Will be lazy init
  readonly definitions: LocaleDefinition = {} as LocaleDefinition;

  seedValue?: number | number[];

  readonly fake: Fake['fake'] = new Fake(this).fake;
  readonly unique: Unique['unique'] = new Unique().unique;

  readonly mersenne: Mersenne = new Mersenne();
  random: Random = new Random(this);

  readonly helpers: Helpers = new Helpers(this);

  datatype: Datatype = new Datatype(this);

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
      throw new Error(
        'Options with at least one entry in locales must be provided'
      );
    }

    if (Object.keys(opts.locales ?? {}).length === 0) {
      throw new Error(
        'At least one entry in locales must be provided in the locales parameter'
      );
    }

    this.locales = opts.locales;
    this.locale = this.locale || opts.locale || 'en';
    this.localeFallback = this.localeFallback || opts.localeFallback || 'en';

    this.loadDefinitions();
  }

  /**
   * Load the definitions contained in the locales file for the given types
   */
  private loadDefinitions(): void {
    // TODO @Shinigami92 2022-01-11: Find a way to load this even more dynamically
    // In a way so that we don't accidentally miss a definition
    Object.entries(DEFINITIONS).forEach(([t, v]) => {
      if (this.definitions[t] == null) {
        this.definitions[t] = {};
      }

      if (typeof v === 'string') {
        this.definitions[t] = v;
        return;
      }

      v.forEach((p) => {
        Object.defineProperty(this.definitions[t], p, {
          get: () => {
            if (
              this.locales[this.locale][t] == null ||
              this.locales[this.locale][t][p] == null
            ) {
              // certain localization sets contain less data then others.
              // in the case of a missing definition, use the default localeFallback
              // to substitute the missing set data
              // throw new Error('unknown property ' + d + p)
              return this.locales[this.localeFallback][t][p];
            } else {
              // return localized data
              return this.locales[this.locale][t][p];
            }
          },
        });
      });
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
   * Set Faker's locale
   *
   * @param locale The locale to set (e.g. `en` or `en_AU`, `en_AU_ocker`).
   */
  setLocale(locale: UsableLocale): void {
    this.locale = locale;
  }
}
