'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var googleWebFonts = require('gulp-google-webfonts');

gulp.task('offline-fonts', function () {
    return gulp.src('./fonts.list')
        .pipe(googleWebFonts())
        .pipe(gulp.dest(path.join(conf.paths.src, 'assets/fonts')))
        ;
});