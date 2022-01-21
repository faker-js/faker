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
   * Returns a random dog breed.
   *
   */
  dog() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.dog);
  }

  /**
   * Returns a random cat breed.
   *
   */
  cat() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.cat);
  }

  /**
   * Returns a random snake species.
   *
   */
  snake() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.snake);
  }

  /**
   * Returns a random bear species.
   *
   */
  bear() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.bear);
  }

  /**
   * Returns a random lion species.
   *
   */
  lion() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.lion);
  }

  /**
   * Returns a random cetacean species.
   *
   * @method faker.animal.cetacean
   */
  cetacean() {
    return this.faker.random.arrayElement(
      this.faker.definitions.animal.cetacean
    );
  }

  /**
   * Returns a random horse breed.
   *
   */
  horse() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.horse);
  }

  /**
   * Returns a random bird species.
   *
   */
  bird() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.bird);
  }

  /**
   * Returns a random cow species.
   *
   */
  cow() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.cow);
  }

  /**
   * Returns a random fish species.
   *
   */
  fish() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.fish);
  }

  /**
   * Returns a random crocodilian species.
   *
   */
  crocodilia() {
    return this.faker.random.arrayElement(
      this.faker.definitions.animal.crocodilia
    );
  }

  /**
   * Returns a random insect species.
   *
   */
  insect() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.insect);
  }

  /**
   * Returns a random rabbit species
   *
   */
  rabbit() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.rabbit);
  }

  /**
   * Returns a random animal type.
   *
   */
  type() {
    return this.faker.random.arrayElement(this.faker.definitions.animal.type);
  }
}
