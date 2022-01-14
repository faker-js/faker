import type { Faker } from '.';

const random_ua = require('../vendor/user-agent');

export class Internet {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Internet.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }

    // @ts-expect-error
    this.avatar.schema = {
      description: 'Generates a URL for an avatar.',
      sampleResults: ['https://cdn.fakercloud.com/avatars/sydlawrence_128.jpg'],
    };
    // @ts-expect-error
    this.email.schema = {
      description:
        'Generates a valid email address based on optional input criteria',
      sampleResults: ['foo.bar@gmail.com'],
      properties: {
        firstName: {
          type: 'string',
          required: false,
          description: 'The first name of the user',
        },
        lastName: {
          type: 'string',
          required: false,
          description: 'The last name of the user',
        },
        provider: {
          type: 'string',
          required: false,
          description: 'The domain of the user',
        },
      },
    };
    // @ts-expect-error
    this.userName.schema = {
      description:
        'Generates a username based on one of several patterns. The pattern is chosen randomly.',
      sampleResults: [
        'Kirstin39',
        'Kirstin.Smith',
        'Kirstin.Smith39',
        'KirstinSmith',
        'KirstinSmith39',
      ],
      properties: {
        firstName: {
          type: 'string',
          required: false,
          description: 'The first name of the user',
        },
        lastName: {
          type: 'string',
          required: false,
          description: 'The last name of the user',
        },
      },
    };
    // @ts-expect-error
    this.protocol.schema = {
      description: 'Randomly generates http or https',
      sampleResults: ['https', 'http'],
    };
    // @ts-expect-error
    this.httpMethod.schema = {
      description:
        'Randomly generates HTTP Methods (GET, POST, PUT, DELETE, PATCH)',
      sampleResults: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    };
    // @ts-expect-error
    this.url.schema = {
      description:
        'Generates a random URL. The URL could be secure or insecure.',
      sampleResults: ['http://rashawn.name', 'https://rashawn.name'],
    };
    // @ts-expect-error
    this.domainName.schema = {
      description: 'Generates a random domain name.',
      sampleResults: ['marvin.org'],
    };
    // @ts-expect-error
    this.domainSuffix.schema = {
      description: 'Generates a random domain suffix.',
      sampleResults: ['net'],
    };
    // @ts-expect-error
    this.domainWord.schema = {
      description: 'Generates a random domain word.',
      sampleResults: ['alyce'],
    };
    // @ts-expect-error
    this.ip.schema = {
      description: 'Generates a random IP.',
      sampleResults: ['97.238.241.11'],
    };
    // @ts-expect-error
    this.ipv6.schema = {
      description: 'Generates a random IPv6 address.',
      sampleResults: ['2001:0db8:6276:b1a7:5213:22f1:25df:c8a0'],
    };
    // @ts-expect-error
    this.port.schema = {
      description: 'Generates a random port number.',
      sampleResults: ['4422'],
    };
    // @ts-expect-error
    this.userAgent.schema = {
      description: 'Generates a random user agent.',
      sampleResults: [
        'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1',
      ],
    };
    // @ts-expect-error
    this.color.schema = {
      description: 'Generates a random hexadecimal color.',
      sampleResults: ['#06267f'],
      properties: {
        baseRed255: {
          type: 'number',
          required: false,
          description: 'The red value. Valid values are 0 - 255.',
        },
        baseGreen255: {
          type: 'number',
          required: false,
          description: 'The green value. Valid values are 0 - 255.',
        },
        baseBlue255: {
          type: 'number',
          required: false,
          description: 'The blue value. Valid values are 0 - 255.',
        },
      },
    };
    // @ts-expect-error
    this.mac.schema = {
      description: 'Generates a random mac address.',
      sampleResults: ['78:06:cc:ae:b3:81'],
    };
    // @ts-expect-error
    this.password.schema = {
      description: 'Generates a random password.',
      sampleResults: ['AM7zl6Mg', 'susejofe'],
      properties: {
        length: {
          type: 'number',
          required: false,
          description: 'The number of characters in the password.',
        },
        memorable: {
          type: 'boolean',
          required: false,
          description: 'Whether a password should be easy to remember.',
        },
        pattern: {
          type: 'regex',
          required: false,
          description:
            'A regex to match each character of the password against. This parameter will be negated if the memorable setting is turned on.',
        },
        prefix: {
          type: 'string',
          required: false,
          description:
            'A value to prepend to the generated password. The prefix counts towards the length of the password.',
        },
      },
    };
  }

  /**
   * avatar
   *
   * @method faker.internet.avatar
   */
  avatar() {
    return (
      'https://cdn.fakercloud.com/avatars/' +
      this.faker.random.arrayElement(this.faker.definitions.internet.avatar_uri)
    );
  }

  /**
   * email
   *
   * @method faker.internet.email
   * @param firstName
   * @param lastName
   * @param provider
   */
  email(firstName, lastName, provider) {
    provider =
      provider ||
      this.faker.random.arrayElement(
        this.faker.definitions.internet.free_email
      );
    return (
      this.faker.helpers.slugify(
        this.faker.internet.userName(firstName, lastName)
      ) +
      '@' +
      provider
    );
  }

  /**
   * exampleEmail
   *
   * @method faker.internet.exampleEmail
   * @param firstName
   * @param lastName
   */
  exampleEmail(firstName, lastName) {
    var provider = this.faker.random.arrayElement(
      this.faker.definitions.internet.example_email
    );
    return this.email(firstName, lastName, provider);
  }

  /**
   * userName
   *
   * @method faker.internet.userName
   * @param firstName
   * @param lastName
   */
  userName(firstName, lastName) {
    var result;
    firstName = firstName || this.faker.name.firstName();
    lastName = lastName || this.faker.name.lastName();
    switch (this.faker.datatype.number(2)) {
      case 0:
        result = firstName + this.faker.datatype.number(99);
        break;
      case 1:
        result =
          firstName + this.faker.random.arrayElement(['.', '_']) + lastName;
        break;
      case 2:
        result =
          firstName +
          this.faker.random.arrayElement(['.', '_']) +
          lastName +
          this.faker.datatype.number(99);
        break;
    }
    result = result.toString().replace(/'/g, '');
    result = result.replace(/ /g, '');
    return result;
  }

  /**
   * protocol
   *
   * @method faker.internet.protocol
   */
  protocol() {
    var protocols = ['http', 'https'];
    return this.faker.random.arrayElement(protocols);
  }

  /**
   * method
   *
   * @method faker.internet.httpMethod
   */
  httpMethod() {
    var httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    return this.faker.random.arrayElement(httpMethods);
  }

  /**
   * url
   *
   * @method faker.internet.url
   */
  url() {
    return (
      this.faker.internet.protocol() + '://' + this.faker.internet.domainName()
    );
  }

  /**
   * domainName
   *
   * @method faker.internet.domainName
   */
  domainName() {
    return (
      this.faker.internet.domainWord() +
      '.' +
      this.faker.internet.domainSuffix()
    );
  }

  /**
   * domainSuffix
   *
   * @method faker.internet.domainSuffix
   */
  domainSuffix() {
    return this.faker.random.arrayElement(
      this.faker.definitions.internet.domain_suffix
    );
  }

  /**
   * domainWord
   *
   * @method faker.internet.domainWord
   */
  domainWord() {
    return (this.faker.word.adjective() + '-' + this.faker.word.noun())
      .replace(/([\\~#&*{}/:<>?|\"'])/gi, '')
      .toLowerCase();
  }

  /**
   * ip
   *
   * @method faker.internet.ip
   */
  ip() {
    var randNum = function () {
      return this.faker.datatype.number(255).toFixed(0);
    };

    var result = [];
    for (var i = 0; i < 4; i++) {
      result[i] = randNum();
    }

    return result.join('.');
  }

  /**
   * ipv6
   *
   * @method faker.internet.ipv6
   */
  ipv6() {
    var randHash = function () {
      var result = '';
      for (var i = 0; i < 4; i++) {
        result += this.faker.random.arrayElement([
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

    var result = [];
    for (var i = 0; i < 8; i++) {
      result[i] = randHash();
    }
    return result.join(':');
  }

  /**
   * port
   *
   * @method faker.internet.port
   */
  port() {
    return this.faker.datatype.number({ min: 0, max: 65535 });
  }

  /**
   * userAgent
   *
   * @method faker.internet.userAgent
   */
  userAgent() {
    return random_ua.generate(this.faker);
  }

  /**
   * color
   *
   * @method faker.internet.color
   * @param baseRed255
   * @param baseGreen255
   * @param baseBlue255
   */
  color(baseRed255, baseGreen255, baseBlue255) {
    baseRed255 = baseRed255 || 0;
    baseGreen255 = baseGreen255 || 0;
    baseBlue255 = baseBlue255 || 0;
    // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
    var red = Math.floor((this.faker.datatype.number(256) + baseRed255) / 2);
    var green = Math.floor(
      (this.faker.datatype.number(256) + baseGreen255) / 2
    );
    var blue = Math.floor((this.faker.datatype.number(256) + baseBlue255) / 2);
    var redStr = red.toString(16);
    var greenStr = green.toString(16);
    var blueStr = blue.toString(16);
    return (
      '#' +
      (redStr.length === 1 ? '0' : '') +
      redStr +
      (greenStr.length === 1 ? '0' : '') +
      greenStr +
      (blueStr.length === 1 ? '0' : '') +
      blueStr
    );
  }

  /**
   * mac
   *
   * @method faker.internet.mac
   * @param sep
   */
  mac(sep) {
    var i,
      mac = '',
      validSep = ':';

    // if the client passed in a different separator than `:`,
    // we will use it if it is in the list of acceptable separators (dash or no separator)
    if (['-', ''].indexOf(sep) !== -1) {
      validSep = sep;
    }

    for (i = 0; i < 12; i++) {
      mac += this.faker.datatype.number(15).toString(16);
      if (i % 2 == 1 && i != 11) {
        mac += validSep;
      }
    }
    return mac;
  }

  /**
   * password
   *
   * @method faker.internet.password
   * @param len
   * @param memorable
   * @param pattern
   * @param prefix
   */
  password(len, memorable, pattern, prefix) {
    len = len || 15;
    if (typeof memorable === 'undefined') {
      memorable = false;
    }
    /*
     * password-generator ( function )
     * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
     * MIT Licensed
     */
    var consonant, letter, vowel;
    letter = /[a-zA-Z]$/;
    vowel = /[aeiouAEIOU]$/;
    consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
    var _password = function (length, memorable, pattern, prefix) {
      var char, n;
      if (length == null) {
        length = 10;
      }
      if (memorable == null) {
        memorable = true;
      }
      if (pattern == null) {
        pattern = /\w/;
      }
      if (prefix == null) {
        prefix = '';
      }
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
      n = this.faker.datatype.number(94) + 33;
      char = String.fromCharCode(n);
      if (memorable) {
        char = char.toLowerCase();
      }
      if (!char.match(pattern)) {
        return _password(length, memorable, pattern, prefix);
      }
      return _password(length, memorable, pattern, '' + prefix + char);
    };
    return _password(len, memorable, pattern, prefix);
  }
}
