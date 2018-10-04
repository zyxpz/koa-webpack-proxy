module.exports = {
	'GET /init.json': function (req, res) {
		const {
			query
		} = req;
		console.log(query);
		res.json({
			stat: 'ok'
		});
	},
	"POST /setting.json": function (req, res) {
		const {
			body
		} = req;
		body.split('&').forEach(v => {
			console.log(v);
		});
		res.json({
			stat: 'ok'
		});
	}
};