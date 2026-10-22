import type { FakerCore } from '../../core';
import { fakeStringHexadecimal } from '../string/hexadecimal';

/**
 * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeDatabaseMongodbObjectId(fakerCore) // 'e175cac316a79afdd0ad3afb'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeDatabaseMongodbObjectId(fakerCore: FakerCore): string {
  return fakeStringHexadecimal(fakerCore, {
    length: 24,
    casing: 'lower',
    prefix: '',
  });
}
