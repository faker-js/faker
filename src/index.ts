export type {
  AirlineDefinitions,
  AnimalDefinitions,
  ColorDefinitions,
  CommerceDefinitions,
  CommerceProductNameDefinitions,
  CompanyDefinitions,
  DatabaseDefinitions,
  DateDefinitions,
  DateEntryDefinition,
  FinanceDefinitions,
  HackerDefinitions,
  InternetDefinitions,
  LocaleDefinition,
  /** @deprecated Use LocationDefinitions instead */
  LocationDefinitions as AddressDefinitions,
  LocationDefinitions,
  LoremDefinitions,
  MusicDefinitions,
  /** @deprecated Use PersonDefinitions instead */
  PersonDefinitions as NameDefinitions,
  PersonDefinitions,
  /** @deprecated Use PersonTitleDefinitions instead */
  PersonTitleDefinitions as NameTitleDefinitions,
  PersonTitleDefinitions,
  PhoneNumberDefinitions,
  ScienceDefinitions,
  SystemDefinitions,
  SystemMimeTypeEntryDefinitions,
  VehicleDefinitions,
  WordDefinitions,
} from './definitions';
export { FakerError } from './errors/faker-error';
export { Faker } from './faker';
export type { FakerOptions } from './faker';
export * from './locale';
export { fakerEN as faker } from './locale';
export * from './locales';
export * as allLocales from './locales';
export { Aircraft, AircraftType } from './modules/airline';
export type { AirlineModule } from './modules/airline';
export type { AnimalModule } from './modules/animal';
export { CssFunction, CssSpace } from './modules/color';
export type {
  Casing,
  ColorFormat,
  ColorModule,
  /** @deprecated Use CssFunctionType instead */
  CssFunctionType as CSSFunction,
  CssFunctionType,
  /** @deprecated Use CssSpaceType instead */
  CssSpaceType as CSSSpace,
  CssSpaceType,
  NumberColorFormat,
  StringColorFormat,
} from './modules/color';
export type { CommerceModule } from './modules/commerce';
export type { CompanyModule } from './modules/company';
export type { DatabaseModule } from './modules/database';
export type { DatatypeModule } from './modules/datatype';
export type { DateModule } from './modules/date';
export type { Currency, FinanceModule } from './modules/finance';
export type { GitModule } from './modules/git';
export type { HackerModule } from './modules/hacker';
export type { HelpersModule } from './modules/helpers';
export type { ImageModule } from './modules/image';
export type { InternetModule } from './modules/internet';
export type {
  /** @deprecated Use LocationModule instead */
  LocationModule as AddressModule,
  LocationModule,
} from './modules/location';
export type { LoremModule } from './modules/lorem';
export type { MusicModule } from './modules/music';
export type { NumberModule } from './modules/number';
export { Sex } from './modules/person';
export type {
  /** @deprecated Use PersonModule instead */
  PersonModule as NameModule,
  PersonModule,
  SexType,
} from './modules/person';
export type { PhoneModule } from './modules/phone';
export type { RandomModule } from './modules/random';
export type { ChemicalElement, ScienceModule, Unit } from './modules/science';
export type { StringModule } from './modules/string';
export type { SystemModule } from './modules/system';
export type { VehicleModule } from './modules/vehicle';
export type { WordModule } from './modules/word';
export { mergeLocales } from './utils/merge-locales';
