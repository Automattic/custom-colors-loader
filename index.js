var loaderUtils = require('loader-utils');

module.exports = function( content ) {
	var query = loaderUtils.parseQuery( this.query );
	this.cacheable && this.cacheable();

	if ( 'undefined' === typeof query.file ) {
		return content;
	}

	return content.replace(
		/@import \"(\.\.\/)*scss\/calypso-colors\";/ig,
		'$&\n@import "' + query.file + '";'
	);
};
