var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var filesize = require('gulp-filesize');
var usemin = require('gulp-usemin');
var ngmin = require('gulp-ngmin');
var csso = require('gulp-csso');
var rename = require("gulp-rename");

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

gulp.on('err', function(err) {
	throw err;
});
