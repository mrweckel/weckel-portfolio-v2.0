var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minimist = require('minimist'),
    autoprefixer = require('gulp-autoprefixer'),
    mochaPhantomjs = require('gulp-mocha-phantomjs');



gulp.task('browser-sync', ['dist-build'],function(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
});

gulp.task('dist-build', function(){
  console.log('...building dist folder');
  return gulp.src('./dev/**')
  .pipe(gulp.dest('./dist'));
});


