const 
	gulp 			= require('gulp'),
	del				= require('del'),
	$				= require('gulp-load-plugins')(),
	browserSync 	= require('browser-sync');

const paths = {
	extras: 'src/*.*',
	styles: 'src/styles/**/*.scss',
	scripts: 'src/scripts/**/*.js',
	images: 'src/images/**/*.{png,jpeg,jpg,svg,gif}',
	dest: {
		styles: 'dist/css',
		scripts: 'dist/js',
		images: 'dist/images',
		extras: 'dist'
	}
}

const getPath = source => {

	let newPath = [paths[source]]

	return newPath;
};

const extra = () => {
	return gulp.src(paths.extras)
		.pipe(gulp.dest(paths.dest.extras));
};

const clean = () => del('dist');

const getTask = (task, helpers) => {

	const _ = {
		...helpers,
		paths,
		getPath
	};

	return require('./gulpTasks/' + task)(gulp, $, _);
};

const watch = (done) => {

	gulp.watch(getPath('extras'), gulp.parallel(extra));
	gulp.watch(getPath('images'), gulp.parallel(getTask('images'), ));
	gulp.watch(getPath('styles'), gulp.parallel(getTask('styles', { getTask })));
	gulp.watch(getPath('scripts'), gulp.parallel(getTask('scripts', { getTask })));

	done();
};

const server = () => {
	browserSync({
		files: ['dist/**', '!dist/**/*.map'],
		server: {
			baseDir: ['dist']
		},
		open: !$.util.env.no
	})
}

gulp.task('watch', gulp.parallel([
	getTask('images'),
	getTask('styles', { getTask }),
	getTask('scripts', { getTask })
], watch));

gulp.task('develop', gulp.series('watch', server));

gulp.task('default', gulp.series([clean, extra, 'develop']));