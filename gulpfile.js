'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    del = require('del'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minimist = require('minimist'),
    autoprefixer = require('gulp-autoprefixer'),
    mochaPhantomjs = require('gulp-mocha-phantomjs');



gulp.task('browser-sync', ['dist-build'],function(){
  browserSync.init({
    server: {
      baseDir: './staging'
    }
  })
});

//====COMPILING====//

//Compile all files
gulp.task('compile', function(){
  console.log('...building dist folder');
  return gulp.src('./dev/**')
  .pipe()
  .pipe(gulp.dest('./dist'));
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
    browsers: browsers,
    cascade: false
  }))
  .pipe(gulp.dest('./dist/stylesheets/'));
});

//
gulp.task('jshint', function(){
  gulp.src('dev/javascripts/**')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(gulp.dest('staging'))
});

//clean staging file
gulp.task('clean-stage', function() {
  del([
    'dist/**'
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

//js minificatoin
gulp.task('uglify', function() {
  console.log('..minifying that js');
  gulp.src('./staging/js/**')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'))
})




