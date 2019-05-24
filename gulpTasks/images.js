module.exports = function (gulp, $, _) {

	return function images() {
		return gulp.src(_.getPath('images'))
			.pipe($.plumber())
			 .pipe($.imagemin({
				optimizationLevel: $.util.env.production ? 5 : 1,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(_.paths.dest.images));
	};


};