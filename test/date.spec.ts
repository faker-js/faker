import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

describe('date', () => {
  describe('past()', () => {
    it('returns a date N years into the past', () => {
      const date = faker.date.past(75);
      expect(date).lessThan(new Date());
    });

    it('returns a past date when N = 0', () => {
      const refDate = new Date();
      const date = faker.date.past(0, refDate.toJSON());

      expect(date).lessThan(refDate); // date should be before the date given
    });

    it('returns a date N years before the date given', () => {
      const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = faker.date.past(75, refDate.toJSON());

      // date should be before date given but after the current time
      expect(date).lessThan(refDate);
      expect(date).greaterThan(new Date());
    });
  });

  describe('future()', () => {
    it('returns a date N years into the future', () => {
      const date = faker.date.future(75);

      expect(date).greaterThan(new Date());
    });

    it('returns a future date when N = 0', () => {
      const refDate = new Date();
      const date = faker.date.future(0, refDate.toJSON());

      expect(date).greaterThan(refDate); // date should be after the date given
    });

    it('returns a date N years after the date given', () => {
      const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = faker.date.future(75, refDate.toJSON());

      // date should be after the date given, but before the current time
      expect(date).greaterThan(refDate);
      expect(date).lessThan(new Date());
    });
  });

  describe('recent()', () => {
    it('returns a date N days from the recent past', () => {
      const date = faker.date.recent(30);

      expect(date).lessThanOrEqual(new Date());
    });

    it('returns a date N days from the recent past, starting from refDate', () => {
      const days = 30;
      const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = faker.date.recent(
        days,
        // @ts-expect-error
        refDate
      );

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
    it('returns a date N days into the future', () => {
      const date = faker.date.soon(30);

      expect(date).greaterThanOrEqual(new Date());
    });

    it('returns a date N days from the recent future, starting from refDate', () => {
      const days = 30;
      const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

      const date = faker.date.soon(
        days,
        // @ts-expect-error
        refDate
      );

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

  describe('between()', () => {
    it('returns a random date between the dates given', () => {
      const from = new Date(1990, 5, 7, 9, 11, 0, 0);
      const to = new Date(2000, 6, 8, 10, 12, 0, 0);

      const date = faker.date.between(
        //@ts-expect-error
        from,
        to
      );

      expect(date).greaterThan(from);
      expect(date).lessThan(to);
    });
  });

  describe('betweens()', () => {
    it('returns an array of 3 dates ( by default ) of sorted randoms dates between the dates given', () => {
      const from = new Date(1990, 5, 7, 9, 11, 0, 0);
      const to = new Date(2000, 6, 8, 10, 12, 0, 0);

      const dates = faker.date.betweens(
        // @ts-expect-error
        from,
        to
      );

      expect(dates[0]).greaterThan(from);
      expect(dates[0]).lessThan(to);
      expect(dates[1]).greaterThan(dates[0]);
      expect(dates[2]).greaterThan(dates[1]);
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
