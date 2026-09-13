import { ModuleBase } from '../../internal/module-base';
import { displayName as internetDisplayName } from './display-name';
import { domainName as internetDomainName } from './domain-name';
import { domainSuffix as internetDomainSuffix } from './domain-suffix';
import { domainWord as internetDomainWord } from './domain-word';
import { email as internetEmail } from './email';
import type { EmojiType } from './emoji';
import { emoji as internetEmoji } from './emoji';
import { exampleEmail as internetExampleEmail } from './example-email';
import { httpMethod as internetHttpMethod } from './http-method';
import type { HTTPStatusCodeType } from './http-status-code';
import { httpStatusCode as internetHttpStatusCode } from './http-status-code';
import { ip as internetIp } from './ip';
import type { IPv4NetworkType } from './ipv4';
import { ipv4 as internetIpv4 } from './ipv4';
import { ipv6 as internetIpv6 } from './ipv6';
import { jwt as internetJwt } from './jwt';
import { jwtAlgorithm as internetJwtAlgorithm } from './jwt-algorithm';
import { mac as internetMac } from './mac';
import { password as internetPassword } from './password';
import { port as internetPort } from './port';
import { protocol as internetProtocol } from './protocol';
import type { HTTPProtocolType } from './url';
import { url as internetUrl } from './url';
import { userAgent as internetUserAgent } from './user-agent';
import { username as internetUsername } from './username';

/**
 * Module to generate internet related entries.
 *
 * ### Overview
 *
 * For user accounts, you may need an [`email()`](https://fakerjs.dev/api/internet.html#email) and a [`password()`](https://fakerjs.dev/api/internet.html#password), as well as an ASCII [`username()`](https://fakerjs.dev/api/internet.html#username) or Unicode [`displayName()`](https://fakerjs.dev/api/internet.html#displayname). Since the emails generated could coincidentally be real email addresses, you should not use these for sending real email addresses. If this is a concern, use [`exampleEmail()`](https://fakerjs.dev/api/internet.html#exampleemail) instead.
 *
 * For websites, you can generate a [`domainName()`](https://fakerjs.dev/api/internet.html#domainname) or a full [`url()`](https://fakerjs.dev/api/internet.html#url).
 *
 * To make your data more 🔥, you can use [`emoji()`](https://fakerjs.dev/api/internet.html#emoji).
 *
 * You also have access to a number of the more technical elements of web requests, such as [`httpMethod`](https://fakerjs.dev/api/internet.html#httpmethod), [`httpStatusCode`](https://fakerjs.dev/api/internet.html#httpstatuscode), [`ip`](https://fakerjs.dev/api/internet.html#ip), [`mac`](https://fakerjs.dev/api/internet.html#mac), [`userAgent`](https://fakerjs.dev/api/internet.html#useragent), and [`port`](https://fakerjs.dev/api/internet.html#port).
 */
export class InternetModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree internet' to update the methods from their respective files.
   */

  /**
   * Generates an email address using the given person's name as base.
   *
   * @param options The options to use.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.provider The mail provider domain to use. If not specified, a random free mail provider will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.email() // 'Kassandra4@hotmail.com'
   * faker.internet.email({ firstName: 'Jeanne'}) // 'Jeanne63@yahoo.com'
   * faker.internet.email({ firstName: 'Jeanne'}) // 'Jeanne_Smith63@yahoo.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne.Doe63@yahoo.com'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev' }) // 'Jeanne_Doe88@example.fakerjs.dev'
   * faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe', provider: 'example.fakerjs.dev', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.fakerjs.dev'
   *
   * @since 2.0.1
   */
  email(
    options: {
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
    } = {}
  ): string {
    return internetEmail(this.faker.fakerCore, options);
  }

  /**
   * Generates an email address using an example mail provider using the given person's name as base.
   *
   * @param options An options object.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   * @param options.allowSpecialCharacters Whether special characters such as ``.!#$%&'*+-/=?^_`{|}~`` should be included
   * in the email address. Defaults to `false`.
   *
   * @example
   * faker.internet.exampleEmail() // 'Helmer.Graham23@example.com'
   * faker.internet.exampleEmail({ firstName: 'Jeanne' }) // 'Jeanne96@example.net'
   * faker.internet.exampleEmail({ firstName: 'Jeanne' }) // 'Jeanne.Smith96@example.net'
   * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne_Doe96@example.net'
   * faker.internet.exampleEmail({ firstName: 'Jeanne', lastName: 'Doe', allowSpecialCharacters: true }) // 'Jeanne%Doe88@example.com'
   *
   * @since 3.1.0
   */
  exampleEmail(
    options: {
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
    } = {}
  ): string {
    return internetExampleEmail(this.faker.fakerCore, options);
  }

  /**
   * Generates a username using the given person's name as base.
   * The resulting username may use neither, one or both of the names provided.
   * This will always return a plain ASCII string.
   * Some basic stripping of accents and transliteration of characters will be done.
   *
   * @param options An options object.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.displayName(): For generating an Unicode display name.
   *
   * @example
   * faker.internet.username() // 'Nettie_Zboncak40'
   * faker.internet.username({ firstName: 'Jeanne' }) // 'Jeanne98'
   * faker.internet.username({ firstName: 'Jeanne' }) // 'Jeanne.Smith98'
   * faker.internet.username({ firstName: 'Jeanne', lastName: 'Doe'}) // 'Jeanne_Doe98'
   * faker.internet.username({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
   * faker.internet.username({ firstName: 'Hélene', lastName: 'Müller' }) // 'Helene_Muller11'
   * faker.internet.username({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Fedor.Dostoevskii50'
   * faker.internet.username({ firstName: '大羽', lastName: '陳' }) // 'hlzp8d.tpv45' - note neither name is used
   *
   * @since 9.1.0
   */
  username(
    options: {
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
    } = {}
  ): string {
    return internetUsername(this.faker.fakerCore, options);
  }

  /**
   * Generates a display name using the given person's name as base.
   * The resulting display name may use one or both of the provided names.
   * If the input names include Unicode characters, the resulting display name will contain Unicode characters.
   * It will not contain spaces.
   *
   * @param options An options object.
   * @param options.firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @see faker.internet.username(): For generating a plain ASCII username.
   *
   * @example
   * faker.internet.displayName() // 'Nettie_Zboncak40'
   * faker.internet.displayName({ firstName: 'Jeanne', lastName: 'Doe' }) // 'Jeanne98' - note surname not used.
   * faker.internet.displayName({ firstName: 'John', lastName: 'Doe' }) // 'John.Doe'
   * faker.internet.displayName({ firstName: 'Hélene', lastName: 'Müller' }) // 'Hélene_Müller11'
   * faker.internet.displayName({ firstName: 'Фёдор', lastName: 'Достоевский' }) // 'Фёдор.Достоевский50'
   * faker.internet.displayName({ firstName: '大羽', lastName: '陳' }) // '大羽.陳'
   *
   * @since 8.0.0
   */
  displayName(
    options: {
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
    } = {}
  ): string {
    return internetDisplayName(this.faker.fakerCore, options);
  }

  /**
   * Returns a random web protocol. Either `http` or `https`.
   *
   * @example
   * faker.internet.protocol() // 'http'
   *
   * @since 2.1.5
   */
  protocol(): 'http' | 'https' {
    return internetProtocol(this.faker.fakerCore);
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
    return internetHttpMethod(this.faker.fakerCore);
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
       * @default Object.keys(fakerCore.locale.internet.http_status_code)
       */
      types?: ReadonlyArray<HTTPStatusCodeType>;
    } = {}
  ): number {
    return internetHttpStatusCode(this.faker.fakerCore, options);
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
    return internetUrl(this.faker.fakerCore, options);
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
    return internetDomainName(this.faker.fakerCore);
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
    return internetDomainSuffix(this.faker.fakerCore);
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
    return internetDomainWord(this.faker.fakerCore);
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
    return internetIp(this.faker.fakerCore);
  }

  /**
   * Generates a random IPv4 address.
   *
   * @param options The optional options object.
   * @param options.cidrBlock The optional CIDR block to use. Must be in the format `x.x.x.x/y`. Defaults to `'0.0.0.0/0'`.
   *
   * @throws {FakerError} If the resolved CIDR block does not use the format `x.x.x.x/y`.
   * @throws {FakerError} If the resolved CIDR block has a prefix length greater than 32.
   * @throws {FakerError} If the resolved CIDR block contains an octet greater than 255.
   *
   * @example
   * faker.internet.ipv4() // '245.108.222.0'
   * faker.internet.ipv4({ cidrBlock: '192.168.0.0/16' }) // '192.168.215.224'
   *
   * @since 6.1.1
   */
  ipv4(options?: {
    /**
     * The optional CIDR block to use. Must be in the format `x.x.x.x/y`.
     *
     * @default '0.0.0.0/0'
     */
    cidrBlock?: string;
  }): string;
  /**
   * Generates a random IPv4 address.
   *
   * @param options The optional options object.
   * @param options.network The optional network to use. This is intended as an alias for well-known `cidrBlock`s. Defaults to `'any'`.
   *
   * @example
   * faker.internet.ipv4() // '245.108.222.0'
   * faker.internet.ipv4({ network: 'private-a' }) // '10.199.154.205'
   *
   * @since 6.1.1
   */
  ipv4(options?: {
    /**
     * The optional network to use. This is intended as an alias for well-known `cidrBlock`s.
     *
     * @default 'any'
     */
    network?: IPv4NetworkType;
  }): string;
  /**
   * Generates a random IPv4 address.
   *
   * @param options The optional options object.
   * @param options.cidrBlock The optional CIDR block to use. Must be in the format `x.x.x.x/y`. Defaults to `'0.0.0.0/0'`.
   * @param options.network The optional network to use. This is intended as an alias for well-known `cidrBlock`s. Defaults to `'any'`.
   *
   * @throws {FakerError} If the resolved CIDR block does not use the format `x.x.x.x/y`.
   * @throws {FakerError} If the resolved CIDR block has a prefix length greater than 32.
   * @throws {FakerError} If the resolved CIDR block contains an octet greater than 255.
   *
   * @example
   * faker.internet.ipv4() // '245.108.222.0'
   * faker.internet.ipv4({ cidrBlock: '192.168.0.0/16' }) // '192.168.215.224'
   * faker.internet.ipv4({ network: 'private-a' }) // '10.199.154.205'
   *
   * @since 6.1.1
   */
  ipv4(
    options?:
      | {
          /**
           * The optional CIDR block to use. Must be in the format `x.x.x.x/y`.
           *
           * @default '0.0.0.0/0'
           */
          cidrBlock?: string;
        }
      | {
          /**
           * The optional network to use. This is intended as an alias for well-known `cidrBlock`s.
           *
           * @default 'any'
           */
          network?: IPv4NetworkType;
        }
  ): string;
  ipv4(
    options: { cidrBlock?: string; network?: IPv4NetworkType } = {}
  ): string {
    return internetIpv4(this.faker.fakerCore, options);
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
    return internetIpv6(this.faker.fakerCore);
  }

  /**
   * Generates a random port number.
   *
   * @example
   * faker.internet.port() // 9414
   *
   * @since 5.4.0
   */
  port(): number {
    return internetPort(this.faker.fakerCore);
  }

  /**
   * Generates a random user agent string.
   *
   * @example
   * faker.internet.userAgent()
   * // 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1 like Mac OS X) AppleWebKit/537.19.86 (KHTML, like Gecko) Version/18_3 Mobile/15E148 Safari/598.43'
   *
   * @since 2.0.1
   */
  userAgent(): string {
    return internetUserAgent(this.faker.fakerCore);
  }

  /**
   * Generates a random mac address.
   *
   * @param options An options object.
   * @param options.separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
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
   * @param separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
   *
   * @example
   * faker.internet.mac() // '32:8e:2e:09:c6:05'
   *
   * @since 3.0.0
   */
  mac(separator?: string): string;
  /**
   * Generates a random mac address.
   *
   * @param options The optional separator or an options object.
   * @param options.separator The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
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
    return internetMac(this.faker.fakerCore, options);
  }

  /**
   * Generates a random password-like string. Do not use this method for generating actual passwords for users.
   * Since the source of the randomness is not cryptographically secure, neither is this generator.
   *
   * @param options An options object.
   * @param options.length The length of the password to generate. Defaults to `15`.
   * @param options.memorable Whether the generated password should be memorable. Defaults to `false`.
   * @param options.pattern The pattern that all chars should match.
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
  password(
    options: {
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
       * The pattern that all chars should match.
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
    } = {}
  ): string {
    return internetPassword(this.faker.fakerCore, options);
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
    return internetEmoji(this.faker.fakerCore, options);
  }

  /**
   * Generates a random JWT (JSON Web Token) Algorithm.
   *
   * @see faker.internet.jwt(): For generating random JWT (JSON Web Token).
   *
   * @example
   * faker.internet.jwtAlgorithm() // 'HS256'
   * faker.internet.jwtAlgorithm() // 'RS512'
   *
   * @since 9.1.0
   */
  jwtAlgorithm(): string {
    return internetJwtAlgorithm(this.faker.fakerCore);
  }

  /**
   * Generates a random JWT (JSON Web Token).
   *
   * Please note that this method generates a random signature instead of a valid one.
   *
   * @param options The optional options object.
   * @param options.header The Header to use for the token. Defaults to a random object with the following fields: `alg` and `typ`.
   * @param options.payload The Payload to use for the token. Defaults to a random object with the following fields: `iat`, `exp`, `nbf`, `iss`, `sub`, `aud`, and `jti`.
   * @param options.refDate The date to use as reference point for the newly generated date.
   *
   * @see https://datatracker.ietf.org/doc/html/rfc7519
   * @see faker.internet.jwtAlgorithm(): For generating random JWT (JSON Web Token) Algorithm.
   *
   * @example
   * faker.internet.jwt() // 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzI2MzgxMDYsImV4cCI6MTczMjY5MjUwOSwibmJmIjoxNzA1MDgxNjQ4LCJpc3MiOiJHdXRrb3dza2kgYW5kIFNvbnMiLCJzdWIiOiJlMzQxZjMwNS0yM2I2LTRkYmQtOTY2ZC1iNDRiZmM0ZGIzMGUiLCJhdWQiOiI0YzMwZGE3Yi0zZDUzLTQ4OGUtYTAyZC0zOWI2MDZiZmYxMTciLCJqdGkiOiJiMGZmOTMzOC04ODMwLTRmNDgtYjA3Ny1kNDNmMjU2OGZlYzAifQ.oDLVR73M0u5SjMPlc1aruxbdK7l2titXSeo9J5M1JUd65a1X9MhCz7FOobtX8eaj'
   * faker.internet.jwt({ header: { alg: 'HS256' }}) // 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTg2MTM3MTIsImV4cCI6MTcxODYzMzY3OSwibmJmIjoxNjk3MjYzNjMwLCJpc3MiOiJEb3lsZSBhbmQgU29ucyIsInN1YiI6IjYxYWRkYWFmLWY4MjktNDkzZS1iNTI1LTJjMGJkNjkzOTdjNyIsImF1ZCI6IjczNjcyMjVjLWIwMWMtNGE1My1hYzQyLTYwOWJkZmI1MzBiOCIsImp0aSI6IjU2Y2ZkZjAxLWRhMzMtNGUxNi04MzJiLTFlYTk3ZGY1MTQ2YSJ9.5iUgaCaFVPZ8d1QD0xMjoeJbmPVyUfKfoRQ6Njzm5MLp5F4UMh5REbPCrW70fAkr'
   * faker.internet.jwt({ payload: { iss: 'Acme' }}) // 'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBY21lIn0.syUt0GBukNac8Cn1AGKFq2SWAXWy1YIfl0uOYiwg6TZ3omAW0c7FGWY6bC7ZOFSt'
   * faker.internet.jwt({ refDate: '2020-01-01T00:00:00.000Z' }) // 'eyJhbGciOiJFUzM4NCIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzc4MDY4NDUsImV4cCI6MTU3Nzg0NjI4MCwibmJmIjoxNTgxNTQyMDYwLCJpc3MiOiJLcmVpZ2VyLCBBbHRlbndlcnRoIGFuZCBQYXVjZWsiLCJzdWIiOiI5NzVjMjMyOS02MDlhLTRjYTYtYjBkZi05ZmY4MGZiNDUwN2QiLCJhdWQiOiI0ODQxZWYwNi01OWYwLTQzMWEtYmFmZi0xMjkxZmRhZDdhNjgiLCJqdGkiOiJmNDBjZTJiYi00ZWYyLTQ1MjMtOGIxMy1kN2Q4NTA5N2M2ZTUifQ.cuClEZQ0CyPIMVS5uxrMwWXz0wcqFFdt0oNne3PMryyly0jghkxVurss2TapMC3C'
   *
   * @since 9.1.0
   */
  jwt(
    options: {
      /**
       * The header to use for the token. If present, it will replace any default values.
       *
       * @default
       * {
       *   alg: faker.internet.jwtAlgorithm(),
       *   typ: 'JWT'
       * }
       */
      header?: Record<string, unknown>;
      /**
       * The payload to use for the token. If present, it will replace any default values.
       *
       * @default
       * {
       *   iat: faker.date.recent(),
       *   exp: faker.date.soon(),
       *   nbf: faker.date.anytime(),
       *   iss: faker.company.name(),
       *   sub: faker.string.uuid(),
       *   aud: faker.string.uuid(),
       *   jti: faker.string.uuid()
       * }
       */
      payload?: Record<string, unknown>;
      /**
       * The date to use as reference point for the newly generated date.
       *
       * @default faker.defaultRefDate()
       */
      refDate?: string | Date | number;
    } = {}
  ): string {
    return internetJwt(this.faker.fakerCore, options);
  }
}
