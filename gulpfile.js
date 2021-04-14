const { src, dest, parallel, watch, series } = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  browserSync = require('browser-sync').create();

const FilesPath = {
  sassFiles: 'src/scss/**/**/*',
  htmlAll: 'src/pug/**/**/*.pug',
  assetsFile: 'dist/assets/**',
};

const { sassFiles, htmlAll, assetsFile } = FilesPath;

function sassTask() {
  return src(sassFiles)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

function htmlTask() {
  return src(htmlAll)
    .pipe(pug({ pretty: true }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function assetsTask() {
  return src(assetsFile).pipe(dest('dist/assets'));
}

function serve() {
  browserSync.init({ server: { baseDir: 'dist' } });
  watch(sassFiles, sassTask);
  watch(htmlAll, htmlTask);
}

exports.sass = sassTask;
exports.html = htmlTask;
exports.assets = assetsTask;
exports.default = series(parallel(htmlTask, sassTask, assetsTask));
exports.serve = series(serve, parallel(htmlTask, sassTask, assetsTask));
