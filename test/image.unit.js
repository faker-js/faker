if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("image.js", function () {
    describe("imageUrl()", function () {
        it("returns a random image url from lorempixel", function () {
            var imageUrl = faker.image.imageUrl();

            assert.equal(imageUrl, 'https://source.unsplash.com/640x480');
        });
        it("returns a random image url from lorempixel with width and height", function () {
            var imageUrl = faker.image.imageUrl(100, 100);

            assert.equal(imageUrl, 'https://source.unsplash.com/100x100');
        });
        it("returns a random image url for a specified category", function () {
            var imageUrl = faker.image.imageUrl(100, 100, 'abstract');

            assert.equal(imageUrl, 'https://source.unsplash.com/100x100?abstract');
        });
        /*
        it.only("returns a random image url from lorempixel with a randomizer", function () {
            var imageUrl = faker.image.imageUrl(100, 100, undefined, true);

            console.log(imageUrl);
            assert.ok(imageUrl.match(/^http:\/\/lorempixel.com\/100\/100\?[\d]+$/));
        });
        */
    });
    describe("avatar()", function () {
        it("return a random avatar from UIFaces", function () {
            assert.notEqual(-1, faker.image.avatar().indexOf('s3.amazonaws.com/uifaces/faces'));
        })
    });
    describe("abstract()", function () {
        it("returns a random abstract image url", function () {
            var abstract = faker.image.abstract();
            assert.equal(abstract, 'https://source.unsplash.com/640x480?abstract');
        });
    });
    describe("animals()", function () {
        it("returns a random animals image url", function () {
            var animals = faker.image.animals();
            assert.equal(animals, 'https://source.unsplash.com/640x480?animals');
        });
    });
    describe("business()", function () {
        it("returns a random business image url", function () {
            var business = faker.image.business();
            assert.equal(business, 'https://source.unsplash.com/640x480?business');
        });
    });
    describe("cats()", function () {
        it("returns a random cats image url", function () {
            var cats = faker.image.cats();
            assert.equal(cats, 'https://source.unsplash.com/640x480?cats');
        });
    });
    describe("city()", function () {
        it("returns a random city image url", function () {
            var city = faker.image.city();
            assert.equal(city, 'https://source.unsplash.com/640x480?city');
        });
    });
    describe("food()", function () {
        it("returns a random food image url", function () {
            var food = faker.image.food();
            assert.equal(food, 'https://source.unsplash.com/category/food/640x480');
        });
    });
    describe("nightlife()", function () {
        it("returns a random nightlife image url", function () {
            var nightlife = faker.image.nightlife();
            assert.equal(nightlife, 'https://source.unsplash.com/640x480?nightlife');
        });
    });
    describe("fashion()", function () {
        it("returns a random fashion image url", function () {
            var fashion = faker.image.fashion();
            assert.equal(fashion, 'https://source.unsplash.com/640x480?fashion');
        });
    });
    describe("people()", function () {
        it("returns a random people image url", function () {
            var people = faker.image.people();
            assert.equal(people, 'https://source.unsplash.com/category/people/640x480');
        });
    });
    describe("nature()", function () {
        it("returns a random nature image url", function () {
            var nature = faker.image.nature();
            assert.equal(nature, 'https://source.unsplash.com/category/nature/640x480');
        });
    });
    describe("sports()", function () {
        it("returns a random sports image url", function () {
            var sports = faker.image.sports();
            assert.equal(sports, 'https://source.unsplash.com/640x480?sports');
        });
    });
    describe("technics()", function () {
        it("returns a random technics image url", function () {
            var technics = faker.image.technics();
            assert.equal(technics, 'https://source.unsplash.com/640x480?technics');
        });
    });
    describe("transport()", function () {
        it("returns a random transport image url", function () {
            var transport = faker.image.transport();
            assert.equal(transport, 'https://source.unsplash.com/640x480?transport');
        });
    });
    describe("technology()", function () {
        it("returns a random technology image url", function () {
            var transport = faker.image.technology();
            assert.equal(transport, 'https://source.unsplash.com/category/technology/640x480');
        });
    });
    describe("objects()", function () {
        it("returns a random objects image url", function () {
            var transport = faker.image.objects();
            assert.equal(transport, 'https://source.unsplash.com/category/objects/640x480');
        });
    });
    describe("buildings()", function () {
        it("returns a random buildings image url", function () {
            var transport = faker.image.buildings();
            assert.equal(transport, 'https://source.unsplash.com/category/buildings/640x480');
        });
    });
});
