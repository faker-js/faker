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
export interface Definitions {
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
export interface LocaleDefinition {
  /**
   * The name of the language.
   */
  title: string;
  separator?: string;

  address?: Partial<AddressDefinitions>;
  animal?: Partial<AnimalDefinitions>;
  commerce?: Partial<CommerceDefinitions>;
  company?: Partial<CompanyDefinitions>;
  database?: Partial<DatabaseDefinitions>;
  date?: Partial<DateDefinitions>;
  finance?: Partial<FinanceDefinitions>;
  hacker?: Partial<HackerDefinitions>;
  internet?: Partial<InternetDefinitions>;
  lorem?: Partial<LoremDefinitions>;
  music?: Partial<MusicDefinitions>;
  name?: Partial<NameDefinitions>;
  phone_number?: Partial<PhoneNumberDefinitions>;
  system?: Partial<SystemDefinitions>;
  vehicle?: Partial<VehicleDefinitions>;
  word?: Partial<WordDefinitions>;
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

  readonly address: typeof ADDRESS;
  readonly animal: typeof ANIMAL;
  readonly commerce: typeof COMMERCE;
  readonly company: typeof COMPANY;
  readonly database: typeof DATABASE;
  readonly date: typeof DATE;
  readonly finance: typeof FINANCE;
  readonly hacker: typeof HACKER;
  readonly internet: typeof INTERNET;
  readonly lorem: typeof LOREM;
  readonly name: typeof NAME;
  readonly music: typeof MUSIC;
  readonly phone_number: typeof PHONE_NUMBER;
  readonly system: typeof SYSTEM;
  readonly vehicle: typeof VEHICLE;
  readonly word: typeof WORD;
}

/**
 * Internal: List off all modules and their properties,
 * that needs to have a fallback generated in Faker.loadDefinitions().
 */
export const DEFINITIONS: DefinitionTypes = {
  title: '',
  separator: '',

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
