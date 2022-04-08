import { AddressModule } from './address';
import { AnimalModule } from './animal';
import { CommerceModule } from './commerce';
import { CompanyModule } from './company';
import { DatabaseModule } from './database';
import { DatatypeModule } from './datatype';
import { DateModule } from './date';
import type { LocaleDefinition } from './definitions';
import { DEFINITIONS } from './definitions';
import { FakerError } from './errors/faker-error';
import { FakeModule } from './fake';
import { FinanceModule } from './finance';
import { GitModule } from './git';
import { HackerModule } from './hacker';
import { HelpersModule } from './helpers';
import { ImageModule } from './image';
import { InternetModule } from './internet';
import type { KnownLocale } from './locales';
import { LoremModule } from './lorem';
import { MersenneModule } from './mersenne';
import { MusicModule } from './music';
import { NameModule } from './name';
import { PhoneModule } from './phone';
import { RandomModule } from './random';
import { SystemModule } from './system';
import { TimeModule } from './time';
import { UniqueModule } from './unique';
import { VehicleModule } from './vehicle';
import { WordModule } from './word';

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

  readonly fake: FakeModule['fake'] = new FakeModule(this).fake;
  readonly unique: UniqueModule['unique'] = new UniqueModule().unique;

  readonly mersenne: MersenneModule = new MersenneModule();
  random: RandomModule = new RandomModule(this);

  readonly helpers: HelpersModule = new HelpersModule(this);

  datatype: DatatypeModule = new DatatypeModule(this);

  readonly address: AddressModule = new AddressModule(this);
  readonly animal: AnimalModule = new AnimalModule(this);
  readonly commerce: CommerceModule = new CommerceModule(this);
  readonly company: CompanyModule = new CompanyModule(this);
  readonly database: DatabaseModule = new DatabaseModule(this);
  readonly date: DateModule = new DateModule(this);
  readonly finance = new FinanceModule(this);
  readonly git: GitModule = new GitModule(this);
  readonly hacker: HackerModule = new HackerModule(this);
  readonly image: ImageModule = new ImageModule(this);
  readonly internet: InternetModule = new InternetModule(this);
  readonly lorem: LoremModule = new LoremModule(this);
  readonly music: MusicModule = new MusicModule(this);
  readonly name: NameModule = new NameModule(this);
  readonly phone: PhoneModule = new PhoneModule(this);
  readonly system: SystemModule = new SystemModule(this);
  readonly time: TimeModule = new TimeModule();
  readonly vehicle: VehicleModule = new VehicleModule(this);
  readonly word: WordModule = new WordModule(this);

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

    this.loadDefinitions();
  }

  /**
   * Load the definitions contained in the locales file for the given types.
   *
   * Background: Certain localization sets contain less data then others.
   * In the case of a missing definition, use the localeFallback's values
   * to substitute the missing data.
   */
  private loadDefinitions(): void {
    // TODO @Shinigami92 2022-01-11: Find a way to load this even more dynamically
    // In a way so that we don't accidentally miss a definition
    for (const [moduleName, entryNames] of Object.entries(DEFINITIONS)) {
      if (typeof entryNames === 'string') {
        // For 'title' and 'separator'
        Object.defineProperty(this.definitions, moduleName, {
          get: (): unknown /* string */ =>
            this.locales[this.locale][moduleName] ??
            this.locales[this.localeFallback][moduleName],
        });
        continue;
      }

      if (this.definitions[moduleName] == null) {
        this.definitions[moduleName] = {};
      }

      for (const entryName of entryNames) {
        Object.defineProperty(this.definitions[moduleName], entryName, {
          get: (): unknown =>
            this.locales[this.locale][moduleName]?.[entryName] ??
            this.locales[this.localeFallback][moduleName]?.[entryName],
        });
      }
    }
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
