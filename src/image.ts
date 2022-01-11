import type { Faker } from '.';

const Lorempixel = require('./image_providers/lorempixel');
const Unsplash = require('./image_providers/unsplash');
const LoremPicsum = require('./image_providers/lorempicsum');

/**
 * Default provider is unsplash image provider.
 */
export class Image {
  readonly lorempixel: typeof Lorempixel;
  readonly unsplash: typeof Unsplash;
  readonly lorempicsum: typeof LoremPicsum;

  constructor(private readonly faker: Faker) {
    this.lorempixel = new Lorempixel(this.faker);
    this.unsplash = new Unsplash(this.faker);
    this.lorempicsum = new LoremPicsum(this.faker);
  }

  /**
   * image
   *
   * @method faker.image.image
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   */
  image(width, height, randomize) {
    var categories = [
      'abstract',
      'animals',
      'business',
      'cats',
      'city',
      'food',
      'nightlife',
      'fashion',
      'people',
      'nature',
      'sports',
      'technics',
      'transport',
    ];
    return this[this.faker.random.arrayElement(categories)](
      width,
      height,
      randomize
    );
  }
  /**
   * avatar
   *
   * @method faker.image.avatar
   */
  avatar() {
    return this.faker.internet.avatar();
  }
  /**
   * imageUrl
   *
   * @method faker.image.imageUrl
   * @param width
   * @param height
   * @param category
   * @param randomize
   */
  imageUrl(width, height, category, randomize, https) {
    var width = width || 640;
    var height = height || 480;
    var protocol = 'http://';
    if (typeof https !== 'undefined' && https === true) {
      protocol = 'https://';
    }
    var url = protocol + 'placeimg.com/' + width + '/' + height;
    if (typeof category !== 'undefined') {
      url += '/' + category;
    }

    if (randomize) {
      url += '?' + this.faker.datatype.number();
    }

    return url;
  }

  /**
   * abstract
   *
   * @method faker.image.abstract
   * @param width
   * @param height
   * @param randomize
   */
  abstract(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'abstract', randomize);
  }

  /**
   * animals
   *
   * @method faker.image.animals
   * @param width
   * @param height
   * @param randomize
   */
  animals(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'animals', randomize);
  }

  /**
   * business
   *
   * @method faker.image.business
   * @param width
   * @param height
   * @param randomize
   */
  business(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'business', randomize);
  }

  /**
   * cats
   *
   * @method faker.image.cats
   * @param width
   * @param height
   * @param randomize
   */
  cats(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'cats', randomize);
  }

  /**
   * city
   *
   * @method faker.image.city
   * @param width
   * @param height
   * @param randomize
   */
  city(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'city', randomize);
  }

  /**
   * food
   *
   * @method faker.image.food
   * @param width
   * @param height
   * @param randomize
   */
  food(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'food', randomize);
  }

  /**
   * nightlife
   *
   * @method faker.image.nightlife
   * @param width
   * @param height
   * @param randomize
   */
  nightlife(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'nightlife', randomize);
  }

  /**
   * fashion
   *
   * @method faker.image.fashion
   * @param width
   * @param height
   * @param randomize
   */
  fashion(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'fashion', randomize);
  }

  /**
   * people
   *
   * @method faker.image.people
   * @param width
   * @param height
   * @param randomize
   */
  people(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'people', randomize);
  }

  /**
   * nature
   *
   * @method faker.image.nature
   * @param width
   * @param height
   * @param randomize
   */
  nature(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'nature', randomize);
  }

  /**
   * sports
   *
   * @method faker.image.sports
   * @param width
   * @param height
   * @param randomize
   */
  sports(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'sports', randomize);
  }

  /**
   * technics
   *
   * @method faker.image.technics
   * @param width
   * @param height
   * @param randomize
   */
  technics(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'technics', randomize);
  }

  /**
   * transport
   *
   * @method faker.image.transport
   * @param width
   * @param height
   * @param randomize
   */
  transport(width, height, randomize) {
    return this.faker.image.imageUrl(width, height, 'transport', randomize);
  }

  /**
   * dataUri
   *
   * @method faker.image.dataUri
   * @param width
   * @param height
   * @param color
   */
  dataUri(width, height, color) {
    color = color || 'grey';
    var svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' +
      width +
      '" height="' +
      height +
      '"><rect width="100%" height="100%" fill="' +
      color +
      '"/><text x="' +
      width / 2 +
      '" y="' +
      height / 2 +
      '" font-size="20" alignment-baseline="middle" text-anchor="middle" fill="white">' +
      width +
      'x' +
      height +
      '</text></svg>';
    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    return rawPrefix + encodeURIComponent(svgString);
  }

  // Object.assign(self, self.unsplash);
  // How to set default as unsplash? should be image.default?
}
