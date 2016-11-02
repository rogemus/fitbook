"use strick";

var gulp = require('gulp');
//Local dev server
var connect = require('gulp-connect');
//Open url in browser
var open = require('gulp-open');
//Concatenates files
var concat = require('gulp-concat');
//Transform SASS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');


var config = {
    port: 3001,
    devBaseUrl: 'http:localhost',
    paths: {
        html: './src/**/*.html',
        img: './src/img/**/*',
        fonts: './src/fonts/**/*',
        js: './src/js/**/*.js',
        css: './src/css/**/*.css',
        sass: [
            './src/sass/**/*.scss'
        ],
        buildCss: './build/css',
        buildImgs: './build/img',
        buildHtml: './build/html',
        buildFont: './build/fonts',
        buildJS: './build/js',
        build: './build'
    }
};

gulp.task('connect', function () {
    connect.server({
        root: ['build'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});


gulp.task('open', ['connect'], function () {
    gulp.src('build/html/')
        .pipe(open({
            uri: config.devBaseUrl + ':' + config.port + '/'
        }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.build))
        .pipe(connect.reload());
});

gulp.task('img', function () {
    gulp.src(config.paths.img)
        .pipe(gulp.dest(config.paths.buildImgs));
});

gulp.task('fonts', function () {
    gulp.src(config.paths.fonts)
        .pipe(gulp.dest(config.paths.buildFont));
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(gulp.dest(config.paths.buildCss))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    gulp.src(config.paths.js)
        .pipe(gulp.dest(config.paths.buildJS))
        .pipe(connect.reload());
});


gulp.task('sass', function () {
    gulp.src(config.paths.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.paths.buildCss))
        .pipe(connect.reload());
});


gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.sass, ['sass']);
});

gulp.task('default', ['open', 'html', 'fonts', 'img', 'css', 'js', 'sass', 'watch']);
