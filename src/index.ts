import { Datatype } from './datatype';
import { Mersenne } from './mersenne';
import { Random } from './random';

export interface FakerOptions {
  locales?: string[];
  locale?: string;
  localeFallback?: string;
}

export interface DefinitionTypes {
  name: string[];
  address: string[];
  animal: string[];
  company: string[];
  lorem: string[];
  hacker: string[];
  phone_number: string[];
  finance: string[];
  internet: string[];
  commerce: string[];
  database: string[];
  system: string[];
  date: string[];
  vehicle: string[];
  music: string[];
  word: string[];
  title: string | string[];
  separator: string | string[];
}

export class Faker {
  locales: string[] | {};
  locale: string;
  localeFallback: string;

  definitions = {};
  definitionTypes: DefinitionTypes = {
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

  readonly mersenne: Mersenne = new Mersenne();
  random = new Random(this);
  datatype: Datatype = new Datatype(this);

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
  loadDefinitions(types: DefinitionTypes) {
    Object.keys(types).forEach((t: string) => {
      if (typeof this.definitions[t] === 'undefined') {
        this.definitions[t] = {};
      }

      if (typeof types[t] === 'string') {
        this.definitions[t] = types[t];
        return;
      }

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

  seed(value?: any[] | any) {
    this.seedValue = value;
    this.random = new Random(this, this.seedValue);
    this.datatype = new Datatype(this, this.seedValue);
  }

  /**
   * Set Faker's locale
   *
   * @param locale
   */
  setLocale(locale: string) {
    this.locale = locale;
  }
}

export default Faker;
module.exports = Faker;
