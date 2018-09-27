import './index.html';
import './test-index.less';
import async from 'async';

const run = {
	name: 'test-run',
	'one'() {
		console.log('one');
	},
	'two'() {
		console.log('two');
	},
	mm() {
		console.log('mm');
		console.log(this);
	}
};

const _build = (name, plugins, cb) => {
	const func = plugins[name];
	if (!func) return cb();
	if (name === 'mm') {
		func.call(name);
		cb();
	} else {
		func();
		cb();
	}
};

const build = (name, plugins, cb = loop => {}) => {
	_build(name, run, cb);
};

async.series([
	next => build('one', null, next(null, 'one')),
	next => build('two', null, next(null, 'two')),
	next => build('mm', null, next(null, 'mm'))
], (error, results) => {
	console.log(error, results);
});