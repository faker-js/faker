import type { FakerCore } from '../../core';
import { arrayElement } from '../helpers/array-element';
import { email } from './email';

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
 * exampleEmail(fakerCore) // 'Helmer.Graham23@example.com'
 * exampleEmail(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne96@example.net'
 * exampleEmail(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne.Smith96@example.net'
 * exampleEmail(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne_Doe96@example.net'
 * exampleEmail(fakerCore, { firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function exampleEmail(
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

  const provider = arrayElement(
    fakerCore,
    fakerCore.locale.internet.example_email
  );

  return email(fakerCore, {
    firstName,
    lastName,
    provider,
    allowSpecialCharacters,
  });
}
