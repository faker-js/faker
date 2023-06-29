import { type Faker } from '../..';

export type PasswordMode = 'secure' | 'simple' | 'memorable';

/**
 * Generates a random password.
 *
 * @internal
 *
 * @param faker A faker instance.
 * @param mode The mode in which the password will be generated.
 */
export function createPassword(faker: Faker, mode: PasswordMode): string {
  return new PasswordProviderFactory().createProvider(mode, faker).create();
}

interface PasswordProvider {
  /**
   * Create a random password.
   */
  create(): string;
}

class PasswordProviderFactory {
  createProvider(mode: PasswordMode, faker: Faker): PasswordProvider {
    switch (mode) {
      case 'memorable':
        return new MemorablePasswordProvider(faker);
      case 'simple':
        return new SimplePasswordProvider(faker);
      case 'secure':
      default:
        return new SecurePasswordProvider(faker);
    }
  }
}

/**
 * A password provider which creates passwords by chaining random characters to each other.
 */
class RandomPasswordProvider implements PasswordProvider {
  constructor(
    private readonly faker: Faker,
    private readonly options: {
      /**
       * The specific length of the password.
       */
      length: number;
      /**
       * Whether lowercase letters should be included.
       * If a number is provided the final result will have at least this many lowercase letters.
       */
      includeLowercase: boolean | number;
      /**
       * Whether numbers should be included.
       * If a number is provided the final result will have at least this many numeric characters.
       */
      includeNumber: boolean | number;
      /**
       * Whether symbols should be included.
       * If a number is provided the final result have will at least this many special characters.
       */
      includeSymbol: boolean | number;
      /**
       * Whether uppercase letters should be included.
       * If a number is provided the final result will have at least this many uppercase letters.
       */
      includeUppercase: boolean | number;
    }
  ) {}

  create(): string {
    const charGroups: Array<{
      requireCount: number;
      generateChar: () => string;
    }> = [
      {
        requireCount: this.getCharCountFromOptions(
          this.options.includeLowercase
        ),
        generateChar: () => this.faker.string.alpha({ casing: 'lower' }),
      },
      {
        requireCount: this.getCharCountFromOptions(
          this.options.includeUppercase
        ),
        generateChar: () => this.faker.string.alpha({ casing: 'upper' }),
      },
      {
        requireCount: this.getCharCountFromOptions(this.options.includeNumber),
        generateChar: () => this.faker.string.numeric(),
      },
      {
        requireCount: this.getCharCountFromOptions(this.options.includeSymbol),
        generateChar: () => this.faker.string.symbol(),
      },
    ];

    const chars: string[] = [];

    // iterate over all groups to ensure that the required char count for each is met
    for (const groupOptions of charGroups) {
      const { generateChar, requireCount } = groupOptions;
      chars.push(
        ...this.faker.helpers.multiple(generateChar, { count: requireCount })
      );
    }

    // fill the character list with random ones until we meet the desired password length
    while (chars.length < this.options.length) {
      const { generateChar } = this.faker.helpers.arrayElement(charGroups);
      chars.push(generateChar());
    }

    return this.faker.helpers.shuffle(chars).join('');
  }

  protected getCharCountFromOptions(opt: boolean | number): number {
    if (typeof opt === 'boolean') {
      return opt ? 1 : 0;
    }

    return opt >= 0 ? opt : 0;
  }
}

/**
 * A password provider which creates passwords a simple passwords of random characters.
 * Characters will contain at least one uppercase **OR** lowercase letters, and one digit.
 * The generated password will always have at least 4 characters, but never more than 8.
 */
class SimplePasswordProvider extends RandomPasswordProvider {
  constructor(faker: Faker) {
    const useLower = faker.datatype.boolean();
    super(faker, {
      includeLowercase: useLower,
      includeNumber: true,
      includeSymbol: false,
      includeUppercase: !useLower,
      length: faker.number.int({
        min: 4,
        max: 8,
      }),
    });
  }
}

/**
 * A password provider which creates passwords a secure passwords of random characters.
 * Characters will include at least one:
 * - uppercase letter
 * - lowercase letter
 * - digit
 * - symbol
 *
 * The generated password will always have at least 24 characters, but never more than 64.
 */
class SecurePasswordProvider extends RandomPasswordProvider {
  constructor(faker: Faker) {
    super(faker, {
      includeLowercase: true,
      includeNumber: true,
      includeSymbol: true,
      includeUppercase: true,
      length: faker.number.int({
        min: 24,
        max: 64,
      }),
    });
  }
}

/**
 * A password provider which created passwords by chaining 4 random words.
 */
class MemorablePasswordProvider implements PasswordProvider {
  constructor(private readonly faker: Faker) {}

  create(): string {
    return this.faker.helpers
      .multiple(this.faker.word.sample, { count: 4 })
      .map((word) => word.substring(0, 1).toUpperCase() + word.substring(1))
      .join('');
  }
}
