const gulp = require('gulp');

gulp.task('setProduction', () => {
  global.isProduction = true;
});

gulp.task('pre-production', ['setProduction'], () => {
  gulp.start('build');
});

gulp.task('build-production', ['clean', 'pre-production']);
