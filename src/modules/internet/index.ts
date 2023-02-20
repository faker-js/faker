import type { Faker } from '../..';
import { charMapping } from './char-mappings';
import * as random_ua from './user-agent';

export type EmojiType =
  | 'smiley'
  | 'body'
  | 'person'
  | 'nature'
  | 'food'
  | 'travel'
  | 'activity'
  | 'object'
  | 'symbol'
  | 'flag';

export type HTTPStatusCodeType =
  | 'informational'
  | 'success'
  | 'clientError'
  | 'serverError'
  | 'redirection';

export type HTTPProtocolType = 'http' | 'https';

/**
 * Module to generate internet related entries.
 */
export class InternetModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(InternetModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random avatar url.
   *
   * @example
   * faker.internet.avatar()
   * // 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/315.jpg'
   *
   * @since 2.0.1
   */
  avatar(): string {
    return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.number.int(
      1249
    )}.jpg`;
  }

  /**
   * Generates an email address using the given person's name as base.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param options The options to use. Defaults to `{ allowSpecialCharacters: false }`.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.email() // 'Kassandra4@hotmail.com'
   * faker.internet.email('Jeanne', 'Doe') // 'Jeanne63@yahoo.com'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev') // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev', { allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   *
   * @since 2.0.1
   */
  email(
    firstName?: string,
    lastName?: string,
    provider?: string,
    options?: {
      /**
       * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
       *
       * @default false
       */
      allowSpecialCharacters?: boolean;
    }
  ): string;
  /**
   * Generates an email address using the given person's name as base.
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.email() // 'Kassandra4@hotmail.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne63@yahoo.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev' }) // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   *
   * @since 2.0.1
   */
  email(options?: {
    /**
     * The optional first name to use.
     *
     * @default faker.person.firstName()
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default faker.person.lastName()
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
  }): string;
  /**
   * Generates an email address using the given person's name as base.
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   * @param legacyLastName The optional last name to use. If not specified, a random one will be chosen.
   * @param legacyProvider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param legacyOptions The options to use. Defaults to `{ allowSpecialCharacters: false }`.
   * @param legacyOptions.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.email() // 'Kassandra4@hotmail.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne63@yahoo.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev' }) // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   * faker.internet.email('Jeanne', 'Doe') // 'Jeanne63@yahoo.com'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev') // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev', { allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   *
   * @since 2.0.1
   */
  email(
    options?:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
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
        },
    legacyLastName?: string,
    legacyProvider?: string,
    legacyOptions?: {
      /**
       * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
       *
       * @default false
       */
      allowSpecialCharacters?: boolean;
    }
  ): string;
  /**
   * Generates an email address using the given person's name as base.
   *
   * @param options The options to use. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   * @param legacyLastName The optional last name to use. If not specified, a random one will be chosen.
   * @param legacyProvider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param legacyOptions The options to use. Defaults to `{ allowSpecialCharacters: false }`.
   * @param legacyOptions.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.email() // 'Kassandra4@hotmail.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne63@yahoo.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev' }) // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   * faker.internet.email('Jeanne', 'Doe') // 'Jeanne63@yahoo.com'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev') // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev', { allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   *
   * @since 2.0.1
   */
  email(
    options:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
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
        } = {},
    legacyLastName: string = this.faker.person.lastName(),
    legacyProvider: string = this.faker.helpers.arrayElement(
      this.faker.definitions.internet.free_email
    ),
    legacyOptions: {
      /**
       * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
       *
       * @default false
       */
      allowSpecialCharacters?: boolean;
    } = {}
  ): string {
    if (typeof options === 'string') {
      options = { firstName: options };
    }

    const {
      firstName = this.faker.person.firstName(),
      lastName = legacyLastName,
      provider = legacyProvider,
      allowSpecialCharacters = legacyOptions.allowSpecialCharacters ?? false,
    } = options;

    let localPart: string = this.userName(firstName, lastName);
    // Strip any special characters from the local part of the email address
    // This could happen if invalid chars are passed in manually in the firstName/lastName
    localPart = localPart.replace(/[^A-Za-z0-9._+\-]+/g, '');

    // The local part of an email address is limited to 64 chars per RFC 3696
    // We limit to 50 chars to be more realistic
    localPart = localPart.substring(0, 50);
    if (allowSpecialCharacters) {
      const usernameChars: string[] = '._-'.split('');
      const specialChars: string[] = ".!#$%&'*+-/=?^_`{|}~".split('');
      localPart = localPart.replace(
        this.faker.helpers.arrayElement(usernameChars),
        this.faker.helpers.arrayElement(specialChars)
      );
    }

    return `${localPart}@${provider}`;
  }

  /**
   * Generates an email address using an example mail provider using the given person's name as base.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.exampleEmail() // 'Helmer.Graham23@example.com'
   * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne96@example.net'
   * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
   *
   * @since 3.1.0
   */
  exampleEmail(options?: {
    /**
     * The optional first name to use.
     *
     * @default faker.person.firstName()
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default faker.person.lastName()
     */
    lastName?: string;
    /**
     * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
     *
     * @default false
     */
    allowSpecialCharacters?: boolean;
  }): string;
  /**
   * Generates an email address using an example mail provider using the given person's name as base.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options The options to use. Defaults to `{ allowSpecialCharacters: false }`.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.exampleEmail() // 'Helmer.Graham23@example.com'
   * faker.internet.exampleEmail('Jeanne', 'Doe') // 'Jeanne96@example.net'
   * faker.internet.exampleEmail('Jeanne', 'Doe', { allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
   *
   * @since 3.1.0
   */
  exampleEmail(
    firstName?: string,
    lastName?: string,
    options?: {
      /**
       * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
       *
       * @default false
       */
      allowSpecialCharacters?: boolean;
    }
  ): string;
  /**
   * Generates an email address using an example mail provider using the given person's name as base.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   * @param legacyLastName The optional last name to use. If not specified, a random one will be chosen.
   * @param legacyOptions The options to use. Defaults to `{}`.
   * @param legacyOptions.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.exampleEmail() // 'Helmer.Graham23@example.com'
   * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne96@example.net'
   * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
   * faker.internet.exampleEmail('Jeanne', 'Doe', { allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
   *
   * @since 3.1.0
   */
  exampleEmail(
    options?:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
           */
          lastName?: string;
          /**
           * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
           *
           * @default false
           */
          allowSpecialCharacters?: boolean;
        },
    legacyLastName?: string,
    legacyOptions?: {
      /**
       * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
       *
       * @default false
       */
      allowSpecialCharacters?: boolean;
    }
  ): string;
  exampleEmail(
    options:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
           */
          lastName?: string;
          /**
           * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
           *
           * @default false
           */
          allowSpecialCharacters?: boolean;
        } = {},
    legacyLastName: string = this.faker.person.lastName(),
    legacyOptions: {
      /**
       * Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included in the email address.
       *
       * @default false
       */
      allowSpecialCharacters?: boolean;
    } = {}
  ): string {
    if (typeof options === 'string') {
      options = { firstName: options };
    }

    const {
      firstName = this.faker.person.firstName(),
      lastName = legacyLastName,
      allowSpecialCharacters = legacyOptions.allowSpecialCharacters ?? false,
    } = options;

    const provider = this.faker.helpers.arrayElement(
      this.faker.definitions.internet.example_email
    );

    return this.email({
      firstName,
      lastName,
      provider,
      allowSpecialCharacters,
    });
  }

  /**
   * Generates a username using the given person's name as base.
   * The resuling username may use neither, one or both of the names provided.
   * This will always return a plain ASCII string.
   * Some basic stripping of accents and transliteration of characters will be done.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.displayName()
   *
   * @example
   * faker.internet.userName() // 'Nettie_Zboncak40'
   * faker.internet.userName({ firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne98' - note surname is not used
   * faker.internet.userName({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
   * faker.internet.userName({ firstName: 'Hélene', lastName: 'Müller' }) // 'Helene_Muller11'
   * faker.internet.userName({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Fedor.Dostoevskii50'
   * faker.internet.userName({ firstName: '大羽', lastName: '陳' }) // 'hlzp8d.tpv45' - note neither name is used
   *
   * @since 2.0.1
   */
  userName(options?: {
    /**
     * The optional first name to use.
     *
     * @default faker.person.firstName()
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default faker.person.lastName()
     */
    lastName?: string;
  }): string;
  /**
   * Generates a username using the given person's name as base.
   * The resuling username may use neither, one or both of the names provided.
   * This will always return a plain ASCII string.
   * Some basic stripping of accents and transliteration of characters will be done.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.displayName()
   *
   * @example
   * faker.internet.userName() // 'Nettie_Zboncak40'
   * faker.internet.userName('Jeanne', 'Doe') // 'Jeanne98' - note surname is not used
   * faker.internet.userName('John', 'Doe') // 'John.Doe'
   * faker.internet.userName('Hélene', 'Müller') // 'Helene_Muller11'
   * faker.internet.userName('Фёдор', 'Достоевский') // 'Fedor.Dostoevskii50'
   * faker.internet.userName('大羽', '陳') // 'hlzp8d.tpv45' - note neither name is used
   *
   * @since 2.0.1
   */
  userName(firstName?: string, lastName?: string): string;
  /**
   * Generates a username using the given person's name as base.
   * The resuling username may use neither, one or both of the names provided.
   * This will always return a plain ASCII string.
   * Some basic stripping of accents and transliteration of characters will be done.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param legacyLastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.displayName()
   *
   * @example
   * faker.internet.userName() // 'Nettie_Zboncak40'
   * faker.internet.userName({ firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne98' - note surname is not used
   * faker.internet.userName({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
   * faker.internet.userName({ firstName: 'Hélene', lastName: 'Müller' }) // 'Helene_Muller11'
   * faker.internet.userName({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Fedor.Dostoevskii50'
   * faker.internet.userName({ firstName: '大羽', lastName: '陳' }) // 'hlzp8d.tpv45' - note neither name is used
   * faker.internet.userName('Jeanne', 'Doe') // 'Jeanne98' - note surname is not used
   * faker.internet.userName('John', 'Doe') // 'John.Doe'
   * faker.internet.userName('Hélene', 'Müller') // 'Helene_Muller11'
   * faker.internet.userName('Фёдор', 'Достоевский') // 'Fedor.Dostoevskii50'
   * faker.internet.userName('大羽', '陳') // 'hlzp8d.tpv45' - note neither name is used
   *
   * @since 2.0.1
   */
  userName(
    options?:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
           */
          lastName?: string;
        },
    legacyLastName?: string
  ): string;
  userName(
    options:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
           */
          lastName?: string;
        } = {},
    legacyLastName: string = this.faker.person.lastName()
  ): string {
    if (typeof options === 'string') {
      options = { firstName: options };
    }

    const {
      firstName = this.faker.person.firstName(),
      lastName = legacyLastName,
    } = options;

    let result: string;
    switch (this.faker.number.int(2)) {
      case 0:
        result = `${firstName}${this.faker.number.int(99)}`;
        break;
      case 1:
        result =
          firstName + this.faker.helpers.arrayElement(['.', '_']) + lastName;
        break;
      case 2:
        result = `${firstName}${this.faker.helpers.arrayElement([
          '.',
          '_',
        ])}${lastName}${this.faker.number.int(99)}`;
        break;
    }

    // There may still be non-ascii characters in the result.
    // First remove simple accents etc
    result = result
      .normalize('NFKD') //for example è decomposes to as e +  ̀
      .replace(/[\u0300-\u036f]/g, ''); // removes combining marks

    result = result
      .split('')
      .map((char) => {
        // If we have a mapping for this character, (for Cyrillic, Greek etc) use it
        if (charMapping[char]) {
          return charMapping[char];
        }

        if (char.charCodeAt(0) < 0x80) {
          // Keep ASCII characters
          return char;
        }

        // Final fallback return the Unicode char code value for Chinese, Japanese, Korean etc, base-36 encoded
        return char.charCodeAt(0).toString(36);
      })
      .join('');
    result = result.toString().replace(/'/g, '');
    result = result.replace(/ /g, '');

    return result;
  }

  /**
   * Generates a display name using the given person's name as base.
   * The resulting display name may use one or both of the provided names.
   * If the input names include Unicode characters, the resulting display name will contain Unicode characters.
   * It will not contain spaces.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.userName()
   *
   * @example
   * faker.internet.displayName() // 'Nettie_Zboncak40'
   * faker.internet.displayName({ firstname 'Jeanne', lastName: 'Doe' }) // 'Jeanne98' - note surname not used.
   * faker.internet.displayName({ firstname 'John', lastName: 'Doe' }) // 'John.Doe'
   * faker.internet.displayName({ firstname 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
   * faker.internet.displayName({ firstname 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
   * faker.internet.displayName({ firstname '大羽', lastName: '陳' }) // '大羽.陳'
   *
   * @since 8.0.0
   */
  displayName(options?: {
    /**
     * The optional first name to use.
     *
     * @default faker.person.firstName()
     */
    firstName?: string;
    /**
     * The optional last name to use.
     *
     * @default faker.person.lastName()
     */
    lastName?: string;
  }): string;
  /**
   * Generates a display name using the given person's name as base.
   * The resulting display name may use one or both of the provided names.
   * If the input names include Unicode characters, the resulting display name will contain Unicode characters.
   * It will not contain spaces.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.userName()
   *
   * @example
   * faker.internet.displayName() // 'Nettie_Zboncak40'
   * faker.internet.displayName('Jeanne', 'Doe') // 'Jeanne98' - note surname is not used
   * faker.internet.displayName('John', 'Doe') // 'John.Doe'
   * faker.internet.displayName('Hélene', 'Müller') // 'Hélene_Müller11'
   * faker.internet.displayName('Фёдор', 'Достоевский') // 'Фёдор.Достоевский50'
   * faker.internet.displayName('大羽', '陳') // '大羽.陳'
   *
   * @since 8.0.0
   */
  displayName(firstName?: string, lastName?: string): string;
  /**
   * Generates a display name using the given person's name as base.
   * The resulting display name may use one or both of the provided names.
   * If the input names include Unicode characters, the resulting display name will contain Unicode characters.
   * It will not contain spaces.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param legacyLastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.userName()
   *
   * @example
   * faker.internet.displayName() // 'Nettie_Zboncak40'
   * faker.internet.displayName({ firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne98' - note surname is not used
   * faker.internet.displayName({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
   * faker.internet.displayName({ firstName: 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
   * faker.internet.displayName({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
   * faker.internet.displayName({ firstName: '大羽', lastName: '陳' }) // '大羽.陳'
   * faker.internet.displayName('Jeanne', 'Doe') // 'Jeanne98' - note surname is not used
   * faker.internet.displayName('John', 'Doe') // 'John.Doe'
   * faker.internet.displayName('Hélene', 'Müller') // 'Hélene_Müller11'
   * faker.internet.displayName('Фёдор', 'Достоевский') // 'Фёдор.Достоевский50'
   * faker.internet.displayName('大羽', '陳') // '大羽.陳'
   *
   * @since 8.0.0
   */
  displayName(
    options?:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
           */
          lastName?: string;
        },
    legacyLastName?: string
  ): string;
  displayName(
    options:
      | string
      | {
          /**
           * The optional first name to use.
           *
           * @default faker.person.firstName()
           */
          firstName?: string;
          /**
           * The optional last name to use.
           *
           * @default faker.person.lastName()
           */
          lastName?: string;
        } = {},
    legacyLastName: string = this.faker.person.lastName()
  ): string {
    if (typeof options === 'string') {
      options = { firstName: options };
    }

    const {
      firstName = this.faker.person.firstName(),
      lastName = legacyLastName,
    } = options;

    let result: string;
    switch (this.faker.number.int(2)) {
      case 0:
        result = `${firstName}${this.faker.number.int(99)}`;
        break;
      case 1:
        result =
          firstName + this.faker.helpers.arrayElement(['.', '_']) + lastName;
        break;
      case 2:
        result = `${firstName}${this.faker.helpers.arrayElement([
          '.',
          '_',
        ])}${lastName}${this.faker.number.int(99)}`;
        break;
    }

    result = result.toString().replace(/'/g, '');
    result = result.replace(/ /g, '');
    return result;
  }

  /**
   * Returns a random web protocol. Either `http` or `https`.
   *
   * @example
   * faker.internet.protocol() // 'http'
   * faker.internet.protocol() // 'https'
   *
   * @since 2.1.5
   */
  protocol(): 'http' | 'https' {
    const protocols: ['http', 'https'] = ['http', 'https'];
    return this.faker.helpers.arrayElement(protocols);
  }

  /**
   * Returns a random http method.
   *
   * Can be either of the following:
   *
   * - `GET`
   * - `POST`
   * - `PUT`
   * - `DELETE`
   * - `PATCH`
   *
   * @example
   * faker.internet.httpMethod() // 'PATCH'
   *
   * @since 5.4.0
   */
  httpMethod(): 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' {
    const httpMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] = [
      'GET',
      'POST',
      'PUT',
      'DELETE',
      'PATCH',
    ];
    return this.faker.helpers.arrayElement(httpMethods);
  }

  /**
   * Generates a random HTTP status code.
   *
   * @param options Options object.
   * @param options.types A list of the HTTP status code types that should be used.
   *
   * @example
   * faker.internet.httpStatusCode() // 200
   * faker.internet.httpStatusCode({ types: ['success', 'serverError'] }) // 500
   *
   * @since 7.0.0
   */
  httpStatusCode(
    options: {
      /**
       * A list of the HTTP status code types that should be used.
       *
       * @default Object.keys(faker.definitions.internet.http_status_code)
       */
      types?: ReadonlyArray<HTTPStatusCodeType>;
    } = {}
  ): number {
    const {
      types = Object.keys(
        this.faker.definitions.internet.http_status_code
      ) as HTTPStatusCodeType[],
    } = options;
    const httpStatusCodeType = this.faker.helpers.arrayElement(types);
    return this.faker.helpers.arrayElement(
      this.faker.definitions.internet.http_status_code[httpStatusCodeType]
    );
  }

  /**
   * Generates a random http(s) url.
   *
   * @param options Optional options object.
   * @param options.appendSlash Whether to append a slash to the end of the url (path). Defaults to a random boolean value.
   * @param options.protocol The protocol to use. Defaults to `'https'`.
   *
   * @example
   * faker.internet.url() // 'https://remarkable-hackwork.info'
   * faker.internet.url({ appendSlash: true }) // 'https://slow-timer.info/'
   * faker.internet.url({ protocol: 'http', appendSlash: false }) // 'http://www.terrible-idea.com'
   *
   * @since 2.1.5
   */
  url(
    options: {
      /**
       * Whether to append a slash to the end of the url (path).
       *
       * @default faker.datatype.boolean()
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
    const { appendSlash = this.faker.datatype.boolean(), protocol = 'https' } =
      options;
    return `${protocol}://${this.domainName()}${appendSlash ? '/' : ''}`;
  }

  /**
   * Generates a random domain name.
   *
   * @example
   * faker.internet.domainName() // 'slow-timer.info'
   *
   * @since 2.0.1
   */
  domainName(): string {
    return `${this.domainWord()}.${this.domainSuffix()}`;
  }

  /**
   * Returns a random domain suffix.
   *
   * @example
   * faker.internet.domainSuffix() // 'com'
   * faker.internet.domainSuffix() // 'name'
   *
   * @since 2.0.1
   */
  domainSuffix(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.internet.domain_suffix
    );
  }

  /**
   * Generates a random domain word.
   *
   * @example
   * faker.internet.domainWord() // 'close-reality'
   * faker.internet.domainWord() // 'weird-cytoplasm'
   *
   * @since 2.0.1
   */
  domainWord(): string {
    return this.faker.helpers
      .slugify(`${this.faker.word.adjective()}-${this.faker.word.noun()}`)
      .toLowerCase();
  }

  /**
   * Generates a random IPv4 or IPv6 address.
   *
   * @example
   * faker.internet.ip() // '245.108.222.0'
   * faker.internet.ip() // '4e5:f9c5:4337:abfd:9caf:1135:41ad:d8d3'
   *
   * @since 2.0.1
   */
  ip(): string {
    return this.faker.datatype.boolean() ? this.ipv4() : this.ipv6();
  }

  /**
   * Generates a random IPv4 address.
   *
   * @example
   * faker.internet.ipv4() // '245.108.222.0'
   *
   * @since 6.1.1
   */
  ipv4(): string {
    return Array.from({ length: 4 }, () => this.faker.number.int(255)).join(
      '.'
    );
  }

  /**
   * Generates a random IPv6 address.
   *
   * @example
   * faker.internet.ipv6() // '269f:1230:73e3:318d:842b:daab:326d:897b'
   *
   * @since 4.0.0
   */
  ipv6(): string {
    return Array.from({ length: 8 }, () =>
      this.faker.string.hexadecimal({
        length: 4,
        casing: 'lower',
        prefix: '',
      })
    ).join(':');
  }

  /**
   * Generates a random port number.
   *
   * @example
   * faker.internet.port() // '9414'
   *
   * @since 5.4.0
   */
  port(): number {
    return this.faker.number.int(65535);
  }

  /**
   * Generates a random user agent string.
   *
   * @example
   * faker.internet.userAgent()
   * // 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_8)  AppleWebKit/536.0.2 (KHTML, like Gecko) Chrome/27.0.849.0 Safari/536.0.2'
   *
   * @since 2.0.1
   */
  userAgent(): string {
    return random_ua.generate(this.faker);
  }

  /**
   * Generates a random css hex color code in aesthetically pleasing color palette.
   *
   * Based on
   * http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.redBase The optional base red in range between `0` and `255`. Defaults to `0`.
   * @param options.greenBase The optional base green in range between `0` and `255`. Defaults to `0`.
   * @param options.blueBase The optional base blue in range between `0` and `255`. Defaults to `0`.
   *
   * @example
   * faker.internet.color() // '#30686e'
   * faker.internet.color({ redBase: 100, greenBase: 100, blueBase: 100 }) // '#4e5f8b'
   *
   * @since 2.0.1
   */
  color(options?: {
    /**
     * The optional base red in range between `0` and `255`.
     *
     * @default 0
     */
    redBase?: number;
    /**
     * The optional base green in range between `0` and `255`.
     *
     * @default 0
     */
    greenBase?: number;
    /**
     * The optional base blue in range between `0` and `255`.
     *
     * @default 0
     */
    blueBase?: number;
  }): string;
  /**
   * Generates a random css hex color code in aesthetically pleasing color palette.
   *
   * Based on
   * http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
   *
   * @param redBase The optional base red in range between `0` and `255`. Defaults to `0`.
   * @param greenBase The optional base green in range between `0` and `255`. Defaults to `0`.
   * @param blueBase The optional base blue in range between `0` and `255`. Defaults to `0`.
   *
   * @example
   * faker.internet.color() // '#30686e'
   * faker.internet.color(100, 100, 100) // '#4e5f8b'
   *
   * @since 2.0.1
   */
  color(redBase?: number, greenBase?: number, blueBase?: number): string;
  /**
   * Generates a random css hex color code in aesthetically pleasing color palette.
   *
   * Based on
   * http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.redBase The optional base red in range between `0` and `255`. Defaults to `0`.
   * @param options.greenBase The optional base green in range between `0` and `255`. Defaults to `0`.
   * @param options.blueBase The optional base blue in range between `0` and `255`. Defaults to `0`.
   * @param legacyGreenBase The optional base green in range between `0` and `255`. Defaults to `0`.
   * @param legacyBlueBase The optional base blue in range between `0` and `255`. Defaults to `0`.
   *
   * @example
   * faker.internet.color() // '#30686e'
   * faker.internet.color({ redBase: 100, greenBase: 100, blueBase: 100 }) // '#4e5f8b'
   * faker.internet.color(100, 100, 100) // '#4e5f8b'
   *
   * @since 2.0.1
   */
  color(
    options?:
      | number
      | {
          /**
           * The optional base red in range between `0` and `255`.
           *
           * @default 0
           */
          redBase?: number;
          /**
           * The optional base green in range between `0` and `255`.
           *
           * @default 0
           */
          greenBase?: number;
          /**
           * The optional base blue in range between `0` and `255`.
           *
           * @default 0
           */
          blueBase?: number;
        },
    legacyGreenBase?: number,
    legacyBlueBase?: number
  ): string;
  color(
    options:
      | number
      | {
          /**
           * The optional base red in range between `0` and `255`.
           *
           * @default 0
           */
          redBase?: number;
          /**
           * The optional base green in range between `0` and `255`.
           *
           * @default 0
           */
          greenBase?: number;
          /**
           * The optional base blue in range between `0` and `255`.
           *
           * @default 0
           */
          blueBase?: number;
        } = {},
    legacyGreenBase: number = 0,
    legacyBlueBase: number = 0
  ): string {
    if (typeof options === 'number') {
      options = { redBase: options };
    }

    const {
      redBase = 0,
      greenBase = legacyGreenBase,
      blueBase = legacyBlueBase,
    } = options;

    const colorFromBase = (base: number): string =>
      Math.floor((this.faker.number.int(256) + base) / 2)
        .toString(16)
        .padStart(2, '0');

    const red = colorFromBase(redBase);
    const green = colorFromBase(greenBase);
    const blue = colorFromBase(blueBase);

    return `#${red}${green}${blue}`;
  }

  /**
   * Generates a random mac address.
   *
   * @param options An options object. Defaults to `{}`.
   * @param separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
   *
   * @example
   * faker.internet.mac() // '32:8e:2e:09:c6:05'
   *
   * @since 3.0.0
   */
  mac(options?: {
    /**
     * The optional separator to use. Can be either `':'`, `'-'` or `''`.
     *
     * @default ':'
     */
    separator?: string;
  }): string;
  /**
   * Generates a random mac address.
   *
   * @param sep The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
   *
   * @example
   * faker.internet.mac() // '32:8e:2e:09:c6:05'
   *
   * @since 3.0.0
   */
  mac(sep?: string): string;
  /**
   * Generates a random mac address.
   *
   * @param options The optional separator or an options object. Defaults to `{}`.
   * @param separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
   *
   * @example
   * faker.internet.mac() // '32:8e:2e:09:c6:05'
   *
   * @since 3.0.0
   */
  mac(
    options?:
      | string
      | {
          /**
           * The optional separator to use. Can be either `':'`, `'-'` or `''`.
           *
           * @default ':'
           */
          separator?: string;
        }
  ): string;
  mac(
    options:
      | string
      | {
          /**
           * The optional separator to use. Can be either `':'`, `'-'` or `''`.
           *
           * @default ':'
           */
          separator?: string;
        } = {}
  ): string {
    if (typeof options === 'string') {
      options = { separator: options };
    }

    let { separator = ':' } = options;

    let i: number;
    let mac = '';

    const acceptableSeparators = [':', '-', ''];
    if (!acceptableSeparators.includes(separator)) {
      separator = ':';
    }

    for (i = 0; i < 12; i++) {
      mac += this.faker.number.hex(15);
      if (i % 2 === 1 && i !== 11) {
        mac += separator;
      }
    }

    return mac;
  }

  /**
   * Generates a random password.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.length The length of the password to generate. Defaults to `15`.
   * @param options.memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param options.pattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param options.prefix The prefix to use. Defaults to `''`.
   *
   * @example
   * faker.internet.password() // '89G1wJuBLbGziIs'
   * faker.internet.password({ length: 20 }) // 'aF55c_8O9kZaPOrysFB_'
   * faker.internet.password({ length: 20, memorable: true }) // 'lawetimufozujosodedi'
   * faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/ }) // 'HMAQDFFYLDDUTBKVNFVS'
   * faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' }) // 'Hello IREOXTDWPERQSB'
   *
   * @since 2.0.1
   */
  password(options?: {
    /**
     * The length of the password to generate.
     *
     * @default 15
     */
    length?: number;
    /**
     * Whether the generated password should be memorable.
     *
     * @default false
     */
    memorable?: boolean;
    /**
     * The pattern that all chars should match should match.
     * This option will be ignored, if `memorable` is `true`.
     *
     * @default /\w/
     */
    pattern?: RegExp;
    /**
     * The prefix to use.
     *
     * @default ''
     */
    prefix?: string;
  }): string;
  /**
   * Generates a random password.
   *
   * @param len The length of the password to generate. Defaults to `15`.
   * @param memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param pattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param prefix The prefix to use. Defaults to `''`.
   *
   * @example
   * faker.internet.password() // '89G1wJuBLbGziIs'
   * faker.internet.password(20) // 'aF55c_8O9kZaPOrysFB_'
   * faker.internet.password(20, true) // 'lawetimufozujosodedi'
   * faker.internet.password(20, true, /[A-Z]/) // 'HMAQDFFYLDDUTBKVNFVS'
   * faker.internet.password(20, true, /[A-Z]/, 'Hello ') // 'Hello IREOXTDWPERQSB'
   *
   * @since 2.0.1
   */
  password(
    len?: number,
    memorable?: boolean,
    pattern?: RegExp,
    prefix?: string
  ): string;
  /**
   * Generates a random password.
   *
   * @param options The length of the password or an options object. Defaults to `{}`.
   * @param options.length The length of the password to generate. Defaults to `15`.
   * @param options.memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param options.pattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param options.prefix The prefix to use. Defaults to `''`.
   * @param legacyMemorable Whether the generated password should be memorable. Defaults to `false`.
   * @param legacyPattern The pattern that all chars should match should match.
   * This option will be ignored, if `memorable` is `true`. Defaults to `/\w/`.
   * @param legacyPrefix The prefix to use. Defaults to `''`.
   *
   * @example
   * faker.internet.password() // '89G1wJuBLbGziIs'
   * faker.internet.password({ length: 20 }) // 'aF55c_8O9kZaPOrysFB_'
   * faker.internet.password({ length: 20, memorable: true }) // 'lawetimufozujosodedi'
   * faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/ }) // 'HMAQDFFYLDDUTBKVNFVS'
   * faker.internet.password({ length: 20, memorable: true, pattern: /[A-Z]/, prefix: 'Hello ' }) // 'Hello IREOXTDWPERQSB'
   * faker.internet.password(20) // 'aF55c_8O9kZaPOrysFB_'
   * faker.internet.password(20, true) // 'lawetimufozujosodedi'
   * faker.internet.password(20, true, /[A-Z]/) // 'HMAQDFFYLDDUTBKVNFVS'
   * faker.internet.password(20, true, /[A-Z]/, 'Hello ') // 'Hello IREOXTDWPERQSB'
   *
   * @since 2.0.1
   */
  password(
    options?:
      | number
      | {
          /**
           * The length of the password to generate.
           *
           * @default 15
           */
          length?: number;
          /**
           * Whether the generated password should be memorable.
           *
           * @default false
           */
          memorable?: boolean;
          /**
           * The pattern that all chars should match should match.
           * This option will be ignored, if `memorable` is `true`.
           *
           * @default /\w/
           */
          pattern?: RegExp;
          /**
           * The prefix to use.
           *
           * @default ''
           */
          prefix?: string;
        },
    legacyMemorable?: boolean,
    legacyPattern?: RegExp,
    legacyPrefix?: string
  ): string;
  password(
    options:
      | number
      | {
          /**
           * The length of the password to generate.
           *
           * @default 15
           */
          length?: number;
          /**
           * Whether the generated password should be memorable.
           *
           * @default false
           */
          memorable?: boolean;
          /**
           * The pattern that all chars should match should match.
           * This option will be ignored, if `memorable` is `true`.
           *
           * @default /\w/
           */
          pattern?: RegExp;
          /**
           * The prefix to use.
           *
           * @default ''
           */
          prefix?: string;
        } = {},
    legacyMemorable: boolean = false,
    legacyPattern: RegExp = /\w/,
    legacyPrefix: string = ''
  ): string {
    /*
     * password-generator ( function )
     * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
     * MIT Licensed
     */
    const vowel = /[aeiouAEIOU]$/;
    const consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
    const _password = (
      length: number,
      memorable: boolean,
      pattern: RegExp,
      prefix: string
    ): string => {
      if (prefix.length >= length) {
        return prefix;
      }

      if (memorable) {
        if (prefix.match(consonant)) {
          pattern = vowel;
        } else {
          pattern = consonant;
        }
      }

      const n = this.faker.number.int(94) + 33;
      let char = String.fromCharCode(n);
      if (memorable) {
        char = char.toLowerCase();
      }

      if (!char.match(pattern)) {
        return _password(length, memorable, pattern, prefix);
      }

      return _password(length, memorable, pattern, prefix + char);
    };

    if (typeof options === 'number') {
      options = { length: options };
    }

    const {
      length = 15,
      memorable = legacyMemorable,
      pattern = legacyPattern,
      prefix = legacyPrefix,
    } = options;

    return _password(length, memorable, pattern, prefix);
  }

  /**
   * Generates a random emoji.
   *
   * @param options Options object.
   * @param options.types A list of the emoji types that should be included. Possible values are `'smiley'`, `'body'`, `'person'`, `'nature'`, `'food'`, `'travel'`, `'activity'`, `'object'`, `'symbol'`, `'flag'`. By default, emojis from any type will be included.
   *
   * @example
   * faker.internet.emoji() // '🥰'
   * faker.internet.emoji({ types: ['food', 'nature'] }) // '🥐'
   *
   * @since 6.2.0
   */
  emoji(
    options: {
      /**
       * A list of the emoji types that should be used.
       *
       * @default Object.keys(faker.definitions.internet.emoji)
       */
      types?: ReadonlyArray<EmojiType>;
    } = {}
  ): string {
    const {
      types = Object.keys(this.faker.definitions.internet.emoji) as EmojiType[],
    } = options;
    const emojiType = this.faker.helpers.arrayElement(types);
    return this.faker.helpers.arrayElement(
      this.faker.definitions.internet.emoji[emojiType]
    );
  }
}
