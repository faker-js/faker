import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededTests } from './support/seededRuns';

const NON_SEEDED_BASED_RUN = 5;

const refDate = '2020-01-01T00:00:00.000Z';

describe('git', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'git', (t) => {
    t.itEach('branch', 'commitMessage', 'commitSha', 'shortSha');

    t.describeEach(
      'commitEntry',
      'commitDate'
    )((t) => {
      t.it('with only string refDate', { refDate })
        .it('with only Date refDate', { refDate: new Date(refDate) })
        .it('with only number refDate', {
          refDate: new Date(refDate).getTime(),
        });
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('branch()', () => {
        it('should return a random branch', () => {
          const branch = faker.git.branch();

          expect(branch).toBeTruthy();
          expect(branch).toBeTypeOf('string');
          expect(branch).toSatisfy(validator.isSlug);
        });
      });

      describe('commitEntry', () => {
        it('should return a valid random commitEntry', () => {
          const commitEntry = faker.git.commitEntry();

          expect(commitEntry).toBeTruthy();
          expect(commitEntry).toBeTypeOf('string');

          const parts = commitEntry.split(/\r?\n/);

          expect(parts.length).toBeGreaterThanOrEqual(6);
          expect(parts.length).toBeLessThanOrEqual(7);

          expect(parts[0]).toMatch(/^commit [a-f0-9]+$/);
          if (parts.length === 7) {
            expect(parts[1]).toMatch(/^Merge: [a-f0-9]+ [a-f0-9]+$/);
            expect(parts[2]).toMatch(/^Author: [^\<\>]+ \<[\w\.]+@[\w\.]+\>$/);
            expect(parts[3]).toMatch(/^Date: .+$/);
            expect(parts[4]).toBe('');
            expect(parts[5]).toMatch(/^\s{4}.+$/);
          } else {
            expect(parts[1]).toMatch(/^Author: [^\<\>]+ \<[\w\.]+@[\w\.]+\>$/);
            expect(parts[2]).toMatch(/^Date: .+$/);
            expect(parts[3]).toBe('');
            expect(parts[4]).toMatch(/^\s{4}.+$/);
          }
        });

        it('should return a random commitEntry with a default end of line charcter of "\r\n"', () => {
          const commitEntry = faker.git.commitEntry();
          const parts = commitEntry.split('\r\n');

          expect(parts.length).toBeGreaterThanOrEqual(6);
          expect(parts.length).toBeLessThanOrEqual(7);
        });

        it('should return a random commitEntry with a configured end of line charcter of "\r\n" with eol = CRLF', () => {
          const commitEntry = faker.git.commitEntry({
            eol: 'CRLF',
          });
          const parts = commitEntry.split('\r\n');

          expect(parts.length).toBeGreaterThanOrEqual(6);
          expect(parts.length).toBeLessThanOrEqual(7);
        });

        it('should return a random commitEntry with a configured end of line charcter of "\n" with eol = LF', () => {
          const commitEntry = faker.git.commitEntry({
            eol: 'LF',
          });
          const parts = commitEntry.split('\n');

          expect(parts.length).toBeGreaterThanOrEqual(6);
          expect(parts.length).toBeLessThanOrEqual(7);

          expect(commitEntry).not.contains('\r\n');
        });
      });

      describe('commitMessage', () => {
        it('should return a random commitMessage', () => {
          const commitMessage = faker.git.commitMessage();

          expect(commitMessage).toBeTruthy();
          expect(commitMessage).toBeTypeOf('string');

          const parts = commitMessage.split(' ');
          expect(parts.length).toBeGreaterThanOrEqual(3);
        });
      });

      describe('commitDate', () => {
        it('should return a random commitDate', () => {
          const commitDate = faker.git.commitDate();

          expect(commitDate).toBeTruthy();
          expect(commitDate).toBeTypeOf('string');

          const parts = commitDate.split(' ');
          expect(parts.length).toBe(6);
        });
      });

      describe('commitSha', () => {
        it('should return a random commitSha', () => {
          const commitSha = faker.git.commitSha();

          expect(commitSha).toBeTruthy();
          expect(commitSha).toBeTypeOf('string');
          expect(commitSha).toSatisfy(validator.isHexadecimal);
          expect(commitSha).toHaveLength(40);
        });
      });

      describe('shortSha', () => {
        it('should return a random shortSha', () => {
          const shortSha = faker.git.shortSha();

          expect(shortSha).toBeTruthy();
          expect(shortSha).toBeTypeOf('string');
          expect(shortSha).toSatisfy(validator.isHexadecimal);
          expect(shortSha).toHaveLength(7);
        });
      });
    }
  });
});
