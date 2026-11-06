import { describe, expect, it, vi } from 'vitest';
import { SimpleFaker } from '../../src';
import { createFakerCore } from '../../src/core';
import { FakerError } from '../../src/errors/faker-error';
import { fakeHelpersWeightedArrayElements } from '../../src/modules/helpers/weighted-array-elements';
import { fakeHelpersWeightedArraySamples } from '../../src/modules/helpers/weighted-array-samples';
import type { Randomizer } from '../../src/randomizer';

const entries = [
  { weight: 5, value: 'sunny' },
  { weight: 4, value: 'rainy' },
  { weight: 1, value: 'snowy' },
] as const;

function fixedCore(values: number[]) {
  let index = 0;
  const next = vi.fn<Randomizer['next']>(() => values[index++ % values.length]);
  const randomizer: Randomizer = { next, seed: vi.fn<Randomizer['seed']>() };
  return { core: createFakerCore({ randomizer }), next };
}

describe.each([
  ['weightedArrayElements', fakeHelpersWeightedArrayElements],
  ['weightedArraySamples', fakeHelpersWeightedArraySamples],
] as const)('%s', (_name, sample) => {
  it.each([0, -1, -Infinity, Infinity, Number.NaN])(
    'rejects invalid weight %s before drawing',
    (weight) => {
      const { core, next } = fixedCore([0.5]);
      expect(() =>
        sample(
          core,
          [
            { weight: 1, value: 'valid' },
            { weight, value: 'invalid' },
          ],
          1
        )
      ).toThrow(new FakerError(`${_name} expects finite, positive weights.`));
      expect(next).not.toHaveBeenCalled();
    }
  );

  it('validates weights even when no results are requested', () => {
    expect(() =>
      sample(createFakerCore(), [{ weight: 0, value: 1 }], 0)
    ).toThrow(FakerError);
  });

  it.each([Number.NaN, Infinity, -Infinity, 1.5, Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid count %s without drawing',
    (count) => {
      const { core, next } = fixedCore([0.5]);
      expect(() => sample(core, entries, count)).toThrow(
        'count and its bounds must be safe integers.'
      );
      expect(next).not.toHaveBeenCalled();
    }
  );

  it.each([
    { min: Number.NaN, max: 3 },
    { min: 1, max: Infinity },
    { min: 0.5, max: 3 },
    { min: 1, max: 2.5 },
    { min: 1, max: Number.MAX_SAFE_INTEGER + 1 },
    { min: 3, max: 1 },
  ])('rejects invalid count range %j', (count) => {
    const { core, next } = fixedCore([0.5]);
    expect(() => sample(core, entries, count)).toThrow(FakerError);
    expect(next).not.toHaveBeenCalled();
  });

  it.each([0, -1, -100, { min: -3, max: -3 }])(
    'returns no values for count %j',
    (count) => {
      const { core, next } = fixedCore([0.5]);
      expect(sample(core, entries, count)).toEqual([]);
      expect(next).not.toHaveBeenCalled();
    }
  );

  it('resolves inclusive count ranges', () => {
    const { core: minCore } = fixedCore([0, 0.25, 0.5, 0.75]);
    const { core: maxCore } = fixedCore([1 - Number.EPSILON, 0.25, 0.5, 0.75]);
    expect(sample(minCore, entries, { min: 1, max: 3 })).toHaveLength(1);
    expect(sample(maxCore, entries, { min: 1, max: 3 })).toHaveLength(3);
  });

  it('preserves frozen input entries and object identity', () => {
    const first = Object.freeze({ id: 1 });
    const second = Object.freeze({ id: 2 });
    const input = Object.freeze([
      Object.freeze({ weight: 1, value: first }),
      Object.freeze({ weight: 2, value: second }),
    ]);
    const result = sample(createFakerCore({ seed: 42 }), input, 2);
    expect(result).toHaveLength(2);
    expect(result.every((value) => value === first || value === second)).toBe(
      true
    );
    expect(input).toEqual([
      { weight: 1, value: first },
      { weight: 2, value: second },
    ]);
  });

  it('preserves null, undefined, falsy values, and callable values', () => {
    const fn = vi.fn<() => void>();
    const input = [undefined, null, 0, false, '', fn].map((value) => ({
      weight: 1,
      value,
    }));
    const { core } = fixedCore([0, 0.2, 0.4, 0.5, 0.7, 0.9]);
    expect(sample(core, input, input.length)).toEqual(
      input.map(({ value }) => value)
    );
    expect(fn).not.toHaveBeenCalled();
  });

  it('replays results after reseeding', () => {
    const core = createFakerCore({ seed: 42 });
    const first = Array.from({ length: 10 }, () =>
      sample(core, entries, { min: 1, max: 3 })
    );
    core.randomizer.seed(42);
    expect(
      Array.from({ length: 10 }, () =>
        sample(core, entries, { min: 1, max: 3 })
      )
    ).toEqual(first);
  });

  it('agrees with the SimpleFaker instance API', () => {
    const core = createFakerCore({ seed: 1337 });
    const faker = new SimpleFaker({ seed: 1337 });
    expect(sample(core, entries, 2)).toEqual(faker.helpers[_name](entries, 2));
  });

  it('keeps equivalent scaled weights equivalent for the same random draws', () => {
    const actual = sample(createFakerCore({ seed: 1211 }), entries, 3);
    const scaled = entries.map(({ weight, value }) => ({
      weight: weight * 1e200,
      value,
    }));
    expect(sample(createFakerCore({ seed: 1211 }), scaled, 3)).toEqual(actual);
  });

  it('supports equal weights whose sum would overflow', () => {
    const input = [1, 2, 3].map((value) => ({
      weight: Number.MAX_VALUE,
      value,
    }));
    const actual = sample(createFakerCore({ seed: 42 }), input, 3);
    const normalized = input.map(({ value }) => ({ weight: 1, value }));
    expect(actual).toEqual(
      sample(createFakerCore({ seed: 42 }), normalized, 3)
    );
  });

  it('supports subnormal weights without rounding all scores to the same value', () => {
    const input = [1, 2, 3].map((value) => ({
      weight: Number.MIN_VALUE * value,
      value,
    }));
    const normalized = input.map(({ value }) => ({ weight: value, value }));
    expect(sample(createFakerCore({ seed: 42 }), input, 3)).toEqual(
      sample(createFakerCore({ seed: 42 }), normalized, 3)
    );
  });

  it('has the expected first-draw distribution for a fixed seed', () => {
    const core = createFakerCore({ seed: 20261029 });
    const counts = { sunny: 0, rainy: 0, snowy: 0 };
    const iterations = 20000;
    for (let i = 0; i < iterations; i++) {
      counts[sample(core, entries, 1)[0]]++;
    }
    expect(counts.sunny / iterations).toBeCloseTo(0.5, 1);
    expect(counts.rainy / iterations).toBeCloseTo(0.4, 1);
    expect(counts.snowy / iterations).toBeCloseTo(0.1, 1);
  });
});

describe('weightedArrayElements without replacement', () => {
  it('returns an empty array for empty input without drawing', () => {
    const { core, next } = fixedCore([0.5]);
    expect(fakeHelpersWeightedArrayElements(core, [])).toEqual([]);
    expect(next).not.toHaveBeenCalled();
  });

  it('defaults to an inclusive count between one and the input length', () => {
    const { core: minCore } = fixedCore([0, 0.25, 0.5, 0.75]);
    const { core: maxCore } = fixedCore([1 - Number.EPSILON, 0.25, 0.5, 0.75]);
    expect(fakeHelpersWeightedArrayElements(minCore, entries)).toHaveLength(1);
    expect(fakeHelpersWeightedArrayElements(maxCore, entries)).toHaveLength(3);
  });

  it('selects each input index once and clamps counts to the available entries', () => {
    const input = Array.from({ length: 100 }, (_, value) => ({
      weight: value + 1,
      value,
    }));
    const result = fakeHelpersWeightedArrayElements(
      createFakerCore({ seed: 42 }),
      input,
      Number.MAX_SAFE_INTEGER
    );
    expect(result).toHaveLength(100);
    expect(new Set(result).size).toBe(100);
    expect(result.toSorted((a, b) => a - b)).toEqual(
      input.map(({ value }) => value)
    );
  });

  it('distinguishes repeated values from repeated entries', () => {
    const value = {};
    const input = [
      { weight: 1, value },
      { weight: 2, value },
    ];
    expect(
      fakeHelpersWeightedArrayElements(createFakerCore({ seed: 42 }), input, 3)
    ).toEqual([value, value]);
  });

  it('orders selection by exponential arrivals rather than by weight alone', () => {
    const { core } = fixedCore([0.9, 0.1, 0.5]);
    expect(
      fakeHelpersWeightedArrayElements(
        core,
        [
          { weight: 2, value: 'a' },
          { weight: 1, value: 'b' },
          { weight: 1, value: 'c' },
        ],
        3
      )
    ).toEqual(['b', 'c', 'a']);
  });

  it('terminates with a constant-zero randomizer and uses deterministic tie ordering', () => {
    const { core, next } = fixedCore([0]);
    expect(fakeHelpersWeightedArrayElements(core, entries, 3)).toEqual([
      'sunny',
      'rainy',
      'snowy',
    ]);
    expect(next).toHaveBeenCalledTimes(3);
  });

  it('keeps tiny weights eligible after heavier entries have been selected', () => {
    const { core } = fixedCore([0.5]);
    expect(
      fakeHelpersWeightedArrayElements(
        core,
        [
          { weight: Number.MIN_VALUE, value: 'small' },
          { weight: Number.MAX_VALUE, value: 'large' },
          { weight: 1, value: 'middle' },
        ],
        3
      )
    ).toEqual(['large', 'middle', 'small']);
  });

  it('does not consume randomness when only one entry is available', () => {
    const { core, next } = fixedCore([0.5]);
    expect(fakeHelpersWeightedArrayElements(core, [entries[0]], 10)).toEqual([
      'sunny',
    ]);
    expect(next).not.toHaveBeenCalled();
  });

  it('follows the conditional distribution after the first selection', () => {
    const core = createFakerCore({ seed: 1337 });
    const counts = new Map<string, number>();
    const iterations = 30000;
    for (let i = 0; i < iterations; i++) {
      const key = fakeHelpersWeightedArrayElements(core, entries, 2).join(',');
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    // P(A then B) = w(A)/sum(weights) * w(B)/(sum(weights)-w(A)).
    expect((counts.get('sunny,rainy') ?? 0) / iterations).toBeCloseTo(
      (0.5 * 4) / 5,
      1
    );
    expect((counts.get('rainy,sunny') ?? 0) / iterations).toBeCloseTo(
      (0.4 * 5) / 6,
      1
    );
    expect((counts.get('snowy,rainy') ?? 0) / iterations).toBeCloseTo(
      (0.1 * 4) / 9,
      1
    );
    expect(counts.size).toBe(6);
  });
});

describe('weightedArraySamples with replacement', () => {
  it('requires a nonempty population even for a zero count', () => {
    expect(() =>
      fakeHelpersWeightedArraySamples(createFakerCore(), [], 0)
    ).toThrow('Cannot get value from empty dataset.');
  });

  it('supports more samples than entries and may repeat the same entry', () => {
    const { core, next } = fixedCore([0]);
    expect(fakeHelpersWeightedArraySamples(core, entries, 10)).toEqual(
      Array.from({ length: 10 }, () => 'sunny')
    );
    expect(next).toHaveBeenCalledTimes(10);
  });

  it('uses half-open intervals at cumulative weight boundaries', () => {
    const { core } = fixedCore([
      0,
      0.499999,
      0.5,
      0.899999,
      0.9,
      1 - Number.EPSILON,
    ]);
    expect(fakeHelpersWeightedArraySamples(core, entries, 6)).toEqual([
      'sunny',
      'sunny',
      'rainy',
      'rainy',
      'snowy',
      'snowy',
    ]);
  });

  it('does not select intervals lost to floating-point precision, even at zero', () => {
    const input = [
      { weight: Number.MIN_VALUE, value: 'tiny-before' },
      { weight: Number.MAX_VALUE, value: 'large' },
      { weight: Number.MIN_VALUE, value: 'tiny-after' },
    ];
    const { core } = fixedCore([0, 0.5, 1 - Number.EPSILON]);
    expect(fakeHelpersWeightedArraySamples(core, input, 3)).toEqual([
      'large',
      'large',
      'large',
    ]);
  });

  it('does not consume randomness when every draw has the same possible result', () => {
    const { core, next } = fixedCore([0.5]);
    expect(fakeHelpersWeightedArraySamples(core, [entries[0]], 3)).toEqual([
      'sunny',
      'sunny',
      'sunny',
    ]);
    expect(next).not.toHaveBeenCalled();
  });
});
