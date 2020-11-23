'use strict';

// Define libraries.
const gulp        = require( 'gulp' ),
      babel       = require( 'gulp-babel' ),
      concat      = require( 'gulp-concat' ),
      sass        = require( 'gulp-sass' );

// Define Sass compiler.
sass.compiler     = require( 'node-sass' );

// Define CSS source and distribution directories.
const cssSrc   = './src/sass/**/*.scss';
const cssDist    = './dist/css';

// Define JS source and distribution directories.
const jsSrc    = './src/js/**/*.js';
const jsDist     = './dist/js';

// Task to compile CSS files.
gulp.task( 'sass', function() {
  return gulp.src( cssSrc )
    .pipe( sass( { outputStyle: 'compressed' } ) )
    .pipe( gulp.dest( cssDist ) );
});

// Task to compile JS files.
gulp.task( 'js', function() {
  return gulp.src( jsSrc )
  .pipe( babel( { presets: ['minify'] } ) )
  .pipe( concat( 'scripts.min.js' ) )
  .pipe( gulp.dest( jsDist ) );
});

// Gulp tasks.
gulp.task( 'default', gulp.series( 'js', 'sass' ) );
