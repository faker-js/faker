var assert = require('assert');
var sinon = require('sinon');
var faker = require('../index');
var random = require('../lib/random');

describe("name.js", function () {
    describe("firstName()", function () {
        it("returns a random name", function () {
            sinon.stub(random, 'first_name').returns('foo');
            var first_name = faker.name.firstName();

            assert.equal(first_name, 'foo');

            random.first_name.restore();
        });
    });

    describe("lastName()", function () {
        it("returns a random name", function () {
            sinon.stub(random, 'last_name').returns('foo');

            var last_name = faker.name.lastName();

            assert.equal(last_name, 'foo');

            random.last_name.restore();
        });
    });

    describe("findName()", function () {
        it("usually returns a first name and last name", function () {
            sinon.stub(random, 'number').returns(5);
            var name = faker.name.findName();
            assert.ok(name);
            var parts = name.split(' ');

            assert.strictEqual(parts.length, 2);

            random.number.restore();
        });

        it("occasionally returns a first name and last name with a prefix", function () {
            sinon.stub(random, 'number').returns(0);
            var name = faker.name.findName();
            var parts = name.split(' ');

            assert.ok(parts.length >= 3);

            random.number.restore();
        });

        it("occasionally returns a first name and last name with a suffix", function () {
            sinon.stub(random, 'number').returns(1);
            var name = faker.name.findName();
            var parts = name.split(' ');

            assert.ok(parts.length >= 3);

            random.number.restore();
        });
    });
});
