import type { AnimalDefinitions } from './animal';
import type { BookDefinitions } from './book';
import type { ColorDefinitions } from './color';
import type { CommerceDefinitions } from './commerce';
import type { CompanyDefinitions } from './company';
import type { DatabaseDefinitions } from './database';
import type { DateDefinitions } from './date';
import type { FinanceDefinitions } from './finance';
import type { FlightsDefinitions } from './flights';
import type { FoodDefinitions } from './food';
import type { HackerDefinitions } from './hacker';
import type { InternetDefinitions } from './internet';
import type { LocationDefinitions } from './location';
import type { LoremDefinitions } from './lorem';
import type { MusicDefinitions } from './music';
import type { PersonDefinitions } from './person';
import type { PhoneNumberDefinitions } from './phone_number';
import type { RecipeDefinitions } from './recipe';
import type { ScienceDefinitions } from './science';
import type { StaysDefinitions } from './stays';
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
  animal: AnimalDefinitions;
  book: BookDefinitions;
  color: ColorDefinitions;
  commerce: CommerceDefinitions;
  company: CompanyDefinitions;
  database: DatabaseDefinitions;
  date: DateDefinitions;
  finance: FinanceDefinitions;
  flights: FlightsDefinitions;
  food: FoodDefinitions;
  hacker: HackerDefinitions;
  internet: InternetDefinitions;
  location: LocationDefinitions;
  lorem: LoremDefinitions;
  music: MusicDefinitions;
  person: PersonDefinitions;
  phone_number: PhoneNumberDefinitions;
  recipe: RecipeDefinitions;
  science: ScienceDefinitions;
  stays: StaysDefinitions;
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
} & LocaleEntry<Definitions>;
