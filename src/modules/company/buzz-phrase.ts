import type { FakerCore } from '../../core';
import { buzzAdjective } from './buzz-adjective';
import { buzzNoun } from './buzz-noun';
import { buzzVerb } from './buzz-verb';

/**
 * Generates a random buzz phrase that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * buzzPhrase(fakerCore) // 'cultivate synergistic e-markets'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function buzzPhrase(fakerCore: FakerCore): string {
  return [
    buzzVerb(fakerCore),
    buzzAdjective(fakerCore),
    buzzNoun(fakerCore),
  ].join(' ');
}
