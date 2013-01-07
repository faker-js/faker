var assert = require('assert');
var sinon = require('sinon');
var Faker = require('../index');
var random = require('../lib/random');

describe("address.js", function () {
    describe("city()", function () {
        beforeEach(function () {
            sinon.spy(Faker.random, 'city_prefix');
            sinon.spy(Faker.random, 'first_name');
            sinon.spy(Faker.random, 'last_name');
            sinon.spy(Faker.random, 'city_suffix');
        });

        afterEach(function () {
            Faker.random.number.restore();
            Faker.random.city_prefix.restore();
            Faker.random.first_name.restore();
            Faker.random.last_name.restore();
            Faker.random.city_suffix.restore();
        });

        it("occasionally returns prefix + first name + suffix", function () {
            sinon.stub(Faker.random, 'number').returns(0);

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(Faker.random.city_prefix.calledOnce);
            assert.ok(Faker.random.first_name.calledOnce);
            assert.ok(Faker.random.city_suffix.calledOnce);
        });

        it("occasionally returns prefix + first name", function () {
            sinon.stub(Faker.random, 'number').returns(1);

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(Faker.random.city_prefix.calledOnce);
            assert.ok(Faker.random.first_name.calledOnce);
            assert.ok(!Faker.random.city_suffix.called);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(Faker.random, 'number').returns(2);

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(!Faker.random.city_prefix.called);
            assert.ok(Faker.random.first_name.calledOnce);
            assert.ok(Faker.random.city_suffix.calledOnce);
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(Faker.random, 'number').returns(3);

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(!Faker.random.city_prefix.called);
            assert.ok(!Faker.random.first_name.called);
            assert.ok(Faker.random.last_name.calledOnce);
            assert.ok(Faker.random.city_suffix.calledOnce);
        });
    });

    describe("streetName()", function () {
        beforeEach(function () {
            sinon.spy(Faker.random, 'first_name');
            sinon.spy(Faker.random, 'last_name');
            sinon.spy(Faker.random, 'street_suffix');
        });

        afterEach(function () {
            Faker.random.number.restore();
            Faker.random.first_name.restore();
            Faker.random.last_name.restore();
            Faker.random.street_suffix.restore();
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(Faker.random, 'number').returns(0);

            var street_name = Faker.Address.streetName();
            assert.ok(street_name);

            assert.ok(!Faker.random.first_name.called);
            assert.ok(Faker.random.last_name.calledOnce);
            assert.ok(Faker.random.street_suffix.calledOnce);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(Faker.random, 'number').returns(1);

            var street_name = Faker.Address.streetName();
            assert.ok(street_name);

            assert.ok(Faker.random.first_name.calledOnce);
            assert.ok(!Faker.random.last_name.called);
            assert.ok(Faker.random.street_suffix.calledOnce);
        });
    });

    describe("streetAddress()", function () {
        beforeEach(function () {
            sinon.spy(Faker.Address, 'streetName');
            sinon.spy(Faker.Address, 'secondaryAddress');
        });

        afterEach(function () {
            Faker.Address.streetName.restore();
            Faker.Address.secondaryAddress.restore();
        });

        it("occasionally returns a 5-digit street number", function () {
            sinon.stub(Faker.random, 'number').returns(0);
            var address = Faker.Address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 5);
            assert.ok(Faker.Address.streetName.called);

            Faker.random.number.restore();
        });

        it("occasionally returns a 4-digit street number", function () {
            sinon.stub(Faker.random, 'number').returns(1);
            var address = Faker.Address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 4);
            assert.ok(Faker.Address.streetName.called);

            Faker.random.number.restore();
        });

        it("occasionally returns a 3-digit street number", function () {
            sinon.stub(Faker.random, 'number').returns(2);
            var address = Faker.Address.streetAddress();
            var parts = address.split(' ');

            assert.equal(parts[0].length, 3);
            assert.ok(Faker.Address.streetName.called);
            assert.ok(!Faker.Address.secondaryAddress.called);

            Faker.random.number.restore();
        });

        context("when useFulladdress is true", function () {
            it("adds a secondary address to the result", function () {
                var address = Faker.Address.streetAddress(true);
                var parts = address.split(' ');

                assert.ok(Faker.Address.secondaryAddress.called);
            });
        });
    });

    describe("secondaryAddress()", function() {
        // TODO
    });

    describe("brState()", function() {
        beforeEach(function () {
            sinon.spy(Faker.random, 'br_state_abbr');
            sinon.spy(Faker.random, 'br_state');
        });

        afterEach(function () {
            Faker.random.br_state_abbr.restore();
            Faker.random.br_state.restore();
        });

        context("when useAbbr is true", function () {
            it("returns a br_state_abbr", function () {
                var state = Faker.Address.brState(true);

                assert.ok(state);
                assert.ok(Faker.random.br_state_abbr.called);
                assert.ok(!Faker.random.br_state.called);
            });
        });

        context("when useAbbr is not set", function () {
            it("returns a br_state", function () {
                var state = Faker.Address.brState();

                assert.ok(state);
                assert.ok(!Faker.random.br_state_abbr.called);
                assert.ok(Faker.random.br_state.called);
            });
        });
    });
});
