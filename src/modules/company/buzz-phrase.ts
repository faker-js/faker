import type { FakerCore } from '../../core';
import { fakeCompanyBuzzAdjective } from './buzz-adjective';
import { fakeCompanyBuzzNoun } from './buzz-noun';
import { fakeCompanyBuzzVerb } from './buzz-verb';

/**
 * Generates a random buzz phrase that can be used to demonstrate data being viewed by a manager.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyBuzzPhrase(fakerCore) // 'cultivate synergistic e-markets'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyBuzzPhrase(fakerCore: FakerCore): string {
  return [
    fakeCompanyBuzzVerb(fakerCore),
    fakeCompanyBuzzAdjective(fakerCore),
    fakeCompanyBuzzNoun(fakerCore),
  ].join(' ');
}
