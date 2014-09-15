if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("address.js", function () {
    describe("city()", function () {
        beforeEach(function () {
            sinon.spy(faker.address, 'cityPrefix');
            sinon.spy(faker.name, 'firstName');
            sinon.spy(faker.name, 'lastName');
            sinon.spy(faker.address, 'citySuffix');
        });

        afterEach(function () {
            faker.random.number.restore();
            faker.address.cityPrefix.restore();
            faker.name.firstName.restore();
            faker.name.lastName.restore();
            faker.address.citySuffix.restore();
        });

        it("occasionally returns prefix + first name + suffix", function () {
            sinon.stub(faker.random, 'number').returns(0);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(faker.address.cityPrefix.calledOnce);
            assert.ok(faker.name.firstName.calledOnce);
            assert.ok(faker.address.citySuffix.calledOnce);
        });

        it("occasionally returns prefix + first name", function () {
            sinon.stub(faker.random, 'number').returns(1);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(faker.address.cityPrefix.calledOnce);
            assert.ok(faker.name.firstName.calledOnce);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(faker.random, 'number').returns(2);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(faker.address.citySuffix.calledOnce);
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(faker.random, 'number').returns(3);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(!faker.address.cityPrefix.called);
            assert.ok(!faker.name.firstName.called);
            assert.ok(faker.name.lastName.calledOnce);
            assert.ok(faker.address.citySuffix.calledOnce);
        });
    });
    

    describe("streetName()", function () {
        beforeEach(function () {
            sinon.spy(faker.name, 'firstName');
            sinon.spy(faker.name, 'lastName');
            sinon.spy(faker.address, 'streetSuffix');
        });

        afterEach(function () {
            faker.random.number.restore();
            faker.name.firstName.restore();
            faker.name.lastName.restore();
            faker.address.streetSuffix.restore();
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(faker.random, 'number').returns(0);

            var street_name = faker.address.streetName();
            assert.ok(street_name);
            assert.ok(!faker.name.firstName.called);
            assert.ok(faker.name.lastName.calledOnce);
            assert.ok(faker.address.streetSuffix.calledOnce);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(faker.random, 'number').returns(1);

            var street_name = faker.address.streetName();
            assert.ok(street_name);

            assert.ok(faker.name.firstName.calledOnce);
            assert.ok(!faker.name.lastName.called);
            assert.ok(faker.address.streetSuffix.calledOnce);
        });
    });
    
    

    describe("streetAddress()", function () {
        beforeEach(function () {
            sinon.spy(faker.address, 'streetName');
            sinon.spy(faker.address, 'secondaryAddress');
        });

        afterEach(function () {
            faker.address.streetName.restore();
            faker.address.secondaryAddress.restore();
        });

        it("occasionally returns a 5-digit street number", function () {
            sinon.stub(faker.random, 'number').returns(0);
            var address = faker.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 5);
            assert.ok(faker.address.streetName.called);

            faker.random.number.restore();
        });

        it("occasionally returns a 4-digit street number", function () {
            sinon.stub(faker.random, 'number').returns(1);
            var address = faker.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 4);
            assert.ok(faker.address.streetName.called);

            faker.random.number.restore();
        });

        it("occasionally returns a 3-digit street number", function () {
            sinon.stub(faker.random, 'number').returns(2);
            var address = faker.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 3);
            assert.ok(faker.address.streetName.called);
            assert.ok(!faker.address.secondaryAddress.called);

            faker.random.number.restore();
        });

        context("when useFulladdress is true", function () {
            it("adds a secondary address to the result", function () {
                var address = faker.address.streetAddress(true);
                var parts = address.split(' ');

                assert.ok(faker.address.secondaryAddress.called);
            });
        });
    });
    

    describe("secondaryAddress()", function () {
        it("randomly chooses an Apt or Suite number", function () {
            sinon.spy(faker.random, 'array_element');

            var address = faker.address.secondaryAddress();

            var expected_array = [
                'Apt. ###',
                'Suite ###'
            ];

            assert.ok(address);
            assert.ok(faker.random.array_element.calledWith(expected_array));
            faker.random.array_element.restore();
        });
    });

    describe("county()", function () {
        it("returns random county", function () {
            sinon.spy(faker.address, 'county');
            var county = faker.address.county();
            assert.ok(county);
            assert.ok(faker.address.county.called);
            faker.address.county.restore();
        });
    });

    describe("country()", function () {
        it("returns random country", function () {
            sinon.spy(faker.address, 'country');
            var country = faker.address.country();
            assert.ok(country);
            assert.ok(faker.address.country.called);
            faker.address.country.restore();
        });
    });

    describe("state()", function () {
        it("returns random state", function () {
            sinon.spy(faker.address, 'state');
            var state = faker.address.state();
            assert.ok(state);
            assert.ok(faker.address.state.called);
            faker.address.state.restore();
        });
    });

    describe("latitude()", function () {
        it("returns random latitude", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(faker.random, 'number');
                var latitude = faker.address.latitude();
                assert.ok(typeof latitude === 'string');
                var latitude_float = parseFloat(latitude);
                assert.ok(latitude_float >= -90.0);
                assert.ok(latitude_float <= 90.0);
                assert.ok(faker.random.number.called);
                faker.random.number.restore();
            }
        });
    });

    describe("longitude()", function () {
        it("returns random longitude", function () {
            for (var i = 0; i < 100; i++) {
                sinon.spy(faker.random, 'number');
                var longitude = faker.address.longitude();
                assert.ok(typeof longitude === 'string');
                var longitude_float = parseFloat(longitude);
                assert.ok(longitude_float >= -180.0);
                assert.ok(longitude_float <= 180.0);
                assert.ok(faker.random.number.called);
                faker.random.number.restore();
            }
        });
    });

});
