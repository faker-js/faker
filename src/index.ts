import { faker } from './faker';

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
export { Faker } from './faker';
export type { FakerOptions, UsableLocale, UsedLocales } from './faker';
export { faker };

export default faker;
