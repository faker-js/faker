import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      past: {
        noArgs: new Date('2020-10-08T00:10:58.041Z'),
        ten: new Date('2017-05-26T15:26:24.637Z'),
      },
      future: {
        noArgs: new Date('2021-07-08T10:07:33.381Z'),
        ten: new Date('2024-11-19T18:52:06.785Z'),
      },
      between: new Date('2021-03-15T19:30:57.091Z'),
      betweens: [
        new Date('2021-03-15T19:30:57.091Z'),
        new Date('2021-04-09T17:05:10.406Z'),
        new Date('2021-04-18T19:23:52.973Z'),
      ],
      recent: new Date('2021-02-21T08:11:56.820Z'),
      soon: new Date('2021-03-13T23:15:38.042Z'),
      month: {
        noArgs: 'May',
        abbr: 'May',
        context: 'May',
        abbr_context: 'May',
      },
      weekday: {
        noArgs: 'Tuesday',
        abbr: 'Tue',
        context: 'Tuesday',
        abbr_context: 'Tue',
      },
      birthdate: {
        noArgs: new Date('1943-08-06T10:03:17.283Z'),
        ageMode: new Date('1942-09-15T09:55:20.478Z'),
        ageRange: new Date('1941-12-15T14:59:26.122Z'),
        age: new Date('1959-06-26T13:52:19.442Z'),
        yearMode: new Date('1943-08-06T10:03:17.283Z'),
        yearRange: new Date('1937-10-30T15:52:07.381Z'),
        year: new Date('2000-05-16T22:59:36.513Z'),
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      past: {
        noArgs: new Date('2020-11-18T01:49:04.785Z'),
        ten: new Date('2018-07-11T07:47:33.089Z'),
      },
      future: {
        noArgs: new Date('2021-05-28T08:29:26.637Z'),
        ten: new Date('2023-10-06T02:30:58.333Z'),
      },
      between: new Date('2021-03-09T04:11:24.667Z'),
      betweens: [
        new Date('2021-03-03T01:51:22.512Z'),
        new Date('2021-03-09T04:11:24.667Z'),
        new Date('2021-03-26T18:53:00.564Z'),
      ],
      recent: new Date('2021-02-21T10:53:58.041Z'),
      soon: new Date('2021-03-13T20:33:36.821Z'),
      month: {
        noArgs: 'April',
        abbr: 'Apr',
        context: 'April',
        abbr_context: 'Apr',
      },
      weekday: {
        noArgs: 'Monday',
        abbr: 'Mon',
        context: 'Monday',
        abbr_context: 'Mon',
      },
      birthdate: {
        noArgs: new Date('1936-07-04T15:55:47.989Z'),
        ageMode: new Date('1935-08-14T07:41:47.183Z'),
        ageRange: new Date('1935-02-03T18:44:07.874Z'),
        age: new Date('1959-05-16T12:14:12.585Z'),
        yearMode: new Date('1936-07-04T15:55:47.989Z'),
        yearRange: new Date('1926-06-20T07:18:05.539Z'),
        year: new Date('2000-04-06T02:45:32.324Z'),
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      past: {
        noArgs: new Date('2020-03-19T19:19:04.071Z'),
        ten: new Date('2011-11-12T14:47:19.955Z'),
      },
      future: {
        noArgs: new Date('2022-01-26T14:59:27.351Z'),
        ten: new Date('2030-06-03T19:31:11.467Z'),
      },
      between: new Date('2021-04-17T11:58:13.327Z'),
      betweens: [
        new Date('2021-03-20T19:08:07.621Z'), // done
        new Date('2021-04-15T10:20:25.794Z'),
        new Date('2021-04-17T11:58:13.327Z'),
      ],
      recent: new Date('2021-02-20T18:54:13.498Z'),
      soon: new Date('2021-03-14T12:33:21.364Z'),
      month: {
        noArgs: 'December',
        abbr: 'Dec',
        context: 'December',
        abbr_context: 'Dec',
      },
      weekday: {
        noArgs: 'Saturday',
        abbr: 'Sat',
        context: 'Saturday',
        abbr_context: 'Sat',
      },
      birthdate: {
        noArgs: new Date('1978-06-29T09:24:02.647Z'),
        ageMode: new Date('1977-08-10T01:09:17.468Z'),
        ageRange: new Date('1975-10-01T07:11:50.190Z'),
        age: new Date('1960-01-14T18:44:13.966Z'),
        yearMode: new Date('1978-06-29T09:24:02.647Z'),
        yearRange: new Date('1993-10-11T07:44:59.519Z'),
        year: new Date('2000-12-04T01:16:03.286Z'),
      },
    },
  },
];

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

  for (const { seed, expectations } of seededRuns) {
    describe(`seed: ${seed}`, () => {
      describe('past()', () => {
        it('should return deterministic past value on given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.past(undefined, '2021-02-21T17:09:15.711Z');

          expect(actual).toEqual(expectations.past.noArgs);
        });

        it('should return deterministic past value on given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.past(
            undefined,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.past.noArgs);
        });

        it('should return deterministic past value on given years 10 and refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.past(10, '2021-02-21T17:09:15.711Z');

          expect(actual).toEqual(expectations.past.ten);
        });

        it('should return deterministic past value on given years 10 and refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.past(
            10,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.past.ten);
        });
      });

      describe('future()', () => {
        it('should return deterministic future value on given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            undefined,
            '2021-02-21T17:09:15.711Z'
          );

          expect(actual).toEqual(expectations.future.noArgs);
        });

        it('should return deterministic future value on given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            undefined,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.future.noArgs);
        });

        it('should return deterministic future value on given years 10 and refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.future(10, '2021-02-21T17:09:15.711Z');

          expect(actual).toEqual(expectations.future.ten);
        });

        it('should return deterministic future value on given years 10 and refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            10,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.future.ten);
        });
      });

      describe('between()', () => {
        it('should return deterministic value between given string dates', () => {
          faker.seed(seed);

          const actual = faker.date.between(
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z'
          );

          expect(actual).toEqual(expectations.between);
        });

        it('should return deterministic value between given real dates', () => {
          faker.seed(seed);

          const actual = faker.date.between(
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z')
          );

          expect(actual).toEqual(expectations.between);
        });
      });

      describe('betweens()', () => {
        it('should return deterministic value betweens given string dates', () => {
          faker.seed(seed);

          const actual = faker.date.betweens(
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z'
          );

          expect(actual).toEqual(expectations.betweens);
        });

        it('should return deterministic value betweens given dates', () => {
          faker.seed(seed);

          const actual = faker.date.betweens(
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z')
          );

          expect(actual).toEqual(expectations.betweens);
        });
      });

      describe('recent()', () => {
        it('should return deterministic value recent to given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.recent(
            undefined,
            '2021-02-21T17:11:17.711Z'
          );

          expect(actual).toEqual(expectations.recent);
        });

        it('should return deterministic value recent to given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.recent(
            undefined,
            new Date('2021-02-21T17:11:17.711Z')
          );

          expect(actual).toEqual(expectations.recent);
        });
      });

      describe('soon()', () => {
        it('should return deterministic value soon to given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.soon(undefined, '2021-03-13T14:16:17.151Z');

          expect(actual).toEqual(expectations.soon);
        });

        it('should return deterministic value soon to given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.soon(
            undefined,
            new Date('2021-03-13T14:16:17.151Z')
          );

          expect(actual).toEqual(expectations.soon);
        });
      });

      describe('month()', () => {
        it('should return deterministic value month by default', () => {
          faker.seed(seed);

          const actual = faker.date.month();

          expect(actual).toEqual(expectations.month.noArgs);
        });

        it('should return deterministic value month with abbr true', () => {
          faker.seed(seed);

          const actual = faker.date.month({ abbr: true });

          expect(actual).toEqual(expectations.month.abbr);
        });

        it('should return deterministic value month with context true', () => {
          faker.seed(seed);

          const actual = faker.date.month({ context: true });

          expect(actual).toEqual(expectations.month.context);
        });

        it('should return deterministic value month with abbr and context true', () => {
          faker.seed(seed);

          const actual = faker.date.month({ abbr: true, context: true });

          expect(actual).toEqual(expectations.month.abbr_context);
        });
      });

      describe('weekday()', () => {
        it('should return deterministic value weekday by default', () => {
          faker.seed(seed);

          const actual = faker.date.weekday();

          expect(actual).toEqual(expectations.weekday.noArgs);
        });

        it('should return deterministic value weekday with abbr true', () => {
          faker.seed(seed);

          const actual = faker.date.weekday({ abbr: true });

          expect(actual).toEqual(expectations.weekday.abbr);
        });

        it('should return deterministic value weekday with context true', () => {
          faker.seed(seed);

          const actual = faker.date.weekday({ context: true });

          expect(actual).toEqual(expectations.weekday.context);
        });

        it('should return deterministic value weekday with abbr and context true', () => {
          faker.seed(seed);

          const actual = faker.date.weekday({ abbr: true, context: true });

          expect(actual).toEqual(expectations.weekday.abbr_context);
        });
      });

      describe('birthdate()', () => {
        it('should return deterministic value birthdate by default', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.noArgs);
        });

        it('should return deterministic value birthdate by age mode ', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            mode: 'age',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.ageMode);
        });

        it('should return deterministic value birthdate by age range', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 20,
            max: 80,
            mode: 'age',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.ageRange);
        });

        it('should return deterministic value birthdate by age', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 40,
            max: 40,
            mode: 'age',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.age);
        });

        it('should return deterministic value birthdate by year mode', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            mode: 'year',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.yearMode);
        });

        it('should return deterministic value birthdate by year range', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 1900,
            max: 2000,
            mode: 'year',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.yearRange);
        });

        it('should return deterministic value birthdate by year', () => {
          faker.seed(seed);

          const actual = faker.date.birthdate({
            min: 2000,
            max: 2000,
            mode: 'year',
            refDate: '2000-02-09T20:54:02.397Z',
          });

          expect(actual).toEqual(expectations.birthdate.year);
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
