import type { Faker } from '../..';

/**
 * Module to generate wine related entries.
 */
export class WineModule {
  constructor(private readonly faker: Faker) {
    // Bind `this` so namespaced is working correctly
    for (const name of Object.getOwnPropertyNames(WineModule.prototype)) {
      if (name === 'constructor' || typeof this[name] !== 'function') {
        continue;
      }
      this[name] = this[name].bind(this);
    }
  }

  /**
   * Returns a random wine name.
   *
   * @example
   * faker.wine.wineName() // 'Cabernet Franc Petrucco 2019'
   *
   * @since 8.0.0
   */
  wineName(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wine.name);
  }

  /**
   * Returns a random wine type.
   *
   * @example
   * faker.wine.wineType() // 'Red Wines'
   *
   * @since 8.0.0
   */
  wineType(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wine.type);
  }

  /**
   * Returns a random wine description.
   *
   * @example
   * faker.wine.wineDescription() // 'Wine of ample bouquet and dry, full-bodied taste, it is produced by a small, family-owned winery, settled in the hearth of Colli Orientali del Friuli'
   *
   * @since 8.0.0
   */
  wineDescription(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wine.description
    );
  }

  /**
   * Returns a random winery.
   *
   * @example
   * faker.wine.wineWinery() // 'Petrucco'
   *
   * @since 8.0.0
   */
  wineWinery(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wine.winery);
  }

  /**
   * Returns a random wine origin.
   *
   * @example
   * faker.wine.wineOrigin() // 'Italy'
   *
   * @since 8.0.0
   */
  wineOrigin(): string {
    return this.faker.location.country();
  }

  /**
   * Returns a random wine region.
   *
   * @example
   * faker.wine.wineRegion() // 'Friuli-Venezia Giulia'
   *
   * @since 8.0.0
   */
  wineRegion(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wine.region);
  }

  /**
   * Returns a random wine zone.
   *
   * @example
   * faker.wine.wineZone() // 'Colli orientali'
   *
   * @since 8.0.0
   */
  wineZone(): string {
    return this.faker.helpers.arrayElement(this.faker.definitions.wine.zone);
  }

  /**
   * Returns a random wine appellation.
   *
   * @example
   * faker.wine.wineAppellation() // 'Cabernet Franc'
   *
   * @since 8.0.0
   */
  wineAppellation(): string {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wine.appellation
    );
  }

  /**
   * Returns a random wine alcoholic content.
   *
   * @example
   * faker.wine.wineAlcoholicContent() // '10'
   *
   * @since 8.0.0
   */
  wineAlcoholicContent(): number {
    return this.faker.datatype.number({ min: 8, max: 20 });
  }

  /**
   * Returns a random wine bottle type.
   *
   * @example
   * faker.wine.wineBottleType() // 'Bordolese'
   *
   * @since 8.0.0
   */
  wineBottleType(): number {
    return this.faker.helpers.arrayElement(
      this.faker.definitions.wine.bottleType
    );
  }

  /**
   * Returns a random wine bottle type.
   *
   * @example
   * faker.wine.wineContent() // '75 cl'
   *
   * @since 8.0.0
   */
  wineContent(): number {
    return this.faker.helpers.arrayElement(this.faker.definitions.wine.content);
  }

  /**
   * Returns a random wine year.
   *
   * @example
   * faker.wine.wineYear() // '2018'
   *
   * @since 8.0.0
   */
  wineYear(): number {
    return this.faker.datatype.number({ min: 1900, max: 2023 });
  }
}
