let gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('default', () => {
    console.log('gulp default task');
});


gulp.task('html', () => {
    console.log('html practice test');
});

gulp.task('styles', () => {
    console.log('CSS practice test');
});

gulp.task('watch', () => {

    watch('./app/index.html', () => {
        gulp.start('html');
    });

    watch('./app/assets/styles/**/*.css', () => {
        gulp.start('styles');
    });

});
