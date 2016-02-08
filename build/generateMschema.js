var faker = require('../');

var items = Object.keys(faker);

items = items.filter(function(i){
  if(['locales', 'definitions', 'locale', 'localeFallback'].indexOf(i) === -1) {
    return i;
  }
});

var schema = {
  "methods": {
    "type": "string",
    "enum": []
  }
};

schema.modules = {
  "type": "string",
  "enum": []
};

schema.methodSchemas = {
};

items.forEach(function(item){
  //  schema[item] = {};

  schema.modules.enum.push(item);
  for (var q in faker[item]) {

    //console.log(item + '.' + q);
    var fnLine = faker[item][q].toString().split('\n').slice(0,1)[0];
    var prop;

    // find first (
    var start = fnLine.search(/\(/);

    // find first )
    var end = fnLine.search(/\)/);

    // substr on those positions
    fnLine = fnLine.substr(start + 1, end - start - 1)

    if (fnLine === "") {
      //console.log(item + '.' + q, 'no arguments')
      prop = {
      };
    } else {
      // split on ,
      fnLine = fnLine.split(',');
      //console.log(item + '.' + q, fnLine);
      prop = {};
      fnLine.forEach(function(arg){
        prop[arg] = {
          type: "any"
        };
      });
    }
    schema.methods.enum.push(item + '.' + q);
    schema.methodSchemas[item + '.' + q] = prop;
  }

});

var util = require('util');
console.log(util.inspect(schema, false, null));