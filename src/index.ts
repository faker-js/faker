import { Address } from './address';
import { Animal } from './animal';
import { Commerce } from './commerce';
import { Company } from './company';
import { Database } from './database';
import { Datatype } from './datatype';
import { _Date } from './date';
import type { Definitions } from './definitions';
import { Fake } from './fake';
import { Finance } from './finance';
import { Git } from './git';
import { Hacker } from './hacker';
import { Helpers } from './helpers';
import { Image } from './image';
import { Internet } from './internet';
import type { KnownLocale } from './locales';
import allLocales from './locales';
import { Lorem } from './lorem';
import { Mersenne } from './mersenne';
import { Music } from './music';
import { Name } from './name';
import { Phone } from './phone_number';
import { Random } from './random';
import { System } from './system';
import { Time } from './time';
import { Unique } from './unique';
import { Vehicle } from './vehicle';
import { Word } from './word';

// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609
type LiteralUnion<T extends U, U = string> = T | (U & { zz_IGNORE_ME?: never });

export interface LocaleDefinition {
  title: string;
  separator?: string;

  address?: Partial<{
    building_number: any[];
    city_name: any[];
    city_prefix: any[];
    city_suffix: any[];
    city: any[];
    country_code_alpha_3: any[];
    country_code: any[];
    country: any[];
    county: any[];
    default_country: any[];
    direction_abbr: any[];
    direction: any[];
    postcode_by_state: any[];
    postcode: any[];
    secondary_address: any[];
    state_abbr: any[];
    state: any[];
    street_address: any[];
    street_name: any[];
    street_suffix: any[];
    time_zone: any[];
  }>;
  animal?: Partial<{
    bear: any[];
    bird: any[];
    cat: any[];
    cetacean: any[];
    cow: any[];
    crocodilia: any[];
    dog: any[];
    fish: any[];
    horse: any[];
    insect: any[];
    lion: any[];
    rabbit: any[];
    snake: any[];
    type: any[];
  }>;
  app?: Partial<{
    author: any[];
    name: any[];
    version: any[];
  }>;
  business?: Partial<{
    credit_card_expiry_dates: any[];
    credit_card_numbers: any[];
    credit_card_types: any[];
  }>;
  cell_phone?: Partial<{
    formats: any[];
  }>;
  commerce?: Partial<{
    color: any[];
    department: any[];
    product_description: any[];
    product_name: any[];
  }>;
  company?: Partial<{
    adjective: any[];
    bs_adjective: any[];
    bs_noun: any[];
    bs_verb: any[];
    descriptor: any[];
    name: any[];
    noun: any[];
    suffix: any[];
  }>;
  database?: Partial<{
    collation: any[];
    column: any[];
    engine: any[];
    type: any[];
  }>;
  date?: Partial<{
    month: any[];
    weekday: any[];
  }>;
  finance?: Partial<{
    account_type: any[];
    credit_card: any[];
    currency: any[];
    transaction_type: any[];
  }>;
  hacker?: Partial<{
    abbreviation: any[];
    adjective: any[];
    ingverb: any[];
    noun: any[];
    phrase: any[];
    verb: any[];
  }>;
  internet?: Partial<{
    avatar_uri: any[];
    domain_suffix: any[];
    example_email: any[];
    free_email: any[];
  }>;
  lorem?: Partial<{
    supplemental: any[];
    words: any[];
  }>;
  music?: Partial<{
    genre: any[];
  }>;
  name?: Partial<{
    binary_gender: string[];
    female_first_name: string[];
    female_last_name: string[];
    female_middle_name: string[];
    female_prefix: string[];
    first_name: string[];
    gender: string[];
    last_name: string[];
    male_first_name: string[];
    male_last_name: string[];
    male_middle_name: string[];
    male_prefix: string[];
    name: string[];
    prefix: string[];
    suffix: string[];
    title: {
      descriptor?: string[];
      job: string[];
      level?: string[];
    };
  }>;
  phone_number?: Partial<{
    formats: any[];
  }>;
  system?: Partial<{
    directoryPaths: any[];
    mimeTypes: any[];
  }>;
  team?: Partial<{
    creature: any[];
    name: any[];
  }>;
  vehicle?: Partial<{
    bicycle: any[];
    fuel: any[];
    manufacturer: any[];
    model: any[];
    type: any[];
  }>;
  word?: Partial<{
    adjective: any[];
    adverb: any[];
    conjunction: any[];
    interjection: any[];
    noun: any[];
    preposition: any[];
    verb: any[];
  }>;
  [group: string]: any;
}

export type UsableLocale = LiteralUnion<KnownLocale>;
export type UsedLocales = Partial<Record<UsableLocale, LocaleDefinition>>;

export type { Definitions };

export interface FakerOptions {
  locales?: UsedLocales;
  locale?: UsableLocale;
  localeFallback?: UsableLocale;
}

export interface DefinitionTypes {
  readonly name: string[];
  readonly address: string[];
  readonly animal: string[];
  readonly company: string[];
  readonly lorem: string[];
  readonly hacker: string[];
  readonly phone_number: string[];
  readonly finance: string[];
  readonly internet: string[];
  readonly commerce: string[];
  readonly database: string[];
  readonly system: string[];
  readonly date: string[];
  readonly vehicle: string[];
  readonly music: string[];
  readonly word: string[];
  readonly title: string | string[];
  readonly separator: string | string[];
}

export class Faker {
  locales: UsedLocales;
  locale: UsableLocale;
  localeFallback: UsableLocale;

  // @ts-expect-error: will be lazy filled by constructor
  readonly definitions: Definitions = {};
  private readonly definitionTypes: DefinitionTypes = {
    name: [
      'first_name',
      'last_name',
      'prefix',
      'suffix',
      'binary_gender',
      'gender',
      'title',
      'male_prefix',
      'female_prefix',
      'male_first_name',
      'female_first_name',
      'male_middle_name',
      'female_middle_name',
      'male_last_name',
      'female_last_name',
    ],
    address: [
      'city_name',
      'city_prefix',
      'city_suffix',
      'street_suffix',
      'county',
      'country',
      'country_code',
      'country_code_alpha_3',
      'state',
      'state_abbr',
      'street_prefix',
      'postcode',
      'postcode_by_state',
      'direction',
      'direction_abbr',
      'time_zone',
    ],
    animal: [
      'dog',
      'cat',
      'snake',
      'bear',
      'lion',
      'cetacean',
      'insect',
      'crocodilia',
      'cow',
      'bird',
      'fish',
      'rabbit',
      'horse',
      'type',
    ],
    company: [
      'adjective',
      'noun',
      'descriptor',
      'bs_adjective',
      'bs_noun',
      'bs_verb',
      'suffix',
    ],
    lorem: ['words'],
    hacker: ['abbreviation', 'adjective', 'noun', 'verb', 'ingverb', 'phrase'],
    phone_number: ['formats'],
    finance: [
      'account_type',
      'transaction_type',
      'currency',
      'iban',
      'credit_card',
    ],
    internet: [
      'avatar_uri',
      'domain_suffix',
      'free_email',
      'example_email',
      'password',
    ],
    commerce: [
      'color',
      'department',
      'product_name',
      'price',
      'categories',
      'product_description',
    ],
    database: ['collation', 'column', 'engine', 'type'],
    system: ['mimeTypes', 'directoryPaths'],
    date: ['month', 'weekday'],
    vehicle: [
      'vehicle',
      'manufacturer',
      'model',
      'type',
      'fuel',
      'vin',
      'color',
    ],
    music: ['genre'],
    word: [
      'adjective',
      'adverb',
      'conjunction',
      'interjection',
      'noun',
      'preposition',
      'verb',
    ],
    title: '',
    separator: '',
  };

  seedValue?: any[] | any;

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
  // TODO @Shinigami92 2022-01-12: iban was not used
  // readonly iban = new (require('./iban'))(this);
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

  constructor(opts: FakerOptions = {}) {
    this.locales = this.locales || opts.locales || {};
    this.locale = this.locale || opts.locale || 'en';
    this.localeFallback = this.localeFallback || opts.localeFallback || 'en';

    this.loadDefinitions(this.definitionTypes);
  }

  /**
   * Load the definitions contained in the locales file for the given types
   *
   * @param types
   */
  private loadDefinitions(types: DefinitionTypes): void {
    // TODO @Shinigami92 2022-01-11: Find a way to load this even more dynamically
    // In a way so that we don't accidentally miss a definition
    Object.keys(types).forEach((t: keyof DefinitionTypes) => {
      if (typeof this.definitions[t] === 'undefined') {
        this.definitions[t] = {};
      }

      if (typeof types[t] === 'string') {
        this.definitions[t] = types[t];
        return;
      }

      // TODO @Shinigami92 2022-01-11: We may have a bug here for the keys 'title' and 'separator'
      // @ts-expect-error
      types[t].forEach((p) => {
        Object.defineProperty(this.definitions[t], p, {
          get: () => {
            if (
              typeof this.locales[this.locale][t] === 'undefined' ||
              typeof this.locales[this.locale][t][p] === 'undefined'
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

  seed(value?: any[] | any): void {
    this.seedValue = value;
    this.random = new Random(this, this.seedValue);
    this.datatype = new Datatype(this, this.seedValue);
  }

  /**
   * Set Faker's locale
   *
   * @param locale
   */
  setLocale(locale: UsableLocale): void {
    this.locale = locale;
  }
}

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});

export default faker;
