import type { AnimalDefinitions } from './animal';
import type { BeerDefinitions } from './beer';
import type { BookDefinitions } from './book';
import type { ClothingDefinitions } from './clothing';
import type { ColorDefinitions } from './color';
import type { CommerceDefinitions } from './commerce';
import type { CompanyDefinitions } from './company';
import type { DatabaseDefinitions } from './database';
import type { DateDefinitions } from './date';
import type { FinanceDefinitions } from './finance';
import type { FlightsDefinitions } from './flights';
import type { FlowerDefinitions } from './flower';
import type { FoodDefinitions } from './food';
import type { GlassesDefinitions } from './glasses';
import type { HackerDefinitions } from './hacker';
import type { InternetDefinitions } from './internet';
import type { JewelsDefinitions } from './jewels';
import type { LiquorDefinitions } from './liquor';
import type { LocationDefinitions } from './location';
import type { LoremDefinitions } from './lorem';
import type { MovieDefinitions } from './movie';
import type { MusicDefinitions } from './music';
import type { ParfumDefinitions } from './parfum';
import type { PersonDefinitions } from './person';
import type { PhoneDefinitions } from './phone';
import type { PlantDefinitions } from './plant';
import type { RecipeDefinitions } from './recipe';
import type { ScienceDefinitions } from './science';
import type { ShoesDefinitions } from './shoes';
import type { StaysDefinitions } from './stays';
import type { SystemDefinitions } from './system';
import type { TireDefinitions } from './tire';
import type { ToyDefinitions } from './toy';
import type { VehicleDefinitions } from './vehicle';
import type { VideogameDefinitions } from './videogame';
import type { WatchDefinitions } from './watch';
import type { WheelDefinitions } from './wheel';
import type { WineDefinitions } from './wine';
import type { WordDefinitions } from './word';

export type LocaleEntry<T> = Partial<T> &
  // Unsupported & custom modules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<string, any>;

/**
 * The definitions as used by the Faker modules.
 */
export interface Definitions {
  animal: AnimalDefinitions;
  beer: BeerDefinitions;
  book: BookDefinitions;
  clothing: ClothingDefinitions;
  color: ColorDefinitions;
  commerce: CommerceDefinitions;
  company: CompanyDefinitions;
  database: DatabaseDefinitions;
  date: DateDefinitions;
  finance: FinanceDefinitions;
  flights: FlightsDefinitions;
  flower: FlowerDefinitions;
  food: FoodDefinitions;
  glasses: GlassesDefinitions;
  hacker: HackerDefinitions;
  internet: InternetDefinitions;
  jewels: JewelsDefinitions;
  liquor: LiquorDefinitions;
  location: LocationDefinitions;
  lorem: LoremDefinitions;
  movie: MovieDefinitions;
  music: MusicDefinitions;
  parfum: ParfumDefinitions;
  person: PersonDefinitions;
  phone: PhoneDefinitions;
  plant: PlantDefinitions;
  recipe: RecipeDefinitions;
  science: ScienceDefinitions;
  shoes: ShoesDefinitions;
  stays: StaysDefinitions;
  system: SystemDefinitions;
  tire: TireDefinitions;
  toy: ToyDefinitions;
  vehicle: VehicleDefinitions;
  videogame: VideogameDefinitions;
  watch: WatchDefinitions;
  wheel: WheelDefinitions;
  wine: WineDefinitions;
  word: WordDefinitions;
}

/**
 * The definitions as used by the translations/locales.
 * This is basically the same as Definitions with the exception,
 * that most properties are optional and extra properties are allowed.
 */
export type LocaleDefinition = {
  /**
   * The name of the language.
   */
  title: string;
  separator?: string;
} & LocaleEntry<Definitions>;
