  'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minimist = require('minimist'),
    autoprefixer = require('gulp-autoprefixer'),
    mochaPhantomjs = require('gulp-mocha-phantomjs'),
    runSequence = require('run-sequence'),
    minifyCss = require('gulp-minify-css'),
    glob = require("glob");


//====COMPILING====//

//Compile html
gulp.task('compile-html', function(){
  console.log('...getting you that sweet sweet HTML');
  return gulp.src('dev/*.html')
  .pipe(gulp.dest('staging/'));
});

gulp.task('copy-html', function(){
  console.log('...copying over html');
  return gulp.src('staging/*.html')
  .pipe(gulp.dest('dist/'));
});

//Compile sass
gulp.task('compile-sass', function(){
  console.log('...compiling sass');
  gulp.src('dev/stylesheets/**')
  .pipe(sass())
  .pipe(gulp.dest('staging/stylesheets/'));
});

//Add vendor prefixes
gulp.task('prefix-styles', function(){
  console.log('...adding vendor prefixes');
  gulp.src('staging/stylesheets/*.css')
  .pipe(autoprefixer({
    browsers: 'last 2 versions'
  }))
  .pipe(gulp.dest('staging/stylesheets/'));
});

//Minify CSS
gulp.task('minify-css', function() {
  console.log('...minifying css');
  return gulp.src('staging/stylesheets/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

//JS hinting
gulp.task('jshint', function(){
  gulp.src('dev/javascripts/**')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(gulp.dest('./staging/js/'));
});

//Copying JS
gulp.task('copy-js', function(){
  gulp.src('dev/javascripts/**')
  .pipe(gulp.dest('staging/js/'));
});

//js minification
gulp.task('uglify', function() {
  console.log('..minifying that js');
  gulp.src('./staging/js/**')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
})

//----BUILD----//

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
    'compile-html',
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
      baseDir: './staging/'
    }
  })
});

//build staging
gulp.task('build-staging', ['clean-staging'], function() {
  runSequence(
    'render-styles',
    'render-scripts'
  );
});

//build dist
gulp.task('build-dist', ['clean-dist'], function(cb) {
  runSequence(
    'copy-html',
    'minify-css',
    'uglify',
     cb
  );
});

// ---- INITIALIZATION ---- //
gulp.task('init', function(cb) {
  runSequence(
    'build-staging',
    // 'build-dist',
    'browser-sync',
    'watch',
    cb
  );
});

// ---- WATCHING ---- //
gulp.task('watch', function() {
  gulp.watch('dev/stylesheets/*.scss', ['render-styles',browserSync.reload]);
  gulp.watch('dev/js/*.js', ['render-scripts',browserSync.reload]);
  gulp.watch('dev/*.html', ['compile-html',browserSync.reload]);
});

// ---- SET DEFAULT ---- //
gulp.task('default', function(callback) {
  runSequence(
    'init',
    callback
    )
});





