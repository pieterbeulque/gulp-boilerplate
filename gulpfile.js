var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    coffee = require('gulp-coffee'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');

// Set up gulp tasks
gulp.task('styles', function () {
    gulp.src('./src/scss/style.scss')
        .pipe(compass({
            style: 'expanded',
            project: './src',
            css: 'css',
            sass: 'scss',
            image: 'img',
            javascript: 'js',
            font: 'fonts'
        }))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('coffee', function () {
    gulp.src(['./src/coffee/**/*.coffee', './src/coffee/*.coffee'])
        .pipe(concat('all.coffee'))
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('./src/js'));
});

gulp.task('default', function () {
    gulp.run('styles', 'coffee');

    gulp.watch('./src/scss/*.scss', function () {
        gulp.run('styles');
    });

    gulp.watch('./src/coffee/*.coffee', function () {
        gulp.run('coffee');
    });
});

// Build tasks
gulp.task('styles:build', function () {
    gulp.src('./src/scss/style.scss')
        .pipe(compass({
            style: 'compressed',
            project: './src',
            css: 'css',
            sass: 'scss',
            image: 'img',
            javascript: 'js',
            font: 'fonts'
        }))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('coffee:build', function () {
    gulp.src(['./src/coffee/**/*.coffee', './src/coffee/*.coffee'])
        .pipe(concat('all.coffee'))
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('images:build', function () {
    gulp.src('./src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/img'));
});

gulp.task('build', function () {
    gulp.run('styles:build', 'coffee:build', 'images:build');

    gulp.src('./src/*.html').pipe(gulp.dest('./build'));
    gulp.src('./fonts/*').pipe(gulp.dest('./build/fonts'));
    gulp.src('./data/*').pipe(gulp.dest('./build/data'));
});
