import type { AddressDefinitions } from './address';
import { addresses } from './address';
import type { AnimalDefinitions } from './animal';
import { animals } from './animal';
import { companies } from './company';
import type { CompanyDefinition } from './company';
import type { NameDefinitions } from './name';
import { names } from './name';

/**
 * The definitions as used by the Faker modules.
 */
export interface Definitions {
  address: AddressDefinitions;
  animal: AnimalDefinitions;
  commerce: {
    color;
    department;
    product_description;
    product_name;
  };
  company: CompanyDefinition;
  database: {
    collation;
    column;
    engine;
    type;
  };
  date: {
    month;
    weekday;
  };
  finance: {
    account_type;
    credit_card;
    currency: Record<string, { code: string; symbol: string }>;
    transaction_type;
  };
  hacker: {
    abbreviation;
    adjective;
    ingverb;
    noun;
    phrase;
    verb;
  };
  internet: {
    domain_suffix;
    example_email;
    free_email;
  };
  lorem: {
    words;
  };
  music: {
    genre;
  };
  name: NameDefinitions;
  phone_number: {
    formats;
  };
  system: {
    directoryPaths;
    mimeTypes;
  };
  vehicle: {
    bicycle_type;
    fuel;
    manufacturer;
    model;
    type;
  };
  word: {
    adjective: string[];
    adverb: string[];
    conjunction: string[];
    interjection: string[];
    noun: string[];
    preposition: string[];
    verb: string[];
  };
}

/**
 * The definitions as used by the translations/locales.
 * This is basically the same as Definitions with the exception,
 * that most properties are optional and extra properties are allowed.
 */
export interface LocaleDefinition {
  /**
   * The name of the language.
   */
  title: string;
  separator?: string;

  address?: Partial<AddressDefinitions>;
  animal?: Partial<AnimalDefinitions>;
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
  company?: Partial<CompanyDefinition>;
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
  name?: Partial<NameDefinitions>;
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

/**
 * Internal: Compatibility type to ensure all modules have access to fallback locales.
 * This should be replaced with a Proxy based property access
 * that don't require prior getter generation in the future.
 */
export interface DefinitionTypes {
  readonly title: string;
  readonly separator: string;

  readonly address: typeof addresses;
  readonly animal: typeof animals;
  readonly name: typeof names;

  readonly company: typeof companies;
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
}

/**
 * Internal: List off all modules and their properties,
 * that needs to have a fallback generated in Faker.loadDefinitions().
 */
export const definitions: DefinitionTypes = {
  title: '',
  separator: '',

  address: addresses,
  animal: animals,
  name: names,
  company: companies,
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
  vehicle: ['vehicle', 'manufacturer', 'model', 'type', 'fuel', 'vin', 'color'],
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
};
