import { Datatype } from './datatype';
import { Mersenne } from './mersenne';
import { Random } from './random';

export interface FakerOptions {
  locales?: string[];
  locale?: string;
  localeFallback?: string;
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
  locales: string[] | {};
  locale: string;
  localeFallback: string;

  // TODO @Shinigami92 2022-01-11: For now we loose types here
  // @ts-expect-error: will be lazy filled by constructor
  readonly definitions: Record<keyof DefinitionTypes, any> = {};
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

  readonly fake = new (require('./fake'))(this).fake;
  readonly unique = new (require('./unique'))(this).unique;

  readonly mersenne: Mersenne = new Mersenne();
  random: Random = new Random(this);

  readonly helpers = new (require('./helpers'))(this);

  datatype: Datatype = new Datatype(this);

  readonly address = new (require('./address'))(this);
  readonly animal = new (require('./animal'))(this);
  readonly commerce = new (require('./commerce'))(this);
  readonly company = new (require('./company'))(this);
  readonly database = new (require('./database'))(this);
  readonly date = new (require('./date'))(this);
  readonly finance = new (require('./finance'))(this);
  readonly git = new (require('./git'))(this);
  readonly hacker = new (require('./hacker'))(this);
  // TODO @Shinigami92 2022-01-12: iban was not used
  // readonly iban = new (require('./iban'))(this);
  readonly image = new (require('./image'))(this);
  readonly internet = new (require('./internet'))(this);
  readonly lorem = new (require('./lorem'))(this);
  readonly music = new (require('./music'))(this);
  readonly name = new (require('./name'))(this);
  readonly phone = new (require('./phone_number'))(this);
  readonly system = new (require('./system'))(this);
  readonly time = new (require('./time'))(this);
  readonly vehicle = new (require('./vehicle'))(this);
  readonly word = new (require('./word'))(this);

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
  setLocale(locale: string): void {
    this.locale = locale;
  }
}

export default Faker;
module.exports = Faker;
