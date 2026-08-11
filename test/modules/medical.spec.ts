import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from '../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('medical', () => {
  seededTests(faker, 'medical', (t) => {
    t.itEach(
      'specialty',
      'department',
      'condition',
      'symptom',
      'procedure',
      'allergen',
      'bloodType',
      'drugName'
    );
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('specialty()', () => {
        it('should return a random value from the specialty array', () => {
          const actual = faker.medical.specialty();
          expect(faker.definitions.medical.specialty).toContain(actual);
        });
      });

      describe('department()', () => {
        it('should return a random value from the department array', () => {
          const actual = faker.medical.department();
          expect(faker.definitions.medical.department).toContain(actual);
        });
      });

      describe('condition()', () => {
        it('should return a random value from the condition array', () => {
          const actual = faker.medical.condition();
          expect(faker.definitions.medical.condition).toContain(actual);
        });
      });

      describe('symptom()', () => {
        it('should return a random value from the symptom array', () => {
          const actual = faker.medical.symptom();
          expect(faker.definitions.medical.symptom).toContain(actual);
        });
      });

      describe('procedure()', () => {
        it('should return a random value from the procedure array', () => {
          const actual = faker.medical.procedure();
          expect(faker.definitions.medical.procedure).toContain(actual);
        });
      });

      describe('allergen()', () => {
        it('should return a random value from the allergen array', () => {
          const actual = faker.medical.allergen();
          expect(faker.definitions.medical.allergen).toContain(actual);
        });
      });

      describe('bloodType()', () => {
        it('should return a random value from the blood type array', () => {
          const actual = faker.medical.bloodType();
          expect(faker.definitions.medical.blood_type).toContain(actual);
        });
      });

      describe('drugName()', () => {
        it('should return a random value from the drug name array', () => {
          const actual = faker.medical.drugName();
          expect(faker.definitions.medical.drug_name).toContain(actual);
        });
      });
    }
  );

  describe('drug name screening', () => {
    // Real products that a screen of this list has had to remove. Kept here so
    // that re-adding one is a test failure rather than a silent regression:
    // Revalor and Orbax are FDA veterinary products, Lumemox is a moxifloxacin
    // eye drop marketed in India and Kenya, and Nuvizen is a medication-device
    // trademark. The first screen of this list missed all four because it
    // covered human brand names only.
    const REAL_PRODUCTS = [
      'Revalor',
      // Both spellings: Orbax is the real product, Orbaex the name that was
      // removed for shadowing it. Listing only the real one would let the
      // removed name back in.
      'Orbax',
      'Orbaex',
      'Lumemox',
      'Nuvizen',
      'Sonadex',
    ];

    // A generated name that ends in one of these reads as a real generic drug
    // rather than an invented brand. Taken from the WHO stem book; note the
    // antacid stem is listed as `-ox/-alox`, but no INN is assigned on the bare
    // `-ox` — 20 of the 38 INNs ending in those letters carry an unrelated stem
    // (deferasirox, nifurtimox, acipimox) — so `alox` is the part that
    // discriminates, and matching bare `ox` would be a false positive.
    const INN_STEMS = [
      'adol',
      'afil',
      'alox',
      'arudin',
      'ase',
      'axel',
      'azepam',
      'azosin',
      'barb',
      'bendazole',
      'buzone',
      'caine',
      'cillin',
      'conazole',
      'cort',
      'coxib',
      'dipine',
      'dronate',
      'fenac',
      'gliflozin',
      'gliptin',
      'grastim',
      'imus',
      'kinra',
      'lukast',
      'mab',
      'micin',
      'mustine',
      'mycin',
      'nacogalfa',
      'olol',
      'oxacin',
      'oxetine',
      'pamil',
      'parin',
      'peptin',
      'pramine',
      'prazole',
      'pride',
      'pril',
      'profen',
      'ridone',
      'sartan',
      'setron',
      'sone',
      'statin',
      'tecan',
      'tidine',
      'tinib',
      'tocin',
      'trexed',
      'triptan',
      'vaptan',
      'vastatin',
      'vir',
      'xaban',
      'zosin',
    ];

    it.each(REAL_PRODUCTS)('should not offer %s', (product) => {
      const names = faker.definitions.medical.drug_name.map((name) =>
        name.toLowerCase()
      );

      expect(names).not.toContain(product.toLowerCase());
    });

    it('should not end a name in an INN stem', () => {
      const offenders = faker.definitions.medical.drug_name.filter((name) =>
        INN_STEMS.some((stem) => name.toLowerCase().endsWith(stem))
      );

      expect(offenders).toEqual([]);
    });
  });
});
