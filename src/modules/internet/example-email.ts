import type { FakerCore } from '../../core';
import { fakeHelpersArrayElement } from '../helpers/array-element';
import { fakeInternetEmail } from './email';

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
 * fakeInternetExampleEmail(fakerCore) // 'Helmer.Graham23@example.com'
 * fakeInternetExampleEmail(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne96@example.net'
 * fakeInternetExampleEmail(fakerCore, { firstName: 'Jeanne' }) // 'Jeanne.Smith96@example.net'
 * fakeInternetExampleEmail(fakerCore, { firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne_Doe96@example.net'
 * fakeInternetExampleEmail(fakerCore, { firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
 *
 * @since 11.0.0
 *
 * @experimental
 */
export function fakeInternetExampleEmail(
  fakerCore: FakerCore,
  options: {
    /**
     * The optional first name to use.
     *
     * @default fakePersonFirstName(fakerCore)
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default fakePersonLastName(fakerCore)
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

  const provider = fakeHelpersArrayElement(
    fakerCore,
    fakerCore.locale.internet.example_email
  );

  return fakeInternetEmail(fakerCore, {
    firstName,
    lastName,
    provider,
    allowSpecialCharacters,
  });
}
