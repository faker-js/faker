import type { AnimalDefinitions } from './animal';
import type { BedDefinitions } from './bed';
import type { BeerDefinitions } from './beer';
import type { BookDefinitions } from './book';
import type { BookcaseDefinitions } from './bookcase';
import type { CigarDefinitions } from './cigar';
import type { CigaretteDefinitions } from './cigarette';
import type { ClothingDefinitions } from './clothing';
import type { ColorDefinitions } from './color';
import type { CommerceDefinitions } from './commerce';
import type { CompanyDefinitions } from './company';
import type { CondomDefinitions } from './condom';
import type { CosmeticDefinitions } from './cosmetic';
import type { DatabaseDefinitions } from './database';
import type { DateDefinitions } from './date';
import type { DrinkDefinitions } from './drink';
import type { FabricDefinitions } from './fabric';
import type { FinanceDefinitions } from './finance';
import type { FishDefinitions } from './fish';
import type { FlightsDefinitions } from './flights';
import type { FlowerDefinitions } from './flower';
import type { FoodDefinitions } from './food';
import type { FurnitureDefinitions } from './furniture';
import type { GlassesDefinitions } from './glasses';
import type { HackerDefinitions } from './hacker';
import type { HatDefinitions } from './hat';
import type { InternetDefinitions } from './internet';
import type { JewelsDefinitions } from './jewels';
import type { KitchenDefinitions } from './kitchen';
import type { LiquorDefinitions } from './liquor';
import type { LocationDefinitions } from './location';
import type { LoremDefinitions } from './lorem';
import type { MeatDefinitions } from './meat';
import type { MedicationDefinitions } from './medication';
import type { MovieDefinitions } from './movie';
import type { MusicDefinitions } from './music';
import type { ParfumDefinitions } from './parfum';
import type { PersonDefinitions } from './person';
import type { PhoneDefinitions } from './phone';
import type { PlantDefinitions } from './plant';
import type { PrinterDefinitions } from './printer';
import type { RecipeDefinitions } from './recipe';
import type { ScienceDefinitions } from './science';
import type { ShoesDefinitions } from './shoes';
import type { SmokingFilterDefinitions } from './smokingFilter';
import type { SmokingRollingPaperDefinitions } from './smokingRollingPaper';
import type { SofaDefinitions } from './sofa';
import type { StaysDefinitions } from './stays';
import type { SystemDefinitions } from './system';
import type { TableDefinitions } from './table';
import type { TattooDefinitions } from './tattoo';
import type { TireDefinitions } from './tire';
import type { ToyDefinitions } from './toy';
import type { TvDefinitions } from './tv';
import type { VehicleDefinitions } from './vehicle';
import type { VideogameDefinitions } from './videogame';
import type { WardrobeDefinitions } from './wardrobe';
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
  bed: BedDefinitions;
  beer: BeerDefinitions;
  book: BookDefinitions;
  bookcase: BookcaseDefinitions;
  cigard: CigarDefinitions;
  cigarette: CigaretteDefinitions;
  clothing: ClothingDefinitions;
  color: ColorDefinitions;
  commerce: CommerceDefinitions;
  company: CompanyDefinitions;
  condom: CondomDefinitions;
  cosmetic: CosmeticDefinitions;
  database: DatabaseDefinitions;
  date: DateDefinitions;
  drink: DrinkDefinitions;
  fabric: FabricDefinitions;
  finance: FinanceDefinitions;
  fish: FishDefinitions;
  flights: FlightsDefinitions;
  flower: FlowerDefinitions;
  food: FoodDefinitions;
  furniture: FurnitureDefinitions;
  glasses: GlassesDefinitions;
  hacker: HackerDefinitions;
  hat: HatDefinitions;
  internet: InternetDefinitions;
  jewels: JewelsDefinitions;
  kitchen: KitchenDefinitions;
  liquor: LiquorDefinitions;
  location: LocationDefinitions;
  lorem: LoremDefinitions;
  meat: MeatDefinitions;
  medication: MedicationDefinitions;
  movie: MovieDefinitions;
  music: MusicDefinitions;
  parfum: ParfumDefinitions;
  person: PersonDefinitions;
  phone: PhoneDefinitions;
  plant: PlantDefinitions;
  printer: PrinterDefinitions;
  recipe: RecipeDefinitions;
  science: ScienceDefinitions;
  shoes: ShoesDefinitions;
  smokingFilter: SmokingFilterDefinitions;
  smokingRollingPaper: SmokingRollingPaperDefinitions;
  sofa: SofaDefinitions;
  stays: StaysDefinitions;
  system: SystemDefinitions;
  table: TableDefinitions;
  tattoo: TattooDefinitions;
  tire: TireDefinitions;
  toy: ToyDefinitions;
  tv: TvDefinitions;
  vehicle: VehicleDefinitions;
  videogame: VideogameDefinitions;
  wardrobe: WardrobeDefinitions;
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
