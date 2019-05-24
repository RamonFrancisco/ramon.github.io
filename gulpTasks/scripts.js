module.exports = (gulp, $, _) => {

	const webpack = require('webpack-stream'),
		named = require('vinyl-named');

	const scripts = () => {
		return gulp.src(_.getPath('scripts'))
			.pipe($.plumber())
			.pipe(named())
			.pipe(webpack({
				output: {
					filename: 'app.min.js'
				},
				resolve: {
					modules: [
						'src/scripts',
						'node_modules'
					],
				},
				module: {
					rules: [
						{
							test: /\.js$/,
							exclude: /node_modules\/(?!bootstrap\/).*/,
							use: {
								loader: 'babel-loader?cacheDirectory',
								options: {
									presets: ['@babel/preset-env'],
									plugins: ['@babel/plugin-proposal-object-rest-spread']
								}
							}
						}
					]
				},
				mode: $.util.env.production ? 'production' : 'development',
				devtool: $.util.env.production ? false : 'eval-source-map'
			}))
			
			.pipe(gulp.dest(_.paths.dest.scripts));
	};

	return gulp.series(scripts);
};