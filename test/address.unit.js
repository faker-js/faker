var assert = require('assert');
var sinon = require('sinon');
var faker = require('../index');
var random = require('../lib/random');

describe("address.js", function () {
    describe("city()", function () {
        beforeEach(function () {
            sinon.spy(random, 'city_prefix');
            sinon.spy(random, 'first_name');
            sinon.spy(random, 'last_name');
            sinon.spy(random, 'city_suffix');
        });

        afterEach(function () {
            random.number.restore();
            random.city_prefix.restore();
            random.first_name.restore();
            random.last_name.restore();
            random.city_suffix.restore();
        });

        it("occasionally returns prefix + first name + suffix", function () {
            sinon.stub(random, 'number').returns(0);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(random.city_prefix.calledOnce);
            assert.ok(random.first_name.calledOnce);
            assert.ok(random.city_suffix.calledOnce);
        });

        it("occasionally returns prefix + first name", function () {
            sinon.stub(random, 'number').returns(1);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(random.city_prefix.calledOnce);
            assert.ok(random.first_name.calledOnce);
            assert.ok(!random.city_suffix.called);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(random, 'number').returns(2);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(!random.city_prefix.called);
            assert.ok(random.first_name.calledOnce);
            assert.ok(random.city_suffix.calledOnce);
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(random, 'number').returns(3);

            var city = faker.address.city();
            assert.ok(city);

            assert.ok(!random.city_prefix.called);
            assert.ok(!random.first_name.called);
            assert.ok(random.last_name.calledOnce);
            assert.ok(random.city_suffix.calledOnce);
        });
    });

    describe("streetName()", function () {
        beforeEach(function () {
            sinon.spy(random, 'first_name');
            sinon.spy(random, 'last_name');
            sinon.spy(random, 'street_suffix');
        });

        afterEach(function () {
            random.number.restore();
            random.first_name.restore();
            random.last_name.restore();
            random.street_suffix.restore();
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(random, 'number').returns(0);

            var street_name = faker.address.streetName();
            assert.ok(street_name);

            assert.ok(!random.first_name.called);
            assert.ok(random.last_name.calledOnce);
            assert.ok(random.street_suffix.calledOnce);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(random, 'number').returns(1);

            var street_name = faker.address.streetName();
            assert.ok(street_name);

            assert.ok(random.first_name.calledOnce);
            assert.ok(!random.last_name.called);
            assert.ok(random.street_suffix.calledOnce);
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
            sinon.stub(random, 'number').returns(0);
            var address = faker.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 5);
            assert.ok(faker.address.streetName.called);

            random.number.restore();
        });

        it("occasionally returns a 4-digit street number", function () {
            sinon.stub(random, 'number').returns(1);
            var address = faker.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 4);
            assert.ok(faker.address.streetName.called);

            random.number.restore();
        });

        it("occasionally returns a 3-digit street number", function () {
            sinon.stub(random, 'number').returns(2);
            var address = faker.address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 3);
            assert.ok(faker.address.streetName.called);
            assert.ok(!faker.address.secondaryAddress.called);

            random.number.restore();
        });

        context("when useFulladdress is true", function () {
            it("adds a secondary address to the result", function () {
                var address = faker.address.streetAddress(true);
                var parts = address.split(' ');

                assert.ok(faker.address.secondaryAddress.called);
            });
        });
    });

    describe("secondaryAddress()", function() {
        // TODO
    });

    describe("brState()", function() {
        beforeEach(function () {
            sinon.spy(random, 'br_state_abbr');
            sinon.spy(random, 'br_state');
        });

        afterEach(function () {
            random.br_state_abbr.restore();
            random.br_state.restore();
        });

        context("when useAbbr is true", function () {
            it("returns a br_state_abbr", function () {
                var state = faker.address.brState(true);

                assert.ok(state);
                assert.ok(random.br_state_abbr.called);
                assert.ok(!random.br_state.called);
            });
        });

        context("when useAbbr is not set", function () {
            it("returns a br_state", function () {
                var state = faker.address.brState();

                assert.ok(state);
                assert.ok(!random.br_state_abbr.called);
                assert.ok(random.br_state.called);
            });
        });
    });
});
