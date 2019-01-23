const notify = require('gulp-notify');
const plumber = require('gulp-plumber');

module.exports = function plumbError() {
  return plumber({
    errorHandler: function(err) {
      notify.onError({
        templateOptions: {
          date: new Date(),
        },
        title: 'Gulp error in ' + err.plugin,
        message: err.messageFormatted,
      })(err);
      this.emit('end');
    },
  });
};
