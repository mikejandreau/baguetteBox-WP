// Project Variables
var project               = 'Gallery_Slider'; // Project Name.
var projectURL            = 'dev4'; // Project URL. Could be something like localhost:8888.
var productURL            = './'; // Theme/Plugin URL. Leave it like it is, since our gulpfile.js lives in the root folder.

// Style related
var styleSRC              = './src/scss/gallery.scss'; // Path to main .scss file.
var styleDestination      = './assets/css/'; // Places compiled CSS file in root folder, could also be './assets/css/' or some other folder, just remember to update file path in functions.php

// JavaScript related
var scriptSRC             = './src/js/*.js'; // Path to JS folder if you don't care about concat order
var scriptDestination     = './assets/js/'; // Path to save the compiled JS file.
var scriptFile            = 'gallery'; // Compiled JS file name.

// Watch file paths
var styleWatchFiles       = './src/scss/**/*.scss'; // Path to source SCSS files
var scriptJSWatchFiles    = ['./src/js/baguetteBox.js', './src/js/baguetteBox-init.js']; // Path to JS files in order.
var projectPHPWatchFiles  = './**/*.php'; // Path to all PHP files
// var scriptJSWatchFiles    = './src/js/**/*.js'; // Path to source JS files

// Browsers we care about for autoprefixing
const AUTOPREFIXER_BROWSERS = [
  'last 2 versions',
  '> 1%',
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4',
  'bb >= 10'
];
// STOP Editing Project Variables

// Load gulp plugins and assign semantic names
var gulp         = require('gulp'); // Gulp

// CSS plugins
var sass         = require('gulp-sass'); // Gulp pluign for Sass compilation.
var minifycss    = require('gulp-uglifycss'); // Minifies CSS files.
var autoprefixer = require('gulp-autoprefixer'); // Autoprefixing magic.
var mmq          = require('gulp-merge-media-queries'); // Combine matching media queries into one media query definition.

// JS plugins
var jshint       = require('gulp-jshint'); // Checks JS for errors
var concat       = require('gulp-concat'); // Concatenates JS files
var uglify       = require('gulp-uglify'); // Minifies JS files

// Utility plugins
var rename       = require('gulp-rename'); // Renames files E.g. style.css -> style.min.css
var lineec       = require('gulp-line-ending-corrector'); // Consistent Line Endings for non UNIX systems.
var filter       = require('gulp-filter'); // Enables you to work on a subset of the original files by filtering them using globbing.
var sourcemaps   = require('gulp-sourcemaps'); // Maps code in a compressed file
var notify       = require('gulp-notify'); // Sends message notification to you
var browserSync  = require('browser-sync').create(); // Reloads browser and injects CSS. Time-saving synchronised browser testing.
var reload       = browserSync.reload; // For manual browser reload.

// BROWSERSYNC
// Live reload, CSS/JS injection, and localhost tunneling - http://www.browsersync.io/docs/options/
gulp.task( 'browser-sync', function() {
  browserSync.init( {
    proxy: projectURL,    // Project URL
    open: true,           // 'true' automatically opens BrowserSync live server, 'false' does not
    injectChanges: true,  // Inject CSS changes, comment it to reload browser for every CSS change
    // port: 7000,        // Use a specific port (instead of the one auto-detected by Browsersync)
  } );
});

// STYLE TASK
// Compile SCSS, add vendor prefixes, minify, save to root directory
gulp.task('styles', function () {
  gulp.src( styleSRC )
  .pipe( sourcemaps.init() )
  .pipe( sass( {
    errLogToConsole: true,
      // outputStyle: 'compact',
      outputStyle: 'compressed',
      // outputStyle: 'nested',
      // outputStyle: 'expanded',
      precision: 10
    } ) )
  .on('error', console.error.bind(console))
  .pipe( sourcemaps.write( { includeContent: false } ) )
  .pipe( sourcemaps.init( { loadMaps: true } ) )
  .pipe( autoprefixer( AUTOPREFIXER_BROWSERS ) )
  .pipe( sourcemaps.write ( './' ) ) // Write sourcemap to same folder
  .pipe( lineec() ) // Consistent Line Endings for non UNIX systems
  .pipe( gulp.dest( styleDestination ) )
  .pipe( filter( '**/*.css' ) ) // Filtering stream to only css files
  .pipe( mmq( { log: true } ) ) // Merge Media Queries only for .min.css version
  .pipe( browserSync.stream() ) // Reloads style.css if that is enqueued
  .pipe( rename( { suffix: '.min' } ) )
  .pipe( minifycss( {
    maxLineLen: 10
  }))
  .pipe( lineec() ) // Consistent Line Endings for non UNIX systems
  .pipe( gulp.dest( styleDestination ) )
  .pipe( filter( '**/*.css' ) ) // Filtering stream to only css files
  .pipe( browserSync.stream() ) // Reloads style.min.css if that is enqueued
  .pipe( notify( { message: 'TASK: "styles" Completed!', onLast: true } ) )
});

// SCRIPTS TASK
// Get JS source files, error check, concat, rename, minify, save to JS folder
gulp.task( 'scripts', function() {
  gulp.src( scriptSRC )
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe( concat( scriptFile + '.js' ) )
  .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
  .pipe( gulp.dest( scriptDestination ) )
  .pipe( rename( {
    basename: scriptFile,
    suffix: '.min'
  }))
  .pipe( uglify() )
  .pipe( lineec() ) // Consistent Line Endings for non UNIX systems.
  .pipe( gulp.dest( scriptDestination ) )
  .pipe( notify( { message: 'TASK: "scripts" Completed!', onLast: true } ) );
});

// WATCH TASK
// Watch files for changes and reload
gulp.task( 'default', ['styles', 'scripts', 'browser-sync'], function () {
  gulp.watch( projectPHPWatchFiles, reload ); // Reload on PHP file changes.
  gulp.watch( styleWatchFiles, [ 'styles' ] ); // Reload on SCSS file changes.
  gulp.watch( scriptJSWatchFiles, [ 'scripts', reload ] ); // Reload on scripts file changes.
});
