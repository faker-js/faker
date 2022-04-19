import type { AddressDefinitions } from './address';
import { ADDRESS } from './address';
import type { AnimalDefinitions } from './animal';
import { ANIMAL } from './animal';
import type { CommerceDefinitions } from './commerce';
import { COMMERCE } from './commerce';
import type { CompanyDefinitions } from './company';
import { COMPANY } from './company';
import type { DatabaseDefinitions } from './database';
import { DATABASE } from './database';
import type { DateDefinitions } from './date';
import { DATE } from './date';
import type { FinanceDefinitions } from './finance';
import { FINANCE } from './finance';
import type { HackerDefinitions } from './hacker';
import { HACKER } from './hacker';
import type { InternetDefinitions } from './internet';
import { INTERNET } from './internet';
import type { LoremDefinitions } from './lorem';
import { LOREM } from './lorem';
import type { MusicDefinitions } from './music';
import { MUSIC } from './music';
import type { NameDefinitions } from './name';
import { NAME } from './name';
import type { PhoneNumberDefinitions } from './phone_number';
import { PHONE_NUMBER } from './phone_number';
import type { SystemDefinitions } from './system';
import { SYSTEM } from './system';
import type { VehicleDefinitions } from './vehicle';
import { VEHICLE } from './vehicle';
import type { WordDefinitions } from './word';
import { WORD } from './word';

/**
 * The definitions as used by the Faker modules.
 */
interface Definitions {
  address: AddressDefinitions;
  animal: AnimalDefinitions;
  commerce: CommerceDefinitions;
  company: CompanyDefinitions;
  database: DatabaseDefinitions;
  date: DateDefinitions;
  finance: FinanceDefinitions;
  hacker: HackerDefinitions;
  internet: InternetDefinitions;
  lorem: LoremDefinitions;
  music: MusicDefinitions;
  name: NameDefinitions;
  phone_number: PhoneNumberDefinitions;
  system: SystemDefinitions;
  vehicle: VehicleDefinitions;
  word: WordDefinitions;
}

/**
 * The definitions as used by the translations/locales.
 * This is basically the same as Definitions with the exception,
 * that most properties are optional and extra properties are allowed.
 */
export type LocaleDefinition = {
  /**
   * The name of the language.
   */
  title: string;
  separator?: string;
} & {
  // Known modules
  [module in keyof Definitions]?: Partial<Definitions[module]>;
} & {
  // Unsupported & custom modules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [group: string]: any;
};

/**
 * Internal: Compatibility type to ensure all modules have access to fallback locales.
 * This should be replaced with a Proxy based property access
 * that don't require prior getter generation in the future.
 */
export type DefinitionTypes = {
  readonly title: 'metadata';
  readonly separator: 'metadata';
} & {
  readonly [module in keyof Definitions]: Array<keyof Definitions[module]>;
};

/**
 * Internal: List off all modules and their properties,
 * that needs to have a fallback generated in Faker.loadDefinitions().
 */
export const DEFINITIONS: DefinitionTypes = {
  title: 'metadata',
  separator: 'metadata',

  address: ADDRESS,
  animal: ANIMAL,
  company: COMPANY,
  commerce: COMMERCE,
  database: DATABASE,
  date: DATE,
  finance: FINANCE,
  hacker: HACKER,
  internet: INTERNET,
  lorem: LOREM,
  music: MUSIC,
  name: NAME,
  phone_number: PHONE_NUMBER,
  system: SYSTEM,
  vehicle: VEHICLE,
  word: WORD,
};
