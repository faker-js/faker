var vehicle = {};
module["exports"] = vehicle;
vehicle.manufacturer = require("./manufacturer")
vehicle.model = require("./model")
vehicle.type = require("./vehicle_type")
vehicle.fuelType = require("./fuel")
vehicle.vin = require("./vin");
