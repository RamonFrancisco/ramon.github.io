module.exports = function (gulp, $, _) {

	const   cssnano = require('cssnano'),
		    autoprefixer = require('autoprefixer');

	const styles = () => {
		return gulp.src(_.getPath('styles'))
			.pipe($.plumber())
			.pipe($.util.env.production ? $.util.noop() : $.sourcemaps.init())
			.pipe($.sass({
				errLogToConsole: true,
				outputStyle: $.util.env.production ? 'compressed' : 'nested',
				includePaths: [
					'src/styles',
					'node_modules/'
				]
			}).on('error', $.sass.logError))
			.pipe($.postcss([
				autoprefixer(),
				cssnano({
					zindex: false,
					reduceIdents: false
				})
			]))
			.pipe(!$.util.env.production ? $.sourcemaps.write('.') : $.util.noop())
			.pipe(gulp.dest(_.paths.dest.styles));
	};

	return gulp.series(styles);
};