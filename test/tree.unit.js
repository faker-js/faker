if (typeof module !== 'undefined') {
    var assert = require('assert');
    var sinon = require('sinon');
    var faker = require('../index');
}

describe("tree.js", function () {
    describe("createTree()", function () {

        var proto = {
            "firstname": "faker.name.firstName()",
            "children": "__RECURSE__"
        };

        it("requires the width to be at least one", function () {
            sinon.spy(faker.tree, 'createTree');

            try {
                faker.tree.createTree(0, 0, {});
            }
            catch (e) {
            }

            assert.ok(faker.tree.createTree.threw);

            faker.tree.createTree.restore();
        });

        it("requires that the object passed in should not be null", function () {
            sinon.spy(faker.tree, 'createTree');

            try {
                faker.tree.createTree(1, 1, null);
            }
            catch (e) {
            }

            assert.ok(faker.tree.createTree.threw);

            faker.tree.createTree.restore();

        });

        it("can create a trivial tree with one node", function () {
            sinon.spy(faker.name, 'firstName');

            var tree = faker.tree.createTree(0, 1, proto);

            assert.ok(faker.name.firstName.calledOnce);

            assert.ok(tree.children == null);

            faker.name.firstName.restore();
        });

        it("can create a deep tree with one node at each level", function () {
            sinon.spy(faker.name, 'firstName');
            var tree = faker.tree.createTree(2, 1, proto);

            assert.ok(faker.name.firstName.calledThrice);

            assert.ok(tree.firstname);
            assert.ok(tree.children[0].firstname);
            assert.ok(tree.children[0].children[0].firstname);

            faker.name.firstName.restore();
        });

        it("can create a basic N-tree", function () {
            var n = 3;
            sinon.spy(faker.name, 'firstName');
            var tree = faker.tree.createTree(1, n, proto);

            assert.ok(faker.name.firstName.callCount == 4);

            assert.ok(tree.firstname);
            assert.ok(tree.children[0].firstname);
            assert.ok(tree.children[1].firstname);
            assert.ok(tree.children[2].firstname);

            faker.name.firstName.restore();
        });

        it("can create a full N-tree", function () {
            var n = 3;
            sinon.spy(faker.name, 'firstName');
            var tree = faker.tree.createTree(2, n, proto);

            assert.ok(faker.name.firstName.callCount == 13);

            faker.name.firstName.restore();
        });

        it("can accept a function for the width", function () {
            var widthFuncCalled = 0;
            var widthFunc = function () {
                widthFuncCalled = widthFuncCalled + 1;
                return 2;
            };

            var tree = faker.tree.createTree(2, widthFunc, proto);
            assert.equal(widthFuncCalled, 3);


        });

    });
});
