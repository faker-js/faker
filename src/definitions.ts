import { Address } from './address';

type AllOf<T> = ['Needs to be all of', T];
const allOf =
  <T>() =>
  <U extends T[]>(
    ...array: U & ([T] extends [U[number]] ? unknown : AllOf<T>[])
  ) =>
    array;

// A list of values that can be used as is.
export type Values<T> = readonly T[];
export type Texts = Values<string>;
// A strings that might contain a placeholder for fake().
export type Format = string;
export type Formats = readonly Format[];

export type Range = {
  min: number;
  max: number;
};

// -----------------------------------------------------------------------------

export interface AddressDefinitions {
  // zipCodeByState expects only { [state: string]: Range }
  postcode_by_state: Formats | { [state: string]: Range };
  postcode: Format | Formats;

  // Names of actual cities
  city_name?: Texts;
  // Common city prefixes
  city_prefix: Texts;
  // Common city suffixes
  city_suffix: Texts;

  // The names of all countries
  country: Texts;
  // The names of this country's states
  state: Texts;
  state_abbr: Texts;
  // The names of counties inside the country or state
  county: Texts;

  // The names of the compass directions.
  // First the 4 cardinal directions, then the 4 ordinal directions
  direction: Texts;
  direction_abbr: Texts;

  // Common street prefixes
  street_prefix: Texts;
  // Common street suffixes
  street_suffix: Texts;

  // The address "inside" an address/e.g. an apartment or office.
  secondary_address: Texts;

  // The iso country codes
  country_code: Texts; // Alpha 2
  country_code_alpha_3: Texts;

  // The ISO? names of the timezones
  time_zone: Texts;
}

export const addresses = allOf<keyof AddressDefinitions>()(
  'postcode_by_state',
  'postcode',

  'city_name',
  'city_prefix',
  'city_suffix',

  'country',
  'state',
  'state_abbr',
  'county',

  'direction_abbr',
  'direction',

  'street_prefix',
  'street_suffix',

  'secondary_address',

  'country_code',
  'country_code_alpha_3',

  'time_zone'
);

// -----------------------------------------------------------------------------

export interface AnimalDefinitions {
  bear: Texts;
  bird: Texts;
  cat: Texts;
  cetacean: Texts;
  cow: Texts;
  crocodilia: Texts;
  dog: Texts;
  fish: Texts;
  horse: Texts;
  insect: Texts;
  lion: Texts;
  rabbit: Texts;
  snake: Texts;
  type: Texts;
}

export const animals = allOf<keyof AnimalDefinitions>()(
  'dog',
  'cat',
  'snake',
  'bear',
  'lion',
  'cetacean',
  'insect',
  'crocodilia',
  'cow',
  'bird',
  'fish',
  'rabbit',
  'horse',
  'type'
);

// -------------------------

export interface NameDefinitions {
  gender: Texts;
  binary_gender: Texts;

  prefix?: Texts;
  female_prefix?: Texts;
  male_prefix?: Texts;

  first_name?: Texts;
  female_first_name?: Texts;
  male_first_name?: Texts;

  middle_name?: Texts;
  female_middle_name?: Texts;
  male_middle_name?: Texts;

  last_name?: Texts;
  female_last_name?: Texts;
  male_last_name?: Texts;

  suffix: Texts;

  name: Formats;

  title: NameTitleDefinitions;
}

export interface NameTitleDefinitions {
  descriptor?: Texts;
  job: Texts;
  level?: Texts;
}

export const names = allOf<keyof NameDefinitions>()(
  'gender',
  'binary_gender',

  'prefix',
  'female_prefix',
  'male_prefix',

  'first_name',
  'female_first_name',
  'male_first_name',

  'middle_name',
  'female_middle_name',
  'male_middle_name',

  'last_name',
  'female_last_name',
  'male_last_name',

  'suffix',

  'name',

  'title'
);

export interface Definitions {
  address: AddressDefinitions;
  animal: AnimalDefinitions;
  commerce: {
    color;
    department;
    product_description;
    product_name;
  };
  company: {
    adjective;
    bs_adjective;
    bs_noun;
    bs_verb;
    descriptor;
    noun;
    suffix;
  };
  database: {
    collation;
    column;
    engine;
    type;
  };
  date: {
    month;
    weekday;
  };
  finance: {
    account_type;
    credit_card;
    currency: Record<string, { code: string; symbol: string }>;
    transaction_type;
  };
  hacker: {
    abbreviation;
    adjective;
    ingverb;
    noun;
    phrase;
    verb;
  };
  internet: {
    domain_suffix;
    example_email;
    free_email;
  };
  lorem: {
    words;
  };
  music: {
    genre;
  };
  name: NameDefinitions;
  phone_number: {
    formats;
  };
  system: {
    directoryPaths;
    mimeTypes;
  };
  vehicle: {
    bicycle_type;
    fuel;
    manufacturer;
    model;
    type;
  };
  word: {
    adjective: string[];
    adverb: string[];
    conjunction: string[];
    interjection: string[];
    noun: string[];
    preposition: string[];
    verb: string[];
  };
}

export interface DefinitionTypes {
  readonly title: string;
  readonly separator: string;

  readonly address: typeof addresses;
  readonly animal: typeof animals;
  readonly name: typeof names;

  readonly company: string[];
  readonly lorem: string[];
  readonly hacker: string[];
  readonly phone_number: string[];
  readonly finance: string[];
  readonly internet: string[];
  readonly commerce: string[];
  readonly database: string[];
  readonly system: string[];
  readonly date: string[];
  readonly vehicle: string[];
  readonly music: string[];
  readonly word: string[];
}

export const definitions: Partial<DefinitionTypes> = {
  animal: animals,
};
