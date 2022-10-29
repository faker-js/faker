import { Faker } from './faker';
import allLocales from './locales';

export type {
  AnimalDefinitions,
  ColorDefinitions,
  CommerceDefinitions,
  CommerceProductNameDefinitions,
  CompanyDefinitions,
  DatabaseDefinitions,
  DateDefinitions,
  DateEntryDefinition,
  FinanceCurrencyEntryDefinitions,
  FinanceDefinitions,
  HackerDefinitions,
  InternetDefinitions,
  LocaleDefinition,
  LocationDefinitions,
  LoremDefinitions,
  MusicDefinitions,
  PersonDefinitions,
  PersonTitleDefinitions,
  PhoneNumberDefinitions,
  ScienceDefinitions,
  SystemDefinitions,
  SystemMimeTypeEntryDefinitions,
  VehicleDefinitions,
  WordDefinitions,
} from './definitions';
export { FakerError } from './errors/faker-error';
export type { FakerOptions, UsableLocale, UsedLocales } from './faker';
export type { AnimalModule } from './modules/animal';
export type {
  Casing,
  ColorFormat,
  ColorModule,
  CSSFunction,
  CSSSpace,
  NumberColorFormat,
  StringColorFormat,
} from './modules/color';
export type { CommerceModule } from './modules/commerce';
export type { CompanyModule } from './modules/company';
export type { DatabaseModule } from './modules/database';
export type { DatatypeModule } from './modules/datatype';
export type { DateModule } from './modules/date';
export type { FinanceModule } from './modules/finance';
export type { GitModule } from './modules/git';
export type { HackerModule } from './modules/hacker';
export type { HelpersModule } from './modules/helpers';
export type { ImageModule } from './modules/image';
export type { InternetModule } from './modules/internet';
export type { LocationModule } from './modules/location';
export type { LoremModule } from './modules/lorem';
export type { MusicModule } from './modules/music';
export { Sex } from './modules/person';
export type { PersonModule, SexType } from './modules/person';
export type { PhoneModule } from './modules/phone';
export type { RandomModule } from './modules/random';
export type { ChemicalElement, ScienceModule, Unit } from './modules/science';
export type { StringModule } from './modules/string';
export type { SystemModule } from './modules/system';
export type { VehicleModule } from './modules/vehicle';
export type { WordModule } from './modules/word';
export { Faker };

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});
