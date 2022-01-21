function defaultTask(cb) {
  // place code for your default task here
  console.log('please run gulp --tasks to see available tasks for faker.js');
  cb();
}

exports.browser = require('./build/gulp-tasks/browser');

exports.default = defaultTask;
