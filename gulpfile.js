let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let htmlmin = require('gulp-htmlmin');
let uglify = require('gulp-uglify-es').default;
let concat = require('gulp-concat');

gulp.task('concat-js' , () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('src/js/'));
});

gulp.task('uglify-js' , () => {
    return gulp.src('src/js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('dist/js/'));
});
 
gulp.task('minify-html', () => {
  return gulp.src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
	return gulp.src('src/sass/main.scss')
		.pipe(sass())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('src/css/'));
});

gulp.task('minify-css' , () => {
    return gulp.src('src/css/styles.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'));
});

function reload(done) {
browserSync.reload();
done();
}

function serve(done) {
browserSync.init({
    server: {
    baseDir: './'
    }
});
done();
}

gulp.task('minify-js' ,gulp.series('concat-js','uglify-js'));

gulp.task('minify-sass' , gulp.series('sass' ,'minify-css'));

  
const watching = () => gulp.watch(['./scss/**/*.scss', './js/*.js', 'indexDev.html'], gulp.series('minify-sass', 'minify-html', 'minify-js', reload));

gulp.task('default', gulp.series(serve, watching));