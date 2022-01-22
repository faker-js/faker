import { describe, expect, it } from 'vitest';
import { faker } from '../lib/cjs';

describe('word', () => {
  const methods = [
    'adjective',
    'adverb',
    'conjunction',
    'interjection',
    'noun',
    'preposition',
    'verb',
  ];

  // Perform the same three tests for each method.
  methods.forEach((method) => {
    describe(method + '()', () => {
      it('returns random value from ' + method + ' array', () => {
        const word = faker.word[method]();
        expect(faker.definitions.word[method]).toContain(word);
      });
      it('optional length parameter returns expected result', () => {
        const wordLength = 5;
        const word = faker.word[method](wordLength);
        expect(faker.definitions.word[method]).toContain(word);
        expect(word.length).toBe(wordLength);
      });
      it('unresolvable optional length returns random ' + method, () => {
        const wordLength = 1000;
        const word = faker.word[method](wordLength);
        expect(faker.definitions.word[method]).toContain(word);
      });
    });
  });
});
