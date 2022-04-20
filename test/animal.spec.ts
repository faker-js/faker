import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      bear: 'Sun bear',
      bird: 'Iceland Gull',
      cat: 'Himalayan',
      cetacean: 'Pantropical Spotted Dolphin',
      cow: 'Fleckvieh',
      crocodilia: 'African Slender-snouted Crocodile',
      dog: 'Garafian Shepherd',
      fish: 'Northern snakehead',
      horse: 'Furioso-North Star',
      insect: 'Gouty oak gall',
      lion: 'West African Lion',
      rabbit: 'English Spot',
      snake: 'Grey-banded kingsnake',
      type: 'lion',
    },
  },
  {
    seed: 1337,
    expectations: {
      bear: 'Sun bear',
      bird: 'American Golden-Plover',
      cat: 'Devon Rex',
      cetacean: 'Costero',
      cow: 'Canchim',
      crocodilia: 'Cuvier’s Dwarf Caiman',
      dog: 'Chinese Crested Dog',
      fish: 'Jumbo flying squid',
      horse: 'Colorado Ranger',
      insect: 'Eulophid wasp',
      lion: 'Barbary Lion',
      rabbit: 'Cinnamon',
      snake: 'Fierce snake',
      type: 'bear',
    },
  },
  {
    seed: 1211,
    expectations: {
      bear: 'Polar bear',
      bird: 'Reed Bunting',
      cat: 'Tonkinese',
      cetacean: 'La Plata Dolphin',
      cow: 'Breed',
      crocodilia: 'Gharial',
      dog: 'Tibetan Spaniel',
      fish: 'Bigeye scad',
      horse: 'Ukrainian Riding Horse',
      insect: 'Western paper wasp',
      lion: 'Cape lion',
      rabbit: 'Silver Marten',
      snake: 'Tiger pit viper',
      type: 'horse',
    },
  },
];

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'bear',
  'bird',
  'cat',
  'cetacean',
  'cow',
  'crocodilia',
  'dog',
  'fish',
  'horse',
  'insect',
  'lion',
  'rabbit',
  'snake',
  'type',
];

describe('animal', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.animal[functionName]();
          expect(actual).toEqual(expectations[functionName]);
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seedValue
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      for (const functionName of functionNames) {
        describe(`${functionName}()`, () => {
          it(`should return random value from ${functionName} array`, () => {
            const actual = faker.animal[functionName]();
            expect(faker.definitions.animal[functionName]).toContain(actual);
          });
        });
      }
    }
  });
});
