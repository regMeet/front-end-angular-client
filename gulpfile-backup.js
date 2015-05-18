var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var filesize = require('gulp-filesize');
var usemin = require('gulp-usemin');
var ngmin = require('gulp-ngmin');
var csso = require('gulp-csso');
var rename = require("gulp-rename");
var jshint = require('gulp-jshint');


var webapp_path = 'src/main/webapp/';
var components_path = webapp_path + 'components/'

var files = [
    '!src/main/webapp/components/**/*_test.js', // Exclude test files
    components_path + '**/*.js'
];


var paths = {
	    scripts:        '../admin/assets/js/**/*.*',
	    styles:         '../admin/assets/css/**/*.*',
	    images:         '../admin/assets/img/**/*.*',
	    html_templates:     components_path + '**/*.html',
	    app_js:         '../admin/app/**/*.js',
	    index:          '../admin/index.html',
};

gulp.task('lint', function() {
	  return gulp.src(files)
	    .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
	    .pipe(jshint.reporter('fail'));
	});

// Register tasks
gulp.task('concat-min', function() {
    return gulp.src(files)
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('min-concat', function() {
    return gulp.src(files)
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('keep-index-html', function() {
	// copy original index.html to index-dev.html
    gulp.src('src/main/webapp/index.html')
    			.pipe(rename('index-dev.html'))
    			.pipe(gulp.dest('target/overlay'));
});

gulp.task('minify-css-js', function() {
	// compress resources from index.html
	  gulp.src('src/main/webapp/index.html')
	      .pipe(usemin({
	        vendor: [filesize(), uglify(), rev(), filesize()],
	        scripts: [filesize(), ngmin(), uglify(), rev(), filesize()],
	        stylesheets: ['concat', filesize(), csso(), rev(), filesize()]
	      }))
	      .pipe(gulp.dest('target/overlay'));
});

gulp.task('copy-templates', function() {
    return gulp.src(paths.html_templates)
       // .pipe(minifyHTML())
        .pipe(gulp.dest('target/overlay/templates'));
});

gulp.task('build', ['lint', 'keep-index-html', 'minify-css-js', 'copy-templates'], function () {
	// compress resources from index.html
	  gulp.src('src/main/webapp/index.html')
	      .pipe(usemin({
	        vendor: [filesize(), uglify(), rev(), filesize()],
	        scripts: [filesize(), ngmin(), uglify(), rev(), filesize()],
	        stylesheets: ['concat', filesize(), csso(), rev(), filesize()]
	      }))
	      .pipe(gulp.dest('target/overlay'));

});


/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'target/overlay',
        livereload: true,
        port: 5555
    });
});

//gulp.task('default', ['build']);


gulp.task('default', function(){

  // copy original index.html to index-dev.html
  gulp.src('src/main/webapp/index.html')
      .pipe(rename('index-dev.html'))
      .pipe(gulp.dest('target/overlay'));

  // compress resources from index.html
  gulp.src('src/main/webapp/index.html')
      .pipe(usemin({
        vendor: [filesize(), uglify(), rev(), filesize()],
        scripts: [filesize(), ngmin(), uglify(), rev(), filesize()],
        stylesheets: ['concat', filesize(), csso(), rev(), filesize()]
      }))
      .pipe(gulp.dest('target/overlay'));
      
});

gulp.on('err', function (err) {
  throw err;
});


