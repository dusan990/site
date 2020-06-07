const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const nunjucksRender = require('gulp-nunjucks-render');

function nunjucks() {
  return gulp.src('src/templates/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['src/templates/'] // String or Array
    }))
    .pipe(gulp.dest('src'));
}

//css
function style() {
	return gulp.src('./src/scss/**/*.scss')
    .pipe(sass())
		.pipe(gulp.dest('./src/css'))
    .pipe(browserSync.stream());
}

//broser reload
function watch() {
  browserSync.init({
    server: {
      baseDir: "src/",
      serveStaticOptions: {
        extensions: ["html"]
      }
    }
  });
  gulp.watch('./src/templates/**/*.+(html|nunjucks)', nunjucks);
  gulp.watch('./src/scss/**/*.scss', style);
	// gulp.watch('./src/scss/style.scss', { ignoreInitial: false }, style);
  gulp.watch('src/*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.nunjucks = nunjucks;
exports.watch = watch;