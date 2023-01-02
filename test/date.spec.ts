import { afterEach, describe, expect, it } from 'vitest';
import { faker, FakerError } from '../src';
import { seededTests } from './support/seededRuns';

const converterMap = [
  (d: Date) => d,
  (d: Date) => d.toISOString(),
  (d: Date) => d.valueOf(),
];

const NON_SEEDED_BASED_RUN = 5;
const refDate = '2021-02-21T17:09:15.711Z';

describe('date', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  seededTests(faker, 'date', (t) => {
    t.describeEach(
      'past',
      'future'
    )((t) => {
      t.it('with only string refDate', { refDate })
        .it('with only Date refDate', { refDate: new Date(refDate) })
        .it('with only number refDate', {
          refDate: new Date(refDate).getTime(),
        })
        .it('with value', { years: 10, refDate });
    });

    t.describeEach(
      'recent',
      'soon'
    )((t) => {
      t.it('with only string refDate', { refDate })
        .it('with only Date refDate', { refDate: new Date(refDate) })
        .it('with only number refDate', {
          refDate: new Date(refDate).getTime(),
        })
        .it('with value', { days: 10, refDate });
    });

    t.describeEach(
      'weekday',
      'month'
    )((t) => {
      t.it('noArgs')
        .it('with abbr = true', { abbr: true })
        .it('with context = true', { context: true })
        .it('with abbr = true and context = true', {
          abbr: true,
          context: true,
        });
    });

    t.describe('between', (t) => {
      t.it('with string dates', {
        from: '2021-02-21T17:09:15.711Z',
        to: '2021-04-21T17:11:17.711Z',
      })
        .it('with Date dates', {
          from: new Date('2021-02-21T17:09:15.711Z'),
          to: new Date('2021-04-21T17:11:17.711Z'),
        })
        .it('with mixed dates', {
          from: '2021-02-21T17:09:15.711Z',
          to: new Date('2021-04-21T17:11:17.711Z'),
        });
    });

    t.describe('betweens', (t) => {
      t.it('with string dates', {
        from: '2021-02-21T17:09:15.711Z',
        to: '2021-04-21T17:11:17.711Z',
      })
        .it('with Date dates', {
          from: new Date('2021-02-21T17:09:15.711Z'),
          to: new Date('2021-04-21T17:11:17.711Z'),
        })
        .it('with mixed dates', {
          from: '2021-02-21T17:09:15.711Z',
          to: new Date('2021-04-21T17:11:17.711Z'),
        })
        .it('with string dates and count', {
          from: '2021-02-21T17:09:15.711Z',
          to: '2021-04-21T17:11:17.711Z',
          count: 5,
        })
        .it('with Date dates and count', {
          from: new Date('2021-02-21T17:09:15.711Z'),
          to: new Date('2021-04-21T17:11:17.711Z'),
          count: 5,
        })
        .it('with Date dates and count range', {
          from: new Date('2021-02-21T17:09:15.711Z'),
          to: new Date('2021-04-21T17:11:17.711Z'),
          count: { min: 3, max: 5 },
        });
    });

    t.describe('birthdate', (t) => {
      t.it('with only refDate', { refDate })
        .it('with age mode and refDate', {
          mode: 'age',
          refDate,
        })
        .it('with age and refDate', {
          min: 40,
          max: 40,
          mode: 'age',
          refDate,
        })
        .it('with age range and refDate', {
          min: 20,
          max: 80,
          mode: 'age',
          refDate,
        })
        .it('with year mode and refDate', {
          mode: 'year',
          refDate,
        })
        .it('with year and refDate', {
          min: 2000,
          max: 2000,
          mode: 'age',
          refDate,
        })
        .it('with year range and refDate', {
          min: 1900,
          max: 2000,
          mode: 'age',
          refDate,
        });
    });
  });

  describe('deprecated', () => {
    seededTests(faker, 'date', (t) => {
      t.describeEach(
        'past',
        'recent',
        'soon',
        'future'
      )((t) => {
        t.it('with only string refDate', undefined, refDate)
          .it('with only Date refDate', undefined, new Date(refDate))
          .it(
            'with only number refDate',
            undefined,
            new Date(refDate).getTime()
          )
          .it('with value', 10, refDate);
      });

      t.describe('between', (t) => {
        t.it(
          'with string dates',
          '2021-02-21T17:09:15.711Z',
          '2021-04-21T17:11:17.711Z'
        ).it(
          'with Date dates',
          new Date('2021-02-21T17:09:15.711Z'),
          new Date('2021-04-21T17:11:17.711Z')
        );
      });

      t.describe('betweens', (t) => {
        t.it(
          'with string dates',
          '2021-02-21T17:09:15.711Z',
          '2021-04-21T17:11:17.711Z'
        )
          .it(
            'with Date dates',
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z')
          )
          .it(
            'with string dates and count',
            '2021-02-21T17:09:15.711Z',
            '2021-04-21T17:11:17.711Z',
            5
          )
          .it(
            'with Date dates and count',
            new Date('2021-02-21T17:09:15.711Z'),
            new Date('2021-04-21T17:11:17.711Z'),
            5
          );
      });

      // No changes to these methods
      t.skip('birthdate').skip('month').skip('weekday');
    });
  });

  describe(`random seeded tests for seed ${faker.seed()}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('past()', () => {
        it('should return a date 5 years in the past', () => {
          const today = new Date();
          const yearsAgo = new Date(today);
          yearsAgo.setFullYear(yearsAgo.getFullYear() - 5);

          const date = faker.date.past({ years: 5 });

          expect(date).lessThan(today);
          expect(date).greaterThanOrEqual(yearsAgo);
        });

        it('should throw an error when years = 0', () => {
          const refDate = new Date();
          expect(() =>
            faker.date.past({ years: 0, refDate: refDate.toISOString() })
          ).toThrow(new FakerError('Years must be greater than 0.'));
        });

        it.each(converterMap)(
          'should return a past date relative to given refDate',
          (converter) => {
            const refDate = new Date();
            refDate.setFullYear(refDate.getFullYear() + 5);

            const date = faker.date.past({
              years: 5,
              refDate: converter(refDate),
            });

            expect(date).lessThan(refDate);
            expect(date).greaterThan(new Date());
          }
        );
      });

      describe('future()', () => {
        it('should return a date 75 years into the future', () => {
          const date = faker.date.future({ years: 75 });

          expect(date).greaterThan(new Date());
        });

        it('should throw an error when years = 0', () => {
          const refDate = new Date();
          expect(() =>
            faker.date.future({ years: 0, refDate: refDate.toISOString() })
          ).toThrow(new FakerError('Years must be greater than 0.'));
        });

        it.each(converterMap)(
          'should return a date 75 years after the date given',
          (converter) => {
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            const date = faker.date.future({
              years: 75,
              refDate: converter(refDate),
            });

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

            const date = faker.date.between({
              from: converter(from),
              to: converter(to),
            });

            expect(date).greaterThan(from);
            expect(date).lessThan(to);
          }
        );
      });

      describe('betweens()', () => {
        it.each(converterMap)(
          'should return an array of 3 ( by default ) sorted random dates between the dates given',
          (converter) => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const dates = faker.date.betweens({
              from: converter(from),
              to: converter(to),
            });

            expect(dates).toHaveLength(3);

            expect(dates[0]).greaterThan(from);
            expect(dates[0]).lessThan(dates[1]);
            expect(dates[1]).lessThan(dates[2]);
            expect(dates[2]).lessThan(to);
          }
        );

        it.each(converterMap)(
          'should return an array of 2 sorted random dates between the dates given',
          (converter) => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const dates = faker.date.betweens(
              converter(from),
              converter(to),
              2
            );

            expect(dates).toHaveLength(2);

            expect(dates[0]).greaterThan(from);
            expect(dates[0]).lessThan(dates[1]);
            expect(dates[1]).lessThan(to);
          }
        );

        it.each(converterMap)(
          'should return an array of 3-5 sorted random dates between the dates given',
          (converter) => {
            const from = new Date(1990, 5, 7, 9, 11, 0, 0);
            const to = new Date(2000, 6, 8, 10, 12, 0, 0);

            const dates = faker.date.betweens({
              from: converter(from),
              to: converter(to),
              count: {
                min: 3,
                max: 5,
              },
            });

            expect(dates.length).greaterThanOrEqual(3);
            expect(dates.length).lessThanOrEqual(5);

            expect(dates[0]).greaterThan(from);
            for (let i = 1; i < dates.length; i++) {
              expect(dates[i]).greaterThan(dates[i - 1]);
            }

            expect(dates[dates.length - 1]).lessThan(to);
          }
        );
      });

      describe('recent()', () => {
        it('should return a date N days from the recent past', () => {
          const date = faker.date.recent({ days: 30 });

          expect(date).lessThanOrEqual(new Date());
        });

        it('should throw an error when days = 0', () => {
          const refDate = new Date();
          expect(() =>
            faker.date.recent({ days: 0, refDate: refDate.toISOString() })
          ).toThrow(new FakerError('Days must be greater than 0.'));
        });

        it.each(converterMap)(
          'should return a date N days from the recent past, starting from refDate',
          (converter) => {
            const days = 30;
            const refDate = new Date(2120, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            const lowerBound = new Date(
              refDate.getTime() - days * 24 * 60 * 60 * 1000
            );

            const date = faker.date.recent({
              days,
              refDate: converter(refDate),
            });

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
          const date = faker.date.soon({ days: 30 });

          expect(date).greaterThanOrEqual(new Date());
        });

        it('should throw an error when days = 0', () => {
          const refDate = new Date();
          expect(() =>
            faker.date.soon({ days: 0, refDate: refDate.toISOString() })
          ).toThrow(new FakerError('Days must be greater than 0.'));
        });

        it.each(converterMap)(
          'should return a date N days from the recent future, starting from refDate',
          (converter) => {
            const days = 30;
            const refDate = new Date(1880, 11, 9, 10, 0, 0, 0); // set the date beyond the usual calculation (to make sure this is working correctly)

            const upperBound = new Date(
              refDate.getTime() + days * 24 * 60 * 60 * 1000
            );

            const date = faker.date.soon({ days, refDate: converter(refDate) });

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

      describe('deprecated', () => {
        describe('past()', () => {
          it('should return a date 5 years in the past', () => {
            const today = new Date();
            const yearsAgo = new Date(today);
            yearsAgo.setFullYear(yearsAgo.getFullYear() - 5);

            const date = faker.date.past(5);

            expect(date).lessThan(today);
            expect(date).greaterThanOrEqual(yearsAgo);
          });

          it('should throw an error when years = 0', () => {
            const refDate = new Date();
            expect(() => faker.date.past(0, refDate.toISOString())).toThrow(
              new FakerError('Years must be greater than 0.')
            );
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

          it('should throw an error when years = 0', () => {
            const refDate = new Date();
            expect(() => faker.date.future(0, refDate.toISOString())).toThrow(
              new FakerError('Years must be greater than 0.')
            );
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

          it('should throw an error when days = 0', () => {
            const refDate = new Date();
            expect(() => faker.date.recent(0, refDate.toISOString())).toThrow(
              new FakerError('Days must be greater than 0.')
            );
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

          it('should throw an error when days = 0', () => {
            const refDate = new Date();
            expect(() => faker.date.soon(0, refDate.toISOString())).toThrow(
              new FakerError('Days must be greater than 0.')
            );
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
      });
    }
  });
});
