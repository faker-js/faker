import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';

const converterMap = [
  (d: Date) => d,
  (d: Date) => d.toISOString(),
  (d: Date) => d.valueOf(),
];

const NON_SEEDED_BASED_RUN = 5;

describe('date', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      describe('past()', () => {
        it('should return deterministic past value on given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.past(undefined, '2021-02-21T17:09:15.711Z');

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic past value on given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.past(
            undefined,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic past value on given years 10 and refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.past(10, '2021-02-21T17:09:15.711Z');

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic past value on given years 10 and refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.past(
            10,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toMatchSnapshot();
        });
      });

      describe('future()', () => {
        it('should return deterministic future value on given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            undefined,
            '2021-02-21T17:09:15.711Z'
          );

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic future value on given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            undefined,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic future value on given years 10 and refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.future(10, '2021-02-21T17:09:15.711Z');

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic future value on given years 10 and refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            10,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toMatchSnapshot();
        });
      });

      describe('between()', () => {
        it('should return deterministic value between given string dates', () => {
          faker.seed(seed);

          const actual = faker.date.between(
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z'
          );

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value between given real dates', () => {
          faker.seed(seed);

          const actual = faker.date.between(
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z')
          );

          expect(actual).toMatchSnapshot();
        });
      });

      describe('betweens()', () => {
        it('should return deterministic value betweens given string dates', () => {
          faker.seed(seed);

          const actual = faker.date.betweens(
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z'
          );

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value betweens given dates', () => {
          faker.seed(seed);

          const actual = faker.date.betweens(
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z')
          );

          expect(actual).toMatchSnapshot();
        });
      });

      describe('recent()', () => {
        it('should return deterministic value recent to given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.recent(
            undefined,
            '2021-02-21T17:11:17.711Z'
          );

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value recent to given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.recent(
            undefined,
            new Date('2021-02-21T17:11:17.711Z')
          );

          expect(actual).toMatchSnapshot();
        });
      });

      describe('soon()', () => {
        it('should return deterministic value soon to given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.soon(undefined, '2021-03-13T14:16:17.151Z');

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value soon to given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.soon(
            undefined,
            new Date('2021-03-13T14:16:17.151Z')
          );

          expect(actual).toMatchSnapshot();
        });
      });

      describe('month()', () => {
        it('should return deterministic value month by default', () => {
          faker.seed(seed);

          const actual = faker.date.month();

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value month with abbr true', () => {
          faker.seed(seed);

          const actual = faker.date.month({ abbr: true });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value month with context true', () => {
          faker.seed(seed);

          const actual = faker.date.month({ context: true });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value month with abbr and context true', () => {
          faker.seed(seed);

          const actual = faker.date.month({ abbr: true, context: true });

          expect(actual).toMatchSnapshot();
        });
      });

      describe('weekday()', () => {
        it('should return deterministic value weekday by default', () => {
          faker.seed(seed);

          const actual = faker.date.weekday();

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value weekday with abbr true', () => {
          faker.seed(seed);

          const actual = faker.date.weekday({ abbr: true });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value weekday with context true', () => {
          faker.seed(seed);

          const actual = faker.date.weekday({ context: true });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value weekday with abbr and context true', () => {
          faker.seed(seed);

          const actual = faker.date.weekday({ abbr: true, context: true });

          expect(actual).toMatchSnapshot();
        });
      });

      describe('birthdate()', () => {
        it('should return deterministic value birthdate by default', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value birthdate by age mode ', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            mode: 'age',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value birthdate by age range', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 20,
            max: 80,
            mode: 'age',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value birthdate by age', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 40,
            max: 40,
            mode: 'age',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value birthdate by year mode', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            mode: 'year',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value birthdate by year range', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 1900,
            max: 2000,
            mode: 'year',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });

        it('should return deterministic value birthdate by year', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 2000,
            max: 2000,
            mode: 'year',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toMatchSnapshot();
        });
      });
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('past()', () => {
        it('should return a date 5 years in the past', () => {
          const today = new Date();
          const yearsAgo = new Date(today);
          yearsAgo.setFullYear(yearsAgo.getFullYear() - 5);

          const date = faker.date.past(5);

          expect(date).lessThan(today);
          expect(date).greaterThanOrEqual(yearsAgo);
        });

        it('should return a past date when years 0', () => {
          const refDate = new Date();
          const date = faker.date.past(0, refDate.toISOString());

          expect(date).lessThan(refDate);
        });

        it.each(converterMap)(
          'should return a past date relative to given refDate',
          (converter) => {
            const refDate = new Date();
            refDate.setFullYear(refDate.getFullYear() + 5);

            const date = faker.date.past(5, converter(refDate));

            expect(date).lessThan(refDate);
            expect(date).greaterThan(new Date());
          }
        );
      });

      describe('future()', () => {
        it('should return a date 75 years into the future', () => {
          const date = faker.date.future(75);

          expect(date).greaterThan(new Date());
        });

        it('should return a future date when years 0', () => {
          const refDate = new Date();
          const date = faker.date.future(0, refDate.toISOString());

          expect(date).greaterThan(refDate); // date should be after the date given
        });

        it.each(converterMap)(
          'should return a date 75 years after the date given',
          (converter) => {
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            const date = faker.date.future(75, converter(refDate));

            // date should be after the date given, but before the current time
            expect(date).greaterThan(refDate);
            expect(date).lessThan(new Date());
          }
        );
      });

      describe('between()', () => {
        it.each(converterMap)(
          'should return a random date between the dates given',
          (converter) => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const date = faker.date.between(converter(from), converter(to));

            expect(date).greaterThan(from);
            expect(date).lessThan(to);
          }
        );
      });

      describe('betweens()', () => {
        it.each(converterMap)(
          'should return an array of 3 dates ( by default ) of sorted randoms dates between the dates given',
          (converter) => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const dates = faker.date.betweens(converter(from), converter(to));

            expect(dates[0]).greaterThan(from);
            expect(dates[0]).lessThan(to);
            expect(dates[1]).greaterThan(dates[0]);
            expect(dates[2]).greaterThan(dates[1]);
          }
        );
      });

      describe('recent()', () => {
        it('should return a date N days from the recent past', () => {
          const date = faker.date.recent(30);

          expect(date).lessThanOrEqual(new Date());
        });

        it.each(converterMap)(
          'should return a date N days from the recent past, starting from refDate',
          (converter) => {
            const days = 30;
            const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            const lowerBound = new Date(
              refDate.getTime() - days * 24 * 60 * 60 * 1000
            );

            const date = faker.date.recent(days, converter(refDate));

            expect(
              lowerBound,
              '`recent()` date should not be further back than `n` days ago'
            ).lessThanOrEqual(date);
            expect(
              date,
              '`recent()` date should not be ahead of the starting date reference'
            ).lessThanOrEqual(refDate);
          }
        );
      });

      describe('soon()', () => {
        it('should return a date N days into the future', () => {
          const date = faker.date.soon(30);

          expect(date).greaterThanOrEqual(new Date());
        });

        it.each(converterMap)(
          'should return a date N days from the recent future, starting from refDate',
          (converter) => {
            const days = 30;
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            const upperBound = new Date(
              refDate.getTime() + days * 24 * 60 * 60 * 1000
            );

            const date = faker.date.soon(days, converter(refDate));

            expect(
              date,
              '`soon()` date should not be further ahead than `n` days ago'
            ).lessThanOrEqual(upperBound);
            expect(
              refDate,
              '`soon()` date should not be behind the starting date reference'
            ).lessThanOrEqual(date);
          }
        );
      });

      describe('month()', () => {
        it('should return random value from date.month.wide array by default', () => {
          const month = faker.date.month();
          expect(faker.definitions.date.month.wide).toContain(month);
        });

        it('should return random value from date.month.wide_context array for context option', () => {
          const month = faker.date.month({ context: true });
          expect(faker.definitions.date.month.wide_context).toContain(month);
        });

        it('should return random value from date.month.abbr array for abbr option', () => {
          const month = faker.date.month({ abbr: true });
          expect(faker.definitions.date.month.abbr).toContain(month);
        });

        it('should return random value from date.month.abbr_context array for abbr and context option', () => {
          const month = faker.date.month({ abbr: true, context: true });
          expect(faker.definitions.date.month.abbr_context).toContain(month);
        });

        it('should return random value from date.month.wide array for context option when date.month.wide_context array is missing', () => {
          const backup_wide_context = faker.definitions.date.month.wide_context;
          faker.definitions.date.month.wide_context = undefined;

          const month = faker.date.month({ context: true });
          expect(faker.definitions.date.month.wide).toContain(month);

          faker.definitions.date.month.wide_context = backup_wide_context;
        });

        it('should return random value from date.month.abbr array for abbr and context option when date.month.abbr_context array is missing', () => {
          const backup_abbr_context = faker.definitions.date.month.abbr_context;
          faker.definitions.date.month.abbr_context = undefined;

          const month = faker.date.month({ abbr: true, context: true });
          expect(faker.definitions.date.month.abbr).toContain(month);

          faker.definitions.date.month.abbr_context = backup_abbr_context;
        });
      });

      describe('weekday()', () => {
        it('should return random value from date.weekday.wide array by default', () => {
          const weekday = faker.date.weekday();
          expect(faker.definitions.date.weekday.wide).toContain(weekday);
        });

        it('should return random value from date.weekday.wide_context array for context option', () => {
          const weekday = faker.date.weekday({ context: true });
          expect(faker.definitions.date.weekday.wide_context).toContain(
            weekday
          );
        });

        it('should return random value from date.weekday.abbr array for abbr option', () => {
          const weekday = faker.date.weekday({ abbr: true });
          expect(faker.definitions.date.weekday.abbr).toContain(weekday);
        });

        it('should return random value from date.weekday.abbr_context array for abbr and context option', () => {
          const weekday = faker.date.weekday({ abbr: true, context: true });
          expect(faker.definitions.date.weekday.abbr_context).toContain(
            weekday
          );
        });

        it('should return random value from date.weekday.wide array for context option when date.weekday.wide_context array is missing', () => {
          const backup_wide_context =
            faker.definitions.date.weekday.wide_context;
          faker.definitions.date.weekday.wide_context = undefined;

          const weekday = faker.date.weekday({ context: true });
          expect(faker.definitions.date.weekday.wide).toContain(weekday);

          faker.definitions.date.weekday.wide_context = backup_wide_context;
        });

        it('should return random value from date.weekday.abbr array for abbr and context option when date.weekday.abbr_context array is missing', () => {
          const backup_abbr_context =
            faker.definitions.date.weekday.abbr_context;
          faker.definitions.date.weekday.abbr_context = undefined;

          const weekday = faker.date.weekday({ abbr: true, context: true });
          expect(faker.definitions.date.weekday.abbr).toContain(weekday);

          faker.definitions.date.weekday.abbr_context = backup_abbr_context;
        });
      });

      describe('birthdate', () => {
        it('returns a random birthdate', () => {
          const birthdate = faker.date.birthdate();
          expect(birthdate).toBeInstanceOf(Date);
        });

        it('returns a random birthdate between two years', () => {
          const min = 1990;
          const max = 2000;

          const birthdate = faker.date.birthdate({ min, max, mode: 'year' });

          // birthdate is a date object
          expect(birthdate).toBeInstanceOf(Date);

          // Generated date is between min and max
          expect(birthdate.getUTCFullYear()).toBeGreaterThanOrEqual(min);
          expect(birthdate.getUTCFullYear()).toBeLessThanOrEqual(max);
        });

        it('returns a random birthdate between two ages', () => {
          const min = 4;
          const max = 5;

          const birthdate = faker.date.birthdate({ min, max, mode: 'age' });

          // birthdate is a date object
          expect(birthdate).toBeInstanceOf(Date);

          // Generated date is between min and max
          expect(birthdate.getUTCFullYear()).toBeGreaterThanOrEqual(
            new Date().getUTCFullYear() - max - 1
          );
          expect(birthdate.getUTCFullYear()).toBeLessThanOrEqual(
            new Date().getUTCFullYear() - min
          );
        });
      });
    }
  });
});
