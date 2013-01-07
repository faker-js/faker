var definitions = require('./definitions');

var random = {
    // returns a single random number based on a range
    number: function (range) {
        return Math.floor(Math.random() * range);
    },

    // takes an array and returns the array randomly sorted
    array_rand: function (array) {
        var r = Math.floor(Math.random() * array.length);
        return array[r];
    }
};

/**
 * Generate methods that return random elements from definition arrays.
 */
var method_names = [
    // Address
    'city_prefix',
    'city_suffix',
    'street_suffix',

    // Name
    'first_name',
    'last_name',
    'name_prefix',
    'name_suffix',

    // Company
    'catch_phrase_adjective',
    'catch_phrase_descriptor',
    'catch_phrase_noun',
    'bs_adjective',
    'bs_buzz',
    'bs_noun'
];

method_names.forEach(function (method_name) {
    random[method_name] = function () {
        return random.array_rand(definitions[method_name]());
    };
});

module.exports = random;
