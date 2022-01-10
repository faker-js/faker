import type { Faker } from '.';

export class Random {
  constructor(private readonly faker: Faker, seed?: any[] | any) {
    // Use a user provided seed if it is an array or number
    if (Array.isArray(seed) && seed.length) {
      this.faker.mersenne.seed_array(seed);
    } else if (!isNaN(seed)) {
      this.faker.mersenne.seed(seed);
    }
  }

  /**
   * Takes an array and returns a random element of the array.
   *
   * @method faker.random.arrayElement
   * @param  array
   */
  arrayElement(array) {
    array = array || ['a', 'b', 'c'];
    var r = this.faker.datatype.number({ max: array.length - 1 });
    return array[r];
  }
}
