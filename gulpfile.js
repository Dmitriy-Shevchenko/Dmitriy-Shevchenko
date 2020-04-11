const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"    //Сервер берет файлы из папки src
        }
    });
});

gulp.task('styles', function() {
    return gulp.src("src/sass/*.+(scss|sass)") //gulp будет выполнять операции по адресу rsc/sass/ над файломи scss и sass
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //Эти файлы компилирует препроцессор sass
        //сжатый- всё в одну строку и подскажет если есть ошибки
        .pipe(gulp.dest("src/css")) // И кладет по адресу src/css
        .pipe(browserSync.stream()); // после изменений боузер обновляется
})

galp.task('watch', function() {
    gulp.watch("src/sass/*.+(scss|sass)", gulp.parallel("style"))//watch отслеживает scss и sass и выполнять style
    gulp.watch("src/*.html").on("change", browserSync.reload);//watch отслеживает html на изменения в нем и запускать reload
})

gulp.task('default', galp.parallel('watch','server', 'style')); //Поумолчанию отслеживать и запуска сервер и файлы стилей