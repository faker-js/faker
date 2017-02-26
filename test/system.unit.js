if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("system.js", function () {
    describe("fileName()", function () {
        it("returns filenames without system path seperators", function () {
            sinon.stub(faker.random, 'words').returns('24/7');
            var fileName = faker.system.fileName();
            assert.equal(fileName.indexOf('/'), -1, 'generated fileNames should not have path seperators');

            faker.random.words.restore();
        });
    });

    describe("commonFileName()", function () {
        it("returns filenames without system path seperators", function () {
            sinon.stub(faker.random, 'words').returns('24/7');
            var fileName = faker.system.commonFileName();
            assert.equal(fileName.indexOf('/'), -1, 'generated commonFileNames should not have path seperators');

            faker.random.words.restore();
        });
    });
});
