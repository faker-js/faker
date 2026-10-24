export type { FakerConfig } from './config';
export { createFakerCore } from './core';
export type { FakerCore, FakerOptions } from './core';
export type {
  AirlineDefinition,
  AnimalDefinition,
  BookDefinition,
  ColorDefinition,
  CommerceDefinition,
  CommerceProductNameDefinition,
  CompanyDefinition,
  DatabaseDefinition,
  DateDefinition,
  DateEntryDefinition,
  FinanceDefinition,
  FoodDefinition,
  HackerDefinition,
  InternetDefinition,
  LocaleDefinition,
  LocaleEntry,
  LocationDefinition,
  LoremDefinition,
  MedicalDefinition,
  MetadataDefinition,
  MusicDefinition,
  PersonDefinition,
  PersonEntryDefinition,
  PhoneNumberDefinition,
  ScienceDefinition,
  SystemDefinition,
  SystemMimeTypeEntryDefinition,
  VehicleDefinition,
  WordDefinition,
} from './definitions';
export type { Distributor } from './distributors/distributor';
export { exponentialDistributor } from './distributors/exponential';
export { uniformDistributor } from './distributors/uniform';
export { FakerError } from './errors/faker-error';
export { Faker } from './faker';
export * from './locale';
export { fakerEN as faker } from './locale';
export * from './locales';
export * from './modules/airline';
export * from './modules/animal';
export * from './modules/book';
export * from './modules/color';
export * from './modules/commerce';
export * from './modules/company';
export * from './modules/database';
export * from './modules/datatype';
export type { DateModule, SimpleDateModule } from './modules/date';
export type {
  BitcoinAddressFamilyType,
  BitcoinNetworkType,
  Currency,
  FinanceModule,
  VatNumberCountryCode,
} from './modules/finance';
export { BitcoinAddressFamily, BitcoinNetwork } from './modules/finance';
export type { FoodModule } from './modules/food';
export type { GitModule } from './modules/git';
export type { HackerModule } from './modules/hacker';
export type { HelpersModule, SimpleHelpersModule } from './modules/helpers';
export type { ImageModule } from './modules/image';
export { IPv4Network, IPv6Network } from './modules/internet';
export type {
  InternetModule,
  IPv4NetworkType,
  IPv6NetworkType,
} from './modules/internet';
export type { LocationModule, SimpleLocationModule } from './modules/location';
export type { LoremModule } from './modules/lorem';
export type { MedicalModule } from './modules/medical';
export type { MusicModule } from './modules/music';
export type { NumberModule } from './modules/number';
export { Sex } from './modules/person';
export type { PersonModule, SexType } from './modules/person';
export type { PhoneModule } from './modules/phone';
export type { ChemicalElement, ScienceModule, Unit } from './modules/science';
export type { StringModule } from './modules/string';
export type { SystemModule } from './modules/system';
export type { VehicleModule } from './modules/vehicle';
export type { WordModule } from './modules/word';
export type { Randomizer } from './randomizer';
export { SimpleFaker, simpleFaker } from './simple-faker';
export { mergeLocales } from './utils/merge-locales';
export {
  generateMersenne32Randomizer,
  generateMersenne53Randomizer,
} from './utils/mersenne';
export { LengthStrategy } from './utils/types';
export type {
  Casing,
  LengthStrategyType,
  NumberOrRange,
  NumberRange,
} from './utils/types';
