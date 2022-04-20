import type { Faker } from '.';
import { deprecated } from './internal/deprecated';

/**
 * A full card with various details.
 */
export interface Card {
  name: string;
  username: string;
  email: string;
  address: {
    streetA: string;
    streetB: string;
    streetC: string;
    streetD: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  posts: Array<{
    words: string;
    sentence: string;
    sentences: string;
    paragraph: string;
  }>;
  accountHistory: Array<{
    amount: string;
    date: Date;
    business: string;
    name: string;
    type: string;
    account: string;
  }>;
}

/**
 * A persons card with various details attempting to use a consistent context.
 */
export interface ContextualCard {
  name: string;
  username: string;
  avatar: string;
  email: string;
  dob: Date;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * A user card with various details.
 */
export interface UserCard {
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/**
 * A transaction info.
 */
export interface Transaction {
  amount: string;
  date: Date;
  business: string;
  name: string;
  type: string;
  account: string;
}

/**
 * Module with various helper methods that don't fit in a particular category.
 */
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
   * Backward-compatibility. Use `faker.random.arrayElement()` instead.
   *
   * Takes an array and returns a random element of the array.
   *
   * @template T The type of the entries to pick from.
   * @param array The array to select an element from.
   *
   * @see faker.random.arrayElement()
   *
   * @example
   * faker.helpers.randomize() // 'c'
   * faker.helpers.randomize([1, 2, 3]) // '2'
   *
   * @deprecated
   */
  randomize<T = string>(
    array: ReadonlyArray<T> = ['a', 'b', 'c'] as unknown as ReadonlyArray<T>
  ): T {
    deprecated({
      deprecated: 'faker.helpers.randomize()',
      proposed: 'faker.random.arrayElement()',
      // since: 'v5.0.0', (?)
      until: 'v7.0.0',
    });
    return this.faker.random.arrayElement(array);
  }

  /**
   * Slugifies the given string.
   * For that all spaces (` `) are replaced by hyphens (`-`)
   * and most non word characters except for dots and hyphens will be removed.
   *
   * @param string The input to slugify.
   *
   * @example
   * faker.helpers.slugify() // ''
   * faker.helpers.slugify("Hello world!") // 'Hello-world'
   */
  slugify(string: string = ''): string {
    return string
      .replace(/ /g, '-')
      .replace(/[^\一-龠\ぁ-ゔ\ァ-ヴー\w\.\-]+/g, '');
  }

  /**
   * Parses the given string symbol by symbol and replaces the placeholders with digits (`0` - `9`).
   * `!` will be replaced by digits >=2 (`2` - `9`).
   *
   * @param string The template string to parse.
   * @param symbol The symbol to replace with digits. Defaults to `'#'`.
   *
   * @example
   * faker.helpers.replaceSymbolWithNumber() // ''
   * faker.helpers.replaceSymbolWithNumber('#####') // '04812'
   * faker.helpers.replaceSymbolWithNumber('!####') // '27378'
   * faker.helpers.replaceSymbolWithNumber('Your pin is: !####') // '29841'
   */
  replaceSymbolWithNumber(string: string = '', symbol: string = '#'): string {
    let str = '';
    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) === symbol) {
        str += this.faker.datatype.number(9);
      } else if (string.charAt(i) === '!') {
        str += this.faker.datatype.number({ min: 2, max: 9 });
      } else {
        str += string.charAt(i);
      }
    }
    return str;
  }

  /**
   * Parses the given string symbol by symbols and replaces the placeholder appropriately.
   *
   * - `#` will be replaced with a digit (`0` - `9`).
   * - `?` will be replaced with an upper letter ('A' - 'Z')
   * - and `*` will be replaced with either a digit or letter.
   *
   * @param string The template string to parse.
   *
   * @example
   * faker.helpers.replaceSymbols() // ''
   * faker.helpers.replaceSymbols('#####') // '98441'
   * faker.helpers.replaceSymbols('?????') // 'ZYRQQ'
   * faker.helpers.replaceSymbols('*****') // '4Z3P7'
   * faker.helpers.replaceSymbols('Your pin is: #?*#?*') // '0T85L1'
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
      if (string.charAt(i) === '#') {
        str += this.faker.datatype.number(9);
      } else if (string.charAt(i) === '?') {
        str += this.faker.random.arrayElement(alpha);
      } else if (string.charAt(i) === '*') {
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
   * Replaces the symbols and patterns in a credit card schema including Luhn checksum.
   *
   * This method supports both range patterns `[4-9]` as well as the patterns used by `replaceSymbolWithNumber()`.
   * `L` will be replaced with the appropriate Luhn checksum.
   *
   * @param string The credit card format pattern. Defaults to `6453-####-####-####-###L`.
   * @param symbol The symbol to replace with a digit.
   *
   * @example
   * faker.helpers.replaceCreditCardSymbols() // '6453-4876-8626-8995-3779'
   * faker.helpers.replaceCreditCardSymbols('1234-[4-9]-##!!-L') // '1234-9-5298-2'
   */
  replaceCreditCardSymbols(
    string: string = '6453-####-####-####-###L',
    symbol: string = '#'
  ): string {
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

    string = this.regexpStyleStringParse(string); // replace [4-9] with a random number in range etc...
    string = this.replaceSymbolWithNumber(string, symbol); // replace ### with random numbers

    const numberList = string
      .replace(/\D/g, '')
      .split('')
      .map((num) => parseInt(num));
    const checkNum = getCheckBit(numberList);
    return string.replace('L', String(checkNum));
  }

  /**
   * Repeats the given string the given number of times.
   *
   * @param string The string to repeat. Defaults to `''`.
   * @param num The number of times to repeat it. Defaults to `0`.
   *
   * @example
   * faker.helpers.repeatString('Hello world! ') // ''
   * faker.helpers.repeatString('Hello world! ', 1) // 'Hello world! '
   * faker.helpers.repeatString('Hello world! ', 2) // 'Hello world! Hello world! '
   */
  repeatString(string = '', num = 0): string {
    let text = '';
    for (let i = 0; i < num; i++) {
      text += string.toString();
    }
    return text;
  }

  /**
   * Replaces the regex like expressions in the given string with matching values.
   *
   * Supported patterns:
   * - `.{times}` => Repeat the character exactly `times` times.
   * - `.{min,max}` => Repeat the character `min` to `max` times.
   * - `[min-max]` => Generate a number between min and max (inclusive).
   *
   * @param string The template string to to parse.
   *
   * @example
   * faker.helpers.regexpStyleStringParse() // ''
   * faker.helpers.regexpStyleStringParse('#{5}') // '#####'
   * faker.helpers.regexpStyleStringParse('#{2,9}') // '#######'
   * faker.helpers.regexpStyleStringParse('[500-15000]') // '8375'
   * faker.helpers.regexpStyleStringParse('#{3}test[1-5]') // '###test3'
   */
  regexpStyleStringParse(string: string = ''): string {
    // Deal with range repeat `{min,max}`
    const RANGE_REP_REG = /(.)\{(\d+)\,(\d+)\}/;
    const REP_REG = /(.)\{(\d+)\}/;
    const RANGE_REG = /\[(\d+)\-(\d+)\]/;
    let min: number;
    let max: number;
    let tmp: number;
    let repetitions: number;
    let token = string.match(RANGE_REP_REG);
    while (token != null) {
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
        this.repeatString(token[1], repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(RANGE_REP_REG);
    }
    // Deal with repeat `{num}`
    token = string.match(REP_REG);
    while (token != null) {
      repetitions = parseInt(token[2]);
      string =
        string.slice(0, token.index) +
        this.repeatString(token[1], repetitions) +
        string.slice(token.index + token[0].length);
      token = string.match(REP_REG);
    }
    // Deal with range `[min-max]` (only works with numbers for now)
    //TODO: implement for letters e.g. [0-9a-zA-Z] etc.

    token = string.match(RANGE_REG);
    while (token != null) {
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
   * Takes an array and randomizes it in place then returns it.
   *
   * Uses the modern version of the Fisher–Yates algorithm.
   *
   * @template T The type of the entries to shuffle.
   * @param o The array to shuffle. Defaults to `[]`.
   *
   * @example
   * faker.helpers.shuffle() // []
   * faker.helpers.shuffle(['a', 'b', 'c']) // [ 'b', 'c', 'a' ]
   */
  shuffle<T>(o?: T[]): T[] {
    if (o == null || o.length === 0) {
      return o || [];
    }

    for (let i = o.length - 1; i > 0; --i) {
      const j = this.faker.datatype.number(i);
      const x = o[i];
      o[i] = o[j];
      o[j] = x;
    }
    return o;
  }

  /**
   * Takes an array of strings or function that returns a string
   * and outputs a unique array of strings based on that source.
   * This method does not store the unique state between invocations.
   *
   * @template T The type of the entries.
   * @param source The strings to choose from or a function that generates a string.
   * @param length The number of elements to generate.
   *
   * @example
   * faker.helpers.uniqueArray(faker.random.word, 50)
   * faker.helpers.uniqueArray(faker.definitions.name.first_name, 6)
   * faker.helpers.uniqueArray(["Hello", "World", "Goodbye"], 2)
   */
  uniqueArray<T>(source: readonly T[] | (() => T), length: number): T[] {
    if (Array.isArray(source)) {
      const set = new Set<T>(source);
      const array = Array.from(set);
      return this.shuffle(array).splice(0, length);
    }
    const set = new Set<T>();
    try {
      if (typeof source === 'function') {
        while (set.size < length) {
          set.add(source());
        }
      }
    } catch {
      // Ignore
    }
    return Array.from(set);
  }

  /**
   * Replaces the `{{placeholder}}` patterns in the given string mustache style.
   *
   * @param str The template string to parse.
   * @param data The data used to populate the placeholders.
   * This is a record where the key is the template placeholder,
   * whereas the value is either a string or a function suitable for `String.replace()`.
   *
   * @example
   * faker.helpers.mustache('I found {{count}} instances of "{{word}}".', {
   *   count: () => `${faker.datatype.number()}`,
   *   word: "this word",
   * }) // 'I found 57591 instances of "this word".'
   */
  mustache(
    str: string | undefined,
    data: Record<string, string | Parameters<string['replace']>[1]>
  ): string {
    if (str == null) {
      return '';
    }
    for (const p in data) {
      const re = new RegExp(`{{${p}}}`, 'g');
      const value = data[p];
      if (typeof value === 'string') {
        str = str.replace(re, value);
      } else {
        str = str.replace(re, value);
      }
    }
    return str;
  }

  /**
   * Generates a full card with various random details.
   *
   * @example
   * faker.helpers.createCard()
   * // {
   * //   name: 'Maxine Abbott',
   * //   username: 'Idell_Kautzer60',
   * //   email: 'Nora_Bruen@hotmail.com',
   * //   address: {
   * //     streetA: 'Drake Avenue',
   * // ...
   * @deprecated If you need some specific object you should create your own method.
   */
  createCard(): Card {
    deprecated({
      deprecated: 'helpers.createCard()',
      proposed: 'a self-build function',
      since: 'v6.1.0',
      until: 'v7.0.0',
    });
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
        this.createTransaction(),
        this.createTransaction(),
        this.createTransaction(),
      ],
    };
  }

  /**
   * Generates a persons card with various details attempting to use a consistent context.
   *
   * @example
   * faker.helpers.contextualCard()
   * // {
   * //   name: 'Eveline',
   * //   username: 'Eveline.Brekke56',
   * //   avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/122.jpg',
   * //   email: 'Eveline.Brekke56.Hoppe@yahoo.com',
   * //   dob: 1964-05-06T05:14:37.874Z,
   * // ...
   * @deprecated If you need some specific object you should create your own method.
   */
  contextualCard(): ContextualCard {
    deprecated({
      deprecated: 'helpers.contextualCard()',
      proposed: 'a self-build function',
      since: 'v6.1.0',
      until: 'v7.0.0',
    });
    const name = this.faker.name.firstName();
    const userName = this.faker.internet.userName(name);
    return {
      name: name,
      username: userName,
      avatar: this.faker.internet.avatar(),
      email: this.faker.internet.email(userName),
      dob: this.faker.date.past(
        50,
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
   * Generates a user card with various details.
   *
   * @example
   * faker.helpers.userCard()
   * // {
   * //   name: 'Jodi Ferry',
   * //   username: 'Maybell.Kris',
   * //   email: 'Zoey_Lubowitz@yahoo.com',
   * //   address: {
   * //     street: 'McKenzie Estates',
   * // ....
   * @deprecated If you need some specific object you should create your own method.
   */
  userCard(): UserCard {
    deprecated({
      deprecated: 'helpers.userCard()',
      proposed: 'a self-build function',
      since: 'v6.1.0',
      until: 'v7.0.0',
    });
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
   * Generates an example transaction.
   *
   * @example
   * faker.helpers.createTransaction()
   * // {
   * //   amount: '551.32',
   * //   date: 2012-02-01T23:00:00.000Z,
   * //   business: 'Will, Fisher and Marks',
   * //   name: 'Investment Account (...8755)',
   * //   type: 'invoice',
   * //   account: '41796240'
   * // }
   */
  createTransaction(): Transaction {
    return {
      amount: this.faker.finance.amount(),
      date: new Date(2012, 1, 2), // TODO: add a ranged date method
      business: this.faker.company.companyName(),
      name: [this.faker.finance.accountName(), this.faker.finance.mask()].join(
        ' '
      ),
      type: this.faker.random.arrayElement(
        this.faker.definitions.finance.transaction_type
      ),
      account: this.faker.finance.account(),
    };
  }
}
