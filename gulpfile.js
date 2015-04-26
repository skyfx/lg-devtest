'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var karma = require('karma').server;

var AUTOPREFIXER_BROWSERS = [
    'chrome >= 42',
    'safari >= 8',
    'ios >= 8'
];

gulp.task('jshint', function jshint() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(reload({stream: true, once: true}))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('test', function test(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS2']
    }, done);
});

gulp.task('copy', function copy() {
    return gulp.src([
        'app/*',
        '!app/*.html'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'))
        .pipe($.size({title: 'copy'}));
});

gulp.task('styles', function styles() {

    return gulp.src('app/styles/*.css')
        .pipe($.changed('.tmp/styles', {extension: '.css'}))
        .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.if('*.css', $.csso()))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size({title: 'styles'}));
});

gulp.task('html', function html() {
    var assets = $.useref.assets({searchPath: '{.tmp,app}'});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        .pipe($.if('*.js', $.uglify()))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.if('*.html', $.minifyHtml()))
        .pipe(gulp.dest('dist'))
        .pipe($.size({title: 'html'}));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist/*'], {dot: true}));

gulp.task('serve', ['styles'], function serve() {
    browserSync({
        notify: false,
        logPrefix: '[BROWSER-SYNC]',
        server: ['.tmp', 'app'],
        open: false
    });

    gulp.watch(['app/**/*.html'], reload);
    gulp.watch(['app/styles/**/*.css'], ['styles', reload]);
    gulp.watch(['app/scripts/**/*.js'], ['jshint']);
});

gulp.task('serve:dist', ['default'], function serveDist() {
    browserSync({
        notify: false,
        logPrefix: '[BROWSER-SYNC]',
        server: 'dist',
        open: false
    });
});

gulp.task('default', ['clean'], function defaultTask(cb) {
    runSequence(
        'styles',
        ['jshint', 'html', 'copy', 'test'],
        cb);
});
