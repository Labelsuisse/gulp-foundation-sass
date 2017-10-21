const gulp = require('gulp'),
  _ = require('lodash'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  jshint = require('gulp-jshint'),
  babel = require('gulp-babel'),
  browserify = require('gulp-browserify'),

  public = 'webroot/'
  srcJS = 'src_assets/js/**/*.js',
  destJS = public + 'js',
  srcCSS = 'src_assets/scss/**/*.scss'
  destCSS = public + 'css';


gulp.task('copy-assets', function () {
  var assets = {
    js: [
      './node_modules/foundation-sites/dist/js/foundation.js',
      './node_modules/foundation-sites/dist/js/foundation.min.js',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/what-input/dist/what-input.min.js',
      './node_modules/what-input/dist/what-input.js',
      './node_modules/lodash/lodash.js',
      './node_modules/lodash/lodash.min.js'
    ],
    // css: ['./node_modules/normalize.css/normalize.css']
  }

  _(assets).forEach(function (assets, type) {
    gulp.src(assets).pipe(gulp.dest(public + type + '/vendor/'))
  })
})

gulp.task('jshint', function () {
  return gulp.src(srcJS)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest(destJS));
})



gulp.task('scss', function () {
  return gulp.src(srcCSS)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    //.pipe(concat('app.css'))
    .pipe(gulp.dest(destCSS))
})

gulp.task('watch', function () {
  gulp.watch(srcJS, ['jshint'])
  gulp.watch(srcCSS, ['scss'])
})

gulp.task('default', ['copy-assets', 'watch']);

gulp.task('init', ['scss', 'jshint', 'copy-assets']);