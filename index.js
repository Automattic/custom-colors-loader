var utils = require('loader-utils');
var assign = require('object-assign');

module.exports = function( content ) {
	var options = getLoaderConfig( this );
	this.cacheable && this.cacheable();

	if ( 'undefined' === typeof options.file ) {
		return content;
	}

	return content.replace(
		/@import \"(\.\.\/)*scss\/calypso-colors\";/ig,
		'$&\n@import "' + options.file + '";'
	);
};

/**
 * Check the loader query and webpack config for loader options. If an option is defined in both places,
 * the loader query takes precedence.
 *
 * [from sass-loader: https://github.com/jtangelder/sass-loader/blob/master/index.js#L377]
 *
 * @param {Loader} loaderContext
 * @returns {Object}
 */
function getLoaderConfig( loaderContext ) {
	var query = utils.parseQuery( loaderContext.query );
	var configKey = query.config || 'customColorsLoader';
	var config = loaderContext.options[configKey] || {};

	delete query.config;

	return assign( query, config );
}