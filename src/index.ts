import { Faker } from './faker';
import allLocales from './locales';

export type {
  AnimalDefinitions,
  BeerDefinitions,
  BookDefinitions,
  ClothingDefinitions,
  ColorDefinitions,
  CommerceDefinitions,
  CommerceProductNameDefinitions,
  CompanyDefinitions,
  ComputerDefinitions,
  DatabaseDefinitions,
  DateDefinitions,
  DateEntryDefinition,
  FinanceCurrencyEntryDefinitions,
  FinanceDefinitions,
  FlightsDefinitions,
  FlowerDefinitions,
  FoodDefinitions,
  GlassesDefinitions,
  HackerDefinitions,
  InternetDefinitions,
  JewelsDefinitions,
  LiquorDefinitions,
  LocaleDefinition,
  LocationDefinitions,
  LoremDefinitions,
  MovieDefinitions,
  MusicDefinitions,
  ParfumDefinitions,
  PersonDefinitions,
  PersonTitleDefinitions,
  PhoneDefinitions,
  PlantDefinitions,
  RecipeDefinitions,
  ScienceDefinitions,
  ShoesDefinitions,
  StaysDefinitions,
  SystemDefinitions,
  SystemMimeTypeEntryDefinitions,
  ToyDefinitions,
  VehicleDefinitions,
  VideogameDefinitions,
  WatchDefinitions,
  WineDefinitions,
  WordDefinitions,
} from './definitions';
export { FakerError } from './errors/faker-error';
export type { FakerOptions, UsableLocale, UsedLocales } from './faker';
export type { AnimalModule } from './modules/animal';
export type { BeerModule } from './modules/beer';
export type { BookModule } from './modules/book';
export type { ClothingModule } from './modules/clothing';
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
export type { ComputerModule } from './modules/computer';
export type { DatabaseModule } from './modules/database';
export type { DatatypeModule } from './modules/datatype';
export type { DateModule } from './modules/date';
export type { FinanceModule } from './modules/finance';
export type { FlightsModule } from './modules/flights';
export type { FlowerModule } from './modules/flower';
export type { FoodModule } from './modules/food';
export type { GitModule } from './modules/git';
export type { GlassesModule } from './modules/glasses';
export type { HackerModule } from './modules/hacker';
export type { HelpersModule } from './modules/helpers';
export type { ImageModule } from './modules/image';
export type { InternetModule } from './modules/internet';
export type { JewelsModule } from './modules/jewels';
export type { LiquorModule } from './modules/liquor';
export type { LocationModule } from './modules/location';
export type { LoremModule } from './modules/lorem';
export type { MovieModule } from './modules/movie';
export type { MusicModule } from './modules/music';
export type { ParfumModule } from './modules/parfum';
export { Sex } from './modules/person';
export type { PersonModule, SexType } from './modules/person';
export type { PhoneModule } from './modules/phone';
export type { PlantModule } from './modules/plant';
export type { RandomModule } from './modules/random';
export type { RecipeModule } from './modules/recipe';
export type { ChemicalElement, ScienceModule, Unit } from './modules/science';
export type { ShoesModule } from './modules/shoes';
export type { StaysModule } from './modules/stays';
export type { StringModule } from './modules/string';
export type { SystemModule } from './modules/system';
export type { ToyModule } from './modules/toy';
export type { VehicleModule } from './modules/vehicle';
export type { VideogameModule } from './modules/videogame';
export type { WatchModule } from './modules/watch';
export type { WineModule } from './modules/wine';
export type { WordModule } from './modules/word';
export { Faker };

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});
