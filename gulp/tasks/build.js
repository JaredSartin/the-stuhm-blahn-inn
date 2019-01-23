const gulp = require('gulp');
const browserSync = require('browser-sync');

gulp.task('build', ['browserify', 'sass'], () => {
  if (!global.isProduction) {
    browserSync({
      proxy: 'localhost:8080',
      notify: false,
    });
    gulp.watch(['views/**/*.{html,j2}'])
    .on('change', browserSync.reload);
  }
});
