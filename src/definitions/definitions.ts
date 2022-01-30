import type { AddressDefinitions } from './address';
import { address } from './address';
import type { AnimalDefinitions } from './animal';
import { animal } from './animal';
import type { CommerceDefinitions } from './commerce';
import { commerce } from './commerce';
import type { CompanyDefinition } from './company';
import { company } from './company';
import type { DatabaseDefinition } from './database';
import { database } from './database';
import type { DateDefinition } from './date';
import { date } from './date';
import type { FinanceDefinitions } from './finance';
import { finance } from './finance';
import type { HackerDefinitions } from './hacker';
import { hacker } from './hacker';
import type { InternetDefinitions } from './internet';
import { internet } from './internet';
import type { NameDefinitions } from './name';
import { name } from './name';

/**
 * The definitions as used by the Faker modules.
 */
export interface Definitions {
  address: AddressDefinitions;
  animal: AnimalDefinitions;
  commerce: CommerceDefinitions;
  company: CompanyDefinition;
  database: DatabaseDefinition;
  date: DateDefinition;
  finance: FinanceDefinitions;
  hacker: HackerDefinitions;
  internet: InternetDefinitions;
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
  commerce?: Partial<CommerceDefinitions>;
  company?: Partial<CompanyDefinition>;
  database?: Partial<DatabaseDefinition>;
  date?: Partial<DateDefinition>;
  finance?: Partial<FinanceDefinitions>;
  hacker?: Partial<HackerDefinitions>;
  internet?: Partial<InternetDefinitions>;
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

  readonly address: typeof address;
  readonly animal: typeof animal;
  readonly commerce: typeof commerce;
  readonly company: typeof company;
  readonly database: typeof database;
  readonly date: typeof date;
  readonly finance: typeof finance;
  readonly hacker: typeof hacker;
  readonly internet: typeof internet;
  readonly name: typeof name;

  readonly lorem: string[];
  readonly phone_number: string[];
  readonly system: string[];
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

  address,
  animal,
  company,
  commerce,
  database,
  date,
  finance,
  hacker,
  internet,
  name,
  lorem: ['words'],
  phone_number: ['formats'],
  system: ['mimeTypes', 'directoryPaths'],
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
