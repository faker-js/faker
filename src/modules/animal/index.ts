import type { Faker } from '../..';

/**
 * Module to generate animal related entries.
 */
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
   * @example
   * faker.animal.dog() // 'Irish Water Spaniel'
   */
  dog(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.dog);
  }

  /**
   * Returns a random cat breed.
   *
   * @example
   * faker.animal.cat() // 'Singapura'
   */
  cat(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.cat);
  }

  /**
   * Returns a random snake species.
   *
   * @example
   * faker.animal.snake() // 'Eyelash viper'
   */
  snake(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.snake);
  }

  /**
   * Returns a random bear species.
   *
   * @example
   * faker.animal.bear() // 'Asian black bear'
   */
  bear(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.bear);
  }

  /**
   * Returns a random lion species.
   *
   * @example
   * faker.animal.lion() // 'Northeast Congo Lion'
   */
  lion(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.lion);
  }

  /**
   * Returns a random cetacean species.
   *
   * @example
   * faker.animal.cetacean() // 'Spinner Dolphin'
   */
  cetacean(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.animal.cetacean
    );
  }

  /**
   * Returns a random horse breed.
   *
   * @example
   * faker.animal.horse() // 'Swedish Warmblood'
   */
  horse(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.horse);
  }

  /**
   * Returns a random bird species.
   *
   * @example
   * faker.animal.bird() // 'Buller's Shearwater'
   */
  bird(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.bird);
  }

  /**
   * Returns a random cow species.
   *
   * @example
   * faker.animal.cow() // 'Brava'
   */
  cow(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.cow);
  }

  /**
   * Returns a random fish species.
   *
   * @example
   * faker.animal.fish() // 'Mandarin fish'
   */
  fish(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.fish);
  }

  /**
   * Returns a random crocodilian species.
   *
   * @example
   * faker.animal.crocodilia() // 'Philippine Crocodile'
   */
  crocodilia(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.animal.crocodilia
    );
  }

  /**
   * Returns a random insect species.
   *
   * @example
   * faker.animal.insect() // 'Pyramid ant'
   */
  insect(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.animal.insect
    );
  }

  /**
   * Returns a random rabbit species.
   *
   * @example
   * faker.animal.rabbit() // 'Florida White'
   */
  rabbit(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.animal.rabbit
    );
  }

  /**
   * Returns a random rodent breed.
   *
   * @example
   * faker.animal.rodent() // 'Cuscomys ashanika'
   */
  rodent(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.animal.rodent
    );
  }

  /**
   * Returns a random animal type.
   *
   * @example
   * faker.animal.type() // 'crocodilia'
   */
  type(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.animal.type);
  }
}
