'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minimist = require('minimist'),
    autoprefixer = require('gulp-autoprefixer'),
    mochaPhantomjs = require('gulp-mocha-phantomjs'),
    runSequence = require('run-sequence');





//====COMPILING====//

//Compile html
gulp.task('compile', function(){
  console.log('...building staging folder');
  return gulp.src('./dev/**')
  .pipe()
  .pipe(gulp.dest('./staging'));
});

//Compile sass
gulp.task('compile-sass', function(){
  console.log('...compiling sass');
  gulp.src('./staging/stylesheets/**')
  .pipe(sass())
  .pipe(gulp.dest('./dist/stylesheets/'));
});

//Add vendor prefixes
gulp.task('prefix-styles', function(){
  console.log('...adding vendor prefixes');
  gulp.src('./dev/stylesheets/**')
  .pipe(autoprefixer({
    browsers: 'last 2 versions'
  }))
  .pipe(gulp.dest('./dist/stylesheets/'));
});

//JS hinting
gulp.task('jshint', function(){
  gulp.src('dev/javascripts/**')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(gulp.dest('staging'));
});

//Copying JS
gulp.task('copy-js', function(){
  gulp.src('dev/javascripts/**')
  .pipe(gulp.dest('staging'));
});

//js minification
gulp.task('uglify', function() {
  console.log('..minifying that js');
  gulp.src('./staging/js/**')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
})

//----BUILD----//

//clean staging file
gulp.task('clean-staging', function() {
  del([
    'staging/**'
    ]);
  console.log('..cleaning staging folder')
});

//clean distribution file
gulp.task('clean-dist', function() {
  del([
    'dist/**'
    ]);
  console.log('..cleaning dist folder')
});

//render styles
gulp.task('render-styles', function(callback) {
  runSequence(
    'compile-sass',
    'prefix-styles',
    callback
   );
});

//render scripts
gulp.task('render-scripts', function(callback) {
  runSequence(
    'jshint',
    'copy-js',
    callback
  );
});

//start server
gulp.task('browser-sync', function(){
  browserSync.init({
    server: {
      baseDir: './staging'
    }
  })
});

//build staging
gulp.task('build-staging', function(callback) {
  runSequence(
    'clean-staging',
    'clean-dist',
    'render-styles',
    'render-scripts',
     callback
  );
});

gulp.task('init', function(callback) {
  runSequence(
    'build-staging',
    'browser-sync',
    callback
  );
});

// ---- WATCHING ---- //
gulp.task('watch', function() {
  gulp.watch('./dev/scss/*.scss', ['render-styles',browserSync.reload]);
  gulp.watch('./dev/js/*.js', ['render-scripts',browserSync.reload]);
});

// ---- INITIALIZATION ---- //

// ---- SET DEFAULT ---- //
gulp.task('default', function(callback) {
  runSequence(
    'init',
    callback
    )
});





