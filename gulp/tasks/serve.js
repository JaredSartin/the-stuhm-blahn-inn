const gulp = require('gulp');
const PATH = require('../path');

gulp.task('setWatch', ['build'], () => {
  global.isWatching = true;
});

gulp.task('serve', ['setWatch'], () => {
  gulp.watch(PATH.STYLE.WATCH, ['sass']);
  gulp.watch(PATH.ASSETS.SRC, ['assets']);
  gulp.watch(PATH.JS.SRC, ['browserify']);
});
