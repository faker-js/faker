import type { FakerCore } from '../../core';
import type { NumberOrRange } from '../../utils/types';
import { sentences } from './sentences';

/**
 * Generates the given number lines of lorem separated by `'\n'`.
 *
 * @param fakerCore The FakerCore to use.
 * @param lineCount The number of lines to generate. Defaults to a random number between `1` and `5`.
 * @param lineCount.min The minimum number of lines to generate. Defaults to `1`.
 * @param lineCount.max The maximum number of lines to generate. Defaults to `5`.
 *
 * @example
 * lines(fakerCore)
 * // 'Rerum quia aliquam pariatur explicabo sint minima eos.
 * // Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.
 * // Enim eveniet a qui.
 * // Consectetur velit eligendi animi nostrum veritatis.'
 *
 * lines(fakerCore)
 * // 'Soluta deserunt eos quam reiciendis libero autem enim nam ut.
 * // Voluptate aut aut.'
 *
 * lines(fakerCore, 2)
 * // 'Quod quas nam quis impedit aut consequuntur.
 * // Animi dolores aspernatur.'
 *
 * lines(fakerCore, { min: 1, max: 3 })
 * // 'Error dolorem natus quos eum consequatur necessitatibus.'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function lines(
  fakerCore: FakerCore,
  lineCount: NumberOrRange = { min: 1, max: 5 }
): string {
  return sentences(fakerCore, lineCount, '\n');
}
