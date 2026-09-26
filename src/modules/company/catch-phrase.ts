import type { FakerCore } from '../../core';
import { companyCatchPhraseAdjective } from './catch-phrase-adjective';
import { companyCatchPhraseDescriptor } from './catch-phrase-descriptor';
import { companyCatchPhraseNoun } from './catch-phrase-noun';

/**
 * Generates a random catch phrase that can be displayed to an end user.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * companyCatchPhrase(fakerCore) // 'Upgradable systematic flexibility'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function companyCatchPhrase(fakerCore: FakerCore): string {
  return [
    companyCatchPhraseAdjective(fakerCore),
    companyCatchPhraseDescriptor(fakerCore),
    companyCatchPhraseNoun(fakerCore),
  ].join(' ');
}
