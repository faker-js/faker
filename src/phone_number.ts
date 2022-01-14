import type { Faker } from '.';

export class Phone {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Phone.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * phoneNumber
   *
   * @method faker.phone.phoneNumber
   * @param format
   * @memberOf faker.phone
   */
  phoneNumber(format?: string) {
    format ||= this.faker.phone.phoneFormats();
    return this.faker.helpers.replaceSymbolWithNumber(format);
  }

  // FIXME: this is strange passing in an array index.
  /**
   * phoneNumberFormat
   *
   * @method faker.phone.phoneFormatsArrayIndex
   * @param phoneFormatsArrayIndex
   * @memberOf faker.phone
   */
  phoneNumberFormat(phoneFormatsArrayIndex: number = 0) {
    return this.faker.helpers.replaceSymbolWithNumber(
      this.faker.definitions.phone_number.formats[phoneFormatsArrayIndex]
    );
  }

  /**
   * phoneFormats
   *
   * @method faker.phone.phoneFormats
   */
  phoneFormats(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.phone_number.formats
    );
  }
}
