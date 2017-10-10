/**
 *
 * @namespace faker.vehicle
 */
var Vehicle = function (faker) {
  var self = this;
  /**
   * manufacturer
   *
   * @method faker.database.manufacturer
   */
  self.manufacturer = function () {
      return faker.random.arrayElement(faker.definitions.vehicle.manufacturer);
  };

  self.manufacturer.schema = {
    "description": "Generates a manufacturer name.",
    "sampleResults": ["Ford", "Jeep", "Tesla"]
  };

  /**
   * model
   *
   * @method faker.vehicle.model
   */
  self.model = function () {
      return faker.random.arrayElement(faker.definitions.vehicle.model);
  };

  self.model.schema = {
    "description": "Generates a vehicle model.",
    "sampleResults": ["Explorer", "Camry", "Ranchero"]
  };

  /**
   * type
   *
   * @method faker.vehicle.type
   */
  self.type = function () {
      return faker.random.arrayElement(faker.definitions.vehicle.type);
  };

  self.type.schema = {
    "description": "Generates a vehicle type.",
    "sampleResults": ["Coupe", "Convertable", "Sedan", "SUV"]
  };

  /**
   * fuel
   *
   * @method faker.vehicle.fuel
   */
  self.fuel = function () {
      return faker.random.arrayElement(faker.definitions.vehicle.fuel);
  };

  self.fuel.schema = {
    "description": "Generates a fuel type.",
    "sampleResults": ["Electric", "Gasoline", "Diesel"]
  };

  /**
   * vin
   *
   * @method faker.vehicle.vin
   */
  self.vin = function () {
      return faker.random.arrayElement(faker.definitions.vehicle.vin);
  };

  self.vin.schema = {
    "description": "Generates a VIN number.",
    "sampleResults": ["YV1MH682762184654", "3C7WRMBJ2EG208836"]
  };
};

module["exports"] = Vehicle;
