import type { FakerCore } from '../../core';
import { Faker } from '../../faker';

/**
 * Generates a random user agent string.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * userAgent(fakerCore)
 * // 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1 like Mac OS X) AppleWebKit/537.19.86 (KHTML, like Gecko) Version/18_3 Mobile/15E148 Safari/598.43'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function userAgent(fakerCore: FakerCore): string {
  return new Faker(fakerCore).helpers.fake(
    fakerCore.locale.internet.user_agent_pattern
  );
}
