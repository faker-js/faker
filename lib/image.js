var Image = function (faker) {

  var self = this;

  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[faker.random.arrayElement(categories)](width, height, randomize);
  };
  self.avatar = function () {
    return faker.internet.avatar();
  };
  self.imageUrl = function (width, height, category, randomize) {
      var width = width || 640;
      var height = height || 480;

      var url ='http://lorempixel.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + faker.random.number()
      }

      return url;
  };
  self.abstract = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'abstract', randomize);
  };
  self.animals = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'animals', randomize);
  };
  self.business = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'business', randomize);
  };
  self.cats = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'cats', randomize);
  };
  self.city = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'city', randomize);
  };
  self.food = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'food', randomize);
  };
  self.nightlife = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nightlife', randomize);
  };
  self.fashion = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'fashion', randomize);
  };
  self.people = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'people', randomize);
  };
  self.nature = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nature', randomize);
  };
  self.sports = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'sports', randomize);
  };
  self.technics = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'technics', randomize);
  };
  self.transport = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'transport', randomize);
  }  
}

module["exports"] = Image;