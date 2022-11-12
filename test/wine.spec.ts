import { beforeEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

describe('wine', () => {
  beforeEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'wine', (t) => {
    t.itEach(
      'wineName',
      'wineType',
      'wineDescription',
      'wineWinery',
      'wineOrigin',
      'wineRegion',
      'wineZone',
      'wineAlcoholicContent',
      'wineSize',
      'wineYear'
    );
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('name()', () => {
        it('should return a name', () => {
          const name = faker.wine.wineName();

          expect(name).toBeTruthy();
          expect(name).toBeTypeOf('string');
          expect(faker.definitions.wine?.name).toContain(name);
        });
      });

      describe('type()', () => {
        it('returns a random type', () => {
          const type = faker.wine.wineType();

          expect(type).toBeTruthy();
          expect(type).toBeTypeOf('string');
          expect(faker.definitions.wine?.type).toContain(type);
        });
      });

      describe('description()', () => {
        it('returns a random description', () => {
          const description = faker.wine.wineDescription();

          expect(description).toBeTruthy();
          expect(description).toBeTypeOf('string');
          expect(faker.definitions.wine?.description).toContain(description);
        });
      });

      describe('winery()', () => {
        it('returns a random winery', () => {
          const winery = faker.wine.wineWinery();

          expect(winery).toBeTruthy();
          expect(winery).toBeTypeOf('string');
          expect(faker.definitions.wine?.winery).toContain(winery);
        });
      });

      describe('origin()', () => {
        it('returns a random origin', () => {
          const origin = faker.wine.wineOrigin();

          expect(origin).toBeTruthy();
          expect(origin).toBeTypeOf('string');
        });
      });

      describe('region()', () => {
        it('returns a random region', () => {
          const region = faker.wine.wineRegion();

          expect(region).toBeTruthy();
          expect(region).toBeTypeOf('string');
          expect(faker.definitions.wine?.region).toContain(region);
        });
      });

      describe('zone()', () => {
        it('returns a random zone', () => {
          const zone = faker.wine.wineZone();

          expect(zone).toBeTruthy();
          expect(zone).toBeTypeOf('string');
          expect(faker.definitions.wine?.zone).toContain(zone);
        });
      });

      describe('alcoholicContent()', () => {
        it('returns a random alcoholic content', () => {
          const alcoholicContent = faker.wine.wineAlcoholicContent();

          expect(alcoholicContent).toBeTruthy();
          expect(alcoholicContent).toBeTypeOf('number');
          expect(alcoholicContent).toBeGreaterThanOrEqual(8);
          expect(alcoholicContent).toBeLessThanOrEqual(20);
        });
      });

      describe('size()', () => {
        it('returns a random size', () => {
          const size = faker.wine.wineSize();

          expect(size).toBeTruthy();
          expect(size).toBeTypeOf('string');
          expect(faker.definitions.wine?.size).toContain(size);
        });
      });

      describe('year()', () => {
        it('returns a random year', () => {
          const year = faker.wine.wineYear();

          expect(year).toBeTruthy();
          expect(year).toBeTypeOf('number');
          expect(year).toBeGreaterThanOrEqual(1900);
          expect(year).toBeLessThanOrEqual(2023);
        });
      });
    }
  });
});
