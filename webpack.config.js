const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const milieu = process.env.NODE_ENV || 'development';

const APP_PATH = process.cwd();

const {
	entry
} = require('./package.json');

const config = {
	mode: milieu,
	entry,
	output: {
		path: `${APP_PATH}/dist`,
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loader: 'babel-loader',
		},
		{
			test: /\.(css|scss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		},
		{
			test: /\.less$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'less-loader',
			],
		},
		{
			test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
			loader: 'url-loader',
			options: {
				limit: 10000
			}
		},
		{
			test: /\.html?$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
			},
		}
		]
	},

	optimization: {
		minimize: milieu === 'production' ? true : false,
		namedModules: true,
		noEmitOnErrors: true,
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.EvalSourceMapDevToolPlugin({
			filename: '[name].js.map',
		}),
	]
};


module.exports = config;