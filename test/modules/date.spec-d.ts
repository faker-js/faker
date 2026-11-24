import { describe, expectTypeOf, it } from 'vitest';
import { faker } from '../../src';
import { createFakerCore } from '../../src/core';
import { fakeDateBetweens } from '../../src/modules/date/betweens';
import type { NumberOrRange } from '../../src/utils/types';

describe('date.betweens', () => {
  const core = createFakerCore();
  const boundaries = { from: '2026-01-01', to: '2026-12-31' };

  it('infers tuples for explicit integer literal counts', () => {
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: 0 })
    ).toEqualTypeOf<[]>();
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: 2 })
    ).toEqualTypeOf<[Date, Date]>();
    expectTypeOf(
      fakeDateBetweens(core, { ...boundaries, count: 2 })
    ).toEqualTypeOf<[Date, Date]>();
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: 100 })['length']
    ).toEqualTypeOf<100>();
  });

  it('keeps arrays for omitted, undefined, dynamic and ranged counts', () => {
    const count = 2 as number;
    expectTypeOf(faker.date.betweens(boundaries)).toEqualTypeOf<Date[]>();
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: undefined })
    ).toEqualTypeOf<Date[]>();
    expectTypeOf(faker.date.betweens({ ...boundaries, count })).toEqualTypeOf<
      Date[]
    >();
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: { min: 1, max: 3 } })
    ).toEqualTypeOf<Date[]>();
  });

  it('rejects unknown option properties', () => {
    // @ts-expect-error Unknown option properties must not become accepted.
    const actual = faker.date.betweens({ ...boundaries, count: 2, typo: true });
    expectTypeOf(actual).toEqualTypeOf<[Date, Date]>();
    const standalone = fakeDateBetweens(core, {
      ...boundaries,
      count: 2,
      // @ts-expect-error The standalone surface has the same option validation.
      typo: true,
    });
    expectTypeOf(standalone).toEqualTypeOf<[Date, Date]>();
  });

  it('does not recurse without bound for large, fractional or negative counts', () => {
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: 101 })
    ).toEqualTypeOf<Date[]>();
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: 1.5 })
    ).toEqualTypeOf<Date[]>();
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: -1 })
    ).toEqualTypeOf<Date[]>();
  });

  it('distributes over counts without promising a fixed length for unknown options', () => {
    const union = 1 as 1 | 2;
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: union })
    ).toEqualTypeOf<[Date] | [Date, Date]>();
    const optionalCount: typeof boundaries & { count?: 2 } = boundaries;
    expectTypeOf(faker.date.betweens(optionalCount)).toEqualTypeOf<Date[]>();
    const optionalUndefined = 2 as 2 | undefined;
    expectTypeOf(
      faker.date.betweens({ ...boundaries, count: optionalUndefined })
    ).toEqualTypeOf<Date[]>();
    const options: typeof boundaries & { count?: NumberOrRange } = boundaries;
    expectTypeOf(faker.date.betweens(options)).toEqualTypeOf<Date[]>();
  });
});
