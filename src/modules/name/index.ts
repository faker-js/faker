import type { Faker } from '../..';

export enum Sex {
  Female = 'female',
  Male = 'male',
}

type SexValue = `${Sex}`;

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
  sex: Sex | SexValue | undefined,
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
export class Name {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Name.prototype)) {
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
   * faker.name.firstName() // 'Antwan'
   * faker.name.firstName("female") // 'Victoria'
   * faker.name.firstName("male") // 'Tom'
   */
  firstName(sex?: Sex | SexValue): string {
    const { first_name, female_first_name, male_first_name } =
      this.faker.definitions.name;

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
   * faker.name.lastName() // 'Hauck'
   * faker.name.lastName("female") // 'Grady'
   * faker.name.lastName("male") // 'Barton'
   */
  lastName(sex?: Sex | SexValue): string {
    const { last_name, female_last_name, male_last_name } =
      this.faker.definitions.name;

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
   * faker.name.middleName() // 'Доброславівна'
   * faker.name.middleName("female") // 'Анастасівна'
   * faker.name.middleName("male") // 'Вікторович'
   */
  middleName(sex?: Sex | SexValue): string {
    const { middle_name, female_middle_name, male_middle_name } =
      this.faker.definitions.name;

    return selectDefinition(this.faker, sex, {
      generic: middle_name,
      female: female_middle_name,
      male: male_middle_name,
    });
  }

  /**
   * Generates a random full name.
   *
   * @param firstName The optional first name to use. If not specified a random one will be chosen.
   * @param lastName The optional last name to use. If not specified a random one will be chosen.
   * @param sex The optional sex to use. Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.name.findName() // 'Allen Brown'
   * faker.name.findName('Joann') // 'Joann Osinski'
   * faker.name.findName('Marcella', '', 'female') // 'Mrs. Marcella Huels'
   * faker.name.findName(undefined, 'Beer') // 'Mr. Alfonso Beer'
   * faker.name.findName(undefined, undefined, 'male') // 'Fernando Schaefer'
   */
  findName(
    firstName?: string,
    lastName?: string,
    sex?: Sex | SexValue
  ): string {
    const normalizedSex: Sex | SexValue =
      sex ?? this.faker.helpers.arrayElement([Sex.Female, Sex.Male]);

    firstName = firstName || this.firstName(normalizedSex);
    lastName = lastName || this.lastName(normalizedSex);

    const nameParts: string[] = [];
    const prefix = this.faker.helpers.maybe(() => this.prefix(sex), {
      probability: 0.125,
    });

    if (prefix) {
      nameParts.push(prefix);
    }

    nameParts.push(firstName);
    nameParts.push(lastName);

    const suffix = this.faker.helpers.maybe(() => this.suffix(), {
      probability: 0.125,
    });

    if (suffix) {
      nameParts.push(suffix);
    }

    return nameParts.join(' ');
  }

  /**
   * Return a random gender.
   *
   * @param binary Whether to return only binary gender names. Defaults to `false`.
   *
   * @example
   * faker.name.gender() // 'Trans*Man'
   * faker.name.gender(true) // 'Female'
   */
  gender(binary?: boolean): string {
    if (binary) {
      return this.faker.helpers.arrayElement(
        this.faker.definitions.name.binary_gender
      );
    }

    return this.faker.helpers.arrayElement(this.faker.definitions.name.gender);
  }

  /**
   * Returns a random name prefix.
   *
   * @param sex The optional sex to use. Can be either `'female'` or `'male'`.
   *
   * @example
   * faker.name.prefix() // 'Miss'
   * faker.name.prefix('female') // 'Ms.'
   * faker.name.prefix('male') // 'Mr.'
   */
  prefix(sex?: Sex | SexValue): string {
    const { prefix, female_prefix, male_prefix } = this.faker.definitions.name;

    return selectDefinition(this.faker, sex, {
      generic: prefix,
      female: female_prefix,
      male: male_prefix,
    });
  }

  /**
   * Returns a random name suffix.
   *
   * @example
   * faker.name.suffix() // 'DDS'
   */
  suffix(): string {
    // TODO @Shinigami92 2022-03-21: Add female_suffix and male_suffix
    return this.faker.helpers.arrayElement(this.faker.definitions.name.suffix);
  }

  /**
   * Generates a random job title.
   *
   * @example
   * faker.name.jobTitle() // 'Global Accounts Engineer'
   */
  jobTitle(): string {
    return `${this.jobDescriptor()} ${this.jobArea()} ${this.jobType()}`;
  }

  /**
   * Generates a random job descriptor.
   *
   * @example
   * faker.name.jobDescriptor() // 'Customer'
   */
  jobDescriptor(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.name.title.descriptor
    );
  }

  /**
   * Generates a random job area.
   *
   * @example
   * faker.name.jobArea() // 'Brand'
   */
  jobArea(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.name.title.level
    );
  }

  /**
   * Generates a random job type.
   *
   * @example
   * faker.name.jobType() // 'Assistant'
   */
  jobType(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.name.title.job
    );
  }
}
