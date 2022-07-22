import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = ['cve', 'cwe'];

describe('security', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.security[functionName]();
          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('cve()', () => {
        it('should return a well formed string', () => {
          expect(faker.security.cve()).toMatch(/^CVE-[0-9]{4}-[0-9]{4}/);
        });
      });

      describe('cwe()', () => {
        it('should return a well formed string', () => {
          expect(faker.security.cwe()).toMatch(/^CWE-[0-9]{4}/);
        });
      });

      describe('cvss()', () => {
        it('should return an object', () => {
          const cvss = faker.security.cvss();
          expect(cvss).toBeTypeOf('object');
        });

        it('should return a numeric value', () => {
          expect(faker.security.cvss().score).toEqual(expect.any(Number));
        });

        it('should return a well formed string', () => {
          expect(faker.security.cvss().vector).toMatch(
            /^CVSS:3.1\/AV:[NALP]\/AC:[LH]\/PR:[NLH]\/UI:[NR]\/S:[UC]\/C:[NLH]\/I:[NLH]\/A:[NLH]/
          );
        });
      });
    }
  });
});
