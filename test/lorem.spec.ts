import validator from 'validator';
import { afterEach, describe, expect, it } from 'vitest';
import { faker } from '../src';
import { seededRuns } from './support/seededRuns';
import { times } from './support/times';

const NON_SEEDED_BASED_RUN = 5;

const functionNames = [
  'word',
  'words',
  'sentence',
  'slug',
  'sentences',
  'paragraph',
  'paragraphs',
  'text',
  'lines',
];

describe('lorem', () => {
  afterEach(() => {
    faker.locale = 'en';
  });

  for (const seed of seededRuns) {
    describe(`seed: ${seed}`, () => {
      for (const functionName of functionNames) {
        it(`${functionName}()`, () => {
          faker.seed(seed);

          const actual = faker.lorem[functionName]();

          expect(actual).toBeTypeOf('string');
          expect(actual).toMatchSnapshot();
        });
      }
    });
  }

  describe(`random seeded tests for seed ${JSON.stringify(
    faker.seed()
  )}`, () => {
    for (let i = 1; i <= NON_SEEDED_BASED_RUN; i++) {
      describe('word()', () => {
        it('should return random value from word array', () => {
          const actual = faker.lorem.word();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(faker.definitions.lorem.words).toContain(actual);
        });

        // INFO @Shinigami92 2022-02-11: Seems there are only words with a max length of 14 characters
        it.each(times(14))(
          'should return random value from word array with a max length of %i characters',
          (length) => {
            const actual = faker.lorem.word(length);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');
            expect(faker.definitions.lorem.words).toContain(actual);
            expect(actual).toHaveLength(length);
          }
        );
      });

      describe('words()', () => {
        it('should return three random values from words array', () => {
          const actual = faker.lorem.words();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const words = actual.split(' ');

          expect(words).toHaveLength(3);

          for (const word of words) {
            expect(faker.definitions.lorem.words).toContain(word);
          }
        });

        it.each(times(25))(
          'should return %i random values from words array',
          (num) => {
            const actual = faker.lorem.words(num);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');

            const words = actual.split(' ');

            expect(words).toHaveLength(num);

            for (const word of words) {
              expect(faker.definitions.lorem.words).toContain(word);
            }
          }
        );
      });

      describe('sentence()', () => {
        it('should return a sentence', () => {
          const actual = faker.lorem.sentence();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual[actual.length - 1]).toBe('.');
        });

        it.each(times(25))(
          'should return a sentence with %i words',
          (wordCount) => {
            const actual = faker.lorem.sentence(wordCount);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');
            expect(actual[actual.length - 1]).toBe('.');

            const words = actual.split(' ');

            expect(words).toHaveLength(wordCount);
          }
        );
      });

      describe('slug()', () => {
        it('should return a slug', () => {
          const actual = faker.lorem.slug();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual).toSatisfy(validator.isSlug);
        });

        it.each(times(25))(
          'should return a slug combined from %i words',
          (wordCount) => {
            const actual = faker.lorem.slug(wordCount);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');

            const words = actual.split('-');

            expect(words).toHaveLength(wordCount);

            if (wordCount > 1) {
              expect(actual).toSatisfy(validator.isSlug);
            }
          }
        );
      });

      describe('sentences()', () => {
        it('should return sentences', () => {
          const actual = faker.lorem.sentences();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual[actual.length - 1]).toBe('.');
        });

        it.each(times(10))('should return %i sentences', (sentenceCount) => {
          const actual = faker.lorem.sentences(sentenceCount);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual[actual.length - 1]).toBe('.');

          const sentences = actual.split('. ');

          expect(sentences).toHaveLength(sentenceCount);
        });

        it.each(times(10))(
          'should return %i sentences separated by \\n',
          (sentenceCount) => {
            const separator = '\n';
            const actual = faker.lorem.sentences(sentenceCount, separator);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');
            expect(actual[actual.length - 1]).toBe('.');

            const sentences = actual.split(separator);

            expect(sentences).toHaveLength(sentenceCount);

            for (const sentence of sentences) {
              expect(sentence[sentence.length - 1]).toBe('.');
            }
          }
        );
      });

      describe('paragraph()', () => {
        it('should return a paragraph', () => {
          const actual = faker.lorem.paragraph();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual[actual.length - 1]).toBe('.');
        });

        it.each(times(10))(
          'should return a paragraph with %i sentences',
          (sentenceCount) => {
            const actual = faker.lorem.paragraph(sentenceCount);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');
            expect(actual[actual.length - 1]).toBe('.');

            const sentences = actual.split('. ');

            expect(sentences.length).toBeGreaterThanOrEqual(sentenceCount);
            expect(sentences.length).toBeLessThanOrEqual(sentenceCount + 3);
          }
        );
      });

      describe('paragraphs()', () => {
        it('should return paragraphs', () => {
          const actual = faker.lorem.paragraphs();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual[actual.length - 1]).toBe('.');
        });

        it.each(times(5))('should return %i paragraphs', (paragraphCount) => {
          const actual = faker.lorem.paragraphs(paragraphCount);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
          expect(actual[actual.length - 1]).toBe('.');

          const paragraphs = actual.split('\n');

          expect(paragraphs).toHaveLength(paragraphCount);
        });

        it.each(times(5))(
          'should return %i paragraphs separated by \\n\\n',
          (paragraphCount) => {
            const separator = '\n\n';
            const actual = faker.lorem.paragraphs(paragraphCount, separator);

            expect(actual).toBeTruthy();
            expect(actual).toBeTypeOf('string');
            expect(actual[actual.length - 1]).toBe('.');

            const paragraphs = actual.split(separator);

            expect(paragraphs).toHaveLength(paragraphCount);
          }
        );
      });

      describe('text()', () => {
        it('should return text', () => {
          const actual = faker.lorem.text();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
        });
      });

      describe('lines()', () => {
        it('should return lines', () => {
          const actual = faker.lorem.lines();

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');
        });

        it.each(times(25))('should return %i lines', (lineCount) => {
          const actual = faker.lorem.lines(lineCount);

          expect(actual).toBeTruthy();
          expect(actual).toBeTypeOf('string');

          const lines = actual.split('\n');

          expect(lines).toHaveLength(lineCount);
        });
      });
    }
  });
});
