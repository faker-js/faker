import type { Faker } from '../..';

/**
 * Module to generate beer related entries.
 */
export class BeerModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(BeerModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random beer name.
   *
   * @example
   * faker.beer.beerName() // "Beer Blanche 'Monflowers'"
   *
   * @since 8.0.0
   */
  beerName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.name);
  }

  /**
   * Returns a random beer type.
   *
   * @example
   * faker.beer.beerType() // 'Amber Ale'
   *
   * @since 8.0.0
   */
  beerType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.type);
  }

  /**
   * Returns a random beer description.
   *
   * @example
   * faker.beer.beerDescription() // 'The "Monflowers" is a Blanche beer with a very refreshing and fresh timbre, inspired by the Belgian tradition and obtained from a mix of spices and Monferrato flowers, Piedmontese malt and wheat. The nose tells delicate notes of wheat, cereals and wheat, supported by hints of honey brought by Italian malt. The sip is light, thin, with a refreshing and very smooth drink'
   *
   * @since 8.0.0
   */
  beerDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.beer.description
    );
  }

  /**
   * Returns a random brewery.
   *
   * @example
   * faker.beer.beerBrewery() // 'Barley'
   *
   * @since 8.0.0
   */
  beerBrewery(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.brewery);
  }

  /**
   * Returns a random beer origin.
   *
   * @example
   * faker.beer.beerOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  beerOrigin(): string {
    return this.faker.location.country();
  }

  /**
   * Returns a random beer region.
   *
   * @example
   * faker.beer.beerRegion() // 'Friuli-Venezia Giulia'
   *
   * @since 8.0.0
   */
  beerRegion(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.region);
  }

  /**
   * Returns a random taste.
   *
   * @example
   * faker.beer.beerTaste() // 'Medium bodied, direct and genuine, fresh and gently sour with a great vinous firm'
   *
   * @since 8.0.0
   */
  beerTaste(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.taste);
  }

  /**
   * Returns a random beer zone.
   *
   * @example
   * faker.beer.beerZone() // 'Canavese'
   *
   * @since 8.0.0
   */
  beerZone(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.zone);
  }

  /**
   * Returns a random beer alcoholic content.
   *
   * @example
   * faker.beer.beerAlcoholicContent() // '10'
   *
   * @since 8.0.0
   */
  beerAlcoholicContent(): number {
    return this.faker.datatype.number({ min: 5, max: 20 });
  }

  /**
   * Returns a random beer bottle size.
   *
   * @example
   * faker.beer.beerSize() // '75 cl'
   *
   * @since 8.0.0
   */
  beerSize(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.beer.size);
  }
}
