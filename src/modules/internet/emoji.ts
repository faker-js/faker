import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';

/**
 * Generates a random emoji.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Options object.
 * @param options.types A list of the emoji types that should be included. Possible values are `'smiley'`, `'body'`, `'person'`, `'nature'`, `'food'`, `'travel'`, `'activity'`, `'object'`, `'symbol'`, `'flag'`. By default, emojis from any type will be included.
 *
 * @example
 * emoji(fakerCore) // '🥰'
 * emoji(fakerCore, { types: ['food', 'nature'] }) // '🥐'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function emoji(
  fakerCore: FakerCore,
  options: {
    /**
     * A list of the emoji types that should be used.
     *
     * @default Object.keys(faker.definitions.internet.emoji)
     */
    types?: ReadonlyArray<EmojiType>;
  } = {}
): string {
  const {
    types = Object.keys(fakerCore.locale.internet.emoji) as EmojiType[],
  } = options;
  const emojiType = arrayElement(fakerCore, types);
  return arrayElement(fakerCore, fakerCore.locale.internet.emoji[emojiType]);
}
