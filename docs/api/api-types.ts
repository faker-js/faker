// These interfaces are copied over from https://github.com/vuejs/docs/blob/main/src/api/api.data.ts

/**
 * Represents a link to e.g. a Faker-Module method within the API search index page.
 */
export interface APIHeader {
  anchor: string;
  text: string;
}

/**
 * Represents a container for e.g. a Faker-Module within the API search index page.
 */
export interface APIItem {
  text: string;
  link: string;
  headers: APIHeader[];
}

/**
 * Represents a whole section within the API search index page.
 */
export interface APIGroup {
  text: string;
  items: APIItem[];
}
