const gulp = require('gulp');
const csscomb = require('gulp-csscomb');

/**
 * Combs CSS and alphabetizes declarations
 */
gulp.task('css-comb', () => {
  return gulp.src([
  //     './source/sass/_about.scss',
  //     './source/sass/_config.scss',
  //     './source/sass/_footer.scss',
  //     './source/sass/form.scss',
  //     './source/sass/global.scss',
  //     './source/sass/_header.scss',
  //     './source/sass/_home.scss',
  //     './source/sass/_reset.scss'
    ])
    .pipe(csscomb())
    .pipe(gulp.dest('./tmp/sass/'));
});
