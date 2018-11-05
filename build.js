const writeFileSync = require('fs').writeFileSync;

const path = require('path');

const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

const notifier = require('node-notifier');

const fileOutputPath = webpackConfig.output.path;

const filename = webpackConfig.output.filename;

// webpack(webpackConfig, (err, stats) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
  
// 	console.log(stats.toString({
// 		chunks: false,  
// 		colors: true    
// 	}));
// });

compiler.run((err, stats) => {
	// const jsonPath = path.join(fileOutputPath, filename);
	// writeFileSync(jsonPath, JSON.stringify(stats.toJson()), 'utf-8');
	const buildInfo = stats.toString({
		colors: true,
		children: false,
		chunks: false,
		modules: false,
		chunkModules: false,
		hash: false,
		version: false,
		entrypoints: false
	});
	if (err) {
    		console.log(buildInfo);
    		return;
    	}
	notifier.notify({
		title: 'build',
		message: 'done',
		subtitle: 'build successfully',
		sound: 'Glass',
	});
});