import { Faker } from './faker';
import allLocales from './locales';

export type {
  AnimalDefinitions,
  BedDefinitions,
  BeerDefinitions,
  BookcaseDefinitions,
  BookDefinitions,
  ChairDefinitions,
  CigarDefinitions,
  CigaretteDefinitions,
  ClothingDefinitions,
  ColorDefinitions,
  CommerceDefinitions,
  CommerceProductNameDefinitions,
  CompanyDefinitions,
  ComputerDefinitions,
  CondomDefinitions,
  CosmeticDefinitions,
  DatabaseDefinitions,
  DateDefinitions,
  DateEntryDefinition,
  DrinkDefinitions,
  FabricDefinitions,
  FinanceCurrencyEntryDefinitions,
  FinanceDefinitions,
  FishDefinitions,
  FlightsDefinitions,
  FlowerDefinitions,
  FoodDefinitions,
  FurnitureDefinitions,
  GlassesDefinitions,
  HackerDefinitions,
  HatDefinitions,
  InternetDefinitions,
  JewelsDefinitions,
  KitchenDefinitions,
  LighterDefinitions,
  LiquorDefinitions,
  LocaleDefinition,
  LocationDefinitions,
  LoremDefinitions,
  MeatDefinitions,
  MedicationDefinitions,
  MonumentDefinitions,
  MovieDefinitions,
  MusicDefinitions,
  ParfumDefinitions,
  PersonDefinitions,
  PersonTitleDefinitions,
  PhoneDefinitions,
  PlantDefinitions,
  PrinterDefinitions,
  RecipeDefinitions,
  ScienceDefinitions,
  ShoesDefinitions,
  SmokingFilterDefinitions,
  SmokingRollingPaperDefinitions,
  SofaDefinitions,
  StaysDefinitions,
  SystemDefinitions,
  SystemMimeTypeEntryDefinitions,
  TableDefinitions,
  TattooDefinitions,
  TireDefinitions,
  TobaccoDefinitions,
  ToyDefinitions,
  TvDefinitions,
  VehicleDefinitions,
  VideogameDefinitions,
  WardrobeDefinitions,
  WatchDefinitions,
  WheelDefinitions,
  WineDefinitions,
  WordDefinitions,
} from './definitions';
export { FakerError } from './errors/faker-error';
export type { FakerOptions, UsableLocale, UsedLocales } from './faker';
export type { AnimalModule } from './modules/animal';
export type { BedModule } from './modules/bed';
export type { BeerModule } from './modules/beer';
export type { BookModule } from './modules/book';
export type { BookcaseModule } from './modules/bookcase';
export type { ChairModule } from './modules/chair';
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
export type { CondomModule } from './modules/condom';
export type { CosmeticModule } from './modules/cosmetic';
export type { DatabaseModule } from './modules/database';
export type { DatatypeModule } from './modules/datatype';
export type { DateModule } from './modules/date';
export type { DrinkModule } from './modules/drink';
export type { FabricModule } from './modules/fabric';
export type { FinanceModule } from './modules/finance';
export type { FishModule } from './modules/fish';
export type { FlightsModule } from './modules/flights';
export type { FlowerModule } from './modules/flower';
export type { FoodModule } from './modules/food';
export type { FurnitureModule } from './modules/furniture';
export type { GitModule } from './modules/git';
export type { GlassesModule } from './modules/glasses';
export type { HackerModule } from './modules/hacker';
export type { HatModule } from './modules/hat';
export type { HelpersModule } from './modules/helpers';
export type { ImageModule } from './modules/image';
export type { InternetModule } from './modules/internet';
export type { JewelsModule } from './modules/jewels';
export type { KitchenModule } from './modules/kitchen';
export type { LighterModule } from './modules/lighter';
export type { LiquorModule } from './modules/liquor';
export type { LocationModule } from './modules/location';
export type { LoremModule } from './modules/lorem';
export type { MeatModule } from './modules/meat';
export type { MedicationModule } from './modules/medication';
export type { MonumentModule } from './modules/monument';
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
export type { SmokingFilterModule } from './modules/smokingFilter';
export type { SmokingRollingPaperModule } from './modules/smokingRollingPaper';
export type { SofaModule } from './modules/sofa';
export type { StaysModule } from './modules/stays';
export type { StringModule } from './modules/string';
export type { SystemModule } from './modules/system';
export type { TableModule } from './modules/table';
export type { TattooModule } from './modules/tattoo';
export type { TireModule } from './modules/tire';
export type { TobaccoModule } from './modules/tobacco';
export type { ToyModule } from './modules/toy';
export type { TvModule } from './modules/tv';
export type { VehicleModule } from './modules/vehicle';
export type { VideogameModule } from './modules/videogame';
export type { WardrobeModule } from './modules/wardrobe';
export type { WatchModule } from './modules/watch';
export type { WheelModule } from './modules/wheel';
export type { WineModule } from './modules/wine';
export type { WordModule } from './modules/word';
export { Faker };

// since we are requiring the top level of faker, load all locales by default
export const faker: Faker = new Faker({
  locales: allLocales,
});
