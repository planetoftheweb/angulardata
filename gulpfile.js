var gulp = require('gulp'),
  gutil = require('gulp-util'),
  webserver = require('gulp-webserver');

gulp.task('js', function() {
  gulp.src('builds/angulardata/js/**/*');
});

gulp.task('html', function() {
  gulp.src('builds/angulardata/*.html');
});

gulp.task('css', function() {
  gulp.src('builds/angulardata/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch('builds/angulardata/js/**/*', ['js']);
  gulp.watch('builds/angulardata/css/*.css', ['css']);
  gulp.watch(['builds/angulardata/*.html',
    'builds/angulardata/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src('builds/angulardata/')
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
