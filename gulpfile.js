const gulp = require('gulp'),
  _ = require('lodash'),
  sass = require('gulp-sass'),
  compass = require('gulp-compass'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  jshint = require('gulp-jshint'),
  babel = require('gulp-babel'),
  browserify = require('gulp-browserify'),
  settings = require('./gulp-settings'),
  minify = require('gulp-minify'),
  rename = require('gulp-rename'),
  cleanCSS = require('gulp-clean-css'),


  src = settings.src + '/',
  dest = settings.dest + '/',

  srcJS = src + 'js/**/*.js',
  destJS = dest + 'js',
  
  srcCSS = src + 'sass/**/*.scss',
  destCSS = dest + 'css',


  env = settings.env,

  compass_config = {
     project: __dirname,
      css: dest + 'css',
      sass: src + 'sass',
      image: src + 'img',
      style: 'nested'
  };


if (env === 'prod') {
  compass_config.style = "compressed";
}


gulp.task('copy-assets', function () {
  _(settings.assets).forEach(function (assets, type) {
    gulp.src(assets).pipe(gulp.dest(dest + type + '/vendor/'))
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


gulp.task('compass', function() {
  return gulp.src(srcCSS)
    .pipe(compass(compass_config))
    .pipe(sourcemaps.write())
    //.pipe(minifyCSS())
    .pipe(gulp.dest(destCSS));
});


gulp.task('minify:css', function () {
  compass_config.style = 'compressed';
  return gulp.src([dest + '**/*.css', '!' + dest + '**/*.min.css'])
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('minify:js', function () {
  return gulp.src([dest + '**/*.js', '!' + dest + '**/*.min.js'])
    .pipe(minify({
      ext: {
        src: '.js', 
        min: '.min.js'
      },
      exclude: ['vendor'],
      ignoreFiles: ['.min.js']
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('watch', function () {
  gulp.watch(srcJS, ['jshint'])
  gulp.watch(srcCSS, ['compass'])
})


/** RUN **/

// init files
gulp.task('init', ['compass', 'jshint', 'copy-assets']);

// Watch for developmenet
gulp.task('default', ['copy-assets', 'watch']);

// Minify files for production
gulp.task('minify', ['minify:css', 'minify:js']);
