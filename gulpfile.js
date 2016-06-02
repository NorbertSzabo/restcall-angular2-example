var gulp = require('gulp'),
    rename = require('gulp-rename'),
    traceur = require('gulp-traceur'),
    webserver = require('gulp-webserver'),
	typescript = require('gulp-tsc'),
	gulpTypescript = require("gulp-typescript"), 
	gulpSourcemaps = require("gulp-sourcemaps");	
	

// run tasks
gulp.task('default', ['dependencies', 'html', 'css', 'bootstrap', 'jquery', 'ts']);
gulp.task('dev', ['watch', 'server']);
gulp.task('watch', ['watch']);



// serve the build dir
gulp.task('server', function () {
  gulp.src('')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true,
	  fallback: 'index.html'
    }));
});

// watch for changes and run the relevant task
gulp.task('watch', function () {  
  gulp.watch('src/**/*.ts', ['ts']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
});

// move dependencies into build dir
gulp.task('dependencies', function () {
  return gulp.src([
    'node_modules/traceur/bin/traceur-runtime.js',
    'node_modules/systemjs/dist/system-csp-production.src.js',
    'node_modules/systemjs/dist/system.js',
	'node_modules/systemjs/dist/system-polyfills.js',
	'node_modules/systemjs/dist/system.src.js',	
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/angular2/bundles/angular2.js',
    'node_modules/angular2/bundles/angular2-polyfills.js',
	'node_modules/angular2/bundles/http.dev.js',	
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/es6-shim/es6-shim.min.js',
    'node_modules/es6-shim/es6-shim.map',
    'node_modules/es6-promise/dist/es6-promise.min.js',
    'node_modules/requirejs/require.js'
  ])
    .pipe(gulp.dest('build/lib'));
});

// transpile  TS

gulp.task('ts', function () {
  return gulp.src(['node_modules/angular2/typings/browser.d.ts','src/**/*.ts','src/**/*.map'])
	.pipe(gulpSourcemaps.init())
	.pipe(gulpTypescript({
            target: "es5",
			module: "system",
			moduleResolution: "node",
			sourceMap: true,
			emitDecoratorMetadata: true,
			experimentalDecorators: true,
			removeComments: false,
			noImplicitAny : false            
        }))	
  	.pipe(gulpSourcemaps.write('/maps'))		
    .pipe(gulp.dest('build'));
});


// move html
gulp.task('html', function () {
  return gulp.src(['src/**/*.html','*.html'])
    .pipe(gulp.dest('build'))
});

// move css
gulp.task('css', function () {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'))
});

// move bootstrap
gulp.task('bootstrap', function () {
	return gulp.src([
    'node_modules/bootstrap/dist/**/*'
  ])
    .pipe(gulp.dest('build/lib/bootstrap'));
});

// move jquery
gulp.task('jquery', function () {
	return gulp.src([
    'node_modules/jquery/dist/jquery.min.js'	
  ])
    .pipe(gulp.dest('build/lib/jquery'));
});
