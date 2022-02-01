import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

const seededRuns = [
  {
    seed: 42,
    expectations: {
      past: [
        new Date('2020-10-08T00:10:58.041Z'),
        new Date('2020-10-08T00:10:57.330Z'),
        new Date('2017-05-26T15:26:24.637Z'),
        new Date('2017-05-26T15:26:23.926Z'),
      ],
      future: [
        new Date('2021-07-08T10:07:33.381Z'),
        new Date('2021-07-08T10:07:32.670Z'),
        new Date('2024-11-19T18:52:06.785Z'),
        new Date('2024-11-19T18:52:06.074Z'),
      ],
      between: [
        new Date('2021-03-15T19:30:57.091Z'),
        new Date('2021-07-29T19:19:12.731Z'),
      ],
      betweens: [
        [
          new Date('2021-03-08T11:09:46.211Z'),
          new Date('2021-03-23T05:10:16.500Z'),
          new Date('2021-04-06T23:10:46.500Z'),
        ],
        [
          new Date('2021-03-08T11:09:45.500Z'),
          new Date('2021-03-23T05:10:15.500Z'),
          new Date('2021-04-06T23:10:45.500Z'),
        ],
      ],
      recent: [
        new Date('2021-02-21T08:11:56.820Z'),
        new Date('2021-02-21T08:11:56.109Z'),
      ],
      soon: [
        new Date('2021-03-13T23:15:38.042Z'),
        new Date('2021-03-13T23:15:37.891Z'),
      ],
      month: {
        default: 'May',
        abbr: 'May',
        context: 'May',
        abbr_context: 'May',
      },
      weekday: {
        default: 'Tuesday',
        abbr: 'Tue',
        context: 'Tuesday',
        abbr_context: 'Tue',
      },
    },
  },
  {
    seed: 1337,
    expectations: {
      past: [
        new Date('2020-11-18T01:49:04.785Z'),
        new Date('2020-11-18T01:49:04.074Z'),
        new Date('2018-07-11T07:47:33.089Z'),
        new Date('2018-07-11T07:47:32.378Z'),
      ],
      future: [
        new Date('2021-05-28T08:29:26.637Z'),
        new Date('2021-05-28T08:29:25.926Z'),
        new Date('2023-10-06T02:30:58.333Z'),
        new Date('2023-10-06T02:30:57.622Z'),
      ],
      between: [
        new Date('2021-03-09T04:11:24.667Z'),
        new Date('2021-06-12T02:21:47.178Z'),
      ],
      betweens: [
        [
          new Date('2021-03-08T11:09:46.211Z'),
          new Date('2021-03-23T05:10:16.500Z'),
          new Date('2021-04-06T23:10:46.500Z'),
        ],
        [
          new Date('2021-03-08T11:09:45.500Z'),
          new Date('2021-03-23T05:10:15.500Z'),
          new Date('2021-04-06T23:10:45.500Z'),
        ],
      ],
      recent: [
        new Date('2021-02-21T10:53:58.041Z'),
        new Date('2021-02-21T10:53:57.330Z'),
      ],
      soon: [
        new Date('2021-03-13T20:33:36.821Z'),
        new Date('2021-03-13T20:33:36.670Z'),
      ],
      month: {
        default: 'April',
        abbr: 'Apr',
        context: 'April',
        abbr_context: 'Apr',
      },
      weekday: {
        default: 'Monday',
        abbr: 'Mon',
        context: 'Monday',
        abbr_context: 'Mon',
      },
    },
  },
  {
    seed: 1211,
    expectations: {
      past: [
        new Date('2020-03-19T19:19:04.071Z'),
        new Date('2020-03-19T19:19:03.360Z'),
        new Date('2011-11-12T14:47:19.955Z'),
        new Date('2011-11-12T14:47:19.244Z'),
      ],
      future: [
        new Date('2022-01-26T14:59:27.351Z'),
        new Date('2022-01-26T14:59:26.640Z'),
        new Date('2030-06-03T19:31:11.467Z'),
        new Date('2030-06-03T19:31:10.756Z'),
      ],
      between: [
        new Date('2021-04-17T11:58:13.327Z'),
        new Date('2022-03-21T16:37:15.905Z'),
      ],
      betweens: [
        [
          new Date('2021-03-08T11:09:46.211Z'),
          new Date('2021-03-23T05:10:16.500Z'),
          new Date('2021-04-06T23:10:46.500Z'),
        ],
        [
          new Date('2021-03-08T11:09:45.500Z'),
          new Date('2021-03-23T05:10:15.500Z'),
          new Date('2021-04-06T23:10:45.500Z'),
        ],
      ],
      recent: [
        new Date('2021-02-20T18:54:13.498Z'),
        new Date('2021-02-20T18:54:12.787Z'),
      ],
      soon: [
        new Date('2021-03-14T12:33:21.364Z'),
        new Date('2021-03-14T12:33:21.213Z'),
      ],
      month: {
        default: 'December',
        abbr: 'Dec',
        context: 'December',
        abbr_context: 'Dec',
      },
      weekday: {
        default: 'Saturday',
        abbr: 'Sat',
        context: 'Saturday',
        abbr_context: 'Sat',
      },
    },
  },
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

          expect(actual).toEqual(expectations.past[0]);
        });

        it('should return deterministic past value on given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.past(
            undefined,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.past[1]);
        });

        it('should return deterministic past value on given years 10 and refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.past(10, '2021-02-21T17:09:15.711Z');

          expect(actual).toEqual(expectations.past[2]);
        });

        it('should return deterministic past value on given years 10 and refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.past(
            10,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.past[3]);
        });
      });

      describe('future()', () => {
        it('should return deterministic future value on given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            undefined,
            '2021-02-21T17:09:15.711Z'
          );

          expect(actual).toEqual(expectations.future[0]);
        });

        it('should return deterministic future value on given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            undefined,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.future[1]);
        });

        it('should return deterministic future value on given years 10 and refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.future(10, '2021-02-21T17:09:15.711Z');

          expect(actual).toEqual(expectations.future[2]);
        });

        it('should return deterministic future value on given years 10 and refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.future(
            10,
            new Date('2021-02-21T17:09:15.711Z')
          );

          expect(actual).toEqual(expectations.future[3]);
        });
      });

      describe('between()', () => {
        it('should return deterministic value between given string dates', () => {
          faker.seed(seed);

          const actual = faker.date.between(
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z'
          );

          expect(actual).toEqual(expectations.between[0]);
        });

        it('should return deterministic value between given real dates', () => {
          faker.seed(seed);

          const actual = faker.date.between(
            new Date('2021-02-21'),
            new Date('2022-04-21')
          );

          expect(actual).toEqual(expectations.between[1]);
        });
      });

      describe('betweens()', () => {
        it('should return deterministic value betweens given string dates', () => {
          faker.seed(seed);

          // TODO @Shinigami92 2022-01-27: This function doesn't respect seeding
          const actual = faker.date.betweens(
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z'
          );

          expect(actual).toEqual(expectations.betweens[0]);
        });

        it('should return deterministic value betweens given dates', () => {
          faker.seed(seed);

          // TODO @Shinigami92 2022-01-27: This function doesn't respect seeding
          const actual = faker.date.betweens(
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z')
          );

          expect(actual).toEqual(expectations.betweens[1]);
        });
      });

      describe('recent()', () => {
        it('should return deterministic value recent to given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.recent(
            undefined,
            '2021-02-21T17:11:17.711Z'
          );

          expect(actual).toEqual(expectations.recent[0]);
        });

        it('should return deterministic value recent to given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.recent(
            undefined,
            new Date('2021-02-21T17:11:17.711Z')
          );

          expect(actual).toEqual(expectations.recent[1]);
        });
      });

      describe('soon()', () => {
        it('should return deterministic value soon to given refDate of type string', () => {
          faker.seed(seed);

          const actual = faker.date.soon(undefined, '2021-03-13T14:16:17.151Z');

          expect(actual).toEqual(expectations.soon[0]);
        });

        it('should return deterministic value soon to given refDate of type date', () => {
          faker.seed(seed);

          const actual = faker.date.soon(
            undefined,
            new Date('2021-03-13T14:16:17.151Z')
          );

          expect(actual).toEqual(expectations.soon[1]);
        });
      });

      describe('month()', () => {
        it('should return deterministic value month by default', () => {
          faker.seed(seed);

          const actual = faker.date.month();

          expect(actual).toEqual(expectations.month.default);
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

          expect(actual).toEqual(expectations.weekday.default);
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
    });
  }

  // Create and log-back the seed for debug purposes
  faker.seed(Math.ceil(Math.random() * 1_000_000_000));

  describe(`random seeded tests for seed ${faker.seedValue}`, () => {
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

        it('should return a past date relative to given refDate', () => {
          const refDate = new Date();
          refDate.setFullYear(refDate.getFullYear() + 5);

          let date = faker.date.past(5, refDate);

          expect(date).lessThan(refDate);
          expect(date).greaterThan(new Date());

          date = faker.date.past(5, refDate.toISOString());

          expect(date).lessThan(refDate);
          expect(date).greaterThan(new Date());
        });
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

        it('should return a date 75 years after the date given', () => {
          const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

          const date = faker.date.future(75, refDate.toISOString());

          // date should be after the date given, but before the current time
          expect(date).greaterThan(refDate);
          expect(date).lessThan(new Date());
        });
      });

      describe('between()', () => {
        it('should return a random date between the dates given', () => {
          const from = new Date(1990, 5, 7, 9, 11, 0, 0);
          const to = new Date(2000, 6, 8, 10, 12, 0, 0);

          const date = faker.date.between(from, to);

          expect(date).greaterThan(from);
          expect(date).lessThan(to);
        });
      });

      describe('betweens()', () => {
        it('should return an array of 3 dates ( by default ) of sorted randoms dates between the dates given', () => {
          const from = new Date(1990, 5, 7, 9, 11, 0, 0);
          const to = new Date(2000, 6, 8, 10, 12, 0, 0);

          const dates = faker.date.betweens(from, to);

          expect(dates[0]).greaterThan(from);
          expect(dates[0]).lessThan(to);
          expect(dates[1]).greaterThan(dates[0]);
          expect(dates[2]).greaterThan(dates[1]);
        });
      });

      describe('recent()', () => {
        it('should return a date N days from the recent past', () => {
          const date = faker.date.recent(30);

          expect(date).lessThanOrEqual(new Date());
        });

        it('should return a date N days from the recent past, starting from refDate', () => {
          const days = 30;
          const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

          const date = faker.date.recent(days, refDate);

          const lowerBound = new Date(
            refDate.getTime() - days * 24 * 60 * 60 * 1000
          );

          expect(
            lowerBound,
            '`recent()` date should not be further back than `n` days ago'
          ).lessThanOrEqual(date);
          expect(
            date,
            '`recent()` date should not be ahead of the starting date reference'
          ).lessThanOrEqual(refDate);
        });
      });

      describe('soon()', () => {
        it('should return a date N days into the future', () => {
          const date = faker.date.soon(30);

          expect(date).greaterThanOrEqual(new Date());
        });

        it('should return a date N days from the recent future, starting from refDate', () => {
          const days = 30;
          const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

          const date = faker.date.soon(days, refDate);

          const upperBound = new Date(
            refDate.getTime() + days * 24 * 60 * 60 * 1000
          );

          expect(
            date,
            '`soon()` date should not be further ahead than `n` days ago'
          ).lessThanOrEqual(upperBound);
          expect(
            refDate,
            '`soon()` date should not be behind the starting date reference'
          ).lessThanOrEqual(date);
        });
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
    }
  });
});
