import type { Faker } from '.';

export type Gender = 'female' | 'male' | 0 | 1;

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
   * @param gender The optional gender to use.
   * Can be either `'male'` (or `0`) or `'female'` (or `1`).
   *
   * @example
   * faker.name.firstName() // 'Antwan'
   * faker.name.firstName("female") // 'Victoria'
   * faker.name.firstName(1) // 'Ashley'
   * faker.name.firstName("male") // 'Tom'
   * faker.name.firstName(0) // 'Ismael'
   */
  firstName(gender?: Gender): string {
    if (
      typeof this.faker.definitions.name.male_first_name !== 'undefined' &&
      typeof this.faker.definitions.name.female_first_name !== 'undefined'
    ) {
      // some locale datasets ( like ru ) have first_name split by gender. since the name.first_name field does not exist in these datasets,
      // we must randomly pick a name from either gender array so faker.name.firstName will return the correct locale data ( and not fallback )

      if (typeof gender === 'string') {
        if (gender.toLowerCase() === 'male') {
          gender = 0;
        } else if (gender.toLowerCase() === 'female') {
          gender = 1;
        }
      }

      if (typeof gender !== 'number') {
        if (typeof this.faker.definitions.name.first_name === 'undefined') {
          gender = this.faker.datatype.number(1);
        } else {
          // Fall back to non-gendered names if they exist and gender wasn't specified
          return this.faker.random.arrayElement(
            this.faker.definitions.name.first_name
          );
        }
      }
      if (gender === 0) {
        return this.faker.random.arrayElement(
          this.faker.definitions.name.male_first_name
        );
      } else {
        return this.faker.random.arrayElement(
          this.faker.definitions.name.female_first_name
        );
      }
    }

    return this.faker.random.arrayElement(
      this.faker.definitions.name.first_name
    );
  }

  /**
   * Returns a random last name.
   *
   * @param gender The optional gender to use.
   * Can be either `'male'` (or `0`) or `'female'` (or `1`).
   *
   * @example
   * faker.name.lastName() // 'Hauck'
   * faker.name.lastName("female") // 'Grady'
   * faker.name.lastName(1) // 'Kshlerin'
   * faker.name.lastName("male") // 'Barton'
   * faker.name.lastName(0) // 'Lockman'
   */
  lastName(gender?: Gender): string {
    if (
      typeof this.faker.definitions.name.male_last_name !== 'undefined' &&
      typeof this.faker.definitions.name.female_last_name !== 'undefined'
    ) {
      // some locale datasets ( like ru ) have last_name split by gender. i have no idea how last names can have genders, but also i do not speak russian
      // see above comment of firstName method
      if (typeof gender !== 'number') {
        gender = this.faker.datatype.number(1);
      }
      if (gender === 0) {
        return this.faker.random.arrayElement(
          this.faker.locales[this.faker.locale].name.male_last_name
        );
      } else {
        return this.faker.random.arrayElement(
          this.faker.locales[this.faker.locale].name.female_last_name
        );
      }
    }

    return this.faker.random.arrayElement(
      this.faker.definitions.name.last_name
    );
  }

  /**
   * Returns a random middle name.
   *
   * @param gender The optional gender to use.
   * Can be either `'male'` (or `0`) or `'female'` (or `1`).
   *
   * @example
   * faker.name.middleName() // 'Доброславівна'
   * faker.name.middleName("female") // 'Анастасівна'
   * faker.name.middleName(1) // 'Анатоліївна'
   * faker.name.middleName("male") // 'Вікторович'
   * faker.name.middleName(0) // 'Стефанович'
   */
  middleName(gender?: Gender): string {
    if (
      typeof this.faker.definitions.name.male_middle_name !== 'undefined' &&
      typeof this.faker.definitions.name.female_middle_name !== 'undefined'
    ) {
      if (typeof gender !== 'number') {
        gender = this.faker.datatype.number(1);
      }
      if (gender === 0) {
        return this.faker.random.arrayElement(
          this.faker.definitions.name.male_middle_name
        );
      } else {
        return this.faker.random.arrayElement(
          this.faker.definitions.name.female_middle_name
        );
      }
    }

    return this.faker.random.arrayElement(
      this.faker.definitions.name.middle_name
    );
  }

  /**
   * Generates a random full name.
   *
   * @param firstName The optional first name to use. If not specified a random one will be chosen.
   * @param lastName The optional last name to use. If not specified a random one will be chosen.
   * @param gender The optional gender to use.
   * Can be either `'male'` (or `0`) or `'female'` (or `1`).
   *
   * @example
   * faker.name.findName() // 'Allen Brown'
   * faker.name.findName('Joann') // 'Joann Osinski'
   * faker.name.findName('Marcella', '', 1) // 'Mrs. Marcella Huels'
   * faker.name.findName(undefined, 'Beer') // 'Mr. Alfonso Beer'
   * faker.name.findName(undefined, undefined, 0) // 'Fernando Schaefer'
   */
  findName(firstName?: string, lastName?: string, gender?: Gender): string {
    const r = this.faker.datatype.number(8);
    let prefix = '';
    let suffix = '';

    // in particular locales first and last names split by gender,
    // thus we keep consistency by passing 0 as male and 1 as female

    if (typeof gender !== 'number') {
      gender = this.faker.datatype.number(1);
    }

    firstName = firstName || this.faker.name.firstName(gender);
    lastName = lastName || this.faker.name.lastName(gender);

    switch (r) {
      case 0:
        prefix = this.faker.name.prefix(gender);
        if (prefix) {
          return prefix + ' ' + firstName + ' ' + lastName;
        }
      // TODO @Shinigami92 2022-01-21: Not sure if this fallthrough is wanted
      // eslint-disable-next-line no-fallthrough
      case 1:
        suffix = this.faker.name.suffix();
        if (suffix) {
          return firstName + ' ' + lastName + ' ' + suffix;
        }
    }

    return firstName + ' ' + lastName;
  }

  /**
   * Generates a random job title.
   *
   * @example
   * faker.name.jobTitle() // 'Global Accounts Engineer'
   */
  jobTitle(): string {
    return (
      this.faker.name.jobDescriptor() +
      ' ' +
      this.faker.name.jobArea() +
      ' ' +
      this.faker.name.jobType()
    );
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
      return this.faker.random.arrayElement(
        this.faker.definitions.name.binary_gender
      );
    } else {
      return this.faker.random.arrayElement(this.faker.definitions.name.gender);
    }
  }

  /**
   * Returns a random name prefix.
   *
   * @param gender The optional gender to use.
   * Can be either `'male'` (or `0`) or `'female'` (or `1`).
   *
   * @example
   * faker.name.prefix() // 'Miss'
   * faker.name.prefix('female') // 'Ms.'
   * faker.name.prefix(1) // 'Dr.'
   * faker.name.prefix('male') // 'Mr.'
   * faker.name.prefix(0) // 'Mr.'
   */
  prefix(gender?: Gender): string {
    if (
      typeof this.faker.definitions.name.male_prefix !== 'undefined' &&
      typeof this.faker.definitions.name.female_prefix !== 'undefined'
    ) {
      if (typeof gender !== 'number') {
        gender = this.faker.datatype.number(1);
      }
      if (gender === 0) {
        return this.faker.random.arrayElement(
          this.faker.locales[this.faker.locale].name.male_prefix
        );
      } else {
        return this.faker.random.arrayElement(
          this.faker.locales[this.faker.locale].name.female_prefix
        );
      }
    }

    return this.faker.random.arrayElement(this.faker.definitions.name.prefix);
  }

  /**
   * Returns a random name suffix.
   *
   * @example
   * faker.name.suffix() // 'DDS'
   */
  suffix(): string {
    return this.faker.random.arrayElement(this.faker.definitions.name.suffix);
  }

  /**
   * Generates a random title.
   *
   * @example
   * faker.name.title() // 'International Integration Manager'
   */
  title(): string {
    const descriptor = this.faker.random.arrayElement(
      this.faker.definitions.name.title.descriptor
    );
    const level = this.faker.random.arrayElement(
      this.faker.definitions.name.title.level
    );
    const job = this.faker.random.arrayElement(
      this.faker.definitions.name.title.job
    );

    return descriptor + ' ' + level + ' ' + job;
  }

  /**
   * Generates a random job descriptor.
   *
   * @example
   * faker.name.jobDescriptor() // 'Customer'
   */
  jobDescriptor(): string {
    return this.faker.random.arrayElement(
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
    return this.faker.random.arrayElement(
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
    return this.faker.random.arrayElement(
      this.faker.definitions.name.title.job
    );
  }
}
