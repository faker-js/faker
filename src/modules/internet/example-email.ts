import type { FakerCore } from '../../core';
import { helpersArrayElement } from '../helpers/array-element';
import { internetEmail } from './email';

/**
 * Generates an email address using an example mail provider using the given person's name as base.
 *
 * @param fakerCore The FakerCore to use.
 * @param options An options object.
 * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
 * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
 * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
 * in the email address. Defaults to `false`.
 *
 * @example
 * internetExampleEmail(fakerCore) // 'Helmer.Graham23@example.com'
 * internetExampleEmail(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne96@example.net'
 * internetExampleEmail(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne.Smith96@example.net'
 * internetExampleEmail(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne_Doe96@example.net'
 * internetExampleEmail(fakerCore, { firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function internetExampleEmail(
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
     * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
     *
     * @default false
     */
    allowSpecialCharacters?: boolean;
  } = {}
): string {
  const { firstName, lastName, allowSpecialCharacters = false } = options;

  const provider = helpersArrayElement(
    fakerCore,
    fakerCore.locale.internet.example_email
  );

  return internetEmail(fakerCore, {
    firstName,
    lastName,
    provider,
    allowSpecialCharacters,
  });
}
