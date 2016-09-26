/**
 *
 * @namespace faker.image
 * @property {object} lorempixel - faker.image.lorempixel
 * @property {object} unsplash - faker.image.unsplash
 * @default Default provider is unsplash image provider
 */
var Image = function (faker) {

  var self = this
  var Lorempixel = require('./image_providers/lorempixel');
  var Unsplash = require('./image_providers/unsplash');


  self.lorempixel = new Lorempixel(faker);
  self.unsplash = new Unsplash(faker);

  Object.assign(self, self.unsplash);
}



module["exports"] = Image;
