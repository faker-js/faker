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
});
