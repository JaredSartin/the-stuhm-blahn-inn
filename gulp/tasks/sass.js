const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const PATH = require('../path.js');
const onError = require('../util/handleErrors.js');

const reload = require('browser-sync').reload;

gulp.task('sass', () => {
  return gulp.src('source/sass/*.scss')
    .pipe(onError())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(gulp.dest(PATH.CSS_OUT_DIR))
    .pipe(reload({stream: true}))
    .pipe(notify({
      message: 'LFL :: SASS Compilation Complete',
      title: 'Gulp Notification',
      onLast: true,
    }));
});
