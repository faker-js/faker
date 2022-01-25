import { describe, expect, it } from 'vitest';
import { faker } from '../dist/cjs';

describe('date', () => {
  describe('past()', () => {
    it('returns a date N years into the past', () => {
      const date = faker.date.past(75);

      expect(date).lessThan(new Date());
    });

    it('returns a past date when N = 0', () => {
      const refDate = new Date();

      const date = faker.date.past(0, refDate.toISOString());

      expect(date).lessThan(refDate); // date should be before the date given
    });

    describe('returns a date N years before the date given', () => {
      const years = 75;
      const today = new Date();
      const future = new Date(
        `${today.getFullYear() + years}${today.toISOString().slice(4)}`
      );

      (
        [
          ['refDate as string', future.toISOString()],
          ['refDate as Date', future],
        ] as [string, string | Date][]
      ).forEach(([desc, refDate]) =>
        it(desc, () => {
          const date = faker.date.past(years, refDate);

          expect(date).lessThan(future);
          expect(date).greaterThan(today);
        })
      );
    });
  });

  describe('future()', () => {
    it('returns a date N years into the future', () => {
      const date = faker.date.future(75);

      expect(date).greaterThan(new Date());
    });

    it('returns a future date when N = 0', () => {
      const refDate = new Date();

      const date = faker.date.future(0, refDate.toISOString());

      expect(date).greaterThan(refDate); // date should be after the date given
    });

    describe('returns a date N years after the date given', () => {
      const past = new Date(1880, 11, 9, 10, 0, 0, 0);

      (
        [
          ['refDate as string', past.toISOString()],
          ['refDate as Date', past],
        ] as [string, string | Date][]
      ).forEach(([desc, refDate]) =>
        it(desc, () => {
          const date = faker.date.future(75, refDate);

          // date should be after the date given, but before the current time
          expect(date).greaterThan(past);
          expect(date).lessThan(new Date());
        })
      );
    });
  });

  describe('recent()', () => {
    it('returns a date N days from the recent past', () => {
      const date = faker.date.recent(30);

      expect(date).lessThanOrEqual(new Date());
    });

    describe('returns a date N days from the recent past, starting from refDate', () => {
      const days = 30;
      const future = new Date(2120, 11, 9, 10, 0, 0, 0);
      const lowerBound = new Date(
        future.getTime() - days * 24 * 60 * 60 * 1000
      );

      (
        [
          ['refDate as string', future.toISOString()],
          ['refDate as Date', future],
        ] as [string, string | Date][]
      ).forEach(([desc, refDate]) =>
        it(desc, () => {
          const date = faker.date.recent(days, refDate);

          expect(
            date,
            '`recent()` date should not be ahead of the starting date reference'
          ).lessThanOrEqual(future);
          expect(
            lowerBound,
            '`recent()` date should not be further back than `n` days ago'
          ).lessThanOrEqual(date);
        })
      );
    });
  });

  describe('soon()', () => {
    it('returns a date N days into the future', () => {
      const date = faker.date.soon(30);

      expect(date).greaterThanOrEqual(new Date());
    });

    describe('returns a date N days from the recent future, starting from refDate', () => {
      const days = 30;
      const past = new Date(1880, 11, 9, 10, 0, 0, 0);
      const upperBound = new Date(
        past.getTime() + days * 24 * 60 * 60 * 1000
      );

      (
        [
          ['refDate as string', past.toISOString()],
          ['refDate as Date', past],
        ] as [string, string | Date][]
      ).forEach(([desc, refDate]) =>
        it(desc, () => {
          const date = faker.date.soon(days, refDate);

          expect(
            date,
            '`soon()` date should not be further ahead than `n` days ago'
          ).lessThanOrEqual(upperBound);
          expect(
            past,
            '`soon()` date should not be behind the starting date reference'
          ).lessThanOrEqual(date);
        })
      );
    });
  });

  describe('between()', () => {
    describe('returns a random date between the dates given', () => {
      const from = new Date(1990, 5, 7, 9, 11, 0, 0);
      const to = new Date(2000, 6, 8, 10, 12, 0, 0);

      (
        [
          ['refDate as string', from.toISOString(), to.toISOString()],
          ['refDate as Date', from, to],
        ] as [string, string | Date, string | Date][]
      ).forEach(([desc, f, t]) =>
        it(desc, () => {
          const date = faker.date.between(f, t);

          expect(date).greaterThan(from);
          expect(date).lessThan(to);
        })
      );
    });
  });

  describe('betweens()', () => {
    describe('returns an array of 3 dates (by default) of sorted randoms dates between the dates given', () => {
      const from = new Date(1990, 5, 7, 9, 11, 0, 0);
      const to = new Date(2000, 6, 8, 10, 12, 0, 0);

      (
        [
          ['refDate as string', from.toISOString(), to.toISOString()],
          ['refDate as Date', from, to],
        ] as [string, string | Date, string | Date][]
      ).forEach(([desc, f, t]) =>
        it(desc, () => {
          const dates = faker.date.betweens(f, t);

          expect(dates[0]).greaterThan(from);
          expect(dates[0]).lessThan(to);
          expect(dates[1]).greaterThan(dates[0]);
          expect(dates[2]).greaterThan(dates[1]);
        })
      );
    });
  });

  describe('month()', () => {
    it('returns random value from date.month.wide array by default', () => {
      const month = faker.date.month();

      expect(faker.definitions.date.month.wide).toContain(month);
    });

    it('returns random value from date.month.wide_context array for context option', () => {
      const month = faker.date.month({ context: true });

      expect(faker.definitions.date.month.wide_context).toContain(month);
    });

    it('returns random value from date.month.abbr array for abbr option', () => {
      const month = faker.date.month({ abbr: true });

      expect(faker.definitions.date.month.abbr).toContain(month);
    });

    it('returns random value from date.month.abbr_context array for abbr and context option', () => {
      const month = faker.date.month({ abbr: true, context: true });

      expect(faker.definitions.date.month.abbr_context).toContain(month);
    });

    it('returns random value from date.month.wide array for context option when date.month.wide_context array is missing', () => {
      const backup_wide_context = faker.definitions.date.month.wide_context;
      faker.definitions.date.month.wide_context = undefined;

      const month = faker.date.month({ context: true });

      expect(faker.definitions.date.month.wide).toContain(month);

      faker.definitions.date.month.wide_context = backup_wide_context;
    });

    it('returns random value from date.month.abbr array for abbr and context option when date.month.abbr_context array is missing', () => {
      const backup_abbr_context = faker.definitions.date.month.abbr_context;
      faker.definitions.date.month.abbr_context = undefined;

      const month = faker.date.month({ abbr: true, context: true });

      expect(faker.definitions.date.month.abbr).toContain(month);

      faker.definitions.date.month.abbr_context = backup_abbr_context;
    });
  });

  describe('weekday()', () => {
    it('returns random value from date.weekday.wide array by default', () => {
      const weekday = faker.date.weekday();

      expect(faker.definitions.date.weekday.wide).toContain(weekday);
    });

    it('returns random value from date.weekday.wide_context array for context option', () => {
      const weekday = faker.date.weekday({ context: true });

      expect(faker.definitions.date.weekday.wide_context).toContain(weekday);
    });

    it('returns random value from date.weekday.abbr array for abbr option', () => {
      const weekday = faker.date.weekday({ abbr: true });

      expect(faker.definitions.date.weekday.abbr).toContain(weekday);
    });

    it('returns random value from date.weekday.abbr_context array for abbr and context option', () => {
      const weekday = faker.date.weekday({ abbr: true, context: true });

      expect(faker.definitions.date.weekday.abbr_context).toContain(weekday);
    });

    it('returns random value from date.weekday.wide array for context option when date.weekday.wide_context array is missing', () => {
      const backup_wide_context = faker.definitions.date.weekday.wide_context;
      faker.definitions.date.weekday.wide_context = undefined;

      const weekday = faker.date.weekday({ context: true });

      expect(faker.definitions.date.weekday.wide).toContain(weekday);

      faker.definitions.date.weekday.wide_context = backup_wide_context;
    });

    it('returns random value from date.weekday.abbr array for abbr and context option when date.weekday.abbr_context array is missing', () => {
      const backup_abbr_context = faker.definitions.date.weekday.abbr_context;
      faker.definitions.date.weekday.abbr_context = undefined;

      const weekday = faker.date.weekday({ abbr: true, context: true });

      expect(faker.definitions.date.weekday.abbr).toContain(weekday);

      faker.definitions.date.weekday.abbr_context = backup_abbr_context;
    });
  });
});
