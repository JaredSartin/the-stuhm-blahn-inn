const browserify = require('browserify');
const watchify = require('watchify');
const gulp = require('gulp');
const notify = require('gulp-notify');
const streamify = require('gulp-streamify');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');
const merge = require('merge');
const PATH = require('../path');
const reload = require('browser-sync').reload;

const args = merge(watchify.args, {
  debug: !global.isProduction ? true: false,
});

const devBundler = browserify(PATH.ENTRY_POINT, args)
  .plugin(watchify)
  .transform(babelify, {
    presets: ['es2015'],
    sourceMaps: true,
  });

const prodBundler = browserify(PATH.ENTRY_POINT, args)
  .transform(babelify, {
    presets: ['es2015'],
  });

function bundle(bundler) {
  bundler
    .bundle()
    .on('error', function(msg) {
      console.error(msg.codeFrame);
      this.emit('end')
    })
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(gulpif(global.isProduction, uglify()))
    .pipe(gulp.dest('./' + PATH.BUILD + '/'))
    .pipe(gulpif(!global.isProduction, reload({ stream: true })))
}

gulp.task('browserify', () => {
  const bundler = global.isProduction ? prodBundler : devBundler;
  bundle(bundler);
  bundler.on('update', () => {
    bundle(bundler);
  });
});
