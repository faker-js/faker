import allLocales from './all-locales';
import { Faker } from './faker';

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
export type {
  Casing,
  ColorFormat,
  CSSFunction,
  CSSSpace,
  NumberColorFormat,
  StringColorFormat,
} from './modules/color';
export { Gender, Sex } from './modules/name';
export type { GenderType, SexType } from './modules/name';
export type { ChemicalElement, Unit } from './modules/science';
export { Faker };

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});
