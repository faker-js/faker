var definitions = require('./definitions');

var random = {
    // returns a single random number based on a range
    number: function (range) {
        var r = Math.floor(Math.random() * range);
        console.log(r);
        return r;
    },

    // takes an array and returns the array randomly sorted
    array_rand: function (array) {
        var r = Math.floor(Math.random() * array.length);
        return array[r];
    }
};

var method_names = [
    'catch_phrase_adjective',
    'catch_phrase_descriptor',
    'catch_phrase_noun',
    'bs_adjective',
    'bs_buzz',
    'bs_noun'
];

for (var i = 0; i < method_names.length; i++) {
    var method_name = method_names[i];
    random[method_name] = function () {
        return random.array_rand(definitions[method_name]());
    };
}

module.exports = random;
