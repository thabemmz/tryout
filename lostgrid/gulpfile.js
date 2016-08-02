'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const connect = require('gulp-connect');
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const del = require('del');

const paths = {
  cssSrc: 'app/src/css',
  cssDst: '.tmp/css'
};

gulp.task('clean', () => {
  return del(['.tmp/**']);
});

gulp.task('connect', () => {
  return connect.server({
    root: ['app', '.tmp'],
    livereload: true
  });
});

gulp.task('styles', ['clean'], () => {
  return gulp.src(`${paths.cssSrc}/*.css`)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDst));
});

gulp.task('html', () => {
  return gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(`${paths.cssSrc}**/*.css`, ['styles']);
  gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['connect', 'styles', 'watch']);
