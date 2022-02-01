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
import { Phone } from './phone';
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
    // TODO(@fpoppinga): month and weekday are not array types, but a
    // more complex structure containing different formats
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
    nobility_title_prefix: string[];
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
  readonly address: (keyof LocaleDefinition['address'])[];
  readonly animal: (keyof LocaleDefinition['animal'])[];
  readonly app: (keyof LocaleDefinition['app'])[];
  readonly business: (keyof LocaleDefinition['business'])[];
  readonly cell_phone: (keyof LocaleDefinition['cell_phone'])[];
  readonly commerce: (keyof LocaleDefinition['commerce'])[];
  readonly company: (keyof LocaleDefinition['company'])[];
  readonly database: (keyof LocaleDefinition['database'])[];
  readonly date: (keyof LocaleDefinition['date'])[];
  readonly finance: (keyof LocaleDefinition['finance'])[];
  readonly hacker: (keyof LocaleDefinition['hacker'])[];
  readonly internet: (keyof LocaleDefinition['internet'])[];
  readonly lorem: (keyof LocaleDefinition['lorem'])[];
  readonly music: (keyof LocaleDefinition['music'])[];
  readonly name: (keyof LocaleDefinition['name'])[];
  readonly phone_number: (keyof LocaleDefinition['phone_number'])[];
  readonly system: (keyof LocaleDefinition['system'])[];
  readonly team: (keyof LocaleDefinition['team'])[];
  readonly title: (keyof LocaleDefinition['name']['title'])[];
  readonly vehicle: (keyof LocaleDefinition['vehicle'])[];
  readonly word: (keyof LocaleDefinition['word'])[];
}

export class Faker {
  locales: UsedLocales;
  locale: UsableLocale;
  localeFallback: UsableLocale;

  // @ts-expect-error: will be lazy filled by constructor
  readonly definitions: Definitions = {};
  private readonly definitionTypes: DefinitionTypes = {
    address: [
      'building_number',
      'city_name',
      'city_prefix',
      'city_suffix',
      'city',
      'country_code_alpha_3',
      'country_code',
      'country',
      'county',
      'default_country',
      'direction_abbr',
      'direction',
      'postcode_by_state',
      'postcode',
      'secondary_address',
      'state_abbr',
      'state',
      'street_address',
      'street_name',
      'street_suffix',
      'time_zone',
    ],
    animal: [
      'bear',
      'bird',
      'cat',
      'cetacean',
      'cow',
      'crocodilia',
      'dog',
      'fish',
      'horse',
      'insect',
      'lion',
      'rabbit',
      'snake',
      'type',
    ],
    app: ['author', 'name', 'version'],
    business: [
      'credit_card_expiry_dates',
      'credit_card_numbers',
      'credit_card_types',
    ],
    cell_phone: ['formats'],
    commerce: ['color', 'department', 'product_description', 'product_name'],
    company: [
      'adjective',
      'bs_adjective',
      'bs_noun',
      'bs_verb',
      'descriptor',
      'name',
      'noun',
      'suffix',
    ],
    database: ['collation', 'column', 'engine', 'type'],
    date: ['month', 'weekday'],
    finance: ['account_type', 'credit_card', 'currency', 'transaction_type'],
    hacker: ['abbreviation', 'adjective', 'ingverb', 'noun', 'phrase', 'verb'],
    internet: ['avatar_uri', 'domain_suffix', 'example_email', 'free_email'],
    lorem: ['supplemental', 'words'],
    music: ['genre'],
    name: [
      'binary_gender',
      'female_first_name',
      'female_last_name',
      'female_middle_name',
      'female_prefix',
      'first_name',
      'gender',
      'last_name',
      'male_first_name',
      'male_last_name',
      'male_middle_name',
      'male_prefix',
      'name',
      'prefix',
      'suffix',
      'title',
    ],
    phone_number: ['formats'],
    system: ['directoryPaths', 'mimeTypes'],
    team: ['creature', 'name'],
    title: ['descriptor', 'job', 'level'],
    vehicle: ['bicycle', 'fuel', 'manufacturer', 'model', 'type'],
    word: [
      'adjective',
      'adverb',
      'conjunction',
      'interjection',
      'noun',
      'preposition',
      'verb',
    ],
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
