import gulp from 'gulp';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import newer from 'gulp-newer';

const paths = {
    js: ['app/**/*.js'],
    nonJs: [],
    tests: './server/tests/*.js'
};

// Clean up dist and coverage directory
gulp.task('clean', () =>
    del(['dist/**', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', () =>
    gulp.src(paths.nonJs)
        .pipe(newer('dist'))
        .pipe(gulp.dest('dist'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', () =>
    gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
        .pipe(newer('dist'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'))
);

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
    nodemon({
        script: path.join('dist', 'app/app.js'),
        ext: 'js',
        ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
        tasks: ['copy', 'babel']
    })
);

// gulp serve for development
gulp.task('serve', ['clean'], () => runSequence('nodemon'));

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean'], () => {
    runSequence(
        ['copy', 'babel']
    );
});