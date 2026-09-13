import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { multiple } from '../helpers/multiple';
import { wordSample } from './sample';

/**
 * Returns a random string containing some words separated by spaces.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The optional options object or the number of words to return.
 * @param options.count The number of words to return. Defaults to a random value between `1` and `3`.
 *
 * @example
 * words(fakerCore) // 'almost'
 * words(fakerCore, 5) // 'before hourly patiently dribble equal'
 * words(fakerCore, { count: 5 }) // 'whoever edible um kissingly faraway'
 * words(fakerCore, { count: { min: 5, max: 10 } }) // 'vice buoyant through apropos poised total wary boohoo'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function words(
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

  return multiple(fakerCore, () => wordSample(fakerCore), { count }).join(' ');
}
