var Faker = require('../index');

var clone = function clone(obj) {
    if (obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }
    return temp;
};


var createTree = function (depth, width, obj) {

    if (!obj) {
        throw {
            name: "ObjectError",
            message: "there needs to be an object passed in",
            toString: function () {
                return this.name + ": " + this.message
            }
        };
    }

    if (width <= 0) {
        throw {
            name: "TreeParamError",
            message: "width must be greater than zero",
            toString: function () {
                return this.name + ": " + this.message
            }
        };
    }

    var newObj = clone(obj);

    for (var prop in newObj) {
        if (newObj.hasOwnProperty(prop)) {
            var value = null;
            if (newObj[prop] !== "__RECURSE__") {
                value = eval(newObj[prop]);
            }
            else {
                if (depth !== 0) {
                    value = [];
                    for (var i = 0; i < width; i++) {
                        value.push(createTree(depth - 1, width, obj));
                    }
                }
            }

            newObj[prop] = value;
        }
    }

    return newObj;
};

var tree = {
    createTree: createTree
};


module.exports = tree;
