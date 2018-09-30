module.exports = {
	'GET /init.json': function(req, res) {
		const {
			query
		} = req;
		console.log(query);
		res.json({
			stat: 'ok'
		});
	}
};