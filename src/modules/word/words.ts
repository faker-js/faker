import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { fakeHelpersMultiple } from '../helpers/multiple';
import { fakeWordSample } from './sample';

/**
 * Returns a random string containing some words separated by spaces.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object or the number of words to return.
 * @param options.count The number of words to return. Defaults to a random value between `1` and `3`.
 *
 * @example
 * fakeWordWords(fakerCore) // 'almost'
 * fakeWordWords(fakerCore, 5) // 'before hourly patiently dribble equal'
 * fakeWordWords(fakerCore, { count: 5 }) // 'whoever edible um kissingly faraway'
 * fakeWordWords(fakerCore, { count: { min: 5, max: 10 } }) // 'vice buoyant through apropos poised total wary boohoo'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeWordWords(
  fakerCore: FakerCore,
  options:
    | number
    | {
        /**
         * The number of words to return.
         *
         * @default { min: 1, max: 3 }
         */
        count?: NumberOrRange;
      } = {}
): string {
  if (typeof options === 'number') {
    options = { count: options };
  }

  const { count = { min: 1, max: 3 } } = options;

  return fakeHelpersMultiple(fakerCore, () => fakeWordSample(fakerCore), {
    count,
  }).join(' ');
}
