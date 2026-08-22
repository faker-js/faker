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
    // Real products the generated list must never name. Kept here so that
    // re-adding one is a test failure rather than a silent regression. Several
    // are invisible to a screen of the US and EU human registries: Revalor and
    // Orbax are FDA veterinary products, Lumemox is a moxifloxacin eye drop
    // marketed in India and Kenya, Sonadex a paracetamol tablet sold there and
    // in Kenya, and Nuvizen a medication-device trademark rather than a
    // medicine.
    const REAL_PRODUCTS = [
      'Cetraben',
      'Fendall',
      'Lumemox',
      'Lutein',
      'Nolvadex',
      'Nuvizen',
      'Orbax',
      'Revalor',
      'Sonadex',
      'Velamox',
      'Zoladex',
      'Zolvix',
      'Zovia',
    ];

    // Invented names removed because they read as one of the products above,
    // being a letter or two away from it. Listing only the real product would
    // let the shadowing spelling back in, so both are checked.
    const SHADOWING_NAMES = [
      'Cetrasen', // Cetraben
      'Fendaol', // Fendall
      'Lumein', // Lutein
      'Orbaex', // Orbax
      'Orbamox', // Orbax, and reads as an amoxicillin product besides
      'Solvadex', // Nolvadex
      'Sonaex', // Sonadex
      'Uvelmox', // Velamox
      'Zolnodex', // Zoladex
      'Zolvia', // Zolvix, Zovia
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

    it.each(REAL_PRODUCTS)(
      'should not offer the real product %s',
      (product) => {
        const names = faker.definitions.medical.drug_name.map((name) =>
          name.toLowerCase()
        );

        expect(names).not.toContain(product.toLowerCase());
      }
    );

    it.each(SHADOWING_NAMES)('should not offer %s', (removed) => {
      const names = faker.definitions.medical.drug_name.map((name) =>
        name.toLowerCase()
      );

      expect(names).not.toContain(removed.toLowerCase());
    });

    it('should not end a name in an INN stem', () => {
      const offenders = faker.definitions.medical.drug_name.filter((name) =>
        INN_STEMS.some((stem) => name.toLowerCase().endsWith(stem))
      );

      expect(offenders).toEqual([]);
    });
  });
});
