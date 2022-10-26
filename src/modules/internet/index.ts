import type { Faker } from '../..';
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
    return `https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${this.faker.datatype.number(
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
    options?: { allowSpecialCharacters?: boolean }
  ): string {
    provider =
      provider ||
      this.faker.helpers.arrayElement(
        this.faker.definitions.internet.free_email
      );

    let localPart: string = this.faker.helpers.slugify(
      this.userName(firstName, lastName)
    );

    if (options?.allowSpecialCharacters) {
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
    options?: { allowSpecialCharacters?: boolean }
  ): string {
    const provider = this.faker.helpers.arrayElement(
      this.faker.definitions.internet.example_email
    );
    return this.email(firstName, lastName, provider, options);
  }

  /**
   * Generates a username using the given person's name as base.
   *
   * @param firstName The optional first name to use. If not specified, a random one will be chosen.
   * @param lastName The optional last name to use. If not specified, a random one will be chosen.
   *
   * @example
   * faker.internet.userName() // 'Nettie_Zboncak40'
   * faker.internet.userName('Jeanne', 'Doe') // 'Jeanne98'
   *
   * @since 2.0.1
   */
  userName(firstName?: string, lastName?: string): string {
    let result: string;
    firstName = firstName || this.faker.person.firstName();
    lastName = lastName || this.faker.person.lastName();
    switch (this.faker.datatype.number(2)) {
      case 0:
        result = `${firstName}${this.faker.datatype.number(99)}`;
        break;
      case 1:
        result =
          firstName + this.faker.helpers.arrayElement(['.', '_']) + lastName;
        break;
      case 2:
        result = `${firstName}${this.faker.helpers.arrayElement([
          '.',
          '_',
        ])}${lastName}${this.faker.datatype.number(99)}`;
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
    options: { types?: ReadonlyArray<HTTPStatusCodeType> } = {}
  ): number {
    const {
      types = Object.keys(
        this.faker.definitions.internet.http_status_code
      ) as Array<HTTPStatusCodeType>,
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
      appendSlash?: boolean;
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
    return `${this.faker.word.adjective()}-${this.faker.word.noun()}`
      .replace(/([\\~#&*{}/:<>?|\"'])/gi, '')
      .replace(/\s/g, '-')
      .replace(/-{2,}/g, '-')
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
    const randNum = () => {
      return this.faker.datatype.number(255).toFixed(0);
    };

    const result: string[] = [];
    for (let i = 0; i < 4; i++) {
      result[i] = randNum();
    }

    return result.join('.');
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
    const randHash = () => {
      let result = '';
      for (let i = 0; i < 4; i++) {
        result += this.faker.helpers.arrayElement([
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
        ]);
      }
      return result;
    };

    const result: string[] = [];
    for (let i = 0; i < 8; i++) {
      result[i] = randHash();
    }
    return result.join(':');
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
    return this.faker.datatype.number({ min: 0, max: 65535 });
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
  color(
    redBase: number = 0,
    greenBase: number = 0,
    blueBase: number = 0
  ): string {
    const colorFromBase = (base: number): string =>
      Math.floor((this.faker.datatype.number(256) + base) / 2)
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
   * @param sep The optional separator to use. Can be either `':'`, `'-'` or `''`. Defaults to `':'`.
   *
   * @example
   * faker.internet.mac() // '32:8e:2e:09:c6:05'
   *
   * @since 3.0.0
   */
  mac(sep?: string): string {
    let i: number;
    let mac = '';
    let validSep = ':';

    // if the client passed in a different separator than `:`,
    // we will use it if it is in the list of acceptable separators (dash or no separator)
    if (['-', ''].indexOf(sep) !== -1) {
      validSep = sep;
    }

    for (i = 0; i < 12; i++) {
      mac += this.faker.datatype.number(15).toString(16);
      if (i % 2 === 1 && i !== 11) {
        mac += validSep;
      }
    }
    return mac;
  }

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
    len: number = 15,
    memorable: boolean = false,
    pattern: RegExp = /\w/,
    prefix: string = ''
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
      const n = this.faker.datatype.number(94) + 33;
      let char = String.fromCharCode(n);
      if (memorable) {
        char = char.toLowerCase();
      }
      if (!char.match(pattern)) {
        return _password(length, memorable, pattern, prefix);
      }
      return _password(length, memorable, pattern, prefix + char);
    };
    return _password(len, memorable, pattern, prefix);
  }

  /**
   * Generates a random emoji.
   *
   * @param options Options object.
   * @param options.types A list of the emoji types that should be used.
   *
   * @example
   * faker.internet.emoji() // '🥰'
   * faker.internet.emoji({ types: ['food', 'nature'] }) // '🥐'
   *
   * @since 6.2.0
   */
  emoji(options: { types?: ReadonlyArray<EmojiType> } = {}): string {
    const {
      types = Object.keys(
        this.faker.definitions.internet.emoji
      ) as Array<EmojiType>,
    } = options;
    const emojiType = this.faker.helpers.arrayElement(types);
    return this.faker.helpers.arrayElement(
      this.faker.definitions.internet.emoji[emojiType]
    );
  }
}
