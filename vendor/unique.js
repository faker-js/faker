// the `unique` module
var unique = {};

// global results store
var found = {};

// maximum time unique.exec will attempt to run before aborting
var maxTime = 5000;

// maximum retries unique.exec will recurse before abortings ( max loop depth )
var maxRetries = 50;

// time the script started
var startTime = new Date().getTime();

// current iteration or retries of unique.exec ( current loop depth )
var currentIterations = 0;

// common error handler for messages
unique.errorMessage = function (now, code) {
  console.error('error', code);
  console.log('found', Object.keys(found).length, 'unique entries before throwing error. \nretried:', currentIterations, '\ntotal time:', now - startTime, 'ms');
  throw new Error(code + ' for uniquness check. may not be able to generate any more unique values with current settings. try adjusting maxTime or maxRetries parameters for faker.unique()')
};

unique.exec = function (method, args, opts) {

  var now = new Date().getTime();

  opts = opts || {};
  opts.maxTime = opts.maxTime || maxTime;
  opts.maxRetries = opts.maxRetries || maxRetries;

  if (currentIterations > 0) {
    // console.log('iterating', currentIterations)
  }

  // console.log(now - startTime)
  if (now - startTime >= opts.maxTime) {
    return unique.errorMessage(now, 'exceeded maxTime');
  }

  if (currentIterations >= opts.maxRetries) {
    return unique.errorMessage(now, 'exceeded maxRetries');
  }

  // execute the provided method to find a potential satifised value
  // console.log(args)
  var result = method.apply(this, args);
  // if the result has not been previously found, add it to the found array and return the value as it's unique
  if (typeof found[result] === 'undefined') {
    //console.log('set email', email)
    found[result] = result;
    currentIterations = 0;
    return result;
  } else {
    // console.log('conflict', result);
    currentIterations++;
    return unique.exec(method, args, opts);
  }
};

module.exports = unique;