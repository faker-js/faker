import type { FakerCore } from '../../core';
import { getFakerForCore } from '../../internal/faker-for-core';

/**
 * Generates a random user agent string.
 *
 * @param fakerCore The FakerCore to use.
 *
 * @example
 * fakeInternetUserAgent(fakerCore)
 * // 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1 like Mac OS X) AppleWebKit/537.19.86 (KHTML, like Gecko) Version/18_3 Mobile/15E148 Safari/598.43'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetUserAgent(fakerCore: FakerCore): string {
  return getFakerForCore(fakerCore).helpers.fake(
    fakerCore.locale.internet.user_agent_pattern
  );
}
