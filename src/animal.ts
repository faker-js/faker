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
  dog(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.dog);
  }

  /**
   * Returns a random cat breed.
   *
   */
  cat(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.cat);
  }

  /**
   * Returns a random snake species.
   *
   */
  snake(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.snake);
  }

  /**
   * Returns a random bear species.
   *
   */
  bear(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.bear);
  }

  /**
   * Returns a random lion species.
   *
   */
  lion(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.lion);
  }

  /**
   * Returns a random cetacean species.
   *
   * @method faker.animal.cetacean
   */
  cetacean(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.animal.cetacean
    );
  }

  /**
   * Returns a random horse breed.
   *
   */
  horse(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.horse);
  }

  /**
   * Returns a random bird species.
   *
   */
  bird(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.bird);
  }

  /**
   * Returns a random cow species.
   *
   */
  cow(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.cow);
  }

  /**
   * Returns a random fish species.
   *
   */
  fish(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.fish);
  }

  /**
   * Returns a random crocodilian species.
   *
   */
  crocodilia(): string {
    return this.faker.random.arrayElement(
      this.faker.definitions.animal.crocodilia
    );
  }

  /**
   * Returns a random insect species.
   *
   */
  insect(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.insect);
  }

  /**
   * Returns a random rabbit species
   *
   */
  rabbit(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.rabbit);
  }

  /**
   * Returns a random animal type.
   *
   */
  type(): string {
    return this.faker.random.arrayElement(this.faker.definitions.animal.type);
  }
}
