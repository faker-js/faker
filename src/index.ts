import { Faker } from './faker';
import allLocales from './locales';

export type {
  AddressDefinitions,
  AnimalDefinitions,
  CommerceDefinitions,
  CommerceProductNameDefinitions,
  CompanyDefinitions,
  DatabaseDefinitions,
  DateDefinitions,
  DateEntryDefinition,
  DefinitionTypes,
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
  SystemDefinitions,
  SystemMimeTypeEntryDefinitions,
  VehicleDefinitions,
  WordDefinitions,
} from './definitions';
export { FakerError } from './errors/faker-error';
export type { FakerOptions, UsableLocale, UsedLocales } from './faker';
export { Gender } from './name';
export type { GenderType } from './name';
export { Faker };

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});

export default faker;
