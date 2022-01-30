import type { AddressDefinitions } from './address';
import { addresses } from './address';
import type { AnimalDefinitions } from './animal';
import { animals } from './animal';
import { companies } from './company';
import type { CompanyDefinition } from './company';
import type { NameDefinitions } from './name';
import { names } from './name';

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
