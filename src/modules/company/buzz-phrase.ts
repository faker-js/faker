import type { FakerCore } from '../../core';
import { companyBuzzAdjective } from './buzz-adjective';
import { companyBuzzNoun } from './buzz-noun';
import { companyBuzzVerb } from './buzz-verb';

/**
 * Generates a random buzz phrase that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyBuzzPhrase(fakerCore) // 'cultivate synergistic e-markets'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyBuzzPhrase(fakerCore: FakerCore): string {
  return [
    companyBuzzVerb(fakerCore),
    companyBuzzAdjective(fakerCore),
    companyBuzzNoun(fakerCore),
  ].join(' ');
}
