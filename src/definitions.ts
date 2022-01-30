export interface Definitions {
  address: {
    city_name;
    city_prefix;
    city_suffix;
    country_code_alpha_3;
    country_code;
    country;
    county;
    direction_abbr;
    direction;
    postcode_by_state;
    postcode: string | string[];
    state_abbr;
    state;
    street_prefix;
    street_suffix;
    time_zone;
  };
  animal: {
    bear;
    bird;
    cat;
    cetacean;
    cow;
    crocodilia;
    dog;
    fish;
    horse;
    insect;
    lion;
    rabbit;
    snake;
    type;
  };
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
  name: {
    binary_gender;
    female_first_name;
    female_last_name;
    female_middle_name;
    female_prefix;
    first_name;
    gender;
    last_name;
    male_first_name;
    male_last_name;
    male_middle_name;
    male_prefix;
    middle_name;
    prefix;
    suffix;
    title: {
      descriptor;
      level;
      job;
    };
  };
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
