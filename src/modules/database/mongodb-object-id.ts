import type { FakerCore } from '../../core';
import { stringHexadecimal } from '../string/hexadecimal';

/**
 * Returns a MongoDB [ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/) string.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * databaseMongodbObjectId(fakerCore) // 'e175cac316a79afdd0ad3afb'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function databaseMongodbObjectId(fakerCore: FakerCore): string {
  return stringHexadecimal(fakerCore, {
    length: 24,
    casing: 'lower',
    prefix: '',
  });
}
