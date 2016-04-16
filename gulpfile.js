var gulp = require('gulp');
var sass = require('gulp-sass');
var ugly = require('gulp-uglify');
var sync = require('browser-sync');
var watchify = require('watchify');
var babelify = require('babelify');
var browserify = require('browserify');
var prefix = require('gulp-autoprefixer');
var source = require('vinyl-source-stream');

var b = browserify({
  entries: ['./src/scripts/main.js'],
  cache: {},
  packageCache: {},
  plugin: [watchify],
  transform: [[babelify, { presets: ['es2015'] }]]
});

function bundle() {
  b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/scripts'));
}

gulp.task('sass', function() {
  return gulp.src('./src/styles/main.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(prefix({ browsers: ['last 2 versions']}))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('sync', function() {
  sync({
    server: {
      baseDir: ''
    },
  });
});

gulp.task('scripts', function() {
  bundle();
  b.on('update', bundle);
});

gulp.task('watch', ['sync', 'sass', 'scripts'], function() {
  gulp.watch('./index.html', sync.reload);
  gulp.watch('./src/styles/**/*.sass', ['sass']);
  gulp.watch('./dist/styles/main.css', sync.reload);
  gulp.watch('./dist/scripts/main.js', sync.reload);
});