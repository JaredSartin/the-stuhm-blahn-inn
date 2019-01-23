const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

/**
 * Minifies images based on quality/speed recommendations
 */
gulp.task('minify-png', () => {
    return gulp.src('./source/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({
              quality: '45-75',
              speed: 8,
            })],
        }))
        // !IMPORTANT manually move from /tmp to
        // /static to avoid recompressing images
        .pipe(gulp.dest('./tmp/images/'));
});
