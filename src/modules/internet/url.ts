import type { FakerCore } from '../../core';
import { boolean } from '../datatype/boolean';
import { domainName } from './domain-name';

/**
 * Generates a random http(s) url.
 *
 * @param fakerCore The FakerCore to use.
 * @param options Optional options object.
 * @param options.appendSlash Whether to append a slash to the end of the url (path). Defaults to a random boolean value.
 * @param options.protocol The protocol to use. Defaults to `'https'`.
 *
 * @example
 * url(fakerCore) // 'https://remarkable-hackwork.info'
 * url(fakerCore, { appendSlash: true }) // 'https://slow-timer.info/'
 * url(fakerCore, { protocol: 'http', appendSlash: false }) // 'http://www.terrible-idea.com'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function url(
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
  const { appendSlash = boolean(fakerCore), protocol = 'https' } = options;
  return `${protocol}://${domainName(fakerCore)}${appendSlash ? '/' : ''}`;
}
