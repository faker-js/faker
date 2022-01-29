import type { Faker } from '.';

export class Helpers {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Helpers.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * backward-compatibility
   *
   * @method faker.helpers.randomize
   * @param array
   */
  randomize<T = string>(
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>
  ): T {
    return this.faker.random.arrayElement(array);
  }

  /**
   * slugifies string
   *
   * @method faker.helpers.slugify
   * @param string
   */
  slugify(string: string = '') {
    return string
      .replace(/ /g, '-')
      .replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, '');
  }

  /**
   * Parses string for a symbol and replace it with a random number from 1-10
   *
   * @method faker.helpers.replaceSymbolWithNumber
   * @param string
   * @param symbol defaults to `"#"`
   */
  replaceSymbolWithNumber(string: string = '', symbol: string = '#'): string {
    let str = '';
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) == symbol) {
        str += this.faker.datatype.number(9);
      } else if (string.charAt(i) == '!') {
        str += this.faker.datatype.number({ min: 2, max: 9 });
      } else {
        str += string.charAt(i);
      }
    }
    return str;
  }

  /**
   * Parses string for symbols (numbers or letters) and replaces them appropriately (# will be replaced with number,
   * ? with letter and * will be replaced with number or letter)
   *
   * @method faker.helpers.replaceSymbols
   * @param string
   */
  replaceSymbols(string: string = ''): string {
    const alpha = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    let str = '';

    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) == '#') {
        str += this.faker.datatype.number(9);
      } else if (string.charAt(i) == '?') {
        str += this.faker.random.arrayElement(alpha);
      } else if (string.charAt(i) == '*') {
        str += this.faker.datatype.boolean()
          ? this.faker.random.arrayElement(alpha)
          : this.faker.datatype.number(9);
      } else {
        str += string.charAt(i);
      }
    }
    return str;
  }

  /**
   * replace symbols in a credit card schems including Luhn checksum
   *
   * @method faker.helpers.replaceCreditCardSymbols
   * @param string
   * @param symbol
   */

  replaceCreditCardSymbols(
    string: string = '6453-####-####-####-###L',
    symbol: string = '#'
  ) {
    // default values required for calling method without arguments

    // Function calculating the Luhn checksum of a number string
    const getCheckBit = (number: number[]) => {
      number.reverse();
      number = number.map((num, index) => {
        if (index % 2 === 0) {
          num *= 2;
          if (num > 9) {
            num -= 9;
          }
        }
        return num;
      });
      const sum = number.reduce((prev, curr) => prev + curr);
      return sum % 10;
    };

    string = this.faker.helpers.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
    string = this.faker.helpers.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

    const numberList = string
      .replace(/\D/g, '')
      .split('')
      .map((num) => parseInt(num));
    const checkNum = getCheckBit(numberList);
    // TODO @Shinigami92 2022-01-11: I assume this should be converted to string
    // @ts-expect-error
    return string.replace('L', checkNum);
  }

  /**
   * String repeat helper, alternative to String.prototype.repeat.... See PR #382
   *
   * @method faker.helpers.repeatString
   * @param string
   * @param num
   */
  repeatString(string, num = 0) {
    let text = '';
    for (let i = 0; i < num; i++) {
      text += string.toString();
    }
    return text;
  }

  /**
   * parse string patterns in a similar way to RegExp
   *
   * e.g. "#{3}test[1-5]" -> "###test4"
   *
   * @method faker.helpers.regexpStyleStringParse
   * @param string
   */
  regexpStyleStringParse(string: string = '') {
    // Deal with range repeat `{min,max}`
    const RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
    const REP_REG = /(.)\{(\d+)\}/;
    const RANGE_REG = /\[(\d+)\-(\d+)\]/;
    let min, max, tmp, repetitions;
    let token = string.match(RANGE_REP_REG);
    while (token !== null) {
      min = parseInt(token[2]);
      max = parseInt(token[3]);
      // switch min and max
      if (min > max) {
        tmp = max;
        max = min;
        min = tmp;
      }
      repetitions = this.faker.datatype.number({ min: min, max: max });
      string =
        string.slice(0, token.index) +
        this.faker.helpers.repeatString(token[1], repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REP_REG);
    }
    // Deal with repeat `{num}`
    token = string.match(REP_REG);
    while (token !== null) {
      repetitions = parseInt(token[2]);
      string =
        string.slice(0, token.index) +
        this.faker.helpers.repeatString(token[1], repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(REP_REG);
    }
    // Deal with range `[min-max]` (only works with numbers for now)
    //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

    token = string.match(RANGE_REG);
    while (token !== null) {
      min = parseInt(token[1]); // This time we are not capturing the char before `[]`
      max = parseInt(token[2]);
      // switch min and max
      if (min > max) {
        tmp = max;
        max = min;
        min = tmp;
      }
      string =
        string.slice(0, token.index) +
        this.faker.datatype.number({ min: min, max: max }).toString() +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REG);
    }
    return string;
  }

  /**
   * Takes an array and randomizes it in place then returns it
   *
   * Uses the modern version of the Fisher–Yates algorithm
   *
   * @method faker.helpers.shuffle
   * @param o
   */
  shuffle<T>(o?: T[]): T[] {
    if (typeof o === 'undefined' || o.length === 0) {
      return o || [];
    }

    o ||= ['a', 'b', 'c'] as unknown as T[];
    for (let x: T, j: number, i = o.length - 1; i > 0; --i) {
      j = this.faker.datatype.number(i);
      x = o[i];
      o[i] = o[j];
      o[j] = x;
    }
    return o;
  }

  /**
   * Takes an array of strings or function that returns a string
   * and outputs a unique array of strings based on that source
   *
   * @example uniqueArray(faker.random.word, 50)
   * @example uniqueArray(faker.definitions.name.first_name, 6)
   * @example uniqueArray(["Hello", "World", "Goodbye"], 2)
   *
   * @method faker.helpers.uniqueArray
   * @param source
   * @param length
   */
  uniqueArray<T>(source: T[] | (() => T), length: number): T[] {
    if (Array.isArray(source)) {
      const set = new Set(source);
      const array = Array.from(set);
      return this.faker.helpers.shuffle(array).splice(0, length);
    }
    const set = new Set<T>();
    try {
      if (typeof source === 'function') {
        while (set.size < length) {
          set.add(source());
        }
      }
    } finally {
      // TODO @Shinigami92 2022-01-21: Check what to do here
      // eslint-disable-next-line no-unsafe-finally
      return Array.from(set);
    }
  }

  /**
   * mustache
   *
   * @method faker.helpers.mustache
   * @param str
   * @param data
   */
  mustache(
    str: string | undefined,
    data: Record<
      string,
      string | ((substring: string, ...args: any[]) => string)
    >
  ): string {
    if (typeof str === 'undefined') {
      return '';
    }
    for (const p in data) {
      const re = new RegExp('{{' + p + '}}', 'g');
      str = str.replace(
        re,
        // TODO @Shinigami92 2022-01-14: Try to improve the type or maybe use `if`
        // @ts-expect-error
        data[p]
      );
    }
    return str;
  }

  // TODO @Shinigami92 2022-01-11: We might have a bug with the `phone` definition
  // I may be `phone_number` instead

  /**
   * createCard
   *
   * @method faker.helpers.createCard
   */
  createCard() {
    return {
      name: this.faker.name.findName(),
      username: this.faker.internet.userName(),
      email: this.faker.internet.email(),
      address: {
        streetA: this.faker.address.streetName(),
        streetB: this.faker.address.streetAddress(),
        streetC: this.faker.address.streetAddress(true),
        streetD: this.faker.address.secondaryAddress(),
        city: this.faker.address.city(),
        state: this.faker.address.state(),
        country: this.faker.address.country(),
        zipcode: this.faker.address.zipCode(),
        geo: {
          lat: this.faker.address.latitude(),
          lng: this.faker.address.longitude(),
        },
      },
      phone: this.faker.phone.phoneNumber(),
      website: this.faker.internet.domainName(),
      company: {
        name: this.faker.company.companyName(),
        catchPhrase: this.faker.company.catchPhrase(),
        bs: this.faker.company.bs(),
      },
      posts: [
        {
          words: this.faker.lorem.words(),
          sentence: this.faker.lorem.sentence(),
          sentences: this.faker.lorem.sentences(),
          paragraph: this.faker.lorem.paragraph(),
        },
        {
          words: this.faker.lorem.words(),
          sentence: this.faker.lorem.sentence(),
          sentences: this.faker.lorem.sentences(),
          paragraph: this.faker.lorem.paragraph(),
        },
        {
          words: this.faker.lorem.words(),
          sentence: this.faker.lorem.sentence(),
          sentences: this.faker.lorem.sentences(),
          paragraph: this.faker.lorem.paragraph(),
        },
      ],
      accountHistory: [
        this.faker.helpers.createTransaction(),
        this.faker.helpers.createTransaction(),
        this.faker.helpers.createTransaction(),
      ],
    };
  }

  /**
   * contextualCard
   *
   * @method faker.helpers.contextualCard
   */
  contextualCard() {
    const name = this.faker.name.firstName();
    const userName = this.faker.internet.userName(name);
    return {
      name: name,
      username: userName,
      avatar: this.faker.internet.avatar(),
      email: this.faker.internet.email(userName),
      dob: this.faker.date.past(
        50,
        // TODO @Shinigami92 2022-01-14: We may need to convert this to a string
        // @ts-expect-error
        new Date('Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)')
      ),
      phone: this.faker.phone.phoneNumber(),
      address: {
        street: this.faker.address.streetName(),
        suite: this.faker.address.secondaryAddress(),
        city: this.faker.address.city(),
        zipcode: this.faker.address.zipCode(),
        geo: {
          lat: this.faker.address.latitude(),
          lng: this.faker.address.longitude(),
        },
      },
      website: this.faker.internet.domainName(),
      company: {
        name: this.faker.company.companyName(),
        catchPhrase: this.faker.company.catchPhrase(),
        bs: this.faker.company.bs(),
      },
    };
  }

  /**
   * userCard
   *
   * @method faker.helpers.userCard
   */
  userCard() {
    return {
      name: this.faker.name.findName(),
      username: this.faker.internet.userName(),
      email: this.faker.internet.email(),
      address: {
        street: this.faker.address.streetName(),
        suite: this.faker.address.secondaryAddress(),
        city: this.faker.address.city(),
        zipcode: this.faker.address.zipCode(),
        geo: {
          lat: this.faker.address.latitude(),
          lng: this.faker.address.longitude(),
        },
      },
      phone: this.faker.phone.phoneNumber(),
      website: this.faker.internet.domainName(),
      company: {
        name: this.faker.company.companyName(),
        catchPhrase: this.faker.company.catchPhrase(),
        bs: this.faker.company.bs(),
      },
    };
  }

  /**
   * createTransaction
   *
   * @method faker.helpers.createTransaction
   */
  createTransaction() {
    return {
      amount: this.faker.finance.amount(),
      date: new Date(2012, 1, 2), // TODO: add a ranged date method
      business: this.faker.company.companyName(),
      name: [this.faker.finance.accountName(), this.faker.finance.mask()].join(
        ' '
      ),
      type: this.randomize(this.faker.definitions.finance.transaction_type),
      account: this.faker.finance.account(),
    };
  }
}

/*
String.prototype.capitalize = function () { //v1.0
    return this.replace(/\w+/g, function (a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
    });
};
*/
