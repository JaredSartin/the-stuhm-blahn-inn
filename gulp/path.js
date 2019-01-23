const PATH = {
  ASSETS: {
    SRC: './assets/**',
    DEST: './dist/assets',
  },
  IMAGES: {
    SRC: './assets/images/**',
    DEST: './build/assets/images'
  },
  JS: {
    SRC: './source/js/**',
  },
  STYLE: {
    SRC: './css/app.scss',
    WATCH: './source/sass/**'
  },
  BUILD: 'dist/js',
  OUT: 'build.js',
  SRC: '.',
  ENTRY_POINT: './source/js/main.js',
  CSS_OUT_DIR: './dist/css/'
};

module.exports = PATH;
