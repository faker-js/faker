import { FakerError } from '../../errors/faker-error';

/**
 * The error handling strategies for the `filterWordListByLength` function.
 *
 * Always returns a new array.
 */
const STRATEGIES = {
  fail: () => {
    throw new FakerError('No words found that match the given length.');
  },
  closest: (
    wordList: string[],
    length: { min: number; max: number }
  ): string[] => {
    const wordsByLength = wordList.reduce((data, word) => {
      (data[word.length] ??= []).push(word);
      return data;
    }, {} as Record<number, string[]>);

    const lengths = Object.keys(wordsByLength).map(Number);
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);

    const closestOffset = Math.min(length.min - min, max - length.max);

    return wordList.filter(
      (word) =>
        word.length === length.min - closestOffset ||
        word.length === length.max + closestOffset
    );
  },
  shortest: (wordList: string[]): string[] => {
    return wordList.filter(
      (word) => word.length === Math.min(...wordList.map((w) => w.length))
    );
  },
  longest: (wordList: string[]): string[] => {
    return wordList.filter(
      (word) => word.length === Math.max(...wordList.map((w) => w.length))
    );
  },
  'any-length': (wordList: string[]): string[] => {
    return [...wordList];
  },
} as const; /*
satisfies Record<
string, // Parameters<filterWordListByLength>[0]['strategy']
(wordList: string[], length: { min: number; max: number }) => string[]
>;
*/

/**
 * Filters a string array for values with a matching length.
 * If length is not provided or no values with a matching length are found,
 * then the result will be determined using the given error handling strategy.
 *
 * Available error handling strategies:
 *
 * - `fail`: Throws an error if no words with the given length are found.
 * - `shortest`: Returns any of the shortest words.
 * - `closest`: Returns any of the words closest to the given length.
 * - `longest`: Returns any of the longest words.
 * - `any-length`: Returns a copy of the original word list.
 *
 * @param options The options to provide.
 * @param options.wordList A list of words to filter.
 * @param options.length The exact or the range of lengths the words should have.
 * @param options.strategy The strategy to apply when no words with a matching length are found. Defaults to 'any-length'.
 */
export function filterWordListByLength(options: {
  wordList: string[];
  length?: number | { min: number; max: number };
  strategy?: 'fail' | 'closest' | 'shortest' | 'longest' | 'any-length';
}): string[] {
  const { wordList, length, strategy = 'any-length' } = options;

  if (length) {
    const filter: (word: string) => boolean =
      typeof length === 'number'
        ? (word) => word.length === length
        : (word) => word.length >= length.min && word.length <= length.max;

    const wordListWithLengthFilter = wordList.filter(filter);

    if (wordListWithLengthFilter.length > 0) {
      return wordListWithLengthFilter;
    }

    if (typeof length === 'number') {
      return STRATEGIES[strategy](wordList, { min: length, max: length });
    } else {
      return STRATEGIES[strategy](wordList, length);
    }
  } else if (strategy === 'shortest' || strategy === 'longest') {
    return STRATEGIES[strategy](wordList);
  } else {
    return [...wordList];
  }
}
