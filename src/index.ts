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
export * from './modules/date';
export * from './modules/finance';
export * from './modules/food';
export * from './modules/git';
export * from './modules/hacker';
export * from './modules/helpers';
export * from './modules/image';
export * from './modules/internet';
export * from './modules/location';
export * from './modules/lorem';
export * from './modules/medical';
export * from './modules/music';
export * from './modules/number';
export * from './modules/person';
export * from './modules/phone';
export * from './modules/science';
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
