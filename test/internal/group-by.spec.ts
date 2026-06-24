import { describe, expect, it } from 'vitest';
import { groupBy } from '../../src/internal/group-by';

describe('groupBy()', () => {
  it('should group values by key', () => {
    const values = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'John' },
    ];

    const result = groupBy(values, ({ name }) => name);

    expect(result).toEqual({
      John: [
        { id: 1, name: 'John' },
        { id: 3, name: 'John' },
      ],
      Jane: [{ id: 2, name: 'Jane' }],
    });
  });

  it('should group by key and map values', () => {
    const values = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'John' },
    ];

    const result = groupBy(
      values,
      ({ name }) => name,
      ({ id }) => id
    );

    expect(result).toEqual({
      John: [1, 3],
      Jane: [2],
    });
  });

  it('should group values with object prototype property names as keys', () => {
    const values = ['__proto__', 'toString', '__proto__'];

    const result = groupBy(values, (value) => value);

    expect(result['__proto__']).toEqual(['__proto__', '__proto__']);
    expect(result.toString).toEqual(['toString']);
    expect(Object.keys(result).toSorted()).toEqual(['__proto__', 'toString']);
  });
});
