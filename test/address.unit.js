var assert = require('assert');
var sinon = require('sinon');
var Faker = require('../index');
var random = require('../lib/random');

describe("name.js", function () {
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

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(random.city_prefix.calledOnce);
            assert.ok(random.first_name.calledOnce);
            assert.ok(random.city_suffix.calledOnce);
        });

        it("occasionally returns prefix + first name", function () {
            sinon.stub(random, 'number').returns(1);

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(random.city_prefix.calledOnce);
            assert.ok(random.first_name.calledOnce);
            assert.ok(!random.city_suffix.called);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(random, 'number').returns(2);

            var city = Faker.Address.city();
            assert.ok(city);

            assert.ok(!random.city_prefix.called);
            assert.ok(random.first_name.calledOnce);
            assert.ok(random.city_suffix.calledOnce);
        });

        it("occasionally returns last name + suffix", function () {
            sinon.stub(random, 'number').returns(3);

            var city = Faker.Address.city();
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

            var street_name = Faker.Address.streetName();
            assert.ok(street_name);

            assert.ok(!random.first_name.called);
            assert.ok(random.last_name.calledOnce);
            assert.ok(random.street_suffix.calledOnce);
        });

        it("occasionally returns first name + suffix", function () {
            sinon.stub(random, 'number').returns(1);

            var street_name = Faker.Address.streetName();
            assert.ok(street_name);

            assert.ok(random.first_name.calledOnce);
            assert.ok(!random.last_name.called);
            assert.ok(random.street_suffix.calledOnce);
        });
    });
});
