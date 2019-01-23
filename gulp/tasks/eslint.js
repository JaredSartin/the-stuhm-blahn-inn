const gulp = require('gulp');
const eslint = require('gulp-eslint');
const PATH = require('../path');

gulp.task('eslint', () => {
  return gulp
    .src(PATH.JS.SRC)
    .pipe(eslint())
    .pipe(eslint.format());
});
