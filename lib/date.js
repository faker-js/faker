var faker = require("../index");

var date = {

    past: function (years, refDate) {
        var date = (refDate) ? new Date(Date.parse(refDate)) : new Date();
        var range = {
          min: 1000,
          max: (years || 1) * 365 * 24 * 3600 * 1000
        };

        var past = date.getTime();
        past -= faker.random.number(range); // some time from now to N years ago, in milliseconds
        date.setTime(past);

        return date;
    },

    future: function (years, refDate) {
        var date = (refDate) ? new Date(Date.parse(refDate)) : new Date();
        var range = {
          min: 1000,
          max: (years || 1) * 365 * 24 * 3600 * 1000
        };

        var future = date.getTime();
        future += faker.random.number(range); // some time from now to N years later, in milliseconds
        date.setTime(future);

        return date;
    },

    between: function (from, to) {
        var fromMilli = Date.parse(from);
        var dateOffset = faker.random.number(Date.parse(to) - fromMilli);

        var newDate = new Date(fromMilli + dateOffset);

        return newDate;
    },

    recent: function (days) {
        var date = new Date();
        var range = {
          min: 1000,
          max: (days || 1) * 24 * 3600 * 1000
        };

        var future = date.getTime();
        future -= faker.random.number(range); // some time from now to N days ago, in milliseconds
        date.setTime(future);

        return date;
    }
};
module.exports = date;
