import { describe, expectTypeOf, it } from 'vitest';
import {
  createFakerCore,
  fakeHelpersWeightedArrayElements,
  fakeHelpersWeightedArraySamples,
  faker,
  simpleFaker,
} from '../../src';

describe('weighted array sampling types', () => {
  it('preserves literal unions in both instance APIs', () => {
    expectTypeOf(
      faker.helpers.weightedArrayElements(
        [
          { weight: 1, value: 1 },
          { weight: 2, value: 'a' },
          { weight: 3, value: false },
        ],
        2
      )
    ).toEqualTypeOf<Array<1 | 'a' | false>>();
    expectTypeOf(
      simpleFaker.helpers.weightedArraySamples(
        [
          { weight: 1, value: 1 },
          { weight: 2, value: 'a' },
          { weight: 3, value: false },
        ],
        2
      )
    ).toEqualTypeOf<Array<1 | 'a' | false>>();
  });

  it('preserves readonly input and object literals in standalone APIs', () => {
    const core = createFakerCore();
    const input = [
      { weight: 1, value: { kind: 'one' } },
      { weight: 2, value: { kind: 'two' } },
    ] as const;
    type Value = (typeof input)[number]['value'];
    expectTypeOf(fakeHelpersWeightedArrayElements(core, input)).toEqualTypeOf<
      Value[]
    >();
    expectTypeOf(
      fakeHelpersWeightedArraySamples(core, input, { min: 1, max: 3 })
    ).toEqualTypeOf<Value[]>();
  });

  it('accepts explicit generic types and retains callable values', () => {
    const fn = (value: string) => value.length;
    expectTypeOf(
      faker.helpers.weightedArrayElements([{ weight: 1, value: fn }], 1)
    ).toEqualTypeOf<Array<(value: string) => number>>();
    expectTypeOf(
      faker.helpers.weightedArraySamples<{ weight: number; value: string }>(
        [{ weight: 1, value: 'a' }],
        2
      )
    ).toEqualTypeOf<string[]>();
  });

  it('requires a population and a replacement sample count', () => {
    expectTypeOf(faker.helpers.weightedArrayElements)
      .parameter(0)
      .not.toBeUndefined();
    expectTypeOf(faker.helpers.weightedArraySamples)
      .parameter(1)
      .not.toBeUndefined();
    // @ts-expect-error A count is required when sampling with replacement.
    fakeHelpersWeightedArraySamples(createFakerCore(), [
      { weight: 1, value: 'a' },
    ]);
    // @ts-expect-error A weight must be a number.
    faker.helpers.weightedArrayElements([{ weight: '1', value: 'a' }]);
  });
});
