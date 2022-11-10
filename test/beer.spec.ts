import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('beer', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'beer', (t) => {
    t.itEach(
      'beerName',
      'beerType',
      'beerDescription',
      'beerBrewery',
      'beerOrigin',
      'beerRegion',
      'beerTaste',
      'beerZone',
      'beerAlcoholicContent',
      'beerSize'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.beer.beerName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.beer?.name).toContain(name);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.beer.beerType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.beer?.type).toContain(type);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.beer.beerDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.beer?.description).toContain(description);
        });
      });

      describe('brewery()', () => {
        it('returns a random brewery', () => {
          const brewery = faker.beer.beerBrewery();

          expect(brewery).toBeTruthy();
          expect(brewery).toBeTypeOf('string');
          expect(faker.definitions.beer?.brewery).toContain(brewery);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.beer.beerOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });

      describe('region()', () => {
        it('returns a random region', () => {
          const region = faker.beer.beerRegion();

          expect(region).toBeTruthy();
          expect(region).toBeTypeOf('string');
          expect(faker.definitions.beer?.region).toContain(region);
        });
      });

      describe('taste()', () => {
        it('returns a random taste', () => {
          const taste = faker.beer.beerTaste();

          expect(taste).toBeTruthy();
          expect(taste).toBeTypeOf('string');
          expect(faker.definitions.beer?.taste).toContain(taste);
        });
      });

      describe('zone()', () => {
        it('returns a random zone', () => {
          const zone = faker.beer.beerZone();

          expect(zone).toBeTruthy();
          expect(zone).toBeTypeOf('string');
          expect(faker.definitions.beer?.zone).toContain(zone);
        });
      });

      describe('alcoholicContent()', () => {
        it('returns a random alcoholic content', () => {
          const alcoholicContent = faker.beer.beerAlcoholicContent();

          expect(alcoholicContent).toBeTruthy();
          expect(alcoholicContent).toBeTypeOf('number');
          expect(alcoholicContent).toBeGreaterThanOrEqual(5);
          expect(alcoholicContent).toBeLessThanOrEqual(20);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.beer.beerSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.beer?.size).toContain(size);
        });
      });
    }
  });
});
