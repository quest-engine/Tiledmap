
var gulp  = require('gulp'),
  bump    = require('gulp-bump'),
  concat  = require('gulp-concat'),
  wrap    = require('gulp-wrap'),
  paths   = {};

paths.scripts = [
  './src/autotile.js',
  './src/map.js'
];

paths.pkgs = [
  './package.json',
  './bower.json'
];

gulp.task('bump', function () {
  return gulp.src(paths.pkgs)
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function () {
  return gulp.src(paths.pkgs)
    .pipe(bump({type: 'minor'}))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:major', function () {
  return gulp.src(paths.pkgs)
    .pipe(bump({type: 'major'}))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function () {
  gulp.src(paths.scripts)
    .pipe(concat('tiledmap.js'))
    .pipe(gulp.dest('./.temp'));
});

gulp.task('wrap', ['build'], function () {
  gulp.src('./.temp/tiledmap.js')
    .pipe(wrap({
      src: './src/wrap.txt'
    }))
    .pipe(gulp.dest('./dist'));
});