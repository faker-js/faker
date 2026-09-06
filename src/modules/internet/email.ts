import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { username } from './username';

/**
 * Generates an email address using the given person's name as base.
 *
 * @param fakerCore The FakerCore to use.
 * @param options The options to use.
 * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
 * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
 * @param options.provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
 * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
 * in the email address. Defaults to `false`.
 *
 * @example
 * email(fakerCore) // 'Kassandra4@hotmail.com'
 * email(fakerCore, { firstName: 'Jeanne'}) // 'Jeanne63@yahoo.com'
 * email(fakerCore, { firstName: 'Jeanne'}) // 'Jeanne_Smith63@yahoo.com'
 * email(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne.Doe63@yahoo.com'
 * email(fakerCore, { firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev' }) // 'Jeanne_Doe88@example.fakerjs.dev'
 * email(fakerCore, { firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function email(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use.
     *
     * @default personFirstName(fakerCore)
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default personLastName(fakerCore)
     */
    lastName?: string;
    /**
     * The mail provider domain to use. If not specified, a random free mail provider will be chosen.
     */
    provider?: string;
    /**
     * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
     *
     * @default false
     */
    allowSpecialCharacters?: boolean;
  } = {}
): string {
  const {
    firstName,
    lastName,
    provider = arrayElement(fakerCore, fakerCore.locale.internet.free_email),
    allowSpecialCharacters = false,
  } = options;

  let localPart: string = username(fakerCore, { firstName, lastName });
  // Strip any special characters from the local part of the email address
  // This could happen if invalid chars are passed in manually in the firstName/lastName
  localPart = localPart.replaceAll(/[^A-Za-z0-9._+-]+/g, '');

  // The local part of an email address is limited to 64 chars per RFC 3696
  // We limit to 50 chars to be more realistic
  localPart = localPart.substring(0, 50);
  if (allowSpecialCharacters) {
    const usernameChars: string[] = [...'._-'];
    const specialChars: string[] = [...".!#$%&'*+-/=?^_`{|}~"];
    localPart = localPart.replace(
      arrayElement(fakerCore, usernameChars),
      arrayElement(fakerCore, specialChars)
    );
  }

  // local parts may not contain two or more consecutive . characters
  localPart = localPart.replaceAll(/\.{2,}/g, '.');

  // local parts may not start with or end with a . character
  localPart = localPart.replace(/^\./, '');
  localPart = localPart.replace(/\.$/, '');

  return `${localPart}@${provider}`;
}
