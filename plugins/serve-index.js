module.exports = 
	require('koa-serve-index')(process.cwd(), {
		hidden: true,
		view: 'details',
	});
;