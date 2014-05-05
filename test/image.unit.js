if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var Faker = require('../index');
}

describe("image.js", function () {
    describe("imageUrl()", function () {
        it("returns a random image url from lorempixel", function () {
            var imageUrl = Faker.Image.imageUrl();

            assert.equal(imageUrl, 'http://lorempixel.com/640/480');
        });
        it("returns a random image url from lorempixel with width and height", function () {
            var imageUrl = Faker.Image.imageUrl(100, 100);

            assert.equal(imageUrl, 'http://lorempixel.com/100/100');
        });
        it("returns a random image url for a specified category", function () {
            var imageUrl = Faker.Image.imageUrl(100, 100, 'abstract');

            assert.equal(imageUrl, 'http://lorempixel.com/100/100/abstract');
        });
    });
    describe("avatar()", function () {
        it("return a random avatar from UIFaces", function () {
            assert.notEqual(-1, Faker.Image.avatar().indexOf('s3.amazonaws.com/uifaces/faces'));
        })
    });
    describe("abstractImage()", function () {
        it("returns a random abstract image url", function () {
            var abstract = Faker.Image.abstractImage();
            assert.equal(abstract, 'http://lorempixel.com/640/480/abstract');
        });
    });
    describe("animals()", function () {
        it("returns a random animals image url", function () {
            var animals = Faker.Image.animals();
            assert.equal(animals, 'http://lorempixel.com/640/480/animals');
        });
    });
    describe("business()", function () {
        it("returns a random business image url", function () {
            var business = Faker.Image.business();
            assert.equal(business, 'http://lorempixel.com/640/480/business');
        });
    });
    describe("cats()", function () {
        it("returns a random cats image url", function () {
            var cats = Faker.Image.cats();
            assert.equal(cats, 'http://lorempixel.com/640/480/cats');
        });
    });
    describe("city()", function () {
        it("returns a random city image url", function () {
            var city = Faker.Image.city();
            assert.equal(city, 'http://lorempixel.com/640/480/city');
        });
    });
    describe("food()", function () {
        it("returns a random food image url", function () {
            var food = Faker.Image.food();
            assert.equal(food, 'http://lorempixel.com/640/480/food');
        });
    });
    describe("nightlife()", function () {
        it("returns a random nightlife image url", function () {
            var nightlife = Faker.Image.nightlife();
            assert.equal(nightlife, 'http://lorempixel.com/640/480/nightlife');
        });
    });
    describe("fashion()", function () {
        it("returns a random fashion image url", function () {
            var fashion = Faker.Image.fashion();
            assert.equal(fashion, 'http://lorempixel.com/640/480/fashion');
        });
    });
    describe("people()", function () {
        it("returns a random people image url", function () {
            var people = Faker.Image.people();
            assert.equal(people, 'http://lorempixel.com/640/480/people');
        });
    });
    describe("nature()", function () {
        it("returns a random nature image url", function () {
            var nature = Faker.Image.nature();
            assert.equal(nature, 'http://lorempixel.com/640/480/nature');
        });
    });
    describe("sports()", function () {
        it("returns a random sports image url", function () {
            var sports = Faker.Image.sports();
            assert.equal(sports, 'http://lorempixel.com/640/480/sports');
        });
    });
    describe("technics()", function () {
        it("returns a random technics image url", function () {
            var technics = Faker.Image.technics();
            assert.equal(technics, 'http://lorempixel.com/640/480/technics');
        });
    });
    describe("transport()", function () {
        it("returns a random transport image url", function () {
            var transport = Faker.Image.transport();
            assert.equal(transport, 'http://lorempixel.com/640/480/transport');
        });
    });
});
