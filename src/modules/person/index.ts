import type { Faker } from '../..';

export enum Sex {
  Female = 'female',
  Male = 'male',
}

export type SexType = `${Sex}`;

/**
 * Select a definition based on given sex.
 *
 * @param faker Faker instance.
 * @param sex Sex.
 * @param param2 Definitions.
 * @param param2.generic Non-sex definitions.
 * @param param2.female Female definitions.
 * @param param2.male Male definitions.
 * @returns Definition based on given sex.
 */
function selectDefinition(
  faker: Faker,
  sex: SexType | undefined,
  // TODO @Shinigami92 2022-03-21: Remove fallback empty object when `strict: true`
  {
    generic,
    female,
    male,
  }: { generic?: string[]; female?: string[]; male?: string[] } = {}
) {
  let values: string[] | undefined;

  switch (sex) {
    case Sex.Female:
      values = female;
      break;

    case Sex.Male:
      values = male;
      break;

    default:
      values = generic;
      break;
  }

  if (values == null) {
    if (female != null && male != null) {
      values = faker.helpers.arrayElement([female, male]);
    } else {
      values = generic;
    }
  }

  return faker.helpers.arrayElement(values);
}

/**
 * Module to generate people's names and titles.
 */
export class PersonModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(PersonModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }

      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random first name.
   *
   * @param sex The optional sex to use.
   * Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.person.firstName() // 'Antwan'
   * faker.person.firstName('female') // 'Victoria'
   * faker.person.firstName('male') // 'Tom'
   *
   * @since 8.0.0
   */
  firstName(sex?: SexType): string {
    const { first_name, female_first_name, male_first_name } =
      this.faker.definitions.person;

    return selectDefinition(this.faker, sex, {
      generic: first_name,
      female: female_first_name,
      male: male_first_name,
    });
  }

  /**
   * Returns a random last name.
   *
   * @param sex The optional sex to use.
   * Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.person.lastName() // 'Hauck'
   * faker.person.lastName('female') // 'Grady'
   * faker.person.lastName('male') // 'Barton'
   *
   * @since 8.0.0
   */
  lastName(sex?: SexType): string {
    const { last_name, female_last_name, male_last_name } =
      this.faker.definitions.person;

    return selectDefinition(this.faker, sex, {
      generic: last_name,
      female: female_last_name,
      male: male_last_name,
    });
  }

  /**
   * Returns a random middle name.
   *
   * @param sex The optional sex to use.
   * Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.person.middleName() // 'James'
   * faker.person.middleName('female') // 'Eloise'
   * faker.person.middleName('male') // 'Asher'
   *
   * @since 8.0.0
   */
  middleName(sex?: SexType): string {
    const { middle_name, female_middle_name, male_middle_name } =
      this.faker.definitions.person;

    return selectDefinition(this.faker, sex, {
      generic: middle_name,
      female: female_middle_name,
      male: male_middle_name,
    });
  }

  /**
   * Generates a random full name.
   *
   * @param options An options object. Defaults to `{}`.
   * @param options.firstName The optional first name to use. If not specified a random one will be chosen.
   * @param options.lastName The optional last name to use. If not specified a random one will be chosen.
   * @param options.sex The optional sex to use. Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.person.fullName() // 'Allen Brown'
   * faker.person.fullName({ firstName: 'Joann' }) // 'Joann Osinski'
   * faker.person.fullName({ firstName: 'Marcella', sex: 'female' }) // 'Mrs. Marcella Huels'
   * faker.person.fullName({ lastName: 'Beer' }) // 'Mr. Alfonso Beer'
   * faker.person.fullName({ sex: 'male' }) // 'Fernando Schaefer'
   *
   * @since 8.0.0
   */
  fullName(
    options: {
      /**
       * The optional first name to use. If not specified a random one will be chosen.
       *
       * @default faker.person.firstName(sex)
       */
      firstName?: string;
      /**
       * The optional last name to use. If not specified a random one will be chosen.
       *
       * @default faker.person.lastName(sex)
       */
      lastName?: string;
      /**
       * The optional sex to use. Can be either `'female'` or `'male'`.
       *
       * @default faker.helpers.arrayElement(['female', 'male'])
       */
      sex?: SexType;
    } = {}
  ): string {
    const {
      sex = this.faker.helpers.arrayElement([Sex.Female, Sex.Male]),
      firstName = this.firstName(sex),
      lastName = this.lastName(sex),
    } = options;

    const fullNamePattern: string = this.faker.helpers.weightedArrayElement(
      this.faker.definitions.person.name
    );
    const lastName2 = fullNamePattern.includes('{{person.lastName2}}')
      ? this.lastName(sex)
      : '';

    const fullName = this.faker.helpers.mustache(fullNamePattern, {
      'person.prefix': () => this.prefix(sex),
      'person.firstName': () => firstName,
      'person.middleName': () => this.middleName(sex),
      'person.lastName': () => lastName,
      'person.lastName2': () => lastName2,
      'person.suffix': () => this.suffix(),
    });
    return fullName;
  }

  /**
   * Returns a random gender.
   *
   * @see faker.person.sex() if you would like to generate binary-gender value
   *
   * @example
   * faker.person.gender() // 'Trans*Man'
   *
   * @since 8.0.0
   */
  gender(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.person.gender
    );
  }

  /**
   * Returns a random sex.
   *
   * Output of this method is localised, so it should not be used to fill the parameter `sex`
   * available in some other modules for example `faker.person.firstName()`.
   *
   * @see faker.person.gender() if you would like to generate gender related values.
   *
   * @example
   * faker.person.sex() // 'female'
   *
   * @since 8.0.0
   */
  sex(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.person.sex);
  }

  /**
   * Returns a random sex type.
   *
   * @example
   * faker.person.sexType() // Sex.Female
   *
   * @since 8.0.0
   */
  sexType(): SexType {
    return this.faker.helpers.objectValue(Sex);
  }

  /**
   * Returns a random short biography
   *
   * @example
   * faker.person.bio() // 'oatmeal advocate, veteran 🐠'
   *
   * @since 8.0.0
   */
  bio(): string {
    const { bio_patterns } = this.faker.definitions.person;

    return this.faker.helpers.fake(bio_patterns);
  }

  /**
   * Returns a random person prefix.
   *
   * @param sex The optional sex to use. Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.person.prefix() // 'Miss'
   * faker.person.prefix('female') // 'Ms.'
   * faker.person.prefix('male') // 'Mr.'
   *
   * @since 8.0.0
   */
  prefix(sex?: SexType): string {
    const { prefix, female_prefix, male_prefix } =
      this.faker.definitions.person;

    return selectDefinition(this.faker, sex, {
      generic: prefix,
      female: female_prefix,
      male: male_prefix,
    });
  }

  /**
   * Returns a random person suffix.
   *
   * @example
   * faker.person.suffix() // 'DDS'
   *
   * @since 8.0.0
   */
  suffix(): string {
    // TODO @Shinigami92 2022-03-21: Add female_suffix and male_suffix
    return this.faker.helpers.arrayElement(
      this.faker.definitions.person.suffix
    );
  }

  /**
   * Generates a random job title.
   *
   * @example
   * faker.person.jobTitle() // 'Global Accounts Engineer'
   *
   * @since 8.0.0
   */
  jobTitle(): string {
    return `${this.jobDescriptor()} ${this.jobArea()} ${this.jobType()}`;
  }

  /**
   * Generates a random job descriptor.
   *
   * @example
   * faker.person.jobDescriptor() // 'Customer'
   *
   * @since 8.0.0
   */
  jobDescriptor(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.person.title.descriptor
    );
  }

  /**
   * Generates a random job area.
   *
   * @example
   * faker.person.jobArea() // 'Brand'
   *
   * @since 8.0.0
   */
  jobArea(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.person.title.level
    );
  }

  /**
   * Generates a random job type.
   *
   * @example
   * faker.person.jobType() // 'Assistant'
   *
   * @since 8.0.0
   */
  jobType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.person.title.job
    );
  }

  /**
   * Returns a random zodiac sign.
   *
   * @example
   * faker.person.zodiacSign() // 'Pisces'
   *
   * @since 8.0.0
   */
  zodiacSign(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.person.western_zodiac_sign
    );
  }
}
