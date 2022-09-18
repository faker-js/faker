import { Faker } from './faker';
import allLocales from './locales';

export type {
  AddressDefinitions,
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
  LoremDefinitions,
  MusicDefinitions,
  NameDefinitions,
  NameTitleDefinitions,
  PhoneNumberDefinitions,
  ScienceDefinitions,
  SystemDefinitions,
  SystemMimeTypeEntryDefinitions,
  VehicleDefinitions,
  WordDefinitions,
} from './definitions';
export { FakerError } from './errors/faker-error';
export type { FakerOptions, UsableLocale, UsedLocales } from './faker';
export type { AddressModule } from './modules/address';
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
export type { FakeModule } from './modules/fake';
export type { FinanceModule } from './modules/finance';
export type { GitModule } from './modules/git';
export type { HackerModule } from './modules/hacker';
export type { HelpersModule } from './modules/helpers';
export type { ImageModule } from './modules/image';
export type { InternetModule } from './modules/internet';
export type { LoremModule } from './modules/lorem';
export type { MersenneModule } from './modules/mersenne';
export type { MusicModule } from './modules/music';
export { Gender, Sex } from './modules/name';
export type { GenderType, NameModule, SexType } from './modules/name';
export type { PhoneModule } from './modules/phone';
export type { RandomModule } from './modules/random';
export type { ChemicalElement, ScienceModule, Unit } from './modules/science';
export type { SystemModule } from './modules/system';
export type { UniqueModule } from './modules/unique';
export type { VehicleModule } from './modules/vehicle';
export type { WordModule } from './modules/word';
export { Faker };

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});
