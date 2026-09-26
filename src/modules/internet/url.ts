import type { FakerCore } from '../../core';
import { datatypeBoolean } from '../datatype/boolean';
import { internetDomainName } from './domain-name';

export type HTTPProtocolType = 'http' | 'https';

/**
 * Generates a random http(s) url.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Optional options object.
 * @param options.appendSlash Whether to append a slash to the end of the url (path). Defaults to a random boolean value.
 * @param options.protocol The protocol to use. Defaults to `'https'`.
 *
 * @example
 * internetUrl(fakerCore) // 'https://remarkable-hackwork.info'
 * internetUrl(fakerCore, { appendSlash: true }) // 'https://slow-timer.info/'
 * internetUrl(fakerCore, { protocol: 'http', appendSlash: false }) // 'http://www.terrible-idea.com'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetUrl(
  fakerCore: FakerCore,
  options: {
    /**
     * Whether to append a slash to the end of the url (path).
     *
     * @default datatypeBoolean(fakerCore)
     */
    appendSlash?: boolean;
    /**
     * The protocol to use.
     *
     * @default 'https'
     */
    protocol?: HTTPProtocolType;
  } = {}
): string {
  const { appendSlash = datatypeBoolean(fakerCore), protocol = 'https' } = options;
  return `${protocol}://${internetDomainName(fakerCore)}${appendSlash ? '/' : ''}`;
}
