import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 25;

describe('datatype', () => {
  seededTests(faker, 'datatype', (t) => {
    t.describe('boolean', (t) => {
      t.itRepeated('noArgs', 5)
        .it('with probability', 0.42)
        .it('with probability option', { probability: 0.13 });
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe('boolean', () => {
        it('generates a boolean value', () => {
          const bool = faker.datatype.boolean();
          expect(bool).toBeTypeOf('boolean');
        });

        it('generates false for probability = 0', () => {
          const bool = faker.datatype.boolean(0);
          expect(bool).toBe(false);
        });

        it('generates true for probability = 1', () => {
          const bool = faker.datatype.boolean(1);
          expect(bool).toBe(true);
        });

        it.each([-5, 0.42, 5])(
          'generates a boolean value with given probability',
          (probability) => {
            const bool = faker.datatype.boolean(probability);
            expect(bool).toBeTypeOf('boolean');
          }
        );

        it('generates a boolean value for empty options', () => {
          const bool = faker.datatype.boolean({});
          expect(bool).toBeTypeOf('boolean');
        });

        it('generates false for { probability: 0 }', () => {
          const bool = faker.datatype.boolean({ probability: 0 });
          expect(bool).toBe(false);
        });

        it('generates true for { probability: 1 }', () => {
          const bool = faker.datatype.boolean({ probability: 1 });
          expect(bool).toBe(true);
        });

        it.each([-5, 0.42, 5])(
          'generates a boolean value with given probability option',
          (probability) => {
            const bool = faker.datatype.boolean({ probability });
            expect(bool).toBeTypeOf('boolean');
          }
        );

        it('should not mutate the input object', () => {
          const filledOptions: { probability?: number } = Object.freeze({
            probability: 1,
          });
          expect(() => faker.datatype.boolean(filledOptions)).not.toThrow();

          const emptyOptions: { probability?: number } = Object.freeze({});
          expect(() => faker.datatype.boolean(emptyOptions)).not.toThrow();
        });
      });
    }
  );
});
