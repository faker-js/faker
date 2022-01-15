import type { Faker } from '.';

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
   * firstName
   *
   * @method faker.name.firstName
   * @param gender
   * @memberof faker.name
   */
  firstName(gender?: string | number): string {
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
   * lastName
   *
   * @method lastName
   * @param gender
   * @memberof faker.name
   */
  lastName(gender?: string | number): string {
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
   * middleName
   *
   * @method middleName
   * @param gender
   * @memberof faker.name
   */
  middleName(gender?: string | number): string {
    if (
      typeof this.faker.definitions.name.male_middle_name !== 'undefined' &&
      typeof this.faker.definitions.name.female_middle_name !== 'undefined'
    ) {
      if (typeof gender !== 'number') {
        gender = this.faker.datatype.number(1);
      }
      if (gender === 0) {
        return this.faker.random.arrayElement(
          this.faker.locales[this.faker.locale].name.male_middle_name
        );
      } else {
        return this.faker.random.arrayElement(
          this.faker.locales[this.faker.locale].name.female_middle_name
        );
      }
    }

    return this.faker.random.arrayElement(
      this.faker.definitions.name.middle_name
    );
  }

  /**
   * findName
   *
   * @method findName
   * @param firstName
   * @param lastName
   * @param gender
   * @memberof faker.name
   */
  findName(
    firstName?: string,
    lastName?: string,
    gender?: string | number
  ): string {
    const r = this.faker.datatype.number(8);
    let prefix = '';
    let suffix = '';

    // in particular locales first and last names split by gender,
    // thus we keep consistency by passing 0 as male and 1 as female

    if (typeof gender !== 'number') {
      gender = this.faker.datatype.number(1);
    }

    firstName ||= this.faker.name.firstName(gender);
    lastName ||= this.faker.name.lastName(gender);

    switch (r) {
      case 0:
        prefix = this.faker.name.prefix(gender);
        if (prefix) {
          return prefix + ' ' + firstName + ' ' + lastName;
        }
      case 1:
        suffix = this.faker.name.suffix();
        if (suffix) {
          return firstName + ' ' + lastName + ' ' + suffix;
        }
    }

    return firstName + ' ' + lastName;
  }

  /**
   * jobTitle
   *
   * @method jobTitle
   * @memberof faker.name
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
   * gender
   *
   * @method gender
   * @param binary
   * @memberof faker.name
   */
  gender(binary: boolean): string {
    if (binary) {
      return this.faker.random.arrayElement(
        this.faker.definitions.name.binary_gender
      );
    } else {
      return this.faker.random.arrayElement(this.faker.definitions.name.gender);
    }
  }

  /**
   * prefix
   *
   * @method prefix
   * @param gender
   * @memberof faker.name
   */
  prefix(gender?: string | number): string {
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
   * suffix
   *
   * @method suffix
   * @memberof faker.name
   */
  suffix(): string {
    return this.faker.random.arrayElement(this.faker.definitions.name.suffix);
  }

  /**
   * title
   *
   * @method title
   * @memberof faker.name
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
   * jobDescriptor
   *
   * @method jobDescriptor
   * @memberof faker.name
   */
  jobDescriptor(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.name.title.descriptor
    );
  }

  /**
   * jobArea
   *
   * @method jobArea
   * @memberof faker.name
   */
  jobArea(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.name.title.level
    );
  }

  /**
   * jobType
   *
   * @method jobType
   * @memberof faker.name
   */
  jobType(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.name.title.job
    );
  }
}
