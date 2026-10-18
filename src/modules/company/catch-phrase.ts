import type { FakerCore } from '../../core';
import { fakeCompanyCatchPhraseAdjective } from './catch-phrase-adjective';
import { fakeCompanyCatchPhraseDescriptor } from './catch-phrase-descriptor';
import { fakeCompanyCatchPhraseNoun } from './catch-phrase-noun';

/**
 * Generates a random catch phrase that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeCompanyCatchPhrase(fakerCore) // 'Upgradable systematic flexibility'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeCompanyCatchPhrase(fakerCore: FakerCore): string {
  return [
    fakeCompanyCatchPhraseAdjective(fakerCore),
    fakeCompanyCatchPhraseDescriptor(fakerCore),
    fakeCompanyCatchPhraseNoun(fakerCore),
  ].join(' ');
}
