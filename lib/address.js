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
        function coordinateWithOffset(coordinate, bearing, distance, isMetric) {
            var R = 6378.137; // Radius of the Earth (http://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html)
            var d = isMetric ? distance : kilometersToMiles(distance); // Distance in km

            var lat1 = degreesToRadians(coordinate[0]); //Current lat point converted to radians
            var lon1 = degreesToRadians(coordinate[1]); //Current long point converted to radians

            var lat2 = Math.asin(Math.sin(lat1) * Math.cos(d/R) +
                Math.cos(lat1) * Math.sin(d/R) * Math.cos(bearing));

            var lon2 = lon1 + Math.atan2(
                Math.sin(bearing) * Math.sin(d/R) * Math.cos(lat1),
                Math.cos(d/R) - Math.sin(lat1) * Math.sin(lat2));

            // Keep longitude in range [-180, 180]
            if (lon2 > degreesToRadians(180)) {
                lon2 = lon2 - degreesToRadians(360);
            } else if (lon2 < degreesToRadians(-180)) {
                lon2 = lon2 + degreesToRadians(360);
            }

            return [radiansToDegrees(lat2), radiansToDegrees(lon2)];
        }

        // If there is no coordinate, the best we can do is return a random GPS coordinate.
        if (coordinate === undefined) {
            return [this.latitude(), this.longitude()]
        }
        radius = radius || 10.0;
        isMetric = isMetric || false;

        // TODO: implement either a gaussian/uniform distribution of points in cicular region.
        // Possibly include param to function that allows user to choose between distributions.

        // This approach will likely result in a higher density of points near the center.
        var randomCoord = coordinateWithOffset(coordinate, degreesToRadians(Math.random() * 360.0), radius, isMetric);
        return [randomCoord[0].toFixed(4), randomCoord[1].toFixed(4)];
    }
};

module.exports = address;
