const Koa = require('koa');

const webpack = require('webpack');

const chalk = require('chalk');

const ProgressPlugin = webpack.ProgressPlugin;

const webpackConfig = require('./webpack.config');

const devMiddleware = require('./plugins/koaDevMiddleware');

const koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const ProxyServer = require('dora-anyproxy').proxyServer;

const serverIndex = require('./plugins/serve-index');

const serverStatic = require('./plugins/static');

const getRule = require('./proxy/getRule');

const app = new Koa();

app.use(serverIndex);

app.use(serverStatic);

webpackConfig.devtool = 'cheap-module-eval-source-map';

webpackConfig.plugins = webpackConfig.plugins.concat([
	/**
	 * 友好提示
	 */
	new FriendlyErrorsWebpackPlugin({
		onErrors: (severity, errors) => {
			if (severity !== 'error') {
				notifier.notify({
					title: 'mido',
					message: 'warn',
					sound: 'Glass',
				});
				return;
			}
			const error = errors[0];
			notifier.notify({
				title: 'mido',
				message: `${severity} : ${error.name}`,
				subtitle: error.file || '',
				sound: 'Glass',
			});
		}
	}),
	new ProgressPlugin((percentage, msg, ...args) => {
		const stream = process.stderr;
		if (stream.isTTY && percentage < 0.71) {
			stream.cursorTo(0);
			stream.write(`💰  ${chalk.magenta(msg, '-', args[0])}`);
			stream.clearLine(1);
		} else if (percentage === 1) {
			console.log(chalk.blue('\nwebpack: bundle build is now finished.'));
		}
	})
]);

const compiler = webpack(webpackConfig);

// app.use(koaWebpackDevMiddleware(compiler, {
// 	publicPath: '/',
// 	quiet: true,
// }));

// const proxyServer = new ProxyServer({
// 	type: 'http',
// 	port: '8989',
// 	hostname: 'localhost',
// 	rule: getRule({
// 		cwd: process.cwd(),
// 		port: '8001',
// 		query: {}
// 	}),
// 	autoTrust: true,
// });
// proxyServer.on('finish', (err) => {
// 	if (err) {
// 		console.error(err);
// 	} else {
// 		console.info(`listened on 8989`);
// 	}
// });

app.use(devMiddleware(compiler, {
	publicPath: '/',
	stats: 'none',
	logLevel: 'silent',
	watchOptions: {
		ignored: /node_modules/,
		aggregateTimeout: 300,
		poll: 1000
	}
}));

// app.use(hotMiddleware(compiler));

app.listen(8001);

process.on('exit', (code) => {
	console.log(`即将退出，退出码：${code}`);
});