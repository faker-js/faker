Npm.depends({
    'faker': '2.1.1'
});


Package.describe({
  summary: "Generate massive amounts of fake data in node.js and in the browser.",
  name: "practicalmeteor:faker",
  version: "2.1.1_1",
  git: "https://github.com/practicalmeteor/faker.js.git"
});


Package.onUse(function (api) {
  api.versionsFrom('1.0');

  api.addFiles('meteor/npm-require.js', 'server');

  api.addFiles('build/build/faker.js', 'client');

  api.export("faker", "server");
});


Package.onTest(function(api) {
  api.use(['practicalmeteor:faker', "coffeescript", "tinytest", 'practicalmeteor:chai']);

  api.addFiles("meteor/tests/faker-export-test.coffee");
});
