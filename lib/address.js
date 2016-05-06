var Helpers = require('./helpers');
var faker = require('../index');

var address = {
    zipCode: function () {
        return Helpers.replaceSymbolWithNumber(faker.random.array_element(["#####", '#####-####']));
    },

    city: function () {
        var result;
        switch (faker.random.number(3)) {
        case 0:
            result = faker.address.cityPrefix() + " " + faker.name.firstName() + faker.address.citySuffix();
            break;
        case 1:
            result = faker.address.cityPrefix() + " " + faker.name.firstName();
            break;
        case 2:
            result = faker.name.firstName() + faker.address.citySuffix();
            break;
        case 3:
            result = faker.name.lastName() + faker.address.citySuffix();
            break;
        }
        return result;
    },

    cityPrefix: function () {
      return faker.random.array_element(faker.definitions.address.city_prefix);
    },

    citySuffix: function () {
      return faker.random.array_element(faker.definitions.address.city_suffix);
    },

    streetName: function () {
        var result;
        switch (faker.random.number(1)) {
        case 0:
            result = faker.name.lastName() + " " + faker.address.streetSuffix();
            break;
        case 1:
            result = faker.name.firstName() + " " + faker.address.streetSuffix();
            break;
        }
        return result;
    },

    //
    // TODO: change all these methods that accept a boolean to instead accept an options hash.
    //
    streetAddress: function (useFullAddress) {
        if (useFullAddress === undefined) { useFullAddress = false; }
        var address = "";
        switch (faker.random.number(2)) {
        case 0:
            address = Helpers.replaceSymbolWithNumber("#####") + " " + faker.address.streetName();
            break;
        case 1:
            address = Helpers.replaceSymbolWithNumber("####") +  " " + faker.address.streetName();
            break;
        case 2:
            address = Helpers.replaceSymbolWithNumber("###") + " " + faker.address.streetName();
            break;
        }
        return useFullAddress ? (address + " " + faker.address.secondaryAddress()) : address;
    },

    streetSuffix: function () {
        return faker.random.array_element(faker.definitions.address.street_suffix);
    },

    secondaryAddress: function () {
        return Helpers.replaceSymbolWithNumber(faker.random.array_element(
            [
                'Apt. ###',
                'Suite ###'
            ]
        ));
    },

    county: function () {
      return faker.random.array_element(faker.definitions.address.county);
    },

    country: function () {
      return faker.random.array_element(faker.definitions.address.country);
    },

    state: function (useAbbr) {
        return faker.random.array_element(faker.definitions.address.state);
    },

    stateAbbr: function () {
        return faker.random.array_element(faker.definitions.address.state_abbr);
    },

    latitude: function () {
        return (faker.random.number(180 * 10000) / 10000.0 - 90.0).toFixed(4);
    },

    longitude: function () {
        return (faker.random.number(360 * 10000) / 10000.0 - 180.0).toFixed(4);
    },

    nearbyGPSCoordinate: function(coordinate, radius, isMetric) {
        function randomFloat(min, max) {
            return Math.random() * (max-min) + min;
        }
        function degreesToRadians(degrees) {
            return degrees * (Math.PI/180.0);
        }
        function radiansToDegrees(radians) {
            return radians * (180.0/Math.PI);
        }
        function kilometersToMiles(miles) {
            return miles * 0.621371;
        }
        function boundaryCoordinate(coordinate, bearing, distance, isMetric) {
            var R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
            var d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

            var lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
            var lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

            var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d/R) +
                Math.cos(lat1) * Math.sin(d/R) * Math.cos(bearing));

            var lon2 = lon1 + Math.atan2(
                Math.sin(bearing) * Math.sin(d/R) * Math.cos(lat1),
                Math.cos(d/R) - Math.sin(lat1) * Math.sin(lat2));

            return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
        }

        // If there is no coordinate, the best we can do is return a random GPS coordinate.
        if (coordinate === undefined) {
            return [this.latitude(), this.longitude()]
        }
        radius = radius || 10.0;
        isMetric = isMetric || false;

        // This is a heuristic to approximate the circular region defined by coordinate and radius.
        topLeftBoundary = boundaryCoordinate(coordinate, degreesToRadians(45), radius, isMetric);
        bottomRightBoundary = boundaryCoordinate(coordinate, degreesToRadians(45), -radius, isMetric);

        randLat = randomFloat(topLeftBoundary[0], bottomRightBoundary[0]).toFixed(4);
        randLong = randomFloat(topLeftBoundary[1], bottomRightBoundary[1]).toFixed(4);

        return [randLat, randLong];
    }
};

module.exports = address;
