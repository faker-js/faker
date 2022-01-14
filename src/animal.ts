import type { Faker } from '.';

export class Animal {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(Animal.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * dog
   *
   * @method faker.animal.dog
   */
  dog() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.dog);
  }

  /**
   * cat
   *
   * @method faker.animal.cat
   */
  cat() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.cat);
  }

  /**
   * snake
   *
   * @method faker.animal.snake
   */
  snake() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.snake);
  }

  /**
   * bear
   *
   * @method faker.animal.bear
   */
  bear() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.bear);
  }

  /**
   * lion
   *
   * @method faker.animal.lion
   */
  lion() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.lion);
  }

  /**
   * cetacean
   *
   * @method faker.animal.cetacean
   */
  cetacean() {
    return this.faker.random.arrayElement(
      this.faker.definitions.animal.cetacean
    );
  }

  /**
   * horse
   *
   * @method faker.animal.horse
   */
  horse() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.horse);
  }

  /**
   * bird
   *
   * @method faker.animal.bird
   */
  bird() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.bird);
  }

  /**
   * cow
   *
   * @method faker.animal.cow
   */
  cow() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.cow);
  }

  /**
   * fish
   *
   * @method faker.animal.fish
   */
  fish() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.fish);
  }

  /**
   * crocodilia
   *
   * @method faker.animal.crocodilia
   */
  crocodilia() {
    return this.faker.random.arrayElement(
      this.faker.definitions.animal.crocodilia
    );
  }

  /**
   * insect
   *
   * @method faker.animal.insect
   */
  insect() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.insect);
  }

  /**
   * rabbit
   *
   * @method faker.animal.rabbit
   */
  rabbit() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.rabbit);
  }

  /**
   * type
   *
   * @method faker.animal.type
   */
  type() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.type);
  }
}
