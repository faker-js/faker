import { describe, expect, it } from 'vitest';
import { faker } from '../../src';
import { filterWordListByLength } from '../../src/modules/word/filter-word-list-by-length';
import { seededTests } from '../support/seeded-runs';
import { times } from './../support/times';

const NON_SEEDED_BASED_RUN = 5;

describe('word', () => {
  seededTests(faker, 'word', (t) => {
    t.describeEach(
      'adjective',
      'adverb',
      'conjunction',
      'interjection',
      'noun',
      'preposition',
      'verb',
      'sample'
    )((t) => {
      t.it('noArgs')
        .it('with length = 10', 10)
        .it('with length = 20', 20)
        .it('with options.length', { length: 10 })
        .it('with options.strategy', { strategy: 'shortest' })
        .it('with options.length and options.strategy', {
          length: { min: 18, max: 20 },
          strategy: 'closest',
        });
    });

    t.describe('words', (t) => {
      t.it('noArgs')
        .it('with count = 10', 10)
        .it('with count = 20', 20)
        .it('with options.count', { count: 10 })
        .it('with options.count range', { count: { min: 18, max: 20 } });
    });
  });

  describe('filterWordListByLength', () => {
    const wordList = ['foo', 'bar', 'baz', 'a', 'very-long', 'almostRight'];
    const length = 10;

    it('returns the word list if no options are given', () => {
      const result = filterWordListByLength({ wordList });
      expect(result).toEqual(wordList);
    });

    it('returns the words matching the given length', () => {
      const result = filterWordListByLength({
        wordList,
        length: 3,
      });
      expect(result).toEqual(['foo', 'bar', 'baz']);
    });

    it('returns the words matching the given length range', () => {
      const result = filterWordListByLength({
        wordList,
        length: { min: 1, max: 3 },
      });
      expect(result).toEqual(['foo', 'bar', 'baz', 'a']);
    });

    it('returns the word list if no words match the length', () => {
      const result = filterWordListByLength({
        wordList,
        length,
      });
      // TODO @ST-DDT 2022-10-02: This should throw an error in the next major version.
      expect(result).toEqual(wordList);
    });

    it('returns the appropriate words when strategy is "any-length" and no words match the given length', () => {
      const result = filterWordListByLength({
        wordList,
        length,
        strategy: 'any-length',
      });
      expect(result).toEqual(wordList);
    });

    it('returns the appropriate words when strategy is "shortest" and no words match the given length', () => {
      const result = filterWordListByLength({
        wordList,
        length,
        strategy: 'shortest',
      });
      expect(result).toEqual(['a']);
    });

    it('returns the appropriate words when strategy is "longest" and no words match the given length', () => {
      const result = filterWordListByLength({
        wordList,
        length,
        strategy: 'longest',
      });
      expect(result).toEqual(['almostRight']);
    });

    it('returns the appropriate words when strategy is "closest" and no words match the given length', () => {
      const result = filterWordListByLength({
        wordList,
        length: 10,
        strategy: 'closest',
      });
      expect(result).toEqual(['very-long', 'almostRight']);
    });

    it('throws an error when strategy is "fail" and no words match the given length', () => {
      expect(() => {
        filterWordListByLength({
          wordList,
          length,
          strategy: 'fail',
        });
      }).toThrow('No words found that match the given length.');
    });
  });

  describe.each(times(NON_SEEDED_BASED_RUN).map(() => faker.seed()))(
    'random seeded tests for seed %i',
    () => {
      describe(`adjective`, () => {
        it('should return adjective from adjective array', () => {
          const actual = faker.word.adjective();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.adjective).toContain(actual);
        });
      });

      describe(`adverb`, () => {
        it('should return adverb from adverb array', () => {
          const actual = faker.word.adverb();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.adverb).toContain(actual);
        });
      });

      describe(`conjunction`, () => {
        it('should return conjunction from conjunction array', () => {
          const actual = faker.word.conjunction();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.conjunction).toContain(actual);
        });
      });

      describe(`interjection`, () => {
        it('should return interjection from interjection array', () => {
          const actual = faker.word.interjection();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.interjection).toContain(actual);
        });
      });

      describe(`noun`, () => {
        it('should return noun from noun array', () => {
          const actual = faker.word.noun();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.noun).toContain(actual);
        });
      });

      describe(`preposition`, () => {
        it('should return preposition from preposition array', () => {
          const actual = faker.word.preposition();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.preposition).toContain(actual);
        });
      });

      describe(`verb`, () => {
        it('should return verb from verb array', () => {
          const actual = faker.word.verb();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.word.verb).toContain(actual);
        });
      });
    }
  );
});
