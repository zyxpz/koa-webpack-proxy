import './index.html';
import './test-index.less';
import async from 'async';
import log from './common';
import $ from 'anima-yocto';

console.log(1);

const run = {
	name: 'test-run',
	'one'() {
		log('one');
	},
	'two'() {
		log('two');
	},
	mm() {
		log('mm');
		log(this);
	},
	'ajax'() {
		$.ajax({
			url: '/init.json',
			type: 'GET',
			data: {
				tmc: 'sb'
			},
			success(d) {
				console.log(d);
			}

		});
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
	next => build('mm', null, next(null, 'mm')),
	next => build('ajax', null, next(null, 'ajax')),
], (error, results) => {
	log(error, results);
});


function commonBuild() {
	build('name');
}