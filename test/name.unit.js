var assert = require('assert');
var sinon = require('sinon');
var Faker = require('../index');

describe("name.js", function() {
    describe("firstName()", function() {
        it("returns a random name from definitions", function(done) {
            sinon.stub(Faker.definitions, 'first_name').returns(['foo']);
            sinon.spy(Faker.Helpers, 'randomize'); 

            var first_name = Faker.Name.firstName();

            assert.ok(Faker.Helpers.randomize.calledWith(['foo']));
            assert.equal(first_name, 'foo');

            Faker.definitions.first_name.restore();
            Faker.Helpers.randomize.restore();

            done();
        });
    });

    describe("lastName()", function() {
        it("returns a random name from definitions", function(done) {
            sinon.stub(Faker.definitions, 'last_name').returns(['foo']);
            sinon.spy(Faker.Helpers, 'randomize'); 

            var last_name = Faker.Name.lastName();

            assert.ok(Faker.Helpers.randomize.calledWith(['foo']));
            assert.equal(last_name, 'foo');

            Faker.definitions.last_name.restore();
            Faker.Helpers.randomize.restore();

            done();
        });
    });

    describe("findName()", function() {
        it("usually returns a first name and last name", function() {
            sinon.stub(Faker.Helpers, 'randomNumber').returns(5);
            var name = Faker.Name.findName();
            assert.ok(name);
            var parts = name.split(' ');
            assert.strictEqual(parts.length, 2);
            Faker.Helpers.randomNumber.restore();
        });

        it("occasionally returns a first name and last name with a prefix", function() {
            sinon.stub(Faker.Helpers, 'randomNumber').returns(0);
            var name = Faker.Name.findName();
            var parts = name.split(' ');
            assert.strictEqual(parts.length, 3);
            Faker.Helpers.randomNumber.restore();
        });

        it("occasionally returns a first name and last name with a suffix", function() {
            sinon.stub(Faker.Helpers, 'randomNumber').returns(1);
            var name = Faker.Name.findName();
            var parts = name.split(' ');
            assert.strictEqual(parts.length, 3);
            Faker.Helpers.randomNumber.restore();
        });
    });
});
