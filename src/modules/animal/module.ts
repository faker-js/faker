import { ModuleBase } from '../../internal/module-base';
import { fakeAnimalBear } from './bear';
import { fakeAnimalBird } from './bird';
import { fakeAnimalCat } from './cat';
import { fakeAnimalCetacean } from './cetacean';
import { fakeAnimalCow } from './cow';
import { fakeAnimalCrocodilia } from './crocodilia';
import { fakeAnimalDog } from './dog';
import { fakeAnimalFish } from './fish';
import { fakeAnimalHorse } from './horse';
import { fakeAnimalInsect } from './insect';
import { fakeAnimalLion } from './lion';
import { fakeAnimalPetName } from './pet-name';
import { fakeAnimalRabbit } from './rabbit';
import { fakeAnimalRodent } from './rodent';
import { fakeAnimalSnake } from './snake';
import { fakeAnimalType } from './type';

/**
 * Module to generate animal related entries.
 *
 * ### Overview
 *
 * For a general type of animal (e.g. `'dog'`), use [`type()`](https://fakerjs.dev/api/animal.html#type).
 *
 * Otherwise, use one of the more specific methods, such as [`cat()`](https://fakerjs.dev/api/animal.html#cat) for a specific breed of cat.
 *
 * All values may be localized.
 */
export class AnimalModule extends ModuleBase {
  /*
   * The class body is automatically generated.
   * Run 'pnpm run generate:module-tree animal' to update the methods from their respective files.
   */

  /**
   * Returns a random dog breed.
   *
   * @example
   * faker.animal.dog() // 'Irish Water Spaniel'
   *
   * @since 5.5.0
   */
  dog(): string {
    return fakeAnimalDog(this.fakerCore);
  }

  /**
   * Returns a random cat breed.
   *
   * @example
   * faker.animal.cat() // 'Singapura'
   *
   * @since 5.5.0
   */
  cat(): string {
    return fakeAnimalCat(this.fakerCore);
  }

  /**
   * Returns a random snake species.
   *
   * @example
   * faker.animal.snake() // 'Eyelash viper'
   *
   * @since 5.5.0
   */
  snake(): string {
    return fakeAnimalSnake(this.fakerCore);
  }

  /**
   * Returns a random bear species.
   *
   * @example
   * faker.animal.bear() // 'Asian black bear'
   *
   * @since 5.5.0
   */
  bear(): string {
    return fakeAnimalBear(this.fakerCore);
  }

  /**
   * Returns a random lion species.
   *
   * @example
   * faker.animal.lion() // 'Northeast Congo Lion'
   *
   * @since 5.5.0
   */
  lion(): string {
    return fakeAnimalLion(this.fakerCore);
  }

  /**
   * Returns a random cetacean species.
   *
   * @example
   * faker.animal.cetacean() // 'Spinner Dolphin'
   *
   * @since 5.5.0
   */
  cetacean(): string {
    return fakeAnimalCetacean(this.fakerCore);
  }

  /**
   * Returns a random horse breed.
   *
   * @example
   * faker.animal.horse() // 'Swedish Warmblood'
   *
   * @since 5.5.0
   */
  horse(): string {
    return fakeAnimalHorse(this.fakerCore);
  }

  /**
   * Returns a random bird species.
   *
   * @example
   * faker.animal.bird() // 'Buller's Shearwater'
   *
   * @since 5.5.0
   */
  bird(): string {
    return fakeAnimalBird(this.fakerCore);
  }

  /**
   * Returns a random cow species.
   *
   * @example
   * faker.animal.cow() // 'Brava'
   *
   * @since 5.5.0
   */
  cow(): string {
    return fakeAnimalCow(this.fakerCore);
  }

  /**
   * Returns a random fish species.
   *
   * @example
   * faker.animal.fish() // 'Mandarin fish'
   *
   * @since 5.5.0
   */
  fish(): string {
    return fakeAnimalFish(this.fakerCore);
  }

  /**
   * Returns a random crocodilian species.
   *
   * @example
   * faker.animal.crocodilia() // 'Philippine Crocodile'
   *
   * @since 5.5.0
   */
  crocodilia(): string {
    return fakeAnimalCrocodilia(this.fakerCore);
  }

  /**
   * Returns a random insect species.
   *
   * @example
   * faker.animal.insect() // 'Pyramid ant'
   *
   * @since 5.5.0
   */
  insect(): string {
    return fakeAnimalInsect(this.fakerCore);
  }

  /**
   * Returns a random rabbit species.
   *
   * @example
   * faker.animal.rabbit() // 'Florida White'
   *
   * @since 5.5.0
   */
  rabbit(): string {
    return fakeAnimalRabbit(this.fakerCore);
  }

  /**
   * Returns a random rodent breed.
   *
   * @example
   * faker.animal.rodent() // 'Cuscomys ashanika'
   *
   * @since 7.4.0
   */
  rodent(): string {
    return fakeAnimalRodent(this.fakerCore);
  }

  /**
   * Returns a random animal type.
   *
   * @example
   * faker.animal.type() // 'crocodile'
   *
   * @since 5.5.0
   */
  type(): string {
    return fakeAnimalType(this.fakerCore);
  }

  /**
   * Returns a random pet name.
   *
   * @example
   * faker.animal.petName() // 'Coco'
   *
   * @since 9.2.0
   */
  petName(): string {
    return fakeAnimalPetName(this.fakerCore);
  }
}
