/**
 * Created by Administrator on 2016/10/12.
 */
const gulp = require('gulp');
const less = require('gulp-less');
const cleancss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const LessPluginAutoPrefix = require('less-plugin-autoprefix');//css自动编译私有前缀
const autoprefix = new LessPluginAutoPrefix({ browsers: ["ie >= 8", "ie_mob >= 10", "ff >= 26", "chrome >= 30", "safari >= 6", "opera >= 23", "ios >= 5", "android >= 2.3", "bb >= 10"] });

gulp.task('css',function(){
    gulp.src('public/build/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less({ plugins: [autoprefix] }))
        .pipe(cleancss())
        .pipe(rename(function(path){
            path.extname = '.min.css'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/dist/css'))
});

gulp.task('js',function(){
    gulp.src('public/build/es6/*.es')
        .pipe(sourcemaps.init({identityMap:true}))
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({compress:false}))
        .pipe(rename(function(path){
            path.extname = '.min.js'
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/dist/js'))
})

gulp.task('watch',function(){
    gulp.watch('public/build/less/*.less',['css']);
    gulp.watch('public/build/es6/*.es',['js']);
});

gulp.task('default',['css','js','watch']);
