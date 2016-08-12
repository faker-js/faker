/**
 *
 * @namespace faker.image
 */
var Image = function (faker) {

  var self = this;
  var otherCategories = ["abstract", "animals", "business", "cats", "city", "nightlife", "fashion", "sports", "technics", "transport"];
  var unsplashCategories = ["food", "nature", "people", "technology", "objects", "buildings"];

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.image
   */
  self.image = function (width, height, randomize) {
    var allCategories = unsplashCategories.concat(otherCategories);
    return self[faker.random.arrayElement(allCategories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method faker.image.avatar
   */
  self.avatar = function () {
    return faker.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method faker.image.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize) {
      var width = width || 640;
      var height = height || 480;

      var url ='https://source.unsplash.com';

      if (typeof category !== 'undefined' && unsplashCategories.indexOf(category) > -1) {
        url += '/category/' + category;
      }

      url += '/' + width + 'x' + height

      if (typeof category !== 'undefined' && otherCategories.indexOf(category) > -1) {
        url += '?' + category
      }

      /*
      Current version of unsplash official wrapper(source.unsplash.com) does not support full randomize yet.
      I will implement randomize function with official unsplash api in next version.
      if (randomize) {
        url += '?' + faker.random.number()
      }
      */

      return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.abstract
   */
  self.abstract = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.animals
   */
  self.animals = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.business
   */
  self.business = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.cats
   */
  self.cats = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.city
   */
  self.city = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.food
   */
  self.food = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.fashion
   */
  self.fashion = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.people
   */
  self.people = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nature
   */
  self.nature = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.sports
   */
  self.sports = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.technics
   */
  self.technics = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.transport
   */
  self.transport = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'transport', randomize);
  };
  /**
   * technology
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.technology
   */
  self.technology = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'technology', randomize);
  };
  /**
   * objects
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.objects
   */
  self.objects = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'objects', randomize);
  };
  /**
   * buildings
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.buildings
   */
  self.buildings = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'buildings', randomize);
  };
}

module["exports"] = Image;
