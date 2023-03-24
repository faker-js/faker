import type { AirlineDefinitions } from './airline';
import type { AnimalDefinitions } from './animal';
import type { ColorDefinitions } from './color';
import type { CommerceDefinitions } from './commerce';
import type { CompanyDefinitions } from './company';
import type { DatabaseDefinitions } from './database';
import type { DateDefinitions } from './date';
import type { FinanceDefinitions } from './finance';
import type { HackerDefinitions } from './hacker';
import type { InternetDefinitions } from './internet';
import type { LocationDefinitions } from './location';
import type { LoremDefinitions } from './lorem';
import type { MusicDefinitions } from './music';
import type { PersonDefinitions } from './person';
import type { PhoneNumberDefinitions } from './phone_number';
import type { ScienceDefinitions } from './science';
import type { SystemDefinitions } from './system';
import type { VehicleDefinitions } from './vehicle';
import type { WordDefinitions } from './word';

export type LocaleEntry<T> = Partial<T> &
  // Unsupported & custom modules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>;

/**
 * The definitions as used by the Faker modules.
 */
export interface Definitions {
  airline: AirlineDefinitions;
  animal: AnimalDefinitions;
  color: ColorDefinitions;
  commerce: CommerceDefinitions;
  company: CompanyDefinitions;
  database: DatabaseDefinitions;
  date: DateDefinitions;
  finance: FinanceDefinitions;
  hacker: HackerDefinitions;
  internet: InternetDefinitions;
  location: LocationDefinitions;
  lorem: LoremDefinitions;
  music: MusicDefinitions;
  person: PersonDefinitions;
  phone_number: PhoneNumberDefinitions;
  science: ScienceDefinitions;
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
   * The English name of the language (and the specific country, if defined).
   */
  title: string;
} & LocaleEntry<Definitions>;
